import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Sparkles, Trophy, Target, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import muscleIcon from '@/assets/muscle-icon.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: any[];
  isMotivational?: boolean;
  emoji?: string;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey there, fitness warrior! 💪 I\'m your AI fitness coach and I\'m here to help you crush your goals! What would you like to know about today?',
      sender: 'bot',
      timestamp: new Date(),
      isMotivational: true,
      emoji: '🔥'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingEffect, setTypingEffect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMotivationalMessage = () => {
    const motivationalMessages = [
      { text: "You're doing amazing! Keep pushing forward! 🚀", emoji: "🚀" },
      { text: "Every step counts towards your goals! 💪", emoji: "💪" },
      { text: "You've got this! Your future self will thank you! ⭐", emoji: "⭐" },
      { text: "Consistency is the key to success! 🔑", emoji: "🔑" },
      { text: "You're stronger than you think! 💎", emoji: "💎" }
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const motivationalMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: randomMessage.text,
      sender: 'bot',
      timestamp: new Date(),
      isMotivational: true,
      emoji: randomMessage.emoji
    };
    
    setMessages(prev => [...prev, motivationalMsg]);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setTypingEffect(true);

    try {
      const conversationHistory = messages
        .filter(msg => !msg.isMotivational)
        .map(msg => ({ role: msg.sender, content: msg.text }));

      const response = await axios.post('http://localhost:5000/api/chatbot/chat', {
        message: inputMessage,
        conversationHistory
      });

      // Add motivational message occasionally (30% chance)
      if (Math.random() < 0.3) {
        setTimeout(() => addMotivationalMessage(), 1000);
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
        products: response.data.products,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, botMessage]);
        setTypingEffect(false);
      }, 1500);

    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Oops! Something went wrong, but don\'t worry - we\'ll get back on track! 💪',
        sender: 'bot',
        timestamp: new Date(),
        isMotivational: true,
        emoji: '💪'
      };
      setMessages(prev => [...prev, errorMessage]);
      setTypingEffect(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
    onClose();
  };

  const suggestedQuestions = [
    'What are the best protein types for muscle building? 💪',
    'I need protein for weight loss 🏃‍♂️',
    'What is creatine and how does it work? ⚡',
    'I want vegan supplements 🌱',
    'What are the protein prices? 💰',
    'How much protein should I take daily? 📊',
    'What supplements help with recovery? 🔄',
    'Give me a workout motivation! 🎯'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px] bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-4 rounded-t-2xl relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-2 left-2 animate-bounce">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute top-4 right-4 animate-pulse">
            <Star className="w-3 h-3" />
          </div>
          <div className="absolute bottom-2 left-4 animate-spin">
            <Trophy className="w-3 h-3" />
          </div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img 
                src="/muscle-icon.png" 
                alt="Muscle Icon" 
                className="w-6 h-6 animate-pulse"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <CardTitle className="text-lg font-bold">AI Fitness Coach</CardTitle>
              <p className="text-xs opacity-90">Always here to motivate you! 💪</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-blue-50/50 to-purple-50/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : message.isMotivational
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse'
                  : 'bg-white border border-blue-100 shadow-md'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && (
                  <div className="relative">
                    <img 
                      src="/muscle-icon.png" 
                      alt="Muscle Icon" 
                      className={`w-5 h-5 mt-1 flex-shrink-0 ${
                        message.isMotivational ? 'animate-bounce' : 'animate-pulse'
                      }`}
                    />
                    {message.isMotivational && (
                      <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300" />
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">
                    {message.emoji && <span className="mr-2">{message.emoji}</span>}
                    {message.text}
                  </p>

                  {/* Product suggestions */}
                  {message.products && message.products.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <p className="text-xs font-semibold text-blue-600">
                          Recommended Products:
                        </p>
                      </div>
                      {message.products.map((product) => (
                        <Card
                          key={product._id}
                          className="cursor-pointer hover:bg-blue-50 transition-all duration-300 border-blue-200 hover:border-blue-400 hover:shadow-md"
                          onClick={() => handleProductClick(product._id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image.startsWith('/') ? `http://localhost:5000${product.image}` : product.image}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg border-2 border-blue-200"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                                <p className="text-xs text-gray-600 capitalize">{product.category}</p>
                                <p className="text-sm font-bold text-blue-600">{product.price} ₪</p>
                              </div>
                              <Zap className="w-4 h-4 text-blue-500" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="relative">
                    <User className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src="/muscle-icon.png" 
                    alt="Muscle Icon" 
                    className="w-5 h-5 animate-bounce"
                  />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <p className="text-sm font-semibold text-blue-600">Quick Questions:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputMessage(question);
                  setTimeout(() => sendMessage(), 100);
                }}
                className="text-xs bg-white hover:bg-blue-50 border-blue-200 hover:border-blue-400 transition-all duration-300"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-blue-100 bg-white">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about fitness... 💪"
            disabled={isLoading}
            className="flex-1 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputMessage.trim() || isLoading}
            size="icon"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
