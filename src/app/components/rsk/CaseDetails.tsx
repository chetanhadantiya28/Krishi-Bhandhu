import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, Phone, MessageCircle, Calendar, CheckCircle, Send, Map, Download } from "lucide-react";

type Tab = "info" | "chat" | "images" | "diagnosis";

const conversation = [
  { role: "farmer", text: "Meri cotton ki fasal mein pattiyaan mur rahi hain aur chhoti ho rahi hain. Kaafi zyada nuksaan ho raha hai.", time: "9:12 AM" },
  { role: "ai", text: "Namaste! Aapki cotton ki pattiyaan murna Cotton Leaf Curl Disease ka lakshan ho sakta hai. Kya aap kuch aur tasveerein bhej sakte hain? Upar ki pattiyaan aur neeche ki dono.", time: "9:13 AM" },
  { role: "farmer", text: "Haan, yeh lo (3 images sent). Aaj se 5 din pehle se shuru hua hai.", time: "9:15 AM" },
  { role: "ai", text: "Tasveerein dekh kar laga ki yeh Cotton Leaf Curl Virus (CLCuV) hai. Confidence: 72%. Iske liye imidacloprid 200 SL spray karein. Lekin kyunki confidence 75% se kam hai, main ise officer ko escalate kar raha hoon.", time: "9:16 AM", escalation: true },
  { role: "officer", text: "Case RSK Officer K. Srinivas Rao ko assign kiya gaya. Jald hi sampark karenge.", time: "9:18 AM" },
];

const actions = [
  { icon: "📞", label: "Call Farmer", color: "#2E7D32", bg: "#E8F5E9" },
  { icon: "💬", label: "Chat", color: "#1976D2", bg: "#E3F2FD" },
  { icon: "🗓️", label: "Schedule Visit", color: "#6A1B9A", bg: "#F3E5F5" },
  { icon: "✅", label: "Mark Resolved", color: "#2E7D32", bg: "#E8F5E9" },
  { icon: "📤", label: "Forward", color: "#FB8C00", bg: "#FFF3E0" },
  { icon: "🏛️", label: "Recommend Scheme", color: "#E65100", bg: "#FBE9E7" },
  { icon: "📷", label: "Request Images", color: "#1976D2", bg: "#E3F2FD" },
  { icon: "🧪", label: "Soil Test", color: "#00838F", bg: "#E0F7FA" },
];

const alternatives = [
  { disease: "Cotton Leaf Curl Virus", confidence: 72, color: "#D32F2F" },
  { disease: "Tobacco Streak Virus", confidence: 18, color: "#FB8C00" },
  { disease: "Jassid Damage", confidence: 10, color: "#9E9E9E" },
];

export function CaseDetails() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("info");
  const [showModal, setShowModal] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const tabs: { key: Tab; label: string }[] = [
    { key: "info", label: "Farmer Info" },
    { key: "chat", label: "AI Chat" },
    { key: "images", label: "Images" },
    { key: "diagnosis", label: "Diagnosis" },
  ];

  return (
    <div style={{ background: "#F8FAF5", minHeight: "100%", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div
        className="px-4 pt-4 pb-5"
        style={{ background: "linear-gradient(145deg, #BF360C 0%, #E65100 100%)", borderBottomLeftRadius: "24px", borderBottomRightRadius: "24px" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/rsk/app/cases")} style={{ background: "rgba(255,255,255,0.15)", border: "none", width: "36px", height: "36px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} color="white" />
          </button>
          <div>
            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "white" }}>Case #KB-2024-001</h1>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>Cotton Leaf Curl Disease</p>
          </div>
          <span className="ml-auto px-2 py-1 rounded-full" style={{ background: "#FFEBEE", color: "#D32F2F", fontSize: "9px", fontWeight: 700 }}>CRITICAL</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl" style={{ background: "rgba(0,0,0,0.15)" }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className="flex-1 py-1.5 rounded-xl"
              style={{
                background: tab === t.key ? "white" : "transparent",
                border: "none",
                color: tab === t.key ? "#E65100" : "rgba(255,255,255,0.8)",
                fontSize: "10px",
                fontWeight: tab === t.key ? 700 : 400,
                boxShadow: tab === t.key ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        <AnimatePresence mode="wait">

          {/* Farmer Info Tab */}
          {tab === "info" && (
            <motion.div key="info" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="rounded-3xl p-4 mb-3" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-2xl flex items-center justify-center" style={{ width: "52px", height: "52px", background: "#FBE9E7", fontSize: "24px" }}>
                    👨‍🌾
                  </div>
                  <div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "#212121" }}>Raju Reddy</p>
                    <p style={{ fontSize: "12px", color: "#9E9E9E" }}>Farmer ID: KB-F-8832</p>
                  </div>
                  <button className="ml-auto flex items-center gap-1 px-3 py-2 rounded-2xl" style={{ background: "#E8F5E9", border: "none", color: "#2E7D32", fontSize: "12px", fontWeight: 600 }}>
                    <Phone size={13} /> Call
                  </button>
                </div>

                {[
                  ["📞", "Phone", "+91 98760 12345"],
                  ["📍", "Village", "Miryalaguda"],
                  ["🏙️", "District", "Nalgonda"],
                  ["🗺️", "State", "Telangana"],
                  ["🗣️", "Language", "Telugu"],
                  ["🌾", "Farm Size", "3.5 Acres"],
                  ["🌿", "Current Crops", "Cotton, Paddy"],
                  ["📋", "Previous Cases", "2 (All Resolved)"],
                ].map(([icon, label, value], i) => (
                  <div key={i} className="flex items-center justify-between py-2" style={{ borderBottom: i < 7 ? "1px solid #F8FAF5" : "none" }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: "14px" }}>{icon}</span>
                      <span style={{ fontSize: "12px", color: "#9E9E9E" }}>{label}</span>
                    </div>
                    <span style={{ fontSize: "13px", fontWeight: 500, color: "#212121" }}>{value}</span>
                  </div>
                ))}
              </div>

              {/* GPS placeholder */}
              <div className="rounded-3xl overflow-hidden mb-4" style={{ height: "120px", background: "linear-gradient(135deg, #C8E6C9, #A5D6A7)", boxShadow: "0 3px 12px rgba(0,0,0,0.07)" }}>
                <div className="h-full flex items-center justify-center flex-col gap-2">
                  <Map size={28} color="#2E7D32" />
                  <p style={{ fontSize: "12px", color: "#2E7D32", fontWeight: 600 }}>GPS: 16.8714° N, 79.9673° E</p>
                  <p style={{ fontSize: "10px", color: "#4CAF50" }}>Tap to open in Maps</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI Chat Timeline */}
          {tab === "chat" && (
            <motion.div key="chat" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {conversation.map((msg, i) => (
                <div key={i} className={`flex mb-3 ${msg.role === "farmer" ? "justify-end" : "justify-start"}`}>
                  {msg.role !== "farmer" && (
                    <div className="flex items-center justify-center rounded-xl mr-2 flex-shrink-0" style={{ width: "28px", height: "28px", background: msg.role === "ai" ? "#E3F2FD" : "#FBE9E7", fontSize: "13px", alignSelf: "flex-end" }}>
                      {msg.role === "ai" ? "🤖" : "🎖️"}
                    </div>
                  )}
                  <div style={{ maxWidth: "78%" }}>
                    {msg.escalation && (
                      <div className="flex items-center gap-1 mb-1 px-2 py-0.5 rounded-full" style={{ background: "#FFF3E0", border: "1px solid #FFCC80", width: "fit-content" }}>
                        <span style={{ fontSize: "9px", color: "#E65100", fontWeight: 700 }}>⚡ ESCALATED TO RSK</span>
                      </div>
                    )}
                    <div
                      className="px-3 py-2.5 rounded-3xl"
                      style={{
                        background: msg.role === "farmer" ? "linear-gradient(135deg, #2E7D32, #43A047)" : msg.role === "ai" ? "white" : "#FBE9E7",
                        color: msg.role === "farmer" ? "white" : "#212121",
                        borderBottomRightRadius: msg.role === "farmer" ? "6px" : "24px",
                        borderBottomLeftRadius: msg.role !== "farmer" ? "6px" : "24px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      <p style={{ fontSize: "12px", lineHeight: 1.5 }}>{msg.text}</p>
                    </div>
                    <p style={{ fontSize: "10px", color: "#BDBDBD", marginTop: "2px", textAlign: msg.role === "farmer" ? "right" : "left", paddingLeft: "4px" }}>{msg.time}</p>
                  </div>
                  {msg.role === "farmer" && (
                    <div className="flex items-center justify-center rounded-xl ml-2 flex-shrink-0" style={{ width: "28px", height: "28px", background: "#E8F5E9", fontSize: "13px", alignSelf: "flex-end" }}>
                      👨‍🌾
                    </div>
                  )}
                </div>
              ))}

              {/* Officer reply box */}
              <div className="flex items-center gap-2 mt-4 p-3 rounded-2xl" style={{ background: "white", boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}>
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add officer note..."
                  style={{ flex: 1, border: "none", outline: "none", fontSize: "13px", fontFamily: "Inter, sans-serif", color: "#212121", background: "transparent" }} />
                <button className="flex items-center justify-center rounded-xl" style={{ width: "36px", height: "36px", background: "#FBE9E7", border: "none" }}>
                  <Send size={16} color="#E65100" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Images Tab */}
          {tab === "images" && (
            <motion.div key="images" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Leaf close-up", desc: "Showing curl symptoms", bg: "linear-gradient(135deg, #388E3C, #2E7D32)" },
                  { label: "Full plant", desc: "Affected branch", bg: "linear-gradient(135deg, #33691E, #558B2F)" },
                  { label: "Stem", desc: "Discoloration visible", bg: "linear-gradient(135deg, #827717, #9E9D24)" },
                ].map((img, i) => (
                  <div key={i} className={`rounded-3xl overflow-hidden ${i === 2 ? "col-span-2" : ""}`} style={{ height: i === 2 ? "120px" : "110px", background: img.bg, boxShadow: "0 4px 12px rgba(0,0,0,0.1)", position: "relative" }}>
                    <div className="h-full flex flex-col items-center justify-center">
                      <span style={{ fontSize: "28px", marginBottom: "4px" }}>🌿</span>
                      <p style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>{img.label}</p>
                      <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.7)" }}>{img.desc}</p>
                    </div>
                    <button className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-xl" style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", fontSize: "9px" }}>
                      <Download size={9} /> Save
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full flex items-center justify-center gap-2 rounded-2xl" style={{ height: "44px", background: "white", border: "1.5px dashed #FFCC80", color: "#E65100", fontSize: "13px", fontWeight: 600 }}>
                📷 Request More Images
              </button>
            </motion.div>
          )}

          {/* Diagnosis Tab */}
          {tab === "diagnosis" && (
            <motion.div key="diagnosis" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {/* Primary */}
              <div className="rounded-3xl p-4 mb-3" style={{ background: "white", boxShadow: "0 3px 12px rgba(0,0,0,0.07)", border: "1px solid #FFEBEE" }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="rounded-2xl flex items-center justify-center" style={{ width: "44px", height: "44px", background: "#FFEBEE", fontSize: "20px" }}>🍃</div>
                  <div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#D32F2F" }}>Cotton Leaf Curl Virus</p>
                    <p style={{ fontSize: "11px", color: "#9E9E9E" }}>CLCuV • Begomovirus</p>
                  </div>
                  <span className="ml-auto px-2 py-1 rounded-full" style={{ background: "#FFEBEE", color: "#D32F2F", fontSize: "12px", fontWeight: 700 }}>72%</span>
                </div>

                {/* Alternative predictions */}
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#9E9E9E", marginBottom: "8px" }}>Alternative Predictions</p>
                {alternatives.map((a, i) => (
                  <div key={i} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: "11px", color: "#424242" }}>{a.disease}</span>
                      <span style={{ fontSize: "11px", fontWeight: 600, color: a.color }}>{a.confidence}%</span>
                    </div>
                    <div className="rounded-full overflow-hidden" style={{ height: "5px", background: "#F5F5F5" }}>
                      <div style={{ width: `${a.confidence}%`, height: "100%", background: a.color, borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Details */}
              {[
                { label: "Risk Level", value: "High 🔴", color: "#D32F2F" },
                { label: "Affected Stage", value: "Vegetative" },
                { label: "Cause", value: "Whitefly (Bemisia tabaci)" },
                { label: "Fertilizer", value: "Avoid excess N, add K₂O" },
                { label: "Pesticide", value: "Imidacloprid 200 SL @ 0.5 ml/L" },
                { label: "Advisory", value: "ICAR-CICR Bulletin #12" },
              ].map((d, i) => (
                <div key={i} className="flex items-center justify-between py-2 rounded-2xl px-3 mb-1" style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: "12px", color: "#9E9E9E" }}>{d.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: d.color || "#212121" }}>{d.value}</span>
                </div>
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Action Panel */}
      <div className="px-4 pb-4 mt-2">
        <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 700, color: "#212121", marginBottom: "10px" }}>Officer Actions</p>
        <div className="grid grid-cols-4 gap-2">
          {actions.map((a, i) => (
            <button
              key={i}
              onClick={() => setShowModal(a.label)}
              className="flex flex-col items-center gap-1.5"
              style={{ background: "transparent", border: "none" }}
            >
              <div className="rounded-2xl flex items-center justify-center" style={{ width: "44px", height: "44px", background: a.bg, fontSize: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                {a.icon}
              </div>
              <span style={{ fontSize: "9px", color: "#616161", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{a.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(null)} className="absolute inset-0 z-40" style={{ background: "rgba(0,0,0,0.45)" }} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute bottom-0 left-0 right-0 z-50 rounded-t-3xl p-6"
              style={{ background: "white", boxShadow: "0 -8px 40px rgba(0,0,0,0.15)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 700, color: "#212121" }}>{showModal}</h3>
                <button onClick={() => setShowModal(null)} style={{ background: "#F5F5F5", border: "none", borderRadius: "10px", width: "32px", height: "32px", fontSize: "16px" }}>×</button>
              </div>
              {showModal === "Schedule Visit" ? (
                <div>
                  <label style={{ fontSize: "13px", color: "#616161", display: "block", marginBottom: "6px" }}>Select Date</label>
                  <input type="date" className="w-full rounded-2xl px-4 mb-3" style={{ height: "48px", border: "1.5px solid #E0E0E0", outline: "none", fontSize: "14px", fontFamily: "Inter, sans-serif" }} />
                  <label style={{ fontSize: "13px", color: "#616161", display: "block", marginBottom: "6px" }}>Purpose</label>
                  <input placeholder="e.g. Crop inspection, soil testing..." className="w-full rounded-2xl px-4 mb-4" style={{ height: "48px", border: "1.5px solid #E0E0E0", outline: "none", fontSize: "14px", fontFamily: "Inter, sans-serif" }} />
                </div>
              ) : (
                <textarea
                  placeholder={`Add notes for ${showModal}...`}
                  rows={3}
                  className="w-full rounded-2xl px-4 py-3 mb-4"
                  style={{ border: "1.5px solid #E0E0E0", outline: "none", fontSize: "14px", fontFamily: "Inter, sans-serif", resize: "none" }}
                />
              )}
              <button onClick={() => setShowModal(null)} className="w-full rounded-2xl" style={{ height: "50px", background: "linear-gradient(135deg, #E65100, #FB8C00)", color: "white", border: "none", fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 600 }}>
                Confirm
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
