import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ChevronRight, LogOut, Edit2 } from "lucide-react";

export function RSKProfile() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [telugu, setTelugu] = useState(true);

  const sections = [
    {
      title: "Officer Details",
      items: [
        { icon: "🪪", label: "Employee ID", value: "RSK-TS-2024-1234" },
        { icon: "🏢", label: "RSK Center", value: "Nalgonda RSK" },
        { icon: "📍", label: "District", value: "Nalgonda, Telangana" },
        { icon: "🗺️", label: "Assigned Villages", value: "12 villages" },
        { icon: "📅", label: "Joined", value: "March 2022" },
      ],
    },
    {
      title: "Preferences",
      items: [
        { icon: "🌙", label: "Dark Mode", toggle: true, key: "dark" },
        { icon: "🔔", label: "Notifications", toggle: true, key: "notif" },
        { icon: "🗣️", label: "Language: Telugu", toggle: true, key: "lang" },
        { icon: "🔐", label: "Change Password", action: true },
        { icon: "🛡️", label: "Two-Factor Auth", action: true },
      ],
    },
    {
      title: "Support",
      items: [
        { icon: "❓", label: "Help & Training", action: true },
        { icon: "📞", label: "Helpdesk: 1800-XXX-XXXX", action: true },
        { icon: "📋", label: "RSK Manual v3.2", action: true },
      ],
    },
  ];

  const getToggleValue = (key: string) => {
    if (key === "dark") return darkMode;
    if (key === "notif") return notifications;
    if (key === "lang") return telugu;
    return false;
  };

  const handleToggle = (key: string) => {
    if (key === "dark") setDarkMode((v) => !v);
    if (key === "notif") setNotifications((v) => !v);
    if (key === "lang") setTelugu((v) => !v);
  };

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
      {/* Profile header */}
      <div
        className="relative px-4 pt-4 pb-7"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "32px", borderBottomRightRadius: "32px" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="rounded-2xl flex items-center justify-center" style={{ width: "64px", height: "64px", background: "rgba(255,255,255,0.2)", fontSize: "28px" }}>
                🎖️
              </div>
              <div className="absolute flex items-center justify-center rounded-full" style={{ width: "20px", height: "20px", background: "#4CAF50", bottom: "-3px", right: "-3px", border: "2px solid #E65100" }}>
                <span style={{ fontSize: "9px", color: "white" }}>✓</span>
              </div>
            </div>
            <div>
              <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>K. Srinivas Rao</h1>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>Senior RSK Officer</p>
              <div className="flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)", width: "fit-content" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF50" }} />
                <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.9)" }}>Active Duty</span>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center rounded-xl" style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", border: "none" }}>
            <Edit2 size={16} color="white" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { val: "168", label: "Resolved" },
            { val: "4.6★", label: "Rating" },
            { val: "12", label: "Villages" },
            { val: "92%", label: "On-time" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl py-2 text-center" style={{ background: "rgba(255,255,255,0.14)" }}>
              <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "white" }}>{s.val}</p>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        {sections.map((sec, si) => (
          <div key={si} className="mb-4">
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#9E9E9E", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "8px" }}>
              {sec.title}
            </p>
            <div className="rounded-3xl overflow-hidden" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)", border: "1px solid #F5F5F5" }}>
              {sec.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: ii < sec.items.length - 1 ? "1px solid #F8FAF5" : "none" }}>
                  <div className="rounded-xl flex items-center justify-center flex-shrink-0" style={{ width: "36px", height: "36px", background: "#FBE9E7", fontSize: "16px" }}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontSize: "13px", fontWeight: 500, color: "#212121" }}>{item.label}</p>
                    {(item as any).value && (
                      <p style={{ fontSize: "11px", color: "#9E9E9E" }}>{(item as any).value}</p>
                    )}
                  </div>
                  {(item as any).toggle ? (
                    <motion.div
                      onClick={() => handleToggle((item as any).key)}
                      className="relative rounded-full"
                      style={{ width: "44px", height: "24px", background: getToggleValue((item as any).key) ? "#E65100" : "#E0E0E0", cursor: "pointer", flexShrink: 0 }}
                    >
                      <motion.div
                        animate={{ x: getToggleValue((item as any).key) ? "22px" : "2px" }}
                        transition={{ duration: 0.2 }}
                        style={{ position: "absolute", top: "2px", width: "20px", height: "20px", background: "white", borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                      />
                    </motion.div>
                  ) : (item as any).action ? (
                    <ChevronRight size={16} color="#BDBDBD" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/login")}
          className="w-full flex items-center justify-center gap-2 rounded-2xl mb-3"
          style={{ height: "52px", background: "#FFEBEE", border: "1.5px solid #FFCDD2", color: "#D32F2F", fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 600 }}
        >
          <LogOut size={18} /> Logout
        </motion.button>

        <p style={{ fontSize: "10px", color: "#BDBDBD", textAlign: "center" }}>
          RSK Portal v2.1.0 • Government of Telangana 🇮🇳
        </p>
      </div>
    </div>
  );
}
