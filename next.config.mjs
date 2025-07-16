/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        // Optionally, you can add pathname and port
        // pathname: '/**',
        // port: '',
      },
      // Add more patterns as needed for other image hosts
    ],
    // Alternatively, you can use the domains array (older approach)
    // domains: ['dummyimage.com'],
  },
};

export default nextConfig;
