

# Repositionnement stratégique — Registre officiel du contenu local pétrolier

Ce plan couvre une refonte majeure du positionnement, des statuts, des données, du wording et des KPIs à travers toute l'application.

---

## 1. Refonte des types et statuts de qualification

**`src/types/index.ts`** — Remplacer `CompanyStatus` par un parcours de qualification officiel :

```
'pre_enregistre' | 'recense' | 'dossier_complete' | 'en_cours_qualification' | 'qualifie' | 'qualifie_avec_reserves' | 'suspendu' | 'a_mettre_a_jour'
```

Ajouter un type `StructureEmettrice` :
```
'ministere' | 'compagnie_petroliere' | 'sous_traitant_principal' | 'structure_sectorielle'
```

Mettre à jour `STATUS_LABELS`, `CATEGORIES` (ajouter les 12 nouvelles catégories : Services financiers, Banque/assurance/garantie, Hôtellerie, Hébergement, Restauration/catering, RH/recrutement, Transit/douane, Services juridiques, Location de véhicules, Services administratifs, Fournitures de bureau, Formation professionnelle).

Ajouter `STRUCTURE_EMETTRICE_LABELS` et `QUALIFICATION_STATUS_LABELS`.

## 2. Mise à jour du StatusBadge

**`src/components/StatusBadge.tsx`** — Remplacer toute la config pour refléter les 8 nouveaux statuts de qualification avec des couleurs premium distinctives. "Qualifié" = vert avec icône bouclier, "Qualifié avec réserves" = ambre, etc.

## 3. Refonte des données mock

**`src/data/mock-data.ts`** — Mettre à jour :
- Statuts des 20 entreprises avec les nouveaux statuts de qualification
- `structureEmettrice` des opportunités avec le type (pas juste le nom)
- `dashboardStats` : ajouter `entreprisesQualifiees`, `tauxQualification`, `entreprisesRecensees`, `progressionRecensement`, `besoinsRenforcement`
- `companiesByCategory` : ajouter les nouvelles catégories
- Nouvelle donnée `opportunitesByDonneurOrdre` pour les KPIs

## 4. Refonte de la page d'accueil

**`src/pages/Index.tsx`** — Changements majeurs :

- **Hero** : Repositionner le wording — "Registre officiel des entreprises qualifiées du contenu local pétrolier". Mentionner la connexion avec compagnies pétrolières, sous-traitants principaux et donneurs d'ordre sectoriels.
- **Nouvelle section "Campagne nationale"** : Bandeau proéminent entre le hero et les stats avec le message "Campagne nationale de recensement des fournisseurs et prestataires du secteur pétrolier" + CTA "Participer au recensement" avec une barre de progression du recensement.
- **Stats bar** : Remplacer par des KPIs stratégiques (entreprises recensées, qualifiées, taux de qualification, régions couvertes).
- **3 Piliers** : Conserver mais renforcer le wording (Recenser → "Registre officiel", Qualifier → "Processus de qualification", Connecter → "Mise en relation avec compagnies pétrolières et sous-traitants").
- **Section "Pourquoi"** : Reformuler autour de la visibilité renforcée, participation locale, connexion avec les opérateurs, pilotage des marchés.
- **Entreprises inscrites** : Renommer "Entreprises qualifiées" et ne montrer que les qualifiées.

## 5. Mise à jour du layout public

**`src/layouts/PublicLayout.tsx`** :
- Header : "Contenu Local" → "Registre National du Contenu Local"
- Nav : "Annuaire" → "Registre"
- Footer : wording institutionnel aligné

## 6. Mise à jour de l'annuaire → Registre

**`src/pages/Directory.tsx`** :
- Titre : "Annuaire des entreprises" → "Registre officiel des entreprises qualifiées"
- Sous-titre institutionnel
- Filtres par statut de qualification mis à jour
- Affichage du badge de qualification premium sur chaque carte

## 7. Refonte du dashboard ministère

**`src/pages/ministry/Dashboard.tsx`** — Ajouter les KPIs stratégiques :
- Entreprises recensées / qualifiées / taux de qualification
- Progression du recensement (jauge)
- Participation locale par catégorie
- Entreprises actives sur les opportunités
- Opportunités par type de donneur d'ordre
- Besoins de renforcement identifiés

## 8. Mise à jour gestion entreprises (ministère)

**`src/pages/ministry/CompanyManagement.tsx`** :
- Titre : "Gestion des entreprises" → "Registre des entreprises — Parcours de qualification"
- Filtres de statut mis à jour avec les 8 nouveaux statuts
- Actions : boutons adaptés au workflow (Recenser, Qualifier, Qualifier avec réserves, Suspendre, Demander mise à jour)

## 9. Mise à jour dashboard entreprise

**`src/pages/company/Dashboard.tsx`** :
- "Statut de validation" → montrer le statut de qualification avec le parcours visible (inscription → recensement → vérification → qualification → visibilité renforcée → accès aux opportunités) sous forme de stepper
- Wording "dossier de qualification" plutôt que "profil"

## 10. Mise à jour profil entreprise

**`src/pages/company/Profile.tsx`** :
- Titre : "Profil entreprise" → "Dossier de qualification"
- Sous-titre : "Complétez votre dossier pour être qualifié et accéder aux marchés du secteur pétrolier"
- Catégories mises à jour dans le sélecteur

## 11. Mise à jour page Opportunités

**`src/pages/Opportunities.tsx`** :
- Ajouter un filtre par type de donneur d'ordre (structure émettrice)
- Sous-titre mentionnant compagnies pétrolières et sous-traitants

## 12. Mise à jour page À propos

**`src/pages/About.tsx`** :
- Repositionner comme registre officiel
- Parcours : Inscription → Recensement → Vérification → Qualification → Visibilité renforcée → Accès aux marchés
- Mentionner l'écosystème élargi (compagnies pétrolières, sous-traitants, donneurs d'ordre)

## 13. Mise à jour des rapports

**`src/pages/ministry/Reports.tsx`** — Ajouter les KPIs stratégiques de contenu local : taux de qualification, participation par catégorie, progression du recensement.

## 14. Routes et navigation

**`src/App.tsx`** : Route `/annuaire` reste mais la page affichera "Registre".
Navigation dans les layouts : renommer "Annuaire" → "Registre".

---

## Fichiers impactés (14 fichiers)

| Fichier | Nature du changement |
|---|---|
| `src/types/index.ts` | Nouveaux statuts, types, catégories |
| `src/components/StatusBadge.tsx` | Nouvelles configs de badges |
| `src/data/mock-data.ts` | Données et KPIs mis à jour |
| `src/pages/Index.tsx` | Refonte complète du wording + section campagne |
| `src/layouts/PublicLayout.tsx` | Renommage header/nav/footer |
| `src/pages/Directory.tsx` | Annuaire → Registre |
| `src/pages/ministry/Dashboard.tsx` | KPIs stratégiques |
| `src/pages/ministry/CompanyManagement.tsx` | Nouveaux statuts et actions |
| `src/pages/ministry/Reports.tsx` | KPIs contenu local |
| `src/pages/company/Dashboard.tsx` | Parcours qualification stepper |
| `src/pages/company/Profile.tsx` | Dossier de qualification |
| `src/pages/Opportunities.tsx` | Filtre donneur d'ordre |
| `src/pages/About.tsx` | Repositionnement institutionnel |
| `src/layouts/MinistryLayout.tsx` | Label sidebar "Entreprises" → "Registre" |

