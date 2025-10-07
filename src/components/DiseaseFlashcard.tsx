import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { 
  X, Book, Leaf, Heart, Brain, Eye, Bone, Droplets, Zap, AlertTriangle, 
  Stethoscope, Activity, Shield, Pill, Clock, Star, CheckCircle, XCircle, 
  Info, ChevronRight, ChevronDown, Flame, Wind, Mountain, Sun, Moon, 
  Thermometer, Scale, User, Target, Sparkles, ArrowRight, ArrowLeft, 
  RotateCcw, ExternalLink, FileText, Quote, Award, TrendingUp, Home, 
  Calendar, MapPin, Users, Lightbulb, Sparkles as SparklesIcon,
  Heart as HeartIcon, Brain as BrainIcon, Activity as ActivityIcon,
  Clock as ClockIcon, Calendar as CalendarIcon, Thermometer as ThermometerIcon,
  Droplets as DropletsIcon, Scale as ScaleIcon, Zap as ZapIcon
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DiseaseFlashcardProps {
  disease: {
    name: string;
    sanskrit?: string;
    modernEquivalent?: string;
    dosha?: string | string[];
    category?: string;
    severity?: string;
    pathogenesis?: string;
    symptoms?: string[];
    treatments?: Array<{
      type?: string;
      description?: string;
      ingredients?: string[];
      dosage?: string;
      duration?: string;
      procedure?: string;
      note?: string;
    }>;
    diet?: {
      include?: string[];
      avoid?: string[];
    };
    lifestyle?: string[];
    source?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

// Custom hook to track tab direction
const useTabDirection = () => {
  const tabOrder = ["overview", "symptoms", "treatment", "lifestyle", "prevention"];
  const [direction, setDirection] = useState(0);
  const [prevTab, setPrevTab] = useState("");

  const setTabWithDirection = (newTab: string) => {
    const newIndex = tabOrder.indexOf(newTab);
    const prevIndex = tabOrder.indexOf(prevTab);
    setDirection(newIndex > prevIndex ? 1 : -1);
    setPrevTab(newTab);
    return newTab;
  };

  return { direction, setTabWithDirection };
};

// Enhanced color schemes with better contrast and accessibility
const doshaColors = {
  Vata: { 
    bg: "bg-blue-50", 
    text: "text-blue-800", 
    border: "border-blue-200", 
    icon: "bg-blue-100",
    gradient: "from-blue-50 to-indigo-50",
    badge: "bg-blue-100 text-blue-800 border-blue-300"
  },
  Pitta: { 
    bg: "bg-red-50", 
    text: "text-red-800", 
    border: "border-red-200", 
    icon: "bg-red-100",
    gradient: "from-red-50 to-pink-50",
    badge: "bg-red-100 text-red-800 border-red-300"
  },
  Kapha: { 
    bg: "bg-green-50", 
    text: "text-green-800", 
    border: "border-green-200", 
    icon: "bg-green-100",
    gradient: "from-green-50 to-emerald-50",
    badge: "bg-green-100 text-green-800 border-green-300"
  },
};

const severityColors = {
  Mild: "bg-green-100 text-green-800 border-green-300 shadow-sm",
  "Mild to Moderate": "bg-yellow-100 text-yellow-800 border-yellow-300 shadow-sm",
  Moderate: "bg-orange-100 text-orange-800 border-orange-300 shadow-sm",
  "Moderate to Severe": "bg-red-100 text-red-800 border-red-300 shadow-sm",
  Severe: "bg-red-200 text-red-900 border-red-400 shadow-sm",
};

const categoryIcons = {
  Respiratory: Eye,
  Cardiovascular: Heart,
  Digestive: Activity,
  Neurological: Brain,
  Musculoskeletal: Bone,
  Dermatological: Shield,
  Mental: Brain,
  Metabolic: Scale,
  Urological: Droplets,
  Ophthalmological: Eye,
  Otological: Activity,
  Proctological: Activity,
  Dental: Activity,
  Sleep: Clock,
  Lifestyle: User,
  Nutritional: Leaf,
};

const getDoshaIcon = (dosha: string) => {
  switch (dosha.toLowerCase()) {
    case 'vata': return Wind;
    case 'pitta': return Flame;
    case 'kapha': return Mountain;
    default: return Activity;
  }
};

const getDoshaDescription = (dosha: string) => {
  switch (dosha.toLowerCase()) {
    case 'vata': return "Air & Space - Movement, Communication, Nervous System";
    case 'pitta': return "Fire & Water - Metabolism, Digestion, Transformation";
    case 'kapha': return "Earth & Water - Structure, Stability, Growth";
    default: return "";
  }
};

// Directional tab variants for smooth transitions
const tabVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.95
  })
};

// Ultra-smooth, butter-like animations
const springConfig = {
  type: "spring" as const,
  damping: 35,
  stiffness: 150,
  mass: 1.5
};

const staggerConfig = {
  delayChildren: 0.03,
  staggerChildren: 0.02
};

export default function DiseaseFlashcard({ disease, isOpen, onClose }: DiseaseFlashcardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const { direction, setTabWithDirection } = useTabDirection();

  // Enhanced motion values for smooth interactions
  const scale = useMotionValue(0.9);
  const opacity = useMotionValue(0);
  const y = useMotionValue(20);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      scale.set(1);
      opacity.set(1);
      y.set(0);
    } else {
      setIsVisible(false);
    }
  }, [isOpen, scale, opacity, y]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expandedSections.includes(section);

  if (!disease) return null;

  const CategoryIcon = categoryIcons[disease.category as keyof typeof categoryIcons] || Activity;
  const primaryDosha = Array.isArray(disease.dosha) ? disease.dosha[0] : disease.dosha;
  const DoshaIcon = getDoshaIcon(primaryDosha);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="disease-title"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 5 }}
            transition={{ ...springConfig, duration: 0.6 }}
            className="w-full max-w-7xl max-h-[95vh] bg-white rounded-2xl shadow-lg overflow-hidden border border-green-200"
            onClick={(e) => e.stopPropagation()}
            style={{ 
              boxShadow: "0 15px 35px -10px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(34, 197, 94, 0.03)" 
            }}
          >
            {/* Enhanced Header with better typography and spacing */}
            <motion.div 
              className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white p-8"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <motion.div 
                    className="flex items-center gap-4 mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, ...springConfig }}
                  >
                    <motion.div 
                      className="p-3 bg-white/20 rounded-xl backdrop-blur-sm"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={springConfig}
                    >
                      <CategoryIcon className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h1 id="disease-title" className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
                        {disease.name}
                      </h1>
                      <p className="text-green-100 text-xl font-medium">
                        {disease.sanskrit && (
                          <span className="font-semibold text-white">{disease.sanskrit}</span>
                        )}
                        {disease.modernEquivalent && (
                          <span className="ml-3 text-green-200 font-normal">
                            ({disease.modernEquivalent})
                          </span>
                        )}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex flex-wrap gap-3 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, ...staggerConfig }}
                  >
                    {Array.isArray(disease.dosha) ? disease.dosha.map((dosha: string, index: number) => (
                      <motion.div
                        key={dosha}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, ...springConfig }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                          <DoshaIcon className="w-4 h-4 mr-2" />
                          {dosha} Dosha
                        </Badge>
                      </motion.div>
                    )) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, ...springConfig }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                          <DoshaIcon className="w-4 h-4 mr-2" />
                          {disease.dosha} Dosha
                        </Badge>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, ...springConfig }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                        <Activity className="w-4 h-4 mr-2" />
                        {disease.category || "General"}
                      </Badge>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, ...springConfig }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium">
                        <Thermometer className="w-4 h-4 mr-2" />
                        {disease.severity || "Moderate"}
                      </Badge>
                    </motion.div>
                  </motion.div>
                </div>
                
                <motion.button
                  onClick={onClose}
                  className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, ...springConfig }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
            </motion.div>

            {/* Enhanced Content Area with Smooth Tab Transitions */}
            <ScrollArea className="h-[calc(95vh-200px)]">
              <div className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ...springConfig }}
                >
                  <Tabs value={activeTab} onValueChange={tab => setActiveTab(setTabWithDirection(tab))} className="w-full">
                    <TabsList className="grid w-full grid-cols-5 bg-gray-100 p-1 rounded-xl">
                      <TabsTrigger 
                        value="overview" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-500 ease-out relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeTab === "overview" ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                        <Info className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Overview</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="symptoms" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-500 ease-out relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeTab === "symptoms" ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                        <AlertTriangle className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Symptoms</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="treatment" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-500 ease-out relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeTab === "treatment" ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                        <Leaf className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Treatment</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="lifestyle" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-500 ease-out relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeTab === "lifestyle" ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                        <Activity className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Lifestyle</span>
                      </TabsTrigger>
                      <TabsTrigger 
                        value="prevention" 
                        className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all duration-500 ease-out relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: activeTab === "prevention" ? 1 : 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ originX: 0 }}
                        />
                        <Shield className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">Prevention</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Overview Tab with Directional Transitions */}
                    <TabsContent value="overview" className="space-y-6 mt-8">
                      <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === "overview" && (
                          <motion.div
                            key="overview"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 150,
                              mass: 0.5
                            }}
                            className="space-y-6"
                          >
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-blue-800 text-2xl">
                                  <Sparkles className="w-6 h-6" />
                                  Disease Overview
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">English Name:</h4>
                                    <p className="text-blue-800 text-lg font-medium">{disease.modernEquivalent || disease.name}</p>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">Sanskrit Name:</h4>
                                    <p className="text-blue-800 text-lg font-medium">{disease.sanskrit || "Not specified"}</p>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-blue-700 mb-4 text-lg">Dosha Imbalance:</h4>
                                  <div className="space-y-3">
                                    {Array.isArray(disease.dosha) ? disease.dosha.map((dosha: string, index: number) => (
                                      <motion.div 
                                        key={dosha} 
                                        className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-blue-200"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, ...springConfig }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                      >
                                        <div className={`p-3 rounded-xl ${doshaColors[dosha as keyof typeof doshaColors]?.icon}`}>
                                          {React.createElement(getDoshaIcon(dosha), { className: "w-6 h-6" })}
                                        </div>
                                        <div>
                                          <p className="font-bold text-blue-800 text-lg">{dosha}</p>
                                          <p className="text-blue-600">{getDoshaDescription(dosha)}</p>
                                        </div>
                                      </motion.div>
                                    )) : (
                                      <motion.div 
                                        className="flex items-center gap-4 p-4 bg-white/60 rounded-xl border border-blue-200"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1, ...springConfig }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                      >
                                        <div className={`p-3 rounded-xl ${doshaColors[disease.dosha as keyof typeof doshaColors]?.icon}`}>
                                          <DoshaIcon className="w-6 h-6" />
                                        </div>
                                        <div>
                                          <p className="font-bold text-blue-800 text-lg">{disease.dosha}</p>
                                          <p className="text-blue-600">{getDoshaDescription(disease.dosha)}</p>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                </div>

                                {disease.pathogenesis && (
                                  <div>
                                    <h4 className="font-semibold text-blue-700 mb-3 text-lg">Pathogenesis (Nidana):</h4>
                                    <p className="text-blue-800 bg-white/60 p-4 rounded-xl border border-blue-200 text-lg leading-relaxed">
                                      {disease.pathogenesis}
                                    </p>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>

                    {/* Symptoms Tab with Directional Transitions */}
                    <TabsContent value="symptoms" className="space-y-6 mt-8">
                      <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === "symptoms" && (
                          <motion.div
                            key="symptoms"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 150,
                              mass: 0.5
                            }}
                            className="space-y-6"
                          >
                            <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-lg">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-red-800 text-2xl">
                                  <AlertTriangle className="w-6 h-6" />
                                  Symptoms (Lakshana)
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {(disease.symptoms || []).map((symptom: string, index: number) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, x: -20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: index * 0.1, ...springConfig }}
                                      whileHover={{ scale: 1.02, x: 5 }}
                                      className="flex items-center gap-3 p-4 bg-white/60 rounded-xl border border-red-200"
                                    >
                                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                      <span className="text-red-800 font-medium text-lg">{symptom}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>

                    {/* Treatment Tab with Directional Transitions */}
                    <TabsContent value="treatment" className="space-y-6 mt-8">
                      <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === "treatment" && (
                          <motion.div
                            key="treatment"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 150,
                              mass: 0.5
                            }}
                            className="space-y-6"
                          >
                            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-green-800 text-2xl">
                                  <Leaf className="w-6 h-6" />
                                  Classical Ayurvedic Treatments (Chikitsa)
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                {(disease.treatments || []).map((treatment, index: number) => (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, ...springConfig }}
                                    whileHover={{ scale: 1.01 }}
                                  >
                                    <Card className="bg-white/70 border-green-300 shadow-md">
                                      <CardHeader>
                                        <CardTitle className="text-green-800 text-xl flex items-center gap-3">
                                          <Star className="w-6 h-6" />
                                          {treatment.type || "Herbal Treatment"}
                                          <Badge variant="outline" className="ml-auto bg-green-100 text-green-800 border-green-300">
                                            {treatment.type || "Herbal"}
                                          </Badge>
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        {treatment.description && (
                                          <div>
                                            <h5 className="font-semibold text-green-700 mb-2">Treatment Description:</h5>
                                            <p className="text-green-800 bg-green-50 p-4 rounded-lg text-lg leading-relaxed">{treatment.description}</p>
                                          </div>
                                        )}

                                        {treatment.ingredients && treatment.ingredients.length > 0 && (
                                          <div>
                                            <h5 className="font-semibold text-green-700 mb-3">Ingredients (Dravya):</h5>
                                            <div className="flex flex-wrap gap-2">
                                              {treatment.ingredients.map((ingredient: string, i: number) => (
                                                <Badge key={i} variant="secondary" className="bg-green-100 text-green-800 border-green-300 px-3 py-1">
                                                  {ingredient}
                                                </Badge>
                                              ))}
                                            </div>
                                          </div>
                                        )}

                                        {treatment.dosage && (
                                          <div>
                                            <h5 className="font-semibold text-green-700 mb-2">Dosage (Matra):</h5>
                                            <p className="text-green-800 bg-green-50 p-4 rounded-lg">{treatment.dosage}</p>
                                          </div>
                                        )}

                                        {treatment.duration && (
                                          <div>
                                            <h5 className="font-semibold text-green-700 mb-2">Duration (Kala):</h5>
                                            <p className="text-green-800 bg-green-50 p-4 rounded-lg">{treatment.duration}</p>
                                          </div>
                                        )}

                                        {treatment.procedure && (
                                          <div>
                                            <h5 className="font-semibold text-green-700 mb-2">Procedure (Vidhi):</h5>
                                            <p className="text-green-800 bg-green-50 p-4 rounded-lg">{treatment.procedure}</p>
                                          </div>
                                        )}

                                        {treatment.note && (
                                          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                            <h5 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                              <AlertTriangle className="w-4 h-4" />
                                              Important Note:
                                            </h5>
                                            <p className="text-yellow-700">{treatment.note}</p>
                                          </div>
                                        )}
                                      </CardContent>
                                    </Card>
                                  </motion.div>
                                ))}
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>

                    {/* Lifestyle Tab with Directional Transitions */}
                    <TabsContent value="lifestyle" className="space-y-6 mt-8">
                      <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === "lifestyle" && (
                          <motion.div
                            key="lifestyle"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 150,
                              mass: 0.5
                            }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                              {/* Diet Section */}
                              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-3 text-green-800 text-2xl">
                                    <CheckCircle className="w-6 h-6" />
                                    Pathya (Beneficial Foods)
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {(disease.diet?.include || []).map((food: string, index: number) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, ...springConfig }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-green-200"
                                      >
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                        <span className="text-green-800 font-medium text-lg">{food}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 shadow-lg">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-3 text-red-800 text-2xl">
                                    <XCircle className="w-6 h-6" />
                                    Apathya (Foods to Avoid)
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-3">
                                    {(disease.diet?.avoid || []).map((food: string, index: number) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1, ...springConfig }}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-red-200"
                                      >
                                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                                        <span className="text-red-800 font-medium text-lg">{food}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>

                            {/* Lifestyle Recommendations */}
                            {disease.lifestyle && disease.lifestyle.length > 0 && (
                              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
                                <CardHeader>
                                  <CardTitle className="flex items-center gap-3 text-blue-800 text-2xl">
                                    <Activity className="w-6 h-6" />
                                    Lifestyle Recommendations (Vihara)
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {disease.lifestyle.map((recommendation: string, index: number) => (
                                      <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, ...springConfig }}
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        className="flex items-center gap-3 p-4 bg-white/70 rounded-xl border border-blue-200"
                                      >
                                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                                        <span className="text-blue-800 font-medium text-lg">{recommendation}</span>
                                      </motion.div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>

                    {/* Prevention Tab with Directional Transitions */}
                    <TabsContent value="prevention" className="space-y-6 mt-8">
                      <AnimatePresence mode="wait" custom={direction}>
                        {activeTab === "prevention" && (
                          <motion.div
                            key="prevention"
                            custom={direction}
                            variants={tabVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                              type: "spring",
                              damping: 25,
                              stiffness: 150,
                              mass: 0.5
                            }}
                            className="space-y-6"
                          >
                            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
                              <CardHeader>
                                <CardTitle className="flex items-center gap-3 text-purple-800 text-2xl">
                                  <Shield className="w-6 h-6" />
                                  Prevention Guidelines (Swasthavritta)
                                </CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-white/70 p-6 rounded-xl border border-purple-200">
                                    <h4 className="font-semibold text-purple-700 mb-4 text-xl flex items-center gap-3">
                                      <Clock className="w-5 h-5" />
                                      Daily Routine (Dinacharya)
                                    </h4>
                                    <ul className="text-purple-800 space-y-3 text-lg">
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Wake up before sunrise (Brahma Muhurta)
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Practice yoga and pranayama
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Eat meals at regular times
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Sleep by 10 PM
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Oil massage (Abhyanga)
                                      </li>
                                    </ul>
                                  </div>

                                  <div className="bg-white/70 p-6 rounded-xl border border-purple-200">
                                    <h4 className="font-semibold text-purple-700 mb-4 text-xl flex items-center gap-3">
                                      <Calendar className="w-5 h-5" />
                                      Seasonal Care (Ritucharya)
                                    </h4>
                                    <ul className="text-purple-800 space-y-3 text-lg">
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Adjust diet per season
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Modify exercise intensity
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Use appropriate clothing
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Follow seasonal detox
                                      </li>
                                      <li className="flex items-center gap-3">
                                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                        Adapt to weather changes
                                      </li>
                                    </ul>
                                  </div>
                                </div>

                                <div className="bg-amber-50 p-6 rounded-xl border border-amber-200">
                                  <h4 className="font-semibold text-amber-800 mb-3 text-xl flex items-center gap-3">
                                    <AlertTriangle className="w-5 h-5" />
                                    Important Disclaimer
                                  </h4>
                                  <p className="text-amber-700 text-lg leading-relaxed">
                                    This information is compiled from classical Ayurvedic texts including Charaka Samhita, 
                                    Sushruta Samhita, Ashtanga Hridaya, Madhava Nidanam, and other authoritative sources. 
                                    It is for educational purposes only. Always consult with a qualified Ayurvedic practitioner 
                                    (Vaidya) or healthcare provider before starting any treatment, especially for serious conditions. 
                                    Some formulations may contain heavy metals or require special preparation methods.
                                  </p>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </div>
            </ScrollArea>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 