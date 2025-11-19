import React from 'react';
import type { GearSet } from '../../lib/types';
import { getGearSetImagePath } from '../../lib/gear-builder';
import './GearCard.css';

interface GearCardProps {
    gear: GearSet;
}

const GearCard: React.FC<GearCardProps> = ({ gear }) => {
    return (
        <div className="gear-card">
            <div className="gear-card-title">{gear.name}</div>
            <div className="gear-card-content">
                <div className="gear-card-image">
                    <img
                        src={getGearSetImagePath(gear.name)}
                        alt={gear.name}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.parentElement!.style.display = 'none';
                        }}
                    />
                </div>
                <div className="gear-card-stats">
                    <div className="gear-stat-item">
                        <span className="gear-stat-label">Main Stats</span>
                        <div className="gear-stat-value">
                            {gear.main_stats || <em>To be added</em>}
                        </div>
                    </div>
                    <div className="gear-stat-item">
                        <span className="gear-stat-label">Required Stat Thresholds</span>
                        <div className="gear-stat-value">
                            {gear.required_stat_thresholds || <em>To be added</em>}
                        </div>
                    </div>
                    <div className="gear-stat-item">
                        <span className="gear-stat-label">Sub Stat Priority</span>
                        <div className="gear-stat-value">
                            {gear.sub_stat_priority || <em>To be added</em>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GearCard;

