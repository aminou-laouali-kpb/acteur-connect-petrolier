import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Shield, ArrowLeft } from 'lucide-react';

export default function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [identifiant, setIdentifiant] = useState('admin');
  const [motDePasse, setMotDePasse] = useState('admin');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifiant === 'admin' && motDePasse === 'admin') {
      login('ministere');
      toast.success('Connexion réussie', { description: 'Bienvenue sur le portail du Ministère.' });
      navigate('/ministere/dashboard');
    } else {
      toast.error('Identifiants incorrects', { description: 'Vérifiez votre identifiant et mot de passe.' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}>
      <div className="w-full max-w-md">
        {/* Header institutionnel */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-amber-600 mb-4 shadow-xl shadow-amber-600/20">
            <span className="text-white font-bold text-2xl tracking-tight">MP</span>
          </div>
          <h1 className="text-white font-bold text-xl mb-1">Ministère du Pétrole</h1>
          <p className="text-slate-400 text-sm">République du Niger</p>
          <div className="mt-4 h-px w-24 mx-auto bg-amber-600/50" />
        </div>

        <Card className="border-slate-700 bg-slate-800/80 backdrop-blur shadow-2xl">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 text-amber-500 mb-1">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wider">Portail Agents</span>
            </div>
            <p className="text-slate-400 text-xs">Accès réservé aux agents habilités</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="identifiant" className="text-slate-300">Identifiant</Label>
                <Input
                  id="identifiant"
                  value={identifiant}
                  onChange={(e) => setIdentifiant(e.target.value)}
                  className="bg-slate-900/60 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-slate-300">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={motDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="bg-slate-900/60 border-slate-600 text-white placeholder:text-slate-500 focus-visible:ring-amber-500"
                />
              </div>
              <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-sm transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Retour au site public
          </Link>
        </div>

        <p className="text-center text-xs text-slate-600 mt-8">
          © 2026 Ministère du Pétrole — République du Niger
        </p>
      </div>
    </div>
  );
}
