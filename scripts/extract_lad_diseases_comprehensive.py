import pdfplumber
import re
import json
import os
from typing import List, Dict, Any

PDF_PATH = "The_Complete_Book_of_Ayurvedic_Home_Remedies.pdf"
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../backend/data/diseases_lad_comprehensive.json')

def extract_diseases_from_lad_pdf():
    """
    Extract all diseases from Dr. Vasant Lad's "The Complete Book of Ayurvedic Home Remedies"
    """
    print("Extracting diseases from Dr. Lad's PDF...")
    
    diseases = []
    disease_id_counter = 1
    
    with pdfplumber.open(PDF_PATH) as pdf:
        # Extract text from the encyclopedia section (starting around page 120)
        text = ""
        for i in range(120, len(pdf.pages)):
            page_text = pdf.pages[i].extract_text()
            if page_text:
                text += page_text + "\n"
    
    # Find the start of the disease encyclopedia
    # Look for common disease patterns
    disease_patterns = [
        r"\n([A-Z][a-zA-Z\s\-\(\)\/]+)\n(?:Symptoms?|Causes?|Treatment|Remedy|Diet|Lifestyle)",
        r"\n([A-Z][a-zA-Z\s\-\(\)\/]+)\n(?:[A-Z][a-z]+:)", 
    ]
    
    # Split text into potential disease sections
    sections = re.split(r"\n([A-Z][A-Z\s\-\(\)\/]+)\n", text)
    
    current_disease = None
    current_content = ""
    
    for i, section in enumerate(sections):
        if i % 2 == 0:  # Content
            if current_disease:
                current_content += section
        else:  # Potential disease name
            # Check if this looks like a disease name
            disease_name = section.strip()
            
            # Skip if it's clearly not a disease
            skip_keywords = [
                'TREATMENT', 'HERBAL', 'REMEDIES', 'DIETARY', 'LIFESTYLE', 
                'IMPORTANT', 'CAUTION', 'NOTE', 'GUIDELINES', 'CHANGES',
                'AVOID', 'BLOCK', 'USE', 'WATCH', 'PURGATION', 'VOMITING',
                'BLOOD', 'BASTI', 'THERAPY', 'HEALING'
            ]
            
            if any(keyword in disease_name.upper() for keyword in skip_keywords):
                continue
                
            # If we have a previous disease, save it
            if current_disease and current_content.strip():
                disease_data = parse_disease_content(current_disease, current_content, disease_id_counter)
                if disease_data:
                    diseases.append(disease_data)
                    disease_id_counter += 1
            
            # Start new disease
            current_disease = disease_name
            current_content = ""
    
    # Don't forget the last disease
    if current_disease and current_content.strip():
        disease_data = parse_disease_content(current_disease, current_content, disease_id_counter)
        if disease_data:
            diseases.append(disease_data)
    
    print(f"Extracted {len(diseases)} diseases from Dr. Lad's book")
    
    # Save to JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(diseases, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {OUTPUT_JSON}")
    return diseases

def parse_disease_content(disease_name: str, content: str, disease_id: int) -> Dict[str, Any]:
    """
    Parse disease content and extract structured information
    """
    # Clean up the disease name
    disease_name = disease_name.strip()
    
    # Extract symptoms
    symptoms = []
    symptom_patterns = [
        r"Symptoms?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)",
        r"Symptoms?:\s*(.*?)(?=\n\n|$)",
    ]
    for pattern in symptom_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
        if matches:
            symptoms_text = matches[0].strip()
            symptoms = [s.strip() for s in re.split(r'[;,\n]', symptoms_text) if s.strip()]
            break
    
    # Extract causes
    causes = []
    cause_patterns = [
        r"Causes?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)",
        r"Causes?:\s*(.*?)(?=\n\n|$)",
    ]
    for pattern in cause_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
        if matches:
            causes_text = matches[0].strip()
            causes = [c.strip() for c in re.split(r'[;,\n]', causes_text) if c.strip()]
            break
    
    # Extract treatments/remedies
    treatments = []
    treatment_patterns = [
        r"(?:Treatment|Remedy|Home Remedy|Ayurvedic Remedy):\s*(.*?)(?=\n[A-Z][a-z]+:|$)",
        r"(?:Treatment|Remedy|Home Remedy|Ayurvedic Remedy):\s*(.*?)(?=\n\n|$)",
    ]
    for pattern in treatment_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
        if matches:
            for match in matches:
                treatment_text = match.strip()
                if treatment_text:
                    treatments.append({
                        "type": "Home Remedy",
                        "name": f"Treatment for {disease_name}",
                        "description": treatment_text,
                        "source": "Dr. Vasant Lad"
                    })
            break
    
    # Extract diet information
    diet_include = []
    diet_avoid = []
    diet_patterns = [
        r"Diet:\s*(.*?)(?=\n[A-Z][a-z]+:|$)",
        r"Diet:\s*(.*?)(?=\n\n|$)",
    ]
    for pattern in diet_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
        if matches:
            diet_text = matches[0].strip()
            # Simple heuristic: foods mentioned positively
            positive_foods = ['ginger', 'turmeric', 'honey', 'ghee', 'milk', 'rice', 'barley', 'vegetables', 'fruits']
            for food in positive_foods:
                if food in diet_text.lower():
                    diet_include.append(food.title())
            break
    
    # Extract lifestyle recommendations
    lifestyle = []
    lifestyle_patterns = [
        r"Lifestyle:\s*(.*?)(?=\n[A-Z][a-z]+:|$)",
        r"Lifestyle:\s*(.*?)(?=\n\n|$)",
    ]
    for pattern in lifestyle_patterns:
        matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
        if matches:
            lifestyle_text = matches[0].strip()
            lifestyle = [l.strip() for l in re.split(r'[;,\n]', lifestyle_text) if l.strip()]
            break
    
    # Determine dosha based on symptoms and content
    dosha = determine_dosha(symptoms, causes, content)
    
    # Determine category based on disease name and symptoms
    category = determine_category(disease_name, symptoms)
    
    # Create disease object
    disease_data = {
        "diseaseId": f"LAD_{disease_id:04d}",
        "name": disease_name,
        "sanskritName": "",  # Will be filled if found
        "englishName": disease_name,
        "dosha": dosha,
        "symptoms": symptoms,
        "causes": causes,
        "treatments": treatments,
        "diet": {
            "include": diet_include,
            "avoid": diet_avoid
        },
        "lifestyle": lifestyle,
        "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
        "category": category,
        "severity": "Moderate",  # Default
        "isActive": True,
        "modernCorrelation": "",
        "sanskrit": ""
    }
    
    return disease_data

def determine_dosha(symptoms: List[str], causes: List[str], content: str) -> List[str]:
    """
    Determine dosha based on symptoms, causes, and content
    """
    dosha_keywords = {
        'Vata': ['dry', 'cold', 'light', 'mobile', 'rough', 'constipation', 'anxiety', 'insomnia', 'pain'],
        'Pitta': ['hot', 'burning', 'sharp', 'acidic', 'inflammation', 'fever', 'anger', 'irritation'],
        'Kapha': ['heavy', 'cold', 'oily', 'sweet', 'sticky', 'congestion', 'lethargy', 'weight gain']
    }
    
    text = ' '.join(symptoms + causes + [content]).lower()
    dosha_scores = {'Vata': 0, 'Pitta': 0, 'Kapha': 0}
    
    for dosha, keywords in dosha_keywords.items():
        for keyword in keywords:
            if keyword in text:
                dosha_scores[dosha] += 1
    
    # Return doshas with highest scores
    max_score = max(dosha_scores.values())
    if max_score == 0:
        return ['Vata']  # Default
    
    return [dosha for dosha, score in dosha_scores.items() if score == max_score]

def determine_category(disease_name: str, symptoms: List[str]) -> str:
    """
    Determine disease category based on name and symptoms
    """
    text = (disease_name + ' ' + ' '.join(symptoms)).lower()
    
    category_keywords = {
        'Digestive': ['stomach', 'digestion', 'appetite', 'nausea', 'vomiting', 'diarrhea', 'constipation'],
        'Respiratory': ['cough', 'breathing', 'asthma', 'bronchitis', 'cold', 'sinus'],
        'Skin': ['skin', 'rash', 'itching', 'eczema', 'psoriasis', 'acne'],
        'Mental Health': ['anxiety', 'depression', 'stress', 'insomnia', 'mood'],
        'Cardiovascular': ['heart', 'blood pressure', 'chest pain', 'palpitation'],
        'Joints': ['joint', 'arthritis', 'pain', 'stiffness', 'swelling'],
        'Neurological': ['headache', 'migraine', 'numbness', 'paralysis', 'seizure'],
        'Endocrine': ['diabetes', 'thyroid', 'hormone', 'sugar'],
        'Urogenital': ['urine', 'kidney', 'bladder', 'prostate', 'menstrual'],
        'Eye': ['eye', 'vision', 'blindness', 'cataract'],
        'Ear': ['ear', 'hearing', 'tinnitus', 'deafness'],
        'Dental': ['tooth', 'dental', 'gum', 'mouth']
    }
    
    for category, keywords in category_keywords.items():
        if any(keyword in text for keyword in keywords):
            return category
    
    return 'General'

if __name__ == "__main__":
    diseases = extract_diseases_from_lad_pdf()
    print(f"\nExtraction complete! Found {len(diseases)} diseases.")
    print("\nSample diseases extracted:")
    for i, disease in enumerate(diseases[:5]):
        print(f"{i+1}. {disease['name']} - {disease['category']} - {', '.join(disease['dosha'])}") 