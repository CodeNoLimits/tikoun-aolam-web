import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, ALL_PRODUCTS } from "@/lib/products";
import ProductDetails from "./ProductDetailClient";

const BASE = "https://tikoun-aolam.vercel.app";

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produit non trouvé" };

  const title = product.subtitle
    ? `${product.name} — ${product.subtitle}`
    : product.name;
  const description = product.description.slice(0, 160);

  return {
    title,
    description,
    keywords: [
      product.categoryLabel,
      product.name,
      "Breslev",
      "Rabbi Nachman",
      "Tikoun Aolam",
      "livre juif",
    ],
    openGraph: {
      type: "website",
      title: `${product.name} | Tikoun Aolam`,
      description,
      url: `${BASE}/produits/${product.id}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: [product.image],
    },
    alternates: {
      canonical: `${BASE}/produits/${product.id}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: { "@type": "Brand", name: "Éditions Tikoun Aolam" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ILS",
      availability: "https://schema.org/InStock",
      url: `${BASE}/produits/${product.id}`,
    },
    ...(product.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating,
        reviewCount: product.reviewCount || 1,
      },
    }),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE },
      {
        "@type": "ListItem",
        position: 2,
        name: "Boutique",
        item: `${BASE}/produits`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.categoryLabel,
        item: `${BASE}/produits?cat=${product.category}`,
      },
      { "@type": "ListItem", position: 4, name: product.name },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <ProductDetails />
    </>
  );
}
