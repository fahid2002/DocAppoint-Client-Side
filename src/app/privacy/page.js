import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "DocAppoint privacy policy.",
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
      <main className="page-enter pt-[66px] min-h-screen">

        {/* Hero Banner */}
        <div className="py-14" style={{ background: "var(--grad)" }}>
          <div className="max-w-[800px] mx-auto px-6">
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 className="font-['Sora'] text-[clamp(24px,3vw,36px)] font-black text-white">
              Privacy Policy
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