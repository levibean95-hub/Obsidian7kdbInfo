import requests
from PIL import Image
from io import BytesIO

# Test different image URLs
test_urls = {
    "Ace profile": "https://img.gamewith.net/jp/img/bf73e36a400e31ca181a838802896e41.png",
    "Ace chara_33": "https://img.gamewith.net/jp/article_tools/sevenknights-rebirth/gacha/chara_33.png",
}

for name, url in test_urls.items():
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            print(f"{name}: {img.size[0]}x{img.size[1]} pixels")
        else:
            print(f"{name}: Failed (HTTP {response.status_code})")
    except Exception as e:
        print(f"{name}: Error - {e}")
