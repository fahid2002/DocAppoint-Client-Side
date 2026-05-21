import Link from "next/link";
import { DOCTORS } from "@/data/doctors";
import DoctorCard from "@/components/appointments/DoctorCard";

const top3 = [...DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 3);

export default function TopDoctors() {
  return (
    <div style={{ padding: "5rem 0" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <div className="eyebrow">Our best</div>
            <div className="sec-title">Top rated doctors</div>
          </div>
          <Link href="/appointments" className="view-all-link">
            View all <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        {/* Doctors grid */}
        <div
          className="top-doctors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.2rem",
          }}
        >
          {top3.map((d) => <DoctorCard key={d.id} doc={d} />)}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .view-all-link {
          font-family: Sora, sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: var(--p);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
        }
        .view-all-link:hover { text-decoration: underline; }
        @media (max-width: 900px) {
          .top-doctors-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .top-doctors-grid { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}} />
    </div>
  );
}