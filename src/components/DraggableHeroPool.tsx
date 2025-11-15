import { HeroCard } from './HeroCard';
import type { Hero } from '../types';

interface DraggableHeroPoolProps {
  heroes: string[];
  heroData: Record<string, Hero>;
  draggedHero: string | null;
  setDraggedHero: (hero: string | null) => void;
}

export function DraggableHeroPool({ heroes, heroData, draggedHero, setDraggedHero }: DraggableHeroPoolProps) {
  const handleDragStart = (e: React.DragEvent, heroName: string) => {
    setDraggedHero(heroName);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', heroName);
  };

  const handleDragEnd = () => {
    setDraggedHero(null);
  };

  return (
    <div className="grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto">
      {heroes.map((hero) => (
        <HeroCard
          key={hero}
          hero={hero}
          heroData={heroData[hero]}
          draggable={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}

