import Link from "next/link";
import { DOCTORS } from "@/data/doctors";
import DoctorCard from "@/components/appointments/DoctorCard";

const top3 = [...DOCTORS].sort((a, b) => b.rating - a.rating).slice(0, 3);

export default function TopDoctors() {
  return (
    <div className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="eyebrow">Our best</div>
            <div className="sec-title">Top rated doctors</div>
          </div>
          <Link
            href="/appointments"
            className="font-[Sora,sans-serif] text-[13px] font-semibold text-(--p) flex items-center gap-[5px] hover:underline"
          >
            View all <i className="ti ti-arrow-right text-sm" aria-hidden="true" />
          </Link>
        </div>

        {/* Doctors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1.2rem]">
          {top3.map((d) => <DoctorCard key={d.id} doc={d} />)}
        </div>

      </div>
    </div>
  );
}