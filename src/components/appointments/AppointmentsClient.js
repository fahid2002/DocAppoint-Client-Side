"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { doctorsApi } from "@/libs/api";
import DoctorCard from "./DoctorCard";

const SPECIALTIES = ["Cardiologist", "Neurologist", "Pediatrician", "Dermatologist", "Orthopedic", "Ophthalmologist", "Pulmonologist", "General"];
const PILLS       = ["All", "Cardiologist", "Neurologist", "Pediatrician", "Dermatologist", "Orthopedic"];

const selectClass = "text-[12.5px] px-3 py-[9px] rounded-lg border-[1.5px] border-(--bdr) bg-(--card) text-(--tx) cursor-pointer outline-none";

export default function AppointmentsClient() {
  const params = useSearchParams();

  const [search, setSearch]       = useState(params.get("q") || "");
  const [specialty, setSpecialty] = useState(params.get("specialty") || "");
  const [sort, setSort]           = useState("");
  const [loading, setLoading]     = useState(true);
  const [allDoctors, setAllDoctors] = useState([]);
  const [docs, setDocs]           = useState([]);

  // Fetch all doctors once on mount
  useEffect(() => {
    doctorsApi.getAll()
      .then(res => setAllDoctors(res.data))
      .catch(() => setAllDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  // Filter / sort locally
  useEffect(() => {
    let filtered = [...allDoctors];
    if (search)    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
    );
    if (specialty) filtered = filtered.filter(d => d.specialty === specialty);
    if (sort === "fee-asc")   filtered.sort((a, b) => a.fee - b.fee);
    else if (sort === "fee-desc")  filtered.sort((a, b) => b.fee - a.fee);
    else if (sort === "rating")    filtered.sort((a, b) => b.rating - a.rating);
    setDocs(filtered);
  }, [search, specialty, sort, allDoctors]);

  return (
    <div className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="mb-6">
          <div className="eyebrow">Browse all</div>
          <div className="sec-title">Available doctors</div>
        </div>

        {/* Search row */}
        <div className="flex flex-wrap gap-[0.7rem] mb-[1.2rem] items-center">
          {/* Search input */}
          <div className="flex-1 min-w-[200px] flex items-center gap-2 border-[1.5px] border-(--bdr) rounded-lg px-4 py-[0.6rem] bg-(--card) transition-colors duration-200 focus-within:border-(--p)">
            <i className="ti ti-search text-(--tx3) text-base" aria-hidden="true" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by doctor name…"
              className="bg-transparent border-none outline-none text-[13.5px] text-(--tx) flex-1 font-[DM_Sans,sans-serif]"
            />
          </div>

          {/* Specialty filter */}
          <select value={specialty} onChange={e => setSpecialty(e.target.value)} className={selectClass}>
            <option value="">All Specialties</option>
            {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
          </select>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} className={selectClass}>
            <option value="">Sort: Default</option>
            <option value="fee-asc">Fee: Low → High</option>
            <option value="fee-desc">Fee: High → Low</option>
            <option value="rating">Rating: High → Low</option>
          </select>
        </div>

        {/* Pills */}
        <div className="flex flex-wrap gap-[0.4rem] mb-[1.3rem]">
          {PILLS.map(p => {
            const active = (p === "All" && !specialty) || specialty === p;
            return (
              <button
                key={p}
                onClick={() => setSpecialty(p === "All" ? "" : p)}
                className={`font-[Sora,sans-serif] text-xs font-semibold px-4 py-1.5 rounded-full border-[1.5px] cursor-pointer transition-all duration-200 ${
                  active
                    ? "border-(--p) bg-(--p) text-white shadow-[0_3px_10px_rgba(24,95,165,0.25)]"
                    : "border-(--bdr) bg-(--card) text-(--tx2) hover:border-(--p) hover:text-(--p)"
                }`}
              >
                {p}
              </button>
            );
          })}
        </div>

        {/* Results */}
        {loading ? (
          <div className="spinner"><div className="spin-anim" />Loading doctors…</div>
        ) : docs.length === 0 ? (
          <div className="text-center py-16 px-4 text-(--tx3)">
            <i className="ti ti-search-off text-[48px] opacity-40" />
            <p className="text-[15px] mt-4">No doctors found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.2rem] auto-rows-fr">
            {docs.map(d => <DoctorCard key={d.id} doc={d} />)}
          </div>
        )}
      </div>
    </div>
  );
}