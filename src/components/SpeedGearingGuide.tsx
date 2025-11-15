import { Link } from '@tanstack/react-router';
import { Header } from './Header';

export function SpeedGearingGuide() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--color-text-secondary)';
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Heroes
        </Link>

        <div className="mb-8">
          <h1 
            className="text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(to right, var(--color-accent-gold), var(--color-accent-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Speed Gearing Guide
          </h1>
          <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
            Farm pieces with 3 or 4 sub stats and a speed line. Roll in +3 steps to decide whether to invest,
            chase +15, or scrap.
          </p>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-accent-gold)' }}>
              Sub stat rules
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Skip 2-line drops. 3-line pieces unlock the 4th stat at +3 and need stacked speed/attack subs.
            </p>
          </div>
          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-accent-gold)' }}>
              Roll cadence
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Roll in +3 steps (6/9/12/15). Track only the +3 and +6 outcomes before investing.
            </p>
          </div>
          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-accent-gold)' }}>
              Targets
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              16 speed at +12 is the reliable floor. 20+ speed needs 4 of the 5 rolls to land on speed.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
            }}
          >
            <p className="text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--color-accent-gold)' }}>
              Step 0
            </p>
            <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Roll +4 speed gear to +6
            </h2>
            <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Stop after each +3 bump so you can bail before gold disappears.
            </p>
            <ul className="space-y-2 list-disc list-inside" style={{ color: 'var(--color-text-secondary)' }}>
              <li>
                <strong style={{ color: 'var(--color-text-primary)' }}>3-line drops:</strong> unlock the 4th sub at +3; great for reliable +12/+15 sets.
              </li>
              <li>
                <strong style={{ color: 'var(--color-text-primary)' }}>4-line drops:</strong> already capped on subs; best candidates for 20-speed pushes.
              </li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              borderColor: 'rgba(34, 197, 94, 0.4)',
            }}
          >
            <p className="text-xs uppercase tracking-wider mb-2 text-right" style={{ color: 'var(--color-accent-gold)' }}>
              By +6
            </p>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Hit speed twice
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              You are already at 12+ speed. Follow the green lane.
            </p>
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
              <h4 className="text-sm font-bold mb-3" style={{ color: '#22c55e' }}>
                Green lane - keep rolling
              </h4>
              <ol className="space-y-3 text-sm list-decimal list-inside" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Take it straight to +12</strong>
                  <br />
                  <span className="text-xs">Locks 16 speed. Stop here if you only need a budget booster.</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Consider +15 if you have gold</strong>
                  <br />
                  <span className="text-xs">Even if +12 whiffs, +15 can still land speed for 18-19 totals.</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Chase +20 only with 4-line units</strong>
                  <br />
                  <span className="text-xs">You need 4 of 5 rolls to hit speed. Stop once you reach 20.</span>
                </li>
              </ol>
            </div>
          </div>

          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              borderColor: 'rgba(251, 191, 36, 0.4)',
            }}
          >
            <p className="text-xs uppercase tracking-wider mb-2 text-right" style={{ color: 'var(--color-accent-gold)' }}>
              By +6
            </p>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Hit speed once
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Needs a confirmation roll at +9 before you sink more gold.
            </p>
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
              <h4 className="text-sm font-bold mb-3" style={{ color: '#fbbf24' }}>
                Amber lane - verify first
              </h4>
              <ol className="space-y-3 text-sm list-decimal list-inside" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Roll to +9</strong>
                  <br />
                  <span className="text-xs">This third roll decides everything; watch only the speed line.</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>If +9 hits speed</strong>
                  <br />
                  <span className="text-xs">Jump into the green lane rules above and lock 16 at +12.</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>If +9 misses</strong>
                  <br />
                  <span className="text-xs">Stop. Salvage or keep only when sub stats are perfect.</span>
                </li>
              </ol>
            </div>
          </div>

          <div
            className="rounded-lg p-4 border"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderColor: 'rgba(239, 68, 68, 0.4)',
            }}
          >
            <p className="text-xs uppercase tracking-wider mb-2 text-right" style={{ color: 'var(--color-accent-gold)' }}>
              By +6
            </p>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Missed speed twice
            </h3>
            <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
              Scrap unless the off-stats match a hyper niche build.
            </p>
            <div className="pt-4 border-t" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <h4 className="text-sm font-bold mb-3" style={{ color: '#ef4444' }}>
                Red lane - bail out
              </h4>
              <ol className="space-y-3 text-sm list-decimal list-inside" style={{ color: 'var(--color-text-secondary)' }}>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Stop at +6</strong>
                  <br />
                  <span className="text-xs">Two misses before +6 means the odds of 16+ speed are too low.</span>
                </li>
                <li>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Recycle or reroll</strong>
                  <br />
                  <span className="text-xs">Only stash these if the other subs fix a very specific hero.</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section
          className="rounded-lg p-4 border flex flex-wrap gap-4 justify-center"
          style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'rgba(147, 112, 219, 0.4)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }}></span>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Green = keep rolling.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fbbf24' }}></span>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Amber = check after every roll.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }}></span>
            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Red = recycle.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
