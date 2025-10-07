import React from 'react';
import { motion } from 'framer-motion';
import { Bot as Lotus, User, Heart, Leaf, Sun, Moon, Zap, BookOpen, Download, RotateCcw, Brain, Activity, Utensils, Clock, TreePine, Target, Sparkles, Shield, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Classical verse data
const classicalVerses = {
  charaka_sutra_1_57: {
    devanagari: "वायुः पित्तं कफश्चेति त्रयो दोषाः समासतः।",
    iast: "vāyuḥ pittaṃ kaphaśceti trayo doṣāḥ samāsataḥ।",
    translation: "Vata, Pitta, and Kapha are the three doshas in summary.",
    source: "Charaka Samhita, Sutrasthana 1.57"
  },
  ashtanga_hridaya_3_1: {
    devanagari: "ऋतुचर्या प्रवक्ष्यामि यया स्यात् निरुपद्रवः।",
    iast: "ṛtucaryā pravakṣyāmi yayā syāt nirupadravaḥ।",
    translation: "I shall describe the seasonal regimen by which one remains free from diseases.",
    source: "Ashtanga Hridaya, Sutrasthana 3.1"
  },
  sushruta_sharirasthana_4_71: {
    devanagari: "रक्तं चतुर्थो दोष इति केचित्।",
    iast: "raktaṃ caturtho doṣa iti kecit।",
    translation: "Some consider blood (rakta) as the fourth dosha.",
    source: "Sushruta Samhita, Sharirasthana 4.71"
  }
};

// Dosha-specific content data
const doshaContent = {
  vata: {
    personality: {
      title: "Vata Mind Characteristics",
      description: "As a Vata-dominant individual, you possess a quick, creative, and adaptable mind. You are naturally enthusiastic, imaginative, and love variety in life. Your mental energy moves like wind - sometimes calm, sometimes restless. You excel at generating ideas and initiating projects, though you may struggle with completion.",
      strengths: [
        "Quick learning and adaptability",
        "Creative and artistic abilities",
        "Enthusiastic and inspiring",
        "Flexible thinking patterns"
      ],
      areasForBalance: [
        "Tendency toward anxiety and worry",
        "Difficulty with sustained focus",
        "Overthinking and mental restlessness",
        "Irregular sleep patterns"
      ]
    },
    physical: {
      bodyStructure: [
        "Thin, light build with prominent joints",
        "Variable weight gain/loss",
        "Cold body temperature",
        "Dry skin and hair"
      ],
      agni: [
        "Variable appetite (Vishama Agni)",
        "Irregular eating patterns",
        "Sensitive to cold foods",
        "Tendency toward gas and bloating"
      ],
      ojas: [
        "Variable energy levels",
        "Quick to tire but quick to recover",
        "Cold-sensitive",
        "Variable immunity"
      ]
    },
    diet: {
      tastesToFavor: "Sweet (Madhura), Sour (Amla), Salty (Lavana)",
      bestFoods: [
        "Warm, cooked foods",
        "Sweet fruits (bananas, mangoes)",
        "Warm milk and ghee",
        "Nuts and seeds",
        "Warming spices (ginger, cinnamon)"
      ],
      foodsToMinimize: [
        "Cold, raw foods",
        "Bitter and astringent tastes",
        "Dry, light foods",
        "Carbonated drinks"
      ],
      herbs: {
        primary: [
          "Ashwagandha - For strength and stability",
          "Brahmi - For mental clarity",
          "Shatavari - For nourishment",
          "Jatamansi - For sleep and calm"
        ],
        preparations: [
          "Warm herbal teas",
          "Nourishing tonics",
          "Sesame oil for external use"
        ]
      }
    },
    dailyRoutine: {
      morning: [
        "Wake early (6-7 AM)",
        "Warm oil massage (Abhyanga)",
        "Gentle exercise",
        "Warm shower",
        "Nourishing breakfast"
      ],
      midday: [
        "Regular meal times",
        "Avoid skipping meals",
        "Take breaks for rest",
        "Stay warm and comfortable",
        "Practice grounding activities"
      ],
      evening: [
        "Light, early dinner",
        "Gentle evening walk",
        "Relaxing activities",
        "Early bedtime (9-10 PM)",
        "Warm milk before sleep"
      ]
    },
    yoga: [
      "Sun Salutation",
      "Standing poses",
      "Gentle backbends",
      "Nadi Shodhana Pranayama",
      "Meditation for grounding"
    ],
    seasonal: {
      autumn: {
        riskLevel: "High",
        precautions: [
          "Stay warm and avoid wind",
          "Increase warm, oily foods",
          "Practice grounding exercises",
          "Maintain regular routine"
        ]
      },
      winter: {
        riskLevel: "High",
        precautions: [
          "Stay warm and protected",
          "Increase nourishing foods",
          "Practice warming exercises",
          "Avoid cold exposure"
        ]
      },
      spring: {
        riskLevel: "Moderate",
        precautions: [
          "Gradual transition to lighter foods",
          "Gentle detox practices",
          "Moderate exercise",
          "Maintain warmth"
        ]
      }
    },
    marma: {
      points: [
        {
          name: "Hridaya Marma (Heart center)",
          location: "Center of chest",
          therapy: "Gentle circular massage with warm oil",
          benefits: "Calms Prana Vata, reduces anxiety"
        },
        {
          name: "Sthapani Marma (Third eye)",
          location: "Between eyebrows",
          therapy: "Gentle pressure with warm oil",
          benefits: "Calms mind, improves focus"
        },
        {
          name: "Basti Marma (Lower abdomen)",
          location: "Lower abdominal area",
          therapy: "Warm oil massage in circular motion",
          benefits: "Balances Apana Vata, improves elimination"
        }
      ],
      guidelines: {
        bestTimes: [
          "Early morning (6-8 AM)",
          "Early evening (6-8 PM)",
          "During seasonal transitions",
          "When experiencing anxiety"
        ],
        precautions: [
          "Apply gentle pressure only",
          "Use warm oils",
          "Avoid during acute illness",
          "Stop if any discomfort occurs"
        ],
        duration: [
          "30 seconds to 2 minutes per point",
          "Daily practice recommended",
          "3-5 points per session",
          "Follow with 5 minutes rest"
        ]
      }
    },
    spiritual: {
      meditation: {
        title: "Grounding Meditation",
        description: "Visualize roots growing from your feet into the earth, connecting you to stability and nourishment. This helps ground the airy nature of Vata dosha."
      },
      mantra: {
        title: "Mantra Practice",
        description: "Chant \"LAM\" (earth element) or \"OM NAMAH SHIVAYA\" for grounding. Practice during early morning or evening hours."
      },
      witness: {
        title: "Witness Consciousness",
        description: "Practice observing thoughts without getting carried away by them. This helps transform Vata's tendency toward scattered thinking into focused awareness."
      },
      consciousness: {
        sattva: "Increase Sattva (purity, harmony) through regular routine, wholesome foods, and peaceful environment. This provides the stability Vata needs for spiritual growth.",
        dharma: "Live in alignment with your life purpose (Dharma). Your Vata constitution suggests creative and communicative talents in this lifetime.",
        seasonal: "Adjust spiritual practices seasonally. Increase grounding practices during your vulnerable seasons and creative practices during balanced periods."
      },
      integration: {
        dailyRoutine: [
          "Morning meditation (15-20 minutes)",
          "Gratitude practice",
          "Evening self-reflection",
          "Weekly nature connection"
        ],
        sacredTexts: [
          "Bhagavad Gita (self-realization)",
          "Yoga Sutras (mind control)",
          "Upanishads (consciousness)",
          "Ayurvedic texts (body wisdom)"
        ],
        service: [
          "Creative service (Karma Yoga)",
          "Devotional practices (Bhakti)",
          "Teaching and sharing wisdom",
          "Environmental stewardship"
        ]
      }
    }
  },
  pitta: {
    personality: {
      title: "Pitta Mind Characteristics",
      description: "Your Pitta-dominant mind is sharp, focused, and goal-oriented. You have excellent analytical abilities and natural leadership qualities. You think clearly under pressure and have a strong sense of purpose. Your mental fire drives you toward achievement and excellence in all endeavors.",
      strengths: [
        "Sharp intellect and decision-making",
        "Strong leadership abilities", 
        "Goal-oriented and ambitious",
        "Excellent organizational skills"
      ],
      areasForBalance: [
        "Tendency toward criticism and judgment",
        "Impatience with others' pace",
        "Perfectionist tendencies",
        "Anger and irritability under stress"
      ]
    },
    physical: {
      bodyStructure: [
        "Medium, well-proportioned build",
        "Good muscle development",
        "Warm body temperature",
        "Moderate weight gain/loss"
      ],
      agni: [
        "Strong appetite (Tikshna Agni)",
        "Cannot skip meals",
        "Good digestive capacity",
        "Sensitive to spicy foods"
      ],
      ojas: [
        "Moderate, steady energy",
        "Good stamina",
        "Heat-sensitive",
        "Strong immunity"
      ]
    },
    diet: {
      tastesToFavor: "Sweet (Madhura), Bitter (Tikta), Astringent (Kashaya)",
      bestFoods: [
        "Cool, sweet fruits (pears, grapes, melons)",
        "Leafy greens and cooling vegetables",
        "Basmati rice and wheat",
        "Coconut water and cool drinks",
        "Fresh herbs (cilantro, mint)"
      ],
      foodsToMinimize: [
        "Spicy and hot foods",
        "Sour fruits (citrus, tomatoes)",
        "Alcohol and caffeine",
        "Red meat and fried foods"
      ],
      herbs: {
        primary: [
          "Aloe Vera - For cooling and digestion",
          "Neem - For skin and blood purification",
          "Shatavari - For hormonal balance",
          "Guduchi - For immunity and liver"
        ],
        preparations: [
          "Cooling herbal waters (rose, sandalwood)",
          "Bitter digestive tonics",
          "Coconut oil for external use"
        ]
      }
    },
    dailyRoutine: {
      morning: [
        "Wake early (5:30-6 AM)",
        "Cool pranayama (Sheetali)",
        "Moderate exercise",
        "Cool morning shower",
        "Light, cooling breakfast"
      ],
      midday: [
        "Largest meal at noon",
        "Work during productive hours",
        "Avoid excessive heat",
        "Take breaks to cool down",
        "Practice patience"
      ],
      evening: [
        "Moderate dinner",
        "Cool evening walks",
        "Relaxing activities",
        "Avoid intense work",
        "Sleep by 10 PM"
      ]
    },
    yoga: [
      "Moon Salutation",
      "Seated forward bends",
      "Cooling poses",
      "Sheetali Pranayama",
      "Meditation at dawn"
    ],
    seasonal: {
      summer: {
        riskLevel: "High",
        precautions: [
          "Avoid midday sun exposure",
          "Increase cooling foods dramatically",
          "Practice cooling pranayama",
          "Wear light, breathable clothing"
        ]
      },
      monsoon: {
        riskLevel: "Moderate",
        precautions: [
          "Maintain digestive fire",
          "Avoid sour and fermented foods",
          "Keep environment clean",
          "Practice moderate activity"
        ]
      },
      winter: {
        riskLevel: "Low",
        precautions: [
          "Maintain moderate warmth",
          "Slightly increase warm foods",
          "Continue cooling practices moderately",
          "Balanced activity levels"
        ]
      }
    },
    marma: {
      points: [
        {
          name: "Shankha Marma (Temples)",
          location: "Temple area on both sides",
          therapy: "Cool coconut oil gentle massage",
          benefits: "Cools Sadhaka Pitta, reduces anger and irritation"
        },
        {
          name: "Netra Marma (Eye region)",
          location: "Around the eyes",
          therapy: "Rose water compress and gentle massage",
          benefits: "Soothes Alochaka Pitta, reduces eye strain"
        },
        {
          name: "Hridaya Marma (Heart center)",
          location: "Center of chest",
          therapy: "Gentle circular movements with cooling oils",
          benefits: "Balances emotions, cools internal heat"
        }
      ],
      guidelines: {
        bestTimes: [
          "Early morning (6-8 AM)",
          "Early evening (6-8 PM)",
          "During seasonal transitions",
          "When experiencing dosha imbalance"
        ],
        precautions: [
          "Apply gentle pressure only",
          "Avoid during acute illness",
          "Pregnant women should consult experts",
          "Stop if any discomfort occurs"
        ],
        duration: [
          "30 seconds to 2 minutes per point",
          "Daily practice recommended",
          "3-5 points per session",
          "Follow with 5 minutes rest"
        ]
      }
    },
    spiritual: {
      meditation: {
        title: "Cooling Meditation",
        description: "Visualize moonlight, cool water, or blue light flowing through your body. This helps calm the fiery nature of Pitta dosha."
      },
      mantra: {
        title: "Mantra Practice",
        description: "Chant \"SHRIM\" (cooling lunar energy) or \"OM NAMAH SHIVAYA\" for inner peace. Practice during cooler parts of the day."
      },
      witness: {
        title: "Witness Consciousness",
        description: "Practice observing thoughts and emotions without judgment. This helps transform Pitta's tendency toward criticism into wisdom and discernment."
      },
      consciousness: {
        sattva: "Increase Sattva (purity, harmony) through ethical living, truthfulness, and service to others. This is the foundation for spiritual growth in Ayurveda.",
        dharma: "Live in alignment with your life purpose (Dharma). Your Pitta constitution suggests specific talents and responsibilities in this lifetime.",
        seasonal: "Adjust spiritual practices seasonally. Increase contemplative practices during your vulnerable seasons and energizing practices during balanced periods."
      },
      integration: {
        dailyRoutine: [
          "Morning meditation (20 minutes)",
          "Gratitude practice",
          "Evening self-reflection",
          "Weekly nature connection"
        ],
        sacredTexts: [
          "Bhagavad Gita (self-realization)",
          "Yoga Sutras (mind control)",
          "Upanishads (consciousness)",
          "Ayurvedic texts (body wisdom)"
        ],
        service: [
          "Selfless service (Karma Yoga)",
          "Devotional practices (Bhakti)",
          "Teaching and sharing wisdom",
          "Environmental stewardship"
        ]
      }
    }
  },
  kapha: {
    personality: {
      title: "Kapha Mind Characteristics",
      description: "Your Kapha-dominant mind is calm, steady, and compassionate. You have excellent long-term memory and learn deeply rather than quickly. You are naturally patient, loyal, and supportive of others. Your mental stability provides a grounding presence that others find comforting and reliable.",
      strengths: [
        "Excellent long-term memory",
        "Patient and methodical approach",
        "Compassionate and supportive",
        "Emotionally stable and calm"
      ],
      areasForBalance: [
        "Slow to start new activities",
        "Resistance to change",
        "Tendency toward mental lethargy",
        "Attachment and possessiveness"
      ]
    },
    physical: {
      bodyStructure: [
        "Large, solid frame with broad shoulders",
        "Steady weight gain",
        "Cool body temperature",
        "Thick, oily skin and hair"
      ],
      agni: [
        "Slow but steady appetite (Manda Agni)",
        "Can skip meals easily",
        "Slow digestion",
        "Tendency toward heaviness"
      ],
      ojas: [
        "Strong, steady energy",
        "Excellent stamina",
        "Cold-tolerant",
        "Strong immunity"
      ]
    },
    diet: {
      tastesToFavor: "Pungent (Katu), Bitter (Tikta), Astringent (Kashaya)",
      bestFoods: [
        "Light, dry foods",
        "Spicy and warming foods",
        "Honey and warm water",
        "Legumes and vegetables",
        "Warming spices (ginger, black pepper)"
      ],
      foodsToMinimize: [
        "Heavy, oily foods",
        "Sweet and sour tastes",
        "Cold foods and drinks",
        "Dairy and nuts"
      ],
      herbs: {
        primary: [
          "Ginger - For digestion and metabolism",
          "Trikatu - For Kapha reduction",
          "Guggulu - For detoxification",
          "Pippali - For respiratory health"
        ],
        preparations: [
          "Warming herbal teas",
          "Detoxifying tonics",
          "Mustard oil for external use"
        ]
      }
    },
    dailyRoutine: {
      morning: [
        "Wake early (5-6 AM)",
        "Vigorous exercise",
        "Dry massage (Garshana)",
        "Warm shower",
        "Light breakfast"
      ],
      midday: [
        "Largest meal at noon",
        "Stay active and engaged",
        "Avoid daytime naps",
        "Practice stimulating activities",
        "Maintain warmth"
      ],
      evening: [
        "Light dinner",
        "Evening walk",
        "Stimulating activities",
        "Avoid heavy foods",
        "Sleep by 10 PM"
      ]
    },
    yoga: [
      "Sun Salutation",
      "Standing poses",
      "Twisting poses",
      "Kapalabhati Pranayama",
      "Dynamic meditation"
    ],
    seasonal: {
      spring: {
        riskLevel: "High",
        precautions: [
          "Increase detox practices",
          "Light, dry foods",
          "Vigorous exercise",
          "Avoid heavy foods"
        ]
      },
      monsoon: {
        riskLevel: "High",
        precautions: [
          "Maintain digestive fire",
          "Avoid cold and damp",
          "Practice warming exercises",
          "Keep environment dry"
        ]
      },
      winter: {
        riskLevel: "Moderate",
        precautions: [
          "Maintain activity levels",
          "Avoid excessive warmth",
          "Continue detox practices",
          "Balanced diet"
        ]
      }
    },
    marma: {
      points: [
        {
          name: "Hridaya Marma (Heart center)",
          location: "Center of chest",
          therapy: "Stimulating massage with warming oils",
          benefits: "Energizes Sadhaka Pitta, increases motivation"
        },
        {
          name: "Sthapani Marma (Third eye)",
          location: "Between eyebrows",
          therapy: "Stimulating pressure with warming oils",
          benefits: "Activates mind, improves focus"
        },
        {
          name: "Basti Marma (Lower abdomen)",
          location: "Lower abdominal area",
          therapy: "Stimulating massage with warming oils",
          benefits: "Activates Apana Vata, improves metabolism"
        }
      ],
      guidelines: {
        bestTimes: [
          "Early morning (5-7 AM)",
          "Midday (10 AM-2 PM)",
          "During seasonal transitions",
          "When experiencing lethargy"
        ],
        precautions: [
          "Apply stimulating pressure",
          "Use warming oils",
          "Avoid during acute illness",
          "Stop if any discomfort occurs"
        ],
        duration: [
          "30 seconds to 2 minutes per point",
          "Daily practice recommended",
          "3-5 points per session",
          "Follow with 5 minutes activity"
        ]
      }
    },
    spiritual: {
      meditation: {
        title: "Energizing Meditation",
        description: "Visualize bright sunlight or fire energy flowing through your body, awakening your inner strength and motivation. This helps energize the stable nature of Kapha dosha."
      },
      mantra: {
        title: "Mantra Practice",
        description: "Chant \"RAM\" (fire element) or \"OM NAMAH SHIVAYA\" for energy. Practice during early morning or midday hours."
      },
      witness: {
        title: "Witness Consciousness",
        description: "Practice observing thoughts and emotions with alert awareness. This helps transform Kapha's tendency toward complacency into active wisdom."
      },
      consciousness: {
        sattva: "Increase Sattva (purity, harmony) through regular exercise, light foods, and active engagement. This provides the energy Kapha needs for spiritual growth.",
        dharma: "Live in alignment with your life purpose (Dharma). Your Kapha constitution suggests nurturing and protective talents in this lifetime.",
        seasonal: "Adjust spiritual practices seasonally. Increase energizing practices during your vulnerable seasons and contemplative practices during balanced periods."
      },
      integration: {
        dailyRoutine: [
          "Morning meditation (20-30 minutes)",
          "Gratitude practice",
          "Evening self-reflection",
          "Weekly nature connection"
        ],
        sacredTexts: [
          "Bhagavad Gita (self-realization)",
          "Yoga Sutras (mind control)",
          "Upanishads (consciousness)",
          "Ayurvedic texts (body wisdom)"
        ],
        service: [
          "Nurturing service (Karma Yoga)",
          "Devotional practices (Bhakti)",
          "Teaching and sharing wisdom",
          "Environmental stewardship"
        ]
      }
    }
  }
};

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

const DoshaRadarChart: React.FC<{ percentages: any; primaryDosha?: string }> = ({ percentages, primaryDosha }) => {
  const size = 200;
  const center = size / 2;
  const radius = 70;
  
  const angles = [0, 120, 240];
  const points = Object.values(percentages).map((value: any, index) => {
    const angle = (angles[index] - 90) * (Math.PI / 180);
    const distance = (value / 100) * radius;
    return {
      x: center + Math.cos(angle) * distance,
      y: center + Math.sin(angle) * distance
    };
  });

  const pathData = `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y} L ${points[2].x} ${points[2].y} Z`;

  // Dynamic colors based on primary dosha
  const doshaColors = {
    vata: { fill: "rgba(59, 130, 246, 0.3)", stroke: "#3b82f6" },
    pitta: { fill: "rgba(239, 68, 68, 0.3)", stroke: "#ef4444" },
    kapha: { fill: "rgba(34, 197, 94, 0.3)", stroke: "#22c55e" }
  };

  const colors = primaryDosha ? doshaColors[primaryDosha as keyof typeof doshaColors] : doshaColors.pitta;

  return (
    <div className="flex justify-center">
      <svg width={size} height={size} className="drop-shadow-lg">
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
        
        <motion.path
          d={pathData}
          fill={colors.fill}
          stroke={colors.stroke}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {points.map((point, i) => (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill={colors.stroke}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5 + i * 0.2 }}
          />
        ))}
        
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

interface ComprehensiveReportProps {
  results: any;
  onRetake: () => void;
}

const ComprehensiveReport: React.FC<ComprehensiveReportProps> = ({ results, onRetake }) => {
  const content = doshaContent[results.primaryDosha as keyof typeof doshaContent];

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
            <Lotus className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-emerald-800">Your Ayurvedic Constitution</h1>
            <Lotus className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-emerald-600 text-lg">Detailed Analysis Based on Classical Texts</p>
          <button
            onClick={onRetake}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Assessment
          </button>
        </motion.div>

        {/* Constitutional Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Constitutional Overview (Prakriti)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-emerald-700 mb-4">Your Constitution: {results.constitution}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Vata (Air & Space)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.percentages.vata}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                    <span className="font-bold text-blue-600">{results.percentages.vata}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pitta (Fire & Water)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-red-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.percentages.pitta}%` }}
                        transition={{ duration: 1, delay: 0.4 }}
                      />
                    </div>
                    <span className="font-bold text-red-600">{results.percentages.pitta}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Kapha (Earth & Water)</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <motion.div 
                        className="bg-green-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${results.percentages.kapha}%` }}
                        transition={{ duration: 1, delay: 0.6 }}
                      />
                    </div>
                    <span className="font-bold text-green-600">{results.percentages.kapha}%</span>
                  </div>
                </div>
              </div>
            </div>
            
                          <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-4">Dosha Radar Chart</h3>
                <DoshaRadarChart percentages={results.percentages} primaryDosha={results.primaryDosha} />
              </div>
          </div>

          <ClassicalVerse verse={classicalVerses.charaka_sutra_1_57} />
        </motion.div>

        {/* Personality & Mind Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Personality & Mind (Manas Prakriti)
          </h2>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-red-600">{content.personality.title}</h3>
            <p className="text-gray-700 leading-relaxed">{content.personality.description}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Mental Strengths</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.personality.strengths.map((strength, index) => (
                    <li key={index}>• {strength}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-emerald-700 mb-2">Areas for Balance</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.personality.areasForBalance.map((area, index) => (
                    <li key={index}>• {area}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Physical Constitution Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Physical Constitution & Markers
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Body Structure</h3>
              <ul className="space-y-2 text-gray-600">
                {content.physical.bodyStructure.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Agni (Digestive Fire)</h3>
              <ul className="space-y-2 text-gray-600">
                {content.physical.agni.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Ojas (Vital Essence)</h3>
              <ul className="space-y-2 text-gray-600">
                {content.physical.ojas.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Diet & Herbal Recommendations */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Utensils className="w-6 h-6" />
            Diet & Herbal Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Recommended Foods</h3>
              <p className="text-gray-600 mb-3"><strong>Tastes to Favor:</strong> {content.diet.tastesToFavor}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-emerald-600 mb-2">Best Foods:</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.diet.bestFoods.map((food, index) => (
                    <li key={index}>• {food}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-emerald-600 mb-2">Foods to Minimize:</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.diet.foodsToMinimize.map((food, index) => (
                    <li key={index}>• {food}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Herbal Recommendations</h3>
              
              <div className="mb-4">
                <h4 className="font-medium text-emerald-600 mb-2">Primary Herbs:</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.diet.herbs.primary.map((herb, index) => (
                    <li key={index}>• {herb}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-emerald-600 mb-2">Herbal Preparations:</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.diet.herbs.preparations.map((prep, index) => (
                    <li key={index}>• {prep}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Routine */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6" />
            Daily Routine (Dinacharya)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Morning (6-10 AM)</h3>
              <ul className="space-y-2 text-gray-600">
                {content.dailyRoutine.morning.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Midday (10 AM-6 PM)</h3>
              <ul className="space-y-2 text-gray-600">
                {content.dailyRoutine.midday.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-3">Evening (6-10 PM)</h3>
              <ul className="space-y-2 text-gray-600">
                {content.dailyRoutine.evening.map((activity, index) => (
                  <li key={index}>• {activity}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Yoga & Pranayama */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <TreePine className="w-6 h-6" />
            Recommended Yoga & Pranayama
          </h2>
          
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 mb-3">Pitta-Pacifying Practices:</h3>
            <ul className="space-y-2 text-gray-600">
              {content.yoga.map((practice, index) => (
                <li key={index}>• {practice}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Seasonal Guidance */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Sun className="w-6 h-6" />
            Seasonal Guidance (Ritucharya)
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {Object.entries(content.seasonal).map(([season, data]: [string, any], index) => {
              const seasonNames: { [key: string]: string } = {
                summer: "Summer (Grishma)",
                monsoon: "Monsoon (Varsha)", 
                winter: "Winter (Shishira)",
                autumn: "Autumn (Sharad)",
                spring: "Spring (Vasant)"
              };
              
              const badgeVariants: { [key: string]: any } = {
                High: "destructive",
                Moderate: "secondary", 
                Low: "default"
              };
              
              return (
                <div key={season}>
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">{seasonNames[season]}</h3>
                  <Badge variant={badgeVariants[data.riskLevel]} className="mb-3">Risk Level: {data.riskLevel}</Badge>
                  <h4 className="font-medium text-emerald-600 mb-2">Precautions:</h4>
                  <ul className="space-y-1 text-gray-600">
                    {data.precautions.map((precaution: string, idx: number) => (
                      <li key={idx}>• {precaution}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <ClassicalVerse verse={classicalVerses.ashtanga_hridaya_3_1} />
        </motion.div>

        {/* Marma Therapy */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Target className="w-6 h-6" />
            Marma Therapy Recommendations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Primary Marma Points</h3>
              <div className="space-y-4">
                {content.marma.points.map((point, index) => (
                  <div key={index} className="border-l-4 border-emerald-200 pl-4">
                    <h4 className="font-medium text-emerald-600">{point.name}</h4>
                    <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {point.location}</p>
                    <p className="text-sm text-gray-600 mb-1"><strong>Therapy:</strong> {point.therapy}</p>
                    <p className="text-sm text-gray-600"><strong>Benefits:</strong> {point.benefits}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Application Guidelines</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-600 mb-2">Best Times</h4>
                  <ul className="space-y-1 text-gray-600">
                    {content.marma.guidelines.bestTimes.map((time, index) => (
                      <li key={index}>• {time}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600 mb-2">Precautions</h4>
                  <ul className="space-y-1 text-gray-600">
                    {content.marma.guidelines.precautions.map((precaution, index) => (
                      <li key={index}>• {precaution}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600 mb-2">Duration & Frequency</h4>
                  <ul className="space-y-1 text-gray-600">
                    {content.marma.guidelines.duration.map((item, index) => (
                      <li key={index}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Spiritual & Consciousness Practices */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Spiritual & Consciousness Practices
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Meditation Practices</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-600">{content.spiritual.meditation.title}</h4>
                  <p className="text-gray-600">{content.spiritual.meditation.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">{content.spiritual.mantra.title}</h4>
                  <p className="text-gray-600">{content.spiritual.mantra.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">{content.spiritual.witness.title}</h4>
                  <p className="text-gray-600">{content.spiritual.witness.description}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Consciousness Development</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-600">Sattva Cultivation</h4>
                  <p className="text-gray-600">{content.spiritual.consciousness.sattva}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Dharma Alignment</h4>
                  <p className="text-gray-600">{content.spiritual.consciousness.dharma}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Seasonal Spiritual Practice</h4>
                  <p className="text-gray-600">{content.spiritual.consciousness.seasonal}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-emerald-700 mb-4">Integration Practices</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-emerald-600 mb-2">Daily Spiritual Routine</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.spiritual.integration.dailyRoutine.map((practice, index) => (
                    <li key={index}>• {practice}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-emerald-600 mb-2">Sacred Texts Study</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.spiritual.integration.sacredTexts.map((text, index) => (
                    <li key={index}>• {text}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-emerald-600 mb-2">Service & Devotion</h4>
                <ul className="space-y-1 text-gray-600">
                  {content.spiritual.integration.service.map((service, index) => (
                    <li key={index}>• {service}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Classical References */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Classical References & Authenticity
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Primary Classical Sources</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-600">Charaka Samhita</h4>
                  <p className="text-gray-600">The foundational text of Ayurvedic medicine, compiled around 400-200 BCE. Primary source for dosha theory, constitution assessment, and therapeutic principles.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Sushruta Samhita</h4>
                  <p className="text-gray-600">Ancient surgical text that describes the marma points and introduces Rakta (blood) as the fourth dosha. Essential for understanding physical constitution.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Ashtanga Hridaya</h4>
                  <p className="text-gray-600">Comprehensive text by Vagbhata that synthesizes Charaka and Sushruta. Primary source for seasonal regimens (Ritucharya) and daily routines.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-emerald-700 mb-4">Modern Integrative Sources</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-emerald-600">David Frawley - Ayurveda and the Mind</h4>
                  <p className="text-gray-600">Bridges ancient wisdom with modern psychology. Essential for understanding mental constitution and consciousness in Ayurvedic practice.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Gregory Fields - Religious Therapeutics</h4>
                  <p className="text-gray-600">Explores the spiritual dimensions of Ayurvedic healing and the integration of religious practice with medical therapy.</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-emerald-600">Shantha Godagama - Handbook of Ayurveda</h4>
                  <p className="text-gray-600">Modern clinical applications of classical principles. Valuable for practical dietary and lifestyle recommendations.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important Disclaimer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Important Disclaimer
          </h2>
          
          <p className="text-amber-800 leading-relaxed mb-4">
            Ayurveda is a sacred science rooted in Hindu philosophy and Vedic wisdom. This analysis is based on classical texts and traditional knowledge systems that have been preserved for thousands of years. While this assessment provides valuable insights into your constitutional patterns, it should not replace consultation with a qualified Ayurvedic practitioner (Vaidya) for personalized treatment. Ayurveda views health holistically, encompassing physical, mental, and spiritual dimensions of well-being.
          </p>
          
          <div className="bg-amber-100 p-4 rounded-lg mb-4">
            <p className="text-amber-800 font-medium italic">
              "सर्वदा सर्वभावेन निष्काम कर्म करोति यः।" - One who performs action without attachment achieves the highest goal.
            </p>
          </div>

          <ClassicalVerse verse={classicalVerses.sushruta_sharirasthana_4_71} />
        </motion.div>

        {/* Download Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors shadow-lg">
            <Download className="w-5 h-5" />
            Download Complete Report (PDF)
          </button>
          <p className="text-emerald-600 mt-3 text-sm">
            Save your personalized Ayurvedic constitution analysis for future reference
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ComprehensiveReport; 