import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppointmentsClient from "@/components/appointments/AppointmentsClient";

export const metadata = {
  title: "All Appointments",
  description: "Browse all available doctors and book an appointment instantly.",
};

export default function AppointmentsPage() {
  return (
    <>
      <Navbar />
      <main className="page-enter pt-[66px] min-h-screen">
        <Suspense fallback={<div className="spinner"><div className="spin-anim" />Loading...</div>}>
          <AppointmentsClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}