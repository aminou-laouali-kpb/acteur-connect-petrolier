import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboardStats, companiesByRegion, companiesByCategory, monthlyGrowth, mockAuditLog } from '@/data/mock-data';
import { Building2, CheckCircle, Clock, AlertTriangle, Search, FileText, TrendingUp, Users } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

const COLORS = ['hsl(215,28%,17%)', 'hsl(32,92%,37%)', 'hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)', 'hsl(210,18%,60%)', 'hsl(280,60%,45%)'];

export default function MinistryDashboard() {
  const recentActions = mockAuditLog.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Tableau de bord — Ministère</h1>
        <p className="text-sm text-muted-foreground">Vue d'ensemble du contenu local pétrolier · Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Entreprises enregistrées" value={dashboardStats.totalEntreprises} icon={Building2} trend="+12% ce mois" trendUp />
        <StatCard title="Entreprises validées" value={dashboardStats.entreprisesValidees} icon={CheckCircle} subtitle={`${Math.round(dashboardStats.entreprisesValidees/dashboardStats.totalEntreprises*100)}% du total`} />
        <StatCard title="Dossiers en revue" value={dashboardStats.enRevue} icon={Clock} subtitle="En attente de traitement" />
        <StatCard title="Dossiers incomplets" value={dashboardStats.dossiersIncomplets} icon={AlertTriangle} subtitle="Complément requis" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Opportunités actives" value={dashboardStats.opportunitesActives} icon={Search} />
        <StatCard title="Total candidatures" value={dashboardStats.totalCandidatures} icon={FileText} />
        <StatCard title="Taux de complétion" value={`${dashboardStats.tauxCompletion}%`} icon={TrendingUp} />
        <StatCard title="Croissance mensuelle" value={`+${dashboardStats.croissanceMensuelle}%`} icon={Users} trendUp />
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
          <CardHeader><CardTitle>Répartition par catégorie</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={companiesByCategory} dataKey="count" nameKey="categorie" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: any) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {companiesByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Évolution mensuelle des inscriptions</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,89%)" />
              <XAxis dataKey="mois" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="inscriptions" stroke="hsl(215,28%,17%)" strokeWidth={2} name="Inscriptions" />
              <Line type="monotone" dataKey="validations" stroke="hsl(32,92%,37%)" strokeWidth={2} name="Validations" />
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
