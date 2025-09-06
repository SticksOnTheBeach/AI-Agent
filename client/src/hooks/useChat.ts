import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  metadata?: any;
  createdAt: string;
}

interface ChatResponse {
  sessionId: string;
  userMessage: ChatMessage;
  assistantMessage: ChatMessage;
}

export function useChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get chat messages for current session
  const { data: messages = [] } = useQuery({
    queryKey: ["/api/chat", sessionId, "messages"],
    enabled: !!sessionId,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string): Promise<ChatResponse> => {
      const response = await apiRequest("POST", "/api/chat/message", {
        message,
        sessionId,
      });
      return response.json();
    },
    onSuccess: (data) => {
      // Update session ID if it's a new session
      if (!sessionId) {
        setSessionId(data.sessionId);
      }
      
      // Invalidate messages query to refetch
      queryClient.invalidateQueries({
        queryKey: ["/api/chat", data.sessionId, "messages"],
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer le message. Veuillez réessayer.",
        variant: "destructive",
      });
      console.error("Chat error:", error);
    },
  });

  const sendMessage = (message: string) => {
    sendMessageMutation.mutate(message);
  };

  return {
    messages,
    sendMessage,
    isLoading: sendMessageMutation.isPending,
    sessionId,
  };
}
