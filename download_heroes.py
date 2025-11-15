import requests
import os
from pathlib import Path

# Create new folder for downloaded heroes
output_folder = Path(r"C:\Users\B\Videos\Projects\7k Gearing\Downloaded Hero Portraits")
output_folder.mkdir(exist_ok=True)

# Complete list of heroes with their image URLs
heroes = [
    ("Amelia", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_366.png"),
    ("Kagura", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_369.png"),
    ("Klahan", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_360.png"),
    ("Miho", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_363.png"),
    ("Orly", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_354.png"),
    ("Daisy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_357.png"),
    ("Colt", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_351.png"),
    ("Biscuit", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_336.png"),
    ("Platin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_345.png"),
    ("Karma", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_342.png"),
    ("Rin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_339.png"),
    ("Mercure", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_333.png"),
    ("Yeonhee", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_330.png"),
    ("Taka", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_327.png"),
    ("Teo", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_324.png"),
    ("Fai", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_315.png"),
    ("Rosie", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_318.png"),
    ("Juri", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_321.png"),
    ("Evan", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_3.png"),
    ("Karin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_6.png"),
    ("Rudy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_9.png"),
    ("Rachel", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_12.png"),
    ("Eileene", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_15.png"),
    ("Spike", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_18.png"),
    ("Jave", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_21.png"),
    ("Kris", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_24.png"),
    ("Dellons", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_27.png"),
    ("Vanessa", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_30.png"),
    ("Ace", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_33.png"),
    ("Silvesta", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_36.png"),
    ("Aragon", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_39.png"),
    ("Ariel", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_42.png"),
    ("Alice", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_45.png"),
    ("Bane", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_48.png"),
    ("Espada", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_51.png"),
    ("Ellin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_54.png"),
    ("Heavenia", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_57.png"),
    ("Hellenia", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_60.png"),
    ("Ellen", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_63.png"),
    ("Karon", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_66.png"),
    ("Catty", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_69.png"),
    ("Chloe", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_72.png"),
    ("Coco", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_75.png"),
    ("Sieg", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_78.png"),
    ("Jane", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_81.png"),
    ("Jupy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_84.png"),
    ("Joker", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_87.png"),
    ("Sylvia", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_90.png"),
    ("Jin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_93.png"),
    ("Snipper", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_96.png"),
    ("Shane", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_99.png"),
    ("Sera", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_102.png"),
    ("Chancellor", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_105.png"),
    ("Nia", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_108.png"),
    ("Knox", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_111.png"),
    ("Noho", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_114.png"),
    ("Pascal", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_117.png"),
    ("Ballista", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_120.png"),
    ("Victoria", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_123.png"),
    ("Black Rose", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_126.png"),
    ("Velika", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_129.png"),
    ("May", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_132.png"),
    ("Yui", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_135.png"),
    ("Yuri", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_138.png"),
    ("Lania", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_141.png"),
    ("Li", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_144.png"),
    ("Lina", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_147.png"),
    ("Rook", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_150.png"),
    ("Lucy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_153.png"),
    ("Ruri", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_156.png"),
    ("Rei", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_159.png"),
    ("Asura", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_162.png"),
    ("Soi", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_165.png"),
    ("Bi Dam", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_168.png"),
    ("Feng Yan", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_171.png"),
    ("Yu Shin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_174.png"),
    ("Ahkan", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_177.png"),
    ("Aaron", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_180.png"),
    ("Taurus", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_183.png"),
    ("Ichi", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_186.png"),
    ("Wendy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_189.png"),
    ("Kai", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_192.png"),
    ("Drillo", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_195.png"),
    ("Guppy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_198.png"),
    ("Cleo", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_201.png"),
    ("Clops", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_204.png"),
    ("Kohkun", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_207.png"),
    ("Sarah", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_210.png"),
    ("Jas", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_213.png"),
    ("Jak", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_216.png"),
    ("Jumon", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_219.png"),
    ("Shiro", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_222.png"),
    ("Syllops", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_225.png"),
    ("Skud", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_228.png"),
    ("Skull", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_231.png"),
    ("Smoky", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_234.png"),
    ("Cellops", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_237.png"),
    ("Charles", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_240.png"),
    ("Derek", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_243.png"),
    ("Toto", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_246.png"),
    ("Nami", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_249.png"),
    ("Howl", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_252.png"),
    ("Happy", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_255.png"),
    ("Babel", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_258.png"),
    ("Baron", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_261.png"),
    ("Pooki", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_264.png"),
    ("Fruna", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_267.png"),
    ("Frose", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_270.png"),
    ("Beskin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_273.png"),
    ("Pepe", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_276.png"),
    ("Bella", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_279.png"),
    ("Hokin", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_282.png"),
    ("Popo", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_285.png"),
    ("Pon", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_288.png"),
    ("Yumi", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_291.png"),
    ("Rocky", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_294.png"),
    ("Rahkun", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_297.png"),
    ("Ricky", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_300.png"),
    ("Reaper", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_303.png"),
    ("Leo", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_306.png"),
    ("Rowl", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_309.png"),
    ("Loto", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_312.png"),
    ("Kyrielle", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_348.png"),
    ("Aquila", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_372.png"),
    ("Kyle", "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_375.png"),
]

print(f"Downloading {len(heroes)} hero portraits...")
print(f"Output folder: {output_folder}")

success_count = 0
failed_heroes = []

for hero_name, url in heroes:
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            file_path = output_folder / f"{hero_name}.png"
            with open(file_path, 'wb') as f:
                f.write(response.content)
            print(f"[OK] Downloaded: {hero_name}")
            success_count += 1
        else:
            print(f"[FAIL] Failed ({response.status_code}): {hero_name}")
            failed_heroes.append((hero_name, f"HTTP {response.status_code}"))
    except Exception as e:
        print(f"[ERROR] Error downloading {hero_name}: {str(e)}")
        failed_heroes.append((hero_name, str(e)))

print(f"\n{'='*60}")
print(f"Download Complete!")
print(f"Successfully downloaded: {success_count}/{len(heroes)} heroes")

if failed_heroes:
    print(f"\nFailed downloads ({len(failed_heroes)}):")
    for hero, error in failed_heroes:
        print(f"  - {hero}: {error}")
else:
    print("\nAll heroes downloaded successfully!")
