/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { dev }) => {
    if (dev) {
      // Avoid Windows/OneDrive rename race issues in filesystem cache.
      config.cache = {
        type: 'memory'
      };
    }

    return config;
  }
};

export default nextConfig;
