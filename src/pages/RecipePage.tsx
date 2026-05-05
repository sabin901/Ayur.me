import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Clock, Users, Leaf, Calendar, Utensils, Heart, Search, X, BookOpen, AlertTriangle, CheckCircle, ChevronRight, ShieldCheck } from 'lucide-react';
import { ayurvedicRecipes, mealTypes, doshaOptions, seasonOptions, type AyurvedicRecipe } from '@/data/recipeData';
import { useAuth } from '@/lib/auth-context';

const doshaColors: Record<string, string> = {
  Vata: 'bg-violet-100 text-violet-800 border-violet-200',
  Pitta: 'bg-orange-100 text-orange-800 border-orange-200',
  Kapha: 'bg-green-100 text-green-800 border-green-200',
  Tridoshic: 'bg-blue-100 text-blue-800 border-blue-200',
};

export default function RecipePage() {
  const { user } = useAuth();
  
  // Auto-select the user's primary dosha if they have one
  const defaultDosha = user?.primaryDosha 
    ? user.primaryDosha.charAt(0).toUpperCase() + user.primaryDosha.slice(1) 
    : 'All';
    
  const [selectedDosha, setSelectedDosha] = useState(defaultDosha);
  const [selectedSeason, setSelectedSeason] = useState('All Seasons');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<AyurvedicRecipe | null>(null);

  const filtered = useMemo(() => {
    return ayurvedicRecipes.filter(r => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || r.name.toLowerCase().includes(q) || r.sanskritName.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) || r.ingredients.some(i => i.item.toLowerCase().includes(q));
      const matchDosha = selectedDosha === 'All' || r.dosha === selectedDosha || r.dosha === 'Tridoshic';
      const matchSeason = selectedSeason === 'All Seasons' || r.season.includes(selectedSeason) || r.season.includes('All Seasons');
      const matchMeal = selectedMealType === 'All' || r.mealType === selectedMealType;
      return matchSearch && matchDosha && matchSeason && matchMeal;
    });
  }, [searchQuery, selectedDosha, selectedSeason, selectedMealType]);

  const hasFilters = selectedDosha !== 'All' || selectedSeason !== 'All Seasons' || selectedMealType !== 'All' || searchQuery;
  const clearFilters = () => { setSearchQuery(''); setSelectedDosha('All'); setSelectedSeason('All Seasons'); setSelectedMealType('All'); };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Ayurvedic <span className="text-gradient">Recipes</span> & Seasonal Guidance
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {ayurvedicRecipes.length} authentic recipes with Rasa-Guna-Virya-Vipaka properties, dosha-specific guidance, and classical source references.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-800">
              <ShieldCheck className="mr-1 h-3.5 w-3.5" />
              Educational seed catalog
            </Badge>
            <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">
              Sources shown in recipe detail
            </Badge>
          </div>
        </div>

        {/* Search + Filters */}
        <div className="space-y-4 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search recipes, ingredients, or benefits..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            {searchQuery && <Button variant="ghost" size="sm" onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="w-4 h-4" /></Button>}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Select value={selectedDosha} onValueChange={setSelectedDosha}>
              <SelectTrigger className="w-40"><Leaf className="h-4 w-4 mr-1 text-sage" /><SelectValue /></SelectTrigger>
              <SelectContent>{doshaOptions.map(d => <SelectItem key={d} value={d}>{d === 'All' ? 'All Doshas' : d}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedMealType} onValueChange={setSelectedMealType}>
              <SelectTrigger className="w-40"><Utensils className="h-4 w-4 mr-1 text-sage" /><SelectValue /></SelectTrigger>
              <SelectContent>{mealTypes.map(m => <SelectItem key={m} value={m}>{m === 'All' ? 'All Meals' : m}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-44"><Calendar className="h-4 w-4 mr-1 text-sage" /><SelectValue /></SelectTrigger>
              <SelectContent>{seasonOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
            {hasFilters && <Button variant="outline" size="sm" onClick={clearFilters}><X className="w-4 h-4 mr-1" /> Clear</Button>}
          </div>
        </div>

        {/* Seasonal Guidance */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-sage" /> Ritucharya (Seasonal Routines)</CardTitle>
            <CardDescription>Traditional Ayurvedic guidance for seasonal wellness</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="spring" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="spring">Spring</TabsTrigger>
                <TabsTrigger value="summer">Summer</TabsTrigger>
                <TabsTrigger value="autumn">Autumn</TabsTrigger>
                <TabsTrigger value="winter">Winter</TabsTrigger>
              </TabsList>
              {[
                { key: 'spring', title: 'Vasant Ritu', desc: 'Kapha season — light, dry, warm foods', foods: ['Bitter and astringent tastes', 'Honey and warm water', 'Barley and millet'], avoid: ['Heavy, oily, sweet foods'] },
                { key: 'summer', title: 'Grishma Ritu', desc: 'Pitta season — cooling, sweet, liquid foods', foods: ['Coconut water and buttermilk', 'Sweet fruits and cooling herbs', 'Ghee and milk'], avoid: ['Hot, spicy, fermented foods'] },
                { key: 'autumn', title: 'Sharad Ritu', desc: 'Vata season — warm, moist, grounding foods', foods: ['Sweet, sour, and salty tastes', 'Ghee and warm milk', 'Root vegetables'], avoid: ['Cold, dry, raw foods'] },
                { key: 'winter', title: 'Hemant/Shishira Ritu', desc: 'Vata/Kapha — warm, nourishing foods', foods: ['Warm spices and soups', 'Ghee and oils liberally', 'Sweet and sour tastes'], avoid: ['Cold, light, dry foods'] },
              ].map(s => (
                <TabsContent key={s.key} value={s.key}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sage mb-2">{s.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{s.desc}</p>
                      <ul className="text-sm space-y-1">{s.foods.map((f, i) => <li key={i}>• {f}</li>)}</ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-600 mb-2">Avoid</h4>
                      <ul className="text-sm space-y-1">{s.avoid.map((a, i) => <li key={i}>• {a}</li>)}</ul>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Recipe Grid */}
        <div className="mb-4 text-sm text-muted-foreground text-center">
          Showing {filtered.length} of {ayurvedicRecipes.length} recipes
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Utensils className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No recipes found</h3>
            <p className="text-muted-foreground">Try adjusting your filters.</p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear all filters</Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((recipe, i) => (
              <motion.div key={recipe.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.04 }}>
                <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1" onClick={() => setSelectedRecipe(recipe)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{recipe.name}</CardTitle>
                        <CardDescription className="italic">{recipe.sanskritName}</CardDescription>
                      </div>
                      <Badge className={doshaColors[recipe.dosha]} variant="outline">{recipe.dosha}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{recipe.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {recipe.prepTime}</span>
                      <span className="flex items-center gap-1"><Utensils className="h-3.5 w-3.5" /> {recipe.cookTime}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {recipe.servings}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">{recipe.mealType}</Badge>
                      {recipe.season.slice(0, 2).map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs mb-1 flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-sage" /> Benefits</h4>
                      <ul className="text-xs text-muted-foreground space-y-0.5">
                        {recipe.benefits.slice(0, 2).map((b, j) => <li key={j}>• {b}</li>)}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t text-xs">
                      <span className="text-muted-foreground">{recipe.ingredients.length} ingredients</span>
                      <span className="text-sage-600 flex items-center gap-1">View full recipe <ChevronRight className="h-3 w-3" /></span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedRecipe.name}
                  <span className="block text-lg font-normal text-muted-foreground mt-1">{selectedRecipe.sanskritName}</span>
                </DialogTitle>
                <div className="flex gap-2 flex-wrap mt-2">
                  <Badge className={doshaColors[selectedRecipe.dosha]} variant="outline">{selectedRecipe.dosha}</Badge>
                  <Badge variant="secondary">{selectedRecipe.mealType}</Badge>
                  {selectedRecipe.season.map(s => <Badge key={s} variant="outline">{s}</Badge>)}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Prep: {selectedRecipe.prepTime}</span>
                  <span className="flex items-center gap-1"><Utensils className="h-4 w-4" /> Cook: {selectedRecipe.cookTime}</span>
                  <span className="flex items-center gap-1"><Users className="h-4 w-4" /> Serves: {selectedRecipe.servings}</span>
                </div>
              </DialogHeader>

              <p className="text-muted-foreground mt-4">{selectedRecipe.description}</p>

              <Tabs defaultValue="ingredients" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="method">Method</TabsTrigger>
                  <TabsTrigger value="benefits">Benefits</TabsTrigger>
                  <TabsTrigger value="ayurvedic">Ayurvedic</TabsTrigger>
                </TabsList>

                <TabsContent value="ingredients" className="mt-4">
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <CheckCircle className="h-4 w-4 text-sage mr-2 mt-0.5 flex-shrink-0" />
                        <span><strong>{ing.quantity}</strong> {ing.item}{ing.note && <span className="text-xs text-muted-foreground ml-1">({ing.note})</span>}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="method" className="mt-4">
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className="bg-sage/20 text-sage rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 flex-shrink-0 font-medium">{i + 1}</span>
                        <span className="text-muted-foreground pt-0.5">{inst}</span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>

                <TabsContent value="benefits" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Heart className="h-4 w-4 text-sage" /> Benefits</h4>
                    <ul className="space-y-1.5">
                      {selectedRecipe.benefits.map((b, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><CheckCircle className="h-3.5 w-3.5 text-sage mr-2 mt-0.5 flex-shrink-0" />{b}</li>)}
                    </ul>
                  </div>
                  {selectedRecipe.contraindications.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Contraindications</h4>
                      <ul className="space-y-1.5">
                        {selectedRecipe.contraindications.map((c, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />{c}</li>)}
                      </ul>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="ayurvedic" className="mt-4 space-y-4">
                  {selectedRecipe.rpiData && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-sage/10 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm mb-1">Rasa (Taste)</h5>
                        <div className="flex flex-wrap gap-1">{selectedRecipe.rpiData.rasa.map(r => <Badge key={r} variant="secondary" className="text-xs">{r}</Badge>)}</div>
                      </div>
                      <div className="bg-gold/10 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm mb-1">Guna (Quality)</h5>
                        <div className="flex flex-wrap gap-1">{selectedRecipe.rpiData.guna.map(g => <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>)}</div>
                      </div>
                      <div className="bg-earth/10 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm mb-1">Virya (Potency)</h5>
                        <Badge variant="outline">{selectedRecipe.rpiData.virya}</Badge>
                      </div>
                      <div className="bg-pitta/10 p-3 rounded-lg">
                        <h5 className="font-semibold text-sm mb-1">Vipaka (Post-digestive)</h5>
                        <Badge variant="outline">{selectedRecipe.rpiData.vipaka}</Badge>
                      </div>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" /> Classical Source</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{selectedRecipe.source}</Badge>
                      {selectedRecipe.reviewStatus && <Badge variant="secondary">{selectedRecipe.reviewStatus.replace('_', ' ')}</Badge>}
                      {selectedRecipe.confidence && <Badge variant="outline">{Math.round(selectedRecipe.confidence * 100)}% confidence</Badge>}
                    </div>
                    <p className="mt-3 text-xs leading-5 text-muted-foreground">
                      Recipe guidance is educational and based on classical/traditional seed records. Public-source records should be reviewed before clinical or commercial claims are made.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
