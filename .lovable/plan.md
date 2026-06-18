## Objectif

Produire un document PDF institutionnel (FR, format A4) à remettre aux décideurs du Ministère du Pétrole du Niger pour décrocher le contrat de création et de production de la plateforme **Registre National du Contenu Local Pétrolier**.

**Positionnement clé** : le projet est déjà amorcé (prototype fonctionnel démontrable), ce qui garantit une livraison rapide et maîtrisée.

## Structure du document (≈ 12–14 pages)

1. **Couverture** — Titre, sous-titre, République du Niger / Ministère du Pétrole, mention « Document confidentiel — Proposition », date (juin 2026).
2. **Résumé exécutif** — 1 page : contexte, proposition, bénéfice, appel à décision.
3. **Contexte & cadre réglementaire** — Ordonnance n°2024-34 sur le contenu local, enjeux SORAZ / TAR 2026, besoin d'un registre national unifié.
4. **Problématique** — Fragmentation des données entreprises, absence de traçabilité, difficulté de pilotage des objectifs de contenu local.
5. **Notre solution** — Vue d'ensemble de la plateforme et ses 4 espaces : Public, Entreprise, Ministère, Opérateur (SORAZ).
6. **Fonctionnalités clés par acteur** — Tableau synthétique (qualification, scoring, appels d'offres, rapports réglementaires, cartographie régionale).
7. **Démonstration visuelle** — Captures d'écran (dashboard ministère, espace SORAZ, registre cartographique).
8. **Avantage concurrentiel — Projet déjà amorcé** — Section différenciante : prototype fonctionnel disponible, architecture validée, design system institutionnel défini, données métier modélisées (régions, lots TAR, workflow 8 étapes). Réduction du risque et du délai.
9. **Méthodologie & feuille de route** — 3 phases : Finalisation (2 mois) → Déploiement pilote SORAZ TAR 2026 (2 mois) → Généralisation & formation (2 mois). Total : 6 mois.
10. **Architecture technique & souveraineté** — Stack moderne, hébergement, sécurité, conformité données, montée en charge.
11. **Bénéfices mesurables** — KPIs : % contenu local tracké, délais qualification, transparence appels d'offres, conformité ordonnance.
12. **Équipe & gouvernance projet** — Comité de pilotage, interlocuteurs.
13. **Investissement & modalités** — Cadre budgétaire indicatif (placeholder à compléter par le client), modalités contractuelles.
14. **Prochaines étapes** — Démonstration live proposée, contacts.

## Détails techniques

- **Génération** : Python + ReportLab (Platypus pour mise en page multi-pages).
- **Identité visuelle** : palette projet — navy `#1E293B`, amber `#B45309`, fonds clairs ; typographies Helvetica (substitut Inter/Montserrat dans ReportLab).
- **Éléments graphiques** : bandeau de couverture coloré, en-têtes de section avec filet ambre, encarts (callouts) pour chiffres clés, tableau pour fonctionnalités, footer avec pagination et mention « République du Niger — Ministère du Pétrole ».
- **Captures d'écran** : 3 captures réalisées via Playwright sur le preview local (dashboard ministère, espace opérateur SORAZ, registre) puis intégrées comme images.
- **Langue** : français institutionnel formel exclusivement.
- **Livrable** : `/mnt/documents/proposition-registre-contenu-local-niger.pdf` + balise `<presentation-artifact>` pour téléchargement.
- **QA** : conversion de chaque page en JPEG (pdftoppm), inspection visuelle, corrections itératives avant livraison.

## Hors périmètre

- Pas de modification du code applicatif.
- Pas de chiffrage financier détaillé (laissé en placeholder à valider avec vous).
- Pas de version Word/PPTX (PDF uniquement, sauf demande contraire).

## Question avant production

Souhaitez-vous que j'inclue un **placeholder budgétaire** (fourchette indicative à remplir) ou que je laisse entièrement la section « Investissement » vide pour que vous la complétiez vous-même ?
