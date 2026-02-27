#!/usr/bin/env node
// ============================================================
// TIKOUN AOLAM — Image URL Verifier
// Checks all product images return HTTP 200
// Usage: node scripts/verify-images.js
// ============================================================

const fs = require("fs");
const path = require("path");

// Extract image URLs from products.ts
const productsFile = fs.readFileSync(
  path.join(__dirname, "../src/lib/products.ts"),
  "utf-8"
);

const imageRegex = /image:\s*"([^"]+)"/g;
const urls = [];
let match;
while ((match = imageRegex.exec(productsFile)) !== null) {
  urls.push(match[1]);
}

// Also extract from blog, maitres, and other pages
const pageDirs = [
  "../src/app/blog",
  "../src/app/maitres",
  "../src/app/editions",
  "../src/app/hiloula-de-rabbi-israel-ber-odesser",
  "../src/components/home",
];

for (const dir of pageDirs) {
  const fullDir = path.join(__dirname, dir);
  if (!fs.existsSync(fullDir)) continue;
  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".tsx"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(fullDir, file), "utf-8");
    // Match src="https://..." and image: "https://..."
    const srcRegex = /(?:src|image)[=:]\s*"(https?:\/\/[^"]+)"/g;
    let m;
    while ((m = srcRegex.exec(content)) !== null) {
      if (!urls.includes(m[1])) urls.push(m[1]);
    }
  }
}

console.log(`\n🔍 TIKOUN AOLAM — Image Verifier`);
console.log(`   Found ${urls.length} unique image URLs to check\n`);

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    return { url, status: res.status, ok: res.ok };
  } catch (err) {
    return { url, status: 0, ok: false, error: err.message };
  }
}

async function main() {
  const results = await Promise.all(urls.map(checkUrl));

  let passed = 0;
  let failed = 0;

  // Products section
  console.log("── PRODUITS (products.ts) ──────────────────────");
  const productUrls = [];
  const imgRegex2 = /image:\s*"([^"]+)"/g;
  let m2;
  while ((m2 = imgRegex2.exec(productsFile)) !== null) {
    productUrls.push(m2[1]);
  }

  for (const r of results.filter((r) => productUrls.includes(r.url))) {
    const icon = r.ok ? "✅" : "❌";
    const shortUrl = r.url.replace("https://tikoun-aolam.com/wp-content/uploads/", "…/");
    console.log(`  ${icon} [${r.status}] ${shortUrl}`);
    if (r.ok) passed++;
    else failed++;
  }

  // Other pages
  const otherResults = results.filter((r) => !productUrls.includes(r.url));
  if (otherResults.length > 0) {
    console.log("\n── PAGES (blog, maitres, etc.) ─────────────────");
    for (const r of otherResults) {
      const icon = r.ok ? "✅" : "❌";
      const shortUrl = r.url.replace("https://tikoun-aolam.com/wp-content/uploads/", "…/");
      console.log(`  ${icon} [${r.status}] ${shortUrl}`);
      if (r.ok) passed++;
      else failed++;
    }
  }

  // Summary
  console.log(`\n── RÉSUMÉ ─────────────────────────────────────`);
  console.log(`   Total: ${results.length} | ✅ ${passed} OK | ❌ ${failed} BROKEN`);

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} image(s) cassée(s) — à corriger !\n`);
    process.exit(1);
  } else {
    console.log(`\n🎉 Toutes les images sont valides !\n`);
    process.exit(0);
  }
}

main();
