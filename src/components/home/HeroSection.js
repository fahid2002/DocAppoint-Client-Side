"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { DOCTORS } from "@/data/doctors";
import { useSession } from "@/libs/auth-client";
import "swiper/css";
import "swiper/css/autoplay";

const heroDoctors = [...DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 5);

const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

export default function HeroSection() {
  const router = useRouter();
  const { data: session } = useSession();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/appointments?q=${encodeURIComponent(search)}`);
    } else {
      router.push("/appointments");
    }
  };

  const handleDoctorClick = (id) => {
    if (!session?.user) {
      router.push("/login");
    } else {
      router.push(`/appointments/${id}`);
    }
  };

  return (
    <div className="hero overflow-x-hidden">
      {/* ── Inner grid ── */}
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-center relative z-[1] w-full box-border">

        {/* ── Left content ── */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-[7px] bg-white/12 border border-white/22 rounded-[30px] px-[14px] py-[5px] text-xs text-white/92 font-semibold font-[Sora,sans-serif] mb-[1.1rem]">
            <i className="ti ti-circle-check text-[13px]" aria-hidden="true" />
            Trusted by 8,000+ patients across Bangladesh
          </div>

          {/* Heading */}
          <h1 className="font-[Sora,sans-serif] text-[clamp(28px,4vw,46px)] font-black text-white leading-[1.15] mb-[0.85rem] tracking-[-0.8px]">
            Find &amp; Book
            <br />
            Top Doctors{" "}
            <span className="text-(--acc3)">Easily</span>
          </h1>

          {/* Subtext */}
          <p className="text-[15px] text-white/72 mb-[1.8rem] leading-[1.7] max-w-[440px]">
            Browse BMDC-verified specialists, check real-time availability, and schedule your
            appointment in under 2 minutes — from anywhere.
          </p>

          {/* Search bar */}
          <div className="flex max-w-[480px] bg-white/13 border-[1.5px] border-white/28 rounded-xl p-[5px] backdrop-blur-[10px] mb-[1.8rem]">
            <i className="ti ti-search text-white/55 text-base ml-1 self-center" aria-hidden="true" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by doctor name or specialty…"
              className="flex-1 bg-transparent border-none outline-none text-sm text-white px-3 py-[7px] font-[DM_Sans,sans-serif] placeholder:text-white/50"
            />
            <button
              onClick={handleSearch}
              className="bg-(--p) text-white text-sm font-semibold px-[18px] py-[9px] rounded-[9px] hover:bg-(--p-dark) transition-colors duration-200 cursor-pointer"
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8">
            {[
              { num: "120+", lbl: "Specialists" },
              { num: "8k+",  lbl: "Patients" },
              { num: "15+",  lbl: "Specialties" },
              { num: "4.9★", lbl: "Avg Rating" },
            ].map((s) => (
              <div key={s.lbl}>
                <div className="font-[Sora,sans-serif] text-2xl font-black text-(--acc3)">{s.num}</div>
                <div className="text-[11px] text-white/50 mt-0.5">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right — Swiper doctor cards ── */}
        <div className="hero-card-desktop rounded-xl p-[1.1rem] shadow-[0_20px_60px_rgba(0,0,0,0.25)] max-w-[340px] lg:max-w-none mx-auto lg:mx-0 w-full">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            className="w-full h-full rounded-xl"
          >
            {heroDoctors.map((doc) => (
              <SwiperSlide key={doc.id}>
                <div onClick={() => handleDoctorClick(doc.id)} className="cursor-pointer">

                  {/* Doctor header */}
                  <div className="card-divider flex items-center gap-2.5 mb-[0.8rem] pb-[0.8rem]">
                    <div className="w-[50px] h-[50px] rounded-[11px] overflow-hidden flex-shrink-0">
                      <Image
                        src={doc.img}
                        alt={doc.name}
                        width={50}
                        height={50}
                        className="object-cover object-top w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="card-name font-[Sora,sans-serif] text-[13px] font-bold">
                        {doc.name}
                      </div>
                      <div className="card-specialty text-[11px] font-semibold">
                        {doc.specialty} · BMDC Verified
                      </div>
                      <div className="text-[#BA7517] text-xs">
                        {stars(doc.rating)} {doc.rating}
                      </div>
                    </div>
                  </div>

                  {/* Slots label */}
                  <div className="card-label text-[10px] font-bold mb-[0.45rem] uppercase tracking-[0.06em]">
                    Next available slots
                  </div>

                  {/* Slot badges */}
                  <div className="flex gap-[5px] mb-[0.7rem]">
                    <span className="card-slot-green text-[11px] font-semibold px-[10px] py-1 rounded-md flex items-center gap-1">
                      <i className="ti ti-clock text-[10px]" />
                      {doc.times[0] || "9:00 AM"}
                    </span>
                    {doc.times[1] && (
                      <span className="card-slot-blue text-[11px] font-semibold px-[10px] py-1 rounded-md">
                        {doc.times[1]}
                      </span>
                    )}
                  </div>

                  {/* Fee + Available */}
                  <div className="flex justify-between items-center">
                    <div className="card-fee font-[Sora,sans-serif] text-[17px] font-extrabold">
                      ৳{doc.fee}{" "}
                      <small className="card-fee-small text-[10px] font-normal">/visit</small>
                    </div>
                    <div className="card-available inline-flex items-center gap-1 text-[10px] font-bold px-[9px] py-[3px] rounded-[5px]">
                      <div className="pulse" />
                      Available
                    </div>
                  </div>

                  {/* Hospital bottom card */}
                  <div className="card-bottom rounded-[10px] px-[0.85rem] py-[0.65rem] mt-3 flex items-center gap-[0.7rem]">
                    <div className="card-bottom-icon w-[34px] h-[34px] rounded-lg flex items-center justify-center text-base flex-shrink-0">
                      <i className="ti ti-calendar" />
                    </div>
                    <div>
                      <div className="card-bottom-title text-[11.5px] font-bold">{doc.hospital}</div>
                      <div className="card-bottom-sub text-[10px]">{doc.location}</div>
                    </div>
                  </div>

                  {/* Click hint */}
                  <div className="text-center mt-[0.6rem] text-[11px] text-white/50">
                    Click to view details →
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}