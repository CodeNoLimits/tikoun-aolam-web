import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Enseignements Breslev",
  description:
    "Articles et enseignements de Rabbi Na'hman de Breslev. Torah, Hishtapkhout, Hitbodédout, Tikoun Haklali et sagesse hassidique.",
  alternates: { canonical: "https://tikoun-aolam.vercel.app/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
