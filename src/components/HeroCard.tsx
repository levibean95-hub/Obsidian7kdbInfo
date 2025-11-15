import { getHeroImagePath, getTypeIconPath } from '../utils';
import type { Hero } from '../types';

interface HeroCardProps {
  hero: string;
  heroData?: Hero;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, heroName: string) => void;
  onDragEnd?: () => void;
}

const TYPE_COLORS: Record<string, string> = {
  Attack: '#c93939',
  Magic: '#3b82f6',
  Defense: '#a67c52',
  Support: '#eab308',
  Universal: '#9333ea',
};

export function HeroCard({ hero, heroData, draggable = false, onDragStart, onDragEnd }: HeroCardProps) {
  const rarityClass = heroData?.rarity
    ? `rarity-${heroData.rarity.toLowerCase().replace(/\+/g, 'plus')}`
    : '';

  const typeColor = heroData?.type ? TYPE_COLORS[heroData.type] : undefined;
  const borderColor = typeColor || 'rgba(147, 112, 219, 0.4)';
  const borderWidth = typeColor ? '3px' : '1px';

  return (
    <div 
      className={`transition-all duration-300 hover:scale-105 rounded-lg overflow-hidden cursor-pointer border ${
        draggable ? 'cursor-move' : ''
      }`}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        boxShadow: 'var(--shadow-card)',
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}
      draggable={draggable}
      onDragStart={draggable && onDragStart ? (e) => onDragStart(e, hero) : undefined}
      onDragEnd={draggable && onDragEnd ? onDragEnd : undefined}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = typeColor
          ? `0 8px 32px rgba(0, 0, 0, 0.95), 0 0 40px ${typeColor}80, inset 0 1px 0 ${typeColor}40`
          : 'var(--shadow-secondary)';
        if (typeColor) {
          e.currentTarget.style.borderColor = typeColor;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        e.currentTarget.style.borderColor = borderColor;
      }}
    >
      <div className="relative">
        <img
          src={getHeroImagePath(hero)}
          alt={hero}
          className="w-full aspect-square object-cover"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='24' fill='%230c0812'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%235a4a78' font-size='18'>No Portrait</text></svg>";
          }}
        />
        
        {heroData?.type && (
          <div 
            className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <img
              src={getTypeIconPath(heroData.type)}
              alt={heroData.type}
              className="w-6 h-6"
            />
          </div>
        )}
        
        {heroData?.rarity && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-bold ${rarityClass}`}>
            {heroData.rarity}
          </div>
        )}
      </div>
      
      <div className="p-3 text-center relative">
        {heroData?.type && (
          <div 
            className="absolute bottom-2 left-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: 'var(--color-bg-card)',
            }}
          >
            <img
              src={getTypeIconPath(heroData.type)}
              alt={heroData.type}
              className="w-5 h-5"
            />
          </div>
        )}
        <div className="font-medium" style={{ color: 'var(--color-text-primary)' }}>{hero}</div>
      </div>
    </div>
  );
}

