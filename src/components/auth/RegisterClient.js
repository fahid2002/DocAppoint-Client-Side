"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/libs/auth-client";
import toast from "react-hot-toast";

function validatePass(v) {
  return /[A-Z]/.test(v) && /[a-z]/.test(v) && v.length >= 6;
}

export default function RegisterClient() {
  const router = useRouter();
  const [form, setForm]             = useState({ name: "", email: "", photo: "", pass: "" });
  const [photoName, setPhotoName]   = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [err, setErr]               = useState("");
  const [passErr, setPassErr]       = useState("");
  const [loading, setLoading]       = useState(false);
  const fileInputRef                = useRef(null);

  const checkPass = (v) => {
    if (v.length > 0 && !validatePass(v)) {
      setPassErr(v.length < 6 ? "At least 6 characters required." : "Must include uppercase and lowercase letters.");
    } else setPassErr("");
  };

  const handlePhotoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setForm((p) => ({ ...p, photo: result }));
        setPhotoPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRegister = async () => {
    setErr("");
    if (!form.name || !form.email)  { setErr("Name and email are required."); return; }
    if (!form.email.includes("@"))  { setErr("Please enter a valid email."); return; }
    if (!validatePass(form.pass))   { setErr("Password must have uppercase, lowercase and 6+ characters."); return; }
    setLoading(true);
    try {
      const res = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.pass,
        image: form.photo || undefined,
        callbackURL: "/",
      });
      if (res?.error) {
        setErr(res.error.message || JSON.stringify(res.error) || "Registration failed.");
      } else {
        toast.success(`Account created! Welcome, ${form.name.split(" ")[0]}!`);
        router.push("/login");
      }
    } catch { setErr("An error occurred. Please try again."); }
    finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try { await signIn.social({ provider: "google", callbackURL: "/" }); }
    catch { toast.error("Google sign-up failed."); setLoading(false); }
  };

  const inputClass = "w-full text-[13px] px-[13px] py-[10px] rounded-lg border border-(--bdr) bg-(--card) text-(--tx) outline-none focus:border-(--p) transition-colors duration-150";

  return (
    <div className="auth-wrap">
      <div className="auth-card">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2.5 mb-[1.2rem]">
          <div className="w-12 h-12 rounded-[13px] bg-gradient-to-br from-(--p) to-(--acc) flex items-center justify-center text-[22px] text-white">
            <i className="ti ti-stethoscope" aria-hidden="true" />
          </div>
          <span className="font-[Sora,sans-serif] text-[18px] font-extrabold text-(--tx)">
            DocAppoint
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-[Sora,sans-serif] text-[22px] font-black text-(--tx) text-center mb-1">
          Create account
        </h2>
        <p className="text-[13px] text-(--tx3) text-center mb-[1.4rem]">
          Join thousands of patients on DocAppoint
        </p>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="flex items-center justify-center gap-[9px] w-full py-[11px] border-[1.5px] border-(--bdr) rounded-lg font-[Sora,sans-serif] text-[13px] font-semibold cursor-pointer bg-(--card) text-(--tx) mb-2 transition-all duration-200 hover:border-(--p) hover:shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign up with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-[0.6rem] my-[0.9rem] text-xs text-(--tx3)">
          <div className="flex-1 h-px bg-(--bdr)" />
          or use email
          <div className="flex-1 h-px bg-(--bdr)" />
        </div>

        {/* Name */}
        <div className="auth-field mb-[0.85rem]">
          <label>Full name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Fahid Hasan"
          />
        </div>

        {/* Email */}
        <div className="auth-field mb-[0.85rem]">
          <label>Email address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="fahid@gmail.com"
          />
        </div>

        {/* Photo */}
        <div className="auth-field mb-[0.85rem]">
          <label>Photo (optional)</label>

          {/* Browse button */}
          <div
            role="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-between gap-2.5 w-full min-h-[44px] px-[0.9rem] border border-(--bdr) rounded-lg bg-(--card) text-(--tx) cursor-pointer mb-2"
          >
            <span className={`flex-1 text-[13px] ${photoName ? "text-(--tx)" : "text-(--tx3)"}`}>
              {photoName || "Click to browse image file"}
            </span>
            <span className="text-xs text-(--tx3)">Browse</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            aria-label="Choose profile photo"
            className="hidden"
            onChange={handlePhotoFile}
          />

          {/* OR divider */}
          <div className="flex items-center gap-2 my-2 text-[11px] text-(--tx3)">
            <div className="flex-1 h-px bg-(--bdr)" />
            or paste a URL
            <div className="flex-1 h-px bg-(--bdr)" />
          </div>

          {/* URL input */}
          <input
            value={photoName ? "" : form.photo}
            onChange={(e) => {
              setPhotoName("");
              setPhotoPreview(e.target.value || null);
              setForm((p) => ({ ...p, photo: e.target.value }));
            }}
            placeholder="https://example.com/photo.jpg"
            className={inputClass}
          />

          {/* Preview */}
          {photoPreview && (
            <div className="mt-3 w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-(--bdr) mx-auto">
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Password */}
        <div className="auth-field mb-[0.85rem]">
          <label>Password</label>
          <input
            type="password"
            value={form.pass}
            onChange={(e) => { setForm((p) => ({ ...p, pass: e.target.value })); checkPass(e.target.value); }}
            placeholder="Min 6 chars, upper & lowercase"
          />
          {/* Password hint */}
          <div className="flex items-start gap-1.5 bg-(--amber-bg) rounded-lg px-3 py-2 text-xs text-(--amber-tx) mt-1 leading-[1.4]">
            <i className="ti ti-info-circle flex-shrink-0 text-sm" />
            Must include 1 uppercase, 1 lowercase, and at least 6 characters
          </div>
          {passErr && (
            <div className="text-xs text-(--red) flex items-center gap-1 mt-1">
              <i className="ti ti-alert-circle text-[13px]" />{passErr}
            </div>
          )}
        </div>

        {/* Error */}
        {err && (
          <div className="text-xs text-(--red) mb-[0.4rem] flex items-center gap-1">
            <i className="ti ti-alert-circle text-[13px]" />{err}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-[11px] rounded-lg bg-(--p) text-white text-sm font-bold mt-[0.6rem] hover:bg-(--p-dark) disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <i className="ti ti-user-plus" />
          {loading ? "Creating…" : "Create account"}
        </button>

        {/* Login link */}
        <div className="text-[13px] text-(--tx2) text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-(--p) font-bold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}