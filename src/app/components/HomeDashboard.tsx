import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Bell, MapPin, Droplets, Wind, CloudRain,
  Camera, TrendingUp, ChevronRight,
  AlertTriangle, Banknote, Star
} from "lucide-react";

const marketPrices = [
  { crop: "गेहूं", eng: "Wheat", price: "₹2,150", change: "+2.3%", up: true, emoji: "🌾" },
  { crop: "चावल", eng: "Rice", price: "₹1,960", change: "-0.8%", up: false, emoji: "🌾" },
  { crop: "कपास", eng: "Cotton", price: "₹6,200", change: "+4.1%", up: true, emoji: "🌿" },
  { crop: "सोयाबीन", eng: "Soybean", price: "₹4,800", change: "+1.5%", up: true, emoji: "🫘" },
];

const alerts = [
  {
    type: "weather",
    icon: "🌧️",
    color: "#1976D2",
    bg: "#E3F2FD",
    title: "Heavy Rain Warning",
    desc: "Heavy rainfall expected in next 48 hours",
    time: "2h ago",
  },
  {
    type: "disease",
    icon: "⚠️",
    color: "#D32F2F",
    bg: "#FFEBEE",
    title: "Blast Disease Alert",
    desc: "Paddy blast detected in 3 nearby villages",
    time: "5h ago",
  },
];

export function HomeDashboard() {
  const navigate = useNavigate();

  const schemes = [
    { name: "PM-KISAN", amount: "₹6,000/yr", deadline: "Apply by Aug 15", color: "#2E7D32" },
    { name: "Fasal Bima", amount: "Upto ₹2L", deadline: "Kharif 2026", color: "#1976D2" },
    { name: "Kisan Credit", amount: "₹3L loan", deadline: "0% interest", color: "#6A1B9A" },
  ];

  return (
    <div className="min-h-full" style={{ background: "#F8FAF5" }}>
      {/* Header */}
      <div
        className="px-5 pt-4 pb-6 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, #1B5E20 0%, #2E7D32 60%, #388E3C 100%)",
          borderBottomLeftRadius: "28px",
          borderBottomRightRadius: "28px",
        }}
      >
        {/* Decorative circle */}
        <div
          className="absolute -top-8 -right-8 rounded-full opacity-10"
          style={{ width: "130px", height: "130px", background: "white" }}
        />
        <div
          className="absolute -bottom-4 -left-4 rounded-full opacity-10"
          style={{ width: "80px", height: "80px", background: "white" }}
        />

        <div className="flex justify-between items-start mb-5 relative">
          <div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)" }}>नमस्ते 🙏</p>
            <h1
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
                lineHeight: 1.3,
              }}
            >
              Ram Kumar Ji
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} color="rgba(255,255,255,0.75)" />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>
                Nashik, Maharashtra
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="relative flex items-center justify-center rounded-2xl"
              style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.15)" }}
            >
              <Bell size={20} color="white" />
              <div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  width: "16px",
                  height: "16px",
                  background: "#FB8C00",
                  top: "-4px",
                  right: "-4px",
                  fontSize: "9px",
                  color: "white",
                  fontWeight: 700,
                }}
              >
                3
              </div>
            </motion.button>
            <div
              className="rounded-2xl flex items-center justify-center"
              style={{ width: "44px", height: "44px", background: "rgba(255,255,255,0.15)", fontSize: "20px" }}
            >
              👨‍🌾
            </div>
          </div>
        </div>

        {/* Weather card */}
        <div
          className="rounded-2xl p-4 relative"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginBottom: "2px" }}>
                Today's Weather
              </p>
              <div className="flex items-end gap-2">
                <span
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "38px",
                    fontWeight: 700,
                    color: "white",
                    lineHeight: 1,
                  }}
                >
                  34°
                </span>
                <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", marginBottom: "4px" }}>C</span>
              </div>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)" }}>Partly Cloudy</p>
            </div>
            <span style={{ fontSize: "52px", opacity: 0.9 }}>⛅</span>
          </div>
          <div className="flex gap-4 mt-3">
            {[
              { icon: <Droplets size={13} />, val: "72%", label: "Humidity" },
              { icon: <Wind size={13} />, val: "14 km/h", label: "Wind" },
              { icon: <CloudRain size={13} />, val: "65%", label: "Rain" },
            ].map((w, i) => (
              <div key={i} className="flex items-center gap-1">
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{w.icon}</span>
                <span style={{ fontSize: "12px", color: "white", fontWeight: 500 }}>{w.val}</span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)" }}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5">
        {/* Quick actions */}
        <div className="mt-5 mb-5">
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: "📸", label: "Scan Crop", color: "#E8F5E9", iconBg: "#2E7D32", action: () => navigate("/app/scan") },
              { icon: "📋", label: "History", color: "#E3F2FD", iconBg: "#1976D2", action: () => {} },
              { icon: "📊", label: "Market", color: "#FFF8E1", iconBg: "#F9A825", action: () => {} },
              { icon: "👨‍💼", label: "Officer", color: "#F3E5F5", iconBg: "#7B1FA2", action: () => {} },
            ].map((item, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.93 }}
                onClick={item.action}
                className="flex flex-col items-center gap-2"
                style={{ background: "transparent", border: "none" }}
              >
                <div
                  className="rounded-2xl flex items-center justify-center"
                  style={{ width: "56px", height: "56px", background: item.color, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                >
                  <span style={{ fontSize: "22px" }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#616161", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scan CTA */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/app/scan")}
          className="w-full rounded-3xl p-4 flex items-center gap-4 mb-5"
          style={{
            background: "linear-gradient(135deg, #2E7D32 0%, #43A047 100%)",
            border: "none",
            boxShadow: "0 8px 24px rgba(46,125,50,0.3)",
          }}
        >
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{ width: "52px", height: "52px", background: "rgba(255,255,255,0.2)", flexShrink: 0 }}
          >
            <Camera size={26} color="white" />
          </div>
          <div className="flex-1 text-left">
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "white" }}>
              Scan Your Crop Now
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)", marginTop: "2px" }}>
              अपनी फसल की फोटो लें • AI analysis in 30 seconds
            </p>
          </div>
          <ChevronRight size={22} color="rgba(255,255,255,0.8)" />
        </motion.button>

        {/* Government Alerts */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "#212121" }}
            >
              Government Alerts
            </h3>
            <button
              onClick={() => navigate("/app/alerts")}
              style={{ fontSize: "12px", color: "#2E7D32", fontWeight: 600 }}
            >
              See All
            </button>
          </div>
          {alerts.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 rounded-2xl mb-2"
              style={{ background: alert.bg, border: `1px solid ${alert.color}22` }}
            >
              <div
                className="rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ width: "40px", height: "40px", background: `${alert.color}18`, fontSize: "18px" }}
              >
                {alert.icon}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p style={{ fontSize: "13px", fontWeight: 700, color: alert.color }}>
                    {alert.title}
                  </p>
                  <span style={{ fontSize: "10px", color: "#9E9E9E" }}>{alert.time}</span>
                </div>
                <p style={{ fontSize: "12px", color: "#616161", marginTop: "2px", lineHeight: 1.4 }}>
                  {alert.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Market Prices */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "#212121" }}
            >
              Mandi Prices
            </h3>
            <div className="flex items-center gap-1">
              <TrendingUp size={13} color="#43A047" />
              <span style={{ fontSize: "11px", color: "#43A047", fontWeight: 600 }}>Live</span>
            </div>
          </div>
          <div
            className="rounded-3xl overflow-hidden"
            style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
          >
            {marketPrices.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: i < marketPrices.length - 1 ? "1px solid #F1F8E9" : "none" }}
              >
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: "20px" }}>{item.emoji}</span>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "#212121" }}>{item.crop}</p>
                    <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{item.eng} / Quintal</p>
                  </div>
                </div>
                <div className="text-right">
                  <p style={{ fontSize: "15px", fontWeight: 700, color: "#212121" }}>{item.price}</p>
                  <p style={{ fontSize: "11px", fontWeight: 600, color: item.up ? "#4CAF50" : "#D32F2F" }}>
                    {item.change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kisan Dost AI */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/app/chat")}
          className="rounded-3xl p-4 mb-5 flex items-center gap-3"
          style={{
            background: "linear-gradient(135deg, #E3F2FD 0%, #E8EAF6 100%)",
            border: "1.5px solid #BBDEFB",
            cursor: "pointer",
          }}
        >
          <div
            className="rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ width: "52px", height: "52px", background: "#1976D2", fontSize: "22px" }}
          >
            🤖
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1976D2" }}>
              Kisan Dost AI
            </p>
            <p style={{ fontSize: "12px", color: "#616161", marginTop: "2px" }}>
              Ask anything about farming in Hindi or English
            </p>
          </div>
          <ChevronRight size={20} color="#1976D2" />
        </motion.div>

        {/* Latest Schemes */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "#212121" }}>
              Govt. Schemes
            </h3>
            <Star size={14} color="#F9A825" fill="#F9A825" />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {schemes.map((s, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 flex-shrink-0"
                style={{
                  width: "150px",
                  background: `${s.color}12`,
                  border: `1.5px solid ${s.color}30`,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  className="rounded-xl flex items-center justify-center mb-2"
                  style={{ width: "36px", height: "36px", background: `${s.color}20` }}
                >
                  <Banknote size={18} color={s.color} />
                </div>
                <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 700, color: "#212121" }}>
                  {s.name}
                </p>
                <p style={{ fontSize: "15px", fontWeight: 700, color: s.color, margin: "4px 0" }}>
                  {s.amount}
                </p>
                <p style={{ fontSize: "10px", color: "#9E9E9E" }}>{s.deadline}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Officer */}
        <div
          className="rounded-3xl p-4 mb-5 flex items-center gap-3"
          style={{ background: "white", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", border: "1px solid #F1F8E9" }}
        >
          <div
            className="rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ width: "52px", height: "52px", background: "#E8F5E9", fontSize: "22px" }}
          >
            👨‍💼
          </div>
          <div className="flex-1">
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121" }}>
              Rajesh Patil
            </p>
            <p style={{ fontSize: "12px", color: "#616161" }}>Agricultural Officer • 2.3 km away</p>
            <div className="flex items-center gap-1 mt-1">
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF50" }} />
              <span style={{ fontSize: "11px", color: "#4CAF50", fontWeight: 600 }}>Available</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-xl flex items-center justify-center"
              style={{ width: "36px", height: "36px", background: "#E8F5E9", border: "none" }}
            >
              <span style={{ fontSize: "16px" }}>📞</span>
            </button>
            <button
              className="rounded-xl flex items-center justify-center"
              style={{ width: "36px", height: "36px", background: "#E3F2FD", border: "none" }}
            >
              <span style={{ fontSize: "16px" }}>💬</span>
            </button>
          </div>
        </div>

        {/* Seasonal Advisory */}
        <div
          className="rounded-3xl p-4 mb-6 flex items-start gap-3"
          style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFF3E0 100%)", border: "1.5px solid #FFE082" }}
        >
          <span style={{ fontSize: "24px", flexShrink: 0 }}>🌱</span>
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#E65100" }}>
              Kharif Season Advisory
            </p>
            <p style={{ fontSize: "12px", color: "#616161", lineHeight: 1.5, marginTop: "4px" }}>
              This week is ideal for sowing paddy & cotton. Apply DAP fertilizer before sowing for best results.
            </p>
            <button style={{ fontSize: "12px", color: "#FB8C00", fontWeight: 600, marginTop: "6px", background: "none", border: "none", padding: 0 }}>
              Read More →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
