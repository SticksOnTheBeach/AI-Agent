import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./services/gemini";
import { insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

const chatRequestSchema = z.object({
  message: z.string().min(1),
  sessionId: z.string().nullable().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new chat session
  app.post("/api/chat/session", async (req, res) => {
    try {
      const session = await storage.createChatSession();
      res.json(session);
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({ error: "Failed to create chat session" });
    }
  });

  // Get chat messages for a session
  app.get("/api/chat/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessages(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Send message and get AI response
  app.post("/api/chat/message", async (req, res) => {
    try {
      const { message, sessionId } = chatRequestSchema.parse(req.body);
      
      // Create session if not provided
      let currentSessionId = sessionId;
      if (!currentSessionId || currentSessionId === null) {
        const newSession = await storage.createChatSession();
        currentSessionId = newSession.id;
      }

      // Get conversation history
      const conversationHistory = await storage.getChatMessages(currentSessionId);
      
      // Add user message
      const userMessage = await storage.addChatMessage({
        sessionId: currentSessionId,
        role: "user",
        content: message,
        metadata: null,
      });

      // Generate AI response
      const aiResponse = await generateChatResponse({
        message,
        conversationHistory: conversationHistory.map(msg => ({
          role: msg.role as "user" | "assistant",
          content: msg.content
        }))
      });

      // Add AI message
      const assistantMessage = await storage.addChatMessage({
        sessionId: currentSessionId,
        role: "assistant",
        content: aiResponse.response,
        metadata: aiResponse.metadata,
      });

      res.json({
        sessionId: currentSessionId,
        userMessage,
        assistantMessage,
      });
    } catch (error) {
      console.error("Error processing chat message:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid request data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to process message" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
