import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, any>;
}

export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    const trackPageView = () => {
      // In a real app, you'd send this to your analytics service
      console.log('Page View:', location.pathname);
      
      // Example: Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: location.pathname,
        });
      }
    };

    trackPageView();
  }, [location]);

  const trackEvent = (event: string, properties?: Record<string, any>) => {
    // In a real app, you'd send this to your analytics service
    console.log('Event:', event, properties);
    
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }
  };

  const trackDoshaAnalysis = (doshaType: string) => {
    trackEvent('dosha_analysis_completed', {
      dosha_type: doshaType,
      timestamp: new Date().toISOString(),
    });
  };

  const trackRecipeView = (recipeName: string, dosha: string) => {
    trackEvent('recipe_viewed', {
      recipe_name: recipeName,
      dosha: dosha,
      timestamp: new Date().toISOString(),
    });
  };

  const trackDiseaseSearch = (searchTerm: string, resultsCount: number) => {
    trackEvent('disease_search', {
      search_term: searchTerm,
      results_count: resultsCount,
      timestamp: new Date().toISOString(),
    });
  };

  const trackYogaPoseView = (poseName: string, category: string) => {
    trackEvent('yoga_pose_viewed', {
      pose_name: poseName,
      category: category,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackEvent,
    trackDoshaAnalysis,
    trackRecipeView,
    trackDiseaseSearch,
    trackYogaPoseView,
  };
}; 