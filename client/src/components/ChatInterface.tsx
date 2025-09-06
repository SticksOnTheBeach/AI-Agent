import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, MoreVertical, Bot, Minimize2, Maximize2 } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import CodeBlock from "@/components/CodeBlock";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  fullscreen?: boolean;
}

export default function ChatInterface({ fullscreen = false }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
      // Agrandir la fenêtre de chat après envoi du message
      setIsExpanded(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleExampleMessage = (message: string) => {
    setInput(message);
    // Agrandir la fenêtre de chat quand on utilise un exemple
    setIsExpanded(true);
  };

  const renderMessage = (message: any, index: number) => {
    const isUser = message.role === "user";
    const content = message.content;
    
    const renderFormattedContent = (text: string) => {
      // Enhanced markdown parsing
      const parts = [];
      let currentText = text;
      
      // Split by code blocks first
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
      const codeBlocks = [];
      let match;
      
      while ((match = codeBlockRegex.exec(text)) !== null) {
        codeBlocks.push({
          start: match.index,
          end: match.index + match[0].length,
          language: match[1] || "",
          code: match[2]
        });
      }
      
      if (codeBlocks.length === 0) {
        // No code blocks, process as regular markdown
        return <div className="prose prose-sm dark:prose-invert max-w-none">
          {formatMarkdownText(text)}
        </div>;
      }
      
      // Handle text with code blocks
      let lastIndex = 0;
      return (
        <div className="space-y-6">
          {codeBlocks.map((block, blockIndex) => (
            <div key={blockIndex} className="space-y-4">
              {lastIndex < block.start && (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {formatMarkdownText(text.slice(lastIndex, block.start))}
                </div>
              )}
              <div className="my-6">
                <CodeBlock language={block.language}>{block.code}</CodeBlock>
              </div>
              {(() => { lastIndex = block.end; return null; })()}
            </div>
          ))}
          {lastIndex < text.length && (
            <div className="prose prose-sm dark:prose-invert max-w-none mt-4">
              {formatMarkdownText(text.slice(lastIndex))}
            </div>
          )}
        </div>
      );
    };
    
    const formatMarkdownText = (text: string) => {
      return text.split('\n').map((line, lineIndex) => {
        // Headers
        if (line.startsWith('### ')) {
          return <h3 key={lineIndex} className="text-lg font-semibold mt-4 mb-2 text-foreground">{line.slice(4)}</h3>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={lineIndex} className="text-xl font-bold mt-5 mb-3 text-foreground">{line.slice(3)}</h2>;
        }
        if (line.startsWith('# ')) {
          return <h1 key={lineIndex} className="text-2xl font-bold mt-6 mb-4 text-foreground">{line.slice(2)}</h1>;
        }
        
        // Lists
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={lineIndex} className="ml-4 mb-1 text-muted-foreground">{line.slice(2)}</li>;
        }
        if (/^\d+\.\s/.test(line)) {
          return <li key={lineIndex} className="ml-4 mb-1 text-muted-foreground list-decimal">{line.replace(/^\d+\.\s/, '')}</li>;
        }
        
        // Bold and formatting
        let formattedLine = line
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
          .replace(/🚀|💻|🏗️|🔒|📱|✨|📊|🎯|💡|🔧|📋|⚡|🧪|🔄/g, '<span class="text-primary">$&</span>');
        
        if (line.trim() === '') {
          return <br key={lineIndex} />;
        }
        
        return (
          <p key={lineIndex} className="mb-2 text-muted-foreground leading-relaxed" 
             dangerouslySetInnerHTML={{ __html: formattedLine }} />
        );
      });
    };
    
    return (
      <div key={index} className={cn("flex mb-6", isUser ? "justify-end" : "items-start space-x-3")}>
        {!isUser && (
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Bot className="text-primary-foreground text-xs" />
          </div>
        )}
        <div className={cn(
          "rounded-2xl px-5 py-4 shadow-sm",
          isUser ? "chat-message-user max-w-md" : "chat-message-ai max-w-3xl border border-border/50"
        )}>
          <div className={cn("text-sm", !isUser && "text-foreground")}>
            {renderFormattedContent(content)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className={cn("py-20", fullscreen && "min-h-screen flex items-center")}>
      <div className="max-w-4xl mx-auto px-6">
        {!fullscreen && (
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Chat avec l'Agent IA</h2>
            <p className="text-xl text-muted-foreground">Testez les capacités de programmation avancées de l'agent</p>
          </div>
        )}

        {/* Chat Container */}
        <div className={cn(
          "glass-effect rounded-2xl p-6 mb-6 transition-all duration-500 ease-in-out",
          isExpanded || fullscreen ? "h-[600px]" : "h-96"
        )}>
          {/* Chat Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <Bot className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Agent IA Pro - Gemini</h3>
                <p className="text-sm text-green-500 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  En ligne
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!fullscreen && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsExpanded(!isExpanded)}
                  data-testid="button-toggle-size"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              )}
              <Button variant="ghost" size="sm" data-testid="button-chat-options">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className={cn(
            "flex-1 overflow-y-auto py-4 space-y-4 transition-all duration-500",
            isExpanded || fullscreen ? "h-[460px]" : "h-64"
          )} data-testid="chat-messages">
            {messages.length === 0 && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-primary-foreground text-xs" />
                </div>
                <div className="chat-message-ai rounded-2xl px-4 py-3 max-w-xs">
                  <p className="text-sm">Bonjour ! Je suis votre agent IA expert en programmation propulsé par Gemini 2.5 Pro. Je peux créer des projets complets, du frontend au backend. Que souhaitez-vous développer aujourd'hui ?</p>
                </div>
              </div>
            )}
            
            {messages.map(renderMessage)}
            
            {/* Typing indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-primary-foreground text-xs" />
                </div>
                <div className="chat-message-ai rounded-2xl px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" data-testid="button-attach">
                <Paperclip className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Demandez-moi de créer n'importe quel projet..."
                  className="pr-12"
                  disabled={isLoading}
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 bg-primary hover:bg-primary/80"
                  data-testid="button-send-message"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              L'Agent IA peut faire des erreurs. Vérifiez les informations importantes.
            </p>
          </div>
        </div>

        {/* Chat Examples */}
        {!fullscreen && (
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => handleExampleMessage('Crée-moi un site e-commerce complet avec panier et paiement')}
              className="glass-effect p-4 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              data-testid="example-ecommerce"
            >
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">Site E-commerce</h4>
              <p className="text-sm text-muted-foreground">Création complète avec panier et paiement</p>
            </button>
            <button
              onClick={() => handleExampleMessage('Développe une API REST avec authentification JWT')}
              className="glass-effect p-4 rounded-xl text-left hover:scale-105 transition-all duration-300 group"
              data-testid="example-api"
            >
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">API REST</h4>
              <p className="text-sm text-muted-foreground">Backend avec authentification sécurisée</p>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
