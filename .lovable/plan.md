

# Plateforme Nationale du Contenu Local Pétrolier — MVP Plan

## Overview
A ministry-grade French-language platform for Niger's petroleum local content management. Mock authentication with a role switcher for seamless demo navigation between Public, Company, and Ministry portals. Desktop-first with basic mobile support.

---

## 1. Foundation & Design System

- Apply design brief: Montserrat headings, Inter body, institutional color palette (`#1E293B` primary, `#B45309` amber accent, `#F8FAFC` background)
- Create reusable components: StatusBadge, StatCard, PremiumCard, DataTable, FilterBar, ProgressBar, EmptyState
- Build layout shells: PublicLayout (header/footer), PortalLayout (sidebar + header with role switcher)
- Mock auth context with role switcher (Visiteur / Entreprise / Ministère) in header

## 2. Public Website (6 pages)

- **Accueil**: Hero with institutional copy + CTAs, 3 pillars (Recenser/Qualifier/Connecter), live metrics trust bar, recent opportunities, featured companies, FAQ teaser, contact section, polished footer
- **À propos**: Mission, local content importance, ministry role, registration process
- **Opportunités**: Card + table views with filters (type, catégorie, région, statut, échéance, recherche). Detail pages with full info + CTA
- **Annuaire**: Searchable company directory with filters. Public profile cards with status badges
- **FAQ**: Institutional Q&A with accordion
- **Contact**: Form, email, phone, ministry note

## 3. Company Portal (sidebar navigation)

- **Tableau de bord**: Profile completion %, validation status, missing documents, recommended opportunities, notifications, quick actions
- **Profil entreprise**: 7-tab form (Informations générales, Représentant légal, Activités, Capacités, Références, Documents, Déclaration) — all fields from spec, with progress tracking
- **Opportunités**: Available, recommended, saved, submitted tabs
- **Candidatures**: Application flow with document upload simulation, status tracking (brouillon → soumise → en examen → retenue/non retenue)
- **Notifications**: Validation updates, document expiry, new opportunities, admin messages
- **Auth screens**: Login, signup, forgot password (mock flow)

## 4. Ministry Back-Office (sidebar navigation)

- **Tableau de bord**: KPI cards + charts (Recharts) — registered companies, validated, pending, by region/category, monthly growth, completeness rate
- **Gestion entreprises**: Filterable table with detail drawer. Review actions: valider, rejeter, demander complément, suspendre
- **Détail entreprise**: Full profile view, documents, internal notes, action history, review panel
- **Gestion opportunités**: CRUD for opportunities with all fields, publish/close/archive
- **Candidatures reçues**: View responses per opportunity, change statuses
- **Rapports**: Analytics views — companies by category/region, document expiry alerts, response rates
- **Journal d'audit**: Timestamped log of all actions
- **Paramètres**: Taxonomy management (categories, types, regions, statuses)

## 5. Demo Data

All in French, Niger-contextual:
- **20 companies** across Niamey, Zinder, Agadez, Diffa, Tahoua, Maradi, Dosso — varied categories, statuses, completion rates
- **8 opportunities** (AMI, sous-traitance, consultation, formation, etc.)
- **12 notifications**, **10 applications**
- Realistic dashboard metrics

## 6. UX Polish

- Status badges everywhere (Validé, En revue, Complément demandé, Suspendu, Expiré)
- Confirmation modals for destructive actions
- Success/error toasts via Sonner
- Progress indicators for profile completion
- "Dernière mise à jour" timestamps
- Smart empty states
- 150ms snappy transitions, slide-in modals, fade tab switching
- Structured for future Supabase integration (auth, DB, storage, RLS)

