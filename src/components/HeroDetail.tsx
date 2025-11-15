import { useParams, Link } from '@tanstack/react-router';
import { useHeroData } from '../hooks/useHeroData';
import { getHeroImagePath, getTypeIconPath } from '../utils';
import { Header } from './Header';
import { HeroGearSections } from './HeroGearSections';

export function HeroDetail() {
  const { heroName } = useParams({ from: '/hero/$heroName' });
  const { heroData, loading } = useHeroData();
  const hero = heroData[heroName];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-text-secondary text-xl">Loading hero...</div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Hero not found</h1>
          <Link to="/" className="text-accent-primary hover:underline">
            Back to Heroes
          </Link>
        </div>
      </div>
    );
  }

  const rarityClass = `rarity-${hero.rarity.toLowerCase().replace(/\+/g, 'plus')}`;

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-6 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Heroes
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-6">{heroName}</h1>
          
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="relative w-48 h-64 bg-bg-card rounded-lg overflow-hidden card-shadow border border-border/40">
                <img
                  src={getHeroImagePath(heroName)}
                  alt={heroName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='200' height='200' rx='24' fill='%230c0812'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='%235a4a78' font-size='18'>No Portrait</text></svg>";
                  }}
                />
                
                {hero.type && (
                  <div className="absolute top-2 left-2 w-10 h-10 bg-bg-card rounded-full flex items-center justify-center border border-border/40">
                    <img
                      src={getTypeIconPath(hero.type)}
                      alt={hero.type}
                      className="w-8 h-8"
                    />
                  </div>
                )}
                
                {hero.rarity && (
                  <div className={`absolute top-2 right-2 px-3 py-1 rounded text-sm font-bold ${rarityClass}`}>
                    {hero.rarity}
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-text-tertiary text-sm">Type:</span>
                  <div className="flex items-center gap-2 mt-1">
                    {hero.type && (
                      <>
                        <img src={getTypeIconPath(hero.type)} alt={hero.type} className="w-5 h-5" />
                        <span className="text-text-primary">{hero.type}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-text-tertiary text-sm">Target Number:</span>
                  <div className="text-text-primary mt-1">{hero.target_number || 'N/A'}</div>
                </div>
                
                <div>
                  <span className="text-text-tertiary text-sm">Role:</span>
                  <div className="text-text-primary mt-1">{hero.role || 'N/A'}</div>
                </div>
                
                <div>
                  <span className="text-text-tertiary text-sm">Primary content used in:</span>
                  <div className="text-text-primary mt-1">{hero.primary_content || 'N/A'}</div>
                </div>
                
                <div>
                  <span className="text-text-tertiary text-sm">Target transcendence:</span>
                  <div className="text-text-primary mt-1">{hero.target_transcendence || 'N/A'}</div>
                </div>
                
                <div>
                  <span className="text-text-tertiary text-sm">Wish list priority:</span>
                  <div className="text-text-primary mt-1">{hero.wishlist_priority || 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <HeroGearSections hero={hero} heroName={heroName} />
      </div>
    </div>
  );
}

