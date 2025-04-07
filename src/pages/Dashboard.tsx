import React, { useState, useEffect } from 'react';
import Header from '@/components/dashboard/Header';
import AppSidebar from '@/components/dashboard/AppSidebar';
import BalanceCard from '@/components/dashboard/BalanceCard';
import CryptoList from '@/components/dashboard/CryptoList';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { SidebarProvider } from '@/components/ui/sidebar';
import { WithdrawalSection } from '@/components/dashboard/WithdrawalSection';
import { userAPI, authAPI } from '@/lib/api';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [balance, setBalance] = useState<number>(0);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceData, profileData] = await Promise.all([
          userAPI.getBalance(token),
          authAPI.getProfile(token)
        ]);
        setBalance(balanceData.balance);
        setProfile(profileData.profile);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 bg-background overflow-y-auto">
            <div className="container max-w-6xl mx-auto space-y-6">
              <BalanceCard balance={balance} />
              {profile && <WithdrawalSection balance={balance} profile={profile} />}
              <div className="mt-8">
                <CryptoList />
              </div>
            </div>
          </main>
          <BottomNavigation />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
