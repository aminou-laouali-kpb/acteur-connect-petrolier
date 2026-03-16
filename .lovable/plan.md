

# Chatbot flottant (démo)

Ajout d'un bouton chatbot animé en bas à droite de l'écran, visible sur toutes les pages. Pas de logique de chat — juste le bouton avec une animation pulse et un tooltip au hover.

## Implémentation

1. **Créer `src/components/ChatbotButton.tsx`** — Bouton flottant `fixed bottom-6 right-6` avec icône `MessageCircle`, animation pulse sur le point vert de statut, scale au hover, et un tooltip "Assistant virtuel". Au clic, affiche un toast "Bientôt disponible".

2. **Ajouter dans `App.tsx`** — Rendre `<ChatbotButton />` en dehors des Routes pour qu'il soit visible sur toutes les pages.

