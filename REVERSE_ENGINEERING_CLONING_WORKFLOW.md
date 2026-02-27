# DREAMNOVA MASTER WORKFLOW : PREMIUM E-COMMERCE CLONING & REVERSE ENGINEERING

> _Dernière mise à jour : Février 2026_

Ce document constitue le guide officiel pour recréer intégralement un site e-commerce de classe mondiale (standard "Nano Banana") pour n'importe quel client, **à partir de zéro** ou via du **reverse engineering** visuel de leur site actuel.

C'est la méthode exacte que nous avons utilisée entre **Antigravity (Gemini)** et **Claude Code** pour réaliser le clone massif de _Tikoun Aolam_.

---

## 🚀 ÉTAPE 1 : PRE-REQUIS ET INGESTION D'ASSETS

1. **Création du dossier de travail :** Demander au client l'accès à ses médias ou télécharger/scraper les assets clés (images de produits, logos) dans un dossier structuré (ex: `FLOW_ASSETS`).
2. **Audit & Capture :**
   - L'agent **Antigravity** utilise son outil `T-Capture` ou son navigateur pour visualiser l'ancien site de référence.
   - Analyser et extraire les contraintes esthétiques primaires : couleurs hexadécimales, typographies (ex: _Playfair Display_, _Cinzel_), mood général (ex: "Rich Black", "Gold accents", "Warm Stone").
3. **Le Setup Technique (Next.js 14 App Router) :**
   - Utiliser `npx create-next-app@latest [nom-projet] --typescript --tailwind --app`
   - Configurer immédiatement `tailwind.config.ts` avec les "Design Tokens" audités (les couleurs de marque).
   - Installer `framer-motion` et `lucide-react`.

---

## 🧠 ÉTAPE 2 : LA DYNAMIQUE DES DEUX AGENTS (LE SECRET)

Pour accomplir des miracles en quelques heures, le travail doit être _strictement réparti_ :

**A. Antigravity (Gemini 2.5) — Le Bâtisseur Macro & UI Délégué :**

- Il génère les "composants blocs" majeurs (`layout.tsx`, `Header.tsx`, `Footer.tsx`).
- Il applique les effets d'aura, de physique 3D et de Parallax avec `framer-motion`.
- Il connecte la logique d'état local via Context (ex: panier flottant avec Zustand ou context React natif).

**B. Claude Code — L'Ingénieur Terminal & Data :**

- Il tourne en arrière-plan (via `claude`) au sein du dossier root.
- Il s'occupe de scripter l'intégration de la donnée massive (ex: création de `products.ts` en scrapant WordPress, renommage automatisé des assets visuels dans le dossier `/public`).
- _C'est le pont système._

**Synchronisation :** Placer un fichier `AGENT_BRIDGE.md` ou `TASK.md` que les deux IA peuvent lire pour se tenir au courant (ex: "J'ai configuré le footer, Claude peux-tu formater les 25 produits en données JSON strictes ?").

---

## 🎨 ÉTAPE 3 : RÈGLES DE DESIGN PREMIUM ("NANO BANANA STANDARD")

Pour que le résultat ne ressemble pas à un simple clone mais à une _amélioration drastique_, suivez formellement ces règles dictées pendant l'avancée de _Tikoun Aolam_ :

1. **Disparition des Murs Blancs Basiques** : Si le thème le permet, remplacer les fonds plats par du _Glassmorphism_ (backdrop-blur), des textures d'artefacts (noise), ou du noir profond.
2. **Typographie Massive** : Utilisez des balises `h1` massives (`text-5xl` à `text-7xl`) pour l'élégance textuelle.
3. **Mouvement & Physique Globale (Frémissement)** : Les éléments statiques doivent toujours réagir à l'utilisateur :
   - Cacher les cartes à 95% de taille, et les faire passer à 100% au Scroll/Viewport entry.
   - Assigner l'effet `.book-hover` global (ou similaire) : translation physique de -8px, rotation 3D très subtile, et shadow intense pour mimer l'interaction tactile.
4. **Vidéos Discrètes** : Toujours inclure 1 ou 2 Backgrounds Vidéo "cinématiques" (à 15% - 20% d'opacité) en arrière-plan des pages de contenus vides (blog, contact) pour ajouter un côté vivant (sans ralentir les performances).
5. **Détruire l'Anachronisme Visuel** : La data en dur dans la bdd doit logiquement écraser la photo. Ne pas utiliser de scalings ou d'astuces CSS pour cacher les pixels, mais plutôt coder les variables (ex: les `variants` de couleur) _purement_ en s'appuyant sur l'image source du client.

---

## 🛒 ÉTAPE 4 : INTELLIGENCE E-COMMERCE

1. **Catalogue Source de Vérité** : Construire un fichier `/lib/products.ts` monolithique, exportant tout.
2. **Fonctionnalités "Flyout"** : Fini les rafraichissements de page désuets. Construire un `FlyoutCart` interactif.
3. **Agent Conversationnel Immersif (Gemini Live)** :
   - Injecter le client `ai-sdk/react`.
   - Créer un `ChatWidget.tsx` (Bouton doré en bas à droite) combinant à la fois Mode Texte et Reconnaissance Vocale (via _Web Speech API_).
   - _Sécurité vitale_ : Stoker la clé dans `.env.local` et passer les appels via une `Route Handler` Next.js (`api/chat/route.ts`).

---

## 🏁 ÉTAPE 5 : OPTIMISATION ET DÉPLOIEMENT

1. **Revue de Build Locale** : `npm run build` doit comporter 0 exception avec un _Exit Code 0_. Si une dépendance casse (ex: problème d'export server-components avec une UI lib), l'agent réagira immédiatement.
2. **Déploiement Automatisé Vercel** :
   - `vercel --prod` en terminal.
   - Pousser les secrets environnementaux via `vercel env add [...]`.
3. **Passage de Flambeau (Handoff)** : Remettre le repository (idéalement poussé sur GitHub) et l'URL de test active au client pour révision.

---

_Document maîtrisé et testé sur "Tikoun Aolam Web" le 27 Février 2026. En cas de doute, ouvrez ce manuel et laissez Antigravity vous guider !_
