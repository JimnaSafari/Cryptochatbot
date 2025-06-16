export interface CryptoData {
  price_trend: 'rising' | 'stable' | 'falling';
  market_cap: 'high' | 'medium' | 'low';
  energy_use: 'high' | 'medium' | 'low';
  sustainability_score: number;
}

export interface CryptoDatabase {
  [key: string]: CryptoData;
}

export const crypto_db: CryptoDatabase = {
  "Bitcoin": {
    "price_trend": "rising",
    "market_cap": "high",
    "energy_use": "high",
    "sustainability_score": 3
  },
  "Ethereum": {
    "price_trend": "stable",
    "market_cap": "high",
    "energy_use": "medium",
    "sustainability_score": 6
  },
  "Cardano": {
    "price_trend": "rising",
    "market_cap": "medium",
    "energy_use": "low",
    "sustainability_score": 8
  }
}; 