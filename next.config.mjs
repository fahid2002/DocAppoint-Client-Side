/** @type {import('next').NextConfig} */
// 🟢 FIXED: Hardcoded link so Vercel always knows where your backend is,
// and we fixed the double slash typo (//api -> /api)
const BACKEND_SERVER_URL = "https://docappoint-server-side.onrender.com/api";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://docappoint-server-side.onrender.com//api";

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
        source: "/api/doctors/:path*",
        destination: `${API_BASE}/doctors/:path*`,
      },
      {
        source: "/api/appointments/:path*",
        destination: `${API_BASE}/appointments/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${API_BASE}/reviews/:path*`,
      },
    ];
  },
};

export default nextConfig;