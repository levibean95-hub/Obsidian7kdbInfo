import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { useHeroData } from '../hooks/useHeroData';
import { HEROES } from '../constants';
import { getHeroImagePath, getTypeIconPath } from '../utils';
import { HeroCard } from './HeroCard';
import { Filters } from './Filters';
import { Header } from './Header';

export function HeroGrid() {
  const { heroData, allEffects, allTargets, loading } = useHeroData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEffect, setSelectedEffect] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('');

  const filteredHeroes = useMemo(() => {
    return HEROES.filter((hero) => {
      const matchesSearch = hero.toLowerCase().includes(searchQuery.toLowerCase());
      const heroInfo = heroData[hero];
      
      const matchesEffect = !selectedEffect || 
        (heroInfo?.effects && heroInfo.effects.includes(selectedEffect));
      
      const matchesType = !selectedType || heroInfo?.type === selectedType;
      
      const matchesTarget = !selectedTarget || heroInfo?.target_number === selectedTarget;

      return matchesSearch && matchesEffect && matchesType && matchesTarget;
    });
  }, [heroData, searchQuery, selectedEffect, selectedType, selectedTarget]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>Loading heroes...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedEffect={selectedEffect}
          setSelectedEffect={setSelectedEffect}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedTarget={selectedTarget}
          setSelectedTarget={setSelectedTarget}
          allEffects={allEffects}
          allTargets={allTargets}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8">
          {filteredHeroes.map((hero) => (
            <Link
              key={hero}
              to="/hero/$heroName"
              params={{ heroName: hero }}
              className="block"
            >
              <HeroCard hero={hero} heroData={heroData[hero]} />
            </Link>
          ))}
        </div>

        {filteredHeroes.length === 0 && (
          <div className="text-center py-16" style={{ color: 'var(--color-text-tertiary)' }}>
            No heroes found matching your filters
          </div>
        )}
      </div>
    </div>
  );
}

