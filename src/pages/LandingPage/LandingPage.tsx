import React from 'react';
import { Link } from '@tanstack/react-router';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <>
            <div className="wip-disclaimer">
                ⚠ <strong>Work in Progress:</strong> This site is actively being developed. Not all hero data has been
                filled out yet. Please check back regularly for updates.
            </div>

            <div className="landing-page">
                <header className="landing-header">
                    <h1 className="landing-title">OBSIDIAN7KDB.INFO</h1>
                    <p className="landing-subtitle">
                        Your comprehensive resource for Seven Knights Rebirth.
                        Find hero builds, team compositions, and game guides all in one place.
                    </p>
                </header>

                <nav className="nav-grid">
                    <Link to="/hero-database" className="nav-card">
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        <h2 className="nav-card-title">Hero Database</h2>
                        <p className="nav-card-desc">Complete hero catalog with gear recommendations, stats, and skill priorities.</p>
                    </Link>

                    <Link to="/wish-list" className="nav-card">
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path
                                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                            </path>
                        </svg>
                        <h2 className="nav-card-title">Wish List</h2>
                        <p className="nav-card-desc">Priority tier list for hero selection and investment.</p>
                    </Link>

                    <Link to="/speed-gearing" className="nav-card">
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <h2 className="nav-card-title">Speed Gearing Guide</h2>
                        <p className="nav-card-desc">Comprehensive guide to optimizing speed gear and upgrade paths.</p>
                    </Link>

                    <Link to="/guild-war-teams" className="nav-card">
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                            <path d="M2 17l10 5 10-5"></path>
                            <path d="M2 12l10 5 10-5"></path>
                        </svg>
                        <h2 className="nav-card-title">Guild War Teams</h2>
                        <p className="nav-card-desc">Effective 3-hero team compositions for Guild War battles.</p>
                    </Link>

                    <Link to="/advent" className="nav-card">
                        <span className="badge badge-wip">WIP</span>
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        <h2 className="nav-card-title">Advent Teams</h2>
                        <p className="nav-card-desc">Strategies and team setups for Advent Boss encounters.</p>
                    </Link>

                    <Link to="/team-builder" className="nav-card">
                        <span className="badge badge-new">New</span>
                        <svg className="nav-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                        <h2 className="nav-card-title">Team Builder</h2>
                        <p className="nav-card-desc">Create, customize, and share your own team compositions.</p>
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default LandingPage;

