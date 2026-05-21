import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About Us",
  description: "Learn about DocAppoint and our mission.",
};

const sections = [
  { icon: "ti-target", title: "Our Mission", text: "DocAppoint was founded with a simple mission: to make quality healthcare accessible to every patient in Bangladesh. We eliminate the friction of finding and booking the right doctor by providing a fast, transparent, and secure platform." },
  { icon: "ti-shield-check", title: "BMDC Verified Doctors", text: "Every doctor listed on DocAppoint is verified against the Bangladesh Medical and Dental Council (BMDC) registry. We manually vet credentials, specializations, and hospital affiliations before any doctor is listed." },
  { icon: "ti-users", title: "Our Team", text: "We are a passionate team of healthcare technology professionals, doctors, and patient advocates based in Dhaka. Our goal is to bridge the gap between patients and quality medical care using modern technology." },
  { icon: "ti-chart-line", title: "By the Numbers", text: "120+ verified specialists · 8,000+ patients served · 15+ specialties · 4.9 average rating · 15,000+ bookings per month. These numbers represent real patients who received better care through our platform." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="page-enter pt-[66px] min-h-screen">

        {/* Hero Banner */}
        <div className="py-16" style={{ background: "var(--grad)" }}>
          <div className="max-w-[800px] mx-auto px-6 text-center">
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Our story</div>
            <h1 className="font-['Sora'] text-[clamp(28px,4vw,42px)] font-black text-white mb-4">
              About DocAppoint
            </h1>
            <p className="text-[16px] leading-[1.7]" style={{ color: "rgba(255,255,255,0.75)" }}>
              Bangladesh&apos;s most trusted platform for finding and booking verified specialist doctors — built with patients first.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="max-w-[800px] mx-auto px-6 py-16">
          {sections.map(s => (
            <div key={s.title} className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-[11px] flex items-center justify-center text-[20px]"
                  style={{ background: "var(--p3)", color: "var(--p)" }}>
                  <i className={`ti ${s.icon}`} />
                </div>
                <h2 className="font-['Sora'] text-[20px] font-extrabold" style={{ color: "var(--tx)" }}>
                  {s.title}
                </h2>
              </div>
              <p className="text-[15px] leading-[1.75]" style={{ color: "var(--tx2)" }}>
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