import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "3mb",
    },
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
