import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { companiesByRegion, companiesByCategory, dashboardStats } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const COLORS = ['hsl(215,28%,17%)', 'hsl(32,92%,37%)', 'hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)', 'hsl(210,18%,60%)', 'hsl(280,60%,45%)'];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-heading font-bold">Rapports et analyses</h1>
        <Button variant="outline" onClick={() => toast.success('Rapport exporté')}><Download className="mr-2 h-4 w-4" />Exporter PDF</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Rapport trimestriel Q1 2026', desc: 'Synthèse des activités du contenu local', icon: FileText },
          { title: 'Alertes documents expirés', desc: '12 documents à renouveler', icon: AlertTriangle },
          { title: 'Taux de réponse opportunités', desc: 'Analyse des candidatures reçues', icon: FileText },
        ].map((r, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info('Rapport ouvert')}>
            <CardContent className="p-6">
              <r.icon className="h-8 w-8 text-gold mb-3" />
              <h3 className="font-heading font-semibold text-sm mb-1">{r.title}</h3>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Entreprises par région</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companiesByRegion} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214,20%,89%)" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="region" tick={{ fontSize: 12 }} width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(32,92%,37%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Entreprises par catégorie</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={companiesByCategory} dataKey="count" nameKey="categorie" cx="50%" cy="50%" outerRadius={100}>
                  {companiesByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Indicateurs clés</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-4 gap-6">
            <div className="text-center"><p className="text-3xl font-bold text-gold">{dashboardStats.totalEntreprises}</p><p className="text-sm text-muted-foreground">Total entreprises</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-success">{dashboardStats.entreprisesValidees}</p><p className="text-sm text-muted-foreground">Validées</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-warning">{dashboardStats.enRevue}</p><p className="text-sm text-muted-foreground">En revue</p></div>
            <div className="text-center"><p className="text-3xl font-bold text-destructive">{dashboardStats.dossiersIncomplets}</p><p className="text-sm text-muted-foreground">Incomplets</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
