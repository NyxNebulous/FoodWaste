import React, { useState } from "react";
import { W } from "./WireTokens";
import { StatusBar, ScreenHeader, SectionLabel, Card, AvatarCircle, FoodImage, Pill, Tag, Stars, VerifiedDot, BottomTabBar, Toast } from "./WireUI";

import milkImg from "../../assets/food_milk.png";
import yogurtImg from "../../assets/food_yogurt.png";
import juiceImg from "../../assets/food_juice.png";

const LISTINGS = [
  {
    id: 1,
    name: "Sarah M.", unit: "Unit 3A · 0.1 km",
    item: "Milk 1L", expiry: "Apr 15", expiryNote: "Tomorrow",
    stars: 5, verified: true, tag: "Sealed",
    img: milkImg,
    description: "Unopened, fully sealed. Bought extra by mistake.",
  },
  {
    id: 2,
    name: "James R.", unit: "Unit 5C · 0.3 km",
    item: "Greek Yogurt", expiry: "Apr 17", expiryNote: "3 days",
    stars: 4, verified: true, tag: "Fridge-stored",
    img: yogurtImg,
    description: "Stored properly at all times. Foil is intact.",
  },
  {
    id: 3,
    name: "Anika T.", unit: "Unit 2B · 0.5 km",
    item: "Orange Juice", expiry: "Apr 18", expiryNote: "4 days",
    stars: 3, verified: false, tag: "Unopened",
    img: juiceImg,
    description: "Brand new. Never opened. Moving out soon.",
  },
];

type Filter = "All" | "Near Me" | "Verified";
const FILTERS: Filter[] = ["All", "Near Me", "Verified"];

export function CommunityShare({ navigate }: { navigate: (screen: number) => void }) {
  const [claimed, setClaimed] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<Filter>("All");
  const [toast, setToast] = useState("");

  const filtered = LISTINGS.filter(l => {
    if (filter === "Verified") return l.verified;
    if (filter === "Near Me") return parseFloat(l.unit.split("· ")[1]) <= 0.3;
    return true;
  });

  const toggleClaim = (id: number, name: string, item: string) => {
    setClaimed(prev => {
      const n = new Set(prev);
      if (n.has(id)) {
        n.delete(id);
      } else {
        n.add(id);
        setToast(`Claimed ${item} from ${name}!`);
        setTimeout(() => setToast(""), 2000);
      }
      return n;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", backgroundColor: W.bgScreen, overflow: "hidden" }}>
      <StatusBar />
      <ScreenHeader title="Community" />

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 16 }}>

        {/* ── Filter pills ───────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 8, padding: `0 ${W.px}px`, marginBottom: 4, overflowX: "auto" }}>
          {FILTERS.map(f => (
            <Pill key={f} label={f} dark={filter === f} onClick={() => setFilter(f)} />
          ))}
        </div>

        {/* ── Listings ───────────────────────────────────────────── */}
        <SectionLabel
          text="Available Near You"
          action={`${filtered.length} item${filtered.length !== 1 ? "s" : ""}`}
        />
        <div style={{ padding: `0 ${W.px}px`, display: "flex", flexDirection: "column", gap: 10 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: 24, fontFamily: W.font, fontSize: 14, color: W.textMuted }}>
              No items match this filter.
            </div>
          )}
          {filtered.map(listing => {
            const isClaimed = claimed.has(listing.id);
            return (
              <Card key={listing.id} style={{ padding: 16, opacity: isClaimed ? 0.55 : 1, transition: "opacity 0.15s" }}>
                {/* Row 1: user identity */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <AvatarCircle name={listing.name} size={42} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ fontFamily: W.font, fontSize: 14, fontWeight: 700, color: W.textPrimary }}>
                        {listing.name}
                      </span>
                      {listing.verified && <VerifiedDot />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Stars count={listing.stars} />
                      <span style={{ fontFamily: W.font, fontSize: 11, color: W.textMuted }}>{listing.unit}</span>
                    </div>
                  </div>
                  {/* Claim button */}
                  <button
                    onClick={() => toggleClaim(listing.id, listing.name, listing.item)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: isClaimed ? W.btnSecondary : W.btnPrimary,
                      color: isClaimed ? W.textSub : W.textWhite,
                      border: isClaimed ? `1px solid ${W.borderMid}` : "none",
                      borderRadius: 9, fontFamily: W.font, fontSize: 13, fontWeight: 700,
                      cursor: "pointer", flexShrink: 0, transition: "all 0.15s",
                    }}
                  >
                    {isClaimed ? "✓ Claimed" : "Claim"}
                  </button>
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: W.border, marginBottom: 12 }} />

                {/* Row 2: item info */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <FoodImage src={listing.img} size={44} radius={9} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: W.font, fontSize: 14, fontWeight: 700, color: W.textPrimary, marginBottom: 3 }}>
                      {listing.item}
                    </div>
                    <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted, lineHeight: 1.4, marginBottom: 6 }}>
                      {listing.description}
                    </div>
                    <div style={{ display: "flex", gap: 5 }}>
                      {listing.verified && <Tag label="Verified" />}
                      <Tag label={listing.tag} />
                    </div>
                  </div>
                </div>

                {/* Expiry row */}
                <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: W.accentAmber }} />
                  <span style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted }}>
                    Expires {listing.expiry} · {listing.expiryNote}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* ── Post item CTA ──────────────────────────────────────── */}
        <div style={{ padding: `16px ${W.px}px 0` }}>
          <div
            onClick={() => navigate(1)}
            style={{
              border: `2px dashed ${W.borderDash}`, borderRadius: W.radius,
              backgroundColor: W.bgSurface, padding: "20px 16px",
              display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
              transition: "background-color 0.15s",
            }}
          >
            <div style={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: W.bgPlaceholder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3V13M3 8H13" stroke={W.textSub} strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily: W.font, fontSize: 14, fontWeight: 700, color: W.textPrimary, marginBottom: 3 }}>
                Share an item with your community
              </div>
              <div style={{ fontFamily: W.font, fontSize: 12, color: W.textMuted }}>
                Have food that's about to expire? Share it instead of wasting it.
              </div>
            </div>
          </div>
        </div>

      </div>

      <BottomTabBar active={3} onTabChange={navigate} />
      <Toast message={toast} visible={!!toast} />
    </div>
  );
}
