
import React from 'react';
import { Home, TrendingUp, Wallet, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { icon: Home, label: 'Main Menu', route: '/dashboard' },
    { icon: TrendingUp, label: 'Trades', route: '/trades' },
    { icon: Wallet, label: 'Deposits', route: '/deposits' },
    { icon: User, label: 'User ID', route: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 md:hidden z-10">
      <div className="flex justify-between">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="flex flex-col items-center py-2 flex-1"
            onClick={() => navigate(item.route)}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
