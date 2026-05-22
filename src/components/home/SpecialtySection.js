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
    <div style={{ background: "var(--bg3)", borderTop: "1px solid var(--bdr)", borderBottom: "1px solid var(--bdr)", padding: "3rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.2rem" }}>
          <div>
            <div className="eyebrow">Browse by specialty</div>
            <div className="sec-title">Find the right specialist</div>
          </div>
        </div>

        <div
          className="spec-grid-resp grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8"
          style={{ justifyContent: "center", justifyItems: "stretch" }}
        >
          {SPECIALTIES.map((s) => (
            <div
              key={s.label}
              className={`spec-chip${active === s.label ? " on" : ""} flex w-full cursor-pointer flex-col items-center justify-center gap-3 text-center`}
              onClick={() => handle(s.label)}
            >
              <div
                className="mx-auto mb-2 flex h-[38px] w-[38px] items-center justify-center rounded-[10px] text-[17px] transition-all"
                style={{
                  background: active === s.label ? "rgba(255,255,255,0.2)" : "rgba(24,95,165,0.25)",
                  color: active === s.label ? "#fff" : "var(--p)",
                }}
              >
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>

              <div
                className="mt-2 text-center font-[Sora] text-[10.5px] font-semibold leading-tight transition-colors"
                style={{
                  color: active === s.label ? "#fff" : "var(--tx2)",
                }}
              >
                {s.label === "General" ? "General Physician" : s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}