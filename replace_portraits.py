import shutil
from pathlib import Path

# Source and destination folders
source = Path(r"C:\Users\B\Videos\Projects\7k Gearing\Downloaded Hero Portraits")
dest = Path(r"C:\Users\B\Videos\Projects\7k Gearing\Hero Portraits")

# List of existing heroes to replace
heroes = [
    "Ace", "Alice", "Amelia", "Aquila", "Aragon", "Ballista", "Bi Dam", "Biscuit",
    "Chancellor", "Colt", "Daisy", "Dellons", "Eileene", "Espada", "Fai", "Jave",
    "Juri", "Kagura", "Karma", "Klahan", "Kris", "Kyle", "Kyrielle", "Lina",
    "Mercure", "Miho", "Nia", "Orly", "Pascal", "Platin", "Rachel", "Rin",
    "Rook", "Rosie", "Rudy", "Ruri", "Shane", "Sieg", "Silvesta", "Spike",
    "Taka", "Teo", "Vanessa", "Yeonhee", "Yu Shin"
]

print(f"Replacing {len(heroes)} hero portraits...")
print(f"Source: {source}")
print(f"Destination: {dest}\n")

copied = 0
failed = []

for hero in heroes:
    source_file = source / f"{hero}.png"
    dest_file = dest / f"{hero}.png"

    try:
        if source_file.exists():
            shutil.copy2(source_file, dest_file)
            print(f"[OK] Replaced: {hero}.png")
            copied += 1
        else:
            print(f"[SKIP] Not found in source: {hero}.png")
            failed.append(hero)
    except Exception as e:
        print(f"[ERROR] Failed to copy {hero}.png: {e}")
        failed.append(hero)

print(f"\n{'='*60}")
print(f"Replacement Complete!")
print(f"Successfully replaced: {copied}/{len(heroes)} hero portraits")

if failed:
    print(f"\nFailed/skipped ({len(failed)}):")
    for hero in failed:
        print(f"  - {hero}")
else:
    print("\nAll hero portraits replaced successfully!")
