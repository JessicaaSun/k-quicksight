/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "photostad-api.istad.co", "developers.elementor.com"],
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
  },
};

module.exports = nextConfig;
