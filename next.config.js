/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
    typedRoutes: false,
    scrollRestoration: true,
    serverActions: true,
  },
  images: {
    domains: [
      "storage.googleapis.com",
      "coinpayments.net",
      "images.pexels.com",
    ],
    minimumCacheTTL: 1500000,
  },
};
const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.ts"
);

module.exports = withNextIntl(nextConfig);
