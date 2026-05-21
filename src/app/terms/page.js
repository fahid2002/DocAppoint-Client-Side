import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// 🟢 Removed TypeScript type annotation ': Metadata'
export const metadata = { 
  title: "Terms & Conditions", 
  description: "DocAppoint terms and conditions." 
};

const sections = [
  { title: "1. Acceptance of Terms", text: "By accessing and using DocAppoint, you accept and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform." },
  { title: "2. Use of Services", text: "DocAppoint provides an online platform to connect patients with healthcare providers. We do not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical decisions." },
  { title: "3. User Accounts", text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. DocAppoint is not liable for any loss resulting from unauthorized account access." },
  { title: "4. Appointment Booking", text: "Appointments booked through DocAppoint are subject to availability. DocAppoint is not responsible for cancellations, delays, or the quality of medical services provided by listed doctors." },
  { title: "5. Privacy & Data", text: "Your use of DocAppoint is also governed by our Privacy Policy. We collect and process personal data in accordance with applicable Bangladesh data protection laws." },
  { title: "6. Prohibited Conduct", text: "You agree not to misuse the platform, submit false information, attempt to access other users' accounts, or use the platform for any unlawful purpose." },
  { title: "7. Modifications", text: "DocAppoint reserves the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms." },
  { title: "8. Contact", text: "If you have questions about these Terms, please contact us at legal@docappoint.com." },
];

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <div style={{ background: "var(--grad)", padding: "3.5rem 0 2.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#fff" }}>Terms &amp; Conditions</h1>
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