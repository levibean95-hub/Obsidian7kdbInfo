import React, { useState } from "react";
import "./SpeedGearing.css";

const SpeedGearing: React.FC = () => {
  const [collapsed3Liner, setCollapsed3Liner] = useState(true);
  const [collapsed4Liner, setCollapsed4Liner] = useState(true);

  return (
    <div className="speed-gearing-view">
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">SPEED GEARING GUIDE</h1>
        </div>

        <main className="speed-chart-wrapper">
          <section className="instructions-section">
            <div className="instruction-step">
              <h2 className="step-title">STEP 1: Get Your Gear</h2>
              <p className="step-text">
                Find and save your 3-4 initial sub stat gear with speed on it.
              </p>
              <p className="step-note">
                <strong>Note:</strong> You can optionally level 3-liner gear that doesn't have speed to level 3 to see if you get speed.
              </p>
            </div>

            <div className="instruction-step">
              <h2 className="step-title">STEP 2: Choose Your Path</h2>
              <p className="step-text">
                Based on if you started with 3 initial substats or 4 initial substats, choose the next option to see upgrade paths.
              </p>
            </div>
          </section>

          <div className="trees-container">
            {/* 3-Liner Paths */}
            <section className="upgrade-section" onClick={() => setCollapsed3Liner(!collapsed3Liner)}>
              <div className="section-header">
                <h2 className="section-title">3-Liner Upgrade Paths</h2>
                <span className="collapse-icon">{collapsed3Liner ? '▼' : '▲'}</span>
              </div>
              {!collapsed3Liner && <p className="section-subtitle">Starting with 4 Speed</p>}

              {!collapsed3Liner && <div className="paths-grid">
                {/* Path 1: Hit at Level 6 → Hit at Level 9 */}
                <div className="upgrade-path success-path">
                  <div className="path-header">Best Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result success">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result success">12 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action success-action">
                      <strong>✓ Level to 15</strong>
                      <p>Continue to max</p>
                    </div>
                  </div>
                </div>

                {/* Path 2: Hit at Level 6 → Miss at Level 9 → Hit at Level 12 */}
                <div className="upgrade-path caution-path">
                  <div className="path-header">Acceptable Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result success">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result caution">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 12</div>
                      <div className="step-result success">12 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action success-action">
                      <strong>✓ Level to 15</strong>
                      <p>Finish upgrade</p>
                    </div>
                  </div>
                </div>

                {/* Path 3: Hit at Level 6 → Miss at Level 9 → Miss at Level 12 */}
                <div className="upgrade-path danger-path">
                  <div className="path-header">Failed Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result success">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result caution">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 12</div>
                      <div className="step-result danger">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action danger-action">
                      <strong>✗ Discard</strong>
                      <p>Not worth keeping</p>
                    </div>
                  </div>
                </div>

                {/* Path 4: Miss at Level 6 */}
                <div className="upgrade-path danger-path">
                  <div className="path-header">Early Fail</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result danger">4 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action danger-action">
                      <strong>✗ Discard</strong>
                      <p>Stop immediately</p>
                    </div>
                  </div>
                </div>
              </div>}
            </section>

            {/* 4-Liner Paths */}
            <section className="upgrade-section" onClick={() => setCollapsed4Liner(!collapsed4Liner)}>
              <div className="section-header">
                <h2 className="section-title">4-Liner Upgrade Paths</h2>
                <span className="collapse-icon">{collapsed4Liner ? '▼' : '▲'}</span>
              </div>
              {!collapsed4Liner && <p className="section-subtitle">Starting with 4 Speed</p>}

              {!collapsed4Liner && <div className="paths-grid">
                {/* Path 1: Hit +8 at Level 6 */}
                <div className="upgrade-path success-path">
                  <div className="path-header">Perfect Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result success">12 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action success-action">
                      <strong>✓ Level to 15 Immediately</strong>
                      <p>Jackpot! Max ASAP</p>
                    </div>
                  </div>
                </div>

                {/* Path 2: Hit +4 at Level 6 → Hit at Level 9 */}
                <div className="upgrade-path success-path">
                  <div className="path-header">Good Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result caution">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result success">12 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action success-action">
                      <strong>✓ Level to 15</strong>
                      <p>Continue to max</p>
                    </div>
                  </div>
                </div>

                {/* Path 3: Hit +4 at Level 6 → Miss at Level 9 → Hit at Level 12 */}
                <div className="upgrade-path caution-path">
                  <div className="path-header">Acceptable Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result caution">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result caution">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 12</div>
                      <div className="step-result success">12 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action success-action">
                      <strong>✓ Level to 15</strong>
                      <p>Finish upgrade</p>
                    </div>
                  </div>
                </div>

                {/* Path 4: Hit +4 at Level 6 → Miss at Level 9 → Miss at Level 12 */}
                <div className="upgrade-path danger-path">
                  <div className="path-header">Failed Path</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result caution">8 speed</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 9</div>
                      <div className="step-result caution">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="step">
                      <div className="step-level">Lvl 12</div>
                      <div className="step-result danger">8 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action danger-action">
                      <strong>✗ Discard</strong>
                      <p>Not worth keeping</p>
                    </div>
                  </div>
                </div>

                {/* Path 5: Miss at Level 6 */}
                <div className="upgrade-path danger-path">
                  <div className="path-header">Early Fail</div>
                  <div className="path-steps">
                    <div className="step">
                      <div className="step-level">Lvl 6</div>
                      <div className="step-result danger">4 speed (miss)</div>
                    </div>
                    <div className="arrow">↓</div>
                    <div className="final-action danger-action">
                      <strong>✗ Discard</strong>
                      <p>Stop immediately</p>
                    </div>
                  </div>
                </div>
              </div>}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SpeedGearing;
