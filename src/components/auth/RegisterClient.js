"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/libs/auth-client";

function validatePass(v) {
  return /[A-Z]/.test(v) && /[a-z]/.test(v) && v.length >= 6;
}

export default function RegisterClient() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", photo: "", pass: "" });
  const [photoName, setPhotoName] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [err, setErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const checkPass = (v) => {
    if (v && v.length > 0 && !validatePass(v)) {
      setPassErr(
        v.length < 6
          ? "At least 6 characters required."
          : "Must include uppercase and lowercase letters."
      );
    } else {
      setPassErr("");
    }
  };

  const isAlreadyRegisteredError = (errorObj = {}) => {
    const status = errorObj.status;
    const code = String(errorObj.code || "");
    const message = String(errorObj.message || "").toLowerCase();

    return (
      status === 409 ||
      status === 422 ||
      code === "USER_ALREADY_EXISTS" ||
      code.includes("EXIST") ||
      message.includes("exist") ||
      message.includes("already") ||
      message.includes("registered")
    );
  };

  const handlePhotoFile = (e) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      setPhotoName(file.name);

      const img = new window.Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const MAX = 400;
        let { width, height } = img;

        if (width > height) {
          if (width > MAX) {
            height = Math.round((height * MAX) / width);
            width = MAX;
          }
        } else {
          if (height > MAX) {
            width = Math.round((width * MAX) / height);
            height = MAX;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        URL.revokeObjectURL(objectUrl);

        setForm((prev) => ({ ...prev, photo: compressed }));
        setPhotoPreview(compressed);
      };

      img.src = objectUrl;
    } catch (imageErr) {
      console.error("Image processing failed:", imageErr);
    }
  };

  const handleRegister = async () => {
    if (loading) return;

    setErr("");

    if (!form.name || !form.email) {
      setErr("Name and email are required.");
      return;
    }

    if (!form.email.includes("@")) {
      setErr("Please enter a valid email.");
      return;
    }

    if (!validatePass(form.pass)) {
      setErr("Password must have uppercase, lowercase and 6+ characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.pass,
        image: form.photo || undefined,
      });

      if (res?.error) {
        if (isAlreadyRegisteredError(res.error)) {
          router.push("/login?toast=already_registered");
          return;
        }

        setErr(res.error.message || "Registration failed.");
        return;
      }

      router.push("/login?toast=register_success");
    } catch (e) {
      console.error("Registration error:", e);

      if (isAlreadyRegisteredError(e)) {
        router.push("/login?toast=already_registered");
        return;
      }

      setErr("An unexpected system error occurred. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    if (loading) return;

    setErr("");
    setLoading(true);

    try {
      await signIn.social({
        provider: "google",

        // After Google registration/sign-in, go to login page, not dashboard
        callbackURL: "/login?toast=register_success",

        // If Better Auth returns duplicate/account-linking error, send user to login with existing toast
        errorCallbackURL: "/login?toast=already_registered",
      });
    } catch (error) {
      console.error("Google registration error:", error);
      router.push("/login?toast=already_registered");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: "1.2rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: "var(--grad-acc)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#fff" }}>
            <i className="ti ti-stethoscope" aria-hidden="true" />
          </div>
          <span style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--tx)" }}>DocAppoint</span>
        </div>

        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 22, fontWeight: 900, color: "var(--tx)", textAlign: "center", marginBottom: "0.25rem" }}>
          Create account
        </h2>

        <p style={{ fontSize: 13, color: "var(--tx3)", textAlign: "center", marginBottom: "1.4rem" }}>
          Join thousands of patients on DocAppoint
        </p>

        <button
          onClick={handleGoogle}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            width: "100%",
            padding: 11,
            border: "1.5px solid var(--bdr)",
            borderRadius: "var(--r-md)",
            fontFamily: "Sora, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            background: "var(--card)",
            color: "var(--tx)",
            marginBottom: "0.5rem",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Sign up with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0.9rem 0", fontSize: 12, color: "var(--tx3)" }}>
          <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
          or use email
          <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
        </div>

        <div className="auth-field" style={{ marginBottom: "0.85rem" }}>
          <label>Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Fahid Hasan"
          />
        </div>

        <div className="auth-field" style={{ marginBottom: "0.85rem" }}>
          <label>Email address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="fahid@gmail.com"
          />
        </div>

        <div className="auth-field" style={{ marginBottom: "0.85rem" }}>
          <label>Photo (optional)</label>

          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              width: "100%",
              minHeight: 44,
              padding: "0 0.9rem",
              border: "1px solid var(--bdr)",
              borderRadius: "var(--r-sm)",
              background: "var(--card)",
              color: "var(--tx)",
              cursor: "pointer",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ flex: 1, fontSize: 13, color: photoName ? "var(--tx)" : "var(--tx3)" }}>
              {photoName || "Click to browse image file"}
            </span>
            <span style={{ fontSize: 12, color: "var(--tx3)" }}>Browse</span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handlePhotoFile}
          />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0", fontSize: 11, color: "var(--tx3)" }}>
            <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
            or paste a URL
            <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
          </div>

          <input
            value={photoName ? "" : form.photo}
            onChange={(e) => {
              setPhotoName("");
              setPhotoPreview(e.target.value || null);
              setForm((p) => ({ ...p, photo: e.target.value }));
            }}
            placeholder="https://example.com/photo.jpg"
            style={{
              width: "100%",
              fontSize: 13,
              padding: "10px 13px",
              borderRadius: "var(--r-sm)",
              border: "1px solid var(--bdr)",
              background: "var(--card)",
              color: "var(--tx)",
              outline: "none",
            }}
          />

          {photoPreview && (
            <div style={{ marginTop: "0.75rem", width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--bdr)", margin: "0.75rem auto 0" }}>
              <img src={photoPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
        </div>

        <div className="auth-field" style={{ marginBottom: "0.85rem" }}>
          <label>Password</label>
          <input
            type="password"
            value={form.pass}
            onChange={(e) => {
              setForm((p) => ({ ...p, pass: e.target.value }));
              checkPass(e.target.value);
            }}
            placeholder="Min 6 chars, upper & lowercase"
          />

          <div style={{ background: "var(--amber-bg)", borderRadius: "var(--r-sm)", padding: "0.5rem 0.75rem", fontSize: 12, color: "var(--amber-tx)", margin: "0.4rem 0", display: "flex", alignItems: "flex-start", gap: 6, lineHeight: 1.4 }}>
            <i className="ti ti-info-circle" style={{ flexShrink: 0, fontSize: 14 }} />
            Must include 1 uppercase, 1 lowercase, and at least 6 characters
          </div>

          {passErr && (
            <div style={{ fontSize: 12, color: "var(--red)", display: "flex", alignItems: "center", gap: 4 }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 13 }} />
              {passErr}
            </div>
          )}
        </div>

        {err && (
          <div style={{ fontSize: 12, color: "var(--red)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: 4 }}>
            <i className="ti ti-alert-circle" style={{ fontSize: 13 }} />
            {err}
          </div>
        )}

        <button
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: 11,
            fontSize: 14,
            marginTop: "0.6rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <i className="ti ti-user-plus" />
          {loading ? "Creating…" : "Create account"}
        </button>

        <div style={{ fontSize: 13, color: "var(--tx2)", textAlign: "center", marginTop: "1rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--p)", fontWeight: 700 }}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}