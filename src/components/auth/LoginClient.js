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
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setErr("");
    if (!email || !pass) { setErr("Please fill in all fields."); return; }
    setLoading(true);
    try {
      const res = await signIn.email({ email, password: pass, callbackURL: redirect });

      // Better Auth returns error inside res.error — NOT by throwing
      if (res?.error) {
        setErr(res.error.message || "Invalid email or password.");
        setLoading(false);
        return; // ← explicit return, never reaches getJwt on failure
      }

      // Only reaches here on successful login
      try {
        await authApi.getJwt(email); // sets httpOnly JWT cookie from Express
      } catch {
        // JWT issue failed — log but don't block the user
        console.error("JWT exchange failed — appointments may not work.");
      }

      toast.success("Welcome back!");
      router.push(redirect);
      router.refresh();

    } catch (e) {
      // signIn.email itself threw — wrong password, network error, etc.
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
      // Google redirects away — JWT is issued in DashboardClient after redirect
    } catch {
      toast.error("Google sign-in failed.");
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
        <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 22, fontWeight: 900, color: "var(--tx)", textAlign: "center", marginBottom: "0.25rem" }}>Welcome back</h2>
        <p style={{ fontSize: 13, color: "var(--tx3)", textAlign: "center", marginBottom: "1.4rem" }}>Sign in to your account to continue</p>

        <button onClick={handleGoogle} disabled={loading} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 9, width: "100%", padding: 11, border: "1.5px solid var(--bdr)", borderRadius: "var(--r-md)", fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer", background: "var(--card)", color: "var(--tx)", marginBottom: "0.5rem", transition: "border 0.2s, box-shadow 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--p)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--bdr)"; e.currentTarget.style.boxShadow = "none"; }}>
          <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", margin: "0.9rem 0", fontSize: 12, color: "var(--tx3)" }}>
          <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />or sign in with email<div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
        </div>

        <div className="auth-field" style={{ marginBottom: "0.85rem" }}>
          <label>Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="fahid@gmail.com" />
        </div>
        <div className="auth-field" style={{ marginBottom: "0.5rem" }}>
          <label>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} placeholder="Enter your password" />
        </div>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "var(--p)", textAlign: "right", cursor: "pointer", fontWeight: 600, marginBottom: "0.5rem" }}>Forgot password?</div>

        {err && (
          <div style={{ fontSize: 12, color: "var(--red)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 4 }}>
            <i className="ti ti-alert-circle" style={{ fontSize: 13 }} />{err}
          </div>
        )}

        <button onClick={handleLogin} disabled={loading} className="btn btn-primary" style={{ width: "100%", padding: 11, fontSize: 14, marginTop: "0.9rem" }}>
          <i className="ti ti-login" aria-hidden="true" />{loading ? "Signing in…" : "Login"}
        </button>
        <div style={{ fontSize: 13, color: "var(--tx2)", textAlign: "center", marginTop: "1rem" }}>
          Don&apos;t have an account?{" "}
          <Link href="/register" style={{ color: "var(--p)", fontWeight: 700, cursor: "pointer" }}>Register now</Link>
        </div>
      </div>
    </div>
  );
}