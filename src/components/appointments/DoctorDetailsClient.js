"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { appointmentsApi, authApi, reviewsApi } from "@/libs/api";
import toast from "react-hot-toast";

const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

export default function DoctorDetailsClient({ doc }) {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    patientName: "",
    gender: "Male",
    phone: "",
    appointmentDate: "",
    appointmentTime: doc.times[0] || "",
  });
  const [saving, setSaving] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, text: "" });
  const [reviewSaving, setReviewSaving] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);

  useEffect(() => {
    reviewsApi.getByDoctor(doc.id)
      .then((res) => setReviews(res.data))
      .catch(() => {});
  }, [doc.id]);

  useEffect(() => {
    if (!session?.user?.email) return;
    appointmentsApi.getByUser(session.user.email)
      .then((res) => {
        const booked = res.data.some((a) => a.doctorId === doc.id);
        setHasBooked(booked);
        const reviewed = reviews.some((r) => r.userEmail === session.user.email);
        setAlreadyReviewed(reviewed);
      })
      .catch(() => {});
  }, [session, doc.id, reviews]);

  const openBook = () => {
    if (isPending) return;
    if (!session?.user) { router.push("/login"); return; }
    setModalOpen(true);
  };

  const handleBook = async () => {
    if (!form.patientName || !form.phone || !form.appointmentDate) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSaving(true);
    try {
      if (session?.user?.email) await authApi.getJwt(session.user.email).catch(() => {});
      await appointmentsApi.create({
        userEmail: session.user.email,
        doctorId: doc.id,
        doctorName: doc.name,
        specialty: doc.specialty,
        hospital: doc.hospital,
        doctorImg: doc.img,
        patientName: form.patientName,
        gender: form.gender,
        phone: form.phone,
        appointmentDate: form.appointmentDate,
        appointmentTime: form.appointmentTime,
        status: "Upcoming",
        fee: doc.fee,
      });
      toast.success("Appointment booked successfully!");
      setModalOpen(false);
      setHasBooked(true);
      setForm({ patientName: "", gender: "Male", phone: "", appointmentDate: "", appointmentTime: doc.times[0] });
    } catch {
      toast.error("Failed to book appointment. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleReview = async () => {
    if (!reviewForm.text.trim()) { toast.error("Please write a review."); return; }
    setReviewSaving(true);
    try {
      if (session?.user?.email) await authApi.getJwt(session.user.email).catch(() => {});
      const res = await reviewsApi.create({
        doctorId: doc.id,
        rating: reviewForm.rating,
        text: reviewForm.text,
        userName: session.user.name || session.user.email,
      });
      setReviews((prev) => [res.data, ...prev.filter((r) => r.userEmail !== session.user.email)]);
      setAlreadyReviewed(true);
      setReviewForm({ rating: 5, text: "" });
      toast.success("Review submitted!");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Failed to submit review.");
    } finally {
      setReviewSaving(false);
    }
  };

  return (
    <>
      {/* ── Hero ── */}
      <div className="det-hero">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row gap-8 items-end">
          {/* Doctor photo */}
          <div className="det-photo shrink-0">
            <Image
              src={doc.img}
              alt={doc.name}
              width={200}
              height={240}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Doctor info */}
          <div className="flex-1 pb-2">
            <p className="font-['Sora'] text-[11px] font-bold text-[var(--acc3)] uppercase tracking-widest mb-2">
              {doc.specialty}
            </p>
            <h2 className="font-['Sora'] text-[clamp(22px,3vw,32px)] font-black text-white mb-2 tracking-tight">
              {doc.name}
            </h2>
            <p className="text-[#BA7517] text-sm mb-2.5">
              {stars(doc.rating)}{" "}
              <span className="text-white/60 text-xs">
                {doc.rating} ({doc.reviews} reviews)
              </span>
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: "ti-briefcase", label: doc.exp },
                { icon: "ti-map-pin", label: doc.location },
                { icon: "ti-building-hospital", label: doc.hospital },
              ].map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-md px-2.5 py-1 text-xs text-white/85 font-semibold"
                >
                  <i className={`ti ${t.icon} text-xs`} aria-hidden="true" />
                  {t.label}
                </span>
              ))}
            </div>

            <p className="font-['Sora'] text-[22px] font-black text-[var(--acc3)]">
              ৳{doc.fee}{" "}
              <small className="text-xs text-white/50 font-normal">/visit</small>
            </p>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { lbl: "Hospital", val: doc.hospital, icon: "ti-building-hospital" },
            { lbl: "Location", val: doc.location, icon: "ti-map-pin" },
          ].map((b) => (
            <div
              key={b.lbl}
              className="bg-[var(--card)] border border-[var(--card-bdr)] rounded-[var(--r-lg)] p-5"
            >
              <p className="text-[10.5px] font-bold text-[var(--tx3)] uppercase tracking-wide mb-1.5">
                {b.lbl}
              </p>
              <p className="text-sm font-semibold text-[var(--tx)] flex items-center gap-1.5">
                <i className={`ti ${b.icon} text-[var(--p)]`} />
                {b.val}
              </p>
            </div>
          ))}

          {/* About */}
          <div className="sm:col-span-2 bg-[var(--card)] border border-[var(--card-bdr)] rounded-[var(--r-lg)] p-5">
            <p className="text-[10.5px] font-bold text-[var(--tx3)] uppercase tracking-wide mb-2">
              About the doctor
            </p>
            <p className="text-sm text-[var(--tx2)] leading-relaxed">{doc.description}</p>
          </div>

          {/* Time slots */}
          <div className="sm:col-span-2 bg-[var(--card)] border border-[var(--card-bdr)] rounded-[var(--r-lg)] p-5">
            <p className="text-[10.5px] font-bold text-[var(--tx3)] uppercase tracking-wide mb-3">
              Available time slots
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              {doc.availability.map((a) => (
                <span
                  key={a}
                  className="bg-[var(--p-badge-bg)] text-[var(--p-badge-tx)] text-xs font-semibold px-3 py-1 rounded-md"
                >
                  <i className="ti ti-clock text-[11px] mr-1" />
                  {a}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {doc.times.map((t) => (
                <span
                  key={t}
                  className="bg-[var(--green-badge-bg)] text-[var(--green-badge-tx)] text-[11px] font-semibold px-2.5 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Book button */}
        <div className="flex gap-3 mb-8">
          <button className="btn-book" onClick={openBook}>
            <i className="ti ti-calendar-plus text-base" aria-hidden="true" />
            Book Appointment
          </button>
        </div>

        {/* ── Reviews ── */}
        <div className="mb-8">
          <div className="eyebrow mb-3.5">Patient reviews</div>

          {/* Review form */}
          {session?.user && hasBooked && !alreadyReviewed && (
            <div className="bg-[var(--card)] border border-[var(--card-bdr)] rounded-[var(--r-lg)] p-5 mb-4">
              <p className="text-[13px] font-bold text-[var(--tx)] mb-3 flex items-center gap-1.5">
                <i className="ti ti-pencil text-[var(--p)]" /> Write a review
              </p>

              {/* Star selector */}
              <div className="flex gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setReviewForm((p) => ({ ...p, rating: s }))}
                    className="text-[22px] bg-transparent border-none cursor-pointer transition-colors duration-150"
                    style={{ color: s <= reviewForm.rating ? "#BA7517" : "var(--bdr)" }}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                value={reviewForm.text}
                onChange={(e) => setReviewForm((p) => ({ ...p, text: e.target.value }))}
                placeholder="Share your experience with this doctor…"
                maxLength={500}
                rows={3}
                className="w-full text-[13.5px] px-3 py-2.5 rounded-[var(--r-md)] border-[1.5px] border-[var(--bdr)] bg-[var(--bg3)] text-[var(--tx)] outline-none resize-y font-['DM_Sans'] box-border"
              />

              <div className="flex justify-between items-center mt-2.5">
                <span className="text-[11px] text-[var(--tx3)]">{reviewForm.text.length}/500</span>
                <button
                  onClick={handleReview}
                  disabled={reviewSaving}
                  className="btn btn-primary btn-sm"
                >
                  <i className="ti ti-send" />
                  {reviewSaving ? "Submitting…" : "Submit review"}
                </button>
              </div>
            </div>
          )}

          {/* Already reviewed */}
          {session?.user && hasBooked && alreadyReviewed && (
            <p className="text-[13px] text-[var(--tx3)] mb-3 flex items-center gap-1.5">
              <i className="ti ti-circle-check text-[var(--p)]" />
              You have already reviewed this doctor.
            </p>
          )}

          {/* Not booked */}
          {session?.user && !hasBooked && (
            <p className="text-[13px] text-[var(--tx3)] mb-3 flex items-center gap-1.5">
              <i className="ti ti-info-circle" />
              Book an appointment to leave a review.
            </p>
          )}

          {/* Reviews list */}
          {reviews.length === 0 ? (
            <p className="text-[var(--tx3)] text-sm">No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((r) => (
              <div
                key={r._id}
                className="bg-[var(--card)] border border-[var(--card-bdr)] rounded-[var(--r-lg)] p-5 mb-3 flex gap-3.5"
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[var(--grad-acc)] flex items-center justify-center font-['Sora'] text-[13px] font-extrabold text-white shrink-0">
                  {r.userName
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="flex-1">
                  <p className="font-['Sora'] text-[13px] font-bold text-[var(--tx)] mb-0.5">
                    {r.userName}
                  </p>
                  <p className="text-[#BA7517] text-xs mb-1.5">{stars(r.rating)}</p>
                  <p className="text-[13.5px] text-[var(--tx2)] leading-relaxed">{r.text}</p>
                  <p className="text-[11px] text-[var(--tx3)] mt-1">
                    {new Date(r.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Booking Modal ── */}
      {modalOpen && (
        <div
          className="modal-bg"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
        >
          <div className="modal">
            {/* Modal header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="font-['Sora'] text-[17px] font-extrabold text-[var(--tx)] flex items-center gap-2">
                <i className="ti ti-calendar-plus text-[var(--p)] text-[17px]" />
                Book appointment
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-[var(--r-md)] border-[1.5px] border-[var(--bdr)] bg-transparent cursor-pointer flex items-center justify-center text-[var(--tx3)]"
              >
                <i className="ti ti-x" />
              </button>
            </div>

            {/* Doctor preview */}
            <div className="flex items-center gap-2.5 bg-[var(--bg3)] rounded-[var(--r-md)] p-3.5 mb-5">
              <div className="w-[46px] h-[46px] rounded-[10px] overflow-hidden shrink-0">
                <Image src={doc.img} alt={doc.name} width={46} height={46} className="object-cover" />
              </div>
              <div>
                <p className="font-['Sora'] text-[13.5px] font-bold text-[var(--tx)]">{doc.name}</p>
                <p className="text-xs text-[var(--p)] font-semibold">
                  {doc.specialty} · ৳{doc.fee}
                </p>
              </div>
            </div>

            {/* Form grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Doctor name", val: doc.name, readonly: true },
                { label: "Your email", val: session?.user?.email || "", readonly: true },
              ].map((f) => (
                <div key={f.label} className="auth-field">
                  <label>{f.label}</label>
                  <input value={f.val} readOnly className="opacity-70 cursor-not-allowed" />
                </div>
              ))}

              <div className="auth-field">
                <label>Patient name *</label>
                <input
                  value={form.patientName}
                  onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
                  placeholder="Enter patient name"
                />
              </div>

              <div className="auth-field">
                <label>Gender</label>
                <select
                  value={form.gender}
                  onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
                  className="text-[13.5px] px-3 py-[11px] rounded-[var(--r-md)] border-[1.5px] border-[var(--bdr)] bg-[var(--bg3)] text-[var(--tx)] outline-none w-full"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="auth-field">
                <label>Phone number *</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="017XXXXXXXX"
                />
              </div>

              <div className="auth-field">
                <label>Appointment date *</label>
                <input
                  type="date"
                  value={form.appointmentDate}
                  onChange={(e) => setForm((p) => ({ ...p, appointmentDate: e.target.value }))}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="auth-field sm:col-span-2">
                <label>Preferred time slot</label>
                <select
                  value={form.appointmentTime}
                  onChange={(e) => setForm((p) => ({ ...p, appointmentTime: e.target.value }))}
                  className="text-[13.5px] px-3 py-[11px] rounded-[var(--r-md)] border-[1.5px] border-[var(--bdr)] bg-[var(--bg3)] text-[var(--tx)] outline-none w-full"
                >
                  {doc.times.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={handleBook}
              disabled={saving}
              className="btn btn-primary w-full py-3 text-sm font-bold mt-3"
            >
              <i className="ti ti-circle-check" />
              {saving ? "Booking…" : "Confirm booking"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}