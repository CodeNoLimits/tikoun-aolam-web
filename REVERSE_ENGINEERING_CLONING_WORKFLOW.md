# DREAMNOVA — Playbook E-Commerce Premium
## De WordPress/Shopify vers Next.js en <24h avec 3 agents IA

> Version 2.0 — Rewritten from battle experience on Tikoun Aolam (Feb 27, 2026)
> Auteur: David Amor / DreamNova Jerusalem
> Testé: 25 produits, 19 routes, 26 images, 0 erreurs build. Production-ready.

---

## 0. QUAND UTILISER CE PLAYBOOK

**Cas d'usage :** Un client a un site e-commerce WordPress/WooCommerce/Shopify vieillissant.
Tu le reconstruis en Next.js premium, 10x plus rapide, 10x plus beau, en moins de 24h.

**Prérequis :**
- URL du site source (ex: tikoun-aolam.com)
- Accès wp-content/uploads OU un export des images produits
- Stack cible : Next.js 16+ / React 19 / Tailwind 4 / Framer Motion
- 3 agents : Claude Code (Opus) + Claude Code (Sonnet) + Antigravity (Gemini)

**Résultat attendu :** Site déployé sur Vercel, Lighthouse >90, panier fonctionnel, chat IA, toutes les pages légales, images optimisées, prêt pour Stripe.

---

## 1. AUDIT DU SITE SOURCE (30 min)

### 1.1 Scraper la structure

```bash
# Lister tous les produits visibles
curl -s https://[site-client].com/sitemap.xml | grep -oP '<loc>[^<]+</loc>'

# Extraire les images wp-content (WordPress)
curl -s https://[site-client].com | grep -oP 'https://[^"]+wp-content/uploads/[^"]+\.(jpg|png|webp)'

# Tester si les images sont accessibles (HEAD request)
for url in $(cat urls.txt); do
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  echo "$status $url"
done
```

### 1.2 Documenter dans un fichier d'audit

Créer `AUDIT.md` avec :
- Nombre exact de produits (pas d'approximation)
- Catégories et leur répartition
- URLs de toutes les images produits (une par ligne)
- Palette couleurs (inspecter le CSS : primaire, secondaire, accent, fond)
- Typographies utilisées (Google Fonts ID)
- Fonctionnalités e-commerce : panier, checkout, paiement, livraison
- Pages de contenu : blog, about, contact, légal
- Ce qui manque / est cassé sur le site actuel

**Règle :** L'audit est la source de vérité. Chaque produit, chaque image, chaque page y est listée. Si c'est pas dans l'audit, ça n'existe pas.

---

## 2. ARCHITECTURE DU PROJET (15 min)

### 2.1 Scaffold

```bash
npx create-next-app@latest [nom]-web --typescript --tailwind --app --turbopack
cd [nom]-web
npm install framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-accordion
npm install ai @ai-sdk/google    # Chat IA (FIXER la version — voir section 6)
```

### 2.2 Structure fichiers obligatoire

```
src/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout + CartProvider + ChatWidget
│   ├── globals.css               # Theme tokens Tailwind
│   ├── loading.tsx               # Loading state global
│   ├── not-found.tsx             # 404 personnalisée
│   ├── error.tsx                 # Error boundary
│   ├── produits/
│   │   ├── page.tsx              # Catalogue complet + filtres + recherche
│   │   └── [id]/page.tsx         # Fiche produit dynamique
│   ├── checkout/page.tsx         # Checkout complet
│   ├── contact/page.tsx          # Contact + WhatsApp
│   ├── blog/page.tsx             # Blog (si applicable)
│   ├── conditions/page.tsx       # CGV
│   ├── confidentialite/page.tsx  # Politique confidentialité
│   ├── mentions-legales/page.tsx # Mentions légales
│   └── api/
│       ├── chat/route.ts         # Chat IA endpoint (Gemini)
│       └── stripe-checkout/route.ts  # Stripe (si applicable)
├── components/
│   ├── layout/Header.tsx         # Navbar sticky
│   ├── layout/Footer.tsx         # Footer
│   ├── shop/FlyoutCart.tsx       # Panier slide-in
│   ├── ai/ChatWidget.tsx         # Chat IA (texte + voix)
│   ├── home/                     # Composants homepage
│   └── shared/WhatsAppButton.tsx # CTA flottant WhatsApp
├── lib/
│   ├── products.ts               # CATALOGUE COMPLET (source de vérité)
│   └── cart-context.tsx          # Panier React Context
scripts/
└── verify-images.js              # Vérification HTTP de toutes les images
vercel.json                       # Security headers + cache
AGENT_BRIDGE.md                   # Coordination inter-agents
AUDIT.md                          # Audit du site source
```

### 2.3 Design tokens (globals.css / tailwind)

Extraire du site source et encoder dans Tailwind :

```css
/* Exemple Tikoun Aolam : Luxe noir/or */
@theme {
  --color-tikoun-black: #0a0a0a;
  --color-tikoun-white: #fafaf9;
  --color-tikoun-gold: #d4af37;
  --color-tikoun-copper: #b87333;
  --color-tikoun-darkgray: #1a1a1a;
}
```

**Règle de design par segment client :**

| Segment | Primaire | Secondaire | Fond | Référence |
|---------|----------|------------|------|-----------|
| Luxe/Spirituel | #D4AF37 (or) | #B87333 (cuivre) | #0A0A0A (noir) | Tikoun Aolam |
| Bijoux | #D4AF37 (or) | #F8FAFC (blanc) | #000000 | Baroukh Sagit |
| SaaS/Tech | #3B82F6 (bleu) | #8B5CF6 (violet) | #F8FAFC | DreamNova |
| Editorial | #2C3E50 (ardoise) | #E67E22 (orange) | #FFFFFF | Formations |

---

## 3. COORDINATION 3 AGENTS (le vrai secret)

### 3.1 Répartition des rôles

| Agent | Rôle | Touche | Ne touche PAS |
|-------|------|--------|---------------|
| **Claude Opus** | Architecture, data layer, cart, types, build, scripts de vérification | `lib/`, `api/`, `scripts/`, `vercel.json`, `next.config.ts` | Composants UI, animations |
| **Claude Sonnet** | Audit contenu, images réelles, pages manquantes, SEO, Stripe setup, deploy | Pages contenu, `Header`, `Footer`, images, pages légales, GitHub/Vercel | Architecture data layer |
| **Antigravity (Gemini)** | UI/UX premium, animations Framer Motion, ChatWidget, visual polish | Composants visuels, `home/`, animations, effets 3D, vidéos background | `products.ts`, `cart-context.tsx`, API routes |

### 3.2 AGENT_BRIDGE.md — le protocole

Fichier à la racine du projet. Chaque agent a sa section, lit toutes les 60 secondes.

```markdown
## OPUS
### Dernier état
- [ce qui a été fait]
### Messages pour les autres agents
> [instructions/infos]

## SONNET
[idem]

## ANTIGRAVITY
[idem]

## SHARED
### LOCKS actifs
[quel agent verrouille quel fichier]
### Décisions prises
[stack, packages, conventions]
```

**Règles de coordination :**
1. Un agent n'écrit QUE dans sa section
2. Avant de modifier un fichier touché par un autre : poser un LOCK dans SHARED
3. Chaque cycle CRON = lire le bridge, agir, marquer [DONE]
4. Conflits de version ? L'agent qui build tranche.

### 3.3 Séquence d'exécution optimale

```
HEURE 0-2 : OPUS crée lib/products.ts + cart-context.tsx + layout.tsx
             (pendant ce temps, SONNET fait l'audit contenu exhaustif)

HEURE 2-4 : OPUS écrit les pages dynamiques (produits, checkout, contact)
             ANTIGRAVITY crée les composants visuels (Header, Hero, animations)
             SONNET extrait les images réelles du WordPress

HEURE 4-6 : SONNET injecte les images dans products.ts + crée pages contenu
             ANTIGRAVITY ajoute ChatWidget + polish visuel
             OPUS vérifie le build, corrige les erreurs TS

HEURE 6-8 : OPUS fait le build final + script vérification images
             SONNET setup GitHub + Vercel + env vars + deploy
             Tout le monde met à jour AGENT_BRIDGE
```

---

## 4. DATA LAYER — La fondation

### 4.1 products.ts (source de vérité unique)

```typescript
// src/lib/products.ts
export type ProductCategory = "cat-1" | "cat-2" | "cat-3";

export interface Product {
  id: string;           // slug URL (ex: "otsar-hayira")
  name: string;
  subtitle?: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;        // devise locale (ILS, EUR...)
  priceEUR?: number;
  priceUSD?: number;
  image: string;        // URL absolue (WordPress ou /public/)
  badge?: string;       // "MEILLEURE VENTE", "NOUVEAUTE"...
  description: string;
  characteristics?: Record<string, string>;
  variants?: { name: string; hex: string }[];
  rating?: number;
  reviewCount?: number;
}

export const ALL_PRODUCTS: Product[] = [
  // ... chaque produit avec son image RÉELLE, pas un placeholder
];

// Helpers obligatoires
export function getProduct(id: string): Product | undefined { ... }
export function getProductsByCategory(cat: ProductCategory): Product[] { ... }
export function getFeaturedProducts(): Product[] { ... }
export function getRelatedProducts(id: string, limit?: number): Product[] { ... }
export function searchProducts(query: string): Product[] { ... }
```

**Règles du catalogue :**
- Chaque image DOIT être une URL testée HTTP 200 (pas de placeholder)
- Le nombre de produits dans le commentaire header DOIT correspondre à `ALL_PRODUCTS.length`
- Si le site source a des images en `/wp-content/uploads/`, ajouter `remotePatterns` dans `next.config.ts`
- Vérifier avec `node scripts/verify-images.js` avant chaque deploy

### 4.2 cart-context.tsx

```typescript
// React Context simple — PAS Redux, PAS Zustand (overkill pour <50 produits)
interface CartItem { product: Product; qty: number; selectedColor?: string }

// Exposer: addItem, removeItem, updateQty, clearCart
// Calculer: itemCount, subtotal, tva (17% Israel / 20% France), total
```

### 4.3 Vérification next.config.ts

Si images externes (WordPress, CDN) :

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "[site-client].com",
      pathname: "/wp-content/uploads/**",
    }],
  },
  turbopack: {
    root: __dirname,  // IMPORTANT: évite que Turbopack infère un mauvais workspace root
  },
};
```

---

## 5. PAGES DYNAMIQUES

### 5.1 Page catalogue (`/produits/page.tsx`)

Obligatoire :
- Grille responsive (2 col mobile, 3-4 col desktop)
- Filtres par catégorie (pills cliquables)
- Recherche texte (nom + description)
- Compteur de résultats dynamique
- Bouton "Ajouter au panier" sur hover
- Liens vers `/produits/[id]` (slug, pas ID numérique)

### 5.2 Page produit (`/produits/[id]/page.tsx`)

Obligatoire :
- `useParams()` pour récupérer l'ID (pas `params: any`)
- `notFound()` si produit inexistant
- Image principale grande
- Prix avec devise
- Sélecteur variante couleur (si applicable)
- Bouton "Ajouter au panier" avec feedback visuel
- Caractéristiques techniques en grille
- Produits similaires (`getRelatedProducts`)
- Breadcrumbs

### 5.3 Checkout (`/checkout/page.tsx`)

Champs obligatoires :
- Email, Nom, Prénom, Téléphone
- Adresse complète (rue, ville, code postal, pays)
- Sélecteur livraison (local, national, international)
- Sélecteur paiement (Carte bancaire / Bit / PayPal / WhatsApp)
- Résumé commande sidebar (produits, sous-total, TVA, livraison, total)

### 5.4 Pages légales (3 minimum)

- `/conditions` — Conditions Générales de Vente
- `/confidentialite` — Politique de Confidentialité
- `/mentions-legales` — Mentions Légales

Adapter le contenu au pays (Israel = loi protection du consommateur 1981, France = RGPD + loi Hamon).

---

## 6. PIÈGES TECHNIQUES (leçons Tikoun Aolam)

### 6.1 Versioning `ai` SDK

```
DANGER: Le package `ai` change d'API entre les versions majeures.
- ai v3.x : `import { useChat } from 'ai/react'` — a `input`, `handleSubmit`, `isLoading`
- ai v4+ : `ai/react` n'existe plus — migré vers `@ai-sdk/react`
- ai v6 : `@ai-sdk/react` v3 — API totalement différente (`sendMessage`, `status`)

RÈGLE : Fixer la version dans package.json. Si un agent installe, il note la version dans AGENT_BRIDGE.
Si ça marche, NE PAS UPGRADER.
```

### 6.2 Turbopack workspace root

Si le projet est dans un sous-dossier et qu'il existe un `pnpm-lock.yaml` ou `package.json` dans un dossier parent, Turbopack peut inférer le mauvais workspace root et scanner des fichiers hors projet.

**Fix :** `turbopack: { root: __dirname }` dans `next.config.ts`

### 6.3 Duplicate JSX attributes

Framer Motion + style inline = risque de double `style` attribute :
```tsx
// BUG : le compilateur refuse 2 fois `style` sur le même élément
<motion.div
  style={{ transformStyle: "preserve-3d" }}  // <-- premier
  className="..."
  style={{ background: "..." }}              // <-- ERREUR
/>
```
**Fix :** Fusionner dans un seul objet `style`.

### 6.4 Build avant chaque deploy

```bash
npm run build  # DOIT retourner exit code 0
# Si erreur TypeScript → corriger AVANT de push
# Si erreur module not found → vérifier package.json + node_modules
```

---

## 7. SCRIPT DE VÉRIFICATION

### 7.1 Vérification images (`scripts/verify-images.js`)

```bash
node scripts/verify-images.js
# Scanne products.ts + toutes les pages
# HEAD request sur chaque URL
# Résultat attendu : X/X OK, 0 BROKEN
```

### 7.2 Checklist pré-deploy

```
[ ] npm run build → 0 erreurs
[ ] node scripts/verify-images.js → 0 images cassées
[ ] Nombre produits dans commentaire = ALL_PRODUCTS.length
[ ] Toutes les routes listées dans le build output
[ ] WhatsApp number = vrai numéro client (pas placeholder)
[ ] .env.local contient GOOGLE_GENERATIVE_AI_API_KEY (chat IA)
[ ] .env.local contient STRIPE_SECRET_KEY (si paiement)
[ ] vercel.json a les security headers
[ ] Pages légales présentes (conditions, confidentialité, mentions)
[ ] AGENT_BRIDGE.md à jour avec dernier état de chaque agent
```

---

## 8. DEPLOY

### 8.1 GitHub + Vercel

```bash
# Créer le repo
gh repo create CodeNoLimits/[nom]-web --public --source=. --push

# Connecter à Vercel (auto-deploy sur push)
vercel link --token=$VERCEL_TOKEN
vercel env add GOOGLE_GENERATIVE_AI_API_KEY --token=$VERCEL_TOKEN
vercel env add STRIPE_SECRET_KEY --token=$VERCEL_TOKEN
vercel --prod --token=$VERCEL_TOKEN

# Désactiver Vercel Auth (sinon 401 pour les visiteurs)
# Dashboard → Project → Settings → Deployment Protection → OFF
```

### 8.2 Post-deploy

- Vérifier l'URL live dans un navigateur
- Tester le panier (ajouter, retirer, checkout)
- Tester le chat IA (poser une question sur le catalogue)
- Vérifier les images (pas de 404, pas de placeholder)
- Tester mobile (Chrome DevTools → responsive)
- Envoyer l'URL au client

---

## 9. MÉTRIQUES DE RÉFÉRENCE (Tikoun Aolam)

| Métrique | Valeur |
|----------|--------|
| Temps total (3 agents) | ~6h |
| Produits | 25 |
| Routes | 19 |
| Images vérifiées | 26/26 (100%) |
| Build errors final | 0 |
| Agents impliqués | 3 (Opus + Sonnet + Antigravity) |
| Cycles AGENT_BRIDGE | 6+ |
| Bugs corrigés en coordination | 4 (ai/react, turbopack root, duplicate style, Stripe apiVersion) |

---

## 10. TEMPLATE AGENT_BRIDGE VIERGE

Copier ce fichier à la racine de chaque nouveau projet :

```markdown
# AGENT_BRIDGE — [NOM CLIENT] Coordination

> CRON 60s. Chaque agent lit et écrit dans sa section.
> Emplacement: /chemin/vers/projet/AGENT_BRIDGE.md

## PROJET STATUS
- **Stack**: Next.js 16 + React 19 + Tailwind 4 + Framer Motion
- **Build**: [PENDING]
- **Routes**: [PENDING]
- **Catalogue**: [PENDING] produits

## OPUS (Architecture + Data)
### Dernier état
_En attente_
### Messages
_Aucun_

## SONNET (Contenu + Images + Deploy)
### Dernier état
_En attente_
### Messages
_Aucun_

## ANTIGRAVITY (UI/UX + Animations)
### Dernier état
_En attente_
### Messages
_Aucun_

## SHARED
### LOCKS actifs
_Aucun_
### Décisions prises
_Aucune_
### Questions ouvertes
1. ...

## HISTORIQUE
| Date | Agent | Action |
|------|-------|--------|
```

---

_Playbook DreamNova v2.0 — Battle-tested on Tikoun Aolam, Feb 27 2026._
_3 agents, 25 produits, 19 routes, 0 erreurs. Reproductible sur n'importe quel client._
