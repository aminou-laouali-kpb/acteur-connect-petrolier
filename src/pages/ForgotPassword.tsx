import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Email envoyé', { description: 'Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.' });
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
            <CardTitle className="font-heading">Mot de passe oublié</CardTitle>
            <CardDescription>Saisissez votre email pour recevoir un lien de réinitialisation.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><Label htmlFor="email">Adresse email</Label><Input id="email" type="email" placeholder="votre@email.ne" required /></div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-gold-foreground">Envoyer le lien</Button>
            </form>
            <div className="text-center mt-4">
              <Link to="/connexion" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
                <ArrowLeft className="h-3 w-3" /> Retour à la connexion
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
