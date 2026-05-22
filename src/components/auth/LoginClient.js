"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/libs/auth-client";
import { authApi } from "@/libs/api";
import toast from "react-hot-toast";

export default function LoginClient() {
  const router = useRouter();
  const params = useSearchParams();

  // redirect to home
  const redirect = params.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const toastType = params.get("toast");
    const authError = params.get("error");

    if (
      authError &&
      (authError.includes("link") ||
        authError.includes("exist") ||
        authError === "OAuthAccountNotLinked")
    ) {
      toast.error(
        "This email is already registered. Try logging in with your password!"
      );
    } else if (toastType === "already_registered") {
      toast.error(
        "This email is already registered. Try logging in!"
      );
    } else if (toastType === "register_success") {
      toast.success(
        "Registration successful! Please login to your account."
      );
    } else if (toastType === "google_success") {
      toast.success("Successfully authenticated via Google!");
    } else if (toastType === "login_success") {
      toast.success("Login successful!");
    }

    if (toastType || authError) {
      const newUrl =
        window.location.pathname +
        (params.get("redirect")
          ? `?redirect=${params.get("redirect")}`
          : "");

      window.history.replaceState({}, document.title, newUrl);
    }
  }, [params]);

  const handleLogin = async () => {
    setErr("");

    if (!email || !pass) {
      setErr("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn.email({
        email,
        password: pass,
        callbackURL: `${redirect}${
          redirect.includes("?") ? "&" : "?"
        }toast=login_success`,
      });

      if (res?.error) {
        setErr(res.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      try {
        await authApi.getJwt(email);
      } catch {
        console.error("JWT exchange failed.");
      }

      router.push(
        `${redirect}${
          redirect.includes("?") ? "&" : "?"
        }toast=login_success`
      );

      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/?toast=google_success",
      });
    } catch {
      toast.error("Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginBottom: "1.2rem",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 13,
              background: "var(--grad-acc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              color: "#fff",
            }}
          >
            <i className="ti ti-stethoscope" aria-hidden="true" />
          </div>

          <span
            style={{
              fontFamily: "Sora, sans-serif",
              fontSize: 18,
              fontWeight: 800,
              color: "var(--tx)",
            }}
          >
            DocAppoint
          </span>
        </div>

        <h2
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 22,
            fontWeight: 900,
            color: "var(--tx)",
            textAlign: "center",
            marginBottom: "0.25rem",
          }}
        >
          Welcome back
        </h2>

        <p
          style={{
            fontSize: 13,
            color: "var(--tx3)",
            textAlign: "center",
            marginBottom: "1.4rem",
          }}
        >
          Sign in to your account to continue
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
            cursor: "pointer",
            background: "var(--card)",
            color: "var(--tx)",
            marginBottom: "0.5rem",
          }}
        >
          Continue with Google
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            margin: "0.9rem 0",
            fontSize: 12,
            color: "var(--tx3)",
          }}
        >
          <div
            style={{
              flex: 1,
              height: 1,
              background: "var(--bdr)",
            }}
          />
          or sign in with email
          <div
            style={{
              flex: 1,
              height: 1,
              background: "var(--bdr)",
            }}
          />
        </div>

        <div
          className="auth-field"
          style={{ marginBottom: "0.85rem" }}
        >
          <label>Email address</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleLogin()
            }
            placeholder="fahid@gmail.com"
          />
        </div>

        <div
          className="auth-field"
          style={{ marginBottom: "0.5rem" }}
        >
          <label>Password</label>

          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleLogin()
            }
            placeholder="Enter your password"
          />
        </div>

        <div
          style={{
            fontFamily: "Sora, sans-serif",
            fontSize: 12,
            color: "var(--p)",
            textAlign: "right",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: "0.5rem",
          }}
        >
          Forgot password?
        </div>

        {err && (
          <div
            style={{
              fontSize: 12,
              color: "var(--red)",
              marginBottom: "0.5rem",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <i
              className="ti ti-alert-circle"
              style={{ fontSize: 13 }}
            />
            {err}
          </div>
        )}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn btn-primary"
          style={{
            width: "100%",
            padding: 11,
            fontSize: 14,
            marginTop: "0.9rem",
          }}
        >
          <i className="ti ti-login" aria-hidden="true" />
          {loading ? "Signing in…" : "Login"}
        </button>

        <div
          style={{
            fontSize: 13,
            color: "var(--tx2)",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            style={{
              color: "var(--p)",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}