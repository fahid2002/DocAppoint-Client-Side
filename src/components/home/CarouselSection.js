"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { icon: "ti-shield-check",  title: "Verified doctors",   desc: "Every specialist is BMDC-verified and professionally vetted before listing on our platform." },
  { icon: "ti-clock",         title: "Instant booking",    desc: "Confirm an appointment in under 2 minutes, any time of day or night." },
  { icon: "ti-calendar-check",title: "Easy rescheduling",  desc: "Update or cancel bookings effortlessly from your personal dashboard." },
  { icon: "ti-star",          title: "Real reviews",       desc: "Read honest, verified patient reviews before choosing your doctor." },
  { icon: "ti-lock",          title: "Secure & private",   desc: "Your health data is encrypted with JWT and never shared without consent." },
  { icon: "ti-device-mobile", title: "Mobile friendly",    desc: "Fully responsive design — works perfectly on any device, anywhere." },
];

export default function CarouselSection() {
  return (
    <div style={{ background: "linear-gradient(135deg, #042c53, #185fa5)", padding: "2rem 0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {/* Heading */}
        <div style={{ marginBottom: "1.1rem" }}>
          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            <i className="ti ti-sparkles" style={{ color: "var(--acc3)", marginRight: "5px" }} aria-hidden="true" />
            Why patients choose DocAppoint
          </span>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={12}
          slidesPerView={3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          breakpoints={{
            0:   { slidesPerView: 1 },
            600: { slidesPerView: 2 },
            900: { slidesPerView: 3 },
          }}
          style={{ paddingBottom: "2rem" }}
        >
          {slides.map((s) => (
            <SwiperSlide key={s.title}>
              <div
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "10px",
                  padding: "1.1rem",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "#fff",
                    marginBottom: "0.65rem",
                  }}
                >
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <h4
                  style={{
                    fontFamily: "Sora, sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: "0.25rem",
                  }}
                >
                  {s.title}
                </h4>
                <p
                  style={{
                    fontSize: 12,
                    color: "rgba(255,255,255,0.65)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dot styles */}
        <style dangerouslySetInnerHTML={{ __html: `
          .swiper-pagination-bullet { background: rgba(255,255,255,0.4) !important; opacity: 1 !important; }
          .swiper-pagination-bullet-active { background: #fff !important; width: 22px !important; border-radius: 4px !important; }
        `}} />
      </div>
    </div>
  );
}