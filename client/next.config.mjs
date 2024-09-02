/** @type {import('next').NextConfig} */
const nextConfig = {
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
