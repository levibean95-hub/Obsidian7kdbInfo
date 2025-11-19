import React, { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import "./Navigation.css";

const Navigation: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouterState();
  const pathname = router.location.pathname;
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [menuOpen]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    // For hero-database, only highlight if it's exactly /hero-database or a hero detail page
    if (path === "/hero-database") {
      if (pathname === "/hero-database") {
        return true;
      }
      // Check if it's a hero detail page (has a hero name after /hero-database/)
      const parts = pathname.split("/");
      if (parts.length === 3 && parts[1] === "hero-database") {
        return true;
      }
      return false;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav className="global-nav">
        <div className="nav-container">
          <Link
            to="/"
            className="nav-brand"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            <h1 className="nav-title">OBSIDIAN7KDB.INFO</h1>
          </Link>
          <div className="nav-links" id="nav-links">
          <Link
            to="/hero-database"
            className={`nav-link nav-link-main ${
              isActive("/hero-database") ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span>Hero Database</span>
          </Link>
          <Link
            to="/guild-war-teams"
            className={`nav-link nav-link-external ${
              isActive("/guild-war-teams") ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
            <span>Guild War Teams</span>
          </Link>
          <Link
            to="/advent"
            className={`nav-link ${isActive("/advent") ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Advent Teams</span>
            <span className="wip-badge-small">WIP</span>
          </Link>
          <Link
            to="/speed-gearing"
            className={`nav-link nav-link-external ${
              isActive("/speed-gearing") ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Speed Gearing Guide</span>
          </Link>
          <Link
            to="/wish-list"
            className={`nav-link nav-link-external ${
              isActive("/wish-list") ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>Wish List</span>
          </Link>
          <Link
            to="/team-builder"
            className={`nav-link nav-link-external ${
              isActive("/team-builder") ? "active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Team Builder</span>
            <span className="new-badge">New</span>
          </Link>
        </div>
      </div>
    </nav>
    <button
      ref={buttonRef}
      className="mobile-menu-toggle"
      id="mobile-menu-toggle"
      aria-label="Toggle menu"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <span style={{
        width: '1.5rem',
        height: '0.2rem',
        background: 'var(--accent-amber)',
        borderRadius: '2px',
        boxShadow: '0 0 8px rgba(255, 204, 0, 0.5)'
      }}></span>
    </button>
    <div ref={menuRef} className={`nav-links mobile-grid-menu ${menuOpen ? "show" : ""}`}>
      <Link
        to="/hero-database"
        className={`nav-link nav-link-main ${
          isActive("/hero-database") ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
        <span>Hero Database</span>
      </Link>
      <Link
        to="/guild-war-teams"
        className={`nav-link nav-link-external ${
          isActive("/guild-war-teams") ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
        <span>Guild War Teams</span>
      </Link>
      <Link
        to="/advent"
        className={`nav-link ${isActive("/advent") ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span>Advent Teams</span>
        <span className="wip-badge-small">WIP</span>
      </Link>
      <Link
        to="/speed-gearing"
        className={`nav-link nav-link-external ${
          isActive("/speed-gearing") ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>Speed Gearing Guide</span>
      </Link>
      <Link
        to="/wish-list"
        className={`nav-link nav-link-external ${
          isActive("/wish-list") ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>Wish List</span>
      </Link>
      <Link
        to="/team-builder"
        className={`nav-link nav-link-external ${
          isActive("/team-builder") ? "active" : ""
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Team Builder</span>
        <span className="new-badge">New</span>
      </Link>
    </div>
  </>
  );
};

export default Navigation;
