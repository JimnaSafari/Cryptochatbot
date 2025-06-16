
export const cryptoData = {
  "Bitcoin": { "price": 45000, "30d_change": 12.5, "energy_efficiency": "Low", "adoption": "High" },
  "Ethereum": { "price": 3200, "30d_change": 8.3, "energy_efficiency": "Medium", "adoption": "High" },
  "Litecoin": { "price": 180, "30d_change": -2.1, "energy_efficiency": "Medium", "adoption": "Medium" },
  "Dogecoin": { "price": 0.25, "30d_change": 45.2, "energy_efficiency": "Low", "adoption": "Medium" },
  "Binance Coin": { "price": 320, "30d_change": 15.7, "energy_efficiency": "High", "adoption": "High" }
};

interface UserPreferences {
  riskTolerance: string;
  budget: number;
  timeHorizon: string;
}

export const getCryptoRecommendation = (preferences: UserPreferences): string => {
  const { riskTolerance, budget, timeHorizon } = preferences;

  // Analyze based on risk tolerance
  if (riskTolerance === 'low') {
    if (timeHorizon === 'long') {
      return `🏆 **My Recommendation: Bitcoin (BTC)**

For low-risk, long-term investors, Bitcoin is your best bet! Here's why:
✅ Most established cryptocurrency with highest adoption
✅ Often called "digital gold" - store of value
✅ Less volatile than smaller cryptocurrencies
✅ Strong institutional support

With your $${budget.toLocaleString()} budget, you could acquire ${(budget / cryptoData.Bitcoin.price).toFixed(6)} BTC.`;
    } else {
      return `🏆 **My Recommendation: Bitcoin (BTC) or Ethereum (ETH)**

For low-risk, shorter-term investments, consider:
1. **Bitcoin**: Most stable, current price $${cryptoData.Bitcoin.price.toLocaleString()}
2. **Ethereum**: Strong technology foundation, current price $${cryptoData.Ethereum.price.toLocaleString()}

Both have high adoption and are less likely to experience extreme volatility.`;
    }
  } else if (riskTolerance === 'medium') {
    if (budget >= 5000) {
      return `🏆 **My Recommendation: Ethereum (ETH) + Bitcoin (BTC) Portfolio**

For medium-risk investors with a solid budget:
✅ **70% Ethereum** - Strong growth potential, powers DeFi and NFTs
✅ **30% Bitcoin** - Stability anchor for your portfolio

This gives you exposure to both established stability and growth potential.`;
    } else {
      return `🏆 **My Recommendation: Ethereum (ETH)**

Perfect for medium-risk investors! Here's why:
✅ Second-largest cryptocurrency by market cap
✅ Powers smart contracts and decentralized applications
✅ Good balance of stability and growth potential
✅ Strong developer ecosystem

Current price: $${cryptoData.Ethereum.price.toLocaleString()} - you could get ${(budget / cryptoData.Ethereum.price).toFixed(4)} ETH.`;
    }
  } else { // high risk
    return `🏆 **My Recommendation: Diversified High-Growth Portfolio**

For high-risk investors, consider spreading across:
1. **Dogecoin (DOGE)** - Massive 45.2% 30-day gain! High volatility = high potential
2. **Binance Coin (BNB)** - Strong exchange utility, 15.7% recent growth
3. **Ethereum (ETH)** - Solid foundation for portfolio stability

⚠️ **High-risk reminder**: Only invest what you can afford to lose. These recommendations show high growth potential but come with significant volatility.`;
  }
};

export const getDetailedAnalysis = (cryptoName: string) => {
  const crypto = cryptoData[cryptoName as keyof typeof cryptoData];
  if (!crypto) return "Cryptocurrency not found in our database.";

  const riskLevel = crypto['30d_change'] > 20 ? 'High' : crypto['30d_change'] > 0 ? 'Medium' : 'Low';
  
  return `
**${cryptoName} Detailed Analysis:**
💲 Price: $${crypto.price.toLocaleString()}
📈 30-day Performance: ${crypto['30d_change']}%
⚡ Energy Efficiency: ${crypto.energy_efficiency}
🏢 Market Adoption: ${crypto.adoption}
🎯 Risk Level: ${riskLevel}
  `;
};
