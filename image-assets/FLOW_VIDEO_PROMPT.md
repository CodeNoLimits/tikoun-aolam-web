# FLOW VIDEO GENERATION PROMPT — Tikoun Aolam
> Prompt complet pour générer des vidéos background de haute qualité avec les images des livres Tikoun Aolam
> Outil: Flow (Google DeepMind) ou Runway Gen-3 / Kling AI / Sora
> Usage: Backgrounds vidéo pour site web Next.js (hero section, carousels, sections)

---

## CONTEXTE PRODUIT

Les livres Tikoun Aolam sont des éditions de prestige en langue française des enseignements de Rabbi Na'hman de Breslev. Design éditorial : couvertures noires et dorées, papier de qualité supérieure, typographie hébraïque et française. Ambiance : spiritualité, sagesse ancestrale, lumière dans l'obscurité.

---

## PROMPT PRINCIPAL (à copier dans Flow / Runway)

### VERSION FRANÇAISE (Cinematic Book Reveal)

```
A cinematic slow-motion video of elegant Jewish prayer books with gold and black leather covers, softly illuminated by warm candlelight. The books are arranged on a dark wooden surface. Camera slowly zooms in with parallax depth. Light particles (like Shabbat candle sparks) float gently upward. The atmosphere is sacred, timeless, mystical. Color palette: deep black, warm gold (#D4AF37), copper (#B87333). No text visible. Bokeh background. Ultra-HD, cinematic grade, 24fps, 10 seconds loop.
```

### VERSION HÉBRAÏQUE ACCENT (Gold Particle Flow)

```
Slow cinematic reveal of an open sacred Hebrew book with ornate golden typography. Warm golden light rays penetrate from above, illuminating the ancient text. Fine gold dust particles drift upward as if lifted by divine breath. Deep black background. Color grade: warm amber and gold tones. Sacred, ethereal atmosphere. No people. 4K quality, smooth camera movement, perfect seamless loop, 8 seconds.
```

### VERSION PRODUCT SHOWCASE (Book Rotation)

```
Elegant product video: a single hardcover book with matte black cover and gold foil Hebrew lettering slowly rotates 360 degrees on a black marble surface. Soft rim lighting on the edges. Reflections visible on the marble. Gold particle ambient effect. High-end luxury product cinematography, similar to Cartier or Louis Vuitton style. 10 second seamless loop. No text overlay.
```

### VERSION HERO SECTION (Abstract Spiritual)

```
Abstract cinematic background: flowing golden light streams in darkness, like sunbeams through ancient synagogue windows. Subtle Hebrew letterforms dissolving in the light. Deep mystical atmosphere. Colors: black, gold, copper, deep blue. No recognizable objects. Suitable as a full-screen website background. 15 second seamless loop. 4K resolution.
```

---

## PROMPTS SPÉCIFIQUES AVEC LES VRAIES IMAGES (pour img2video)

### Méthode: Upload image → Flow img2video

Pour chaque image produit, utiliser ce prompt template :

```
[IMAGE INPUT: URL du livre]

Transform this book cover photo into a cinematic video. The book should appear to glow with inner golden light. Camera slowly zooms in by 20%. Soft particle effects around the book. Dark luxury background. Smooth, elegant motion. 8 seconds loop. Color grade: enhance the gold tones, deepen the blacks. No text added.
```

### Images à prioriser pour vidéos (impact visuel maximal)

1. **Hero principal** → `Image-Accueil.jpg` — Zoom parallax lent
2. **Likouté Moharan 3 Tomes** → `Likoute-Moharan-3-Tomes-001.jpg` — Stack/reveal 3 volumes
3. **Contes des Temps Anciens** → `Les-Contes-des-Temps-Anciens-Double001.jpg` — Mystical glow
4. **Tikoun Haklali 6 volumes** → `Tikoun-Haklali-Six.jpg` — Reveal séquentiel
5. **Portrait Rabbi Israël** → `Rabbi-Israel-Dov-Ber-Odesser-1.jpg` — Subtle light rays

---

## SPÉCIFICATIONS TECHNIQUES POUR L'INTÉGRATION SITE

```html
<!-- Intégration dans Next.js -->
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-30"
  poster="/image-assets/hero-poster.jpg"
>
  <source src="/videos/hero-books-flow.mp4" type="video/mp4" />
  <source src="/videos/hero-books-flow.webm" type="video/webm" />
</video>
```

### Paramètres de compression (FFmpeg)
```bash
# MP4 optimisé web (H.264, ~2-3MB pour 10s)
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset slow -vf scale=1920:1080 -movflags +faststart output.mp4

# WebM (VP9, meilleure compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 31 -b:v 0 -vf scale=1920:1080 output.webm

# GIF preview poster (première frame)
ffmpeg -i output.mp4 -ss 0 -vframes 1 hero-poster.jpg
```

### Placement recommandé sur le site
| Section | Vidéo | Overlay CSS |
|---------|-------|-------------|
| Hero homepage | `hero-books-flow.mp4` | `opacity-30 mix-blend-overlay` |
| Section Nos Éditions | `books-rotate.mp4` | `opacity-20` |
| Section Nos Maîtres | `candlelight-abstract.mp4` | `opacity-40` |
| Header background mobile | `gold-particles.mp4` | `opacity-15` |

---

## WORKFLOW COMPLET

```
1. Aller sur Flow (labs.google) ou Runway (app.runwayml.com) ou Kling
2. Choisir "Image to Video" ou "Text to Video"
3. Uploader l'image depuis IMAGE_INDEX.md (copier l'URL → télécharger)
4. Coller le prompt adapté ci-dessus
5. Paramètres recommandés:
   - Durée: 8-10s
   - Resolution: 1920x1080 ou 1280x720
   - Motion: Low to Medium (pour un effet luxe calme)
   - Loop: Seamless si l'option est disponible
6. Télécharger en MP4
7. Compresser avec FFmpeg (commande ci-dessus)
8. Placer dans /public/videos/ du projet Next.js
9. Intégrer avec le code HTML ci-dessus
```

---

## ALTERNATIVE: NANO BANANA PRO (Gemini Image API)

Pour générer des visuels statiques améliorés sans vidéo :

```python
import anthropic  # ou google.generativeai

# Clé: AIzaSyBfLJBL-FeEQiBYRtwISJcEPtw1gn8aJwA (Nano Banana Pro)
# Modèle: nano-banana-pro-preview (= gemini-3-pro-image-preview)

prompt = """
Create a luxury editorial image of Breslev Hebrew books with gold and black covers,
arranged on dark marble. Warm candlelight. Gold particle effects. Sacred atmosphere.
Style: high-end publishing house photography. No text overlay. 16:9 ratio.
"""
```

> Note: Nano Banana Pro génère des images statiques (PNG/JPG), pas des vidéos.
> Pour des visuels d'ambiance → Nano Banana Pro.
> Pour des vidéos → Flow/Runway/Kling.
