import { Outlet, Navigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar,
} from '@/components/ui/sidebar';
import { LayoutDashboard, CalendarClock, Users, Layers, FileSearch, Gauge, FileBarChart, Settings, LogOut, Factory } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from '@/components/GlobalSearch';

const menuItems = [
  { title: 'Tableau de bord', url: '/operateur/dashboard', icon: LayoutDashboard },
  { title: 'Mes campagnes TAR', url: '/operateur/campagnes', icon: CalendarClock },
  { title: 'Registre fournisseurs', url: '/operateur/registre', icon: Users },
  { title: 'Allotissement', url: '/operateur/allotissement', icon: Layers },
  { title: 'Appels d\'offres', url: '/operateur/appels-offres', icon: FileSearch },
  { title: 'Tableau contenu local', url: '/operateur/contenu-local', icon: Gauge },
  { title: 'Rapports Ministère', url: '/operateur/rapports', icon: FileBarChart },
  { title: 'Paramètres', url: '/operateur/parametres', icon: Settings },
];

function OperateurSidebar() {
  const { state } = useSidebar();
  const { currentOrganisation } = useAuth();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarContent style={{ background: 'hsl(207 70% 12%)' }} className="text-slate-100">
        <div className="p-4">
          {!collapsed && (
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded bg-petroleum-accent flex items-center justify-center shrink-0">
                <Factory className="h-5 w-5 text-white" />
              </div>
              <div className="overflow-hidden">
                <p className="font-heading font-bold text-sm truncate">{currentOrganisation?.sigle ?? 'SORAZ'}</p>
                <p className="text-xs text-slate-400 truncate">Donneur d'ordre</p>
              </div>
            </div>
          )}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400">Espace Donneur d'Ordre</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === '/operateur/dashboard'}
                      className="hover:bg-white/5 text-slate-200"
                      activeClassName="bg-white/10 text-white font-medium border-l-2 border-petroleum-accent"
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

export default function OperateurLayout() {
  const { currentUser, currentOrganisation, currentRole, logout } = useAuth();

  if (currentRole !== 'operateur') {
    return <Navigate to="/operateur-login" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <OperateurSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b bg-card px-4 gap-3">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="text-sm font-semibold">{currentOrganisation?.nom}</span>
                <span className="text-xs text-muted-foreground">{currentUser?.nom} — {currentUser?.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GlobalSearch />
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
