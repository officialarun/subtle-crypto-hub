import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface WithdrawalSectionProps {
  balance: number;
  profile: {
    name: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
  };
}

export const WithdrawalSection: React.FC<WithdrawalSectionProps> = ({ balance, profile }) => {
  const { token } = useAuth();

  const handleWithdrawalRequest = async () => {
    try {
      // This route will be implemented later
      toast.info('Withdrawal request functionality will be available soon');
    } catch (error) {
      toast.error('Failed to process withdrawal request');
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="py-3">
        <CardTitle className="text-lg">Withdrawal Details</CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Available Balance</p>
              <p className="text-xl font-bold">₹{balance.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Withdrawal Method</p>
              <p className="text-base">Bank Transfer</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <h3 className="text-sm font-medium mb-1">Bank Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-gray-500">Account Holder</p>
                <p>{profile.name || 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-500">Bank Name</p>
                <p>{profile.bankName || 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-500">Account Number</p>
                <p>{profile.accountNumber || 'Not set'}</p>
              </div>
              <div>
                <p className="text-gray-500">IFSC Code</p>
                <p>{profile.ifscCode || 'Not set'}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleWithdrawalRequest}
              disabled={!profile.name || !profile.bankName || !profile.accountNumber || !profile.ifscCode}
              size="sm"
            >
              Request Withdrawal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 