import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatusBadge } from '@/components/StatusBadge';
import { mockOpportunities } from '@/data/mock-data';
import { Calendar, MapPin, ArrowRight, Bookmark } from 'lucide-react';
import { toast } from 'sonner';

export default function CompanyOpportunities() {
  const published = mockOpportunities.filter(o => o.statut === 'publiee');
  const recommended = published.filter(o => ['Maintenance industrielle', 'Soudure / chaudronnerie'].includes(o.categorie));
  const [saved, setSaved] = useState<string[]>(['1', '4']);

  const toggleSave = (id: string) => {
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    toast.success('Opportunité mise à jour');
  };

  const OppCard = ({ opp }: { opp: typeof mockOpportunities[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2"><StatusBadge status={opp.statut} /><span className="text-xs text-muted-foreground font-mono">{opp.reference}</span></div>
          <button onClick={() => toggleSave(opp.id)} className="text-muted-foreground hover:text-gold"><Bookmark className={`h-4 w-4 ${saved.includes(opp.id) ? 'fill-gold text-gold' : ''}`} /></button>
        </div>
        <h3 className="font-heading font-semibold text-sm mb-2 line-clamp-2">{opp.titre}</h3>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{opp.region}</span>
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</span>
        </div>
        <Button asChild variant="outline" size="sm"><Link to={`/opportunites/${opp.id}`}>Détails <ArrowRight className="ml-1 h-3 w-3" /></Link></Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Opportunités</h1>
      <Tabs defaultValue="toutes">
        <TabsList>
          <TabsTrigger value="toutes">Toutes ({published.length})</TabsTrigger>
          <TabsTrigger value="recommandees">Recommandées ({recommended.length})</TabsTrigger>
          <TabsTrigger value="sauvegardees">Sauvegardées ({saved.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="toutes" className="mt-4"><div className="grid md:grid-cols-2 gap-4">{published.map(o => <OppCard key={o.id} opp={o} />)}</div></TabsContent>
        <TabsContent value="recommandees" className="mt-4"><div className="grid md:grid-cols-2 gap-4">{recommended.map(o => <OppCard key={o.id} opp={o} />)}</div></TabsContent>
        <TabsContent value="sauvegardees" className="mt-4"><div className="grid md:grid-cols-2 gap-4">{published.filter(o => saved.includes(o.id)).map(o => <OppCard key={o.id} opp={o} />)}</div></TabsContent>
      </Tabs>
    </div>
  );
}
