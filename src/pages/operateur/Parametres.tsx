import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function Parametres() {
  const { currentOrganisation, currentUser } = useAuth();
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-heading font-bold">Paramètres</h1>
        <p className="text-sm text-muted-foreground">Compte donneur d'ordre et préférences</p>
      </div>
      <Card>
        <CardHeader><CardTitle className="text-base">Organisation</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-2 gap-3">
          <div><Label>Raison sociale</Label><Input defaultValue={currentOrganisation?.nom} /></div>
          <div><Label>Sigle</Label><Input defaultValue={currentOrganisation?.sigle} /></div>
          <div><Label>Directeur</Label><Input defaultValue={currentUser?.nom} /></div>
          <div><Label>Email</Label><Input defaultValue={currentOrganisation?.email} /></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle className="text-base">Préférences contenu local</CardTitle></CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-3">
          <div><Label>Objectif dépenses locales</Label><Input type="number" defaultValue={60} />%</div>
          <div><Label>Objectif main-d'œuvre nig.</Label><Input type="number" defaultValue={75} />%</div>
          <div><Label>Objectif matériaux locaux</Label><Input type="number" defaultValue={35} />%</div>
        </CardContent>
      </Card>
      <Button onClick={() => toast.success('Paramètres enregistrés')}>Enregistrer</Button>
    </div>
  );
}
