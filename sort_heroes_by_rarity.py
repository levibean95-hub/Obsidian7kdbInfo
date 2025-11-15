"""
Script to sort heroes by rarity (highest to lowest) and alphabetically within each tier
"""
import re

# Define rarity order (highest to lowest)
RARITY_ORDER = {
    'L++': 0,
    'L+': 1,
    'L': 2,
    'Rare': 3,
    'Unknown': 4
}

def extract_embedded_data(script_content):
    """Extract the EMBEDDED_HERO_DATA from script.js"""
    # Find the EMBEDDED_HERO_DATA object
    start_pattern = 'const EMBEDDED_HERO_DATA = '
    start_idx = script_content.find(start_pattern)
    if start_idx == -1:
        return None

    # Find the opening brace
    brace_start = script_content.find('{', start_idx)
    if brace_start == -1:
        return None

    # Find the matching closing brace
    brace_count = 0
    end_idx = -1
    for i in range(brace_start, len(script_content)):
        if script_content[i] == '{':
            brace_count += 1
        elif script_content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_idx = i + 1
                break

    if end_idx == -1:
        return None

    # Extract the JSON content
    json_content = script_content[brace_start:end_idx]

    # Parse rarity for each hero (simple parsing)
    hero_rarities = {}
    for line in json_content.split('\n'):
        # Look for hero name keys (e.g., "Ace": {)
        hero_match = re.match(r'\s*"([^"]+)":\s*\{', line)
        if hero_match:
            current_hero = hero_match.group(1)
        # Look for rarity value
        rarity_match = re.match(r'\s*"rarity":\s*"([^"]+)"', line)
        if rarity_match and current_hero:
            hero_rarities[current_hero] = rarity_match.group(1)

    return hero_rarities

def sort_heroes_by_rarity(heroes, hero_rarities):
    """Sort heroes by rarity (highest first) then alphabetically"""
    def sort_key(hero_name):
        rarity = hero_rarities.get(hero_name, 'Unknown')
        rarity_rank = RARITY_ORDER.get(rarity, 99)
        return (rarity_rank, hero_name.lower())

    return sorted(heroes, key=sort_key)

def format_heroes_array(sorted_heroes, hero_rarities):
    """Format the heroes array with comments showing rarity tiers"""
    lines = ['// Hero data - sorted by rarity (L++ to Unknown) then alphabetically\nconst heroes = [']

    current_rarity = None
    for hero in sorted_heroes:
        rarity = hero_rarities.get(hero, 'Unknown')

        # Add a comment line when rarity changes
        if rarity != current_rarity:
            # Don't add comma removal here - keep comma on last hero of previous tier
            lines.append(f"    // {rarity} Tier")
            current_rarity = rarity

        lines.append(f"    '{hero}',")

    # Remove trailing comma from the last hero only
    if lines[-1].endswith(','):
        lines[-1] = lines[-1].rstrip(',')

    lines.append('];')
    return '\n'.join(lines)

def update_heroes_array(script_path):
    """Update the heroes array in script.js"""
    # Read the current script.js
    with open(script_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract hero rarities from EMBEDDED_HERO_DATA
    print("Extracting rarity data from EMBEDDED_HERO_DATA...")
    hero_rarities = extract_embedded_data(content)

    if not hero_rarities:
        print("Error: Could not extract hero rarities from EMBEDDED_HERO_DATA")
        return False

    print(f"Found {len(hero_rarities)} heroes with rarity data")

    # Extract current heroes array
    heroes_match = re.search(r'const heroes = \[(.*?)\];', content, re.DOTALL)
    if not heroes_match:
        print("Error: Could not find heroes array in script.js")
        return False

    # Extract individual hero names from the array
    heroes_content = heroes_match.group(1)
    heroes = re.findall(r"'([^']+)'", heroes_content)

    print(f"Found {len(heroes)} heroes in array")

    # Sort heroes by rarity
    print("\nSorting heroes by rarity...")
    sorted_heroes = sort_heroes_by_rarity(heroes, hero_rarities)

    # Print rarity distribution
    rarity_counts = {}
    for hero in sorted_heroes:
        rarity = hero_rarities.get(hero, 'Unknown')
        rarity_counts[rarity] = rarity_counts.get(rarity, 0) + 1

    print("\nRarity distribution:")
    for rarity in ['L++', 'L+', 'L', 'Rare', 'Unknown']:
        count = rarity_counts.get(rarity, 0)
        if count > 0:
            print(f"  {rarity}: {count} heroes")

    # Format the new heroes array
    new_heroes_array = format_heroes_array(sorted_heroes, hero_rarities)

    # Replace the old heroes array with the new sorted one
    new_content = re.sub(
        r'// Hero data.*?\nconst heroes = \[.*?\];',
        new_heroes_array,
        content,
        flags=re.DOTALL
    )

    # Write back to file
    with open(script_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("\n[SUCCESS] Heroes array updated and sorted by rarity!")
    return True

def main():
    script_path = 'script.js'
    print("=" * 60)
    print("Sort Heroes by Rarity")
    print("=" * 60)
    print()

    if update_heroes_array(script_path):
        print("\nDone! Heroes are now sorted by rarity (L++ to Unknown) then alphabetically.")
        print("Refresh your browser to see the updated hero order.")
    else:
        print("\n[ERROR] Failed to update heroes array")

if __name__ == '__main__':
    main()
