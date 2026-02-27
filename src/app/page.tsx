import { HeroSection } from "@/components/home/HeroSection";
import { BandeauPromo } from "@/components/home/BandeauPromo";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { TrustBadges } from "@/components/home/TrustBadges";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { BookShowcase } from "@/components/home/BookShowcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BandeauPromo />
      <CollectionsGrid />
      <FeaturedProducts />
      <BookShowcase />
      <TrustBadges />
    </>
  );
}
