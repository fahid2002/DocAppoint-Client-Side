"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import toast from "react-hot-toast";

const FIXED = [
  { av: "RU", name: "Mr. Ifty",             role: "Patient · Dhaka",      rating: 5, text: "Booking was incredibly smooth. Found the perfect cardiologist within minutes. The whole experience was outstanding — from search to confirmation. Highly recommended!" },
  { av: "NK", name: "Marufa Sultana Moon",   role: "Patient · Chittagong", rating: 5, text: "Found an excellent pediatrician for my son within minutes. The process was transparent and the appointment was confirmed instantly. DocAppoint is now my go-to!" },
];

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function StarDisplay({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`text-[13px] ${s <= rating ? "text-[#BA7517]" : "text-(--star-empty)"}`}>★</span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          className={`bg-transparent border-none text-[28px] cursor-pointer p-0 leading-none transition-colors duration-150 ${
            s <= (hover || value) ? "text-[#BA7517]" : "text-(--star-empty)"
          }`}
        >★</button>
      ))}
    </div>
  );
}

function ReviewCard({ av, name, role, rating, text }) {
  return (
    <div className="bg-(--card) border border-(--card-bdr) rounded-xl p-[1.4rem] h-full box-border flex flex-col justify-between">
      {/* Top */}
      <div>
        <div className="text-[38px] text-(--p) font-black leading-none mb-[0.4rem] opacity-30 font-[Sora,sans-serif]">&quot;</div>
        <div className="text-[13.5px] text-(--tx2) leading-[1.65]">{text}</div>
      </div>
      {/* Bottom */}
      <div className="flex items-center gap-3 mt-[1.1rem]">
        <div className="w-[38px] h-[38px] rounded-full bg-gradient-to-br from-(--p) to-(--acc) flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0 font-[Sora,sans-serif]">
          {av}
        </div>
        <div>
          <div className="font-[Sora,sans-serif] text-[13px] font-bold text-(--tx)">{name}</div>
          <div className="text-[11px] text-(--tx3) mb-0.5">{role}</div>
          <StarDisplay rating={rating} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [rating, setRating]               = useState(0);
  const [name, setName]                   = useState("");
  const [city, setCity]                   = useState("");
  const [review, setReview]               = useState("");
  const [submitted, setSubmitted]         = useState(false);
  const [loading, setLoading]             = useState(false);
  const [error, setError]                 = useState("");
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (d.success) setDynamicReviews(d.data); })
      .catch(() => {});
  }, []);

  async function handleSubmit() {
    setError("");
    if (!rating)        { setError("Please select a star rating."); return; }
    if (!name.trim())   { setError("Please enter your name.");      return; }
    if (!review.trim()) { setError("Please write a review.");       return; }
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), city: city.trim(), rating, review: review.trim() }),
      });
      if (!res.ok) throw new Error("Failed to submit.");
      toast.success("Review submitted! Thank you 🎉");
      setSubmitted(true);
      setDynamicReviews((prev) => [
        { _id: Date.now().toString(), name: name.trim(), city: city.trim(), rating, review: review.trim() },
        ...prev,
      ]);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const allSlides = [
    ...FIXED.map((t) => ({ av: t.av, name: t.name, role: t.role, rating: t.rating, text: t.text })),
    ...dynamicReviews.map((t) => ({
      av:     getInitials(t.name),
      name:   t.name,
      role:   `Patient${t.city ? ` · ${t.city}` : ""}`,
      rating: t.rating,
      text:   t.review,
    })),
  ];

  const labelClass = "text-[11px] text-(--tx3) font-bold block mb-1 uppercase tracking-[0.07em]";
  const inputClass  = "w-full border-[1.5px] border-(--bdr) rounded-lg bg-(--card) text-(--tx) text-[13px] px-[13px] py-[10px] outline-none focus:border-(--p) transition-colors duration-150 placeholder:text-[#A0AEC0] placeholder:font-normal box-border";

  return (
    <div className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="mb-6">
          <div className="eyebrow">What patients say</div>
          <div className="sec-title">Patient testimonials</div>
        </div>

        {/* Swiper */}
        <div className="test-swiper-wrap">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={3}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={allSlides.length > 3}
            breakpoints={{
              0:   { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
            }}
            className="pb-10"
          >
            {allSlides.map((s, i) => (
              <SwiperSlide key={`${s.name}-${i}`} className="h-auto">
                <ReviewCard {...s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Divider */}
        <hr className="border-none border-t border-(--card-bdr) my-10" />

        {/* Review form header */}
        <div className="mb-5">
          <div className="eyebrow">Share your experience</div>
          <div className="sec-title">Leave a review</div>
        </div>

        {/* Review form card */}
        <div className="bg-(--card) border border-(--card-bdr) rounded-xl p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-[13px] text-(--tx) font-bold mb-1.5">Thank you for your review!</div>
              <div className="text-[13px] text-(--tx3)">Your feedback helps others find the right doctor.</div>
            </div>
          ) : (
            <>
              {/* Star rating */}
              <div className="mb-4">
                <label className={labelClass}>Your rating</label>
                <StarPicker value={rating} onChange={setRating} />
                {!rating && (
                  <div className="text-[11px] text-(--tx3) mt-1 italic">Tap a star to rate</div>
                )}
              </div>

              {/* Name + City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className={labelClass}>Full name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Fahid Hasan Khan"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Dhaka"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Review textarea */}
              <div className="mb-3">
                <label className={labelClass}>Your review *</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={3}
                  placeholder="Tell others about your experience with DocAppoint..."
                  className={`${inputClass} resize-vertical`}
                />
              </div>

              {/* Error */}
              {error && (
                <div className="text-xs text-[#E24B4A] mb-2.5 flex items-center gap-1">
                  <i className="ti ti-alert-circle text-[13px]" />{error}
                </div>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-[10px] rounded-lg bg-(--p) text-white border-none font-bold text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed transition-opacity duration-200"
              >
                {loading ? "Submitting..." : "Submit review"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Swiper + star CSS — kept because Swiper injects these classes dynamically */}
      <style>{`
        :root { --star-empty: #C8B89A; }
        [data-theme="dark"], .dark { --star-empty: #5A4F3E; }
        .test-swiper-wrap .swiper-slide { height: auto; }
        .test-swiper-wrap .swiper-pagination-bullet { background: var(--card-bdr); opacity: 1; }
        .test-swiper-wrap .swiper-pagination-bullet-active { background: var(--p); width: 22px; border-radius: 4px; }
      `}</style>
    </div>
  );
}