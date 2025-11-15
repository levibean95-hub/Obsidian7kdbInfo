import { useState } from 'react';
import { HEROES } from '../constants';
import { useHeroData } from '../hooks/useHeroData';
import { DraggableHeroPool } from './DraggableHeroPool';

interface TeamBuilderHeroPoolProps {
  draggedHero: string | null;
  setDraggedHero: (hero: string | null) => void;
}

export function TeamBuilderHeroPool({ draggedHero, setDraggedHero }: TeamBuilderHeroPoolProps) {
  const { heroData } = useHeroData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showPets, setShowPets] = useState(false);

  const filteredHeroes = HEROES.filter((hero) => {
    const matchesSearch = hero.toLowerCase().includes(searchQuery.toLowerCase());
    const heroInfo = heroData[hero];
    const matchesType = !selectedType || heroInfo?.type === selectedType;
    return matchesSearch && matchesType;
  });

  const TYPE_ICONS = {
    Attack: 'Type Icons/type_1_attack.png',
    Magic: 'Type Icons/type_2_magic.png',
    Defense: 'Type Icons/type_3_defense.png',
    Support: 'Type Icons/type_4_support.png',
    Universal: 'Type Icons/type_5_universal.png',
  };

  return (
    <div
      className="rounded-lg p-4 border"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'rgba(147, 112, 219, 0.4)',
      }}
    >
      <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        Hero Pool
      </h2>
      
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search heroes..."
        className="w-full px-4 py-2 rounded-lg focus:outline-none transition-colors mb-4"
        style={{
          backgroundColor: 'var(--color-bg-tertiary)',
          border: '1px solid rgba(147, 112, 219, 0.4)',
          color: 'var(--color-text-primary)',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.6)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.4)';
        }}
      />

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => setSelectedType('')}
          className={`px-3 py-2 rounded-lg border transition-colors text-sm ${
            selectedType === '' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: selectedType === '' ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-tertiary)',
            borderColor: selectedType === '' ? 'var(--color-accent-primary)' : 'rgba(147, 112, 219, 0.4)',
            color: 'var(--color-text-primary)',
          }}
        >
          All
        </button>
        {Object.entries(TYPE_ICONS).map(([type, icon]) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-1 text-sm ${
              selectedType === type ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: selectedType === type ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-tertiary)',
              borderColor: selectedType === type ? 'var(--color-accent-primary)' : 'rgba(147, 112, 219, 0.4)',
              color: 'var(--color-text-primary)',
            }}
          >
            <img src={icon} alt={type} className="w-4 h-4" />
            <span className="hidden sm:inline">{type}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowPets(false)}
          className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
            !showPets ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: !showPets ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-tertiary)',
            borderColor: !showPets ? 'var(--color-accent-primary)' : 'rgba(147, 112, 219, 0.4)',
            color: 'var(--color-text-primary)',
          }}
        >
          Heroes
        </button>
        <button
          onClick={() => setShowPets(true)}
          className={`flex-1 px-4 py-2 rounded-lg border transition-colors ${
            showPets ? 'opacity-100' : 'opacity-70 hover:opacity-100'
          }`}
          style={{
            backgroundColor: showPets ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-tertiary)',
            borderColor: showPets ? 'var(--color-accent-primary)' : 'rgba(147, 112, 219, 0.4)',
            color: 'var(--color-text-primary)',
          }}
        >
          Pets
        </button>
      </div>

      {!showPets && (
        <DraggableHeroPool
          heroes={filteredHeroes}
          heroData={heroData}
          draggedHero={draggedHero}
          setDraggedHero={setDraggedHero}
        />
      )}

      {showPets && (
        <div className="text-center py-8" style={{ color: 'var(--color-text-tertiary)' }}>
          Pet selection coming soon
        </div>
      )}
    </div>
  );
}

