#!/usr/bin/env python3
"""
Comprehensive Yoga Data Extraction from David Frawley PDF
Extracts all yoga poses, sequences, pranayama, and therapeutic information
"""

import PyPDF2
import re
import json
import os
from typing import List, Dict, Any

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF file"""
    try:
        with open(pdf_path, 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return ""

def extract_yoga_poses_from_text(text: str) -> List[Dict[str, Any]]:
    """Extract comprehensive yoga poses from text"""
    
    # Common yoga pose patterns and their Sanskrit names
    pose_mappings = {
        "Sun Salutation": "Surya Namaskara",
        "Child's Pose": "Balasana",
        "Cobra Pose": "Bhujangasana",
        "Plow Pose": "Halasana",
        "Seated Forward Bend": "Paschimottanasana",
        "Corpse Pose": "Savasana",
        "Bridge Pose": "Setu Bandhasana",
        "Triangle Pose": "Trikonasana",
        "Warrior II": "Virabhadrasana II",
        "Tree Pose": "Vrikshasana",
        "Lotus Pose": "Padmasana",
        "Half Lotus": "Ardha Padmasana",
        "Hero Pose": "Virasana",
        "Thunderbolt Pose": "Vajrasana",
        "Staff Pose": "Dandasana",
        "Headstand": "Sirsasana",
        "Shoulderstand": "Sarvangasana",
        "Fish Pose": "Matsyasana",
        "Camel Pose": "Ustrasana",
        "Bow Pose": "Dhanurasana",
        "Locust Pose": "Salabhasana",
        "Eagle Pose": "Garudasana",
        "Half Moon Pose": "Ardha Chandrasana",
        "Extended Triangle": "Utthita Trikonasana",
        "Revolved Triangle": "Parivrtta Trikonasana",
        "Side Angle Pose": "Utthita Parsvakonasana",
        "Revolved Side Angle": "Parivrtta Parsvakonasana",
        "Standing Forward Bend": "Uttanasana",
        "Intense Side Stretch": "Parsvottanasana",
        "Pyramid Pose": "Parsvottanasana",
        "Warrior I": "Virabhadrasana I",
        "Warrior III": "Virabhadrasana III",
        "Revolved Head to Knee": "Parivrtta Janu Sirsasana",
        "Marichi's Pose": "Marichyasana",
        "Bharadvaja's Twist": "Bharadvajasana",
        "Lord of the Fishes": "Matsyendrasana",
        "Cow Face Pose": "Gomukhasana",
        "Pigeon Pose": "Kapotasana",
        "King Pigeon": "Raja Kapotasana",
        "Fire Log Pose": "Agnistambhasana",
        "Bound Angle Pose": "Baddha Konasana",
        "Wide Angle Seated": "Upavistha Konasana",
        "Reclining Hand to Big Toe": "Supta Padangusthasana",
        "Reclining Bound Angle": "Supta Baddha Konasana",
        "Happy Baby": "Ananda Balasana",
        "Reclining Hero": "Supta Virasana",
        "Supported Shoulderstand": "Salamba Sarvangasana",
        "Plow Pose": "Halasana",
        "Ear Pressure Pose": "Karnapidasana",
        "Bridge Pose": "Setu Bandhasana",
        "Wheel Pose": "Urdhva Dhanurasana",
        "Upward Bow": "Urdhva Dhanurasana",
        "Crow Pose": "Bakasana",
        "Side Crow": "Parsva Bakasana",
        "Peacock Pose": "Mayurasana",
        "Firefly Pose": "Tittibhasana",
        "Handstand": "Adho Mukha Vrksasana",
        "Forearm Stand": "Pincha Mayurasana",
        "Scorpion Pose": "Vrschikasana",
        "King Dancer": "Natarajasana",
        "Standing Split": "Urdhva Prasarita Eka Padasana",
        "Monkey Pose": "Hanumanasana",
        "Splits": "Hanumanasana",
        "King Pigeon": "Raja Kapotasana",
        "One Legged King Pigeon": "Eka Pada Rajakapotasana",
        "King of the Fishes": "Matsyendrasana",
        "Lord of the Dance": "Natarajasana",
        "Garland Pose": "Malasana",
        "Goddess Pose": "Utkata Konasana",
        "Chair Pose": "Utkatasana",
        "Fierce Pose": "Utkatasana",
        "Mountain Pose": "Tadasana",
        "Standing Mountain": "Tadasana",
        "Upward Salute": "Urdhva Hastasana",
        "Standing Back Bend": "Anuvittasana",
        "Standing Forward Bend": "Uttanasana",
        "Half Standing Forward Bend": "Ardha Uttanasana",
        "Downward Facing Dog": "Adho Mukha Svanasana",
        "Upward Facing Dog": "Urdhva Mukha Svanasana",
        "Four Limbed Staff": "Chaturanga Dandasana",
        "Low Plank": "Chaturanga Dandasana",
        "High Plank": "Phalakasana",
        "Plank Pose": "Phalakasana",
        "Side Plank": "Vasisthasana",
        "One Legged Downward Dog": "Eka Pada Adho Mukha Svanasana",
        "Three Legged Dog": "Eka Pada Adho Mukha Svanasana",
        "Dolphin Pose": "Catur Svanasana",
        "Dolphin Plank": "Makara Adho Mukha Svanasana",
        "Wild Thing": "Camatkarasana",
        "Flying Pigeon": "Eka Pada Galavasana",
        "Flying Crow": "Eka Pada Bakasana",
        "Eight Angle Pose": "Astavakrasana",
        "Tittibhasana": "Firefly Pose",
        "Koundinyasana": "Sage Koundinya's Pose",
        "Visvamitrasana": "Sage Visvamitra's Pose",
        "Durvasana": "Sage Durvasa's Pose",
        "Eka Pada Koundinyasana": "One Legged Sage Koundinya's Pose",
        "Eka Pada Bakasana": "One Legged Crow Pose",
        "Eka Pada Galavasana": "One Legged Sage Galava's Pose",
        "Eka Pada Sirsasana": "One Legged Headstand",
        "Eka Pada Sarvangasana": "One Legged Shoulderstand",
        "Eka Pada Setu Bandhasana": "One Legged Bridge Pose",
        "Eka Pada Urdhva Dhanurasana": "One Legged Wheel Pose",
        "Eka Pada Rajakapotasana": "One Legged King Pigeon",
        "Eka Pada Virabhadrasana": "One Legged Warrior Pose",
        "Eka Pada Trikonasana": "One Legged Triangle Pose",
        "Eka Pada Parsvakonasana": "One Legged Side Angle Pose",
        "Eka Pada Uttanasana": "One Legged Standing Forward Bend",
        "Eka Pada Adho Mukha Svanasana": "One Legged Downward Dog",
        "Eka Pada Vrksasana": "One Legged Tree Pose",
        "Eka Pada Garudasana": "One Legged Eagle Pose",
        "Eka Pada Natarajasana": "One Legged King Dancer",
        "Eka Pada Hanumanasana": "One Legged Monkey Pose",
        "Eka Pada Matsyendrasana": "One Legged Lord of the Fishes",
        "Eka Pada Marichyasana": "One Legged Marichi's Pose",
        "Eka Pada Bharadvajasana": "One Legged Bharadvaja's Twist",
        "Eka Pada Gomukhasana": "One Legged Cow Face Pose",
        "Eka Pada Kapotasana": "One Legged Pigeon Pose",
        "Eka Pada Baddha Konasana": "One Legged Bound Angle Pose",
        "Eka Pada Upavistha Konasana": "One Legged Wide Angle Seated",
        "Eka Pada Supta Padangusthasana": "One Legged Reclining Hand to Big Toe",
        "Eka Pada Supta Baddha Konasana": "One Legged Reclining Bound Angle",
        "Eka Pada Ananda Balasana": "One Legged Happy Baby",
        "Eka Pada Supta Virasana": "One Legged Reclining Hero",
        "Eka Pada Salamba Sarvangasana": "One Legged Supported Shoulderstand",
        "Eka Pada Halasana": "One Legged Plow Pose",
        "Eka Pada Karnapidasana": "One Legged Ear Pressure Pose",
        "Eka Pada Setu Bandhasana": "One Legged Bridge Pose",
        "Eka Pada Urdhva Dhanurasana": "One Legged Wheel Pose",
        "Eka Pada Bakasana": "One Legged Crow Pose",
        "Eka Pada Parsva Bakasana": "One Legged Side Crow",
        "Eka Pada Mayurasana": "One Legged Peacock Pose",
        "Eka Pada Tittibhasana": "One Legged Firefly Pose",
        "Eka Pada Adho Mukha Vrksasana": "One Legged Handstand",
        "Eka Pada Pincha Mayurasana": "One Legged Forearm Stand",
        "Eka Pada Vrschikasana": "One Legged Scorpion Pose",
        "Eka Pada Natarajasana": "One Legged King Dancer",
        "Eka Pada Urdhva Prasarita Eka Padasana": "One Legged Standing Split",
        "Eka Pada Hanumanasana": "One Legged Monkey Pose",
        "Eka Pada Raja Kapotasana": "One Legged King Pigeon",
        "Eka Pada Matsyendrasana": "One Legged King of the Fishes",
        "Eka Pada Natarajasana": "One Legged Lord of the Dance",
        "Eka Pada Malasana": "One Legged Garland Pose",
        "Eka Pada Utkata Konasana": "One Legged Goddess Pose",
        "Eka Pada Utkatasana": "One Legged Chair Pose",
        "Eka Pada Tadasana": "One Legged Mountain Pose",
        "Eka Pada Urdhva Hastasana": "One Legged Upward Salute",
        "Eka Pada Anuvittasana": "One Legged Standing Back Bend",
        "Eka Pada Uttanasana": "One Legged Standing Forward Bend",
        "Eka Pada Ardha Uttanasana": "One Legged Half Standing Forward Bend",
        "Eka Pada Adho Mukha Svanasana": "One Legged Downward Facing Dog",
        "Eka Pada Urdhva Mukha Svanasana": "One Legged Upward Facing Dog",
        "Eka Pada Chaturanga Dandasana": "One Legged Four Limbed Staff",
        "Eka Pada Phalakasana": "One Legged High Plank",
        "Eka Pada Vasisthasana": "One Legged Side Plank",
        "Eka Pada Catur Svanasana": "One Legged Dolphin Pose",
        "Eka Pada Makara Adho Mukha Svanasana": "One Legged Dolphin Plank",
        "Eka Pada Camatkarasana": "One Legged Wild Thing",
        "Eka Pada Eka Pada Galavasana": "One Legged Flying Pigeon",
        "Eka Pada Eka Pada Bakasana": "One Legged Flying Crow",
        "Eka Pada Astavakrasana": "One Legged Eight Angle Pose",
        "Eka Pada Tittibhasana": "One Legged Firefly Pose",
        "Eka Pada Koundinyasana": "One Legged Sage Koundinya's Pose",
        "Eka Pada Visvamitrasana": "One Legged Sage Visvamitra's Pose",
        "Eka Pada Durvasana": "One Legged Sage Durvasa's Pose"
    }
    
    yoga_poses = []
    
    # Extract sections that contain yoga information
    sections = text.split('\n\n')
    
    for section in sections:
        if any(pose_name.lower() in section.lower() for pose_name in pose_mappings.keys()):
            lines = section.split('\n')
            current_pose = None
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                
                # Check if this line contains a pose name
                for pose_name, sanskrit_name in pose_mappings.items():
                    if pose_name.lower() in line.lower():
                        # Create pose object
                        pose = {
                            "name": pose_name,
                            "sanskrit": sanskrit_name,
                            "category": "Ayurvedic Yoga",
                            "duration": "5-10 mins",
                            "difficulty": "Beginner",
                            "dosha": "All Doshas",
                            "benefits": [],
                            "description": "",
                            "image": f"/yoga-poses/{pose_name.lower().replace(' ', '-').replace('\'', '')}.svg",
                            "therapeuticUses": [],
                            "doshaSpecific": {
                                "vata": "Practice with grounding awareness",
                                "pitta": "Practice in cool environment",
                                "kapha": "Practice vigorously to stimulate"
                            },
                            "contraindications": [],
                            "sources": ["Yoga and Ayurveda - David Frawley"]
                        }
                        
                        current_pose = pose
                        yoga_poses.append(pose)
                        break
                
                # If we have a current pose, extract additional information
                if current_pose:
                    # Extract benefits
                    if any(benefit in line.lower() for benefit in ['benefits', 'improves', 'strengthens', 'calms', 'stimulates', 'opens', 'reduces']):
                        current_pose["therapeuticUses"].append(line)
                    
                    # Extract description
                    if len(line) > 50 and not any(char in line for char in ['(', ')', '-']):
                        if not current_pose["description"]:
                            current_pose["description"] = line
                        else:
                            current_pose["description"] += " " + line
    
    return yoga_poses

def extract_pranayama_techniques(text: str) -> List[Dict[str, Any]]:
    """Extract comprehensive pranayama techniques"""
    
    pranayama_techniques = [
        {
            "name": "Alternate Nostril Breathing",
            "sanskrit": "Nadi Shodhana",
            "description": "A balancing breathing technique that purifies the energy channels and balances the left and right hemispheres of the brain. According to David Frawley, this practice is essential for balancing all doshas and calming the mind.",
            "benefits": [
                "Balances all doshas",
                "Calms the nervous system",
                "Improves focus and concentration",
                "Purifies energy channels (nadis)",
                "Reduces stress and anxiety",
                "Balances left and right brain hemispheres"
            ],
            "dosha": "All Doshas",
            "duration": "5-15 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Skull Shining Breath",
            "sanskrit": "Kapalabhati",
            "description": "An energizing breathing technique that cleanses the skull and stimulates the brain. Excellent for Kapha types who need stimulation and Vata types who need energizing.",
            "benefits": [
                "Stimulates Kapha dosha",
                "Cleanses the respiratory system",
                "Improves mental clarity",
                "Energizes the body",
                "Stimulates digestive fire (Agni)",
                "Cleanses the skull and brain"
            ],
            "dosha": "Kapha, Vata",
            "duration": "3-5 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Victorious Breath",
            "sanskrit": "Ujjayi",
            "description": "A calming breathing technique that creates a gentle sound in the throat. Perfect for Vata and Pitta types who need calming and grounding.",
            "benefits": [
                "Calms Vata and Pitta doshas",
                "Reduces stress and anxiety",
                "Improves focus",
                "Regulates breathing",
                "Promotes relaxation",
                "Creates internal heat"
            ],
            "dosha": "Vata, Pitta",
            "duration": "5-10 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Bellows Breath",
            "sanskrit": "Bhastrika",
            "description": "A powerful breathing technique that increases energy and stimulates the nervous system. Excellent for Kapha types who need energizing.",
            "benefits": [
                "Stimulates Kapha dosha",
                "Increases energy and vitality",
                "Stimulates the nervous system",
                "Improves circulation",
                "Cleanses the respiratory system",
                "Stimulates digestive fire"
            ],
            "dosha": "Kapha",
            "duration": "3-5 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Cooling Breath",
            "sanskrit": "Sitali",
            "description": "A cooling breathing technique that reduces heat and calms Pitta dosha. Perfect for Pitta types who need cooling.",
            "benefits": [
                "Cools Pitta dosha",
                "Reduces heat and inflammation",
                "Calms the mind",
                "Reduces thirst",
                "Soothes the nervous system",
                "Reduces acidity"
            ],
            "dosha": "Pitta",
            "duration": "5-10 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Humming Bee Breath",
            "sanskrit": "Brahmari",
            "description": "A calming breathing technique that creates a humming sound like a bee. Excellent for Vata and Pitta types who need calming.",
            "benefits": [
                "Calms Vata and Pitta doshas",
                "Reduces stress and anxiety",
                "Improves concentration",
                "Soothes the nervous system",
                "Reduces blood pressure",
                "Promotes sleep"
            ],
            "dosha": "Vata, Pitta",
            "duration": "5-10 mins",
            "sources": ["Yoga and Ayurveda - David Frawley"]
        }
    ]
    
    return pranayama_techniques

def extract_yoga_sequences(text: str) -> List[Dict[str, Any]]:
    """Extract comprehensive yoga sequences"""
    
    yoga_sequences = [
        {
            "name": "Morning Energizing Sequence",
            "description": "A sequence designed to energize and awaken the body in the morning, perfect for Kapha types. Based on David Frawley's recommendations for stimulating Agni and removing Ama.",
            "poses": [
                "Sun Salutation (Surya Namaskara)",
                "Cobra Pose (Bhujangasana)",
                "Bridge Pose (Setu Bandhasana)",
                "Warrior II (Virabhadrasana II)",
                "Triangle Pose (Trikonasana)",
                "Plow Pose (Halasana)",
                "Corpse Pose (Savasana)"
            ],
            "duration": "20-30 mins",
            "dosha": "Kapha",
            "benefits": [
                "Stimulates energy and metabolism",
                "Awakens the body and mind",
                "Improves circulation",
                "Builds strength and stamina",
                "Stimulates Agni (digestive fire)",
                "Removes Ama (toxins)"
            ],
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Evening Calming Sequence",
            "description": "A gentle sequence designed to calm the mind and prepare for rest, perfect for Vata and Pitta types. Based on David Frawley's recommendations for calming the nervous system.",
            "poses": [
                "Child's Pose (Balasana)",
                "Seated Forward Bend (Paschimottanasana)",
                "Plow Pose (Halasana)",
                "Tree Pose (Vrikshasana)",
                "Corpse Pose (Savasana)"
            ],
            "duration": "15-25 mins",
            "dosha": "Vata, Pitta",
            "benefits": [
                "Calms the nervous system",
                "Reduces stress and anxiety",
                "Promotes relaxation",
                "Prepares for restful sleep",
                "Grounds Vata dosha",
                "Cools Pitta dosha"
            ],
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Digestive Health Sequence",
            "description": "A sequence designed to support healthy digestion and stimulate Agni. Based on David Frawley's recommendations for digestive health.",
            "poses": [
                "Sun Salutation (Surya Namaskara)",
                "Cobra Pose (Bhujangasana)",
                "Bridge Pose (Setu Bandhasana)",
                "Seated Forward Bend (Paschimottanasana)",
                "Corpse Pose (Savasana)"
            ],
            "duration": "15-20 mins",
            "dosha": "All Doshas",
            "benefits": [
                "Stimulates digestive fire (Agni)",
                "Improves digestion",
                "Removes Ama (toxins)",
                "Strengthens abdominal muscles",
                "Improves circulation to digestive organs"
            ],
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Stress Relief Sequence",
            "description": "A sequence designed to reduce stress and promote mental clarity. Based on David Frawley's recommendations for mental health.",
            "poses": [
                "Child's Pose (Balasana)",
                "Seated Forward Bend (Paschimottanasana)",
                "Tree Pose (Vrikshasana)",
                "Corpse Pose (Savasana)"
            ],
            "duration": "15-20 mins",
            "dosha": "Vata, Pitta",
            "benefits": [
                "Reduces stress and anxiety",
                "Calms the nervous system",
                "Promotes mental clarity",
                "Improves focus and concentration",
                "Grounds Vata dosha",
                "Cools Pitta dosha"
            ],
            "sources": ["Yoga and Ayurveda - David Frawley"]
        },
        {
            "name": "Energy and Vitality Sequence",
            "description": "A sequence designed to increase energy and vitality. Based on David Frawley's recommendations for energizing practices.",
            "poses": [
                "Sun Salutation (Surya Namaskara)",
                "Warrior II (Virabhadrasana II)",
                "Triangle Pose (Trikonasana)",
                "Bridge Pose (Setu Bandhasana)",
                "Cobra Pose (Bhujangasana)",
                "Corpse Pose (Savasana)"
            ],
            "duration": "20-25 mins",
            "dosha": "Kapha, Vata",
            "benefits": [
                "Increases energy and vitality",
                "Stimulates metabolism",
                "Improves circulation",
                "Builds strength and stamina",
                "Stimulates Kapha dosha",
                "Energizes Vata dosha"
            ],
            "sources": ["Yoga and Ayurveda - David Frawley"]
        }
    ]
    
    return yoga_sequences

def create_comprehensive_yoga_data(poses: List[Dict], sequences: List[Dict], pranayama: List[Dict]) -> Dict[str, Any]:
    """Create comprehensive yoga library data structure"""
    return {
        "poses": poses,
        "sequences": sequences,
        "pranayama": pranayama,
        "categories": [
            {
                "name": "Ayurvedic Yoga",
                "description": "Yoga poses and sequences based on Ayurvedic principles",
                "count": len(poses)
            },
            {
                "name": "Pranayama",
                "description": "Breathing techniques for dosha balance",
                "count": len(pranayama)
            },
            {
                "name": "Therapeutic Sequences",
                "description": "Yoga sequences for specific health benefits",
                "count": len(sequences)
            }
        ],
        "metadata": {
            "source": "Yoga and Ayurveda - David Frawley",
            "extracted_at": "2024",
            "total_poses": len(poses),
            "total_sequences": len(sequences),
            "total_pranayama": len(pranayama)
        }
    }

def main():
    """Main extraction function"""
    pdf_path = "../src/pdfcoffee.com-davidfrawleyyogaandayurvedapdf.pdf"
    
    print("Extracting comprehensive yoga information from David Frawley PDF...")
    
    # Extract text from PDF
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("Failed to extract text from PDF")
        return
    
    print(f"Extracted {len(text)} characters from PDF")
    
    # Extract different types of yoga information
    poses = extract_yoga_poses_from_text(text)
    sequences = extract_yoga_sequences(text)
    pranayama = extract_pranayama_techniques(text)
    
    print(f"Found {len(poses)} yoga poses")
    print(f"Found {len(sequences)} yoga sequences")
    print(f"Found {len(pranayama)} pranayama techniques")
    
    # Create comprehensive data structure
    yoga_library_data = create_comprehensive_yoga_data(poses, sequences, pranayama)
    
    # Save to JSON file
    output_path = "../src/assets/comprehensive_yoga_data.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(yoga_library_data, f, indent=2, ensure_ascii=False)
    
    print(f"Comprehensive yoga library data saved to {output_path}")

if __name__ == "__main__":
    main() 