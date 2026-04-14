import React, { useState, useEffect } from "react";
import { W } from "./WireTokens";

// ─── Food Image ────────────────────────────────────────────────────────────────
export function FoodImage({
  src, size = 44, radius = W.radiusSm, style,
}: { src?: string; size?: number; radius?: number; style?: React.CSSProperties }) {
  const [err, setErr] = useState(false);
  if (!src || err) {
    return <div style={{ width: size, height: size, borderRadius: radius, backgroundColor: W.bgPlaceholder, flexShrink: 0, ...style }} />;
  }
  return (
    <img
      src={src}
      alt=""
      onError={() => setErr(true)}
      style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0, ...style }}
    />
  );
}

// ─── Avatar Circle ─────────────────────────────────────────────────────────────
export function AvatarCircle({ name, size = 40 }: { name: string; size?: number }) {
  // deterministic pastel colour from name
  const colours = ["#F1E8FF", "#E8F4FD", "#FEF3C7", "#DCFCE7", "#FCE7F3", "#E0E7FF"];
  const idx = name.charCodeAt(0) % colours.length;
  const initials = name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      backgroundColor: colours[idx],
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, fontFamily: W.font, fontSize: size * 0.36, fontWeight: 700,
      color: W.textSub, letterSpacing: "-0.5px",
    }}>
      {initials}
    </div>
  );
}

// ─── Primitives ───────────────────────────────────────────────────────────────
export function Rect({
  w, h, radius = W.radiusSm, style,
}: { w: number | string; h: number; radius?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, backgroundColor: W.bgPlaceholder, flexShrink: 0, ...style }} />
  );
}

export function SkeletonLine({ width, height = 9, style }: { width: number | string; height?: number; style?: React.CSSProperties }) {
  return (
    <div style={{ width, height, borderRadius: 99, backgroundColor: W.bgPlaceholder, ...style }} />
  );
}

export function Circle({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: W.bgPlaceholder, flexShrink: 0 }} />
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div style={{
      position: "fixed", bottom: 90, left: "50%", transform: `translateX(-50%) translateY(${visible ? 0 : 20}px)`,
      backgroundColor: W.textPrimary, color: W.textWhite,
      padding: "10px 20px", borderRadius: 99,
      fontFamily: W.font, fontSize: 13, fontWeight: 600,
      opacity: visible ? 1 : 0,
      transition: "all 0.25s ease",
      pointerEvents: "none",
      zIndex: 100,
      whiteSpace: "nowrap",
      boxShadow: "0 4px 16px rgba(0,0,0,0.22)",
    }}>
      {message}
    </div>
  );
}

// ─── Status Bar ──────────────────────────────────────────────────────────────
export function StatusBar() {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
  });
  useEffect(() => {
    const t = setInterval(() => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    }, 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 22px 6px", flexShrink: 0 }}>
      <span style={{ fontFamily: W.font, fontSize: 13, fontWeight: 700, color: W.textPrimary }}>{time}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <BarsIcon />
        <WaveIcon />
        <BatteryBox />
      </div>
    </div>
  );
}

// ─── Screen Header ────────────────────────────────────────────────────────────
export function ScreenHeader({ title, right, showBack, onBack }: {
  title: string; right?: React.ReactNode; showBack?: boolean; onBack?: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 20px 16px", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {showBack && (
          <div
            onClick={onBack}
            style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: W.bgSurface, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
              <path d="M7.5 1.5L2 7L7.5 12.5" stroke={W.textPrimary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
        <span style={{ fontFamily: W.font, fontSize: 22, fontWeight: 800, color: W.textPrimary, letterSpacing: "-0.5px" }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
export function SectionLabel({ text, action, onAction }: { text: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginTop: 20, marginBottom: 10 }}>
      <span style={{ fontFamily: W.font, fontSize: 11, fontWeight: 700, color: W.textSub, textTransform: "uppercase", letterSpacing: "0.08em" }}>{text}</span>
      {action && (
        <span
          onClick={onAction}
          style={{ fontFamily: W.font, fontSize: 13, fontWeight: 600, color: W.textPrimary, cursor: onAction ? "pointer" : "default", textDecoration: "underline", textDecorationColor: "#CCC" }}
        >
          {action}
        </span>
      )}
    </div>
  );
}

// ─── Card wrapper ─────────────────────────────────────────────────────────────
export function Card({ children, style, onClick }: { children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onClick && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        backgroundColor: W.bgCard,
        border: `1px solid ${W.border}`,
        borderRadius: W.radius,
        boxShadow: hov ? "0 4px 16px rgba(0,0,0,0.08)" : "0 1px 3px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.15s",
        cursor: onClick ? "pointer" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── Primary Button ───────────────────────────────────────────────────────────
export function PrimaryBtn({ label, onClick, full }: { label: string; onClick?: () => void; full?: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        width: full ? "100%" : "auto",
        padding: "14px 20px",
        backgroundColor: W.btnPrimary,
        color: W.textWhite,
        border: "none",
        borderRadius: W.radiusSm + 2,
        fontFamily: W.font,
        fontSize: 15,
        fontWeight: 700,
        cursor: "pointer",
        letterSpacing: "-0.1px",
        transform: pressed ? "scale(0.98)" : "scale(1)",
        transition: "transform 0.1s",
      }}
    >
      {label}
    </button>
  );
}

// ─── Secondary Button ─────────────────────────────────────────────────────────
export function SecondaryBtn({ label, onClick, full }: { label: string; onClick?: () => void; full?: boolean }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: full ? "100%" : "auto",
        padding: "14px 20px",
        backgroundColor: W.btnSecondary,
        color: W.textPrimary,
        border: `1px solid ${W.borderMid}`,
        borderRadius: W.radiusSm + 2,
        fontFamily: W.font,
        fontSize: 15,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

// ─── Input Field ──────────────────────────────────────────────────────────────
export function InputField({ label, hint, value, onChange }: {
  label: string; hint?: string; value?: string; onChange?: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontFamily: W.font, fontSize: 12, fontWeight: 700, color: W.textSub, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <input
        type="text"
        placeholder={hint || ""}
        value={value ?? ""}
        onChange={e => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          backgroundColor: W.bgInput,
          border: `1.5px solid ${focused ? W.textPrimary : W.border}`,
          borderRadius: W.radiusSm,
          padding: "12px 14px",
          fontFamily: W.font,
          fontSize: 14,
          color: W.textPrimary,
          outline: "none",
          transition: "border-color 0.15s",
        }}
      />
    </div>
  );
}

// ─── Pill chip ────────────────────────────────────────────────────────────────
export function Pill({ label, dark, onClick }: { label: string; dark?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center",
        padding: "5px 12px", borderRadius: 99,
        backgroundColor: dark ? W.btnPrimary : W.bgChip,
        border: `1px solid ${dark ? W.btnPrimary : W.borderMid}`,
        fontFamily: W.font, fontSize: 12, fontWeight: 600,
        color: dark ? W.textWhite : W.textSub,
        whiteSpace: "nowrap",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {label}
    </div>
  );
}

// ─── Tag badge ────────────────────────────────────────────────────────────────
export function Tag({ label }: { label: string }) {
  return (
    <div style={{
      padding: "3px 9px", borderRadius: 6,
      backgroundColor: W.bgSurface, border: `1px solid ${W.borderMid}`,
      fontFamily: W.font, fontSize: 11, fontWeight: 600, color: W.textSub,
    }}>
      {label}
    </div>
  );
}

// ─── Star row ─────────────────────────────────────────────────────────────────
export function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M5.5 1L6.8 4.1H10L7.4 6.1L8.4 9.2L5.5 7.4L2.6 9.2L3.6 6.1L1 4.1H4.2L5.5 1Z"
            fill={i <= count ? "#F59E0B" : W.bgPlaceholder} />
        </svg>
      ))}
    </div>
  );
}

// ─── Verified badge ───────────────────────────────────────────────────────────
export function VerifiedDot() {
  return (
    <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: W.textPrimary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
        <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Horizontal divider ───────────────────────────────────────────────────────
export function HDivider({ label }: { label?: string }) {
  if (!label) return <div style={{ height: 1, backgroundColor: W.border, margin: "14px 0" }} />;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "16px 0" }}>
      <div style={{ flex: 1, height: 1, backgroundColor: W.border }} />
      <span style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted, fontWeight: 500 }}>{label}</span>
      <div style={{ flex: 1, height: 1, backgroundColor: W.border }} />
    </div>
  );
}

// ─── Scan area icon ───────────────────────────────────────────────────────────
export function ScanCorners() {
  const corner = (rotate: number) => (
    <svg key={rotate} width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M2 14V4C2 2.9 2.9 2 4 2H14" stroke={W.textPrimary} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 14, left: 14 }}>{corner(0)}</div>
      <div style={{ position: "absolute", top: 14, right: 14 }}>{corner(90)}</div>
      <div style={{ position: "absolute", bottom: 14, right: 14 }}>{corner(180)}</div>
      <div style={{ position: "absolute", bottom: 14, left: 14 }}>{corner(270)}</div>
    </div>
  );
}

// ─── Bottom Tab Bar ───────────────────────────────────────────────────────────
const TABS = ["Home", "Add", "Alert", "Share"] as const;

export function BottomTabBar({ active, onTabChange }: { active: number; onTabChange?: (i: number) => void }) {
  return (
    <div style={{ flexShrink: 0, borderTop: `1px solid ${W.border}`, backgroundColor: W.bgScreen, display: "flex", paddingBottom: 10 }}>
      {TABS.map((tab, i) => {
        const on = i === active;
        return (
          <div
            key={tab}
            onClick={() => onTabChange?.(i)}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, gap: 4, cursor: "pointer" }}
          >
            <TabIcon index={i} active={on} />
            <span style={{ fontFamily: W.font, fontSize: 10, fontWeight: on ? 700 : 500, color: on ? W.textPrimary : W.textMuted, transition: "color 0.15s" }}>{tab}</span>
            <div style={{ width: on ? 20 : 0, height: 2.5, borderRadius: 99, backgroundColor: W.textPrimary, transition: "width 0.2s" }} />
          </div>
        );
      })}
    </div>
  );
}

// ─── Notification bell ────────────────────────────────────────────────────────
export function BellBtn({ onPress }: { onPress?: () => void }) {
  return (
    <div
      onClick={onPress}
      style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: W.bgSurface, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", cursor: "pointer" }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2C6.5 2 4.5 4 4.5 6.5V10.5L3 12.5H15L13.5 10.5V6.5C13.5 4 11.5 2 9 2Z" stroke={W.textSub} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M7.5 13.5C7.5 14.3 8.2 15 9 15C9.8 15 10.5 14.3 10.5 13.5" stroke={W.textSub} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, borderRadius: "50%", backgroundColor: W.accentRed, border: "1.5px solid #fff" }} />
    </div>
  );
}

// ─── Internal SVG Icons ───────────────────────────────────────────────────────
function BarsIcon() {
  return (
    <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
      {[0, 3, 6, 9].map((x, i) => (
        <rect key={x} x={x} y={i === 3 ? 0 : i === 0 ? 5 : i === 1 ? 3 : 1} width="2.5" height={i === 3 ? 9 : i === 2 ? 6 : i === 1 ? 6 : 4} rx="0.5" fill={i === 3 ? W.bgPlaceholder : W.textPrimary} />
      ))}
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5C2.5 2 4.5 0.5 7 0.5C9.5 0.5 11.5 2 13 5" stroke={W.bgPlaceholder} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M3 6.5C4 4.5 5.4 3.5 7 3.5C8.6 3.5 10 4.5 11 6.5" stroke={W.textPrimary} strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <circle cx="7" cy="9" r="1.2" fill={W.textPrimary} />
    </svg>
  );
}

function BatteryBox() {
  return (
    <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
      <rect x="0.5" y="0.5" width="17" height="9" rx="2" stroke={W.textPrimary} />
      <rect x="2" y="2" width="11" height="6" rx="1" fill={W.textPrimary} />
      <path d="M18.5 3.5V6.5C19.5 6.2 19.5 3.8 18.5 3.5Z" fill={W.textPrimary} />
    </svg>
  );
}

function TabIcon({ index, active }: { index: number; active: boolean }) {
  const c = active ? W.textPrimary : W.textMuted;
  const sw = active ? "2" : "1.5";
  if (index === 0) return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 9L10 3L18 9V17H13.5V13H6.5V17H2V9Z" stroke={c} strokeWidth={sw} strokeLinejoin="round" fill={active ? W.bgPlaceholder : "none"} />
    </svg>
  );
  if (index === 1) return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="14" height="14" rx="4" stroke={c} strokeWidth={sw} fill={active ? W.bgPlaceholder : "none"} />
      <path d="M10 7V13M7 10H13" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
  if (index === 2) return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2C7 2 5 4.5 5 7V11L3 13.5H17L15 11V7C15 4.5 13 2 10 2Z" stroke={c} strokeWidth={sw} fill={active ? W.bgPlaceholder : "none"} strokeLinecap="round" />
      <path d="M8 14.5C8 15.3 8.9 16 10 16C11.1 16 12 15.3 12 14.5" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="15" cy="5" r="2.5" stroke={c} strokeWidth={sw} fill={active ? W.bgPlaceholder : "none"} />
      <circle cx="15" cy="15" r="2.5" stroke={c} strokeWidth={sw} fill={active ? W.bgPlaceholder : "none"} />
      <circle cx="5" cy="10" r="2.5" stroke={c} strokeWidth={sw} fill={active ? W.bgPlaceholder : "none"} />
      <path d="M7.2 8.8L12.8 6.2M7.2 11.2L12.8 13.8" stroke={c} strokeWidth={sw} strokeLinecap="round" />
    </svg>
  );
}
