import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('entreprise');
    toast.success('Connexion réussie', { description: 'Bienvenue sur votre espace entreprise.' });
    navigate('/entreprise/dashboard');
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">CL</span>
            </div>
            <span className="font-heading font-bold">Contenu Local</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-heading">Connexion</CardTitle>
            <CardDescription>Accédez à votre espace entreprise</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label htmlFor="email">Adresse email</Label><Input id="email" type="email" placeholder="votre@email.ne" defaultValue="contact@ssi-niger.ne" /></div>
              <div><Label htmlFor="password">Mot de passe</Label><Input id="password" type="password" placeholder="••••••••" defaultValue="demo1234" /></div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded" /> Se souvenir de moi</label>
                <Link to="/mot-de-passe-oublie" className="text-gold hover:underline">Mot de passe oublié ?</Link>
              </div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">Se connecter</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Pas encore inscrit ? <Link to="/inscription" className="text-gold hover:underline font-medium">Créer un compte</Link>
            </p>
            <p className="text-center text-xs text-muted-foreground mt-2">
              <Link to="/admin" className="hover:underline">Espace agents du Ministère →</Link>
            </p>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-6">
          © 2026 Ministère du Pétrole — République du Niger
        </p>
      </div>
    </div>
  );
}
