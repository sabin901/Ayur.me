import pdfplumber
import re
import json
import os
from typing import List, Dict, Any

PDF_PATH = "The_Complete_Book_of_Ayurvedic_Home_Remedies.pdf"
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../backend/data/diseases_lad_refined.json')

# Common disease names from Ayurvedic texts
COMMON_DISEASES = [
    'Allergies', 'Anemia', 'Arthritis', 'Asthma', 'Bronchitis', 'Cancer', 'Cataracts',
    'Colitis', 'Constipation', 'Cough', 'Depression', 'Diabetes', 'Diarrhea', 'Dysentery',
    'Eczema', 'Epilepsy', 'Fever', 'Gastritis', 'Gout', 'Headache', 'Heart Disease',
    'Hemorrhoids', 'Hepatitis', 'Hypertension', 'Indigestion', 'Insomnia', 'Jaundice',
    'Kidney Stones', 'Leukemia', 'Migraine', 'Nausea', 'Obesity', 'Osteoporosis',
    'Paralysis', 'Pneumonia', 'Psoriasis', 'Rheumatism', 'Sciatica', 'Sinusitis',
    'Skin Disease', 'Tuberculosis', 'Ulcer', 'Urinary Infection', 'Varicose Veins',
    'Vitiligo', 'Vomiting', 'Warts', 'Worms'
]

# Skip these non-disease entries
SKIP_KEYWORDS = [
    'TREATMENT', 'HERBAL', 'REMEDIES', 'DIETARY', 'LIFESTYLE', 'IMPORTANT', 'CAUTION',
    'NOTE', 'GUIDELINES', 'CHANGES', 'AVOID', 'BLOCK', 'USE', 'WATCH', 'PURGATION',
    'VOMITING', 'BLOOD', 'BASTI', 'THERAPY', 'HEALING', 'YOGA', 'MEDITATE', 'BREATHING',
    'EXERCISES', 'POSTURES', 'ASANAS', 'TYPES OF', 'METHODS', 'TECHNIQUES', 'PROCEDURES',
    'APPLICATION', 'PREPARATION', 'INGREDIENTS', 'FORMULA', 'RECIPE', 'DOSAGE',
    'FREQUENCY', 'DURATION', 'SCHEDULE', 'ROUTINE', 'PRACTICE', 'REGIMEN'
]

def extract_diseases_from_lad_pdf():
    """
    Extract actual diseases from Dr. Vasant Lad's book
    """
    print("Extracting diseases from Dr. Lad's PDF...")
    
    diseases = []
    disease_id_counter = 1
    
    with pdfplumber.open(PDF_PATH) as pdf:
        # Extract text from the encyclopedia section
        text = ""
        for i in range(120, len(pdf.pages)):
            page_text = pdf.pages[i].extract_text()
            if page_text:
                text += page_text + "\n"
    
    # Find disease sections more precisely
    # Look for patterns like "DISEASE NAME\nSymptoms:" or "DISEASE NAME\nCauses:"
    disease_sections = re.split(r'\n([A-Z][A-Z\s\-\(\)\/]+)\n(?:Symptoms?|Causes?|Treatment|Remedy|Diet|Lifestyle)', text)
    
    current_disease = None
    current_content = ""
    
    for i, section in enumerate(disease_sections):
        if i % 2 == 0:  # Content
            if current_disease:
                current_content += section
        else:  # Potential disease name
            disease_name = section.strip()
            
            # Skip if it's clearly not a disease
            if any(keyword in disease_name.upper() for keyword in SKIP_KEYWORDS):
                continue
            
            # Check if it looks like a real disease
            if not is_likely_disease(disease_name):
                continue
                
            # If we have a previous disease, save it
            if current_disease and current_content.strip():
                disease_data = parse_disease_content(current_disease, current_content, disease_id_counter)
                if disease_data and disease_data['symptoms']:  # Only save if we have symptoms
                    diseases.append(disease_data)
                    disease_id_counter += 1
            
            # Start new disease
            current_disease = disease_name
            current_content = ""
    
    # Don't forget the last disease
    if current_disease and current_content.strip():
        disease_data = parse_disease_content(current_disease, current_content, disease_id_counter)
        if disease_data and disease_data['symptoms']:
            diseases.append(disease_data)
    
    print(f"Extracted {len(diseases)} actual diseases from Dr. Lad's book")
    
    # Save to JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(diseases, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {OUTPUT_JSON}")
    return diseases

def is_likely_disease(name: str) -> bool:
    """
    Check if a name is likely to be a disease
    """
    name_lower = name.lower()
    
    # Check against common disease names
    for disease in COMMON_DISEASES:
        if disease.lower() in name_lower or name_lower in disease.lower():
            return True
    
    # Check for disease-like patterns
    disease_patterns = [
        r'\b(itis|osis|emia|algia|rrhagia|rrhea|plegia|trophy|pathy|oma|cele)\b',
        r'\b(pain|disease|disorder|syndrome|infection|inflammation)\b'
    ]
    
    for pattern in disease_patterns:
        if re.search(pattern, name_lower):
            return True
    
    # Check if it's a short, capitalized name (likely a disease)
    if len(name.split()) <= 3 and name.isupper():
        return True
    
    return False

def parse_disease_content(disease_name: str, content: str, disease_id: int) -> Dict[str, Any]:
    """
    Parse disease content and extract structured information
    """
    disease_name = disease_name.strip()
    
    # Extract symptoms
    symptoms = []
    symptom_matches = re.findall(r"Symptoms?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
    if symptom_matches:
        symptoms_text = symptom_matches[0].strip()
        symptoms = [s.strip() for s in re.split(r'[;,\n]', symptoms_text) if s.strip() and len(s.strip()) > 3]
    
    # Extract causes
    causes = []
    cause_matches = re.findall(r"Causes?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
    if cause_matches:
        causes_text = cause_matches[0].strip()
        causes = [c.strip() for c in re.split(r'[;,\n]', causes_text) if c.strip() and len(c.strip()) > 3]
    
    # Extract treatments
    treatments = []
    treatment_matches = re.findall(r"(?:Treatment|Remedy|Home Remedy|Ayurvedic Remedy):\s*(.*?)(?=\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
    if treatment_matches:
        for match in treatment_matches:
            treatment_text = match.strip()
            if treatment_text and len(treatment_text) > 10:
                treatments.append({
                    "type": "Home Remedy",
                    "name": f"Treatment for {disease_name}",
                    "description": treatment_text,
                    "source": "Dr. Vasant Lad"
                })
    
    # Extract diet information
    diet_include = []
    diet_avoid = []
    diet_matches = re.findall(r"Diet:\s*(.*?)(?=\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
    if diet_matches:
        diet_text = diet_matches[0].strip()
        # Look for positive and negative food mentions
        positive_foods = ['ginger', 'turmeric', 'honey', 'ghee', 'milk', 'rice', 'barley', 'vegetables', 'fruits', 'coconut']
        negative_foods = ['spicy', 'sour', 'alcohol', 'meat', 'fish', 'processed', 'fried']
        
        for food in positive_foods:
            if food in diet_text.lower():
                diet_include.append(food.title())
        
        for food in negative_foods:
            if food in diet_text.lower():
                diet_avoid.append(food.title())
    
    # Extract lifestyle recommendations
    lifestyle = []
    lifestyle_matches = re.findall(r"Lifestyle:\s*(.*?)(?=\n[A-Z][a-z]+:|$)", content, re.IGNORECASE | re.DOTALL)
    if lifestyle_matches:
        lifestyle_text = lifestyle_matches[0].strip()
        lifestyle = [l.strip() for l in re.split(r'[;,\n]', lifestyle_text) if l.strip() and len(l.strip()) > 3]
    
    # Determine dosha
    dosha = determine_dosha(symptoms, causes, content)
    
    # Determine category
    category = determine_category(disease_name, symptoms)
    
    # Determine severity
    severity = determine_severity(symptoms, causes, content)
    
    # Create disease object
    disease_data = {
        "diseaseId": f"LAD_{disease_id:04d}",
        "name": disease_name,
        "sanskritName": "",
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
        "severity": severity,
        "isActive": True,
        "modernCorrelation": get_modern_correlation(disease_name),
        "sanskrit": ""
    }
    
    return disease_data

def determine_dosha(symptoms: List[str], causes: List[str], content: str) -> List[str]:
    """Determine dosha based on symptoms, causes, and content"""
    dosha_keywords = {
        'Vata': ['dry', 'cold', 'light', 'mobile', 'rough', 'constipation', 'anxiety', 'insomnia', 'pain', 'trembling'],
        'Pitta': ['hot', 'burning', 'sharp', 'acidic', 'inflammation', 'fever', 'anger', 'irritation', 'redness'],
        'Kapha': ['heavy', 'cold', 'oily', 'sweet', 'sticky', 'congestion', 'lethargy', 'weight gain', 'swelling']
    }
    
    text = ' '.join(symptoms + causes + [content]).lower()
    dosha_scores = {'Vata': 0, 'Pitta': 0, 'Kapha': 0}
    
    for dosha, keywords in dosha_keywords.items():
        for keyword in keywords:
            if keyword in text:
                dosha_scores[dosha] += 1
    
    max_score = max(dosha_scores.values())
    if max_score == 0:
        return ['Vata']
    
    return [dosha for dosha, score in dosha_scores.items() if score == max_score]

def determine_category(disease_name: str, symptoms: List[str]) -> str:
    """Determine disease category"""
    text = (disease_name + ' ' + ' '.join(symptoms)).lower()
    
    category_keywords = {
        'Digestive': ['stomach', 'digestion', 'appetite', 'nausea', 'vomiting', 'diarrhea', 'constipation', 'ulcer', 'gastritis'],
        'Respiratory': ['cough', 'breathing', 'asthma', 'bronchitis', 'cold', 'sinus', 'pneumonia'],
        'Skin': ['skin', 'rash', 'itching', 'eczema', 'psoriasis', 'acne', 'warts'],
        'Mental Health': ['anxiety', 'depression', 'stress', 'insomnia', 'mood'],
        'Cardiovascular': ['heart', 'blood pressure', 'chest pain', 'palpitation', 'hypertension'],
        'Joints': ['joint', 'arthritis', 'pain', 'stiffness', 'swelling', 'gout', 'rheumatism'],
        'Neurological': ['headache', 'migraine', 'numbness', 'paralysis', 'seizure', 'epilepsy'],
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

def determine_severity(symptoms: List[str], causes: List[str], content: str) -> str:
    """Determine disease severity"""
    text = ' '.join(symptoms + causes + [content]).lower()
    
    severe_keywords = ['severe', 'acute', 'chronic', 'cancer', 'tumor', 'paralysis', 'coma', 'death']
    moderate_keywords = ['moderate', 'mild', 'manageable', 'treatable']
    
    if any(keyword in text for keyword in severe_keywords):
        return 'Severe'
    elif any(keyword in text for keyword in moderate_keywords):
        return 'Moderate'
    else:
        return 'Mild to Moderate'

def get_modern_correlation(disease_name: str) -> str:
    """Get modern medical correlation for disease"""
    correlations = {
        'Allergies': 'Allergic Rhinitis (ICD-10: J30)',
        'Anemia': 'Iron Deficiency Anemia (ICD-10: D50)',
        'Arthritis': 'Rheumatoid Arthritis (ICD-10: M06)',
        'Asthma': 'Bronchial Asthma (ICD-10: J45)',
        'Bronchitis': 'Acute Bronchitis (ICD-10: J20)',
        'Cancer': 'Malignant Neoplasms (ICD-10: C00-C97)',
        'Cataracts': 'Cataract (ICD-10: H25-H26)',
        'Colitis': 'Ulcerative Colitis (ICD-10: K51)',
        'Constipation': 'Constipation (ICD-10: K59.0)',
        'Cough': 'Chronic Cough (ICD-10: R05)',
        'Depression': 'Major Depressive Disorder (ICD-10: F32)',
        'Diabetes': 'Type 2 Diabetes (ICD-10: E11)',
        'Diarrhea': 'Diarrhea (ICD-10: R19.7)',
        'Dysentery': 'Bacillary Dysentery (ICD-10: A03)',
        'Eczema': 'Atopic Dermatitis (ICD-10: L20)',
        'Epilepsy': 'Epilepsy (ICD-10: G40)',
        'Fever': 'Fever (ICD-10: R50)',
        'Gastritis': 'Gastritis (ICD-10: K29)',
        'Gout': 'Gout (ICD-10: M10)',
        'Headache': 'Tension Headache (ICD-10: G44.2)',
        'Heart Disease': 'Coronary Artery Disease (ICD-10: I25)',
        'Hemorrhoids': 'Hemorrhoids (ICD-10: K64)',
        'Hepatitis': 'Viral Hepatitis (ICD-10: B15-B19)',
        'Hypertension': 'Hypertension (ICD-10: I10)',
        'Indigestion': 'Dyspepsia (ICD-10: K30)',
        'Insomnia': 'Insomnia (ICD-10: G47.0)',
        'Jaundice': 'Jaundice (ICD-10: R17)',
        'Kidney Stones': 'Nephrolithiasis (ICD-10: N20)',
        'Leukemia': 'Leukemia (ICD-10: C91-C95)',
        'Migraine': 'Migraine (ICD-10: G43)',
        'Nausea': 'Nausea and Vomiting (ICD-10: R11)',
        'Obesity': 'Obesity (ICD-10: E66)',
        'Osteoporosis': 'Osteoporosis (ICD-10: M80-M81)',
        'Paralysis': 'Paralysis (ICD-10: G83)',
        'Pneumonia': 'Pneumonia (ICD-10: J18)',
        'Psoriasis': 'Psoriasis (ICD-10: L40)',
        'Rheumatism': 'Rheumatoid Arthritis (ICD-10: M06)',
        'Sciatica': 'Sciatica (ICD-10: M54.3)',
        'Sinusitis': 'Sinusitis (ICD-10: J32)',
        'Skin Disease': 'Dermatitis (ICD-10: L30)',
        'Tuberculosis': 'Tuberculosis (ICD-10: A15)',
        'Ulcer': 'Peptic Ulcer (ICD-10: K27)',
        'Urinary Infection': 'Urinary Tract Infection (ICD-10: N39.0)',
        'Varicose Veins': 'Varicose Veins (ICD-10: I83)',
        'Vitiligo': 'Vitiligo (ICD-10: L80)',
        'Vomiting': 'Nausea and Vomiting (ICD-10: R11)',
        'Warts': 'Viral Warts (ICD-10: B07)',
        'Worms': 'Helminthiasis (ICD-10: B65-B83)'
    }
    
    return correlations.get(disease_name, "")

if __name__ == "__main__":
    diseases = extract_diseases_from_lad_pdf()
    print(f"\nExtraction complete! Found {len(diseases)} actual diseases.")
    print("\nSample diseases extracted:")
    for i, disease in enumerate(diseases[:10]):
        print(f"{i+1}. {disease['name']} - {disease['category']} - {', '.join(disease['dosha'])} - {len(disease['symptoms'])} symptoms") 