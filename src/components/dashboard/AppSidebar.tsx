import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Home, TrendingUp, Wallet, User, History, LogOut, Settings, HelpCircle } from 'lucide-react';
import Logo from '../Logo';

export function AppSidebar() {
  const navigate = useNavigate();

  const mainMenuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      onClick: () => navigate('/dashboard'),
      active: true,
    },
    {
      title: 'Trades',
      icon: TrendingUp,
      onClick: () => navigate('/trades'),
    },
    {
      title: 'Deposits',
      icon: Wallet,
      onClick: () => navigate('/deposits'),
    },
    {
      title: 'Profile',
      icon: User,
      onClick: () => navigate('/profile'),
    },
  ];

  const secondaryMenuItems = [
    {
      title: 'History',
      icon: History,
      onClick: () => navigate('/history'),
    },
    {
      title: 'Settings',
      icon: Settings,
      onClick: () => navigate('/settings'),
    },
    {
      title: 'Help',
      icon: HelpCircle,
      onClick: () => navigate('/help'),
    },
    {
      title: 'Logout',
      icon: LogOut,
      onClick: () => navigate('/'),
    },
  ];

  return (
    <Sidebar>
      <div className="pt-6 pb-2 px-3">
        <Logo />
      </div>
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={item.active ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}
                    onClick={item.onClick}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="h-px bg-sidebar-border my-4" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={item.onClick}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
