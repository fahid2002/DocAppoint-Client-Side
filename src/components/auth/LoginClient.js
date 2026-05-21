"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/libs/auth-client";
import { authApi } from "@/libs/api";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [err, setErr]         = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErr("");
    if (!email || !pass) { setErr("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await signIn.email({ email, password: pass, callbackURL: redirect });
      if (res?.error) {
        setErr(res.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }
      try {
        await authApi.getJwt(email);
      } catch {
        console.error("JWT exchange failed — appointments may not work.");
      }
      toast.success("Welcome back!");
      router.push(redirect);
      router.refresh();
    } catch (e) {
      const msg = e?.message || "";
      if (msg.toLowerCase().includes("invalid") || msg.toLowerCase().includes("credentials")) {
        setErr("Invalid email or password.");
      } else {
        setErr("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google sign-in failed.");
      setLoading(false);
    }
  };

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
          Welcome back
        </h2>
        <p className="text-[13px] text-(--tx3) text-center mb-[1.4rem]">
          Sign in to your account to continue
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
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-[0.6rem] my-[0.9rem] text-xs text-(--tx3)">
          <div className="flex-1 h-px bg-(--bdr)" />
          or sign in with email
          <div className="flex-1 h-px bg-(--bdr)" />
        </div>

        {/* Email field */}
        <div className="auth-field mb-[0.85rem]">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="fahid@gmail.com"
          />
        </div>

        {/* Password field */}
        <div className="auth-field mb-2">
          <label>Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot password */}
        <div className="font-[Sora,sans-serif] text-xs text-(--p) text-right cursor-pointer font-semibold mb-2">
          Forgot password?
        </div>

        {/* Error */}
        {err && (
          <div className="text-xs text-(--red) mb-2 flex items-center gap-1">
            <i className="ti ti-alert-circle text-[13px]" />{err}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-[11px] rounded-lg bg-(--p) text-white text-sm font-bold mt-[0.9rem] hover:bg-(--p-dark) disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
        >
          <i className="ti ti-login" aria-hidden="true" />
          {loading ? "Signing in…" : "Login"}
        </button>

        {/* Register link */}
        <div className="text-[13px] text-(--tx2) text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-(--p) font-bold cursor-pointer hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}