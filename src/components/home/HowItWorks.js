"use client";
export default function HowItWorks() {
  const steps = [
    { n: 1, icon: "ti-search", cls: "ico-blue", title: "Find a doctor", desc: "Search by specialty, location, or name. Read real patient reviews to make an informed choice." },
    { n: 2, icon: "ti-calendar", cls: "ico-green", title: "Book a slot", desc: "Choose a convenient date and time. Fill in your details and confirm in seconds." },
    { n: 3, icon: "ti-heart", cls: "ico-pink", title: "Get treated", desc: "Visit the clinic and receive expert, personalized care from your chosen specialist." },
  ];
  return (
    <div style={{ background: "var(--bg3)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)", padding: "3rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <div className="eyebrow" style={{ textAlign: "center" }}>Simple process</div>
          <div className="sec-title" style={{ fontSize: 24 }}>How it works</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }} className="hiw-resp">
          {steps.map((s) => (
            <div key={s.n} style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.5rem", textAlign: "center", transition: "transform 0.22s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--p)", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.7rem", fontFamily: "Sora, sans-serif" }}>{s.n}</div>
              <div style={{ width: 58, height: 58, borderRadius: "var(--r-lg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 0.9rem", fontSize: 25, background: s.cls === "ico-blue" ? "var(--p3)" : s.cls === "ico-green" ? "var(--green-bg)" : "#FBEAF0", color: s.cls === "ico-blue" ? "var(--p)" : s.cls === "ico-green" ? "#3B6D11" : "#993556" }}>
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--tx)", marginBottom: 5 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: "var(--tx2)", lineHeight: 1.55 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){.hiw-resp{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}