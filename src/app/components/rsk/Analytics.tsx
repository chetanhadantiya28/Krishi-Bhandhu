import { motion } from "motion/react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const monthlyData = [
  { month: "Feb", cases: 28, resolved: 24 },
  { month: "Mar", cases: 35, resolved: 30 },
  { month: "Apr", cases: 42, resolved: 37 },
  { month: "May", cases: 38, resolved: 35 },
  { month: "Jun", cases: 55, resolved: 48 },
  { month: "Jul", cases: 48, resolved: 43 },
];

const cropCases = [
  { crop: "Cotton", cases: 42 },
  { crop: "Paddy", cases: 35 },
  { crop: "Maize", cases: 22 },
  { crop: "Turmeric", cases: 18 },
  { crop: "Soybean", cases: 14 },
];

const resolutionData = [
  { name: "AI Resolved", value: 58, color: "#1976D2" },
  { name: "Officer Resolved", value: 28, color: "#2E7D32" },
  { name: "In Progress", value: 14, color: "#FB8C00" },
];

const statCards = [
  { label: "Total Cases", value: "431", icon: "📋", color: "#E65100", bg: "#FBE9E7", change: "+12%" },
  { label: "AI Resolution", value: "58%", icon: "🤖", color: "#1976D2", bg: "#E3F2FD", change: "+3%" },
  { label: "Officer Resolution", value: "28%", icon: "🎖️", color: "#2E7D32", bg: "#E8F5E9", change: "+1%" },
  { label: "Farmer Satisfaction", value: "4.6★", icon: "⭐", color: "#F9A825", bg: "#FFFDE7", change: "+0.2" },
  { label: "Avg Resolution", value: "2.3h", icon: "⚡", color: "#00838F", bg: "#E0F7FA", change: "-0.5h" },
  { label: "Response Time", value: "8 min", icon: "⏱️", color: "#6A1B9A", bg: "#F3E5F5", change: "-2min" },
];

export function Analytics() {
  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
      >
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "3px" }}>Analytics</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Nalgonda District • July 2026</p>
      </div>

      <div className="px-4 pt-4">
        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {statCards.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl p-3"
              style={{ background: "white", boxShadow: "0 3px 10px rgba(0,0,0,0.07)", border: `1px solid ${s.color}15` }}
            >
              <div className="rounded-xl flex items-center justify-center mb-2" style={{ width: "28px", height: "28px", background: s.bg, fontSize: "13px" }}>
                {s.icon}
              </div>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "17px", fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</p>
              <p style={{ fontSize: "9px", color: "#9E9E9E", marginTop: "2px", lineHeight: 1.3 }}>{s.label}</p>
              <p style={{ fontSize: "9px", color: "#4CAF50", fontWeight: 600, marginTop: "2px" }}>{s.change}</p>
            </motion.div>
          ))}
        </div>

        {/* Monthly Trend */}
        <div className="rounded-3xl p-4 mb-4" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121", marginBottom: "4px" }}>Case Trends</p>
          <p style={{ fontSize: "11px", color: "#9E9E9E", marginBottom: "12px" }}>Total vs. Resolved (Feb – Jul)</p>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={monthlyData} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="cases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E65100" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#E65100" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="resolved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2E7D32" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#9E9E9E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9E9E9E" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", fontSize: "12px" }}
              />
              <Area type="monotone" dataKey="cases" stroke="#E65100" strokeWidth={2} fill="url(#cases)" name="Total Cases" />
              <Area type="monotone" dataKey="resolved" stroke="#2E7D32" strokeWidth={2} fill="url(#resolved)" name="Resolved" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{ color: "#E65100", label: "Total Cases" }, { color: "#2E7D32", label: "Resolved" }].map((l, i) => (
              <div key={i} className="flex items-center gap-1">
                <div style={{ width: "10px", height: "3px", borderRadius: "2px", background: l.color }} />
                <span style={{ fontSize: "10px", color: "#9E9E9E" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Crop-wise Cases */}
        <div className="rounded-3xl p-4 mb-4" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121", marginBottom: "12px" }}>Top Reported Crops</p>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={cropCases} margin={{ top: 4, right: 4, bottom: 0, left: -28 }}>
              <XAxis dataKey="crop" tick={{ fontSize: 9, fill: "#9E9E9E" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9E9E9E" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.12)", fontSize: "12px" }} />
              <Bar dataKey="cases" radius={[6, 6, 0, 0]} name="Cases">
                {cropCases.map((_, i) => (
                  <Cell key={i} fill={["#E65100", "#1976D2", "#2E7D32", "#6A1B9A", "#FB8C00"][i % 5]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Pie */}
        <div className="rounded-3xl p-4 mb-4" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
          <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121", marginBottom: "12px" }}>Resolution Breakdown</p>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie data={resolutionData} cx="50%" cy="50%" innerRadius={34} outerRadius={54} paddingAngle={3} dataKey="value">
                  {resolutionData.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1">
              {resolutionData.map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: "11px", color: "#616161", flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: d.color }}>{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export buttons */}
        <div className="flex gap-2 mb-6">
          {[{ label: "📄 PDF", color: "#D32F2F" }, { label: "📊 Excel", color: "#2E7D32" }, { label: "📁 CSV", color: "#1976D2" }].map((b, i) => (
            <button
              key={i}
              className="flex-1 py-2.5 rounded-2xl"
              style={{ background: "white", border: `1.5px solid ${b.color}30`, color: b.color, fontSize: "12px", fontWeight: 600, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
