import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, X, Bot, User, Sparkles, Trophy, Target, Zap, Star, Heart, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import muscleIcon from '@/assets/muscle-icon.png';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  products?: any[];
  isMotivational?: boolean;
  emoji?: string;
  type?: 'text' | 'product' | 'motivation';
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
      emoji: '🔥',
      type: 'motivation'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingEffect, setTypingEffect] = useState(false);
  const [userName, setUserName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response system
  const getSmartResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Product recommendations
    if (lowerMessage.includes('protein') || lowerMessage.includes('بروتين')) {
      return `Great choice! Here are our premium protein options: 💪

🏆 **Clear Whey Protein** - $174.22
   • Refreshing clear formula
   • 20g protein per serving
   • Perfect for those who want a light option

💪 **Impact Whey Isolate** - $153.00
   • 25g protein per serving
   • Low carbs and fat
   • Fast absorption for muscle recovery

🎯 **Impact Diet Whey** - $187.68
   • Weight management focused
   • 22g protein with fat-burning ingredients
   • Perfect for cutting phases

Which one interests you most? I can provide more details! 🚀`;
    }
    
    if (lowerMessage.includes('creatine') || lowerMessage.includes('كرياتين')) {
      return `Creatine is the GOAT for strength and power! ⚡

💪 **Impact Creatine** - $32.85
   • Pure creatine monohydrate
   • No fillers or additives
   • Gold standard for performance

🏋️ **Creatine Monohydrate** - $29.99
   • 100% pure formula
   • No loading phase required
   • Increases strength and muscle mass

💊 **Creatine Capsules** - $34.99
   • Convenient capsule form
   • No mixing required
   • Same benefits as powder

Take 5g daily for maximum results! Want to know more about dosage? 💪`;
    }
    
    if (lowerMessage.includes('vegan') || lowerMessage.includes('نباتي')) {
      return `Perfect for plant-based athletes! 🌱

🌿 **Vegan Protein Blend** - $54.99
   • Pea and rice protein blend
   • Complete amino acid profile
   • 22g protein per serving
   • Easily digestible

🌱 **Vegan BCAA** - $39.99
   • Plant-based amino acids
   • Perfect for muscle recovery
   • Prevents muscle breakdown

All our vegan options are certified and perfect for your plant-based lifestyle! 🌱`;
    }
    
    // Price inquiries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('سعر')) {
      return `Here are our current prices: 💰

**Protein Supplements:**
• Clear Whey Protein: $174.22
• Impact Whey Isolate: $153.00
• Impact Diet Whey: $187.68

**Creatine Supplements:**
• Impact Creatine: $32.85
• Creatine Monohydrate: $29.99
• Creatine Capsules: $34.99

**Vegan Supplements:**
• Vegan Protein Blend: $54.99
• Vegan BCAA: $39.99

🎉 **Special Offers:**
• Free shipping on orders over $50
• Bundle discounts available
• Loyalty rewards program

Want to see our current promotions? 🎯`;
    }
    
    // Motivation requests
    if (lowerMessage.includes('motivation') || lowerMessage.includes('motivate') || lowerMessage.includes('تحفيز')) {
      return `You've got this! 💪

🔥 **Remember:** Consistency beats perfection every time. Every workout, every healthy meal, every supplement - it all adds up to the stronger, healthier version of yourself!

💎 **Today's Motivation:** 
"Your body can stand almost anything. It's your mind you have to convince."

🚀 **Pro Tips:**
• Set small, achievable goals
• Track your progress
• Celebrate every win, no matter how small
• Surround yourself with positive people

You're stronger than you think! Keep pushing forward! 💪`;
    }
    
    // Workout advice
    if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('تمرين')) {
      return `Let's get you moving! 🏋️

💪 **Strength Training (3-4x/week):**
• Compound movements (squats, deadlifts, bench press)
• Progressive overload
• 8-12 reps per set
• 2-3 minutes rest between sets

🏃‍♂️ **Cardio (2-3x/week):**
• 20-30 minutes moderate intensity
• HIIT sessions for fat burning
• Walking, running, cycling

🧘‍♀️ **Recovery:**
• 7-9 hours sleep
• Proper nutrition
• Stretching and mobility work
• Rest days are crucial!

Need a specific workout plan? I can help! 💪`;
    }
    
    // Nutrition advice
    if (lowerMessage.includes('nutrition') || lowerMessage.includes('diet') || lowerMessage.includes('تغذية')) {
      return `Nutrition is 80% of your results! 🥗

🍗 **Protein:** 1.6-2.2g per kg body weight
🥑 **Healthy Fats:** 20-35% of daily calories
🍞 **Complex Carbs:** 45-65% of daily calories
💧 **Water:** 3-4 liters daily

📊 **Meal Timing:**
• Pre-workout: 2-3 hours before
• Post-workout: Within 30 minutes
• Protein every 3-4 hours

🎯 **Supplements to Consider:**
• Protein powder for convenience
• Creatine for strength
• Multivitamin for overall health
• Omega-3 for recovery

Want a personalized nutrition plan? 💪`;
    }
    
    // General fitness questions
    if (lowerMessage.includes('fitness') || lowerMessage.includes('health') || lowerMessage.includes('صحة')) {
      return `Fitness is a journey, not a destination! 🎯

🌟 **Key Principles:**
• Consistency over intensity
• Progressive overload
• Proper form first
• Rest and recovery

💪 **Start Here:**
1. Set clear, achievable goals
2. Create a sustainable routine
3. Focus on compound movements
4. Track your progress
5. Stay consistent

🔥 **Remember:** Every expert was once a beginner. Start where you are, use what you have, do what you can!

Need help getting started? I'm here for you! 💪`;
    }
    
    // Default response
    return `Thanks for your message! I'm here to help with: 💪

• **Protein supplements** - Building muscle
• **Creatine** - Strength and power
• **Vegan options** - Plant-based nutrition
• **Workout advice** - Training programs
• **Nutrition tips** - Diet guidance
• **Motivation** - Mental strength

What would you like to know about? I'm excited to help you reach your goals! 🚀`;
  };

  const addMotivationalMessage = () => {
    const motivationalMessages = [
      { text: "You're doing amazing! Keep pushing forward! 🚀", emoji: "🚀" },
      { text: "Every step counts towards your goals! 💪", emoji: "💪" },
      { text: "You've got this! Your future self will thank you! ⭐", emoji: "⭐" },
      { text: "Consistency is the key to success! 🔑", emoji: "🔑" },
      { text: "You're stronger than you think! 💎", emoji: "💎" },
      { text: "Today's effort is tomorrow's strength! 💪", emoji: "💪" },
      { text: "Small progress is still progress! 🎯", emoji: "🎯" },
      { text: "Your dedication inspires others! 🌟", emoji: "🌟" }
    ];
    
    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
    
    const motivationalMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: randomMessage.text,
      sender: 'bot',
      timestamp: new Date(),
      isMotivational: true,
      emoji: randomMessage.emoji,
      type: 'motivation'
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

    // Get smart response
    const response = getSmartResponse(inputMessage);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, botMessage]);
      setTypingEffect(false);
    }, 1500);

    // Add motivational message occasionally (20% chance)
    if (Math.random() < 0.2) {
      setTimeout(() => addMotivationalMessage(), 3000);
    }

    setIsLoading(false);
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
    'Give me workout motivation! 🎯',
    'What\'s the best pre-workout routine? 🏋️'
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
          <div className="absolute bottom-2 left-4 animate-ping">
            <Trophy className="w-4 h-4" />
          </div>
        </div>
        
        {/* Header content */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={muscleIcon} 
                alt="Muscle Icon" 
                className="w-8 h-8 rounded-full"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            </div>
            <div>
              <h3 className="font-bold text-sm">AI Fitness Coach</h3>
              <p className="text-xs opacity-90">Always here to motivate you! 💪</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`rounded-2xl p-3 ${
                message.sender === 'user' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : message.isMotivational
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                    : 'bg-white border border-blue-100 shadow-md'
              }`}>
                <div className="flex items-start gap-2">
                  <div className="flex-1">
                    <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    {message.emoji && (
                      <div className="mt-1">
                        <span className="text-lg">{message.emoji}</span>
                      </div>
                    )}
                  </div>
                  {message.sender === 'bot' && (
                    <div className="relative">
                      <img 
                        src={muscleIcon} 
                        alt="Muscle Icon" 
                        className="w-5 h-5 mt-1 flex-shrink-0"
                      />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
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
                    src={muscleIcon} 
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
