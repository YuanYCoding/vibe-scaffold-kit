import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@__PROJECT_SLUG__/contracts"],
};
export default nextConfig;
