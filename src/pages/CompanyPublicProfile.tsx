import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { mockCompanies } from '@/data/mock-data';
import { ArrowLeft, MapPin, Phone, Mail, Users, Calendar, Building } from 'lucide-react';

export default function CompanyPublicProfilePage() {
  const { id } = useParams();
  const company = mockCompanies.find(c => c.id === id);

  if (!company) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-heading font-bold mb-4">Entreprise introuvable</h1>
        <Button asChild variant="outline"><Link to="/annuaire"><ArrowLeft className="mr-2 h-4 w-4" />Retour</Link></Button>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground mb-4">
            <Link to="/annuaire"><ArrowLeft className="mr-2 h-4 w-4" />Retour à l'annuaire</Link>
          </Button>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-lg bg-primary-foreground/10 flex items-center justify-center">
              <span className="font-heading font-bold text-primary-foreground text-lg">{company.sigle}</span>
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-primary-foreground">{company.raisonSociale}</h1>
              <div className="flex items-center gap-3 mt-1">
                <StatusBadge status={company.status} />
                <span className="text-sm text-primary-foreground/60">{company.secteurPrincipal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader><CardTitle>Présentation</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground leading-relaxed">{company.descriptionCourte}</p></CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Capacités</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div><p className="text-xs text-muted-foreground">Effectif total</p><p className="text-lg font-bold">{company.effectifTotal}</p></div>
                    <div><p className="text-xs text-muted-foreground">Effectif nigérien</p><p className="text-lg font-bold">{company.effectifNigerien}</p></div>
                    <div><p className="text-xs text-muted-foreground">Taille</p><p className="text-lg font-bold">{company.tailleEntreprise}</p></div>
                  </div>
                  {company.certifications && (
                    <div><p className="text-xs text-muted-foreground mb-2">Certifications</p><div className="flex flex-wrap gap-2">{company.certifications.map((c, i) => <span key={i} className="bg-muted px-2 py-1 rounded text-xs">{c}</span>)}</div></div>
                  )}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{company.ville}, {company.region}</span></div>
                  <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{company.email}</span></div>
                  <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{company.telephone}</span></div>
                  <div className="flex items-center gap-2"><Building className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{company.formeJuridique} — NIF : {company.nif}</span></div>
                  <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-sm">Créée le {new Date(company.dateCreation).toLocaleDateString('fr-FR')}</span></div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <p className="text-xs text-muted-foreground mb-2">Complétion du profil</p>
                  <Progress value={company.completionRate} className="mb-2" />
                  <p className="text-xs text-muted-foreground">{company.completionRate}% complété</p>
                  <p className="text-xs text-muted-foreground mt-3">Dernière mise à jour : {new Date(company.derniereMiseAJour).toLocaleDateString('fr-FR')}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
