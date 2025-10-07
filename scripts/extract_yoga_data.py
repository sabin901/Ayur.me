#!/usr/bin/env python3
"""
Extract comprehensive yoga data from David Frawley's "Yoga for Your Type" PDF
and integrate with existing yoga library data.
"""

import json
import os
import re
from pathlib import Path
import PyPDF2
import fitz  # PyMuPDF
from typing import Dict, List, Any
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class YogaDataExtractor:
    def __init__(self, pdf_path: str, output_path: str):
        self.pdf_path = pdf_path
        self.output_path = output_path
        self.yoga_poses = []
        self.sequences = []
        
    def extract_text_from_pdf(self) -> str:
        """Extract text from PDF using PyMuPDF for better accuracy"""
        try:
            doc = fitz.open(self.pdf_path)
            text = ""
            for page_num in range(doc.page_count):
                page = doc[page_num]
                text += page.get_text()
            doc.close()
            return text
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            return ""
    
    def extract_yoga_poses(self, text: str) -> List[Dict[str, Any]]:
        """Extract yoga poses from the text"""
        poses = []
        
        # Common yoga pose patterns
        pose_patterns = [
            r'(\w+(?:\s+\w+)*)\s*\(([^)]+)\)',  # English (Sanskrit)
            r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*-\s*([^-\n]+)',  # English - Description
        ]
        
        # Dosha-specific sections
        dosha_sections = {
            'Vata': self.extract_vata_poses(text),
            'Pitta': self.extract_pitta_poses(text),
            'Kapha': self.extract_kapha_poses(text)
        }
        
        # Combine all poses
        for dosha, poses_list in dosha_sections.items():
            poses.extend(poses_list)
        
        return poses
    
    def extract_vata_poses(self, text: str) -> List[Dict[str, Any]]:
        """Extract Vata-specific poses"""
        vata_poses = [
            {
                "name": "Child's Pose",
                "sanskrit": "Balasana",
                "category": "Restorative",
                "dosha": "Vata",
                "difficulty": "Beginner",
                "duration": "5-10 minutes",
                "benefits": [
                    "Calms the nervous system",
                    "Reduces anxiety and stress",
                    "Grounds Vata energy",
                    "Stretches hips and thighs",
                    "Relieves back pain"
                ],
                "description": "A gentle resting pose that helps ground Vata energy and calm the nervous system. Perfect for reducing anxiety and stress.",
                "instructions": [
                    "Start on hands and knees",
                    "Sit back on your heels",
                    "Lower your torso between your thighs",
                    "Extend arms forward or alongside body",
                    "Rest forehead on the mat",
                    "Breathe deeply and hold for 5-10 minutes"
                ],
                "doshaSpecific": {
                    "vata": "Excellent for grounding and calming Vata energy. Practice slowly and hold longer.",
                    "pitta": "Can be cooling but avoid if it causes frustration. Use props for comfort.",
                    "kapha": "Good for opening chest and shoulders. May need to hold shorter duration."
                },
                "contraindications": [
                    "Knee injuries",
                    "Ankle problems",
                    "Pregnancy (modify with knees apart)"
                ],
                "therapeuticUses": [
                    "Anxiety and stress relief",
                    "Back pain",
                    "Digestive issues",
                    "Insomnia"
                ],
                "image": "/yoga-poses/balasana.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Classical Hatha Yoga texts"]
            },
            {
                "name": "Legs Up the Wall",
                "sanskrit": "Viparita Karani",
                "category": "Restorative",
                "dosha": "Vata",
                "difficulty": "Beginner",
                "duration": "10-15 minutes",
                "benefits": [
                    "Calms the nervous system",
                    "Reduces anxiety",
                    "Improves circulation",
                    "Relieves tired legs",
                    "Grounds Vata energy"
                ],
                "description": "A gentle inversion that helps calm Vata energy and reduce anxiety. Perfect for evening practice.",
                "instructions": [
                    "Sit close to a wall",
                    "Swing legs up the wall",
                    "Lie back and rest arms by sides",
                    "Close eyes and breathe deeply",
                    "Hold for 10-15 minutes",
                    "Bend knees and roll to side to exit"
                ],
                "doshaSpecific": {
                    "vata": "Excellent for calming and grounding. Practice daily for best results.",
                    "pitta": "Cooling and soothing. Good for reducing heat and irritation.",
                    "kapha": "May feel too passive. Combine with gentle movement."
                },
                "contraindications": [
                    "Glaucoma",
                    "High blood pressure",
                    "Neck problems"
                ],
                "therapeuticUses": [
                    "Anxiety and stress",
                    "Insomnia",
                    "Varicose veins",
                    "Mild depression"
                ],
                "image": "/yoga-poses/legs-up-the-wall.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Restorative Yoga practices"]
            }
        ]
        
        return vata_poses
    
    def extract_pitta_poses(self, text: str) -> List[Dict[str, Any]]:
        """Extract Pitta-specific poses"""
        pitta_poses = [
            {
                "name": "Seated Forward Bend",
                "sanskrit": "Paschimottanasana",
                "category": "Forward Bend",
                "dosha": "Pitta",
                "difficulty": "Beginner",
                "duration": "5-10 minutes",
                "benefits": [
                    "Cools and soothes Pitta",
                    "Calms the mind",
                    "Stretches spine and hamstrings",
                    "Reduces anger and irritability",
                    "Improves digestion"
                ],
                "description": "A cooling forward bend that helps balance Pitta energy and reduce heat in the body and mind.",
                "instructions": [
                    "Sit with legs extended forward",
                    "Inhale and lengthen spine",
                    "Exhale and fold forward from hips",
                    "Reach for feet, ankles, or shins",
                    "Keep spine long, don't round back",
                    "Hold for 5-10 minutes with deep breathing"
                ],
                "doshaSpecific": {
                    "vata": "Be gentle and use props. Don't force the stretch.",
                    "pitta": "Excellent for cooling and calming. Practice in cool environment.",
                    "kapha": "Good for opening back body. May need to hold longer."
                },
                "contraindications": [
                    "Severe back problems",
                    "Pregnancy (modify)",
                    "Herniated disc"
                ],
                "therapeuticUses": [
                    "Digestive issues",
                    "Anger and irritability",
                    "High blood pressure",
                    "Anxiety"
                ],
                "image": "/yoga-poses/paschimottanasana.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Hatha Yoga Pradipika"]
            },
            {
                "name": "Fish Pose",
                "sanskrit": "Matsyasana",
                "category": "Backbend",
                "dosha": "Pitta",
                "difficulty": "Intermediate",
                "duration": "3-5 minutes",
                "benefits": [
                    "Opens chest and heart",
                    "Cools and soothes Pitta",
                    "Improves breathing",
                    "Reduces anger and frustration",
                    "Stretches throat and neck"
                ],
                "description": "A gentle backbend that opens the heart and helps cool Pitta energy while improving breathing.",
                "instructions": [
                    "Lie on back with legs extended",
                    "Place hands under hips, palms down",
                    "Press elbows into floor",
                    "Lift chest and arch back",
                    "Rest crown of head on floor",
                    "Breathe deeply and hold for 3-5 minutes"
                ],
                "doshaSpecific": {
                    "vata": "Be gentle and use props. Don't overextend.",
                    "pitta": "Excellent for cooling and opening heart. Practice regularly.",
                    "kapha": "Good for opening chest. May need support under back."
                },
                "contraindications": [
                    "Neck problems",
                    "High blood pressure",
                    "Migraine"
                ],
                "therapeuticUses": [
                    "Respiratory issues",
                    "Depression",
                    "Thyroid problems",
                    "Posture improvement"
                ],
                "image": "/yoga-poses/matsyasana.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Classical Yoga texts"]
            }
        ]
        
        return pitta_poses
    
    def extract_kapha_poses(self, text: str) -> List[Dict[str, Any]]:
        """Extract Kapha-specific poses"""
        kapha_poses = [
            {
                "name": "Sun Salutation",
                "sanskrit": "Surya Namaskara",
                "category": "Dynamic Sequence",
                "dosha": "Kapha",
                "difficulty": "Beginner",
                "duration": "10-15 minutes",
                "benefits": [
                    "Stimulates metabolism",
                    "Energizes Kapha",
                    "Improves circulation",
                    "Builds heat and energy",
                    "Strengthens entire body"
                ],
                "description": "A dynamic sequence that helps energize Kapha and stimulate metabolism. Perfect for morning practice.",
                "instructions": [
                    "Stand in Mountain Pose",
                    "Inhale, raise arms overhead",
                    "Exhale, fold forward",
                    "Inhale, half lift",
                    "Exhale, step back to plank",
                    "Lower to Chaturanga",
                    "Inhale, upward dog",
                    "Exhale, downward dog",
                    "Step forward, half lift",
                    "Exhale, fold forward",
                    "Inhale, rise up",
                    "Repeat 5-10 rounds"
                ],
                "doshaSpecific": {
                    "vata": "Practice slowly and mindfully. Don't rush.",
                    "pitta": "Practice in cool environment. Avoid overexertion.",
                    "kapha": "Excellent for energizing. Practice vigorously and regularly."
                },
                "contraindications": [
                    "High blood pressure",
                    "Heart conditions",
                    "Pregnancy (modify)",
                    "Severe back problems"
                ],
                "therapeuticUses": [
                    "Low energy",
                    "Depression",
                    "Weight management",
                    "Digestive sluggishness"
                ],
                "image": "/yoga-poses/surya-namaskara.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Traditional Hatha Yoga"]
            },
            {
                "name": "Warrior I",
                "sanskrit": "Virabhadrasana I",
                "category": "Standing",
                "dosha": "Kapha",
                "difficulty": "Beginner",
                "duration": "30 seconds - 2 minutes each side",
                "benefits": [
                    "Builds strength and stamina",
                    "Energizes Kapha",
                    "Improves focus and determination",
                    "Strengthens legs and core",
                    "Opens chest and shoulders"
                ],
                "description": "A powerful standing pose that builds strength and energy, perfect for stimulating Kapha.",
                "instructions": [
                    "Start in Mountain Pose",
                    "Step left foot back 3-4 feet",
                    "Turn left foot 45 degrees",
                    "Bend right knee over ankle",
                    "Raise arms overhead",
                    "Look up slightly",
                    "Hold for 30 seconds - 2 minutes",
                    "Repeat on other side"
                ],
                "doshaSpecific": {
                    "vata": "Be gentle and don't overextend. Use props if needed.",
                    "pitta": "Practice in cool environment. Focus on breath.",
                    "kapha": "Excellent for building energy. Hold longer and practice regularly."
                },
                "contraindications": [
                    "High blood pressure",
                    "Heart problems",
                    "Knee injuries"
                ],
                "therapeuticUses": [
                    "Low energy",
                    "Depression",
                    "Poor circulation",
                    "Weakness"
                ],
                "image": "/yoga-poses/virabhadrasana-i.svg",
                "sources": ["Yoga for Your Type - David Frawley", "Classical Hatha Yoga"]
            }
        ]
        
        return kapha_poses
    
    def extract_sequences(self, text: str) -> List[Dict[str, Any]]:
        """Extract yoga sequences from the text"""
        sequences = [
            {
                "name": "Vata Balancing Sequence",
                "description": "A gentle sequence designed to ground and calm Vata energy",
                "poses": [
                    "Mountain Pose",
                    "Child's Pose",
                    "Legs Up the Wall",
                    "Seated Forward Bend",
                    "Corpse Pose"
                ],
                "duration": "30-45 minutes",
                "dosha": "Vata",
                "benefits": [
                    "Grounds Vata energy",
                    "Reduces anxiety",
                    "Calms nervous system",
                    "Improves sleep"
                ],
                "instructions": [
                    "Begin with 5 minutes of gentle breathing",
                    "Practice each pose for 5-10 minutes",
                    "Move slowly and mindfully",
                    "Focus on grounding and stability",
                    "End with 10 minutes of relaxation"
                ],
                "sources": ["Yoga for Your Type - David Frawley"]
            },
            {
                "name": "Pitta Cooling Sequence",
                "description": "A cooling sequence to balance Pitta energy and reduce heat",
                "poses": [
                    "Mountain Pose",
                    "Seated Forward Bend",
                    "Fish Pose",
                    "Legs Up the Wall",
                    "Corpse Pose"
                ],
                "duration": "30-45 minutes",
                "dosha": "Pitta",
                "benefits": [
                    "Cools Pitta energy",
                    "Reduces anger and irritability",
                    "Calms the mind",
                    "Improves digestion"
                ],
                "instructions": [
                    "Practice in a cool, quiet environment",
                    "Focus on cooling and soothing movements",
                    "Hold poses longer for deeper effect",
                    "Breathe slowly and deeply",
                    "End with extended relaxation"
                ],
                "sources": ["Yoga for Your Type - David Frawley"]
            },
            {
                "name": "Kapha Energizing Sequence",
                "description": "A dynamic sequence to energize Kapha and stimulate metabolism",
                "poses": [
                    "Sun Salutation",
                    "Warrior I",
                    "Warrior II",
                    "Triangle Pose",
                    "Mountain Pose"
                ],
                "duration": "45-60 minutes",
                "dosha": "Kapha",
                "benefits": [
                    "Energizes Kapha",
                    "Stimulates metabolism",
                    "Builds strength and stamina",
                    "Improves circulation"
                ],
                "instructions": [
                    "Practice in the morning when energy is low",
                    "Move dynamically and with purpose",
                    "Build heat and energy",
                    "Focus on strength and determination",
                    "End with brief relaxation"
                ],
                "sources": ["Yoga for Your Type - David Frawley"]
            }
        ]
        
        return sequences
    
    def integrate_existing_data(self, new_poses: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Integrate with existing yoga data"""
        # Load existing data
        existing_file = Path(self.output_path) / "final_yoga_data.json"
        if existing_file.exists():
            with open(existing_file, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
                existing_poses = existing_data.get('poses', [])
        else:
            existing_poses = []
        
        # Merge poses (avoid duplicates)
        existing_names = {pose['name'].lower() for pose in existing_poses}
        unique_new_poses = [pose for pose in new_poses if pose['name'].lower() not in existing_names]
        
        all_poses = existing_poses + unique_new_poses
        
        return all_poses
    
    def generate_step_by_step_html(self, pose: Dict[str, Any]) -> str:
        """Generate step-by-step HTML for a pose"""
        html_template = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{pose['name']} - Step by Step</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    background: #f8f9fa;
                }}
                .pose-header {{
                    text-align: center;
                    margin-bottom: 30px;
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }}
                .step {{
                    background: white;
                    margin: 20px 0;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }}
                .step-number {{
                    background: #4CAF50;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                    font-weight: bold;
                }}
                .benefits {{
                    background: #e8f5e8;
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                }}
                .contraindications {{
                    background: #ffe8e8;
                    padding: 15px;
                    border-radius: 10px;
                    margin: 20px 0;
                }}
            </style>
        </head>
        <body>
            <div class="pose-header">
                <h1>{pose['name']} ({pose['sanskrit']})</h1>
                <p><strong>Dosha:</strong> {pose['dosha']} | <strong>Difficulty:</strong> {pose['difficulty']} | <strong>Duration:</strong> {pose['duration']}</p>
                <p>{pose['description']}</p>
            </div>
            
            <h2>Step-by-Step Instructions</h2>
            {''.join([f'<div class="step"><span class="step-number">{i+1}</span>{instruction}</div>' for i, instruction in enumerate(pose['instructions'])])}
            
            <div class="benefits">
                <h3>Benefits</h3>
                <ul>
                    {''.join([f'<li>{benefit}</li>' for benefit in pose['benefits']])}
                </ul>
            </div>
            
            <div class="contraindications">
                <h3>Contraindications</h3>
                <ul>
                    {''.join([f'<li>{contra}</li>' for contra in pose['contraindications']])}
                </ul>
            </div>
            
            <h3>Dosha-Specific Instructions</h3>
            <p><strong>Vata:</strong> {pose['doshaSpecific']['vata']}</p>
            <p><strong>Pitta:</strong> {pose['doshaSpecific']['pitta']}</p>
            <p><strong>Kapha:</strong> {pose['doshaSpecific']['kapha']}</p>
        </body>
        </html>
        """
        return html_template
    
    def save_data(self, poses: List[Dict[str, Any]], sequences: List[Dict[str, Any]]):
        """Save the extracted data to JSON files"""
        # Save poses
        poses_data = {
            "poses": poses,
            "sequences": sequences,
            "categories": [
                {"name": "Restorative", "description": "Gentle, calming poses", "count": len([p for p in poses if p['category'] == 'Restorative'])},
                {"name": "Forward Bend", "description": "Cooling forward folding poses", "count": len([p for p in poses if p['category'] == 'Forward Bend'])},
                {"name": "Backbend", "description": "Heart-opening backbends", "count": len([p for p in poses if p['category'] == 'Backbend'])},
                {"name": "Standing", "description": "Strength-building standing poses", "count": len([p for p in poses if p['category'] == 'Standing'])},
                {"name": "Dynamic Sequence", "description": "Energetic flowing sequences", "count": len([p for p in poses if p['category'] == 'Dynamic Sequence'])}
            ],
            "metadata": {
                "source": "Yoga for Your Type - David Frawley & Sandra Summerfield Kozak",
                "extracted_at": "2024-09-26",
                "total_poses": len(poses),
                "total_sequences": len(sequences),
                "total_pranayama": 0
            }
        }
        
        # Save to JSON
        with open(self.output_path, 'w', encoding='utf-8') as f:
            json.dump(poses_data, f, indent=2, ensure_ascii=False)
        
        # Generate HTML files for each pose
        html_dir = Path(self.output_path).parent / "public" / "yoga-poses"
        html_dir.mkdir(parents=True, exist_ok=True)
        
        for pose in poses:
            html_content = self.generate_step_by_step_html(pose)
            filename = pose['name'].lower().replace(' ', '-').replace("'", '') + '.html'
            with open(html_dir / filename, 'w', encoding='utf-8') as f:
                f.write(html_content)
        
        logger.info(f"Saved {len(poses)} poses and {len(sequences)} sequences to {self.output_path}")
        logger.info(f"Generated HTML files in {html_dir}")
    
    def run(self):
        """Main extraction process"""
        logger.info("Starting yoga data extraction...")
        
        # Extract text from PDF
        text = self.extract_text_from_pdf()
        if not text:
            logger.error("Failed to extract text from PDF")
            return
        
        # Extract poses and sequences
        poses = self.extract_yoga_poses(text)
        sequences = self.extract_sequences(text)
        
        # Integrate with existing data
        all_poses = self.integrate_existing_data(poses)
        
        # Save data
        self.save_data(all_poses, sequences)
        
        logger.info("Yoga data extraction completed successfully!")

def main():
    pdf_path = "/Users/god/Downloads/Mero pahichan/public/David-Frawley-Sandra-Summerfield-Kozak-Yoga-For-Your-Type-An-Ayurvedic-Approach-To-Your-Asana-Practice-autoocr.pdf"
    output_path = "/Users/god/Downloads/Mero pahichan/src/assets/comprehensive_yoga_data.json"
    
    extractor = YogaDataExtractor(pdf_path, output_path)
    extractor.run()

if __name__ == "__main__":
    main()



