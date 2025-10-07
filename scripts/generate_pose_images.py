#!/usr/bin/env python3
"""
Generate placeholder images for yoga poses
Creates simple HTML files that can be converted to images
"""

import os
import json

def create_pose_image_html(pose_name, sanskrit_name, guna, dosha):
    """Create HTML for a yoga pose image"""
    
    guna_colors = {
        'Sattvic': '#3B82F6',  # Blue
        'Rajasic': '#F97316',  # Orange
        'Tamasic': '#10B981'   # Green
    }
    
    dosha_colors = {
        'Vata': '#8B5CF6',     # Violet
        'Pitta': '#F97316',    # Orange
        'Kapha': '#10B981',    # Green
        'All Doshas': '#6B7280' # Gray
    }
    
    guna_color = guna_colors.get(guna, '#6B7280')
    dosha_color = dosha_colors.get(dosha, '#6B7280')
    
    html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{pose_name}</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, {guna_color}20, {dosha_color}20);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }}
        .pose-card {{
            background: white;
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }}
        .pose-icon {{
            width: 120px;
            height: 120px;
            background: linear-gradient(135deg, {guna_color}, {dosha_color});
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 48px;
            color: white;
        }}
        .pose-name {{
            font-size: 24px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 8px;
        }}
        .sanskrit-name {{
            font-size: 16px;
            color: #6B7280;
            margin-bottom: 20px;
            font-style: italic;
        }}
        .badges {{
            display: flex;
            gap: 10px;
            justify-content: center;
            margin-bottom: 20px;
        }}
        .badge {{
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
        }}
        .guna-badge {{
            background: {guna_color}20;
            color: {guna_color};
            border: 1px solid {guna_color}40;
        }}
        .dosha-badge {{
            background: {dosha_color}20;
            color: {dosha_color};
            border: 1px solid {dosha_color}40;
        }}
        .description {{
            color: #4B5563;
            line-height: 1.6;
            font-size: 14px;
        }}
    </style>
</head>
<body>
    <div class="pose-card">
        <div class="pose-icon">🧘‍♀️</div>
        <div class="pose-name">{pose_name}</div>
        <div class="sanskrit-name">{sanskrit_name}</div>
        <div class="badges">
            <div class="badge guna-badge">{guna}</div>
            <div class="badge dosha-badge">{dosha}</div>
        </div>
        <div class="description">
            A beautiful yoga pose for {dosha.lower()} dosha balance and {guna.lower()} energy cultivation.
        </div>
    </div>
</body>
</html>
"""
    return html

def create_step_image_html(step_number, instruction, pose_name):
    """Create HTML for a step image"""
    
    html = f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Step {step_number} - {pose_name}</title>
    <style>
        body {{
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #3B82F6, #10B981);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }}
        .step-card {{
            background: white;
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }}
        .step-number {{
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3B82F6, #10B981);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            color: white;
        }}
        .step-title {{
            font-size: 20px;
            font-weight: bold;
            color: #1F2937;
            margin-bottom: 15px;
        }}
        .instruction {{
            color: #4B5563;
            line-height: 1.6;
            font-size: 14px;
        }}
        .pose-name {{
            color: #6B7280;
            font-size: 12px;
            margin-top: 15px;
        }}
    </style>
</head>
<body>
    <div class="step-card">
        <div class="step-number">{step_number}</div>
        <div class="step-title">Step {step_number}</div>
        <div class="instruction">{instruction}</div>
        <div class="pose-name">{pose_name}</div>
    </div>
</body>
</html>
"""
    return html

def main():
    """Generate all pose images"""
    
    # Create output directory
    output_dir = "../public/yoga-poses"
    os.makedirs(output_dir, exist_ok=True)
    
    # Sample poses data
    poses = [
        {
            "name": "Easy Pose",
            "sanskrit": "Sukhasana",
            "guna": "Sattvic",
            "dosha": "All Doshas"
        },
        {
            "name": "Lotus Pose",
            "sanskrit": "Padmasana",
            "guna": "Sattvic",
            "dosha": "All Doshas"
        },
        {
            "name": "Mountain Pose",
            "sanskrit": "Tadasana",
            "guna": "Sattvic",
            "dosha": "All Doshas"
        },
        {
            "name": "Legs-Up-the-Wall",
            "sanskrit": "Viparita Karani",
            "guna": "Sattvic",
            "dosha": "Vata"
        },
        {
            "name": "Child's Pose",
            "sanskrit": "Balasana",
            "guna": "Sattvic",
            "dosha": "Vata"
        },
        {
            "name": "Corpse Pose",
            "sanskrit": "Savasana",
            "guna": "Sattvic",
            "dosha": "All Doshas"
        },
        {
            "name": "Sun Salutation",
            "sanskrit": "Surya Namaskara",
            "guna": "Rajasic",
            "dosha": "Kapha"
        },
        {
            "name": "Warrior II",
            "sanskrit": "Virabhadrasana II",
            "guna": "Rajasic",
            "dosha": "Kapha"
        },
        {
            "name": "Chair Pose",
            "sanskrit": "Utkatasana",
            "guna": "Rajasic",
            "dosha": "Kapha"
        },
        {
            "name": "Seated Forward Bend",
            "sanskrit": "Paschimottanasana",
            "guna": "Tamasic",
            "dosha": "Vata"
        },
        {
            "name": "Standing Forward Bend",
            "sanskrit": "Uttanasana",
            "guna": "Tamasic",
            "dosha": "Vata"
        }
    ]
    
    print("Generating yoga pose images...")
    
    for pose in poses:
        # Create main pose image
        pose_filename = pose["name"].lower().replace(" ", "-").replace("'", "")
        pose_html = create_pose_image_html(
            pose["name"], 
            pose["sanskrit"], 
            pose["guna"], 
            pose["dosha"]
        )
        
        with open(f"{output_dir}/{pose_filename}.html", "w", encoding="utf-8") as f:
            f.write(pose_html)
        
        # Create step images
        steps = [
            f"Start in the basic position for {pose['name']}",
            f"Adjust your posture and alignment",
            f"Focus on your breathing",
            f"Hold the pose with awareness",
            f"Release and relax"
        ]
        
        for i, step in enumerate(steps, 1):
            step_filename = f"{pose_filename}-step{i}"
            step_html = create_step_image_html(i, step, pose["name"])
            
            with open(f"{output_dir}/{step_filename}.html", "w", encoding="utf-8") as f:
                f.write(step_html)
    
    print(f"Generated {len(poses)} pose images and {len(poses) * 5} step images")
    print(f"Files saved to {output_dir}")
    print("\nTo convert HTML to images, you can:")
    print("1. Open the HTML files in a browser")
    print("2. Take screenshots or use browser dev tools")
    print("3. Or use tools like wkhtmltoimage or puppeteer")

if __name__ == "__main__":
    main() 