/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["odbc"],
  },
  basePath: '/nai',
};

export default nextConfig;
