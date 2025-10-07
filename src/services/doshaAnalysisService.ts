// Frontend service for authentic dosha analysis
// Based on classical Sanskrit texts: Charaka Samhita, Sushruta Samhita, Ashtanga Hridayam

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface DoshaAnalysisRequest {
  answers: Record<string, string>;
  photos?: string[];
  userId?: string;
}

export interface DoshaAnalysisResponse {
  assessmentId: string;
  results: {
    prakriti: {
      primaryDosha: string;
      secondaryDosha: string;
      constitution: string;
      scores: {
        vata: number;
        pitta: number;
        kapha: number;
      };
      percentages: {
        vata: number;
        pitta: number;
        kapha: number;
      };
    };
    vikriti: {
      currentImbalance: string;
      symptoms: string[];
      recommendations: string[];
    };
    classicalReferences: Array<{
      question: string;
      answer: string;
      reference: {
        text: string;
        verse: string;
        sanskritVerse: string;
        translation: string;
      };
    }>;
    recommendations: {
      diet: Array<{
        category: string;
        foods: string[];
        classicalReference: {
          text: string;
          verse: string;
        };
      }>;
      lifestyle: Array<{
        category: string;
        practices: string[];
        classicalReference: {
          text: string;
          verse: string;
        };
      }>;
      herbs: Array<{
        category: string;
        herbs: string[];
        classicalReference: {
          text: string;
          verse: string;
        };
      }>;
      yoga: Array<{
        category: string;
        asanas: string[];
        classicalReference: {
          text: string;
          verse: string;
          sanskritVerse: string;
          translation: string;
        };
      }>;
    };
  };
  classicalReferences: Array<{
    question: string;
    answer: string;
    reference: {
      text: string;
      verse: string;
      sanskritVerse: string;
      translation: string;
    };
  }>;
  confidenceScore: number;
}

export interface AssessmentQuestions {
  physical: Array<{
    id: string;
    question: string;
    options: Array<{
      value: string;
      text: string;
      score: number;
      classicalReference?: {
        text: string;
        verse: string;
        sanskritVerse: string;
        translation: string;
      };
    }>;
  }>;
  physiological: Array<{
    id: string;
    question: string;
    options: Array<{
      value: string;
      text: string;
      score: number;
      classicalReference?: {
        text: string;
        verse: string;
        sanskritVerse: string;
        translation: string;
      };
    }>;
  }>;
  mental: Array<{
    id: string;
    question: string;
    options: Array<{
      value: string;
      text: string;
      score: number;
      classicalReference?: {
        text: string;
        verse: string;
        sanskritVerse: string;
        translation: string;
      };
    }>;
  }>;
  lifestyle: Array<{
    id: string;
    question: string;
    options: Array<{
      value: string;
      text: string;
      score: number;
      classicalReference?: {
        text: string;
        verse: string;
        sanskritVerse: string;
        translation: string;
      };
    }>;
  }>;
}

export interface DoshaSubtype {
  dosha: string;
  subtype: string;
  sanskritName: string;
  iastTransliteration: string;
  location: string;
  functions: string[];
  symptoms: string[];
  classicalReferences: Array<{
    text: string;
    chapter: string;
    verse: string;
    section: string;
    sanskritVerse: string;
    englishTranslation: string;
  }>;
  qualities: string[];
  elements: string[];
  therapeuticActions: string[];
  balancingPractices: string[];
}

export interface ClassicalText {
  name: string;
  sanskrit: string;
  author: string;
  period: string;
  chapters: string[];
  relevance: string;
}

export interface AssessmentMethodology {
  name: string;
  sanskrit: string;
  description: string;
  components: Array<{
    name: string;
    sanskrit: string;
    description: string;
    includes: string[];
  }>;
  classicalReference: {
    text: string;
    verse: string;
    sanskritVerse: string;
    translation: string;
  };
  assessmentTypes: Array<{
    type: string;
    name: string;
    description: string;
    duration: string;
    questions: string;
  }>;
}

class DoshaAnalysisService {
  
  /**
   * Perform comprehensive dosha assessment based on classical texts
   */
  async performComprehensiveAssessment(data: DoshaAnalysisRequest): Promise<DoshaAnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/assess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Assessment failed');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Assessment error:', error);
      throw new Error('Failed to perform assessment. Please try again.');
    }
  }

  /**
   * Get assessment questions with classical references
   */
  async getAssessmentQuestions(): Promise<AssessmentQuestions> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/questions`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const result = await response.json();
      return result.data.questions;
    } catch (error) {
      console.error('Questions fetch error:', error);
      throw new Error('Failed to load assessment questions');
    }
  }

  /**
   * Get dosha subtypes with classical references
   */
  async getDoshaSubtypes(dosha: 'vata' | 'pitta' | 'kapha'): Promise<DoshaSubtype[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/subtypes/${dosha}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dosha subtypes');
      }

      const result = await response.json();
      return result.data.subtypes;
    } catch (error) {
      console.error('Subtypes fetch error:', error);
      throw new Error('Failed to load dosha subtypes');
    }
  }

  /**
   * Get classical texts information
   */
  async getClassicalTexts(): Promise<ClassicalText[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/classical-texts`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch classical texts');
      }

      const result = await response.json();
      return result.data.texts;
    } catch (error) {
      console.error('Classical texts fetch error:', error);
      throw new Error('Failed to load classical texts information');
    }
  }

  /**
   * Get assessment methodology
   */
  async getAssessmentMethodology(): Promise<AssessmentMethodology> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/methodology`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch methodology');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Methodology fetch error:', error);
      throw new Error('Failed to load assessment methodology');
    }
  }

  /**
   * Perform quick assessment
   */
  async performQuickAssessment(answers: Record<string, string>): Promise<Partial<DoshaAnalysisResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/quick-assess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Quick assessment failed');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Quick assessment error:', error);
      throw new Error('Failed to perform quick assessment');
    }
  }

  /**
   * Get assessment history for a user
   */
  async getAssessmentHistory(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/history/${userId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch assessment history');
      }

      const result = await response.json();
      return result.data.assessments;
    } catch (error) {
      console.error('History fetch error:', error);
      throw new Error('Failed to load assessment history');
    }
  }

  /**
   * Get detailed assessment results
   */
  async getAssessmentDetails(assessmentId: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/dosha/assessment/${assessmentId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch assessment details');
      }

      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Assessment details fetch error:', error);
      throw new Error('Failed to load assessment details');
    }
  }

  /**
   * Format classical reference for display
   */
  formatClassicalReference(reference: any): string {
    return `${reference.text}, ${reference.chapter} ${reference.verse}`;
  }

  /**
   * Get Sanskrit verse with transliteration
   */
  getSanskritVerse(reference: any): { sanskrit: string; transliteration: string; translation: string } {
    return {
      sanskrit: reference.sanskritVerse || '',
      transliteration: reference.iastTransliteration || '',
      translation: reference.translation || reference.englishTranslation || ''
    };
  }

  /**
   * Calculate assessment progress
   */
  calculateProgress(answers: Record<string, string>, totalQuestions: number): number {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  }

  /**
   * Validate assessment completion
   */
  validateAssessmentCompletion(answers: Record<string, string>, requiredQuestions: string[]): {
    isValid: boolean;
    missingQuestions: string[];
    progress: number;
  } {
    const answeredQuestions = Object.keys(answers);
    const missingQuestions = requiredQuestions.filter(q => !answeredQuestions.includes(q));
    
    return {
      isValid: missingQuestions.length === 0,
      missingQuestions,
      progress: this.calculateProgress(answers, requiredQuestions.length)
    };
  }
}

export default new DoshaAnalysisService(); 