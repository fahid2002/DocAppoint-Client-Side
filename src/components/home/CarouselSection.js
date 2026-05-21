"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slides = [
  { icon: "ti-shield-check", title: "Verified doctors",    desc: "Every specialist is BMDC-verified and professionally vetted before listing on our platform." },
  { icon: "ti-clock",        title: "Instant booking",     desc: "Confirm an appointment in under 2 minutes, any time of day or night." },
  { icon: "ti-calendar-check",title: "Easy rescheduling",  desc: "Update or cancel bookings effortlessly from your personal dashboard." },
  { icon: "ti-star",         title: "Real reviews",        desc: "Read honest, verified patient reviews before choosing your doctor." },
  { icon: "ti-lock",         title: "Secure & private",    desc: "Your health data is encrypted with JWT and never shared without consent." },
  { icon: "ti-device-mobile",title: "Mobile friendly",     desc: "Fully responsive design — works perfectly on any device, anywhere." },
];

export default function CarouselSection() {
  return (
    <div className="carousel-wrap">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Heading */}
        <div className="flex items-center mb-[1.1rem]">
          <div className="font-[Sora,sans-serif] text-[15px] font-bold text-white">
            <i className="ti ti-sparkles text-(--acc3) mr-[5px]" aria-hidden="true" />
            Why patients choose DocAppoint
          </div>
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
          className="pb-8"
        >
          {slides.map((s) => (
            <SwiperSlide key={s.title}>
              <div className="c-slide">
                <div className="w-[42px] h-[42px] rounded-[10px] bg-white/15 flex items-center justify-center text-xl text-white mb-[0.65rem]">
                  <i className={`ti ${s.icon}`} aria-hidden="true" />
                </div>
                <h4 className="font-[Sora,sans-serif] text-[13px] font-bold text-white mb-1">
                  {s.title}
                </h4>
                <p className="text-xs text-white/65 leading-[1.55]">
                  {s.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper pagination dot override */}
        <style>{`
          .carousel-wrap .swiper-pagination-bullet { background: rgba(255,255,255,0.4); opacity: 1; }
          .carousel-wrap .swiper-pagination-bullet-active { background: #fff; width: 22px; border-radius: 4px; }
        `}</style>
      </div>
    </div>
  );
}