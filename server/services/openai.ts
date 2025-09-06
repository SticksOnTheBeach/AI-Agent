import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || "your-api-key-here"
});

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
    const systemPrompt = `You are an expert AI programming agent with advanced capabilities in full-stack development. You can:

1. Create complete projects from frontend to backend including databases
2. Work with ANY programming language and framework
3. Anticipate project requirements and suggest optimal architectures
4. Generate production-ready code with best practices
5. Provide detailed explanations and step-by-step implementation guides

You should:
- Be extremely knowledgeable about all programming languages and frameworks
- Provide complete, functional code examples
- Suggest optimal architectures and technologies
- Anticipate needs that users might not explicitly mention
- Include proper error handling, security, and best practices
- Explain your decisions and reasoning

When creating projects, include:
- Complete file structures
- All necessary dependencies
- Database schemas if needed
- API endpoints
- Frontend components
- Deployment configurations
- Testing strategies

Respond in a helpful, professional manner. If asked to create a project, provide comprehensive implementation details.`;

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...request.conversationHistory.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      })),
      { role: "user", content: request.message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages,
      max_tokens: 4000,
      temperature: 0.7,
    });

    return {
      response: response.choices[0].message.content || "I apologize, but I couldn't generate a response. Please try again.",
      metadata: {
        model: "gpt-5",
        tokens: response.usage?.total_tokens || 0,
      }
    };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
