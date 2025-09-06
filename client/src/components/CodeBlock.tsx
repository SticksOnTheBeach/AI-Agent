import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({ children, language = "", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatCode = (code: string) => {
    const lines = code.trim().split('\n');
    return lines.map((line, index) => {
      // Enhanced syntax highlighting
      let formattedLine = line
        .replace(/(\/\/.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
        .replace(/(\/\*[\s\S]*?\*\/)/gm, '<span class="text-green-400">$1</span>') // Block comments
        .replace(/\b(const|let|var|function|class|interface|type|import|export|from|return|if|else|for|while|try|catch|async|await|new|this|super|extends|implements)\b/g, '<span class="text-blue-300 font-semibold">$1</span>') // Keywords
        .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-orange-400">$1</span>') // Booleans/null
        .replace(/('[^']*'|"[^"]*"|`[^`]*`)/g, '<span class="text-yellow-300">$1</span>') // Strings
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-purple-300">$1</span>') // Numbers
        .replace(/\b([A-Z][a-zA-Z0-9]*)\b/g, '<span class="text-cyan-300">$1</span>'); // Types/Classes

      return (
        <div key={index} className="text-gray-200 leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
        </div>
      );
    });
  };

  return (
    <div className={cn(
      "relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700/50 shadow-xl overflow-hidden",
      className
    )}>
      {/* Header with language and copy button */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 border-b border-gray-700/50">
        <div className="flex items-center space-x-2">
          {language && (
            <>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <span className="text-gray-400 text-sm font-medium ml-2">{language}</span>
            </>
          )}
        </div>
        <Button
          onClick={handleCopy}
          variant="ghost"
          size="sm"
          className="text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
          data-testid="button-copy-code"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              <span className="text-xs">Copié!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              <span className="text-xs">Copier</span>
            </>
          )}
        </Button>
      </div>
      
      {/* Code content */}
      <div className="p-4 overflow-x-auto">
        <div className="space-y-1 font-mono text-sm">
          {formatCode(children)}
        </div>
      </div>
    </div>
  );
}
