"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/libs/auth-client";

export default function DoctorCard({ doc }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleView = () => {
    if (!session?.user) {
      router.push("/login");
    } else {
      router.push(`/appointments/${doc.id}`);
    }
  };

  const stars = "★".repeat(Math.round(doc.rating)) + "☆".repeat(5 - Math.round(doc.rating));

  return (
    <div className="doc-card cursor-pointer h-full" onClick={handleView}>

      {/* ── Image block ── */}
      <div className="doc-img relative">
        <Image
          src={doc.img}
          alt={doc.name}
          width={120}
          height={155}
          className="object-cover object-top rounded-t-[11px] w-[120px] h-[155px]"
        />

        {/* Available badge */}
        <div className="absolute top-[10px] right-[10px] flex items-center gap-1 bg-[rgba(234,243,222,0.92)] text-[#3B6D11] text-[10px] font-bold px-[9px] py-[3px] rounded-[20px] backdrop-blur-[6px]">
          <div className="pulse" />
          Available
        </div>

        {/* Experience badge */}
        <div className="absolute top-[10px] left-[10px] text-[10px] font-bold px-[9px] py-[3px] rounded-[5px] bg-[rgba(4,44,83,0.75)] text-[#B5D4F4] backdrop-blur-[6px]">
          {doc.exp}
        </div>
      </div>

      {/* ── Info block ── */}
      <div className="p-4">

        {/* Specialty */}
        <div className="font-[Sora,sans-serif] text-[11px] font-bold text-(--p) uppercase tracking-[0.06em] mb-[3px]">
          {doc.specialty}
        </div>

        {/* Name */}
        <h3 className="font-[Sora,sans-serif] text-[15px] font-extrabold text-(--tx) mb-1">
          {doc.name}
        </h3>

        {/* Stars */}
        <div className="text-[#BA7517] text-xs mb-[7px]">
          {stars}{" "}
          <span className="text-[11px] text-(--tx3)">
            {doc.rating} ({doc.reviews} reviews)
          </span>
        </div>

        {/* Hospital */}
        <div className="text-[11.5px] text-(--tx3) flex items-center gap-1 mb-[3px]">
          <i className="ti ti-building-hospital text-xs" aria-hidden="true" />
          {doc.hospital}
        </div>

        {/* Location */}
        <div className="text-[11.5px] text-(--tx3) flex items-center gap-1 mb-[3px]">
          <i className="ti ti-map-pin text-xs" aria-hidden="true" />
          {doc.location}
        </div>

        {/* Fee + button */}
        <div className="flex justify-between items-center mt-[11px] pt-[11px] border-t border-(--bdr)">
          <div className="font-[Sora,sans-serif] text-[18px] font-extrabold text-(--p)">
            ৳{doc.fee}{" "}
            <small className="text-[10px] text-(--tx3) font-normal">/visit</small>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleView(); }}
            className="px-3 py-1.5 rounded-lg bg-(--p) text-white text-xs font-semibold hover:bg-(--p-dark) transition-colors duration-200 cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}