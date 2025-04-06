
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  icon: string;
}

const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 62345.78,
    change24h: 2.45,
    icon: '₿',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3456.12,
    change24h: -0.82,
    icon: 'Ξ',
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 172.39,
    change24h: 5.67,
    icon: 'Ṩ',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.45,
    change24h: -1.23,
    icon: '₳',
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    price: 587.29,
    change24h: 1.12,
    icon: 'Ḇ',
  },
  {
    id: 'ripple',
    name: 'Ripple',
    symbol: 'XRP',
    price: 0.58,
    change24h: 0.32,
    icon: '✕',
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.13,
    change24h: 8.91,
    icon: 'Ð',
  },
  {
    id: 'polkadot',
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.82,
    change24h: -2.10,
    icon: '◌',
  },
];

const CryptoList: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Market Prices</h2>
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {mockCryptoData.map((crypto) => (
          <div key={crypto.id} className="crypto-card">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-lg font-medium mr-3">
                {crypto.icon}
              </div>
              <div>
                <h3 className="font-medium">{crypto.name}</h3>
                <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${crypto.price.toLocaleString()}</p>
              <div className={`flex items-center justify-end text-sm ${crypto.change24h >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {crypto.change24h >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {Math.abs(crypto.change24h)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CryptoList;
