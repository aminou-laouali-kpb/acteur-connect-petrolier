import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Building2, Search, FileText, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const menuItems = [
  { title: 'Tableau de bord', url: '/entreprise/dashboard', icon: LayoutDashboard },
  { title: 'Profil entreprise', url: '/entreprise/profil', icon: Building2 },
  { title: 'Opportunités', url: '/entreprise/opportunites', icon: Search },
  { title: 'Candidatures', url: '/entreprise/candidatures', icon: FileText },
  { title: 'Notifications', url: '/entreprise/notifications', icon: Bell },
];

function CompanySidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center shrink-0">
                <span className="text-sidebar-primary-foreground font-heading font-bold text-xs">CL</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-heading font-bold text-sm text-sidebar-foreground truncate">Espace Entreprise</p>
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/entreprise/dashboard'}
                      className="hover:bg-sidebar-accent"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
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

export default function CompanyLayout() {
  const { currentRole, setCurrentRole, currentCompany, logout } = useAuth();

  useEffect(() => {
    if (currentRole !== 'entreprise') {
      setCurrentRole('entreprise');
    }
  }, [currentRole, setCurrentRole]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CompanySidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium text-muted-foreground hidden md:block">
                {currentCompany?.raisonSociale || 'Mon entreprise'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RoleSwitcher />
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-background overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
