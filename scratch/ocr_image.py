import sys
try:
    from PIL import Image
    import pytesseract
except ImportError:
    print("PIL or pytesseract not installed")
    sys.exit(0)

try:
    text = pytesseract.image_to_string(Image.open('/Users/faruknafizfazlioglu/.gemini/antigravity-ide/brain/f832a7c8-9e91-4b02-9471-d65eef3c281d/media__1782563880412.png'))
    print("--- OCR RESULTS ---")
    print(text)
except Exception as e:
    print("OCR failed:", e)
