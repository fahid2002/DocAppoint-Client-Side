"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const handleContact = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent successfully! We'll get back to you soon.");
      formRef.current?.reset();
      setContactOpen(false);
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const footerLinks = {
    quick: [
      { label: "Home", href: "/" },
      { label: "All Appointments", href: "/appointments" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "About Us", href: "/about-us" },
      { label: "Contact", onClick: () => setContactOpen(true) },
    ],
    specialties: [
      { label: "Cardiologist", href: "/appointments?specialty=Cardiologist" },
      { label: "Neurologist", href: "/appointments?specialty=Neurologist" },
      { label: "Pediatrician", href: "/appointments?specialty=Pediatrician" },
      { label: "Dermatologist", href: "/appointments?specialty=Dermatologist" },
      { label: "Orthopedic", href: "/appointments?specialty=Orthopedic" },
    ],
    legal: [
      { label: "Help Center", href: "/help-center" },
      { label: "Contact Us", onClick: () => setContactOpen(true) },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  };

  const linkClass =
    "block text-[12.5px] text-white/45 mb-[0.45rem] transition-colors duration-200 hover:text-white cursor-pointer bg-transparent border-none p-0 font-[inherit] text-left";

  const socialClass =
    "w-8 h-8 rounded-lg flex items-center justify-center text-white/50 border border-white/10 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200 text-sm";

  return (
    <>
      {/* ── Footer ── */}
      <footer className="bg-(--ft-bg) pt-14 pb-0">
        <div className="max-w-[1200px] mx-auto px-6">

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 mb-10">

            {/* Brand column */}
            <div>
              <div className="flex items-center gap-2.5 mb-[0.9rem]">
                <div className="w-9 h-9 rounded-[9px] bg-gradient-to-br from-(--p) to-(--acc) flex items-center justify-center text-[17px] text-white">
                  <i className="ti ti-stethoscope" aria-hidden="true" />
                </div>
                <span className="font-[Sora,sans-serif] text-[18px] font-extrabold text-white">
                  Doc<span className="text-(--acc3)">Appoint</span>
                </span>
              </div>
              <p className="text-[12.5px] text-white/45 leading-[1.65] mb-[1.1rem] max-w-55">
                Bangladesh&apos;s most trusted platform for finding and booking verified specialist doctors.
                Fast, secure, and completely patient-first — available 24/7.
              </p>

              {/* Social icons — hardcoded to avoid JSX parsing issues */}
              <div className="flex gap-[7px]">
                <a href="https://x.com/fh_ifty" target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <i className="ti ti-brand-x" aria-hidden="true" />
                </a>
                <a href="https://www.facebook.com/fh.ifty.1" target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <i className="ti ti-brand-facebook" aria-hidden="true" />
                </a>
                <a href="https://www.instagram.com/fahidhasankhanifty/" target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <i className="ti ti-brand-instagram" aria-hidden="true" />
                </a>
                <a href="https://www.linkedin.com/in/fahid-hasan-280425382/" target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <i className="ti ti-brand-linkedin" aria-hidden="true" />
                </a>
                <a href="https://github.com/fahid2002" target="_blank" rel="noopener noreferrer" className={socialClass}>
                  <i className="ti ti-brand-github" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-[Sora,sans-serif] text-[13px] font-bold text-white mb-[0.9rem]">
                Quick links
              </h4>
              {footerLinks.quick.map((l) =>
                l.href ? (
                  <Link key={l.label} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ) : (
                  <button key={l.label} onClick={l.onClick} className={linkClass}>
                    {l.label}
                  </button>
                )
              )}
            </div>

            {/* Specialties */}
            <div>
              <h4 className="font-[Sora,sans-serif] text-[13px] font-bold text-white mb-[0.9rem]">
                Specialties
              </h4>
              {footerLinks.specialties.map((l) => (
                <Link key={l.label} href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="font-[Sora,sans-serif] text-[13px] font-bold text-white mb-[0.9rem]">
                Legal &amp; support
              </h4>
              {footerLinks.legal.map((l) =>
                l.href ? (
                  <Link key={l.label} href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                ) : (
                  <button key={l.label} onClick={l.onClick} className={linkClass}>
                    {l.label}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.07] py-[1.2rem] flex flex-wrap justify-between items-center gap-2">
            <div className="text-[11.5px] text-white/30">
              © 2026 DocAppoint — Designed &amp; developed by Fahid Hasan Khan. All rights reserved.
            </div>
            <div className="flex gap-[1.2rem]">
              {[
                { label: "Terms & conditions", href: "/terms" },
                { label: "Privacy policy", href: "/privacy" },
                { label: "Cookie policy", href: "/cookies" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11.5px] text-white/35 hover:text-white/80 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      {contactOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && setContactOpen(false)}
        >
          <div className="bg-(--bg) border border-(--bdr) rounded-2xl p-7 w-full max-w-[460px] shadow-2xl">

            {/* Modal header */}
            <div className="flex justify-between items-center mb-[1.3rem]">
              <h3 className="font-[Sora,sans-serif] text-[18px] font-extrabold text-(--tx) flex items-center gap-2">
                <i className="ti ti-mail text-(--p) text-[17px]" />
                Contact Us
              </h3>
              <button
                onClick={() => setContactOpen(false)}
                className="w-8 h-8 rounded-lg border-[1.5px] border-(--bdr) bg-transparent flex items-center justify-center text-(--tx-2) hover:text-(--tx) hover:bg-(--s2) transition-colors duration-200 cursor-pointer text-base"
              >
                <i className="ti ti-x" />
              </button>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleContact} className="flex flex-col gap-[0.85rem]">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--tx-2)">Your Name</label>
                <input
                  name="from_name"
                  required
                  placeholder="Fahid Hasan"
                  className="text-[13.5px] px-[13px] py-[11px] rounded-lg border-[1.5px] border-(--bdr) bg-(--bg3) text-(--tx) outline-none focus:border-(--p) transition-colors duration-200 w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--tx-2)">Email Address</label>
                <input
                  name="from_email"
                  type="email"
                  required
                  placeholder="fahid@gmail.com"
                  className="text-[13.5px] px-[13px] py-[11px] rounded-lg border-[1.5px] border-(--bdr) bg-(--bg3) text-(--tx) outline-none focus:border-(--p) transition-colors duration-200 w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--tx-2)">Subject</label>
                <input
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="text-[13.5px] px-[13px] py-[11px] rounded-lg border-[1.5px] border-(--bdr) bg-(--bg3) text-(--tx) outline-none focus:border-(--p) transition-colors duration-200 w-full"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-(--tx-2)">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  className="text-[13.5px] px-[13px] py-[11px] rounded-lg border-[1.5px] border-(--bdr) bg-(--bg3) text-(--tx) outline-none focus:border-(--p) transition-colors duration-200 w-full resize-vertical font-[DM_Sans,sans-serif]"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold bg-(--p) text-white hover:bg-(--p-dark) disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 mt-1 cursor-pointer"
              >
                <i className="ti ti-send" />
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}