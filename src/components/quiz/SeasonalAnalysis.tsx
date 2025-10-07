import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Leaf, 
  Sun, 
  Moon, 
  Thermometer, 
  Calendar,
  BookOpen,
  Quote,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

interface SeasonalAnalysisProps {
  primaryDosha: string;
  currentSeason: string;
  seasonalData: any;
}

const seasonIcons = {
  spring: Leaf,
  summer: Sun,
  autumn: Moon,
  winter: Thermometer
};

const seasonColors = {
  spring: "text-green-600 bg-green-50 border-green-200",
  summer: "text-orange-600 bg-orange-50 border-orange-200",
  autumn: "text-amber-600 bg-amber-50 border-amber-200",
  winter: "text-blue-600 bg-blue-50 border-blue-200"
};

export default function SeasonalAnalysis({ primaryDosha, currentSeason, seasonalData }: SeasonalAnalysisProps) {
  const [showClassicalReference, setShowClassicalReference] = useState(false);
  
  if (!seasonalData) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-sage" />
            Seasonal Guidance
          </CardTitle>
          <CardDescription>
            Personalized seasonal recommendations for your {primaryDosha} constitution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Info className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>Seasonal analysis not available for current configuration.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const SeasonIcon = seasonIcons[currentSeason as keyof typeof seasonIcons];
  const seasonColor = seasonColors[currentSeason as keyof typeof seasonColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className={`shadow-lg border-2 ${seasonColor.split(' ')[2]}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${seasonColor.split(' ')[1]} flex items-center justify-center`}>
                <SeasonIcon className={`h-6 w-6 ${seasonColor.split(' ')[0]}`} />
              </div>
              <div>
                <CardTitle className="text-xl capitalize">
                  {currentSeason} Season Guidance
                </CardTitle>
                <CardDescription>
                  {primaryDosha.charAt(0).toUpperCase() + primaryDosha.slice(1)} constitution
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline" className={seasonColor.split(' ')[0]}>
              Current Season
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Description */}
          <div className="bg-muted/30 rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              {seasonalData.description}
            </p>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <h4 className="font-semibold flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Seasonal Recommendations
            </h4>
            <div className="grid gap-3">
              {seasonalData.recommendations.map((rec: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-background rounded-lg border"
                >
                  <div className="w-2 h-2 rounded-full bg-sage mt-2 flex-shrink-0" />
                  <span className="text-sm">{rec}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Classical Reference */}
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-sage" />
                Classical Reference
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowClassicalReference(!showClassicalReference)}
                className="text-sage hover:text-sage/80"
              >
                {showClassicalReference ? "Hide" : "Show"} Sanskrit
              </Button>
            </div>
            
            <AnimatePresence>
              {showClassicalReference && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-muted/30 rounded-lg p-4 space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Quote className="h-4 w-4 text-sage" />
                      <span className="text-sm font-medium">Sanskrit Verse:</span>
                    </div>
                    <p className="text-lg font-sanskrit leading-relaxed">
                      {seasonalData.verse}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-sm font-medium">Source:</span>
                    <p className="text-sm text-muted-foreground">
                      {seasonalData.source}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Seasonal Tips */}
          <div className="bg-gradient-to-r from-sage/10 to-green-50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-sage" />
              Seasonal Wisdom
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              According to classical Ayurvedic texts, each season affects the doshas differently. 
              This guidance helps you maintain balance throughout the year by adapting your diet, 
              lifestyle, and practices to the seasonal changes.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 