"""
Wish List Data Generator
========================
This script reads all hero data files and extracts wish list priorities
to generate embedded data for wish-list.js

Usage: python generate_wishlist_data.py
"""

import os
import re
import json

def parse_wish_list_priority(filepath):
    """Parse a hero data file and extract wish list priority and target transcendence."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract hero name
    hero_match = re.search(r'^HERO:\s*(.+)$', content, re.MULTILINE)
    if not hero_match:
        return None, None, None

    hero_name = hero_match.group(1).strip()

    # Extract wish list priority
    priority_match = re.search(r'^Wish list priority:\s*(.+)$', content, re.MULTILINE)
    wish_list_priority = priority_match.group(1).strip() if priority_match else "N/A"

    # Extract target transcendence
    transcendence_match = re.search(r'^Target transcendence:\s*(.+)$', content, re.MULTILINE)
    target_transcendence = transcendence_match.group(1).strip() if transcendence_match else "N/A"

    return hero_name, wish_list_priority, target_transcendence

def normalize_priority(priority):
    """Normalize priority to standard tier values."""
    priority_lower = priority.lower().strip()

    # Handle "Very High" variations
    if 'very high' in priority_lower or priority_lower == 'very high':
        return 'very-high'
    # Handle "High" (but not "Very High")
    elif priority_lower == 'high' or (priority_lower.startswith('high') and 'very' not in priority_lower):
        return 'high'
    # Handle "Medium"
    elif priority_lower == 'medium':
        return 'medium'
    # Handle "Low" variations (but not "Very Low")
    elif priority_lower == 'low' or (priority_lower.startswith('low') and 'very' not in priority_lower):
        return 'low'
    # Handle "Very Low"
    elif 'very low' in priority_lower:
        return 'very-low'
    # Handle "Do Not" variations
    elif 'do not' in priority_lower or priority_lower == 'dont':
        return 'do-not'
    # Default to N/A
    else:
        return 'na'

def generate_wishlist_data():
    """Generate wish list data from all hero data files."""
    hero_data_dir = 'hero_data'
    wishlist_data = {}

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found!")
        return None

    # Get all .txt files in hero_data directory
    txt_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(txt_files)} hero data files")

    for filename in sorted(txt_files):
        filepath = os.path.join(hero_data_dir, filename)
        hero_name, priority, transcendence = parse_wish_list_priority(filepath)

        if hero_name:
            normalized_tier = normalize_priority(priority)
            wishlist_data[hero_name] = {
                'name': hero_name,
                'priority': priority,
                'tier': normalized_tier,
                'transcendence': transcendence
            }
            print(f"  [OK] {hero_name}: {priority} -> {normalized_tier} (T: {transcendence})")
        else:
            print(f"  [ERROR] Failed to parse {filename}")

    return wishlist_data

def generate_js_file(wishlist_data):
    """Generate wish-list.js with embedded data."""
    js_content = '''// Wish List Tier List - Auto-generated from hero_data files
// DO NOT EDIT MANUALLY - Run generate_wishlist_data.py to update

const WISH_LIST_DATA = '''

    # Convert to JSON
    json_str = json.dumps(wishlist_data, indent=4, ensure_ascii=False)
    js_content += json_str + ';\n\n'

    # Add the tier list rendering code
    js_content += '''
// Normalize tier name for data attribute matching
function normalizeTier(priority) {
    const priorityLower = priority.toLowerCase().trim();

    if (priorityLower.includes('very high')) return 'very-high';
    if (priorityLower === 'high' || (priorityLower.startsWith('high') && !priorityLower.includes('very'))) return 'high';
    if (priorityLower === 'medium') return 'medium';
    if (priorityLower === 'low' || (priorityLower.startsWith('low') && !priorityLower.includes('very'))) return 'low';
    if (priorityLower.includes('very low')) return 'very-low';
    if (priorityLower.includes('do not') || priorityLower === 'dont') return 'do-not';
    return 'na';
}

// Get image path for hero portrait
function getHeroPortraitPath(heroName) {
    return `Downloaded Hero Portraits/${encodeURIComponent(heroName)}.png`;
}

// Create hero card element
function createHeroCard(heroData) {
    const card = document.createElement('div');
    card.className = 'hero-card-tier';
    card.onclick = () => {
        window.location.href = `index.html?from=wishlist#${heroData.name}`;
    };

    const portrait = document.createElement('img');
    portrait.className = 'hero-portrait-tier';
    portrait.src = getHeroPortraitPath(heroData.name);
    portrait.alt = heroData.name;
    portrait.onerror = () => {
        portrait.style.opacity = '0.3';
        console.warn(`Portrait not found for ${heroData.name}`);
    };

    const infoContainer = document.createElement('div');
    infoContainer.className = 'hero-info-tier';

    const name = document.createElement('div');
    name.className = 'hero-name-tier';
    name.textContent = heroData.name;

    const transcendence = document.createElement('div');
    transcendence.className = 'hero-transcendence-tier';
    transcendence.textContent = heroData.transcendence || 'N/A';

    infoContainer.appendChild(name);
    infoContainer.appendChild(transcendence);

    card.appendChild(portrait);
    card.appendChild(infoContainer);

    return card;
}

// Populate tier lists
function populateTierLists() {
    const tiers = {
        'very-high': [],
        'high': [],
        'medium': [],
        'low': [],
        'very-low': [],
        'do-not': [],
        'na': []
    };

    // Organize heroes by tier
    Object.values(WISH_LIST_DATA).forEach(heroData => {
        const tier = heroData.tier;
        if (tiers[tier]) {
            tiers[tier].push(heroData);
        }
    });

    // Sort heroes alphabetically within each tier
    Object.keys(tiers).forEach(tier => {
        tiers[tier].sort((a, b) => a.name.localeCompare(b.name));
    });

    // Populate each tier section
    Object.keys(tiers).forEach(tier => {
        const tierSection = document.querySelector(`.tier-section[data-tier="${tier}"]`);
        if (!tierSection) return;

        const tierHeroesContainer = tierSection.querySelector('.tier-heroes');
        const tierCount = tierSection.querySelector('.tier-count');

        // Clear existing content
        tierHeroesContainer.innerHTML = '';

        // Add hero cards
        tiers[tier].forEach(heroData => {
            const card = createHeroCard(heroData);
            tierHeroesContainer.appendChild(card);
        });

        // Update count
        tierCount.textContent = tiers[tier].length;
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    populateTierLists();
});
'''

    return js_content

def main():
    print("=" * 60)
    print("Wish List Data Generator")
    print("=" * 60)
    print()

    print("Parsing hero data files...")
    wishlist_data = generate_wishlist_data()

    if not wishlist_data:
        print("\nError: No data generated")
        return

    print(f"\nTotal heroes processed: {len(wishlist_data)}")

    # Count heroes per tier
    tier_counts = {}
    for hero_data in wishlist_data.values():
        tier = hero_data['tier']
        tier_counts[tier] = tier_counts.get(tier, 0) + 1

    print("\nHeroes per tier:")
    for tier, count in sorted(tier_counts.items()):
        print(f"  {tier}: {count}")

    print("\nGenerating wish-list.js...")
    js_content = generate_js_file(wishlist_data)

    with open('wish-list.js', 'w', encoding='utf-8') as f:
        f.write(js_content)

    print("[SUCCESS] wish-list.js generated successfully!")
    print("\nDone! You can now open wish-list.html in your browser.")

if __name__ == '__main__':
    main()
