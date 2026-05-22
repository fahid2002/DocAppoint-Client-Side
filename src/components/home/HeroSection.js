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

  const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

  return (
    <div className="hero" style={{ overflowX: "hidden", paddingTop: "150px" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: "3rem",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
          boxSizing: "border-box",
        }}
        className="hero-inner-grid"
      >
        <div className="min-w-0 w-full">
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.22)",
              borderRadius: 30,
              padding: "5px 14px",
              fontSize: 12,
              color: "rgba(255,255,255,0.92)",
              marginBottom: "1.1rem",
              fontWeight: 600,
              fontFamily: "Sora, sans-serif",
              maxWidth: "100%",
              boxSizing: "border-box",
            }}
          >
            <i className="ti ti-circle-check" style={{ fontSize: 13 }} aria-hidden="true" />
            <span className="hero-trust-text">Trusted by 8,000+ patients across Bangladesh</span>
          </div>

          <h1
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "clamp(28px, 4vw, 46px)",
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "0.85rem",
              letterSpacing: "-0.8px",
            }}
          >
            Find &amp; Book
            <br />
            Top Doctors <span style={{ color: "var(--acc3)" }}>Easily</span>
          </h1>

          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.72)",
              marginBottom: "1.8rem",
              lineHeight: 1.7,
              maxWidth: 440,
            }}
          >
            Browse BMDC-verified specialists, check real-time availability, and schedule your
            appointment in under 2 minutes — from anywhere.
          </p>

          <div
            className="w-full box-border hero-search-box"
            style={{
              display: "flex",
              maxWidth: 480,
              background: "rgba(255,255,255,0.13)",
              border: "1.5px solid rgba(255,255,255,0.28)",
              borderRadius: "var(--r-lg)",
              padding: 5,
              backdropFilter: "blur(10px)",
              marginBottom: "1.8rem",
            }}
          >
            <i
              className="ti ti-search"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: 16,
                marginLeft: 4,
                alignSelf: "center",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <input
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
  placeholder="Search doctors..."
  className="hero-search-input min-w-0"
  style={{
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    fontSize: 14,
    color: "#fff",
    padding: "7px 12px",
    fontFamily: "DM Sans, sans-serif",
  }}
/>
            <button
              onClick={handleSearch}
              className="btn btn-primary btn-sm flex-shrink-0 hero-search-btn"
              style={{ borderRadius: 9, padding: "9px 18px" }}
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 hero-stats">
            {[
              { num: "120+", lbl: "Specialists" },
              { num: "8k+", lbl: "Patients" },
              { num: "15+", lbl: "Specialties" },
              { num: "4.9★", lbl: "Avg Rating" },
            ].map((s) => (
              <div key={s.lbl}>
                <div
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: 24,
                    fontWeight: 900,
                    color: "var(--acc3)",
                  }}
                >
                  {s.num}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="hero-card-desktop"
          style={{
            borderRadius: "var(--r-lg)",
            padding: "1.1rem",
            boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          }}
        >
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={0}
            style={{ width: "100%", height: "100%" }}
          >
            {heroDoctors.map((doc) => (
              <SwiperSlide key={doc.id}>
                <div onClick={() => handleDoctorClick(doc.id)} style={{ cursor: "pointer" }}>
                  <div
                    className="card-divider"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: "0.8rem",
                      paddingBottom: "0.8rem",
                    }}
                  >
                    <div
                      className="card-avatar"
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
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <div className="doctor-info">
                      <div
                        className="card-name"
                        style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700 }}
                      >
                        {doc.name}
                      </div>
                      <div className="card-specialty" style={{ fontSize: 11, fontWeight: 600 }}>
                        {doc.specialty} · BMDC Verified
                      </div>
                      <div style={{ color: "#BA7517", fontSize: 12 }}>
                        {stars(doc.rating)} {doc.rating}
                      </div>
                    </div>
                  </div>

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

                  <div className="slot-wrap" style={{ display: "flex", gap: 5, marginBottom: "0.7rem" }}>
                    <span
                      className="card-slot-green"
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 6,
                        display: "flex",
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

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                    <div className="card-fee" style={{ fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 800 }}>
                      ৳{doc.fee}{" "}
                      <small className="card-fee-small" style={{ fontSize: 10, fontWeight: 400 }}>
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
                        flexShrink: 0,
                      }}
                    >
                      <div className="pulse" />
                      Available
                    </div>
                  </div>

                  <div
                    className="card-bottom"
                    style={{
                      borderRadius: 10,
                      padding: "0.65rem 0.85rem",
                      marginTop: "0.75rem",
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
                      <i className="ti ti-calendar" />
                    </div>
                    <div className="hospital-info">
                      <div className="card-bottom-title" style={{ fontSize: 11.5, fontWeight: 700 }}>
                        {doc.hospital}
                      </div>
                      <div className="card-bottom-sub" style={{ fontSize: 10 }}>
                        {doc.location}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "0.6rem", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
                    Click to view details →
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-inner-grid {
            grid-template-columns: 1fr !important;
            padding: 0 1rem !important;
          }

          .hero-card-desktop {
            max-width: 340px;
            margin: 0 auto;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding-top: 115px !important;
          }

          .hero-inner-grid {
            padding: 0 0.85rem !important;
            gap: 1.8rem !important;
          }

          .hero-card-desktop {
            width: 100% !important;
            max-width: 340px !important;
            padding: 1rem !important;
            box-sizing: border-box !important;
          }

          .hero-trust-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hero-search-box {
            max-width: 100% !important;
          }

          .hero-search-input {
            font-size: 12px !important;
            padding: 7px 8px !important;
          }

          .hero-search-btn {
            padding: 8px 13px !important;
            font-size: 11px !important;
          }

          .hero-stats {
            gap-column: 1.4rem !important;
            justify-content: flex-start;
          }

          .doctor-info,
          .hospital-info {
            min-width: 0;
          }

          .card-name,
          .card-specialty,
          .card-bottom-title,
          .card-bottom-sub {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .slot-wrap {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 390px) {
          .hero-inner-grid {
            padding: 0 0.75rem !important;
          }

          .hero-card-desktop {
            max-width: 100% !important;
            padding: 0.85rem !important;
          }

          .hero-search-btn {
            padding: 8px 11px !important;
          }
        }

        @media (max-width: 340px) {
          .hero-search-btn {
            display: none !important;
          }

          .hero-search-input {
            padding-right: 6px !important;
          }
        }

        .hero-card-desktop .swiper {
          border-radius: var(--r-lg);
        }
      `}</style>
    </div>
  );
}