"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SPECIALTIES } from "@/data/doctors";

export default function SpecialtySection() {
  const router = useRouter();
  const [active, setActive] = useState("Cardiologist");

  const handle = (label) => {
    setActive(label);
    router.push(`/appointments?specialty=${label}`);
  };

  return (
    <div
      style={{
        background: "var(--bg3)",
        borderTop: "1px solid var(--bdr)",
        borderBottom: "1px solid var(--bdr)",
        padding: "3rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "1.2rem" }}>
          <div className="eyebrow">Browse by specialty</div>
          <div className="sec-title">Find the right specialist</div>
        </div>

        {/* Specialty grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "0.6rem",
          }}
        >
          {SPECIALTIES.map((s) => (
            <div
              key={s.label}
              onClick={() => handle(s.label)}
              style={{
                background: active === s.label ? "var(--p)" : "var(--card)",
                border: `1.5px solid ${active === s.label ? "var(--p)" : "var(--bdr)"}`,
                borderRadius: "10px",
                padding: "0.8rem 0.4rem",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.22s",
                boxShadow: active === s.label ? "0 4px 14px rgba(24,95,165,0.3)" : "none",
                width: "100%",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => {
                if (active !== s.label) {
                  e.currentTarget.style.borderColor = "var(--p)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)";
                }
              }}
              onMouseLeave={(e) => {
                if (active !== s.label) {
                  e.currentTarget.style.borderColor = "var(--bdr)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }
              }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 0.5rem",
                  fontSize: 17,
                  transition: "all 0.22s",
                  background: active === s.label ? "rgba(255,255,255,0.2)" : "rgba(24,95,165,0.1)",
                  color: active === s.label ? "#ffffff" : "var(--p)",
                }}
              >
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>

              {/* Label */}
              <div
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: "10.5px",
                  fontWeight: 600,
                  transition: "color 0.22s",
                  color: active === s.label ? "#ffffff" : "var(--tx2)",
                }}
              >
                {s.label === "General" ? "General Physician" : s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Responsive override */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 768px) {
            .specialty-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .specialty-grid { grid-template-columns: repeat(4, 1fr) !important; }
          }
        `}} />
      </div>
    </div>
  );
}