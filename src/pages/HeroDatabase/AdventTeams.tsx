import React, { useState, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "../../context/AppContext";
import { getHeroImagePath, getPetIconPath } from "../../lib/utils";
import { isPlaceholderTeam } from "../../lib/utils";
import type { AdventTeam, AdventHero, AdventSkill } from "../../lib/types";
import "./AdventTeams.css";

const AdventTeams: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();
  const [selectedBoss, setSelectedBoss] = useState<string>("all");

  const handleHeroClick = (heroName: string) => {
    navigate({ to: `/hero-database/${encodeURIComponent(heroName)}` });
  };

  const bossNames = useMemo(() => {
    return Object.keys(state.adventTeamsData || {});
  }, [state.adventTeamsData]);

  const filteredBosses = useMemo(() => {
    if (selectedBoss === "all") {
      return bossNames;
    }
    return bossNames.filter(
      (boss) => boss.toLowerCase() === selectedBoss.toLowerCase()
    );
  }, [selectedBoss, bossNames]);

  const createHeroColumn = (
    hero: AdventHero,
    skill: AdventSkill | undefined,
    bossName?: string
  ) => {
    const heroImagePath = getHeroImagePath(hero.name, false, true); // Use Downloaded Hero Portraits
    const rowClass = hero.row === "back" ? "back" : "front";
    const heroInfo = state.heroData[hero.name];

    // Type-based border color
    const typeColors: Record<string, string> = {
      Attack: "#c93939",
      Magic: "#3b82f6",
      Defense: "#a67c52",
      Support: "#eab308",
      Universal: "#9333ea",
    };

    const borderColor =
      heroInfo?.type && typeColors[heroInfo.type]
        ? typeColors[heroInfo.type]
        : "rgba(147, 112, 219, 0.4)";

    // For Kyle teams, swap visual display:
    // Normal: slot1 (top visual) = s1 (bottom skill), slot2 (bottom visual) = s2 (top skill)
    // Kyle: slot1 (top visual) = s2 (top skill), slot2 (bottom visual) = s1 (bottom skill)
    const swapDisplay = bossName === "Kyle";
    const slot1Value = swapDisplay ? skill?.s2 : skill?.s1;
    const slot2Value = swapDisplay ? skill?.s1 : skill?.s2;

    return (
      <div
        key={`${hero.name}-${hero.position}`}
        className={`advent-hero-column ${rowClass}`}
        onClick={() => handleHeroClick(hero.name)}
        style={{
          cursor: "pointer",
          border: `3px solid ${borderColor}`,
          borderRadius: "8px",
        }}
      >
        <div className="advent-hero-portrait">
          <img src={heroImagePath} alt={hero.name} />
        </div>
        <div className="advent-hero-name">{hero.name}</div>
        <div className="advent-skills-container">
          <div className={`advent-skill-slot ${slot1Value ? "" : "empty"}`}>
            {slot1Value || "N/A"}
          </div>
          <div className={`advent-skill-slot ${slot2Value ? "" : "empty"}`}>
            {slot2Value || "N/A"}
          </div>
        </div>
      </div>
    );
  };

  const renderTeamCard = (
    team: AdventTeam,
    bossName: string,
    index: number
  ) => {
    const validTeams = team.heroes.filter(
      (h) => h.name !== "---" && h.name !== "N/A"
    );
    if (validTeams.length === 0) return null;

    const skillMap: Record<string, AdventSkill> = {};
    if (team.skills) {
      team.skills.forEach((skill) => {
        skillMap[skill.hero] = skill;
      });
    }

    let borderColor = "#4a9eff"; // Default blue
    if (index >= 2 && index < 4) {
      borderColor = "#51cf66"; // Green
    } else if (index >= 4) {
      borderColor = "#ff8787"; // Red
    }

    const petPath = team.pet ? getPetIconPath(team.pet) : null;

    return (
      <div
        key={`${bossName}-${team.name}-${index}`}
        className="advent-team-card"
        style={{ '--team-color': borderColor } as React.CSSProperties}
      >
        <div className="advent-team-header">
          <h3>{team.name}</h3>
        </div>
        <div className="advent-heroes-container">
          {team.heroes
            .filter((hero) => hero.name !== "---" && hero.name !== "N/A")
            .map((hero) => createHeroColumn(hero, skillMap[hero.name], bossName))}
        </div>
        <div className="advent-bottom-section">
          <div className="advent-pet-container">
            <div className={`advent-pet-icon ${petPath ? "" : "placeholder"}`}>
              {petPath ? (
                <img
                  src={petPath}
                  alt={team.pet || "Pet"}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.parentElement!.style.display = "none";
                  }}
                />
              ) : (
                <div className="pet-placeholder-box"></div>
              )}
            </div>
            <div className="advent-pet-label">{petPath ? team.pet : "Pet"}</div>
          </div>
          <div className="advent-notes-container">
            <div className="advent-notes-title">Special Notes</div>
            <div
              className={`advent-notes-content ${team.notes ? "" : "empty"}`}
            >
              {team.notes || "No special notes"}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="advent-teams-view">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">ADVENT TEAMS</h1>
        </div>

        <div className="boss-filter-container">
          <select
            id="boss-filter"
            className="boss-filter-dropdown"
            value={selectedBoss}
            onChange={(e) => setSelectedBoss(e.target.value)}
          >
            <option value="all">All Bosses</option>
            {bossNames.map((boss) => (
              <option key={boss} value={boss.toLowerCase()}>
                {boss}
              </option>
            ))}
          </select>
        </div>

        <div className="advent-bosses-container" id="advent-bosses-container">
          {filteredBosses.map((bossName) => {
            const bossData = state.adventTeamsData[bossName];
            if (!bossData) return null;

            const validTeams = bossData.teams.filter(
              (team) => !isPlaceholderTeam(team)
            );

            return (
              <div
                key={bossName}
                className="advent-boss-section"
                data-boss={bossName.toLowerCase()}
              >
                <div className="advent-boss-header">
                  <h2>{bossName}</h2>
                </div>
                <div className="advent-teams-container">
                  {validTeams.length === 0 ? (
                    <div className="advent-team-card advent-team-card--empty">
                      Team recommendations are coming soon.
                    </div>
                  ) : (
                    validTeams.map((team, index) =>
                      renderTeamCard(team, bossName, index)
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdventTeams;
