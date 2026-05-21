import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { 
  title: "Privacy Policy", 
  description: "DocAppoint privacy policy." 
};

const sections = [
  { title: "1. Information We Collect", text: "We collect information you provide directly (name, email, phone, appointment details), information collected automatically (usage data, device info, IP address), and data from third-party sign-in providers like Google." },
  { title: "2. How We Use Your Information", text: "We use your information to provide and improve our services, process bookings, communicate with you about appointments, ensure platform security, and comply with legal obligations." },
  { title: "3. Data Sharing", text: "We share your information only with the healthcare providers you book with, our trusted service providers under strict confidentiality agreements, and when required by law. We never sell your personal data." },
  { title: "4. Data Security", text: "We use JWT-based authentication, encrypted data storage, and industry-standard security measures to protect your personal information. However, no internet transmission is 100% secure." },
  { title: "5. Your Rights", text: "You have the right to access, correct, or delete your personal data. You may also request data portability or object to processing. Contact us at privacy@docappoint.com to exercise these rights." },
  { title: "6. Cookies", text: "We use essential cookies for authentication and session management, and optional analytics cookies. See our Cookie Policy for details." },
  { title: "7. Changes to This Policy", text: "We may update this policy periodically. We will notify you of significant changes via email or prominent notice on our platform." },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <div style={{ background: "var(--grad)", padding: "3.5rem 0 2.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#fff" }}>Privacy Policy</h1>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 8 }}>Last updated: May 2026</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
          {sections.map(s => (
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