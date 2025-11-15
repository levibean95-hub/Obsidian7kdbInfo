import os
import re

# Parsed hero effects from the table
hero_effects = {
    'Amelia': ['Effect Hit Rate Boost', 'Unable to Recover', 'Debuff Removal', 'Revive'],
    'Kagura': ['Crit Damage Boost', 'Physical Damage Boost', 'Physical Vulnerability', 'Incoming Healing Reduction', 'Petrify', 'Debuff Removal', 'Indomitable', 'Heal'],
    'Klahan': ['Physical Attack Boost', 'Physical Damage Boost', 'All Damage Reduction', 'Damage Immunity', 'Heal', 'Pierce'],
    'Miho': ['Weakness Hit Damage Boost', 'Magic Vulnerability', 'Reduced Buff Duration', 'Debuff Removal', 'Guts'],
    'Orly': ['Crit Rate Boost', 'Crit Damage Boost', 'Defense Reduction', 'Buff Removal', 'Debuff Removal', 'Damage Nullification', 'Continuous Healing'],
    'Daisy': ['Max HP-Based Damage', 'Magic Attack Boost', 'Petrify Immunity', 'Buff Removal', 'Barrier'],
    'Colt': ['Effect Hit Rate Boost', 'All Attack Reduction', 'Guts', 'Camouflage', 'Bomb'],
    'Biscuit': ['Defense-Based Damage', 'Weakness Hit Chance Boost', 'Quintuple-Target Attack Resistance', 'Increase damage to boss targets', 'Defense Reduction', 'Buff Removal'],
    'Platin': ['Defense-Based Damage', 'Fixed Damage', 'All Attack Reduction', 'Buff Removal', 'Heal', 'Damage-Based Healing', 'HP Alteration'],
    'Karma': ['Defense-Based Damage', 'Defense Boost', 'All Damage Boost', 'Block Rate Boost', 'All Damage Reduction', 'Pierce', 'Ignore Defense'],
    'Rin': ['Increased Miss Chance', 'Reduced Buff Duration', 'Damage Nullification', 'Revive', 'Barrier', 'Cooldown Reset', 'Confusion'],
    'Mercure': ['Effect Resist Reduction', 'Incoming Healing Reduction', 'Stun', 'Blessing', 'Barrier', 'Magic Reflux'],
    'Yeonhee': ['Max HP-Based Damage', 'Magic Attack Boost', 'Magic Damage Boost', 'Sleep', 'Damage Nullification', 'Ignore Defense'],
    'Taka': ['Crit Damage Boost', 'Physical Vulnerability', 'Damage Nullification', 'Ignore Defense'],
    'Teo': ['Physical Attack Boost', 'Crit Rate Boost', 'Reduced Buff Duration', 'Damage Nullification', 'Immortality', 'Pierce', 'Cooldown Reset'],
    'Fai': ['Max HP-Based Damage', 'Defense Reduction', 'Physical Vulnerability', 'Burn', 'Buff Removal', 'Revive', 'Barrier', 'Execution'],
    'Rosie': ['Self Max HP-Based Damage', 'Effect Probability Boost', 'Effect Resist Reduction', 'Death', 'Reduced Buff Duration', 'Damage Immunity', 'Guts', 'Revive'],
    'Juri': ['Max HP-Based Damage', 'Defense Reduction', 'Crowd Control Immunity', 'Immortality', 'Follow-Up Attack', 'Souldeath'],
    'Rudy': ['Defense-Based Damage', 'Defense Boost', 'Damage Resistance', 'Stun', 'Crowd Control Immunity', 'Reduced Buff Duration', 'Debuff Removal', 'Link'],
    'Rachel': ['Weakness Hit Chance Boost', 'All Attack Reduction', 'Defense Reduction', 'All Damage Reduction', 'Physical Vulnerability', 'Burn', 'Revive'],
    'Eileene': ['Physical Attack Boost', 'Shock', 'Revive', 'Pierce'],
    'Spike': ['Self Max HP-Based Damage', 'Effect Hit Rate Boost', 'Effect Resist Boost', 'Freeze', 'Debuff Removal', 'Guts', 'Heal'],
    'Jave': ['Stun', 'Crowd Control Immunity', 'Burn', 'Counterattack', 'Pierce', 'Dragonflame'],
    'Kris': ['Death', 'Immortality', 'Heal', 'Cooldown Reset'],
    'Dellons': ['Physical Damage Boost', 'Silence', 'Damage Nullification'],
    'Vanessa': ['Defense Reduction', 'Magic Vulnerability', 'Petrify', 'Buff Removal', 'Damage Immunity', 'Pierce', 'Cooldown Increase'],
    'Ace': ['Physical Attack Boost', 'Defense Reduction', 'Physical Vulnerability', 'Incoming Healing Reduction', 'Reduced Buff Duration', 'Debuff Removal', 'Guts'],
    'Silvesta': ['Reduced Buff Duration', 'Blessing', 'Guts', 'Ignore Defense', 'Life Drain'],
    'Aragon': ['Defense-Based Damage', 'All Attack Reduction', 'Crit Damage Reduction', 'Stun', 'Reduced Buff Duration', 'Heal', 'Pierce', 'Cooldown Reduction'],
    'Alice': ['Defense Boost', 'Incoming Healing Boost', 'Heal', 'Continuous Healing'],
    'Espada': ['Max HP-Based Damage', 'Crit Rate Boost', 'Magic Damage Boost', 'Magic Resistance', 'Magic Vulnerability'],
    'Sieg': ['Physical Attack Boost', 'All Damage Reduction', 'Stun Immunity', 'Ignore Defense'],
    'Shane': ['Crit Rate Boost', 'Magic Resistance', 'Follow-Up Attack'],
    'Chancellor': ['Defense-Based Damage', 'Fixed Damage', 'All Attack Reduction', 'Defense Reduction', 'All Damage Reduction', 'Increased Miss Chance', 'Buff Removal', 'Damage Immunity', 'Heal'],
    'Nia': ['Effect Hit Rate Boost', 'Shock', 'Reduced Buff Duration', 'Barrier', 'Cooldown Increase'],
    'Pascal': ['Magic Attack Boost', 'Crit Rate Boost', 'Crit Damage Boost', 'Damage Nullification', 'Ignore Defense', 'Cooldown Reset'],
    'Ballista': ['Fixed Damage', 'Damage Nullification', 'Follow-Up Attack', 'Pierce'],
    'Ruri': ['Weakness Hit Chance Boost', 'Magic Damage Boost', 'Heal', 'Ignore Defense'],
    'Bi Dam': ['Physical Damage Boost', 'Bleed', 'Explosion'],
    'Yu Shin': ['Effect Hit Rate Boost', 'Effect Resist Reduction', 'Incoming Healing Reduction', 'Paralysis', 'Debuff Removal', 'Damage Immunity'],
    'Lina': ['All Damage Boost', 'Crit Damage Boost', 'Effect Resist Boost', 'Defense Reduction', 'Barrier', 'Heal'],
    'Rook': ['Self Max HP-Based Damage', 'Crit Rate Boost', 'Physical Resistance', 'Block Rate Boost', 'Barrier'],
}

def update_hero_effects(hero_name, effects):
    """Update the effects section in a hero data file."""
    file_path = os.path.join('hero_data', f'{hero_name}.txt')

    if not os.path.exists(file_path):
        print(f"Warning: File not found for {hero_name}")
        return False

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the EFFECTS section
    effects_pattern = r'(--- EFFECTS ---\n)(.*?)(\n\n--- )'

    # Create the new effects text
    effects_text = '\n'.join(effects) + '\n'

    # Replace the effects section
    new_content = re.sub(
        effects_pattern,
        r'\1' + effects_text + r'\3',
        content,
        flags=re.DOTALL
    )

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"[+] Updated {hero_name}")
        return True
    else:
        print(f"[-] No changes needed for {hero_name}")
        return False

def main():
    updated_count = 0
    not_found_count = 0

    print("Updating hero effects...\n")

    for hero_name, effects in sorted(hero_effects.items()):
        if update_hero_effects(hero_name, effects):
            updated_count += 1
        elif not os.path.exists(os.path.join('hero_data', f'{hero_name}.txt')):
            not_found_count += 1

    print(f"\n{'='*50}")
    print(f"Summary:")
    print(f"  Updated: {updated_count} heroes")
    print(f"  Not found: {not_found_count} heroes")
    print(f"{'='*50}")

if __name__ == '__main__':
    main()
