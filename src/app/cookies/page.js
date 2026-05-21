import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Cookie Policy",
  description: "DocAppoint cookie policy.",
};

const sections = [
  { title: "What Are Cookies?", text: "Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your experience." },
  { title: "Essential Cookies", text: "These cookies are necessary for DocAppoint to function. They include session cookies for authentication (managed by Better Auth) and security tokens. You cannot opt out of these cookies." },
  { title: "Preference Cookies", text: "We store your theme preference (light/dark mode) in localStorage to provide a consistent experience across sessions." },
  { title: "Analytics Cookies", text: "We may use anonymous analytics to understand how users interact with our platform. This helps us improve features and fix issues. No personally identifiable information is collected." },
  { title: "Managing Cookies", text: "You can control cookies through your browser settings. Note that disabling essential cookies will prevent you from logging in and using DocAppoint's core features." },
  { title: "Contact", text: "For questions about our cookie usage, contact privacy@docappoint.com." },
];

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="page-enter pt-[66px] min-h-screen">

        {/* Hero Banner */}
        <div className="py-14" style={{ background: "var(--grad)" }}>
          <div className="max-w-[800px] mx-auto px-6">
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 className="font-['Sora'] text-[clamp(24px,3vw,36px)] font-black text-white">
              Cookie Policy
            </h1>
            <p className="text-[13px] mt-2" style={{ color: "rgba(255,255,255,0.6)" }}>
              Last updated: May 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {sections.map(s => (
            <div key={s.title} className="mb-8">
              <h2 className="font-['Sora'] text-[17px] font-bold mb-2" style={{ color: "var(--tx)" }}>
                {s.title}
              </h2>
              <p className="text-[14.5px] leading-[1.75]" style={{ color: "var(--tx2)" }}>
                {s.text}
              </p>
            </div>
          ))}
        </div>

      </main>
      <Footer />
    </>
  );
}