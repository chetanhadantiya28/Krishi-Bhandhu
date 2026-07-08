import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Phone, Shield, Eye, EyeOff } from "lucide-react";

type Step = "role" | "phone" | "otp" | "rsk-id" | "rsk-otp";

const roles = [
  { id: "farmer", label: "Farmer", labelHi: "किसान", icon: "👨‍🌾", color: "#2E7D32", bg: "#E8F5E9" },
  { id: "officer", label: "Agri Officer", labelHi: "कृषि अधिकारी", icon: "👨‍💼", color: "#1976D2", bg: "#E3F2FD" },
  { id: "govt", label: "Government Dept.", labelHi: "सरकारी विभाग", icon: "🏛️", color: "#6A1B9A", bg: "#F3E5F5" },
  { id: "rsk", label: "RSK Officer", labelHi: "आरएसके अधिकारी", icon: "🎖️", color: "#E65100", bg: "#FFF3E0" },
];

export function Login() {
  const [step, setStep] = useState<Step>("role");
  const [selectedRole, setSelectedRole] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [empId, setEmpId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) document.getElementById(`otp-${idx + 1}`)?.focus();
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0)
      document.getElementById(`otp-${idx - 1}`)?.focus();
  };

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    if (roleId === "rsk") setStep("rsk-id");
    else setStep("phone");
  };

  const handleBack = () => {
    if (step === "phone" || step === "rsk-id") setStep("role");
    else if (step === "otp") setStep("phone");
    else if (step === "rsk-otp") setStep("rsk-id");
  };

  return (
    <div className="h-full flex flex-col" style={{ background: "#F8FAF5", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div
        className="relative flex flex-col items-center pt-5 pb-6"
        style={{
          background: "linear-gradient(160deg, #1B5E20 0%, #2E7D32 100%)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
        }}
      >
        {step !== "role" && (
          <button
            onClick={handleBack}
            className="absolute left-5 top-5 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)", border: "none" }}
          >
            <ChevronLeft size={20} color="white" />
          </button>
        )}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
        >
          <span style={{ fontSize: "28px" }}>🌾</span>
        </div>
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "22px", fontWeight: 700, color: "white" }}>
          Krishi Bandhu
        </h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginTop: "3px" }}>
          Ministry of Agriculture • Govt. of India
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-6 overflow-y-auto">
        <AnimatePresence mode="wait">

          {/* Role Selection */}
          {step === "role" && (
            <motion.div key="role" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700, color: "#212121", marginBottom: "6px" }}>
                Select Your Role 👋
              </h2>
              <p style={{ fontSize: "14px", color: "#616161", marginBottom: "20px" }}>
                Choose how you'd like to login
              </p>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <motion.button
                    key={role.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRoleSelect(role.id)}
                    className="flex flex-col items-center p-4 rounded-3xl text-center"
                    style={{
                      background: "white",
                      border: `2px solid ${role.bg}`,
                      boxShadow: "0 4px 14px rgba(0,0,0,0.07)",
                    }}
                  >
                    <div
                      className="rounded-2xl flex items-center justify-center mb-2"
                      style={{ width: "52px", height: "52px", background: role.bg, fontSize: "24px" }}
                    >
                      {role.icon}
                    </div>
                    <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 700, color: "#212121", lineHeight: 1.3 }}>
                      {role.label}
                    </p>
                    <p style={{ fontSize: "10px", color: "#9E9E9E", marginTop: "2px" }}>{role.labelHi}</p>
                  </motion.button>
                ))}
              </div>
              <button
                onClick={() => navigate("/app")}
                className="w-full mt-5 rounded-2xl"
                style={{ height: "48px", background: "white", border: "1.5px solid #C8E6C9", color: "#2E7D32", fontFamily: "Poppins, sans-serif", fontSize: "14px", fontWeight: 600 }}
              >
                Continue as Guest
              </button>
            </motion.div>
          )}

          {/* Farmer Phone Step */}
          {step === "phone" && (
            <motion.div key="phone" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "22px", fontWeight: 700, color: "#212121", marginBottom: "8px" }}>
                Welcome, Farmer! 🙏
              </h2>
              <p style={{ fontSize: "14px", color: "#616161", marginBottom: "28px" }}>Enter your mobile number to continue</p>
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#2E7D32", display: "block", marginBottom: "8px" }}>Mobile Number</label>
              <div className="flex items-center gap-3 rounded-2xl overflow-hidden" style={{ background: "white", border: "1.5px solid #C8E6C9", height: "56px", boxShadow: "0 2px 12px rgba(46,125,50,0.08)" }}>
                <div className="flex items-center gap-2 px-4 h-full" style={{ borderRight: "1.5px solid #E8F5E9", minWidth: "72px" }}>
                  <span style={{ fontSize: "18px" }}>🇮🇳</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#212121" }}>+91</span>
                </div>
                <input
                  type="tel" maxLength={10} value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: "16px", color: "#212121", fontFamily: "Inter, sans-serif", flex: 1, paddingRight: "16px" }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Shield size={14} color="#43A047" />
                <span style={{ fontSize: "12px", color: "#616161" }}>Your data is secure. OTP will be sent via SMS.</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => phone.length === 10 && setStep("otp")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl mt-7"
                style={{ background: phone.length === 10 ? "linear-gradient(135deg, #2E7D32 0%, #43A047 100%)" : "#C8E6C9", color: "white", height: "56px", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, boxShadow: phone.length === 10 ? "0 8px 24px rgba(46,125,50,0.35)" : "none", border: "none" }}
              >
                <Phone size={18} />
                Send OTP
              </motion.button>
            </motion.div>
          )}

          {/* Farmer OTP Step */}
          {step === "otp" && (
            <motion.div key="otp" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "22px", fontWeight: 700, color: "#212121", marginBottom: "8px" }}>Verify OTP ✅</h2>
              <p style={{ fontSize: "14px", color: "#616161", marginBottom: "6px" }}>Enter 6-digit OTP sent to</p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#2E7D32", marginBottom: "28px" }}>+91 {phone}</p>
              <div className="flex gap-2 justify-between mb-6">
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-${i}`} type="tel" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="text-center rounded-2xl"
                    style={{ width: "46px", height: "56px", background: "white", border: `2px solid ${digit ? "#2E7D32" : "#C8E6C9"}`, fontSize: "22px", fontWeight: 700, color: "#212121", fontFamily: "Poppins, sans-serif", outline: "none" }}
                  />
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/app")} className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{ background: "linear-gradient(135deg, #2E7D32 0%, #43A047 100%)", color: "white", height: "56px", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, boxShadow: "0 8px 24px rgba(46,125,50,0.35)", border: "none" }}
              >
                Verify & Login <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}

          {/* RSK Officer — Employee ID + Password */}
          {step === "rsk-id" && (
            <motion.div key="rsk-id" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center gap-2 mb-1">
                <span style={{ fontSize: "20px" }}>🎖️</span>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700, color: "#212121" }}>RSK Officer Login</h2>
              </div>
              <p style={{ fontSize: "13px", color: "#616161", marginBottom: "24px" }}>Rythu Seva Kendra • Government of Telangana</p>

              <label style={{ fontSize: "13px", fontWeight: 600, color: "#E65100", display: "block", marginBottom: "7px" }}>Employee ID</label>
              <div className="flex items-center gap-3 rounded-2xl px-4 mb-4" style={{ background: "white", border: "1.5px solid #FFCC80", height: "52px", boxShadow: "0 2px 10px rgba(230,81,0,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🪪</span>
                <input
                  value={empId} onChange={(e) => setEmpId(e.target.value)}
                  placeholder="e.g. RSK-TS-2024-1234"
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#212121", fontFamily: "Inter, sans-serif", flex: 1 }}
                />
              </div>

              <label style={{ fontSize: "13px", fontWeight: 600, color: "#E65100", display: "block", marginBottom: "7px" }}>Password</label>
              <div className="flex items-center gap-3 rounded-2xl px-4 mb-4" style={{ background: "white", border: "1.5px solid #FFCC80", height: "52px", boxShadow: "0 2px 10px rgba(230,81,0,0.08)" }}>
                <span style={{ fontSize: "16px" }}>🔐</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{ border: "none", outline: "none", background: "transparent", fontSize: "14px", color: "#212121", fontFamily: "Inter, sans-serif", flex: 1 }}
                />
                <button onClick={() => setShowPassword((v) => !v)} style={{ background: "none", border: "none" }}>
                  {showPassword ? <EyeOff size={16} color="#9E9E9E" /> : <Eye size={16} color="#9E9E9E" />}
                </button>
              </div>

              <button style={{ background: "none", border: "none", color: "#E65100", fontSize: "13px", fontWeight: 600, marginBottom: "20px", padding: 0 }}>
                Forgot Password?
              </button>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => empId && password && setStep("rsk-otp")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{ background: empId && password ? "linear-gradient(135deg, #E65100 0%, #FB8C00 100%)" : "#FFE0B2", color: "white", height: "56px", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, boxShadow: empId && password ? "0 8px 24px rgba(230,81,0,0.3)" : "none", border: "none" }}
              >
                Continue <ChevronRight size={20} />
              </motion.button>

              <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-2xl" style={{ background: "#FFF3E0", border: "1px solid #FFCC80" }}>
                <Shield size={14} color="#E65100" />
                <span style={{ fontSize: "11px", color: "#616161" }}>Secure government portal. Access restricted to authorized RSK Officers only.</span>
              </div>
            </motion.div>
          )}

          {/* RSK Officer OTP */}
          {step === "rsk-otp" && (
            <motion.div key="rsk-otp" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
              <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: "20px", fontWeight: 700, color: "#212121", marginBottom: "8px" }}>OTP Verification 🔒</h2>
              <p style={{ fontSize: "13px", color: "#616161", marginBottom: "4px" }}>6-digit OTP sent to your registered mobile</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#E65100", marginBottom: "24px" }}>ID: {empId}</p>
              <div className="flex gap-2 justify-between mb-6">
                {otp.map((digit, i) => (
                  <input key={i} id={`otp-${i}`} type="tel" maxLength={1} value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="text-center rounded-2xl"
                    style={{ width: "46px", height: "56px", background: "white", border: `2px solid ${digit ? "#E65100" : "#FFCC80"}`, fontSize: "22px", fontWeight: 700, color: "#212121", outline: "none" }}
                  />
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/rsk/app")} className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{ background: "linear-gradient(135deg, #E65100 0%, #FB8C00 100%)", color: "white", height: "56px", fontFamily: "Poppins, sans-serif", fontSize: "16px", fontWeight: 600, boxShadow: "0 8px 24px rgba(230,81,0,0.3)", border: "none" }}
              >
                Access RSK Dashboard <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
