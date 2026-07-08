import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Search, Filter, ChevronRight, Phone, Clock } from "lucide-react";

type Priority = "All" | "Critical" | "High" | "Medium" | "Low";

const cases = [
  { id: "KB-2024-001", name: "Raju Reddy", village: "Miryalaguda", district: "Nalgonda", crop: "Cotton", problem: "Leaf Curl Disease", priority: "Critical" as const, status: "Pending", time: "10 min ago", confidence: 72, phone: "+91 98760 12345" },
  { id: "KB-2024-002", name: "Lakshmi Bai", village: "Suryapet", district: "Suryapet", crop: "Paddy", problem: "Blast Disease", priority: "High" as const, status: "Active", time: "45 min ago", confidence: 81, phone: "+91 90083 45678" },
  { id: "KB-2024-003", name: "Venkat Rao", village: "Karimnagar", district: "Karimnagar", crop: "Maize", problem: "Stem Borer Infestation", priority: "Medium" as const, status: "Active", time: "2h ago", confidence: 68, phone: "+91 87654 32100" },
  { id: "KB-2024-004", name: "Savitri Devi", village: "Armoor", district: "Nizamabad", crop: "Turmeric", problem: "Rhizome Rot Disease", priority: "High" as const, status: "Pending", time: "3h ago", confidence: 77, phone: "+91 97653 21098" },
  { id: "KB-2024-005", name: "Ramesh Kumar", village: "Medak", district: "Medak", crop: "Soybean", problem: "Yellow Mosaic Virus", priority: "Low" as const, status: "Resolved", time: "1d ago", confidence: 91, phone: "+91 86543 10987" },
  { id: "KB-2024-006", name: "Annapurna", village: "Adilabad", district: "Adilabad", crop: "Cotton", problem: "Wilt Disease", priority: "Critical" as const, status: "Pending", time: "5h ago", confidence: 65, phone: "+91 95432 09876" },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  Critical: { color: "#D32F2F", bg: "#FFEBEE" },
  High: { color: "#FB8C00", bg: "#FFF3E0" },
  Medium: { color: "#1976D2", bg: "#E3F2FD" },
  Low: { color: "#2E7D32", bg: "#E8F5E9" },
};

const statusConfig: Record<string, { color: string; bg: string }> = {
  Pending: { color: "#FB8C00", bg: "#FFF3E0" },
  Active: { color: "#1976D2", bg: "#E3F2FD" },
  Resolved: { color: "#2E7D32", bg: "#E8F5E9" },
};

export function EscalatedCases() {
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState<Priority>("All");
  const navigate = useNavigate();

  const priorities: Priority[] = ["All", "Critical", "High", "Medium", "Low"];

  const filtered = cases.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.village.toLowerCase().includes(search.toLowerCase()) ||
      c.crop.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priority === "All" || c.priority === priority;
    return matchSearch && matchPriority;
  });

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "3px" }}>
          Escalated Cases
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>
          {cases.filter(c => c.status === "Pending").length} pending • {cases.filter(c => c.status === "Active").length} active
        </p>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 rounded-2xl" style={{ background: "white", height: "44px" }}>
          <Search size={16} color="#9E9E9E" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, village, crop..."
            style={{ border: "none", outline: "none", background: "transparent", fontSize: "13px", color: "#212121", flex: 1, fontFamily: "Inter, sans-serif" }}
          />
          <Filter size={16} color="#E65100" />
        </div>
      </div>

      <div className="px-4 pt-3">
        {/* Priority filter chips */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {priorities.map((p) => (
            <button
              key={p}
              onClick={() => setPriority(p)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full"
              style={{
                background: priority === p ? (p === "All" ? "#E65100" : priorityConfig[p]?.color || "#E65100") : "white",
                color: priority === p ? "white" : "#616161",
                border: priority === p ? "none" : "1.5px solid #E0E0E0",
                fontSize: "11px",
                fontWeight: priority === p ? 600 : 400,
                boxShadow: priority === p ? "0 3px 8px rgba(0,0,0,0.15)" : "none",
              }}
            >
              {p}
              {p !== "All" && (
                <span style={{ marginLeft: "4px", opacity: 0.8 }}>
                  ({cases.filter(c => c.priority === p).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Case count */}
        <p style={{ fontSize: "12px", color: "#9E9E9E", marginBottom: "10px" }}>
          Showing {filtered.length} of {cases.length} cases
        </p>

        {/* Cases list */}
        <AnimatePresence>
          {filtered.map((c, i) => {
            const pc = priorityConfig[c.priority];
            const sc = statusConfig[c.status];
            return (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-3xl p-4 mb-3"
                style={{ background: "white", boxShadow: "0 3px 14px rgba(0,0,0,0.08)", border: `1px solid ${pc.color}18` }}
              >
                {/* Case header */}
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl flex items-center justify-center" style={{ width: "40px", height: "40px", background: "#FFF3E0", fontSize: "18px" }}>
                      🌾
                    </div>
                    <div>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121" }}>{c.name}</p>
                      <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{c.village}, {c.district}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded-full" style={{ background: pc.bg, color: pc.color, fontSize: "9px", fontWeight: 700 }}>
                      {c.priority}
                    </span>
                    <span className="px-2 py-0.5 rounded-full" style={{ background: sc.bg, color: sc.color, fontSize: "9px", fontWeight: 600 }}>
                      {c.status}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-0.5 rounded-full" style={{ background: "#F5F5F5", color: "#616161", fontSize: "10px" }}>
                    🌿 {c.crop}
                  </span>
                  <span className="px-2 py-0.5 rounded-full" style={{ background: "#F5F5F5", color: "#616161", fontSize: "10px" }}>
                    #{c.id}
                  </span>
                </div>

                <p style={{ fontSize: "12px", color: "#424242", marginBottom: "8px", fontWeight: 500 }}>{c.problem}</p>

                {/* AI confidence bar */}
                <div className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: "10px", color: "#9E9E9E" }}>AI Confidence</span>
                    <span style={{ fontSize: "10px", fontWeight: 600, color: c.confidence >= 80 ? "#2E7D32" : c.confidence >= 65 ? "#FB8C00" : "#D32F2F" }}>
                      {c.confidence}%
                    </span>
                  </div>
                  <div className="rounded-full overflow-hidden" style={{ height: "4px", background: "#F5F5F5" }}>
                    <div
                      style={{
                        width: `${c.confidence}%`,
                        height: "100%",
                        borderRadius: "2px",
                        background: c.confidence >= 80 ? "#4CAF50" : c.confidence >= 65 ? "#FB8C00" : "#D32F2F",
                      }}
                    />
                  </div>
                </div>

                {/* Time + Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock size={11} color="#BDBDBD" />
                    <span style={{ fontSize: "10px", color: "#BDBDBD" }}>{c.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 px-2 py-1.5 rounded-xl"
                      style={{ background: "#E8F5E9", border: "none", color: "#2E7D32", fontSize: "11px", fontWeight: 600 }}
                    >
                      <Phone size={11} /> Call
                    </button>
                    <button
                      onClick={() => navigate("/rsk/app/case/1")}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl"
                      style={{ background: "#FBE9E7", border: "none", color: "#E65100", fontSize: "11px", fontWeight: 600 }}
                    >
                      View <ChevronRight size={11} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span style={{ fontSize: "48px", marginBottom: "12px" }}>📭</span>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, color: "#9E9E9E" }}>No cases found</p>
            <p style={{ fontSize: "13px", color: "#BDBDBD", marginTop: "4px" }}>Try a different search or filter</p>
          </div>
        )}

        <div style={{ height: "8px" }} />
      </div>
    </div>
  );
}
