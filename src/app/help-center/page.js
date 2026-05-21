import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Help Center",
  description: "Get help with DocAppoint.",
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
      <main className="page-enter pt-[66px] min-h-screen">

        {/* Hero Banner */}
        <div className="py-14" style={{ background: "var(--grad)" }}>
          <div className="max-w-[800px] mx-auto px-6">
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Support</div>
            <h1 className="font-['Sora'] text-[clamp(24px,3vw,36px)] font-black text-white">
              Help Center
            </h1>
            <p className="text-[15px] mt-2" style={{ color: "rgba(255,255,255,0.7)" }}>
              Find answers to the most common questions about DocAppoint.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-[800px] mx-auto px-6 py-12">
          <h2 className="font-['Sora'] text-[20px] font-extrabold mb-6" style={{ color: "var(--tx)" }}>
            Frequently Asked Questions
          </h2>

          {faqs.map((f, i) => (
            <div key={i} className="rounded-[var(--r-lg)] p-5 mb-3"
              style={{ background: "var(--card)", border: "1px solid var(--card-bdr)" }}>
              <div className="flex items-start gap-3">
                <i className="ti ti-help-circle text-[18px] shrink-0 mt-0.5" style={{ color: "var(--p)" }} />
                <div>
                  <h3 className="font-['Sora'] text-[15px] font-bold mb-2" style={{ color: "var(--tx)" }}>
                    {f.q}
                  </h3>
                  <p className="text-[13.5px] leading-[1.7]" style={{ color: "var(--tx2)" }}>
                    {f.a}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Still need help */}
          <div className="rounded-[var(--r-lg)] p-6 mt-8 text-center" style={{ background: "var(--p3)" }}>
            <div className="font-['Sora'] text-[16px] font-bold mb-2" style={{ color: "var(--p)" }}>
              Still need help?
            </div>
            <p className="text-[13.5px] mb-4" style={{ color: "var(--tx2)" }}>
              Our support team is here to help you. Send us a message and we&apos;ll get back to you within 24 hours.
            </p>
            <a href="mailto:support@docappoint.com" className="btn btn-primary btn-sm">
              <i className="ti ti-mail" />support@docappoint.com
            </a>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}