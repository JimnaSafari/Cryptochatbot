from crypto_data import crypto_db

class CryptoBuddy:
    def __init__(self):
        self.crypto_db = crypto_db

    def get_most_sustainable(self):
        """Returns the cryptocurrency with the highest sustainability score."""
        return max(self.crypto_db.items(), key=lambda x: x[1]["sustainability_score"])[0]

    def get_trending_coins(self):
        """Returns a list of cryptocurrencies with rising price trends."""
        return [name for name, data in self.crypto_db.items() 
                if data["price_trend"] == "rising"]

    def get_long_term_recommendation(self):
        """Returns the best cryptocurrency for long-term investment."""
        suitable_coins = [(name, data) for name, data in self.crypto_db.items() 
                         if data["market_cap"] == "high" and data["sustainability_score"] >= 5]
        return max(suitable_coins, key=lambda x: x[1]["sustainability_score"])[0]

    def process_query(self, query):
        """Process user query and return appropriate response."""
        query = query.lower()

        # Check for sustainability-related queries
        if any(word in query for word in ["sustainable", "eco", "green"]):
            recommend = self.get_most_sustainable()
            return f"🌱 {recommend} is the most sustainable option! It has a high sustainability score and low energy usage."

        # Check for trending queries
        if any(word in query for word in ["trend", "trending", "up"]):
            trending = self.get_trending_coins()
            return f"📈 Here are the trending cryptocurrencies: {', '.join(trending)}"

        # Check for long-term investment queries
        if any(phrase in query for phrase in ["long term", "long-term", "growth"]):
            long_term = self.get_long_term_recommendation()
            return f"🚀 For long-term growth, I recommend {long_term}. It has a good balance of market cap and sustainability!"

        # Default response
        return ("I'm CryptoBuddy, your friendly crypto advisor! Ask me about sustainable coins, "
                "trending cryptocurrencies, or long-term investment options. "
                "Remember: Crypto is risky—always do your own research! 📊")

def main():
    chatbot = CryptoBuddy()
    print("👋 Hi! I'm CryptoBuddy, your friendly crypto advisor!")
    print("Type 'quit' to exit the chat.")
    
    while True:
        user_input = input("\nYou: ").strip()
        if user_input.lower() == 'quit':
            print("\nGoodbye! Remember to do your own research! 👋")
            break
            
        response = chatbot.process_query(user_input)
        print(f"\nCryptoBuddy: {response}")

if __name__ == "__main__":
    main() 