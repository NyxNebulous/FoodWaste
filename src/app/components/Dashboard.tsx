import React, { useState } from "react";
import { W } from "./WireTokens";
import { StatusBar, ScreenHeader, SectionLabel, Card, FoodImage, SkeletonLine, Pill, BottomTabBar, BellBtn, Toast } from "./WireUI";

import milkImg from "../../assets/food_milk.png";
import yogurtImg from "../../assets/food_yogurt.png";
import eggsImg from "../../assets/food_eggs.png";
import spinachImg from "../../assets/food_spinach.png";
import breadImg from "../../assets/food_bread.png";
import juiceImg from "../../assets/food_juice.png";

const EXPIRING = [
  { name: "Milk", sub: "1 litre · Fridge", tag: "1 day left", img: milkImg, urgency: W.accentRed },
  { name: "Yogurt", sub: "200 g · Fridge", tag: "2 days left", img: yogurtImg, urgency: W.accentAmber },
];

const ALL_ITEMS = [
  { name: "Eggs", meta: "6 pcs · 8 days left", img: eggsImg },
  { name: "Spinach", meta: "1 bunch · 5 days left", img: spinachImg },
  { name: "Bread", meta: "1 loaf · 4 days left", img: breadImg },
  { name: "Orange Juice", meta: "1 bottle · 12 days left", img: juiceImg },
];

const STATS = [
  { val: "12", lbl: "Items", color: "#F0FDF4", text: W.accentGreen },
  { val: "3",  lbl: "Expiring", color: "#FFF7ED", text: W.accentAmber },
  { val: "₹240", lbl: "Saved", color: "#F5F3FF", text: W.accentPurple },
];

export function Dashboard({ navigate }: { navigate: (screen: number) => void }) {
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: W.bgScreen, overflow: "hidden" }}>
      <StatusBar />
      <ScreenHeader
        title="FreshTrack"
        right={<BellBtn onPress={() => navigate(2)} />}
      />

      <div style={{ flex: 1, overflowY: "auto" }}>

        {/* ── Stat cards ─────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 10, padding: `0 ${W.px}px`, marginBottom: 2 }}>
          {STATS.map(s => (
            <div
              key={s.lbl}
              style={{
                flex: 1, padding: "14px 10px", textAlign: "center",
                backgroundColor: s.color, borderRadius: W.radius,
                border: `1px solid ${W.border}`,
              }}
            >
              <div style={{ fontFamily: W.font, fontSize: 22, fontWeight: 800, color: s.text, letterSpacing: "-0.5px", lineHeight: 1 }}>
                {s.val}
              </div>
              <div style={{ fontFamily: W.font, fontSize: 11, fontWeight: 600, color: W.textMuted, marginTop: 5 }}>
                {s.lbl}
              </div>
            </div>
          ))}
        </div>

        {/* ── Expiring soon ──────────────────────────────────────── */}
        <SectionLabel text="Expiring Soon" action="See all" onAction={() => navigate(2)} />
        <div style={{ padding: `0 ${W.px}px`, display: "flex", flexDirection: "column", gap: 8 }}>
          {EXPIRING.map(item => (
            <Card
              key={item.name}
              onClick={() => navigate(2)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderLeft: `3px solid ${item.urgency}`, borderRadius: W.radius }}
            >
              <FoodImage src={item.img} size={46} radius={10} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: W.font, fontSize: 15, fontWeight: 700, color: W.textPrimary, marginBottom: 3 }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted }}>{item.sub}</div>
              </div>
              <div style={{
                padding: "4px 10px", borderRadius: 99,
                backgroundColor: item.urgency + "15",
                border: `1px solid ${item.urgency}40`,
                fontFamily: W.font, fontSize: 11, fontWeight: 700, color: item.urgency,
                whiteSpace: "nowrap",
              }}>
                {item.tag}
              </div>
            </Card>
          ))}
        </div>

        {/* ── All items ──────────────────────────────────────────── */}
        <SectionLabel text="All Items" />
        <div style={{ padding: `0 ${W.px}px`, paddingBottom: 80 }}>
          <Card>
            {ALL_ITEMS.map((item, i) => (
              <div key={item.name} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                borderBottom: i < ALL_ITEMS.length - 1 ? `1px solid ${W.border}` : "none",
              }}>
                <FoodImage src={item.img} size={40} radius={9} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: W.font, fontSize: 14, fontWeight: 600, color: W.textPrimary, marginBottom: 2 }}>
                    {item.name}
                  </div>
                  <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted }}>{item.meta}</div>
                </div>
                <svg width="7" height="11" viewBox="0 0 7 11" fill="none">
                  <path d="M1 1L5.5 5.5L1 10" stroke={W.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* ── Floating add button ─────────────────────────────────── */}
      <div
        onClick={() => navigate(1)}
        style={{
          position: "absolute", bottom: 72, right: 20,
          width: 52, height: 52, borderRadius: "50%",
          backgroundColor: W.textPrimary,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 3V15M3 9H15" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </div>

      <BottomTabBar active={0} onTabChange={navigate} />
      <Toast message="✓ Item added to pantry!" visible={toast} />
    </div>
  );
}
