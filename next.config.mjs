/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nai', // Set the base path for your application
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["odbc"], // Ensure 'odbc' is installed
  },
};

export default nextConfig;
