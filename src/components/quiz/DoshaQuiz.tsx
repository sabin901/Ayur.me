import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flower2 as Lotus, Heart, ChevronRight } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import ComprehensiveReport from './ComprehensiveReport';

// Classical verse data
const classicalVerses = {
  charaka_sutra_1_57: {
    devanagari: "वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः।",
    iast: "vāyuḥ pittaṃ kaphaśceti trayo doṣāḥ samāsataḥ।",
    translation: "Vata, Pitta, and Kapha are the three doshas in summary.",
    source: "Charaka Samhita, Sutrasthana 1.57"
  },
  sushruta_sharirasthana_4_71: {
    devanagari: "रक्तं चतुर्थो दोष इति केचित्।",
    iast: "raktaṃ caturtho doṣa iti kecit।",
    translation: "Some consider blood (rakta) as the fourth dosha.",
    source: "Sushruta Samhita, Sharirasthana 4.71"
  },
  ashtanga_hridaya_3_1: {
    devanagari: "ऋतुचर्या प्रवक्ष्यामि यया स्यात् निरुपद्रवः।",
    iast: "ṛtucaryā pravakṣyāmi yayā syāt nirupadravaḥ।",
    translation: "I shall describe the seasonal regimen by which one remains free from diseases.",
    source: "Ashtanga Hridaya, Sutrasthana 3.1"
  }
};

// Questionnaire data
const questions = [
  {
    id: 1,
    category: "Physical Constitution",
    question: "How would you describe your body frame?",
    options: [
      { text: "Thin, light, prominent joints", dosha: "vata", weight: 3 },
      { text: "Medium build, well-proportioned", dosha: "pitta", weight: 3 },
      { text: "Large frame, broad shoulders, heavy", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 2,
    category: "Physical Constitution", 
    question: "What is your skin type and complexion?",
    options: [
      { text: "Dry, rough, cool to touch, darker complexion", dosha: "vata", weight: 2 },
      { text: "Warm, soft, oily, fair/reddish complexion", dosha: "pitta", weight: 2 },
      { text: "Thick, smooth, cool, pale/white complexion", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 3,
    category: "Physical Constitution",
    question: "How is your hair naturally?",
    options: [
      { text: "Dry, brittle, thin, curly", dosha: "vata", weight: 2 },
      { text: "Fine, soft, early graying/balding", dosha: "pitta", weight: 2 },
      { text: "Thick, oily, wavy, lustrous", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 4,
    category: "Mental Constitution",
    question: "How would you describe your mental nature?",
    options: [
      { text: "Quick thinking, creative, restless mind", dosha: "vata", weight: 3 },
      { text: "Sharp intellect, focused, goal-oriented", dosha: "pitta", weight: 3 },
      { text: "Calm, steady, slow to learn but good retention", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 5,
    category: "Mental Constitution",
    question: "How do you typically respond to stress?",
    options: [
      { text: "Anxiety, worry, difficulty sleeping", dosha: "vata", weight: 4 },
      { text: "Anger, irritability, criticism", dosha: "pitta", weight: 4 },
      { text: "Withdrawal, sadness, overeating", dosha: "kapha", weight: 4 }
    ]
  },
  {
    id: 6,
    category: "Digestive Constitution",
    question: "How is your appetite and digestion?",
    options: [
      { text: "Variable, irregular, sometimes forget to eat", dosha: "vata", weight: 3 },
      { text: "Strong, regular, get angry when hungry", dosha: "pitta", weight: 3 },
      { text: "Slow but steady, can skip meals easily", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 7,
    category: "Digestive Constitution",
    question: "What are your bowel movements like?",
    options: [
      { text: "Irregular, dry, constipation tendency", dosha: "vata", weight: 3 },
      { text: "Regular, loose, multiple times daily", dosha: "pitta", weight: 3 },
      { text: "Regular, formed, once daily", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 8,
    category: "Sleep Pattern",
    question: "How is your sleep pattern?",
    options: [
      { text: "Light sleeper, difficulty falling asleep, active dreams", dosha: "vata", weight: 3 },
      { text: "Moderate sleep, vivid dreams, wake up refreshed", dosha: "pitta", weight: 3 },
      { text: "Deep sleeper, long sleep, difficulty waking up", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 9,
    category: "Physical Activity",
    question: "What is your energy level and activity preference?",
    options: [
      { text: "Quick bursts of energy, tire easily, prefer light activity", dosha: "vata", weight: 2 },
      { text: "Moderate energy, enjoy competitive activities", dosha: "pitta", weight: 2 },
      { text: "Steady energy, prefer slow, sustained activities", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 10,
    category: "Climate Preference",
    question: "Which climate do you prefer?",
    options: [
      { text: "Warm, humid, dislike cold and wind", dosha: "vata", weight: 2 },
      { text: "Cool, well-ventilated, dislike heat", dosha: "pitta", weight: 2 },
      { text: "Warm, dry, dislike cold and damp", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 11,
    category: "Emotional Tendencies",
    question: "What are your predominant emotions?",
    options: [
      { text: "Enthusiasm, joy, anxiety, fear", dosha: "vata", weight: 3 },
      { text: "Courage, determination, anger, jealousy", dosha: "pitta", weight: 3 },
      { text: "Compassion, calmness, attachment, greed", dosha: "kapha", weight: 3 }
    ]
  },
  {
    id: 12,
    category: "Learning Style",
    question: "How do you learn best?",
    options: [
      { text: "Learn quickly but forget easily, prefer variety", dosha: "vata", weight: 2 },
      { text: "Learn at moderate pace with good comprehension", dosha: "pitta", weight: 2 },
      { text: "Learn slowly but have excellent long-term memory", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 13,
    category: "Current Imbalances",
    question: "Which current symptoms do you experience most?",
    options: [
      { text: "Dry skin, restlessness, irregular digestion, insomnia", dosha: "vata", weight: 4 },
      { text: "Acidity, skin rashes, irritability, inflammation", dosha: "pitta", weight: 4 },
      { text: "Weight gain, congestion, sluggishness, attachment", dosha: "kapha", weight: 4 }
    ]
  },
  {
    id: 14,
    category: "Voice and Speech",
    question: "How would you describe your voice and speech?",
    options: [
      { text: "Quick, talkative, voice cracks under stress", dosha: "vata", weight: 2 },
      { text: "Clear, sharp, articulate, commanding", dosha: "pitta", weight: 2 },
      { text: "Deep, slow, melodious, soft-spoken", dosha: "kapha", weight: 2 }
    ]
  },
  {
    id: 15,
    category: "Financial Habits",
    question: "How do you handle money and possessions?",
    options: [
      { text: "Spend impulsively, don't save much", dosha: "vata", weight: 2 },
      { text: "Spend on luxury items, moderate saving", dosha: "pitta", weight: 2 },
      { text: "Save regularly, spend carefully, accumulate possessions", dosha: "kapha", weight: 2 }
    ]
  }
];

// Subdosha data
const subdoshas = {
  vata: [
    {
      name: "Prana Vata",
      location: "Head, chest, throat",
      functions: ["Breathing", "Circulation", "Mental activities", "Sensory perception"],
      imbalanceSymptoms: ["Anxiety", "Insomnia", "Headaches", "Respiratory issues"],
      therapies: ["Nasya", "Pranayama", "Meditation", "Warm oil massage on head"]
    },
    {
      name: "Udana Vata", 
      location: "Chest, throat",
      functions: ["Speech", "Effort", "Enthusiasm", "Memory"],
      imbalanceSymptoms: ["Hoarse voice", "Dry cough", "Fatigue", "Poor memory"],
      therapies: ["Throat gargling", "Vocal exercises", "Chest massage"]
    },
    {
      name: "Vyana Vata",
      location: "Throughout body",
      functions: ["Circulation", "Muscle movement", "Joint function"],
      imbalanceSymptoms: ["Poor circulation", "Joint pain", "Muscle stiffness"],
      therapies: ["Full body massage", "Yoga", "Swimming"]
    },
    {
      name: "Samana Vata",
      location: "Stomach, small intestine",
      functions: ["Digestion", "Metabolism"],
      imbalanceSymptoms: ["Irregular appetite", "Gas", "Bloating"],
      therapies: ["Digestive spices", "Regular meals", "Abdominal massage"]
    },
    {
      name: "Apana Vata",
      location: "Colon, pelvis, bladder",
      functions: ["Elimination", "Reproduction", "Menstruation"],
      imbalanceSymptoms: ["Constipation", "Reproductive issues", "Lower back pain"],
      therapies: ["Basti", "Hip flexor stretches", "Pelvic massage"]
    }
  ],
  pitta: [
    {
      name: "Pachaka Pitta",
      location: "Stomach, small intestine",
      functions: ["Digestion", "Absorption", "Body heat"],
      imbalanceSymptoms: ["Acidity", "Heartburn", "Excessive hunger"],
      therapies: ["Cooling foods", "Avoid spicy foods", "Coconut water"]
    },
    {
      name: "Ranjaka Pitta",
      location: "Liver, spleen, blood",
      functions: ["Blood formation", "Liver function"],
      imbalanceSymptoms: ["Skin rashes", "Anger", "Liver disorders"],
      therapies: ["Bitter herbs", "Liver detox", "Cool compresses"]
    },
    {
      name: "Sadhaka Pitta",
      location: "Heart, brain",
      functions: ["Mental digestion", "Emotions", "Memory"],
      imbalanceSymptoms: ["Irritability", "Criticism", "Perfectionism"],
      therapies: ["Meditation", "Heart-opening yoga", "Rose water"]
    },
    {
      name: "Alochaka Pitta",
      location: "Eyes",
      functions: ["Vision", "Light perception"],
      imbalanceSymptoms: ["Eye strain", "Light sensitivity", "Vision problems"],
      therapies: ["Eye exercises", "Rose water wash", "Avoid screen time"]
    },
    {
      name: "Bharajaka Pitta",
      location: "Skin",
      functions: ["Skin color", "Temperature regulation"],
      imbalanceSymptoms: ["Skin inflammation", "Rashes", "Excessive sweating"],
      therapies: ["Cooling oils", "Avoid sun exposure", "Cucumber packs"]
    }
  ],
  kapha: [
    {
      name: "Avalambaka Kapha",
      location: "Chest, lungs, heart",
      functions: ["Lung lubrication", "Heart protection"],
      imbalanceSymptoms: ["Congestion", "Asthma", "Chest heaviness"],
      therapies: ["Steam inhalation", "Chest massage", "Expectorant herbs"]
    },
    {
      name: "Kledaka Kapha",
      location: "Stomach",
      functions: ["Stomach lubrication", "First stage digestion"],
      imbalanceSymptoms: ["Slow digestion", "Nausea", "Loss of appetite"],
      therapies: ["Digestive spices", "Warm water", "Small frequent meals"]
    },
    {
      name: "Bodhaka Kapha",
      location: "Tongue, mouth",
      functions: ["Taste perception", "Saliva production"],
      imbalanceSymptoms: ["Loss of taste", "Excess saliva", "Oral congestion"],
      therapies: ["Oil pulling", "Tongue scraping", "Spicy foods"]
    },
    {
      name: "Tarpaka Kapha",
      location: "Head, nervous system",
      functions: ["Brain nutrition", "Nervous system lubrication"],
      imbalanceSymptoms: ["Mental dullness", "Depression", "Excess sleep"],
      therapies: ["Mental stimulation", "Exercise", "Warming herbs"]
    },
    {
      name: "Shleshaka Kapha",
      location: "Joints",
      functions: ["Joint lubrication"],
      imbalanceSymptoms: ["Joint stiffness", "Swelling", "Reduced mobility"],
      therapies: ["Joint massage", "Movement therapy", "Warm compresses"]
    }
  ]
};

/**
 * Round dosha percentages to integers while ensuring they still sum to 100.
 * Uses the largest-remainder method so the displayed numbers are honest.
 */
function roundPercentages(raw: { vata: number; pitta: number; kapha: number }) {
  const entries = (Object.entries(raw) as Array<[keyof typeof raw, number]>)
    .map(([k, v]) => ({ k, floor: Math.floor(v), remainder: v - Math.floor(v) }));
  let assigned = entries.reduce((sum, e) => sum + e.floor, 0);
  // Distribute remaining points to the largest remainders.
  entries.sort((a, b) => b.remainder - a.remainder);
  let i = 0;
  while (assigned < 100 && i < entries.length) {
    entries[i].floor += 1;
    assigned += 1;
    i += 1;
  }
  const out = { vata: 0, pitta: 0, kapha: 0 };
  entries.forEach(e => { out[e.k] = e.floor; });
  return out;
}

// Calculation function
export type DoshaScores = { vata: number; pitta: number; kapha: number };
export type DoshaKey = keyof DoshaScores;
export type DoshaResult = {
  scores: DoshaScores;
  percentages: DoshaScores;
  primaryDosha: DoshaKey;
  secondaryDosha: DoshaKey | null;
  constitution: string;
  subdoshaScores: Record<string, number>;
  total: number;
};

function calculateDosha(answers: number[]): DoshaResult {
  const scores: DoshaScores = { vata: 0, pitta: 0, kapha: 0 };
  const subdoshaScores: Record<string, number> = {};

  // Initialize subdosha scores
  Object.keys(subdoshas).forEach(dosha => {
    subdoshas[dosha as keyof typeof subdoshas].forEach(sub => {
      subdoshaScores[sub.name] = 0;
    });
  });

  answers.forEach((answer, index) => {
    const question = questions[index];
    if (!question) return;
    const selectedOption = question.options[answer];

    if (selectedOption) {
      scores[selectedOption.dosha as DoshaKey] += selectedOption.weight;

      // Add to relevant subdoshas based on question category
      if (selectedOption.dosha === 'vata' && (question.category === 'Mental Constitution' || question.category === 'Current Imbalances')) {
        subdoshaScores['Prana Vata'] += selectedOption.weight * 0.7;
      }
      if (selectedOption.dosha === 'pitta' && question.category === 'Digestive Constitution') {
        subdoshaScores['Pachaka Pitta'] += selectedOption.weight * 0.8;
      }
      if (selectedOption.dosha === 'kapha' && question.category === 'Physical Activity') {
        subdoshaScores['Avalambaka Kapha'] += selectedOption.weight * 0.6;
      }
    }
  });

  const total = scores.vata + scores.pitta + scores.kapha;

  // Guard against division by zero — if no answers contributed weight,
  // return an even tridoshic split rather than crashing with NaN.
  const safeTotal = total > 0 ? total : 1;
  const rawPercentages: DoshaScores = total > 0
    ? {
        vata: (scores.vata / safeTotal) * 100,
        pitta: (scores.pitta / safeTotal) * 100,
        kapha: (scores.kapha / safeTotal) * 100,
      }
    : { vata: 33.34, pitta: 33.33, kapha: 33.33 };

  // Round while preserving sum = 100 (largest-remainder method)
  const percentages = roundPercentages(rawPercentages);

  // Determine primary and secondary doshas
  const sortedDoshas = (Object.entries(percentages) as Array<[DoshaKey, number]>)
    .sort(([, a], [, b]) => b - a)
    .map(([dosha]) => dosha);

  const primaryDosha: DoshaKey = sortedDoshas[0];
  const secondaryDosha: DoshaKey | null =
    percentages[sortedDoshas[1]] > 25 ? sortedDoshas[1] : null;

  // Determine constitution type
  let constitution = '';
  if (percentages[primaryDosha as keyof typeof percentages] > 60) {
    constitution = primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1);
  } else if (secondaryDosha) {
    constitution = `${primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)}-${secondaryDosha.charAt(0).toUpperCase() + secondaryDosha.slice(1)}`;
  } else {
    constitution = 'Tridoshic';
  }

  return {
    scores,
    percentages,
    primaryDosha,
    secondaryDosha,
    constitution,
    subdoshaScores,
    total
  };
}

// Components
const ClassicalVerse: React.FC<{ verse: any }> = ({ verse }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 rounded-r-lg"
  >
    <div className="font-sanskrit text-xl text-amber-800 mb-2">{verse.devanagari}</div>
    <p className="italic text-amber-700 mb-1">{verse.iast}</p>
    <p className="text-amber-900 mb-2">{verse.translation}</p>
    <div className="text-xs text-amber-600">— {verse.source}</div>
  </motion.div>
);

const DoshaRadarChart: React.FC<{ percentages: any }> = ({ percentages }) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  
  const angles = [0, 120, 240]; // 120 degrees apart
  const points = Object.values(percentages).map((value: any, index) => {
    const angle = (angles[index] - 90) * (Math.PI / 180);
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  });

  const pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="drop-shadow-lg">
        {/* Grid circles */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((ratio, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * ratio}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />
        ))}
        
        {/* Axis lines */}
        {angles.map((angle, i) => {
          const x = center + Math.cos((angle - 90) * (Math.PI / 180)) * radius;
          const y = center + Math.sin((angle - 90) * (Math.PI / 180)) * radius;
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#d1d5db"
              strokeWidth="1"
            />
          );
        })}
        
        {/* Data polygon */}
        <motion.path
          d={pathData}
          fill="rgba(5, 150, 105, 0.3)"
          stroke="#059669"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#059669"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.2 }}
          />
        ))}
        
        {/* Labels */}
        {['Vata', 'Pitta', 'Kapha'].map((label, i) => {
          const angle = (angles[i] - 90) * (Math.PI / 180);
          const x = center + Math.cos(angle) * (radius + 20);
          const y = center + Math.sin(angle) * (radius + 20);
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-sm font-semibold fill-gray-700"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const QUIZ_STORAGE_KEY = 'ayurme:dosha-quiz:v1';

type StoredQuizState = {
  currentQuestion: number;
  answers: number[];
  results: DoshaResult | null;
  showResults: boolean;
  savedAt: number;
};

function loadQuizState(): StoredQuizState | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredQuizState;
    // Discard anything older than 30 days.
    if (!parsed || Date.now() - parsed.savedAt > 30 * 24 * 60 * 60 * 1000) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveQuizState(state: Omit<StoredQuizState, 'savedAt'>) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({ ...state, savedAt: Date.now() })
    );
  } catch {
    // localStorage can fail in private mode / over-quota — fail silently.
  }
}

const DoshaQuiz: React.FC = () => {
  const initial = loadQuizState();
  const [currentQuestion, setCurrentQuestion] = useState<number>(initial?.currentQuestion ?? 0);
  const [answers, setAnswers] = useState<number[]>(initial?.answers ?? []);
  const [showResults, setShowResults] = useState<boolean>(initial?.showResults ?? false);
  const [results, setResults] = useState<DoshaResult | null>(initial?.results ?? null);

  // Persist progress on every change so refreshes don't wipe results.
  useEffect(() => {
    saveQuizState({ currentQuestion, answers, results, showResults });
  }, [currentQuestion, answers, results, showResults]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      const calculatedResults = calculateDosha(newAnswers);
      setResults(calculatedResults);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
    setResults(null);
    try { window.localStorage.removeItem(QUIZ_STORAGE_KEY); } catch { /* noop */ }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults && results) {
    return <ComprehensiveReport results={results} onRetake={resetQuiz} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lotus className="w-10 h-10 text-emerald-600" />
            <h1 className="text-5xl font-bold text-emerald-800">Ayurvedic Constitution Analysis</h1>
            <Lotus className="w-10 h-10 text-emerald-600" />
          </div>
          <p className="text-emerald-600 text-xl mb-2">Discover Your Unique Dosha Profile</p>
          <p className="text-emerald-500 max-w-2xl mx-auto">
            Based on classical texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, 
            and modern integrative approaches by David Frawley and Gregory Fields
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-emerald-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-emerald-100 rounded-full h-3">
              <motion.div 
                className="bg-emerald-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  <Heart className="w-4 h-4" />
                  {questions[currentQuestion].category}
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-6 text-left bg-gray-50 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-200 rounded-xl transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                        {option.text}
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Back Button */}
              {currentQuestion > 0 && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion - 1)}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    ← Previous Question
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-emerald-600 text-sm">
            This assessment is based on traditional Ayurvedic principles and should complement, not replace, professional medical advice.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoshaQuiz; 