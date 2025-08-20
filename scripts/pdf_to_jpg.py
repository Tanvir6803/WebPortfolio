import fitz  # PyMuPDF
from pathlib import Path

pdf_path = Path("public/Tanvir_Singh_Resume.pdf")   # existing resume file
out_path = Path("public/resume_preview.jpg")        # target image

doc = fitz.open(pdf_path)
page = doc.load_page(0)                             # first page
zoom = 2.5                                          # quality
mat = fitz.Matrix(zoom, zoom)
pix = page.get_pixmap(matrix=mat, alpha=False)     
pix.save(out_path)
print(f"Saved: {out_path.resolve()}")
