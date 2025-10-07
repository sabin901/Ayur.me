import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Play, Pause, Info, Heart, Zap, Leaf } from 'lucide-react';

interface YogaPose {
  id: string;
  name: string;
  sanskrit: string;
  category: string;
  guna: 'Sattvic' | 'Rajasic' | 'Tamasic';
  dosha: string;
  duration: string;
  difficulty: string;
  benefits: string[];
  description: string;
  image: string;
  stepByStep: {
    step: number;
    instruction: string;
    image: string;
  }[];
  therapeuticUses: string[];
  doshaSpecific: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  contraindications: string[];
  sources: string[];
  gunaColor: string;
  doshaColor: string;
}

interface YogaPoseCardProps {
  pose: YogaPose;
}

const gunaColors = {
  Sattvic: 'from-sage/20 to-gold/20',
  Rajasic: 'from-gold/20 to-sage/20',
  Tamasic: 'from-sage/30 to-gold/30'
};

const doshaColors = {
  Vata: 'bg-sage/20 text-sage-800 border-sage-300',
  Pitta: 'bg-gold/20 text-gold-800 border-gold-300',
  Kapha: 'bg-sage/30 text-sage-800 border-sage-400',
  'All Doshas': 'bg-earth/20 text-earth-800 border-earth-300'
};

export default function YogaPoseCard({ pose }: YogaPoseCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % pose.stepByStep.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + pose.stepByStep.length) % pose.stepByStep.length);
  };

  const startAutoPlay = () => {
    setIsPlaying(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev === pose.stepByStep.length - 1) {
          setIsPlaying(false);
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  };

  const stopAutoPlay = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
          <div className="relative">
            {/* Pose Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={pose.image}
                alt={pose.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${gunaColors[pose.guna]} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
            </div>

            {/* Guna Badge */}
            <div className="absolute top-3 left-3">
              <Badge className={`bg-white/90 backdrop-blur-sm text-sm font-medium border-0 shadow-md text-sage-700`}>
                {pose.guna === 'Sattvic' && <Heart className="w-3 h-3 mr-1 text-sage-600" />}
                {pose.guna === 'Rajasic' && <Zap className="w-3 h-3 mr-1 text-gold-600" />}
                {pose.guna === 'Tamasic' && <Leaf className="w-3 h-3 mr-1 text-sage-600" />}
                {pose.guna}
              </Badge>
            </div>

            {/* Difficulty Badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-sm font-medium border-0 shadow-md">
                {pose.difficulty}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4">
            {/* Pose Name */}
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {pose.name}
            </h3>
            
            {/* Sanskrit Name */}
            <p className="text-sm text-gray-600 mb-3 font-medium">
              {pose.sanskrit}
            </p>

            {/* Dosha Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {pose.dosha.split(', ').map((dosha) => (
                <Badge
                  key={dosha}
                  className={`text-xs font-medium ${doshaColors[dosha as keyof typeof doshaColors]}`}
                >
                  {dosha}
                </Badge>
              ))}
            </div>

            {/* Benefits Preview */}
            <div className="space-y-1">
              {pose.benefits.slice(0, 2).map((benefit, index) => (
                <p key={index} className="text-xs text-gray-600 flex items-center">
                  <span className="w-1 h-1 bg-sage-500 rounded-full mr-2"></span>
                  {benefit}
                </p>
              ))}
              {pose.benefits.length > 2 && (
                <p className="text-xs text-sage-600 font-medium">
                  +{pose.benefits.length - 2} more benefits
                </p>
              )}
            </div>

            {/* Duration */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Duration: <span className="font-medium text-gray-700">{pose.duration}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {pose.name}
              <span className="block text-lg font-normal text-gray-600 mt-1">
                {pose.sanskrit}
              </span>
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="steps" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="steps">Step-by-Step</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="dosha">Dosha Guide</TabsTrigger>
              <TabsTrigger value="info">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="steps" className="space-y-6">
              {/* Step-by-Step Instructions */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Step-by-Step Instructions
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={isPlaying ? stopAutoPlay : startAutoPlay}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isPlaying ? 'Stop' : 'Auto Play'}
                    </Button>
                  </div>
                </div>

                {/* Current Step Display */}
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={pose.stepByStep[currentStep].image}
                      alt={`Step ${currentStep + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Navigation Arrows */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={prevStep}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={nextStep}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>

                  {/* Step Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-medium text-gray-700">
                        Step {currentStep + 1} of {pose.stepByStep.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step Instructions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Step {currentStep + 1}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {pose.stepByStep[currentStep].instruction}
                  </p>
                </div>

                {/* Step Dots */}
                <div className="flex justify-center gap-2">
                  {pose.stepByStep.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? 'bg-blue-600 scale-125'
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits</h3>
                  <ul className="space-y-3">
                    {pose.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Therapeutic Uses</h3>
                  <ul className="space-y-3">
                    {pose.therapeuticUses.map((use, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="dosha" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                  <h4 className="font-semibold text-violet-900 mb-3">Vata Dosha</h4>
                  <p className="text-violet-800 text-sm leading-relaxed">
                    {pose.doshaSpecific.vata}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h4 className="font-semibold text-orange-900 mb-3">Pitta Dosha</h4>
                  <p className="text-orange-800 text-sm leading-relaxed">
                    {pose.doshaSpecific.pitta}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-3">Kapha Dosha</h4>
                  <p className="text-green-800 text-sm leading-relaxed">
                    {pose.doshaSpecific.kapha}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="info" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{pose.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contraindications</h3>
                  <ul className="space-y-2">
                    {pose.contraindications.map((contraindication, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700 text-sm">{contraindication}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sources</h3>
                <div className="flex flex-wrap gap-2">
                  {pose.sources.map((source, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
} 