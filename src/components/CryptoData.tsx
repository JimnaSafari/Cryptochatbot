
import { TrendingUp, TrendingDown, Zap, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cryptoData } from '../utils/cryptoAnalyzer';

const CryptoData = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Live Cryptocurrency Data</h2>
        <p className="text-gray-400">Current market data for the cryptocurrencies analyzed by CryptoBot</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(cryptoData).map(([name, data]) => {
          const isPositive = data['30d_change'] > 0;
          const getRiskColor = (change: number) => {
            if (change > 20) return 'bg-red-500';
            if (change > 0) return 'bg-yellow-500';
            return 'bg-green-500';
          };

          return (
            <Card key={name} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center justify-between">
                  <span>{name}</span>
                  <Badge 
                    variant="secondary" 
                    className={`${getRiskColor(data['30d_change'])} text-white`}
                  >
                    {Math.abs(data['30d_change']) > 20 ? 'High Risk' : 
                     data['30d_change'] > 0 ? 'Med Risk' : 'Low Risk'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="text-2xl font-bold text-white">
                    ${data.price.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">30d Change</span>
                  <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="font-semibold">{data['30d_change']}%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Zap className="h-4 w-4 mr-2" />
                      <span>Energy Efficiency</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        data.energy_efficiency === 'High' ? 'border-green-500 text-green-400' :
                        data.energy_efficiency === 'Medium' ? 'border-yellow-500 text-yellow-400' :
                        'border-red-500 text-red-400'
                      }`}
                    >
                      {data.energy_efficiency}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-400">
                      <Building2 className="h-4 w-4 mr-2" />
                      <span>Adoption</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${
                        data.adoption === 'High' ? 'border-blue-500 text-blue-400' :
                        'border-purple-500 text-purple-400'
                      }`}
                    >
                      {data.adoption}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>⚠️ This data is for educational purposes only. Always conduct your own research before making investment decisions.</p>
      </div>
    </div>
  );
};

export default CryptoData;
