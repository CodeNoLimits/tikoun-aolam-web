# DREAMNOVA — WORKFLOW TEMPLATE : Site E-Commerce Breslev / Client Premium
> Généré depuis le projet Tikoun Aolam (Feb 2026)
> Template réutilisable pour tout futur site client : boutique livres, bijoux, spirituel, editorial

---

## PHASE 0 — BRIEF & AUDIT (30 min)

### 0.1 Données à collecter du client
- [ ] URL site existant (WordPress, Shopify, etc.)
- [ ] Catalogue produits complet (nom, prix, images, catégories)
- [ ] WhatsApp business (+XX XXX XXX XXX)
- [ ] Email contact professionnel
- [ ] Numéro téléphone
- [ ] Réseaux sociaux URLs
- [ ] Domaine cible (existant ou nouveau)
- [ ] Compte Stripe/PayPal (ou flux WhatsApp seulement)
- [ ] Langue(s) du site (FR / HE / EN)
- [ ] Identité visuelle (couleurs, fonts, ambiance)

### 0.2 Audit du site existant (si WordPress)
```bash
# Script d'extraction automatique des assets WordPress
# 1. Télécharger export statique (HTTrack ou wget)
wget --mirror --convert-links --html-extension --wait=0.5 https://client-site.com

# 2. Extraire toutes les images produits
python3 << 'EOF'
import re, os
for root, dirs, files in os.walk('./client-site.com'):
    for f in files:
        if f.endswith('.html'):
            html = open(os.path.join(root, f)).read()
            imgs = re.findall(r'wp-content/uploads/[^\s"\']+\.(?:jpg|png|webp)', html)
            for img in imgs:
                print(f"https://client-site.com/{img}")
EOF

# 3. Extraire titres + prix produits
python3 << 'EOF'
import re, os, json
products = []
for html_file in [f for f in os.listdir('./nos-livres') if f.endswith('.html')]:
    html = open(f'./nos-livres/{html_file}').read()
    title = re.search(r'<h1[^>]*class="[^"]*entry-title[^"]*"[^>]*>([^<]+)</h1>', html)
    price = re.search(r'<span class="woocommerce-Price-amount[^"]*"[^>]*>([\d.,]+)', html)
    img = re.search(r'wp-content/uploads/[^\s"\']+\.(jpg|png|webp)', html)
    if title:
        products.append({
            'name': title.group(1).strip(),
            'price': price.group(1) if price else '0',
            'image': 'https://client-site.com/' + img.group(0) if img else ''
        })
json.dump(products, open('products_extracted.json', 'w'), ensure_ascii=False, indent=2)
EOF
```

---

## PHASE 1 — SCAFFOLD NEXT.JS (1 heure)

### 1.1 Création projet
```bash
npx create-next-app@latest client-site-web \
  --typescript \
  --tailwind \
  --app \
  --src-dir \
  --import-alias "@/*"
cd client-site-web

# Dépendances standard DreamNova
npm install framer-motion lucide-react @ai-sdk/react ai
npm install @radix-ui/react-accordion @radix-ui/react-dialog
```

### 1.2 Structure de fichiers (template)
```
src/
├── app/
│   ├── layout.tsx              # Root: fonts + providers
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Design tokens (@theme) + utilities
│   ├── produits/
│   │   ├── page.tsx            # Catalogue avec filtres ?cat=
│   │   └── [id]/page.tsx       # Fiche produit dynamique
│   ├── checkout/page.tsx       # Formulaire → WhatsApp ou Stripe
│   ├── contact/page.tsx        # Contact
│   ├── blog/page.tsx           # Blog (statique ou Sanity)
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── api/
│       └── chat/route.ts       # AI chat (Gemini 2.5)
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky nav + cart badge + mobile menu
│   │   └── Footer.tsx          # 4 colonnes + newsletter + social
│   ├── home/
│   │   ├── HeroSection.tsx     # Parallax hero + CTA
│   │   ├── CollectionsGrid.tsx # Bento grid catégories
│   │   ├── FeaturedProducts.tsx # 3-4 produits vedettes
│   │   ├── BookShowcase.tsx    # Carousel luxe avec AnimatePresence
│   │   ├── TrustBadges.tsx     # Badges livraison/paiement/qualité
│   │   └── BandeauPromo.tsx    # Marquee promo top page
│   ├── shop/
│   │   └── FlyoutCart.tsx      # Panier slide-in
│   ├── ai/
│   │   └── ChatWidget.tsx      # Chat IA Gemini
│   └── shared/
│       └── WhatsAppButton.tsx  # Bouton WhatsApp fixe
└── lib/
    ├── products.ts             # CATALOGUE + types + helpers
    └── cart-context.tsx        # React Context panier
```

### 1.3 Design tokens globals.css
```css
/* Pattern standard DreamNova Luxury */
@import "tailwindcss";

@theme {
  /* Ajuster selon identité client */
  --color-brand-black: #0a0a0a;      /* Fond principal */
  --color-brand-white: #fafaf9;      /* Texte principal */
  --color-brand-gold: #d4af37;       /* Accent primaire */
  --color-brand-copper: #b87333;     /* Accent secondaire */
  --color-brand-darkgray: #171717;   /* Surfaces secondaires */

  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair); /* ou Cormorant, EB Garamond */
}

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

---

## PHASE 2 — DATA LAYER (30 min)

### 2.1 Template products.ts
```typescript
// src/lib/products.ts
export type ProductCategory = "cat1" | "cat2" | "cat3";

export interface Product {
  id: string;              // slug-url (kebab-case)
  name: string;
  subtitle?: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;           // devise principale (ILS ou EUR)
  priceEUR?: number;
  image: string;           // URL complète (wp-content ou /public)
  badge?: string;          // "Nouveau" | "Bestseller" | "Pack"
  description: string;
  longDescription?: string;
  featured?: boolean;
  rating?: number;         // 4.5 à 5.0
  reviewCount?: number;
}

export const ALL_PRODUCTS: Product[] = [
  // Copier ici les produits extraits en Phase 0
];

export const getProduct = (id: string) =>
  ALL_PRODUCTS.find((p) => p.id === id) ?? null;

export const getFeaturedProducts = () =>
  ALL_PRODUCTS.filter((p) => p.featured).slice(0, 3);

export const getProductsByCategory = (cat: ProductCategory) =>
  ALL_PRODUCTS.filter((p) => p.category === cat);
```

### 2.2 next.config.ts (avec images externes)
```typescript
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "client-site.com",  // domaine WordPress
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};
```

---

## PHASE 3 — PAGES PRIORITAIRES (2 heures)

### Ordre d'implémentation (Revenue-First)
1. **Homepage** — HeroSection + CollectionsGrid + FeaturedProducts
2. **Shop page** (`/produits`) — Grid avec filtres ?cat= + useSearchParams + Suspense
3. **Product detail** (`/produits/[id]`) — Images + Add to cart + Related
4. **Checkout** — Formulaire + flux WhatsApp (ou Stripe)
5. **Contact** — WhatsApp + email + téléphone

### Pages secondaires (phase 2)
6. Blog
7. À propos / Éditions
8. Pages légales (CGV, Confidentialité, Mentions légales)
9. Pages biographiques / "Nos Maîtres"

---

## PHASE 4 — CART & CHECKOUT PATTERN

### cart-context.tsx (standard)
```typescript
// Toujours dans CartProvider wrappant le layout
// Contient: items[], addItem, removeItem, updateQty, clearCart
// TVA: calculée côté client (17% Israel, 20% France)
// Total HT + TVA séparés affichés dans FlyoutCart
```

### Checkout WhatsApp (pour clients sans Stripe)
```typescript
const buildWhatsAppMessage = (items, form) => {
  const lines = items.map(i => `• ${i.name} x${i.qty} — ${i.price * i.qty}₪`);
  return encodeURIComponent([
    `*Nouvelle commande Tikoun Aolam*`,
    `👤 ${form.name} | 📞 ${form.phone}`,
    `📍 ${form.address}, ${form.city}`,
    ``,
    ...lines,
    ``,
    `*Total: ${total}₪ (dont TVA 17%)*`,
  ].join('\n'));
};
window.open(`https://wa.me/972XXXXXXXXX?text=${msg}`, '_blank');
```

---

## PHASE 5 — AI CHAT INTEGRATION

### API Route (Gemini 2.5 Flash)
```typescript
// src/app/api/chat/route.ts
import { streamText } from "ai";
import { google } from "@ai-sdk/google";

const SYSTEM_PROMPT = `Tu es l'assistant de [MAISON D'ÉDITION].
Tu connais tout le catalogue: [LISTE PRODUITS].
Tu réponds en français. Tu aides à choisir le bon livre. Tu guides vers WhatsApp pour commander.`;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: SYSTEM_PROMPT,
    messages,
  });
  return result.toDataStreamResponse();
}
```

### Variables d'environnement requises
```env
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...
# Pour Stripe (phase 2)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SITE_URL=https://client-site.vercel.app
```

---

## PHASE 6 — DEPLOY VERCEL

```bash
# 1. Vérifier build local
npm run build  # Doit passer 0 erreurs TypeScript

# 2. Deploy (token DreamNova permanent)
vercel --token=YOUR_VERCEL_TOKEN --prod

# 3. Configurer env vars sur Vercel
vercel env add GOOGLE_GENERATIVE_AI_API_KEY production

# 4. Désactiver Vercel Auth (accès public)
# Dashboard → Settings → Deployment Protection → Disable

# 5. Configurer domaine
vercel domains add client-domain.com
```

---

## CHECKLIST QUALITÉ (avant livraison client)

### Performance
- [ ] Lighthouse Score > 90 (Performance + SEO + Accessibility)
- [ ] LCP < 2.5s (images lazy loaded, critiques en priority)
- [ ] Pas d'images > 500KB en above-the-fold

### Fonctionnel
- [ ] Toutes les routes répondent 200 (pas de 404)
- [ ] Panier fonctionne (add/remove/update)
- [ ] Checkout envoie le bon message WhatsApp
- [ ] Chat IA répond correctement
- [ ] WhatsApp button ouvre avec le bon numéro

### Contenu
- [ ] Toutes les images produits sont les vraies (pas des placeholders)
- [ ] Prix corrects (ILS/EUR)
- [ ] Textes traduits et vérifiés
- [ ] Mentions légales / CGV / Confidentialité

### UX
- [ ] Mobile responsive (tester Chrome DevTools 375px)
- [ ] Navigation sticky fonctionne
- [ ] Animations Framer Motion ne bloquent pas le scroll
- [ ] Scrollbar-hide sur les carousels mobile

---

## ANTI-PATTERNS À ÉVITER (leçons Tikoun Aolam)

1. **JAMAIS** `/produits/category-name` pour les catégories → utiliser `/produits?cat=category-name`
2. **JAMAIS** `useSearchParams` sans `<Suspense>` boundary en Next.js App Router
3. **JAMAIS** laisser les placeholder images (`/placeholder.jpg`) en production
4. **JAMAIS** laisser les numéros WhatsApp comme `YOUR_NUMBER_HERE`
5. **JAMAIS** `Image` de Next.js sur des domaines externes sans `remotePatterns` dans next.config.ts
6. **TOUJOURS** vérifier que `?cat=` param est lu au mount via `useEffect` watching `searchParams`
7. **TOUJOURS** wrapper la page produits dans `<Suspense>` quand `useSearchParams` est utilisé

---

## COORDINATION MULTI-AGENTS (Template Tikoun Aolam)

### Rôles
| Agent | Rôle | Priorités |
|-------|------|-----------|
| Claude Code (Sonnet/Opus) | Architecture + Data + Bug fixes | products.ts, routes, TypeScript, build |
| Antigravity (Gemini) | UI/UX + Pages + Animations | Framer Motion, design, pages légales |
| OpenClaw | Monitoring + Crons | Uptime, screenshots automatiques, alerts |

### Fichier de coordination
Créer `AGENT_BRIDGE.md` à la racine du projet avec sections dédiées par agent.
Format: sections `## AGENT_NAME` avec logs, tâches en cours, messages inter-agents.

---

*Template créé par DreamNova — David Amor — Jerusalem 2026*
*Basé sur le projet Tikoun Aolam (Feb 2026) — Claude Code Sonnet*
