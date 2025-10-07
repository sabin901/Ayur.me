import scrapy
import PyPDF2
import pytesseract
from bs4 import BeautifulSoup
import spacy
import json
import re
import requests
from urllib.parse import urljoin
from io import BytesIO
import logging
from pdf2image import convert_from_bytes
import os

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class AyurvedaSpider(scrapy.Spider):
    name = 'ayurveda_scraper'
    allowed_domains = [
        'archive.org', 'rkamc.org.in', 'sanskritdocuments.org', 'tbrc.org',
        'accesstoinsight.org', 'ccras.nic.in', 'iamj.in', 'easyayurveda.com',
        'niimh.nic.in', 'dli.ernet.in', 'wisdomlib.org', 'amitaayurveda.com',
        'planetayurveda.com', 'rarebooksocietyofindia.org', 'chandigarhayurvedcentre.com'
    ]
    start_urls = [
        # Classical Texts
        'https://archive.org/details/charakasamhita00char',
        'https://archive.org/details/CharakaSamhitaTextWithEnglishTanslationP.V.Sharma',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english',
        'https://archive.org/details/sushrutasamhita00susr',
        'https://archive.org/details/in.ernet.dli.2015.324129',
        'https://niimh.nic.in/ebooks/esamhita',
        'https://archive.org/search.php?query=Ashtanga%20Sangraha',
        'https://archive.org/search.php?query=Madhava%20Nidanam',
        'https://www.iamj.in/posts/2019/images/upload/2731_2740.pdf',
        'https://archive.org/search.php?query=Bhavaprakasha',
        'https://sanskritdocuments.org/doc_ayurveda/sharngadharasamhita.html',
        'https://www.tbrc.org/#library_work_ViewByOutline-W1KG13126',
        'https://archive.org/details/bowermanuscript00hoer',
        'https://sanskritdocuments.org/doc_veda/atharva.html',
        'https://www.tbrc.org/#library_work_ViewByOutline-W1KG13127',
        'https://www.accesstoinsight.org/tipitaka/vin',
        'http://www.ccras.nic.in/content/ayurvedic-pharmacopoeia-india',
        # Modern References
        'https://www.easyayurveda.com/2016/08/22/classification-of-vyadhi-diseases-ayurveda/',
        'https://amitaayurveda.com/ayurveda-breaking-the-rules-without-breaking-the-principles/',
        'https://www.planetayurveda.com',
        'https://www.chandigarhayurvedcentre.com',
        # Expanded Classical Chapters (Charaka Samhita Nidana Sthana)
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627511.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627512.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627513.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627514.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627515.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627516.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627517.html',
        'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627518.html',
        # Sushruta Samhita Nidana Sthana
        'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108330.html',
        'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108331.html',
        'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108332.html',
        'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108333.html',
        # Ashtanga Hridaya Nidana Sthana
        'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492209.html',
        'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492210.html',
        'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492211.html',
        # Madhava Nidanam
        'https://www.wisdomlib.org/hinduism/book/madhava-nidana-english',
        # Bhava Prakasha
        'https://www.wisdomlib.org/hinduism/book/bhavaprakasha-english',
        # Modern Disease Lists
        'https://www.ayurvedacollege.com/blog/ayurvedic-disease-list/',
        'https://www.ayurveduniversity.edu.in/ayurveda-diseases-list/',
        'https://www.ayurvedaparampara.com/ayurvedic-diseases/',
        'https://www.ayurmedinfo.com/ayurvedic-diseases/',
    ]
    custom_urls = {
        'Charaka Samhita Nidana Sthana Ch. 1': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627511.html',
        'Charaka Samhita Nidana Sthana Ch. 2': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627512.html',
        'Charaka Samhita Nidana Sthana Ch. 3': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627513.html',
        'Charaka Samhita Nidana Sthana Ch. 4': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627514.html',
        'Charaka Samhita Nidana Sthana Ch. 5': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627515.html',
        'Charaka Samhita Nidana Sthana Ch. 6': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627516.html',
        'Charaka Samhita Nidana Sthana Ch. 7': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627517.html',
        'Charaka Samhita Nidana Sthana Ch. 8': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627518.html',
        'Sushruta Samhita Nidana Sthana Ch. 1': 'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108330.html',
        'Sushruta Samhita Nidana Sthana Ch. 2': 'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108331.html',
        'Sushruta Samhita Nidana Sthana Ch. 3': 'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108332.html',
        'Sushruta Samhita Nidana Sthana Ch. 4': 'https://www.wisdomlib.org/hinduism/book/sushruta-samhita-english/d/doc108333.html',
        'Ashtanga Hridaya Nidana Sthana Ch. 1': 'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492209.html',
        'Ashtanga Hridaya Nidana Sthana Ch. 2': 'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492210.html',
        'Ashtanga Hridaya Nidana Sthana Ch. 3': 'https://www.wisdomlib.org/hinduism/book/ashtanga-hridaya-english/d/doc492211.html',
        'Madhava Nidanam': 'https://www.wisdomlib.org/hinduism/book/madhava-nidana-english',
        'Bhava Prakasha': 'https://www.wisdomlib.org/hinduism/book/bhavaprakasha-english',
        # Existing entries
        'Charaka Samhita Nidana Sthana': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627511.html',
        'Charaka Samhita Chikitsa Sthana': 'https://www.wisdomlib.org/hinduism/book/charaka-samhita-english/d/doc627667.html',
        'Sushruta Samhita Chikitsa Sthana': 'https://archive.org/details/in.ernet.dli.2015.324129/page/n5/mode/2up',
        'Madhava Nidanam Ch. 1-79': 'https://www.iamj.in/posts/2019/images/upload/2731_2740.pdf',
        'Bhava Prakasha Nighantu': 'https://archive.org/details/BhavaPrakasha',
        'Ashtanga Hridaya Nidana Sthana': 'https://archive.org/details/AshtangaHridayaSutraSthana',
        'Ayurvedic Pharmacopoeia Part I': 'http://www.ccras.nic.in/sites/default/files/viewpdf/APC%20PDF/Part%20I%20Vol%20I%20to%20IX%20-%20e-Book%20-%202018.pdf'
    }
    modern_correlations = {
        'Yakṣma': 'Tuberculosis (ICD-10: A15-A19)',
        'Madhumeha': 'Type 2 Diabetes (ICD-10: E11)',
        'Kushtha': 'Psoriasis (ICD-10: L40)',
        'Gridhrasi': 'Sciatica (ICD-10: M54.3)',
        'Jwara': 'Fever/Malaria (ICD-10: R50, B50-B54)',
        'Unmada': 'Psychosis (ICD-10: F20-F29)',
        'Apasmara': 'Epilepsy (ICD-10: G40)',
        'Shotha': 'Edema (ICD-10: R60)',
        'Arsha': 'Hemorrhoids (ICD-10: K64)',
        'Kamala': 'Jaundice (ICD-10: K71)',
        'Hridroga': 'Heart Disease (ICD-10: I20-I25)',
        'Panduroga': 'Anemia (ICD-10: D50-D64)'
    }
    toxic_ingredients = [
        'Parada', 'Gandhaka', 'Visha', 'Dhatura', 'Bhallataka', 'Kupilu', 'Ahiphena',
        'Swarna Bhasma', 'Tamra Bhasma', 'Lauha Bhasma', 'Lead', 'Mercury', 'Arsenic'
    ]
    dosha_keywords = {
        'Vata': ['Vata', 'Vayu', 'wind', 'dryness', 'cold', 'light'],
        'Pitta': ['Pitta', 'Pita', 'fire', 'heat', 'burning', 'sharp'],
        'Kapha': ['Kapha', 'Sleshma', 'phlegm', 'moisture', 'heavy', 'oily']
    }
    herb_keywords = [
        'Guggulu', 'Neem', 'Guduchi', 'Ashwagandha', 'Triphala', 'Shallaki', 'Nirgundi',
        'Amalaki', 'Haritaki', 'Bibhitaki', 'Tulsi', 'Shatavari', 'Brahmi', 'Haridra',
        'Pippali', 'Shunthi', 'Yashtimadhu'
    ]
    symptom_keywords = [
        'pain', 'swelling', 'fever', 'thirst', 'fatigue', 'itching', 'burning', 'numbness',
        'redness', 'cough', 'diarrhea', 'constipation', 'vomiting', 'weakness'
    ]
    treatment_keywords = ['treatment', 'chikitsa', 'remedy', 'cure', 'therapy', 'panchakarma']
    diet_keywords = ['diet', 'pathya', 'food', 'nutrition', 'ahara']
    lifestyle_keywords = ['lifestyle', 'vihara', 'routine', 'exercise', 'yoga']
    precaution_keywords = ['precaution', 'avoid', 'apathy', 'contraindication']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        try:
            self.nlp = spacy.load('en_core_web_sm')
            # Add custom pipeline for Ayurvedic terms
            if not self.nlp.has_pipe('entity_ruler'):
                ruler = self.nlp.add_pipe('entity_ruler')
            else:
                ruler = self.nlp.get_pipe('entity_ruler')
            patterns = [
                {'label': 'DISEASE', 'pattern': pattern}
                for pattern in self.modern_correlations.keys()
            ] + [
                {'label': 'SYMPTOM', 'pattern': pattern}
                for pattern in self.symptom_keywords
            ] + [
                {'label': 'HERB', 'pattern': pattern}
                for pattern in self.herb_keywords
            ] + [
                {'label': 'TOXIC', 'pattern': pattern}
                for pattern in self.toxic_ingredients
            ]
            ruler.add_patterns(patterns)
        except OSError:
            logging.error("spaCy model 'en_core_web_sm' not found. Install it with: python -m spacy download en_core_web_sm")
            raise
        self.diseases = []
        self.disease_count = 0
        self.sample_datasets = self.load_sample_datasets()

    def load_sample_datasets(self):
        # Expanded sample dataset for instant testing (15 diseases)
        return [
            {
                "diseaseId": "SAMPLE_1",
                "name": "Amavata",
                "sanskrit": "आमवात",
                "source": "Madhava Nidanam, Chapter 25",
                "dosha": ["Vata", "Kapha"],
                "symptoms": ["Joint pain", "Stiffness", "Swelling", "Fever", "Loss of appetite"],
                "pathogenesis": "Improper digestion leads to toxin accumulation in joints.",
                "treatments": [
                    {"type": "Herbal", "description": "Guggulu Tikta Ghrita", "ingredients": ["Guggulu", "Giloy", "Neem"], "source": "Classical"}
                ],
                "herbs": ["Guggulu", "Giloy", "Neem"],
                "precautions": ["Avoid cold/damp environments", "No day sleep after meals"],
                "diet": ["Warm foods", "Ginger", "Turmeric", "Barley", "Green gram"],
                "lifestyle": ["Gentle exercise", "Warm oil massage", "Stress management", "Adequate rest"],
                "modernEquivalent": "Rheumatoid Arthritis (ICD-10: M06.9)"
            },
            {
                "diseaseId": "SAMPLE_2",
                "name": "Madhumeha",
                "sanskrit": "मधुमेह",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Kapha", "Vata"],
                "symptoms": ["Excessive urination", "Sweet urine", "Fatigue", "Weight loss"],
                "pathogenesis": "Kapha and Vata imbalance affecting metabolism.",
                "treatments": [
                    {"type": "Herbal", "description": "Gudmar, Shilajit, Bitter gourd", "ingredients": ["Gudmar", "Shilajit", "Bitter gourd"], "source": "Classical"}
                ],
                "herbs": ["Gudmar", "Shilajit", "Bitter gourd"],
                "precautions": ["Avoid sweets", "Regular exercise"],
                "diet": ["Bitter foods", "Barley", "Millets"],
                "lifestyle": ["Daily walking", "Yoga"],
                "modernEquivalent": "Type 2 Diabetes (ICD-10: E11)"
            },
            {
                "diseaseId": "SAMPLE_3",
                "name": "Kushtha",
                "sanskrit": "कुष्ठ",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Tridosha"],
                "symptoms": ["Skin lesions", "Discoloration", "Itching", "Scaling"],
                "pathogenesis": "Tridosha imbalance affecting skin.",
                "treatments": [
                    {"type": "Herbal", "description": "Triphala, Neem, Khadirarishta", "ingredients": ["Triphala", "Neem", "Khadirarishta"], "source": "Classical"}
                ],
                "herbs": ["Triphala", "Neem", "Khadirarishta"],
                "precautions": ["Avoid spicy foods", "Maintain hygiene"],
                "diet": ["Bitter vegetables", "Green leafy vegetables"],
                "lifestyle": ["Sun exposure", "Regular bathing"],
                "modernEquivalent": "Psoriasis (ICD-10: L40)"
            },
            {
                "diseaseId": "SAMPLE_4",
                "name": "Jwara",
                "sanskrit": "ज्वर",
                "source": "Charaka Samhita, Nidana Sthana",
                "dosha": ["Tridosha"],
                "symptoms": ["Fever", "Chills", "Body ache", "Loss of appetite"],
                "pathogenesis": "Imbalance of all three doshas causing fever.",
                "treatments": [
                    {"type": "Herbal", "description": "Sudarshana Churna, Guduchi", "ingredients": ["Sudarshana Churna", "Guduchi"], "source": "Classical"}
                ],
                "herbs": ["Sudarshana Churna", "Guduchi"],
                "precautions": ["Avoid cold foods", "Rest"],
                "diet": ["Light soups", "Rice gruel"],
                "lifestyle": ["Rest", "Hydration"],
                "modernEquivalent": "Fever/Malaria (ICD-10: R50, B50-B54)"
            },
            {
                "diseaseId": "SAMPLE_5",
                "name": "Gridhrasi",
                "sanskrit": "गृध्रसी",
                "source": "Madhava Nidanam, Chapter 22",
                "dosha": ["Vata", "Kapha"],
                "symptoms": ["Radiating leg pain", "Stiffness", "Difficulty walking"],
                "pathogenesis": "Vata and Kapha affecting sciatic nerve.",
                "treatments": [
                    {"type": "Therapy", "description": "Kati Basti, Nirgundi oil massage", "ingredients": ["Nirgundi oil"], "source": "Classical"}
                ],
                "herbs": ["Nirgundi oil"],
                "precautions": ["Avoid cold exposure", "No heavy lifting"],
                "diet": ["Warm foods", "Barley"],
                "lifestyle": ["Gentle yoga", "Physiotherapy"],
                "modernEquivalent": "Sciatica (ICD-10: M54.3)"
            },
            {
                "diseaseId": "SAMPLE_6",
                "name": "Shotha",
                "sanskrit": "शोथ",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Kapha", "Pitta"],
                "symptoms": ["Swelling", "Redness", "Pain"],
                "pathogenesis": "Kapha and Pitta causing fluid retention.",
                "treatments": [
                    {"type": "Herbal", "description": "Punarnava, Gokshura", "ingredients": ["Punarnava", "Gokshura"], "source": "Classical"}
                ],
                "herbs": ["Punarnava", "Gokshura"],
                "precautions": ["Avoid salty foods", "Elevate legs"],
                "diet": ["Low salt diet", "Barley water"],
                "lifestyle": ["Leg elevation", "Gentle walking"],
                "modernEquivalent": "Edema (ICD-10: R60)"
            },
            {
                "diseaseId": "SAMPLE_7",
                "name": "Arsha",
                "sanskrit": "अर्श",
                "source": "Sushruta Samhita, Chikitsa Sthana",
                "dosha": ["Vata", "Pitta"],
                "symptoms": ["Rectal pain", "Bleeding", "Constipation"],
                "pathogenesis": "Vata and Pitta causing hemorrhoids.",
                "treatments": [
                    {"type": "Herbal", "description": "Triphala, Kankayana Vati", "ingredients": ["Triphala", "Kankayana Vati"], "source": "Classical"}
                ],
                "herbs": ["Triphala", "Kankayana Vati"],
                "precautions": ["Avoid straining", "High fiber diet"],
                "diet": ["High fiber foods", "Prunes"],
                "lifestyle": ["Regular bowel habits", "Sitz baths"],
                "modernEquivalent": "Hemorrhoids (ICD-10: K64)"
            },
            {
                "diseaseId": "SAMPLE_8",
                "name": "Kamala",
                "sanskrit": "कमला",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Pitta"],
                "symptoms": ["Jaundice", "Yellow eyes", "Fatigue"],
                "pathogenesis": "Pitta dosha affecting liver.",
                "treatments": [
                    {"type": "Herbal", "description": "Bhumyamalaki, Kutki", "ingredients": ["Bhumyamalaki", "Kutki"], "source": "Classical"}
                ],
                "herbs": ["Bhumyamalaki", "Kutki"],
                "precautions": ["Avoid alcohol", "Low fat diet"],
                "diet": ["Bitter vegetables", "Green leafy vegetables"],
                "lifestyle": ["Rest", "Hydration"],
                "modernEquivalent": "Jaundice (ICD-10: K71)"
            },
            {
                "diseaseId": "SAMPLE_9",
                "name": "Hridroga",
                "sanskrit": "हृद्रोग",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Vata", "Pitta"],
                "symptoms": ["Chest pain", "Palpitations", "Shortness of breath"],
                "pathogenesis": "Vata and Pitta affecting heart function.",
                "treatments": [
                    {"type": "Herbal", "description": "Arjuna, Pushkarmool", "ingredients": ["Arjuna", "Pushkarmool"], "source": "Classical"}
                ],
                "herbs": ["Arjuna", "Pushkarmool"],
                "precautions": ["Avoid stress", "Regular checkups"],
                "diet": ["Low salt diet", "Fruits"],
                "lifestyle": ["Stress management", "Regular exercise"],
                "modernEquivalent": "Heart Disease (ICD-10: I20-I25)"
            },
            {
                "diseaseId": "SAMPLE_10",
                "name": "Panduroga",
                "sanskrit": "पाण्डुरोग",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Pitta", "Kapha"],
                "symptoms": ["Paleness", "Fatigue", "Weakness"],
                "pathogenesis": "Pitta and Kapha causing anemia.",
                "treatments": [
                    {"type": "Herbal", "description": "Punarnava, Mandur Bhasma", "ingredients": ["Punarnava", "Mandur Bhasma"], "source": "Classical"}
                ],
                "herbs": ["Punarnava", "Mandur Bhasma"],
                "precautions": ["Avoid heavy foods", "Iron-rich diet"],
                "diet": ["Iron-rich foods", "Leafy greens"],
                "lifestyle": ["Regular meals", "Adequate sleep"],
                "modernEquivalent": "Anemia (ICD-10: D50-D64)"
            },
            {
                "diseaseId": "SAMPLE_11",
                "name": "Unmada",
                "sanskrit": "उन्माद",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Pitta", "Vata"],
                "symptoms": ["Delirium", "Hallucinations", "Agitation"],
                "pathogenesis": "Pitta and Vata affecting mind.",
                "treatments": [
                    {"type": "Herbal", "description": "Brahmi, Shankhpushpi", "ingredients": ["Brahmi", "Shankhpushpi"], "source": "Classical"}
                ],
                "herbs": ["Brahmi", "Shankhpushpi"],
                "precautions": ["Avoid stress", "Regular sleep"],
                "diet": ["Sattvic foods", "Milk"],
                "lifestyle": ["Meditation", "Yoga"],
                "modernEquivalent": "Psychosis (ICD-10: F20-F29)"
            },
            {
                "diseaseId": "SAMPLE_12",
                "name": "Apasmara",
                "sanskrit": "अपस्मार",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Vata", "Pitta"],
                "symptoms": ["Seizures", "Loss of consciousness", "Convulsions"],
                "pathogenesis": "Vata and Pitta affecting brain function.",
                "treatments": [
                    {"type": "Herbal", "description": "Vacha, Brahmi", "ingredients": ["Vacha", "Brahmi"], "source": "Classical"}
                ],
                "herbs": ["Vacha", "Brahmi"],
                "precautions": ["Avoid triggers", "Regular medication"],
                "diet": ["Light diet", "Fruits"],
                "lifestyle": ["Regular sleep", "Stress management"],
                "modernEquivalent": "Epilepsy (ICD-10: G40)"
            },
            {
                "diseaseId": "SAMPLE_13",
                "name": "Amlapitta",
                "sanskrit": "अम्लपित्त",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Pitta", "Vata"],
                "symptoms": ["Acidity", "Heartburn", "Nausea"],
                "pathogenesis": "Pitta and Vata causing hyperacidity.",
                "treatments": [
                    {"type": "Herbal", "description": "Shatavari, Yashtimadhu", "ingredients": ["Shatavari", "Yashtimadhu"], "source": "Classical"}
                ],
                "herbs": ["Shatavari", "Yashtimadhu"],
                "precautions": ["Avoid spicy foods", "Eat on time"],
                "diet": ["Cooling foods", "Milk"],
                "lifestyle": ["Regular meals", "Stress management"],
                "modernEquivalent": "Hyperacidity (ICD-10: K21.9)"
            },
            {
                "diseaseId": "SAMPLE_14",
                "name": "Vatarakta",
                "sanskrit": "वातरक्त",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Vata", "Pitta"],
                "symptoms": ["Joint pain", "Redness", "Swelling"],
                "pathogenesis": "Vata and Pitta affecting joints.",
                "treatments": [
                    {"type": "Herbal", "description": "Manjistha, Guduchi", "ingredients": ["Manjistha", "Guduchi"], "source": "Classical"}
                ],
                "herbs": ["Manjistha", "Guduchi"],
                "precautions": ["Avoid cold", "Regular exercise"],
                "diet": ["Anti-inflammatory foods", "Barley"],
                "lifestyle": ["Gentle yoga", "Warm baths"],
                "modernEquivalent": "Gout (ICD-10: M10)"
            },
            {
                "diseaseId": "SAMPLE_15",
                "name": "Shwasa",
                "sanskrit": "श्वास",
                "source": "Charaka Samhita, Chikitsa Sthana",
                "dosha": ["Vata", "Kapha"],
                "symptoms": ["Breathlessness", "Cough", "Wheezing"],
                "pathogenesis": "Vata and Kapha affecting respiratory system.",
                "treatments": [
                    {"type": "Herbal", "description": "Vasa, Pushkarmool", "ingredients": ["Vasa", "Pushkarmool"], "source": "Classical"}
                ],
                "herbs": ["Vasa", "Pushkarmool"],
                "precautions": ["Avoid cold air", "No smoking"],
                "diet": ["Warm soups", "Herbal teas"],
                "lifestyle": ["Breathing exercises", "Avoid allergens"],
                "modernEquivalent": "Asthma (ICD-10: J45)"
            }
        ]

    def start_requests(self):
        self.diseases.extend(self.sample_datasets)
        self.disease_count += len(self.sample_datasets)
        for url in self.start_urls:
            yield scrapy.Request(url, callback=self.parse, errback=self.handle_error)
        for name, url in self.custom_urls.items():
            yield scrapy.Request(url, callback=self.parse_search_page, meta={'text_name': name})

    def parse_search_page(self, response):
        text_name = response.meta['text_name']
        soup = BeautifulSoup(response.text, 'html.parser')
        for link in soup.select('a[href*=".pdf"], a[href*="/details/"]'):
            pdf_url = urljoin(response.url, link['href'])
            if not pdf_url.startswith('http'):
                pdf_url = f"https://{self.allowed_domains[0]}{pdf_url}"
            yield scrapy.Request(pdf_url, callback=self.parse_pdf, meta={'text_name': text_name})

    def parse(self, response):
        soup = BeautifulSoup(response.text, 'html.parser')
        source = response.url
        if any(domain in source for domain in ['easyayurveda.com', 'wisdomlib.org', 'amitaayurveda.com', 'planetayurveda.com', 'chandigarhayurvedcentre.com']):
            for section in soup.select('h2, h3, h4'):
                header = section.text.strip()
                if any(keyword in header.lower() for keyword in ['vata', 'pitta', 'kapha', 'vyadhi', 'nidana', 'chikitsa', 'disease', 'roga', 'samprapti']):
                    disease_data = self.parse_section(section, source)
                    if disease_data:
                        self.diseases.append(disease_data)
                        self.disease_count += 1
                        logging.info(f"Extracted disease {self.disease_count}: {disease_data['diseaseId']}")
        elif any(domain in source for domain in ['sanskritdocuments.org', 'accesstoinsight.org', 'niimh.nic.in']):
            for section in soup.select('p, div.content, div.text'):
                text = section.text.strip()
                disease_data = self.parse_text(text, source)
                if disease_data:
                    if isinstance(disease_data, list):
                        self.diseases.extend(disease_data)
                        self.disease_count += len(disease_data)
                        for d in disease_data:
                            logging.info(f"Extracted disease {self.disease_count}: {d['diseaseId']}")
                    else:
                        self.diseases.append(disease_data)
                        self.disease_count += 1
                        logging.info(f"Extracted disease {self.disease_count}: {disease_data['diseaseId']}")
        self.save_data()

    def parse_pdf(self, response):
        text_name = response.meta['text_name']
        try:
            pdf_file = BytesIO(response.body)
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ''
            for page in pdf_reader.pages:
                extracted_text = page.extract_text()
                if extracted_text:
                    text += extracted_text + '\n'
                else:
                    logging.warning(f"Text extraction failed for page in {text_name}. Attempting OCR.")
                    text += self.ocr_pdf(pdf_file)
            disease_data = self.parse_text(text, text_name)
            if disease_data:
                if isinstance(disease_data, list):
                    self.diseases.extend(disease_data)
                    self.disease_count += len(disease_data)
                    for d in disease_data:
                        logging.info(f"Extracted disease {self.disease_count}: {d['diseaseId']}")
                else:
                    self.diseases.append(disease_data)
                    self.disease_count += 1
                    logging.info(f"Extracted disease {self.disease_count}: {disease_data['diseaseId']}")
        except Exception as e:
            logging.error(f"Error processing PDF {text_name}: {str(e)}")
        self.save_data()

    def ocr_pdf(self, pdf_file):
        try:
            images = convert_from_bytes(pdf_file.read())
            text = ''
            for image in images:
                text += pytesseract.image_to_string(image) + '\n'
            return text
        except Exception as e:
            logging.error(f"OCR failed: {str(e)}")
            return ''

    def parse_section(self, section, source):
        header = section.text.strip()
        doc = self.nlp(header + ' ' + (section.next_sibling.text if section.next_sibling else ''))
        disease_name = None
        for ent in doc.ents:
            if ent.label_ == 'DISEASE' or any(keyword in ent.text.lower() for keyword in self.modern_correlations.keys()):
                disease_name = ent.text
                break
        if not disease_name:
            return None
        symptoms = []
        treatments = []
        herbs = []
        diet = []
        lifestyle = []
        precautions = []
        text = ''
        for sibling in section.next_siblings:
            if sibling.name in ['ul', 'p', 'div'] and hasattr(sibling, 'text'):
                text += sibling.text.strip() + ' '
                doc_sibling = self.nlp(text)
                # Extract symptoms
                if any(s in text.lower() for s in self.symptom_keywords + ['lakshana', 'sign']):
                    symptoms.extend([ent.text for ent in doc_sibling.ents if ent.label_ == 'SYMPTOM' or any(s in ent.text.lower() for s in self.symptom_keywords)])
                # Extract treatments
                if any(t in text.lower() for t in self.treatment_keywords):
                    ingredients = re.findall(r'\b(' + '|'.join(self.herb_keywords + self.toxic_ingredients) + r')\b', text, re.I)
                    warning = 'Warning: Contains heavy metals, consult practitioner for safety' if any(i in ingredients for i in self.toxic_ingredients) else ''
                    treatments.append({
                        'type': 'Herbal' if any(i in self.herb_keywords for i in ingredients) else 'Therapy',
                        'description': text[:200] + '...' if len(text) > 200 else text,
                        'ingredients': ingredients or ['Not specified'],
                        'source': source
                    })
                    herbs.extend([i for i in ingredients if i in self.herb_keywords])
                    if warning:
                        precautions.append(warning)
                # Extract diet
                if any(d in text.lower() for d in self.diet_keywords):
                    diet.extend(['Barley', 'Bitter gourd', 'Millets'] if 'pitta' in text.lower() else ['Mung dal', 'Pomegranate'] if 'kapha' in text.lower() else ['Not specified'])
                # Extract lifestyle
                if any(l in text.lower() for l in self.lifestyle_keywords):
                    lifestyle.extend(['Daily yoga', 'Meditation', 'Pranayama'] if 'kapha' in text.lower() else ['Warm baths', 'Stress management'] if 'vata' in text.lower() else ['Not specified'])
                # Extract precautions
                if any(p in text.lower() for p in self.precaution_keywords):
                    precautions.extend(['Avoid cold foods', 'Avoid stress'] if 'vata' in text.lower() else ['Avoid spicy foods'] if 'pitta' in text.lower() else ['Not specified'])
                # Extract pathogenesis
                if any(p in text.lower() for p in ['pathogenesis', 'samprapti', 'cause', 'etiology']):
                    pathogenesis = text[:200] + '...' if len(text) > 200 else text
        return {
            'diseaseId': f"{source.split('/')[-1]}_{self.disease_count + 1}",
            'name': disease_name or 'Unknown',
            'sanskrit': disease_name or '',
            'source': source,
            'dosha': self.identify_dosha(header + ' ' + text),
            'symptoms': list(set(symptoms)) or ['Not specified'],
            'pathogenesis': pathogenesis if 'pathogenesis' in locals() else 'Not specified',
            'treatments': treatments or [{'type': 'Unknown', 'description': 'Not specified', 'ingredients': ['Not specified'], 'source': source}],
            'herbs': list(set(herbs)) or ['Not specified'],
            'precautions': list(set(precautions)) or ['Not specified'],
            'diet': list(set(diet)) or ['Not specified'],
            'lifestyle': list(set(lifestyle)) or ['Not specified'],
            'modernEquivalent': self.modern_correlations.get(disease_name, 'Not specified')
        }

    def parse_text(self, text, source):
        doc = self.nlp(text[:30000])  # Increased limit for better coverage
        disease_data = []
        current_disease = None
        for sent in doc.sents:
            if any(keyword in sent.text.lower() for keyword in ['disease', 'vyadhi', 'nidana', 'roga', 'samprapti'] + list(self.modern_correlations.keys())):
                current_disease = {
                    'diseaseId': f"{source.split('/')[-1]}_{self.disease_count + 1}",
                    'name': next((ent.text for ent in sent.ents if ent.label_ == 'DISEASE'), 'Unknown'),
                    'sanskrit': next((ent.text for ent in sent.ents if ent.label_ == 'DISEASE'), ''),
                    'source': source,
                    'dosha': self.identify_dosha(sent.text),
                    'symptoms': [],
                    'pathogenesis': 'Not specified',
                    'treatments': [],
                    'herbs': [],
                    'precautions': ['Not specified'],
                    'diet': ['Not specified'],
                    'lifestyle': ['Not specified'],
                    'modernEquivalent': next((self.modern_correlations.get(ent.text, 'Not specified') for ent in sent.ents if ent.text in self.modern_correlations), 'Not specified')
                }
                disease_data.append(current_disease)
            if current_disease:
                if any(s in sent.text.lower() for s in self.symptom_keywords + ['lakshana', 'sign']):
                    current_disease['symptoms'].extend([ent.text for ent in sent.ents if ent.label_ == 'SYMPTOM' or any(s in ent.text.lower() for s in self.symptom_keywords)])
                if any(t in sent.text.lower() for t in self.treatment_keywords):
                    ingredients = re.findall(r'\b(' + '|'.join(self.herb_keywords + self.toxic_ingredients) + r')\b', sent.text, re.I)
                    warning = 'Warning: Contains heavy metals, consult practitioner for safety' if any(i in ingredients for i in self.toxic_ingredients) else ''
                    current_disease['treatments'].append({
                        'type': 'Herbal' if any(i in self.herb_keywords for i in ingredients) else 'Therapy',
                        'description': sent.text[:200] + '...' if len(sent.text) > 200 else sent.text,
                        'ingredients': ingredients or ['Not specified'],
                        'source': source
                    })
                    current_disease['herbs'].extend([i for i in ingredients if i in self.herb_keywords])
                    if warning:
                        current_disease['precautions'].append(warning)
                if any(d in sent.text.lower() for d in self.diet_keywords):
                    current_disease['diet'] = ['Barley', 'Bitter gourd', 'Millets'] if 'pitta' in sent.text.lower() else ['Mung dal', 'Pomegranate'] if 'kapha' in sent.text.lower() else ['Not specified']
                if any(l in sent.text.lower() for l in self.lifestyle_keywords):
                    current_disease['lifestyle'] = ['Daily yoga', 'Meditation', 'Pranayama'] if 'kapha' in sent.text.lower() else ['Warm baths', 'Stress management'] if 'vata' in sent.text.lower() else ['Not specified']
                if any(p in sent.text.lower() for p in self.precaution_keywords):
                    current_disease['precautions'] = ['Avoid cold foods', 'Avoid stress'] if 'vata' in sent.text.lower() else ['Avoid spicy foods'] if 'pitta' in sent.text.lower() else ['Not specified']
                if any(p in sent.text.lower() for p in ['pathogenesis', 'samprapti', 'cause', 'etiology']):
                    current_disease['pathogenesis'] = sent.text[:200] + '...' if len(sent.text) > 200 else sent.text
        return disease_data if disease_data else None

    def identify_dosha(self, text):
        doshas = []
        for dosha, keywords in self.dosha_keywords.items():
            if any(k in text.lower() for k in keywords):
                doshas.append(dosha)
        return doshas or ['Not specified']

    def save_data(self):
        try:
            # Always write to backend/data/disease_database.json for backend compatibility
            output_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend', 'data', 'disease_database.json')
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(self.diseases, f, indent=2, ensure_ascii=False)
            logging.info(f"Saved {self.disease_count} diseases to {output_path}")
        except Exception as e:
            logging.error(f"Error saving data: {str(e)}")

    def handle_error(self, failure):
        logging.error(f"Request failed: {failure.request.url}") 