"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signOut } from "@/libs/auth-client";
import { useTheme } from "./ThemeProvider";
import toast from "react-hot-toast";
import Image from "next/image";

function initials(name) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const [localProfile, setLocalProfile] = useState(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("da_profile");
    return saved ? JSON.parse(saved) : null;
  });

  const user = session?.user;
  const displayName = localProfile?.name ?? user?.name ?? "";
  const displayImage = localProfile?.image ?? user?.image ?? "";

  useEffect(() => {
    const handler = (e) => {
      const { name, image } = e.detail;
      setLocalProfile({ name, image });
    };
    window.addEventListener("profile-updated", handler);
    return () => window.removeEventListener("profile-updated", handler);
  }, []);

  const handleLogout = async () => {
    await signOut();
    localStorage.removeItem("da_profile");
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "All Appointments" },
    { href: "/dashboard", label: "Dashboard" },
  ];

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="navbar fixed top-0 left-0 right-0 z-[200] bg-[var(--nav)] border-b border-[var(--nav-bdr)] backdrop-blur-md transition-colors duration-300">
        <div className="nav-inner max-w-[1200px] mx-auto px-2 xs:px-3 sm:px-6 h-[66px] flex items-center justify-between gap-1">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-[10px] cursor-pointer flex-shrink-0"
          >
            {/* logo-mark */}
            <div className="w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] bg-gradient-to-br from-[var(--p)] to-[var(--acc)] rounded-[11px] flex items-center justify-center text-[17px] sm:text-[20px] text-white flex-shrink-0">
              <i className="ti ti-stethoscope" aria-hidden="true" />
            </div>
            <span className="font-[Sora,sans-serif] text-[16px] sm:text-[18px] font-extrabold text-[var(--tx)] tracking-tight whitespace-nowrap">
              Doc<span className="text-[var(--acc)] dark:text-[#184d86]">Appoint</span>
            </span>
          </Link>

          {/* Desktop nav links — hidden on mobile */}
          <div className="hidden md:flex gap-[2px]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link ${pathname === l.href ? "active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="icon-btn w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] rounded-[var(--r-md)] border-[1.5px] border-[var(--bdr)] bg-[var(--bg3)] flex items-center justify-center text-[var(--tx2)] text-[17px] sm:text-[18px] cursor-pointer transition-all duration-200 hover:bg-[var(--p3)] hover:text-[var(--p)]"
            >
              <i className={`ti ${theme === "dark" ? "ti-sun" : "ti-moon"}`} />
            </button>

            {/* ── Auth State ── */}
            {isPending ? (
              /* 1. Loading skeleton */
              <div className="flex items-center justify-center w-[80px] sm:w-[120px] h-[32px]">
                <div className="animate-pulse w-full h-4/5 bg-[var(--bdr)] rounded-md opacity-60" />
              </div>
            ) : user ? (
              /* 2. Authenticated */
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Avatar pill */}
                <Link
                  href="/dashboard"
                  className="av-pill flex items-center gap-2 bg-[var(--bg3)] border-[1.5px] border-[var(--bdr)] rounded-[30px] px-1 py-1 sm:px-3 cursor-pointer hover:border-[var(--p)] transition-all"
                >
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={displayName || "User"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover w-[28px] h-[28px] sm:w-[30px] sm:h-[30px]"
                    />
                  ) : (
                    <div className="av-circle w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] rounded-full bg-gradient-to-br from-[var(--p)] to-[var(--acc)] flex items-center justify-center text-[11px] sm:text-[12px] font-bold text-white flex-shrink-0">
                      {initials(displayName || "U")}
                    </div>
                  )}
                  {/* Hide name on very small screens */}
                  <span className="hidden sm:inline text-xs font-semibold text-[var(--tx)]">
                    {(displayName || "User").split(" ")[0].toUpperCase()}
                  </span>
                </Link>

                {/* Logout — icon-only on small screens */}
                <button
                  onClick={handleLogout}
                  className="btn btn-danger btn-sm flex items-center gap-1 px-2 sm:px-[14px] text-[11px] sm:text-[12.5px] py-[6px] rounded-[var(--r-md)] border-[1.5px] border-red-300/40 text-[var(--red)] bg-transparent cursor-pointer transition-all hover:bg-[var(--red-bg)] whitespace-nowrap"
                  aria-label="Logout"
                >
                  <i className="ti ti-logout" aria-hidden="true" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              /* 3. Unauthenticated */
              <div className="flex gap-1.5 sm:gap-2">
                <Link
                  href="/login"
                  className="btn btn-outline btn-sm inline-flex items-center gap-1.5 px-2.5 sm:px-[14px] py-[6px] rounded-[var(--r-md)] text-[11px] sm:text-[12.5px] font-semibold border-[1.5px] border-[var(--bdr)] text-[var(--tx)] whitespace-nowrap transition-all hover:bg-[var(--bg3)]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="btn btn-primary btn-sm inline-flex items-center gap-1.5 px-2.5 sm:px-[14px] py-[6px] rounded-[var(--r-md)] text-[11px] sm:text-[12.5px] font-semibold bg-gradient-to-br from-[var(--p)] to-[var(--p2)] text-white border-transparent whitespace-nowrap shadow-[0_4px_14px_rgba(24,95,165,0.28)] transition-all hover:brightness-110 hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger — only on mobile */}
            <button
              className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 flex-shrink-0 ml-0.5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`block w-[22px] h-[2px] bg-[var(--tx)] rounded-sm transition-all duration-300 ${menuOpen ? "rotate-45 translate-x-[5px] translate-y-[7px]" : ""}`} />
              <span className={`block w-[22px] h-[2px] bg-[var(--tx)] rounded-sm transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block w-[22px] h-[2px] bg-[var(--tx)] rounded-sm transition-all duration-300 ${menuOpen ? "-rotate-45 translate-x-[5px] -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
{menuOpen && (
  <div
    style={{
      display: "flex",
      position: "fixed",
      top: 66,
      left: 0,
      right: 0,
      background: "var(--nav)",
      borderBottom: "1px solid var(--nav-bdr)",
      padding: "1rem 0",
      zIndex: 199,
      flexDirection: "column",
      gap: 6,
    }}
  >
    {navLinks.map((l) => (
      <Link
        key={l.href}
        href={l.href}
        onClick={() => setMenuOpen(false)}
        className={pathname === l.href ? "mobile-link-active" : "mobile-link"}
        style={{
          display: "flex",
          alignItems: "center",
          height: 48,
          marginLeft: 10,
          marginRight: 10,
          paddingLeft: 10,
          paddingRight: 18,
          borderRadius: 13,
          fontSize: 14,
          fontWeight: pathname === l.href ? 700 : 500,

          color:
            pathname === l.href
              ? theme === "dark"
                ? "#7eb8f7"
                : "#0c447c"
              : "var(--tx)",

          background:
            pathname === l.href
              ? theme === "dark"
                ? "#0f2e4c"
                : "var(--p3)"
              : "transparent",

          borderLeft:
            pathname === l.href
              ? `4px solid ${theme === "dark" ? "#7eb8f7" : "#0c447c"}`
              : "4px solid transparent",

          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        {l.label}
      </Link>
    ))}

    <div
      style={{
        height: 1,
        background: "var(--bdr)",
        marginTop: 14,
        marginLeft: 10,
        marginRight: 10,
      }}
    />
  </div>
)}
    </>
  );
}
