// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.luluhypermarket.com",
      "961souq.com",
      "i5.walmartimages.com",
      "www.jarir.com",
      "media.extra.com",
    ],
  },
  // Other configurations can go here
};

module.exports = nextConfig;
