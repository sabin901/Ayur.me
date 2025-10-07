import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Zap, Leaf, Search, Filter, X } from 'lucide-react';
import YogaPoseCard from './YogaPoseCard';

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

interface YogaPoseGridProps {
  poses: YogaPose[];
}

const gunaFilters = [
  { value: 'all', label: 'All Gunas', icon: null },
  { value: 'Sattvic', label: 'Sattvic', icon: Heart, color: 'text-blue-600' },
  { value: 'Rajasic', label: 'Rajasic', icon: Zap, color: 'text-orange-600' },
  { value: 'Tamasic', label: 'Tamasic', icon: Leaf, color: 'text-green-600' }
];

const doshaFilters = [
  { value: 'all', label: 'All Doshas' },
  { value: 'Vata', label: 'Vata' },
  { value: 'Pitta', label: 'Pitta' },
  { value: 'Kapha', label: 'Kapha' },
  { value: 'All Doshas', label: 'All Doshas' }
];

const difficultyFilters = [
  { value: 'all', label: 'All Levels' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' }
];

export default function YogaPoseGrid({ poses }: YogaPoseGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuna, setSelectedGuna] = useState('all');
  const [selectedDosha, setSelectedDosha] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredPoses = useMemo(() => {
    return poses.filter((pose) => {
      const matchesSearch = pose.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pose.sanskrit.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           pose.benefits.some(benefit => 
                             benefit.toLowerCase().includes(searchQuery.toLowerCase())
                           );

      const matchesGuna = selectedGuna === 'all' || pose.guna === selectedGuna;
      const matchesDosha = selectedDosha === 'all' || pose.dosha.includes(selectedDosha);
      const matchesDifficulty = selectedDifficulty === 'all' || pose.difficulty === selectedDifficulty;

      return matchesSearch && matchesGuna && matchesDosha && matchesDifficulty;
    });
  }, [poses, searchQuery, selectedGuna, selectedDosha, selectedDifficulty]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGuna('all');
    setSelectedDosha('all');
    setSelectedDifficulty('all');
  };

  const hasActiveFilters = searchQuery || selectedGuna !== 'all' || selectedDosha !== 'all' || selectedDifficulty !== 'all';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Visual Yoga Pose Library
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore authentic yoga poses with step-by-step instructions, professional photos, and Ayurvedic guidance for your dosha type.
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Filter className="w-5 h-5" />
            Filter Poses
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search poses, Sanskrit names, or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Filter Options */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Guna Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Guna (Quality)</label>
              <Select value={selectedGuna} onValueChange={setSelectedGuna}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                  <SelectValue placeholder="Select Guna" />
                </SelectTrigger>
                <SelectContent>
                  {gunaFilters.map((guna) => (
                    <SelectItem key={guna.value} value={guna.value}>
                      <div className="flex items-center gap-2">
                        {guna.icon && <guna.icon className={`w-4 h-4 ${guna.color}`} />}
                        {guna.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dosha Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dosha (Constitution)</label>
              <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                  <SelectValue placeholder="Select Dosha" />
                </SelectTrigger>
                <SelectContent>
                  {doshaFilters.map((dosha) => (
                    <SelectItem key={dosha.value} value={dosha.value}>
                      {dosha.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="bg-white/80 backdrop-blur-sm border-gray-200">
                  <SelectValue placeholder="Select Level" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyFilters.map((difficulty) => (
                    <SelectItem key={difficulty.value} value={difficulty.value}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="w-full bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2">
              {searchQuery && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedGuna !== 'all' && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Guna: {selectedGuna}
                </Badge>
              )}
              {selectedDosha !== 'all' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Dosha: {selectedDosha}
                </Badge>
              )}
              {selectedDifficulty !== 'all' && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Level: {selectedDifficulty}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredPoses.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{poses.length}</span> poses
        </p>
      </div>

      {/* Pose Grid */}
      {filteredPoses.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPoses.map((pose, index) => (
            <motion.div
              key={pose.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <YogaPoseCard pose={pose} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card className="text-center py-12 bg-gray-50">
          <CardContent>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No poses found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search terms or filters to find the yoga poses you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 