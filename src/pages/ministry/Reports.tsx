import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { companiesByRegion, companiesByCategory, dashboardStats } from '@/data/mock-data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const COLORS = ['hsl(215,28%,17%)', 'hsl(32,92%,37%)', 'hsl(142,71%,35%)', 'hsl(38,92%,50%)', 'hsl(0,84%,60%)', 'hsl(210,18%,60%)', 'hsl(280,60%,45%)'];

const expiredDocuments = [
  { entreprise: 'ZINDER LOGISTICS EXPRESS SARL', document: 'RCCM', dateExpiration: '2026-01-15', joursDepasses: 60 },
  { entreprise: 'TAHOUA LOCATION ENGINS SARL', document: 'Attestation assurance', dateExpiration: '2026-02-01', joursDepasses: 43 },
  { entreprise: 'AGADEZ MINING SUPPORT SAS', document: 'Certificat HSE', dateExpiration: '2026-02-20', joursDepasses: 24 },
  { entreprise: 'AÏRWAYS FORMATION SARL', document: 'RCCM', dateExpiration: '2026-03-01', joursDepasses: 15 },
  { entreprise: 'DOSSO MAINTENANCE PLUS SA', document: 'Attestation fiscale', dateExpiration: '2026-03-10', joursDepasses: 6 },
];

const responseRates = [
  { opportunite: 'AMI Maintenance Agadem', candidatures: 3, taux: '37.5%' },
  { opportunite: 'Transport Zinder-Diffa', candidatures: 1, taux: '12.5%' },
  { opportunite: 'EIES Phase 2 Bilma', candidatures: 0, taux: '0%' },
  { opportunite: 'Formation HSE', candidatures: 1, taux: '12.5%' },
  { opportunite: 'Catering N\'Gourti', candidatures: 1, taux: '12.5%' },
  { opportunite: 'GC Extension Zinder', candidatures: 2, taux: '25%' },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Rapports et analyses</h1>
          <p className="text-sm text-muted-foreground">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
        </div>
        <Button variant="outline" onClick={() => toast.success('Rapport exporté')}><Download className="mr-2 h-4 w-4" />Exporter PDF</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Rapport trimestriel Q1 2026', desc: 'Synthèse des activités du contenu local', icon: FileText },
          { title: 'Alertes documents expirés', desc: `${expiredDocuments.length} documents à renouveler`, icon: AlertTriangle },
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

      {/* Taux de réponse */}
      <Card>
        <CardHeader><CardTitle>Taux de réponse aux opportunités</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Opportunité</TableHead>
                <TableHead>Candidatures reçues</TableHead>
                <TableHead>Taux de réponse</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {responseRates.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium text-sm">{r.opportunite}</TableCell>
                  <TableCell className="text-sm">{r.candidatures}</TableCell>
                  <TableCell className="text-sm font-medium">{r.taux}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
