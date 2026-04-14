import React, { useState } from "react";
import { W } from "./WireTokens";
import { StatusBar, ScreenHeader, Card, FoodImage, BottomTabBar, Toast } from "./WireUI";

import milkImg from "../../assets/food_milk.png";

export function AlertScreen({ navigate }: { navigate: (screen: number) => void }) {
  const [action, setAction] = useState<null | "use" | "share" | "snooze">(null);
  const [toast, setToast] = useState("");

  const handleAction = (act: "use" | "share" | "snooze") => {
    setAction(act);
    if (act === "share") {
      setToast("Listed for sharing in community!");
      setTimeout(() => { setToast(""); navigate(3); }, 1600);
    } else if (act === "use") {
      setToast("Marked as used today ✓");
      setTimeout(() => setToast(""), 2000);
    } else {
      setToast("Reminder set for 6 hours");
      setTimeout(() => setToast(""), 2000);
    }
  };

  const urgencyPct = 15; // 1 day left out of ~7

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: W.bgSurface, overflow: "hidden" }}>
      <StatusBar />
      <ScreenHeader title="Alerts" />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${W.px}px 20px` }}>

        {/* ── Count badge ────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: W.accentRed }} />
          <span style={{ fontFamily: W.font, fontSize: 13, fontWeight: 600, color: W.textSub }}>
            1 item needs your attention today
          </span>
        </div>

        {/* ── Main alert card ────────────────────────────────────── */}
        <Card style={{ padding: 20, marginBottom: 12 }}>
          {/* Item header */}
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
            <FoodImage src={milkImg} size={72} radius={12} />
            <div style={{ flex: 1, paddingTop: 2 }}>
              <div style={{ fontFamily: W.font, fontSize: 20, fontWeight: 800, color: W.textPrimary, letterSpacing: "-0.3px", marginBottom: 4 }}>
                Milk 1L
              </div>
              <div style={{ fontFamily: W.font, fontSize: 13, color: W.accentRed, fontWeight: 600, marginBottom: 8 }}>
                Expires Apr 15 · 1 day left
              </div>
              {/* Urgency bar */}
              <div style={{ height: 5, borderRadius: 99, backgroundColor: W.bgPlaceholder, overflow: "hidden" }}>
                <div style={{ width: `${urgencyPct}%`, height: "100%", borderRadius: 99, backgroundColor: W.accentRed, transition: "width 0.6s ease" }} />
              </div>
            </div>
          </div>

          {/* AI suggestion */}
          <div style={{ backgroundColor: W.bgSurface, borderRadius: 10, padding: "11px 13px", marginBottom: 16 }}>
            <div style={{ fontFamily: W.font, fontSize: 11, fontWeight: 700, color: W.textMuted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>
              💡 AI Suggestion
            </div>
            <div style={{ fontFamily: W.font, fontSize: 13, color: W.textSub, lineHeight: 1.5 }}>
              Use this milk today in your morning coffee or oatmeal. Alternatively, share it with a neighbour before it expires.
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: W.border, marginBottom: 14 }} />

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
            <button
              onClick={() => handleAction("use")}
              style={{
                flex: 1, padding: "14px 0",
                backgroundColor: action === "use" ? W.accentGreen : W.btnPrimary,
                color: W.textWhite, border: "none", borderRadius: 10,
                fontFamily: W.font, fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "background-color 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}
            >
              {action === "use" ? "✓ Done!" : "Use Now"}
            </button>
            <button
              onClick={() => handleAction("share")}
              style={{
                flex: 1, padding: "14px 0",
                backgroundColor: action === "share" ? W.bgSurface : W.btnSecondary,
                color: W.textPrimary, border: `1px solid ${W.borderMid}`,
                borderRadius: 10, fontFamily: W.font, fontSize: 15, fontWeight: 700, cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              {action === "share" ? "Shared!" : "Share"}
            </button>
          </div>

          {/* Snooze */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => handleAction("snooze")}
              style={{
                background: "none", border: "none", padding: 0, cursor: "pointer",
                fontFamily: W.font, fontSize: 13,
                color: action === "snooze" ? W.textPrimary : W.textMuted,
                fontWeight: action === "snooze" ? 600 : 500,
              }}
            >
              {action === "snooze" ? "⏰ Reminder set" : "Remind me in 6 hours"}
            </button>
          </div>
        </Card>

        {/* ── Notification settings ──────────────────────────────── */}
        <Card style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: W.font, fontSize: 14, fontWeight: 700, color: W.textPrimary, marginBottom: 4 }}>
                Notifications
              </div>
              <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted }}>Max 1 alert per day · Smart timing</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Toggle pill — on */}
              <div style={{ width: 44, height: 24, borderRadius: 99, backgroundColor: W.textPrimary, position: "relative", cursor: "pointer" }}>
                <div style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, borderRadius: "50%", backgroundColor: "#fff" }} />
              </div>
            </div>
          </div>
          <div style={{ marginTop: 12, height: 1, backgroundColor: W.border }} />
          <button style={{
            width: "100%", background: "none", border: "none", padding: "10px 0 0", cursor: "pointer",
            fontFamily: W.font, fontSize: 13, color: W.textMuted, textAlign: "left",
          }}>
            Manage notification preferences →
          </button>
        </Card>

      </div>

      <BottomTabBar active={2} onTabChange={navigate} />
      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
