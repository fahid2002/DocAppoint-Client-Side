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
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/doctors/:path*`,
      },
      {
        source: "/api/appointments/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/appointments/:path*`,
      },
      {
        source: "/api/reviews/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/:path*`,
      },
    ];
  },
};

export default nextConfig;