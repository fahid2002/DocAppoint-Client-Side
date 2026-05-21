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
  const { data: session } = useSession();
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
      <nav className="fixed top-0 left-0 right-0 z-[200] h-[66px] bg-[var(--nav)] border-b border-[var(--nav-bdr)] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-[10px] cursor-pointer flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-[var(--p)] flex items-center justify-center text-white text-lg">
              <i className="ti ti-stethoscope" aria-hidden="true" />
            </div>
            <span className="font-[Sora,sans-serif] text-[18px] font-extrabold text-[var(--tx)] tracking-tight">
              Doc<span className="text-[var(--p)]">Appoint</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-[2px]">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  pathname === l.href
                    ? "bg-[var(--p3)] text-[var(--p)] font-semibold"
                    : "text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--s2)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--tx-2)] hover:text-[var(--tx)] hover:bg-[var(--s2)] transition-colors duration-200 text-base cursor-pointer"
            >
              <i className={`ti ${theme === "dark" ? "ti-sun" : "ti-moon"}`} />
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--bdr)] bg-[var(--s2)] hover:bg-[var(--s3)] transition-colors duration-200"
                >
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={displayName || "User"}
                      width={30}
                      height={30}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[30px] h-[30px] rounded-full bg-[var(--p)] text-white text-xs font-bold flex items-center justify-center">
                      {initials(displayName || "U")}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-[var(--tx)]">
                    {(displayName || "User").split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors duration-200 cursor-pointer"
                >
                  <i className="ti ti-logout" aria-hidden="true" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold border border-[var(--bdr)] text-[var(--tx)] hover:bg-[var(--s2)] transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-1.5 rounded-lg text-sm font-semibold bg-[var(--p)] text-white hover:bg-[var(--p-dark)] transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col gap-[5px] cursor-pointer p-1 flex-shrink-0"
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

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="fixed top-[66px] left-0 right-0 z-[199] bg-[var(--nav)] border-b border-[var(--nav-bdr)] px-6 py-4 flex flex-col gap-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm px-[14px] py-[10px] rounded-lg transition-colors duration-200 border-l-[3px] ${
                pathname === l.href
                  ? "font-bold bg-[var(--p3)] border-[var(--p)] text-[var(--p)]"
                  : "font-medium border-transparent text-[var(--tx)] hover:bg-[var(--s2)]"
              }`}
            >
              {l.label}
            </Link>
          ))}

          <hr className="border-[var(--bdr)] my-2" />

          {!user && (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium px-[14px] py-[10px] rounded-lg text-[var(--tx)] hover:bg-[var(--s2)] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium px-[14px] py-[10px] rounded-lg text-[var(--tx)] hover:bg-[var(--s2)] transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}