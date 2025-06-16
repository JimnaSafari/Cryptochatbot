import { crypto_db, CryptoDatabase } from '../data/cryptoData';

export class ChatbotService {
  private static instance: ChatbotService;
  private crypto_db: CryptoDatabase;

  private constructor() {
    this.crypto_db = crypto_db;
  }

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  public processQuery(query: string): string {
    const lowerQuery = query.toLowerCase();

    // Check for sustainability-related queries
    if (lowerQuery.includes('sustainable') || lowerQuery.includes('eco') || lowerQuery.includes('green')) {
      const recommend = this.getMostSustainable();
      return `🌱 ${recommend} is the most sustainable option! It has a high sustainability score and low energy usage.`;
    }

    // Check for trending queries
    if (lowerQuery.includes('trend') || lowerQuery.includes('trending') || lowerQuery.includes('up')) {
      const trending = this.getTrendingCoins();
      return `📈 Here are the trending cryptocurrencies: ${trending.join(', ')}`;
    }

    // Check for long-term investment queries
    if (lowerQuery.includes('long term') || lowerQuery.includes('long-term') || lowerQuery.includes('growth')) {
      const longTerm = this.getLongTermRecommendation();
      return `🚀 For long-term growth, I recommend ${longTerm}. It has a good balance of market cap and sustainability!`;
    }

    // Default response
    return "I'm CryptoBuddy, your friendly crypto advisor! Ask me about sustainable coins, trending cryptocurrencies, or long-term investment options. Remember: Crypto is risky—always do your own research! 📊";
  }

  private getMostSustainable(): string {
    return Object.entries(this.crypto_db)
      .sort(([, a], [, b]) => b.sustainability_score - a.sustainability_score)[0][0];
  }

  private getTrendingCoins(): string[] {
    return Object.entries(this.crypto_db)
      .filter(([, data]) => data.price_trend === 'rising')
      .map(([name]) => name);
  }

  private getLongTermRecommendation(): string {
    return Object.entries(this.crypto_db)
      .filter(([, data]) => data.market_cap === 'high' && data.sustainability_score >= 5)
      .sort(([, a], [, b]) => b.sustainability_score - a.sustainability_score)[0][0];
  }
} 