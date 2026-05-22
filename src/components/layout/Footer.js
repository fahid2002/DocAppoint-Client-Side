"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);
  const router = useRouter();

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

      toast.success("Message sent successfully!");
      formRef.current?.reset();
      setContactOpen(false);
    } catch {
      toast.error("Failed to send message.");
    } finally {
      setSending(false);
    }
  };

  const handleSpecialtyClick = (e, targetHref) => {
    e.preventDefault();

    if (window.location.pathname === "/appointments") {
      window.location.href = targetHref;
    } else {
      router.push(targetHref);
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

  return (
    <>
      <footer>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
              gap: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            {/* Brand */}
            <div className="footer-brand-col">
              <div className="footer-brand-responsive">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      background: "var(--grad-acc)",
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 17,
                      color: "#fff",
                    }}
                  >
                    <i className="ti ti-stethoscope" />
                  </div>

                  <span
                    style={{
                      fontFamily: "Sora, sans-serif",
                      fontSize: 18,
                      fontWeight: 800,
                      color: "#fff",
                    }}
                  >
                    Doc<span style={{ color: "var(--acc3)" }}>Appoint</span>
                  </span>
                </div>

                <p
                  className="footer-desc"
                  style={{
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.65,
                    marginBottom: "1.1rem",
                    maxWidth: 220,
                  }}
                >
                  Bangladesh&apos;s most trusted platform for finding and booking
                  verified specialist doctors. Fast, secure, and completely
                  patient-first — available 24/7.
                </p>

                <div
                  className="footer-socials"
                  style={{
                    display: "flex",
                    gap: 7,
                  }}
                >
                  {[
                    {
                      icon: "ti-brand-x",
                      href: "https://x.com/fh_ifty",
                    },
                    {
                      icon: "ti-brand-facebook",
                      href: "https://facebook.com",
                    },
                    {
                      icon: "ti-brand-instagram",
                      href: "https://instagram.com",
                    },
                    {
                      icon: "ti-brand-linkedin",
                      href: "https://linkedin.com",
                    },
                    {
                      icon: "ti-brand-github",
                      href: "https://github.com",
                    },
                  ].map((s) => (
                    <a
                      key={s.icon}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="soc-ic"
                    >
                      <i className={`ti ${s.icon}`} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* blank column */}
            <div className="footer-blank" />

            {/* Quick Links */}
            <div>
              <h4
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.9rem",
                }}
              >
                Quick links
              </h4>

              {footerLinks.quick.map((l) =>
                l.href ? (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    key={l.label}
                    onClick={l.onClick}
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "0.45rem",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {l.label}
                  </button>
                )
              )}
            </div>

            {/* Specialties */}
            <div>
              <h4
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.9rem",
                }}
              >
                Specialties
              </h4>

              {footerLinks.specialties.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={(e) => handleSpecialtyClick(e, l.href)}
                  style={{
                    display: "block",
                    fontSize: 12.5,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: "0.45rem",
                  }}
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Legal */}
            <div>
              <h4
                style={{
                  fontFamily: "Sora, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "0.9rem",
                }}
              >
                Legal &amp; support
              </h4>

              {footerLinks.legal.map((l) =>
                l.href ? (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "0.45rem",
                    }}
                  >
                    {l.label}
                  </Link>
                ) : (
                  <button
                    key={l.label}
                    onClick={l.onClick}
                    style={{
                      display: "block",
                      fontSize: 12.5,
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: "0.45rem",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  >
                    {l.label}
                  </button>
                )
              )}
            </div>
          </div>
          {/* Bottom bar */}
<div
  style={{
    borderTop: "1px solid rgba(255,255,255,0.07)",
    padding: "1.2rem 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "0.5rem",
  }}
>
  <div
    style={{
      fontSize: 11.5,
      color: "rgba(255,255,255,0.3)",
    }}
  >
    © 2026 DocAppoint — Designed & developed by Fahid Hasan Khan. All rights reserved.
  </div>

  <div
    style={{
      display: "flex",
      gap: "1.2rem",
      flexWrap: "wrap",
    }}
  >
    {[
      { label: "Terms & conditions", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookies" },
    ].map((l) => (
      <Link
        key={l.label}
        href={l.href}
        style={{
          fontSize: 11.5,
          color: "rgba(255,255,255,0.35)",
          transition: "color 0.2s",
        }}
      >
        {l.label}
      </Link>
    ))}
  </div>
</div>
        </div>
      </footer>

      {contactOpen && (
  <div
    className="modal-bg"
    onClick={(e) => e.target === e.currentTarget && setContactOpen(false)}
  >
    <div className="modal">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.3rem" }}>
        <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--tx)", display: "flex", alignItems: "center", gap: 8 }}>
          <i className="ti ti-mail" style={{ color: "var(--p)", fontSize: 17 }} />
          Contact Us
        </h3>

        <button
          onClick={() => setContactOpen(false)}
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--r-md)",
            border: "1.5px solid var(--bdr)",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--tx3)",
            fontSize: 16,
          }}
        >
          <i className="ti ti-x" />
        </button>
      </div>

      <form ref={formRef} onSubmit={handleContact} style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        <div className="auth-field">
          <label>Your Name</label>
          <input name="from_name" required placeholder="Your name" />
        </div>

        <div className="auth-field">
          <label>Email Address</label>
          <input name="from_email" type="email" required placeholder="your@email.com" />
        </div>

        <div className="auth-field">
          <label>Subject</label>
          <input name="subject" required placeholder="How can we help?" />
        </div>

        <div className="auth-field">
          <label>Message</label>
          <textarea
            name="message"
            required
            rows={4}
            placeholder="Write your message here..."
            style={{
              fontSize: 13.5,
              padding: "11px 13px",
              borderRadius: "var(--r-md)",
              border: "1.5px solid var(--bdr)",
              background: "var(--bg3)",
              color: "var(--tx)",
              outline: "none",
              width: "100%",
              resize: "vertical",
              fontFamily: "DM Sans, sans-serif",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="btn btn-primary"
          style={{ width: "100%", padding: "12px", fontSize: 14, marginTop: "0.3rem" }}
        >
          <i className="ti ti-send" />
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  </div>
)}

      <style>{`
        .footer-blank {
          display: none;
        }

        /* md */
        @media (max-width: 900px) {
          footer > div {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }

          .footer-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 2rem !important;
          }

          .footer-brand-col {
            grid-column: span 2 !important;
          }

          .footer-blank {
            display: block !important;
            grid-column: span 1 !important;
          }

          .footer-brand-responsive {
            display: block !important;
          }

          .footer-desc {
            max-width: 280px !important;
          }

          .footer-socials {
            flex-wrap: wrap !important;
          }
        }

        /* sm */
        @media (max-width: 600px) {
          footer > div {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }

          .footer-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.5rem !important;
          }

          .footer-brand-col {
            grid-column: span 2 !important;
          }

          .footer-blank {
            display: block !important;
            grid-column: span 1 !important;
          }

          .footer-brand-responsive {
            display: block !important;
          }

          .footer-desc {
            max-width: 280px !important;
            font-size: 12.5px !important;
            line-height: 1.65 !important;
          }

          .footer-socials {
            flex-wrap: wrap !important;
          }

          .footer-grid h4 {
            font-size: 12px !important;
          }

          .footer-grid a,
          .footer-grid button {
            font-size: 11px !important;
          }
        }
      `}</style>
    </>
  );
}