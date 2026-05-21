const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://docappoint-server-o99c.onrender.com/api";

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