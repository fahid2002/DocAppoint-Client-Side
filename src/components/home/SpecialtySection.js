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
    <div className="bg-(--bg3) border-t border-(--bdr) border-b py-12">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-[1.2rem]">
          <div>
            <div className="eyebrow">Browse by specialty</div>
            <div className="sec-title">Find the right specialist</div>
          </div>
        </div>

        {/* Specialty grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-[0.6rem] justify-center">
          {SPECIALTIES.map((s) => (
            <div
              key={s.label}
              onClick={() => handle(s.label)}
              className={`spec-chip${active === s.label ? " on" : ""} w-full`}
            >
              {/* Icon circle */}
              <div
                className={`w-[38px] h-[38px] rounded-[10px] flex items-center justify-center mx-auto mb-2 text-[17px] transition-all duration-[220ms] ${
                  active === s.label
                    ? "bg-white/20 text-white"
                    : "bg-[rgba(24,95,165,0.25)] text-(--p)"
                }`}
              >
                <i className={`ti ${s.icon}`} aria-hidden="true" />
              </div>

              {/* Label */}
              <div
                className={`font-[Sora,sans-serif] text-[10.5px] font-semibold transition-colors duration-[220ms] ${
                  active === s.label ? "text-white" : "text-(--tx2)"
                }`}
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