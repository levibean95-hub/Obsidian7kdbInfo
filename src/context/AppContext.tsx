import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  AppState,
  HeroDataMap,
  AdventTeamsData,
  GuildWarTeamsData,
  ViewType,
} from "../lib/types";
import { loadAllData } from "../lib/data-loader";

interface AppContextType {
  state: AppState;
  setCurrentView: (view: ViewType) => void;
  setSelectedHero: (hero: string | null) => void;
  setPreviousView: (view: ViewType) => void;
  setReferrerPage: (page: string | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedEffect: (effect: string) => void;
  setSelectedType: (type: string) => void;
  setSelectedTarget: (target: string) => void;
  setSavedScrollPosition: (position: number) => void;
  setSavedAdventScrollPosition: (position: number) => void;
  setHeroData: (data: HeroDataMap) => void;
  setAllEffects: (effects: Set<string>) => void;
  setAllTargets: (targets: Set<string>) => void;
  setAdventTeamsData: (data: AdventTeamsData) => void;
  setGuildWarTeamsData: (data: GuildWarTeamsData) => void;
  isLoading: boolean;
  error: string | null;
}

const initialState: AppState = {
  currentView: "grid",
  selectedHero: null,
  previousView: "grid",
  referrerPage: null,
  searchQuery: "",
  selectedEffect: "",
  selectedType: "",
  selectedTarget: "",
  savedScrollPosition: 0,
  savedAdventScrollPosition: 0,
  heroData: {},
  allEffects: new Set(),
  allTargets: new Set(),
  adventTeamsData: {},
  guildWarTeamsData: {},
};

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prevent browser from restoring scroll position on refresh
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    // Always start at the top on page load/refresh
    window.scrollTo(0, 0);

    // Load all data
    loadAllData()
      .then(
        ({
          heroData,
          adventTeamsData,
          guildWarTeamsData,
          effects,
          targets,
        }) => {
          setState((prev) => ({
            ...prev,
            heroData,
            adventTeamsData,
            guildWarTeamsData,
            allEffects: effects,
            allTargets: targets,
          }));
          setIsLoading(false);
        }
      )
      .catch((err) => {
        console.error("Failed to load application data:", err);
        setError("Failed to load hero data. Please refresh the page.");
        setIsLoading(false);
      });
  }, []);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const contextValue: AppContextType = {
    state,
    setCurrentView: (view) => updateState({ currentView: view }),
    setSelectedHero: (hero) => updateState({ selectedHero: hero }),
    setPreviousView: (view) => updateState({ previousView: view }),
    setReferrerPage: (page) => updateState({ referrerPage: page }),
    setSearchQuery: (query) => updateState({ searchQuery: query }),
    setSelectedEffect: (effect) => updateState({ selectedEffect: effect }),
    setSelectedType: (type) => updateState({ selectedType: type }),
    setSelectedTarget: (target) => updateState({ selectedTarget: target }),
    setSavedScrollPosition: (position) =>
      updateState({ savedScrollPosition: position }),
    setSavedAdventScrollPosition: (position) =>
      updateState({ savedAdventScrollPosition: position }),
    setHeroData: (data) => updateState({ heroData: data }),
    setAllEffects: (effects) => updateState({ allEffects: effects }),
    setAllTargets: (targets) => updateState({ allTargets: targets }),
    setAdventTeamsData: (data) => updateState({ adventTeamsData: data }),
    setGuildWarTeamsData: (data) => updateState({ guildWarTeamsData: data }),
    isLoading,
    error,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
