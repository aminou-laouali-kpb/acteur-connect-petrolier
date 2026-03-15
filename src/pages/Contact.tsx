import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message envoyé', { description: 'Nous vous répondrons dans les meilleurs délais.' });
  };

  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="text-3xl font-heading font-bold text-primary-foreground mb-2">Contact & Assistance</h1>
          <p className="text-primary-foreground/80">Besoin d'aide ? Notre équipe est à votre disposition.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-xl font-heading font-bold mb-6">Envoyez-nous un message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="nom">Nom complet</Label><Input id="nom" placeholder="Votre nom" required /></div>
                      <div><Label htmlFor="email">Adresse email</Label><Input id="email" type="email" placeholder="votre@email.ne" required /></div>
                    </div>
                    <div><Label htmlFor="sujet">Sujet</Label><Input id="sujet" placeholder="Objet de votre message" required /></div>
                    <div><Label htmlFor="message">Message</Label><Textarea id="message" placeholder="Décrivez votre demande..." rows={6} required /></div>
                    <Button type="submit" className="bg-gold hover:bg-gold/90 text-gold-foreground">Envoyer le message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-heading font-semibold">Coordonnées</h3>
                  <div className="flex items-start gap-3"><Mail className="h-5 w-5 text-gold shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Email</p><p className="text-sm text-muted-foreground">support@contenulocal.ne</p></div></div>
                  <div className="flex items-start gap-3"><Phone className="h-5 w-5 text-gold shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Téléphone</p><p className="text-sm text-muted-foreground">+227 20 72 00 00</p></div></div>
                  <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Adresse</p><p className="text-sm text-muted-foreground">Ministère du Pétrole<br />Boulevard de la République<br />BP 12345, Niamey, Niger</p></div></div>
                  <div className="flex items-start gap-3"><Clock className="h-5 w-5 text-gold shrink-0 mt-0.5" /><div><p className="text-sm font-medium">Horaires</p><p className="text-sm text-muted-foreground">Lundi - Vendredi<br />08h00 - 17h00</p></div></div>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold mb-2">Support technique</h3>
                  <p className="text-sm text-primary-foreground/80">Pour toute question technique relative à l'utilisation de la plateforme, notre équipe de support est disponible du lundi au vendredi.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
