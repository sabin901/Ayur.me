import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Loading } from '@/components/ui/loading';
import { Clock, Users, Leaf, Calendar, Utensils, Heart } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'All';
  season: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  benefits: string[];
  contraindications: string[];
  source: string;
  image?: string;
}

const recipes: Recipe[] = [
  {
    id: '1',
    name: 'Golden Milk (Turmeric Latte)',
    sanskritName: 'Haldi Doodh',
    description: 'Traditional Ayurvedic drink with anti-inflammatory properties',
    dosha: 'All',
    season: ['Winter', 'Spring'],
    prepTime: '5 minutes',
    cookTime: '10 minutes',
    servings: 2,
    ingredients: [
      '2 cups whole milk or almond milk',
      '1 tsp turmeric powder',
      '1/2 tsp ginger powder',
      '1/4 tsp black pepper',
      '1/4 tsp cinnamon',
      '1 tsp honey or jaggery',
      '1/2 tsp ghee (optional)'
    ],
    instructions: [
      'Heat milk in a saucepan over medium heat',
      'Add turmeric, ginger, black pepper, and cinnamon',
      'Stir continuously for 5-7 minutes',
      'Add honey and ghee, stir well',
      'Strain and serve warm'
    ],
    benefits: [
      'Reduces inflammation',
      'Boosts immunity',
      'Improves digestion',
      'Promotes restful sleep',
      'Supports liver function'
    ],
    contraindications: [
      'Avoid during pregnancy',
      'Not recommended for Pitta aggravation',
      'Consult doctor if on blood thinners'
    ],
    source: 'Charaka Samhita, Chikitsa Sthana'
  },
  {
    id: '2',
    name: 'Kitchari (Cleansing Rice and Lentils)',
    sanskritName: 'Khichdi',
    description: 'Balancing one-pot meal perfect for all doshas',
    dosha: 'All',
    season: ['All Seasons'],
    prepTime: '15 minutes',
    cookTime: '30 minutes',
    servings: 4,
    ingredients: [
      '1 cup basmati rice',
      '1/2 cup split yellow mung dal',
      '2 tbsp ghee',
      '1 tsp cumin seeds',
      '1 tsp mustard seeds',
      '1/2 tsp turmeric powder',
      '1 inch ginger, grated',
      '4 cups water',
      'Salt to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Wash rice and dal together, soak for 30 minutes',
      'Heat ghee in a pressure cooker',
      'Add cumin and mustard seeds, let them crackle',
      'Add ginger and turmeric, sauté briefly',
      'Add drained rice-dal mixture',
      'Add water and salt, pressure cook for 2 whistles',
      'Garnish with cilantro and serve hot'
    ],
    benefits: [
      'Easy to digest',
      'Balances all doshas',
      'Supports detoxification',
      'Provides complete protein',
      'Soothes digestive system'
    ],
    contraindications: [
      'Reduce salt for Pitta types',
      'Add more ghee for Vata types',
      'Use less rice for Kapha types'
    ],
    source: 'Ashtanga Hridayam, Sutra Sthana'
  },
  {
    id: '3',
    name: 'Vata-Pacifying Sweet Potato Soup',
    sanskritName: 'Shakarkandi Shorba',
    description: 'Warming soup perfect for Vata dosha',
    dosha: 'Vata',
    season: ['Autumn', 'Winter'],
    prepTime: '10 minutes',
    cookTime: '25 minutes',
    servings: 4,
    ingredients: [
      '2 large sweet potatoes, cubed',
      '1 onion, chopped',
      '2 tbsp ghee',
      '1 tsp cumin powder',
      '1/2 tsp ginger powder',
      '1/4 tsp asafoetida',
      '4 cups vegetable broth',
      '1/2 cup coconut milk',
      'Salt and pepper to taste',
      'Fresh cilantro for garnish'
    ],
    instructions: [
      'Heat ghee in a large pot',
      'Sauté onions until translucent',
      'Add sweet potatoes and spices',
      'Add broth and bring to boil',
      'Simmer until sweet potatoes are tender',
      'Blend until smooth',
      'Add coconut milk and season',
      'Garnish with cilantro'
    ],
    benefits: [
      'Grounds Vata energy',
      'Provides warmth and nourishment',
      'Supports bone health',
      'Improves circulation',
      'Calms nervous system'
    ],
    contraindications: [
      'May be too heavy for Kapha',
      'Reduce ghee for Pitta types'
    ],
    source: 'Charaka Samhita, Chikitsa Sthana'
  },
  {
    id: '4',
    name: 'Pitta-Cooling Cucumber Raita',
    sanskritName: 'Kakdi Raita',
    description: 'Cooling yogurt dish for Pitta balance',
    dosha: 'Pitta',
    season: ['Summer', 'Spring'],
    prepTime: '10 minutes',
    cookTime: '0 minutes',
    servings: 4,
    ingredients: [
      '2 cups plain yogurt',
      '1 cucumber, grated',
      '1/4 cup fresh mint, chopped',
      '1/4 cup fresh cilantro, chopped',
      '1/2 tsp cumin powder',
      '1/4 tsp black salt',
      '1/4 tsp sugar',
      '1 tbsp roasted cumin seeds'
    ],
    instructions: [
      'Whisk yogurt until smooth',
      'Add grated cucumber and mix well',
      'Add mint, cilantro, and spices',
      'Mix thoroughly',
      'Garnish with roasted cumin seeds',
      'Serve chilled'
    ],
    benefits: [
      'Cools Pitta dosha',
      'Improves digestion',
      'Reduces acidity',
      'Provides probiotics',
      'Hydrates the body'
    ],
    contraindications: [
      'Avoid if lactose intolerant',
      'May be too cooling for Vata',
      'Use fresh yogurt only'
    ],
    source: 'Sushruta Samhita, Chikitsa Sthana'
  },
  {
    id: '5',
    name: 'Kapha-Reducing Spiced Tea',
    sanskritName: 'Kaphahara Chai',
    description: 'Stimulating tea blend for Kapha balance',
    dosha: 'Kapha',
    season: ['Spring', 'Winter'],
    prepTime: '5 minutes',
    cookTime: '10 minutes',
    servings: 2,
    ingredients: [
      '2 cups water',
      '1/2 inch ginger, grated',
      '1/4 tsp black pepper',
      '1/4 tsp cinnamon',
      '1/4 tsp cardamom powder',
      '1/4 tsp turmeric',
      '1 tsp honey',
      '1 tbsp lemon juice'
    ],
    instructions: [
      'Bring water to boil',
      'Add ginger and spices',
      'Simmer for 5 minutes',
      'Strain the tea',
      'Add honey and lemon juice',
      'Serve hot'
    ],
    benefits: [
      'Stimulates metabolism',
      'Reduces Kapha accumulation',
      'Improves circulation',
      'Boosts energy',
      'Supports weight management'
    ],
    contraindications: [
      'May be too stimulating for Vata',
      'Reduce spices for Pitta',
      'Avoid on empty stomach'
    ],
    source: 'Ashtanga Hridayam, Sutra Sthana'
  }
];

const seasons = ['All Seasons', 'Spring', 'Summer', 'Autumn', 'Winter'];
const doshas = ['All', 'Vata', 'Pitta', 'Kapha'];

export default function RecipePage() {
  const [selectedDosha, setSelectedDosha] = useState<string>('All');
  const [selectedSeason, setSelectedSeason] = useState<string>('All Seasons');
  const [isLoading, setIsLoading] = useState(true);

  const filteredRecipes = recipes.filter(recipe => {
    const doshaMatch = selectedDosha === 'All' || recipe.dosha === selectedDosha || recipe.dosha === 'All';
    const seasonMatch = selectedSeason === 'All Seasons' || recipe.season.includes(selectedSeason);
    return doshaMatch && seasonMatch;
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loading text="Loading recipes..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ayurvedic Recipes & Seasonal Guidance
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover authentic Ayurvedic recipes tailored to your dosha and the seasons. 
            These time-tested preparations support holistic wellness and balance.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <div className="flex items-center gap-2">
            <Leaf className="h-4 w-4 text-sage" />
            <Select value={selectedDosha} onValueChange={setSelectedDosha}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Dosha" />
              </SelectTrigger>
              <SelectContent>
                {doshas.map(dosha => (
                  <SelectItem key={dosha} value={dosha}>{dosha}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-sage" />
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select Season" />
              </SelectTrigger>
              <SelectContent>
                {seasons.map(season => (
                  <SelectItem key={season} value={season}>{season}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Seasonal Guidance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-sage" />
              Ritucharya (Seasonal Routines)
            </CardTitle>
            <CardDescription>
              Traditional Ayurvedic guidance for seasonal wellness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="spring">Spring</TabsTrigger>
                <TabsTrigger value="summer">Summer</TabsTrigger>
                <TabsTrigger value="autumn">Autumn</TabsTrigger>
                <TabsTrigger value="winter">Winter</TabsTrigger>
              </TabsList>
              
              <TabsContent value="spring" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Spring (Vasant Ritu)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Kapha season - focus on light, dry, and warm foods
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Bitter and astringent tastes</li>
                      <li>• Light, dry foods</li>
                      <li>• Honey and warm water</li>
                      <li>• Avoid heavy, oily foods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Recommended Practices</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Morning exercise and yoga</li>
                      <li>• Nasya (nasal oil application)</li>
                      <li>• Dry massage with powders</li>
                      <li>• Light, warm meals</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="summer" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Summer (Grishma Ritu)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Pitta season - focus on cooling, sweet, and liquid foods
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Sweet, bitter, and astringent tastes</li>
                      <li>• Cooling foods and drinks</li>
                      <li>• Coconut water and buttermilk</li>
                      <li>• Avoid hot, spicy foods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Recommended Practices</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Evening exercise</li>
                      <li>• Cooling oil massage</li>
                      <li>• Stay hydrated</li>
                      <li>• Light, cooling meals</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="autumn" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Autumn (Sharad Ritu)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Vata season - focus on warm, moist, and grounding foods
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Sweet, sour, and salty tastes</li>
                      <li>• Warm, oily foods</li>
                      <li>• Ghee and warm milk</li>
                      <li>• Avoid cold, dry foods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Recommended Practices</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Abhyanga (oil massage)</li>
                      <li>• Warm baths</li>
                      <li>• Regular routine</li>
                      <li>• Nourishing meals</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="winter" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Winter (Hemant/Shishira Ritu)</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Vata/Kapha season - focus on warm, nourishing foods
                    </p>
                    <ul className="text-sm space-y-1">
                      <li>• Sweet, sour, and salty tastes</li>
                      <li>• Warm, heavy foods</li>
                      <li>• Ghee and warm spices</li>
                      <li>• Avoid cold, light foods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage mb-2">Recommended Practices</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Warm oil massage</li>
                      <li>• Steam therapy</li>
                      <li>• Heavy, nourishing meals</li>
                      <li>• Adequate rest</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recipes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <Card key={recipe.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <CardDescription className="italic">{recipe.sanskritName}</CardDescription>
                  </div>
                  <Badge variant={recipe.dosha === 'All' ? 'default' : 'secondary'}>
                    {recipe.dosha}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{recipe.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Recipe Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Utensils className="h-4 w-4" />
                    <span>{recipe.cookTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{recipe.servings}</span>
                  </div>
                </div>

                {/* Seasons */}
                <div className="flex flex-wrap gap-1">
                  {recipe.season.map(season => (
                    <Badge key={season} variant="outline" className="text-xs">
                      {season}
                    </Badge>
                  ))}
                </div>

                {/* Ingredients */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">Ingredients:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                      <li key={index}>• {ingredient}</li>
                    ))}
                    {recipe.ingredients.length > 3 && (
                      <li className="text-sage">+ {recipe.ingredients.length - 3} more ingredients</li>
                    )}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <Heart className="h-4 w-4 text-sage" />
                    Benefits:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {recipe.benefits.slice(0, 2).map((benefit, index) => (
                      <li key={index}>• {benefit}</li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Source */}
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Source:</span> {recipe.source}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your dosha or season filters to see more recipes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 