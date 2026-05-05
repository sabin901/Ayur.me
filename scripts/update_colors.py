#!/usr/bin/env python3
"""
Update gunaColor and doshaColor properties to use green and golden colors
"""

import re

def update_colors():
    """Update color properties to use sage and gold colors"""
    
    file_path = "../src/assets/comprehensiveYogaPoses.ts"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Update gunaColor properties
    content = re.sub(
        r"gunaColor: 'from-blue-400 to-indigo-600'",
        "gunaColor: 'from-sage/20 to-gold/20'",
        content
    )
    content = re.sub(
        r"gunaColor: 'from-orange-400 to-red-600'",
        "gunaColor: 'from-gold/20 to-sage/20'",
        content
    )
    content = re.sub(
        r"gunaColor: 'from-green-400 to-emerald-600'",
        "gunaColor: 'from-sage/30 to-gold/30'",
        content
    )
    
    # Update doshaColor properties
    content = re.sub(
        r"doshaColor: 'bg-gray-100 text-gray-800 border-gray-300'",
        "doshaColor: 'bg-earth/20 text-earth-800 border-earth-300'",
        content
    )
    content = re.sub(
        r"doshaColor: 'bg-violet-100 text-violet-800 border-violet-300'",
        "doshaColor: 'bg-sage/20 text-sage-800 border-sage-300'",
        content
    )
    content = re.sub(
        r"doshaColor: 'bg-orange-100 text-orange-800 border-orange-300'",
        "doshaColor: 'bg-gold/20 text-gold-800 border-gold-300'",
        content
    )
    content = re.sub(
        r"doshaColor: 'bg-green-100 text-green-800 border-green-300'",
        "doshaColor: 'bg-sage/30 text-sage-800 border-sage-400'",
        content
    )
    
    # Write updated content back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print("Updated color properties to use sage and gold colors")

if __name__ == "__main__":
    update_colors() 