import { useState } from "react";
import { W } from "./components/WireTokens";
import { Dashboard } from "./components/Dashboard";
import { AddItem } from "./components/AddItem";
import { AlertScreen } from "./components/AlertScreen";
import { CommunityShare } from "./components/CommunityShare";

const font = W.font;

export default function App() {
  const [active, setActive] = useState(0);

  const navigate = (screen: number) => setActive(screen);

  const screens = [
    <Dashboard key="dashboard" navigate={navigate} />,
    <AddItem key="add" navigate={navigate} />,
    <AlertScreen key="alert" navigate={navigate} />,
    <CommunityShare key="community" navigate={navigate} />,
  ];

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#E8E8E8",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: font,
      padding: "32px 16px 48px",
    }}>

      {/* ── App title ───────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.4px" }}>
          FreshTrack
        </div>
        <div style={{ fontSize: 12, color: "#999", marginTop: 3, fontWeight: 500 }}>
          Urban Food Waste App
        </div>
      </div>

      {/* ── Phone frame ─────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>

        {/* Volume buttons (left) */}
        {[68, 110, 148].map(top => (
          <div key={top} style={{ position: "absolute", left: -5, top, width: 4, height: top === 68 ? 28 : 42, borderRadius: "3px 0 0 3px", backgroundColor: "#2a2a2a" }} />
        ))}
        {/* Power button (right) */}
        <div style={{ position: "absolute", right: -5, top: 100, width: 4, height: 56, borderRadius: "0 3px 3px 0", backgroundColor: "#2a2a2a" }} />

        {/* Outer shell */}
        <div style={{
          borderRadius: 52,
          backgroundColor: "#1C1C1C",
          padding: "12px 8px 10px",
          boxShadow: "0 28px 70px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.06)",
        }}>
          {/* Dynamic island */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
            <div style={{ width: 126, height: 34, borderRadius: 99, backgroundColor: "#000" }} />
          </div>

          {/* Screen — this is the live app */}
          <div style={{
            width: 375,
            height: 740,
            borderRadius: 42,
            overflow: "hidden",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}>
            {screens[active]}
          </div>

          {/* Home bar */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
            <div style={{ width: 132, height: 5, borderRadius: 99, backgroundColor: "#444" }} />
          </div>
        </div>
      </div>

      {/* ── Screen dots ─────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 20 }}>
        {[0, 1, 2, 3].map(i => (
          <button
            key={i}
            onClick={() => navigate(i)}
            style={{
              width: active === i ? 28 : 8,
              height: 8,
              borderRadius: 99,
              backgroundColor: active === i ? "#111" : "#BBBBBB",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>

      {/* ── Prev / Next ─────────────────────────────────────────── */}
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {[
          { dir: -1, label: "←", disabled: active === 0 },
          { dir: 1, label: "→", disabled: active === 3 },
        ].map(btn => (
          <button
            key={btn.dir}
            disabled={btn.disabled}
            onClick={() => setActive(p => p + btn.dir)}
            style={{
              width: 42, height: 42, borderRadius: 21,
              backgroundColor: btn.disabled ? "#EBEBEB" : "#fff",
              border: "1px solid #D0D0D0",
              cursor: btn.disabled ? "not-allowed" : "pointer",
              fontFamily: font, fontSize: 16,
              color: btn.disabled ? "#CCC" : "#111",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: btn.disabled ? "none" : "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>

    </div>
  );
}
