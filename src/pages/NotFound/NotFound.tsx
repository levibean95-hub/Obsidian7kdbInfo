import React from "react";
import { Link } from "@tanstack/react-router";
import "./NotFound.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-view">
      <div className="page-content">
        <div className="not-found-container">
          <div className="not-found-content">
            <h1 className="not-found-title">404</h1>
            <h2 className="not-found-subtitle">Hero Not Found</h2>
            <p className="not-found-description">
              Looks like this hero has been banished to another dimension! 
              Maybe they're fighting a boss that doesn't exist, or perhaps 
              they're stuck in a loading screen somewhere...
            </p>
            <div className="not-found-quote">
              <p>"Even the mightiest heroes get lost sometimes."</p>
              <span className="not-found-quote-author">— Unknown Strategist</span>
            </div>
            <div className="not-found-actions">
              <Link to="/" className="not-found-button primary">
                Return to Base
              </Link>
              <Link to="/hero-database" className="not-found-button secondary">
                Browse Heroes
              </Link>
            </div>
            <div className="not-found-fun-fact">
              <p>
                💡 <strong>Fun Fact:</strong> In the game, heroes can't actually 
                get lost... but your URL can! 😄
              </p>
            </div>
          </div>
          <div className="not-found-illustration">
            <div className="not-found-hero-silhouette">
              <div className="hero-head"></div>
              <div className="hero-body"></div>
              <div className="hero-arms">
                <div className="arm left"></div>
                <div className="arm right"></div>
              </div>
              <div className="hero-legs">
                <div className="leg left"></div>
                <div className="leg right"></div>
              </div>
            </div>
            <div className="not-found-question-mark">?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

