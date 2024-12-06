/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["odbc"], // Ensure 'odbc' is installed
  },
  basePath: '/nai', // Set base path if app is served under a subdirectory
};

export default nextConfig;
