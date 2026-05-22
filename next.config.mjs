/** @type {import('next').NextConfig} */
// 🟢 FIXED: Using a clean, hardcoded backend URL string
const BACKEND_SERVER_URL = "https://docappoint-server-side.onrender.com/api";

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },

  async rewrites() {
    return [
      {
        // 🟢 FIXED: Caught all paths (doctors, appointments, reviews, auth) 
        // with one clean rule pointing directly to BACKEND_SERVER_URL
        source: "/api/:path*",
        destination: `${BACKEND_SERVER_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;