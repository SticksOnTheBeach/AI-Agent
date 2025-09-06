import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ChatInterface from "@/components/ChatInterface";
import ThemeToggle from "@/components/ThemeToggle";

export default function Chat() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="flex items-center space-x-2"
              data-testid="button-back-home"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <i className="fas fa-robot text-primary-foreground text-sm"></i>
                </div>
                <span className="text-xl font-semibold">Agent IA Chat</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      
      <div className="pt-20">
        <ChatInterface fullscreen />
      </div>
    </div>
  );
}
