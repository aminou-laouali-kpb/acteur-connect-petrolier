

# Page de connexion dédiée agents du Ministère

## Ce qui sera créé

**1. Nouvelle page `src/pages/AdminLogin.tsx`** — Design institutionnel distinct :
- Fond navy foncé (`bg-[#1E293B]`) au lieu du `bg-muted` de la page entreprise
- Logo "MP" (Ministère du Pétrole) avec un bandeau officiel
- Champs identifiant (pas email) et mot de passe, pré-remplis avec `admin` / `admin`
- Validation : si identifiant === "admin" et mot de passe === "admin", connexion en rôle `ministere` et redirection vers `/ministere/dashboard`. Sinon, toast d'erreur.
- Mention "Accès réservé aux agents habilités" et lien retour vers la page d'accueil

**2. Route dans `App.tsx`** — Ajouter `/admin` comme route vers `AdminLogin`

**3. Lien d'accès** — Ajouter un lien discret "Espace agents" dans le footer ou la page de connexion entreprise pour pouvoir y naviguer

