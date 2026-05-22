import '@tabler/icons-webfont/dist/tabler-icons.min.css';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/components/layout/ThemeProvider";

export const metadata = {
  title: {
    default: "DocAppoint — Book Top Doctors in Bangladesh",
    template: "%s | DocAppoint",
  },
  description:
    "Bangladesh's most trusted platform for finding and booking verified specialist doctors. Fast, secure, and completely patient-first — available 24/7.",
  keywords: ["doctor appointment", "Bangladesh doctors", "BMDC verified", "book doctor online"],
  openGraph: {
    title: "DocAppoint — Book Top Doctors in Bangladesh",
    description: "Find and book verified specialist doctors in Bangladesh.",
    type: "website",
    url: "https://doc-appoint-client-side.vercel.app",
    images: [
      {
        url: "https://doc-appoint-client-side.vercel.app/thumbnail.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Early-Execution Inline Script to block theme flashes
function ThemeScript() {
  const themeLoaderCode = `
    (function() {
      try {
        const saved = localStorage.getItem("da_theme") || "light";
        if (saved === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (e) {}
    })()
  `;
  return <script dangerouslySetInnerHTML={{ __html: themeLoaderCode }} />;
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800;900&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body>
        <ThemeProvider>
          {children}
          
          {/* 🟢 React Hot Toast Engine configured with design token styles */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card)",
                color: "var(--tx)",
                border: "1px solid var(--bdr)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "13.5px",
                fontWeight: 600,
              },
              success: {
                iconTheme: { primary: "#1D9E75", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#E24B4A", secondary: "#fff" },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}