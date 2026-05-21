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

export default function DashboardClient() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [profileModal, setProfileModal] = useState(false);
  const [editForm, setEditForm] = useState({ patientName: "", gender: "", phone: "", appointmentDate: "", appointmentTime: "" });
  const [profileForm, setProfileForm] = useState({ name: "", photo: "" });
  const [saving, setSaving] = useState(false);
  const [photoName, setPhotoName] = useState(""); 
  const [photoPreview, setPhotoPreview] = useState(null); 
  const photoInputRef = useRef(null);

  const [localUser, setLocalUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("da_profile");
    return saved ? JSON.parse(saved) : null;
  });

  const jwtIssued = useRef(false);
  const user = session?.user;

  const displayName = localUser?.name ?? user?.name ?? "";
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

  return (
<div style={{ display: "flex", minHeight: "calc(100vh - 66px)", paddingTop: "1rem" }} className="dash-layout-resp">
      {/* Sidebar */}
      <div className="sidebar" style={{ paddingTop: "3rem" }}>
        <div style={{ textAlign: "center", paddingBottom: "1.1rem", marginBottom: "0.9rem", borderBottom: "1px solid var(--bdr)" }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "var(--grad-acc)", padding: 3, margin: "0 auto 0.65rem" }}>
            <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--p)", overflow: "hidden" }}>
              {displayImage ? <Image src={displayImage} alt={displayName} width={54} height={54} style={{ objectFit: "cover", borderRadius: "50%" }} /> : initials(displayName || "U")}
            </div>
          </div>
          <div style={{ fontFamily: "Sora, sans-serif", fontSize: 13, fontWeight: 700, color: "var(--tx)", marginBottom: 2 }}>{displayName}</div>
          <div style={{ fontSize: 11, color: "var(--tx3)", wordBreak: "break-all" }}>{user.email}</div>
        </div>
        {[
          { id: "bookings", icon: "ti-calendar", label: "My Bookings" },
          { id: "profile", icon: "ti-user", label: "My Profile" },
        ].map(l => (
          <div key={l.id} onClick={() => setTab(l.id)} className={`sb-link${tab === l.id ? " on" : ""}`}>
            <i className={`ti ${l.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />{l.label}
          </div>
        ))}
      </div>

      {/* Main */}
<div style={{ flex: 1, padding: "1.8rem 2rem", paddingTop: "3rem", background: "var(--bg)", minWidth: 0, overflowAuto: "auto" }}>
        {tab === "bookings" && (
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tx)", marginBottom: "1.2rem" }}>My Bookings</h2>
            {loading ? (
              <div className="spinner"><div className="spin-anim" />Loading bookings…</div>
            ) : bookings.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--tx3)" }}>
                <i className="ti ti-calendar-off" style={{ fontSize: 48, opacity: 0.4 }} />
                <p style={{ fontSize: 15, marginTop: "1rem" }}>No bookings yet. <span style={{ color: "var(--p)", cursor: "pointer" }} onClick={() => router.push("/appointments")}>Find a doctor</span></p>
              </div>
            ) : (
              bookings.map(b => (
                <div key={b._id} className="bk-card">
                  <div style={{ width: 54, height: 54, borderRadius: "var(--r-md)", overflow: "hidden", flexShrink: 0, background: "var(--p3)" }}>
                    <Image src={b.doctorImg || "https://i.pravatar.cc/100"} alt={b.doctorName} width={54} height={54} style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontFamily: "Sora, sans-serif", fontSize: 13.5, fontWeight: 700, color: "var(--tx)", marginBottom: 2 }}>{b.doctorName}</h4>
                    <p style={{ fontSize: 12, color: "var(--tx3)" }}>{b.specialty} · {b.hospital}</p>
                    <p style={{ fontSize: 12, color: "var(--tx3)" }}>{b.appointmentDate} · {b.appointmentTime} · Patient: {b.patientName}</p>
                  </div>
                  <span style={{ fontFamily: "Sora, sans-serif", fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 5, whiteSpace: "nowrap" }} className={b.status === "Upcoming" ? "status-up" : "status-done"}>{b.status}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                    <button onClick={() => openEdit(b)} style={{ fontFamily: "Sora, sans-serif", fontSize: 11, padding: "5px 12px", borderRadius: 6, border: "1.5px solid var(--p)", color: "var(--p)", background: "transparent", cursor: "pointer", fontWeight: 700 }}
                      onMouseEnter={e => { e.currentTarget.style.background = "var(--p)"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--p)"; }}>
                      <i className="ti ti-edit" style={{ fontSize: 11 }} /> Update
                    </button>
                    <button onClick={() => handleDelete(b._id)} style={{ fontFamily: "Sora, sans-serif", fontSize: 11, padding: "5px 12px", borderRadius: 6, border: "1.5px solid var(--red)", color: "var(--red)", background: "transparent", cursor: "pointer", fontWeight: 700 }}>
                      <i className="ti ti-trash" style={{ fontSize: 11 }} /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "profile" && (
          <div>
            <h2 style={{ fontFamily: "Sora, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--tx)", marginBottom: "1.2rem" }}>My Profile</h2>
            <div style={{ background: "var(--card)", border: "1px solid var(--card-bdr)", borderRadius: "var(--r-xl)", padding: "2rem", maxWidth: 340, textAlign: "center", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ width: 84, height: 84, borderRadius: "50%", background: "var(--grad-acc)", padding: 3, margin: "0 auto 0.85rem" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Sora, sans-serif", fontSize: 28, fontWeight: 900, color: "var(--p)", overflow: "hidden" }}>
                  {displayImage ? <Image src={displayImage} alt={displayName} width={78} height={78} style={{ objectFit: "cover", borderRadius: "50%" }} /> : initials(displayName || "U")}
                </div>
              </div>
              <div style={{ fontFamily: "Sora, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--tx)", marginBottom: 3 }}>{displayName}</div>
              <div style={{ fontSize: 12.5, color: "var(--tx3)", marginBottom: "1.3rem" }}>{user.email}</div>
              {[{ k: "Name", v: displayName }, { k: "Email", v: user.email }, { k: "Member since", v: memberSince }].map(r => (
                <div key={r.k} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--bdr)", fontSize: 13.5 }}>
                  <span style={{ color: "var(--tx3)", fontWeight: 500 }}>{r.k}</span>
                  <span style={{ fontWeight: 700, color: "var(--tx)", fontFamily: "Sora, sans-serif", fontSize: r.k === "Email" ? 12 : undefined }}>{r.v}</span>
                </div>
              ))}
              <button onClick={openProfile} className="btn btn-primary" style={{ width: "100%", marginTop: "1.2rem", padding: 11 }}>
                <i className="ti ti-edit" />Update profile
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Update Booking Modal */}
      {editModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setEditModal(null)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--tx)", display: "flex", alignItems: "center", gap: 8 }}>
                <i className="ti ti-edit" style={{ color: "var(--p)", fontSize: 17 }} />Update appointment
              </h3>
              <button onClick={() => setEditModal(null)} style={{ width: 32, height: 32, borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx3)" }}><i className="ti ti-x" /></button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <div className="auth-field"><label>Doctor name</label><input value={editModal.doctorName} readOnly style={{ opacity: 0.7, cursor: "not-allowed" }} /></div>
              <div className="auth-field"><label>Your email</label><input value={editModal.userEmail} readOnly style={{ opacity: 0.7, cursor: "not-allowed" }} /></div>
              <div className="auth-field"><label>Patient name</label><input value={editForm.patientName} onChange={e => setEditForm(p => ({ ...p, patientName: e.target.value }))} /></div>
              <div className="auth-field">
                <label>Gender</label>
                <select value={editForm.gender} onChange={e => setEditForm(p => ({ ...p, gender: e.target.value }))} style={{ fontSize: 13.5, padding: "11px 13px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--bg3)", color: "var(--tx)", outline: "none", width: "100%" }}>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div className="auth-field"><label>Phone number</label><input value={editForm.phone} onChange={e => setEditForm(p => ({ ...p, phone: e.target.value }))} /></div>
              <div className="auth-field"><label>Appointment date</label><input type="date" value={editForm.appointmentDate} onChange={e => setEditForm(p => ({ ...p, appointmentDate: e.target.value }))} /></div>
              <div className="auth-field" style={{ gridColumn: "1/-1" }}>
                <label>Time slot</label>
                <select value={editForm.appointmentTime} onChange={e => setEditForm(p => ({ ...p, appointmentTime: e.target.value }))} style={{ fontSize: 13.5, padding: "11px 13px", borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "var(--bg3)", color: "var(--tx)", outline: "none", width: "100%" }}>
                  {["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM","08:00 PM"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleUpdate} disabled={saving} className="btn btn-primary" style={{ width: "100%", padding: 12, fontSize: 14, fontWeight: 700, marginTop: "0.8rem" }}>
              <i className="ti ti-device-floppy" />{saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setProfileModal(false)}>
          <div className="modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
              <h3 style={{ fontFamily: "Sora, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--tx)", display: "flex", alignItems: "center", gap: 8 }}>
                <i className="ti ti-user" style={{ color: "var(--p)", fontSize: 17 }} />Update profile
              </h3>
              <button onClick={() => setProfileModal(false)} style={{ width: 32, height: 32, borderRadius: "var(--r-md)", border: "1.5px solid var(--bdr)", background: "transparent", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--tx3)" }}><i className="ti ti-x" /></button>
            </div>

            <div className="auth-field" style={{ marginBottom: "0.75rem" }}>
              <label>Full name</label>
              <input value={profileForm.name} onChange={e => setProfileForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
            </div>

            <div className="auth-field" style={{ marginBottom: "0.75rem" }}>
              <label>Profile photo</label>
              <div
                role="button"
                onClick={() => photoInputRef.current?.click()}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, width: "100%", minHeight: 44, padding: "0 0.9rem", border: "1px solid var(--bdr)", borderRadius: "var(--r-sm)", background: "var(--card)", color: "var(--tx)", cursor: "pointer", marginBottom: "0.5rem" }}
              >
                <span style={{ flex: 1, fontSize: 13, color: photoName ? "var(--tx)" : "var(--tx3)" }}>
                  {photoName || "Click to browse image file"}
                </span>
                <span style={{ fontSize: 12, color: "var(--tx3)" }}>Browse</span>
              </div>
              <input ref={photoInputRef} type="file" accept="image/*" aria-label="Choose profile photo" style={{ display: "none" }} onChange={handlePhotoFile} />

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.5rem 0", fontSize: 11, color: "var(--tx3)" }}>
                <div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />or paste a URL<div style={{ flex: 1, height: 1, background: "var(--bdr)" }} />
              </div>

              <input
                value={photoName ? "" : profileForm.photo}
                onChange={e => {
                  setPhotoName("");
                  setPhotoPreview(e.target.value || null);
                  setProfileForm(p => ({ ...p, photo: e.target.value }));
                }}
                placeholder="https://example.com/photo.jpg"
                style={{ width: "100%", fontSize: 13, padding: "10px 13px", borderRadius: "var(--r-sm)", border: "1px solid var(--bdr)", background: "var(--card)", color: "var(--tx)", outline: "none" }}
              />

              {photoPreview && (
                <div style={{ marginTop: "0.75rem", width: 72, height: 72, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--bdr)", margin: "0.75rem auto 0" }}>
                  <img src={photoPreview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
            </div>

            <button onClick={handleProfileUpdate} disabled={saving} className="btn btn-primary" style={{ width: "100%", padding: 12, fontSize: 14, marginTop: "0.3rem" }}>
              <i className="ti ti-circle-check" />{saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){.dash-layout-resp{flex-direction:column!important;}}
      `}</style>
    </div>
  );
}