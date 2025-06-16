
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cryptoData, getCryptoRecommendation } from '../utils/cryptoAnalyzer';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface UserPreferences {
  riskTolerance: string;
  budget: number;
  timeHorizon: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    riskTolerance: '',
    budget: 0,
    timeHorizon: ''
  });
  const [currentStep, setCurrentStep] = useState('greeting');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial greeting
    addBotMessage("Hello! 👋 I'm CryptoBot, your AI-powered cryptocurrency advisor! I'm here to help you navigate the crypto world safely and make informed investment decisions.");
    setTimeout(() => {
      addBotMessage("To get started, I'd like to understand your investment preferences. What's your risk tolerance? Please type: 'low', 'medium', or 'high'");
    }, 1500);
  }, []);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage(text, true);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addMessage(input, false);
    processUserInput(input.toLowerCase().trim());
    setInput('');
  };

  const processUserInput = (userInput: string) => {
    switch (currentStep) {
      case 'greeting':
        if (['low', 'medium', 'high'].includes(userInput)) {
          setUserPreferences(prev => ({ ...prev, riskTolerance: userInput }));
          setCurrentStep('budget');
          addBotMessage(`Great! You selected ${userInput} risk tolerance. Now, what's your investment budget in USD? Please enter a number (e.g., 1000)`);
        } else {
          addBotMessage("Please specify your risk tolerance as 'low', 'medium', or 'high'.");
        }
        break;

      case 'budget':
        const budget = parseFloat(userInput.replace(/[$,]/g, ''));
        if (!isNaN(budget) && budget > 0) {
          setUserPreferences(prev => ({ ...prev, budget }));
          setCurrentStep('timeHorizon');
          addBotMessage(`Perfect! $${budget.toLocaleString()} budget noted. What's your investment time horizon? Please type: 'short' (less than 1 year), 'medium' (1-3 years), or 'long' (3+ years)`);
        } else {
          addBotMessage("Please enter a valid budget amount (numbers only, e.g., 1000).");
        }
        break;

      case 'timeHorizon':
        if (['short', 'medium', 'long'].includes(userInput)) {
          const updatedPreferences = { ...userPreferences, timeHorizon: userInput };
          setUserPreferences(updatedPreferences);
          setCurrentStep('recommendation');
          
          const recommendation = getCryptoRecommendation(updatedPreferences);
          addBotMessage(`Excellent! Based on your preferences:
🎯 Risk Tolerance: ${updatedPreferences.riskTolerance}
💰 Budget: $${updatedPreferences.budget.toLocaleString()}
⏰ Time Horizon: ${updatedPreferences.timeHorizon}-term

${recommendation}

Would you like to know more about any specific cryptocurrency or ask me another question?`);
        } else {
          addBotMessage("Please specify your time horizon as 'short', 'medium', or 'long'.");
        }
        break;

      case 'recommendation':
        if (userInput.includes('bitcoin') || userInput.includes('btc')) {
          const btc = cryptoData.Bitcoin;
          addBotMessage(`Bitcoin (BTC) Analysis:
💲 Current Price: $${btc.price.toLocaleString()}
📈 30-day Change: ${btc['30d_change']}%
⚡ Energy Efficiency: ${btc.energy_efficiency}
🏢 Adoption Level: ${btc.adoption}

Bitcoin is considered the "digital gold" and is often recommended for conservative investors due to its established market presence and relatively lower volatility compared to other cryptocurrencies.`);
        } else if (userInput.includes('ethereum') || userInput.includes('eth')) {
          const eth = cryptoData.Ethereum;
          addBotMessage(`Ethereum (ETH) Analysis:
💲 Current Price: $${eth.price.toLocaleString()}
📈 30-day Change: ${eth['30d_change']}%
⚡ Energy Efficiency: ${eth.energy_efficiency}
🏢 Adoption Level: ${eth.adoption}

Ethereum is the world's second-largest cryptocurrency and powers smart contracts and DeFi applications. It's great for medium-risk investors interested in blockchain technology's future.`);
        } else if (userInput.includes('litecoin') || userInput.includes('ltc')) {
          const ltc = cryptoData.Litecoin;
          addBotMessage(`Litecoin (LTC) Analysis:
💲 Current Price: $${ltc.price.toLocaleString()}
📈 30-day Change: ${ltc['30d_change']}%
⚡ Energy Efficiency: ${ltc.energy_efficiency}
🏢 Adoption Level: ${ltc.adoption}

Litecoin is often called "digital silver" and offers faster transaction times than Bitcoin. It's suitable for conservative to moderate investors.`);
        } else if (userInput.includes('dogecoin') || userInput.includes('doge')) {
          const doge = cryptoData.Dogecoin;
          addBotMessage(`Dogecoin (DOGE) Analysis:
💲 Current Price: $${doge.price}
📈 30-day Change: ${doge['30d_change']}%
⚡ Energy Efficiency: ${doge.energy_efficiency}
🏢 Adoption Level: ${doge.adoption}

Dogecoin started as a meme but has gained significant adoption. It's highly volatile and suitable for high-risk investors who understand meme coin dynamics.`);
        } else if (userInput.includes('binance') || userInput.includes('bnb')) {
          const bnb = cryptoData['Binance Coin'];
          addBotMessage(`Binance Coin (BNB) Analysis:
💲 Current Price: $${bnb.price.toLocaleString()}
📈 30-day Change: ${bnb['30d_change']}%
⚡ Energy Efficiency: ${bnb.energy_efficiency}
🏢 Adoption Level: ${bnb.adoption}

BNB is the native token of the world's largest crypto exchange. It offers utility within the Binance ecosystem and is suitable for medium-risk investors.`);
        } else if (userInput.includes('why') || userInput.includes('explain')) {
          addBotMessage(`Great question! My recommendations are based on several factors:

🔍 **Risk Assessment**: I match cryptocurrencies to your risk tolerance
📊 **Market Performance**: I analyze 30-day price changes and trends  
⚡ **Sustainability**: I consider energy efficiency for long-term viability
🏢 **Adoption**: I evaluate real-world usage and acceptance
💰 **Budget Matching**: I ensure recommendations fit your investment capacity

This multi-factor analysis helps ensure you get personalized advice that aligns with your investment goals and comfort level.`);
        } else {
          addBotMessage("I can provide detailed analysis on Bitcoin, Ethereum, Litecoin, Dogecoin, or Binance Coin. You can also ask me to explain my recommendations or ask any other crypto-related questions!");
        }
        break;
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-2xl">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">CryptoBot</h3>
            <p className="text-sm text-gray-400">Your AI Crypto Advisor</p>
          </div>
        </div>
      </div>

      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.isBot
                  ? 'bg-slate-700 text-white'
                  : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.isBot && (
                  <Bot className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                )}
                <div className="text-sm whitespace-pre-line">{message.text}</div>
                {!message.isBot && (
                  <User className="h-4 w-4 mt-0.5 text-white flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-white px-4 py-3 rounded-lg max-w-xs">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4 text-purple-400" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-slate-700">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          ⚠️ Disclaimer: This is for educational purposes only. Always do your own research before investing.
        </p>
      </form>
    </div>
  );
};

export default ChatInterface;
