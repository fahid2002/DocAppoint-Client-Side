import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata = {
  title: "Dashboard",
  description: "Manage your bookings and profile on DocAppoint.",
};

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="page-enter pt-[66px] min-h-screen">
        <DashboardClient />
      </main>
      <Footer />
    </>
  );
}