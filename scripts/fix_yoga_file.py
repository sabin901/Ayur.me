#!/usr/bin/env python3
"""
Fix the corrupted yoga poses file by recreating it properly
"""

def fix_yoga_file():
    """Recreate the yoga poses file with proper structure"""
    
    file_path = "../src/assets/comprehensiveYogaPoses.ts"
    
    # Create the proper file content
    content = '''export interface YogaPose {
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

export const comprehensiveYogaPoses: YogaPose[] = [
  // Sattvic Poses (Calm, Spiritual, Meditative)
  {
    id: 'sukhasana',
    name: 'Easy Pose',
    sanskrit: 'Sukhasana',
    category: 'Seated',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '5-15 mins',
    difficulty: 'Beginner',
    benefits: [
      'Opens hips and groin',
      'Improves posture',
      'Calms the mind',
      'Reduces stress and anxiety',
      'Strengthens back muscles',
      'Promotes meditation'
    ],
    description: 'A comfortable cross-legged sitting pose that promotes calmness and is perfect for meditation and pranayama practice.',
    image: '/yoga-poses/easy-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Sit on a yoga mat or cushion with your legs extended in front of you.',
        image: '/yoga-poses/easy-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Cross your legs at the shins, bringing each foot under the opposite knee.',
        image: '/yoga-poses/easy-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Place your hands on your knees with palms facing up or down, or in a mudra position.',
        image: '/yoga-poses/easy-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Lengthen your spine, lift your chest, and relax your shoulders away from your ears.',
        image: '/yoga-poses/easy-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Close your eyes and focus on your breath, maintaining the pose for 5-15 minutes.',
        image: '/yoga-poses/easy-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Excellent for meditation and pranayama practice',
      'Calms the nervous system and reduces stress',
      'Improves posture and spinal alignment',
      'Opens the hips and improves flexibility',
      'Promotes mental clarity and focus'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming Vata energy. Practice with a cushion for support and focus on steady breathing.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment and maintain for longer periods.',
      kapha: 'Good for meditation but avoid staying too long to prevent lethargy. Practice with energizing breath awareness.'
    },
    contraindications: ['Knee injuries', 'Hip problems', 'Ankle injuries'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Hatha Yoga Pradipika'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'siddhasana',
    name: 'Accomplished Pose',
    sanskrit: 'Siddhasana',
    category: 'Seated',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '10-30 mins',
    difficulty: 'Intermediate',
    benefits: [
      'Stabilizes energy flow',
      'Improves concentration',
      'Opens hips and groin',
      'Strengthens spine',
      'Promotes deep meditation',
      'Balances chakras'
    ],
    description: 'A powerful meditation pose that creates a stable foundation for spiritual practice and deep meditation.',
    image: '/yoga-poses/accomplished-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Sit on a yoga mat with your legs extended in front of you.',
        image: '/yoga-poses/accomplished-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Bend your left knee and place your left foot against your right thigh.',
        image: '/yoga-poses/accomplished-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Bend your right knee and place your right foot on top of your left ankle.',
        image: '/yoga-poses/accomplished-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Place your hands on your knees in chin mudra or simply rest them on your knees.',
        image: '/yoga-poses/accomplished-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Lengthen your spine, lift your chest, and focus on your breath.',
        image: '/yoga-poses/accomplished-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Excellent for meditation and spiritual practice',
      'Stabilizes energy flow and balances chakras',
      'Improves concentration and focus',
      'Strengthens spine and improves posture',
      'Promotes deep meditation and inner peace'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and stabilizing Vata energy. Practice with steady breathing and focus.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment.',
      kapha: 'Good for meditation but avoid staying too long to prevent lethargy.'
    },
    contraindications: ['Knee injuries', 'Hip problems', 'Ankle injuries'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Hatha Yoga Pradipika'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'padmasana',
    name: 'Lotus Pose',
    sanskrit: 'Padmasana',
    category: 'Seated',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '10-30 mins',
    difficulty: 'Advanced',
    benefits: [
      'Stabilizes energy flow',
      'Improves concentration',
      'Opens hips and groin',
      'Strengthens spine',
      'Promotes deep meditation',
      'Balances chakras'
    ],
    description: 'The classic meditation pose that creates a stable foundation for spiritual practice and deep meditation.',
    image: '/yoga-poses/lotus-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Sit on a yoga mat with your legs extended in front of you.',
        image: '/yoga-poses/lotus-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Bend your right knee and place your right foot on your left thigh, as close to your hip as possible.',
        image: '/yoga-poses/lotus-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Bend your left knee and place your left foot on your right thigh, as close to your hip as possible.',
        image: '/yoga-poses/lotus-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Place your hands on your knees in chin mudra or simply rest them on your knees.',
        image: '/yoga-poses/lotus-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Lengthen your spine, lift your chest, and focus on your breath.',
        image: '/yoga-poses/lotus-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Excellent for meditation and spiritual practice',
      'Stabilizes energy flow and balances chakras',
      'Improves concentration and focus',
      'Strengthens spine and improves posture',
      'Promotes deep meditation and inner peace'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and stabilizing Vata energy. Practice with steady breathing and focus.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment.',
      kapha: 'Good for meditation but avoid staying too long to prevent lethargy.'
    },
    contraindications: ['Knee injuries', 'Hip problems', 'Ankle injuries'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Hatha Yoga Pradipika'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'tadasana',
    name: 'Mountain Pose',
    sanskrit: 'Tadasana',
    category: 'Standing',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '1-5 mins',
    difficulty: 'Beginner',
    benefits: [
      'Improves posture',
      'Strengthens legs',
      'Increases awareness',
      'Calms the mind',
      'Grounds the body',
      'Promotes balance'
    ],
    description: 'The foundation of all standing poses, Mountain Pose teaches proper alignment and grounding.',
    image: '/yoga-poses/mountain-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Stand with your feet together, big toes touching, heels slightly apart.',
        image: '/yoga-poses/mountain-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Lift your kneecaps and engage your thigh muscles.',
        image: '/yoga-poses/mountain-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Lengthen your spine, lift your chest, and roll your shoulders back and down.',
        image: '/yoga-poses/mountain-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Let your arms hang naturally at your sides with palms facing forward.',
        image: '/yoga-poses/mountain-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold the pose for 1-5 minutes, focusing on your breath and alignment.',
        image: '/yoga-poses/mountain-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Improves posture and spinal alignment',
      'Strengthens legs and core muscles',
      'Increases body awareness and mindfulness',
      'Calms the nervous system',
      'Promotes balance and stability'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and stabilizing Vata energy. Focus on steady breathing and feeling rooted.',
      pitta: 'Perfect for cooling and calming Pitta. Practice with cooling breath awareness.',
      kapha: 'Good for building energy and awareness. Practice with energizing breath.'
    },
    contraindications: ['Balance issues', 'Dizziness'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'viparita-karani',
    name: 'Legs-Up-the-Wall',
    sanskrit: 'Viparita Karani',
    category: 'Restorative',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '5-20 mins',
    difficulty: 'Beginner',
    benefits: [
      'Relieves tired legs',
      'Calms the mind',
      'Reduces stress',
      'Improves circulation',
      'Promotes relaxation',
      'Helps with insomnia'
    ],
    description: 'A gentle restorative pose that relieves tired legs and calms the nervous system.',
    image: '/yoga-poses/legs-up-the-wall.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Sit close to a wall with your side facing the wall.',
        image: '/yoga-poses/legs-up-the-wall-step1.html'
      },
      {
        step: 2,
        instruction: 'Swing your legs up the wall as you lie back on the floor.',
        image: '/yoga-poses/legs-up-the-wall-step2.html'
      },
      {
        step: 3,
        instruction: 'Adjust your position so your sitting bones are close to the wall.',
        image: '/yoga-poses/legs-up-the-wall-step3.html'
      },
      {
        step: 4,
        instruction: 'Place your arms at your sides with palms facing up.',
        image: '/yoga-poses/legs-up-the-wall-step4.html'
      },
      {
        step: 5,
        instruction: 'Close your eyes and relax for 5-20 minutes.',
        image: '/yoga-poses/legs-up-the-wall-step5.html'
      }
    ],
    therapeuticUses: [
      'Relieves tired legs and feet',
      'Calms the nervous system and reduces stress',
      'Improves circulation and lymphatic drainage',
      'Promotes relaxation and better sleep',
      'Helps with insomnia and anxiety'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming Vata energy. Practice with steady breathing.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment.',
      kapha: 'Good for relaxation but avoid staying too long to prevent lethargy.'
    },
    contraindications: ['Eye problems', 'Heart conditions', 'Pregnancy (third trimester)'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'balasana',
    name: 'Child\'s Pose',
    sanskrit: 'Balasana',
    category: 'Restorative',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '1-5 mins',
    difficulty: 'Beginner',
    benefits: [
      'Calms the mind',
      'Stretches hips and thighs',
      'Relieves back pain',
      'Reduces stress',
      'Promotes relaxation',
      'Gentle on the body'
    ],
    description: 'A gentle resting pose that calms the mind and gently stretches the hips and thighs.',
    image: '/yoga-poses/childs-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Kneel on the floor with your big toes touching and knees hip-width apart.',
        image: '/yoga-poses/childs-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Sit back on your heels and fold forward from your hips.',
        image: '/yoga-poses/childs-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Lay your torso between your thighs and rest your forehead on the floor.',
        image: '/yoga-poses/childs-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Extend your arms forward with palms facing down, or rest them at your sides.',
        image: '/yoga-poses/childs-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold for 1-5 minutes, breathing deeply and relaxing completely.',
        image: '/yoga-poses/childs-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Calms the nervous system and reduces stress',
      'Gently stretches hips, thighs, and ankles',
      'Relieves back pain and tension',
      'Promotes relaxation and better sleep',
      'Gentle restorative pose for all levels'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming Vata energy. Practice with steady breathing.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment.',
      kapha: 'Good for relaxation but avoid staying too long to prevent lethargy.'
    },
    contraindications: ['Knee injuries', 'Pregnancy (third trimester)'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'savasana',
    name: 'Corpse Pose',
    sanskrit: 'Savasana',
    category: 'Restorative',
    guna: 'Sattvic',
    dosha: 'All Doshas',
    duration: '5-20 mins',
    difficulty: 'Beginner',
    benefits: [
      'Deep relaxation',
      'Reduces stress',
      'Calms the mind',
      'Improves sleep',
      'Promotes healing',
      'Restores energy'
    ],
    description: 'The ultimate relaxation pose that allows the body and mind to completely rest and restore.',
    image: '/yoga-poses/corpse-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Lie on your back with your legs extended and arms at your sides.',
        image: '/yoga-poses/corpse-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Let your feet fall naturally to the sides.',
        image: '/yoga-poses/corpse-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Place your arms at your sides with palms facing up.',
        image: '/yoga-poses/corpse-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Close your eyes and relax your entire body.',
        image: '/yoga-poses/corpse-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Focus on your breath and allow yourself to completely relax for 5-20 minutes.',
        image: '/yoga-poses/corpse-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Deep relaxation and stress reduction',
      'Calms the nervous system',
      'Improves sleep quality',
      'Promotes healing and recovery',
      'Restores energy and vitality'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming Vata energy. Practice with steady breathing.',
      pitta: 'Perfect for cooling and calming Pitta. Practice in a cool environment.',
      kapha: 'Good for relaxation but avoid staying too long to prevent lethargy.'
    },
    contraindications: ['Pregnancy (third trimester)', 'Back problems'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/20 to-gold/20',
    doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'
  },
  {
    id: 'surya-namaskara',
    name: 'Sun Salutation',
    sanskrit: 'Surya Namaskara',
    category: 'Sequence',
    guna: 'Rajasic',
    dosha: 'Kapha',
    duration: '5-10 mins',
    difficulty: 'Beginner',
    benefits: [
      'Energizes the body',
      'Improves circulation',
      'Strengthens muscles',
      'Increases flexibility',
      'Builds stamina',
      'Promotes focus'
    ],
    description: 'A dynamic sequence that energizes the body and builds strength and flexibility.',
    image: '/yoga-poses/sun-salutation.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Start in Mountain Pose (Tadasana) with hands in prayer position.',
        image: '/yoga-poses/sun-salutation-step1.html'
      },
      {
        step: 2,
        instruction: 'Inhale and raise your arms overhead, arching back slightly.',
        image: '/yoga-poses/sun-salutation-step2.html'
      },
      {
        step: 3,
        instruction: 'Exhale and fold forward, bringing your hands to the floor.',
        image: '/yoga-poses/sun-salutation-step3.html'
      },
      {
        step: 4,
        instruction: 'Inhale and step back into Plank Pose, then lower into Chaturanga.',
        image: '/yoga-poses/sun-salutation-step4.html'
      },
      {
        step: 5,
        instruction: 'Exhale and lift into Upward Dog, then press back into Downward Dog.',
        image: '/yoga-poses/sun-salutation-step5.html'
      }
    ],
    therapeuticUses: [
      'Energizes the body and builds stamina',
      'Improves circulation and metabolism',
      'Strengthens muscles and increases flexibility',
      'Promotes focus and concentration',
      'Builds heat and energy in the body'
    ],
    doshaSpecific: {
      vata: 'Practice with grounding awareness and steady breathing. Avoid overexertion.',
      pitta: 'Practice with cooling breath and avoid overheating. Maintain for shorter periods.',
      kapha: 'Excellent for building energy and stimulating metabolism. Practice with dynamic movement.'
    },
    contraindications: ['High blood pressure', 'Heart problems', 'Pregnancy'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-gold/20 to-sage/20',
    doshaColor: 'bg-sage/30 text-sage-800 border-sage-400'
  },
  {
    id: 'virabhadrasana-ii',
    name: 'Warrior II',
    sanskrit: 'Virabhadrasana II',
    category: 'Standing',
    guna: 'Rajasic',
    dosha: 'Kapha',
    duration: '30-60 secs',
    difficulty: 'Intermediate',
    benefits: [
      'Strengthens legs and core',
      'Opens hips and chest',
      'Improves balance',
      'Builds stamina',
      'Energizes the body',
      'Promotes focus'
    ],
    description: 'A powerful standing pose that builds strength and opens the hips and chest.',
    image: '/yoga-poses/warrior-ii.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Start in Mountain Pose (Tadasana) with feet together.',
        image: '/yoga-poses/warrior-ii-step1.html'
      },
      {
        step: 2,
        instruction: 'Step your left foot back about 3-4 feet, keeping your right foot forward.',
        image: '/yoga-poses/warrior-ii-step2.html'
      },
      {
        step: 3,
        instruction: 'Turn your left foot out 90 degrees and your right foot in slightly.',
        image: '/yoga-poses/warrior-ii-step3.html'
      },
      {
        step: 4,
        instruction: 'Bend your right knee to 90 degrees and extend your arms parallel to the floor.',
        image: '/yoga-poses/warrior-ii-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold for 30-60 seconds, then repeat on the other side.',
        image: '/yoga-poses/warrior-ii-step5.html'
      }
    ],
    therapeuticUses: [
      'Strengthens legs and improves balance',
      'Opens hips and chest',
      'Builds stamina and endurance',
      'Promotes focus and concentration',
      'Energizes the body and mind'
    ],
    doshaSpecific: {
      vata: 'Practice with grounding awareness and steady breathing. Avoid overexertion.',
      pitta: 'Practice with cooling breath and avoid overheating. Maintain for shorter periods.',
      kapha: 'Excellent for building strength and energy. Practice with dynamic movement.'
    },
    contraindications: ['Knee injuries', 'High blood pressure', 'Heart problems'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-gold/20 to-sage/20',
    doshaColor: 'bg-sage/30 text-sage-800 border-sage-400'
  },
  {
    id: 'utkatasana',
    name: 'Chair Pose',
    sanskrit: 'Utkatasana',
    category: 'Standing',
    guna: 'Rajasic',
    dosha: 'Kapha',
    duration: '30-60 secs',
    difficulty: 'Intermediate',
    benefits: [
      'Strengthens legs and core',
      'Opens chest and shoulders',
      'Improves balance',
      'Builds stamina',
      'Energizes the body',
      'Promotes focus'
    ],
    description: 'A powerful standing pose that builds strength in the legs and core.',
    image: '/yoga-poses/chair-pose.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Start in Mountain Pose (Tadasana) with feet together.',
        image: '/yoga-poses/chair-pose-step1.html'
      },
      {
        step: 2,
        instruction: 'Bend your knees and lower your hips as if sitting in a chair.',
        image: '/yoga-poses/chair-pose-step2.html'
      },
      {
        step: 3,
        instruction: 'Raise your arms overhead, palms facing each other.',
        image: '/yoga-poses/chair-pose-step3.html'
      },
      {
        step: 4,
        instruction: 'Keep your chest lifted and your weight in your heels.',
        image: '/yoga-poses/chair-pose-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold for 30-60 seconds, then return to Mountain Pose.',
        image: '/yoga-poses/chair-pose-step5.html'
      }
    ],
    therapeuticUses: [
      'Strengthens legs and core muscles',
      'Opens chest and shoulders',
      'Builds stamina and endurance',
      'Promotes focus and concentration',
      'Energizes the body and mind'
    ],
    doshaSpecific: {
      vata: 'Practice with grounding awareness and steady breathing. Avoid overexertion.',
      pitta: 'Practice with cooling breath and avoid overheating. Maintain for shorter periods.',
      kapha: 'Excellent for building strength and energy. Practice with dynamic movement.'
    },
    contraindications: ['Knee injuries', 'High blood pressure', 'Heart problems'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-gold/20 to-sage/20',
    doshaColor: 'bg-sage/30 text-sage-800 border-sage-400'
  },
  {
    id: 'paschimottanasana',
    name: 'Seated Forward Bend',
    sanskrit: 'Paschimottanasana',
    category: 'Seated Forward Bend',
    guna: 'Tamasic',
    dosha: 'Vata',
    duration: '30-60 secs',
    difficulty: 'Beginner',
    benefits: [
      'Calms the mind',
      'Stretches hamstrings',
      'Opens hips',
      'Reduces stress',
      'Improves digestion',
      'Promotes relaxation'
    ],
    description: 'A gentle forward bend that calms the mind and stretches the hamstrings.',
    image: '/yoga-poses/seated-forward-bend.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Sit on the ground with your legs extended in front of you.',
        image: '/yoga-poses/seated-forward-bend-step1.html'
      },
      {
        step: 2,
        instruction: 'Inhale and lengthen your spine, lifting your chest.',
        image: '/yoga-poses/seated-forward-bend-step2.html'
      },
      {
        step: 3,
        instruction: 'Exhale and fold forward from your hips, reaching toward your feet.',
        image: '/yoga-poses/seated-forward-bend-step3.html'
      },
      {
        step: 4,
        instruction: 'Hold your feet or ankles, or place your hands on your legs.',
        image: '/yoga-poses/seated-forward-bend-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold for 30-60 seconds, breathing deeply and relaxing.',
        image: '/yoga-poses/seated-forward-bend-step5.html'
      }
    ],
    therapeuticUses: [
      'Calms the nervous system and reduces stress',
      'Stretches hamstrings and improves flexibility',
      'Opens hips and improves posture',
      'Improves digestion and metabolism',
      'Promotes relaxation and sleep'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming. Practice with steady breathing and gentle stretching.',
      pitta: 'Good for cooling and calming. Practice in a cool environment.',
      kapha: 'Practice with energizing breath awareness to avoid lethargy.'
    },
    contraindications: ['Back injuries', 'Hip problems'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/30 to-gold/30',
    doshaColor: 'bg-sage/20 text-sage-800 border-sage-300'
  },
  {
    id: 'uttanasana',
    name: 'Standing Forward Bend',
    sanskrit: 'Uttanasana',
    category: 'Standing Forward Bend',
    guna: 'Tamasic',
    dosha: 'Vata',
    duration: '30-60 secs',
    difficulty: 'Beginner',
    benefits: [
      'Calms the mind',
      'Stretches hamstrings',
      'Opens hips',
      'Reduces stress',
      'Improves circulation',
      'Promotes relaxation'
    ],
    description: 'A gentle standing forward bend that calms the mind and stretches the hamstrings.',
    image: '/yoga-poses/standing-forward-bend.html',
    stepByStep: [
      {
        step: 1,
        instruction: 'Start in Mountain Pose (Tadasana) with feet together.',
        image: '/yoga-poses/standing-forward-bend-step1.html'
      },
      {
        step: 2,
        instruction: 'Inhale and raise your arms overhead.',
        image: '/yoga-poses/standing-forward-bend-step2.html'
      },
      {
        step: 3,
        instruction: 'Exhale and fold forward from your hips, reaching toward your feet.',
        image: '/yoga-poses/standing-forward-bend-step3.html'
      },
      {
        step: 4,
        instruction: 'Hold your feet or ankles, or place your hands on the floor.',
        image: '/yoga-poses/standing-forward-bend-step4.html'
      },
      {
        step: 5,
        instruction: 'Hold for 30-60 seconds, breathing deeply and relaxing.',
        image: '/yoga-poses/standing-forward-bend-step5.html'
      }
    ],
    therapeuticUses: [
      'Calms the nervous system and reduces stress',
      'Stretches hamstrings and improves flexibility',
      'Opens hips and improves posture',
      'Improves circulation and digestion',
      'Promotes relaxation and sleep'
    ],
    doshaSpecific: {
      vata: 'Excellent for grounding and calming. Practice with steady breathing and gentle stretching.',
      pitta: 'Good for cooling and calming. Practice in a cool environment.',
      kapha: 'Practice with energizing breath awareness to avoid lethargy.'
    },
    contraindications: ['Back injuries', 'High blood pressure'],
    sources: ['Yoga and Ayurveda - David Frawley', 'Light on Yoga - B.K.S. Iyengar'],
    gunaColor: 'from-sage/30 to-gold/30',
    doshaColor: 'bg-sage/20 text-sage-800 border-sage-300'
  }
];

// Helper functions for filtering and searching
export const getPosesByGuna = (guna: string) => {
  return comprehensiveYogaPoses.filter(pose => pose.guna === guna);
};

export const getPosesByDosha = (dosha: string) => {
  return comprehensiveYogaPoses.filter(pose => pose.dosha === dosha);
};

export const getPosesByDifficulty = (difficulty: string) => {
  return comprehensiveYogaPoses.filter(pose => pose.difficulty === difficulty);
};

export const searchPoses = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return comprehensiveYogaPoses.filter(pose => 
    pose.name.toLowerCase().includes(lowercaseQuery) ||
    pose.sanskrit.toLowerCase().includes(lowercaseQuery) ||
    pose.description.toLowerCase().includes(lowercaseQuery)
  );
};
'''
    
    # Write the content to the file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Fixed yoga poses file with proper structure")
    print("Now have 12 unique poses with visual features")

if __name__ == "__main__":
    fix_yoga_file() 