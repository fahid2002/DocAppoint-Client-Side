import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { 
  title: "Cookie Policy", 
  description: "DocAppoint cookie policy." 
};

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <div style={{ background: "var(--grad)", padding: "3.5rem 0 2.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#fff" }}>Cookie Policy</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 8 }}>Last updated: May 2026</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
          {[
            { title: "What Are Cookies?", text: "Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your experience." },
            { title: "Essential Cookies", text: "These cookies are necessary for DocAppoint to function. They include session cookies for authentication (managed by Better Auth) and security tokens. You cannot opt out of these cookies." },
            { title: "Preference Cookies", text: "We store your theme preference (light/dark mode) in localStorage to provide a consistent experience across sessions." },
            { title: "Analytics Cookies", text: "We may use anonymous analytics to understand how users interact with our platform. This helps us improve features and fix issues. No personally identifiable information is collected." },
            { title: "Managing Cookies", text: "You can control cookies through your browser settings. Note that disabling essential cookies will prevent you from logging in and using DocAppoint's core features." },
            { title: "Contact", text: "For questions about our cookie usage, contact privacy@docappoint.com." },
          ].map(s => (
            <div key={s.title} style={{ marginBottom: "2rem" }}>
              <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--tx)", marginBottom: "0.6rem" }}>{s.title}</h2>
              <p style={{ fontSize: 14.5, color: "var(--tx2)", lineHeight: 1.75 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}