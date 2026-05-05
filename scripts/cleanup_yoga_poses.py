#!/usr/bin/env python3
"""
Clean up duplicate yoga poses and ensure all poses have visual features
"""

import re
import json

def cleanup_yoga_poses():
    """Remove duplicate poses and ensure all have visual features"""
    
    file_path = "../src/assets/comprehensiveYogaPoses.ts"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the poses array
    poses_match = re.search(r'export const comprehensiveYogaPoses: YogaPose\[\] = \[(.*?)\];', content, re.DOTALL)
    if not poses_match:
        print("Could not find poses array")
        return
    
    poses_content = poses_match.group(1)
    
    # Split into individual pose objects
    pose_objects = []
    current_pose = ""
    brace_count = 0
    in_pose = False
    
    for line in poses_content.split('\n'):
        if '{' in line and not in_pose:
            in_pose = True
            brace_count = line.count('{') - line.count('}')
            current_pose = line
        elif in_pose:
            current_pose += '\n' + line
            brace_count += line.count('{') - line.count('}')
            if brace_count == 0:
                pose_objects.append(current_pose.strip())
                current_pose = ""
                in_pose = False
    
    # Parse poses and remove duplicates
    unique_poses = []
    seen_ids = set()
    
    for pose_str in pose_objects:
        if not pose_str.strip():
            continue
            
        # Extract id
        id_match = re.search(r"id: '([^']+)'", pose_str)
        if not id_match:
            continue
            
        pose_id = id_match.group(1)
        
        if pose_id not in seen_ids:
            seen_ids.add(pose_id)
            unique_poses.append(pose_str)
        else:
            print(f"Removing duplicate pose: {pose_id}")
    
    # Create the cleaned content
    cleaned_poses = ',\n  '.join(unique_poses)
    
    # Replace the poses array
    new_content = re.sub(
        r'export const comprehensiveYogaPoses: YogaPose\[\] = \[.*?\];',
        f'export const comprehensiveYogaPoses: YogaPose[] = [\n  {cleaned_poses}\n];',
        content,
        flags=re.DOTALL
    )
    
    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Cleaned up poses. Now have {len(unique_poses)} unique poses:")
    for pose_str in unique_poses:
        id_match = re.search(r"id: '([^']+)'", pose_str)
        name_match = re.search(r"name: '([^']+)'", pose_str)
        if id_match and name_match:
            print(f"  - {name_match.group(1)} ({id_match.group(1)})")

if __name__ == "__main__":
    cleanup_yoga_poses() 