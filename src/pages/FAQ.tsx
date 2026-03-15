import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'Qui peut s\'inscrire sur la plateforme ?', a: 'Toute entreprise de droit nigérien exerçant dans un domaine lié au secteur pétrolier peut s\'inscrire. Cela inclut les prestataires de services, les sous-traitants, les fournisseurs, les bureaux d\'études et les organismes de formation.' },
  { q: 'L\'inscription est-elle gratuite ?', a: 'Oui, l\'inscription sur la plateforme est entièrement gratuite. Il n\'y a aucun frais pour créer un compte, soumettre un dossier ou postuler aux opportunités.' },
  { q: 'Quels documents sont nécessaires pour l\'inscription ?', a: 'Vous devrez fournir : le NIF, le RCCM, l\'attestation de la Chambre de Commerce, les statuts de l\'entreprise, la pièce d\'identité du représentant légal, une attestation de localisation et une description signée de votre entreprise.' },
  { q: 'Combien de temps prend la validation d\'un dossier ?', a: 'Le délai de validation est généralement de 5 à 10 jours ouvrés après soumission d\'un dossier complet. L\'équipe du Ministère peut demander des compléments d\'information si nécessaire.' },
  { q: 'Comment consulter les opportunités ?', a: 'Les opportunités sont accessibles depuis la section "Opportunités" de la plateforme. Vous pouvez les filtrer par type, catégorie, région et statut. Les entreprises validées peuvent soumettre leurs candidatures directement en ligne.' },
  { q: 'Puis-je modifier mon profil après validation ?', a: 'Oui, vous pouvez mettre à jour votre profil à tout moment. Certaines modifications majeures peuvent nécessiter une nouvelle validation par l\'équipe du Ministère.' },
  { q: 'Comment savoir si ma candidature a été retenue ?', a: 'Vous recevrez une notification dans votre espace entreprise lorsque le statut de votre candidature change. Vous pouvez aussi suivre l\'avancement de vos candidatures dans la section "Candidatures" de votre tableau de bord.' },
  { q: 'La plateforme est-elle accessible depuis un téléphone mobile ?', a: 'Oui, la plateforme est conçue pour fonctionner sur tous les appareils : ordinateurs, tablettes et téléphones mobiles.' },
  { q: 'Qui gère la plateforme ?', a: 'La plateforme est gérée par la Direction du Contenu Local du Ministère du Pétrole de la République du Niger, en collaboration avec les partenaires techniques du projet.' },
  { q: 'Comment contacter le support ?', a: 'Vous pouvez nous contacter par email à support@contenulocal.ne, par téléphone au +227 20 72 00 00, ou via le formulaire de contact disponible sur la plateforme.' },
];

export default function FAQPage() {
  return (
    <div>
      <section className="bg-primary py-12">
        <div className="container">
          <h1 className="text-3xl font-heading font-bold text-primary-foreground mb-2">Questions fréquentes</h1>
          <p className="text-primary-foreground/80">Retrouvez les réponses aux questions les plus courantes sur la plateforme.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-lg border px-6">
                <AccordionTrigger className="text-left font-heading font-semibold text-sm">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
