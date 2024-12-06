/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nai",
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["odbc"],
  },
};

export default nextConfig;
