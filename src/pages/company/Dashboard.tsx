import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StatusBadge } from '@/components/StatusBadge';
import { StatCard } from '@/components/StatCard';
import { useAuth } from '@/contexts/AuthContext';
import { mockOpportunities, mockNotifications } from '@/data/mock-data';
import { QUALIFICATION_STEPS } from '@/types';
import { Building2, FileText, Bell, Search, AlertTriangle, CheckCircle, ArrowRight, ShieldCheck, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const statusToStep: Record<string, number> = {
  pre_enregistre: 0,
  recense: 1,
  dossier_complete: 2,
  en_cours_qualification: 3,
  qualifie: 4,
  qualifie_avec_reserves: 4,
  suspendu: -1,
  a_mettre_a_jour: 2,
};

export default function CompanyDashboard() {
  const { currentCompany } = useAuth();
  const recentNotifs = mockNotifications.filter(n => !n.lu).slice(0, 3);
  const recommendedOpps = mockOpportunities.filter(o => o.statut === 'publiee').slice(0, 2);

  if (!currentCompany) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Chargement de votre espace entreprise…</p>
      </div>
    );
  }

  const company = currentCompany;
  const currentStep = statusToStep[company.status] ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord</h1>
        <p className="text-sm text-muted-foreground">Bienvenue, {company.raisonSociale}</p>
      </div>

      {/* Qualification journey stepper */}
      <Card className="border-l-4 border-l-gold">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold">Parcours de qualification</h3>
              <p className="text-sm text-muted-foreground">Complétez votre dossier pour être qualifié et accéder aux marchés du secteur pétrolier</p>
            </div>
            <StatusBadge status={company.status} />
          </div>
          <div className="flex items-center gap-1 mb-4 overflow-x-auto pb-2">
            {QUALIFICATION_STEPS.map((step, i) => (
              <div key={step.key} className="flex items-center">
                <div className={cn(
                  "flex flex-col items-center min-w-[100px]",
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1",
                    i <= currentStep && currentStep >= 0
                      ? "bg-success text-success-foreground"
                      : i === currentStep + 1
                        ? "bg-gold/20 text-gold border-2 border-gold"
                        : "bg-muted text-muted-foreground"
                  )}>
                    {i <= currentStep && currentStep >= 0 ? <CheckCircle className="h-4 w-4" /> : i + 1}
                  </div>
                  <span className={cn(
                    "text-[10px] text-center leading-tight",
                    i <= currentStep && currentStep >= 0 ? "text-success font-medium" : "text-muted-foreground"
                  )}>{step.label}</span>
                </div>
                {i < QUALIFICATION_STEPS.length - 1 && (
                  <div className={cn(
                    "w-6 h-0.5 mt-[-12px]",
                    i < currentStep && currentStep >= 0 ? "bg-success" : "bg-border"
                  )} />
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">Complétion du dossier</span>
                <span className="text-sm font-bold text-gold">{company.completionRate}%</span>
              </div>
              <Progress value={company.completionRate} className="h-2" />
            </div>
            <Button asChild size="sm" variant="outline"><Link to="/entreprise/profil">Compléter le dossier</Link></Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Statut de qualification" value={company.status === 'qualifie' ? 'Qualifié' : 'En cours'} icon={ShieldCheck} subtitle="Dernière mise à jour : 10/03/2026" />
        <StatCard title="Documents soumis" value="6/8" icon={FileText} subtitle="2 documents manquants" />
        <StatCard title="Candidatures actives" value="3" icon={Search} subtitle="1 en examen" />
        <StatCard title="Notifications" value={recentNotifs.length.toString()} icon={Bell} subtitle="Non lues" />
      </div>

      {/* Missing docs warning */}
      <Card className="bg-warning/10 border-warning/30">
        <CardContent className="p-4 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">Documents manquants pour la qualification</p>
            <p className="text-sm text-muted-foreground">Attestation d'assurance professionnelle, Politique HSE signée</p>
            <Button asChild size="sm" variant="link" className="px-0 text-gold"><Link to="/entreprise/profil">Compléter le dossier <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
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
