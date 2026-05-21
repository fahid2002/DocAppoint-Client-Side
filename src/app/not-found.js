import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-24 pb-8">
        <div className="font-['Sora'] text-[clamp(80px,15vw,140px)] font-black text-[var(--p)] leading-none tracking-[-5px] opacity-15">
          404
        </div>
        <div className="text-[64px] text-[var(--p)] -mt-4 mb-4">
          <i className="ti ti-map-pin-off" />
        </div>
        <div className="font-['Sora'] text-[22px] font-extrabold text-[var(--tx)] mb-1">
          Page not found
        </div>
        <div className="text-[14.5px] text-[var(--tx2)] mb-7 max-w-[320px]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </div>
        <Link href="/" className="btn btn-primary btn-lg">
          <i className="ti ti-home" />
          Back to home
        </Link>
      </div>
    </>
  );
}