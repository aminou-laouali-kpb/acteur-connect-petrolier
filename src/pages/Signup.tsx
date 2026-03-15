import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login('entreprise');
    toast.success('Inscription réussie', { description: 'Bienvenue ! Complétez votre profil pour commencer.' });
    navigate('/entreprise/profil');
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
            <CardTitle className="font-heading">Inscription</CardTitle>
            <CardDescription>Créez votre compte entreprise</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label htmlFor="raison">Raison sociale</Label><Input id="raison" placeholder="Nom de votre entreprise" required /></div>
              <div><Label htmlFor="forme">Forme juridique</Label>
                <Select><SelectTrigger><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">SA</SelectItem>
                    <SelectItem value="sarl">SARL</SelectItem>
                    <SelectItem value="sas">SAS</SelectItem>
                    <SelectItem value="ei">Entreprise individuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label htmlFor="nif">NIF</Label><Input id="nif" placeholder="Numéro d'identification fiscale" required /></div>
              <div><Label htmlFor="signup-email">Adresse email</Label><Input id="signup-email" type="email" placeholder="contact@entreprise.ne" required /></div>
              <div><Label htmlFor="phone">Téléphone</Label><Input id="phone" type="tel" placeholder="+227 XX XX XX XX" required /></div>
              <div><Label htmlFor="signup-password">Mot de passe</Label><Input id="signup-password" type="password" placeholder="••••••••" required /></div>
              <div><Label htmlFor="confirm">Confirmer le mot de passe</Label><Input id="confirm" type="password" placeholder="••••••••" required /></div>
              <label className="flex items-start gap-2 text-sm text-muted-foreground">
                <input type="checkbox" required className="mt-1 rounded" />
                J'accepte les conditions d'utilisation et la politique de confidentialité.
              </label>
              <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">Créer mon compte</Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Déjà inscrit ? <Link to="/connexion" className="text-gold hover:underline font-medium">Se connecter</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
