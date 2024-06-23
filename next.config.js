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
      "media.ldlc.com",
      "5.imimg.com",
      "www.ourfriday.co.uk",
      "images.hindustantimes.com",
      "store.storeimages.cdn-apple.com",
      "creatoom.com",
      "cdn.prod.website-files.com",
      "i5.walmartimages.com",
    ],
  },
  // Other configurations can go here
};

module.exports = nextConfig;
