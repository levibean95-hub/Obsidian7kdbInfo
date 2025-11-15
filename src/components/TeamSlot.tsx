import { useState } from 'react';
import { getHeroImagePath, getTypeIconPath } from '../utils';
import { useHeroData } from '../hooks/useHeroData';
import { GEAR_SETS } from '../constants';
import type { SkillOrder } from '../types';

function getSkillOrderColor(order: number): string {
  // Order 1 = green (120deg), Order 10 = red (0deg)
  const hue = 120 - ((order - 1) * (120 / 9));
  return `hsl(${hue}, 70%, 50%)`;
}

const TYPE_COLORS: Record<string, string> = {
  Attack: '#c93939',
  Magic: '#3b82f6',
  Defense: '#a67c52',
  Support: '#eab308',
  Universal: '#9333ea',
};

interface TeamSlotProps {
  teamIndex: number;
  slotIndex: number;
  hero: string | null;
  tier: number;
  gearSet: string | null;
  skillOrders: SkillOrder[];
  row: 'front' | 'back';
  formationType: string;
  onUpdate: (updates: {
    hero?: string | null;
    tier?: number;
    gearSet?: string | null;
    skillOrders?: SkillOrder[];
  }) => void;
  draggedHero: string | null;
  setDraggedHero: (hero: string | null) => void;
}

export function TeamSlot({
  hero,
  tier,
  gearSet,
  skillOrders,
  row,
  onUpdate,
  draggedHero,
  setDraggedHero,
}: TeamSlotProps) {
  const { heroData } = useHeroData();
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragStart = (e: React.DragEvent, heroName: string) => {
    setDraggedHero(heroName);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', heroName);
  };

  const handleDragEnd = () => {
    setDraggedHero(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // Check if we have text/plain data type (can't read data during dragOver)
    const hasTextData = e.dataTransfer.types.includes('text/plain');
    if ((hasTextData || draggedHero) && (!draggedHero || !draggedHero.startsWith('pet:'))) {
      setIsDraggingOver(true);
      e.dataTransfer.dropEffect = 'move';
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Only set dragging over to false if we're leaving the slot itself
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (!e.currentTarget.contains(relatedTarget)) {
      setIsDraggingOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    
    // Read from dataTransfer first (standard way), fallback to prop
    const heroName = e.dataTransfer.getData('text/plain') || draggedHero;
    
    if (heroName && !heroName.startsWith('pet:')) {
      onUpdate({ hero: heroName });
      setDraggedHero(null);
    }
  };

  const rarityClass = hero && heroData[hero]?.rarity
    ? `rarity-${heroData[hero].rarity.toLowerCase().replace(/\+/g, 'plus')}`
    : '';

  const typeColor = hero && heroData[hero]?.type ? TYPE_COLORS[heroData[hero].type] : undefined;
  const borderColor = isDraggingOver
    ? 'rgba(147, 112, 219, 0.8)'
    : typeColor || (hero ? 'rgba(147, 112, 219, 0.4)' : 'rgba(147, 112, 219, 0.2)');
  const borderWidth = typeColor ? '3px' : (isDraggingOver ? '2px' : '1px');

  return (
    <div
      className="relative rounded-lg border transition-all"
      style={{
        width: '100px',
        minHeight: '140px',
        backgroundColor: hero ? 'var(--color-bg-card)' : 'var(--color-bg-tertiary)',
        borderColor: borderColor,
        borderWidth: borderWidth,
        boxShadow: isDraggingOver ? '0 0 20px rgba(147, 112, 219, 0.6)' : 'var(--shadow-card)',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {hero ? (
        <>
          <div className="relative">
            <img
              src={getHeroImagePath(hero)}
              alt={hero}
              className="w-full aspect-square object-cover rounded-t-lg"
              draggable
              onDragStart={(e) => handleDragStart(e, hero)}
              onDragEnd={handleDragEnd}
            />
            {heroData[hero]?.type && (
              <div
                className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center border"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                }}
              >
                <img
                  src={getTypeIconPath(heroData[hero].type)}
                  alt={heroData[hero].type}
                  className="w-4 h-4"
                />
              </div>
            )}
            {heroData[hero]?.rarity && (
              <div className={`absolute top-1 right-1 px-1 py-0.5 rounded text-xs font-bold ${rarityClass}`}>
                {heroData[hero].rarity}
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdate({ hero: null });
              }}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold opacity-0 hover:opacity-100 transition-opacity z-10"
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.9)',
                color: 'var(--color-text-primary)',
              }}
            >
              ×
            </button>
          </div>
          <div className="p-2 text-center space-y-1">
            <div className="text-xs font-medium truncate" style={{ color: 'var(--color-text-primary)' }}>
              {hero}
            </div>
            <select
              value={tier}
              onChange={(e) => onUpdate({ tier: parseInt(e.target.value) })}
              className="w-full text-xs px-1 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'rgba(147, 112, 219, 0.4)',
                color: 'var(--color-text-primary)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {[0, 1, 2, 3, 4, 5, 6].map((t) => (
                <option key={t} value={t}>
                  T{t}
                </option>
              ))}
            </select>
            <select
              value={gearSet || ''}
              onChange={(e) => onUpdate({ gearSet: e.target.value || null })}
              className="w-full text-xs px-1 py-0.5 rounded border"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'rgba(147, 112, 219, 0.4)',
                color: 'var(--color-text-primary)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <option value="">No Gear</option>
              {GEAR_SETS.filter((g) => g !== 'None').map((gear) => (
                <option key={gear} value={gear}>
                  {gear}
                </option>
              ))}
            </select>
            <div className="space-y-1 mt-1">
              <div className="flex gap-1 text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const s1Order = skillOrders.find((s) => s.skill === 's1')?.order;
                    const newOrders = [...skillOrders];
                    if (s1Order === undefined) {
                      newOrders.push({ skill: 's1', order: 0 });
                    } else {
                      const index = newOrders.findIndex((s) => s.skill === 's1');
                      newOrders.splice(index, 1);
                    }
                    onUpdate({ skillOrders: newOrders });
                  }}
                  className="flex-1 px-1 py-0.5 rounded text-center transition-colors"
                  style={{
                    backgroundColor: skillOrders.some((s) => s.skill === 's1')
                      ? getSkillOrderColor(skillOrders.find((s) => s.skill === 's1')!.order)
                      : 'var(--color-bg-tertiary)',
                    color: skillOrders.some((s) => s.skill === 's1') ? '#fff' : 'var(--color-text-primary)',
                    border: '1px solid rgba(147, 112, 219, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    if (!skillOrders.some((s) => s.skill === 's1')) {
                      e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!skillOrders.some((s) => s.skill === 's1')) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                    }
                  }}
                >
                  S1: {skillOrders.find((s) => s.skill === 's1')?.order || '-'}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const s2Order = skillOrders.find((s) => s.skill === 's2')?.order;
                    const newOrders = [...skillOrders];
                    if (s2Order === undefined) {
                      newOrders.push({ skill: 's2', order: 0 });
                    } else {
                      const index = newOrders.findIndex((s) => s.skill === 's2');
                      newOrders.splice(index, 1);
                    }
                    onUpdate({ skillOrders: newOrders });
                  }}
                  className="flex-1 px-1 py-0.5 rounded text-center transition-colors"
                  style={{
                    backgroundColor: skillOrders.some((s) => s.skill === 's2')
                      ? getSkillOrderColor(skillOrders.find((s) => s.skill === 's2')!.order)
                      : 'var(--color-bg-tertiary)',
                    color: skillOrders.some((s) => s.skill === 's2') ? '#fff' : 'var(--color-text-primary)',
                    border: '1px solid rgba(147, 112, 219, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    if (!skillOrders.some((s) => s.skill === 's2')) {
                      e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!skillOrders.some((s) => s.skill === 's2')) {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                    }
                  }}
                >
                  S2: {skillOrders.find((s) => s.skill === 's2')?.order || '-'}
                </button>
              </div>
              {skillOrders.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdate({ skillOrders: [] });
                  }}
                  className="w-full text-xs px-1 py-0.5 rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    color: 'var(--color-text-tertiary)',
                    border: '1px solid rgba(147, 112, 219, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--color-text-tertiary)';
                  }}
                >
                  Clear Skills
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="h-full flex flex-col items-center justify-center p-4 cursor-pointer"
          style={{ minHeight: '140px' }}
        >
          <div className="text-xs text-center mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            Drop Hero Here
          </div>
          <div className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)' }}>
            {row === 'front' ? 'Front Row' : 'Back Row'}
          </div>
        </div>
      )}
    </div>
  );
}
