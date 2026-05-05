export interface AyurvedicRecipe {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  dosha: 'Vata' | 'Pitta' | 'Kapha' | 'Tridoshic';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Beverage' | 'Dessert';
  season: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: { item: string; quantity: string; note?: string }[];
  instructions: string[];
  benefits: string[];
  contraindications: string[];
  source: string;
  sourceUrl?: string;
  license?: string;
  reviewStatus?: 'seed_reviewed' | 'needs_review';
  confidence?: number;
  rpiData?: { rasa: string[]; guna: string[]; virya: string; vipaka: string };
}

import { expandedRecipes } from './expandedRecipes';

export const ayurvedicRecipes: AyurvedicRecipe[] = [
  {
    id: 'r1', name: 'Golden Milk', sanskritName: 'Haldi Doodh',
    description: 'Traditional Ayurvedic anti-inflammatory drink with turmeric, black pepper, and warming spices. A nightcap for restful sleep.',
    dosha: 'Tridoshic', mealType: 'Beverage', season: ['Winter', 'Autumn'],
    prepTime: '5 min', cookTime: '10 min', servings: 2,
    ingredients: [
      { item: 'Whole milk or almond milk', quantity: '2 cups' },
      { item: 'Turmeric powder', quantity: '1 tsp' },
      { item: 'Ginger powder', quantity: '½ tsp' },
      { item: 'Black pepper', quantity: '¼ tsp', note: 'Increases turmeric absorption by 2000%' },
      { item: 'Cinnamon', quantity: '¼ tsp' },
      { item: 'Honey or jaggery', quantity: '1 tsp', note: 'Add after cooling below 40°C' },
      { item: 'Ghee', quantity: '½ tsp' }
    ],
    instructions: ['Heat milk in a saucepan over medium heat.', 'Add turmeric, ginger, black pepper, and cinnamon.', 'Stir continuously for 5-7 minutes, do not boil.', 'Remove from heat, let cool slightly.', 'Add honey and ghee, stir well.', 'Strain and serve warm.'],
    benefits: ['Reduces inflammation (Shotha-hara)', 'Boosts immunity (Vyadhi-kshamatva)', 'Improves digestion (Deepana)', 'Promotes restful sleep (Nidra-janana)', 'Supports liver function (Yakrit-uttejaka)'],
    contraindications: ['Avoid during pregnancy in large doses', 'Not for Pitta aggravation in summer', 'Consult doctor if on blood thinners'],
    source: 'Charaka Samhita, Chikitsa Sthana',
    rpiData: { rasa: ['Bitter', 'Pungent', 'Sweet'], guna: ['Light', 'Dry'], virya: 'Hot', vipaka: 'Pungent' }
  },
  {
    id: 'r2', name: 'Kitchari', sanskritName: 'Khichdi',
    description: 'The quintessential Ayurvedic cleansing meal — a one-pot rice and mung dal preparation that balances all three doshas.',
    dosha: 'Tridoshic', mealType: 'Lunch', season: ['All Seasons'],
    prepTime: '15 min', cookTime: '30 min', servings: 4,
    ingredients: [
      { item: 'Basmati rice', quantity: '1 cup' },
      { item: 'Split yellow mung dal', quantity: '½ cup' },
      { item: 'Ghee', quantity: '2 tbsp' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Mustard seeds', quantity: '1 tsp' },
      { item: 'Turmeric powder', quantity: '½ tsp' },
      { item: 'Fresh ginger, grated', quantity: '1 inch' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Salt', quantity: 'to taste' },
      { item: 'Fresh cilantro', quantity: 'for garnish' }
    ],
    instructions: ['Wash rice and dal together, soak 30 minutes.', 'Heat ghee in pressure cooker.', 'Add cumin and mustard seeds, let crackle.', 'Add ginger and turmeric, sauté briefly.', 'Add drained rice-dal mixture.', 'Add water and salt, pressure cook 2 whistles.', 'Garnish with cilantro and serve hot.'],
    benefits: ['Easy to digest (Laghu)', 'Balances all doshas (Tridosha-shamaka)', 'Supports detoxification (Ama-pachana)', 'Provides complete protein', 'Soothes digestive system (Agnideepana)'],
    contraindications: ['Reduce salt for Pitta types', 'Add more ghee for Vata types', 'Use less rice for Kapha types'],
    source: 'Ashtanga Hridayam, Sutra Sthana',
    rpiData: { rasa: ['Sweet', 'Astringent'], guna: ['Light', 'Soft'], virya: 'Cooling', vipaka: 'Sweet' }
  },
  {
    id: 'r3', name: 'Vata-Pacifying Sweet Potato Soup', sanskritName: 'Shakarkandi Shorba',
    description: 'Warming, grounding soup with sweet potatoes, ghee, and gentle spices to calm Vata dosha.',
    dosha: 'Vata', mealType: 'Dinner', season: ['Autumn', 'Winter'],
    prepTime: '10 min', cookTime: '25 min', servings: 4,
    ingredients: [
      { item: 'Sweet potatoes, cubed', quantity: '2 large' },
      { item: 'Onion, chopped', quantity: '1 medium' },
      { item: 'Ghee', quantity: '2 tbsp' },
      { item: 'Cumin powder', quantity: '1 tsp' },
      { item: 'Ginger powder', quantity: '½ tsp' },
      { item: 'Asafoetida (hing)', quantity: '¼ tsp' },
      { item: 'Vegetable broth', quantity: '4 cups' },
      { item: 'Coconut milk', quantity: '½ cup' },
      { item: 'Salt and pepper', quantity: 'to taste' }
    ],
    instructions: ['Heat ghee in large pot.', 'Sauté onions until translucent.', 'Add sweet potatoes and spices, stir.', 'Add broth, bring to boil.', 'Simmer until sweet potatoes are tender (15 min).', 'Blend until smooth.', 'Add coconut milk and season.'],
    benefits: ['Grounds Vata energy (Vata-shamaka)', 'Provides warmth and nourishment', 'Supports bone health', 'Calms nervous system'],
    contraindications: ['May be too heavy for Kapha', 'Reduce ghee for Pitta types'],
    source: 'Charaka Samhita, Chikitsa Sthana'
  },
  {
    id: 'r4', name: 'Pitta-Cooling Cucumber Raita', sanskritName: 'Kakdi Raita',
    description: 'Refreshing yogurt dish with cooling cucumber, mint, and cumin to soothe Pitta dosha.',
    dosha: 'Pitta', mealType: 'Snack', season: ['Summer', 'Spring'],
    prepTime: '10 min', cookTime: '0 min', servings: 4,
    ingredients: [
      { item: 'Plain yogurt', quantity: '2 cups' },
      { item: 'Cucumber, grated', quantity: '1 medium' },
      { item: 'Fresh mint, chopped', quantity: '¼ cup' },
      { item: 'Fresh cilantro, chopped', quantity: '¼ cup' },
      { item: 'Cumin powder', quantity: '½ tsp' },
      { item: 'Black salt', quantity: '¼ tsp' },
      { item: 'Sugar', quantity: '¼ tsp' },
      { item: 'Roasted cumin seeds', quantity: '1 tbsp' }
    ],
    instructions: ['Whisk yogurt until smooth.', 'Add grated cucumber and mix well.', 'Add mint, cilantro, and spices.', 'Mix thoroughly.', 'Garnish with roasted cumin seeds.', 'Serve chilled.'],
    benefits: ['Cools Pitta dosha (Pitta-shamaka)', 'Improves digestion', 'Reduces acidity', 'Provides probiotics'],
    contraindications: ['Avoid if lactose intolerant', 'May be too cooling for Vata'],
    source: 'Sushruta Samhita, Chikitsa Sthana'
  },
  {
    id: 'r5', name: 'Kapha-Reducing Spiced Tea', sanskritName: 'Kaphahara Chai',
    description: 'Stimulating herbal tea blend with ginger, black pepper, and warming spices to counter Kapha stagnation.',
    dosha: 'Kapha', mealType: 'Beverage', season: ['Spring', 'Winter'],
    prepTime: '5 min', cookTime: '10 min', servings: 2,
    ingredients: [
      { item: 'Water', quantity: '2 cups' },
      { item: 'Fresh ginger, grated', quantity: '½ inch' },
      { item: 'Black pepper', quantity: '¼ tsp' },
      { item: 'Cinnamon', quantity: '¼ tsp' },
      { item: 'Cardamom powder', quantity: '¼ tsp' },
      { item: 'Turmeric', quantity: '¼ tsp' },
      { item: 'Honey', quantity: '1 tsp', note: 'Add after cooling below 40°C' },
      { item: 'Lemon juice', quantity: '1 tbsp' }
    ],
    instructions: ['Bring water to boil.', 'Add ginger and spices.', 'Simmer for 5 minutes.', 'Strain the tea.', 'Let cool slightly, add honey and lemon juice.', 'Serve hot.'],
    benefits: ['Stimulates metabolism (Deepana)', 'Reduces Kapha accumulation', 'Improves circulation', 'Boosts energy (Balya)'],
    contraindications: ['May be too stimulating for Vata', 'Reduce spices for Pitta'],
    source: 'Ashtanga Hridayam, Sutra Sthana'
  },
  {
    id: 'r6', name: 'Sattvic Dalia Porridge', sanskritName: 'Dalia',
    description: 'Nourishing broken wheat porridge with ghee, nuts, and cardamom — an ideal sattvic breakfast.',
    dosha: 'Tridoshic', mealType: 'Breakfast', season: ['All Seasons'],
    prepTime: '5 min', cookTime: '20 min', servings: 2,
    ingredients: [
      { item: 'Broken wheat (dalia)', quantity: '½ cup' },
      { item: 'Milk', quantity: '1½ cups' },
      { item: 'Ghee', quantity: '1 tbsp' },
      { item: 'Jaggery', quantity: '2 tbsp' },
      { item: 'Almonds, sliced', quantity: '1 tbsp' },
      { item: 'Raisins', quantity: '1 tbsp' },
      { item: 'Cardamom powder', quantity: '¼ tsp' }
    ],
    instructions: ['Dry roast dalia in ghee until golden.', 'Add milk slowly, stirring continuously.', 'Cook on medium heat until soft (15 min).', 'Add jaggery, nuts, raisins, and cardamom.', 'Serve warm.'],
    benefits: ['Provides sustained energy', 'Promotes mental clarity (Medhya)', 'Easy to digest', 'Supports tissue building (Dhatu-vardhaka)'],
    contraindications: ['Kapha types should use less ghee and jaggery'],
    source: 'Bhavaprakasha, Kritanna Varga'
  },
  {
    id: 'r7', name: 'Moong Dal Soup', sanskritName: 'Moong Yusha',
    description: 'Light, healing soup made from split green moong dal — the most easily digested legume in Ayurveda.',
    dosha: 'Tridoshic', mealType: 'Lunch', season: ['All Seasons'],
    prepTime: '10 min', cookTime: '25 min', servings: 3,
    ingredients: [
      { item: 'Split green moong dal', quantity: '1 cup' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Ghee', quantity: '1 tbsp' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Turmeric', quantity: '½ tsp' },
      { item: 'Fresh ginger', quantity: '1 inch' },
      { item: 'Curry leaves', quantity: '8-10' },
      { item: 'Lime juice', quantity: '1 tbsp' }
    ],
    instructions: ['Wash dal, cook with water and turmeric until soft.', 'Heat ghee, add cumin seeds and curry leaves.', 'Add ginger, sauté briefly.', 'Pour tempering over cooked dal.', 'Add salt and lime juice.', 'Serve hot with rice or bread.'],
    benefits: ['Easiest legume to digest', 'Reduces Ama (toxins)', 'Provides complete protein', 'Suitable during illness and recovery'],
    contraindications: ['None for healthy individuals'],
    source: 'Charaka Samhita, Sutra Sthana 27'
  },
  {
    id: 'r8', name: 'Masala Buttermilk', sanskritName: 'Takra',
    description: 'Spiced churned yogurt drink — called the "nectar of life" in Ayurveda for its digestive properties.',
    dosha: 'Tridoshic', mealType: 'Beverage', season: ['Summer', 'Monsoon'],
    prepTime: '5 min', cookTime: '0 min', servings: 2,
    ingredients: [
      { item: 'Fresh yogurt', quantity: '½ cup' },
      { item: 'Water', quantity: '1½ cups' },
      { item: 'Roasted cumin powder', quantity: '½ tsp' },
      { item: 'Fresh ginger, grated', quantity: '¼ tsp' },
      { item: 'Curry leaves', quantity: '5-6' },
      { item: 'Rock salt', quantity: '¼ tsp' },
      { item: 'Fresh cilantro', quantity: '1 tbsp' }
    ],
    instructions: ['Churn yogurt and water together until smooth.', 'Add cumin, ginger, salt.', 'Garnish with curry leaves and cilantro.', 'Serve at room temperature.'],
    benefits: ['Supreme digestive aid (Agni-deepana)', 'Reduces bloating and gas', 'Hydrates without aggravating Kapha', 'Called "Amrit" (nectar) by Charaka'],
    contraindications: ['Avoid at night', 'Not in acute fever'],
    source: 'Charaka Samhita, Sutra Sthana 27 — "Takram shakrasya durlabham"'
  },
  {
    id: 'r9', name: 'Vata-Calming Ojas Balls', sanskritName: 'Ojas Modaka',
    description: 'Energy-rich date and nut balls with ashwagandha — designed to build Ojas (vital essence).',
    dosha: 'Vata', mealType: 'Snack', season: ['Autumn', 'Winter'],
    prepTime: '15 min', cookTime: '0 min', servings: 12,
    ingredients: [
      { item: 'Medjool dates, pitted', quantity: '10' },
      { item: 'Almonds', quantity: '¼ cup' },
      { item: 'Cashews', quantity: '¼ cup' },
      { item: 'Ghee', quantity: '1 tbsp' },
      { item: 'Ashwagandha powder', quantity: '1 tsp' },
      { item: 'Cardamom powder', quantity: '½ tsp' },
      { item: 'Saffron strands', quantity: '4-5' },
      { item: 'Desiccated coconut', quantity: '2 tbsp' }
    ],
    instructions: ['Blend dates, almonds, and cashews in food processor.', 'Add ghee, ashwagandha, cardamom, saffron.', 'Mix to a dough-like consistency.', 'Roll into 12 small balls.', 'Coat in desiccated coconut.', 'Refrigerate 30 minutes before serving.'],
    benefits: ['Builds Ojas (vital essence)', 'Nourishes reproductive tissue (Shukra dhatu)', 'Calms Vata and nervous system', 'Sustained energy without crash'],
    contraindications: ['Limit to 1-2 for Kapha types', 'Avoid if diabetic'],
    source: 'Ashtanga Hridayam & Charaka Samhita, Rasayana Adhyaya'
  },
  {
    id: 'r10', name: 'Pitta-Cooling Mint Chutney', sanskritName: 'Pudina Chutney',
    description: 'Fresh cooling condiment with mint, cilantro, and coconut to balance summer heat and Pitta aggravation.',
    dosha: 'Pitta', mealType: 'Snack', season: ['Summer', 'Spring'],
    prepTime: '10 min', cookTime: '0 min', servings: 6,
    ingredients: [
      { item: 'Fresh mint leaves', quantity: '1 cup' },
      { item: 'Fresh cilantro', quantity: '1 cup' },
      { item: 'Fresh coconut, grated', quantity: '2 tbsp' },
      { item: 'Green chili (mild)', quantity: '1 small' },
      { item: 'Lime juice', quantity: '2 tbsp' },
      { item: 'Jaggery', quantity: '1 tsp' },
      { item: 'Rock salt', quantity: '¼ tsp' }
    ],
    instructions: ['Blend all ingredients with 2 tbsp water.', 'Adjust salt and lime to taste.', 'Serve as condiment with meals.', 'Keeps refrigerated 3 days.'],
    benefits: ['Cools Pitta instantly', 'Aids digestion', 'Rich in antioxidants', 'Reduces mouth ulcers'],
    contraindications: ['Use less chili for extreme Pitta', 'May aggravate Vata if too cold'],
    source: 'Bhavaprakasha, Haritakyadi Varga'
  },
  {
    id: 'r11', name: 'Kapha-Stimulating Barley Soup', sanskritName: 'Yava Yusha',
    description: 'Light barley soup with pungent spices — barley is called the best grain for Kapha in classical texts.',
    dosha: 'Kapha', mealType: 'Dinner', season: ['Spring', 'Late Winter'],
    prepTime: '10 min', cookTime: '35 min', servings: 3,
    ingredients: [
      { item: 'Pearl barley', quantity: '½ cup' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Ghee', quantity: '1 tsp' },
      { item: 'Black pepper', quantity: '½ tsp' },
      { item: 'Dry ginger powder', quantity: '½ tsp' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Spinach, chopped', quantity: '1 cup' },
      { item: 'Lemon juice', quantity: '1 tbsp' }
    ],
    instructions: ['Rinse barley, cook in water until soft (25 min).', 'Heat ghee, add cumin seeds.', 'Add ginger and pepper, sauté.', 'Add spinach, wilt briefly.', 'Combine with barley.', 'Finish with lemon juice.'],
    benefits: ['Reduces Kapha and excess weight (Medohara)', 'Scrapes toxins (Lekhana)', "Barley is Kapha's best grain per Charaka", 'Improves urinary function (Mutrala)'],
    contraindications: ['May be too light/dry for Vata', 'Increase ghee for Pitta'],
    source: 'Charaka Samhita, Sutra Sthana 27 — "Yava: Kaphamedomehahara"'
  },
  {
    id: 'r12', name: 'Tridoshic Vegetable Khichdi', sanskritName: 'Sabzi Khichdi',
    description: 'Seasonal vegetables cooked with rice, dal, and digestive spices — a complete one-pot healing meal.',
    dosha: 'Tridoshic', mealType: 'Lunch', season: ['All Seasons'],
    prepTime: '15 min', cookTime: '30 min', servings: 4,
    ingredients: [
      { item: 'Basmati rice', quantity: '¾ cup' },
      { item: 'Moong dal', quantity: '¼ cup' },
      { item: 'Mixed vegetables (carrot, beans, peas)', quantity: '1 cup' },
      { item: 'Ghee', quantity: '2 tbsp' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Turmeric', quantity: '½ tsp' },
      { item: 'Fresh ginger', quantity: '1 inch' },
      { item: 'Asafoetida', quantity: 'pinch' },
      { item: 'Fresh cilantro', quantity: 'for garnish' }
    ],
    instructions: ['Wash rice and dal together.', 'Heat ghee, add cumin and asafoetida.', 'Add ginger and vegetables, sauté 2 min.', 'Add rice, dal, turmeric, and 3.5 cups water.', 'Pressure cook 2 whistles or simmer 25 min.', 'Garnish with cilantro and serve.'],
    benefits: ['Complete nutrition in one pot', 'Ideal for Panchakarma cleansing', 'Strengthens Agni (digestive fire)', 'Suitable during illness and recovery'],
    contraindications: ['Adjust spices per dosha'],
    source: 'Charaka Samhita, Chikitsa Sthana'
  },
  {
    id: 'r13', name: 'CCF Tea (Cumin-Coriander-Fennel)', sanskritName: 'Tridoshic Kashaya',
    description: 'The signature Ayurvedic digestive tea — three seeds that balance all doshas and kindle digestive fire.',
    dosha: 'Tridoshic', mealType: 'Beverage', season: ['All Seasons'],
    prepTime: '2 min', cookTime: '10 min', servings: 2,
    ingredients: [
      { item: 'Cumin seeds', quantity: '½ tsp' },
      { item: 'Coriander seeds', quantity: '½ tsp' },
      { item: 'Fennel seeds', quantity: '½ tsp' },
      { item: 'Water', quantity: '2 cups' }
    ],
    instructions: ['Add all seeds to water.', 'Bring to boil, then simmer 5-8 min.', 'Strain and sip warm throughout the day.'],
    benefits: ['Kindles Agni without aggravating Pitta', 'Reduces bloating and gas', 'Gentle detoxification', 'Safe for all constitutions'],
    contraindications: ['None — universally safe'],
    source: 'Classical Ayurvedic clinical practice'
  },
  {
    id: 'r14', name: 'Ghee Rice with Saffron', sanskritName: 'Ghrita Anna',
    description: 'Fragrant basmati rice cooked with ghee and saffron — a sattvic preparation that builds Ojas.',
    dosha: 'Vata', mealType: 'Lunch', season: ['Autumn', 'Winter'],
    prepTime: '10 min', cookTime: '20 min', servings: 3,
    ingredients: [
      { item: 'Basmati rice', quantity: '1 cup' },
      { item: 'Ghee', quantity: '2 tbsp' },
      { item: 'Saffron strands', quantity: '8-10', note: 'Soaked in 1 tbsp warm milk' },
      { item: 'Cardamom pods', quantity: '3' },
      { item: 'Cloves', quantity: '2' },
      { item: 'Bay leaf', quantity: '1' },
      { item: 'Salt', quantity: 'to taste' },
      { item: 'Water', quantity: '2 cups' }
    ],
    instructions: ['Wash and soak rice 20 minutes.', 'Heat ghee, add whole spices, sauté 30 sec.', 'Add drained rice, stir gently.', 'Add water, salt, and saffron milk.', 'Cover, cook on low heat 15-18 min.', 'Fluff with fork and serve.'],
    benefits: ['Builds Ojas and vitality', 'Nourishes all seven dhatus', 'Calms Vata and mind', 'Saffron is a powerful Rasayana'],
    contraindications: ['Reduce ghee for Kapha', 'Use basmati only (not short grain)'],
    source: 'Charaka Samhita, Sutra Sthana 27'
  },
  {
    id: 'r15', name: 'Chyawanprash Smoothie', sanskritName: 'Chyawanprash Pana',
    description: 'Modern take on the ancient Rasayana — blending Chyawanprash with warm milk, banana, and spices.',
    dosha: 'Tridoshic', mealType: 'Breakfast', season: ['Winter', 'Autumn'],
    prepTime: '5 min', cookTime: '0 min', servings: 1,
    ingredients: [
      { item: 'Chyawanprash', quantity: '1 tbsp' },
      { item: 'Warm milk', quantity: '1 cup' },
      { item: 'Ripe banana', quantity: '½' },
      { item: 'Cardamom powder', quantity: 'pinch' },
      { item: 'Honey', quantity: '1 tsp', note: 'Optional — add after blending' }
    ],
    instructions: ['Blend Chyawanprash with warm milk and banana.', 'Add cardamom.', 'Pour into glass, top with honey if desired.', 'Drink immediately.'],
    benefits: ['Supreme Rasayana (rejuvenative)', 'Contains 40+ herbs', 'Boosts immunity dramatically', 'Builds strength and vitality'],
    contraindications: ['Diabetics should avoid sweeteners', 'Reduce banana for Kapha'],
    source: 'Charaka Samhita, Chikitsa Sthana 1 (Rasayana Adhyaya)'
  },
  ...expandedRecipes
];

export const mealTypes = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Beverage', 'Dessert'] as const;
export const doshaOptions = ['All', 'Vata', 'Pitta', 'Kapha', 'Tridoshic'] as const;
export const seasonOptions = ['All Seasons', 'Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter'] as const;
