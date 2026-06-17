# Améliorations de l'espace agents du Ministère

Quatre chantiers complémentaires pour fluidifier le travail quotidien des agents, intégrés dans l'app existante (mock data, prêt pour démo). Pas de nouveau dashboard séparé : tout est greffé sur les pages actuelles du portail ministère.

---

## 1. Recherche avancée & filtres intelligents

**Page `Registre` (`src/pages/ministry/CompanyManagement.tsx`)**
- Barre de recherche étendue : nom, NIF, dirigeant, secteur, région — avec mise en surbrillance des correspondances.
- Filtres combinables persistés en URL : statut(s) multi-sélection, région(s), catégorie(s), taux de complétion (slider), certifications, date de dernière mise à jour.
- **Filtres rapides (chips)** au-dessus du tableau : « À qualifier », « Documents expirés », « Dossier incomplet », « Mises à jour requises », « Nouvelles inscriptions (7j) ».
- **Recherches sauvegardées** (localStorage) : l'agent enregistre un jeu de filtres sous un nom (« Mes dossiers Diffa à valider »).
- **Tri multi-colonnes** + indicateur du taux de complétion sous forme de mini-barre.
- **Export CSV** des résultats filtrés.

**Composant transverse `GlobalSearch` (nouveau, `src/components/GlobalSearch.tsx`)**
- Palette de commande (Cmd/Ctrl+K) accessible depuis le header `MinistryLayout`, qui cherche entreprises, opportunités, candidatures et navigue directement.

---

## 2. Workflow de qualification accéléré

**Nouvelle file de travail `src/pages/ministry/QualificationQueue.tsx`** (lien sidebar « File de qualification »)
- Liste priorisée des dossiers en attente, triée par ancienneté + complétude + signaux (région stratégique, secteur prioritaire).
- Vue en cartes avec : nom, NIF, statut, % complétion, jours d'attente, agent assigné, boutons d'action rapide.
- **Actions groupées** : sélection multiple → qualifier / qualifier avec réserves / demander mise à jour / suspendre / réassigner.
- **Assignation** d'un dossier à un agent (mock liste d'agents).

**Page détail entreprise `src/pages/ministry/CompanyDetail.tsx` enrichie**
- **Checklist de vérification** côté droit (documents requis, conformité fiscale, certifications, capacité technique) avec cases à cocher persistées.
- **Scoring automatique** (mock) : note /100 calculée sur complétion documents + ancienneté + certifications, avec recommandation suggérée (« Recommandation : Qualifier avec réserves »).
- **Timeline** consolidée des événements (soumissions, échanges, changements de statut).
- **Commentaires internes** (notes agent, non visibles par l'entreprise).
- **Modal d'action** unifiée pour changer de statut avec motif obligatoire + modèle de message pré-rempli.

---

## 3. Centre de notifications & alertes agent

**Nouvelle page `src/pages/ministry/AgentInbox.tsx`** (icône cloche dans le header avec compteur)
- Onglets : Tout / Nouveaux dossiers / Documents expirés / Mises à jour soumises / Relances dues / Système.
- Carte de notification = type, entreprise concernée, date, action rapide (Ouvrir le dossier / Marquer traité).
- Filtres par sévérité (info / attention / urgent) et par agent assigné.
- Marquage lu/non-lu, archivage, marquer tout comme lu.
- **Toast en direct** (mock setInterval démo) quand un nouveau dossier arrive — pour la démo ministère.

**Données** : extension de `src/data/mock-data.ts` avec une liste `agentNotifications` riche (50+ éléments variés).

---

## 4. Automatisations & règles métier

**Nouvelle page `src/pages/ministry/Automations.tsx`** (sidebar « Règles & Automatisations »)
- **Bibliothèque de règles** activables/désactivables (toggle), affichées comme cartes :
  - « Auto-passage à *Dossier complet* si tous les documents requis sont soumis »
  - « Relance automatique J+15 si dossier *En cours de qualification* sans action »
  - « Alerte agent si certificat fiscal expire dans < 30 jours »
  - « Suggestion IA de statut basée sur le scoring (mock) »
  - « Notification dirigeant entreprise lors du changement de statut »
- **Modèles de messages** réutilisables (demande de complément, notification de qualification, suspension motivée) — éditables, variables `{{entreprise}}`, `{{agent}}`, `{{date}}`.
- **Tâches planifiées** (mock visuel) : rapport hebdo PDF généré le lundi, synthèse mensuelle au ministre.
- **Journal d'exécution** : tableau des dernières actions automatiques avec horodatage (lu depuis mock data).

**Suggestion IA dans CompanyDetail**
- Encadré « Suggestion automatique » affichant un statut recommandé + justification courte, basé sur des règles déterministes mock (présenté comme IA pour la démo).

---

## Section technique

**Fichiers créés**
- `src/components/GlobalSearch.tsx` — palette Cmd+K (lib `cmdk` déjà présente via shadcn `command`).
- `src/components/QuickFilterChips.tsx` — chips de filtres rapides réutilisables.
- `src/components/SavedSearches.tsx` — gestion localStorage des recherches.
- `src/components/ChecklistVerification.tsx` — checklist du dossier.
- `src/components/CompanyScoring.tsx` — score visuel + recommandation.
- `src/components/InternalNotes.tsx` — notes agent.
- `src/components/NotificationCard.tsx` — carte notification.
- `src/components/AutomationRuleCard.tsx` — carte règle.
- `src/pages/ministry/QualificationQueue.tsx`
- `src/pages/ministry/AgentInbox.tsx`
- `src/pages/ministry/Automations.tsx`
- `src/pages/ministry/MessageTemplates.tsx`

**Fichiers modifiés**
- `src/layouts/MinistryLayout.tsx` — ajout des 3 nouveaux items sidebar (File de qualification, Notifications, Automatisations) + cloche header avec compteur + bouton recherche globale (Cmd+K).
- `src/pages/ministry/CompanyManagement.tsx` — refonte filtres, chips, recherches sauvegardées, actions groupées, export CSV.
- `src/pages/ministry/CompanyDetail.tsx` — checklist, scoring, timeline, notes, modal d'action unifiée.
- `src/App.tsx` — 3 nouvelles routes ministère.
- `src/types/index.ts` — types `AgentNotification`, `AutomationRule`, `MessageTemplate`, `InternalNote`, `ChecklistItem`, `SavedSearch`.
- `src/data/mock-data.ts` — jeux de données enrichis pour notifications, règles, modèles, scoring, agents.

**Hors périmètre**
- Pas de migration Supabase (mock conservé pour la démo).
- Pas de modification du portail entreprise ni des pages publiques.
- Pas de vrai moteur IA — les « suggestions IA » sont des règles déterministes étiquetées comme telles.
