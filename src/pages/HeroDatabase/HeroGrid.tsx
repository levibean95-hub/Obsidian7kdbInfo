import React, { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "../../context/AppContext";
import { heroes } from "../../lib/constants";
import { getHeroImagePath, getTypeIconPath } from "../../lib/utils";
import SearchableDropdown from "../../components/Filters/SearchableDropdown";
import "./HeroGrid.css";

const HeroGrid: React.FC = () => {
  const navigate = useNavigate();
  const {
    state,
    setSearchQuery,
    setSelectedEffect,
    setSelectedType,
    setSelectedTarget,
    setSavedScrollPosition,
    setPreviousView,
  } = useApp();

  const filteredHeroes = useMemo(() => {
    return heroes.filter((hero) => {
      // Filter by search query
      const matchesSearch = hero
        .toLowerCase()
        .includes(state.searchQuery.toLowerCase());

      // Filter by selected effect
      let matchesEffect = true;
      if (state.selectedEffect) {
        const data = state.heroData[hero];
        matchesEffect =
          data && data.effects && data.effects.includes(state.selectedEffect);
      }

      // Filter by selected type
      let matchesType = true;
      if (state.selectedType) {
        const data = state.heroData[hero];
        matchesType = data && data.type === state.selectedType;
      }

      // Filter by selected target
      let matchesTarget = true;
      if (state.selectedTarget) {
        const data = state.heroData[hero];
        matchesTarget = data && data.target_number === state.selectedTarget;
      }

      return matchesSearch && matchesEffect && matchesType && matchesTarget;
    });
  }, [
    state.searchQuery,
    state.selectedEffect,
    state.selectedType,
    state.selectedTarget,
    state.heroData,
  ]);

  const effectOptions = useMemo(() => {
    return Array.from(state.allEffects).sort();
  }, [state.allEffects]);

  const targetOptions = useMemo(() => {
    const targetOrder = [
      "Single Enemy",
      "3 Enemies",
      "4 Enemies",
      "All Enemies",
    ];
    return Array.from(state.allTargets).sort((a, b) => {
      const indexA = targetOrder.indexOf(a);
      const indexB = targetOrder.indexOf(b);
      const safeA = indexA === -1 ? targetOrder.length : indexA;
      const safeB = indexB === -1 ? targetOrder.length : indexB;
      if (safeA !== safeB) {
        return safeA - safeB;
      }
      return a.localeCompare(b);
    });
  }, [state.allTargets]);

  const handleHeroClick = (heroName: string) => {
    setSavedScrollPosition(
      window.pageYOffset || document.documentElement.scrollTop
    );
    setPreviousView("grid");
    navigate({ to: `/hero-database/${encodeURIComponent(heroName)}` });
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
  };

  const typeButtons = [
    "",
    "Attack",
    "Magic",
    "Defense",
    "Support",
    "Universal",
  ];

  const { isLoading, error } = useApp();

  if (isLoading) {
    return (
      <div className="hero-grid-view">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">HERO DATABASE</h1>
          </div>
          <div className="loading-state">Loading heroes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hero-grid-view">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">HERO DATABASE</h1>
          </div>
          <div className="error-state">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="hero-grid-view">
      <div className="page-content">
        <h1 className="hero-database-title">HERO DATABASE</h1>
        <div className="hero-database-content-wrapper">
          <div className="filters-container">
            <div className="filters-row">
              <div className="search-container">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search heroes..."
                  className="search-input"
                  value={state.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="type-filter-container">
                <div className="type-button-group">
                  {typeButtons.map((type) => (
                    <button
                      key={type || "all"}
                      className={`type-filter-button ${
                        state.selectedType === type ? "active" : ""
                      }`}
                      data-type={type}
                      title={type || "All Types"}
                      onClick={() => handleTypeFilter(type)}
                    >
                      {type ? (
                        <img
                          src={getTypeIconPath(type)}
                          alt={type}
                          className="type-icon"
                        />
                      ) : (
                        <span className="type-icon-all">All</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="dropdown-filters-group">
                <SearchableDropdown
                  id="effect"
                  placeholder="Filter by Effect..."
                  options={effectOptions}
                  selectedValue={state.selectedEffect}
                  onSelect={setSelectedEffect}
                  onClear={() => setSelectedEffect("")}
                  label="Effects"
                />
                <SearchableDropdown
                  id="target"
                  placeholder="Filter by Target..."
                  options={targetOptions}
                  selectedValue={state.selectedTarget}
                  onSelect={setSelectedTarget}
                  onClear={() => setSelectedTarget("")}
                  label="Targets"
                />
              </div>
            </div>
          </div>

          <div className="heroes-grid" id="heroes-grid">
            {filteredHeroes.length === 0 ? (
              <div
                className="section-placeholder"
                style={{ gridColumn: "1 / -1" }}
              >
                No heroes found matching your filters
              </div>
            ) : (
              filteredHeroes.map((heroName) => {
                const heroInfo = state.heroData[heroName];
                const normalizedType =
                  heroInfo?.type?.trim().toLowerCase() || "";

                return (
                  <button
                    key={heroName}
                    type="button"
                    className="hero-card"
                    data-hero-type={normalizedType}
                    onClick={() => handleHeroClick(heroName)}
                    aria-label={`View details for ${heroName}`}
                  >
                    <div className="hero-image-container">
                      <img
                        className="hero-image"
                        src={getHeroImagePath(heroName)}
                        alt={heroName}
                        loading="lazy"
                      />
                      {heroInfo?.type && (
                        <div className="type-icon-badge">
                          <img
                            src={getTypeIconPath(heroInfo.type)}
                            alt={heroInfo.type}
                          />
                        </div>
                      )}
                      {heroInfo?.rarity && (
                        <div
                          className={`rarity-badge rarity-${heroInfo.rarity
                            .toLowerCase()
                            .replace(/\+/g, "plus")}`}
                        >
                          {heroInfo.rarity}
                        </div>
                      )}
                    </div>
                    <div className="hero-name">{heroName}</div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroGrid;
