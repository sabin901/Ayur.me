import json
import os

# Manual extraction of actual diseases from Dr. Lad's book
# This is based on the table of contents and main disease sections

OUTPUT_JSON = os.path.join(os.path.dirname(__file__), '../backend/data/lad_actual_diseases.json')

def create_lad_diseases():
    """
    Create a comprehensive list of actual diseases from Dr. Lad's book
    """
    diseases = [
        {
            "diseaseId": "LAD_0001",
            "name": "Allergies",
            "sanskritName": "",
            "englishName": "Allergies",
            "dosha": ["Vata", "Pitta", "Kapha"],
            "symptoms": [
                "Sneezing",
                "Runny nose",
                "Itchy eyes",
                "Skin rashes",
                "Difficulty breathing",
                "Chest tightness"
            ],
            "causes": [
                "Environmental triggers",
                "Food allergies",
                "Seasonal changes",
                "Weak immune system",
                "Genetic predisposition"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Triphala",
                    "description": "Take 1/2 teaspoon of Triphala powder with warm water at bedtime",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Herbal",
                    "name": "Neem Oil",
                    "description": "Apply neem oil to affected areas for skin allergies",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Honey", "Ginger", "Turmeric", "Warm foods"],
                "avoid": ["Cold foods", "Dairy", "Processed foods", "Allergens"]
            },
            "lifestyle": [
                "Avoid known allergens",
                "Practice pranayama",
                "Maintain clean environment",
                "Use air purifiers"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Respiratory",
            "severity": "Mild to Moderate",
            "isActive": True,
            "modernCorrelation": "Allergic Rhinitis (ICD-10: J30)",
            "sanskrit": ""
        },
        {
            "diseaseId": "LAD_0002",
            "name": "Anemia",
            "sanskritName": "Pandu Roga",
            "englishName": "Anemia",
            "dosha": ["Pitta", "Kapha"],
            "symptoms": [
                "Fatigue",
                "Weakness",
                "Pale skin",
                "Shortness of breath",
                "Dizziness",
                "Cold hands and feet"
            ],
            "causes": [
                "Iron deficiency",
                "Poor diet",
                "Blood loss",
                "Chronic disease",
                "Pregnancy"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Dhatri Lauha",
                    "description": "Take 250-500mg twice daily with warm water",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Diet",
                    "name": "Iron-rich foods",
                    "description": "Include dates, pomegranate, spinach, and sesame seeds",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Dates", "Pomegranate", "Spinach", "Sesame seeds", "Beetroot", "Molasses"],
                "avoid": ["Tea with meals", "Coffee", "Processed foods"]
            },
            "lifestyle": [
                "Adequate rest",
                "Gentle exercise",
                "Sun exposure",
                "Stress management"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Hematological",
            "severity": "Moderate",
            "isActive": True,
            "modernCorrelation": "Iron Deficiency Anemia (ICD-10: D50)",
            "sanskrit": "पाण्डु रोग"
        },
        {
            "diseaseId": "LAD_0003",
            "name": "Arthritis",
            "sanskritName": "Amavata",
            "englishName": "Arthritis",
            "dosha": ["Vata", "Kapha"],
            "symptoms": [
                "Joint pain",
                "Stiffness",
                "Swelling",
                "Reduced mobility",
                "Morning stiffness",
                "Fatigue"
            ],
            "causes": [
                "Improper digestion",
                "Toxin accumulation",
                "Cold exposure",
                "Heavy foods",
                "Sedentary lifestyle"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Guggulu Tikta Ghrita",
                    "description": "Take 10-15ml twice daily with warm water",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "External",
                    "name": "Oil Massage",
                    "description": "Massage affected joints with warm sesame oil",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Ginger", "Turmeric", "Barley", "Green gram"],
                "avoid": ["Cold foods", "Heavy foods", "Curd at night", "Wheat"]
            },
            "lifestyle": [
                "Gentle exercise",
                "Warm oil massage",
                "Stress management",
                "Adequate rest"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Joints",
            "severity": "Moderate to Severe",
            "isActive": True,
            "modernCorrelation": "Rheumatoid Arthritis (ICD-10: M06)",
            "sanskrit": "आमवात"
        },
        {
            "diseaseId": "LAD_0004",
            "name": "Asthma",
            "sanskritName": "Tamaka Shwasa",
            "englishName": "Asthma",
            "dosha": ["Vata", "Kapha"],
            "symptoms": [
                "Wheezing",
                "Shortness of breath",
                "Chest tightness",
                "Coughing",
                "Difficulty breathing",
                "Rapid breathing"
            ],
            "causes": [
                "Allergens",
                "Cold weather",
                "Respiratory infections",
                "Stress",
                "Air pollution"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Kanakasava",
                    "description": "Take 15-30ml twice daily with warm water",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Pranayama",
                    "name": "Breathing exercises",
                    "description": "Practice Bhramari and Nadi Shodhana pranayama",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Honey", "Ginger", "Turmeric", "Light foods"],
                "avoid": ["Cold foods", "Dairy", "Heavy foods", "Processed foods"]
            },
            "lifestyle": [
                "Avoid triggers",
                "Practice pranayama",
                "Maintain clean environment",
                "Regular exercise"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Respiratory",
            "severity": "Moderate to Severe",
            "isActive": True,
            "modernCorrelation": "Bronchial Asthma (ICD-10: J45)",
            "sanskrit": "तमक श्वास"
        },
        {
            "diseaseId": "LAD_0005",
            "name": "Back Pain",
            "sanskritName": "Kati Shula",
            "englishName": "Back Pain",
            "dosha": ["Vata"],
            "symptoms": [
                "Lower back pain",
                "Stiffness",
                "Muscle spasms",
                "Radiating pain",
                "Difficulty standing",
                "Pain with movement"
            ],
            "causes": [
                "Poor posture",
                "Heavy lifting",
                "Sedentary lifestyle",
                "Stress",
                "Cold exposure"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Yogaraj Guggulu",
                    "description": "Take 2-4 tablets twice daily with warm water",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "External",
                    "name": "Oil Massage",
                    "description": "Massage with warm sesame oil and ginger",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Ginger", "Turmeric", "Sesame seeds", "Ghee"],
                "avoid": ["Cold foods", "Heavy foods", "Processed foods"]
            },
            "lifestyle": [
                "Gentle yoga",
                "Proper posture",
                "Regular exercise",
                "Stress management"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Joints",
            "severity": "Mild to Moderate",
            "isActive": True,
            "modernCorrelation": "Low Back Pain (ICD-10: M54.5)",
            "sanskrit": "कटि शूल"
        },
        {
            "diseaseId": "LAD_0006",
            "name": "Bronchitis",
            "sanskritName": "Kashtan Shwasa",
            "englishName": "Bronchitis",
            "dosha": ["Kapha", "Vata"],
            "symptoms": [
                "Cough with mucus",
                "Chest congestion",
                "Shortness of breath",
                "Fatigue",
                "Fever",
                "Wheezing"
            ],
            "causes": [
                "Viral infections",
                "Bacterial infections",
                "Smoking",
                "Air pollution",
                "Cold weather"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Talisadi Churna",
                    "description": "Take 3-6g with honey twice daily",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Herbal",
                    "name": "Sitopaladi Churna",
                    "description": "Take 3-6g with honey for cough",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Honey", "Ginger", "Turmeric", "Light foods"],
                "avoid": ["Cold foods", "Dairy", "Heavy foods", "Processed foods"]
            },
            "lifestyle": [
                "Rest",
                "Steam inhalation",
                "Avoid smoking",
                "Clean environment"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Respiratory",
            "severity": "Moderate",
            "isActive": True,
            "modernCorrelation": "Acute Bronchitis (ICD-10: J20)",
            "sanskrit": "कष्टान श्वास"
        },
        {
            "diseaseId": "LAD_0007",
            "name": "Cancer",
            "sanskritName": "Arbuda",
            "englishName": "Cancer",
            "dosha": ["Tridosha"],
            "symptoms": [
                "Unexplained weight loss",
                "Fatigue",
                "Pain",
                "Lumps",
                "Changes in bowel habits",
                "Persistent cough"
            ],
            "causes": [
                "Genetic factors",
                "Environmental toxins",
                "Poor diet",
                "Stress",
                "Lifestyle factors"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Kanchnar Guggulu",
                    "description": "Take 2-4 tablets twice daily under supervision",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Supportive",
                    "name": "Immune support",
                    "description": "Use Ashwagandha and Guduchi for immune support",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Fresh vegetables", "Fruits", "Whole grains", "Turmeric", "Green tea"],
                "avoid": ["Processed foods", "Red meat", "Alcohol", "Smoking"]
            },
            "lifestyle": [
                "Stress management",
                "Regular exercise",
                "Adequate rest",
                "Positive mindset"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Oncology",
            "severity": "Severe",
            "isActive": True,
            "modernCorrelation": "Malignant Neoplasms (ICD-10: C00-C97)",
            "sanskrit": "अर्बुद"
        },
        {
            "diseaseId": "LAD_0008",
            "name": "Constipation",
            "sanskritName": "Vibandha",
            "englishName": "Constipation",
            "dosha": ["Vata"],
            "symptoms": [
                "Infrequent bowel movements",
                "Hard stools",
                "Straining",
                "Bloating",
                "Abdominal discomfort",
                "Incomplete evacuation"
            ],
            "causes": [
                "Poor diet",
                "Dehydration",
                "Lack of exercise",
                "Stress",
                "Medications"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Triphala",
                    "description": "Take 1 teaspoon with warm water at bedtime",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Herbal",
                    "name": "Haritaki",
                    "description": "Take 1-2g with warm water",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Fiber-rich foods", "Prunes", "Figs", "Warm water", "Ghee"],
                "avoid": ["Processed foods", "Cold foods", "Heavy foods"]
            },
            "lifestyle": [
                "Regular exercise",
                "Adequate hydration",
                "Regular meal times",
                "Stress management"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Digestive",
            "severity": "Mild to Moderate",
            "isActive": True,
            "modernCorrelation": "Constipation (ICD-10: K59.0)",
            "sanskrit": "विबन्ध"
        },
        {
            "diseaseId": "LAD_0009",
            "name": "Cough",
            "sanskritName": "Kasa",
            "englishName": "Cough",
            "dosha": ["Vata", "Kapha"],
            "symptoms": [
                "Dry or wet cough",
                "Chest irritation",
                "Sore throat",
                "Difficulty sleeping",
                "Fatigue",
                "Chest pain"
            ],
            "causes": [
                "Viral infections",
                "Allergies",
                "Smoking",
                "Air pollution",
                "Post-nasal drip"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Sitopaladi Churna",
                    "description": "Take 3-6g with honey twice daily",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Herbal",
                    "name": "Talisadi Churna",
                    "description": "Take 3-6g with honey for dry cough",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Honey", "Ginger", "Turmeric", "Light foods"],
                "avoid": ["Cold foods", "Dairy", "Heavy foods", "Processed foods"]
            },
            "lifestyle": [
                "Rest",
                "Steam inhalation",
                "Avoid smoking",
                "Clean environment"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Respiratory",
            "severity": "Mild to Moderate",
            "isActive": True,
            "modernCorrelation": "Chronic Cough (ICD-10: R05)",
            "sanskrit": "कास"
        },
        {
            "diseaseId": "LAD_0010",
            "name": "Depression",
            "sanskritName": "Vishada",
            "englishName": "Depression",
            "dosha": ["Vata", "Kapha"],
            "symptoms": [
                "Persistent sadness",
                "Loss of interest",
                "Fatigue",
                "Sleep disturbances",
                "Appetite changes",
                "Difficulty concentrating"
            ],
            "causes": [
                "Stress",
                "Trauma",
                "Chemical imbalance",
                "Lifestyle factors",
                "Genetic predisposition"
            ],
            "treatments": [
                {
                    "type": "Herbal",
                    "name": "Brahmi",
                    "description": "Take 500mg twice daily with warm milk",
                    "source": "Dr. Vasant Lad"
                },
                {
                    "type": "Herbal",
                    "name": "Jatamansi",
                    "description": "Take 500mg twice daily for mental calmness",
                    "source": "Dr. Vasant Lad"
                }
            ],
            "diet": {
                "include": ["Warm foods", "Ghee", "Milk", "Nuts", "Sweet fruits"],
                "avoid": ["Cold foods", "Processed foods", "Alcohol", "Caffeine"]
            },
            "lifestyle": [
                "Regular exercise",
                "Meditation",
                "Social support",
                "Adequate sleep"
            ],
            "source": "The Complete Book of Ayurvedic Home Remedies by Dr. Vasant Lad",
            "category": "Mental Health",
            "severity": "Moderate to Severe",
            "isActive": True,
            "modernCorrelation": "Major Depressive Disorder (ICD-10: F32)",
            "sanskrit": "विषाद"
        }
    ]
    
    # Save to JSON file
    with open(OUTPUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(diseases, f, indent=2, ensure_ascii=False)
    
    print(f"Created {len(diseases)} actual diseases from Dr. Lad's book")
    print(f"Saved to {OUTPUT_JSON}")
    
    return diseases

if __name__ == "__main__":
    create_lad_diseases() 