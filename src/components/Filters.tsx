import { useState, useRef, useEffect } from 'react';
import { SearchableDropdown } from './SearchableDropdown';

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedEffect: string;
  setSelectedEffect: (effect: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  selectedTarget: string;
  setSelectedTarget: (target: string) => void;
  allEffects: Set<string>;
  allTargets: Set<string>;
}

const TYPE_ICONS = {
  Attack: 'Type Icons/type_1_attack.png',
  Magic: 'Type Icons/type_2_magic.png',
  Defense: 'Type Icons/type_3_defense.png',
  Support: 'Type Icons/type_4_support.png',
  Universal: 'Type Icons/type_5_universal.png',
};

export function Filters({
  searchQuery,
  setSearchQuery,
  selectedEffect,
  setSelectedEffect,
  selectedType,
  setSelectedType,
  selectedTarget,
  setSelectedTarget,
  allEffects,
  allTargets,
}: FiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search heroes..."
          className="w-full px-4 py-2 rounded-lg focus:outline-none transition-colors"
          style={{
            backgroundColor: 'var(--color-bg-card)',
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
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedType('')}
            className={`px-3 py-2 rounded-lg border transition-colors ${
              selectedType === '' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
            }`}
            style={{
              backgroundColor: selectedType === '' ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-card)',
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
              className={`px-3 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
                selectedType === type ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: selectedType === type ? 'rgba(147, 112, 219, 0.2)' : 'var(--color-bg-card)',
                borderColor: selectedType === type ? 'var(--color-accent-primary)' : 'rgba(147, 112, 219, 0.4)',
                color: 'var(--color-text-primary)',
              }}
            >
              <img src={icon} alt={type} className="w-5 h-5" />
              <span className="hidden sm:inline">{type}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-1 min-w-[200px]">
          <SearchableDropdown
            placeholder="Filter by Effect..."
            options={Array.from(allEffects).sort()}
            selectedValue={selectedEffect}
            onSelect={setSelectedEffect}
            className="flex-1"
          />
          <SearchableDropdown
            placeholder="Filter by Target..."
            options={Array.from(allTargets).sort((a, b) => {
              const order = ['Single Enemy', '3 Enemies', '4 Enemies', 'All Enemies'];
              const indexA = order.indexOf(a);
              const indexB = order.indexOf(b);
              if (indexA !== -1 && indexB !== -1) return indexA - indexB;
              if (indexA !== -1) return -1;
              if (indexB !== -1) return 1;
              return a.localeCompare(b);
            })}
            selectedValue={selectedTarget}
            onSelect={setSelectedTarget}
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
}

