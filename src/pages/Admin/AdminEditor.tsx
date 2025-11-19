import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  loadHeroData,
  loadAdventTeamsData,
  loadGuildWarTeamsData,
} from "../../lib/data-loader";
import type {
  HeroDataMap,
  AdventTeamsData,
  GuildWarTeamsData,
  AdventTeam,
  GuildWarTeam,
} from "../../lib/types";
import { heroes, PETS } from "../../lib/constants";
import "./AdminEditor.css";

// Gear Set Options (based on available gear set photos)
const GEAR_SETS = [
  "Assassin Magic",
  "Assassin Physical",
  "Avenger Magic",
  "Avenger Physical",
  "Bounty Tracker Physical",
  "Full Speed",
  "Gatekeeper Magic",
  "Gatekeeper Physical",
  "Guardian Magic",
  "Guardian Physical",
  "Orchestrator Magic",
  "Orchestrator Physical",
  "Paladin Magic",
  "Spellweaver Magic",
  "Spellweaver Physical",
  "Vanguard Magic",
  "Vanguard Physical",
];

// Main Stats Options
const MAIN_STATS = [
  "Crit Rate",
  "Crit Damage",
  "All Attack %",
  "Physical Attack %",
  "Magic Attack %",
  "Max HP %",
  "Effect Hit Rate",
  "Weakness Hit Chance",
  "Block Rate",
  "Speed",
];

// Sub Stats Options
const SUB_STATS = [
  "Crit Rate",
  "Crit Damage",
  "All Attack %",
  "Physical Attack %",
  "Magic Attack %",
  "Max HP",
  "Effect Hit Rate",
  "Weakness Hit Chance",
  "Block Rate",
  "Speed",
  "Damage Reduction",
  "Lifesteal",
];

const AdminEditor: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"heroes" | "advent" | "guildwar">(
    "heroes"
  );
  const [heroData, setHeroData] = useState<HeroDataMap>({});
  const [adventData, setAdventData] = useState<AdventTeamsData>({});
  const [guildWarData, setGuildWarData] = useState<GuildWarTeamsData>({});
  const [selectedHero, setSelectedHero] = useState<string>("");
  const [selectedBoss, setSelectedBoss] = useState<string>("");
  const [selectedGuildWarCategory, setSelectedGuildWarCategory] =
    useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [isLocal, setIsLocal] = useState<boolean | null>(null); // null = checking, true = local, false = not local

  // Check if running on localhost
  useEffect(() => {
    const hostname = window.location.hostname;
    const local = hostname === "localhost" || hostname === "127.0.0.1";
    setIsLocal(local);

    // Only redirect if we've confirmed it's NOT localhost
    if (!local) {
      navigate({ to: "/404" });
    }
  }, [navigate]);

  // Load data on mount (only if local)
  useEffect(() => {
    if (isLocal === true) {
      const loadData = async () => {
        try {
          const [heroes, advent, guildWar] = await Promise.all([
            loadHeroData(),
            loadAdventTeamsData(),
            loadGuildWarTeamsData(),
          ]);
          setHeroData(heroes);
          setAdventData(advent);
          setGuildWarData(guildWar);
        } catch (error) {
          console.error("Failed to load data:", error);
        }
      };
      loadData();
    }
  }, [isLocal]);

  // Save data to file
  const saveData = async (file: string, data: unknown) => {
    if (!isLocal) {
      alert("Admin editor is only available on localhost");
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file, data }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result.success) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
        alert(`Failed to save: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      setSaveStatus("error");
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert(`Failed to save: ${errorMessage}`);
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading or nothing while checking
  if (isLocal === null) {
    return null; // Still checking
  }

  // Don't render anything if not local (will redirect)
  if (isLocal === false) {
    return null;
  }

  return (
    <div className="admin-editor-view">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">ADMIN EDITOR</h1>
          <p className="admin-subtitle">Local-only JSON data editor</p>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "heroes" ? "active" : ""}`}
            onClick={() => setActiveTab("heroes")}
          >
            Hero Data
          </button>
          <button
            className={`admin-tab ${activeTab === "advent" ? "active" : ""}`}
            onClick={() => setActiveTab("advent")}
          >
            Advent Teams
          </button>
          <button
            className={`admin-tab ${activeTab === "guildwar" ? "active" : ""}`}
            onClick={() => setActiveTab("guildwar")}
          >
            Guild War Teams
          </button>
        </div>

        <div className="admin-content">
          {activeTab === "heroes" && (
            <HeroDataEditor
              heroData={heroData}
              setHeroData={setHeroData}
              selectedHero={selectedHero}
              setSelectedHero={setSelectedHero}
              onSave={() => saveData("hero-data.json", heroData)}
              isSaving={isSaving}
              saveStatus={saveStatus}
            />
          )}

          {activeTab === "advent" && (
            <AdventDataEditor
              adventData={adventData}
              setAdventData={setAdventData}
              selectedBoss={selectedBoss}
              setSelectedBoss={setSelectedBoss}
              onSave={() => saveData("advent-teams-data.json", adventData)}
              isSaving={isSaving}
              saveStatus={saveStatus}
            />
          )}

          {activeTab === "guildwar" && (
            <GuildWarDataEditor
              guildWarData={guildWarData}
              setGuildWarData={setGuildWarData}
              selectedCategory={selectedGuildWarCategory}
              setSelectedCategory={setSelectedGuildWarCategory}
              onSave={() => saveData("guild-war-teams-data.json", guildWarData)}
              isSaving={isSaving}
              saveStatus={saveStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Multi-Select Dropdown Component for Stats
interface MultiSelectDropdownProps {
  options: string[];
  value: string; // Comma-separated values
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select options...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Parse comma-separated values
  const selectedValues = value
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v);

  const filteredOptions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return options;
    return options.filter((opt) => opt.toLowerCase().includes(term));
  }, [options, searchTerm]);

  const toggleOption = (option: string) => {
    const isSelected = selectedValues.includes(option);
    let newValues: string[];
    if (isSelected) {
      newValues = selectedValues.filter((v) => v !== option);
    } else {
      newValues = [...selectedValues, option];
    }
    onChange(newValues.join(", "));
  };

  const addCustomValue = (customValue: string) => {
    const trimmedValue = customValue.trim();
    if (trimmedValue && !selectedValues.includes(trimmedValue)) {
      const newValues = [...selectedValues, trimmedValue];
      onChange(newValues.join(", "));
      setSearchTerm("");
    }
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault();
      addCustomValue(searchTerm);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
        setSearchTerm("");
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
    <div className="admin-searchable-select">
      <input
        ref={inputRef}
        type="text"
        className="admin-input admin-search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={handleInputFocus}
        onClick={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {selectedValues.length > 0 && (
        <div className="admin-selected-tags">
          {selectedValues.map((val) => (
            <span key={val} className="admin-tag">
              {val}
              <button
                type="button"
                onClick={() => toggleOption(val)}
                className="admin-tag-remove"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="admin-search-dropdown"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredOptions.length === 0 && searchTerm.trim() ? (
            <div
              className="admin-search-option add-custom"
              onClick={() => addCustomValue(searchTerm)}
            >
              + Add "{searchTerm.trim()}"
            </div>
          ) : filteredOptions.length === 0 ? (
            <div className="admin-search-option empty">Type to add custom stat</div>
          ) : (
            <>
              {filteredOptions.map((option) => (
                <div
                  key={option}
                  className={`admin-search-option ${
                    selectedValues.includes(option) ? "selected" : ""
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    readOnly
                    style={{ marginRight: "0.5rem" }}
                  />
                  {option}
                </div>
              ))}
              {searchTerm.trim() && !filteredOptions.includes(searchTerm.trim()) && (
                <div
                  className="admin-search-option add-custom"
                  onClick={() => addCustomValue(searchTerm)}
                >
                  + Add "{searchTerm.trim()}"
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Searchable Single Select Component
interface SearchableSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowCustom?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  allowCustom = true,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return options;
    return options.filter((opt) => opt.toLowerCase().includes(term));
  }, [options, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (allowCustom) {
      onChange(e.target.value);
    }
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
      }
    }, 200);
  };

  const handleOptionClick = (option: string) => {
    onChange(option);
    setSearchTerm("");
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    if (value && !searchTerm) {
      setSearchTerm(value);
    }
  }, [value]);

  useEffect(() => {
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
    <div className="admin-searchable-select">
      <input
        ref={inputRef}
        type="text"
        className="admin-input admin-search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={() => setShowDropdown(true)}
        autoComplete="off"
      />
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="admin-search-dropdown"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredOptions.length === 0 ? (
            <div className="admin-search-option empty">No options found</div>
          ) : (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={`admin-search-option ${
                  option === value ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Searchable Hero Select Component
interface SearchableHeroSelectProps {
  heroes: string[];
  selectedHero: string;
  onSelect: (hero: string) => void;
  placeholder?: string;
}

const SearchableHeroSelect: React.FC<SearchableHeroSelectProps> = ({
  heroes,
  selectedHero,
  onSelect,
  placeholder = "Search hero...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredHeroes = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return heroes;
    return heroes.filter((hero) => hero.toLowerCase().includes(term));
  }, [heroes, searchTerm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
  };

  const handleInputFocus = () => {
    setShowDropdown(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      if (!dropdownRef.current?.contains(document.activeElement)) {
        setShowDropdown(false);
        // Only auto-select if there's an exact match, otherwise keep what's typed
        const match = heroes.find(
          (h) => h.toLowerCase() === searchTerm.toLowerCase()
        );
        if (match) {
          onSelect(match);
        }
      }
    }, 250);
  };

  const handleHeroClick = (heroName: string) => {
    onSelect(heroName);
    setSearchTerm(heroName);
    setShowDropdown(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    setSearchTerm(selectedHero || "");
  }, [selectedHero]);

  useEffect(() => {
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
    <div className="admin-searchable-select">
      <input
        ref={inputRef}
        type="text"
        className="admin-input admin-search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onClick={() => setShowDropdown(true)}
        autoComplete="off"
      />
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="admin-search-dropdown"
          onMouseDown={(e) => e.preventDefault()}
        >
          {filteredHeroes.length === 0 ? (
            <div className="admin-search-option empty">No heroes found</div>
          ) : (
            filteredHeroes.map((hero) => (
              <div
                key={hero}
                className={`admin-search-option ${
                  hero === selectedHero ? "selected" : ""
                }`}
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

// Hero Data Editor Component
interface HeroDataEditorProps {
  heroData: HeroDataMap;
  setHeroData: React.Dispatch<React.SetStateAction<HeroDataMap>>;
  selectedHero: string;
  setSelectedHero: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
}

const HeroDataEditor: React.FC<HeroDataEditorProps> = ({
  heroData,
  setHeroData,
  selectedHero,
  setSelectedHero,
  onSave,
  isSaving,
  saveStatus,
}) => {
  const heroNames = Object.keys(heroData).sort();
  const currentHero = selectedHero ? heroData[selectedHero] : null;

  const updateHeroField = (
    field: keyof NonNullable<typeof currentHero>,
    value: string | string[]
  ) => {
    if (!selectedHero || !currentHero) return;
    setHeroData((prev) => ({
      ...prev,
      [selectedHero]: {
        ...currentHero,
        [field]: value,
      },
    }));
  };

  const updateGearSet = (
    mode: "pve" | "pvp",
    tier: "T0" | "T6",
    index: number,
    field: string,
    value: string
  ) => {
    if (!selectedHero || !currentHero) return;
    const gearKey = mode === "pve" ? "gear_pve" : "gear_pvp";
    const gear = currentHero[gearKey];
    const tierKey = tier === "T0" ? "T0" : "T6";
    const gearSets = [...(gear[tierKey] || [])];

    if (gearSets[index]) {
      gearSets[index] = {
        ...gearSets[index],
        [field]: value,
      };
    }

    setHeroData((prev) => ({
      ...prev,
      [selectedHero]: {
        ...currentHero,
        [gearKey]: {
          ...gear,
          [tierKey]: gearSets,
        },
      },
    }));
  };

  const addGearSet = (mode: "pve" | "pvp", tier: "T0" | "T6") => {
    if (!selectedHero || !currentHero) return;
    const gearKey = mode === "pve" ? "gear_pve" : "gear_pvp";
    const gear = currentHero[gearKey];
    const tierKey = tier === "T0" ? "T0" : "T6";
    const gearSets = [...(gear[tierKey] || [])];
    gearSets.push({
      name: "",
      main_stats: "",
      required_stat_thresholds: "",
      sub_stat_priority: "",
    });

    setHeroData((prev) => ({
      ...prev,
      [selectedHero]: {
        ...currentHero,
        [gearKey]: {
          ...gear,
          [tierKey]: gearSets,
        },
      },
    }));
  };

  const removeGearSet = (
    mode: "pve" | "pvp",
    tier: "T0" | "T6",
    index: number
  ) => {
    if (!selectedHero || !currentHero) return;
    const gearKey = mode === "pve" ? "gear_pve" : "gear_pvp";
    const gear = currentHero[gearKey];
    const tierKey = tier === "T0" ? "T0" : "T6";
    const gearSets = [...(gear[tierKey] || [])];
    gearSets.splice(index, 1);

    setHeroData((prev) => ({
      ...prev,
      [selectedHero]: {
        ...currentHero,
        [gearKey]: {
          ...gear,
          [tierKey]: gearSets,
        },
      },
    }));
  };

  const updateEffect = (index: number, value: string) => {
    if (!selectedHero || !currentHero) return;
    const effects = [...(currentHero.effects || [])];
    effects[index] = value;
    updateHeroField("effects", effects);
  };

  const addEffect = () => {
    if (!selectedHero || !currentHero) return;
    const effects = [...(currentHero.effects || []), ""];
    updateHeroField("effects", effects);
  };

  const removeEffect = (index: number) => {
    if (!selectedHero || !currentHero) return;
    const effects = [...(currentHero.effects || [])];
    effects.splice(index, 1);
    updateHeroField("effects", effects);
  };

  return (
    <div className="admin-editor-panel">
      <div className="admin-editor-header">
        <h2>Hero Data Editor</h2>
        <button
          className={`admin-save-btn ${
            saveStatus === "success" ? "success" : ""
          } ${saveStatus === "error" ? "error" : ""}`}
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : saveStatus === "success"
            ? "✓ Saved!"
            : saveStatus === "error"
            ? "✗ Error"
            : "Save Hero Data"}
        </button>
      </div>

      <div className="admin-editor-content">
        <div className="admin-selector-section">
          <label htmlFor="hero-select">Select Hero:</label>
          <SearchableHeroSelect
            heroes={heroNames}
            selectedHero={selectedHero}
            onSelect={setSelectedHero}
            placeholder="Search and select a hero..."
          />
        </div>

        {currentHero && (
          <div className="admin-form-section">
            <div className="admin-form-group">
              <label>Name:</label>
              <input
                type="text"
                value={currentHero.name}
                onChange={(e) => updateHeroField("name", e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label>Role:</label>
              <input
                type="text"
                value={currentHero.role}
                onChange={(e) => updateHeroField("role", e.target.value)}
                className="admin-input"
                placeholder="e.g., Support/Debuffs"
              />
            </div>

            <div className="admin-form-group">
              <label>Primary Content:</label>
              <input
                type="text"
                value={currentHero.primary_content}
                onChange={(e) =>
                  updateHeroField("primary_content", e.target.value)
                }
                className="admin-input"
                placeholder="e.g., Total War, GvG"
              />
            </div>

            <div className="admin-form-group">
              <label>Target Transcendence:</label>
              <input
                type="text"
                value={currentHero.target_transcendence}
                onChange={(e) =>
                  updateHeroField("target_transcendence", e.target.value)
                }
                className="admin-input"
                placeholder="e.g., T0, T0-T6"
              />
            </div>

            <div className="admin-form-group">
              <label>Wishlist Priority:</label>
              <select
                value={currentHero.wishlist_priority}
                onChange={(e) =>
                  updateHeroField("wishlist_priority", e.target.value)
                }
                className="admin-select"
              >
                <option value="Very High">Very High</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Very Low">Very Low</option>
                <option value="Do Not">Do Not</option>
                <option value="N/A">N/A</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Type:</label>
              <select
                value={currentHero.type}
                onChange={(e) => updateHeroField("type", e.target.value)}
                className="admin-select"
              >
                <option value="Attack">Attack</option>
                <option value="Magic">Magic</option>
                <option value="Defense">Defense</option>
                <option value="Support">Support</option>
                <option value="Universal">Universal</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Target Number:</label>
              <input
                type="text"
                value={currentHero.target_number}
                onChange={(e) =>
                  updateHeroField("target_number", e.target.value)
                }
                className="admin-input"
                placeholder="e.g., All Enemies, Single Enemy"
              />
            </div>

            <div className="admin-form-group">
              <label>Rarity:</label>
              <select
                value={currentHero.rarity}
                onChange={(e) => updateHeroField("rarity", e.target.value)}
                className="admin-select"
              >
                <option value="L++">L++</option>
                <option value="L+">L+</option>
                <option value="L">L</option>
                <option value="Rare">Rare</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Effects:</label>
              <div className="admin-array-editor">
                {(currentHero.effects || []).map((effect, index) => (
                  <div key={index} className="admin-array-item">
                    <input
                      type="text"
                      value={effect}
                      onChange={(e) => updateEffect(index, e.target.value)}
                      className="admin-input"
                      placeholder="Effect name"
                    />
                    <button
                      type="button"
                      className="admin-remove-btn"
                      onClick={() => removeEffect(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="admin-add-btn"
                  onClick={addEffect}
                >
                  + Add Effect
                </button>
              </div>
            </div>

            <div className="admin-form-group">
              <label>Skill Enhance Priority:</label>
              <input
                type="text"
                value={currentHero.skill_enhance_priority}
                onChange={(e) =>
                  updateHeroField("skill_enhance_priority", e.target.value)
                }
                className="admin-input"
                placeholder="e.g., S1, S2, or S1 > S2"
              />
            </div>

            <div className="admin-form-group">
              <label>Tips:</label>
              <textarea
                value={currentHero.tips}
                onChange={(e) => updateHeroField("tips", e.target.value)}
                className="admin-textarea"
                rows={4}
                placeholder="Tips and important information"
              />
            </div>

            {/* Gear PvE T0 */}
            <div className="admin-gear-section">
              <h3>Gear PvE - T0</h3>
              {(currentHero.gear_pve?.T0 || []).map((gear, index) => (
                <div key={index} className="admin-gear-card">
                  <button
                    type="button"
                    className="admin-remove-btn admin-gear-remove"
                    onClick={() => removeGearSet("pve", "T0", index)}
                  >
                    × Remove
                  </button>
                  <div className="admin-form-group">
                    <label>Gear Set Name:</label>
                    <SearchableSelect
                      options={GEAR_SETS}
                      value={gear.name}
                      onChange={(value) =>
                        updateGearSet("pve", "T0", index, "name", value)
                      }
                      placeholder="Select gear set..."
                      allowCustom={true}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Stats:</label>
                    <MultiSelectDropdown
                      options={MAIN_STATS}
                      value={gear.main_stats}
                      onChange={(value) =>
                        updateGearSet("pve", "T0", index, "main_stats", value)
                      }
                      placeholder="Select main stats..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Required Stat Thresholds:</label>
                    <input
                      type="text"
                      value={gear.required_stat_thresholds}
                      onChange={(e) =>
                        updateGearSet(
                          "pve",
                          "T0",
                          index,
                          "required_stat_thresholds",
                          e.target.value
                        )
                      }
                      className="admin-input"
                      placeholder="e.g., 100% Block Rate"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Sub Stat Priority:</label>
                    <MultiSelectDropdown
                      options={SUB_STATS}
                      value={gear.sub_stat_priority}
                      onChange={(value) =>
                        updateGearSet("pve", "T0", index, "sub_stat_priority", value)
                      }
                      placeholder="Select sub stats priority..."
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="admin-add-btn"
                onClick={() => addGearSet("pve", "T0")}
              >
                + Add T0 Gear Set
              </button>
            </div>

            {/* Gear PvE T6 */}
            <div className="admin-gear-section">
              <h3>Gear PvE - T6</h3>
              {(currentHero.gear_pve?.T6 || []).map((gear, index) => (
                <div key={index} className="admin-gear-card">
                  <button
                    type="button"
                    className="admin-remove-btn admin-gear-remove"
                    onClick={() => removeGearSet("pve", "T6", index)}
                  >
                    × Remove
                  </button>
                  <div className="admin-form-group">
                    <label>Gear Set Name:</label>
                    <SearchableSelect
                      options={GEAR_SETS}
                      value={gear.name}
                      onChange={(value) =>
                        updateGearSet("pve", "T6", index, "name", value)
                      }
                      placeholder="Select gear set..."
                      allowCustom={true}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Stats:</label>
                    <MultiSelectDropdown
                      options={MAIN_STATS}
                      value={gear.main_stats}
                      onChange={(value) =>
                        updateGearSet("pve", "T6", index, "main_stats", value)
                      }
                      placeholder="Select main stats..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Required Stat Thresholds:</label>
                    <input
                      type="text"
                      value={gear.required_stat_thresholds}
                      onChange={(e) =>
                        updateGearSet(
                          "pve",
                          "T6",
                          index,
                          "required_stat_thresholds",
                          e.target.value
                        )
                      }
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Sub Stat Priority:</label>
                    <MultiSelectDropdown
                      options={SUB_STATS}
                      value={gear.sub_stat_priority}
                      onChange={(value) =>
                        updateGearSet("pve", "T6", index, "sub_stat_priority", value)
                      }
                      placeholder="Select sub stats priority..."
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="admin-add-btn"
                onClick={() => addGearSet("pve", "T6")}
              >
                + Add T6 Gear Set
              </button>
            </div>

            {/* Gear PvP T0 */}
            <div className="admin-gear-section">
              <h3>Gear PvP - T0</h3>
              {(currentHero.gear_pvp?.T0 || []).map((gear, index) => (
                <div key={index} className="admin-gear-card">
                  <button
                    type="button"
                    className="admin-remove-btn admin-gear-remove"
                    onClick={() => removeGearSet("pvp", "T0", index)}
                  >
                    × Remove
                  </button>
                  <div className="admin-form-group">
                    <label>Gear Set Name:</label>
                    <SearchableSelect
                      options={GEAR_SETS}
                      value={gear.name}
                      onChange={(value) =>
                        updateGearSet("pvp", "T0", index, "name", value)
                      }
                      placeholder="Select gear set..."
                      allowCustom={true}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Stats:</label>
                    <MultiSelectDropdown
                      options={MAIN_STATS}
                      value={gear.main_stats}
                      onChange={(value) =>
                        updateGearSet("pvp", "T0", index, "main_stats", value)
                      }
                      placeholder="Select main stats..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Required Stat Thresholds:</label>
                    <input
                      type="text"
                      value={gear.required_stat_thresholds}
                      onChange={(e) =>
                        updateGearSet(
                          "pvp",
                          "T0",
                          index,
                          "required_stat_thresholds",
                          e.target.value
                        )
                      }
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Sub Stat Priority:</label>
                    <MultiSelectDropdown
                      options={SUB_STATS}
                      value={gear.sub_stat_priority}
                      onChange={(value) =>
                        updateGearSet("pvp", "T0", index, "sub_stat_priority", value)
                      }
                      placeholder="Select sub stats priority..."
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="admin-add-btn"
                onClick={() => addGearSet("pvp", "T0")}
              >
                + Add T0 Gear Set
              </button>
            </div>

            {/* Gear PvP T6 */}
            <div className="admin-gear-section">
              <h3>Gear PvP - T6</h3>
              {(currentHero.gear_pvp?.T6 || []).map((gear, index) => (
                <div key={index} className="admin-gear-card">
                  <button
                    type="button"
                    className="admin-remove-btn admin-gear-remove"
                    onClick={() => removeGearSet("pvp", "T6", index)}
                  >
                    × Remove
                  </button>
                  <div className="admin-form-group">
                    <label>Gear Set Name:</label>
                    <SearchableSelect
                      options={GEAR_SETS}
                      value={gear.name}
                      onChange={(value) =>
                        updateGearSet("pvp", "T6", index, "name", value)
                      }
                      placeholder="Select gear set..."
                      allowCustom={true}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Main Stats:</label>
                    <MultiSelectDropdown
                      options={MAIN_STATS}
                      value={gear.main_stats}
                      onChange={(value) =>
                        updateGearSet("pvp", "T6", index, "main_stats", value)
                      }
                      placeholder="Select main stats..."
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Required Stat Thresholds:</label>
                    <input
                      type="text"
                      value={gear.required_stat_thresholds}
                      onChange={(e) =>
                        updateGearSet(
                          "pvp",
                          "T6",
                          index,
                          "required_stat_thresholds",
                          e.target.value
                        )
                      }
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Sub Stat Priority:</label>
                    <MultiSelectDropdown
                      options={SUB_STATS}
                      value={gear.sub_stat_priority}
                      onChange={(value) =>
                        updateGearSet("pvp", "T6", index, "sub_stat_priority", value)
                      }
                      placeholder="Select sub stats priority..."
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="admin-add-btn"
                onClick={() => addGearSet("pvp", "T6")}
              >
                + Add T6 Gear Set
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Advent Teams Editor Component
interface AdventDataEditorProps {
  adventData: AdventTeamsData;
  setAdventData: React.Dispatch<React.SetStateAction<AdventTeamsData>>;
  selectedBoss: string;
  setSelectedBoss: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
}

const AdventDataEditor: React.FC<AdventDataEditorProps> = ({
  adventData,
  setAdventData,
  selectedBoss,
  setSelectedBoss,
  onSave,
  isSaving,
  saveStatus,
}) => {
  const bossNames = Object.keys(adventData).sort();
  const currentBoss = selectedBoss ? adventData[selectedBoss] : null;
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(-1);

  const addBoss = () => {
    const newBossName = prompt("Enter boss name:");
    if (newBossName && !adventData[newBossName]) {
      setAdventData((prev) => ({
        ...prev,
        [newBossName]: { teams: [] },
      }));
      setSelectedBoss(newBossName);
    }
  };

  const addTeam = () => {
    if (!selectedBoss) return;
    const newTeam: AdventTeam = {
      name: `Team ${(currentBoss?.teams.length || 0) + 1}`,
      formationType: "basic",
      pet: "",
      notes: "",
      heroes: [],
      skills: [],
    };
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: {
        teams: [...(prev[selectedBoss]?.teams || []), newTeam],
      },
    }));
    setSelectedTeamIndex(currentBoss?.teams.length || 0);
  };

  const removeTeam = (index: number) => {
    if (!selectedBoss || !currentBoss) return;
    const teams = [...currentBoss.teams];
    teams.splice(index, 1);
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: { teams },
    }));
    if (selectedTeamIndex === index) {
      setSelectedTeamIndex(-1);
    }
  };

  const updateTeam = (
    index: number,
    field: keyof AdventTeam,
    value: unknown
  ) => {
    if (!selectedBoss || !currentBoss) return;
    const teams = [...currentBoss.teams];
    teams[index] = { ...teams[index], [field]: value };
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: { teams },
    }));
  };

  const updateHero = (
    teamIndex: number,
    heroIndex: number,
    field: keyof AdventTeam["heroes"][0],
    value: string | number
  ) => {
    if (!selectedBoss || !currentBoss) return;
    const teams = [...currentBoss.teams];
    const heroes = [...teams[teamIndex].heroes];
    heroes[heroIndex] = { ...heroes[heroIndex], [field]: value };
    teams[teamIndex] = { ...teams[teamIndex], heroes };
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: { teams },
    }));
  };

  const removeHero = (teamIndex: number, heroIndex: number) => {
    if (!selectedBoss || !currentBoss) return;
    const teams = [...currentBoss.teams];
    const heroes = [...teams[teamIndex].heroes];
    heroes.splice(heroIndex, 1);
    heroes.forEach((hero, idx) => {
      hero.position = idx + 1;
    });
    teams[teamIndex] = { ...teams[teamIndex], heroes };
    const skills = [...teams[teamIndex].skills];
    skills.splice(heroIndex, 1);
    teams[teamIndex] = { ...teams[teamIndex], skills };
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: { teams },
    }));
  };

  const updateSkill = (
    teamIndex: number,
    skillIndex: number,
    field: "hero" | "s1" | "s2",
    value: string | number | null
  ) => {
    if (!selectedBoss || !currentBoss) return;
    const teams = [...currentBoss.teams];
    const skills = [...teams[teamIndex].skills];
    skills[skillIndex] = { ...skills[skillIndex], [field]: value };
    teams[teamIndex] = { ...teams[teamIndex], skills };
    setAdventData((prev) => ({
      ...prev,
      [selectedBoss]: { teams },
    }));
  };

  return (
    <div className="admin-editor-panel">
      <div className="admin-editor-header">
        <h2>Advent Teams Editor</h2>
        <button
          className={`admin-save-btn ${
            saveStatus === "success" ? "success" : ""
          } ${saveStatus === "error" ? "error" : ""}`}
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : saveStatus === "success"
            ? "✓ Saved!"
            : saveStatus === "error"
            ? "✗ Error"
            : "Save Advent Teams"}
        </button>
      </div>

      <div className="admin-editor-content">
        <div className="admin-selector-section">
          <label htmlFor="boss-select">Select Boss:</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select
              id="boss-select"
              className="admin-select"
              value={selectedBoss}
              onChange={(e) => {
                setSelectedBoss(e.target.value);
                setSelectedTeamIndex(-1);
              }}
            >
              <option value="">-- Select a Boss --</option>
              {bossNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button type="button" className="admin-add-btn" onClick={addBoss}>
              + Add Boss
            </button>
          </div>
        </div>

        {currentBoss && (
          <div className="admin-teams-section">
            <div className="admin-teams-header">
              <h3>Teams</h3>
              <button type="button" className="admin-add-btn" onClick={addTeam}>
                + Add Team
              </button>
            </div>

            {currentBoss.teams.map((team, teamIndex) => (
              <div key={teamIndex} className="admin-team-card-new">
                <div className="admin-team-card-header">
                  <div className="admin-team-header-left">
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) =>
                        updateTeam(teamIndex, "name", e.target.value)
                      }
                      className="admin-team-name-input"
                      placeholder={`Team ${teamIndex + 1}`}
                    />
                    <select
                      value={team.formationType}
                      onChange={(e) =>
                        updateTeam(
                          teamIndex,
                          "formationType",
                          e.target.value as AdventTeam["formationType"]
                        )
                      }
                      className="admin-formation-select"
                    >
                      <option value="basic">Basic (2F, 3B)</option>
                      <option value="balanced">Balanced (3F, 2B)</option>
                      <option value="attack">Attack (1F, 4B)</option>
                      <option value="protective">Protective (4F, 1B)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="admin-remove-btn"
                    onClick={() => removeTeam(teamIndex)}
                  >
                    × Remove
                  </button>
                </div>

                {true && (
                  <div className="admin-team-form">
                    {/* 5 Hero Slots Grid */}
                    <div className="admin-hero-slots-grid">
                      {[0, 1, 2, 3, 4].map((slotIndex) => {
                        const hero = team.heroes.find((h) => h.position === slotIndex + 1);
                        const heroIndex = hero ? team.heroes.indexOf(hero) : -1;
                        const skill = team.skills[heroIndex];

                        return (
                          <div key={slotIndex} className="admin-hero-slot">
                            <div className="admin-slot-header">Slot {slotIndex + 1}</div>
                            <div className="admin-slot-body">
                              <SearchableHeroSelect
                                heroes={[...heroes]}
                                selectedHero={hero?.name || ""}
                                onSelect={(name) => {
                                  if (!hero) {
                                    // Add new hero for Advent - update both heroes and skills atomically
                                    if (!selectedBoss || !currentBoss) return;
                                    const teams = [...currentBoss.teams];
                                    const newHeroes = [...teams[teamIndex].heroes];
                                    const row = slotIndex === 1 || slotIndex === 3 ? "front" : "back";
                                    newHeroes.push({ name, position: slotIndex + 1, row });
                                    // Add matching skill entry
                                    const newSkills = [...teams[teamIndex].skills];
                                    newSkills.push({ hero: name, s1: null, s2: null });
                                    teams[teamIndex] = { ...teams[teamIndex], heroes: newHeroes, skills: newSkills };
                                    setAdventData((prev) => ({
                                      ...prev,
                                      [selectedBoss]: { teams },
                                    }));
                                  } else if (heroIndex >= 0) {
                                    // Update existing hero
                                    updateHero(teamIndex, heroIndex, "name", name);
                                    // Update skill hero name
                                    if (skill) {
                                      updateSkill(teamIndex, heroIndex, "hero", name);
                                    }
                                  }
                                }}
                                placeholder="Select hero..."
                              />

                              {hero && (
                                <>
                                  <div className="admin-slot-row-selector">
                                    <label>
                                      <input
                                        type="radio"
                                        checked={hero.row === "front"}
                                        onChange={() => updateHero(teamIndex, heroIndex, "row", "front")}
                                      />
                                      Front
                                    </label>
                                    <label>
                                      <input
                                        type="radio"
                                        checked={hero.row === "back"}
                                        onChange={() => updateHero(teamIndex, heroIndex, "row", "back")}
                                      />
                                      Back
                                    </label>
                                  </div>

                                  <div className="admin-slot-skills">
                                    <div className="admin-skill-input">
                                      <label>S1:</label>
                                      <input
                                        type="number"
                                        value={skill?.s1 ?? ""}
                                        onChange={(e) =>
                                          updateSkill(
                                            teamIndex,
                                            heroIndex,
                                            "s1",
                                            e.target.value ? parseInt(e.target.value) : null
                                          )
                                        }
                                        className="admin-input-sm"
                                        placeholder="-"
                                        min={1}
                                        max={10}
                                      />
                                    </div>
                                    <div className="admin-skill-input">
                                      <label>S2:</label>
                                      <input
                                        type="number"
                                        value={skill?.s2 ?? ""}
                                        onChange={(e) =>
                                          updateSkill(
                                            teamIndex,
                                            heroIndex,
                                            "s2",
                                            e.target.value ? parseInt(e.target.value) : null
                                          )
                                        }
                                        className="admin-input-sm"
                                        placeholder="-"
                                        min={1}
                                        max={10}
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="admin-slot-remove-btn"
                                    onClick={() => removeHero(teamIndex, heroIndex)}
                                  >
                                    × Remove
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pet and Notes */}
                    <div className="admin-team-footer">
                      <div className="admin-form-group">
                        <label>Pet:</label>
                        <select
                          value={team.pet}
                          onChange={(e) =>
                            updateTeam(teamIndex, "pet", e.target.value)
                          }
                          className="admin-select-compact"
                        >
                          <option value="">-- Select Pet --</option>
                          {PETS.map((pet) => (
                            <option key={pet} value={pet}>
                              {pet}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label>Notes:</label>
                        <textarea
                          value={team.notes}
                          onChange={(e) =>
                            updateTeam(teamIndex, "notes", e.target.value)
                          }
                          className="admin-textarea-compact"
                          rows={2}
                          placeholder="Team notes..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Guild War Teams Editor Component
interface GuildWarDataEditorProps {
  guildWarData: GuildWarTeamsData;
  setGuildWarData: React.Dispatch<React.SetStateAction<GuildWarTeamsData>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  onSave: () => void;
  isSaving: boolean;
  saveStatus: "idle" | "success" | "error";
}

const GuildWarDataEditor: React.FC<GuildWarDataEditorProps> = ({
  guildWarData,
  setGuildWarData,
  selectedCategory,
  setSelectedCategory,
  onSave,
  isSaving,
  saveStatus,
}) => {
  const categories = Object.keys(guildWarData).sort();
  const currentCategory = selectedCategory
    ? guildWarData[selectedCategory]
    : null;
  const [selectedTeamIndex, setSelectedTeamIndex] = useState<number>(-1);

  const addCategory = () => {
    const newCategoryName = prompt("Enter category name:");
    if (newCategoryName && !guildWarData[newCategoryName]) {
      setGuildWarData((prev) => ({
        ...prev,
        [newCategoryName]: { teams: [] },
      }));
      setSelectedCategory(newCategoryName);
    }
  };

  const addTeam = () => {
    if (!selectedCategory) return;
    const newTeam: GuildWarTeam = {
      name: `Team ${(currentCategory?.teams.length || 0) + 1}`,
      formationType: "basic",
      pet: "",
      notes: "",
      heroes: [],
      skills: [],
    };
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: {
        teams: [...(prev[selectedCategory]?.teams || []), newTeam],
      },
    }));
    setSelectedTeamIndex(currentCategory?.teams.length || 0);
  };

  const removeTeam = (index: number) => {
    if (!selectedCategory || !currentCategory) return;
    const teams = [...currentCategory.teams];
    teams.splice(index, 1);
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: { teams },
    }));
    if (selectedTeamIndex === index) {
      setSelectedTeamIndex(-1);
    }
  };

  const updateTeam = (
    index: number,
    field: keyof GuildWarTeam,
    value: unknown
  ) => {
    if (!selectedCategory || !currentCategory) return;
    const teams = [...currentCategory.teams];
    teams[index] = { ...teams[index], [field]: value };
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: { teams },
    }));
  };

  const updateHero = (
    teamIndex: number,
    heroIndex: number,
    field: keyof GuildWarTeam["heroes"][0],
    value: string | number
  ) => {
    if (!selectedCategory || !currentCategory) return;
    const teams = [...currentCategory.teams];
    const heroes = [...teams[teamIndex].heroes];
    heroes[heroIndex] = { ...heroes[heroIndex], [field]: value };
    teams[teamIndex] = { ...teams[teamIndex], heroes };
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: { teams },
    }));
  };

  const removeHero = (teamIndex: number, heroIndex: number) => {
    if (!selectedCategory || !currentCategory) return;
    const teams = [...currentCategory.teams];
    const heroes = [...teams[teamIndex].heroes];
    heroes.splice(heroIndex, 1);
    heroes.forEach((hero, idx) => {
      hero.position = idx + 1;
    });
    teams[teamIndex] = { ...teams[teamIndex], heroes };
    const skills = [...teams[teamIndex].skills];
    skills.splice(heroIndex, 1);
    teams[teamIndex] = { ...teams[teamIndex], skills };
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: { teams },
    }));
  };

  const updateSkill = (
    teamIndex: number,
    skillIndex: number,
    field: "hero" | "s1" | "s2",
    value: string | number | null
  ) => {
    if (!selectedCategory || !currentCategory) return;
    const teams = [...currentCategory.teams];
    const skills = [...teams[teamIndex].skills];
    skills[skillIndex] = { ...skills[skillIndex], [field]: value };
    teams[teamIndex] = { ...teams[teamIndex], skills };
    setGuildWarData((prev) => ({
      ...prev,
      [selectedCategory]: { teams },
    }));
  };

  return (
    <div className="admin-editor-panel">
      <div className="admin-editor-header">
        <h2>Guild War Teams Editor</h2>
        <button
          className={`admin-save-btn ${
            saveStatus === "success"
              ? "success"
              : saveStatus === "error"
              ? "error"
              : ""
          }`}
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving
            ? "Saving..."
            : saveStatus === "success"
            ? "✓ Saved!"
            : saveStatus === "error"
            ? "✗ Error"
            : "Save Guild War Teams"}
        </button>
      </div>

      <div className="admin-editor-content">
        <div className="admin-selector-section">
          <label htmlFor="category-select">Select Category:</label>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <select
              id="category-select"
              className="admin-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedTeamIndex(-1);
              }}
            >
              <option value="">-- Select a Category --</option>
              {categories.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="admin-add-btn"
              onClick={addCategory}
            >
              + Add Category
            </button>
          </div>
        </div>

        {currentCategory && (
          <div className="admin-teams-section">
            <div className="admin-teams-header">
              <h3>Teams</h3>
              <button type="button" className="admin-add-btn" onClick={addTeam}>
                + Add Team
              </button>
            </div>

            {currentCategory.teams.map((team, teamIndex) => (
              <div key={teamIndex} className="admin-team-card-new">
                <div className="admin-team-card-header">
                  <div className="admin-team-header-left">
                    <input
                      type="text"
                      value={team.name}
                      onChange={(e) =>
                        updateTeam(teamIndex, "name", e.target.value)
                      }
                      className="admin-team-name-input"
                      placeholder={`Team ${teamIndex + 1}`}
                    />
                    <select
                      value={team.formationType}
                      onChange={(e) =>
                        updateTeam(
                          teamIndex,
                          "formationType",
                          e.target.value as GuildWarTeam["formationType"]
                        )
                      }
                      className="admin-formation-select"
                    >
                      <option value="basic">Basic (2F, 3B)</option>
                      <option value="balanced">Balanced (3F, 2B)</option>
                      <option value="attack">Attack (1F, 4B)</option>
                      <option value="protective">Protective (4F, 1B)</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="admin-remove-btn"
                    onClick={() => removeTeam(teamIndex)}
                  >
                    × Remove
                  </button>
                </div>

                {true && (
                  <div className="admin-team-form">
                    {/* 5 Hero Slots Grid */}
                    <div className="admin-hero-slots-grid">
                      {[0, 1, 2, 3, 4].map((slotIndex) => {
                        const hero = team.heroes.find((h) => h.position === slotIndex + 1);
                        const heroIndex = hero ? team.heroes.indexOf(hero) : -1;
                        const skill = team.skills[heroIndex];

                        return (
                          <div key={slotIndex} className="admin-hero-slot">
                            <div className="admin-slot-header">Slot {slotIndex + 1}</div>
                            <div className="admin-slot-body">
                              <SearchableHeroSelect
                                heroes={[...heroes]}
                                selectedHero={hero?.name || ""}
                                onSelect={(name) => {
                                  if (!hero) {
                                    // Add new hero for Guild War - update both heroes and skills atomically
                                    if (!selectedCategory || !currentCategory) return;
                                    const teams = [...currentCategory.teams];
                                    const newHeroes = [...teams[teamIndex].heroes];
                                    const row = slotIndex === 1 || slotIndex === 3 ? "front" : "back";
                                    newHeroes.push({ name, position: slotIndex + 1, row });
                                    // Add matching skill entry
                                    const newSkills = [...teams[teamIndex].skills];
                                    newSkills.push({ hero: name, s1: null, s2: null });
                                    teams[teamIndex] = { ...teams[teamIndex], heroes: newHeroes, skills: newSkills };
                                    setGuildWarData((prev) => ({
                                      ...prev,
                                      [selectedCategory]: { teams },
                                    }));
                                  } else if (heroIndex >= 0) {
                                    // Update existing hero
                                    updateHero(teamIndex, heroIndex, "name", name);
                                    // Update skill hero name
                                    if (skill) {
                                      updateSkill(teamIndex, heroIndex, "hero", name);
                                    }
                                  }
                                }}
                                placeholder="Select hero..."
                              />

                              {hero && (
                                <>
                                  <div className="admin-slot-row-selector">
                                    <label>
                                      <input
                                        type="radio"
                                        checked={hero.row === "front"}
                                        onChange={() => updateHero(teamIndex, heroIndex, "row", "front")}
                                      />
                                      Front
                                    </label>
                                    <label>
                                      <input
                                        type="radio"
                                        checked={hero.row === "back"}
                                        onChange={() => updateHero(teamIndex, heroIndex, "row", "back")}
                                      />
                                      Back
                                    </label>
                                  </div>

                                  <div className="admin-slot-skills">
                                    <div className="admin-skill-input">
                                      <label>S1:</label>
                                      <input
                                        type="number"
                                        value={skill?.s1 ?? ""}
                                        onChange={(e) =>
                                          updateSkill(
                                            teamIndex,
                                            heroIndex,
                                            "s1",
                                            e.target.value ? parseInt(e.target.value) : null
                                          )
                                        }
                                        className="admin-input-sm"
                                        placeholder="-"
                                        min={1}
                                        max={10}
                                      />
                                    </div>
                                    <div className="admin-skill-input">
                                      <label>S2:</label>
                                      <input
                                        type="number"
                                        value={skill?.s2 ?? ""}
                                        onChange={(e) =>
                                          updateSkill(
                                            teamIndex,
                                            heroIndex,
                                            "s2",
                                            e.target.value ? parseInt(e.target.value) : null
                                          )
                                        }
                                        className="admin-input-sm"
                                        placeholder="-"
                                        min={1}
                                        max={10}
                                      />
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="admin-slot-remove-btn"
                                    onClick={() => removeHero(teamIndex, heroIndex)}
                                  >
                                    × Remove
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pet and Notes */}
                    <div className="admin-team-footer">
                      <div className="admin-form-group">
                        <label>Pet:</label>
                        <select
                          value={team.pet}
                          onChange={(e) =>
                            updateTeam(teamIndex, "pet", e.target.value)
                          }
                          className="admin-select-compact"
                        >
                          <option value="">-- Select Pet --</option>
                          {PETS.map((pet) => (
                            <option key={pet} value={pet}>
                              {pet}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="admin-form-group">
                        <label>Notes:</label>
                        <textarea
                          value={team.notes}
                          onChange={(e) =>
                            updateTeam(teamIndex, "notes", e.target.value)
                          }
                          className="admin-textarea-compact"
                          rows={2}
                          placeholder="Team notes..."
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEditor;
