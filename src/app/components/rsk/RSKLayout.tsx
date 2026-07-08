import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, FileText, Users, BarChart2, Bell, X, Settings, LogOut, Shield, Activity, Cloud, BookOpen, TrendingUp, Map } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", path: "/rsk/app" },
  { icon: FileText, label: "Cases", path: "/rsk/app/cases" },
  { icon: Users, label: "Farmers", path: "/rsk/app/farmers" },
  { icon: BarChart2, label: "Analytics", path: "/rsk/app/analytics" },
  { icon: Bell, label: "Alerts", path: "/rsk/app/alerts" },
];

const drawerItems = [
  { icon: Home, label: "Dashboard", path: "/rsk/app" },
  { icon: FileText, label: "Escalated Cases", path: "/rsk/app/cases", badge: "23" },
  { icon: Activity, label: "Active Cases", path: "/rsk/app/cases" },
  { icon: Shield, label: "Resolved Cases", path: "/rsk/app/cases" },
  { icon: Users, label: "Farmer Directory", path: "/rsk/app/farmers" },
  { icon: Activity, label: "Disease Detection", path: "/rsk/app/disease" },
  { icon: BookOpen, label: "Govt. Schemes", path: "/rsk/app/alerts" },
  { icon: Cloud, label: "Weather Alerts", path: "/rsk/app/alerts" },
  { icon: TrendingUp, label: "Analytics", path: "/rsk/app/analytics" },
  { icon: Map, label: "Reports", path: "/rsk/app/analytics" },
  { icon: Bell, label: "Notifications", path: "/rsk/app/alerts" },
  { icon: Settings, label: "Settings", path: "/rsk/app/profile" },
];

export function RSKLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/rsk/app") return location.pathname === "/rsk/app";
    return location.pathname.startsWith(path) && path !== "/rsk/app";
  };

  const go = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <div className="relative flex flex-col h-full" style={{ fontFamily: "Inter, sans-serif", background: "#F8FAF5" }}>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "linear-gradient(135deg, #BF360C 0%, #E65100 100%)",
          boxShadow: "0 4px 16px rgba(191,54,12,0.25)",
        }}
      >
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col gap-1 justify-center"
          style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", borderRadius: "10px", border: "none", alignItems: "center" }}
        >
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: "16px", height: "1.5px", background: "white", borderRadius: "2px" }} />
          ))}
        </button>

        <div className="flex items-center gap-2">
          <div
            className="rounded-xl flex items-center justify-center"
            style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.15)", fontSize: "14px" }}
          >
            🎖️
          </div>
          <div>
            <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "13px", fontWeight: 700, color: "white", lineHeight: 1 }}>
              RSK Dashboard
            </p>
            <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)", marginTop: "1px" }}>Rythu Seva Kendra</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => navigate("/rsk/app/alerts")}
            className="flex items-center justify-center rounded-xl"
            style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.15)", border: "none" }}
          >
            <Bell size={18} color="white" />
          </button>
          <div
            className="absolute flex items-center justify-center rounded-full"
            style={{ width: "14px", height: "14px", background: "#D32F2F", top: "-3px", right: "-3px", fontSize: "8px", color: "white", fontWeight: 700 }}
          >
            4
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ paddingBottom: "72px" }}>
        <Outlet />
      </div>

      {/* Bottom Nav */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center"
        style={{
          background: "white",
          borderTop: "1px solid #FBE9E7",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
          height: "72px",
          paddingBottom: "8px",
        }}
      >
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <motion.button
              key={item.path}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1"
              style={{ background: "transparent", border: "none" }}
            >
              <div
                className="flex items-center justify-center rounded-2xl"
                style={{ width: "44px", height: "28px", background: active ? "#FBE9E7" : "transparent" }}
              >
                <Icon size={22} color={active ? "#E65100" : "#9E9E9E"} strokeWidth={active ? 2.5 : 1.8} />
              </div>
              <span style={{ fontSize: "10px", color: active ? "#E65100" : "#9E9E9E", fontWeight: active ? 600 : 400 }}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Drawer Overlay */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(2px)" }}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute top-0 left-0 bottom-0 z-50 flex flex-col"
              style={{ width: "280px", background: "white", boxShadow: "8px 0 30px rgba(0,0,0,0.15)" }}
            >
              {/* Drawer header */}
              <div
                className="px-5 pt-5 pb-5 flex items-start justify-between"
                style={{ background: "linear-gradient(135deg, #BF360C 0%, #E65100 100%)" }}
              >
                <div>
                  <div
                    className="rounded-2xl flex items-center justify-center mb-3"
                    style={{ width: "52px", height: "52px", background: "rgba(255,255,255,0.2)", fontSize: "24px" }}
                  >
                    🎖️
                  </div>
                  <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "15px", fontWeight: 700, color: "white" }}>
                    K. Srinivas Rao
                  </p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>RSK Officer • Nalgonda</p>
                  <div
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mt-1"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#4CAF50" }} />
                    <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.9)" }}>Online</span>
                  </div>
                </div>
                <button
                  onClick={() => setDrawerOpen(false)}
                  style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: "10px", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <X size={16} color="white" />
                </button>
              </div>

              {/* Drawer menu */}
              <div className="flex-1 overflow-y-auto py-3">
                {drawerItems.map((item, i) => {
                  const active = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => go(item.path)}
                      className="w-full flex items-center gap-3 px-5 py-3"
                      style={{
                        background: active ? "#FBE9E7" : "transparent",
                        border: "none",
                        textAlign: "left",
                        borderLeft: active ? "3px solid #E65100" : "3px solid transparent",
                      }}
                    >
                      <Icon size={18} color={active ? "#E65100" : "#616161"} />
                      <span style={{ fontSize: "14px", fontWeight: active ? 600 : 400, color: active ? "#E65100" : "#424242", flex: 1 }}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className="px-2 py-0.5 rounded-full"
                          style={{ background: "#D32F2F", color: "white", fontSize: "10px", fontWeight: 700 }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div className="px-5 py-4" style={{ borderTop: "1px solid #F5F5F5" }}>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-3"
                  style={{ background: "none", border: "none" }}
                >
                  <LogOut size={18} color="#D32F2F" />
                  <span style={{ fontSize: "14px", color: "#D32F2F", fontWeight: 600 }}>Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
