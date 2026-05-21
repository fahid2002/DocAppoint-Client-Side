import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { 
  title: "Help Center", 
  description: "Get help with DocAppoint." 
};

const faqs = [
  { q: "How do I book an appointment?", a: "Create an account or log in, browse doctors on the All Appointments page, click 'View Details' on any doctor, then click 'Book Appointment'. Fill in your details and confirm." },
  { q: "Do I need an account to browse doctors?", a: "No, you can browse all doctors without an account. However, you need to log in to view doctor details and book appointments." },
  { q: "How do I cancel or reschedule an appointment?", a: "Go to Dashboard → My Bookings. Click the 'Update' button to reschedule or 'Delete' to cancel your appointment." },
  { q: "Is my personal data secure?", a: "Yes. We use JWT authentication, encrypted storage, and industry-standard security. Your data is never sold to third parties. See our Privacy Policy for details." },
  { q: "How do I sign in with Google?", a: "On the Login or Register page, click 'Continue with Google'. You'll be redirected to Google for authentication and returned to DocAppoint automatically." },
  { q: "Can I update my profile?", a: "Yes. Go to Dashboard → My Profile and click 'Update Profile'. You can change your name and profile photo URL." },
  { q: "How are doctors verified?", a: "Every doctor is verified against the Bangladesh Medical and Dental Council (BMDC) registry before listing. We also verify hospital affiliations and specializations." },
  { q: "What payment methods are accepted?", a: "Payments are made directly to the doctor at the time of consultation. DocAppoint currently facilitates booking only and does not process payments." },
];

export default function HelpCenterPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        <div style={{ background: "var(--grad)", padding: "3.5rem 0 2.5rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Support</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(24px,3vw,36px)", fontWeight: 900, color: "#fff" }}>Help Center</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 8 }}>Find answers to the most common questions about DocAppoint.</p>
          </div>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tx)", marginBottom: "1.5rem" }}>Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.3rem 1.5rem", marginBottom: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <i className="ti ti-help-circle" style={{ fontSize: 18, color: "var(--p)", flexShrink: 0, marginTop: 2 }} />
                <div>
                  <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--tx)", marginBottom: 8 }}>{f.q}</h3>
                  <p style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.7 }}>{f.a}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ background: "var(--p3)", borderRadius: "var(--r-lg)", padding: "1.5rem", marginTop: "2rem", textAlign: "center" }}>
            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--p)", marginBottom: 8 }}>Still need help?</div>
            <p style={{ fontSize: 13.5, color: "var(--tx2)", marginBottom: "1rem" }}>Our support team is here to help you. Send us a message and we&apos;ll get back to you within 24 hours.</p>
            <a href="mailto:support@docappoint.com" className="btn btn-primary btn-sm"><i className="ti ti-mail" />support@docappoint.com</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}