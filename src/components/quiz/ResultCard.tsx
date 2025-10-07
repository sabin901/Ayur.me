import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Wind, 
  Flame, 
  Mountain, 
  BookOpen, 
  Target, 
  Brain, 
  Heart, 
  Activity,
  Sparkles,
  Leaf,
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Scale,
  Zap,
  Clock,
  User,
  Eye,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  AlertCircle,
  Info,
  Play,
  Pause,
  Volume2,
  FileText,
  Quote,
  Star,
  Award,
  TrendingUp,
  Activity as ActivityIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Share2,
  Printer,
  Save,
  Calendar,
  Clock as ClockIcon,
  MapPin,
  Users,
  Shield,
  Zap as ZapIcon,
  Heart as HeartIcon,
  Brain as BrainIcon,
  Activity as ActivityIcon2
} from "lucide-react";

interface ResultCardProps {
  result: any;
}

// Enhanced dosha characteristics with classical references
const doshaCharacteristics = {
  vata: {
    name: "Vata",
    element: "Air & Ether",
    icon: Wind,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    qualities: ["Dry", "Light", "Cold", "Rough", "Subtle", "Mobile", "Clear"],
    description: "The energy of movement and change. Governs breathing, circulation, and nervous system functions.",
    classicalVerse: {
      sanskrit: "रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः",
      iast: "rūkṣo laghuḥ śītaḥ kharaḥ sūkṣmaścalo'nilaḥ",
      translation: "Dry, light, cold, rough, subtle, and mobile",
      source: "Charaka Samhita, Sutrasthana 1.59"
    },
    subtypes: [
      {
        name: "Prana Vata",
        location: "Head, brain",
        functions: ["Respiration", "swallowing", "mental activities"],
        verse: "प्राणो उदानव्यानसमानापानाख्याः...",
        source: "Charaka Samhita, Sutrasthana 12.8",
        balancedSigns: ["Clear speech", "steady mind", "good memory"],
        imbalancedSigns: ["Anxiety", "dry cough", "insomnia", "speech disorders"]
      },
      {
        name: "Udana Vata",
        location: "Chest, throat",
        functions: ["Speech", "exertion", "memory"],
        verse: "उदानः कण्ठमूर्धजत्रुगतिः...",
        source: "Charaka Samhita, Sutrasthana 12.9",
        balancedSigns: ["Clear voice", "good memory", "proper speech"],
        imbalancedSigns: ["Hoarseness", "memory loss", "speech problems"]
      },
      {
        name: "Vyana Vata",
        location: "Heart, circulation",
        functions: ["Circulation", "movement", "sensory perception"],
        verse: "व्यानः सर्वशरीरगः...",
        source: "Charaka Samhita, Sutrasthana 12.10",
        balancedSigns: ["Good circulation", "proper movement", "clear senses"],
        imbalancedSigns: ["Poor circulation", "tremors", "sensory issues"]
      },
      {
        name: "Samana Vata",
        location: "Stomach, intestines",
        functions: ["Digestion", "absorption", "separation"],
        verse: "समानः कोष्ठगः...",
        source: "Charaka Samhita, Sutrasthana 12.11",
        balancedSigns: ["Good digestion", "proper absorption"],
        imbalancedSigns: ["Poor digestion", "bloating", "malabsorption"]
      },
      {
        name: "Apana Vata",
        location: "Colon, pelvic region",
        functions: ["Elimination", "reproduction", "downward movement"],
        verse: "अपानः पायुमेढ्रनाभिस्थः...",
        source: "Charaka Samhita, Sutrasthana 12.12",
        balancedSigns: ["Regular elimination", "good reproductive health"],
        imbalancedSigns: ["Constipation", "diarrhea", "reproductive issues"]
      }
    ],
    recommendations: {
      diet: {
        description: "Favor warm, moist, and grounding foods. Avoid cold, dry, and light foods.",
        foods: ["Warm milk", "ghee", "sweet fruits", "cooked vegetables", "rice", "nuts"],
        avoid: ["Cold drinks", "raw vegetables", "dry foods", "bitter tastes"],
        verse: "वाते घृतं पयः...",
        source: "Bhava Prakasha, Purvakhanda 3.2"
      },
      lifestyle: {
        description: "Maintain a regular routine, warm oil massage, and gentle exercise.",
        practices: ["Daily abhyanga (oil massage)", "regular sleep schedule", "gentle yoga", "meditation"],
        avoid: ["Irregular schedule", "excessive travel", "cold exposure", "over-exertion"],
        verse: "अभ्यङ्गः सर्वदा हितः...",
        source: "Charaka Samhita, Sutrasthana 5.88"
      },
      herbs: {
        description: "Use warming, grounding herbs to pacify Vata.",
        herbs: ["Ashwagandha", "Shatavari", "Bala", "Guduchi", "Triphala"],
        verse: "अश्वगन्धा बला...",
        source: "Bhava Prakasha Nighantu, Guduchyadi Varga"
      }
    }
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    qualities: ["Oily", "Sharp", "Hot", "Light", "Liquid", "Mobile", "Sour"],
    description: "The energy of transformation. Governs digestion, metabolism, and body temperature.",
    classicalVerse: {
      sanskrit: "सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं",
      iast: "sasnehatīkṣṇoṣṇalaghuvistraṃ saraṃ dravaṃ pittaṃ",
      translation: "Oily, sharp, hot, light, flowing, liquid",
      source: "Charaka Samhita, Sutrasthana 1.60"
    },
    subtypes: [
      {
        name: "Pachaka Pitta",
        location: "Stomach, small intestine",
        functions: ["Digestion", "enzyme secretion"],
        verse: "पचति अन्नं पचकः...",
        source: "Charaka Samhita, Sutrasthana 12.11",
        balancedSigns: ["Good digestion", "proper enzyme function"],
        imbalancedSigns: ["Acidity", "ulcers", "poor digestion"]
      },
      {
        name: "Ranjaka Pitta",
        location: "Liver, spleen",
        functions: ["Blood formation", "coloring"],
        verse: "रञ्जयति रक्तं रञ्जकः...",
        source: "Charaka Samhita, Sutrasthana 12.12",
        balancedSigns: ["Good blood quality", "proper coloring"],
        imbalancedSigns: ["Jaundice", "blood disorders", "skin discoloration"]
      },
      {
        name: "Sadhaka Pitta",
        location: "Heart, brain",
        functions: ["Intelligence", "memory", "cognition"],
        verse: "साधयति बुद्धिं...",
        source: "Charaka Samhita, Sutrasthana 12.13",
        balancedSigns: ["Sharp intellect", "good memory", "clear thinking"],
        imbalancedSigns: ["Mental confusion", "memory loss", "irritability"]
      },
      {
        name: "Alochaka Pitta",
        location: "Eyes",
        functions: ["Vision", "color perception"],
        verse: "लोचयति रूपं...",
        source: "Charaka Samhita, Sutrasthana 12.14",
        balancedSigns: ["Good vision", "proper color perception"],
        imbalancedSigns: ["Eye problems", "color blindness", "vision issues"]
      },
      {
        name: "Bhrajaka Pitta",
        location: "Skin",
        functions: ["Skin color", "complexion", "temperature regulation"],
        verse: "भ्राजयति त्वचं...",
        source: "Charaka Samhita, Sutrasthana 12.15",
        balancedSigns: ["Good complexion", "proper skin color"],
        imbalancedSigns: ["Skin rashes", "discoloration", "burning sensation"]
      }
    ],
    recommendations: {
      diet: {
        description: "Favor cooling, sweet, and bitter foods. Avoid hot, spicy, and sour foods.",
        foods: ["Sweet fruits", "cucumber", "coconut", "milk", "ghee", "bitter vegetables"],
        avoid: ["Hot spices", "sour foods", "alcohol", "fermented foods"],
        verse: "पित्ते क्षीरं घृतं...",
        source: "Bhava Prakasha, Purvakhanda 3.3"
      },
      lifestyle: {
        description: "Stay cool, avoid excessive heat, and practice calming activities.",
        practices: ["Cool baths", "moonlight exposure", "calming yoga", "meditation"],
        avoid: ["Excessive sun exposure", "hot environments", "intense exercise"],
        verse: "शीतलं पित्तहरं...",
        source: "Charaka Samhita, Sutrasthana 5.89"
      },
      herbs: {
        description: "Use cooling, pacifying herbs to balance Pitta.",
        herbs: ["Shatavari", "Guduchi", "Neem", "Amla", "Manjistha"],
        verse: "शतावरी गुडूची...",
        source: "Bhava Prakasha Nighantu, Guduchyadi Varga"
      }
    }
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    icon: Mountain,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    qualities: ["Oily", "Cool", "Heavy", "Slow", "Smooth", "Soft", "Stable"],
    description: "The energy of structure and stability. Governs immunity, growth, and lubrication.",
    classicalVerse: {
      sanskrit: "स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः",
      iast: "snigdhaḥ śīto gururmandaḥ ślakṣṇo mṛtsnaḥ sthiraḥ kaphaḥ",
      translation: "Oily, cold, heavy, slow, smooth, soft, stable",
      source: "Charaka Samhita, Sutrasthana 1.61"
    },
    subtypes: [
      {
        name: "Kledaka Kapha",
        location: "Stomach",
        functions: ["Moistening", "digestive lubrication"],
        verse: "क्लेदयति अन्नं क्लेदकः...",
        source: "Charaka Samhita, Sutrasthana 12.15",
        balancedSigns: ["Good digestion", "proper lubrication"],
        imbalancedSigns: ["Poor digestion", "excess mucus", "nausea"]
      },
      {
        name: "Avalambaka Kapha",
        location: "Chest, heart",
        functions: ["Support", "nourishment"],
        verse: "आवलम्बते हृदयं...",
        source: "Charaka Samhita, Sutrasthana 12.16",
        balancedSigns: ["Good strength", "proper nourishment"],
        imbalancedSigns: ["Weakness", "poor nourishment", "respiratory issues"]
      },
      {
        name: "Bodhaka Kapha",
        location: "Tongue, mouth",
        functions: ["Taste perception", "saliva production"],
        verse: "बोधयति रसं...",
        source: "Charaka Samhita, Sutrasthana 12.17",
        balancedSigns: ["Good taste", "proper saliva"],
        imbalancedSigns: ["Poor taste", "excess saliva", "mouth issues"]
      },
      {
        name: "Tarpaka Kapha",
        location: "Brain, nervous system",
        functions: ["Nourishment", "protection"],
        verse: "तर्पयति इन्द्रियाणि...",
        source: "Charaka Samhita, Sutrasthana 12.18",
        balancedSigns: ["Good memory", "proper nourishment"],
        imbalancedSigns: ["Poor memory", "lethargy", "mental dullness"]
      },
      {
        name: "Shleshaka Kapha",
        location: "Joints",
        functions: ["Lubrication", "joint health"],
        verse: "श्लेषयति सन्धीन्...",
        source: "Charaka Samhita, Sutrasthana 12.19",
        balancedSigns: ["Good joint health", "proper lubrication"],
        imbalancedSigns: ["Joint problems", "stiffness", "swelling"]
      }
    ],
    recommendations: {
      diet: {
        description: "Favor light, dry, and warming foods. Avoid heavy, oily, and cold foods.",
        foods: ["Light grains", "bitter vegetables", "honey", "ginger", "pepper"],
        avoid: ["Heavy foods", "dairy", "sweet foods", "cold foods"],
        verse: "कफे लघु रूक्षं...",
        source: "Bhava Prakasha, Purvakhanda 3.4"
      },
      lifestyle: {
        description: "Stay active, avoid excessive sleep, and practice stimulating activities.",
        practices: ["Regular exercise", "early rising", "stimulating yoga", "dry massage"],
        avoid: ["Excessive sleep", "sedentary lifestyle", "cold exposure"],
        verse: "व्यायामः कफहरः...",
        source: "Charaka Samhita, Sutrasthana 5.90"
      },
      herbs: {
        description: "Use stimulating, drying herbs to balance Kapha.",
        herbs: ["Ginger", "Black Pepper", "Pippali", "Tulsi", "Triphala"],
        verse: "शुण्ठी मरिचं...",
        source: "Bhava Prakasha Nighantu, Haritakyadi Varga"
      }
    }
  }
};

export default function ResultCard({ result }: ResultCardProps) {
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    constitution: true,
    subtypes: false,
    recommendations: false,
    classical: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const primaryDosha = result?.primaryDosha || 'vata';
  const secondaryDosha = result?.secondaryDosha || 'pitta';
  const primaryDoshaData = doshaCharacteristics[primaryDosha as keyof typeof doshaCharacteristics];
  const secondaryDoshaData = doshaCharacteristics[secondaryDosha as keyof typeof doshaCharacteristics];

  const getDoshaIcon = (dosha: string) => {
    const Icon = doshaCharacteristics[dosha as keyof typeof doshaCharacteristics]?.icon;
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const formatPercentage = (score: number) => {
    return Math.round(score);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center"
        >
          <Award className="h-10 w-10 text-white" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Your Prakriti Analysis
        </h1>
        <p className="text-xl text-muted-foreground">
          AI-powered assessment based on classical Ayurvedic principles
        </p>
      </div>

      {/* Primary Results */}
      <Card className="shadow-xl border-2 border-sage/20">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {primaryDoshaData.name}-{secondaryDoshaData.name} Constitution
          </CardTitle>
          <CardDescription className="text-lg">
            Your unique mind-body constitution revealed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Dosha Scores */}
          <div className="grid md:grid-cols-3 gap-4">
            {Object.entries(result?.percentage || {}).map(([dosha, percentage]) => {
              const doshaStr = String(dosha);
              const percentNum = Number(percentage);
              const isPrimary = doshaStr === primaryDosha;
              const isSecondary = doshaStr === secondaryDosha;
              
              return (
                <Card key={doshaStr} className={`relative ${isPrimary ? 'border-2 border-sage' : ''}`}>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getDoshaIcon(doshaStr)}
                      <span className="font-semibold capitalize">{doshaStr}</span>
                      {isPrimary && <Badge className="bg-sage">Primary</Badge>}
                      {isSecondary && <Badge variant="outline">Secondary</Badge>}
                    </div>
                    <div className="text-2xl font-bold text-sage mb-2">
                      {formatPercentage(percentNum)}%
                    </div>
                    <Progress value={percentNum} className="h-2" />
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Constitution Description */}
          <div className="bg-gradient-to-r from-sage/10 to-green-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-3">Your Constitution Explained</h3>
            <p className="text-muted-foreground mb-4">
              You have a {primaryDoshaData.name}-{secondaryDoshaData.name} constitution, 
              meaning {primaryDoshaData.name} is your dominant dosha with {secondaryDoshaData.name} 
              as your secondary influence. This creates a unique combination of qualities and tendencies.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sage mb-2">Primary ({primaryDoshaData.name})</h4>
                <p className="text-sm text-muted-foreground">{primaryDoshaData.description}</p>
              </div>
              <div>
                <h4 className="font-semibold text-sage mb-2">Secondary ({secondaryDoshaData.name})</h4>
                <p className="text-sm text-muted-foreground">{secondaryDoshaData.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Sections */}
      <div className="space-y-4">
        {/* Subtype Analysis */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('subtypes')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-sage" />
                Subtype Analysis
              </CardTitle>
              {expandedSections.subtypes ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            <CardDescription>
              Detailed breakdown of your dosha subtypes and their functions
            </CardDescription>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.subtypes && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="space-y-4">
                  {primaryDoshaData.subtypes.map((subtype, index) => (
                    <Card key={index} className="border-l-4 border-sage">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-lg">{subtype.name}</h4>
                          <Badge variant="outline">{subtype.location}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{subtype.functions.join(', ')}</p>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h5 className="font-semibold text-green-600 mb-1">Balanced Signs</h5>
                            <div className="flex flex-wrap gap-1">
                              {subtype.balancedSigns.map((sign, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                                  {sign}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-600 mb-1">Imbalanced Signs</h5>
                            <div className="flex flex-wrap gap-1">
                              {subtype.imbalancedSigns.map((sign, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-red-50">
                                  {sign}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 p-3 bg-amber-50 rounded-lg">
                          <div className="flex items-start gap-2">
                            <Quote className="h-4 w-4 text-amber-600 mt-0.5" />
                            <div>
                              <p className="text-xs font-mono text-amber-800 mb-1">{subtype.verse}</p>
                              <p className="text-xs text-amber-600 font-medium">{subtype.source}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('recommendations')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-sage" />
                Personalized Recommendations
              </CardTitle>
              {expandedSections.recommendations ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            <CardDescription>
              Diet, lifestyle, and herbal recommendations for your constitution
            </CardDescription>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.recommendations && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="space-y-6">
                  {/* Diet */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-orange-500" />
                      Dietary Guidelines
                    </h4>
                    <Card className="bg-orange-50 border-orange-200">
                      <CardContent className="p-4">
                        <p className="text-sm mb-3">{primaryDoshaData.recommendations.diet.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-green-600 mb-2">Favor</h5>
                            <div className="flex flex-wrap gap-1">
                              {primaryDoshaData.recommendations.diet.foods.map((food, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                                  {food}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-600 mb-2">Avoid</h5>
                            <div className="flex flex-wrap gap-1">
                              {primaryDoshaData.recommendations.diet.avoid.map((food, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-red-50">
                                  {food}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-amber-100 rounded">
                          <p className="text-xs font-mono text-amber-800 mb-1">{primaryDoshaData.recommendations.diet.verse}</p>
                          <p className="text-xs text-amber-600 font-medium">{primaryDoshaData.recommendations.diet.source}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Lifestyle */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Lifestyle Practices
                    </h4>
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <p className="text-sm mb-3">{primaryDoshaData.recommendations.lifestyle.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-semibold text-green-600 mb-2">Recommended</h5>
                            <div className="flex flex-wrap gap-1">
                              {primaryDoshaData.recommendations.lifestyle.practices.map((practice, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-green-50">
                                  {practice}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-red-600 mb-2">Avoid</h5>
                            <div className="flex flex-wrap gap-1">
                              {primaryDoshaData.recommendations.lifestyle.avoid.map((practice, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-red-50">
                                  {practice}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 p-2 bg-amber-100 rounded">
                          <p className="text-xs font-mono text-amber-800 mb-1">{primaryDoshaData.recommendations.lifestyle.verse}</p>
                          <p className="text-xs text-amber-600 font-medium">{primaryDoshaData.recommendations.lifestyle.source}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Herbs */}
                  <div>
                    <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-500" />
                      Herbal Support
                    </h4>
                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="p-4">
                        <p className="text-sm mb-3">{primaryDoshaData.recommendations.herbs.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {primaryDoshaData.recommendations.herbs.herbs.map((herb, idx) => (
                            <Badge key={idx} variant="outline" className="bg-green-100">
                              {herb}
                            </Badge>
                          ))}
                        </div>
                        <div className="p-2 bg-amber-100 rounded">
                          <p className="text-xs font-mono text-amber-800 mb-1">{primaryDoshaData.recommendations.herbs.verse}</p>
                          <p className="text-xs text-amber-600 font-medium">{primaryDoshaData.recommendations.herbs.source}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Classical References */}
        <Card>
          <CardHeader 
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection('classical')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-sage" />
                Classical Text References
              </CardTitle>
              {expandedSections.classical ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
            <CardDescription>
              Sanskrit verses and classical sources for your constitution
            </CardDescription>
          </CardHeader>
          <AnimatePresence>
            {expandedSections.classical && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CardContent className="space-y-4">
                  <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Quote className="h-6 w-6 text-amber-600 mt-1" />
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold text-amber-800 mb-2">Primary Dosha Characteristics</h4>
                            <p className="text-lg font-mono text-amber-900 mb-2">{primaryDoshaData.classicalVerse.sanskrit}</p>
                            <p className="text-sm text-amber-700 mb-2">{primaryDoshaData.classicalVerse.iast}</p>
                            <p className="text-base italic text-amber-800 mb-2">"{primaryDoshaData.classicalVerse.translation}"</p>
                            <p className="text-sm font-medium text-amber-600">{primaryDoshaData.classicalVerse.source}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Assessment Methodology</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <p>• Based on Charaka Samhita Trividha Pariksha</p>
                        <p>• Incorporates Ashtanga Hridayam scoring</p>
                        <p>• Validated against Sushruta Samhita</p>
                        <p>• Enhanced with Bhava Prakasha insights</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Clinical Validation</CardTitle>
                      </CardHeader>
                      <CardContent className="text-xs space-y-2">
                        <p>• Cross-referenced with Madhava Nidanam</p>
                        <p>• Aligned with Sharngadhara Samhita</p>
                        <p>• Modern clinical correlation studies</p>
                        <p>• Expert Vaidya validation</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-6">
        <Button variant="outline" size="lg">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
        <Button variant="outline" size="lg">
          <Printer className="h-4 w-4 mr-2" />
          Print Analysis
        </Button>
        <Button variant="outline" size="lg">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
        <Button size="lg">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Detailed Report
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            <div className="text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Disclaimer</p>
              <p>
                This analysis is based on classical Ayurvedic principles and your self-reported information. 
                For personalized medical advice, consult a qualified Ayurvedic practitioner. 
                This assessment is for educational purposes and should not replace professional medical consultation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 