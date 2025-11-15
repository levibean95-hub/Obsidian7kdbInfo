import requests
from bs4 import BeautifulSoup
import time
from pathlib import Path
import re

# Output folder
output_folder = Path(r"C:\Users\B\Videos\Projects\7k Gearing\Hero Portraits")

# List of heroes we need
target_heroes = [
    "Ace", "Alice", "Amelia", "Aquila", "Aragon", "Ballista", "Bi Dam", "Biscuit",
    "Chancellor", "Colt", "Daisy", "Dellons", "Eileene", "Espada", "Fai", "Jave",
    "Juri", "Kagura", "Karma", "Klahan", "Kris", "Kyle", "Kyrielle", "Lina",
    "Mercure", "Miho", "Nia", "Orly", "Pascal", "Platin", "Rachel", "Rin",
    "Rook", "Rosie", "Rudy", "Ruri", "Shane", "Sieg", "Silvesta", "Spike",
    "Taka", "Teo", "Vanessa", "Yeonhee", "Yu Shin"
]

print(f"Fetching character page URLs from GameWith tier list...")

# Step 1: Get the tier list page and extract character links
try:
    response = requests.get("https://gamewith.net/sevenknights-rebirth/70396", timeout=15)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all links that contain character page URLs
    character_links = {}
    for link in soup.find_all('a', href=True):
        href = link.get('href')
        # Character pages are typically /sevenknights-rebirth/XXXXX where XXXXX is a number
        if '/sevenknights-rebirth/' in href and href.split('/')[-1].isdigit():
            # Get the character name from the link text or nearby text
            link_text = link.get_text(strip=True)
            if link_text and len(link_text) > 0:
                # Clean up the name
                name = link_text.strip()
                if name in target_heroes:
                    full_url = f"https://gamewith.net{href}" if href.startswith('/') else href
                    character_links[name] = full_url

    print(f"Found {len(character_links)} character page links\n")

except Exception as e:
    print(f"Error fetching tier list: {e}")
    character_links = {}

# Step 2: For each character, fetch their page and extract the profile image
success_count = 0
failed_heroes = []

for hero_name in target_heroes:
    if hero_name not in character_links:
        # Try to search for the page if not found in the list
        print(f"[SKIP] No page link found for {hero_name}")
        failed_heroes.append((hero_name, "No page link found"))
        continue

    try:
        print(f"[FETCH] {hero_name}...", end=" ")
        char_url = character_links[hero_name]

        # Fetch the character page
        response = requests.get(char_url, timeout=15)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Look for the profile image - it's typically in an img tag with /jp/img/ path
        profile_img = None
        for img in soup.find_all('img'):
            src = img.get('src', '')
            if '/jp/img/' in src and '.png' in src:
                # This is likely the profile image
                profile_img = src
                break

        if profile_img:
            # Download the image
            if not profile_img.startswith('http'):
                profile_img = f"https:{profile_img}" if profile_img.startswith('//') else f"https://img.gamewith.net{profile_img}"

            img_response = requests.get(profile_img, timeout=15)
            if img_response.status_code == 200:
                file_path = output_folder / f"{hero_name}.png"
                with open(file_path, 'wb') as f:
                    f.write(img_response.content)
                print(f"[OK]")
                success_count += 1
            else:
                print(f"[FAIL] HTTP {img_response.status_code}")
                failed_heroes.append((hero_name, f"HTTP {img_response.status_code}"))
        else:
            print(f"[FAIL] No profile image found")
            failed_heroes.append((hero_name, "No profile image found"))

        # Be respectful to the server
        time.sleep(0.5)

    except Exception as e:
        print(f"[ERROR] {str(e)}")
        failed_heroes.append((hero_name, str(e)))

print(f"\n{'='*60}")
print(f"Download Complete!")
print(f"Successfully downloaded: {success_count}/{len(target_heroes)} hero portraits")

if failed_heroes:
    print(f"\nFailed downloads ({len(failed_heroes)}):")
    for hero, error in failed_heroes:
        print(f"  - {hero}: {error}")
else:
    print("\nAll hero portraits downloaded successfully!")
