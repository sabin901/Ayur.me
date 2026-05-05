#!/usr/bin/env python3
"""
Add missing poses to the comprehensive yoga poses data
"""

import re

def add_missing_poses():
    """Add missing poses that have images but are not in the data"""
    
    file_path = "../src/assets/comprehensiveYogaPoses.ts"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define the missing poses
    missing_poses = [
        {
            "id": "virabhadrasana-i",
            "name": "Warrior I",
            "sanskrit": "Virabhadrasana I",
            "category": "Standing",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "30-60 secs",
            "difficulty": "Intermediate",
            "benefits": [
                "Strengthens legs and core",
                "Opens chest and shoulders",
                "Improves balance and focus",
                "Builds stamina and endurance",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "description": "A powerful standing pose that builds strength and focus while opening the chest and shoulders.",
            "image": "/yoga-poses/warrior-i.html",
            "stepByStep": [
                {"step": 1, "instruction": "Start in Mountain Pose (Tadasana) with feet together.", "image": "/yoga-poses/warrior-i-step1.html"},
                {"step": 2, "instruction": "Step your left foot back about 3-4 feet, keeping your right foot forward.", "image": "/yoga-poses/warrior-i-step2.html"},
                {"step": 3, "instruction": "Bend your right knee to 90 degrees, keeping your knee over your ankle.", "image": "/yoga-poses/warrior-i-step3.html"},
                {"step": 4, "instruction": "Raise your arms overhead, palms facing each other, and lift your chest.", "image": "/yoga-poses/warrior-i-step4.html"},
                {"step": 5, "instruction": "Hold the pose for 30-60 seconds, then repeat on the other side.", "image": "/yoga-poses/warrior-i-step5.html"}
            ],
            "therapeuticUses": [
                "Strengthens legs and improves balance",
                "Opens chest and improves posture",
                "Builds stamina and endurance",
                "Promotes focus and concentration",
                "Energizes the body and mind"
            ],
            "doshaSpecific": {
                "vata": "Practice with grounding awareness and steady breathing. Avoid overexertion.",
                "pitta": "Practice with cooling breath and avoid overheating. Maintain for shorter periods.",
                "kapha": "Excellent for building strength and energy. Practice with dynamic movement."
            },
            "contraindications": ["Knee injuries", "High blood pressure", "Heart problems"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "virabhadrasana-iii",
            "name": "Warrior III",
            "sanskrit": "Virabhadrasana III",
            "category": "Standing",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "20-40 secs",
            "difficulty": "Advanced",
            "benefits": [
                "Improves balance and focus",
                "Strengthens legs and core",
                "Opens chest and shoulders",
                "Builds concentration",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "description": "A challenging balancing pose that requires focus, strength, and concentration.",
            "image": "/yoga-poses/warrior-iii.html",
            "stepByStep": [
                {"step": 1, "instruction": "Start in Mountain Pose (Tadasana) with feet together.", "image": "/yoga-poses/warrior-iii-step1.html"},
                {"step": 2, "instruction": "Shift your weight to your right foot and lift your left leg behind you.", "image": "/yoga-poses/warrior-iii-step2.html"},
                {"step": 3, "instruction": "Extend your arms forward and parallel to the ground.", "image": "/yoga-poses/warrior-iii-step3.html"},
                {"step": 4, "instruction": "Keep your body in one straight line from head to heel.", "image": "/yoga-poses/warrior-iii-step4.html"},
                {"step": 5, "instruction": "Hold for 20-40 seconds, then repeat on the other side.", "image": "/yoga-poses/warrior-iii-step5.html"}
            ],
            "therapeuticUses": [
                "Improves balance and coordination",
                "Strengthens legs and core muscles",
                "Builds focus and concentration",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "doshaSpecific": {
                "vata": "Practice with grounding awareness and steady breathing. Focus on stability.",
                "pitta": "Practice with cooling breath and avoid overexertion. Maintain for shorter periods.",
                "kapha": "Excellent for building strength and energy. Practice with dynamic movement."
            },
            "contraindications": ["Knee injuries", "Balance issues", "High blood pressure"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "vasisthasana",
            "name": "Side Plank",
            "sanskrit": "Vasisthasana",
            "category": "Arm Balance",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "20-40 secs",
            "difficulty": "Advanced",
            "benefits": [
                "Strengthens arms and shoulders",
                "Builds core strength",
                "Improves balance",
                "Opens chest and hips",
                "Builds confidence",
                "Energizes the body"
            ],
            "description": "A challenging arm balance that builds strength in the arms, shoulders, and core.",
            "image": "/yoga-poses/side-plank.html",
            "stepByStep": [
                {"step": 1, "instruction": "Start in Plank Pose with your body in a straight line.", "image": "/yoga-poses/side-plank-step1.html"},
                {"step": 2, "instruction": "Shift your weight to your right hand and rotate your body to the left.", "image": "/yoga-poses/side-plank-step2.html"},
                {"step": 3, "instruction": "Stack your left foot on top of your right foot and extend your left arm up.", "image": "/yoga-poses/side-plank-step3.html"},
                {"step": 4, "instruction": "Keep your body in one straight line from head to feet.", "image": "/yoga-poses/side-plank-step4.html"},
                {"step": 5, "instruction": "Hold for 20-40 seconds, then repeat on the other side.", "image": "/yoga-poses/side-plank-step5.html"}
            ],
            "therapeuticUses": [
                "Strengthens arms, shoulders, and core",
                "Improves balance and coordination",
                "Builds confidence and focus",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "doshaSpecific": {
                "vata": "Practice with grounding awareness and steady breathing. Focus on stability.",
                "pitta": "Practice with cooling breath and avoid overexertion. Maintain for shorter periods.",
                "kapha": "Excellent for building strength and energy. Practice with dynamic movement."
            },
            "contraindications": ["Wrist injuries", "Shoulder problems", "High blood pressure"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "bakasana",
            "name": "Crow Pose",
            "sanskrit": "Bakasana",
            "category": "Arm Balance",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "10-30 secs",
            "difficulty": "Advanced",
            "benefits": [
                "Strengthens arms and wrists",
                "Builds core strength",
                "Improves balance",
                "Builds confidence",
                "Energizes the body",
                "Promotes focus"
            ],
            "description": "A challenging arm balance that requires strength, balance, and focus.",
            "image": "/yoga-poses/crow-pose.html",
            "stepByStep": [
                {"step": 1, "instruction": "Start in a squat position with your feet together.", "image": "/yoga-poses/crow-pose-step1.html"},
                {"step": 2, "instruction": "Place your hands on the ground shoulder-width apart, fingers spread.", "image": "/yoga-poses/crow-pose-step2.html"},
                {"step": 3, "instruction": "Bend your elbows and place your knees on the back of your upper arms.", "image": "/yoga-poses/crow-pose-step3.html"},
                {"step": 4, "instruction": "Shift your weight forward and lift your feet off the ground.", "image": "/yoga-poses/crow-pose-step4.html"},
                {"step": 5, "instruction": "Hold for 10-30 seconds, then gently lower your feet back down.", "image": "/yoga-poses/crow-pose-step5.html"}
            ],
            "therapeuticUses": [
                "Strengthens arms, wrists, and core",
                "Improves balance and coordination",
                "Builds confidence and focus",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "doshaSpecific": {
                "vata": "Practice with grounding awareness and steady breathing. Focus on stability.",
                "pitta": "Practice with cooling breath and avoid overexertion. Maintain for shorter periods.",
                "kapha": "Excellent for building strength and energy. Practice with dynamic movement."
            },
            "contraindications": ["Wrist injuries", "Shoulder problems", "Pregnancy"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "ardha-matsyendrasana",
            "name": "Half Lord of the Fishes",
            "sanskrit": "Ardha Matsyendrasana",
            "category": "Seated Twist",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "30-60 secs",
            "difficulty": "Intermediate",
            "benefits": [
                "Improves spinal flexibility",
                "Stimulates digestion",
                "Opens chest and shoulders",
                "Massages internal organs",
                "Improves posture",
                "Energizes the body"
            ],
            "description": "A seated twist that improves spinal flexibility and stimulates the digestive system.",
            "image": "/yoga-poses/half-lord-of-the-fishes.html",
            "stepByStep": [
                {"step": 1, "instruction": "Sit on the ground with your legs extended in front of you.", "image": "/yoga-poses/half-lord-of-the-fishes-step1.html"},
                {"step": 2, "instruction": "Bend your right knee and place your right foot on the outside of your left knee.", "image": "/yoga-poses/half-lord-of-the-fishes-step2.html"},
                {"step": 3, "instruction": "Place your left hand on your right knee and your right hand behind you.", "image": "/yoga-poses/half-lord-of-the-fishes-step3.html"},
                {"step": 4, "instruction": "Twist your torso to the right, looking over your right shoulder.", "image": "/yoga-poses/half-lord-of-the-fishes-step4.html"},
                {"step": 5, "instruction": "Hold for 30-60 seconds, then repeat on the other side.", "image": "/yoga-poses/half-lord-of-the-fishes-step5.html"}
            ],
            "therapeuticUses": [
                "Improves spinal flexibility and mobility",
                "Stimulates digestion and metabolism",
                "Opens chest and improves posture",
                "Massages internal organs",
                "Energizes the body"
            ],
            "doshaSpecific": {
                "vata": "Practice gently with steady breathing. Avoid over-twisting.",
                "pitta": "Practice with cooling breath and avoid overheating. Maintain for shorter periods.",
                "kapha": "Excellent for stimulating energy and metabolism. Practice with dynamic movement."
            },
            "contraindications": ["Back injuries", "Pregnancy", "Hernia"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "navasana",
            "name": "Boat Pose",
            "sanskrit": "Navasana",
            "category": "Core",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "20-40 secs",
            "difficulty": "Intermediate",
            "benefits": [
                "Strengthens core muscles",
                "Improves balance",
                "Stimulates digestion",
                "Builds confidence",
                "Energizes the body",
                "Promotes focus"
            ],
            "description": "A core-strengthening pose that builds abdominal strength and improves balance.",
            "image": "/yoga-poses/boat-pose.html",
            "stepByStep": [
                {"step": 1, "instruction": "Sit on the ground with your knees bent and feet flat on the floor.", "image": "/yoga-poses/boat-pose-step1.html"},
                {"step": 2, "instruction": "Place your hands behind your knees and lift your feet off the ground.", "image": "/yoga-poses/boat-pose-step2.html"},
                {"step": 3, "instruction": "Straighten your legs and extend your arms forward, parallel to the ground.", "image": "/yoga-poses/boat-pose-step3.html"},
                {"step": 4, "instruction": "Keep your chest lifted and your spine straight.", "image": "/yoga-poses/boat-pose-step4.html"},
                {"step": 5, "instruction": "Hold for 20-40 seconds, then gently lower your feet back down.", "image": "/yoga-poses/boat-pose-step5.html"}
            ],
            "therapeuticUses": [
                "Strengthens core muscles and improves posture",
                "Stimulates digestion and metabolism",
                "Builds confidence and focus",
                "Energizes the body",
                "Promotes mental clarity"
            ],
            "doshaSpecific": {
                "vata": "Practice with grounding awareness and steady breathing. Focus on stability.",
                "pitta": "Practice with cooling breath and avoid overexertion. Maintain for shorter periods.",
                "kapha": "Excellent for building strength and energy. Practice with dynamic movement."
            },
            "contraindications": ["Back injuries", "Pregnancy", "Hernia"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "ustrasana",
            "name": "Camel Pose",
            "sanskrit": "Ustrasana",
            "category": "Backbend",
            "guna": "Rajasic",
            "dosha": "Kapha",
            "duration": "20-40 secs",
            "difficulty": "Intermediate",
            "benefits": [
                "Opens chest and shoulders",
                "Improves posture",
                "Stimulates thyroid",
                "Energizes the body",
                "Builds confidence",
                "Promotes focus"
            ],
            "description": "A backbend that opens the chest and shoulders while energizing the body.",
            "image": "/yoga-poses/camel-pose.html",
            "stepByStep": [
                {"step": 1, "instruction": "Kneel on the ground with your knees hip-width apart.", "image": "/yoga-poses/camel-pose-step1.html"},
                {"step": 2, "instruction": "Place your hands on your lower back with your fingers pointing down.", "image": "/yoga-poses/camel-pose-step2.html"},
                {"step": 3, "instruction": "Lift your chest and arch your back, reaching your hands toward your heels.", "image": "/yoga-poses/camel-pose-step3.html"},
                {"step": 4, "instruction": "Keep your hips over your knees and your neck in a neutral position.", "image": "/yoga-poses/camel-pose-step4.html"},
                {"step": 5, "instruction": "Hold for 20-40 seconds, then gently come back to kneeling.", "image": "/yoga-poses/camel-pose-step5.html"}
            ],
            "therapeuticUses": [
                "Opens chest and improves posture",
                "Stimulates thyroid and metabolism",
                "Energizes the body and mind",
                "Builds confidence and focus",
                "Promotes mental clarity"
            ],
            "doshaSpecific": {
                "vata": "Practice gently with steady breathing. Avoid over-arching.",
                "pitta": "Practice with cooling breath and avoid overheating. Maintain for shorter periods.",
                "kapha": "Excellent for energizing and stimulating. Practice with dynamic movement."
            },
            "contraindications": ["Back injuries", "Neck problems", "High blood pressure"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-gold/20 to-sage/20",
            "doshaColor": "bg-sage/30 text-sage-800 border-sage-400"
        },
        {
            "id": "janu-sirsasana",
            "name": "Head-to-Knee Pose",
            "sanskrit": "Janu Sirsasana",
            "category": "Seated Forward Bend",
            "guna": "Tamasic",
            "dosha": "Vata",
            "duration": "30-60 secs",
            "difficulty": "Beginner",
            "benefits": [
                "Calms the mind",
                "Stretches hamstrings",
                "Opens hips",
                "Reduces stress",
                "Improves digestion",
                "Promotes relaxation"
            ],
            "description": "A gentle forward bend that calms the mind and stretches the hamstrings.",
            "image": "/yoga-poses/head-to-knee-pose.html",
            "stepByStep": [
                {"step": 1, "instruction": "Sit on the ground with your legs extended in front of you.", "image": "/yoga-poses/head-to-knee-pose-step1.html"},
                {"step": 2, "instruction": "Bend your right knee and place the sole of your right foot against your left thigh.", "image": "/yoga-poses/head-to-knee-pose-step2.html"},
                {"step": 3, "instruction": "Inhale and lengthen your spine, lifting your chest.", "image": "/yoga-poses/head-to-knee-pose-step3.html"},
                {"step": 4, "instruction": "Exhale and fold forward from your hips, reaching toward your left foot.", "image": "/yoga-poses/head-to-knee-pose-step4.html"},
                {"step": 5, "instruction": "Hold for 30-60 seconds, then repeat on the other side.", "image": "/yoga-poses/head-to-knee-pose-step5.html"}
            ],
            "therapeuticUses": [
                "Calms the nervous system and reduces stress",
                "Stretches hamstrings and improves flexibility",
                "Opens hips and improves posture",
                "Improves digestion and metabolism",
                "Promotes relaxation and sleep"
            ],
            "doshaSpecific": {
                "vata": "Excellent for grounding and calming. Practice with steady breathing and gentle stretching.",
                "pitta": "Good for cooling and calming. Practice in a cool environment.",
                "kapha": "Practice with energizing breath awareness to avoid lethargy."
            },
            "contraindications": ["Back injuries", "Knee problems", "Hip injuries"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-sage/30 to-gold/30",
            "doshaColor": "bg-sage/20 text-sage-800 border-sage-300"
        },
        {
            "id": "supta-baddha-konasana",
            "name": "Reclined Bound Angle",
            "sanskrit": "Supta Baddha Konasana",
            "category": "Restorative",
            "guna": "Tamasic",
            "dosha": "Vata",
            "duration": "5-15 mins",
            "difficulty": "Beginner",
            "benefits": [
                "Deeply relaxes the body",
                "Opens hips and groin",
                "Calms the mind",
                "Reduces stress",
                "Improves sleep",
                "Promotes healing"
            ],
            "description": "A deeply relaxing restorative pose that opens the hips and promotes healing.",
            "image": "/yoga-poses/reclined-bound-angle.html",
            "stepByStep": [
                {"step": 1, "instruction": "Lie on your back with your knees bent and feet flat on the floor.", "image": "/yoga-poses/reclined-bound-angle-step1.html"},
                {"step": 2, "instruction": "Bring the soles of your feet together and let your knees fall out to the sides.", "image": "/yoga-poses/reclined-bound-angle-step2.html"},
                {"step": 3, "instruction": "Place your arms at your sides with your palms facing up.", "image": "/yoga-poses/reclined-bound-angle-step3.html"},
                {"step": 4, "instruction": "Close your eyes and focus on your breath.", "image": "/yoga-poses/reclined-bound-angle-step4.html"},
                {"step": 5, "instruction": "Hold for 5-15 minutes, allowing your body to deeply relax.", "image": "/yoga-poses/reclined-bound-angle-step5.html"}
            ],
            "therapeuticUses": [
                "Deeply relaxes the nervous system",
                "Opens hips and improves flexibility",
                "Reduces stress and anxiety",
                "Improves sleep quality",
                "Promotes healing and recovery"
            ],
            "doshaSpecific": {
                "vata": "Excellent for grounding and calming. Practice with steady breathing and complete relaxation.",
                "pitta": "Good for cooling and calming. Practice in a cool environment.",
                "kapha": "Practice with energizing breath awareness to avoid lethargy."
            },
            "contraindications": ["Hip injuries", "Knee problems", "Pregnancy (third trimester)"],
            "sources": ["Yoga and Ayurveda - David Frawley", "Light on Yoga - B.K.S. Iyengar"],
            "gunaColor": "from-sage/30 to-gold/30",
            "doshaColor": "bg-sage/20 text-sage-800 border-sage-300"
        }
    ]
    
    # Convert poses to TypeScript format
    pose_strings = []
    for pose in missing_poses:
        pose_str = f"""  {{
    id: '{pose["id"]}',
    name: '{pose["name"]}',
    sanskrit: '{pose["sanskrit"]}',
    category: '{pose["category"]}',
    guna: '{pose["guna"]}',
    dosha: '{pose["dosha"]}',
    duration: '{pose["duration"]}',
    difficulty: '{pose["difficulty"]}',
    benefits: [
      {', '.join([f"'{benefit}'" for benefit in pose["benefits"]])}
    ],
    description: '{pose["description"]}',
    image: '{pose["image"]}',
    stepByStep: [
      {', '.join([f'{{step: {step["step"]}, instruction: "{step["instruction"]}", image: "{step["image"]}"}}' for step in pose["stepByStep"]])}
    ],
    therapeuticUses: [
      {', '.join([f"'{use}'" for use in pose["therapeuticUses"]])}
    ],
    doshaSpecific: {{
      vata: '{pose["doshaSpecific"]["vata"]}',
      pitta: '{pose["doshaSpecific"]["pitta"]}',
      kapha: '{pose["doshaSpecific"]["kapha"]}'
    }},
    contraindications: [{', '.join([f"'{contra}'" for contra in pose["contraindications"]])}],
    sources: [{', '.join([f"'{source}'" for source in pose["sources"]])}],
    gunaColor: '{pose["gunaColor"]}',
    doshaColor: '{pose["doshaColor"]}'
  }}"""
        pose_strings.append(pose_str)
    
    # Find the end of the poses array
    poses_match = re.search(r'export const comprehensiveYogaPoses: YogaPose\[\] = \[(.*?)\];', content, re.DOTALL)
    if not poses_match:
        print("Could not find poses array")
        return
    
    # Add the missing poses before the closing bracket
    new_poses = ',\n' + ',\n'.join(pose_strings)
    
    # Replace the closing bracket with new poses + closing bracket
    new_content = re.sub(
        r'(\];\n)',
        f'{new_poses}\n\\1',
        content
    )
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Added {len(missing_poses)} missing poses:")
    for pose in missing_poses:
        print(f"  - {pose['name']} ({pose['id']})")

if __name__ == "__main__":
    add_missing_poses() 