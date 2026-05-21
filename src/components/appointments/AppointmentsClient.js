"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doctorsApi } from "@/libs/api";
import DoctorCard from "./DoctorCard";

const SPECIALTIES = ["Cardiologist", "Neurologist", "Pediatrician", "Dermatologist", "Orthopedic", "Ophthalmologist", "Pulmonologist", "General"];
const PILLS = ["All", "Cardiologist", "Neurologist", "Pediatrician", "Dermatologist", "Orthopedic"];

export default function AppointmentsClient() {
  const params = useSearchParams();

  const [search, setSearch] = useState(params.get("q") || "");
  const [specialty, setSpecialty] = useState(params.get("specialty") || "");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(true);
  const [allDoctors, setAllDoctors] = useState([]);
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    doctorsApi.getAll()
      .then(res => setAllDoctors(res.data))
      .catch(() => setAllDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = [...allDoctors];
    if (search) filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    );
    if (specialty) filtered = filtered.filter(d => d.specialty === specialty);
    if (sort === "fee-asc") filtered.sort((a, b) => a.fee - b.fee);
    else if (sort === "fee-desc") filtered.sort((a, b) => b.fee - a.fee);
    else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    setDocs(filtered);
  }, [search, specialty, sort, allDoctors]);

  return (
    <div style={{ padding: "5rem 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <div className="eyebrow">Browse all</div>
          <div className="sec-title">Available doctors</div>
        </div>

        {/* Search row */}
        <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1.2rem", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 8, border: "1.5px solid var(--bdr)", borderRadius: "var(--r-md)", padding: "0.6rem 1rem", background: "var(--card)", transition: "border 0.2s" }}
            onFocus={e => (e.currentTarget.style.borderColor = "var(--p)")} onBlur={e => (e.currentTarget.style.borderColor = "var(--bdr)")}>
            <i className="ti ti-search" style={{ color: "var(--tx3)", fontSize: 16 }} aria-hidden="true" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by doctor name…"
              style={{ background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "var(--tx)", flex: 1, fontFamily: "DM Sans, sans-serif" }} />
          </div>
          <select value={specialty} onChange={e => setSpecialty(e.target.value)}
            style={{ fontSize: 12.5, padding: "9px 12px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--card)", color: "var(--tx)", cursor: "pointer", outline: "none" }}>
            <option value="">All Specialties</option>
            {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}
            style={{ fontSize: 12.5, padding: "9px 12px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--card)", color: "var(--tx)", cursor: "pointer", outline: "none" }}>
            <option value="">Sort: Default</option>
            <option value="fee-asc">Fee: Low → High</option>
            <option value="fee-desc">Fee: High → Low</option>
            <option value="rating">Rating: High → Low</option>
          </select>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.3rem" }}>
          {PILLS.map(p => (
            <button key={p} onClick={() => setSpecialty(p === "All" ? "" : p)}
              style={{ fontFamily: "Sora, sans-serif", fontSize: 12, fontWeight: 600, padding: "6px 16px", borderRadius: 25, border: `1.5px solid ${(p === "All" && !specialty) || specialty === p ? "var(--p)" : "var(--bdr)"}`, cursor: "pointer", color: (p === "All" && !specialty) || specialty === p ? "#fff" : "var(--tx2)", background: (p === "All" && !specialty) || specialty === p ? "var(--p)" : "var(--card)", transition: "all 0.2s", boxShadow: (p === "All" && !specialty) || specialty === p ? "0 3px 10px rgba(24,95,165,0.25)" : "none" }}>
              {p}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="spinner"><div className="spin-anim" />Loading doctors…</div>
        ) : docs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--tx3)" }}>
            <i className="ti ti-search-off" style={{ fontSize: 48, opacity: 0.4 }} />
            <p style={{ fontSize: 15, marginTop: "1rem" }}>No doctors found. Try a different search.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem", gridAutoRows: "1fr" }} className="docs-grid-resp">
            {docs.map(d => <DoctorCard key={d.id} doc={d} />)}
          </div>
        )}
      </div>
      <style>{`
        @media(max-width:900px){.docs-grid-resp{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:600px){.docs-grid-resp{grid-template-columns:1fr!important;}}
      `}</style>
    </div>
  );
}