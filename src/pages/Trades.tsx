import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  change24h: number;
}

const mockCryptos: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: 3500000,
    change24h: 2.5
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    currentPrice: 200000,
    change24h: -1.2
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    currentPrice: 25000,
    change24h: 0.8
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    currentPrice: 5000,
    change24h: 5.3
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    currentPrice: 45,
    change24h: -0.5
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    currentPrice: 500,
    change24h: 1.8
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    currentPrice: 35,
    change24h: -2.1
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    currentPrice: 8,
    change24h: 3.2
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    currentPrice: 2000,
    change24h: 4.5
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    currentPrice: 80,
    change24h: -1.5
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    currentPrice: 1200,
    change24h: 2.3
  },
  {
    id: 'litecoin',
    name: 'Litecoin',
    symbol: 'LTC',
    currentPrice: 6000,
    change24h: -0.8
  }
];

const CryptoCard: React.FC<{ crypto: CryptoCurrency }> = ({ crypto }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gray-50 p-2 rounded-lg">
            <span className="text-lg font-semibold text-gray-700">{crypto.symbol}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{crypto.name}</h3>
            <p className="text-sm text-muted-foreground">24h Change</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-gray-900">₹{crypto.currentPrice.toLocaleString()}</p>
          <p className={`text-sm font-medium ${crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h}%
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 border-green-200 h-10 font-medium"
        >
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Buy
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-red-200 h-10 font-medium"
        >
          <ArrowDownRight className="h-4 w-4 mr-2" />
          Sell
        </Button>
      </div>
    </div>
  );
};

const Trades: React.FC = () => {
  return (
    <div className="container max-w-6xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Available Cryptocurrencies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Trades; 