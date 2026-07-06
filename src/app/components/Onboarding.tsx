import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 0,
    emoji: "📸",
    bgFrom: "#1B5E20",
    bgTo: "#2E7D32",
    illustration: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="75" fill="rgba(255,255,255,0.1)" />
        <rect x="45" y="65" width="90" height="68" rx="14" fill="rgba(255,255,255,0.9)" />
        <circle cx="90" cy="99" r="20" fill="#43A047" />
        <circle cx="90" cy="99" r="14" fill="#66BB6A" />
        <circle cx="90" cy="99" r="6" fill="white" />
        <rect x="62" y="72" width="16" height="10" rx="5" fill="#E8F5E9" />
        <circle cx="125" cy="75" r="5" fill="#FF7043" />
        <path d="M55 155 Q90 130 125 155" fill="#795548" opacity="0.4" />
        <rect x="70" y="148" width="40" height="12" rx="4" fill="#795548" opacity="0.5" />
        {/* Phone camera overlay lines */}
        <path d="M58 80 L58 68 L70 68" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M122 80 L122 68 L110 68" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M58 118 L58 130 L70 130" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M122 118 L122 130 L110 130" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: "फसल स्कैन करें",
    titleEn: "Scan Your Crop",
    desc: "अपने फोन से फसल की फोटो लें और AI तुरंत पहचानेगा",
    descEn: "Take a photo of your crop and let AI identify problems instantly",
  },
  {
    id: 1,
    emoji: "🤖",
    bgFrom: "#1565C0",
    bgTo: "#1976D2",
    illustration: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="75" fill="rgba(255,255,255,0.1)" />
        {/* AI Brain */}
        <ellipse cx="90" cy="80" rx="40" ry="38" fill="rgba(255,255,255,0.85)" />
        <path d="M65 80 Q65 55 90 55 Q115 55 115 80" stroke="#1976D2" strokeWidth="3" fill="none" />
        <path d="M70 85 Q70 105 90 108 Q110 105 110 85" stroke="#1976D2" strokeWidth="2" fill="none" />
        <circle cx="80" cy="72" r="5" fill="#42A5F5" />
        <circle cx="100" cy="72" r="5" fill="#42A5F5" />
        <circle cx="90" cy="90" r="7" fill="#1976D2" />
        {/* Signal lines */}
        <path d="M130 50 Q145 65 145 90" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="4 3" />
        <path d="M50 50 Q35 65 35 90" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="4 3" />
        {/* Result badge */}
        <rect x="60" y="125" width="60" height="26" rx="13" fill="rgba(255,255,255,0.9)" />
        <text x="90" y="143" textAnchor="middle" fill="#1976D2" fontSize="11" fontWeight="bold">95% Accurate</text>
      </svg>
    ),
    title: "AI रोग पहचाने",
    titleEn: "AI Detects Disease",
    desc: "हमारा AI इंजन पत्ती, रंग और लक्षणों से रोग का निदान करता है",
    descEn: "Our AI engine diagnoses diseases from leaf patterns, color & symptoms",
  },
  {
    id: 2,
    emoji: "🏛️",
    bgFrom: "#4A148C",
    bgTo: "#6A1B9A",
    illustration: (
      <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="75" fill="rgba(255,255,255,0.1)" />
        {/* Building */}
        <rect x="50" y="70" width="80" height="70" rx="4" fill="rgba(255,255,255,0.85)" />
        <rect x="55" y="60" width="70" height="16" rx="4" fill="rgba(255,255,255,0.7)" />
        <rect x="70" y="52" width="40" height="12" rx="3" fill="rgba(255,255,255,0.6)" />
        {/* Windows */}
        <rect x="60" y="80" width="16" height="18" rx="2" fill="#CE93D8" />
        <rect x="82" y="80" width="16" height="18" rx="2" fill="#CE93D8" />
        <rect x="104" y="80" width="16" height="18" rx="2" fill="#CE93D8" />
        {/* Door */}
        <rect x="79" y="108" width="22" height="32" rx="4" fill="#AB47BC" />
        {/* Pillars */}
        <rect x="56" y="63" width="5" height="77" fill="rgba(255,255,255,0.4)" />
        <rect x="119" y="63" width="5" height="77" fill="rgba(255,255,255,0.4)" />
        {/* Rupee coin */}
        <circle cx="140" cy="55" r="16" fill="rgba(255,255,255,0.9)" />
        <text x="140" y="61" textAnchor="middle" fill="#6A1B9A" fontSize="14" fontWeight="bold">₹</text>
        {/* Check mark */}
        <circle cx="42" cy="55" r="16" fill="rgba(76,175,80,0.9)" />
        <path d="M34 55 L40 62 L52 48" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "सरकारी सहायता पाएं",
    titleEn: "Get Government Support",
    desc: "योजनाओं, सब्सिडी और कृषि अधिकारी से सीधे जुड़ें",
    descEn: "Connect directly with schemes, subsidies & agricultural officers",
  },
];

export function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const slide = slides[current];

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1);
    else navigate("/login");
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Skip */}
      <div className="flex justify-end px-6 pt-4">
        <button
          onClick={() => navigate("/login")}
          style={{ fontSize: "14px", color: "#616161", fontWeight: 500 }}
        >
          Skip
        </button>
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="flex-1 flex flex-col"
        >
          {/* Illustration area */}
          <div
            className="mx-6 rounded-3xl flex items-center justify-center"
            style={{
              background: `linear-gradient(140deg, ${slide.bgFrom} 0%, ${slide.bgTo} 100%)`,
              height: "280px",
              boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
            }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {slide.illustration}
            </motion.div>
          </div>

          {/* Text */}
          <div className="px-8 pt-8 flex-1">
            <h2
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "26px",
                fontWeight: 700,
                color: "#212121",
                marginBottom: "8px",
                lineHeight: 1.3,
              }}
            >
              {slide.title}
            </h2>
            <p
              style={{
                fontSize: "13px",
                color: "#43A047",
                fontWeight: 600,
                marginBottom: "12px",
                letterSpacing: "0.2px",
              }}
            >
              {slide.titleEn}
            </p>
            <p style={{ fontSize: "15px", color: "#616161", lineHeight: 1.6 }}>
              {slide.desc}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots + Button */}
      <div className="px-6 pb-6">
        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrent(i)}
              animate={{ width: i === current ? "24px" : "8px" }}
              transition={{ duration: 0.3 }}
              style={{
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "#2E7D32" : "#C8E6C9",
                border: "none",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={next}
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
          {current === slides.length - 1 ? "Get Started" : "Next"}
          <ChevronRight size={20} />
        </motion.button>
      </div>
    </div>
  );
}
