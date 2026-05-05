// Extended Mental Health Conditions Data
export interface MentalCondition {
  name: string;
  sanskrit: string;
  devanagari: string;
  dosha: string;
  description: string;
  symptoms: string[];
  causes: string[];
  treatments: string[];
  lifestyleRecommendations: string[];
  herbs: { name: string; dosage: string; preparation: string; duration: string }[];
  sources: string[];
}

export interface TherapeuticPractice {
  name: string;
  sanskrit: string;
  devanagari: string;
  type: string;
  duration: string;
  description: string;
  benefits: string[];
  technique: string;
  contraindications: string[];
  sources: string[];
}

export const mentalConditions: MentalCondition[] = [
  {
    name: 'Anxiety', sanskrit: 'Chittodvega', devanagari: 'चित्तोद्वेग', dosha: 'Vata',
    description: 'A Vata-dominant condition characterized by restlessness, excessive worry, and fear arising from nervous system hyperstimulation.',
    symptoms: ['Restlessness and constant movement', 'Excessive worry and fear', 'Irregular breathing patterns', 'Insomnia and disturbed sleep', 'Dry skin and hair', 'Constipation', 'Trembling and shaking', 'Racing thoughts', 'Difficulty concentrating', 'Heart palpitations'],
    causes: ['Vata imbalance from irregular routine', 'Overstimulation and excessive activity', 'Lack of grounding practices', 'Irregular eating habits', 'Cold, dry, windy weather', 'Excessive travel', 'Mental overwork', 'Emotional trauma'],
    treatments: ['Abhyanga with warm sesame oil daily', 'Pranayama: Nadi Shodhana (alternate nostril breathing)', 'Grounding foods: sweet, sour, salty tastes', 'Regular sleep schedule (10 PM - 6 AM)', 'Warm oil massage to feet and head', 'Gentle yoga: Balasana, Vrikshasana', 'Meditation with grounding mantras', 'Warm baths with calming essential oils'],
    lifestyleRecommendations: ['Establish regular daily routine (Dinacharya)', 'Practice grounding activities: walking in nature', 'Use warm, heavy blankets for sleep', 'Avoid excessive travel and movement', 'Regular meals at same times daily', 'Engage in calming activities: reading, gentle music'],
    herbs: [
      { name: 'Ashwagandha', dosage: '500-1000mg twice daily', preparation: 'With warm milk and honey', duration: '3-6 months' },
      { name: 'Jatamansi', dosage: '250-500mg twice daily', preparation: 'With warm water or milk', duration: '2-4 months' },
      { name: 'Brahmi', dosage: '300-600mg twice daily', preparation: 'With honey or ghee', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 9', 'Ayurvedic Healing - Frawley', 'The Yoga of Herbs - Frawley & Lad']
  },
  {
    name: 'Depression', sanskrit: 'Vishada', devanagari: 'विषाद', dosha: 'Kapha/Vata',
    description: 'A condition of mental heaviness and withdrawal, often rooted in Kapha accumulation or Vata depletion.',
    symptoms: ['Heavy feeling in body and mind', 'Lack of motivation', 'Social withdrawal', 'Hopelessness', 'Excessive sleep or insomnia', 'Weight changes', 'Sluggish digestion', 'Difficulty making decisions', 'Loss of interest'],
    causes: ['Kapha accumulation from sedentary lifestyle', 'Vata depletion from overwork', 'Seasonal factors (especially winter)', 'Heavy, cold, sweet foods', 'Lack of physical activity', 'Emotional suppression', 'Grief and loss', 'Toxic accumulation (Ama)'],
    treatments: ['Energizing practices: Surya Namaskara', 'Stimulating herbs: Brahmi, Shankhpushpi', 'Light, warm, spicy foods', 'Morning routine with early rising', 'Social connection and activity', 'Regular exercise and movement', 'Stimulating pranayama: Bhastrika', 'Exposure to sunlight and fresh air'],
    lifestyleRecommendations: ['Wake up early (6 AM) and exercise', 'Eat light, warm, spicy foods', 'Maintain regular social connections', 'Practice energizing yoga poses', 'Regular detoxification practices', 'Exposure to bright light and nature'],
    herbs: [
      { name: 'Brahmi', dosage: '300-600mg twice daily', preparation: 'With honey or ghee', duration: '3-6 months' },
      { name: 'Shankhpushpi', dosage: '500-1000mg twice daily', preparation: 'With warm milk', duration: '3-6 months' },
      { name: 'Ashwagandha', dosage: '500-1000mg twice daily', preparation: 'With warm milk', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 9', 'Ayurvedic Healing - Frawley']
  },
  {
    name: 'Insomnia', sanskrit: 'Anidra', devanagari: 'अनिद्रा', dosha: 'Vata/Pitta',
    description: 'Sleep disturbance rooted in Vata hyperactivity or Pitta heat. Charaka describes sleep as one of the three pillars of life.',
    symptoms: ['Difficulty falling asleep', 'Waking frequently during night', 'Early morning awakening', 'Non-restorative sleep', 'Daytime fatigue', 'Irritability', 'Poor concentration', 'Dry eyes and restlessness'],
    causes: ['Excess Vata from irregular schedule', 'Pitta heat rising to head', 'Late-night screen exposure', 'Heavy dinner or eating too late', 'Mental overwork', 'Caffeine and stimulants', 'Suppression of sleep urge', 'Travel across time zones'],
    treatments: ['Warm milk with nutmeg before bed', 'Padabhyanga (foot massage with warm oil)', 'Shirodhara therapy', 'Nasya with Brahmi oil', 'Yoga Nidra practice', 'Cool room temperature for sleep', 'No screens 1 hour before bed', 'Chamomile or Ashwagandha tea'],
    lifestyleRecommendations: ['Sleep by 10 PM consistently', 'Avoid daytime naps (Kapha types can)', 'Practice evening wind-down ritual', 'Keep bedroom cool and dark', 'Massage feet with warm ghee or sesame oil', 'Practice gratitude journaling before bed'],
    herbs: [
      { name: 'Ashwagandha', dosage: '500mg at bedtime', preparation: 'With warm milk', duration: '2-3 months' },
      { name: 'Tagara (Indian Valerian)', dosage: '250-500mg at bedtime', preparation: 'With warm water', duration: '1-2 months' },
      { name: 'Jatamansi', dosage: '250mg at bedtime', preparation: 'With warm milk and nutmeg', duration: '2-3 months' }
    ],
    sources: ['Charaka Samhita, Sutra Sthana 21', 'Ashtanga Hridayam, Sutra Sthana 7']
  },
  {
    name: 'Anger & Irritability', sanskrit: 'Krodha', devanagari: 'क्रोध', dosha: 'Pitta',
    description: 'Excessive anger arising from Pitta aggravation — described as a major obstacle to mental peace in Ayurveda and Yoga.',
    symptoms: ['Explosive anger', 'Skin rashes and acne', 'Acid reflux', 'Red eyes', 'Headaches', 'Impatience', 'Judgmental attitude', 'Excessive competitiveness', 'Burning sensations'],
    causes: ['Excess Pitta from hot, spicy foods', 'Sun exposure and heat', 'Competitive environment', 'Alcohol consumption', 'Suppressed emotions', 'Perfectionism', 'Lack of cooling practices'],
    treatments: ['Cooling pranayama: Shitali, Shitkari', 'Moon gazing (Chandra Darshana)', 'Coconut oil head massage', 'Sweet, bitter, astringent tastes', 'Aloe vera juice internally', 'Sandalwood paste on forehead', 'Forest bathing and water activities', 'Forgiveness meditation'],
    lifestyleRecommendations: ['Avoid midday sun', 'Practice cooling yoga poses', 'Swim or spend time near water', 'Eat meals at regular times', 'Avoid competitive situations temporarily', 'Practice compassion meditation daily'],
    herbs: [
      { name: 'Brahmi', dosage: '500mg twice daily', preparation: 'With ghee or coconut oil', duration: '3-6 months' },
      { name: 'Amalaki', dosage: '1000mg twice daily', preparation: 'With cool water', duration: '3-6 months' },
      { name: 'Shatavari', dosage: '500mg twice daily', preparation: 'With milk', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Sutra Sthana 7', 'Bhagavad Gita Chapter 2 (Krodha)', 'Ayurvedic Healing - Frawley']
  },
  {
    name: 'Fear & Phobias', sanskrit: 'Bhaya', devanagari: 'भय', dosha: 'Vata',
    description: 'Irrational or excessive fear driven by Vata imbalance in the mind — a fundamental disturbance of Prana Vayu.',
    symptoms: ['Irrational fears', 'Panic attacks', 'Trembling', 'Heart palpitations', 'Dry mouth', 'Avoidance behavior', 'Feeling of unreality', 'Insomnia due to fear'],
    causes: ['Prana Vayu disturbance', 'Past trauma', 'Nervous system hypersensitivity', 'Lack of grounding', 'Isolation', 'Cold and dry environment'],
    treatments: ['Abhyanga with Bala oil', 'Grounding meditation practices', 'Basti (medicated enema) therapy', 'Root chakra balancing practices', 'Warm, heavy, nourishing diet', 'Group yoga and community support'],
    lifestyleRecommendations: ['Create stable daily routine', 'Sleep with weighted blanket', 'Practice courage affirmations', 'Maintain social connections', 'Walk barefoot on earth (grounding)'],
    herbs: [
      { name: 'Ashwagandha', dosage: '1000mg twice daily', preparation: 'With warm milk and ghee', duration: '6 months' },
      { name: 'Brahmi', dosage: '500mg twice daily', preparation: 'With honey', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 9', 'Yoga Sutras of Patanjali 2.3']
  },
  {
    name: 'Attention Deficit', sanskrit: 'Smritibhramsha', devanagari: 'स्मृतिभ्रंश', dosha: 'Vata',
    description: 'Difficulty with focus and memory rooted in Vata disturbance of Manas (mind) — scattered Prana Vayu.',
    symptoms: ['Inability to focus', 'Easily distracted', 'Forgetfulness', 'Difficulty completing tasks', 'Impulsive decisions', 'Restlessness', 'Poor time management', 'Mental fog'],
    causes: ['Excess Vata in mind', 'Information overload', 'Multitasking', 'Poor sleep quality', 'Nutritional deficiencies', 'Excessive screen time'],
    treatments: ['Brahmi ghrita (medicated ghee)', 'Trataka (candle-gazing meditation)', 'Single-tasking practice', 'Nasya with Anu Taila', 'Memory-enhancing herbs', 'Structured daily routine'],
    lifestyleRecommendations: ['Practice one task at a time', 'Limit screen time', 'Regular meal and sleep schedule', 'Morning meditation (even 5 min)', 'Write things down', 'Practice memory games'],
    herbs: [
      { name: 'Brahmi', dosage: '500-1000mg twice daily', preparation: 'With ghee', duration: '6+ months' },
      { name: 'Shankhpushpi', dosage: '500mg twice daily', preparation: 'With warm milk', duration: '3-6 months' },
      { name: 'Vacha (Calamus)', dosage: '250mg twice daily', preparation: 'With honey', duration: '2-3 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 1 (Rasayana)', 'Sushruta Samhita']
  },
  {
    name: 'Addiction', sanskrit: 'Madatyaya', devanagari: 'मदात्यय', dosha: 'All Doshas',
    description: 'Substance dependency described extensively in Charaka Samhita — one of the earliest medical texts to address addiction treatment.',
    symptoms: ['Compulsive substance use', 'Withdrawal symptoms', 'Tolerance build-up', 'Neglecting responsibilities', 'Mood swings', 'Physical deterioration', 'Social isolation'],
    causes: ['Rajo-Tamo guna dominance', 'Emotional pain and trauma', 'Social conditioning', 'Weak Sattva (mental strength)', 'Chemical dependency'],
    treatments: ['Panchakarma detoxification', 'Sattvic diet and lifestyle', 'Meditation and mantra practice', 'Community support (Sangha)', 'Replacement of habit with positive routine', 'Counseling and spiritual guidance'],
    lifestyleRecommendations: ['Build Sattva through diet', 'Daily meditation practice', 'Join supportive community', 'Physical exercise daily', 'Avoid triggering environments', 'Practice self-compassion'],
    herbs: [
      { name: 'Ashwagandha', dosage: '1000mg twice daily', preparation: 'With warm milk', duration: '6+ months' },
      { name: 'Kudzu (Vidarikanda)', dosage: '500mg twice daily', preparation: 'With water', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 24 (Madatyaya Chikitsa)', 'Ashtanga Hridayam']
  },
  {
    name: 'Burnout & Chronic Fatigue', sanskrit: 'Daurbalya', devanagari: 'दौर्बल्य', dosha: 'Vata/Pitta',
    description: 'Deep depletion of Ojas (vital essence) from chronic overwork — affecting body, mind, and spirit simultaneously.',
    symptoms: ['Persistent exhaustion', 'Brain fog', 'Emotional numbness', 'Weakened immunity', 'Muscle pain', 'Loss of purpose', 'Cynicism', 'Reduced performance'],
    causes: ['Chronic overwork without rest', 'Ojas depletion', 'Poor nutrition during stress', 'Lack of Rasayana (rejuvenation)', 'Ignoring body signals', 'Emotional labor'],
    treatments: ['Complete rest (Vishrama)', 'Rasayana therapy (rejuvenation)', 'Chyawanprash daily', 'Abhyanga with Bala oil', 'Gentle yoga only', 'Nature immersion', 'Digital detox periods'],
    lifestyleRecommendations: ['Reduce workload 30-50%', 'Take weekly rest day', 'Practice saying no', 'Sleep 8-9 hours', 'Eat Ojas-building foods', 'Reconnect with purpose/passion'],
    herbs: [
      { name: 'Ashwagandha', dosage: '1000mg twice daily', preparation: 'With warm milk and saffron', duration: '6+ months' },
      { name: 'Shatavari', dosage: '500mg twice daily', preparation: 'With warm milk', duration: '3-6 months' },
      { name: 'Amalaki', dosage: '1000mg daily', preparation: 'With honey', duration: '3-6 months' }
    ],
    sources: ['Charaka Samhita, Chikitsa Sthana 1 (Rasayana Adhyaya)', 'Ayurvedic Healing - Frawley']
  }
];

export const therapeuticPractices: TherapeuticPractice[] = [
  { name: 'Pranayama', sanskrit: 'Pranayama', devanagari: 'प्राणायाम', type: 'Breathing', duration: '10-20 min',
    description: 'Systematic breathing techniques to balance the mind and vital energy (Prana).', benefits: ['Calms nervous system', 'Improves concentration', 'Reduces stress', 'Balances doshas'],
    technique: 'Practice Nadi Shodhana: sit comfortably, close right nostril with thumb, inhale left, close left with ring finger, exhale right. Repeat 10-15 min.', contraindications: ['High blood pressure', 'Heart conditions', 'Pregnancy'], sources: ['Hatha Yoga Pradipika', 'Charaka Samhita'] },
  { name: 'Meditation', sanskrit: 'Dhyana', devanagari: 'ध्यान', type: 'Mental', duration: '20-30 min',
    description: 'Focused attention to cultivate mental clarity and inner peace — the core of Ayurvedic mental health.', benefits: ['Mental clarity', 'Emotional balance', 'Stress reduction', 'Spiritual growth'],
    technique: 'Sit comfortably, focus on breath or mantra "So-Ham." Start 10 min, gradually increase. Observe thoughts without attachment.', contraindications: ['Severe mental illness (consult practitioner)'], sources: ['Yoga Sutras of Patanjali', 'Bhagavad Gita'] },
  { name: 'Abhyanga', sanskrit: 'Abhyanga', devanagari: 'अभ्यंग', type: 'Physical', duration: '15-20 min',
    description: 'Daily self-massage with warm oil — Charaka calls it the supreme practice for Vata disorders.', benefits: ['Nourishes tissues', 'Calms nervous system', 'Improves circulation', 'Promotes sleep'],
    technique: 'Warm sesame oil (Vata), coconut oil (Pitta), mustard oil (Kapha). Massage entire body head-to-toe before bath.', contraindications: ['Fever', 'Acute indigestion', 'Skin infections'], sources: ['Charaka Samhita', 'Ashtanga Hridayam'] },
  { name: 'Yoga Nidra', sanskrit: 'Yoga Nidra', devanagari: 'योग निद्रा', type: 'Relaxation', duration: '20-45 min',
    description: 'Deep conscious relaxation providing rest equivalent to several hours of sleep.', benefits: ['Deep relaxation', 'Stress relief', 'Improved sleep', 'Trauma healing'],
    technique: 'Lie in Savasana. Follow guided rotation through body parts, breath awareness, and visualization.', contraindications: ['None for healthy individuals'], sources: ['Yoga Nidra - Swami Satyananda'] },
  { name: 'Trataka', sanskrit: 'Trataka', devanagari: 'त्राटक', type: 'Concentration', duration: '10-15 min',
    description: 'Candle-gazing meditation that develops one-pointed concentration and purifies the eyes.', benefits: ['Sharpens focus', 'Strengthens eyes', 'Reduces anxiety', 'Develops willpower'],
    technique: 'Place candle at eye level 2 feet away. Gaze without blinking until tears form. Close eyes and visualize the flame at third eye.', contraindications: ['Glaucoma', 'Recent eye surgery'], sources: ['Hatha Yoga Pradipika', 'Gherand Samhita'] },
  { name: 'Mantra Chanting', sanskrit: 'Japa', devanagari: 'जप', type: 'Sound Therapy', duration: '10-30 min',
    description: 'Repetitive sacred sound vibrations that calm the mind and harmonize the nervous system.', benefits: ['Calms Vata instantly', 'Creates mental one-pointedness', 'Reduces anxiety', 'Elevates Sattva'],
    technique: 'Choose a mantra (Om, So-Ham, or personal mantra). Repeat 108 times using mala beads. Focus on the sound vibration.', contraindications: ['None'], sources: ['Yoga Sutras of Patanjali', 'Mantra Yoga Samhita'] },
];
