import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: [],
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tikoun-aolam.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
