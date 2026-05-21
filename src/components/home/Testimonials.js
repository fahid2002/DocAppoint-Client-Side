"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import toast from "react-hot-toast";

const FIXED = [
  { av: "RU", name: "Mr. Ifty", role: "Patient · Dhaka", rating: 5, text: "Booking was incredibly smooth. Found the perfect cardiologist within minutes. The whole experience was outstanding — from search to confirmation. Highly recommended!" },
  { av: "NK", name: "Marufa Sultana Moon", role: "Patient · Chittagong", rating: 5, text: "Found an excellent pediatrician for my son within minutes. The process was transparent and the appointment was confirmed instantly. DocAppoint is now my go-to!" },
];

const LABEL_STYLE = {
  fontSize: 11,
  color: "var(--tx3)",
  fontWeight: 700,
  display: "block",
  marginBottom: 4,
  textTransform: "uppercase",
  letterSpacing: "0.07em",
};

function StarDisplay({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ fontSize: 13, color: s <= rating ? "#BA7517" : "var(--star-empty)" }}>★</span>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          style={{
            background: "none", border: "none", fontSize: 28,
            cursor: "pointer", color: s <= (hover || value) ? "#BA7517" : "var(--star-empty)",
            padding: 0, lineHeight: 1, transition: "color 0.15s",
          }}
        >★</button>
      ))}
    </div>
  );
}

function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function ReviewCard({ av, name, role, rating, text }) {
  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--card-bdr)",
      borderRadius: "var(--r-lg)",
      padding: "1.4rem",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 38, color: "var(--p)", fontWeight: 900, lineHeight: 1, marginBottom: "0.4rem", opacity: 0.3, fontFamily: "Sora, sans-serif" }}>&quot;</div>
        <div style={{ fontSize: 13.5, color: "var(--tx2)", lineHeight: 1.65 }}>{text}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1.1rem" }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--grad-acc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0, fontFamily: "Sora, sans-serif" }}>{av}</div>
        <div>
          <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--tx)" }}>{name}</div>
          <div style={{ fontSize: 11, color: "var(--tx3)", marginBottom: 2 }}>{role}</div>
          <StarDisplay rating={rating} />
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dynamicReviews, setDynamicReviews] = useState([]);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d) => { if (d.success) setDynamicReviews(d.data); })
      .catch(() => {});
  }, []);

  async function handleSubmit() {
    setError("");
    if (!rating) { setError("Please select a star rating."); return; }
    if (!name.trim()) { setError("Please enter your name."); return; }
    if (!review.trim()) { setError("Please write a review."); return; }
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
      av: getInitials(t.name),
      name: t.name,
      role: `Patient${t.city ? ` · ${t.city}` : ""}`,
      rating: t.rating,
      text: t.review,
    })),
  ];

  return (
    <div style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        <div style={{ marginBottom: "1.5rem" }}>
          <div className="eyebrow">What patients say</div>
          <div className="sec-title">Patient testimonials</div>
        </div>

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
            style={{ paddingBottom: "2.5rem" }}
          >
            {allSlides.map((s, i) => (
              <SwiperSlide key={`${s.name}-${i}`} style={{ height: "auto" }}>
                <ReviewCard {...s} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--card-bdr)", margin: "2.5rem 0" }} />

        <div style={{ marginBottom: "1.25rem" }}>
          <div className="eyebrow">Share your experience</div>
          <div className="sec-title">Leave a review</div>
        </div>

        <div style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-lg)", padding: "1.5rem" }}>
          {submitted ? (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{ fontSize: 13, color: "var(--tx)", fontWeight: 700, marginBottom: 6 }}>Thank you for your review!</div>
              <div style={{ fontSize: 13, color: "var(--tx3)" }}>Your feedback helps others find the right doctor.</div>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "1rem" }}>
                <label style={LABEL_STYLE}>Your rating</label>
                <StarPicker value={rating} onChange={setRating} />
                {!rating && <div style={{ fontSize: 11, color: "var(--tx3)", marginTop: 4, fontStyle: "italic" }}>Tap a star to rate</div>}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }} className="test-resp">
                <div>
                  <label style={LABEL_STYLE}>Full name *</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Fahid Hasan Khan" className="review-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>City</label>
                  <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Dhaka" className="review-input" style={{ width: "100%", boxSizing: "border-box" }} />
                </div>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={LABEL_STYLE}>Your review *</label>
                <textarea value={review} onChange={(e) => setReview(e.target.value)} rows={3} placeholder="Tell others about your experience with DocAppoint..." className="review-input" style={{ width: "100%", boxSizing: "border-box", resize: "vertical" }} />
              </div>

              {error && (
                <div style={{ fontSize: 12, color: "#E24B4A", marginBottom: 10, display: "flex", alignItems: "center", gap: 4 }}>
                  <i className="ti ti-alert-circle" style={{ fontSize: 13 }} />{error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{ width: "100%", padding: "10px 0", borderRadius: "var(--r-md)", background: "var(--p)", color: "#fff", border: "none", fontWeight: 700, fontSize: 14, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Submitting..." : "Submit review"}
              </button>
            </>
          )}
        </div>
      </div>

      <style>{`
        :root { --star-empty: #C8B89A; }
        [data-theme="dark"], .dark { --star-empty: #5A4F3E; }

        .review-input { border: 1.5px solid var(--bdr); border-radius: var(--r-sm); background: var(--card); color: var(--tx); font-size: 13px; padding: 10px 13px; outline: none; width: 100%; box-sizing: border-box; transition: border-color 0.15s; }
        .review-input:focus { border-color: var(--p); }
        .review-input::placeholder { color: #A0AEC0; font-weight: 400; opacity: 1; }
        [data-theme="dark"] .review-input::placeholder, .dark .review-input::placeholder { color: #5B8FA8; font-weight: 400; opacity: 1; }

        .test-swiper-wrap .swiper-slide { height: auto; }
        .test-swiper-wrap .swiper-pagination-bullet { background: var(--card-bdr); opacity: 1; }
        .test-swiper-wrap .swiper-pagination-bullet-active { background: var(--p); width: 22px; border-radius: 4px; }

        @media(max-width:900px){ .test-resp{ grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}