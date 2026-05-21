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
    <div
      style={{ background: "var(--grad)" }}
      className="relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: "45%",
            height: "80%",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "35%",
            height: "60%",
            background: "rgba(29,158,117,0.1)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div
        style={{
          paddingTop: "calc(66px + 4rem)",
          paddingBottom: "4rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "3rem",
          alignItems: "center",
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* ── LEFT ── */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: "30px",
              padding: "5px 14px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.92)",
              fontWeight: 600,
              fontFamily: "Sora, sans-serif",
              marginBottom: "1.1rem",
            }}
          >
            <i className="ti ti-circle-check" style={{ fontSize: 13 }} aria-hidden="true" />
            Trusted by 8,000+ patients across Bangladesh
          </div>

          {/* Heading */}
          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(30px, 4vw, 46px)",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.15,
              marginBottom: "0.85rem",
              letterSpacing: "-0.8px",
            }}
          >
            Find &amp; Book
            <br />
            Top Doctors{" "}
            <span style={{ color: "var(--acc3)" }}>Easily</span>
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontSize: "15px",
              color: "rgba(255,255,255,0.72)",
              marginBottom: "1.8rem",
              lineHeight: 1.7,
              maxWidth: "440px",
            }}
          >
            Browse BMDC-verified specialists, check real-time availability, and
            schedule your appointment in under 2 minutes — from anywhere.
          </p>

          {/* Search bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "480px",
              background: "rgba(255,255,255,0.13)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderRadius: "12px",
              padding: "5px",
              backdropFilter: "blur(10px)",
              marginBottom: "1.8rem",
              gap: "4px",
            }}
          >
            <i
              className="ti ti-search"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "16px",
                marginLeft: "6px",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by doctor name or specialty…"
              className="placeholder-search"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "13.5px",
                color: "#ffffff",
                padding: "7px 8px",
                fontFamily: "DM Sans, sans-serif",
                minWidth: 0,
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                background: "var(--p)",
                color: "#fff",
                border: "none",
                borderRadius: "9px",
                padding: "9px 20px",
                fontSize: "13.5px",
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
                fontFamily: "DM Sans, sans-serif",
                transition: "filter 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.filter = "brightness(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.filter = "brightness(1)")}
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              { num: "120+", lbl: "Specialists" },
              { num: "8k+",  lbl: "Patients" },
              { num: "15+",  lbl: "Specialties" },
              { num: "4.9★", lbl: "Avg Rating" },
            ].map((s) => (
              <div key={s.lbl}>
                <div
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: "24px",
                    fontWeight: 900,
                    color: "var(--acc3)",
                  }}
                >
                  {s.num}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.5)",
                    marginTop: "2px",
                  }}
                >
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Doctor card ── */}
        <div
          className="hero-card-desktop"
          style={{
            borderRadius: "16px",
            padding: "1.1rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
            width: "100%",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            style={{ width: "100%", borderRadius: "12px" }}
          >
            {heroDoctors.map((doc) => (
              <SwiperSlide key={doc.id}>
                <div
                  onClick={() => handleDoctorClick(doc.id)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {/* Doctor header */}
                  <div
                    className="card-divider"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "0.8rem",
                      paddingBottom: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 11,
                        overflow: "hidden",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={doc.img}
                        alt={doc.name}
                        width={50}
                        height={50}
                        style={{
                          objectFit: "cover",
                          objectPosition: "top",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        className="card-name"
                        style={{
                          fontFamily: "Sora, sans-serif",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {doc.name}
                      </div>
                      <div
                        className="card-specialty"
                        style={{ fontSize: 11, fontWeight: 600 }}
                      >
                        {doc.specialty} · BMDC Verified
                      </div>
                      <div style={{ color: "#BA7517", fontSize: 12 }}>
                        {stars(doc.rating)} {doc.rating}
                      </div>
                    </div>
                  </div>

                  {/* Slots label */}
                  <div
                    className="card-label"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      marginBottom: "0.45rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Next available slots
                  </div>

                  {/* Slot badges */}
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      marginBottom: "0.7rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      className="card-slot-green"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 6,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <i className="ti ti-clock" style={{ fontSize: 10 }} />
                      {doc.times[0] || "9:00 AM"}
                    </span>
                    {doc.times[1] && (
                      <span
                        className="card-slot-blue"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "4px 10px",
                          borderRadius: 6,
                        }}
                      >
                        {doc.times[1]}
                      </span>
                    )}
                  </div>

                  {/* Fee + Available */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.7rem",
                    }}
                  >
                    <div
                      className="card-fee"
                      style={{
                        fontFamily: "Sora, sans-serif",
                        fontSize: 17,
                        fontWeight: 800,
                      }}
                    >
                      ৳{doc.fee}{" "}
                      <small
                        className="card-fee-small"
                        style={{ fontSize: 10, fontWeight: 400 }}
                      >
                        /visit
                      </small>
                    </div>
                    <div
                      className="card-available"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "3px 9px",
                        borderRadius: 5,
                      }}
                    >
                      <div className="pulse" />
                      Available
                    </div>
                  </div>

                  {/* Hospital bottom */}
                  <div
                    className="card-bottom"
                    style={{
                      borderRadius: 10,
                      padding: "0.65rem 0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.7rem",
                    }}
                  >
                    <div
                      className="card-bottom-icon"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        flexShrink: 0,
                      }}
                    >
                      <i className="ti ti-building-hospital" />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        className="card-bottom-title"
                        style={{ fontSize: 11.5, fontWeight: 700 }}
                      >
                        {doc.hospital}
                      </div>
                      <div
                        className="card-bottom-sub"
                        style={{ fontSize: 10 }}
                      >
                        {doc.location}
                      </div>
                    </div>
                  </div>

                  {/* Click hint */}
                  <div
                    style={{
                      textAlign: "center",
                      marginTop: "0.6rem",
                      fontSize: 11,
                      opacity: 0.5,
                      color: "inherit",
                    }}
                  >
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