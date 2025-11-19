import React, { useMemo } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../../context/AppContext';
import { getHeroImagePath } from '../../lib/utils';
import './WishList.css';

interface WishListHero {
    name: string;
    priority: string;
    tier: string;
    transcendence: string;
}

const WishList: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useApp();

    // Extract wish list data from hero data
    const wishListData = useMemo(() => {
        const data: Record<string, WishListHero> = {};
        Object.values(state.heroData).forEach(hero => {
            if (hero.wishlist_priority && hero.wishlist_priority !== 'N/A' && hero.wishlist_priority !== 'To be added') {
                const priority = hero.wishlist_priority.toLowerCase();
                let tier = 'na';
                
                if (priority.includes('very high') || priority.includes('veryhigh')) {
                    tier = 'very-high';
                } else if (priority.includes('high')) {
                    tier = 'high';
                } else if (priority.includes('medium')) {
                    tier = 'medium';
                } else if (priority.includes('very low') || priority.includes('verylow')) {
                    tier = 'very-low';
                } else if (priority.includes('low')) {
                    tier = 'low';
                } else if (priority.includes('do not') || priority.includes('dont') || priority.includes('don\'t')) {
                    tier = 'do-not';
                }
                
                data[hero.name] = {
                    name: hero.name,
                    priority: hero.wishlist_priority,
                    tier,
                    transcendence: hero.target_transcendence || 'N/A'
                };
            }
        });
        return data;
    }, [state.heroData]);

    const tierOrder = ['very-high', 'high', 'medium', 'low', 'very-low', 'do-not', 'na'];
    const tierNames: Record<string, string> = {
        'very-high': 'Very High Priority',
        'high': 'High Priority',
        'medium': 'Medium Priority',
        'low': 'Low Priority',
        'very-low': 'Very Low Priority',
        'do-not': 'Do Not',
        'na': 'N/A'
    };

    const heroesByTier = useMemo(() => {
        const grouped: Record<string, WishListHero[]> = {};
        tierOrder.forEach(tier => {
            grouped[tier] = [];
        });
        
        Object.values(wishListData).forEach(hero => {
            if (grouped[hero.tier]) {
                grouped[hero.tier].push(hero);
            }
        });
        
        // Sort heroes within each tier alphabetically
        Object.keys(grouped).forEach(tier => {
            grouped[tier].sort((a, b) => a.name.localeCompare(b.name));
        });
        
        return grouped;
    }, [wishListData]);

    const handleHeroClick = (heroName: string) => {
        navigate({ to: `/hero-database/${encodeURIComponent(heroName)}` });
    };

    return (
        <div className="wish-list-view">
            <div className="page-content">
                <header className="header">
                    <h1 className="title">WISH LIST TIER LIST</h1>
                    <p className="subtitle">Heroes ranked by their wish list priority</p>
                </header>

                <div className="tier-list-container">
                    {tierOrder.map(tier => {
                        const heroes = heroesByTier[tier];
                        if (heroes.length === 0) return null;

                        return (
                            <div key={tier} className="tier-section" data-tier={tier}>
                                <div className={`tier-header ${tier}`}>
                                    <h2 className="tier-title">{tierNames[tier]}</h2>
                                    <span className="tier-count">{heroes.length}</span>
                                </div>
                                <div className="tier-heroes">
                                    {heroes.map(hero => (
                                        <button
                                            key={hero.name}
                                            className="hero-card-tier"
                                            onClick={() => handleHeroClick(hero.name)}
                                            aria-label={`View ${hero.name} details`}
                                        >
                                            <div className="hero-image-container-tier">
                                                <img
                                                    src={getHeroImagePath(hero.name, false, true)}
                                                    alt={hero.name}
                                                    className="hero-image-tier"
                                                />
                                            </div>
                                            <div className="hero-name-tier">{hero.name}</div>
                                            <div className="hero-transcendence-tier">{hero.transcendence}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WishList;
