
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
