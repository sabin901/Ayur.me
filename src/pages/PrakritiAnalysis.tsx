import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Leaf, 
  Target, 
  ArrowRight,
  CheckCircle,
  BookOpen,
  Quote,
  Star,
  FileText,
  Wind,
  Flame,
  Mountain,
  Zap,
  ScrollText,
  Lightbulb,
  Clock,
  Calendar,
  Thermometer,
  Droplets,
  Scale,
  Activity,
  Brain,
  Heart,
  Sun,
  Moon,
  Bot as Lotus,
  Sparkles,
  Award,
  Users,
  Shield
} from "lucide-react";
import DoshaQuiz from "@/components/quiz/DoshaQuiz";

// Animated quotes from great yogis and sages
const wisdomQuotes = [
  {
    quote: "The body is the temple of the soul. Keep it pure and clean for the soul to reside therein.",
    author: "Swami Sivananda",
    source: "Yoga and Health"
  },
  {
    quote: "Health is not a mere absence of disease. It is a dynamic expression of life.",
    author: "Sri Sri Ravi Shankar",
    source: "Art of Living"
  },
  {
    quote: "The mind and body are not separate. What affects one, affects the other.",
    author: "Paramahansa Yogananda",
    source: "Autobiography of a Yogi"
  },
  {
    quote: "In the practice of yoga, one can emphasize the body, the mind, or the self and hence the effort can never be fruitless.",
    author: "B.K.S. Iyengar",
    source: "Light on Yoga"
  },
  {
    quote: "The greatest meditation is a mind that lets go.",
    author: "Ajahn Chah",
    source: "A Still Forest Pool"
  },
  {
    quote: "Your body is precious. It is our vehicle for awakening. Treat it with care.",
    author: "Buddha",
    source: "Dhammapada"
  }
];

// Enhanced dosha characteristics with classical references and images
const doshaCharacteristics = {
  vata: {
    name: "Vata",
    element: "Air & Ether",
    image: "/vata.jpg",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    gradient: "from-orange-400/20 to-yellow-400/20",
    qualities: ["Dry", "Light", "Cold", "Rough", "Subtle", "Mobile", "Clear"],
    description: "The energy of movement and change. Governs breathing, circulation, and nervous system functions.",
    classicalVerse: {
      sanskrit: "रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः",
      iast: "rūkṣo laghuḥ śītaḥ kharaḥ sūkṣmaścalo'nilaḥ",
      translation: "Dry, light, cold, rough, subtle, and mobile",
      source: "Charaka Samhita, Sutrasthana 1.59"
    },
    sources: ["Charaka Samhita", "Ashtanga Hridayam", "Ayurveda: The Science of Self-Healing - Lad"]
  },
  pitta: {
    name: "Pitta",
    element: "Fire & Water",
    image: "/pitta.jpg",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    gradient: "from-red-400/20 to-orange-400/20",
    qualities: ["Oily", "Sharp", "Hot", "Light", "Liquid", "Mobile", "Sour"],
    description: "The energy of transformation. Governs digestion, metabolism, and body temperature.",
    classicalVerse: {
      sanskrit: "सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं",
      iast: "sasnehatīkṣṇoṣṇalaghuvistraṃ saraṃ dravaṃ pittaṃ",
      translation: "Oily, sharp, hot, light, flowing, liquid",
      source: "Charaka Samhita, Sutrasthana 1.60"
    },
    sources: ["Charaka Samhita", "Sushruta Samhita", "Ayurvedic Healing - Frawley"]
  },
  kapha: {
    name: "Kapha",
    element: "Earth & Water",
    image: "/kapha.jpg",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    gradient: "from-blue-400/20 to-cyan-400/20",
    qualities: ["Oily", "Cool", "Heavy", "Slow", "Smooth", "Soft", "Stable"],
    description: "The energy of structure and stability. Governs immunity, growth, and lubrication.",
    classicalVerse: {
      sanskrit: "स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः",
      iast: "snigdhaḥ śīto gururmandaḥ ślakṣṇo mṛtsnaḥ sthiraḥ kaphaḥ",
      translation: "Oily, cold, heavy, slow, smooth, soft, stable",
      source: "Charaka Samhita, Sutrasthana 1.61"
    },
    sources: ["Charaka Samhita", "Ashtanga Hridayam", "Prakruti - Svoboda"]
  }
};

const features = [
  {
    icon: Target,
    title: "Comprehensive Analysis",
    description: "15 dosha subtypes with classical verse references and detailed constitutional assessment",
    color: "blue"
  },
  {
    icon: BookOpen,
    title: "Classical Foundation",
    description: "Based on authentic texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya",
    color: "green"
  },
  {
    icon: FileText,
    title: "Detailed Report",
    description: "Complete analysis with lifestyle recommendations and personalized guidance",
    color: "purple"
  },
  {
    icon: Heart,
    title: "Personalized Wellness",
    description: "Customized diet, lifestyle, and wellness practices for your unique constitution",
    color: "pink"
  },
  {
    icon: Leaf,
    title: "Herbal Wisdom",
    description: "Ancient herbal remedies and natural healing practices tailored to your dosha",
    color: "emerald"
  },
  {
    icon: Brain,
    title: "Mental Balance",
    description: "Mind-body harmony techniques and stress management for your constitution",
    color: "indigo"
  }
];

export default function PrakritiAnalysis() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showAssessment, setShowAssessment] = useState(false);

  // Animate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % wisdomQuotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentQuote = wisdomQuotes[currentQuoteIndex];

  if (showAssessment) {
    return <DoshaQuiz />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth/5 via-sage/5 to-gold/5">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-earth/10 via-transparent to-sage/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:30px_30px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header with Image Background */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-12"
          >
            {/* Image Logo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <img 
                  src="/discover-type.jpg" 
                  alt="Ayurvedic wisdom" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-earth/20 to-sage/20 rounded-full"></div>
              </div>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-earth to-sage bg-clip-text text-transparent">
              Discover Your Type
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto">
              Unlock the ancient wisdom of Ayurveda and discover your unique constitutional type through our comprehensive assessment
            </p>
          </motion.div>
          
          {/* Animated Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative bg-gradient-to-br from-gold/15 via-earth/10 to-sage/15 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-gold/30 overflow-hidden">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sage/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-gold to-earth rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <blockquote className="text-xl font-medium text-foreground leading-relaxed mb-6 italic">
                    "{currentQuote.quote}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <cite className="text-base text-gold font-semibold">
                      — {currentQuote.author}
                    </cite>
                    <span className="text-sm text-earth/80 italic font-medium">
                      {currentQuote.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dosha Overview Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-sage/5 via-background to-gold/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold mb-4">
              <Award className="h-4 w-4 mr-2" />
              The Three Doshas
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Understanding Your Constitution
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Each dosha represents different elements and qualities that make up your unique mind-body constitution
            </p>
          </motion.div>

          {/* Dosha Cards */}
          <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-12">
            {Object.entries(doshaCharacteristics).map(([key, dosha], index) => (
              <motion.div 
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 border-2 hover:border-current transform hover:-translate-y-2 bg-white/95 backdrop-blur-sm overflow-hidden">
                  {/* Dosha Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={dosha.image} 
                      alt={`${dosha.name} dosha`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white">{dosha.name}</h3>
                      <p className="text-white/90">{dosha.element}</p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <p className="text-foreground leading-relaxed">
                      {dosha.description}
                    </p>
                    
                    {/* Classical Verse */}
                    <div className={`bg-gradient-to-r ${dosha.gradient} rounded-xl p-4 border border-current/20`}>
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="h-4 w-4 text-current" />
                        <span className="text-sm font-semibold text-current">Classical Reference</span>
                      </div>
                      <p className="text-sm font-mono mb-1 leading-relaxed text-foreground">{dosha.classicalVerse.sanskrit}</p>
                      <p className="text-xs text-muted-foreground mb-1">{dosha.classicalVerse.iast}</p>
                      <p className="text-sm italic text-foreground mb-1">"{dosha.classicalVerse.translation}"</p>
                      <p className="text-xs text-current font-medium">{dosha.classicalVerse.source}</p>
                    </div>

                    {/* Qualities */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Star className="h-4 w-4 text-gold" />
                        Qualities:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {dosha.qualities.map((quality, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-current/30 text-current">
                            {quality}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Sources */}
                    <div className="space-y-1">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gold" />
                        Sources:
                      </h4>
                      <div className="space-y-1">
                        {dosha.sources.map((source, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">{source}</p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Assessment Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <Button 
              onClick={() => setShowAssessment(true)}
              size="xl" 
              className="bg-gradient-to-r from-gold to-earth hover:from-gold/90 hover:to-earth/90 text-white px-10 py-5 text-lg font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 group"
            >
              <Target className="h-5 w-5 mr-3" />
              Begin My Assessment
              <ArrowRight className="h-5 w-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Button>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Take our comprehensive 15-question assessment to discover your unique Ayurvedic constitution 
              and receive personalized recommendations based on classical wisdom.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-b from-gold/5 via-background to-earth/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center rounded-full bg-sage/10 px-4 py-2 text-sm font-medium text-sage mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Assessment Features
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What You'll Discover
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive assessment provides deep insights into your unique constitution
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center p-6 bg-white/95 backdrop-blur-sm border-sage/20 hover:shadow-xl transition-all duration-300 group hover:border-current/30">
                    <div className={`mx-auto w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 text-${feature.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-current transition-colors duration-300">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}