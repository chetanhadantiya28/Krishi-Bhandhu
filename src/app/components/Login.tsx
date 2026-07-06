import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Phone, Shield } from "lucide-react";

export function Login() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    if (val && idx < 5) {
      const el = document.getElementById(`otp-${idx + 1}`);
      el?.focus();
    }
  };

  const handleOtpKey = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      const el = document.getElementById(`otp-${idx - 1}`);
      el?.focus();
    }
  };

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: "#F8FAF5", fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <div
        className="relative flex items-center justify-center pt-6 pb-8"
        style={{
          background: "linear-gradient(160deg, #1B5E20 0%, #2E7D32 100%)",
          borderBottomLeftRadius: "32px",
          borderBottomRightRadius: "32px",
        }}
      >
        {step === "otp" && (
          <button
            onClick={() => setStep("phone")}
            className="absolute left-5 top-6 flex items-center justify-center w-9 h-9 rounded-full"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <ChevronLeft size={20} color="white" />
          </button>
        )}
        <div className="flex flex-col items-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)" }}
          >
            <span style={{ fontSize: "28px" }}>🌾</span>
          </div>
          <h1
            style={{
              fontFamily: "Poppins, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Krishi Bandhu
          </h1>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", marginTop: "3px" }}>
            Ministry of Agriculture • Govt. of India
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "phone" ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#212121",
                  marginBottom: "8px",
                }}
              >
                Welcome, Farmer! 🙏
              </h2>
              <p style={{ fontSize: "14px", color: "#616161", marginBottom: "28px" }}>
                Enter your mobile number to continue
              </p>

              {/* Phone input */}
              <label style={{ fontSize: "13px", fontWeight: 600, color: "#2E7D32", display: "block", marginBottom: "8px" }}>
                Mobile Number
              </label>
              <div
                className="flex items-center gap-3 rounded-2xl overflow-hidden"
                style={{
                  background: "white",
                  border: "1.5px solid #C8E6C9",
                  height: "56px",
                  boxShadow: "0 2px 12px rgba(46,125,50,0.08)",
                }}
              >
                <div
                  className="flex items-center gap-2 px-4 h-full"
                  style={{ borderRight: "1.5px solid #E8F5E9", minWidth: "72px" }}
                >
                  <span style={{ fontSize: "18px" }}>🇮🇳</span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: "#212121" }}>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  style={{
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    fontSize: "16px",
                    color: "#212121",
                    fontFamily: "Inter, sans-serif",
                    flex: 1,
                    paddingRight: "16px",
                  }}
                />
              </div>

              <div className="mt-3 flex items-center gap-2">
                <Shield size={14} color="#43A047" />
                <span style={{ fontSize: "12px", color: "#616161" }}>
                  Your data is secure. OTP will be sent via SMS.
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => phone.length === 10 && setStep("otp")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl mt-7"
                style={{
                  background:
                    phone.length === 10
                      ? "linear-gradient(135deg, #2E7D32 0%, #43A047 100%)"
                      : "#C8E6C9",
                  color: "white",
                  height: "56px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow:
                    phone.length === 10
                      ? "0 8px 24px rgba(46,125,50,0.35)"
                      : "none",
                  border: "none",
                  transition: "all 0.25s",
                }}
              >
                <Phone size={18} />
                Send OTP
              </motion.button>

              <div className="flex items-center gap-3 mt-6">
                <div style={{ flex: 1, height: "1px", background: "#E8F5E9" }} />
                <span style={{ fontSize: "12px", color: "#9E9E9E" }}>OR</span>
                <div style={{ flex: 1, height: "1px", background: "#E8F5E9" }} />
              </div>

              <button
                onClick={() => navigate("/app")}
                className="w-full mt-4 rounded-2xl"
                style={{
                  height: "50px",
                  background: "white",
                  border: "1.5px solid #C8E6C9",
                  color: "#2E7D32",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Continue as Guest
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
            >
              <h2
                style={{
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#212121",
                  marginBottom: "8px",
                }}
              >
                Verify OTP ✅
              </h2>
              <p style={{ fontSize: "14px", color: "#616161", marginBottom: "6px" }}>
                Enter 6-digit OTP sent to
              </p>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#2E7D32", marginBottom: "28px" }}>
                +91 {phone}
              </p>

              {/* OTP boxes */}
              <div className="flex gap-2 justify-between mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    className="text-center rounded-2xl"
                    style={{
                      width: "46px",
                      height: "56px",
                      background: "white",
                      border: `2px solid ${digit ? "#2E7D32" : "#C8E6C9"}`,
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "#212121",
                      fontFamily: "Poppins, sans-serif",
                      outline: "none",
                      boxShadow: digit ? "0 4px 12px rgba(46,125,50,0.15)" : "none",
                      transition: "all 0.2s",
                    }}
                  />
                ))}
              </div>

              <p style={{ fontSize: "13px", color: "#616161", textAlign: "center", marginBottom: "24px" }}>
                Didn't receive OTP?{" "}
                <span style={{ color: "#2E7D32", fontWeight: 600 }}>Resend in 30s</span>
              </p>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/app")}
                className="w-full flex items-center justify-center gap-2 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #2E7D32 0%, #43A047 100%)",
                  color: "white",
                  height: "56px",
                  fontFamily: "Poppins, sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  boxShadow: "0 8px 24px rgba(46,125,50,0.35)",
                  border: "none",
                }}
              >
                Verify & Login
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
