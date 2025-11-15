import { useState, useEffect } from 'react';
import { loadAllData, getAllEffects, getAllTargets } from '../lib/data-loader';
import type { Hero, AdventBoss } from '../types';

export function useHeroData() {
  const [heroData, setHeroData] = useState<Record<string, Hero>>({});
  const [adventData, setAdventData] = useState<AdventBoss>({});
  const [allEffects, setAllEffects] = useState<Set<string>>(new Set());
  const [allTargets, setAllTargets] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { heroData: heroes, adventData: advent } = await loadAllData();
        setHeroData(heroes);
        setAdventData(advent);
        setAllEffects(getAllEffects(heroes));
        setAllTargets(getAllTargets(heroes));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { heroData, adventData, allEffects, allTargets, loading, error };
}

