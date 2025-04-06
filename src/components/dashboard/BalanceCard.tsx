
import React from 'react';
import { ArrowUpRight, ArrowDownRight, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const BalanceCard: React.FC = () => {
  const copyUserId = () => {
    navigator.clipboard.writeText('CR12345678');
    toast.success('User ID copied to clipboard');
  };

  return (
    <div className="glass-card p-6 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in">
      <div className="space-y-1 mb-4 md:mb-0">
        <h2 className="text-lg font-medium text-muted-foreground">Total Balance</h2>
        <p className="text-3xl font-bold">$12,456.78</p>
        <div className="flex items-center text-sm text-emerald-600">
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>+5.23% this week</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          Deposit
        </Button>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <ArrowDownRight className="h-4 w-4 mr-2" />
          Trade
        </Button>
        <Button variant="outline" onClick={copyUserId}>
          <Copy className="h-4 w-4 mr-2" />
          User ID: CR12345678
        </Button>
      </div>
    </div>
  );
};

export default BalanceCard;
