import { useState, useEffect } from 'react';

interface WellnessActivity {
  id: string;
  type: 'yoga' | 'meditation' | 'diet' | 'herbs' | 'lifestyle' | 'mental_health';
  name: string;
  duration: number; // in minutes
  date: string;
  completed: boolean;
  notes?: string;
  dosha?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  mood?: 'great' | 'good' | 'neutral' | 'poor';
}

interface ProgressData {
  activities: WellnessActivity[];
  streak: number;
  totalMinutes: number;
  weeklyGoal: number;
  monthlyGoal: number;
  achievements: Achievement[];
  goals: Goal[];
  currentStreak: number;
  longestStreak: number;
  totalSessions: number;
  averageSessionLength: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedDate?: string;
  progress: number;
  target: number;
}

interface Goal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: 'minutes' | 'sessions' | 'days';
  deadline?: string;
  completed: boolean;
}

function getDefaultAchievements(): Achievement[] {
  return [
    {
      id: 'first_session',
      name: 'First Steps',
      description: 'Complete your first wellness session',
      icon: '🎯',
      unlocked: false,
      progress: 0,
      target: 1
    },
    {
      id: 'week_streak',
      name: 'Week Warrior',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      unlocked: false,
      progress: 0,
      target: 7
    },
    {
      id: 'month_streak',
      name: 'Monthly Master',
      description: 'Maintain a 30-day streak',
      icon: '👑',
      unlocked: false,
      progress: 0,
      target: 30
    },
    {
      id: 'yoga_master',
      name: 'Yoga Enthusiast',
      description: 'Complete 50 yoga sessions',
      icon: '🧘',
      unlocked: false,
      progress: 0,
      target: 50
    },
    {
      id: 'meditation_master',
      name: 'Mindful Master',
      description: 'Complete 100 meditation sessions',
      icon: '🧠',
      unlocked: false,
      progress: 0,
      target: 100
    },
    {
      id: 'diet_conscious',
      name: 'Diet Conscious',
      description: 'Log 30 diet-related activities',
      icon: '🥗',
      unlocked: false,
      progress: 0,
      target: 30
    },
    {
      id: 'herb_knowledge',
      name: 'Herbal Wisdom',
      description: 'Use herbs for 20 days',
      icon: '🌿',
      unlocked: false,
      progress: 0,
      target: 20
    },
    {
      id: 'lifestyle_change',
      name: 'Lifestyle Transformer',
      description: 'Complete 100 lifestyle activities',
      icon: '🌟',
      unlocked: false,
      progress: 0,
      target: 100
    }
  ];
}

function getDefaultGoals(): Goal[] {
  return [
    {
      id: 'weekly_minutes',
      name: 'Weekly Wellness Minutes',
      target: 150,
      current: 0,
      unit: 'minutes',
      completed: false
    },
    {
      id: 'daily_sessions',
      name: 'Daily Practice',
      target: 7,
      current: 0,
      unit: 'days',
      completed: false
    },
    {
      id: 'monthly_sessions',
      name: 'Monthly Consistency',
      target: 20,
      current: 0,
      unit: 'sessions',
      completed: false
    }
  ];
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem('prakriti-progress');
    return saved ? JSON.parse(saved) : {
      activities: [],
      streak: 0,
      totalMinutes: 0,
      weeklyGoal: 150, // 30 minutes per day
      monthlyGoal: 600,
      achievements: getDefaultAchievements(),
      goals: getDefaultGoals(),
      currentStreak: 0,
      longestStreak: 0,
      totalSessions: 0,
      averageSessionLength: 0
    };
  });

  useEffect(() => {
    localStorage.setItem('prakriti-progress', JSON.stringify(progress));
  }, [progress]);

  const addActivity = (activity: Omit<WellnessActivity, 'id' | 'date'>) => {
    const newActivity: WellnessActivity = {
      ...activity,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setProgress(prev => {
      const updatedActivities = [...prev.activities, newActivity];
      const totalMinutes = updatedActivities.reduce((sum, act) => sum + act.duration, 0);
      const totalSessions = updatedActivities.length;
      const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0;
      
      // Update streaks
      const currentStreak = calculateCurrentStreak(updatedActivities);
      const longestStreak = Math.max(prev.longestStreak, currentStreak);
      
      // Update achievements
      const updatedAchievements = updateAchievements(prev.achievements, updatedActivities);
      
             // Update goals
       const updatedGoals = updateGoalsInternal(prev.goals, updatedActivities);

      return {
        ...prev,
        activities: updatedActivities,
        totalMinutes,
        totalSessions,
        averageSessionLength,
        currentStreak,
        longestStreak,
        achievements: updatedAchievements,
        goals: updatedGoals
      };
    });
  };

  const calculateCurrentStreak = (activities: WellnessActivity[]): number => {
    const completedActivities = activities
      .filter(activity => activity.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (completedActivities.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < completedActivities.length; i++) {
      const activityDate = new Date(completedActivities[i].date);
      activityDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const updateAchievements = (achievements: Achievement[], activities: WellnessActivity[]): Achievement[] => {
    return achievements.map(achievement => {
      let progress = 0;
      
      switch (achievement.id) {
        case 'first_session':
          progress = activities.length > 0 ? 1 : 0;
          break;
        case 'week_streak':
          progress = Math.min(calculateCurrentStreak(activities), 7);
          break;
        case 'month_streak':
          progress = Math.min(calculateCurrentStreak(activities), 30);
          break;
        case 'yoga_master':
          progress = activities.filter(a => a.type === 'yoga' && a.completed).length;
          break;
        case 'meditation_master':
          progress = activities.filter(a => a.type === 'meditation' && a.completed).length;
          break;
        case 'diet_conscious':
          progress = activities.filter(a => a.type === 'diet' && a.completed).length;
          break;
        case 'herb_knowledge':
          progress = activities.filter(a => a.type === 'herbs' && a.completed).length;
          break;
        case 'lifestyle_change':
          progress = activities.filter(a => a.type === 'lifestyle' && a.completed).length;
          break;
      }

      const unlocked = progress >= achievement.target && !achievement.unlocked;
      
      return {
        ...achievement,
        progress,
        unlocked: achievement.unlocked || unlocked,
        unlockedDate: unlocked ? new Date().toISOString() : achievement.unlockedDate
      };
    });
  };

  const updateGoalsInternal = (goals: Goal[], activities: WellnessActivity[]): Goal[] => {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return goals.map(goal => {
      let current = 0;

      switch (goal.id) {
        case 'weekly_minutes':
          current = activities
            .filter(a => new Date(a.date) >= weekStart && a.completed)
            .reduce((sum, a) => sum + a.duration, 0);
          break;
        case 'daily_sessions':
          current = calculateCurrentStreak(activities);
          break;
        case 'monthly_sessions':
          current = activities
            .filter(a => new Date(a.date) >= monthStart && a.completed)
            .length;
          break;
      }

      return {
        ...goal,
        current,
        completed: current >= goal.target
      };
    });
  };

  const completeActivity = (id: string) => {
    setProgress(prev => ({
      ...prev,
      activities: prev.activities.map(activity =>
        activity.id === id ? { ...activity, completed: true } : activity
      )
    }));
  };

  const getWeeklyProgress = () => {
    const now = new Date();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const weeklyActivities = progress.activities.filter(activity => 
      new Date(activity.date) >= weekStart
    );

    const completedMinutes = weeklyActivities
      .filter(activity => activity.completed)
      .reduce((sum, activity) => sum + activity.duration, 0);

    return {
      completed: completedMinutes,
      goal: progress.weeklyGoal,
      percentage: Math.min((completedMinutes / progress.weeklyGoal) * 100, 100)
    };
  };

  const getMonthlyProgress = () => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyActivities = progress.activities.filter(activity => 
      new Date(activity.date) >= monthStart
    );

    const completedMinutes = monthlyActivities
      .filter(activity => activity.completed)
      .reduce((sum, activity) => sum + activity.duration, 0);

    return {
      completed: completedMinutes,
      goal: progress.monthlyGoal,
      percentage: Math.min((completedMinutes / progress.monthlyGoal) * 100, 100)
    };
  };

  const getStreak = () => {
    return progress.currentStreak;
  };

  const getActivityStats = () => {
    const stats = {
      yoga: 0,
      meditation: 0,
      diet: 0,
      herbs: 0,
      lifestyle: 0,
      mental_health: 0
    };

    progress.activities
      .filter(activity => activity.completed)
      .forEach(activity => {
        stats[activity.type]++;
      });

    return stats;
  };

  const getMoodStats = () => {
    const moodStats = {
      great: 0,
      good: 0,
      neutral: 0,
      poor: 0
    };

    progress.activities
      .filter(activity => activity.completed && activity.mood)
      .forEach(activity => {
        if (activity.mood) {
          moodStats[activity.mood]++;
        }
      });

    return moodStats;
  };

  const getDoshaStats = () => {
    const doshaStats = {
      vata: 0,
      pitta: 0,
      kapha: 0
    };

    progress.activities
      .filter(activity => activity.completed && activity.dosha)
      .forEach(activity => {
        if (activity.dosha) {
          doshaStats[activity.dosha as keyof typeof doshaStats]++;
        }
      });

    return doshaStats;
  };

  const updateGoals = (weeklyGoal: number, monthlyGoal: number) => {
    setProgress(prev => ({
      ...prev,
      weeklyGoal,
      monthlyGoal
    }));
  };

  const addCustomGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString()
    };

    setProgress(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  };

  const deleteGoal = (goalId: string) => {
    setProgress(prev => ({
      ...prev,
      goals: prev.goals.filter(goal => goal.id !== goalId)
    }));
  };

  const getRecentActivities = (limit = 10) => {
    return progress.activities
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  };

  const getActivityTrends = () => {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentActivities = progress.activities.filter(activity => 
      new Date(activity.date) >= last30Days
    );

    const dailyStats = {};
    for (let i = 0; i < 30; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      dailyStats[dateStr] = {
        sessions: 0,
        minutes: 0,
        mood: null
      };
    }

    recentActivities.forEach(activity => {
      const dateStr = activity.date.split('T')[0];
      if (dailyStats[dateStr]) {
        dailyStats[dateStr].sessions++;
        dailyStats[dateStr].minutes += activity.duration;
        if (activity.mood) {
          dailyStats[dateStr].mood = activity.mood;
        }
      }
    });

    return Object.entries(dailyStats).reverse();
  };

  return {
    progress,
    addActivity,
    completeActivity,
    getWeeklyProgress,
    getMonthlyProgress,
    getStreak,
    getActivityStats,
    getMoodStats,
    getDoshaStats,
    updateGoals,
    addCustomGoal,
    deleteGoal,
    getRecentActivities,
    getActivityTrends
  };
} 