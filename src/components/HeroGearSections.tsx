import type { Hero } from '../types';
import { GearCard } from './GearCard';

interface HeroGearSectionsProps {
  hero: Hero;
  heroName: string;
}

function isT6DifferentFromT0(
  t0Gear: typeof hero.gear_pve.T0,
  t6Gear: typeof hero.gear_pve.T6
): boolean {
  if (t6Gear.length === 0) return false;
  if (t0Gear.length !== t6Gear.length) return true;

  for (let i = 0; i < t0Gear.length; i++) {
    const t0 = t0Gear[i];
    const t6 = t6Gear[i];
    if (
      t0.name !== t6.name ||
      t0.main_stats !== t6.main_stats ||
      t0.required_stat_thresholds !== t6.required_stat_thresholds ||
      t0.sub_stat_priority !== t6.sub_stat_priority
    ) {
      return true;
    }
  }
  return false;
}

export function HeroGearSections({ hero, heroName }: HeroGearSectionsProps) {
  const showPvET6 = isT6DifferentFromT0(hero.gear_pve.T0, hero.gear_pve.T6);
  const showPvPT6 = isT6DifferentFromT0(hero.gear_pvp.T0, hero.gear_pvp.T6);

  return (
    <div className="space-y-8">
      {/* PvE Gear */}
      {hero.gear_pve.T0.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-accent-primary">Gear PvE</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">T0</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hero.gear_pve.T0.map((gear, idx) => (
                <GearCard key={`pve-t0-${idx}`} gear={gear} />
              ))}
            </div>
          </div>

          {showPvET6 && hero.gear_pve.T6.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">T6</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hero.gear_pve.T6.map((gear, idx) => (
                  <GearCard key={`pve-t6-${idx}`} gear={gear} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* PvP Gear */}
      {hero.gear_pvp.T0.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-accent-primary">Gear PvP</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">T0</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hero.gear_pvp.T0.map((gear, idx) => (
                <GearCard key={`pvp-t0-${idx}`} gear={gear} />
              ))}
            </div>
          </div>

          {showPvPT6 && hero.gear_pvp.T6.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-3">T6</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hero.gear_pvp.T6.map((gear, idx) => (
                  <GearCard key={`pvp-t6-${idx}`} gear={gear} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Skill Enhance Priority */}
      {hero.skill_enhance_priority && hero.skill_enhance_priority !== 'N/A' && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-accent-primary">Skill Enhance Priority</h2>
          <div className="bg-bg-card rounded-lg p-4 border border-border/40">
            <p className="text-text-primary whitespace-pre-line">{hero.skill_enhance_priority}</p>
          </div>
        </section>
      )}

      {/* Tips */}
      {hero.tips && (
        <section>
          <h2 className="text-2xl font-bold mb-4 text-accent-primary">Tips / Important Info</h2>
          <div className="bg-bg-card rounded-lg p-4 border border-border/40">
            <p className="text-text-primary whitespace-pre-line">{hero.tips}</p>
          </div>
        </section>
      )}
    </div>
  );
}

