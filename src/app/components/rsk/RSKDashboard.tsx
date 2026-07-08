import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, Clock, AlertTriangle, CheckCircle, Phone } from "lucide-react";

const stats = [
  { label: "Pending Cases", value: "23", icon: "⏳", color: "#FB8C00", bg: "#FFF3E0", trend: "+3 today" },
  { label: "Active Cases", value: "8", icon: "🔵", color: "#1976D2", bg: "#E3F2FD", trend: "2 urgent" },
  { label: "Critical Alerts", value: "4", icon: "🚨", color: "#D32F2F", bg: "#FFEBEE", trend: "↑ High" },
  { label: "Resolved Today", value: "12", icon: "✅", color: "#2E7D32", bg: "#E8F5E9", trend: "+4 vs avg" },
  { label: "Farmers Assisted", value: "156", icon: "👨‍🌾", color: "#6A1B9A", bg: "#F3E5F5", trend: "This week" },
  { label: "Avg. Resolution", value: "2.3h", icon: "⚡", color: "#00838F", bg: "#E0F7FA", trend: "-0.5h avg" },
];

const recentEscalations = [
  { id: "KB-001", name: "Raju Reddy", village: "Miryalaguda", crop: "Cotton", problem: "Leaf Curl Disease", priority: "Critical", time: "10 min ago", confidence: 72 },
  { id: "KB-002", name: "Lakshmi Bai", village: "Suryapet", crop: "Paddy", problem: "Blast Disease", priority: "High", time: "45 min ago", confidence: 81 },
  { id: "KB-003", name: "Venkat Rao", village: "Karimnagar", crop: "Maize", problem: "Stem Borer Infestation", priority: "Medium", time: "2h ago", confidence: 68 },
];

const quickActions = [
  { icon: "📞", label: "Call Farmer", color: "#2E7D32", bg: "#E8F5E9" },
  { icon: "📋", label: "New Case", color: "#1976D2", bg: "#E3F2FD" },
  { icon: "🚗", label: "Schedule Visit", color: "#6A1B9A", bg: "#F3E5F5" },
  { icon: "📤", label: "Forward Case", color: "#FB8C00", bg: "#FFF3E0" },
];

const priorityColor: Record<string, { color: string; bg: string }> = {
  Critical: { color: "#D32F2F", bg: "#FFEBEE" },
  High: { color: "#FB8C00", bg: "#FFF3E0" },
  Medium: { color: "#1976D2", bg: "#E3F2FD" },
  Low: { color: "#2E7D32", bg: "#E8F5E9" },
};

export function RSKDashboard() {
  const navigate = useNavigate();

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%" }}>
      {/* Officer greeting */}
      <div
        className="px-5 pt-4 pb-5"
        style={{
          background: "linear-gradient(145deg, #BF360C 0%, #E65100 80%, #FB8C00 100%)",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
      >
        <div
          className="absolute top-0 right-0 rounded-full opacity-10"
          style={{ width: "120px", height: "120px", background: "white", top: "-20px", right: "-20px", position: "relative" }}
        />
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)" }}>Good Morning 🌅</p>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
          K. Srinivas Rao
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>RSK Officer • Nalgonda District</p>

        <div className="flex gap-3 mt-4">
          {[
            { label: "Villages", value: "12" },
            { label: "Open Cases", value: "31" },
            { label: "Solved", value: "168" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex-1 rounded-2xl py-2 px-3 text-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>{s.value}</p>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Stats grid */}
        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "#212121", marginBottom: "10px" }}>
          Today's Overview
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-3"
              style={{ background: "white", boxShadow: "0 3px 10px rgba(0,0,0,0.07)", border: `1px solid ${s.color}15` }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="rounded-xl flex items-center justify-center" style={{ width: "30px", height: "30px", background: s.bg, fontSize: "14px" }}>
                  {s.icon}
                </div>
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {s.value}
              </p>
              <p style={{ fontSize: "10px", color: "#616161", marginTop: "2px", lineHeight: 1.3 }}>{s.label}</p>
              <p style={{ fontSize: "9px", color: s.color, marginTop: "2px", fontWeight: 600 }}>{s.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-5">
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "#212121", marginBottom: "10px" }}>
            Quick Actions
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {quickActions.map((a, i) => (
              <button
                key={i}
                className="flex flex-col items-center gap-2"
                style={{ background: "transparent", border: "none" }}
              >
                <div className="rounded-2xl flex items-center justify-center" style={{ width: "52px", height: "52px", background: a.bg, fontSize: "22px", boxShadow: "0 3px 10px rgba(0,0,0,0.07)" }}>
                  {a.icon}
                </div>
                <span style={{ fontSize: "10px", color: "#616161", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Escalations */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "#212121" }}>Recent Escalations</h3>
            <button onClick={() => navigate("/rsk/app/cases")} style={{ fontSize: "12px", color: "#E65100", fontWeight: 600, background: "none", border: "none" }}>
              See All
            </button>
          </div>

          {recentEscalations.map((c, i) => {
            const pc = priorityColor[c.priority];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="rounded-2xl p-3 mb-3"
                style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)", border: "1px solid #F5F5F5" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="rounded-xl flex items-center justify-center" style={{ width: "36px", height: "36px", background: "#FFF3E0", fontSize: "16px" }}>
                      🌾
                    </div>
                    <div>
                      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 700, color: "#212121" }}>{c.name}</p>
                      <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{c.village} • {c.crop}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full" style={{ background: pc.bg, color: pc.color, fontSize: "9px", fontWeight: 700 }}>
                    {c.priority}
                  </span>
                </div>
                <p style={{ fontSize: "12px", color: "#424242", marginBottom: "8px" }}>{c.problem}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Clock size={11} color="#9E9E9E" />
                    <span style={{ fontSize: "11px", color: "#9E9E9E" }}>{c.time}</span>
                    <span style={{ fontSize: "11px", color: "#9E9E9E", marginLeft: "6px" }}>AI: {c.confidence}%</span>
                  </div>
                  <button
                    onClick={() => navigate("/rsk/app/case/1")}
                    className="flex items-center gap-1 px-3 py-1 rounded-xl"
                    style={{ background: "#FBE9E7", border: "none", color: "#E65100", fontSize: "11px", fontWeight: 600 }}
                  >
                    View <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disease Alerts */}
        <div className="mb-5">
          <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "#212121", marginBottom: "10px" }}>
            Disease Outbreak Alerts
          </h3>
          {[
            { disease: "Paddy Blast", villages: "Suryapet, Nalgonda", cases: 8, color: "#D32F2F", bg: "#FFEBEE" },
            { disease: "Cotton Leaf Curl", villages: "Miryalaguda, Huzurnagar", cases: 5, color: "#FB8C00", bg: "#FFF3E0" },
          ].map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-2xl mb-2"
              style={{ background: d.bg, border: `1px solid ${d.color}25` }}
            >
              <div className="rounded-xl flex items-center justify-center" style={{ width: "40px", height: "40px", background: `${d.color}18`, fontSize: "18px" }}>
                🦠
              </div>
              <div className="flex-1">
                <p style={{ fontSize: "13px", fontWeight: 700, color: d.color }}>{d.disease}</p>
                <p style={{ fontSize: "11px", color: "#616161" }}>{d.villages}</p>
              </div>
              <div className="text-center">
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: d.color }}>{d.cases}</p>
                <p style={{ fontSize: "9px", color: "#9E9E9E" }}>cases</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
