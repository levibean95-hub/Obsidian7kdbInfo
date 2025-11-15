import { Link } from '@tanstack/react-router';

export function Header() {
  return (
    <header 
      className="border-b"
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderColor: 'rgba(147, 112, 219, 0.4)',
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div 
          className="rounded-lg p-3 mb-4 border"
          style={{
            backgroundColor: 'rgba(255, 204, 0, 0.12)',
            borderColor: 'rgba(255, 204, 0, 0.4)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <p className="text-sm" style={{ color: '#fef08a' }}>
            ⚠️ <strong>Work in Progress:</strong> This site is actively being developed. Not all hero data has been filled out yet. Please check back regularly for updates.
          </p>
        </div>
        
        <h1 
          className="text-3xl font-bold text-center mb-4"
          style={{
            background: 'linear-gradient(to right, var(--color-accent-primary), var(--color-accent-gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          7K RE:BIRTH OBSIDIAN INFO DUMP
        </h1>
        
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            to="/"
            className="px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.6)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.4)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            Heroes
          </Link>
          <Link
            to="/advent"
            className="px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.6)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.4)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            Advent Teams <span className="text-xs" style={{ color: '#facc15' }}>WIP</span>
          </Link>
          <Link
            to="/speed-gearing"
            className="px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(255, 204, 0, 0.4)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 204, 0, 0.6)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 204, 0, 0.4)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            Speed Gearing Guide <span className="text-xs" style={{ color: '#facc15' }}>WIP</span>
          </Link>
          <Link
            to="/teambuilder"
            className="px-4 py-2 rounded-full border transition-colors"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'rgba(147, 112, 219, 0.4)',
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.6)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(147, 112, 219, 0.4)';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            Team Builder
          </Link>
        </div>
      </div>
    </header>
  );
}

