import { Outlet, Link } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { LayoutDashboard, ShieldCheck, Search, FileText, BarChart3, History, Settings, LogOut, Bell, ListTodo, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from '@/components/GlobalSearch';
import { mockAgentNotifications } from '@/data/admin-mock-data';

const menuItems = [
  { title: 'Tableau de bord', url: '/ministere/dashboard', icon: LayoutDashboard },
  { title: 'Registre', url: '/ministere/entreprises', icon: ShieldCheck },
  { title: 'File de qualification', url: '/ministere/file', icon: ListTodo },
  { title: 'Opportunités', url: '/ministere/opportunites', icon: Search },
  { title: 'Candidatures', url: '/ministere/candidatures', icon: FileText },
  { title: 'Notifications', url: '/ministere/notifications', icon: Bell },
  { title: 'Automatisations', url: '/ministere/automatisations', icon: Zap },
  { title: 'Rapports', url: '/ministere/rapports', icon: BarChart3 },
  { title: 'Journal d\'audit', url: '/ministere/audit', icon: History },
  { title: 'Paramètres', url: '/ministere/parametres', icon: Settings },
];

function MinistrySidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-sidebar-primary flex items-center justify-center shrink-0">
                <span className="text-sidebar-primary-foreground font-heading font-bold text-xs">MP</span>
              </div>
              <div className="overflow-hidden">
                <p className="font-heading font-bold text-sm text-sidebar-foreground truncate">Registre National</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">Contenu Local Pétrolier</p>
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/ministere/dashboard'}
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

export default function MinistryLayout() {
  const { currentUser, logout } = useAuth();
  const unread = mockAgentNotifications.filter(n => !n.lu).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <MinistrySidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 gap-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="text-sm font-medium text-muted-foreground hidden md:block">
                {currentUser?.nom || 'Administration'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <GlobalSearch />
              <Button asChild variant="ghost" size="icon" className="relative" title="Notifications">
                <Link to="/ministere/notifications">
                  <Bell className="h-4 w-4" />
                  {unread > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
                      {unread}
                    </span>
                  )}
                </Link>
              </Button>
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
