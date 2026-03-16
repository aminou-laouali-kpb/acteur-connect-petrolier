import { Badge } from '@/components/ui/badge';
import { Clock, AlertTriangle } from 'lucide-react';

interface DeadlineBadgeProps {
  dateLimite: string;
  className?: string;
}

export function DeadlineBadge({ dateLimite, className }: DeadlineBadgeProps) {
  const now = new Date();
  const deadline = new Date(dateLimite);
  const diffDays = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return (
      <Badge variant="destructive" className={className}>
        <AlertTriangle className="h-3 w-3 mr-1" />Expiré
      </Badge>
    );
  }
  if (diffDays <= 7) {
    return (
      <Badge className={`bg-destructive/10 text-destructive border-destructive/20 ${className}`}>
        <Clock className="h-3 w-3 mr-1" />Urgent — {diffDays}j
      </Badge>
    );
  }
  if (diffDays <= 30) {
    return (
      <Badge className={`bg-warning/10 text-warning border-warning/20 ${className}`}>
        <Clock className="h-3 w-3 mr-1" />{diffDays} jours
      </Badge>
    );
  }
  return null;
}
