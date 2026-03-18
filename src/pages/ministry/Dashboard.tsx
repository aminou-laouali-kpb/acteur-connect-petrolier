import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { dashboardStats, companiesByRegion, companiesByCategory, monthlyGrowth, mockAuditLog, opportunitesByDonneurOrdre, qualificationByStatus } from '@/data/mock-data';
import { Building2, CheckCircle, Clock, AlertTriangle, Search, FileText, TrendingUp, Users, ShieldCheck, Target, Award, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const COLORS = ['hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(32,92%,37%)', 'hsl(215,28%,17%)', 'hsl(210,18%,60%)', 'hsl(0,84%,60%)', 'hsl(280,60%,45%)'];

export default function MinistryDashboard() {
  const recentActions = mockAuditLog.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord — Registre National du Contenu Local</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble de la qualification et du recensement · {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Census progress */}
      <Card className="border-l-4 border-l-gold">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-heading font-semibold">Progression du recensement national</h3>
              <p className="text-sm text-muted-foreground">Campagne de recensement des fournisseurs et prestataires du secteur pétrolier</p>
            </div>
            <span className="text-2xl font-bold text-gold">{dashboardStats.progressionRecensement}%</span>
          </div>
          <Progress value={dashboardStats.progressionRecensement} className="mb-2 h-3" />
          <p className="text-xs text-muted-foreground">{dashboardStats.entreprisesRecensees} entreprises recensées sur un objectif de {dashboardStats.totalEntreprises}</p>
        </CardContent>
      </Card>

      {/* Strategic KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Entreprises recensées" value={dashboardStats.entreprisesRecensees} icon={Building2} trend="+12% ce mois" trendUp />
        <StatCard title="Entreprises qualifiées" value={dashboardStats.entreprisesQualifiees} icon={ShieldCheck} subtitle={`${dashboardStats.tauxQualification}% du total`} />
        <StatCard title="En cours de qualification" value={dashboardStats.enCoursQualification} icon={Clock} subtitle="Dossiers en traitement" />
        <StatCard title="Taux de qualification" value={`${dashboardStats.tauxQualification}%`} icon={Award} trendUp />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Opportunités actives" value={dashboardStats.opportunitesActives} icon={Search} />
        <StatCard title="Entreprises actives" value={dashboardStats.entreprisesActives} icon={Target} subtitle="Sur les opportunités" />
        <StatCard title="Besoins renforcement" value={dashboardStats.besoinsRenforcement} icon={TrendingUp} subtitle="Identifiés" />
        <StatCard title="Croissance mensuelle" value={`+${dashboardStats.croissanceMensuelle}%`} icon={Users} trendUp />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Qualification by status */}
        <Card>
          <CardHeader><CardTitle>Répartition par statut de qualification</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={qualificationByStatus} dataKey="count" nameKey="statut" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: any) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {qualificationByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Opportunities by donneur d'ordre */}
        <Card>
          <CardHeader><CardTitle>Opportunités par donneur d'ordre</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={opportunitesByDonneurOrdre}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,89%)" />
                <XAxis dataKey="type" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(32,92%,37%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Entreprises par région</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companiesByRegion}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,89%)" />
                <XAxis dataKey="region" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(215,28%,17%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Participation locale par catégorie</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={companiesByCategory.slice(0, 8)} dataKey="count" nameKey="categorie" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: any) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {companiesByCategory.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Évolution mensuelle — Inscriptions et qualifications</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,89%)" />
              <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inscriptions" stroke="hsl(215,28%,17%)" strokeWidth={2} name="Inscriptions" />
              <Line type="monotone" dataKey="qualifications" stroke="hsl(32,92%,37%)" strokeWidth={2} name="Qualifications" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Activité récente</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActions.map(action => (
              <div key={action.id} className="flex items-start gap-3 p-3 rounded-lg border">
                <div className="w-2 h-2 rounded-full bg-gold mt-2 shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{action.action}</p>
                  <p className="text-xs text-muted-foreground">{action.cible} — {action.utilisateur} ({action.role})</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{action.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
