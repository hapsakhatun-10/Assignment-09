/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pixabay.com",
      }, {

        protocol: "https",
        hostname: "cdn.pixabay.com",

      }
    ],
  },
};

export default nextConfig;