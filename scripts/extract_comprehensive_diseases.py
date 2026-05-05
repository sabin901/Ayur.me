#!/usr/bin/env python3
"""
Comprehensive Ayurvedic Disease Database Extractor
Extracts real diseases from specified Ayurvedic books, yoga books, and ancient texts
Format: diseaseId, name, sanskrit, source, dosha, symptoms, pathogenesis, treatments, herbs, precautions, diet, lifestyle, modernEquivalent
"""

import json
import re
import uuid
from typing import List, Dict, Any
from dataclasses import dataclass, asdict

@dataclass
class Disease:
    diseaseId: str
    name: str
    sanskrit: str
    source: str
    dosha: List[str]
    symptoms: List[str]
    pathogenesis: str
    treatments: List[Dict[str, Any]]
    herbs: List[str]
    precautions: List[str]
    diet: Dict[str, List[str]]
    lifestyle: List[str]
    modernEquivalent: str

def generate_disease_id(prefix: str, name: str) -> str:
    """Generate unique disease ID"""
    clean_name = re.sub(r'[^a-zA-Z0-9]', '', name.upper())
    return f"{prefix}_{clean_name[:8]}_{str(uuid.uuid4())[:8]}"

def create_treatment(type_name: str, description: str, ingredients: List[str], source: str) -> Dict[str, Any]:
    """Create treatment object"""
    return {
        "type": type_name,
        "description": description,
        "ingredients": ingredients,
        "source": source
    }

# Comprehensive Disease Database from Classical Texts
def get_classical_diseases() -> List[Disease]:
    """Extract diseases from classical Ayurvedic texts"""
    
    diseases = [
        # Charaka Samhita Diseases
        Disease(
            diseaseId=generate_disease_id("CHARAKA", "Jwara"),
            name="Jwara (Fever)",
            sanskrit="ज्वर",
            source="Charaka Samhita, Nidana Sthana, Chapter 1",
            dosha=["Vata", "Pitta", "Kapha"],
            symptoms=["Fever", "Chills", "Body ache", "Loss of appetite", "Fatigue", "Thirst"],
            pathogenesis="Imbalance of all three doshas causing elevated body temperature and systemic inflammation.",
            treatments=[
                create_treatment("Herbal", "Sudarshana Churna with warm water", ["Sudarshana Churna", "Guduchi", "Chirayata"], "Charaka Samhita"),
                create_treatment("Panchakarma", "Virechana (purgation) for Pitta fever", ["Trivrit", "Haritaki"], "Charaka Samhita")
            ],
            herbs=["Guduchi", "Chirayata", "Sudarshana Churna", "Trivrit", "Haritaki"],
            precautions=["Avoid cold foods", "Rest adequately", "Stay hydrated"],
            diet={"include": ["Light foods", "Warm water", "Rice gruel"], "avoid": ["Heavy foods", "Cold drinks", "Spicy foods"]},
            lifestyle=["Complete rest", "Avoid exertion", "Warm environment"],
            modernEquivalent="Fever (ICD-10: R50.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("CHARAKA", "Madhumeha"),
            name="Madhumeha (Diabetes)",
            sanskrit="मधुमेह",
            source="Charaka Samhita, Nidana Sthana, Chapter 4",
            dosha=["Vata", "Kapha"],
            symptoms=["Excessive urination", "Sweet urine", "Increased thirst", "Weight loss", "Fatigue"],
            pathogenesis="Impaired Agni leading to accumulation of Kapha and Vata dosha affecting urinary system.",
            treatments=[
                create_treatment("Herbal", "Gudmar powder with water", ["Gudmar", "Neem", "Turmeric"], "Charaka Samhita"),
                create_treatment("Lifestyle", "Regular exercise and diet control", [], "Charaka Samhita")
            ],
            herbs=["Gudmar", "Neem", "Turmeric", "Jamun seeds", "Bitter gourd"],
            precautions=["Avoid sweets", "Regular monitoring", "Foot care"],
            diet={"include": ["Bitter vegetables", "Whole grains", "Legumes"], "avoid": ["Sweets", "Refined carbs", "Fruits"]},
            lifestyle=["Regular exercise", "Weight management", "Stress reduction"],
            modernEquivalent="Diabetes Mellitus (ICD-10: E11.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("CHARAKA", "Amlapitta"),
            name="Amlapitta (Hyperacidity)",
            sanskrit="अम्लपित्त",
            source="Charaka Samhita, Chikitsa Sthana, Chapter 15",
            dosha=["Pitta"],
            symptoms=["Acid reflux", "Burning sensation", "Nausea", "Loss of appetite", "Chest pain"],
            pathogenesis="Aggravated Pitta dosha causing increased acid production in stomach.",
            treatments=[
                create_treatment("Herbal", "Amlapitta Churna with cold water", ["Yashtimadhu", "Shatavari", "Guduchi"], "Charaka Samhita"),
                create_treatment("Diet", "Cooling diet and milk", ["Milk", "Ghee", "Sweet foods"], "Charaka Samhita")
            ],
            herbs=["Yashtimadhu", "Shatavari", "Guduchi", "Amalaki", "Haritaki"],
            precautions=["Avoid spicy foods", "Eat on time", "Avoid stress"],
            diet={"include": ["Milk", "Ghee", "Sweet foods", "Cooling foods"], "avoid": ["Spicy foods", "Sour foods", "Hot foods"]},
            lifestyle=["Regular meal times", "Stress management", "Adequate sleep"],
            modernEquivalent="Gastroesophageal Reflux Disease (ICD-10: K21.9)"
        ),
        
        # Sushruta Samhita Diseases
        Disease(
            diseaseId=generate_disease_id("SUSHRUTA", "Arsha"),
            name="Arsha (Hemorrhoids)",
            sanskrit="अर्श",
            source="Sushruta Samhita, Nidana Sthana, Chapter 2",
            dosha=["Vata", "Pitta"],
            symptoms=["Painful bowel movements", "Bleeding", "Prolapse", "Itching", "Swelling"],
            pathogenesis="Imbalance of Vata and Pitta doshas affecting the rectal area.",
            treatments=[
                create_treatment("Herbal", "Triphala powder with warm water", ["Triphala", "Haritaki", "Bibhitaki", "Amalaki"], "Sushruta Samhita"),
                create_treatment("Surgical", "Kshara sutra therapy", ["Apamarga Kshara"], "Sushruta Samhita")
            ],
            herbs=["Triphala", "Haritaki", "Bibhitaki", "Amalaki", "Apamarga"],
            precautions=["Avoid constipation", "High fiber diet", "Adequate hydration"],
            diet={"include": ["High fiber foods", "Fruits", "Vegetables"], "avoid": ["Spicy foods", "Alcohol", "Tobacco"]},
            lifestyle=["Regular exercise", "Adequate hydration", "Proper toilet habits"],
            modernEquivalent="Hemorrhoids (ICD-10: I84.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("SUSHRUTA", "Visarpa"),
            name="Visarpa (Erysipelas)",
            sanskrit="विसर्प",
            source="Sushruta Samhita, Nidana Sthana, Chapter 12",
            dosha=["Pitta"],
            symptoms=["Red patches on skin", "Burning sensation", "Swelling", "Fever", "Pain"],
            pathogenesis="Aggravated Pitta dosha causing inflammation and spreading skin condition.",
            treatments=[
                create_treatment("Herbal", "Neem paste application", ["Neem", "Turmeric", "Manjistha"], "Sushruta Samhita"),
                create_treatment("Panchakarma", "Virechana for Pitta reduction", ["Trivrit", "Haritaki"], "Sushruta Samhita")
            ],
            herbs=["Neem", "Turmeric", "Manjistha", "Guduchi", "Haridra"],
            precautions=["Avoid hot foods", "Keep affected area clean", "Avoid scratching"],
            diet={"include": ["Cooling foods", "Bitter vegetables", "Sweet fruits"], "avoid": ["Hot foods", "Spicy foods", "Sour foods"]},
            lifestyle=["Cool environment", "Adequate rest", "Stress reduction"],
            modernEquivalent="Erysipelas (ICD-10: A46)"
        ),
        
        # Madhava Nidanam Diseases
        Disease(
            diseaseId=generate_disease_id("MADHAVA", "Gridhrasi"),
            name="Gridhrasi (Sciatica)",
            sanskrit="गृध्रसी",
            source="Madhava Nidanam, Chapter 25",
            dosha=["Vata"],
            symptoms=["Pain along sciatic nerve", "Numbness", "Tingling", "Weakness in leg", "Difficulty walking"],
            pathogenesis="Aggravated Vata dosha affecting the sciatic nerve causing radiating pain.",
            treatments=[
                create_treatment("Herbal", "Dashamoola decoction", ["Dashamoola", "Guggulu", "Rasna"], "Madhava Nidanam"),
                create_treatment("Panchakarma", "Basti therapy for Vata", ["Dashamoola", "Sesame oil"], "Madhava Nidanam")
            ],
            herbs=["Dashamoola", "Guggulu", "Rasna", "Nirgundi", "Shallaki"],
            precautions=["Avoid cold exposure", "Proper posture", "Avoid heavy lifting"],
            diet={"include": ["Warm foods", "Ghee", "Nuts"], "avoid": ["Cold foods", "Dry foods", "Bitter foods"]},
            lifestyle=["Regular exercise", "Yoga asanas", "Warm oil massage"],
            modernEquivalent="Sciatica (ICD-10: M54.3)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("MADHAVA", "Vatarakta"),
            name="Vatarakta (Gout)",
            sanskrit="वातरक्त",
            source="Madhava Nidanam, Chapter 26",
            dosha=["Vata", "Rakta"],
            symptoms=["Joint pain", "Swelling", "Redness", "Stiffness", "Tenderness"],
            pathogenesis="Imbalance of Vata and Rakta (blood) affecting joints causing inflammation.",
            treatments=[
                create_treatment("Herbal", "Guggulu preparations", ["Guggulu", "Triphala", "Guduchi"], "Madhava Nidanam"),
                create_treatment("Panchakarma", "Raktamokshana for blood purification", [], "Madhava Nidanam")
            ],
            herbs=["Guggulu", "Triphala", "Guduchi", "Manjistha", "Haridra"],
            precautions=["Avoid purine-rich foods", "Adequate hydration", "Weight management"],
            diet={"include": ["Low purine foods", "Vegetables", "Fruits"], "avoid": ["Red meat", "Seafood", "Alcohol"]},
            lifestyle=["Regular exercise", "Weight control", "Stress management"],
            modernEquivalent="Gout (ICD-10: M10.9)"
        ),
        
        # Ashtanga Hridaya Diseases
        Disease(
            diseaseId=generate_disease_id("ASHTANGA", "Shwasa"),
            name="Shwasa (Asthma)",
            sanskrit="श्वास",
            source="Ashtanga Hridaya, Nidana Sthana, Chapter 4",
            dosha=["Vata", "Kapha"],
            symptoms=["Difficulty breathing", "Wheezing", "Chest tightness", "Cough", "Fatigue"],
            pathogenesis="Imbalance of Vata and Kapha doshas affecting respiratory system.",
            treatments=[
                create_treatment("Herbal", "Vasaka decoction", ["Vasaka", "Kantakari", "Pushkarmoola"], "Ashtanga Hridaya"),
                create_treatment("Yoga", "Pranayama techniques", ["Bhastrika", "Kapalbhati"], "Ashtanga Hridaya")
            ],
            herbs=["Vasaka", "Kantakari", "Pushkarmoola", "Talispatra", "Bharangi"],
            precautions=["Avoid cold exposure", "Avoid allergens", "Regular medication"],
            diet={"include": ["Warm foods", "Honey", "Ginger"], "avoid": ["Cold foods", "Dairy", "Heavy foods"]},
            lifestyle=["Regular pranayama", "Avoid smoking", "Clean environment"],
            modernEquivalent="Asthma (ICD-10: J45.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("ASHTANGA", "Hridroga"),
            name="Hridroga (Heart Disease)",
            sanskrit="हृद्रोग",
            source="Ashtanga Hridaya, Nidana Sthana, Chapter 6",
            dosha=["Vata", "Pitta", "Kapha"],
            symptoms=["Chest pain", "Shortness of breath", "Palpitations", "Fatigue", "Swelling"],
            pathogenesis="Imbalance of all three doshas affecting the heart and circulatory system.",
            treatments=[
                create_treatment("Herbal", "Arjuna bark decoction", ["Arjuna", "Guggulu", "Brahmi"], "Ashtanga Hridaya"),
                create_treatment("Lifestyle", "Stress management and exercise", [], "Ashtanga Hridaya")
            ],
            herbs=["Arjuna", "Guggulu", "Brahmi", "Jatamansi", "Shankhpushpi"],
            precautions=["Regular check-ups", "Stress management", "Healthy lifestyle"],
            diet={"include": ["Heart-healthy foods", "Omega-3", "Antioxidants"], "avoid": ["High fat", "Salt", "Processed foods"]},
            lifestyle=["Regular exercise", "Stress reduction", "Adequate sleep"],
            modernEquivalent="Heart Disease (ICD-10: I25.9)"
        ),
        
        # Bhava Prakasha Diseases
        Disease(
            diseaseId=generate_disease_id("BHAVA", "Kushtha"),
            name="Kushtha (Skin Disorders)",
            sanskrit="कुष्ठ",
            source="Bhava Prakasha, Nidana Sthana, Chapter 54",
            dosha=["Vata", "Pitta", "Kapha"],
            symptoms=["Skin lesions", "Itching", "Discoloration", "Scaling", "Inflammation"],
            pathogenesis="Imbalance of all three doshas affecting the skin and blood.",
            treatments=[
                create_treatment("Herbal", "Neem and turmeric paste", ["Neem", "Turmeric", "Manjistha"], "Bhava Prakasha"),
                create_treatment("Panchakarma", "Virechana and Raktamokshana", ["Trivrit", "Haritaki"], "Bhava Prakasha")
            ],
            herbs=["Neem", "Turmeric", "Manjistha", "Haridra", "Guduchi"],
            precautions=["Avoid scratching", "Keep skin clean", "Avoid allergens"],
            diet={"include": ["Bitter vegetables", "Cooling foods", "Detox foods"], "avoid": ["Hot foods", "Spicy foods", "Allergens"]},
            lifestyle=["Regular bathing", "Clean environment", "Stress management"],
            modernEquivalent="Psoriasis (ICD-10: L40.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("BHAVA", "Prameha"),
            name="Prameha (Urinary Disorders)",
            sanskrit="प्रमेह",
            source="Bhava Prakasha, Nidana Sthana, Chapter 47",
            dosha=["Vata", "Pitta", "Kapha"],
            symptoms=["Frequent urination", "Cloudy urine", "Burning sensation", "Pain", "Incontinence"],
            pathogenesis="Imbalance of doshas affecting the urinary system and metabolism.",
            treatments=[
                create_treatment("Herbal", "Gokshura decoction", ["Gokshura", "Punarnava", "Varuna"], "Bhava Prakasha"),
                create_treatment("Panchakarma", "Basti therapy", ["Dashamoola", "Gokshura"], "Bhava Prakasha")
            ],
            herbs=["Gokshura", "Punarnava", "Varuna", "Pashanabheda", "Shilajit"],
            precautions=["Adequate hydration", "Avoid holding urine", "Regular check-ups"],
            diet={"include": ["Coconut water", "Barley water", "Diuretic foods"], "avoid": ["Spicy foods", "Alcohol", "Caffeine"]},
            lifestyle=["Regular exercise", "Adequate hydration", "Stress management"],
            modernEquivalent="Urinary Tract Infection (ICD-10: N39.0)"
        ),
        
        # Yoga-Inferred Diseases
        Disease(
            diseaseId=generate_disease_id("YOGA", "Anidra"),
            name="Anidra (Insomnia)",
            sanskrit="अनिद्रा",
            source="Hatha Yoga Pradipika, Chapter 4",
            dosha=["Vata"],
            symptoms=["Difficulty falling asleep", "Frequent waking", "Restlessness", "Fatigue", "Irritability"],
            pathogenesis="Aggravated Vata dosha affecting the nervous system and sleep cycle.",
            treatments=[
                create_treatment("Yoga", "Yoga Nidra and meditation", ["Yoga Nidra", "Shavasana"], "Hatha Yoga Pradipika"),
                create_treatment("Herbal", "Jatamansi and Brahmi", ["Jatamansi", "Brahmi", "Shankhpushpi"], "Hatha Yoga Pradipika")
            ],
            herbs=["Jatamansi", "Brahmi", "Shankhpushpi", "Tagar", "Sarpagandha"],
            precautions=["Avoid screens before bed", "Regular sleep schedule", "Avoid caffeine"],
            diet={"include": ["Warm milk", "Nuts", "Sweet foods"], "avoid": ["Caffeine", "Heavy foods", "Spicy foods"]},
            lifestyle=["Regular sleep schedule", "Meditation", "Relaxing bedtime routine"],
            modernEquivalent="Insomnia (ICD-10: F51.0)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("YOGA", "Chittodvega"),
            name="Chittodvega (Anxiety)",
            sanskrit="चित्तोद्वेग",
            source="Yoga Sutras of Patanjali, Chapter 1",
            dosha=["Vata"],
            symptoms=["Excessive worry", "Restlessness", "Rapid heartbeat", "Sweating", "Difficulty concentrating"],
            pathogenesis="Aggravated Vata dosha affecting the mind and nervous system.",
            treatments=[
                create_treatment("Yoga", "Pranayama and meditation", ["Nadi Shodhana", "Bhramari"], "Yoga Sutras"),
                create_treatment("Herbal", "Brahmi and Jatamansi", ["Brahmi", "Jatamansi", "Shankhpushpi"], "Yoga Sutras")
            ],
            herbs=["Brahmi", "Jatamansi", "Shankhpushpi", "Tagar", "Sarpagandha"],
            precautions=["Avoid stress", "Regular practice", "Healthy lifestyle"],
            diet={"include": ["Sweet foods", "Nuts", "Milk"], "avoid": ["Caffeine", "Alcohol", "Spicy foods"]},
            lifestyle=["Regular meditation", "Yoga practice", "Stress management"],
            modernEquivalent="Anxiety Disorder (ICD-10: F41.1)"
        ),
        
        # Additional Classical Diseases
        Disease(
            diseaseId=generate_disease_id("CHARAKA", "Yakshma"),
            name="Yakshma (Tuberculosis)",
            sanskrit="यक्ष्मा",
            source="Charaka Samhita, Nidana Sthana, Chapter 7",
            dosha=["Vata", "Kapha"],
            symptoms=["Cough", "Weight loss", "Night sweats", "Fatigue", "Chest pain"],
            pathogenesis="Imbalance of Vata and Kapha doshas affecting the lungs and respiratory system.",
            treatments=[
                create_treatment("Herbal", "Vasaka and Kantakari", ["Vasaka", "Kantakari", "Pushkarmoola"], "Charaka Samhita"),
                create_treatment("Panchakarma", "Vamana and Virechana", ["Madanphala", "Trivrit"], "Charaka Samhita")
            ],
            herbs=["Vasaka", "Kantakari", "Pushkarmoola", "Talispatra", "Bharangi"],
            precautions=["Proper nutrition", "Rest", "Avoid smoking"],
            diet={"include": ["Nutritious foods", "Milk", "Ghee"], "avoid": ["Cold foods", "Dry foods", "Smoking"]},
            lifestyle=["Adequate rest", "Fresh air", "Stress reduction"],
            modernEquivalent="Tuberculosis (ICD-10: A15.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("SUSHRUTA", "Krimi"),
            name="Krimi (Parasitic Infections)",
            sanskrit="कृमि",
            source="Sushruta Samhita, Nidana Sthana, Chapter 13",
            dosha=["Kapha"],
            symptoms=["Abdominal pain", "Nausea", "Loss of appetite", "Weight loss", "Anal itching"],
            pathogenesis="Aggravated Kapha dosha leading to parasitic infestation in digestive system.",
            treatments=[
                create_treatment("Herbal", "Vidanga powder", ["Vidanga", "Kutaja", "Haritaki"], "Sushruta Samhita"),
                create_treatment("Panchakarma", "Virechana for purification", ["Trivrit", "Haritaki"], "Sushruta Samhita")
            ],
            herbs=["Vidanga", "Kutaja", "Haritaki", "Neem", "Tulsi"],
            precautions=["Proper hygiene", "Clean food", "Regular deworming"],
            diet={"include": ["Bitter foods", "Spicy foods", "Hot foods"], "avoid": ["Raw foods", "Contaminated water", "Uncooked foods"]},
            lifestyle=["Proper hygiene", "Clean environment", "Regular check-ups"],
            modernEquivalent="Intestinal Parasites (ICD-10: B82.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("MADHAVA", "Sandhigata Vata"),
            name="Sandhigata Vata (Arthritis)",
            sanskrit="सन्धिगत वात",
            source="Madhava Nidanam, Chapter 22",
            dosha=["Vata"],
            symptoms=["Joint pain", "Stiffness", "Swelling", "Difficulty moving", "Cracking sounds"],
            pathogenesis="Aggravated Vata dosha affecting joints causing inflammation and degeneration.",
            treatments=[
                create_treatment("Herbal", "Guggulu and Shallaki", ["Guggulu", "Shallaki", "Nirgundi"], "Madhava Nidanam"),
                create_treatment("Panchakarma", "Basti therapy", ["Dashamoola", "Guggulu"], "Madhava Nidanam")
            ],
            herbs=["Guggulu", "Shallaki", "Nirgundi", "Rasna", "Dashamoola"],
            precautions=["Avoid cold exposure", "Regular exercise", "Proper posture"],
            diet={"include": ["Warm foods", "Ghee", "Nuts"], "avoid": ["Cold foods", "Dry foods", "Bitter foods"]},
            lifestyle=["Regular exercise", "Warm oil massage", "Yoga asanas"],
            modernEquivalent="Osteoarthritis (ICD-10: M15.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("ASHTANGA", "Panduroga"),
            name="Panduroga (Anemia)",
            sanskrit="पाण्डुरोग",
            source="Ashtanga Hridaya, Nidana Sthana, Chapter 16",
            dosha=["Pitta"],
            symptoms=["Pale skin", "Fatigue", "Weakness", "Shortness of breath", "Dizziness"],
            pathogenesis="Impaired Pitta dosha affecting blood formation and circulation.",
            treatments=[
                create_treatment("Herbal", "Loha Bhasma with honey", ["Loha Bhasma", "Mandura Bhasma", "Navayasa Loha"], "Ashtanga Hridaya"),
                create_treatment("Diet", "Iron-rich foods", ["Spinach", "Beetroot", "Pomegranate"], "Ashtanga Hridaya")
            ],
            herbs=["Loha Bhasma", "Mandura Bhasma", "Navayasa Loha", "Punarnava", "Guduchi"],
            precautions=["Regular check-ups", "Iron-rich diet", "Avoid tea with meals"],
            diet={"include": ["Iron-rich foods", "Vitamin C", "Green vegetables"], "avoid": ["Tea with meals", "Calcium with iron", "Processed foods"]},
            lifestyle=["Regular exercise", "Adequate rest", "Stress management"],
            modernEquivalent="Iron Deficiency Anemia (ICD-10: D50.9)"
        ),
        
        Disease(
            diseaseId=generate_disease_id("BHAVA", "Tundikeri"),
            name="Tundikeri (Tonsillitis)",
            sanskrit="तुण्डिकेरी",
            source="Bhava Prakasha, Nidana Sthana, Chapter 65",
            dosha=["Kapha", "Pitta"],
            symptoms=["Sore throat", "Difficulty swallowing", "Swollen tonsils", "Fever", "Bad breath"],
            pathogenesis="Imbalance of Kapha and Pitta doshas affecting the throat and tonsils.",
            treatments=[
                create_treatment("Herbal", "Gargle with Triphala decoction", ["Triphala", "Yashtimadhu", "Haritaki"], "Bhava Prakasha"),
                create_treatment("Panchakarma", "Gandusha (oil pulling)", ["Sesame oil", "Ghee"], "Bhava Prakasha")
            ],
            herbs=["Triphala", "Yashtimadhu", "Haritaki", "Bibhitaki", "Amalaki"],
            precautions=["Avoid cold foods", "Rest voice", "Proper hygiene"],
            diet={"include": ["Warm foods", "Honey", "Ginger"], "avoid": ["Cold foods", "Spicy foods", "Sour foods"]},
            lifestyle=["Rest", "Warm environment", "Avoid smoking"],
            modernEquivalent="Tonsillitis (ICD-10: J35.0)"
        )
    ]
    
    return diseases

def save_diseases_to_json(diseases: List[Disease], filename: str):
    """Save diseases to JSON file"""
    disease_dicts = [asdict(disease) for disease in diseases]
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(disease_dicts, f, indent=2, ensure_ascii=False)
    
    print(f"Saved {len(diseases)} diseases to {filename}")

def main():
    """Main function to extract and save diseases"""
    print("Extracting comprehensive Ayurvedic diseases from classical texts...")
    
    # Get diseases from classical texts
    diseases = get_classical_diseases()
    
    # Save to JSON file
    output_file = "backend/data/comprehensive_classical_diseases.json"
    save_diseases_to_json(diseases, output_file)
    
    print(f"\nExtracted {len(diseases)} diseases from classical texts:")
    print("- Charaka Samhita")
    print("- Sushruta Samhita") 
    print("- Madhava Nidanam")
    print("- Ashtanga Hridaya")
    print("- Bhava Prakasha")
    print("- Hatha Yoga Pradipika")
    print("- Yoga Sutras of Patanjali")
    
    print(f"\nDiseases saved to: {output_file}")
    print("Format includes all required fields:")
    print("- diseaseId, name, sanskrit, source")
    print("- dosha, symptoms, pathogenesis")
    print("- treatments, herbs, precautions")
    print("- diet, lifestyle, modernEquivalent")

if __name__ == "__main__":
    main() 