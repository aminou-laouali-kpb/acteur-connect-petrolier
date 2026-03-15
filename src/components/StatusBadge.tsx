import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CompanyStatus, ApplicationStatus, OpportunityStatus } from '@/types';

type StatusType = CompanyStatus | ApplicationStatus | OpportunityStatus | string;

const statusConfig: Record<string, { label: string; className: string }> = {
  valide: { label: 'Validé', className: 'bg-success text-success-foreground hover:bg-success/90' },
  publiee: { label: 'Publiée', className: 'bg-success text-success-foreground hover:bg-success/90' },
  retenue: { label: 'Retenue', className: 'bg-success text-success-foreground hover:bg-success/90' },
  en_revue: { label: 'En revue', className: 'bg-gold text-gold-foreground hover:bg-gold/90' },
  en_examen: { label: 'En examen', className: 'bg-gold text-gold-foreground hover:bg-gold/90' },
  soumise: { label: 'Soumise', className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
  complement_demande: { label: 'Complément demandé', className: 'bg-warning text-warning-foreground hover:bg-warning/90' },
  brouillon: { label: 'Brouillon', className: 'bg-muted text-muted-foreground hover:bg-muted/80' },
  suspendu: { label: 'Suspendu', className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90' },
  expire: { label: 'Expiré', className: 'bg-destructive/80 text-destructive-foreground hover:bg-destructive/70' },
  non_retenue: { label: 'Non retenue', className: 'bg-destructive/80 text-destructive-foreground hover:bg-destructive/70' },
  fermee: { label: 'Fermée', className: 'bg-muted text-muted-foreground' },
  archivee: { label: 'Archivée', className: 'bg-muted text-muted-foreground' },
};

export function StatusBadge({ status, className }: { status: StatusType; className?: string }) {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  return (
    <Badge className={cn('border-0 font-medium', config.className, className)}>
      {config.label}
    </Badge>
  );
}
