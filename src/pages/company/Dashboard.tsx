import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import { StatCard } from '@/components/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockOpportunities, mockNotifications } from '@/data/mock-data';
import { Building2, FileText, Bell, Search, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export default function CompanyDashboard() {
  const { currentCompany } = useAuth();
  const company = currentCompany!;
  const recentNotifs = mockNotifications.filter(n => !n.lu).slice(0, 3);
  const recommendedOpps = mockOpportunities.filter(o => o.statut === 'publiee').slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Bienvenue, {company.raisonSociale}</p>
      </div>

      {/* Profile completion */}
      <Card className="border-l-4 border-l-gold">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold">Complétion du profil</h3>
              <p className="text-sm text-muted-foreground">Complétez votre profil pour accéder à toutes les opportunités</p>
            </div>
            <span className="text-2xl font-bold text-gold">{company.completionRate}%</span>
          </div>
          <Progress value={company.completionRate} className="mb-3" />
          <div className="flex gap-3">
            <Button asChild size="sm" variant="outline"><Link to="/entreprise/profil">Compléter le profil</Link></Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Statut de validation" value={company.status === 'valide' ? 'Validé' : 'En revue'} icon={CheckCircle} subtitle="Dernière mise à jour : 10/03/2026" />
        <StatCard title="Documents soumis" value="6/8" icon={FileText} subtitle="2 documents manquants" />
        <StatCard title="Candidatures actives" value="3" icon={Search} subtitle="1 en examen" />
        <StatCard title="Notifications" value={recentNotifs.length.toString()} icon={Bell} subtitle="Non lues" />
      </div>

      {/* Missing docs warning */}
      <Card className="bg-warning/10 border-warning/30">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Documents manquants</p>
            <p className="text-sm text-muted-foreground">Attestation d'assurance professionnelle, Politique HSE signée</p>
            <Button asChild size="sm" variant="link" className="px-0 text-gold"><Link to="/entreprise/profil">Ajouter les documents <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recommended opportunities */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">Opportunités recommandées</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/entreprise/opportunites">Voir tout</Link></Button>
            </div>
            <div className="space-y-3">
              {recommendedOpps.map(opp => (
                <div key={opp.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2 mb-1"><StatusBadge status={opp.statut} /><span className="text-xs text-muted-foreground">{opp.reference}</span></div>
                  <p className="text-sm font-medium line-clamp-1">{opp.titre}</p>
                  <p className="text-xs text-muted-foreground mt-1">Limite : {new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold">Notifications récentes</h3>
              <Button asChild variant="ghost" size="sm"><Link to="/entreprise/notifications">Voir tout</Link></Button>
            </div>
            <div className="space-y-3">
              {recentNotifs.map(notif => (
                <div key={notif.id} className="p-3 rounded-lg border bg-gold/5 hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium">{notif.titre}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(notif.date).toLocaleDateString('fr-FR')}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
