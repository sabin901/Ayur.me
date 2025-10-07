import pdfplumber
import re
import json
import requests
import os

PDF_URL = "https://ia802808.us.archive.org/21/items/TheCompleteBookOfAyurvedicHomeRemedies/The%20Complete%20Book%20of%20Ayurvedic%20Home%20Remedies.pdf"
PDF_PATH = "The_Complete_Book_of_Ayurvedic_Home_Remedies.pdf"
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../backend/data/diseases_lad.json')

# Download the PDF if not present
def download_pdf():
    if not os.path.exists(PDF_PATH):
        print("Downloading PDF...")
        r = requests.get(PDF_URL)
        with open(PDF_PATH, "wb") as f:
            f.write(r.content)
        print("Downloaded PDF.")
    else:
        print("PDF already exists.")

def extract_diseases():
    print("Extracting diseases from PDF...")
    diseases = []
    with pdfplumber.open(PDF_PATH) as pdf:
        # Start from page 120 (0-indexed)
        text = ""
        for i in range(120, len(pdf.pages)):
            page_text = pdf.pages[i].extract_text()
            if page_text:
                text += page_text + "\n"

    # Find the start of the encyclopedia section (first disease: Allergies)
    start = text.find("Allergies")
    if start == -1:
        print("Could not find 'Allergies' heading in PDF.")
        return
    encyclopedia = text[start:]

    # Split by disease headings (capitalized, possibly with spaces, e.g., 'Allergies', 'Anemia', etc.)
    entries = re.split(r"\n([A-Z][a-zA-Z\s\-\(\)\/]+)\n", encyclopedia)
    for i in range(1, len(entries), 2):
        name = entries[i].strip()
        content = entries[i+1].strip()
        # Extract symptoms, causes, treatments, diet, lifestyle heuristically
        symptoms = re.findall(r"Symptoms?:\s*(.*?)(?:\n|$)", content, re.IGNORECASE)
        causes = re.findall(r"Causes?:\s*(.*?)(?:\n|$)", content, re.IGNORECASE)
        treatments = re.findall(r"(?:Remedy|Treatment|Home Remedy|Ayurvedic Remedy):?(.*?)(?:\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
        diet = re.findall(r"Diet:?(.*?)(?:\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
        lifestyle = re.findall(r"Lifestyle:?(.*?)(?:\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
        disease = {
            "name": name,
            "symptoms": [s.strip() for s in symptoms[0].split(';')] if symptoms else [],
            "causes": [c.strip() for c in causes[0].split(';')] if causes else [],
            "treatments": [{"type": "Home Remedy", "name": t.strip()} for t in treatments if t.strip()],
            "dietInclude": [d.strip() for d in diet[0].split(';')] if diet else [],
            "dietAvoid": [],
            "lifestyle": [l.strip() for l in lifestyle[0].split(';')] if lifestyle else [],
            "source": "The Complete Book of Ayurvedic Home Remedies"
        }
        diseases.append(disease)
    print(f"Extracted {len(diseases)} diseases.")
    with open(OUTPUT_JSON, "w") as f:
        json.dump(diseases, f, indent=2)
    print(f"Saved to {OUTPUT_JSON}")

if __name__ == "__main__":
    download_pdf()
    extract_diseases() 