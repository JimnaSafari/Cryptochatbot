
import { useState } from 'react';
import { MessageCircle, TrendingUp, Shield, Zap } from 'lucide-react';
import ChatInterface from '../components/ChatInterface';
import CryptoData from '../components/CryptoData';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                <TrendingUp className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              CryptoBot
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                AI Financial Sidekick
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Your first AI-powered cryptocurrency advisor! Get personalized investment recommendations 
              based on your risk tolerance, budget, and investment goals.
            </p>
            
            {!showChat ? (
              <button
                onClick={() => setShowChat(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Start Chatting with CryptoBot
              </button>
            ) : (
              <div className="max-w-4xl mx-auto">
                <ChatInterface />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {!showChat && (
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-purple-500/20">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Risk Assessment</h3>
              <p className="text-gray-400">Personalized recommendations based on your risk tolerance and investment goals.</p>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-blue-500/20">
              <TrendingUp className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Market Analysis</h3>
              <p className="text-gray-400">Real-time analysis of 5 major cryptocurrencies including price trends and adoption.</p>
            </div>
            <div className="text-center p-6 bg-slate-800/50 rounded-xl border border-green-500/20">
              <Zap className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Advice</h3>
              <p className="text-gray-400">AI-powered recommendations considering sustainability and project viability.</p>
            </div>
          </div>

          <CryptoData />
        </div>
      )}
    </div>
  );
};

export default Index;
