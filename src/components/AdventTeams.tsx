import { useState, useMemo } from 'react';
import { Link } from '@tanstack/react-router';
import { useHeroData } from '../hooks/useHeroData';
import { Header } from './Header';
import { AdventTeamCard } from './AdventTeamCard';
import type { AdventBoss } from '../types';

export function AdventTeams() {
  const { adventData, heroData, loading } = useHeroData();
  const [selectedBoss, setSelectedBoss] = useState('all');

  const bosses = useMemo(() => Object.keys(adventData), [adventData]);

  const filteredBosses = useMemo(() => {
    if (selectedBoss === 'all') return bosses;
    return bosses.filter((boss) => boss.toLowerCase() === selectedBoss.toLowerCase());
  }, [bosses, selectedBoss]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>Loading advent teams...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Heroes
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
            Advent Teams
          </h1>
          
          <select
            value={selectedBoss}
            onChange={(e) => setSelectedBoss(e.target.value)}
            className="px-4 py-2 rounded-lg focus:outline-none transition-colors"
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
          >
            <option value="all">All Bosses</option>
            {bosses.map((boss) => (
              <option key={boss} value={boss.toLowerCase()}>
                {boss}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {filteredBosses.map((bossName) => (
            <div key={bossName}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--color-accent-primary)' }}>
                {bossName}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {adventData[bossName]?.teams?.map((team, idx) => (
                  <AdventTeamCard
                    key={`${bossName}-team-${idx}`}
                    team={team}
                    heroData={heroData}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

