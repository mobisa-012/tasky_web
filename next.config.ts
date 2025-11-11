import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export", // Use 'export' for static export
  trailingSlash: true, // Ensure trailing slashes for static paths
};

export default nextConfig;
