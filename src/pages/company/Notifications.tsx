import { Card, CardContent } from '@/components/ui/card';
import { mockNotifications } from '@/data/mock-data';
import { Bell, CheckCircle, FileText, Search, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

const typeIcons = { validation: CheckCircle, document: FileText, opportunite: Search, admin: Shield };
const typeColors = { validation: 'text-success', document: 'text-warning', opportunite: 'text-gold', admin: 'text-primary' };

export default function CompanyNotifications() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Notifications</h1>
      <div className="space-y-3">
        {mockNotifications.map(notif => {
          const Icon = typeIcons[notif.type];
          return (
            <Card key={notif.id} className={cn(!notif.lu && 'border-l-4 border-l-gold bg-gold/5')}>
              <CardContent className="p-4 flex items-start gap-3">
                <Icon className={cn('h-5 w-5 shrink-0 mt-0.5', typeColors[notif.type])} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notif.titre}</p>
                    <span className="text-xs text-muted-foreground">{new Date(notif.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                </div>
                {!notif.lu && <div className="w-2 h-2 rounded-full bg-gold shrink-0 mt-2" />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
