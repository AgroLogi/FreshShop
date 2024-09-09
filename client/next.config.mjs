/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint:{
      ignoreDuringBuilds: true,
    },
    reactStrictMode: true,
    images: {
      domains:['localhost'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
          port: '',
        },
      ],
    },
};

export default nextConfig;
