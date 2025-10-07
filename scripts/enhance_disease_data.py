#!/usr/bin/env python3
"""
Script to extract and enhance disease data from Ayurvedic PDF files
"""

import json
import re
from pathlib import Path
import PyPDF2
import spacy
from typing import Dict, List, Any

# Load English language model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Please install the English language model: python -m spacy download en_core_web_sm")
    exit(1)

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF {pdf_path}: {e}")
        return ""

def extract_disease_info_from_text(text: str) -> List[Dict[str, Any]]:
    """Extract disease information from text using NLP and pattern matching"""
    
    # Common Ayurvedic disease patterns
    disease_patterns = [
        r'(\w+)\s*\(([^)]+)\)',  # Disease (Sanskrit name)
        r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*-\s*([^.]*)',  # Disease - description
        r'(\w+)\s*:\s*([^.]*)',  # Disease: description
    ]
    
    # Ayurvedic terms and their English equivalents
    ayurvedic_terms = {
        'amavata': 'Rheumatoid Arthritis',
        'amlapitta': 'Hyperacidity/GERD',
        'sandhivata': 'Osteoarthritis',
        'sthulya': 'Obesity',
        'madhumeha': 'Diabetes',
        'shwasa': 'Asthma',
        'kasa': 'Cough',
        'atisara': 'Diarrhea',
        'arsha': 'Hemorrhoids',
        'kushtha': 'Skin Diseases',
        'shiroroga': 'Headache',
        'netraroga': 'Eye Diseases',
        'karnaroga': 'Ear Diseases',
        'hridroga': 'Heart Disease',
        'kamala': 'Jaundice',
        'pandu': 'Anemia',
        'unmada': 'Mental Disorders',
        'apasmara': 'Epilepsy',
        'anidra': 'Insomnia',
        'gridhrasi': 'Sciatica',
        'bhagandara': 'Fistula',
        'granthi': 'Tumors/Lumps',
        'gulma': 'Abdominal Mass',
        'mutradosha': 'Urinary Disorders',
        'mutrakricchra': 'Dysuria',
        'mutraghata': 'Urinary Retention',
        'chardi': 'Vomiting',
        'hikka': 'Hiccups',
        'trishna': 'Excessive Thirst',
        'jwara': 'Fever',
        'rajayakshma': 'Tuberculosis',
        'kshaya': 'Emaciation',
        'dadhru': 'Ringworm',
        'vandhyatva': 'Infertility',
        'artava dosha': 'Menstrual Disorders',
        'phiranga': 'Syphilis',
        'udara': 'Abdominal Diseases',
        'nasaroga': 'Nasal Disorders',
        'karnashula': 'Ear Pain',
        'netra roga': 'Eye Diseases',
    }
    
    # Dosha patterns
    dosha_patterns = {
        'vata': ['vata', 'vayu', 'wind', 'air'],
        'pitta': ['pitta', 'fire', 'bile', 'heat'],
        'kapha': ['kapha', 'phlegm', 'mucus', 'water', 'earth']
    }
    
    # Treatment patterns
    treatment_patterns = {
        'herbal': ['herb', 'plant', 'leaf', 'root', 'bark', 'flower', 'seed'],
        'therapy': ['massage', 'oil', 'steam', 'bath', 'therapy'],
        'surgical': ['surgery', 'operation', 'procedure', 'surgical'],
        'dietary': ['diet', 'food', 'nutrition', 'eating'],
        'lifestyle': ['exercise', 'yoga', 'meditation', 'sleep', 'routine']
    }
    
    # Extract sentences containing disease-related terms
    sentences = text.split('.')
    disease_info = []
    
    for sentence in sentences:
        sentence = sentence.strip()
        if len(sentence) < 20:  # Skip very short sentences
            continue
            
        # Check for disease patterns
        for pattern in disease_patterns:
            matches = re.findall(pattern, sentence, re.IGNORECASE)
            for match in matches:
                if isinstance(match, tuple):
                    disease_name = match[0].strip()
                    description = match[1].strip()
                else:
                    disease_name = match.strip()
                    description = sentence
                
                # Skip if too short or common words
                if len(disease_name) < 3 or disease_name.lower() in ['the', 'and', 'or', 'but', 'in', 'on', 'at']:
                    continue
                
                # Check if it's a known Ayurvedic term
                english_name = ayurvedic_terms.get(disease_name.lower(), disease_name)
                
                # Extract doshas mentioned
                doshas = []
                for dosha, keywords in dosha_patterns.items():
                    if any(keyword in sentence.lower() for keyword in keywords):
                        doshas.append(dosha.capitalize())
                
                # Extract treatment types
                treatment_types = []
                for treatment_type, keywords in treatment_patterns.items():
                    if any(keyword in sentence.lower() for keyword in keywords):
                        treatment_types.append(treatment_type.capitalize())
                
                # Create disease info
                disease_data = {
                    'name': disease_name,
                    'sanskrit': disease_name if disease_name.lower() in ayurvedic_terms else '',
                    'englishName': english_name,
                    'description': description,
                    'dosha': doshas,
                    'treatmentTypes': treatment_types,
                    'source': 'Extracted from Ayurvedic texts',
                    'severity': 'Moderate',
                    'category': 'General',
                    'symptoms': [],
                    'causes': [],
                    'treatments': [],
                    'diet': {'include': [], 'avoid': []},
                    'lifestyle': [],
                    'precautions': []
                }
                
                # Add to list if not already present
                existing_names = [d['name'] for d in disease_info]
                if disease_name not in existing_names:
                    disease_info.append(disease_data)
    
    return disease_info

def enhance_existing_diseases(existing_diseases: List[Dict], extracted_info: List[Dict]) -> List[Dict]:
    """Enhance existing disease data with extracted information"""
    
    enhanced_diseases = []
    
    for disease in existing_diseases:
        enhanced_disease = disease.copy()
        
        # Find matching extracted info
        for extracted in extracted_info:
            if (disease['name'].lower() == extracted['name'].lower() or 
                disease['sanskrit'] and disease['sanskrit'].lower() == extracted['sanskrit'].lower()):
                
                # Enhance with extracted information
                if not enhanced_disease.get('description') and extracted.get('description'):
                    enhanced_disease['description'] = extracted['description']
                
                if not enhanced_disease.get('dosha') and extracted.get('dosha'):
                    enhanced_disease['dosha'] = extracted['dosha']
                
                if not enhanced_disease.get('causes') and extracted.get('causes'):
                    enhanced_disease['causes'] = extracted['causes']
                
                if not enhanced_disease.get('symptoms') and extracted.get('symptoms'):
                    enhanced_disease['symptoms'] = extracted['symptoms']
                
                # Add treatment types if not present
                if extracted.get('treatmentTypes') and not enhanced_disease.get('treatmentTypes'):
                    enhanced_disease['treatmentTypes'] = extracted['treatmentTypes']
                
                break
        
        enhanced_diseases.append(enhanced_disease)
    
    return enhanced_diseases

def add_comprehensive_treatments(diseases: List[Dict]) -> List[Dict]:
    """Add comprehensive treatment information based on disease type"""
    
    # Treatment templates based on dosha and category
    treatment_templates = {
        'Vata': {
            'herbs': ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Shankhpushpi', 'Sesame oil'],
            'therapies': ['Abhyanga (oil massage)', 'Shirodhara', 'Basti (enema)', 'Nasya'],
            'lifestyle': ['Regular routine', 'Warm foods', 'Gentle exercise', 'Adequate sleep']
        },
        'Pitta': {
            'herbs': ['Neem', 'Amla', 'Yashtimadhu', 'Shatavari', 'Guduchi'],
            'therapies': ['Sheetali pranayama', 'Cooling therapies', 'Virechana'],
            'lifestyle': ['Cool environment', 'Sweet foods', 'Moderate exercise', 'Stress management']
        },
        'Kapha': {
            'herbs': ['Guggulu', 'Triphala', 'Ginger', 'Pippali', 'Haritaki'],
            'therapies': ['Udvartana', 'Vamana', 'Svedana'],
            'lifestyle': ['Regular exercise', 'Light foods', 'Early rising', 'Stimulation']
        }
    }
    
    for disease in diseases:
        if not disease.get('treatments'):
            disease['treatments'] = []
        
        # Add treatments based on primary dosha
        primary_dosha = disease.get('dosha', [])
        if isinstance(primary_dosha, list) and primary_dosha:
            dosha = primary_dosha[0]
            if dosha in treatment_templates:
                template = treatment_templates[dosha]
                
                # Add herbal treatment
                if template['herbs']:
                    disease['treatments'].append({
                        'type': 'Herbal',
                        'description': f'Traditional {dosha} balancing herbs',
                        'ingredients': template['herbs'][:3],  # Take first 3 herbs
                        'source': 'Classical Ayurvedic texts',
                        'dosage': 'As prescribed by qualified practitioner',
                        'duration': '3-6 months',
                        'note': 'Consult with Ayurvedic practitioner for proper dosage and preparation'
                    })
                
                # Add therapy treatment
                if template['therapies']:
                    disease['treatments'].append({
                        'type': 'Therapy',
                        'description': f'{dosha} balancing therapies',
                        'ingredients': template['therapies'],
                        'source': 'Classical Ayurvedic texts',
                        'procedure': 'Performed by qualified therapist',
                        'frequency': 'As recommended by practitioner',
                        'note': 'Should be performed under professional supervision'
                    })
        
        # Add lifestyle recommendations
        if not disease.get('lifestyle'):
            disease['lifestyle'] = []
        
        # Add precautions
        if not disease.get('precautions'):
            disease['precautions'] = [
                'Consult qualified Ayurvedic practitioner',
                'Follow prescribed dosage and duration',
                'Monitor for any adverse reactions',
                'Maintain healthy lifestyle practices'
            ]
    
    return diseases

def main():
    """Main function to process PDF files and enhance disease data"""
    
    # Paths to PDF files
    pdf_paths = [
        'src/Scientific_Basis_for_Ayurvedic_Therapies.pdf',
        'src/The-Complete-Book-of-Ayurvedic-Home-Remedies.pdf'
    ]
    
    # Load existing disease data
    existing_diseases_path = 'backend/data/common_global_diseases_fixed.json'
    
    try:
        with open(existing_diseases_path, 'r', encoding='utf-8') as f:
            existing_data = json.load(f)
            existing_diseases = existing_data.get('diseases', [])
    except FileNotFoundError:
        print(f"Existing diseases file not found: {existing_diseases_path}")
        existing_diseases = []
    
    print(f"Loaded {len(existing_diseases)} existing diseases")
    
    # Extract information from PDFs
    all_extracted_info = []
    for pdf_path in pdf_paths:
        if Path(pdf_path).exists():
            print(f"Processing PDF: {pdf_path}")
            text = extract_text_from_pdf(pdf_path)
            extracted_info = extract_disease_info_from_text(text)
            all_extracted_info.extend(extracted_info)
            print(f"Extracted {len(extracted_info)} disease references from {pdf_path}")
        else:
            print(f"PDF file not found: {pdf_path}")
    
    print(f"Total extracted disease references: {len(all_extracted_info)}")
    
    # Enhance existing diseases
    enhanced_diseases = enhance_existing_diseases(existing_diseases, all_extracted_info)
    
    # Add comprehensive treatments
    enhanced_diseases = add_comprehensive_treatments(enhanced_diseases)
    
    # Save enhanced data
    output_data = {
        'diseases': enhanced_diseases,
        'metadata': {
            'total_diseases': len(enhanced_diseases),
            'sources': ['Classical Ayurvedic texts', 'Scientific research', 'Traditional knowledge'],
            'last_updated': '2024-01-01',
            'version': '2.0'
        }
    }
    
    output_path = 'backend/data/enhanced_diseases.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"Enhanced disease data saved to: {output_path}")
    print(f"Total enhanced diseases: {len(enhanced_diseases)}")
    
    # Print sample enhanced disease
    if enhanced_diseases:
        sample = enhanced_diseases[0]
        print("\nSample enhanced disease:")
        print(f"Name: {sample['name']}")
        print(f"Sanskrit: {sample.get('sanskrit', 'N/A')}")
        print(f"English: {sample.get('englishName', 'N/A')}")
        print(f"Dosha: {sample.get('dosha', 'N/A')}")
        print(f"Treatments: {len(sample.get('treatments', []))}")
        print(f"Lifestyle: {len(sample.get('lifestyle', []))}")

if __name__ == "__main__":
    main() 