import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { sorazCampagne, mockLots, mockEngagementsCL, getLotsForCampagne, getEligibleCompaniesForLot, LOT_STATUT_LABELS } from '@/data/operateur-mock-data';
import { CampagneTimeline } from '@/components/operateur/CampagneTimeline';
import { ContenuLocalGauge } from '@/components/operateur/ContenuLocalGauge';
import { useAuth } from '@/contexts/AuthContext';
import { CalendarClock, Layers, Users, AlertTriangle, FileSearch, ArrowRight, TrendingUp } from 'lucide-react';

const ENG_LABELS = {
  depenses_locales: 'Dépenses prestataires nigériens',
  main_oeuvre_nigerienne: 'Main-d\'œuvre nigérienne',
  materiaux_locaux: 'Matériaux d\'origine locale',
};

export default function OperateurDashboard() {
  const { currentOrganisation } = useAuth();
  const lots = getLotsForCampagne(sorazCampagne.id);
  const attribues = lots.filter(l => l.statut === 'attribue').length;
  const gaps = lots.filter(l => getEligibleCompaniesForLot(l).length < 2);
  const totalBudget = lots.reduce((s, l) => s + l.budgetEstimeMFCFA, 0);

  const dArret = new Date(sorazCampagne.dateArretPrevue);
  const jours = Math.ceil((dArret.getTime() - Date.now()) / 86400000);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wider text-petroleum font-semibold mb-1">Espace Donneur d'Ordre</p>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord — {currentOrganisation?.sigle}</h1>
        <p className="text-sm text-muted-foreground">Pilotage de la grande maintenance et du contenu local · {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Campagne en cours */}
      <Card className="border-l-4 border-l-petroleum bg-gradient-to-r from-petroleum/5 to-transparent">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <Badge className="bg-petroleum text-white mb-2">Campagne active · Phase {sorazCampagne.phaseActuelle}</Badge>
              <h2 className="text-xl font-heading font-bold">{sorazCampagne.nom}</h2>
              <p className="text-sm text-muted-foreground max-w-2xl mt-1">{sorazCampagne.description}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase text-muted-foreground">Arrêt prévu</p>
              <p className="text-2xl font-bold text-petroleum">J-{jours}</p>
              <p className="text-xs text-muted-foreground">{dArret.toLocaleDateString('fr-FR')} · {sorazCampagne.dureeArretJours} jours</p>
            </div>
          </div>
          <CampagneTimeline phase={sorazCampagne.phaseActuelle} />
          <div className="flex gap-2 pt-2">
            <Button asChild size="sm" className="bg-petroleum hover:bg-petroleum/90">
              <Link to={`/operateur/campagnes/${sorazCampagne.id}`}>Voir la campagne <ArrowRight className="h-3.5 w-3.5 ml-1.5" /></Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/operateur/allotissement">Gérer l'allotissement</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Lots définis" value={lots.length} icon={Layers} subtitle={`${attribues} attribués`} />
        <StatCard title="Effectif pic estimé" value={sorazCampagne.effectifPicEstime.toLocaleString('fr-FR')} icon={Users} subtitle="Personnes sur site" />
        <StatCard title="Budget TAR" value={`${(sorazCampagne.budgetMillionsFCFA/1000).toFixed(1)} Mds`} icon={TrendingUp} subtitle="FCFA estimés" />
        <StatCard title="Lots à risque" value={gaps.length} icon={AlertTriangle} subtitle="Gap contenu local" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contenu local */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Contenu local — Engagements vs réalisé</span>
              <Button asChild variant="ghost" size="sm"><Link to="/operateur/contenu-local">Détail</Link></Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {mockEngagementsCL.map(e => (
              <ContenuLocalGauge key={e.poste} label={ENG_LABELS[e.poste]} objectif={e.objectifPct} realise={e.realisePct} />
            ))}
          </CardContent>
        </Card>

        {/* Alertes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" /> Alertes & gaps marché
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {gaps.length === 0 && <p className="text-sm text-muted-foreground">Aucune alerte.</p>}
            {gaps.slice(0, 5).map(l => (
              <div key={l.id} className="text-xs border-l-2 border-warning pl-3 py-1">
                <p className="font-semibold">{l.reference} — {l.intitule}</p>
                <p className="text-muted-foreground mt-0.5">
                  {getEligibleCompaniesForLot(l).length} prestataire(s) local(aux) qualifié(s) · Famille « {l.famille} »
                </p>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full mt-2">
              <Link to="/operateur/registre"><FileSearch className="h-3.5 w-3.5 mr-1.5" /> Explorer le registre</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lots récents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Derniers lots & avancement</span>
            <Button asChild variant="ghost" size="sm"><Link to="/operateur/allotissement">Tout voir</Link></Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {lots.slice(0, 6).map(l => (
              <div key={l.id} className="py-2.5 flex items-center justify-between gap-3 text-sm">
                <div className="min-w-0">
                  <p className="font-medium truncate">{l.reference} · {l.intitule}</p>
                  <p className="text-xs text-muted-foreground">{l.famille} · {l.dureeJours}j · {l.effectifRequis} pers.</p>
                </div>
                <Badge variant="outline">{LOT_STATUT_LABELS[l.statut]}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
