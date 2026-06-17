import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Factory, ArrowLeft } from 'lucide-react';

export default function OperateurLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState('soraz');
  const [motDePasse, setMotDePasse] = useState('soraz');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant === 'soraz' && motDePasse === 'soraz') {
      login('operateur');
      toast.success('Connexion réussie', { description: 'Bienvenue dans l\'espace Donneur d\'Ordre SORAZ.' });
      navigate('/operateur/dashboard');
    } else {
      toast.error('Identifiants incorrects');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, hsl(207 70% 14%) 0%, hsl(207 70% 8%) 100%)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-petroleum-accent mb-4 shadow-xl">
            <Factory className="h-9 w-9 text-white" />
          </div>
          <h1 className="text-white font-bold text-xl mb-1">Espace Donneur d'Ordre</h1>
          <p className="text-slate-400 text-sm">SORAZ · Direction Maintenance &amp; Inspection</p>
          <div className="mt-4 h-px w-24 mx-auto bg-petroleum-accent/50" />
        </div>

        <Card className="border-slate-700 bg-slate-800/80 backdrop-blur shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 text-cyan-400 mb-1">
              <Factory className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Portail Opérateurs</span>
            </div>
            <p className="text-slate-400 text-xs">Sociétés nationales du secteur pétrolier</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifiant" className="text-slate-300">Identifiant</Label>
                <Input id="identifiant" value={identifiant} onChange={(e) => setIdentifiant(e.target.value)} className="bg-slate-900/60 border-slate-600 text-white" />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-300">Mot de passe</Label>
                <Input id="password" type="password" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} className="bg-slate-900/60 border-slate-600 text-white" />
              </div>
              <Button type="submit" className="w-full bg-petroleum-accent hover:bg-petroleum-accent/90 text-white font-semibold">
                Accéder à l'espace SORAZ
              </Button>
              <p className="text-xs text-slate-500 text-center">Démo : soraz / soraz</p>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Retour au site public
          </Link>
        </div>
      </div>
    </div>
  );
}
