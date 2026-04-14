import React, { useState } from "react";
import { W } from "./WireTokens";
import { StatusBar, ScreenHeader, Card, PrimaryBtn, InputField, HDivider, Pill, BottomTabBar, ScanCorners, FoodImage, Toast } from "./WireUI";

import milkImg from "../../assets/food_milk.png";
import yogurtImg from "../../assets/food_yogurt.png";
import breadImg from "../../assets/food_bread.png";
import juiceImg from "../../assets/food_juice.png";

const DETECTED = [
  { name: "Milk 1L", expiry: "Apr 16", img: milkImg },
  { name: "Greek Yogurt", expiry: "Apr 18", img: yogurtImg },
  { name: "Sliced Bread", expiry: "Apr 19", img: breadImg },
  { name: "Orange Juice", expiry: "Apr 20", img: juiceImg },
  { name: "Cheddar Cheese", expiry: "Apr 25", img: undefined },
];

export function AddItem({ navigate }: { navigate: (screen: number) => void }) {
  const [scanned, setScanned] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [checked, setChecked] = useState(DETECTED.map(() => true));
  const [toast, setToast] = useState(false);
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiry, setExpiry] = useState("");

  const toggleCheck = (i: number) => {
    const n = [...checked];
    n[i] = !n[i];
    setChecked(n);
  };

  const handleScanClick = () => {
    setScanning(true);
    setTimeout(() => { setScanning(false); setScanned(true); }, 1200);
  };

  const handleAddItems = () => {
    setToast(true);
    setTimeout(() => { setToast(false); navigate(0); }, 1800);
  };

  const handleAddManual = () => {
    if (!itemName.trim()) return;
    setToast(true);
    setTimeout(() => { setToast(false); navigate(0); }, 1800);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: W.bgScreen, overflow: "hidden" }}>
      <StatusBar />
      <ScreenHeader title="Add Item" showBack onBack={() => navigate(0)} />

      <div style={{ flex: 1, overflowY: "auto", padding: `0 ${W.px}px 24px` }}>

        {/* ── Scan zone ──────────────────────────────────────────── */}
        {!scanned ? (
          <div
            onClick={!scanning ? handleScanClick : undefined}
            style={{
              position: "relative",
              border: `2px dashed ${scanning ? W.textPrimary : W.borderDash}`,
              borderRadius: 18,
              backgroundColor: scanning ? "#F8F8F8" : W.bgSurface,
              padding: "36px 20px 28px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              cursor: scanning ? "default" : "pointer",
              marginBottom: 6,
              transition: "all 0.2s",
            }}
          >
            <ScanCorners />
            {/* Camera icon */}
            <div style={{
              width: 56, height: 56, borderRadius: 16,
              backgroundColor: W.bgPlaceholder,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="2" y="8" width="24" height="17" rx="3" stroke={W.textSub} strokeWidth="1.8" />
                <circle cx="14" cy="16" r="4.5" stroke={W.textSub} strokeWidth="1.8" />
                <path d="M10 8L11.5 5H16.5L18 8" stroke={W.textSub} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="22" cy="11" r="1.5" fill={W.textSub} />
              </svg>
            </div>
            <div style={{ fontFamily: W.font, fontSize: 16, fontWeight: 700, color: W.textPrimary }}>
              {scanning ? "Scanning…" : "Scan Receipt or Package"}
            </div>
            <div style={{ fontFamily: W.font, fontSize: 13, color: W.textMuted, textAlign: "center", lineHeight: 1.5, maxWidth: 200 }}>
              {scanning ? "AI is reading your items…" : "AI reads items and expiry dates automatically"}
            </div>
            {!scanning && (
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {["Receipt", "Barcode", "Photo"].map(m => <Pill key={m} label={m} />)}
              </div>
            )}
            {scanning && (
              <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `3px solid ${W.border}`,
                  borderTopColor: W.textPrimary,
                  animation: "spin 0.7s linear infinite",
                }} />
              </div>
            )}
          </div>
        ) : (
          /* ── Detected results ────────────────────────────────── */
          <Card style={{ overflow: "hidden", marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", borderBottom: `1px solid ${W.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: W.accentGreen }} />
                <span style={{ fontFamily: W.font, fontSize: 14, fontWeight: 700, color: W.textPrimary }}>
                  {checked.filter(Boolean).length} items detected
                </span>
              </div>
              <span
                onClick={() => setScanned(false)}
                style={{ fontFamily: W.font, fontSize: 13, color: W.textMuted, cursor: "pointer", fontWeight: 500 }}
              >
                Rescan
              </span>
            </div>
            {DETECTED.map((item, i) => (
              <div key={item.name} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "11px 16px",
                borderBottom: i < DETECTED.length - 1 ? `1px solid ${W.border}` : "none",
                opacity: checked[i] ? 1 : 0.4,
                transition: "opacity 0.15s",
              }}>
                <FoodImage src={item.img} size={36} radius={8} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: W.font, fontSize: 14, fontWeight: 600, color: W.textPrimary }}>{item.name}</div>
                  <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted, marginTop: 2 }}>Expires {item.expiry}</div>
                </div>
                <div
                  onClick={() => toggleCheck(i)}
                  style={{
                    width: 20, height: 20, borderRadius: 5, flexShrink: 0, cursor: "pointer",
                    border: `1.5px solid ${checked[i] ? W.btnPrimary : W.borderMid}`,
                    backgroundColor: checked[i] ? W.btnPrimary : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.15s",
                  }}
                >
                  {checked[i] && (
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                      <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </Card>
        )}

        {scanned && (
          <div style={{ marginBottom: 16 }}>
            <PrimaryBtn label={`Add ${checked.filter(Boolean).length} Items to Pantry`} full onClick={handleAddItems} />
          </div>
        )}

        {/* ── Or add manually ──────────────────────────────────── */}
        <HDivider label="or add manually" />

        <InputField label="Item Name" hint="e.g. Milk" value={itemName} onChange={setItemName} />
        <InputField label="Quantity" hint="e.g. 1 litre" value={quantity} onChange={setQuantity} />
        <InputField label="Expiry Date" hint="DD / MM / YYYY" value={expiry} onChange={setExpiry} />

        <div style={{ marginTop: 6 }}>
          <PrimaryBtn label="Add Item" full onClick={handleAddManual} />
        </div>
      </div>

      <BottomTabBar active={1} onTabChange={navigate} />
      <Toast message="✓ Items added to pantry!" visible={toast} />

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
