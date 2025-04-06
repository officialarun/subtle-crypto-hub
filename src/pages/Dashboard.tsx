
import React from 'react';
import Header from '@/components/dashboard/Header';
import AppSidebar from '@/components/dashboard/AppSidebar';
import BalanceCard from '@/components/dashboard/BalanceCard';
import CryptoList from '@/components/dashboard/CryptoList';
import BottomNavigation from '@/components/dashboard/BottomNavigation';
import { SidebarProvider } from '@/components/ui/sidebar';

const Dashboard: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 pb-20 md:pb-6 bg-background overflow-y-auto">
            <div className="container max-w-6xl mx-auto space-y-6">
              <BalanceCard />
              
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
