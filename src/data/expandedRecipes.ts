import { AyurvedicRecipe } from './recipeData';

export const expandedRecipes: AyurvedicRecipe[] = [
  {
    id: 'r16', name: 'Triphala Tea', sanskritName: 'Triphala Kashaya',
    description: 'A daily detoxifying tea made from the three fruits. Excellent for bowel regularity and eye health.',
    dosha: 'Tridoshic', mealType: 'Beverage', season: ['All Seasons'],
    prepTime: '2 min', cookTime: '10 min', servings: 1,
    ingredients: [
      { item: 'Triphala powder', quantity: '1 tsp' },
      { item: 'Water', quantity: '1 cup' },
      { item: 'Honey', quantity: '1 tsp', note: 'Optional, add when cool' }
    ],
    instructions: ['Boil water.', 'Add Triphala powder and simmer for 5 minutes.', 'Strain and let it cool slightly.', 'Add honey if desired.'],
    benefits: ['Mild laxative (Mridu Virechana)', 'Eye tonic (Chakshushya)', 'Antioxidant', 'Balances all doshas'],
    contraindications: ['Pregnancy', 'Severe diarrhea'],
    source: 'Sushruta Samhita, Sutra Sthana',
    rpiData: { rasa: ['Sweet', 'Sour', 'Bitter', 'Astringent', 'Pungent'], guna: ['Light', 'Dry'], virya: 'Neutral', vipaka: 'Sweet' }
  },
  {
    id: 'r17', name: 'Almond Date Shake', sanskritName: 'Badam Kharjura Ksheera',
    description: 'A heavy, nourishing shake for Vata pacification, building Ojas and strength.',
    dosha: 'Vata', mealType: 'Breakfast', season: ['Winter', 'Autumn'],
    prepTime: '10 min', cookTime: '0 min', servings: 2,
    ingredients: [
      { item: 'Almonds', quantity: '10', note: 'Soaked overnight and peeled' },
      { item: 'Dates', quantity: '4', note: 'Pitted' },
      { item: 'Warm milk', quantity: '1.5 cups' },
      { item: 'Cardamom powder', quantity: '1/4 tsp' },
      { item: 'Ghee', quantity: '1 tsp' }
    ],
    instructions: ['Blend the soaked almonds and dates with a little warm milk until smooth.', 'Add the rest of the milk, cardamom, and ghee.', 'Blend again until frothy.', 'Serve warm.'],
    benefits: ['Builds Ojas', 'Grounds Vata', 'Nourishes the nervous system', 'Increases strength (Balya)'],
    contraindications: ['High Kapha', 'Poor digestion (Mandagni)'],
    source: 'Bhavaprakasha'
  },
  {
    id: 'r18', name: 'Cooling Coriander Water', sanskritName: 'Dhanyaka Hima',
    description: 'A cold infusion of coriander seeds, highly effective for Pitta conditions like burning sensation and excessive thirst.',
    dosha: 'Pitta', mealType: 'Beverage', season: ['Summer'],
    prepTime: '5 min', cookTime: '0 min', servings: 4,
    ingredients: [
      { item: 'Crushed coriander seeds', quantity: '2 tbsp' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Rock sugar (Mishri)', quantity: '1 tbsp', note: 'Optional' }
    ],
    instructions: ['Soak crushed coriander seeds in water overnight (or for 6-8 hours).', 'Strain the water in the morning.', 'Add rock sugar if desired.', 'Drink throughout the day.'],
    benefits: ['Relieves burning sensation (Dahaprashamana)', 'Cools Pitta', 'Improves digestion without heating', 'Diuretic'],
    contraindications: ['High Vata', 'Cold weather'],
    source: 'Sharangadhara Samhita'
  },
  {
    id: 'r19', name: 'Spicy Radish Salad', sanskritName: 'Mulaka Kosambari',
    description: 'A pungent and heating salad excellent for clearing Kapha and stimulating digestion.',
    dosha: 'Kapha', mealType: 'Lunch', season: ['Winter', 'Spring'],
    prepTime: '15 min', cookTime: '0 min', servings: 2,
    ingredients: [
      { item: 'White radish, grated', quantity: '1 cup' },
      { item: 'Lemon juice', quantity: '1 tbsp' },
      { item: 'Black pepper', quantity: '1/2 tsp' },
      { item: 'Mustard oil', quantity: '1 tsp' },
      { item: 'Rock salt', quantity: 'to taste' },
      { item: 'Fresh coriander', quantity: 'for garnish' }
    ],
    instructions: ['Mix the grated radish with lemon juice, salt, and pepper.', 'Heat mustard oil slightly and pour over the salad.', 'Garnish with fresh coriander.', 'Serve immediately.'],
    benefits: ['Clears congestion', 'Stimulates digestion (Deepana)', 'Reduces fat (Medohara)'],
    contraindications: ['Pitta conditions', 'Acidity'],
    source: 'Ayurvedic traditional recipe'
  },
  {
    id: 'r20', name: 'Mung Bean Pancakes', sanskritName: 'Mudga Apupa',
    description: 'Savory pancakes made from soaked mung beans. A light, protein-rich breakfast.',
    dosha: 'Tridoshic', mealType: 'Breakfast', season: ['All Seasons'],
    prepTime: '10 min', cookTime: '15 min', servings: 3,
    ingredients: [
      { item: 'Whole green mung beans', quantity: '1 cup', note: 'Soaked overnight' },
      { item: 'Ginger', quantity: '1 inch' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Salt', quantity: '1 tsp' },
      { item: 'Water', quantity: 'as needed' },
      { item: 'Ghee or oil', quantity: 'for cooking' }
    ],
    instructions: ['Drain the soaked mung beans.', 'Blend with ginger, cumin, salt, and a little water to form a pancake batter.', 'Heat a pan and add a few drops of ghee.', 'Pour a ladle of batter and spread into a circle.', 'Cook until golden brown on both sides.', 'Serve warm with chutney.'],
    benefits: ['Light to digest', 'Provides sustained energy', 'Balances all doshas', 'Good for weight management'],
    contraindications: ['Severe Vata (add more ghee)'],
    source: 'Bhavaprakasha, Kritanna Varga'
  },
  {
    id: 'r21', name: 'Takra Spiced Buttermilk', sanskritName: 'Takra',
    description: 'A light digestive drink traditionally used after lunch with roasted cumin, rock salt, and fresh cilantro.',
    dosha: 'Tridoshic', mealType: 'Beverage', season: ['Spring', 'Summer', 'All Seasons'],
    prepTime: '5 min', cookTime: '0 min', servings: 2,
    ingredients: [
      { item: 'Plain yogurt', quantity: '1/2 cup' },
      { item: 'Water', quantity: '1.5 cups' },
      { item: 'Roasted cumin powder', quantity: '1/2 tsp' },
      { item: 'Rock salt', quantity: '1 pinch' },
      { item: 'Fresh cilantro', quantity: '1 tbsp', note: 'finely chopped' }
    ],
    instructions: ['Whisk yogurt until smooth.', 'Add water and churn until light and frothy.', 'Stir in cumin, rock salt, and cilantro.', 'Serve at room temperature after lunch.'],
    benefits: ['Supports digestion', 'Lightens heaviness after meals', 'Traditionally used for grahani support'],
    contraindications: ['Avoid at night', 'Avoid during acute fever or strong dairy intolerance'],
    source: 'Charaka Samhita, Sutra Sthana; traditional takra preparation',
    reviewStatus: 'seed_reviewed',
    confidence: 0.76
  },
  {
    id: 'r22', name: 'Rice Gruel', sanskritName: 'Peya',
    description: 'A thin rice gruel used as a gentle, hydrating food when digestion is weak or appetite is returning.',
    dosha: 'Tridoshic', mealType: 'Breakfast', season: ['All Seasons'],
    prepTime: '5 min', cookTime: '25 min', servings: 2,
    ingredients: [
      { item: 'Rice', quantity: '1/4 cup' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Fresh ginger', quantity: '2 thin slices', note: 'optional' },
      { item: 'Rock salt', quantity: 'to taste' }
    ],
    instructions: ['Wash rice well.', 'Simmer rice with water until grains break down.', 'Add ginger if desired.', 'Serve warm and thin, with salt to taste.'],
    benefits: ['Easy to digest', 'Hydrating', 'Useful as a light convalescent food'],
    contraindications: ['May be too light for strong appetite unless paired with dal or ghee'],
    source: 'Classical yavagu/peya dietary tradition',
    reviewStatus: 'seed_reviewed',
    confidence: 0.74
  },
  {
    id: 'r23', name: 'Medicated Rice Porridge', sanskritName: 'Yavagu',
    description: 'A soft rice porridge that can be adjusted with ghee, ginger, cumin, or vegetables according to constitution.',
    dosha: 'Tridoshic', mealType: 'Dinner', season: ['All Seasons'],
    prepTime: '5 min', cookTime: '30 min', servings: 3,
    ingredients: [
      { item: 'Rice', quantity: '1/2 cup' },
      { item: 'Water', quantity: '5 cups' },
      { item: 'Ghee', quantity: '1 tsp' },
      { item: 'Cumin seeds', quantity: '1/2 tsp' },
      { item: 'Turmeric', quantity: '1 pinch' }
    ],
    instructions: ['Rinse rice.', 'Warm ghee and briefly toast cumin.', 'Add rice, turmeric, and water.', 'Simmer until very soft.', 'Adjust thickness with warm water.'],
    benefits: ['Gentle meal base', 'Supports agni without heaviness', 'Adaptable for seasonal diets'],
    contraindications: ['Use less ghee for Kapha-heavy presentations'],
    source: 'Classical Ayurvedic pathya food tradition',
    reviewStatus: 'seed_reviewed',
    confidence: 0.72
  },
  {
    id: 'r24', name: 'Green Gram Soup', sanskritName: 'Mudga Yusha',
    description: 'A light mung broth prepared with digestive spices, often used as a simple protein-rich therapeutic food.',
    dosha: 'Tridoshic', mealType: 'Lunch', season: ['All Seasons'],
    prepTime: '10 min', cookTime: '35 min', servings: 3,
    ingredients: [
      { item: 'Split yellow mung dal', quantity: '1/2 cup' },
      { item: 'Water', quantity: '4 cups' },
      { item: 'Ghee', quantity: '1 tsp' },
      { item: 'Cumin', quantity: '1/2 tsp' },
      { item: 'Fresh ginger', quantity: '1 tsp', note: 'grated' },
      { item: 'Rock salt', quantity: 'to taste' }
    ],
    instructions: ['Wash mung dal until water runs clear.', 'Cook with water until soft.', 'Temper cumin and ginger in ghee.', 'Add tempering to soup and simmer 5 minutes.', 'Serve warm.'],
    benefits: ['Light protein', 'Supports digestion', 'Often tolerated during simple diets'],
    contraindications: ['Add more ghee for dry Vata constitutions'],
    source: 'Bhavaprakasha; traditional mudga preparations',
    reviewStatus: 'seed_reviewed',
    confidence: 0.76
  },
  {
    id: 'r25', name: 'Pomegranate Digestive Chutney', sanskritName: 'Dadima Pachadi',
    description: 'A sweet-sour digestive chutney using pomegranate, cumin, and mint for a bright lunch accompaniment.',
    dosha: 'Pitta', mealType: 'Snack', season: ['Summer', 'Autumn'],
    prepTime: '10 min', cookTime: '0 min', servings: 4,
    ingredients: [
      { item: 'Pomegranate arils', quantity: '1 cup' },
      { item: 'Fresh mint', quantity: '1/4 cup' },
      { item: 'Roasted cumin powder', quantity: '1/2 tsp' },
      { item: 'Rock salt', quantity: '1 pinch' },
      { item: 'Lime juice', quantity: '1 tsp', note: 'optional' }
    ],
    instructions: ['Pulse ingredients briefly into a coarse chutney.', 'Taste and adjust salt.', 'Serve fresh with rice, mung soup, or flatbread.'],
    benefits: ['Supports appetite', 'Cooling and refreshing', 'Traditionally valued for digestion'],
    contraindications: ['Use lime sparingly for high Pitta acidity'],
    source: 'Traditional Ayurvedic dietetics; dadima as pathya fruit',
    reviewStatus: 'seed_reviewed',
    confidence: 0.7
  },
  {
    id: 'r26', name: 'Amla Ginger Relish', sanskritName: 'Amalaki Adrak Leha',
    description: 'A small digestive relish combining sour amla with ginger and mild sweetener.',
    dosha: 'Tridoshic', mealType: 'Snack', season: ['Winter', 'Spring'],
    prepTime: '15 min', cookTime: '8 min', servings: 8,
    ingredients: [
      { item: 'Fresh amla', quantity: '6', note: 'chopped or grated' },
      { item: 'Fresh ginger', quantity: '1 tbsp', note: 'grated' },
      { item: 'Jaggery', quantity: '2 tbsp' },
      { item: 'Cumin powder', quantity: '1/2 tsp' },
      { item: 'Rock salt', quantity: '1 pinch' }
    ],
    instructions: ['Cook amla with a splash of water until soft.', 'Add ginger, jaggery, cumin, and salt.', 'Simmer until relish-like.', 'Cool and use in small portions.'],
    benefits: ['Amla is traditionally rasayana', 'Stimulates appetite gently', 'Adds sour taste without heaviness'],
    contraindications: ['Use cautiously with reflux or sugar restriction'],
    source: 'Traditional amalaki household preparation',
    reviewStatus: 'seed_reviewed',
    confidence: 0.69
  },
  {
    id: 'r27', name: 'Jeera Rice', sanskritName: 'Jiraka Anna',
    description: 'Simple cumin rice for a light lunch base, especially useful when paired with mung soup or vegetables.',
    dosha: 'Tridoshic', mealType: 'Lunch', season: ['All Seasons'],
    prepTime: '10 min', cookTime: '20 min', servings: 3,
    ingredients: [
      { item: 'Basmati rice', quantity: '1 cup' },
      { item: 'Ghee', quantity: '1 tbsp' },
      { item: 'Cumin seeds', quantity: '1 tsp' },
      { item: 'Water', quantity: '2 cups' },
      { item: 'Rock salt', quantity: 'to taste' }
    ],
    instructions: ['Rinse and soak rice 15 minutes.', 'Warm ghee and toast cumin until aromatic.', 'Add drained rice and water.', 'Cook covered until tender.', 'Rest 5 minutes before serving.'],
    benefits: ['Simple digestible carbohydrate', 'Cumin supports agni', 'Pairs with most dosha-specific meals'],
    contraindications: ['Use less ghee for Kapha'],
    source: 'Traditional Ayurvedic kitchen preparation',
    reviewStatus: 'seed_reviewed',
    confidence: 0.72
  },
  {
    id: 'r28', name: 'Stewed Apples with Clove', sanskritName: 'Sevaphala Paka',
    description: 'Warm cooked apple with clove and cinnamon, a gentle breakfast or snack for Vata mornings.',
    dosha: 'Vata', mealType: 'Breakfast', season: ['Autumn', 'Winter'],
    prepTime: '5 min', cookTime: '12 min', servings: 2,
    ingredients: [
      { item: 'Apples', quantity: '2', note: 'peeled and chopped' },
      { item: 'Water', quantity: '1/2 cup' },
      { item: 'Clove', quantity: '1' },
      { item: 'Cinnamon', quantity: '1/4 tsp' },
      { item: 'Ghee', quantity: '1/2 tsp', note: 'optional' }
    ],
    instructions: ['Simmer apples with water and clove until soft.', 'Remove clove.', 'Stir in cinnamon and optional ghee.', 'Serve warm.'],
    benefits: ['Warm and easy to digest', 'Helpful as a light morning food', 'Grounds dry Vata qualities'],
    contraindications: ['May be too sweet for Kapha if overused'],
    source: 'Traditional Ayurvedic breakfast practice',
    reviewStatus: 'seed_reviewed',
    confidence: 0.68
  },
  {
    id: 'r29', name: 'Cilantro Coconut Chutney', sanskritName: 'Dhanyaka Narikela Chutney',
    description: 'A fresh cooling chutney for summer meals with cilantro, coconut, cumin, and lime.',
    dosha: 'Pitta', mealType: 'Snack', season: ['Summer'],
    prepTime: '10 min', cookTime: '0 min', servings: 6,
    ingredients: [
      { item: 'Fresh cilantro', quantity: '1 cup' },
      { item: 'Fresh coconut', quantity: '1/2 cup' },
      { item: 'Cumin powder', quantity: '1/2 tsp' },
      { item: 'Lime juice', quantity: '1 tsp' },
      { item: 'Rock salt', quantity: 'to taste' }
    ],
    instructions: ['Blend all ingredients with a little water.', 'Keep texture slightly coarse.', 'Serve fresh with rice or mung pancakes.'],
    benefits: ['Cooling accompaniment', 'Supports taste and appetite', 'Balances rich or spicy foods'],
    contraindications: ['Coconut may be heavy for Kapha when used often'],
    source: 'Traditional Ayurvedic household recipe',
    reviewStatus: 'seed_reviewed',
    confidence: 0.68
  },
  {
    id: 'r30', name: 'Barley Vegetable Soup', sanskritName: 'Yava Shaka Yusha',
    description: 'A light Kapha-friendly soup with barley, vegetables, ginger, and black pepper.',
    dosha: 'Kapha', mealType: 'Dinner', season: ['Spring', 'Winter'],
    prepTime: '15 min', cookTime: '45 min', servings: 4,
    ingredients: [
      { item: 'Pearled barley', quantity: '1/2 cup' },
      { item: 'Mixed vegetables', quantity: '2 cups', note: 'carrot, celery, greens' },
      { item: 'Fresh ginger', quantity: '1 tbsp' },
      { item: 'Black pepper', quantity: '1/4 tsp' },
      { item: 'Water or vegetable broth', quantity: '5 cups' }
    ],
    instructions: ['Rinse barley.', 'Simmer barley with water until tender.', 'Add vegetables and ginger.', 'Cook until vegetables soften.', 'Season with pepper and salt.'],
    benefits: ['Barley is traditionally Kapha-reducing', 'Light dinner option', 'Supports satiety without heaviness'],
    contraindications: ['Not ideal for very dry Vata unless enriched with ghee'],
    source: 'Charaka Samhita dietary references to yava; traditional soup adaptation',
    reviewStatus: 'seed_reviewed',
    confidence: 0.74
  },
  {
    id: 'r31', name: 'Fennel Rose Cooler', sanskritName: 'Madhurika Gulab Pana',
    description: 'A gentle summer infusion with fennel and rose for a cooling, aromatic beverage.',
    dosha: 'Pitta', mealType: 'Beverage', season: ['Summer'],
    prepTime: '5 min', cookTime: '10 min', servings: 3,
    ingredients: [
      { item: 'Fennel seeds', quantity: '1 tbsp' },
      { item: 'Water', quantity: '3 cups' },
      { item: 'Rose water', quantity: '1 tsp', note: 'food grade' },
      { item: 'Rock sugar', quantity: '1 tsp', note: 'optional' }
    ],
    instructions: ['Steep fennel seeds in hot water for 10 minutes.', 'Strain and cool to room temperature.', 'Add rose water and optional rock sugar.', 'Serve cool, not iced.'],
    benefits: ['Cooling', 'Supports digestion gently', 'Useful in hot weather routines'],
    contraindications: ['Avoid iced serving for weak digestion'],
    source: 'Traditional fennel and rose summer preparation',
    reviewStatus: 'seed_reviewed',
    confidence: 0.67
  },
  {
    id: 'r32', name: 'Sesame Date Ladoo', sanskritName: 'Tila Kharjura Modaka',
    description: 'A nourishing no-refined-sugar sweet made with sesame, dates, cardamom, and ghee.',
    dosha: 'Vata', mealType: 'Dessert', season: ['Winter', 'Autumn'],
    prepTime: '20 min', cookTime: '5 min', servings: 10,
    ingredients: [
      { item: 'Sesame seeds', quantity: '1 cup' },
      { item: 'Dates', quantity: '1 cup', note: 'pitted' },
      { item: 'Ghee', quantity: '1 tbsp' },
      { item: 'Cardamom', quantity: '1/4 tsp' }
    ],
    instructions: ['Toast sesame lightly.', 'Pulse dates into a paste.', 'Mix sesame, date paste, ghee, and cardamom.', 'Roll into small balls.', 'Store airtight.'],
    benefits: ['Nourishing and grounding', 'Sesame supports Vata season routines', 'Good travel snack in small portions'],
    contraindications: ['Heavy for Kapha', 'Use cautiously with blood sugar concerns'],
    source: 'Traditional tila and kharjura household sweet',
    reviewStatus: 'seed_reviewed',
    confidence: 0.68
  }
];
