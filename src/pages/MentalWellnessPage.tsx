import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loading } from "@/components/ui/loading";
import { 
  Brain, 
  Heart, 
  Leaf, 
  Wind,
  Flame, 
  Mountain,
  Sparkles,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Users,
  AlertTriangle,
  Clock,
  Zap,
  Moon,
  Sun,
  Activity,
  Shield,
  Eye,
  Target,
  Compass,
  Search,
  Filter,
  Grid3X3,
  List
} from "lucide-react";

const mentalStates = [
  {
    name: "Sattva",
    quality: "Balance & Clarity",
    description: "The state of harmony, clarity, and pure consciousness. When Sattva dominates, you experience peace, wisdom, and spiritual insight.",
    characteristics: ["Mental clarity", "Emotional stability", "Spiritual awareness", "Compassion", "Contentment"],
    color: "sage",
    icon: Sparkles,
    sources: ["Charaka Samhita", "Ayurveda: The Science of Self-Healing - Lad", "Ayurvedic Healing - Frawley"]
  },
  {
    name: "Rajas", 
    quality: "Activity & Passion",
    description: "The dynamic principle of movement and change. Rajas brings motivation and drive but can lead to restlessness and attachment.",
    characteristics: ["High energy", "Goal-oriented", "Passionate", "Sometimes restless", "Driven nature"],
    color: "pitta", 
    icon: Flame,
    sources: ["Charaka Samhita", "The Yoga of Herbs - Frawley & Lad", "Ayurvedic Healing - Frawley"]
  },
  {
    name: "Tamas",
    quality: "Inertia & Stability",
    description: "The principle of stability and rest. While necessary for sleep and grounding, excess Tamas leads to lethargy and confusion.",
    characteristics: ["Need for rest", "Grounding energy", "Can become lethargic", "Resistance to change", "Deep sleeper"],
    color: "kapha",
    icon: Mountain,
    sources: ["Charaka Samhita", "Ayurveda: The Science of Self-Healing - Lad", "Ayurvedic Healing - Frawley"]
  }
];

const mentalHealthConditions = [
  {
    name: "Anxiety (Chittodvega)",
    sanskrit: "चित्तोद्वेग",
    dosha: "Vata",
    symptoms: [
      "Restlessness and constant movement",
      "Excessive worry and fear",
      "Irregular breathing patterns",
      "Insomnia and disturbed sleep",
      "Fear and insecurity",
      "Dry skin and hair",
      "Constipation and irregular digestion",
      "Trembling and shaking",
      "Racing thoughts",
      "Difficulty concentrating"
    ],
    causes: [
      "Vata imbalance from irregular routine",
      "Overstimulation and excessive activity",
      "Lack of grounding practices",
      "Irregular eating habits",
      "Excessive travel or movement",
      "Cold, dry, windy weather",
      "Lack of proper sleep",
      "Mental overwork and stress",
      "Fear and emotional trauma",
      "Excessive consumption of bitter, astringent, and pungent tastes"
    ],
    treatments: [
      "Abhyanga with warm sesame oil daily",
      "Pranayama: Nadi Shodhana (alternate nostril breathing)",
      "Grounding foods: sweet, sour, salty tastes",
      "Regular sleep schedule (10 PM - 6 AM)",
      "Ashwagandha and Jatamansi herbs",
      "Warm oil massage to feet and head",
      "Gentle yoga poses: Balasana, Vrikshasana",
      "Meditation with grounding mantras",
      "Warm baths with calming essential oils",
      "Avoidance of cold, dry, light foods"
    ],
    lifestyleRecommendations: [
      "Establish regular daily routine (Dinacharya)",
      "Practice grounding activities: walking in nature",
      "Use warm, heavy blankets for sleep",
      "Avoid excessive travel and movement",
      "Practice self-massage with warm oil",
      "Engage in calming activities: reading, gentle music",
      "Maintain warm, humid environment",
      "Regular meals at same times daily"
    ],
    herbs: [
      {
        name: "Ashwagandha",
        dosage: "500-1000mg twice daily",
        preparation: "With warm milk and honey",
        duration: "3-6 months"
      },
      {
        name: "Jatamansi",
        dosage: "250-500mg twice daily",
        preparation: "With warm water or milk",
        duration: "2-4 months"
      },
      {
        name: "Brahmi",
        dosage: "300-600mg twice daily",
        preparation: "With honey or ghee",
        duration: "3-6 months"
      }
    ],
    sources: ["Charaka Samhita", "Ayurvedic Healing - Frawley", "The Yoga of Herbs - Frawley & Lad", "Ayurveda: The Science of Self-Healing - Lad"]
  },
  {
    name: "Depression (Vishada)",
    sanskrit: "विषाद",
    dosha: "Kapha/Vata",
    symptoms: [
      "Heavy feeling in body and mind",
      "Lack of motivation and energy",
      "Social withdrawal and isolation",
      "Hopelessness and despair",
      "Excessive sleep or insomnia",
      "Weight gain or loss",
      "Sluggish digestion",
      "Cold extremities",
      "Difficulty making decisions",
      "Loss of interest in activities"
    ],
    causes: [
      "Kapha accumulation from sedentary lifestyle",
      "Vata depletion from overwork",
      "Seasonal factors (especially winter)",
      "Lifestyle imbalance and irregular routine",
      "Heavy, cold, sweet foods",
      "Lack of physical activity",
      "Emotional suppression",
      "Grief and loss",
      "Hormonal imbalances",
      "Toxic accumulation (Ama)"
    ],
    treatments: [
      "Energizing practices: Surya Namaskara",
      "Stimulating herbs: Brahmi, Shankhpushpi",
      "Light, warm, spicy foods",
      "Morning routine with early rising",
      "Social connection and activity",
      "Kapha-reducing diet",
      "Regular exercise and movement",
      "Stimulating pranayama: Bhastrika",
      "Warm oil massage with stimulating oils",
      "Exposure to sunlight and fresh air"
    ],
    lifestyleRecommendations: [
      "Wake up early (6 AM) and exercise",
      "Eat light, warm, spicy foods",
      "Engage in stimulating activities",
      "Maintain regular social connections",
      "Practice energizing yoga poses",
      "Avoid heavy, cold, sweet foods",
      "Regular detoxification practices",
      "Exposure to bright light and nature"
    ],
    herbs: [
      {
        name: "Brahmi",
        dosage: "300-600mg twice daily",
        preparation: "With honey or ghee",
        duration: "3-6 months"
      },
      {
        name: "Shankhpushpi",
        dosage: "500-1000mg twice daily",
        preparation: "With warm milk",
        duration: "3-6 months"
      },
      {
        name: "Ashwagandha",
        dosage: "500-1000mg twice daily",
        preparation: "With warm milk",
        duration: "3-6 months"
      }
    ],
    sources: ["Charaka Samhita", "Ayurvedic Healing - Frawley", "The Yoga of Herbs - Frawley & Lad", "Ayurveda: The Science of Self-Healing - Lad"]
  }
];

const therapeuticPractices = [
  {
    name: "Pranayama (Breath Control)",
    sanskrit: "प्राणायाम",
    type: "Breathing",
    duration: "10-20 minutes",
    description: "Systematic breathing techniques to balance the mind and vital energy.",
    benefits: ["Calms nervous system", "Improves concentration", "Reduces stress", "Balances doshas"],
    technique: "Sit comfortably with straight spine. Practice Nadi Shodhana (alternate nostril breathing) for 10-15 minutes daily.",
    contraindications: ["High blood pressure", "Heart conditions", "Pregnancy"],
    sources: ["Hatha Yoga Pradipika", "Charaka Samhita", "Ayurvedic Healing - Frawley"]
  },
  {
    name: "Meditation (Dhyana)",
    sanskrit: "ध्यान",
    type: "Mental",
    duration: "20-30 minutes",
    description: "Focused attention practice to cultivate mental clarity and inner peace.",
    benefits: ["Mental clarity", "Emotional balance", "Stress reduction", "Spiritual growth"],
    technique: "Choose a comfortable seated position. Focus on breath or a mantra. Start with 10 minutes, gradually increase.",
    contraindications: ["Severe mental illness", "Consult practitioner"],
    sources: ["Yoga Sutras of Patanjali", "Bhagavad Gita", "Ayurvedic Healing - Frawley"]
  },
  {
    name: "Abhyanga (Oil Massage)",
    sanskrit: "अभ्यंग",
    type: "Physical",
    duration: "15-20 minutes",
    description: "Daily self-massage with warm oil to nourish tissues and calm the nervous system.",
    benefits: ["Nourishes tissues", "Calms nervous system", "Improves circulation", "Promotes sleep"],
    technique: "Use warm sesame oil for Vata, coconut oil for Pitta, mustard oil for Kapha. Massage entire body before bath.",
    contraindications: ["Fever", "Digestive disorders", "Skin conditions"],
    sources: ["Charaka Samhita", "Ashtanga Hridayam", "Ayurvedic Healing - Frawley"]
  },
  {
    name: "Yoga Nidra (Yogic Sleep)",
    sanskrit: "योग निद्रा",
    type: "Relaxation",
    duration: "20-45 minutes",
    description: "Deep relaxation technique that provides rest equivalent to several hours of sleep.",
    benefits: ["Deep relaxation", "Stress relief", "Improved sleep", "Mental clarity"],
    technique: "Lie in Savasana. Follow guided relaxation through body parts, breath awareness, and visualization.",
    contraindications: ["None for healthy individuals"],
    sources: ["Yoga Nidra - Swami Satyananda", "Ayurvedic Healing - Frawley"]
  }
];

export default function MentalWellnessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDosha, setSelectedDosha] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredConditions = mentalHealthConditions.filter(condition => {
    const matchesSearch = condition.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         condition.sanskrit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDosha = selectedDosha === "All" || condition.dosha.includes(selectedDosha);
    return matchesSearch && matchesDosha;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loading text="Loading mental wellness content..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-4">
            Mental <span className="text-gradient">Wellness</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover ancient Ayurvedic wisdom for modern mental health. Learn to balance your mind 
            using time-tested principles that address the root causes of mental and emotional imbalance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conditions or practices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:border-gold focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="trigunas" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4">
            <TabsTrigger value="trigunas" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Trigunas</span>
            </TabsTrigger>
            <TabsTrigger value="conditions" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Conditions</span>
            </TabsTrigger>
            <TabsTrigger value="practices" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Practices</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Resources</span>
            </TabsTrigger>
          </TabsList>

          {/* Trigunas Section */}
          <TabsContent value="trigunas" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  The Three Mental Qualities - Trigunas
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  According to Ayurveda, our mental state is influenced by three fundamental qualities. 
                  Understanding these helps us recognize and balance our mental patterns.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {mentalStates.map((state, index) => (
                  <Card key={state.name} className="card-hover h-full transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="text-center pb-4">
                      <div className={`mx-auto w-16 h-16 rounded-2xl bg-${state.color}/20 flex items-center justify-center mb-4`}>
                        <state.icon className={`h-8 w-8 text-${state.color}`} />
                      </div>
                      <CardTitle className="text-xl font-heading">{state.name}</CardTitle>
                      <CardDescription className="font-medium text-muted-foreground">
                        {state.quality}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {state.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-foreground">Characteristics:</h4>
                        <ul className="space-y-1">
                          {state.characteristics.map((char, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-center">
                              <CheckCircle className={`h-3 w-3 text-${state.color} mr-2 flex-shrink-0`} />
                              {char}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {state.sources.slice(0, 2).map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Mental Health Conditions */}
          <TabsContent value="conditions" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Mental Health Conditions in Ayurveda
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Traditional Ayurvedic understanding of mental health conditions with Sanskrit names 
                  and dosha-specific treatments from classical texts.
                </p>
              </div>
              
              <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-6"}>
                {filteredConditions.map((condition) => (
                  <Card key={condition.name} className="card-hover transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-heading">{condition.name}</CardTitle>
                          <CardDescription className="text-sm italic">
                            {condition.sanskrit}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {condition.dosha}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Symptoms:</h4>
                        <div className="flex flex-wrap gap-1">
                          {condition.symptoms.slice(0, 5).map((symptom) => (
                            <Badge key={symptom} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                          {condition.symptoms.length > 5 && (
                            <Badge variant="outline" className="text-xs">
                              +{condition.symptoms.length - 5} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Treatments:</h4>
                        <ul className="space-y-1">
                          {condition.treatments.slice(0, 3).map((treatment, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start">
                              <CheckCircle className="h-3 w-3 text-sage mr-2 mt-0.5 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {condition.sources.slice(0, 2).map((source, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Therapeutic Practices */}
          <TabsContent value="practices" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Therapeutic Practices
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Time-tested practices for mental wellness and emotional balance
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {therapeuticPractices.map((practice, index) => (
                  <Card key={practice.name} className="card-hover transition-all duration-300 hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg font-heading">{practice.name}</CardTitle>
                          <CardDescription className="text-sm italic">
                            {practice.sanskrit}
                          </CardDescription>
                        </div>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                          {practice.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{practice.duration}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {practice.description}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Benefits:</h4>
                        <div className="flex flex-wrap gap-1">
                          {practice.benefits.map((benefit) => (
                            <Badge key={benefit} variant="secondary" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-sm text-foreground mb-2">Technique:</h4>
                        <p className="text-sm text-muted-foreground">{practice.technique}</p>
                      </div>
                      
                      {practice.contraindications.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-sm text-foreground mb-2">Contraindications:</h4>
                          <ul className="space-y-1">
                            {practice.contraindications.map((contraindication, idx) => (
                              <li key={idx} className="text-sm text-muted-foreground flex items-start">
                                <AlertTriangle className="h-3 w-3 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                                {contraindication}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Resources */}
          <TabsContent value="resources" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Mental Wellness Resources
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Additional resources and practices for mental wellness
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="card-hover transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-sage" />
                      Daily Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Morning meditation (10-20 minutes)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Pranayama breathing exercises
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Abhyanga (self-massage)
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Evening relaxation routine
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-hover transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-pitta" />
                      Lifestyle Tips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Regular sleep schedule
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Balanced diet for your dosha
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Regular exercise and movement
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Time in nature
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="card-hover transition-all duration-300 hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gold" />
                      Support & Community
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Ayurvedic practitioner consultation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Yoga and meditation classes
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Wellness community groups
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-sage" />
                        Mental health support resources
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 