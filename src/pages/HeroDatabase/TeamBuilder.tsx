import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useApp } from "../../context/AppContext";
import { heroes, PETS, GEAR_SETS } from "../../lib/constants";
import {
  getHeroImagePath,
  getTypeIconPath,
  getPetIconPath,
} from "../../lib/utils";
import type { TeamBuilderTeam, SkillOrder, AppState } from "../../lib/types";
import SearchableDropdown from "../../components/Filters/SearchableDropdown";
import {
  generateTeamCanvas,
  generateAllTeamsCanvas,
  copyCanvasToClipboard,
  downloadCanvasAsImage,
} from "../../lib/team-image-export";
import SavedTeamsModal from "./SavedTeamsModal";
import { useToast } from "../../context/ToastContext";
import ConfirmationModal from "../../components/UI/ConfirmationModal";
import "./TeamBuilder.css";

// Declare LZString for URL compression
declare const LZString:
  | {
    compressToEncodedURIComponent: (str: string) => string;
    decompressFromEncodedURIComponent: (str: string) => string | null;
  }
  | undefined;

const TeamBuilder: React.FC = () => {
  const navigate = useNavigate();
  const router = useRouterState();
  // Use router location search for URL params
  const searchParams = useMemo(() => {
    return new URLSearchParams(router.location.search);
  }, [router.location.search]);

  const setSearchParams = (
    updater: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)
  ) => {
    const newParams =
      typeof updater === "function" ? updater(searchParams) : updater;
    navigate({
      to: "/team-builder",
      search: Object.fromEntries(newParams.entries()) as Record<string, string>,
      replace: true,
    });
  };
  const { state, setSearchQuery, setSelectedEffect, setSelectedType } =
    useApp();

  const [teams, setTeams] = useState<TeamBuilderTeam[]>([
    {
      name: "Team 1",
      slots: [null, null, null, null, null],
      tiers: [0, 0, 0, 0, 0],
      gearSets: [null, null, null, null, null],
      skillOrders: [[], [], [], [], []],
      pet: null,
      notes: "",
      formationType: "basic",
    },
  ]);
  const [subject, setSubject] = useState("");
  const [showPets, setShowPets] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [draggedHero, setDraggedHero] = useState<string | null>(null);
  const [showNotesPopup, setShowNotesPopup] = useState<number | null>(null);
  const [notesText, setNotesText] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [copyImageState, setCopyImageState] = useState<
    Record<number, "idle" | "copied">
  >({});
  const [copyUrlState, setCopyUrlState] = useState<"idle" | "copied">("idle");
  const [exportAllState, setExportAllState] = useState<"idle" | "copied">(
    "idle"
  );
  const [showSavedTeamsModal, setShowSavedTeamsModal] = useState(false);
  const { showToast } = useToast();
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    isDanger?: boolean;
  } | null>(null);

  // Load from URL on mount
  useEffect(() => {
    const teamsParam = searchParams.get("teams");
    const subjectParam = searchParams.get("subject");

    if (teamsParam) {
      const success = parseImportString(teamsParam);
      if (success && subjectParam) {
        setSubject(decodeURIComponent(subjectParam));
      }
    }
  }, []);

  // Update URL when teams or subject change
  useEffect(() => {
    const importString = generateImportString();
    const newParams = new URLSearchParams();
    if (importString) {
      newParams.set("teams", importString);
    }
    if (subject) {
      newParams.set("subject", encodeURIComponent(subject));
    }
    setSearchParams(newParams);
  }, [teams, subject]);

  const parseImportString = (importString: string): boolean => {
    try {
      let decoded: string | null = null;

      // Try LZ-String decompression first
      if (typeof LZString !== "undefined") {
        try {
          decoded = LZString.decompressFromEncodedURIComponent(importString);
        } catch (e) {
          // Not LZ-String compressed, fall through to Base64
        }
      }

      // Fallback to Base64 decoding
      if (!decoded) {
        decoded = atob(importString);
      }

      const data = JSON.parse(decoded);

      if (data.teams && Array.isArray(data.teams)) {
        const parsedTeams: TeamBuilderTeam[] = data.teams.map(
          (team: Partial<TeamBuilderTeam>, index: number) => ({
            name: (team.name && team.name.trim()) || `Team ${index + 1}`,
            slots: (team.slots || [null, null, null, null, null]).slice(0, 5),
            tiers: (team.tiers || [0, 0, 0, 0, 0]).slice(0, 5),
            gearSets: (team.gearSets || [null, null, null, null, null]).slice(
              0,
              5
            ),
            skillOrders: (team.skillOrders || [[], [], [], [], []]).slice(0, 5),
            pet: team.pet || null,
            notes: team.notes || "",
            formationType: team.formationType || "basic",
          })
        );

        // Ensure arrays are exactly 5 elements
        parsedTeams.forEach((team) => {
          while (team.slots.length < 5) team.slots.push(null);
          while (team.tiers.length < 5) team.tiers.push(0);
          while (team.gearSets.length < 5) team.gearSets.push(null);
          while (team.skillOrders.length < 5) team.skillOrders.push([]);
          team.slots = team.slots.slice(0, 5);
          team.tiers = team.tiers.slice(0, 5);
          team.gearSets = team.gearSets.slice(0, 5);
          team.skillOrders = team.skillOrders.slice(0, 5);
        });

        setTeams(parsedTeams);
        if (data.subject) {
          setSubject(data.subject);
        }
        return true;
      }
      return false;
    } catch (e) {
      console.error("Failed to parse import string:", e);
      return false;
    }
  };

  const generateImportString = (): string => {
    const data = {
      subject,
      teams: teams.map((team, index) => ({
        name: team.name || `Team ${index + 1}`,
        slots: team.slots,
        tiers: team.tiers,
        gearSets: team.gearSets,
        skillOrders: team.skillOrders,
        pet: team.pet,
        notes: team.notes,
        formationType: team.formationType,
      })),
    };

    if (typeof LZString !== "undefined") {
      return LZString.compressToEncodedURIComponent(JSON.stringify(data));
    }
    return btoa(JSON.stringify(data));
  };

  const getRowForFormation = (
    formationType: string,
    slotIndex: number
  ): "front" | "back" => {
    const formations: Record<string, ("front" | "back")[]> = {
      basic: ["back", "front", "back", "front", "back"],
      balanced: ["front", "back", "front", "back", "front"],
      attack: ["back", "back", "front", "back", "back"],
      protective: ["front", "front", "back", "front", "front"],
    };
    return formations[formationType]?.[slotIndex] || "back";
  };

  const getSkillOrderColor = (order: number): string => {
    const hue = 120 - (order - 1) * (120 / 9);
    return `hsl(${hue}, 70%, 50%)`;
  };

  const filteredHeroes = useMemo(() => {
    // Get all heroes currently placed in teams
    const placedHeroes = new Set<string>();
    teams.forEach((team) => {
      team.slots.forEach((heroName) => {
        if (heroName) {
          placedHeroes.add(heroName);
        }
      });
    });

    return heroes.filter((hero) => {
      // Filter out already placed heroes
      if (placedHeroes.has(hero)) {
        return false;
      }

      // Filter by search query
      const matchesSearch = hero
        .toLowerCase()
        .includes(state.searchQuery.toLowerCase());

      // Filter by type
      let matchesType = true;
      if (state.selectedType) {
        const data = state.heroData[hero];
        matchesType = data && data.type === state.selectedType;
      }

      // Filter by effect
      let matchesEffect = true;
      if (state.selectedEffect) {
        const data = state.heroData[hero];
        matchesEffect =
          data && data.effects && data.effects.includes(state.selectedEffect);
      }

      return matchesSearch && matchesType && matchesEffect;
    });
  }, [
    teams,
    state.searchQuery,
    state.selectedType,
    state.selectedEffect,
    state.heroData,
  ]);

  const filteredPets = useMemo(() => {
    return PETS.filter((pet) => {
      return (
        !state.searchQuery ||
        pet.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    });
  }, [state.searchQuery]);

  const effectOptions = useMemo(() => {
    return Array.from(state.allEffects).sort();
  }, [state.allEffects]);

  const handleHeroClick = (heroName: string) => {
    if (selectedHero === heroName) {
      setSelectedHero(null);
    } else {
      setSelectedHero(heroName);
    }
  };

  const handlePetClick = (petName: string) => {
    if (selectedHero === `pet:${petName}`) {
      setSelectedHero(null);
    } else {
      setSelectedHero(`pet:${petName}`);
    }
  };

  const handleSlotClick = (teamIndex: number, slotIndex: number) => {
    if (selectedHero) {
      if (selectedHero.startsWith("pet:")) {
        // Pets go to pet slot, not hero slots
        return;
      }

      const newTeams = [...teams];
      if (!newTeams[teamIndex].tiers) {
        newTeams[teamIndex].tiers = [0, 0, 0, 0, 0];
      }
      if (!newTeams[teamIndex].gearSets) {
        newTeams[teamIndex].gearSets = [null, null, null, null, null];
      }
      if (!newTeams[teamIndex].skillOrders) {
        newTeams[teamIndex].skillOrders = [[], [], [], [], []];
      }

      newTeams[teamIndex].slots[slotIndex] = selectedHero;
      if (newTeams[teamIndex].tiers[slotIndex] === undefined) {
        newTeams[teamIndex].tiers[slotIndex] = 0;
      }
      if (newTeams[teamIndex].gearSets[slotIndex] === undefined) {
        newTeams[teamIndex].gearSets[slotIndex] = null;
      }
      if (newTeams[teamIndex].skillOrders[slotIndex] === undefined) {
        newTeams[teamIndex].skillOrders[slotIndex] = [];
      }

      setTeams(newTeams);
      setSelectedHero(null);
    }
  };

  const handlePetSlotClick = (teamIndex: number) => {
    if (selectedHero && selectedHero.startsWith("pet:")) {
      const pet = selectedHero.replace("pet:", "");
      const newTeams = [...teams];
      newTeams[teamIndex].pet = pet;
      setTeams(newTeams);
      setSelectedHero(null);
    }
  };

  const handleHeroSelect = (
    teamIndex: number,
    slotIndex: number,
    heroName: string
  ) => {
    const newTeams = [...teams];
    if (!newTeams[teamIndex].tiers) {
      newTeams[teamIndex].tiers = [0, 0, 0, 0, 0];
    }
    if (!newTeams[teamIndex].gearSets) {
      newTeams[teamIndex].gearSets = [null, null, null, null, null];
    }
    if (!newTeams[teamIndex].skillOrders) {
      newTeams[teamIndex].skillOrders = [[], [], [], [], []];
    }

    newTeams[teamIndex].slots[slotIndex] = heroName;
    if (newTeams[teamIndex].tiers[slotIndex] === undefined) {
      newTeams[teamIndex].tiers[slotIndex] = 0;
    }
    if (newTeams[teamIndex].gearSets[slotIndex] === undefined) {
      newTeams[teamIndex].gearSets[slotIndex] = null;
    }
    if (newTeams[teamIndex].skillOrders[slotIndex] === undefined) {
      newTeams[teamIndex].skillOrders[slotIndex] = [];
    }

    setTeams(newTeams);
  };

  const handleDragStart = (heroName: string, e: React.DragEvent) => {
    setDraggedHero(heroName);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", heroName);
  };

  const handleDragEnd = () => {
    setDraggedHero(null);
  };

  const handleDrop = (
    teamIndex: number,
    slotIndex: number,
    e: React.DragEvent
  ) => {
    e.preventDefault();
    if (draggedHero && !draggedHero.startsWith("pet:")) {
      const newTeams = [...teams];
      if (!newTeams[teamIndex].tiers) {
        newTeams[teamIndex].tiers = [0, 0, 0, 0, 0];
      }
      if (!newTeams[teamIndex].gearSets) {
        newTeams[teamIndex].gearSets = [null, null, null, null, null];
      }
      if (!newTeams[teamIndex].skillOrders) {
        newTeams[teamIndex].skillOrders = [[], [], [], [], []];
      }

      newTeams[teamIndex].slots[slotIndex] = draggedHero;
      if (newTeams[teamIndex].tiers[slotIndex] === undefined) {
        newTeams[teamIndex].tiers[slotIndex] = 0;
      }
      if (newTeams[teamIndex].gearSets[slotIndex] === undefined) {
        newTeams[teamIndex].gearSets[slotIndex] = null;
      }
      if (newTeams[teamIndex].skillOrders[slotIndex] === undefined) {
        newTeams[teamIndex].skillOrders[slotIndex] = [];
      }

      setTeams(newTeams);
      setDraggedHero(null);
    }
  };

  const handlePetDrop = (teamIndex: number, e: React.DragEvent) => {
    e.preventDefault();
    if (draggedHero && draggedHero.startsWith("pet:")) {
      const pet = draggedHero.replace("pet:", "");
      const newTeams = [...teams];
      newTeams[teamIndex].pet = pet;
      setTeams(newTeams);
      setDraggedHero(null);
    }
  };

  const handleRemoveHero = (teamIndex: number, slotIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex].slots[slotIndex] = null;
    if (newTeams[teamIndex].tiers) {
      newTeams[teamIndex].tiers[slotIndex] = 0;
    }
    if (newTeams[teamIndex].gearSets) {
      newTeams[teamIndex].gearSets[slotIndex] = null;
    }
    if (newTeams[teamIndex].skillOrders) {
      newTeams[teamIndex].skillOrders[slotIndex] = [];
    }
    setTeams(newTeams);
  };

  const handleRemovePet = (teamIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex].pet = null;
    setTeams(newTeams);
  };

  const handleTierChange = (
    teamIndex: number,
    slotIndex: number,
    tier: number
  ) => {
    const newTeams = [...teams];
    if (!newTeams[teamIndex].tiers) {
      newTeams[teamIndex].tiers = [0, 0, 0, 0, 0];
    }
    newTeams[teamIndex].tiers[slotIndex] = tier;
    setTeams(newTeams);
  };

  const handleGearSetChange = (
    teamIndex: number,
    slotIndex: number,
    gearSet: string
  ) => {
    const newTeams = [...teams];
    if (!newTeams[teamIndex].gearSets) {
      newTeams[teamIndex].gearSets = [null, null, null, null, null];
    }
    newTeams[teamIndex].gearSets[slotIndex] =
      gearSet === "None" ? null : gearSet;
    setTeams(newTeams);
  };

  const toggleSkillOrder = (
    teamIndex: number,
    slotIndex: number,
    skill: "s1" | "s2"
  ) => {
    const newTeams = [...teams];
    if (!newTeams[teamIndex].skillOrders) {
      newTeams[teamIndex].skillOrders = [[], [], [], [], []];
    }

    const skillOrder = newTeams[teamIndex].skillOrders[slotIndex] || [];
    const existingIndex = skillOrder.findIndex((s) => s.skill === skill);

    // Get all skills for this team to calculate team-wide order
    const allTeamSkills: Array<SkillOrder & { slotIndex: number }> = [];
    newTeams[teamIndex].skillOrders.forEach((heroSkills, idx) => {
      heroSkills.forEach((skillEntry) => {
        allTeamSkills.push({
          ...skillEntry,
          slotIndex: idx,
        });
      });
    });

    // Sort by order to get current sequence
    allTeamSkills.sort((a, b) => a.order - b.order);

    if (existingIndex !== -1) {
      // Remove skill and reorder all team skills
      const removedOrder = skillOrder[existingIndex].order;
      skillOrder.splice(existingIndex, 1);

      // Reorder all skills across all heroes in the team
      newTeams[teamIndex].skillOrders.forEach((heroSkills) => {
        heroSkills.forEach((s) => {
          if (s.order > removedOrder) {
            s.order--;
          }
        });
      });
    } else {
      // Add skill with next available team-wide order
      const nextOrder = allTeamSkills.length + 1;
      if (nextOrder <= 10) {
        skillOrder.push({ skill, order: nextOrder });
      }
    }

    newTeams[teamIndex].skillOrders[slotIndex] = skillOrder;
    setTeams(newTeams);
  };

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
  };

  const handleCopyURL = async () => {
    const url = window.location.href;
    setCopyUrlState("idle");
    try {
      await navigator.clipboard.writeText(url);
      setCopyUrlState("copied");
      showToast("URL copied to clipboard!", "success");
      setTimeout(() => {
        setCopyUrlState("idle");
      }, 2000);
    } catch (err) {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      document.body.removeChild(textarea);
      setCopyUrlState("copied");
      showToast("URL copied to clipboard!", "success");
      setTimeout(() => {
        setCopyUrlState("idle");
      }, 2000);
    }
  };

  const handleAddTeam = () => {
    const newTeam: TeamBuilderTeam = {
      name: `Team ${teams.length + 1}`,
      slots: [null, null, null, null, null],
      tiers: [0, 0, 0, 0, 0],
      gearSets: [null, null, null, null, null],
      skillOrders: [[], [], [], [], []],
      pet: null,
      notes: "",
      formationType: "basic",
    };
    setTeams([...teams, newTeam]);
  };

  const handleClearTeam = (teamIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex].slots = [null, null, null, null, null];
    newTeams[teamIndex].tiers = [0, 0, 0, 0, 0];
    newTeams[teamIndex].gearSets = [null, null, null, null, null];
    newTeams[teamIndex].skillOrders = [[], [], [], [], []];
    newTeams[teamIndex].pet = null;
    setTeams(newTeams);
  };

  const handleClearAllTeams = () => {
    setConfirmationModal({
      isOpen: true,
      title: "Clear All Teams",
      message: "Are you sure you want to clear all teams? This cannot be undone.",
      isDanger: true,
      onConfirm: () => {
        const newTeams = teams.map((team) => ({
          ...team,
          slots: [null, null, null, null, null],
          tiers: [0, 0, 0, 0, 0],
          gearSets: [null, null, null, null, null],
          skillOrders: [[], [], [], [], []],
          pet: null,
        }));
        setTeams(newTeams);
        setConfirmationModal(null);
        showToast("All teams cleared", "info");
      },
    });
  };

  const handleRemoveTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      const newTeams = teams.filter((_, i) => i !== teamIndex);
      setTeams(newTeams);
      showToast("Team removed", "info");
    } else {
      showToast("You must have at least one team.", "error");
    }
  };

  const handleResetSkills = (teamIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex].skillOrders = [[], [], [], [], []];
    setTeams(newTeams);
  };

  const handleOpenNotes = (teamIndex: number) => {
    setShowNotesPopup(teamIndex);
    setNotesText(teams[teamIndex].notes || "");
  };

  const handleSaveNotes = () => {
    if (showNotesPopup !== null) {
      const newTeams = [...teams];
      newTeams[showNotesPopup].notes = notesText;
      setTeams(newTeams);
      setShowNotesPopup(null);
      setNotesText("");
    }
  };

  const handleCancelNotes = () => {
    setShowNotesPopup(null);
    setNotesText("");
  };

  const handleCopyAsImage = async (teamIndex: number) => {
    const team = teams[teamIndex];
    if (!team) return;

    setIsExporting(true);
    setCopyImageState((prev) => ({ ...prev, [teamIndex]: "idle" }));
    try {
      const canvas = await generateTeamCanvas(team, teamIndex, state.heroData);
      const copied = await copyCanvasToClipboard(canvas);

      if (copied) {
        setCopyImageState((prev) => ({ ...prev, [teamIndex]: "copied" }));
        showToast("Team image copied to clipboard!", "success");
        setTimeout(() => {
          setCopyImageState((prev) => ({ ...prev, [teamIndex]: "idle" }));
        }, 2000);
      } else {
        // Fallback to download
        const teamName = team.name || `Team ${teamIndex + 1}`;
        const filename = `${teamName.replace(
          /[^a-z0-9]/gi,
          "_"
        )}-${Date.now()}.png`;
        downloadCanvasAsImage(canvas, filename);
        setCopyImageState((prev) => ({ ...prev, [teamIndex]: "copied" }));
        showToast("Team image downloaded!", "success");
        setTimeout(() => {
          setCopyImageState((prev) => ({ ...prev, [teamIndex]: "idle" }));
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to generate team image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllTeams = async () => {
    if (teams.length === 0) {
      return;
    }

    setIsExporting(true);
    setExportAllState("idle");
    try {
      const canvas = await generateAllTeamsCanvas(teams, state.heroData);
      const copied = await copyCanvasToClipboard(canvas);

      if (copied) {
        setExportAllState("copied");
        showToast("All teams image copied to clipboard!", "success");
        setTimeout(() => {
          setExportAllState("idle");
        }, 2000);
      } else {
        // Fallback to download
        const filename = `all-teams-${Date.now()}.png`;
        downloadCanvasAsImage(canvas, filename);
        setExportAllState("copied");
        showToast("All teams image downloaded!", "success");
        setTimeout(() => {
          setExportAllState("idle");
        }, 2000);
      }
    } catch (error) {
      console.error("Failed to generate all teams image:", error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleLoadSavedTeam = (data: string) => {
    const success = parseImportString(data);
    if (success) {
      showToast("Team loaded successfully!", "success");
    } else {
      showToast("Failed to load saved team data.", "error");
    }
  };

  const typeButtons = [
    "",
    "Attack",
    "Magic",
    "Defense",
    "Support",
    "Universal",
  ];

  return (
    <div className="team-builder-view">
      <div className="page-content team-builder-page">
        <div className="team-builder-header">
          <h1 className="team-builder-title">TEAM BUILDER</h1>
        </div>
        <div className="team-builder-main">
          {/* Left Sidebar: Hero Pool */}
          <div className="team-builder-sidebar">
            <h2 className="sidebar-title">Hero Pool</h2>
            <div className="hero-pool-search">
              <input
                type="text"
                placeholder="Search heroes..."
                className="team-builder-search-input"
                value={state.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="team-builder-filters">
              <div className="team-builder-type-filter">
                <div className="type-button-group">
                  {typeButtons.map((type) => (
                    <button
                      key={type || "all"}
                      className={`type-filter-button ${state.selectedType === type ? "active" : ""
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
              <div className="team-builder-effect-filter">
                <SearchableDropdown
                  id="team-builder-effect"
                  placeholder="Filter by Effect..."
                  options={effectOptions}
                  selectedValue={state.selectedEffect}
                  onSelect={setSelectedEffect}
                  onClear={() => setSelectedEffect("")}
                  label="Effects"
                />
              </div>
            </div>
            <div className="team-builder-mode-toggle">
              <button
                className={`mode-toggle-btn ${!showPets ? "active" : ""}`}
                onClick={() => setShowPets(false)}
              >
                Heroes
              </button>
              <button
                className={`mode-toggle-btn ${showPets ? "active" : ""}`}
                onClick={() => setShowPets(true)}
              >
                Pets
              </button>
            </div>
            <div className="hero-pool-grid">
              {showPets
                ? filteredPets.map((petName) => {
                  const isSelected = selectedHero === `pet:${petName}`;
                  return (
                    <div
                      key={petName}
                      className={`hero-pool-card ${isSelected ? "selected" : ""
                        } ${draggedHero === `pet:${petName}` ? "dragging" : ""
                        }`}
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(`pet:${petName}`, e)
                      }
                      onDragEnd={handleDragEnd}
                      onClick={() => handlePetClick(petName)}
                    >
                      <div className="hero-pool-image-container">
                        <img
                          src={getPetIconPath(petName) || ""}
                          alt={petName}
                          className="hero-pool-image"
                        />
                      </div>
                      <div className="hero-pool-name">{petName}</div>
                    </div>
                  );
                })
                : filteredHeroes.map((heroName) => {
                  const isSelected = selectedHero === heroName;
                  const heroInfo = state.heroData[heroName];
                  const heroType = heroInfo?.type?.toLowerCase() || "";

                  return (
                    <div
                      key={heroName}
                      className={`hero-pool-card ${isSelected ? "selected" : ""
                        } ${draggedHero === heroName ? "dragging" : ""}`}
                      data-hero-type={heroType}
                      draggable
                      onDragStart={(e) => handleDragStart(heroName, e)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleHeroClick(heroName)}
                    >
                      <div className="hero-pool-image-container">
                        {heroInfo?.type && (
                          <div className="type-icon-badge-small">
                            <img
                              src={getTypeIconPath(heroInfo.type)}
                              alt={heroInfo.type}
                            />
                          </div>
                        )}
                        {heroInfo?.rarity && (
                          <div
                            className={`rarity-badge-small rarity-${heroInfo.rarity
                              .toLowerCase()
                              .replace(/\+/g, "plus")}`}
                          >
                            {heroInfo.rarity}
                          </div>
                        )}
                        <img
                          src={getHeroImagePath(heroName)}
                          alt={heroName}
                          className="hero-pool-image"
                          onError={(e) => console.error(`Failed to load image for ${heroName}:`, e.currentTarget.src)}
                        />
                      </div>
                      <div className="hero-pool-name">{heroName}</div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right Side: Teams */}
          <div className="team-builder-teams-section">
            <div className="team-builder-controls">
              <div className="team-builder-subject-section">
                <label htmlFor="team-builder-subject" className="subject-label">
                  Subject/Description:
                </label>
                <input
                  type="text"
                  id="team-builder-subject"
                  placeholder="e.g., PvP Teams, Advent Boss Teams..."
                  className="team-builder-subject-input"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className="import-export-section">
                <div className="share-section">
                  <button
                    className="btn-secondary btn-saved-teams"
                    onClick={() => setShowSavedTeamsModal(true)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    Saved Teams
                  </button>
                  <button
                    id="share-url-btn"
                    className="btn-primary"
                    onClick={handleCopyURL}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                    {copyUrlState === "copied" ? "Copied!" : "Copy URL"}
                  </button>
                  <button
                    id="export-all-teams-btn-top"
                    className="btn-primary btn-export-all"
                    onClick={handleExportAllTeams}
                    disabled={isExporting || teams.length === 0}
                  >
                    {isExporting ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="spinner"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                        Generating...
                      </>
                    ) : exportAllState === "copied" ? (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                        Export All Teams
                      </>
                    )}
                  </button>
                </div>
                <div className="clear-all-section">
                  <button
                    id="clear-all-teams-btn"
                    className="btn-secondary"
                    onClick={handleClearAllTeams}
                  >
                    Clear All Teams
                  </button>
                </div>
              </div>
            </div>

            <div className="teams-container">
              {teams.map((team, teamIndex) => (
                <TeamCard
                  key={teamIndex}
                  team={team}
                  teamIndex={teamIndex}
                  teams={teams}
                  state={state}
                  getRowForFormation={getRowForFormation}
                  getSkillOrderColor={getSkillOrderColor}
                  onTeamNameChange={(name) => {
                    const newTeams = [...teams];
                    newTeams[teamIndex].name = name;
                    setTeams(newTeams);
                  }}
                  onFormationChange={(formation) => {
                    const newTeams = [...teams];
                    newTeams[teamIndex].formationType = formation;
                    setTeams(newTeams);
                  }}
                  onSlotClick={handleSlotClick}
                  onPetSlotClick={handlePetSlotClick}
                  onDrop={handleDrop}
                  onPetDrop={handlePetDrop}
                  onRemoveHero={handleRemoveHero}
                  onRemovePet={handleRemovePet}
                  onTierChange={handleTierChange}
                  onGearSetChange={handleGearSetChange}
                  onPetChange={(pet) => {
                    const newTeams = [...teams];
                    newTeams[teamIndex].pet = pet || null;
                    setTeams(newTeams);
                  }}
                  onToggleSkillOrder={toggleSkillOrder}
                  onHeroSelect={handleHeroSelect}
                  onClearTeam={() => handleClearTeam(teamIndex)}
                  onRemoveTeam={() => handleRemoveTeam(teamIndex)}
                  onResetSkills={() => handleResetSkills(teamIndex)}
                  onOpenNotes={() => handleOpenNotes(teamIndex)}
                  onCopyAsImage={() => handleCopyAsImage(teamIndex)}
                  copyImageState={copyImageState[teamIndex] || "idle"}
                />
              ))}
            </div>

            <div className="team-actions">
              <button
                id="add-team-btn"
                className="btn-add-team"
                onClick={handleAddTeam}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Popup */}
      {showNotesPopup !== null && (
        <div className="notes-popup-overlay" onClick={handleCancelNotes}>
          <div className="notes-popup" onClick={(e) => e.stopPropagation()}>
            <h3>Special Notes</h3>
            <textarea
              className="notes-textarea"
              placeholder="Enter special notes for this team..."
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              autoFocus
            />
            <div className="notes-popup-buttons">
              <button className="btn-save-notes" onClick={handleSaveNotes}>
                Save
              </button>
              <button className="btn-cancel-notes" onClick={handleCancelNotes}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <SavedTeamsModal
        isOpen={showSavedTeamsModal}
        onClose={() => setShowSavedTeamsModal(false)}
        onLoad={handleLoadSavedTeam}
        currentData={generateImportString()}
      />

      {confirmationModal && (
        <ConfirmationModal
          isOpen={confirmationModal.isOpen}
          title={confirmationModal.title}
          message={confirmationModal.message}
          onConfirm={confirmationModal.onConfirm}
          onCancel={() => setConfirmationModal(null)}
          isDanger={confirmationModal.isDanger}
        />
      )}
    </div>
  );
};

interface TeamCardProps {
  team: TeamBuilderTeam;
  teamIndex: number;
  teams: TeamBuilderTeam[];
  state: AppState;
  getRowForFormation: (
    formationType: string,
    slotIndex: number
  ) => "front" | "back";
  getSkillOrderColor: (order: number) => string;
  onTeamNameChange: (name: string) => void;
  onFormationChange: (
    formation: "basic" | "balanced" | "attack" | "protective"
  ) => void;
  onSlotClick: (teamIndex: number, slotIndex: number) => void;
  onPetSlotClick: (teamIndex: number) => void;
  onDrop: (teamIndex: number, slotIndex: number, e: React.DragEvent) => void;
  onPetDrop: (teamIndex: number, e: React.DragEvent) => void;
  onRemoveHero: (teamIndex: number, slotIndex: number) => void;
  onRemovePet: (teamIndex: number) => void;
  onTierChange: (teamIndex: number, slotIndex: number, tier: number) => void;
  onGearSetChange: (
    teamIndex: number,
    slotIndex: number,
    gearSet: string
  ) => void;
  onPetChange: (pet: string | null) => void;
  onToggleSkillOrder: (
    teamIndex: number,
    slotIndex: number,
    skill: "s1" | "s2"
  ) => void;
  onHeroSelect: (
    teamIndex: number,
    slotIndex: number,
    heroName: string
  ) => void;
  onClearTeam: () => void;
  onRemoveTeam: () => void;
  onResetSkills: () => void;
  onOpenNotes: () => void;
  onCopyAsImage: () => void;
  copyImageState: "idle" | "copied";
}

const TeamCard: React.FC<TeamCardProps> = ({
  team,
  teamIndex,
  teams,
  state,
  getRowForFormation,
  getSkillOrderColor,
  onTeamNameChange,
  onFormationChange,
  onSlotClick,
  onPetSlotClick,
  onDrop,
  onPetDrop,
  onRemoveHero,
  onRemovePet,
  onTierChange,
  onGearSetChange,
  onPetChange,
  onToggleSkillOrder,
  onHeroSelect,
  onClearTeam,
  onRemoveTeam,
  onResetSkills,
  onOpenNotes,
  onCopyAsImage,
  copyImageState,
}) => {
  return (
    <div className="team-wrapper">
      <div className="team-header">
        <div className="team-header-left">
          <input
            type="text"
            className="team-name-input"
            value={team.name}
            onChange={(e) => onTeamNameChange(e.target.value)}
            placeholder={`Team ${teamIndex + 1}`}
          />
          <select
            className="team-formation-select"
            value={team.formationType}
            onChange={(e) =>
              onFormationChange(
                e.target.value as TeamBuilderTeam["formationType"]
              )
            }
          >
            <option value="basic">Basic (2F, 3B)</option>
            <option value="balanced">Balanced (3F, 2B)</option>
            <option value="attack">Attack (1F, 4B)</option>
            <option value="protective">Protective (4F, 1B)</option>
          </select>
        </div>
        <div className="team-header-center">
          <button className="btn-clear-team" onClick={onClearTeam}>
            Clear
          </button>
        </div>
        <div className="team-header-right">
          <button className="btn-remove-team" onClick={onRemoveTeam}>
            &times;
          </button>
        </div>
      </div>

      <div className="team-slots" data-formation={team.formationType}>
        {[0, 1, 2, 3, 4].map((slotIndex) => {
          const heroName = team.slots[slotIndex];
          const row = getRowForFormation(team.formationType, slotIndex);
          return (
            <TeamSlot
              key={slotIndex}
              teamIndex={teamIndex}
              slotIndex={slotIndex}
              heroName={heroName}
              row={row}
              tier={team.tiers[slotIndex] || 0}
              gearSet={team.gearSets[slotIndex] || null}
              skillOrder={team.skillOrders[slotIndex] || []}
              teams={teams}
              state={state}
              getSkillOrderColor={getSkillOrderColor}
              onSlotClick={onSlotClick}
              onDrop={onDrop}
              onRemoveHero={onRemoveHero}
              onTierChange={onTierChange}
              onGearSetChange={onGearSetChange}
              onToggleSkillOrder={onToggleSkillOrder}
              onHeroSelect={onHeroSelect}
            />
          );
        })}
        <div className="team-pet-grid-slot">
          <PetSlot
            teamIndex={teamIndex}
            pet={team.pet}
            onPetSlotClick={onPetSlotClick}
            onPetDrop={onPetDrop}
            onRemovePet={onRemovePet}
            onPetChange={onPetChange}
          />
        </div>
      </div>

      <div className="team-bottom-container">
        <div className="team-reset-skills-container">
          <button className="btn-reset-skills" onClick={onResetSkills}>
            Reset Skills
          </button>
        </div>
        <div className="team-notes-container">
          <button className="btn-notes" onClick={onOpenNotes}>
            Notes
          </button>
        </div>
        <PetSlot
          teamIndex={teamIndex}
          pet={team.pet}
          onPetSlotClick={onPetSlotClick}
          onPetDrop={onPetDrop}
          onRemovePet={onRemovePet}
          onPetChange={onPetChange}
        />
        <div className="team-share-image-container">
          <button className="btn-share-team-image" onClick={onCopyAsImage}>
            {copyImageState === "copied" ? (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Copy as Image
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

interface HeroSelectorProps {
  teamIndex: number;
  slotIndex: number;
  teams: TeamBuilderTeam[];
  heroes: readonly string[];
  onHeroSelect: (
    teamIndex: number,
    slotIndex: number,
    heroName: string
  ) => void;
}

const HeroSelector: React.FC<HeroSelectorProps> = ({
  teamIndex,
  slotIndex,
  teams,
  heroes,
  onHeroSelect,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Get heroes already placed in teams
  const placedHeroes = React.useMemo(() => {
    const placed = new Set<string>();
    teams.forEach((team) => {
      team.slots.forEach((heroName) => {
        if (heroName) {
          placed.add(heroName);
        }
      });
    });
    return placed;
  }, [teams]);

  // Filter heroes based on search term and availability
  const filteredHeroes = React.useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return heroes.filter((hero) => {
      if (placedHeroes.has(hero)) {
        return false; // Already placed
      }
      if (!term) {
        return true; // Show all if no search term
      }
      return hero.toLowerCase().includes(term);
    });
  }, [heroes, placedHeroes, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    // Delay to allow click events on dropdown to fire first
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
        // Try to match partial input
        const match = heroes.find(
          (h) => h.toLowerCase() === searchTerm.toLowerCase()
        );
        if (match && !placedHeroes.has(match)) {
          onHeroSelect(teamIndex, slotIndex, match);
          setSearchTerm("");
        } else {
          setSearchTerm("");
        }
      }
    }, 200);
  };

  const handleHeroClick = (heroName: string) => {
    onHeroSelect(teamIndex, slotIndex, heroName);
    setSearchTerm("");
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showDropdown]);

  return (
    <div className="hero-selector-container">
      <input
        ref={inputRef}
        type="text"
        className="hero-selector-input"
        placeholder="Search hero..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={(e) => {
          e.stopPropagation();
          setShowDropdown(true);
        }}
        autoComplete="off"
      />
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="hero-selector-dropdown show"
          onMouseDown={(e) => e.preventDefault()} // Prevent input blur
        >
          {filteredHeroes.length === 0 ? (
            <div className="hero-selector-option empty">No heroes found</div>
          ) : (
            filteredHeroes.map((hero) => (
              <div
                key={hero}
                className="hero-selector-option"
                onClick={() => handleHeroClick(hero)}
              >
                {hero}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface TeamSlotProps {
  teamIndex: number;
  slotIndex: number;
  heroName: string | null;
  row: "front" | "back";
  tier: number;
  gearSet: string | null;
  skillOrder: SkillOrder[];
  teams: TeamBuilderTeam[];
  state: AppState;
  getSkillOrderColor: (order: number) => string;
  onSlotClick: (teamIndex: number, slotIndex: number) => void;
  onDrop: (teamIndex: number, slotIndex: number, e: React.DragEvent) => void;
  onRemoveHero: (teamIndex: number, slotIndex: number) => void;
  onTierChange: (teamIndex: number, slotIndex: number, tier: number) => void;
  onGearSetChange: (
    teamIndex: number,
    slotIndex: number,
    gearSet: string
  ) => void;
  onToggleSkillOrder: (
    teamIndex: number,
    slotIndex: number,
    skill: "s1" | "s2"
  ) => void;
  onHeroSelect: (
    teamIndex: number,
    slotIndex: number,
    heroName: string
  ) => void;
}

const TeamSlot: React.FC<TeamSlotProps> = ({
  teamIndex,
  slotIndex,
  heroName,
  row,
  tier,
  gearSet,
  skillOrder,
  teams,
  state,
  getSkillOrderColor,
  onSlotClick,
  onDrop,
  onRemoveHero,
  onTierChange,
  onGearSetChange,
  onToggleSkillOrder,
  onHeroSelect,
}) => {
  const heroInfo = heroName ? state.heroData[heroName] : null;
  const s1Skill = skillOrder.find((s) => s.skill === "s1");
  const s2Skill = skillOrder.find((s) => s.skill === "s2");

  return (
    <div
      className={`team-slot team-slot-${row} ${!heroName ? "empty-slot" : ""}`}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (
          !target.closest(".team-slot-hero") &&
          !target.closest(".hero-selector-container")
        ) {
          onSlotClick(teamIndex, slotIndex);
        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      }}
      onDrop={(e) => onDrop(teamIndex, slotIndex, e)}
    >
      {heroName ? (
        <div
          className="team-slot-hero"
          data-hero-type={heroInfo?.type?.toLowerCase()}
        >
          <div className="team-slot-gear-container">
            <select
              className="team-slot-gear-select"
              value={gearSet || ""}
              onChange={(e) =>
                onGearSetChange(teamIndex, slotIndex, e.target.value)
              }
              onClick={(e) => e.stopPropagation()}
            >
              {GEAR_SETS.map((gear) => (
                <option key={gear} value={gear === "None" ? "" : gear}>
                  {gear}
                </option>
              ))}
            </select>
          </div>
          <div className="team-slot-image-container">
            <img
              src={getHeroImagePath(heroName)}
              alt={heroName}
              className="team-slot-image"
            />
            {heroInfo?.type && (
              <div className="type-icon-badge-small">
                <img src={getTypeIconPath(heroInfo.type)} alt={heroInfo.type} />
              </div>
            )}
            {heroInfo?.rarity && (
              <div
                className={`rarity-badge-small rarity-${heroInfo.rarity
                  .toLowerCase()
                  .replace(/\+/g, "plus")}`}
              >
                {heroInfo.rarity}
              </div>
            )}
          </div>
          <div className="team-slot-hero-name">{heroName}</div>
          <div className="tier-stars-container">
            <button
              className="tier-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                onTierChange(teamIndex, slotIndex, 0);
              }}
            >
              ×
            </button>
            <div className="tier-stars-group">
              {[1, 2, 3, 4, 5, 6].map((tierLevel) => (
                <button
                  key={tierLevel}
                  className={`tier-star ${tierLevel <= tier ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTierChange(teamIndex, slotIndex, tierLevel);
                  }}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="skill-order-container">
            <div className="skill-boxes">
              <div
                className={`skill-box ${s2Skill ? "skill-selected" : ""}`}
                style={
                  s2Skill
                    ? {
                      backgroundColor: getSkillOrderColor(s2Skill.order),
                      color: "#fff",
                      borderColor: getSkillOrderColor(s2Skill.order),
                    }
                    : {}
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSkillOrder(teamIndex, slotIndex, "s2");
                }}
              >
                {s2Skill ? s2Skill.order : ""}
              </div>
              <div
                className={`skill-box ${s1Skill ? "skill-selected" : ""}`}
                style={
                  s1Skill
                    ? {
                      backgroundColor: getSkillOrderColor(s1Skill.order),
                      color: "#fff",
                      borderColor: getSkillOrderColor(s1Skill.order),
                    }
                    : {}
                }
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSkillOrder(teamIndex, slotIndex, "s1");
                }}
              >
                {s1Skill ? s1Skill.order : ""}
              </div>
            </div>
          </div>
          <button
            className="remove-hero-btn"
            onClick={(e) => {
              e.stopPropagation();
              onRemoveHero(teamIndex, slotIndex);
            }}
          >
            &times;
          </button>
        </div>
      ) : (
        <HeroSelector
          teamIndex={teamIndex}
          slotIndex={slotIndex}
          teams={teams}
          heroes={heroes}
          onHeroSelect={onHeroSelect}
        />
      )}
    </div>
  );
};

interface PetSlotProps {
  teamIndex: number;
  pet: string | null;
  onPetSlotClick: (teamIndex: number) => void;
  onPetDrop: (teamIndex: number, e: React.DragEvent) => void;
  onRemovePet: (teamIndex: number) => void;
  onPetChange: (pet: string | null) => void;
}

const PetSlot: React.FC<PetSlotProps> = ({
  teamIndex,
  pet,
  onPetSlotClick,
  onPetDrop,
  onRemovePet,
  onPetChange,
}) => {
  return (
    <div className="team-pet-container">
      <div
        className={`team-pet-slot ${!pet ? "empty-pet-slot" : ""}`}
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (!target.closest(".team-pet-card")) {
            onPetSlotClick(teamIndex);
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
        }}
        onDrop={(e) => onPetDrop(teamIndex, e)}
      >
        {pet ? (
          <div className="team-pet-card">
            <div className="team-pet-image-container">
              <img
                src={getPetIconPath(pet) || ""}
                alt={pet || "Pet"}
                className="team-pet-image"
              />
            </div>
            <button
              className="remove-pet-btn"
              onClick={(e) => {
                e.stopPropagation();
                onRemovePet(teamIndex);
              }}
            >
              &times;
            </button>
          </div>
        ) : (
          <select
            className="team-pet-select"
            value=""
            onChange={(e) => onPetChange(e.target.value || null)}
            onClick={(e) => e.stopPropagation()}
          >
            <option value="">None</option>
            {PETS.map((petName) => (
              <option key={petName} value={petName}>
                {petName}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default TeamBuilder;
