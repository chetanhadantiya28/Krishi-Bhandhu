import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const categories = ["All", "Disease", "Weather", "Scheme", "Pest"];

const alerts = [
  {
    id: 1, type: "disease", icon: "🦠", color: "#D32F2F", bg: "#FFEBEE",
    title: "Paddy Blast Outbreak", titleSub: "8 cases in Suryapet cluster",
    desc: "Confirmed Magnaporthe oryzae in 4 villages. Immediate spray advisory issued. Spray Tricyclazole 75 WP.",
    priority: "Critical", time: "30 min ago", badge: "Disease",
  },
  {
    id: 2, type: "weather", icon: "🌧️", color: "#1565C0", bg: "#E3F2FD",
    title: "Heavy Rainfall Warning", titleSub: "IMD Orange Alert",
    desc: "72-hour heavy rain forecast for Nalgonda district. Advise farmers to defer spray operations. Check drainage.",
    priority: "High", time: "2h ago", badge: "Weather",
  },
  {
    id: 3, type: "scheme", icon: "🏛️", color: "#2E7D32", bg: "#E8F5E9",
    title: "PM-KISAN 18th Installment", titleSub: "₹2,000 disbursed",
    desc: "18th installment released. 1,234 farmers in your area are eligible. Assist farmers in eKYC verification.",
    priority: "Medium", time: "1d ago", badge: "Scheme",
  },
  {
    id: 4, type: "pest", icon: "🐛", color: "#E65100", bg: "#FBE9E7",
    title: "Fall Armyworm in Maize", titleSub: "Spotted in Karimnagar",
    desc: "FAW identified in 3 maize fields. Recommend Spinetoram 11.7 SC. Alert nearby farmers immediately.",
    priority: "High", time: "3h ago", badge: "Pest",
  },
  {
    id: 5, type: "weather", icon: "🌡️", color: "#FB8C00", bg: "#FFF3E0",
    title: "Heatwave Advisory", titleSub: "Temperature > 40°C",
    desc: "Heatwave conditions for next 5 days. Advise morning irrigation only. Avoid field work 11AM–4PM.",
    priority: "Medium", time: "6h ago", badge: "Weather",
  },
  {
    id: 6, type: "scheme", icon: "💰", color: "#6A1B9A", bg: "#F3E5F5",
    title: "Fasal Bima Enrollment", titleSub: "Deadline: July 31",
    desc: "Last date for Kharif 2026 crop insurance. Assist farmers in enrollment at nearest CSC or via app.",
    priority: "Low", time: "2d ago", badge: "Scheme",
  },
];

const priorityConfig: Record<string, { color: string; bg: string }> = {
  Critical: { color: "#D32F2F", bg: "#FFEBEE" },
  High: { color: "#FB8C00", bg: "#FFF3E0" },
  Medium: { color: "#1976D2", bg: "#E3F2FD" },
  Low: { color: "#2E7D32", bg: "#E8F5E9" },
};

export function RSKAlerts() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? alerts : alerts.filter((a) => a.badge === active);

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "3px" }}>
          Government Alerts
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "12px" }}>
          {alerts.filter((a) => a.priority === "Critical").length} critical • {alerts.filter((a) => a.priority === "High").length} high priority
        </p>

        {/* Weather snapshot */}
        <div className="rounded-2xl p-3 flex items-center gap-3" style={{ background: "rgba(255,255,255,0.14)" }}>
          <span style={{ fontSize: "28px" }}>⛅</span>
          <div className="flex-1">
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>34°C</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>Nalgonda • Partly Cloudy • Rain 65%</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>Humidity: 72%</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>Wind: 14 km/h</p>
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="flex-shrink-0 px-4 py-2 rounded-full"
            style={{
              background: active === cat ? "#E65100" : "white",
              color: active === cat ? "white" : "#616161",
              border: active === cat ? "none" : "1.5px solid #E0E0E0",
              fontSize: "12px",
              fontWeight: active === cat ? 600 : 400,
              boxShadow: active === cat ? "0 3px 8px rgba(230,81,0,0.3)" : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((alert, i) => {
            const pc = priorityConfig[alert.priority];
            return (
              <motion.div
                key={alert.id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-3xl p-4 mb-3"
                style={{
                  background: "white",
                  border: `1.5px solid ${alert.color}18`,
                  boxShadow: alert.priority === "Critical" ? `0 4px 16px ${alert.color}18` : "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl flex items-center justify-center flex-shrink-0" style={{ width: "46px", height: "46px", background: alert.bg, fontSize: "20px" }}>
                    {alert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 700, color: alert.color, lineHeight: 1.3 }}>
                          {alert.title}
                        </p>
                        <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{alert.titleSub}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="px-2 py-0.5 rounded-full" style={{ background: pc.bg, color: pc.color, fontSize: "9px", fontWeight: 700 }}>
                          {alert.priority}
                        </span>
                        <span style={{ fontSize: "9px", color: "#BDBDBD" }}>{alert.time}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: "12px", color: "#616161", lineHeight: 1.5 }}>{alert.desc}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 rounded-xl" style={{ background: alert.bg, border: "none", color: alert.color, fontSize: "11px", fontWeight: 600 }}>
                        Take Action
                      </button>
                      <button style={{ background: "none", border: "none", color: "#9E9E9E", fontSize: "11px" }}>
                        Notify Farmers
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <span style={{ fontSize: "48px", marginBottom: "12px" }}>📭</span>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, color: "#9E9E9E" }}>No alerts in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
