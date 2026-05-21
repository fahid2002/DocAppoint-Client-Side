"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/libs/auth-client";

export default function DoctorCard({ doc }) {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleView = () => {
    if (isPending) return;
    if (!session?.user) {
      router.push("/login");
    } else {
      router.push(`/appointments/${doc.id}`);
    }
  };

  const stars = "★".repeat(Math.round(doc.rating)) + "☆".repeat(5 - Math.round(doc.rating));

  return (
    <div className="doc-card" onClick={handleView} style={{ height: "100%" }}>
      <div className="doc-img">
        <Image src={doc.img} alt={doc.name} width={120} height={155} style={{ objectFit: "cover", objectPosition: "top", borderRadius: "11px 11px 0 0", width: 120, height: 155 }} />
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", alignItems: "center", gap: 4, background: "rgba(234,243,222,0.92)", color: "#3B6D11", fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, backdropFilter: "blur(6px)" }}>
          <div className="pulse" />
          Available
        </div>
        <div style={{ position: "absolute", top: 10, left: 10, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 5, background: "rgba(4,44,83,0.75)", color: "#B5D4F4", backdropFilter: "blur(6px)" }}>
          {doc.exp}
        </div>
      </div>
      <div style={{ padding: "1rem" }}>
        <div style={{ fontFamily: "Sora, sans-serif", fontSize: 11, fontWeight: 700, color: "var(--p)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{doc.specialty}</div>
        <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 15, fontWeight: 800, color: "var(--tx)", marginBottom: 4 }}>{doc.name}</h3>
        <div style={{ color: "#BA7517", fontSize: 12, marginBottom: 7 }}>
          {stars} <span style={{ fontSize: 11, color: "var(--tx3)" }}>{doc.rating} ({doc.reviews} reviews)</span>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--tx3)", display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
          <i className="ti ti-building-hospital" style={{ fontSize: 12 }} aria-hidden="true" />
          {doc.hospital}
        </div>
        <div style={{ fontSize: 11.5, color: "var(--tx3)", display: "flex", alignItems: "center", gap: 4, marginBottom: 3 }}>
          <i className="ti ti-map-pin" style={{ fontSize: 12 }} aria-hidden="true" />
          {doc.location}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 11, paddingTop: 11, borderTop: "1px solid var(--bdr)" }}>
          <div style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--p)" }}>
            ৳{doc.fee} <small style={{ fontSize: 10, color: "var(--tx3)", fontWeight: 400 }}>/visit</small>
          </div>
          <button
            className="btn btn-primary btn-sm"
            disabled={isPending}
            onClick={(e) => { e.stopPropagation(); handleView(); }}
          >
            {isPending ? "..." : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
}