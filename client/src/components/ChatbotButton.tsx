import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Sparkles, Zap } from 'lucide-react';
import Chatbot from './Chatbot';

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40">
        {/* Floating notification badge */}
        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full animate-pulse shadow-lg">
          AI Coach
        </div>
        
        {/* Main button */}
        <Button
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size="icon"
          className={`
            w-16 h-16 rounded-full shadow-2xl transition-all duration-500 transform hover:scale-110
            bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
            hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
            text-white border-2 border-white/20 hover:border-white/40
            relative overflow-hidden
          `}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 animate-pulse"></div>
          
          {/* Sparkles animation */}
          {isHovered && (
            <>
              <Sparkles className="absolute top-1 left-1 w-3 h-3 animate-bounce text-yellow-300" />
              <Sparkles className="absolute top-2 right-2 w-2 h-2 animate-bounce text-yellow-300" style={{ animationDelay: '0.2s' }} />
              <Sparkles className="absolute bottom-2 left-2 w-2 h-2 animate-bounce text-yellow-300" style={{ animationDelay: '0.4s' }} />
            </>
          )}
          
          {/* Main icon */}
          <div className="relative z-10">
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          </div>
          
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 animate-ping"></div>
        </Button>
        
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Ask AI Coach</span>
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      <Chatbot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default ChatbotButton;
