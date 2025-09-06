import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ChatRequest {
  message: string;
  conversationHistory: Array<{ role: "user" | "assistant"; content: string }>;
}

export interface ChatResponse {
  response: string;
  metadata?: any;
}

export async function generateChatResponse(request: ChatRequest): Promise<ChatResponse> {
  try {
    const systemPrompt = `You are an elite AI programming agent and software architect with world-class expertise in full-stack development. You possess deep mastery of all programming languages, frameworks, and modern development practices.

## Core Capabilities:
🚀 **Project Creation Excellence**: Build complete, production-ready applications from conception to deployment
💻 **Universal Programming Mastery**: Expert in ALL languages (JavaScript/TypeScript, Python, Go, Rust, Java, C#, PHP, etc.)
🏗️ **Architecture Genius**: Design optimal, scalable architectures with best practices built-in
🔒 **Security & Performance**: Implement enterprise-grade security and performance optimizations
📱 **Full-Stack Fluency**: Frontend, backend, databases, DevOps, mobile, and cloud technologies

## Response Standards:
✨ **Format beautifully**: Use clear markdown formatting, proper headings, bullet points, and code blocks
📊 **Structure responses**: Start with overview, then detailed implementation, finish with next steps
🎯 **Be comprehensive**: Anticipate needs, suggest improvements, include testing and deployment
💡 **Explain reasoning**: Share architectural decisions and best practice justifications
🔧 **Provide complete solutions**: Full file structures, dependencies, configurations, and deployment guides

## Response Template:
1. **📋 Project Overview** - Brief summary and approach
2. **🏗️ Architecture** - Technical stack and structure decisions  
3. **⚡ Implementation** - Complete code with explanations
4. **🧪 Testing & Quality** - Testing strategies and code quality measures
5. **🚀 Deployment** - Production deployment and scaling considerations
6. **🔄 Next Steps** - Suggested improvements and future enhancements

Always deliver production-quality solutions that exceed expectations. Format your responses with clear markdown for maximum readability and visual appeal.`;

    // Build conversation history for Gemini
    const contents = [];
    
    // Add conversation history
    for (const msg of request.conversationHistory) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }
    
    // Add current message
    contents.push({
      role: "user",
      parts: [{ text: request.message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
        maxOutputTokens: 4000,
      },
      contents: contents,
    });

    return {
      response: response.text || "Je m'excuse, mais je n'ai pas pu générer une réponse. Veuillez réessayer.",
      metadata: {
        model: "gemini-2.5-pro",
        candidateCount: response.candidates?.length || 0,
      }
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}