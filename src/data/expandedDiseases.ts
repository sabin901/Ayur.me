import { Disease } from '../assets/ayurvedicDiseases';

export const expandedDiseases: Disease[] = [
  {
    id: 101,
    name: 'Amlapitta',
    englishName: 'Hyperacidity / Acid Peptic Disease',
    sanskrit_name: 'अम्लपित्त',
    category: 'Gastrointestinal',
    dosha: ['Pitta', 'Kapha'],
    source: 'Kashyapa Samhita',
    symptoms: ['Heartburn', 'Sour belching', 'Nausea', 'Indigestion', 'Burning sensation in chest and throat', 'Loss of appetite'],
    causes: ['Spicy, sour, and salty food', 'Irregular eating habits', 'Stress and anger', 'Excessive tea/coffee', 'Late-night sleeping'],
    treatments: [
      { type: 'Panchakarma', name: 'Vamana', procedure: 'Therapeutic emesis to eliminate excess Pitta and Kapha from the stomach.' },
      { type: 'Panchakarma', name: 'Virechana', procedure: 'Therapeutic purgation to remove Pitta from the lower GI tract.' },
      { type: 'Internal Medicine', name: 'Kamadugha Rasa', dosage: '1 tablet twice a day with milk.' },
      { type: 'Internal Medicine', name: 'Sutasekhara Rasa', dosage: '1 tablet twice daily after meals.' },
      { type: 'Internal Medicine', name: 'Avipattikara Churna', dosage: '1 teaspoon with warm water before meals.' }
    ],
    diet: {
      include: ['Cold milk', 'Ghee', 'Coriander', 'Fennel', 'Coconut water', 'Sweet fruits like pomegranate and apple'],
      avoid: ['Spicy food', 'Fried food', 'Sour fruits', 'Fermented food', 'Alcohol', 'Garlic']
    },
    lifestyle: ['Regular meal timings', 'Yoga and meditation', 'Adequate sleep', 'Avoid sleeping immediately after meals'],
    modernCorrelation: 'GERD, Gastritis, Peptic Ulcer Disease'
  },
  {
    id: 102,
    name: 'Grahani',
    englishName: 'Irritable Bowel Syndrome / Malabsorption',
    sanskrit_name: 'ग्रहणी',
    category: 'Gastrointestinal',
    dosha: ['Vata', 'Pitta', 'Kapha'],
    source: 'Charaka Samhita',
    symptoms: ['Alternating diarrhea and constipation', 'Abdominal pain', 'Bloating', 'Fatigue', 'Weight loss', 'Undigested food in stool'],
    causes: ['Mandagni (weak digestion)', 'Eating before the previous meal is digested', 'Suppression of natural urges', 'Irregular diet'],
    treatments: [
      { type: 'Panchakarma', name: 'Basti', procedure: 'Medicated enema to balance Vata in the colon.' },
      { type: 'Internal Medicine', name: 'Panchamrita Parpati', dosage: '250mg with honey twice daily.' },
      { type: 'Internal Medicine', name: 'Kutajarishta', dosage: '15ml with equal water twice daily after meals.' },
      { type: 'Internal Medicine', name: 'Bilvadi Churna', dosage: '3-6g twice daily with buttermilk.' }
    ],
    diet: {
      include: ['Buttermilk (Takra)', 'Old rice', 'Moong dal', 'Pomegranate', 'Cumin'],
      avoid: ['Heavy, oily foods', 'Dairy (except buttermilk)', 'Raw vegetables', 'Cold drinks']
    },
    lifestyle: ['Eat only when hungry', 'Chew food thoroughly', 'Manage stress', 'Practice Vajrasana after meals'],
    modernCorrelation: 'IBS, Celiac Disease, Sprue'
  },
  {
    id: 103,
    name: 'Arsha',
    englishName: 'Hemorrhoids',
    sanskrit_name: 'अर्श',
    category: 'Anorectal',
    dosha: ['Vata', 'Pitta', 'Kapha'],
    source: 'Sushruta Samhita',
    symptoms: ['Bleeding during defecation', 'Pain and swelling in anal region', 'Prolapse of pile mass', 'Constipation', 'Itching'],
    causes: ['Chronic constipation', 'Sedentary lifestyle', 'Prolonged sitting', 'Spicy and heavy diet', 'Straining during bowel movements'],
    treatments: [
      { type: 'Surgical/Para-surgical', name: 'Kshara Sutra', procedure: 'Ligation of the pile mass with medicated alkaline thread.' },
      { type: 'Internal Medicine', name: 'Abhayarishta', dosage: '15-30ml with equal water after meals.' },
      { type: 'Internal Medicine', name: 'Arshoghni Vati', dosage: '1-2 tablets twice daily.' },
      { type: 'Local Application', name: 'Kasisadi Taila', application: 'Applied locally to shrink pile mass.' }
    ],
    diet: {
      include: ['Buttermilk', 'Elephant foot yam (Surana)', 'Papaya', 'Ghee', 'Warm water'],
      avoid: ['Spicy and fried foods', 'Dry and hard foods', 'Excessive tea/coffee', 'Refined flour']
    },
    lifestyle: ['Avoid prolonged sitting', 'High fiber diet', 'Regular mild exercise', 'Sitz bath with warm water'],
    modernCorrelation: 'Hemorrhoids, Piles'
  },
  {
    id: 104,
    name: 'Ashmari',
    englishName: 'Renal Calculi / Kidney Stones',
    sanskrit_name: 'अश्मरी',
    category: 'Urinary',
    dosha: ['Kapha', 'Vata'],
    source: 'Sushruta Samhita',
    symptoms: ['Severe pain in lower back radiating to groin', 'Dysuria (painful urination)', 'Haematuria (blood in urine)', 'Nausea', 'Vomiting'],
    causes: ['Inadequate water intake', 'Excessive consumption of calcium/oxalate-rich foods', 'Suppression of urination', 'Sedentary lifestyle'],
    treatments: [
      { type: 'Panchakarma', name: 'Uttara Basti', procedure: 'Medicated enema administered through the urethra (in specific cases).' },
      { type: 'Internal Medicine', name: 'Gokshuradi Guggulu', dosage: '2 tablets twice daily with water.' },
      { type: 'Internal Medicine', name: 'Pashanabhedadi Kvatha', dosage: '20ml twice daily.' },
      { type: 'Internal Medicine', name: 'Chandraprabha Vati', dosage: '2 tablets twice daily.' },
      { type: 'Internal Medicine', name: 'Hajrul Yahud Bhasma', dosage: '250-500mg with coconut water.' }
    ],
    diet: {
      include: ['Old rice', 'Barley', 'Horse gram (Kulattha)', 'Coconut water', 'Sugarcane juice', 'Cucumber'],
      avoid: ['Tomato', 'Spinach', 'Brinjal', 'Excessive dairy', 'Meat']
    },
    lifestyle: ['Drink 3-4 liters of water daily', 'Do not suppress natural urges', 'Regular physical activity'],
    modernCorrelation: 'Nephrolithiasis, Urolithiasis'
  },
  {
    id: 105,
    name: 'Tamaka Shwasa',
    englishName: 'Bronchial Asthma',
    sanskrit_name: 'तमक श्वास',
    category: 'Respiratory',
    dosha: ['Kapha', 'Vata'],
    source: 'Charaka Samhita',
    symptoms: ['Breathlessness', 'Wheezing', 'Cough with sputum', 'Chest tightness', 'Worsening of symptoms at night and during cold weather'],
    causes: ['Exposure to dust, smoke, and pollen', 'Cold drinks and foods', 'Suppression of urges', 'Overexertion'],
    treatments: [
      { type: 'Panchakarma', name: 'Vamana', procedure: 'Therapeutic emesis to clear Kapha from respiratory tract.' },
      { type: 'Panchakarma', name: 'Virechana', procedure: 'Therapeutic purgation.' },
      { type: 'Internal Medicine', name: 'Kanakasava', dosage: '15ml with equal water after meals.' },
      { type: 'Internal Medicine', name: 'Sitopaladi Churna', dosage: '3g with honey twice daily.' },
      { type: 'Internal Medicine', name: 'Shwasa Kuthara Rasa', dosage: '1 tablet twice daily.' }
    ],
    diet: {
      include: ['Warm water', 'Old rice', 'Moong dal', 'Garlic', 'Ginger', 'Honey', 'Turmeric'],
      avoid: ['Curd', 'Banana', 'Cold items', 'Fried foods', 'Heavy meals at night']
    },
    lifestyle: ['Pranayama', 'Avoid exposure to cold wind and dust', 'Keep chest covered', 'Sunlight exposure'],
    modernCorrelation: 'Bronchial Asthma, COPD'
  },
  {
    id: 106,
    name: 'Vata Vyadhi (Pakshaghata)',
    englishName: 'Hemiplegia / Stroke',
    sanskrit_name: 'पक्षाघात',
    category: 'Neurological',
    dosha: ['Vata'],
    source: 'Charaka Samhita',
    symptoms: ['Paralysis of one half of the body', 'Loss of speech (Aphasia)', 'Facial palsy', 'Stiffness', 'Loss of sensation'],
    causes: ['High blood pressure', 'Stress', 'Excessive dry, cold food', 'Overexertion', 'Suppression of urges'],
    treatments: [
      { type: 'Panchakarma', name: 'Snehana & Swedana', procedure: 'Oil massage and steam therapy.' },
      { type: 'Panchakarma', name: 'Basti', procedure: 'Medicated enemas using Dashamoola.' },
      { type: 'Panchakarma', name: 'Nasya', procedure: 'Administration of medicated oil (like Ksheerabala) through nostrils.' },
      { type: 'Internal Medicine', name: 'Ekangaveer Rasa', dosage: '1 tablet twice daily.' },
      { type: 'Internal Medicine', name: 'Mahayogaraja Guggulu', dosage: '2 tablets twice daily.' }
    ],
    diet: {
      include: ['Ghee', 'Warm milk', 'Garlic', 'Meat soup', 'Wheat', 'Almonds'],
      avoid: ['Dry, cold foods', 'Bitter and astringent tasting foods', 'Excessive fasting']
    },
    lifestyle: ['Gentle physiotherapy', 'Rest', 'Avoid mental stress', 'Keep warm'],
    modernCorrelation: 'CVA (Cerebrovascular Accident), Stroke, Hemiplegia'
  },
  {
    id: 107,
    name: 'Plihodara',
    englishName: 'Splenomegaly',
    sanskrit_name: 'प्लीहोदर',
    category: 'Abdominal',
    dosha: ['Kapha', 'Pitta'],
    source: 'Sushruta Samhita',
    symptoms: ['Enlarged spleen', 'Abdominal distension', 'Weakness', 'Anemia', 'Mild fever'],
    causes: ['Chronic malaria or fever', 'Liver diseases', 'Excessive consumption of heavy, Kapha-aggravating foods'],
    treatments: [
      { type: 'Panchakarma', name: 'Virechana', procedure: 'Therapeutic purgation.' },
      { type: 'Internal Medicine', name: 'Rohitakarishta', dosage: '15-30ml with equal water twice daily.' },
      { type: 'Internal Medicine', name: 'Yakrit Plihari Loha', dosage: '1 tablet twice daily.' },
      { type: 'Internal Medicine', name: 'Arogyavardhini Vati', dosage: '2 tablets twice daily.' }
    ],
    diet: {
      include: ['Old rice', 'Moong dal', 'Garlic', 'Papaya', 'Aloe vera'],
      avoid: ['Heavy, oily foods', 'Curd', 'Jaggery', 'Cold water']
    },
    lifestyle: ['Avoid sleeping during the day', 'Mild exercise', 'Avoid overeating'],
    modernCorrelation: 'Splenomegaly, Hepatomegaly'
  },
  {
    id: 108,
    name: 'Sthaulya',
    englishName: 'Obesity',
    sanskrit_name: 'स्थौल्य',
    category: 'Metabolic',
    dosha: ['Kapha', 'Vata'],
    source: 'Charaka Samhita',
    symptoms: ['Excessive weight gain', 'Breathlessness on exertion', 'Lethargy', 'Excessive sweating', 'Body odor', 'Increased appetite and thirst'],
    causes: ['Sedentary lifestyle', 'Overeating', 'Excessive sleep, especially during the day', 'Genetic factors', 'Endocrine imbalances'],
    treatments: [
      { type: 'Panchakarma', name: 'Udvartana', procedure: 'Dry powder massage with herbs like Triphala and Kolakulathadi.' },
      { type: 'Internal Medicine', name: 'Medohara Guggulu', dosage: '2 tablets twice daily with warm water.' },
      { type: 'Internal Medicine', name: 'Navaka Guggulu', dosage: '2 tablets twice daily.' },
      { type: 'Internal Medicine', name: 'Triphala Churna', dosage: '1 teaspoon at bedtime with warm water.' },
      { type: 'Internal Medicine', name: 'Vrikshamla (Garcinia)', dosage: '500mg twice daily.' }
    ],
    diet: {
      include: ['Barley', 'Horse gram', 'Moong dal', 'Bitter gourd', 'Warm water with honey and lemon', 'Spices like ginger, pepper, cinnamon'],
      avoid: ['Sweets', 'Fried foods', 'Dairy (except buttermilk)', 'Refined carbohydrates', 'Cold beverages']
    },
    lifestyle: ['Regular vigorous exercise (Vyayama)', 'Avoid daytime sleeping', 'Active physical work', 'Fasting once a week'],
    modernCorrelation: 'Obesity, Metabolic Syndrome'
  },
  {
    id: 109,
    name: 'Galaroga (Thyroid Disorders)',
    englishName: 'Hypothyroidism / Goiter',
    sanskrit_name: 'गलगण्ड',
    category: 'Endocrine',
    dosha: ['Kapha', 'Vata'],
    source: 'Sushruta Samhita',
    symptoms: ['Swelling in the neck', 'Weight gain', 'Fatigue', 'Cold intolerance', 'Constipation', 'Dry skin', 'Hair loss'],
    causes: ['Kapha aggravating diet', 'Sedentary habits', 'Iodine deficiency', 'Stress'],
    treatments: [
      { type: 'Panchakarma', name: 'Vamana', procedure: 'Therapeutic emesis.' },
      { type: 'Internal Medicine', name: 'Kanchanara Guggulu', dosage: '2 tablets twice daily with warm water.' },
      { type: 'Internal Medicine', name: 'Punarnavadi Guggulu', dosage: '2 tablets twice daily.' },
      { type: 'Internal Medicine', name: 'Arogyavardhini Vati', dosage: '1 tablet twice daily.' },
      { type: 'Local Application', name: 'Lepa', application: 'Application of Jalauka (Leech) or medicinal pastes over the swelling.' }
    ],
    diet: {
      include: ['Old rice', 'Barley', 'Moong dal', 'Garlic', 'Onion', 'Drumstick (Moringa)'],
      avoid: ['Heavy, oily foods', 'Cabbage', 'Cauliflower', 'Sweet and cold items', 'Excessive dairy']
    },
    lifestyle: ['Neck exercises (Ujjayi Pranayama)', 'Active lifestyle', 'Avoid daytime sleep'],
    modernCorrelation: 'Hypothyroidism, Simple Goiter'
  },
  {
    id: 110,
    name: 'Sheetapitta',
    englishName: 'Urticaria / Hives',
    sanskrit_name: 'शीतपित्त',
    category: 'Dermatological',
    dosha: ['Vata', 'Pitta'],
    source: 'Madhava Nidana',
    symptoms: ['Raised red patches on skin', 'Severe itching', 'Pricking sensation', 'Mild fever', 'Nausea'],
    causes: ['Exposure to cold wind', 'Contact with allergens', 'Incompatible food combinations (Viruddha Ahara)', 'Insect bite'],
    treatments: [
      { type: 'Panchakarma', name: 'Vamana or Virechana', procedure: 'Depending on dosha dominance.' },
      { type: 'Internal Medicine', name: 'Haridrakhanda', dosage: '1 teaspoon twice daily with warm milk.' },
      { type: 'Internal Medicine', name: 'Kamadugha Rasa', dosage: '1 tablet twice daily.' },
      { type: 'Local Application', name: 'Mustard Oil Massage', application: 'Massage with warm mustard oil to reduce Vata-Kapha.' }
    ],
    diet: {
      include: ['Old rice', 'Moong dal', 'Bitter gourd', 'Pomegranate', 'Warm water'],
      avoid: ['Curd', 'Fish', 'Sour foods', 'Jaggery', 'Incompatible combinations (e.g., milk and fish)']
    },
    lifestyle: ['Avoid exposure to cold breeze', 'Keep body warm', 'Identify and avoid triggers'],
    modernCorrelation: 'Urticaria, Allergic Rash'
  }
];
