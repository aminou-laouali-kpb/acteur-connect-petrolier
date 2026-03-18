import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusBadge } from '@/components/StatusBadge';
import { Progress } from '@/components/ui/progress';
import { mockCompanies, mockOpportunities, dashboardStats } from '@/data/mock-data';
import { Building2, Search, BarChart3, Users, FileText, Target, ArrowRight, CheckCircle, Shield, Globe, Phone, Mail, ShieldCheck, Megaphone, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const pillars = [
  { icon: Building2, title: 'Recenser', description: 'Constituer le registre officiel des entreprises nationales capables d\'intervenir dans le secteur pétrolier, avec un processus de recensement structuré et transparent.' },
  { icon: Award, title: 'Qualifier', description: 'Évaluer et qualifier les capacités techniques, financières et opérationnelles des acteurs locaux selon des critères rigoureux alignés sur les standards du secteur.' },
  { icon: Target, title: 'Connecter', description: 'Mettre en relation les entreprises qualifiées avec les compagnies pétrolières, sous-traitants principaux et donneurs d\'ordre du secteur.' },
];

const stats = [
  { value: `${dashboardStats.totalEntreprises}`, label: 'Entreprises recensées' },
  { value: `${dashboardStats.entreprisesQualifiees}`, label: 'Entreprises qualifiées' },
  { value: `${dashboardStats.tauxQualification}%`, label: 'Taux de qualification' },
  { value: '7', label: 'Régions couvertes' },
];

export default function HomePage() {
  const recentOpportunities = mockOpportunities.filter(o => o.statut === 'publiee').slice(0, 3);
  const qualifiedCompanies = mockCompanies.filter(c => c.status === 'qualifie' || c.status === 'qualifie_avec_reserves').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.1),transparent_60%)]" />
        <div className="container relative">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-gold font-heading font-semibold text-sm tracking-widest uppercase mb-4">République du Niger — Ministère du Pétrole</p>
            <h1 className="text-3xl lg:text-5xl font-heading font-bold text-primary-foreground leading-tight mb-6">
              Registre officiel des entreprises qualifiées du contenu local pétrolier
            </h1>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl">
              Plateforme nationale pour recenser, qualifier et connecter les acteurs du contenu local avec les compagnies pétrolières, sous-traitants principaux et donneurs d'ordre du secteur.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-heading font-semibold">
                <Link to="/inscription">Participer au recensement</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-foreground bg-primary-foreground hover:bg-primary-foreground/90">
                <Link to="/opportunites">Consulter les opportunités</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/annuaire">Explorer le registre <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* National census campaign banner */}
      <section className="bg-gold/10 border-b border-gold/20">
        <div className="container py-8">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center shrink-0">
                <Megaphone className="h-7 w-7 text-gold" />
              </div>
              <div>
                <h2 className="font-heading font-bold text-lg">Campagne nationale de recensement des fournisseurs et prestataires du secteur pétrolier</h2>
                <p className="text-sm text-muted-foreground mt-1">Recensement en cours — Inscrivez votre entreprise pour être éligible aux marchés du secteur pétrolier au Niger.</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 min-w-[200px]">
              <div className="flex items-center gap-3 w-full">
                <Progress value={dashboardStats.progressionRecensement} className="h-3 flex-1" />
                <span className="text-sm font-bold text-gold">{dashboardStats.progressionRecensement}%</span>
              </div>
              <p className="text-xs text-muted-foreground">{dashboardStats.entreprisesRecensees} entreprises déjà recensées</p>
              <Button asChild size="sm" className="bg-gold hover:bg-gold/90 text-gold-foreground">
                <Link to="/inscription">Inscrire mon entreprise <ArrowRight className="ml-1 h-3 w-3" /></Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-card border-b">
        <div className="container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={i} initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                <p className="text-3xl lg:text-4xl font-heading font-bold text-gold">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4">Notre approche</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le Registre National du Contenu Local s'articule autour de trois piliers fondamentaux pour structurer l'écosystème pétrolier national.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.15 }}>
                <Card className="h-full hover:shadow-lg transition-shadow border-t-4 border-t-gold">
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                      <pillar.icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-3">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent opportunities */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold">Opportunités récentes</h2>
              <p className="text-muted-foreground text-sm mt-1">Marchés publiés par les compagnies pétrolières, sous-traitants et le Ministère</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/opportunites">Voir toutes <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {recentOpportunities.map((opp) => (
              <Card key={opp.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge status={opp.statut} />
                    <span className="text-xs text-muted-foreground">{opp.reference}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-2 line-clamp-2">{opp.titre}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{opp.structureEmettrice}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{opp.region}</span>
                    <span>Limite : {new Date(opp.dateLimite).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <Button asChild variant="link" size="sm" className="mt-3 px-0 text-gold">
                    <Link to={`/opportunites/${opp.id}`}>Voir les détails <ArrowRight className="ml-1 h-3 w-3" /></Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Qualified companies */}
      <section className="py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-heading font-bold">Entreprises qualifiées</h2>
              <p className="text-muted-foreground text-sm mt-1">Acteurs du contenu local inscrits au registre officiel</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/annuaire">Consulter le registre <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualifiedCompanies.map((company) => (
              <Card key={company.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <span className="font-heading font-bold text-primary text-sm">{company.sigle}</span>
                  </div>
                  <h3 className="font-heading font-semibold text-sm mb-1">{company.raisonSociale}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{company.secteurPrincipal}</p>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={company.status} />
                    <span className="text-xs text-muted-foreground">{company.region}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why this platform */}
      <section className="py-20 bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold text-primary-foreground mb-6">
              Pourquoi le Registre National du Contenu Local
            </h2>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Un outil stratégique pour renforcer la participation des entreprises nigériennes dans les marchés du secteur pétrolier, assurer la transparence des processus de qualification et faciliter la mise en relation avec les opérateurs internationaux.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {[
                { icon: ShieldCheck, title: 'Visibilité renforcée', text: 'Les entreprises qualifiées bénéficient d\'une visibilité accrue auprès des donneurs d\'ordre.' },
                { icon: TrendingUp, title: 'Participation locale', text: 'Suivi et pilotage de la participation des acteurs nationaux aux marchés pétroliers.' },
                { icon: Globe, title: 'Connexion opérateurs', text: 'Mise en relation directe avec les compagnies pétrolières et sous-traitants principaux.' },
                { icon: BarChart3, title: 'Pilotage stratégique', text: 'Indicateurs de contenu local et tableaux de bord pour le pilotage des politiques publiques.' },
              ].map((item, i) => (
                <div key={i} className="bg-primary-foreground/5 rounded-lg p-6">
                  <item.icon className="h-6 w-6 text-gold mb-3" />
                  <h3 className="font-heading font-semibold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-primary-foreground/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Questions fréquentes</h2>
            <p className="text-muted-foreground mb-8">
              Vous avez des questions sur le registre, le processus de qualification ou les opportunités ? Consultez notre FAQ.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/faq">Consulter la FAQ <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact section */}
      <section className="py-16 bg-muted/50 border-t">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-heading font-bold mb-4">Besoin d'assistance ?</h2>
            <p className="text-muted-foreground mb-6">
              Notre équipe est disponible pour vous accompagner dans votre processus de qualification.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-gold" />
                <span>registre@contenulocal.ne</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-gold" />
                <span>+227 20 72 00 00</span>
              </div>
            </div>
            <Button asChild className="bg-gold hover:bg-gold/90 text-gold-foreground">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
