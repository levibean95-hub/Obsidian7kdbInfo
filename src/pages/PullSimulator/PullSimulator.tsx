import React, { useState, useMemo, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import "./PullSimulator.css";

interface WishlistSlots {
  lPlus: (string | null)[];
  l: (string | null)[];
  rare: (string | null)[];
}

interface PullResult {
  heroName: string;
  rarity: "L+" | "L" | "Rare" | "3*" | "2*";
  isWishlist: boolean;
}

interface PullSession {
  id: number;
  pulls: PullResult[];
}

interface HeroSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  rarity: "L+" | "L" | "Rare";
  onSelect: (hero: string) => void;
  availableHeroes: string[];
  currentWishlist: string[];
}

const HeroSelectorModal: React.FC<HeroSelectorModalProps> = ({
  isOpen,
  onClose,
  rarity,
  onSelect,
  availableHeroes,
  currentWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHeroes = useMemo(() => {
    return availableHeroes.filter(
      (hero) =>
        hero.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !currentWishlist.includes(hero)
    );
  }, [availableHeroes, searchQuery, currentWishlist]);

  if (!isOpen) return null;

  const handleSelect = (hero: string) => {
    onSelect(hero);
    setSearchQuery("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Select {rarity} Hero</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-search">
          <input
            type="text"
            placeholder="Search heroes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
        </div>

        <div className="modal-hero-grid">
          {filteredHeroes.map((hero) => (
            <div
              key={hero}
              className="modal-hero-card"
              onClick={() => handleSelect(hero)}
            >
              <img
                src={`/Downloaded Hero Portraits/${encodeURIComponent(hero)}.png`}
                alt={hero}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              <span className="hero-name">{hero}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Cookie utility functions
const saveWishlistToCookie = (wishlist: WishlistSlots) => {
  const wishlistJson = JSON.stringify(wishlist);
  // Set cookie to expire in 1 year
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `pullSimulatorWishlist=${encodeURIComponent(wishlistJson)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
};

const loadWishlistFromCookie = (): WishlistSlots | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'pullSimulatorWishlist') {
      try {
        const decoded = decodeURIComponent(value);
        const parsed = JSON.parse(decoded);
        // Validate structure
        if (
          parsed &&
          Array.isArray(parsed.lPlus) &&
          Array.isArray(parsed.l) &&
          Array.isArray(parsed.rare)
        ) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse wishlist cookie:', e);
        return null;
      }
    }
  }
  return null;
};

const PullSimulator: React.FC = () => {
  const { state } = useApp();

  // Load wishlist from cookie on mount, or use default
  const [wishlist, setWishlist] = useState<WishlistSlots>(() => {
    const savedWishlist = loadWishlistFromCookie();
    return savedWishlist || {
      lPlus: [null, null],
      l: [null, null, null],
      rare: [null, null, null, null],
    };
  });

  const [currentPulls, setCurrentPulls] = useState<PullResult[]>([]);
  const [pullHistory, setPullHistory] = useState<PullSession[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showWishlist, setShowWishlist] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [selectorModal, setSelectorModal] = useState<{
    isOpen: boolean;
    rarity: "L+" | "L" | "Rare";
    slotIndex: number;
  } | null>(null);

  // Save wishlist to cookie whenever it changes
  useEffect(() => {
    saveWishlistToCookie(wishlist);
  }, [wishlist]);

  // Get heroes by rarity from hero data
  const heroesByRarity = useMemo(() => {
    const lPlus: string[] = [];
    const l: string[] = [];
    const rare: string[] = [];

    Object.entries(state.heroData).forEach(([name, hero]) => {
      if (hero.rarity === "L+") {
        lPlus.push(name);
      } else if (hero.rarity === "L") {
        l.push(name);
      } else if (hero.rarity === "Rare") {
        rare.push(name);
      }
    });

    return {
      lPlus: lPlus.sort(),
      l: l.sort(),
      rare: rare.sort(),
    };
  }, [state.heroData]);

  // Get all current wishlist heroes
  const allWishlistHeroes = useMemo(() => {
    return [
      ...wishlist.lPlus.filter((h) => h !== null),
      ...wishlist.l.filter((h) => h !== null),
      ...wishlist.rare.filter((h) => h !== null),
    ] as string[];
  }, [wishlist]);

  // Check if wishlist is complete
  const isWishlistComplete = useMemo(() => {
    return (
      wishlist.lPlus.every((h) => h !== null) &&
      wishlist.l.every((h) => h !== null) &&
      wishlist.rare.every((h) => h !== null)
    );
  }, [wishlist]);

  // Calculate pull rates
  const calculatePullRates = useMemo(() => {
    const wishlistLPlus = wishlist.lPlus.filter((h) => h !== null) as string[];
    const wishlistL = wishlist.l.filter((h) => h !== null) as string[];
    const wishlistRare = wishlist.rare.filter((h) => h !== null) as string[];

    // L/L+ rates (1% total)
    const legendaryWishlistRate = 0.001; // 0.1% per character
    const totalLegendaryWishlistRate =
      (wishlistLPlus.length + wishlistL.length) * legendaryWishlistRate;
    const remainingLegendaryRate = 0.01 - totalLegendaryWishlistRate;
    const nonWishlistLegendaryCount =
      heroesByRarity.lPlus.length +
      heroesByRarity.l.length -
      wishlistLPlus.length -
      wishlistL.length;
    const legendaryNonWishlistRate =
      nonWishlistLegendaryCount > 0
        ? remainingLegendaryRate / nonWishlistLegendaryCount
        : 0;

    // Rare rates (14% total)
    const rareWishlistRate = 0.0175; // 1.75% per character
    const totalRareWishlistRate = wishlistRare.length * rareWishlistRate;
    const remainingRareRate = 0.14 - totalRareWishlistRate;
    const nonWishlistRareCount =
      heroesByRarity.rare.length - wishlistRare.length;
    const rareNonWishlistRate =
      nonWishlistRareCount > 0 ? remainingRareRate / nonWishlistRareCount : 0;

    return {
      wishlistLPlus,
      wishlistL,
      wishlistRare,
      legendaryWishlistRate,
      legendaryNonWishlistRate,
      rareWishlistRate,
      rareNonWishlistRate,
      totalLegendaryRate: 0.01,
      totalRareRate: 0.14,
      threeStar: 0.4,
      twoStar: 0.45,
    };
  }, [wishlist, heroesByRarity]);

  // Perform a single pull
  const performSinglePull = (): PullResult => {
    const rand = Math.random();
    const rates = calculatePullRates;

    // 2* placeholder (45%)
    if (rand < rates.twoStar) {
      return {
        heroName: "2* Placeholder",
        rarity: "2*",
        isWishlist: false,
      };
    }

    // 3* placeholder (40%, cumulative 85%)
    if (rand < rates.twoStar + rates.threeStar) {
      return {
        heroName: "3* Placeholder",
        rarity: "3*",
        isWishlist: false,
      };
    }

    // Rare (14%, cumulative 99%)
    if (rand < rates.twoStar + rates.threeStar + rates.totalRareRate) {
      // Check if wishlist rare
      const wishlistRareRoll = Math.random();
      const totalWishlistRareRate =
        rates.wishlistRare.length * rates.rareWishlistRate;

      if (
        wishlistRareRoll < totalWishlistRareRate / rates.totalRareRate &&
        rates.wishlistRare.length > 0
      ) {
        const randomIndex = Math.floor(
          Math.random() * rates.wishlistRare.length
        );
        return {
          heroName: rates.wishlistRare[randomIndex],
          rarity: "Rare",
          isWishlist: true,
        };
      } else {
        // Non-wishlist rare
        const nonWishlistRares = heroesByRarity.rare.filter(
          (h) => !rates.wishlistRare.includes(h)
        );
        const randomIndex = Math.floor(Math.random() * nonWishlistRares.length);
        return {
          heroName: nonWishlistRares[randomIndex],
          rarity: "Rare",
          isWishlist: false,
        };
      }
    }

    // L/L+ (1%, cumulative 100%)
    // Check if wishlist legendary
    const wishlistLegendaryRoll = Math.random();
    const totalWishlistLegendaryRate =
      (rates.wishlistLPlus.length + rates.wishlistL.length) *
      rates.legendaryWishlistRate;

    if (
      wishlistLegendaryRoll <
      totalWishlistLegendaryRate / rates.totalLegendaryRate &&
      (rates.wishlistLPlus.length > 0 || rates.wishlistL.length > 0)
    ) {
      // Randomly choose from wishlist L+ or L
      const allWishlistLegendary = [
        ...rates.wishlistLPlus,
        ...rates.wishlistL,
      ];
      const randomIndex = Math.floor(
        Math.random() * allWishlistLegendary.length
      );
      const heroName = allWishlistLegendary[randomIndex];
      const rarity = rates.wishlistLPlus.includes(heroName) ? "L+" : "L";
      return {
        heroName,
        rarity,
        isWishlist: true,
      };
    } else {
      // Non-wishlist legendary
      const nonWishlistLPlus = heroesByRarity.lPlus.filter(
        (h) => !rates.wishlistLPlus.includes(h)
      );
      const nonWishlistL = heroesByRarity.l.filter(
        (h) => !rates.wishlistL.includes(h)
      );
      const allNonWishlistLegendary = [...nonWishlistLPlus, ...nonWishlistL];
      const randomIndex = Math.floor(
        Math.random() * allNonWishlistLegendary.length
      );
      const heroName = allNonWishlistLegendary[randomIndex];
      const rarity = nonWishlistLPlus.includes(heroName) ? "L+" : "L";
      return {
        heroName,
        rarity,
        isWishlist: false,
      };
    }
  };

  // Perform 10 pulls
  const handlePull = () => {
    if (isAnimating || !isWishlistComplete) return;

    setIsAnimating(true);

    // Generate pulls
    const pulls: PullResult[] = [];
    for (let i = 0; i < 10; i++) {
      pulls.push(performSinglePull());
    }

    // If this is the first pull, show cards immediately
    if (currentPulls.length === 0) {
      setCurrentPulls(pulls);
      setShowCards(true);
      setFlippedCards(new Array(10).fill(false));
      // Keep isAnimating true so user can click to reveal
    } else {
      // If re-pulling, flip cards back first
      setFlippedCards(new Array(10).fill(false));

      // Wait for flip animation to complete before swapping data
      setTimeout(() => {
        setCurrentPulls(pulls);
        // Keep isAnimating true so user can click to reveal
      }, 600);
    }

    // Add to history
    const newSession: PullSession = {
      id: Date.now(),
      pulls,
    };
    setPullHistory((prev) => [...prev, newSession]);
  };

  // Handle card flip - left to right, row by row
  const handleCardClick = () => {
    if (!isAnimating || flippedCards.some((f) => f)) return;

    // Simple left-to-right order: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9
    let delay = 0;

    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        setFlippedCards((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });
      }, delay);
      delay += 200; // 200ms between each flip
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, delay + 500);
  };

  const handleWishlistSlotClick = (
    category: "lPlus" | "l" | "rare",
    index: number
  ) => {
    const rarity = category === "lPlus" ? "L+" : category === "l" ? "L" : "Rare";
    setSelectorModal({
      isOpen: true,
      rarity,
      slotIndex: index,
    });
  };

  const handleHeroSelect = (hero: string) => {
    if (!selectorModal) return;

    const category =
      selectorModal.rarity === "L+"
        ? "lPlus"
        : selectorModal.rarity === "L"
          ? "l"
          : "rare";

    setWishlist((prev) => {
      const newWishlist = { ...prev };
      newWishlist[category] = [...prev[category]];
      newWishlist[category][selectorModal.slotIndex] = hero;
      return newWishlist;
    });
  };

  const handleRemoveFromWishlist = (
    category: "lPlus" | "l" | "rare",
    index: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const newWishlist = { ...prev };
      newWishlist[category] = [...prev[category]];
      newWishlist[category][index] = null;
      return newWishlist;
    });
  };

  // Calculate aggregate stats
  const pullStats = useMemo(() => {
    const stats = {
      totalPulls: 0,
      lPlus: 0,
      l: 0,
      rare: 0,
      threeStar: 0,
      twoStar: 0,
      heroCounts: {} as Record<string, { count: number; rarity: string }>,
    };

    pullHistory.forEach((session) => {
      session.pulls.forEach((pull) => {
        stats.totalPulls++;

        // Count by rarity
        if (pull.rarity === "L+") stats.lPlus++;
        else if (pull.rarity === "L") stats.l++;
        else if (pull.rarity === "Rare") stats.rare++;
        else if (pull.rarity === "3*") stats.threeStar++;
        else if (pull.rarity === "2*") stats.twoStar++;

        // Count by hero (excluding placeholders if desired, but user asked for "each hero")
        // We'll exclude placeholders from the visual grid usually, or keep them separate
        if (pull.heroName !== "2* Placeholder" && pull.heroName !== "3* Placeholder") {
          if (!stats.heroCounts[pull.heroName]) {
            stats.heroCounts[pull.heroName] = { count: 0, rarity: pull.rarity };
          }
          stats.heroCounts[pull.heroName].count++;
        }
      });
    });

    return stats;
  }, [pullHistory]);

  const sortedHeroes = useMemo(() => {
    return Object.entries(pullStats.heroCounts).sort((a, b) => {
      // Sort by rarity (L+ > L > Rare) then by count (desc)
      const rarityWeight = { "L+": 3, "L": 2, "Rare": 1, "3*": 0, "2*": 0 };
      const rarityDiff = rarityWeight[b[1].rarity as keyof typeof rarityWeight] - rarityWeight[a[1].rarity as keyof typeof rarityWeight];
      if (rarityDiff !== 0) return rarityDiff;
      return b[1].count - a[1].count;
    });
  }, [pullStats]);

  return (
    <div className="pull-simulator">
      <div className="pull-simulator-container">
        <h1 className="page-title">Pull Simulator</h1>

        <div className="pull-simulator-layout">
          {/* Wishlist Sidebar */}
          <div className="wishlist-sidebar-container">
            <div className="wishlist-container">
              <h2 className="wishlist-title">Wishlist</h2>
              <p className="wishlist-subtitle">
                {isWishlistComplete
                  ? "Wishlist Complete! Ready to pull."
                  : "Fill all slots to unlock pulling"}
              </p>

              {/* L+ Row */}
              <div className="wishlist-section-label">Legendary+</div>
              <div className="wishlist-row">
                {wishlist.lPlus.map((hero, index) => (
                  <div
                    key={`lplus-${index}`}
                    className={`wishlist-card ${hero ? "owned" : "unowned"}`}
                    onClick={() => handleWishlistSlotClick("lPlus", index)}
                  >
                    {hero ? (
                      <>
                        <img
                          src={`/Downloaded Hero Portraits/${encodeURIComponent(hero)}.png`}
                          alt={hero}
                          className="wishlist-hero-img"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                        <button
                          className="wishlist-remove"
                          onClick={(e) =>
                            handleRemoveFromWishlist("lPlus", index, e)
                          }
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="unowned-content">
                        <span className="unowned-text">L+</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* L Row */}
              <div className="wishlist-section-label">Legendary</div>
              <div className="wishlist-row">
                {wishlist.l.map((hero, index) => (
                  <div
                    key={`l-${index}`}
                    className={`wishlist-card ${hero ? "owned" : "unowned"}`}
                    onClick={() => handleWishlistSlotClick("l", index)}
                  >
                    {hero ? (
                      <>
                        <img
                          src={`/Downloaded Hero Portraits/${encodeURIComponent(hero)}.png`}
                          alt={hero}
                          className="wishlist-hero-img"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                        <button
                          className="wishlist-remove"
                          onClick={(e) => handleRemoveFromWishlist("l", index, e)}
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="unowned-content">
                        <span className="unowned-text">L</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Rare Row */}
              <div className="wishlist-section-label">Rare</div>
              <div className="wishlist-row">
                {wishlist.rare.map((hero, index) => (
                  <div
                    key={`rare-${index}`}
                    className={`wishlist-card ${hero ? "owned" : "unowned"}`}
                    onClick={() => handleWishlistSlotClick("rare", index)}
                  >
                    {hero ? (
                      <>
                        <img
                          src={`/Downloaded Hero Portraits/${encodeURIComponent(hero)}.png`}
                          alt={hero}
                          className="wishlist-hero-img"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                          }}
                        />
                        <button
                          className="wishlist-remove"
                          onClick={(e) =>
                            handleRemoveFromWishlist("rare", index, e)
                          }
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <div className="unowned-content">
                        <span className="unowned-text">Rare</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pull Area */}
          <div className="pull-area-container">
            {/* Pull Button */}
            <button
              className="pull-button"
              onClick={handlePull}
              disabled={isAnimating || !isWishlistComplete}
              title={
                !isWishlistComplete
                  ? "Complete your wishlist to unlock pulling"
                  : ""
              }
            >
              Pull 10 Heroes
              {!isWishlistComplete && " (Complete Wishlist First)"}
            </button>

            {/* Pull Results - Always show container to prevent layout shift */}
            <div className={`pull-results ${currentPulls.length === 0 ? "empty" : ""} ${!showCards ? "hidden" : ""}`} onClick={handleCardClick}>
              {currentPulls.length > 0 && showCards ? (
                currentPulls.map((pull, index) => (
                  <div
                    key={index}
                    className={`pull-card ${flippedCards[index] ? "flipped" : ""} rarity-${pull.rarity.toLowerCase().replace("+", "plus").replace("*", "star")}`}
                  >
                    <div className="card-inner">
                      {/* Flash effect on reveal */}
                      {flippedCards[index] && (
                        <div className="reveal-flash"></div>
                      )}
                      {/* Card back */}
                      <div className="card-back">
                        <img
                          src={pull.rarity === "2*" || pull.rarity === "3*"
                            ? "/Cradbacks/CardbackFodder.png"
                            : "/Cradbacks/CardbackRare.png"
                          }
                          alt="Card back"
                          className="cardback-image"
                        />
                        {(pull.rarity === "L" || pull.rarity === "L+") && (
                          <div className={`legendary-aura ${pull.rarity === "L+" ? "legendary-plus" : ""}`}></div>
                        )}
                      </div>

                      {/* Card front */}
                      <div className="card-front">
                        {(pull.rarity === "L" || pull.rarity === "L+") && flippedCards[index] && (
                          <div className="legendary-glow-outer"></div>
                        )}
                        {pull.rarity !== "2*" && pull.rarity !== "3*" ? (
                          <>
                            <img
                              src={`/Hero Portraits/${encodeURIComponent(pull.heroName)}.png`}
                              alt={pull.heroName}
                              className="hero-portrait"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.png";
                              }}
                            />
                            <div className="card-info">
                              <div className="hero-name">{pull.heroName}</div>
                              <div className="hero-rarity">{pull.rarity}</div>
                            </div>
                            {pull.isWishlist && (
                              <div className="wishlist-badge">★ Wishlist</div>
                            )}
                          </>
                        ) : (
                          <div className="placeholder-card">
                            <div className="placeholder-text">{pull.heroName}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pull-placeholder">
                  <p>Click "Pull 10 Heroes" to start!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pull history */}
        {pullHistory.length > 0 && (
          <div className="pull-history">
            <div className="history-header">
              <h2>Pull History</h2>
              <div className="total-pulls-badge">{pullStats.totalPulls} Total Pulls</div>
            </div>

            <div className="history-stats-grid">
              <div className="stat-card l-plus">
                <span className="stat-label">Legendary+</span>
                <span className="stat-value">{pullStats.lPlus}</span>
                <span className="stat-percent">
                  {((pullStats.lPlus / pullStats.totalPulls) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="stat-card l">
                <span className="stat-label">Legendary</span>
                <span className="stat-value">{pullStats.l}</span>
                <span className="stat-percent">
                  {((pullStats.l / pullStats.totalPulls) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="stat-card rare">
                <span className="stat-label">Rare</span>
                <span className="stat-value">{pullStats.rare}</span>
                <span className="stat-percent">
                  {((pullStats.rare / pullStats.totalPulls) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="history-collection">
              <h3>Collection Log</h3>
              <div className="collection-grid">
                {sortedHeroes.map(([name, data]) => (
                  <div key={name} className={`collection-item rarity-${data.rarity.toLowerCase().replace("+", "plus")}`}>
                    <div className="collection-img-wrapper">
                      <img
                        src={`/Hero Portraits/${encodeURIComponent(name)}.png`}
                        alt={name}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.png";
                        }}
                      />
                      <div className="collection-count">x{data.count}</div>
                    </div>
                    <div className="collection-name">{name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hero Selector Modal */}
      {selectorModal && (
        <HeroSelectorModal
          isOpen={selectorModal.isOpen}
          onClose={() => setSelectorModal(null)}
          rarity={selectorModal.rarity}
          onSelect={handleHeroSelect}
          availableHeroes={
            selectorModal.rarity === "L+"
              ? heroesByRarity.lPlus
              : selectorModal.rarity === "L"
                ? heroesByRarity.l
                : heroesByRarity.rare
          }
          currentWishlist={allWishlistHeroes}
        />
      )}
    </div>
  );
};

export default PullSimulator;
