/** @type {import('next').NextConfig} */
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
        source: "/api/doctors/:path*",
        destination: `${BACKEND_SERVER_URL}/doctors/:path*`,
      },
      {
        source: "/api/appointments/:path*",
        destination: `${BACKEND_SERVER_URL}/appointments/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${BACKEND_SERVER_URL}/reviews/:path*`,
      },
      {
        source: "/api/auth/jwt",
        destination: `${BACKEND_SERVER_URL}/auth/jwt`,
      },
    ];
  },
};

export default nextConfig;