import { useState } from 'react';
import type { TeamBuilderTeam, SkillOrder } from '../types';
import { TeamSlot } from './TeamSlot';
import { PETS } from '../constants';

interface TeamBuilderTeamsProps {
  teams: TeamBuilderTeam[];
  setTeams: (teams: TeamBuilderTeam[]) => void;
  subject: string;
  setSubject: (subject: string) => void;
  draggedHero: string | null;
  setDraggedHero: (hero: string | null) => void;
}

const FORMATION_TYPES = [
  { value: 'basic', label: 'Basic (2F, 3B)' },
  { value: 'balanced', label: 'Balanced (3F, 2B)' },
  { value: 'attack', label: 'Attack (1F, 4B)' },
  { value: 'protective', label: 'Protective (4F, 1B)' },
] as const;

function getRowForFormation(formationType: string, slotIndex: number): 'front' | 'back' {
  const formations: Record<string, ('front' | 'back')[]> = {
    basic: ['back', 'front', 'back', 'front', 'back'],
    balanced: ['front', 'back', 'front', 'back', 'front'],
    attack: ['back', 'back', 'front', 'back', 'back'],
    protective: ['front', 'front', 'back', 'front', 'front'],
  };
  return formations[formationType]?.[slotIndex] || 'back';
}

export function TeamBuilderTeams({
  teams,
  setTeams,
  subject,
  setSubject,
  draggedHero,
  setDraggedHero,
}: TeamBuilderTeamsProps) {

  const addTeam = () => {
    setTeams([
      ...teams,
      {
        name: `Team ${teams.length + 1}`,
        slots: [null, null, null, null, null],
        tiers: [0, 0, 0, 0, 0],
        gearSets: [null, null, null, null, null],
        skillOrders: [[], [], [], [], []],
        pet: null,
        formationType: 'basic',
      },
    ]);
  };

  const removeTeam = (teamIndex: number) => {
    if (teams.length > 1) {
      const newTeams = teams.filter((_, idx) => idx !== teamIndex);
      setTeams(newTeams);
    } else {
      alert('You must have at least one team.');
    }
  };

  const clearTeam = (teamIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex] = {
      ...newTeams[teamIndex],
      slots: [null, null, null, null, null],
      tiers: [0, 0, 0, 0, 0],
      gearSets: [null, null, null, null, null],
      skillOrders: [[], [], [], [], []],
      pet: null,
    };
    setTeams(newTeams);
  };

  const resetSkills = (teamIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex] = {
      ...newTeams[teamIndex],
      skillOrders: [[], [], [], [], []],
    };
    setTeams(newTeams);
  };

  const updateTeam = (teamIndex: number, updates: Partial<TeamBuilderTeam>) => {
    const newTeams = [...teams];
    newTeams[teamIndex] = { ...newTeams[teamIndex], ...updates };
    setTeams(newTeams);
  };

  const updateSlot = (
    teamIndex: number,
    slotIndex: number,
    updates: {
      hero?: string | null;
      tier?: number;
      gearSet?: string | null;
      skillOrders?: SkillOrder[];
    }
  ) => {
    const newTeams = [...teams];
    const team = { ...newTeams[teamIndex] };
    
    if (updates.hero !== undefined) {
      team.slots = [...team.slots];
      team.slots[slotIndex] = updates.hero;
    }
    if (updates.tier !== undefined) {
      team.tiers = [...team.tiers];
      team.tiers[slotIndex] = updates.tier;
    }
    if (updates.gearSet !== undefined) {
      team.gearSets = [...team.gearSets];
      team.gearSets[slotIndex] = updates.gearSet;
    }
    if (updates.skillOrders !== undefined) {
      team.skillOrders = [...team.skillOrders];
      const newSkillOrders = [...updates.skillOrders];
      
      // Calculate team-wide skill order
      const allTeamSkills: Array<{ skill: string; order: number; slotIndex: number }> = [];
      team.skillOrders.forEach((heroSkills, idx) => {
        if (idx === slotIndex) {
          newSkillOrders.forEach(skillEntry => {
            allTeamSkills.push({ ...skillEntry, slotIndex: idx });
          });
        } else {
          heroSkills.forEach(skillEntry => {
            allTeamSkills.push({ ...skillEntry, slotIndex: idx });
          });
        }
      });
      
      // Sort by current order
      allTeamSkills.sort((a, b) => a.order - b.order);
      
      // Find if we're adding or removing
      const wasS1 = team.skillOrders[slotIndex].some((s) => s.skill === 's1');
      const wasS2 = team.skillOrders[slotIndex].some((s) => s.skill === 's2');
      const isS1 = newSkillOrders.some((s) => s.skill === 's1');
      const isS2 = newSkillOrders.some((s) => s.skill === 's2');
      
      // If removing a skill, reorder all remaining skills
      if ((wasS1 && !isS1) || (wasS2 && !isS2)) {
        const removedOrder = wasS1 && !isS1 
          ? team.skillOrders[slotIndex].find((s) => s.skill === 's1')!.order
          : team.skillOrders[slotIndex].find((s) => s.skill === 's2')!.order;
        
        // Reorder all skills across all heroes
        newTeams.forEach((t, tIdx) => {
          t.skillOrders.forEach((heroSkills, hIdx) => {
            heroSkills.forEach((s) => {
              if (s.order > removedOrder) {
                s.order--;
              }
            });
          });
        });
      } else if ((!wasS1 && isS1) || (!wasS2 && isS2)) {
        // Adding a skill - assign next available order
        const maxOrder = Math.max(0, ...allTeamSkills.map((s) => s.order || 0));
        const nextOrder = maxOrder + 1;
        if (nextOrder <= 10) {
          if (!wasS1 && isS1) {
            const s1Index = newSkillOrders.findIndex((s) => s.skill === 's1');
            if (s1Index !== -1) {
              newSkillOrders[s1Index].order = nextOrder;
            }
          }
          if (!wasS2 && isS2) {
            const s2Index = newSkillOrders.findIndex((s) => s.skill === 's2');
            if (s2Index !== -1) {
              newSkillOrders[s2Index].order = nextOrder;
            }
          }
        }
      }
      
      team.skillOrders[slotIndex] = newSkillOrders;
    }
    
    newTeams[teamIndex] = team;
    setTeams(newTeams);
  };

  const shareUrl = () => {
    const params = new URLSearchParams();
    params.set('teams', encodeURIComponent(JSON.stringify({ teams })));
    if (subject) {
      params.set('subject', encodeURIComponent(subject));
    }
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  const clearAllTeams = () => {
    if (confirm('Are you sure you want to clear all teams?')) {
      setTeams([
        {
          name: 'Team 1',
          slots: [null, null, null, null, null],
          tiers: [0, 0, 0, 0, 0],
          gearSets: [null, null, null, null, null],
          skillOrders: [[], [], [], [], []],
          pet: null,
          formationType: 'basic',
        },
      ]);
    }
  };

  return (
    <div className="space-y-6">
      <div
        className="rounded-lg p-4 border"
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderColor: 'rgba(147, 112, 219, 0.4)',
        }}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              Subject/Description:
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., PvP Teams, Advent Boss Teams..."
              className="w-full px-4 py-2 rounded-lg focus:outline-none transition-colors"
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
          </div>

          <div className="flex gap-2">
            <button
              onClick={shareUrl}
              className="px-4 py-2 rounded-lg border transition-colors flex items-center gap-2"
              style={{
                backgroundColor: 'rgba(147, 112, 219, 0.2)',
                borderColor: 'rgba(147, 112, 219, 0.4)',
                color: 'var(--color-text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.2)';
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Share URL
            </button>
            <button
              onClick={clearAllTeams}
              className="px-4 py-2 rounded-lg border transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-tertiary)',
                borderColor: 'rgba(147, 112, 219, 0.4)',
                color: 'var(--color-text-secondary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              Clear All Teams
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {teams.map((team, teamIndex) => (
          <div
            key={teamIndex}
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <input
                type="text"
                value={team.name}
                onChange={(e) => updateTeam(teamIndex, { name: e.target.value.trim() || `Team ${teamIndex + 1}` })}
                className="px-3 py-1 rounded border flex-1 min-w-[150px]"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                  color: 'var(--color-text-primary)',
                }}
              />
              <select
                value={team.formationType}
                onChange={(e) => updateTeam(teamIndex, { formationType: e.target.value as any })}
                className="px-3 py-1 rounded border"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                  color: 'var(--color-text-primary)',
                }}
              >
                {FORMATION_TYPES.map((ft) => (
                  <option key={ft.value} value={ft.value}>
                    {ft.label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => clearTeam(teamIndex)}
                className="px-3 py-1 rounded border transition-colors text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                Clear
              </button>
              <button
                onClick={() => resetSkills(teamIndex)}
                className="px-3 py-1 rounded border transition-colors text-sm"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                  color: 'var(--color-text-secondary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                }}
              >
                Reset Skills
              </button>
              {teams.length > 1 && (
                <button
                  onClick={() => removeTeam(teamIndex)}
                  className="px-3 py-1 rounded border transition-colors text-sm"
                  style={{
                    backgroundColor: 'var(--color-bg-tertiary)',
                    borderColor: 'rgba(239, 68, 68, 0.4)',
                    color: 'var(--color-accent-red)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                  }}
                >
                  ×
                </button>
              )}
            </div>

            {/* Formation visualization with proper spacing */}
            <div className="mb-6">
              <div className="flex justify-center items-center gap-4 relative" style={{ minHeight: '200px', padding: '40px 0' }}>
                {team.slots.map((hero, slotIndex) => {
                  const row = getRowForFormation(team.formationType, slotIndex);
                  return (
                    <div
                      key={slotIndex}
                      style={{
                        transform: row === 'back' ? 'translateY(-30px)' : 'translateY(30px)',
                        zIndex: row === 'back' ? 1 : 2,
                      }}
                    >
                      <TeamSlot
                        teamIndex={teamIndex}
                        slotIndex={slotIndex}
                        hero={hero}
                        tier={team.tiers[slotIndex]}
                        gearSet={team.gearSets[slotIndex]}
                        skillOrders={team.skillOrders[slotIndex]}
                        row={row}
                        formationType={team.formationType}
                        onUpdate={(updates) => updateSlot(teamIndex, slotIndex, updates)}
                        draggedHero={draggedHero}
                        setDraggedHero={setDraggedHero}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                Pet:
              </label>
              <select
                value={team.pet || ''}
                onChange={(e) => updateTeam(teamIndex, { pet: e.target.value || null })}
                className="w-full px-3 py-2 rounded border"
                style={{
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderColor: 'rgba(147, 112, 219, 0.4)',
                  color: 'var(--color-text-primary)',
                }}
              >
                <option value="">None</option>
                {PETS.map((pet) => (
                  <option key={pet} value={pet}>
                    {pet}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addTeam}
        className="w-full px-4 py-3 rounded-lg border transition-colors flex items-center justify-center gap-2"
        style={{
          backgroundColor: 'rgba(147, 112, 219, 0.2)',
          borderColor: 'rgba(147, 112, 219, 0.4)',
          color: 'var(--color-text-primary)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(147, 112, 219, 0.2)';
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        Add Team
      </button>
    </div>
  );
}
