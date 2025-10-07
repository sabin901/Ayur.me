#!/usr/bin/env python3
"""
Update image paths in comprehensive yoga poses file
"""

import re

def update_image_paths():
    """Update image paths to use generated HTML files"""
    
    file_path = "../src/assets/comprehensiveYogaPoses.ts"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Define pose name mappings
    pose_mappings = {
        'sukhasana': 'easy-pose',
        'padmasana': 'lotus-pose', 
        'tadasana': 'mountain-pose',
        'viparita-karani': 'legs-up-the-wall',
        'balasana': 'childs-pose',
        'savasana': 'corpse-pose',
        'surya-namaskara': 'sun-salutation',
        'virabhadrasana-ii': 'warrior-ii',
        'utkatasana': 'chair-pose',
        'paschimottanasana': 'seated-forward-bend',
        'uttanasana': 'standing-forward-bend'
    }
    
    # Update main image paths
    for old_name, new_name in pose_mappings.items():
        # Update main image paths
        content = re.sub(
            rf"image: '/yoga-poses/{old_name}\.jpg'",
            f"image: '/yoga-poses/{new_name}.html'",
            content
        )
        
        # Update step image paths
        for step in range(1, 6):
            content = re.sub(
                rf"image: '/yoga-poses/{old_name}-step{step}\.jpg'",
                f"image: '/yoga-poses/{new_name}-step{step}.html'",
                content
            )
    
    # Write updated content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Updated image paths in comprehensive yoga poses file")
    print("All images now point to generated HTML files")

if __name__ == "__main__":
    update_image_paths() 