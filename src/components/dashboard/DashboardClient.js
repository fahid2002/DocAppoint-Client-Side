"use client";
import { useEffect, useRef, useState } from "react";
import { useSession } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { appointmentsApi, authApi } from "@/libs/api";
import toast from "react-hot-toast";
import Image from "next/image";

function initials(name) {
  return name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

const selectClass = "text-[13.5px] px-[13px] py-[11px] rounded-lg border-[1.5px] border-(--bdr) bg-(--bg3) text-(--tx) outline-none w-full";
const inputClass  = "w-full text-[13px] px-[13px] py-[10px] rounded-lg border border-(--bdr) bg-(--card) text-(--tx) outline-none focus:border-(--p) transition-colors duration-150";

export default function DashboardClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [tab, setTab]               = useState("bookings");
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [editModal, setEditModal]   = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [editForm, setEditForm]     = useState({ patientName: "", gender: "", phone: "", appointmentDate: "", appointmentTime: "" });
  const [profileForm, setProfileForm] = useState({ name: "", photo: "" });
  const [saving, setSaving]         = useState(false);
  const [photoName, setPhotoName]   = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const photoInputRef = useRef(null);
  const jwtIssued     = useRef(false);

  const [localUser, setLocalUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("da_profile");
    return saved ? JSON.parse(saved) : null;
  });

  const user         = session?.user;
  const displayName  = localUser?.name  ?? user?.name  ?? "";
  const displayImage = localUser?.image ?? user?.image ?? "";

  useEffect(() => {
    if (isPending) return;
    if (!user) { router.push("/login?redirect=/dashboard"); return; }
    if (!jwtIssued.current && user.email) {
      jwtIssued.current = true;
      authApi.getJwt(user.email).catch(() => console.error("JWT exchange failed."));
    }
  }, [isPending, user, router]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchBookings = async () => {
      setLoading(true);
      try {
        await authApi.getJwt(user.email);
        const res = await appointmentsApi.getByUser(user.email);
        setBookings(res.data);
      } catch { setBookings([]); }
      finally { setLoading(false); }
    };
    fetchBookings();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await appointmentsApi.delete(id);
      setBookings(b => b.filter(x => x._id !== id));
      toast.success("Appointment deleted successfully!");
    } catch { toast.error("Failed to delete appointment."); }
  };

  const openEdit = (b) => {
    setEditForm({ patientName: b.patientName, gender: b.gender, phone: b.phone, appointmentDate: b.appointmentDate, appointmentTime: b.appointmentTime });
    setEditModal(b);
  };

  const handleUpdate = async () => {
    if (!editModal) return;
    setSaving(true);
    try {
      await appointmentsApi.update(editModal._id, editForm);
      setBookings(bs => bs.map(b => b._id === editModal._id ? { ...b, ...editForm } : b));
      toast.success("Appointment updated successfully!");
      setEditModal(null);
    } catch { toast.error("Failed to update appointment."); }
    finally { setSaving(false); }
  };

  const openProfile = () => {
    setProfileForm({ name: displayName, photo: displayImage });
    setPhotoName("");
    setPhotoPreview(displayImage || null);
    setProfileModal(true);
  };

  const handlePhotoFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setProfileForm(p => ({ ...p, photo: result }));
        setPhotoPreview(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleProfileUpdate = async () => {
    if (!profileForm.name.trim()) { toast.error("Name cannot be empty."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/update-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profileForm.name, image: profileForm.photo }),
      });
      if (!res.ok) throw new Error("Failed");
      setLocalUser({ name: profileForm.name, image: profileForm.photo });
      setProfileModal(false);
      toast.success("Profile updated successfully!");
      localStorage.setItem("da_profile", JSON.stringify({ name: profileForm.name, image: profileForm.photo }));
      window.dispatchEvent(new CustomEvent("profile-updated", {
        detail: { name: profileForm.name, image: profileForm.photo }
      }));
    } catch { toast.error("Failed to update profile."); }
    finally { setSaving(false); }
  };

  if (isPending) return <div className="spinner"><div className="spin-anim" />Loading…</div>;
  if (!user) return null;

  const memberSince = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const modalCloseBtn = (onClick) => (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-lg border-[1.5px] border-(--bdr) bg-transparent flex items-center justify-center text-(--tx3) hover:bg-(--s2) transition-colors duration-200 cursor-pointer"
    >
      <i className="ti ti-x" />
    </button>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-66px)]">

      {/* ── Sidebar ── */}
      <div className="sidebar">
        {/* Avatar block */}
        <div className="text-center pb-[1.1rem] mb-[0.9rem] border-b border-(--bdr)">
          <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-(--p) to-(--acc) p-[3px] mx-auto mb-[0.65rem]">
            <div className="w-full h-full rounded-full bg-(--bg3) flex items-center justify-center font-[Sora,sans-serif] text-[18px] font-extrabold text-(--p) overflow-hidden">
              {displayImage
                ? <Image src={displayImage} alt={displayName} width={54} height={54} className="object-cover rounded-full" />
                : initials(displayName || "U")}
            </div>
          </div>
          <div className="font-[Sora,sans-serif] text-[13px] font-bold text-(--tx) mb-0.5">{displayName}</div>
          <div className="text-[11px] text-(--tx3) break-all">{user.email}</div>
        </div>

        {/* Nav links */}
        {[
          { id: "bookings", icon: "ti-calendar", label: "My Bookings" },
          { id: "profile",  icon: "ti-user",     label: "My Profile"  },
        ].map(l => (
          <div key={l.id} onClick={() => setTab(l.id)} className={`sb-link${tab === l.id ? " on" : ""}`}>
            <i className={`ti ${l.icon} text-base`} aria-hidden="true" />{l.label}
          </div>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 p-[1.8rem_2rem] bg-(--bg) min-w-0 overflow-auto">

        {/* Bookings tab */}
        {tab === "bookings" && (
          <div>
            <h2 className="font-[Sora,sans-serif] text-xl font-extrabold text-(--tx) mb-[1.2rem]">
              My Bookings
            </h2>

            {loading ? (
              <div className="spinner"><div className="spin-anim" />Loading bookings…</div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 px-4 text-(--tx3)">
                <i className="ti ti-calendar-off text-[48px] opacity-40" />
                <p className="text-[15px] mt-4">
                  No bookings yet.{" "}
                  <span className="text-(--p) cursor-pointer hover:underline" onClick={() => router.push("/appointments")}>
                    Find a doctor
                  </span>
                </p>
              </div>
            ) : (
              bookings.map(b => (
                <div key={b._id} className="bk-card">
                  {/* Doctor image */}
                  <div className="w-[54px] h-[54px] rounded-lg overflow-hidden flex-shrink-0 bg-(--p3)">
                    <Image
                      src={b.doctorImg || "https://i.pravatar.cc/100"}
                      alt={b.doctorName}
                      width={54}
                      height={54}
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-[Sora,sans-serif] text-[13.5px] font-bold text-(--tx) mb-0.5">{b.doctorName}</h4>
                    <p className="text-xs text-(--tx3)">{b.specialty} · {b.hospital}</p>
                    <p className="text-xs text-(--tx3)">{b.appointmentDate} · {b.appointmentTime} · Patient: {b.patientName}</p>
                  </div>

                  {/* Status badge */}
                  <span className={`font-[Sora,sans-serif] text-[10px] font-bold px-[10px] py-[3px] rounded-[5px] whitespace-nowrap ${b.status === "Upcoming" ? "status-up" : "status-done"}`}>
                    {b.status}
                  </span>

                  {/* Actions */}
                  <div className="flex flex-col gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEdit(b)}
                      className="font-[Sora,sans-serif] text-[11px] px-3 py-[5px] rounded-md border-[1.5px] border-(--p) text-(--p) bg-transparent cursor-pointer font-bold hover:bg-(--p) hover:text-white transition-colors duration-200"
                    >
                      <i className="ti ti-edit text-[11px]" /> Update
                    </button>
                    <button
                      onClick={() => handleDelete(b._id)}
                      className="font-[Sora,sans-serif] text-[11px] px-3 py-[5px] rounded-md border-[1.5px] border-(--red) text-(--red) bg-transparent cursor-pointer font-bold hover:bg-(--red) hover:text-white transition-colors duration-200"
                    >
                      <i className="ti ti-trash text-[11px]" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Profile tab */}
        {tab === "profile" && (
          <div>
            <h2 className="font-[Sora,sans-serif] text-xl font-extrabold text-(--tx) mb-[1.2rem]">
              My Profile
            </h2>
            <div className="bg-(--card) border border-(--card-bdr) rounded-2xl p-8 max-w-[340px] text-center shadow-(--shadow-sm)">
              {/* Avatar */}
              <div className="w-[84px] h-[84px] rounded-full bg-gradient-to-br from-(--p) to-(--acc) p-[3px] mx-auto mb-[0.85rem]">
                <div className="w-full h-full rounded-full bg-(--bg2) flex items-center justify-center font-[Sora,sans-serif] text-[28px] font-black text-(--p) overflow-hidden">
                  {displayImage
                    ? <Image src={displayImage} alt={displayName} width={78} height={78} className="object-cover rounded-full" />
                    : initials(displayName || "U")}
                </div>
              </div>
              <div className="font-[Sora,sans-serif] text-[18px] font-extrabold text-(--tx) mb-[3px]">{displayName}</div>
              <div className="text-[12.5px] text-(--tx3) mb-[1.3rem]">{user.email}</div>

              {/* Info rows */}
              {[
                { k: "Name",         v: displayName },
                { k: "Email",        v: user.email  },
                { k: "Member since", v: memberSince },
              ].map(r => (
                <div key={r.k} className="flex justify-between py-[9px] border-b border-(--bdr) text-[13.5px]">
                  <span className="text-(--tx3) font-medium">{r.k}</span>
                  <span className={`font-bold text-(--tx) font-[Sora,sans-serif] ${r.k === "Email" ? "text-xs" : ""}`}>{r.v}</span>
                </div>
              ))}

              <button
                onClick={openProfile}
                className="w-full flex items-center justify-center gap-2 py-[11px] rounded-lg bg-(--p) text-white text-sm font-bold mt-[1.2rem] hover:bg-(--p-dark) transition-colors duration-200 cursor-pointer"
              >
                <i className="ti ti-edit" />Update profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Update Booking Modal ── */}
      {editModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setEditModal(null)}>
          <div className="modal">
            <div className="flex justify-between items-center mb-[1.2rem]">
              <h3 className="font-[Sora,sans-serif] text-[17px] font-extrabold text-(--tx) flex items-center gap-2">
                <i className="ti ti-edit text-(--p) text-[17px]" />Update appointment
              </h3>
              {modalCloseBtn(() => setEditModal(null))}
            </div>

            <div className="grid grid-cols-2 gap-[0.8rem]">
              <div className="auth-field">
                <label>Doctor name</label>
                <input value={editModal.doctorName} readOnly className="opacity-70 cursor-not-allowed" />
              </div>
              <div className="auth-field">
                <label>Your email</label>
                <input value={editModal.userEmail} readOnly className="opacity-70 cursor-not-allowed" />
              </div>
              <div className="auth-field">
                <label>Patient name</label>
                <input value={editForm.patientName} onChange={e => setEditForm(p => ({ ...p, patientName: e.target.value }))} />
              </div>
              <div className="auth-field">
                <label>Gender</label>
                <select value={editForm.gender} onChange={e => setEditForm(p => ({ ...p, gender: e.target.value }))} className={selectClass}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="auth-field">
                <label>Phone number</label>
                <input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} />
              </div>
              <div className="auth-field">
                <label>Appointment date</label>
                <input type="date" value={editForm.appointmentDate} onChange={e => setEditForm(p => ({ ...p, appointmentDate: e.target.value }))} />
              </div>
              <div className="auth-field col-span-2">
                <label>Time slot</label>
                <select value={editForm.appointmentTime} onChange={e => setEditForm(p => ({ ...p, appointmentTime: e.target.value }))} className={selectClass}>
                  {["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"].map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-(--p) text-white text-sm font-bold mt-[0.8rem] hover:bg-(--p-dark) disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
              <i className="ti ti-device-floppy" />{saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}

      {/* ── Profile Modal ── */}
      {profileModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setProfileModal(false)}>
          <div className="modal">
            <div className="flex justify-between items-center mb-[1.2rem]">
              <h3 className="font-[Sora,sans-serif] text-[17px] font-extrabold text-(--tx) flex items-center gap-2">
                <i className="ti ti-user text-(--p) text-[17px]" />Update profile
              </h3>
              {modalCloseBtn(() => setProfileModal(false))}
            </div>

            {/* Full name */}
            <div className="auth-field mb-[0.75rem]">
              <label>Full name</label>
              <input value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
            </div>

            {/* Photo */}
            <div className="auth-field mb-[0.75rem]">
              <label>Profile photo</label>

              {/* Browse button */}
              <div
                role="button"
                onClick={() => photoInputRef.current?.click()}
                className="flex items-center justify-between gap-2.5 w-full min-h-[44px] px-[0.9rem] border border-(--bdr) rounded-lg bg-(--card) text-(--tx) cursor-pointer mb-2"
              >
                <span className={`flex-1 text-[13px] ${photoName ? "text-(--tx)" : "text-(--tx3)"}`}>
                  {photoName || "Click to browse image file"}
                </span>
                <span className="text-xs text-(--tx3)">Browse</span>
              </div>
              <input ref={photoInputRef} type="file" accept="image/*" aria-label="Choose profile photo" className="hidden" onChange={handlePhotoFile} />

              {/* OR divider */}
              <div className="flex items-center gap-2 my-2 text-[11px] text-(--tx3)">
                <div className="flex-1 h-px bg-(--bdr)" />or paste a URL<div className="flex-1 h-px bg-(--bdr)" />
              </div>

              {/* URL input */}
              <input
                value={photoName ? "" : profileForm.photo}
                onChange={e => {
                  setPhotoName("");
                  setPhotoPreview(e.target.value || null);
                  setProfileForm(p => ({ ...p, photo: e.target.value }));
                }}
                placeholder="https://example.com/photo.jpg"
                className={inputClass}
              />

              {/* Preview */}
              {photoPreview && (
                <div className="mt-3 w-[72px] h-[72px] rounded-full overflow-hidden border-2 border-(--bdr) mx-auto">
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <button
              onClick={handleProfileUpdate}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-(--p) text-white text-sm font-bold mt-[0.3rem] hover:bg-(--p-dark) disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 cursor-pointer"
            >
              <i className="ti ti-circle-check" />{saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}