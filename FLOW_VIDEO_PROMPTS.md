# 🎥 FLOW VIDEO PROMPTS : TIKOUN AOLAM (State of the Art)

Ce document contient les templates de prompts exacts à utiliser dans **Luma Dream Machine**, **Runway Gen-3 Alpha**, ou **Midjourney + Haiper/Kling** pour générer des vidéos d'arrière-plan (background loops) ultra-premium à partir des images originales isolées dans le dossier `/FLOW_ASSETS`.

L'objectif est d'atteindre le rendu "Nano Banana" luxueux (esthétique spirituelle, slow parallax, poussière dorée, lumière divine).

## 1. Hero Section (Arrière-plan principal de la Homepage)

**Image Source Recommandée :** Celle représentant la synagogue, le fauteuil de Rabénou ou le tombeau à Ouman, ou un livre ouvert majestueux.

**Prompt Motion (Runway Gen-3 / Luma) :**

> "Cinematic slow push-in tracking shot. A sacred Jewish book bound in dark leather with gold embossing resting on an ancient wooden table. Soft, warm cinematic lighting, sun rays filtering through a dusty room, floating golden dust motes in the air. Extremely shallow depth of field, 8k resolution, photorealistic, elegant, hyper-detailed, peaceful atmosphere, muted dark color palette with deep blacks and rich copper tones. No sudden movements, perfect loop."

## 2. Collections Hover Effects (Pour la grille Bento)

Pour remplacer les images statiques par des vidéos lors du survol (hover) sur les catégories : "Nos Sidourim", "Livres d'Étude", etc.

**Image Source Recommandée :** `product-1.jpg` (Otsar Hayira) ou `product-2.jpg`.

**Prompt Motion :**

> "Macro shot, extremely slow and smooth pan across the leather texture of a luxury book. Gold embossed Hebrew letters catching the soft golden ambient light. Elegant lens flare, volumetric lighting, photorealistic, 4k, clean composition. The book appears sacred and majestic. Subtle breathing animation of light."

## 3. Rabbi Na'hman / Rabbi Israël Ber Odesser (Pages Biographiques)

**Image Source Recommandée :** Les photos d'archives en noir & blanc authentiques du Saba ou du Tombeau.

**Prompt Motion :**

> "Archival photo brought to life. Subtle cinemagraph effect. Very slow, imperceptible zoom-in on a historical portrait. Cinematic subtle parallax effect separating the subject from the background. Dust particles floating gently in the foreground, soft golden light leak, solemn, deeply spiritual and peaceful, ultra-high quality, 8k. Keep the original features perfectly intact without AI morphing."

## 4. Intégration dans Next.js (Technique)

Une fois les vidéos générées (idéalement en format `.mp4` encodé en H.264/WebM avec un faible bitrate pour la performance), placez-les dans `public/videos/`.

Voici comment les intégrer silencieusement dans le background d'un composant React (comme le Hero) :

```jsx
<div className="absolute inset-0 -z-10 w-full h-full overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
  </video>
  {/* Gradient Overlay pour assurer la lisibilité du texte */}
  <div className="absolute inset-0 bg-gradient-to-t from-tikoun-black via-tikoun-black/60 to-transparent"></div>
</div>
```

---

**Dossier des assets sources :** `/Users/codenolimits-dreamai-nanach/Desktop/TIKOUN AOLAM/tikoun-aolam-web/FLOW_ASSETS/`
