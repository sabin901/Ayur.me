import pdfplumber
import re
import json
import os

PDF_PATH = "The_Complete_Book_of_Ayurvedic_Home_Remedies.pdf"
OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../backend/data/diseases_lad_simple.json')

# Known diseases from Dr. Lad's book
KNOWN_DISEASES = [
    'Allergies', 'Anemia', 'Arthritis', 'Asthma', 'Back Pain', 'Bronchitis', 'Cancer',
    'Cataracts', 'Colitis', 'Constipation', 'Cough', 'Depression', 'Diabetes',
    'Diarrhea', 'Dysentery', 'Eczema', 'Epilepsy', 'Eye Problems', 'Fever',
    'Gastritis', 'Gout', 'Headache', 'Heart Disease', 'Hemorrhoids', 'Hepatitis',
    'High Blood Pressure', 'Hypertension', 'Indigestion', 'Insomnia', 'Jaundice',
    'Kidney Stones', 'Leukemia', 'Migraine', 'Nausea', 'Obesity', 'Osteoporosis',
    'Paralysis', 'Pneumonia', 'Psoriasis', 'Rheumatism', 'Sciatica', 'Sinusitis',
    'Skin Disease', 'Tuberculosis', 'Ulcer', 'Urinary Infection', 'Varicose Veins',
    'Vitiligo', 'Vomiting', 'Warts', 'Worms'
]

def extract_diseases_from_lad_pdf():
    """
    Extract diseases from Dr. Lad's book using a simpler approach
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
    
    # Split text into sections
    sections = text.split('\n\n')
    
    for section in sections:
        lines = section.strip().split('\n')
        if len(lines) < 2:
            continue
            
        # Check if first line looks like a disease name
        first_line = lines[0].strip()
        
        # Check if it's a known disease
        is_disease = False
        disease_name = ""
        
        for known_disease in KNOWN_DISEASES:
            if known_disease.lower() in first_line.lower() or first_line.lower() in known_disease.lower():
                is_disease = True
                disease_name = known_disease
                break
        
        if not is_disease:
            continue
        
        # Parse the disease content
        disease_content = '\n'.join(lines[1:])
        disease_data = parse_disease_section(disease_name, disease_content, disease_id_counter)
        
        if disease_data and disease_data['symptoms']:
            diseases.append(disease_data)
            disease_id_counter += 1
    
    print(f"Extracted {len(diseases)} diseases from Dr. Lad's book")
    
    # Save to JSON
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(diseases, f, indent=2, ensure_ascii=False)
    
    print(f"Saved to {OUTPUT_JSON}")
    return diseases

def parse_disease_section(disease_name: str, content: str, disease_id: int):
    """
    Parse a disease section and extract information
    """
    # Extract symptoms
    symptoms = []
    symptom_match = re.search(r'Symptoms?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)', content, re.IGNORECASE | re.DOTALL)
    if symptom_match:
        symptoms_text = symptom_match.group(1).strip()
        symptoms = [s.strip() for s in re.split(r'[;,\n]', symptoms_text) if s.strip() and len(s.strip()) > 3]
    
    # Extract causes
    causes = []
    cause_match = re.search(r'Causes?:\s*(.*?)(?=\n[A-Z][a-z]+:|$)', content, re.IGNORECASE | re.DOTALL)
    if cause_match:
        causes_text = cause_match.group(1).strip()
        causes = [c.strip() for c in re.split(r'[;,\n]', causes_text) if c.strip() and len(c.strip()) > 3]
    
    # Extract treatments
    treatments = []
    treatment_match = re.search(r'(?:Treatment|Remedy|Home Remedy|Ayurvedic Remedy):\s*(.*?)(?=\n[A-Z][a-z]+:|$)', content, re.IGNORECASE | re.DOTALL)
    if treatment_match:
        treatment_text = treatment_match.group(1).strip()
        if treatment_text and len(treatment_text) > 10:
            treatments.append({
                "type": "Home Remedy",
                "name": f"Treatment for {disease_name}",
                "description": treatment_text,
                "source": "Dr. Vasant Lad"
            })
    
    # Extract diet
    diet_include = []
    diet_avoid = []
    diet_match = re.search(r'Diet:\s*(.*?)(?=\n[A-Z][a-z]+:|$)', content, re.IGNORECASE | re.DOTALL)
    if diet_match:
        diet_text = diet_match.group(1).strip()
        # Simple food extraction
        positive_foods = ['ginger', 'turmeric', 'honey', 'ghee', 'milk', 'rice', 'barley', 'vegetables', 'fruits', 'coconut']
        negative_foods = ['spicy', 'sour', 'alcohol', 'meat', 'fish', 'processed', 'fried']
        
        for food in positive_foods:
            if food in diet_text.lower():
                diet_include.append(food.title())
        
        for food in negative_foods:
            if food in diet_text.lower():
                diet_avoid.append(food.title())
    
    # Extract lifestyle
    lifestyle = []
    lifestyle_match = re.search(r'Lifestyle:\s*(.*?)(?=\n[A-Z][a-z]+:|$)', content, re.IGNORECASE | re.DOTALL)
    if lifestyle_match:
        lifestyle_text = lifestyle_match.group(1).strip()
        lifestyle = [l.strip() for l in re.split(r'[;,\n]', lifestyle_text) if l.strip() and len(l.strip()) > 3]
    
    # Determine dosha
    dosha = determine_dosha(symptoms, causes, content)
    
    # Determine category
    category = determine_category(disease_name, symptoms)
    
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
        "severity": "Moderate",
        "isActive": True,
        "modernCorrelation": get_modern_correlation(disease_name),
        "sanskrit": ""
    }
    
    return disease_data

def determine_dosha(symptoms, causes, content):
    """Determine dosha based on content"""
    text = ' '.join(symptoms + causes + [content]).lower()
    
    dosha_keywords = {
        'Vata': ['dry', 'cold', 'light', 'mobile', 'rough', 'constipation', 'anxiety', 'insomnia', 'pain'],
        'Pitta': ['hot', 'burning', 'sharp', 'acidic', 'inflammation', 'fever', 'anger', 'irritation'],
        'Kapha': ['heavy', 'cold', 'oily', 'sweet', 'sticky', 'congestion', 'lethargy', 'weight gain']
    }
    
    dosha_scores = {'Vata': 0, 'Pitta': 0, 'Kapha': 0}
    
    for dosha, keywords in dosha_keywords.items():
        for keyword in keywords:
            if keyword in text:
                dosha_scores[dosha] += 1
    
    max_score = max(dosha_scores.values())
    if max_score == 0:
        return ['Vata']
    
    return [dosha for dosha, score in dosha_scores.items() if score == max_score]

def determine_category(disease_name, symptoms):
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

def get_modern_correlation(disease_name):
    """Get modern medical correlation"""
    correlations = {
        'Allergies': 'Allergic Rhinitis (ICD-10: J30)',
        'Anemia': 'Iron Deficiency Anemia (ICD-10: D50)',
        'Arthritis': 'Rheumatoid Arthritis (ICD-10: M06)',
        'Asthma': 'Bronchial Asthma (ICD-10: J45)',
        'Back Pain': 'Low Back Pain (ICD-10: M54.5)',
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
        'Eye Problems': 'Eye Disorders (ICD-10: H00-H59)',
        'Fever': 'Fever (ICD-10: R50)',
        'Gastritis': 'Gastritis (ICD-10: K29)',
        'Gout': 'Gout (ICD-10: M10)',
        'Headache': 'Tension Headache (ICD-10: G44.2)',
        'Heart Disease': 'Coronary Artery Disease (ICD-10: I25)',
        'Hemorrhoids': 'Hemorrhoids (ICD-10: K64)',
        'Hepatitis': 'Viral Hepatitis (ICD-10: B15-B19)',
        'High Blood Pressure': 'Hypertension (ICD-10: I10)',
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
    print(f"\nExtraction complete! Found {len(diseases)} diseases.")
    print("\nSample diseases extracted:")
    for i, disease in enumerate(diseases[:10]):
        print(f"{i+1}. {disease['name']} - {disease['category']} - {', '.join(disease['dosha'])} - {len(disease['symptoms'])} symptoms") 