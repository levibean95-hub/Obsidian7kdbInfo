// Gear Builder utilities for React components
import type { GearSet } from './types';
import { GEAR_SETS_PATH } from './constants';

export function getGearSetImagePath(gearSetName: string): string {
    const folderPath = encodeURI(GEAR_SETS_PATH);
    const fileName = encodeURIComponent(gearSetName) + '.png';
    return folderPath + fileName;
}

export function isT6DifferentFromT0(
    t0Gear: GearSet[],
    t6Gear: GearSet[]
): boolean {
    if (!t6Gear || t6Gear.length === 0) {
        return false;
    }

    if (!t0Gear || t0Gear.length === 0) {
        return true;
    }

    // Compare gear sets
    if (t0Gear.length !== t6Gear.length) {
        return true;
    }

    // Compare each gear set
    for (let i = 0; i < t6Gear.length; i++) {
        const t0 = t0Gear[i];
        const t6 = t6Gear[i];
        
        if (t0.name !== t6.name ||
            t0.main_stats !== t6.main_stats ||
            t0.required_stat_thresholds !== t6.required_stat_thresholds ||
            t0.sub_stat_priority !== t6.sub_stat_priority) {
            return true;
        }
    }

    return false;
}

