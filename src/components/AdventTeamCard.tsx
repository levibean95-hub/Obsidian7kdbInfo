import { Link } from '@tanstack/react-router';
import { getHeroImagePath } from '../utils';
import type { AdventTeam, Hero } from '../types';

interface AdventTeamCardProps {
  team: AdventTeam;
  heroData: Record<string, Hero>;
}

const TYPE_COLORS: Record<string, string> = {
  Attack: '#c93939',
  Magic: '#3b82f6',
  Defense: '#a67c52',
  Support: '#eab308',
  Universal: '#9333ea',
};

export function AdventTeamCard({ team, heroData }: AdventTeamCardProps) {
  const sortedHeroes = [...team.heroes].sort((a, b) => a.position - b.position);

  return (
    <div
      className="rounded-lg p-6 border"
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderColor: 'rgba(147, 112, 219, 0.4)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
        {team.name}
      </h3>
      
      {team.notes && (
        <div
          className="mb-4 p-3 rounded text-sm"
          style={{
            backgroundColor: 'var(--color-bg-tertiary)',
            color: 'var(--color-text-secondary)',
          }}
        >
          {team.notes}
        </div>
      )}

      <div className="flex gap-4 justify-center items-center mb-4 relative" style={{ minHeight: '200px', paddingTop: '50px', paddingBottom: '50px' }}>
        {sortedHeroes.map((hero) => {
          const heroInfo = heroData[hero.name];
          const skillData = team.skills.find((s) => s.hero === hero.name);
          const borderColor = heroInfo?.type ? TYPE_COLORS[heroInfo.type] : undefined;
          
          return (
            <Link
              key={hero.position}
              to="/hero/$heroName"
              params={{ heroName: hero.name }}
              className="flex flex-col items-center gap-2 p-2 rounded-lg transition-transform hover:scale-105 relative"
              style={{
                border: borderColor ? `3px solid ${borderColor}` : '1px solid rgba(147, 112, 219, 0.4)',
                backgroundColor: 'var(--color-bg-card)',
                transform: hero.row === 'back' ? 'translateY(-50px)' : 'translateY(50px)',
                zIndex: hero.row === 'back' ? 1 : 2,
                boxShadow: 'var(--shadow-card)',
                minWidth: '80px',
              }}
            >
              <img
                src={getHeroImagePath(hero.name)}
                alt={hero.name}
                className="w-16 h-16 object-cover rounded"
                style={{ flexShrink: 0 }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><rect width='100' height='100' fill='%23333'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%23666' font-size='12'>No Image</text></svg>";
                }}
              />
              <div className="text-xs text-center" style={{ color: 'var(--color-text-secondary)' }}>
                {hero.name}
              </div>
              <div className="flex gap-1">
                <div
                  className="text-xs px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: skillData?.s1
                      ? 'rgba(147, 112, 219, 0.2)'
                      : 'var(--color-bg-tertiary)',
                    color: skillData?.s1
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-tertiary)',
                  }}
                >
                  S1: {skillData?.s1 || 'N/A'}
                </div>
                <div
                  className="text-xs px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: skillData?.s2
                      ? 'rgba(147, 112, 219, 0.2)'
                      : 'var(--color-bg-tertiary)',
                    color: skillData?.s2
                      ? 'var(--color-text-primary)'
                      : 'var(--color-text-tertiary)',
                  }}
                >
                  S2: {skillData?.s2 || 'N/A'}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {team.pet && (
        <div className="text-sm text-center" style={{ color: 'var(--color-text-tertiary)' }}>
          Pet: {team.pet}
        </div>
      )}
    </div>
  );
}

