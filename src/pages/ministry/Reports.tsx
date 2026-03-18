import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { companiesByRegion, companiesByCategory, dashboardStats, qualificationByStatus, opportunitesByDonneurOrdre } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, AlertTriangle, Clock, ShieldCheck, Target, TrendingUp, Award } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const COLORS = ['hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(32,92%,37%)', 'hsl(215,28%,17%)', 'hsl(210,18%,60%)', 'hsl(0,84%,60%)', 'hsl(280,60%,45%)'];

const expiredDocuments = [
  { entreprise: 'ZINDER LOGISTICS EXPRESS SARL', document: 'RCCM', dateExpiration: '2026-01-15', joursDepasses: 60 },
  { entreprise: 'TAHOUA LOCATION ENGINS SARL', document: 'Attestation assurance', dateExpiration: '2026-02-01', joursDepasses: 43 },
  { entreprise: 'AGADEZ MINING SUPPORT SAS', document: 'Certificat HSE', dateExpiration: '2026-02-20', joursDepasses: 24 },
  { entreprise: 'AÏRWAYS FORMATION SARL', document: 'RCCM', dateExpiration: '2026-03-01', joursDepasses: 15 },
  { entreprise: 'DOSSO MAINTENANCE PLUS SA', document: 'Attestation fiscale', dateExpiration: '2026-03-10', joursDepasses: 6 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Rapports et indicateurs de contenu local</h1>
          <p className="text-sm text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <Button variant="outline" onClick={() => toast.success('Rapport exporté')}><Download className="mr-2 h-4 w-4" />Exporter PDF</Button>
      </div>

      {/* Strategic KPIs */}
      <Card className="border-l-4 border-l-gold">
        <CardHeader><CardTitle>Indicateurs stratégiques du contenu local</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <ShieldCheck className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-3xl font-bold text-success">{dashboardStats.entreprisesQualifiees}</p>
              <p className="text-sm text-muted-foreground">Entreprises qualifiées</p>
            </div>
            <div className="text-center">
              <Award className="h-6 w-6 text-gold mx-auto mb-2" />
              <p className="text-3xl font-bold text-gold">{dashboardStats.tauxQualification}%</p>
              <p className="text-sm text-muted-foreground">Taux de qualification</p>
            </div>
            <div className="text-center">
              <Target className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold text-primary">{dashboardStats.entreprisesActives}</p>
              <p className="text-sm text-muted-foreground">Entreprises actives</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-gold mx-auto mb-2" />
              <p className="text-3xl font-bold text-gold">{dashboardStats.progressionRecensement}%</p>
              <p className="text-sm text-muted-foreground">Progression recensement</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Progression du recensement national</span>
              <span className="text-sm font-bold">{dashboardStats.progressionRecensement}%</span>
            </div>
            <Progress value={dashboardStats.progressionRecensement} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Rapport trimestriel Q1 2026', desc: 'Synthèse du contenu local — qualification et recensement', icon: FileText },
          { title: 'Alertes documents expirés', desc: `${expiredDocuments.length} documents à renouveler`, icon: AlertTriangle },
          { title: 'Besoins de renforcement', desc: `${dashboardStats.besoinsRenforcement} entreprises avec besoins identifiés`, icon: TrendingUp },
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
        {/* Qualification status */}
        <Card>
          <CardHeader><CardTitle>Répartition par statut de qualification</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={qualificationByStatus} dataKey="count" nameKey="statut" cx="50%" cy="50%" outerRadius={100}>
                  {qualificationByStatus.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* By donneur d'ordre */}
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
          <CardHeader><CardTitle>Participation locale par catégorie</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={companiesByCategory.slice(0, 8)} dataKey="count" nameKey="categorie" cx="50%" cy="50%" outerRadius={100}>
                  {companiesByCategory.slice(0, 8).map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Documents expirés */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Documents expirés par entreprise
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entreprise</TableHead>
                <TableHead>Document</TableHead>
                <TableHead>Date d'expiration</TableHead>
                <TableHead>Retard</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expiredDocuments.map((doc, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-sm">{doc.entreprise}</TableCell>
                  <TableCell className="text-sm">{doc.document}</TableCell>
                  <TableCell className="text-sm">{new Date(doc.dateExpiration).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>
                    <Badge variant="destructive" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />{doc.joursDepasses}j
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
