// ============================================================
// TIKOUN AOLAM — Catalogue Complet (25 produits)
// Source: tikoun-aolam.com audit (Feb 2026)
// ============================================================

export type ProductCategory =
  | "livres-etude"
  | "sidourim"
  | "fetes"
  | "tehilim"
  | "biographies"
  | "contes";

export interface ProductVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number; // ILS
  priceEUR?: number;
  priceUSD?: number;
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  characteristics?: Record<string, string>;
  variants?: ProductVariant[];
  isNew?: boolean;
  isPack?: boolean;
  rating?: number;
  reviewCount?: number;
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  "livres-etude": "Livres d'étude",
  sidourim: "Nos Sidourim",
  fetes: "Fêtes de l'Année",
  tehilim: "Téhilim & Tikoun Haklali",
  biographies: "Biographies",
  contes: "Les Contes",
};

export const CATEGORY_DESCRIPTIONS: Record<ProductCategory, string> = {
  "livres-etude":
    "Les ouvrages fondamentaux pour l'étude quotidienne et l'élévation spirituelle.",
  sidourim: "Prières et recueillement au quotidien.",
  fetes: "Vivez les temps forts de l'année juive avec les enseignements de Rabénou.",
  tehilim: "Protection et réparation de l'âme.",
  biographies: "La vie des Justes qui éclaire notre chemin.",
  contes: "La sagesse éternelle racontée en histoires.",
};

const DEFAULT_VARIANTS: ProductVariant[] = [
  { name: "Anthracite", hex: "#3f3f46" },
  { name: "Noir", hex: "#18181b" },
  { name: "Bleu Nuit", hex: "#1e1b4b" },
  { name: "Blanc Crème", hex: "#f8fafc" },
];

// ============================================================
// CATALOGUE COMPLET — 25 PRODUITS
// ============================================================

export const ALL_PRODUCTS: Product[] = [
  // ── Livres d'étude (6) ─────────────────────────────────
  {
    id: "otsar-hayira",
    name: "Otsar Hayira",
    subtitle: "Le Guide pratique Breslev (100% en Français)",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 180,
    priceEUR: 45,
    priceUSD: 49,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/09/Otsar-Hayira-Fiche-Produit.jpg",
    badge: "MEILLEURE VENTE",
    isNew: true,
    rating: 5,
    reviewCount: 12,
    description:
      "L'Otsar Hayira est un recueil monumental comprenant la quintessence de l'enseignement de Rabbi Na'hman de Breslev, rapporté de manière claire, structurée et pratique. Il offre un guide sûr pour aborder tous les aspects de la vie quotidienne. Cette édition prestigieuse a fait l'objet d'une sélection minutieuse des textes, avec une traduction 100% en Français pour une compréhension parfaite.",
    characteristics: {
      Format: "Standard (17×24 cm)",
      Traduction: "100% Français",
      Pages: "864 pages",
      Couverture: "Rigide Simili Cuir avec Petek",
    },
    variants: [
      { name: "Noir", hex: "#18181b" },
      { name: "Blanc", hex: "#f8fafc" },
    ],
  },
  {
    id: "likoute-moharan-compact",
    name: "Likouté Moharan Complet",
    subtitle: "Format Compact",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/06/Likoute-Moharan-Fiche-Produit02.jpg",
    badge: "INDISPENSABLE",
    rating: 5,
    reviewCount: 8,
    description:
      "L'intégralité du Likouté Moharan dans un format compact et maniable. L'œuvre maîtresse de Rabbi Na'hman de Breslev, comprenant des enseignements profonds sur tous les aspects de la vie spirituelle et matérielle.",
    characteristics: {
      Format: "Compact (13×18 cm)",
      Traduction: "Hébreu original",
      Pages: "520 pages",
      Couverture: "Souple",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "likoute-halakhot-orah-haim-1",
    name: "Likouté Halakhot – Ora'h 'Haim 1",
    subtitle: "Grand Format",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 150,
    priceEUR: 38,
    priceUSD: 41,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/03/LH-Orah-Haim-1-Double002.jpg",
    rating: 5,
    reviewCount: 6,
    description:
      "Cette œuvre magistrale transpose les enseignements spirituels du Likouté Moharan dans la dimension pratique de la Halakha (Loi Juive). Rabbi Nathan y révèle les profondeurs cachées de chaque loi avec une clarté remarquable.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu-Français face à face",
      Pages: "720 pages",
      Couverture: "Rigide Simili Cuir",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "likoute-moharan-3-tomes",
    name: "Likouté Moharan – 3 Tomes",
    subtitle: "Hébreu-Français face à face",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 220,
    priceEUR: 55,
    priceUSD: 60,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Likoute-Moharan-3-Tomes-001.jpg",
    badge: "NOUVEAUTÉ",
    rating: 5,
    reviewCount: 4,
    description:
      "L'œuvre complète du Likouté Moharan en 3 tomes luxueux, avec traduction française en face à face. Chaque Torah est présentée avec le texte hébreu original et sa traduction fidèle, permettant une étude approfondie.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu-Français face à face",
      Pages: "3 × 480 pages",
      Couverture: "Rigide Simili Cuir",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "kitsour-likoute-halakhot",
    name: "Kitsour Likouté Halakhot",
    subtitle: "Hébreu-Français face à face",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 320,
    priceEUR: 80,
    priceUSD: 87,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/03/Kitsour-Likoute-Halakhot-X002.jpg",
    badge: "ÉDITION PREMIUM",
    rating: 5,
    reviewCount: 3,
    description:
      "Un condensé exceptionnel du Likouté Halakhot, permettant d'accéder aux enseignements essentiels de Rabbi Nathan dans un format bilingue. Idéal pour une étude quotidienne structurée.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu-Français face à face",
      Pages: "960 pages",
      Couverture: "Rigide Simili Cuir de luxe",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "likoute-moharan-grand-format",
    name: "Likouté Moharan",
    subtitle: "Grand Format",
    category: "livres-etude",
    categoryLabel: "Livres d'étude",
    price: 150,
    priceEUR: 38,
    priceUSD: 41,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Likoute-Moharan-Double001.jpg",
    rating: 4,
    reviewCount: 5,
    description:
      "Le Likouté Moharan en grand format pour une lecture confortable. L'œuvre maîtresse de Rabbi Na'hman présentée dans une édition soignée et élégante.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu original",
      Pages: "640 pages",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },

  // ── Fêtes de l'Année (8 + 2 packs) ────────────────────
  {
    id: "pack-pourim-pessah",
    name: "Pack Pourim/Pessah",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 170,
    priceEUR: 42,
    priceUSD: 46,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/11/Pack-Pourim-_-Pessah.jpg",
    badge: "OFFRE DU MOMENT",
    isPack: true,
    rating: 5,
    reviewCount: 7,
    description:
      "Un coffret réunissant les enseignements de Rabénou sur Pourim et Pessah. Deux ouvrages essentiels pour vivre pleinement ces fêtes de joie et de délivrance.",
    characteristics: {
      Contenu: "2 ouvrages : Pourim + Pessah de Rabénou",
      Traduction: "100% Français",
      Économie: "30₪ d'économie par rapport à l'achat séparé",
    },
  },
  {
    id: "pack-tishri",
    name: "Pack Tishri",
    subtitle: "Roch Hachana / Kippour / Souccot",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 300,
    priceEUR: 75,
    priceUSD: 82,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/07/00Pack-Roch-Hachana-_-Kippour-_-Souccot.jpg",
    badge: "FÊTE DU MOMENT",
    isPack: true,
    rating: 5,
    reviewCount: 9,
    description:
      "Le coffret complet des fêtes de Tishri comprenant les trois ouvrages indispensables : Roch Hachana, Kippour et Souccot de Rabénou. La préparation idéale pour les fêtes.",
    characteristics: {
      Contenu: "3 ouvrages : Roch Hachana + Kippour + Souccot",
      Traduction: "100% Français",
      Économie: "60₪ d'économie par rapport à l'achat séparé",
    },
  },
  {
    id: "roch-hachana-rabenou",
    name: "Roch Hachana de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 120,
    priceEUR: 30,
    priceUSD: 33,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/03/Roch-Hachana-Double002.jpg",
    rating: 5,
    reviewCount: 11,
    description:
      "Les enseignements de Rabbi Na'hman sur Roch Hachana, le Nouvel An juif. Un ouvrage essentiel pour comprendre la profondeur de ce jour saint et s'y préparer spirituellement.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "kippour-rabenou",
    name: "Kippour de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 120,
    priceEUR: 30,
    priceUSD: 33,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Kippour-Double001.jpg",
    rating: 5,
    reviewCount: 6,
    description:
      "Les enseignements de Rabbi Na'hman sur Yom Kippour, le Jour du Grand Pardon. Un guide spirituel pour vivre ce jour de téchouva avec profondeur.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "souccot-rabenou",
    name: "Souccot de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 120,
    priceEUR: 30,
    priceUSD: 33,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Souccot-de-Rabenou-Double001.jpg",
    rating: 5,
    reviewCount: 5,
    description:
      "Les enseignements de Rabbi Na'hman sur Souccot, la fête des cabanes. Découvrez les secrets de la joie véritable et de la Sim'hat Beit HaSho'éva.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "hanouca-rabenou",
    name: "Hanouca de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 70,
    priceEUR: 18,
    priceUSD: 19,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Hanouca-Tranche001.jpg",
    rating: 5,
    reviewCount: 4,
    description:
      "Les enseignements lumineux de Rabbi Na'hman sur Hanouca. La lumière intérieure qui chasse les ténèbres, le miracle de la persévérance dans la foi.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Souple",
    },
  },
  {
    id: "pourim-rabenou",
    name: "Pourim de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 80,
    priceEUR: 20,
    priceUSD: 22,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Pourim-Tranche001.jpg",
    rating: 5,
    reviewCount: 3,
    description:
      "Les enseignements de Rabbi Na'hman sur Pourim. La joie qui transcende la raison, le renversement divin et la puissance de la prière.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Souple",
    },
  },
  {
    id: "pessah-rabenou",
    name: "Pessah de Rabénou",
    category: "fetes",
    categoryLabel: "Fêtes de l'Année",
    price: 120,
    priceEUR: 30,
    priceUSD: 33,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Pessah-Double001.jpg",
    rating: 5,
    reviewCount: 8,
    description:
      "Les enseignements de Rabbi Na'hman sur Pessah. La sortie d'Égypte personnelle, la libération de l'âme et le chemin vers la liberté véritable.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },

  // ── Nos Sidourim (3) ──────────────────────────────────
  {
    id: "sidour-echet-hayil",
    name: "Sidour Échet Hayïl de Rabénou",
    subtitle: "Pour Femmes",
    category: "sidourim",
    categoryLabel: "Nos Sidourim",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/02/Echet-Hayil-de-Rabenou-6-Products4.jpg",
    badge: "NOUVEAUTÉ",
    isNew: true,
    rating: 5,
    reviewCount: 6,
    description:
      "Le livre de prières spécialement conçu pour les femmes, enrichi des enseignements et kavannot de Rabbi Na'hman. Une édition élégante qui accompagne la femme juive dans sa prière quotidienne.",
    characteristics: {
      Format: "Standard (13×18 cm)",
      Traduction: "Hébreu avec phonétique française",
      Couverture: "Rigide élégante",
    },
    variants: [
      { name: "Blanc", hex: "#f8fafc" },
      { name: "Rose", hex: "#fda4af" },
      { name: "Bleu Ciel", hex: "#7dd3fc" },
    ],
  },
  {
    id: "sidour-bilingue",
    name: "Le Sidour de Rabénou",
    subtitle: "Édition Bilingue",
    category: "sidourim",
    categoryLabel: "Nos Sidourim",
    price: 120,
    priceEUR: 30,
    priceUSD: 33,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Sidour-Bilingue-Double001.jpg",
    rating: 5,
    reviewCount: 10,
    description:
      "Le recueil de prières traditionnel en édition bilingue hébreu-français. Avec les instructions, kavannot et enseignements de Rabbi Na'hman intégrés pour une prière vivante.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "Hébreu-Français face à face",
      Couverture: "Rigide Simili Cuir",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "sidour-commente",
    name: "Le Sidour de Rabénou",
    subtitle: "Commenté",
    category: "sidourim",
    categoryLabel: "Nos Sidourim",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Sidour-Tefilot-Double001.jpg",
    rating: 5,
    reviewCount: 7,
    description:
      "Le recueil de prières traditionnel enrichi des précieux commentaires, kavanot et enseignements de Rabbi Na'hman. Chaque prière est accompagnée d'explications profondes.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "Hébreu avec commentaires en français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },

  // ── Téhilim, Téfilot & Tikoun Haklali (4) ─────────────
  {
    id: "pack-tehilim-tefilot",
    name: "Pack Téhilim / Kitsour Likouté Téfilot",
    category: "tehilim",
    categoryLabel: "Téhilim & Tikoun Haklali",
    price: 220,
    priceEUR: 55,
    priceUSD: 60,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/11/Pack-Tehilim-_-Tefilot.jpg",
    badge: "OFFRE DU MOMENT",
    isPack: true,
    rating: 5,
    reviewCount: 5,
    description:
      "Un coffret réunissant le Téhilim de Rabénou et le Kitsour Likouté Téfilot. Deux ouvrages complémentaires pour la prière et la récitation des Psaumes.",
    characteristics: {
      Contenu: "2 ouvrages : Téhilim + Kitsour Likouté Téfilot",
      Économie: "30₪ d'économie",
    },
  },
  {
    id: "tikoun-haklali",
    name: "Tikoun Haklali",
    subtitle: "Hébreu-Français & Phonétique",
    category: "tehilim",
    categoryLabel: "Téhilim & Tikoun Haklali",
    price: 40,
    priceEUR: 10,
    priceUSD: 11,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/12/Tikoun-Haklali-Six.jpg",
    badge: "ESSENTIEL",
    rating: 5,
    reviewCount: 22,
    description:
      "Les 10 Psaumes du Tikoun Haklali (Réparation Générale) révélés par Rabbi Na'hman. Édition trilingue : hébreu, français et phonétique pour permettre à chacun de les réciter.",
    characteristics: {
      Format: "Poche (10×15 cm)",
      Traduction: "Hébreu + Français + Phonétique",
      Pages: "64 pages",
      Couverture: "Souple plastifiée",
    },
  },
  {
    id: "tehilim-rabenou",
    name: "Téhilim de Rabénou",
    subtitle: "Grand Format",
    category: "tehilim",
    categoryLabel: "Téhilim & Tikoun Haklali",
    price: 150,
    priceEUR: 38,
    priceUSD: 41,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Tehilim-de-Rabenou-Double002.jpg",
    rating: 5,
    reviewCount: 9,
    description:
      "Le livre complet des Psaumes (Téhilim) enrichi des enseignements de Rabbi Na'hman et Rabbi Nathan. Chaque chapitre est accompagné des kavanot appropriées.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu-Français",
      Pages: "520 pages",
      Couverture: "Rigide Simili Cuir",
    },
    variants: DEFAULT_VARIANTS,
  },
  {
    id: "kitsour-likoute-tefilot",
    name: "Kitsour Likouté Téfilot",
    category: "tehilim",
    categoryLabel: "Téhilim & Tikoun Haklali",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2022/02/Kitsour-Likoute-Tefilot-Double003.jpg",
    rating: 5,
    reviewCount: 6,
    description:
      "Un condensé des prières de Rabbi Nathan tirées du Likouté Téfilot. Des prières puissantes pour chaque situation de la vie, traduites en français.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Couverture: "Rigide",
    },
    variants: DEFAULT_VARIANTS,
  },

  // ── Biographies (3) ───────────────────────────────────
  {
    id: "biographie-rabbi-nahman",
    name: "Biographie de Rabbi Na'hman",
    category: "biographies",
    categoryLabel: "Biographies",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/03/Biographie-de-Rabbi-Nahman-Double2.jpg",
    rating: 5,
    reviewCount: 8,
    description:
      "La vie extraordinaire de Rabbi Na'hman de Breslev (1772-1810), arrière-petit-fils du Baal Chem Tov. De sa naissance à Medjiboj à sa fin de vie à Ouman, découvrez le parcours du Tsaddik qui a révolutionné la pensée hassidique.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Pages: "380 pages",
      Couverture: "Rigide avec illustrations",
    },
  },
  {
    id: "biographie-rabbi-nathan",
    name: "Biographie de Rabbi Nathan",
    category: "biographies",
    categoryLabel: "Biographies",
    price: 100,
    priceEUR: 25,
    priceUSD: 27,
    image: "https://tikoun-aolam.com/wp-content/uploads/2024/12/Biographie-de-Rabbi-Nathan-Double1.jpg",
    rating: 5,
    reviewCount: 5,
    description:
      "La vie de Rabbi Nathan de Breslev, le disciple fidèle qui a transmis au monde l'enseignement de Rabbi Na'hman. Sans lui, aucun des livres de Rabénou ne nous serait parvenu.",
    characteristics: {
      Format: "Standard (15×21 cm)",
      Traduction: "100% Français",
      Pages: "340 pages",
      Couverture: "Rigide avec illustrations",
    },
  },
  {
    id: "pack-biographies",
    name: "Pack Rabbi Na'hman + Rabbi Nathan",
    category: "biographies",
    categoryLabel: "Biographies",
    price: 180,
    priceEUR: 45,
    priceUSD: 49,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/04/Pack-Noir-Rabbi-Nathan.jpg",
    badge: "PROMO",
    isPack: true,
    rating: 5,
    reviewCount: 4,
    description:
      "Le coffret réunissant les deux biographies essentielles : Rabbi Na'hman et Rabbi Nathan. Une économie de 20₪ pour découvrir le maître et son disciple.",
    characteristics: {
      Contenu: "2 biographies : Rabbi Na'hman + Rabbi Nathan",
      Économie: "20₪ d'économie",
    },
  },

  // ── Les Contes (1) ────────────────────────────────────
  {
    id: "contes-temps-anciens",
    name: "Les Contes des Temps Anciens",
    subtitle: "618 pages, interlinéaire",
    category: "contes",
    categoryLabel: "Les Contes",
    price: 200,
    priceEUR: 50,
    priceUSD: 55,
    image: "https://tikoun-aolam.com/wp-content/uploads/2025/01/Les-Contes-des-Temps-Anciens-Double001.jpg",
    badge: "CHEF-D'ŒUVRE",
    rating: 5,
    reviewCount: 15,
    description:
      "Un chef-d'œuvre exceptionnel de 618 pages. Les treize contes de Rabbi Na'hman en bilingue interlinéaire, révélant les secrets les plus profonds de la Kabbale sous forme d'histoires intemporelles. Chaque conte est accompagné de commentaires détaillés.",
    characteristics: {
      Format: "Grand Format (17×24 cm)",
      Traduction: "Hébreu-Français interlinéaire",
      Pages: "618 pages",
      Couverture: "Rigide Simili Cuir de luxe",
    },
    variants: DEFAULT_VARIANTS,
  },
];

// ── Helpers ─────────────────────────────────────────────

export function getProduct(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return ALL_PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return ALL_PRODUCTS.filter((p) => p.badge).slice(0, 3);
}

export function getRelatedProducts(currentId: string, limit = 4): Product[] {
  const current = getProduct(currentId);
  if (!current) return ALL_PRODUCTS.slice(0, limit);
  return ALL_PRODUCTS.filter(
    (p) => p.category === current.category && p.id !== currentId
  ).slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return ALL_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.subtitle?.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
  );
}

// Currency conversion (approximate rates — will be dynamic later)
const RATES: Record<string, number> = { ILS: 1, EUR: 0.25, USD: 0.27 };

export function convertPrice(
  priceILS: number,
  currency: string
): { amount: number; symbol: string } {
  const symbols: Record<string, string> = { ILS: "₪", EUR: "€", USD: "$" };
  const rate = RATES[currency] ?? 1;
  return {
    amount: Math.round(priceILS * rate),
    symbol: symbols[currency] ?? "₪",
  };
}
