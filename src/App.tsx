import { Chat } from './components/Chat'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          CryptoBuddy - Your AI Cryptocurrency Advisor
        </h1>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              About CryptoBuddy
            </h2>
            <p className="text-gray-600">
              CryptoBuddy is your friendly AI-powered cryptocurrency advisor. I analyze cryptocurrency data and provide investment advice based on profitability and sustainability. Ask me about:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-600">
              <li>Which cryptocurrencies are trending up</li>
              <li>What are the most sustainable coins</li>
              <li>Long-term investment recommendations</li>
            </ul>
            <p className="mt-4 text-sm text-red-600">
              ⚠️ Disclaimer: Crypto is risky—always do your own research!
            </p>
          </div>
          <Chat />
        </div>
      </div>
    </div>
  )
}

export default App
