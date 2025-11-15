import { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Header } from './Header';
import { TeamBuilderHeroPool } from './TeamBuilderHeroPool';
import { TeamBuilderTeams } from './TeamBuilderTeams';
import type { TeamBuilderTeam } from '../types';

export function TeamBuilder() {
  // Initialize state from URL if available, otherwise use defaults
  const getInitialState = (): { teams: TeamBuilderTeam[]; subject: string } => {
    const params = new URLSearchParams(window.location.search);
    const teamsParam = params.get('teams');
    const subjectParam = params.get('subject');
    
    const defaultTeams: TeamBuilderTeam[] = [
      {
        name: 'Team 1',
        slots: [null, null, null, null, null],
        tiers: [0, 0, 0, 0, 0],
        gearSets: [null, null, null, null, null],
        skillOrders: [[], [], [], [], []],
        pet: null,
        formationType: 'basic',
      },
    ];
    
    if (teamsParam) {
      try {
        const decoded = decodeURIComponent(teamsParam);
        const imported = JSON.parse(decoded);
        if (imported.teams && Array.isArray(imported.teams) && imported.teams.length > 0) {
          return {
            teams: imported.teams,
            subject: subjectParam ? decodeURIComponent(subjectParam) : '',
          };
        }
      } catch (e) {
        console.error('Failed to import teams from URL:', e);
      }
    }
    
    return {
      teams: defaultTeams,
      subject: subjectParam ? decodeURIComponent(subjectParam) : '',
    };
  };

  const initialState = getInitialState();
  const [teams, setTeams] = useState<TeamBuilderTeam[]>(initialState.teams);
  const [subject, setSubject] = useState(initialState.subject);
  const [draggedHero, setDraggedHero] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Update URL whenever teams or subject changes (but skip initial load)
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    const params = new URLSearchParams();
    if (teams.length > 0) {
      params.set('teams', encodeURIComponent(JSON.stringify({ teams })));
    }
    if (subject) {
      params.set('subject', encodeURIComponent(subject));
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    window.history.replaceState({}, '', newUrl);
  }, [teams, subject, isInitialLoad]);

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

        <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
          Team Builder
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <TeamBuilderHeroPool
              draggedHero={draggedHero}
              setDraggedHero={setDraggedHero}
            />
          </div>
          
          <div className="lg:col-span-2">
            <TeamBuilderTeams
              teams={teams}
              setTeams={setTeams}
              subject={subject}
              setSubject={setSubject}
              draggedHero={draggedHero}
              setDraggedHero={setDraggedHero}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

