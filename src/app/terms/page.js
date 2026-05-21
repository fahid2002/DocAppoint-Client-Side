import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Terms & Conditions",
  description: "DocAppoint terms and conditions.",
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
      <main className="page-enter pt-[66px] min-h-screen">

        {/* Hero Banner */}
        <div className="py-14" style={{ background: "var(--grad)" }}>
          <div className="max-w-[800px] mx-auto px-6">
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Legal</div>
            <h1 className="font-['Sora'] text-[clamp(24px,3vw,36px)] font-black text-white">
              Terms &amp; Conditions
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