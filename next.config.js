/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    DB_HOST: process.env.DB_HOST || '31.97.223.43',
    DB_PORT: process.env.DB_PORT || '5432',
    DB_NAME: process.env.DB_NAME || 'jvto_dev',
    BACKOFFICE_URL: process.env.BACKOFFICE_URL || 'https://new-backoffice.javavolcano-touroperator.com',
  },
};

module.exports = nextConfig;
