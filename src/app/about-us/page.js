import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = { 
  title: "About Us", 
  description: "Learn about DocAppoint and our mission." 
};

export default function AboutPage() {
  // 🟢 Enhanced data structure to include visible, high-contrast emoji characters alongside the icons
  const sections = [
    { 
      icon: "ti-target", 
      emoji: "🎯", 
      title: "Our Mission", 
      text: "DocAppoint was founded with a simple mission: to make quality healthcare accessible to every patient in Bangladesh. We eliminate the friction of finding and booking the right doctor by providing a fast, transparent, and secure platform." 
    },
    { 
      icon: "ti-shield-check", 
      emoji: "🛡️", 
      title: "BMDC Verified Doctors", 
      text: "Every doctor listed on DocAppoint is verified against the Bangladesh Medical and Dental Council (BMDC) registry. We manually vet credentials, specializations, and hospital affiliations before any doctor is listed." 
    },
    { 
      icon: "ti-users", 
      emoji: "👥", 
      title: "Our Team", 
      text: "We are a passionate team of healthcare technology professionals, doctors, and patient advocates based in Dhaka. Our goal is to bridge the gap between patients and quality medical care using modern technology." 
    },
    { 
      icon: "ti-chart-line", 
      emoji: "📊", 
      title: "By the Numbers", 
      text: "120+ verified specialists · 8,000+ patients served · 15+ specialties · 4.9 average rating · 15,000+ bookings per month. These numbers represent real patients who received better care through our platform." 
    },
  ];

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: 66, minHeight: "100vh" }} className="page-enter">
        {/* Banner Section */}
        <div style={{ background: "var(--grad)", padding: "4rem 0 3rem" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
            <div className="eyebrow" style={{ color: "var(--acc3)" }}>Our story</div>
            <h1 style={{ fontFamily: "Sora, sans-serif", fontSize: "clamp(28px,4vw,42px)", fontWeight: 900, color: "#fff", marginBottom: "1rem" }}>
              About DocAppoint
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", lineHeight: 1.7 }}>
              Bangladesh&apos;s most trusted platform for finding and booking verified specialist doctors — built with patients first. 
              {/* 🟢 High-visibility rocket wrapper */}
              <span style={{ 
                display: "inline-block", 
                marginLeft: "8px", 
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                transform: "vertical-align(-2px)"
              }}>🚀</span>
            </p>
          </div>
        </div>

        {/* Content Cards */}
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1.5rem" }}>
          {sections.map(s => (
            <div key={s.title} style={{ marginBottom: "2.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "0.75rem" }}>
                
                {/* 🟢 Enhanced high-visibility icon + emoji block housing */}
                <div style={{ 
                  width: 44, 
                  height: 44, 
                  borderRadius: 11, 
                  background: "var(--p3)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: 20, 
                  position: "relative",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}>
                  {/* Tabler Icon fallback layer */}
                  <i className={`ti ${s.icon}`} style={{ color: "var(--p)", position: "absolute", opacity: 0.15 }} />
                  
                  {/* 🟢 High Contrast Emoji Layer with drop shadow for dark & light mode blending */}
                  <span style={{ 
                    fontSize: "22px", 
                    zIndex: 2, 
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15)) drop-shadow(0 0 1px rgba(255,255,255,0.8))" 
                  }}>
                    {s.emoji}
                  </span>
                </div>

                <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tx)" }}>
                  {s.title}
                </h2>
              </div>
              <p style={{ fontSize: 15, color: "var(--tx2)", lineHeight: 1.75 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}