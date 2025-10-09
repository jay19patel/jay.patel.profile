/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'res.cloudinary.com', 'images.unsplash.com'],
  },
  // Ensure data directory is included in the build
  outputFileTracingIncludes: {
    '/': ['./data/**/*'],
  },
};

export default nextConfig;
