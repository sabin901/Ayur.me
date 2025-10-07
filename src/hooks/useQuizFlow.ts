import { useState, useCallback } from "react";
import { performAyurvedicAnalysis, AnalysisResult } from "@/services/ayurvedicAnalysis";

export interface Question {
  id: string;
  question: string;
  options: {
    value: string;
    text: string;
    score: number;
    source: string;
    icon?: string;
    description?: string;
    doshaTraits?: string[];
  }[];
  category?: string;
  classicalReference?: {
    sanskrit: string;
    iast: string;
    translation: string;
    source: string;
  };
}

interface QuizState {
  step: number;
  answers: Record<string, string>;
  isDone: boolean;
  loading: boolean;
  result: AnalysisResult | null;
  error: string | null;
}

export function useQuizFlow(questions: Question[]) {
  const [state, setState] = useState<QuizState>({
    step: 0,
    answers: {},
    isDone: false,
    loading: false,
    result: null,
    error: null
  });

  const next = useCallback((option: any) => {
    setState(prev => {
      const newAnswers = {
        ...prev.answers,
        [questions[prev.step].id]: option.value
      };

      const nextStep = prev.step + 1;
      const isDone = nextStep >= questions.length;

      return {
        ...prev,
        step: nextStep,
        answers: newAnswers,
        isDone
      };
    });
  }, [questions]);

  const submit = useCallback(async (): Promise<AnalysisResult | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Perform comprehensive Ayurvedic analysis
      const result = performAyurvedicAnalysis(state.answers);

      setState(prev => ({
        ...prev,
        loading: false,
        result
      }));

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Analysis failed';
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage
      }));
      return null;
    }
  }, [state.answers]);

  const reset = useCallback(() => {
    setState({
      step: 0,
      answers: {},
      isDone: false,
      loading: false,
      result: null,
      error: null
    });
  }, []);

  const goBack = useCallback(() => {
    setState(prev => ({
      ...prev,
      step: Math.max(0, prev.step - 1)
    }));
  }, []);

  const updateAnswer = useCallback((questionId: string, answer: string) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  }, []);

  const getProgress = useCallback(() => {
    return (state.step / questions.length) * 100;
  }, [state.step, questions.length]);

  const getCurrentQuestion = useCallback(() => {
    return questions[state.step] || null;
  }, [questions, state.step]);

  const getAnsweredQuestions = useCallback(() => {
    return Object.keys(state.answers).length;
  }, [state.answers]);

  const getRemainingQuestions = useCallback(() => {
    return questions.length - Object.keys(state.answers).length;
  }, [questions, state.answers]);

  const isQuestionAnswered = useCallback((questionId: string) => {
    return questionId in state.answers;
  }, [state.answers]);

  const getAnswerForQuestion = useCallback((questionId: string) => {
    return state.answers[questionId] || null;
  }, [state.answers]);

  const getDoshaScores = useCallback(() => {
    if (!state.result) return null;
    return state.result.scores;
  }, [state.result]);

  const getConstitution = useCallback(() => {
    if (!state.result) return null;
    return state.result.constitution;
  }, [state.result]);

  const getRecommendations = useCallback(() => {
    if (!state.result) return null;
    return state.result.recommendations;
  }, [state.result]);

  const getSubtypes = useCallback(() => {
    if (!state.result) return null;
    return state.result.subtypes;
  }, [state.result]);

  const getClassicalReferences = useCallback(() => {
    if (!state.result) return null;
    return state.result.classicalReferences;
  }, [state.result]);

  const getVikriti = useCallback(() => {
    if (!state.result) return null;
    return state.result.vikriti;
  }, [state.result]);

  return {
    // State
    step: state.step,
    answers: state.answers,
    isDone: state.isDone,
    loading: state.loading,
    result: state.result,
    error: state.error,

    // Actions
    next,
    submit,
    reset,
    goBack,
    updateAnswer,

    // Computed values
    progress: getProgress(),
    currentQuestion: getCurrentQuestion(),
    answeredQuestions: getAnsweredQuestions(),
    remainingQuestions: getRemainingQuestions(),
    isQuestionAnswered,
    getAnswerForQuestion,

    // Analysis results
    doshaScores: getDoshaScores(),
    constitution: getConstitution(),
    recommendations: getRecommendations(),
    subtypes: getSubtypes(),
    classicalReferences: getClassicalReferences(),
    vikriti: getVikriti(),

    // Utility
    totalQuestions: questions.length
  };
} 