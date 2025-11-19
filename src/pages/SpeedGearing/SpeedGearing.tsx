import React, { useState } from "react";
import "./SpeedGearing.css";

const SpeedGearing: React.FC = () => {
  const [selectedPaths, setSelectedPaths] = useState<Record<string, string[]>>({
    "3liner": [],
    "4liner": [],
  });

  const handleDecisionClick = (
    treeId: string,
    path: string,
    isTerminal: boolean
  ) => {
    setSelectedPaths((prev) => {
      const newPaths = { ...prev };
      const currentPath = newPaths[treeId] || [];

      if (isTerminal) {
        // Terminal path - just add it
        newPaths[treeId] = [...currentPath, path];
      } else {
        // Non-terminal - add and continue
        newPaths[treeId] = [...currentPath, path];
      }

      return newPaths;
    });
  };

  const resetTree = (treeId: string) => {
    setSelectedPaths((prev) => ({
      ...prev,
      [treeId]: [],
    }));
  };

  const isPathSelected = (treeId: string, path: string): boolean => {
    return selectedPaths[treeId]?.includes(path) || false;
  };

  const shouldShowDecision = (treeId: string, requires: string): boolean => {
    if (!requires) return true;
    return selectedPaths[treeId]?.includes(requires) || false;
  };

  const shouldShowOutcome = (treeId: string, outcome: string): boolean => {
    return selectedPaths[treeId]?.includes(outcome) || false;
  };

  return (
    <div className="speed-gearing-view">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">SPEED GEARING GUIDE</h1>
        </div>

        <main className="speed-chart-wrapper">
          <section className="chart-context">
            <div className="context-card">
              <p className="context-label">note:</p>
              <p>
                Start with 3 and 4 liner base with speed on them. Don't level 3
                liners to 4 liners in an attempt to get speed as the 4th. Not
                really worth your time.
              </p>
            </div>
          </section>

          <div className="trees-container">
            {/* 3-Liner Tree */}
            <section className="flow-diagram">
              <div className="tree-header">
                <h2 className="tree-title">3-Liner Tree</h2>
                <div className="tree-controls">
                  {selectedPaths["3liner"].length > 0 && (
                    <button
                      className="reset-btn"
                      onClick={() => resetTree("3liner")}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flow-tree" id="tree-3liner">
                <div className="flow-node flow-start">
                  <div className="node-content">
                    <h3 className="node-title">Level 3-liner to level 6</h3>
                    <p className="node-note">Starts with 4 base speed</p>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("3liner", "") ? "visible" : "hidden"
                  }`}
                  data-level="6"
                >
                  <p className="decision-prompt">What happened at Level 6?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("3liner", "6-hit") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "6-hit", false)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(8 total)</span>
                    </button>
                    <button
                      className={`decision-btn danger ${
                        isPathSelected("3liner", "6-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "6-miss", true)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 4)</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("3liner", "6-hit") ? "visible" : "hidden"
                  }`}
                  data-level="9"
                >
                  <p className="decision-prompt">What happened at Level 9?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("3liner", "9-hit") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "9-hit", true)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(12 total)</span>
                    </button>
                    <button
                      className={`decision-btn caution ${
                        isPathSelected("3liner", "9-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "9-miss", false)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 8)</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("3liner", "9-miss")
                      ? "visible"
                      : "hidden"
                  }`}
                  data-level="12"
                >
                  <p className="decision-prompt">What happened at Level 12?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("3liner", "12-hit") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "12-hit", true)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(12 total)</span>
                    </button>
                    <button
                      className={`decision-btn caution ${
                        isPathSelected("3liner", "12-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("3liner", "12-miss", true)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 8)</span>
                    </button>
                  </div>
                </div>

                {/* Terminal Messages */}
                {shouldShowOutcome("3liner", "6-miss") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="6-miss"
                  >
                    <div className="outcome-card danger">
                      <h4>❌ Throw Away</h4>
                      <p>
                        This piece didn't hit speed at Level 6. It's not worth
                        investing more gold.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("3liner", "9-hit") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="9-hit"
                  >
                    <div className="outcome-card success">
                      <h4>✓ Level to 15</h4>
                      <p>
                        Great! You hit 12 speed by Level 9. Take this piece all
                        the way to 15.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("3liner", "12-hit") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="12-hit"
                  >
                    <div className="outcome-card success">
                      <h4>✓ Level to 15</h4>
                      <p>
                        You finally hit 12 speed at Level 12. Finish leveling to
                        15.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("3liner", "12-miss") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="12-miss"
                  >
                    <div className="outcome-card danger">
                      <h4>❌ Throw Away</h4>
                      <p>
                        Still at 8 speed by Level 12. This piece isn't worth
                        keeping. Recycle it.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 4-Liner Tree */}
            <section className="flow-diagram">
              <div className="tree-header">
                <h2 className="tree-title">4-Liner Tree</h2>
                <div className="tree-controls">
                  {selectedPaths["4liner"].length > 0 && (
                    <button
                      className="reset-btn"
                      onClick={() => resetTree("4liner")}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              <div className="flow-tree" id="tree-4liner">
                <div className="flow-node flow-start">
                  <div className="node-content">
                    <h3 className="node-title">Level 4-liner to level 6</h3>
                    <p className="node-note">Starts with 4 base speed</p>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("4liner", "") ? "visible" : "hidden"
                  }`}
                  data-level="6"
                >
                  <p className="decision-prompt">What happened at Level 6?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("4liner", "6-perfect") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "6-perfect", true)
                      }
                    >
                      <span className="btn-label">Hit +8 speed</span>
                      <span className="btn-detail">(12 total)</span>
                    </button>
                    <button
                      className={`decision-btn caution ${
                        isPathSelected("4liner", "6-partial") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "6-partial", false)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(8 total)</span>
                    </button>
                    <button
                      className={`decision-btn danger ${
                        isPathSelected("4liner", "6-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "6-miss", true)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 4)</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("4liner", "6-partial")
                      ? "visible"
                      : "hidden"
                  }`}
                  data-level="9"
                >
                  <p className="decision-prompt">What happened at Level 9?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("4liner", "9-hit") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "9-hit", true)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(12 total)</span>
                    </button>
                    <button
                      className={`decision-btn caution ${
                        isPathSelected("4liner", "9-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "9-miss", false)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 8)</span>
                    </button>
                  </div>
                </div>

                <div
                  className={`decision-point ${
                    shouldShowDecision("4liner", "9-miss")
                      ? "visible"
                      : "hidden"
                  }`}
                  data-level="12"
                >
                  <p className="decision-prompt">What happened at Level 12?</p>
                  <div className="decision-options">
                    <button
                      className={`decision-btn success ${
                        isPathSelected("4liner", "12-hit") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "12-hit", true)
                      }
                    >
                      <span className="btn-label">Hit +4 speed</span>
                      <span className="btn-detail">(12 total)</span>
                    </button>
                    <button
                      className={`decision-btn danger ${
                        isPathSelected("4liner", "12-miss") ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleDecisionClick("4liner", "12-miss", true)
                      }
                    >
                      <span className="btn-label">Miss</span>
                      <span className="btn-detail">(stays 8)</span>
                    </button>
                  </div>
                </div>

                {/* Terminal Messages */}
                {shouldShowOutcome("4liner", "6-perfect") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="6-perfect"
                  >
                    <div className="outcome-card success">
                      <h4>✓ Level to 15 Immediately</h4>
                      <p>
                        Perfect! You hit 12 speed at Level 6. Take this piece
                        straight to 15.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("4liner", "6-miss") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="6-miss"
                  >
                    <div className="outcome-card danger">
                      <h4>❌ Throw Away</h4>
                      <p>
                        This piece didn't hit speed at Level 6. It's not worth
                        investing more gold.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("4liner", "9-hit") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="9-hit"
                  >
                    <div className="outcome-card success">
                      <h4>✓ Level to 15</h4>
                      <p>
                        Great! You hit 12 speed by Level 9. Take this piece all
                        the way to 15.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("4liner", "12-hit") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="12-hit"
                  >
                    <div className="outcome-card success">
                      <h4>✓ Level to 15</h4>
                      <p>
                        You finally hit 12 speed at Level 12. Finish leveling to
                        15 and hope for 16+.
                      </p>
                    </div>
                  </div>
                )}

                {shouldShowOutcome("4liner", "12-miss") && (
                  <div
                    className="terminal-message visible"
                    data-outcome="12-miss"
                  >
                    <div className="outcome-card danger">
                      <h4>❌ Throw Away</h4>
                      <p>
                        Still at 8 speed by Level 12. This piece isn't worth
                        keeping. Recycle it.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpeedGearing;
