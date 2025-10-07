#!/usr/bin/env python3
"""
Extract Yoga Information from David Frawley PDF
Extracts yoga poses, sequences, and therapeutic information for integration into the yoga library
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

def extract_yoga_poses(text: str) -> List[Dict[str, Any]]:
    """Extract yoga poses and their information from text"""
    yoga_poses = []
    
    # Common yoga pose patterns
    pose_patterns = [
        r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\(([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\)',
        r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*-\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)',
        r'([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*\(([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\)',
    ]
    
    # Ayurvedic terms and concepts
    ayurvedic_terms = [
        'vata', 'pitta', 'kapha', 'dosha', 'agni', 'ama', 'prana', 'ojas', 'tejas',
        'surya namaskara', 'pranayama', 'meditation', 'asana', 'mudra', 'bandha'
    ]
    
    # Therapeutic benefits
    therapeutic_benefits = [
        'digestive', 'respiratory', 'circulatory', 'nervous', 'endocrine',
        'immune', 'musculoskeletal', 'cardiovascular', 'lymphatic'
    ]
    
    # Extract sections that contain yoga information
    sections = text.split('\n\n')
    
    for section in sections:
        if any(term.lower() in section.lower() for term in ayurvedic_terms):
            # Look for pose names and descriptions
            lines = section.split('\n')
            current_pose = None
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                
                # Check if this line contains a pose name
                for pattern in pose_patterns:
                    matches = re.findall(pattern, line)
                    if matches:
                        for match in matches:
                            english_name = match[0].strip()
                            sanskrit_name = match[1].strip()
                            
                            # Create pose object
                            pose = {
                                "name": english_name,
                                "sanskrit": sanskrit_name,
                                "category": "Ayurvedic Yoga",
                                "duration": "5-10 mins",
                                "difficulty": "Beginner",
                                "dosha": "All Doshas",
                                "benefits": [],
                                "description": "",
                                "image": f"/yoga-poses/{english_name.lower().replace(' ', '-')}.jpg",
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
                    if any(benefit in line.lower() for benefit in therapeutic_benefits):
                        current_pose["therapeuticUses"].append(line)
                    
                    # Extract description
                    if len(line) > 50 and not any(char in line for char in ['(', ')', '-']):
                        if not current_pose["description"]:
                            current_pose["description"] = line
                        else:
                            current_pose["description"] += " " + line
    
    return yoga_poses

def extract_yoga_sequences(text: str) -> List[Dict[str, Any]]:
    """Extract yoga sequences and routines"""
    sequences = []
    
    # Look for sequence patterns
    sequence_keywords = [
        'sequence', 'routine', 'flow', 'series', 'practice', 'session'
    ]
    
    sections = text.split('\n\n')
    
    for section in sections:
        if any(keyword in section.lower() for keyword in sequence_keywords):
            lines = section.split('\n')
            sequence = {
                "name": "",
                "description": "",
                "poses": [],
                "duration": "",
                "dosha": "All Doshas",
                "benefits": [],
                "sources": ["Yoga and Ayurveda - David Frawley"]
            }
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                
                # Extract sequence name
                if not sequence["name"] and len(line) < 100:
                    sequence["name"] = line
                
                # Extract description
                elif len(line) > 50 and not sequence["description"]:
                    sequence["description"] = line
                
                # Extract poses
                elif any(pose in line.lower() for pose in ['asana', 'pose', 'position']):
                    sequence["poses"].append(line)
            
            if sequence["name"]:
                sequences.append(sequence)
    
    return sequences

def extract_pranayama_techniques(text: str) -> List[Dict[str, Any]]:
    """Extract pranayama breathing techniques"""
    pranayama_techniques = []
    
    # Pranayama keywords
    pranayama_keywords = [
        'pranayama', 'breathing', 'breath', 'nadi shodhana', 'kapalabhati',
        'bhastrika', 'ujjayi', 'sitali', 'sitkari', 'brahmari'
    ]
    
    sections = text.split('\n\n')
    
    for section in sections:
        if any(keyword in section.lower() for keyword in pranayama_keywords):
            lines = section.split('\n')
            technique = {
                "name": "",
                "sanskrit": "",
                "description": "",
                "benefits": [],
                "dosha": "All Doshas",
                "duration": "5-15 mins",
                "sources": ["Yoga and Ayurveda - David Frawley"]
            }
            
            for line in lines:
                line = line.strip()
                if not line:
                    continue
                
                # Extract technique name
                if not technique["name"] and len(line) < 100:
                    technique["name"] = line
                
                # Extract description
                elif len(line) > 50 and not technique["description"]:
                    technique["description"] = line
            
            if technique["name"]:
                pranayama_techniques.append(technique)
    
    return pranayama_techniques

def create_yoga_library_data(poses: List[Dict], sequences: List[Dict], pranayama: List[Dict]) -> Dict[str, Any]:
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
    
    print("Extracting yoga information from David Frawley PDF...")
    
    # Extract text from PDF
    text = extract_text_from_pdf(pdf_path)
    if not text:
        print("Failed to extract text from PDF")
        return
    
    print(f"Extracted {len(text)} characters from PDF")
    
    # Extract different types of yoga information
    poses = extract_yoga_poses(text)
    sequences = extract_yoga_sequences(text)
    pranayama = extract_pranayama_techniques(text)
    
    print(f"Found {len(poses)} yoga poses")
    print(f"Found {len(sequences)} yoga sequences")
    print(f"Found {len(pranayama)} pranayama techniques")
    
    # Create comprehensive data structure
    yoga_library_data = create_yoga_library_data(poses, sequences, pranayama)
    
    # Save to JSON file
    output_path = "../src/assets/extracted_yoga_data.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(yoga_library_data, f, indent=2, ensure_ascii=False)
    
    print(f"Yoga library data saved to {output_path}")
    
    # Create TypeScript interface file
    ts_interface = """
// Extracted Yoga Data Types
export interface YogaPose {
  name: string;
  sanskrit: string;
  category: string;
  duration: string;
  difficulty: string;
  dosha: string;
  benefits: string[];
  description: string;
  image: string;
  therapeuticUses: string[];
  doshaSpecific: {
    vata: string;
    pitta: string;
    kapha: string;
  };
  contraindications: string[];
  sources: string[];
}

export interface YogaSequence {
  name: string;
  description: string;
  poses: string[];
  duration: string;
  dosha: string;
  benefits: string[];
  sources: string[];
}

export interface PranayamaTechnique {
  name: string;
  sanskrit: string;
  description: string;
  benefits: string[];
  dosha: string;
  duration: string;
  sources: string[];
}

export interface YogaLibraryData {
  poses: YogaPose[];
  sequences: YogaSequence[];
  pranayama: PranayamaTechnique[];
  categories: Array<{
    name: string;
    description: string;
    count: number;
  }>;
  metadata: {
    source: string;
    extracted_at: string;
    total_poses: number;
    total_sequences: number;
    total_pranayama: number;
  };
}
"""
    
    ts_path = "../src/assets/yoga_types.ts"
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(ts_interface)
    
    print(f"TypeScript interfaces saved to {ts_path}")

if __name__ == "__main__":
    main() 