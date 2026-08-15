# Registre National du Contenu Local Pétrolier — État de la plateforme

**Version du document :** 15 août 2026
**Nature de l'actif :** prototype fonctionnel haute fidélité (démonstrateur), front-end complet, données de démonstration
**Public visé :** décideurs du Ministère du Pétrole, direction des agences nationales (SORAZ, etc.)

---

## 1. Réponses directes aux quatre questions critiques

### 1.1 Le back-end est-il réel ?

**Non. À ce jour, il n'y a aucun back-end.** L'application est une maquette dynamique : React + Vite + TypeScript, sans Lovable Cloud / Supabase branché, sans table, sans écriture persistante.

Concrètement :

- Aucun dossier `src/integrations/supabase`, aucun dossier `supabase/`, aucune dépendance client base de données dans `package.json`.
- Toutes les données proviennent de trois fichiers statiques : `src/data/mock-data.ts` (~420 lignes, 14 entreprises types), `src/data/admin-mock-data.ts`, `src/data/operateur-mock-data.ts`.
- L'authentification est simulée (`src/contexts/AuthContext.tsx`) avec un sélecteur de rôle : visiteur, entreprise, ministère, opérateur. Identifiants de démo : `/admin` → `admin/admin`, `/operateur-login` → `soraz/soraz`.
- Seule persistance existante : `localStorage`, sur trois écrans (checklist de vérification, recherches sauvegardées de l'administration, présélection de prestataires côté opérateur). Elle est locale au navigateur et disparaît si l'on change de poste.

**Conséquence sur la démonstration.** Le risque cité est réel mais maîtrisable : si un Directeur Général demande « montrez-moi une fiche entreprise », **il y a une fiche**, complète et crédible — 14 entreprises nigériennes types, avec NIF, RCCM, région, effectifs, effectif nigérien, certifications, équipements, taux de complétude, statut de qualification et historique. Ce qui n'existe pas, c'est l'écriture durable : une fiche créée pendant la démonstration n'est pas conservée après rechargement.

**Position à tenir :** « la couche métier et l'ergonomie sont déjà construites et validables aujourd'hui ; la base de données souveraine et l'authentification réelle constituent le lot 1 de l'industrialisation, chiffré et livrable en quelques semaines. » Ne jamais présenter le prototype comme un système en production.

**Ce qu'il faut faire pour rendre le back-end réel (lot 1) :** activation de Lovable Cloud (PostgreSQL managé), création des tables `entreprises`, `documents`, `qualifications`, `opportunites`, `candidatures`, `roles_utilisateurs`, `journal_audit`, `campagnes`, `lots`, `appels_offres`, `offres` ; sécurité par Row Level Security ; rôles stockés dans une table dédiée `user_roles` (jamais sur le profil) ; stockage de fichiers pour les pièces justificatives ; migration des données de démonstration en jeu de test.

### 1.2 La classification correspond-elle aux trois catégories de l'ordonnance ?

**Non, pas encore — et c'est le seul chantier réellement bloquant.**

La taxonomie actuelle a été conçue avant la publication du texte. Elle repose sur deux axes :

- un champ libre `typeActeur` avec trois valeurs de fait : **Prestataire de services**, **Sous-traitant**, **Fournisseur** ;
- une liste de 23 catégories d'activité (`CATEGORIES` dans `src/types/index.ts`) : transport et logistique, génie civil, maintenance industrielle, soudure/chaudronnerie, électricité industrielle, HSE, environnement, catering, sécurité, location d'engins, TIC, formation, consultance, fournitures industrielles, services financiers, banque/assurance/garantie, hôtellerie, RH, transit/douane, services juridiques, location de véhicules, services administratifs, fournitures de bureau.

Trois valeurs existent donc bien, mais **rien ne garantit qu'elles correspondent aux trois catégories définies par l'ordonnance du 16 juillet**. Tant que le texte n'est pas en main, l'alignement ne peut pas être fait — et il ne doit pas être improvisé, car il conditionne le statut juridique de chaque entreprise inscrite, les seuils applicables et les obligations des opérateurs.

**Action immédiate requise :** obtenir le texte de l'ordonnance et ses éventuels arrêtés d'application. Le travail technique est ensuite limité et rapide (1 à 2 semaines) : remplacer `typeActeur: string` par un type énuméré strict aligné sur le texte, ajouter les critères légaux de rattachement à chaque catégorie, adapter les filtres, badges, exports et rapports, et prévoir une table de correspondance pour reclasser les fiches existantes.

**Formulation à utiliser devant le Ministère :** c'est un argument de crédibilité, pas une faiblesse — « la plateforme est prête ; nous refusons d'inventer une taxonomie réglementaire et demandons le texte officiel pour caler la classification au mot près. »

### 1.3 Le parcours d'inscription fonctionne-t-il de bout en bout ?

**Visuellement oui, techniquement non.** Le parcours est intégralement dessiné et navigable, mais rien n'est enregistré.

Ce qui existe et se démontre :

1. `/inscription` — formulaire de création de compte entreprise : raison sociale, forme juridique, NIF, email, téléphone, mot de passe, acceptation des conditions.
2. Redirection automatique vers `/entreprise/profil` — dossier entreprise structuré avec taux de complétude affiché.
3. `/entreprise/dashboard` — état d'avancement du dossier, notifications, opportunités recommandées.
4. Suivi du statut de qualification en 8 états : pré-enregistré, recensé, dossier complété, en cours de qualification, qualifié, qualifié avec réserves, suspendu, à mettre à jour.
5. Parcours de qualification en 6 étapes visibles : inscription, recensement, vérification du dossier, qualification, visibilité renforcée, accès aux marchés.
6. Côté Ministère : file de qualification (`/ministere/file`), fiche entreprise avec scoring automatique et recommandation, checklist de vérification, changement de statut, journal d'audit.

Ce qui manque pour un bout en bout réel : création de compte réelle avec vérification d'email, **dépôt de fichiers** (aucun téléversement de pièce justificative n'est actuellement possible — pas de stockage), persistance du statut décidé par l'agent, notification effective de l'entreprise (email/SMS), et attestation de qualification téléchargeable.

### 1.4 Y a-t-il un tableau de bord d'indicateurs ?

**Oui — et c'est ce qu'il faut montrer en premier.** `/ministere/dashboard` est le point d'entrée de la démonstration, il emploie le vocabulaire de l'ordonnance.

Indicateurs présentés :

- volumétrie du registre : entreprises inscrites, recensées, qualifiées, suspendues, à mettre à jour ;
- taux de qualification et taux moyen de complétude des dossiers ;
- répartition par région (8 régions du Niger) et par catégorie d'activité ;
- emploi : effectif total déclaré et part de l'effectif nigérien ;
- opportunités publiées, candidatures reçues, taux de réponse ;
- charge de travail administrative : dossiers en attente, relances dues, documents expirant.

Deux tableaux de bord complémentaires existent : `/operateur/dashboard` (pilotage de la grande maintenance SORAZ avec compte à rebours, budget, objectif contenu local vs réalisé) et `/operateur/contenu-local` (jauges d'engagement : dépenses locales, main-d'œuvre nigérienne, matériaux locaux). `/ministere/rapports` permet la génération de rapports et l'export CSV.

Précision d'honnêteté : ces indicateurs sont calculés sur les 14 entreprises de démonstration. La logique de calcul est écrite et fonctionnera à l'identique sur des données réelles.

---

## 2. Ce que la plateforme est

Un registre national numérique du contenu local pétrolier organisé en **quatre espaces distincts**, en français institutionnel, orienté poste de travail.

### 2.1 Espace public (visiteur)

| Route | Contenu |
|---|---|
| `/` | Page d'accueil institutionnelle, campagne nationale de recensement |
| `/a-propos` | Cadre réglementaire et mission du registre |
| `/annuaire` | Annuaire public des entreprises, filtres région / catégorie / statut |
| `/annuaire/:id` | Fiche publique d'une entreprise |
| `/opportunites` | Appels à manifestation d'intérêt, sous-traitance, consultations, formations |
| `/opportunites/:id` | Détail d'une opportunité, pièces requises, échéance |
| `/faq`, `/contact` | Accompagnement des entreprises |

### 2.2 Espace entreprise

Tableau de bord, dossier entreprise avec complétude, consultation des opportunités, candidatures, notifications.

### 2.3 Espace Ministère (administration)

- **Tableau de bord d'indicateurs** (voir 1.4).
- **Gestion des entreprises** : recherche avancée, filtres cumulables sous forme de chips, recherches sauvegardées, actions groupées, export CSV, pagination.
- **File de qualification** : traitement des dossiers par priorité.
- **Fiche entreprise** : scoring automatique avec recommandation, checklist de vérification, agent assigné, historique.
- **Boîte de réception agent** : notifications classées par catégorie (nouveau dossier, document expirant, mise à jour soumise, relance due, système) et par sévérité (information, attention, urgent).
- **Automatisations** : 5 règles activables (dossier complet, inactivité 15 jours, certificat expirant, scoring élevé, changement de statut), modèles de messages à variables, tâches planifiées, journal d'exécution.
- **Gestion des opportunités et des candidatures**, **rapports**, **journal d'audit**, **paramètres**.

### 2.4 Espace Donneur d'ordre (SORAZ et agences nationales)

Conçu pour le pilotage d'un arrêt majeur de raffinerie (grande maintenance / TAR) :

- **Campagnes TAR** avec phases : cadrage, contractualisation, pré-exécution, exécution, redémarrage, post-arrêt ; compte à rebours, budget, objectif et réalisé de contenu local, effectif de pic.
- **Registre filtrable avec carte du Niger** et présélection de prestataires.
- **Allotissement** : 12 lots de la maintenance 2026, famille métier, durée, effectif requis, certifications exigées, budget estimé, statut d'avancement, attributaire.
- **Appels d'offres** (RFI / RFQ) avec pondération technique / financière / **contenu local**, réception et notation des offres, part d'effectif nigérien par offre.
- **Suivi contenu local** et **génération de rapports à destination du Ministère**.

### 2.5 Socle technique

React 18, Vite 5, TypeScript 5, Tailwind CSS 3, shadcn/ui, React Router, TanStack Query. Identité visuelle : bleu marine profond (#1E293B) et ambre (#B45309), titres Montserrat, texte Inter. Design system par jetons sémantiques. Bandeau de propriété « Plateforme générée par Saharan Impact ». Assistant conversationnel présent sous forme de bouton animé non fonctionnel (placeholder de démonstration).

---

## 3. Ce qui est fait

- [x] Architecture complète à 4 rôles et 45+ écrans navigables
- [x] Identité visuelle institutionnelle et design system cohérent
- [x] Annuaire public avec recherche et filtres
- [x] Module opportunités et candidatures
- [x] Parcours de qualification en 8 statuts et 6 étapes
- [x] Espace administration : recherche avancée, file de qualification, scoring, checklist, boîte de réception, automatisations, audit
- [x] Tableau de bord d'indicateurs Ministère
- [x] Espace Donneur d'ordre complet (campagnes, lots, appels d'offres, contenu local, rapports)
- [x] Exports CSV et génération de rapports
- [x] Jeu de données de démonstration réaliste (14 entreprises, régions et métiers nigériens)
- [x] Document de proposition commerciale PDF (11 pages)

## 4. Ce qu'il reste à faire

### Bloquant — dépend du Ministère

1. **Obtenir le texte de l'ordonnance du 16 juillet** et aligner la classification sur ses trois catégories (voir 1.2).
2. Valider les critères officiels de qualification et les seuils applicables.

### Lot 1 — Socle réel (4 à 6 semaines)

3. Base de données PostgreSQL souveraine, tables et politiques de sécurité par ligne.
4. Authentification réelle : inscription, vérification d'email, mot de passe oublié, sessions.
5. Rôles applicatifs en table dédiée, cloisonnement strict des quatre espaces.
6. **Téléversement et stockage des pièces justificatives** (RCCM, NIF, attestations fiscale et sociale, certifications, références) avec contrôle de format, de taille et d'antivirus.
7. Persistance des décisions de qualification et journal d'audit inaltérable.

### Lot 2 — Industrialisation (4 à 6 semaines)

8. Notifications réelles par email, puis SMS (contexte nigérien : couverture data inégale).
9. Attestation de qualification signée et téléchargeable, avec QR de vérification.
10. Exécution effective des règles d'automatisation côté serveur (tâches planifiées).
11. Tableau de bord d'indicateurs sur données réelles, avec séries temporelles et exports réglementaires.
12. Vérification des identifiants NIF / RCCM par interconnexion avec les administrations concernées.
13. Journalisation, sauvegardes, plan de reprise, hébergement et clauses de souveraineté des données.

### Lot 3 — Extensions

14. Portail multi-opérateurs (au-delà de SORAZ) avec cloisonnement par organisation.
15. Adaptation mobile et mode dégradé faible connexion.
16. Assistant conversationnel réellement fonctionnel pour l'accompagnement des entreprises.
17. API d'interopérabilité pour les opérateurs et les tiers habilités.
18. Accessibilité, tests automatisés de bout en bout, recette utilisateur avec les agents du Ministère.

---

## 5. Recommandation pour la présentation

Ordre conseillé : **(1)** tableau de bord d'indicateurs Ministère — c'est le mot de l'ordonnance ; **(2)** une fiche entreprise complète avec son scoring ; **(3)** la file de qualification et les automatisations, qui montrent le gain de temps administratif ; **(4)** l'espace SORAZ, qui prouve que le registre sert aussi les donneurs d'ordre.

Annoncer d'emblée et sans détour : jeu de données de démonstration, base souveraine au lot 1, classification à caler sur le texte officiel. Cette transparence est ce qui transforme un prototype en engagement crédible.
