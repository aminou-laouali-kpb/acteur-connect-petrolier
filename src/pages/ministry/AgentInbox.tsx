import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { mockAgentNotifications } from '@/data/admin-mock-data';
import { AGENT_NOTIFICATION_CATEGORY_LABELS } from '@/types';
import type { AgentNotification, AgentNotificationCategory } from '@/types';
import { Bell, CheckCheck, AlertOctagon, AlertTriangle, Info, FileWarning, ClipboardEdit, FilePlus2, Settings as Cog, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const CATEGORY_ICONS: Record<AgentNotificationCategory, React.ElementType> = {
  nouveau_dossier: FilePlus2,
  document_expire: FileWarning,
  mise_a_jour: ClipboardEdit,
  relance_due: AlertTriangle,
  systeme: Cog,
};

function severityIcon(s: AgentNotification['severity']) {
  if (s === 'urgent') return <AlertOctagon className="h-4 w-4 text-destructive" />;
  if (s === 'attention') return <AlertTriangle className="h-4 w-4 text-warning" />;
  return <Info className="h-4 w-4 text-primary" />;
}

export default function AgentInbox() {
  const [items, setItems] = useState<AgentNotification[]>(mockAgentNotifications);
  const [tab, setTab] = useState<'all' | AgentNotificationCategory>('all');

  const filtered = useMemo(() => items.filter(i => tab === 'all' || i.category === tab), [items, tab]);
  const unread = items.filter(i => !i.lu).length;

  const markRead = (id: string) => setItems(items.map(i => i.id === id ? { ...i, lu: true } : i));
  const markAll = () => { setItems(items.map(i => ({ ...i, lu: true }))); toast.success('Toutes les notifications marquées comme lues'); };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-heading font-bold flex items-center gap-2"><Bell className="h-6 w-6 text-primary" />Centre de notifications</h1>
          <p className="text-sm text-muted-foreground">{unread} non lue(s) sur {items.length} · Suivi des événements opérationnels</p>
        </div>
        <Button variant="outline" size="sm" onClick={markAll}><CheckCheck className="mr-2 h-4 w-4" />Tout marquer comme lu</Button>
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="all">Toutes ({items.length})</TabsTrigger>
          {(Object.entries(AGENT_NOTIFICATION_CATEGORY_LABELS) as [AgentNotificationCategory, string][]).map(([k, label]) => (
            <TabsTrigger key={k} value={k}>{label} ({items.filter(i => i.category === k).length})</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="space-y-2 mt-6">
          {filtered.map(n => {
            const Icon = CATEGORY_ICONS[n.category];
            return (
              <Card key={n.id} className={!n.lu ? 'border-l-4 border-l-primary' : ''}>
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="rounded-md bg-muted p-2 mt-0.5"><Icon className="h-4 w-4" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {severityIcon(n.severity)}
                      <p className="font-medium text-sm">{n.titre}</p>
                      {!n.lu && <Badge variant="secondary" className="text-[10px]">Nouveau</Badge>}
                      {n.agentAssigne && <Badge variant="outline" className="text-[10px]">{n.agentAssigne}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{new Date(n.date).toLocaleString('fr-FR')}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {n.entrepriseId && (
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/ministere/entreprises/${n.entrepriseId}`}>Ouvrir<ArrowRight className="ml-1 h-3 w-3" /></Link>
                      </Button>
                    )}
                    {!n.lu && <Button size="sm" variant="ghost" onClick={() => markRead(n.id)}>Marquer traité</Button>}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">Aucune notification dans cette catégorie.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
