/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio",
  },
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
};

export default nextConfig;
