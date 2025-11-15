import { getGearSetImagePath } from '../utils';
import type { GearConfig } from '../types';

interface GearCardProps {
  gear: GearConfig;
}

export function GearCard({ gear }: GearCardProps) {
  return (
    <div className="bg-bg-card rounded-lg p-4 border border-border/40 card-shadow">
      <h4 className="text-lg font-semibold mb-3 text-text-primary">{gear.name}</h4>
      
      <div className="mb-3">
        <img
          src={getGearSetImagePath(gear.name)}
          alt={gear.name}
          className="w-full aspect-square object-cover rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      <div className="space-y-2 text-sm">
        <div>
          <span className="text-text-tertiary">Main Stats:</span>
          <div className="text-text-primary mt-1">{gear.main_stats || 'N/A'}</div>
        </div>
        
        <div>
          <span className="text-text-tertiary">Required Stat Thresholds:</span>
          <div className="text-text-primary mt-1">{gear.required_stat_thresholds || 'N/A'}</div>
        </div>
        
        {gear.sub_stat_priority && gear.sub_stat_priority !== 'N/A' && (
          <div>
            <span className="text-text-tertiary">Sub Stat Priority:</span>
            <div className="text-text-primary mt-1">{gear.sub_stat_priority}</div>
          </div>
        )}
      </div>
    </div>
  );
}

