import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Phone, MessageCircle, ChevronRight } from "lucide-react";

const farmers = [
  { id: "KB-F-001", name: "Raju Reddy", village: "Miryalaguda", district: "Nalgonda", crops: ["Cotton", "Paddy"], openCases: 1, visits: 2, status: "Active", phone: "+91 98760 12345", size: "3.5 acres", emoji: "👨‍🌾" },
  { id: "KB-F-002", name: "Lakshmi Bai", village: "Suryapet", district: "Suryapet", crops: ["Paddy"], openCases: 1, visits: 1, status: "Active", phone: "+91 90083 45678", size: "2.0 acres", emoji: "👩‍🌾" },
  { id: "KB-F-003", name: "Venkat Rao", village: "Karimnagar", district: "Karimnagar", crops: ["Maize", "Soybean"], openCases: 0, visits: 3, status: "Resolved", phone: "+91 87654 32100", size: "4.2 acres", emoji: "👨‍🌾" },
  { id: "KB-F-004", name: "Savitri Devi", village: "Armoor", district: "Nizamabad", crops: ["Turmeric"], openCases: 1, visits: 0, status: "Pending", phone: "+91 97653 21098", size: "1.8 acres", emoji: "👩‍🌾" },
  { id: "KB-F-005", name: "Ramesh Kumar", village: "Medak", district: "Medak", crops: ["Soybean", "Wheat"], openCases: 0, visits: 4, status: "Resolved", phone: "+91 86543 10987", size: "5.1 acres", emoji: "👨‍🌾" },
  { id: "KB-F-006", name: "Annapurna", village: "Adilabad", district: "Adilabad", crops: ["Cotton"], openCases: 1, visits: 1, status: "Critical", phone: "+91 95432 09876", size: "2.8 acres", emoji: "👩‍🌾" },
];

const statusConfig: Record<string, { color: string; bg: string }> = {
  Active: { color: "#1976D2", bg: "#E3F2FD" },
  Resolved: { color: "#2E7D32", bg: "#E8F5E9" },
  Pending: { color: "#FB8C00", bg: "#FFF3E0" },
  Critical: { color: "#D32F2F", bg: "#FFEBEE" },
};

export function FarmerDirectory() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof farmers[0] | null>(null);

  const filtered = farmers.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.village.toLowerCase().includes(search.toLowerCase()) ||
    f.district.toLowerCase().includes(search.toLowerCase()) ||
    f.crops.some((c) => c.toLowerCase().includes(search.toLowerCase()))
  );

  if (selected) {
    const sc = statusConfig[selected.status];
    return (
      <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
        {/* Farmer profile header */}
        <div
          className="px-4 pt-4 pb-6"
          style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
        >
          <button onClick={() => setSelected(null)} className="flex items-center gap-2 mb-4" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.85)", fontSize: "13px" }}>
            ← Back to Directory
          </button>
          <div className="flex items-center gap-4">
            <div className="rounded-2xl flex items-center justify-center" style={{ width: "60px", height: "60px", background: "rgba(255,255,255,0.2)", fontSize: "28px" }}>{selected.emoji}</div>
            <div>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>{selected.name}</h1>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>{selected.village}, {selected.district}</p>
              <span className="inline-block px-2 py-0.5 rounded-full mt-1" style={{ background: "rgba(255,255,255,0.2)", fontSize: "10px", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>{selected.status}</span>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4">
          {/* Quick actions */}
          <div className="flex gap-3 mb-4">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3" style={{ background: "#E8F5E9", border: "none", color: "#2E7D32", fontSize: "13px", fontWeight: 600 }}>
              <Phone size={16} /> Call
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3" style={{ background: "#E3F2FD", border: "none", color: "#1976D2", fontSize: "13px", fontWeight: 600 }}>
              <MessageCircle size={16} /> Chat
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 rounded-2xl py-3" style={{ background: "#FBE9E7", border: "none", color: "#E65100", fontSize: "13px", fontWeight: 600 }}>
              🗓️ Visit
            </button>
          </div>

          {/* Details card */}
          <div className="rounded-3xl p-4 mb-3" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
            {[
              ["📞", "Phone", selected.phone],
              ["🌾", "Farm Size", selected.size],
              ["🌿", "Crops", selected.crops.join(", ")],
              ["📋", "Open Cases", `${selected.openCases}`],
              ["🚗", "Officer Visits", `${selected.visits} visits`],
              ["🪪", "Farmer ID", selected.id],
            ].map(([icon, label, val], i) => (
              <div key={i} className="flex items-center justify-between py-2.5" style={{ borderBottom: i < 5 ? "1px solid #F8FAF5" : "none" }}>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "14px" }}>{icon}</span>
                  <span style={{ fontSize: "12px", color: "#9E9E9E" }}>{label}</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 500, color: "#212121" }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Previous cases */}
          <div className="rounded-3xl p-4" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121", marginBottom: "10px" }}>Case History</p>
            {[
              { id: "KB-2024-001", problem: "Leaf Curl Disease", date: "Jul 8, 2026", status: "Active" },
              { id: "KB-2023-089", problem: "Aphid Infestation", date: "Nov 12, 2023", status: "Resolved" },
            ].map((c, i) => {
              const cs = statusConfig[c.status];
              return (
                <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 1 ? "1px solid #F8FAF5" : "none" }}>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#212121" }}>{c.problem}</p>
                    <p style={{ fontSize: "10px", color: "#9E9E9E" }}>{c.id} • {c.date}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{ background: cs.bg, color: cs.color, fontSize: "9px", fontWeight: 700 }}>{c.status}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "3px" }}>Farmer Directory</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>{farmers.length} farmers in your area</p>
        <div className="flex items-center gap-2 px-3 rounded-2xl" style={{ background: "white", height: "44px" }}>
          <Search size={16} color="#9E9E9E" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, village, crop..."
            style={{ border: "none", outline: "none", background: "transparent", fontSize: "13px", color: "#212121", flex: 1, fontFamily: "Inter, sans-serif" }}
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        <AnimatePresence>
          {filtered.map((f, i) => {
            const sc = statusConfig[f.status];
            return (
              <motion.div
                key={f.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-3xl p-4 mb-3"
                style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)", border: "1px solid #F5F5F5" }}
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl flex items-center justify-center" style={{ width: "48px", height: "48px", background: "#FBE9E7", fontSize: "22px", flexShrink: 0 }}>
                    {f.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121" }}>{f.name}</p>
                      <span className="px-1.5 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color, fontSize: "9px", fontWeight: 700 }}>{f.status}</span>
                    </div>
                    <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{f.village} • {f.crops.join(", ")}</p>
                    <div className="flex gap-3 mt-1">
                      {f.openCases > 0 && (
                        <span style={{ fontSize: "10px", color: "#D32F2F", fontWeight: 600 }}>⚠ {f.openCases} open case</span>
                      )}
                      <span style={{ fontSize: "10px", color: "#9E9E9E" }}>🚗 {f.visits} visits</span>
                      <span style={{ fontSize: "10px", color: "#9E9E9E" }}>{f.size}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <button className="flex items-center justify-center rounded-xl" style={{ width: "34px", height: "34px", background: "#E8F5E9", border: "none" }}>
                      <Phone size={15} color="#2E7D32" />
                    </button>
                    <button onClick={() => setSelected(f)} className="flex items-center justify-center rounded-xl" style={{ width: "34px", height: "34px", background: "#FBE9E7", border: "none" }}>
                      <ChevronRight size={15} color="#E65100" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div style={{ height: "8px" }} />
      </div>
    </div>
  );
}
