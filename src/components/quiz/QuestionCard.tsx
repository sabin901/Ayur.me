import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Quote, 
  BookOpen, 
  Info, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Target,
  Brain,
  Heart,
  Activity,
  User,
  Eye,
  Camera,
  Wind,
  Flame,
  Mountain,
  Leaf,
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Scale,
  Clock,
  Zap,
  Star,
  Award,
  TrendingUp,
  Activity as ActivityIcon
} from "lucide-react";

export interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    text: string;
    score: number;
    source: string;
    icon?: string;
    description?: string;
    doshaTraits?: string[];
  }[];
  category?: string;
  classicalReference?: {
    sanskrit: string;
    iast: string;
    translation: string;
    source: string;
  };
}

interface QuestionCardProps {
  question: Question;
  onSelect: (option: any) => void;
  currentStep?: number;
  totalSteps?: number;
}

const doshaIcons = {
  vata: Wind,
  pitta: Flame,
  kapha: Mountain
};

const categoryIcons = {
  physical: User,
  physiological: Heart,
  mental: Brain,
  lifestyle: Activity
};

const doshaColors = {
  vata: {
    text: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-200",
    hover: "hover:bg-orange-100"
  },
  pitta: {
    text: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    hover: "hover:bg-red-100"
  },
  kapha: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    hover: "hover:bg-blue-100"
  }
};

export default function QuestionCard({ question, onSelect, currentStep = 1, totalSteps = 6 }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showClassicalInfo, setShowClassicalInfo] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option.value);
    
    // Add a small delay for better UX
    setTimeout(() => {
      onSelect(option);
    }, 300);
  };

  const getDoshaIcon = (dosha: string) => {
    const Icon = doshaIcons[dosha as keyof typeof doshaIcons];
    return Icon ? <Icon className="h-4 w-4" /> : null;
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">{currentStep}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Question {currentStep} of {totalSteps}
            </span>
          </div>
          <Badge variant="outline" className="text-xs">
            {Math.round(progress)}% Complete
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="shadow-xl border-2 border-sage/20">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-sage to-green-500 rounded-full flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sage to-green-600 bg-clip-text text-transparent">
            {question.question}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Select the option that best describes your lifelong, fundamental tendencies
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Classical Reference Toggle */}
          {question.classicalReference && (
            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClassicalInfo(!showClassicalInfo)}
                className="text-sage hover:text-sage/80"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                {showClassicalInfo ? "Hide" : "Show"} Classical Reference
              </Button>
            </div>
          )}

          {/* Classical Reference Display */}
          <AnimatePresence>
            {showClassicalInfo && question.classicalReference && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Quote className="h-5 w-5 text-amber-600 mt-1" />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-amber-800">Classical Reference</span>
                          <Badge variant="outline" className="text-xs">Sanskrit</Badge>
                        </div>
                        <p className="text-sm font-mono text-amber-900">
                          {question.classicalReference.sanskrit}
                        </p>
                        <p className="text-xs text-amber-700">
                          {question.classicalReference.iast}
                        </p>
                        <p className="text-sm italic text-amber-800">
                          "{question.classicalReference.translation}"
                        </p>
                        <p className="text-xs font-medium text-amber-600">
                          {question.classicalReference.source}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedOption === option.value;
              const doshaColor = doshaColors[option.value as keyof typeof doshaColors];
              
              return (
                <motion.div
                  key={option.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg ${
                      isSelected 
                        ? 'border-sage bg-sage/5 shadow-lg scale-[1.02]' 
                        : 'border-gray-200 hover:border-sage/50'
                    }`}
                    onClick={() => handleOptionSelect(option)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Selection Indicator */}
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                          isSelected 
                            ? 'border-sage bg-sage' 
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <CheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>

                        {/* Option Content */}
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-semibold">
                                {option.text}
                              </span>
                              {getDoshaIcon(option.value) && (
                                <div className={`p-1 rounded-full ${doshaColor?.bg}`}>
                                  {getDoshaIcon(option.value)}
                                </div>
                              )}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {option.score} pts
                            </Badge>
                          </div>

                          {/* Description */}
                          {option.description && (
                            <p className="text-sm text-muted-foreground">
                              {option.description}
                            </p>
                          )}

                          {/* Dosha Traits */}
                          {option.doshaTraits && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Star className="h-3 w-3 text-sage" />
                                <span className="text-xs font-semibold">Associated Traits:</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {option.doshaTraits.map((trait, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {trait}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Source */}
                          <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                            <Info className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Source: {option.source}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Help Text */}
          <div className="text-center pt-4">
            <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <Info className="h-4 w-4" />
              <span>Choose based on your natural, lifelong tendencies, not temporary states</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Option Animation */}
      <AnimatePresence>
        {selectedOption && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 text-sage font-semibold">
              <CheckCircle className="h-5 w-5" />
              <span>Processing your selection...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
} 