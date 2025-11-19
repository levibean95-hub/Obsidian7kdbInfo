import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useApp } from "../../context/AppContext";
import { getHeroImagePath, getPetIconPath } from "../../lib/utils";
import type {
  GuildWarTeam,
  GuildWarHero,
  GuildWarSkill,
} from "../../lib/types";
import "./GuildWarTeams.css";

const GuildWarTeams: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  const guildWarData = state.guildWarTeamsData?.["Guild War"];
  if (!guildWarData) {
    return (
      <div className="guild-war-teams-view">
        <div className="page-content">
          <h1>Guild War Teams</h1>
          <p>No guild war teams data available</p>
        </div>
      </div>
    );
  }

  const handleHeroClick = (heroName: string) => {
    navigate({ to: `/hero-database/${encodeURIComponent(heroName)}` });
  };

  const createHeroColumn = (
    hero: GuildWarHero,
    skill: GuildWarSkill | undefined
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

    return (
      <div
        key={`${hero.name}-${hero.position}`}
        className={`advent-hero-column ${rowClass}`}
        style={{ border: `3px solid ${borderColor}`, borderRadius: "8px" }}
        onClick={() => handleHeroClick(hero.name)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleHeroClick(hero.name);
          }
        }}
        aria-label={`View details for ${hero.name}`}
      >
        <div className="advent-hero-portrait">
          <img src={heroImagePath} alt={hero.name} />
        </div>
        <div className="advent-hero-name">{hero.name}</div>
        <div className="advent-skills-container">
          <div className={`advent-skill-slot ${skill?.s2 ? "" : "empty"}`}>
            {skill?.s2 || "N/A"}
          </div>
          <div className={`advent-skill-slot ${skill?.s1 ? "" : "empty"}`}>
            {skill?.s1 || "N/A"}
          </div>
        </div>
      </div>
    );
  };

  // Extract team number from team name
  const extractTeamNumber = (teamName: string): number => {
    const match = teamName.match(/Team\s+(\d+)/i);
    return match ? parseInt(match[1]) : 0;
  };

  // Get color for team number
  const getTeamColor = (teamNumber: number): string => {
    const teamColors = [
      "#e74c3c", // Team 1 - Red
      "#3498db", // Team 2 - Blue
      "#2ecc71", // Team 3 - Green
      "#f39c12", // Team 4 - Orange
      "#9b59b6", // Team 5 - Purple
      "#1abc9c", // Team 6 - Teal
      "#e67e22", // Team 7 - Dark Orange
      "#34495e", // Team 8 - Dark Gray
    ];
    return teamColors[(teamNumber - 1) % teamColors.length] || "#9333ea";
  };

  const renderTeamCard = (team: GuildWarTeam, index: number) => {
    const skillMap: Record<string, GuildWarSkill> = {};
    if (team.skills) {
      team.skills.forEach((skill) => {
        skillMap[skill.hero] = skill;
      });
    }

    const petPath = team.pet ? getPetIconPath(team.pet) : null;

    // Get team number and color
    const teamNumber = extractTeamNumber(team.name);
    const borderColor = getTeamColor(teamNumber);

    // Filter to only show first 3 valid heroes
    const validHeroes = team.heroes.filter(
      (hero) => hero.name && hero.name !== "---" && hero.name !== "N/A"
    );
    const heroesToShow = validHeroes.slice(0, 3);

    return (
      <div
        key={`team-${index}`}
        className="advent-team-card"
        style={{
          border: `3px solid ${borderColor}`,
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.3), 0 0 20px ${borderColor}40`,
          "--team-color": borderColor,
        } as React.CSSProperties}
      >
        <div
          className="advent-team-header"
          style={{
            borderBottom: `2px solid ${borderColor}`,
          }}
        >
          <h3
            style={{
              color: borderColor,
              textShadow: `0 0 10px ${borderColor}80`,
            }}
          >
            {team.name}
          </h3>
        </div>
        <div className="advent-heroes-container">
          {heroesToShow.map((hero) =>
            createHeroColumn(hero, skillMap[hero.name])
          )}
        </div>
        <div className="advent-bottom-section" style={{ justifyContent: "center" }}>
          <div
            className="advent-pet-container"
            style={{
              border: `2px solid ${borderColor}`,
            }}
          >
            <div className={`advent-pet-icon ${petPath ? "" : "placeholder"}`}>
              {petPath ? (
                <img src={petPath} alt={team.pet || "Pet"} />
              ) : (
                <div className="pet-placeholder-box"></div>
              )}
            </div>
            <div className="advent-pet-label">{petPath ? team.pet : "Pet"}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="guild-war-teams-view">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">GUILD WAR TEAMS</h1>
        </div>
        <div className="advent-boss-section">
          <div className="advent-boss-header">
            <h2>Guild War Teams</h2>
          </div>
          <div className="advent-teams-container">
            {guildWarData.teams.map((team, index) => renderTeamCard(team, index))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildWarTeams;
