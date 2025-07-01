
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  GraduationCap, 
  Users, 
  UserPlus, 
  BarChart3, 
  Settings, 
  LogOut,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppSidebar = ({ activeTab, setActiveTab }: AppSidebarProps) => {
  const { logout, user } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'add-student', label: 'Add Student', icon: UserPlus },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center space-x-3 p-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-xl font-bold text-sidebar-foreground">Scholar Records</h1>
            <p className="text-sm text-sidebar-foreground/70">Management Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={activeTab === item.id}
                      onClick={() => setActiveTab(item.id)}
                      className="w-full"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="p-4 space-y-3">
          <div className="group-data-[collapsible=icon]:hidden p-3 bg-sidebar-accent rounded-lg">
            <p className="text-sm font-medium text-sidebar-foreground">Welcome,</p>
            <p className="text-xs text-sidebar-foreground/70">{user?.username} ({user?.role})</p>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={logout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
