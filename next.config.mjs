/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["odbc"], // Ensure 'odbc' is installed
  },
};

export default nextConfig;
