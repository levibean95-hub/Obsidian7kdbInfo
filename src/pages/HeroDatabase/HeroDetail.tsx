import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useApp } from "../../context/AppContext";
import { getHeroImagePath, getTypeIconPath } from "../../lib/utils";
import { HERO_PORTRAIT_FALLBACK } from "../../lib/constants";
import { isT6DifferentFromT0 } from "../../lib/gear-builder";
import GearCard from "../../components/HeroDetail/GearCard";
import "./HeroDetail.css";

const HeroDetail: React.FC = () => {
  const { heroName } = useParams({ from: "/hero-database/$heroName" });
  const { state, setSelectedHero } = useApp();
  const [showEffects, setShowEffects] = useState(false);

  const decodedHeroName = heroName ? decodeURIComponent(heroName) : null;
  const heroData = decodedHeroName ? state.heroData[decodedHeroName] : null;

  useEffect(() => {
    if (decodedHeroName) {
      setSelectedHero(decodedHeroName);
    }
  }, [decodedHeroName, setSelectedHero]);

  // Scroll to top only when the hero changes (not on every render)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [decodedHeroName]);

  const handleBack = () => {
    window.history.back();
  };

  const validEffects = useMemo(() => {
    if (!heroData || !Array.isArray(heroData.effects)) {
      return [];
    }
    return heroData.effects.filter(
      (effect) =>
        effect && !effect.includes("[To be filled") && !effect.includes("TBD")
    );
  }, [heroData]);

  if (!decodedHeroName || !heroData) {
    return (
      <div className="hero-detail-view">
        <div className="page-content">
          <button onClick={handleBack} className="back-button">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1>Hero not found</h1>
        </div>
      </div>
    );
  }

  const typeIconPath = heroData.type ? getTypeIconPath(heroData.type) : "";
  const rarityClass = heroData.rarity
    ? `rarity-${heroData.rarity.toLowerCase().replace(/\+/g, "plus")}`
    : "rarity-unknown";

  const showT6PvE =
    heroData.gear_pve?.T6 &&
    heroData.gear_pve.T6.length > 0 &&
    isT6DifferentFromT0(heroData.gear_pve.T0 || [], heroData.gear_pve.T6);
  const showT6PvP =
    heroData.gear_pvp?.T6 &&
    heroData.gear_pvp.T6.length > 0 &&
    isT6DifferentFromT0(heroData.gear_pvp.T0 || [], heroData.gear_pvp.T6);

  return (
    <div className="hero-detail-view">
      <div className="page-content">
        <div className="hero-detail-content">
          <div className="hero-detail-top">
            <button onClick={handleBack} className="back-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="hero-name-large">{decodedHeroName}</h1>
          </div>
          <div className="hero-header">
            <div className="hero-portrait-section">
              <div className="hero-portrait-card">
                <div className="hero-portrait-card-container">
                  {typeIconPath && (
                    <div className="type-icon-badge" id="detail-type-badge">
                      <img
                        id="detail-type-icon"
                        src={typeIconPath}
                        alt={heroData.type}
                      />
                    </div>
                  )}
                  {heroData.rarity && (
                    <div
                      className={`rarity-badge ${rarityClass}`}
                      id="detail-rarity-badge"
                    >
                      {heroData.rarity}
                    </div>
                  )}
                  <img
                    id="detail-hero-image"
                    src={getHeroImagePath(decodedHeroName, false)}
                    alt={decodedHeroName}
                    className="hero-portrait-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = HERO_PORTRAIT_FALLBACK;
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="hero-title-section">
              <div className="hero-meta-info">
                <div className="hero-meta-item hero-type-item">
                  <span className="meta-label">Type:</span>
                  <span id="hero-type" className="meta-value-with-icon">
                    {typeIconPath && (
                      <img
                        id="hero-type-icon"
                        src={typeIconPath}
                        alt={heroData.type}
                        className="hero-type-icon"
                      />
                    )}
                    <span id="hero-type-text">
                      {heroData.type || <em>To be added</em>}
                    </span>
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">Target Number:</span>
                  <span id="hero-target-number" className="meta-value">
                    {heroData.target_number || <em>To be added</em>}
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">Role:</span>
                  <span id="hero-role" className="meta-value">
                    {heroData.role || <em>To be added</em>}
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">Primary content used in:</span>
                  <span id="hero-primary-content" className="meta-value">
                    {heroData.primary_content || <em>To be added</em>}
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">Target transcendence:</span>
                  <span id="hero-target-transcendence" className="meta-value">
                    {heroData.target_transcendence || <em>To be added</em>}
                  </span>
                </div>
                <div className="hero-meta-item">
                  <span className="meta-label">Wish list priority:</span>
                  <span id="hero-wishlist-priority" className="meta-value">
                    {heroData.wishlist_priority || <em>To be added</em>}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-sections" id="hero-sections">
            {/* Tips and Effects Section */}
            <div className="tips-effects-container">
              <div className="tips-section">
                <h2>Tips/Important Info</h2>
                <div className="subsection-content">
                  {heroData.tips ? (
                    <p>{heroData.tips}</p>
                  ) : (
                    <em>No tips available yet</em>
                  )}
                </div>
              </div>
              <div className="effects-section">
                <h2>Effect List</h2>
                <button
                  className={`effects-toggle-btn ${
                    showEffects ? "" : "collapsed"
                  }`}
                  onClick={() => setShowEffects(!showEffects)}
                  aria-expanded={showEffects}
                >
                  <span className="btn-text">
                    {showEffects ? "Hide Effects" : "Show Effects"}
                  </span>
                </button>
                <ul className={`effect-list ${showEffects ? "" : "collapsed"}`}>
                  {validEffects.length > 0 ? (
                    validEffects.map((effect, index) => (
                      <li key={index} className="effect-item">
                        {effect}
                      </li>
                    ))
                  ) : (
                    <li className="effect-item">
                      <em>No effects listed</em>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {/* Gear PvE Section */}
            <div className="hero-section">
              <h2>Gear PvE</h2>
              {heroData.gear_pve?.T0 && heroData.gear_pve.T0.length > 0 ? (
                <>
                  <div className="tier-section">
                    <h3 className="tier-section-title">Gear T0</h3>
                    <div className="gear-cards-grid">
                      {heroData.gear_pve.T0.map((gear, index) => (
                        <GearCard key={index} gear={gear} />
                      ))}
                    </div>
                  </div>
                  {showT6PvE && (
                    <div className="tier-section">
                      <h3 className="tier-section-title">Gear T6</h3>
                      <div className="gear-cards-grid">
                        {heroData.gear_pve.T6.map((gear, index) => (
                          <GearCard key={index} gear={gear} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="subsection-content">
                  <em>No PvE gear configuration available</em>
                </div>
              )}
            </div>

            {/* Gear PvP Section */}
            <div className="hero-section">
              <h2>Gear PvP</h2>
              {heroData.gear_pvp?.T0 && heroData.gear_pvp.T0.length > 0 ? (
                <>
                  <div className="tier-section">
                    <h3 className="tier-section-title">Gear T0</h3>
                    <div className="gear-cards-grid">
                      {heroData.gear_pvp.T0.map((gear, index) => (
                        <GearCard key={index} gear={gear} />
                      ))}
                    </div>
                  </div>
                  {showT6PvP && (
                    <div className="tier-section">
                      <h3 className="tier-section-title">Gear T6</h3>
                      <div className="gear-cards-grid">
                        {heroData.gear_pvp.T6.map((gear, index) => (
                          <GearCard key={index} gear={gear} />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="subsection-content">
                  <em>No PvP gear configuration available</em>
                </div>
              )}
            </div>

            {/* Skill Enhance Priority Section */}
            {heroData.skill_enhance_priority &&
              heroData.skill_enhance_priority !== "N/A" && (
                <div className="hero-section">
                  <h2>Skill Enhance Priority</h2>
                  <div className="subsection-content">
                    <p>{heroData.skill_enhance_priority}</p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
