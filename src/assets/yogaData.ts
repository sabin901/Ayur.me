// Final Yoga Data from David Frawley's "Yoga and Ayurveda"
import finalYogaData from './final_yoga_data.json';

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

// Export the final yoga data
export const yogaData: YogaLibraryData = finalYogaData as YogaLibraryData;

// Helper functions for filtering and searching
export const getPosesByDosha = (dosha: string): YogaPose[] => {
  return yogaData.poses.filter(pose => 
    pose.dosha.toLowerCase().includes(dosha.toLowerCase()) ||
    pose.dosha === 'All Doshas'
  );
};

export const getPosesByCategory = (category: string): YogaPose[] => {
  return yogaData.poses.filter(pose => 
    pose.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const getPosesByDifficulty = (difficulty: string): YogaPose[] => {
  return yogaData.poses.filter(pose => 
    pose.difficulty.toLowerCase() === difficulty.toLowerCase()
  );
};

export const searchPoses = (query: string): YogaPose[] => {
  const lowerQuery = query.toLowerCase();
  return yogaData.poses.filter(pose => 
    pose.name.toLowerCase().includes(lowerQuery) ||
    pose.sanskrit.toLowerCase().includes(lowerQuery) ||
    pose.description.toLowerCase().includes(lowerQuery) ||
    pose.benefits.some(benefit => benefit.toLowerCase().includes(lowerQuery))
  );
};

export const getSequencesByDosha = (dosha: string): YogaSequence[] => {
  return yogaData.sequences.filter(sequence => 
    sequence.dosha.toLowerCase().includes(dosha.toLowerCase()) ||
    sequence.dosha === 'All Doshas'
  );
};

export const getPranayamaByDosha = (dosha: string): PranayamaTechnique[] => {
  return yogaData.pranayama.filter(technique => 
    technique.dosha.toLowerCase().includes(dosha.toLowerCase()) ||
    technique.dosha === 'All Doshas'
  );
};

// Get all available categories
export const getCategories = () => yogaData.categories;

// Get metadata
export const getMetadata = () => yogaData.metadata; 