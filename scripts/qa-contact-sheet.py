"""Create a compact visual index from full-page browser captures."""

from pathlib import Path
from PIL import Image, ImageDraw
import sys

out = Path(sys.argv[1])
paths = [Path(p) for p in sys.argv[2:]]
tile_w, tile_h, label_h = 300, 188, 26
sheet = Image.new('RGB', (tile_w * len(paths), label_h + tile_h * 5), '#ddd')
draw = ImageDraw.Draw(sheet)
for col, path in enumerate(paths):
    image = Image.open(path).convert('RGB')
    draw.text((col * tile_w + 8, 7), path.stem, fill='#111')
    crop_h = min(image.height, round(image.width * tile_h / tile_w))
    travel = max(0, image.height - crop_h)
    for row, fraction in enumerate((0, .25, .5, .75, 1)):
        y = round(travel * fraction)
        frame = image.crop((0, y, image.width, y + crop_h)).resize((tile_w, tile_h), Image.Resampling.LANCZOS)
        sheet.paste(frame, (col * tile_w, label_h + row * tile_h))
out.parent.mkdir(parents=True, exist_ok=True)
sheet.save(out, optimize=True)
print(out)
