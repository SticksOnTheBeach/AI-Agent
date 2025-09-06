import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import PrivacySection from "@/components/PrivacySection";
import PricingSection from "@/components/PricingSection";
import OpenSourceSection from "@/components/OpenSourceSection";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [activeSection, setActiveSection] = useState("project");

  const renderSection = () => {
    switch (activeSection) {
      case "project":
        return <HeroSection onNavigate={setActiveSection} />;
      case "methodology":
        return <MethodologySection />;
      case "privacy":
        return <PrivacySection />;
      case "pricing":
        return <PricingSection onNavigate={setActiveSection} />;
      case "opensource":
        return <OpenSourceSection />;
      case "chat":
        return <ChatInterface />;
      default:
        return <HeroSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <div className="pt-20">
        <div className="animate-fade-in">
          {renderSection()}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <i className="fas fa-robot text-primary-foreground text-xs"></i>
            </div>
            <span className="font-semibold">Agent IA</span>
          </div>
          <p className="text-muted-foreground mb-2">Créateur d'intelligence artificielle avancée</p>
          <p className="text-sm text-muted-foreground mb-6">
            Créé avec ❤️ par{" "}
            <a 
              href="https://github.com/SticksOnTheBeach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors font-medium"
              data-testid="link-creator"
            >
              SticksOnTheBeach
            </a>
          </p>
          <div className="flex items-center justify-center space-x-6 text-muted-foreground">
            <a 
              href="https://github.com/SticksOnTheBeach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors" 
              data-testid="link-github"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-foreground transition-colors" data-testid="link-linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
