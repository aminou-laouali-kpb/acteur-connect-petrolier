import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Shield, ShieldCheck, ShieldAlert, Clock, FileCheck, ClipboardList, Ban, RefreshCw } from 'lucide-react';
import type { QualificationStatus, ApplicationStatus, OpportunityStatus } from '@/types';

type StatusType = QualificationStatus | ApplicationStatus | OpportunityStatus | string;

const statusConfig: Record<string, { label: string; className: string; icon?: React.ElementType }> = {
  // Qualification statuses
  pre_enregistre: { label: 'Pré-enregistré', className: 'bg-muted text-muted-foreground hover:bg-muted/80', icon: ClipboardList },
  recense: { label: 'Recensé', className: 'bg-primary/15 text-primary hover:bg-primary/20', icon: FileCheck },
  dossier_complete: { label: 'Dossier complété', className: 'bg-primary/20 text-primary hover:bg-primary/25', icon: FileCheck },
  en_cours_qualification: { label: 'En cours de qualification', className: 'bg-gold/15 text-gold-foreground bg-gold/20 hover:bg-gold/25', icon: Clock },
  qualifie: { label: 'Qualifié', className: 'bg-success text-success-foreground hover:bg-success/90', icon: ShieldCheck },
  qualifie_avec_reserves: { label: 'Qualifié avec réserves', className: 'bg-warning text-warning-foreground hover:bg-warning/90', icon: ShieldAlert },
  suspendu: { label: 'Suspendu', className: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', icon: Ban },
  a_mettre_a_jour: { label: 'À mettre à jour', className: 'bg-warning/80 text-warning-foreground hover:bg-warning/70', icon: RefreshCw },
  // Opportunity statuses
  publiee: { label: 'Publiée', className: 'bg-success text-success-foreground hover:bg-success/90' },
  fermee: { label: 'Fermée', className: 'bg-muted text-muted-foreground' },
  archivee: { label: 'Archivée', className: 'bg-muted text-muted-foreground' },
  // Application statuses
  brouillon: { label: 'Brouillon', className: 'bg-muted text-muted-foreground hover:bg-muted/80' },
  soumise: { label: 'Soumise', className: 'bg-primary text-primary-foreground hover:bg-primary/90' },
  en_examen: { label: 'En examen', className: 'bg-gold/20 text-foreground hover:bg-gold/25' },
  retenue: { label: 'Retenue', className: 'bg-success text-success-foreground hover:bg-success/90' },
  non_retenue: { label: 'Non retenue', className: 'bg-destructive/80 text-destructive-foreground hover:bg-destructive/70' },
  // Legacy
  valide: { label: 'Qualifié', className: 'bg-success text-success-foreground hover:bg-success/90', icon: ShieldCheck },
  en_revue: { label: 'En cours de qualification', className: 'bg-gold/20 text-foreground hover:bg-gold/25', icon: Clock },
  complement_demande: { label: 'À mettre à jour', className: 'bg-warning/80 text-warning-foreground hover:bg-warning/70', icon: RefreshCw },
  expire: { label: 'Expiré', className: 'bg-destructive/80 text-destructive-foreground hover:bg-destructive/70' },
};

export function StatusBadge({ status, className, showIcon = true }: { status: StatusType; className?: string; showIcon?: boolean }) {
  const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };
  const Icon = config.icon;
  return (
    <Badge className={cn('border-0 font-medium gap-1', config.className, className)}>
      {showIcon && Icon && <Icon className="h-3 w-3" />}
      {config.label}
    </Badge>
  );
}
