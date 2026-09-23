"""Compose an editorial cover from the sanitized real Telegram capture.

This never redraws or alters the Telegram UI; it only scales/crops the capture.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'projects/support-rag/assets'
source = Image.open(ASSETS/'telegram-support-sanitized.png').convert('RGB')
source.crop((590, 135, 1245, 1040)).save(ASSETS/'telegram-support-detail.png', quality=95)

paper = (235, 234, 226)
violet = (60, 26, 71)
ink = (27, 28, 28)
canvas = Image.new('RGB', (1600, 1000), paper)
draw = ImageDraw.Draw(canvas)
font_path = ROOT/'site/media/Manrope.ttf'
font_title = ImageFont.truetype(font_path, 156)
font_body = ImageFont.truetype(font_path, 26)
font_meta = ImageFont.truetype(font_path, 18)
draw.line((72, 70, 1528, 70), fill=(155, 151, 146), width=2)
draw.text((72, 83), 'REAL TELEGRAM / SANITIZED', font=font_meta, fill=violet)
draw.text((72, 145), 'AI SUPPORT', font=font_title, fill=ink, stroke_width=0)
draw.text((78, 330), 'АККАУНТ ПОДДЕРЖКИ  →  TELEGRAM  →  RAG  →  ОПЕРАТОР', font=font_body, fill=violet)
draw.rectangle((72, 390, 1528, 399), fill=violet)

width = 1330
height = round(source.height * width / source.width)
shot = source.resize((width, height), Image.Resampling.LANCZOS)
canvas.paste(shot, (198, 446))
draw.rectangle((198, 446, 1528, 446 + height), outline=(87, 80, 91), width=2)
draw.rectangle((72, 445, 170, 1000), fill=violet)
draw.text((94, 474), '01', font=ImageFont.truetype(font_path, 48), fill=paper)
canvas.save(ASSETS/'ai-support-cover.png', optimize=True)
