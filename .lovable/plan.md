## Contexte (issu de la recherche)

La **SORAZ** (raffinerie de Zinder, 20 000 b/j, CNPC 60% / État 40%) exécute une **grande maintenance (TAR — turnaround) tous les 3 ans**, durée ~60 jours, mobilisant **2 000+ personnes** et **30 à 80 prestataires simultanés** répartis en 20–50 lots (échafaudage, soudure, NDT, calorifugeage, hydroblasting, catalyseur, levage, HSE, restauration, etc.). L'**Ordonnance n°2024-34 du 2 août 2024** impose désormais aux opérateurs un suivi formel du contenu local (biens, services, emploi nigérien, transfert de compétences). Les benchmarks **NOGICJQS (Nigeria)**, **Petrobras (Brésil)** et **Sonatrach (Algérie)** confirment qu'une plateforme registre dotée d'un *space donneur d'ordre* réduit le sourcing de 6 mois à quelques jours et garantit le reporting réglementaire.

Le projet actuel a déjà un portail public, un portail entreprise, un portail ministère. **Il manque le 3ᵉ acteur** : l'opérateur/donneur d'ordre qui *consomme* le registre pour ses marchés.

---

## Objectif

Créer un **nouveau rôle `operateur` (Donneur d'Ordre)** avec son propre portail `/operateur/*`, dédié aux directions techniques d'agences/sociétés nationales liées au pétrole (SORAZ, SONIDEP, SOPAMIN-hydrocarbures, futures filiales). Premier cas d'usage : **planifier la grande maintenance SORAZ 2026** en s'appuyant sur le registre national.

Périmètre = **maquette fonctionnelle (mock data)** alignée sur l'architecture démo existante. Aucune migration Lovable Cloud à ce stade.

---

## Phase 1 — Fondations (P1, livré d'un trait)

### 1. Nouveau rôle & authentification
- `src/types/index.ts` : ajouter `'operateur'` à `UserRole`, ajouter `OperateurOrganisation` (`{ id, nom, sigle, type: 'raffinerie'|'distribution'|'exploration'|'transport', logo, directeur }`).
- `src/contexts/AuthContext.tsx` : étendre `currentUser` pour exposer une `organisation` quand `currentRole==='operateur'` (mock : SORAZ par défaut).
- `src/components/RoleSwitcher.tsx` : ajouter l'entrée « Donneur d'Ordre (SORAZ) ».
- Page de connexion dédiée `/operateur` (similaire à `/admin`).

### 2. Nouveau layout
- `src/layouts/OperateurLayout.tsx` : sidebar bleu marine + bandeau spécifique « SORAZ — Direction Maintenance », badge organisation, switcher (si plusieurs orgs), `GlobalSearch` réutilisé, cloche notifications, déconnexion.
- Items sidebar : Tableau de bord, Mes campagnes TAR, Registre fournisseurs, Allotissement, Appels d'offres (RFI/RFQ), Tableau contenu local, Rapports Ministère, Paramètres.

### 3. Routes App.tsx
Sous `/operateur/*` (protégé par `currentRole==='operateur'`) :
`dashboard`, `campagnes`, `campagnes/:id`, `registre`, `allotissement/:campagneId`, `appels-offres`, `appels-offres/:id`, `contenu-local`, `rapports`, `parametres`.

### 4. Données mock dédiées
`src/data/operateur-mock-data.ts` : 1 organisation SORAZ, 1 campagne TAR « Grande Maintenance 2026 » (T-14 mois), ~25 lots pré-définis tirés des familles métier identifiées (échafaudage, NDT, soudure, calorifugeage, hydroblasting, levage, HSE, catering…), ~12 appels d'offres à différents stades, engagements contenu local cibles vs réalisés.

---

## Phase 2 — 5 fonctionnalités prioritaires (les plus à fort impact)

### F1. Tableau de bord TAR (`Dashboard.tsx`)
Compte à rebours jusqu'à l'arrêt programmé, jauge contenu local global (objectif 60% vs réalisé), nb lots attribués / total, nb prestataires mobilisés, alertes (lots sans candidat local, certificats expirants), timeline phases TAR (Scoping → Contracting → Execution → Start-up → Post-TAR).

### F2. Registre fournisseurs filtré (`Registre.tsx`)
Réutilise `mockCompanies` + filtres orientés TAR : famille de métier (17 catégories), région, certifications (ISO 9001/45001, ASME IX, ASNT, NEBOSH…), score qualification, capacité effectif. Actions : **Présélectionner**, **Inviter à un AO**, **Ajouter à un lot**, **Demander mise à jour dossier**. Carte interactive Niger (vue F9 cartographie capacités) montrant la densité des prestataires par région.

### F3. Scoping & Allotissement (`Allotissement.tsx`)
Arbre WBS d'une campagne TAR : groupes de lots > lots > exigences (effectif, durée, certifications). Pour chaque lot : nombre de prestataires éligibles dans le registre (calculé), badge **« Gap contenu local »** si <2 prestataires locaux qualifiés. Drag-and-drop ou modal d'édition simple. Export PDF/CSV du plan d'allotissement.

### F4. Appels d'offres RFI/RFQ (`AppelsOffres.tsx` + détail)
Création d'AO rattaché à un lot, sélection des invités depuis présélection, grille de notation (technique 50% / financier 30% / **contenu local 20%**), tableau comparatif des offres mockées, décision d'attribution avec piste d'audit. Ces AO restent visibles dans le portail entreprise existant (réutilisation du modèle `Opportunity`, juste avec un nouveau `structureEmettriceType: 'compagnie_petroliere'`).

### F5. Tableau Contenu Local & Reporting Ministère (`ContenuLocal.tsx` + `Rapports.tsx`)
Suivi temps réel : % dépenses prestataires nigériens, % main-d'œuvre nigérienne, % matériaux locaux, ventilation par lot et par phase, comparaison objectif/réalisé. Génération d'un **rapport conforme Ordonnance 2024-34** (PDF mocké) envoyable au Ministère — apparaît côté ministère dans `AgentInbox`.

---

## Phase 3 (différée, à confirmer plus tard)

F6 substitution prestataire défaillant, F7 notation post-TAR, F10 Project Hub TAR (Gantt, PTW, NCR). Non inclus dans cette première livraison pour garder la maquette focalisée.

---

## Détails techniques

- **Tokens design** : palette navy/amber existante conservée, accent supplémentaire « petroleum-deep » (variante navy plus saturée) défini dans `index.css` pour distinguer visuellement le portail Donneur d'Ordre du portail Ministère.
- **Réutilisation** : `StatusBadge`, `StatCard`, `EmptyState`, `Pagination`, `GlobalSearch`, `ChecklistVerification`, `CompanyScoring` réutilisés tels quels.
- **Pas de backend** : tout est mock, persistance localStorage pour les présélections et brouillons d'AO (cohérent avec les autres modules admin).
- **Liens croisés** :
  - Le portail Ministère gagne un onglet « Donneurs d'ordre » (lecture seule) listant SORAZ et ses campagnes en cours, avec accès aux rapports CL soumis.
  - Le portail Entreprise voit les AO SORAZ apparaître naturellement dans sa liste d'opportunités (filtre `structureEmettrice = SORAZ`).
- **i18n** : tout en français institutionnel (mémoire projet respectée).

---

## Fichiers créés / modifiés (vue d'ensemble)

**Créés**
- `src/layouts/OperateurLayout.tsx`
- `src/pages/operateur/Dashboard.tsx`
- `src/pages/operateur/Campagnes.tsx`, `CampagneDetail.tsx`
- `src/pages/operateur/Registre.tsx`
- `src/pages/operateur/Allotissement.tsx`
- `src/pages/operateur/AppelsOffres.tsx`, `AppelOffreDetail.tsx`
- `src/pages/operateur/ContenuLocal.tsx`
- `src/pages/operateur/Rapports.tsx`
- `src/pages/operateur/Parametres.tsx`
- `src/pages/OperateurLogin.tsx`
- `src/data/operateur-mock-data.ts`
- `src/components/operateur/CampagneTimeline.tsx`
- `src/components/operateur/LotCard.tsx`
- `src/components/operateur/ContenuLocalGauge.tsx`
- `src/components/operateur/RegistreMapNiger.tsx` (SVG schématique)

**Modifiés**
- `src/types/index.ts` (rôle + types TAR : `Campagne`, `Lot`, `AppelOffre`, `EngagementCL`)
- `src/contexts/AuthContext.tsx`
- `src/components/RoleSwitcher.tsx`
- `src/App.tsx` (routes + login)
- `src/pages/ministry/Dashboard.tsx` (carte « Donneurs d'ordre actifs »)
- `src/index.css` (token couleur additionnel)

---

## Hors périmètre

- Pas de connexion Lovable Cloud / Supabase.
- Pas de vrai moteur de scoring IA (règles déterministes étiquetées « suggestion »).
- Pas de Gantt interactif complet, ni gestion permis de travail (Phase 3).
- Pas de modification du chatbot ni du portail public.
