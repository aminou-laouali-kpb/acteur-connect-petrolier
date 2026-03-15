import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { REGIONS, CATEGORIES } from '@/types';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Section = ({ title, items }: { title: string; items: readonly string[] | string[] }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle className="text-lg">{title}</CardTitle>
      <Button size="sm" variant="outline" onClick={() => toast.success('Ajouté')}><Plus className="mr-1 h-3 w-3" />Ajouter</Button>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between py-2 px-3 border rounded-lg hover:bg-muted/50">
            <span className="text-sm">{item}</span>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-7 w-7"><Edit className="h-3 w-3" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => toast.error('Supprimé')}><Trash2 className="h-3 w-3" /></Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-bold">Paramètres & taxonomie</h1>
      <div className="grid lg:grid-cols-2 gap-6">
        <Section title="Régions" items={REGIONS} />
        <Section title="Catégories sectorielles" items={CATEGORIES} />
        <Section title="Types d'opportunités" items={['Appel à manifestation d\'intérêt', 'Sous-traitance', 'Consultation', 'Formation']} />
        <Section title="Statuts de validation" items={['Brouillon', 'En revue', 'Validé', 'Complément demandé', 'Suspendu', 'Expiré']} />
      </div>
    </div>
  );
}
