"""
Update hero rarities based on GameWith grade system
"""
import os
import re

# Define hero rarity mappings based on GameWith grades
HERO_RARITY = {
    # L++ (Special top tier)
    'Fai': 'L++',
    'Juri': 'L++',
    'Rosie': 'L++',

    # L+ (Legendary SP grade)
    'Kagura': 'L+',
    'Colt': 'L+',
    'Karma': 'L+',
    'Rin': 'L+',
    'Mercure': 'L+',
    'Yeonhee': 'L+',
    'Teo': 'L+',
    'Jave': 'L+',

    # L (Legendary grade)
    'Amelia': 'L',
    'Klahan': 'L',
    'Miho': 'L',
    'Orly': 'L',
    'Daisy': 'L',
    'Biscuit': 'L',
    'Platin': 'L',
    'Taka': 'L',
    'Kris': 'L',
    'Dellons': 'L',
    'Vanessa': 'L',
    'Ace': 'L',
    'Silvesta': 'L',
    'Shane': 'L',
    'Pascal': 'L',
    'Lina': 'L',
    'Leo': 'L',

    # Rare (Rare grade)
    'Evan': 'Rare',
    'Karin': 'Rare',
    'Rudy': 'Rare',
    'Rachel': 'Rare',
    'Eileene': 'Rare',
    'Spike': 'Rare',
    'Aragon': 'Rare',
    'Ariel': 'Rare',
    'Alice': 'Rare',
    'Bane': 'Rare',
    'Espada': 'Rare',
    'Heavenia': 'Rare',
    'Hellenia': 'Rare',
    'Karon': 'Rare',
    'Chloe': 'Rare',
    'Sieg': 'Rare',
    'Joker': 'Rare',
    'Sylvia': 'Rare',
    'Jin': 'Rare',
    'Snipper': 'Rare',
    'Sera': 'Rare',
    'Chancellor': 'Rare',
    'Nia': 'Rare',
    'Knox': 'Rare',
    'Noho': 'Rare',
    'Ballista': 'Rare',
    'Victoria': 'Rare',
    'Black Rose': 'Rare',
    'May': 'Rare',
    'Yui': 'Rare',
    'Yuri': 'Rare',
    'Lania': 'Rare',
    'Li': 'Rare',
    'Rook': 'Rare',
    'Lucy': 'Rare',
    'Ruri': 'Rare',
    'Rei': 'Rare',
    'Asura': 'Rare',
    'Soi': 'Rare',
    'Bi Dam': 'Rare',
    'Feng Yan': 'Rare',
    'Yu Shin': 'Rare',
    'Sarah': 'Rare',
    'Cleo': 'Rare',
    'Jane': 'Rare',
    'Jupy': 'Rare',
    'Catty': 'Rare',
    'Rahkun': 'Rare',

    # Heroes not in GameWith list (keeping as Unknown for now)
    'Aquila': 'Unknown',
    'Hokin': 'Unknown',
    'Kyle': 'Unknown',
    'Kyrielle': 'Unknown',
}

def update_hero_rarity(filepath, hero_name, new_rarity):
    """Update the rarity in a hero data file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace the rarity line
    pattern = r'(Rarity:\s*)(.+)'
    new_content = re.sub(pattern, f'\\1{new_rarity}', content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    hero_data_dir = 'hero_data'

    print("=" * 60)
    print("Update Hero Rarities Based on GameWith Grades")
    print("=" * 60)
    print()

    if not os.path.exists(hero_data_dir):
        print(f"Error: {hero_data_dir} directory not found")
        return

    # Get all .txt files
    hero_files = [f for f in os.listdir(hero_data_dir) if f.endswith('.txt')]

    print(f"Found {len(hero_files)} hero files\n")

    updated_count = 0
    rarity_counts = {'L++': 0, 'L+': 0, 'L': 0, 'Rare': 0, 'Unknown': 0}

    for filename in sorted(hero_files):
        hero_name = filename.replace('.txt', '')
        filepath = os.path.join(hero_data_dir, filename)

        # Get the rarity for this hero
        rarity = HERO_RARITY.get(hero_name, 'Unknown')
        rarity_counts[rarity] += 1

        # Update the file
        if update_hero_rarity(filepath, hero_name, rarity):
            print(f"[+] {hero_name}: {rarity}")
            updated_count += 1
        else:
            print(f"[!] {hero_name}: Failed to update")

    print(f"\n{'='*60}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} heroes")
    print(f"\nRarity distribution:")
    print(f"  L++: {rarity_counts['L++']} heroes")
    print(f"  L+: {rarity_counts['L+']} heroes")
    print(f"  L: {rarity_counts['L']} heroes")
    print(f"  Rare: {rarity_counts['Rare']} heroes")
    print(f"  Unknown: {rarity_counts['Unknown']} heroes")

if __name__ == '__main__':
    main()
