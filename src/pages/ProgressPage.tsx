import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loading } from '@/components/ui/loading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProgress } from '@/hooks/useProgress';
import { 
  Activity, 
  Calendar, 
  Target, 
  Trophy, 
  Flame, 
  Leaf, 
  Heart, 
  Brain,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  Star,
  Zap,
  Users,
  BookOpen,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Minus,
  Crown,
  Sparkles,
  Smile,
  Frown,
  Meh,
  PlusCircle,
  Edit,
  Trash2,
  Coffee,
  Moon,
  Sun,
  Wind,
  Utensils,
  HandHeart,
  Timer,
  PenTool,
  X,
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  CalendarDays,
  Clock3,
  TrendingDown,
  Filter,
  Search
} from 'lucide-react';

export default function ProgressPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showDailyTracker, setShowDailyTracker] = useState(false);
  const [selectedActivityType, setSelectedActivityType] = useState('yoga');
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [selectedMood, setSelectedMood] = useState('good');
  const [selectedEnergy, setSelectedEnergy] = useState('good');
  const [activityFilter, setActivityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newActivity, setNewActivity] = useState({
    name: '',
    type: 'yoga' as const,
    duration: 15,
    mood: 'good' as const,
    energy: 'good' as const,
    difficulty: 'beginner' as const,
    notes: '',
    dosha: '' as const
  });

  const {
    progress,
    addActivity,
    completeActivity,
    getWeeklyProgress,
    getMonthlyProgress,
    getStreak,
    getActivityStats,
    getMoodStats,
    getDoshaStats,
    getRecentActivities,
    getActivityTrends
  } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progress.activities.length === 0) {
      addActivity({ type: 'yoga', name: 'Morning Yoga', duration: 30, completed: true, mood: 'good', difficulty: 'beginner', notes: 'Felt refreshed after practice.' });
      addActivity({ type: 'meditation', name: 'Evening Meditation', duration: 15, completed: true, mood: 'great', difficulty: 'beginner', notes: 'Very calm and focused.' });
      addActivity({ type: 'diet', name: 'Herbal Tea', duration: 5, completed: true, mood: 'good', difficulty: 'beginner', notes: 'Drank tulsi tea, felt relaxed.' });
    }
  }, [progress.activities.length]);

  const weeklyProgress = getWeeklyProgress();
  const monthlyProgress = getMonthlyProgress();
  const streak = getStreak();
  const activityStats = getActivityStats();
  const moodStats = getMoodStats();
  const doshaStats = getDoshaStats();
  const recentActivities = getRecentActivities(5);
  const activityTrends = getActivityTrends();

  // Get all activities for the timeline
  const allActivities = progress.activities.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Filter activities based on search and filter
  const filteredActivities = allActivities.filter(activity => {
    const matchesSearch = activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activityFilter === 'all' || activity.type === activityFilter;
    return matchesSearch && matchesFilter;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, typeof allActivities>);

  const quickActivities = [
    { 
      name: 'Sun Salutation', 
      type: 'yoga', 
      duration: 10, 
      icon: Activity, 
      description: 'Morning energizing sequence',
      color: 'bg-sage/20 text-sage border-sage/30'
    },
    { 
      name: 'Meditation', 
      type: 'meditation', 
      duration: 15, 
      icon: Brain, 
      description: 'Mindfulness practice',
      color: 'bg-gold/20 text-gold border-gold/30'
    },
    { 
      name: 'Golden Milk', 
      type: 'diet', 
      duration: 5, 
      icon: Heart, 
      description: 'Turmeric wellness drink',
      color: 'bg-pitta/20 text-pitta border-pitta/30'
    },
    { 
      name: 'Abhyanga', 
      type: 'lifestyle', 
      duration: 20, 
      icon: Leaf, 
      description: 'Self-massage with oil',
      color: 'bg-kapha/20 text-kapha border-kapha/30'
    },
    { 
      name: 'Pranayama', 
      type: 'mental_health', 
      duration: 10, 
      icon: Wind, 
      description: 'Breathing exercises',
      color: 'bg-gold/20 text-gold border-gold/30'
    },
    { 
      name: 'Herbal Tea', 
      type: 'herbs', 
      duration: 5, 
      icon: Coffee, 
      description: 'Ayurvedic herbal blend',
      color: 'bg-kapha/20 text-kapha border-kapha/30'
    }
  ];

  const moodOptions = [
    { value: 'great', label: 'Great', icon: '😄', color: 'text-green-500 bg-green-50 border-green-200' },
    { value: 'good', label: 'Good', icon: '🙂', color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
    { value: 'neutral', label: 'Neutral', icon: '😐', color: 'text-gray-500 bg-gray-50 border-gray-200' },
    { value: 'poor', label: 'Poor', icon: '😞', color: 'text-red-500 bg-red-50 border-red-200' }
  ];

  const energyOptions = [
    { value: 'high', label: 'High', icon: '🔥', color: 'text-orange-500 bg-orange-50 border-orange-200' },
    { value: 'good', label: 'Good', icon: '💪', color: 'text-green-500 bg-green-50 border-green-200' },
    { value: 'moderate', label: 'Moderate', icon: '😌', color: 'text-yellow-500 bg-yellow-50 border-yellow-200' },
    { value: 'low', label: 'Low', icon: '😴', color: 'text-blue-500 bg-blue-50 border-blue-200' }
  ];

  const durationOptions = [
    { value: 5, label: '5 min', icon: Clock },
    { value: 15, label: '15 min', icon: Clock },
    { value: 30, label: '30 min', icon: Clock },
    { value: 45, label: '45 min', icon: Clock },
    { value: 60, label: '60+ min', icon: Clock }
  ];

  const activityTypes = [
    { value: 'yoga', label: 'Yoga', icon: Activity, color: 'bg-sage/20 text-sage border-sage/30' },
    { value: 'meditation', label: 'Meditation', icon: Brain, color: 'bg-gold/20 text-gold border-gold/30' },
    { value: 'diet', label: 'Diet', icon: Utensils, color: 'bg-pitta/20 text-pitta border-pitta/30' },
    { value: 'herbs', label: 'Herbs', icon: Leaf, color: 'bg-kapha/20 text-kapha border-kapha/30' },
    { value: 'lifestyle', label: 'Lifestyle', icon: HandHeart, color: 'bg-sage/20 text-sage border-sage/30' },
    { value: 'mental_health', label: 'Mental Health', icon: Wind, color: 'bg-gold/20 text-gold border-gold/30' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Activities', icon: Activity },
    { value: 'yoga', label: 'Yoga', icon: Activity },
    { value: 'meditation', label: 'Meditation', icon: Brain },
    { value: 'diet', label: 'Diet', icon: Utensils },
    { value: 'herbs', label: 'Herbs', icon: Leaf },
    { value: 'lifestyle', label: 'Lifestyle', icon: HandHeart },
    { value: 'mental_health', label: 'Mental Health', icon: Wind }
  ];

  const handleQuickActivity = (activity: any) => {
    addActivity({
      type: activity.type,
      name: activity.name,
      duration: activity.duration,
      completed: true,
      mood: 'good',
      difficulty: 'beginner'
    });
  };

  const handleAddCustomActivity = () => {
    if (newActivity.name.trim()) {
      addActivity({
        type: newActivity.type,
        name: newActivity.name,
        duration: newActivity.duration,
        completed: true,
        mood: newActivity.mood,
        difficulty: newActivity.difficulty,
        notes: newActivity.notes
      });
      resetForm();
      setShowAddActivity(false);
    }
  };

  const handleDailyTrackerActivity = () => {
    if (newActivity.name.trim()) {
      addActivity({
        type: newActivity.type,
        name: newActivity.name,
        duration: newActivity.duration,
        completed: true,
        mood: newActivity.mood,
        difficulty: newActivity.difficulty,
        notes: newActivity.notes
      });
      resetForm();
      setShowDailyTracker(false);
    }
  };

  const resetForm = () => {
    setNewActivity({
      name: '',
      type: 'yoga',
      duration: 15,
      mood: 'good',
      energy: 'good',
      difficulty: 'beginner',
      notes: '',
      dosha: ''
    });
    setSelectedActivityType('yoga');
    setSelectedDuration(15);
    setSelectedMood('good');
    setSelectedEnergy('good');
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'great': return <Smile className="h-4 w-4 text-green-500" />;
      case 'good': return <Smile className="h-4 w-4 text-yellow-500" />;
      case 'neutral': return <Meh className="h-4 w-4 text-gray-500" />;
      case 'poor': return <Frown className="h-4 w-4 text-red-500" />;
      default: return <Meh className="h-4 w-4 text-gray-500" />;
    }
  };

  const getEnergyIcon = (energy: string) => {
    switch (energy) {
      case 'high': return <Zap className="h-4 w-4 text-orange-500" />;
      case 'good': return <Star className="h-4 w-4 text-green-500" />;
      case 'moderate': return <Meh className="h-4 w-4 text-yellow-500" />;
      case 'low': return <Moon className="h-4 w-4 text-blue-500" />;
      default: return <Meh className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'yoga': return <Activity className="h-4 w-4 text-sage" />;
      case 'meditation': return <Brain className="h-4 w-4 text-gold" />;
      case 'diet': return <Heart className="h-4 w-4 text-pitta" />;
      case 'herbs': return <Leaf className="h-4 w-4 text-kapha" />;
      case 'lifestyle': return <Clock className="h-4 w-4 text-sage" />;
      case 'mental_health': return <Sparkles className="h-4 w-4 text-gold" />;
      default: return <Activity className="h-4 w-4 text-sage" />;
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'yoga': return <Activity className="h-5 w-5" />;
      case 'meditation': return <Brain className="h-5 w-5" />;
      case 'diet': return <Utensils className="h-5 w-5" />;
      case 'herbs': return <Leaf className="h-5 w-5" />;
      case 'lifestyle': return <HandHeart className="h-5 w-5" />;
      case 'mental_health': return <Wind className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'yoga': return 'bg-sage/10 border-sage/20 text-sage';
      case 'meditation': return 'bg-gold/10 border-gold/20 text-gold';
      case 'diet': return 'bg-pitta/10 border-pitta/20 text-pitta';
      case 'herbs': return 'bg-kapha/10 border-kapha/20 text-kapha';
      case 'lifestyle': return 'bg-sage/10 border-sage/20 text-sage';
      case 'mental_health': return 'bg-gold/10 border-gold/20 text-gold';
      default: return 'bg-sage/10 border-sage/20 text-sage';
    }
  };

  // Helper to get weekly stats
  function getWeeklyDashboardStats(activities: any[]) {
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 6);
    const weekActivities = activities.filter(a => {
      const d = new Date(a.date);
      return d >= weekAgo && d <= now;
    });
    const totalMinutes = weekActivities.reduce((sum, a) => sum + a.duration, 0);
    const totalActivities = weekActivities.length;
    const typeCounts = weekActivities.reduce((acc, a) => { acc[a.type] = (acc[a.type]||0)+1; return acc; }, {});
    const mostFrequentType = Object.entries(typeCounts).sort((a,b)=>(b[1] as number)-(a[1] as number))[0]?.[0] || '-';
    const avgMood = weekActivities.length ? (weekActivities.reduce((sum, a) => sum + (a.mood==='great'?4:a.mood==='good'?3:a.mood==='neutral'?2:1), 0)/weekActivities.length).toFixed(1) : '-';
    const avgEnergy = weekActivities.length ? (weekActivities.reduce((sum, a) => sum + 3, 0)/weekActivities.length).toFixed(1) : '-';
    return { totalActivities, totalMinutes, mostFrequentType, avgMood, avgEnergy };
  }

  const weekStats = getWeeklyDashboardStats(progress.activities);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Loading text="Loading your progress..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Wellness <span className="text-gradient">Progress</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your Ayurvedic wellness journey and celebrate your achievements
          </p>
        </div>

        {/* Daily Tracker Modal */}
        {showDailyTracker && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between border-b">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Timer className="h-5 w-5 text-sage" />
                    Daily Wellness Tracker
                  </CardTitle>
                  <CardDescription>
                    Log your Ayurvedic activities and track your wellness journey
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDailyTracker(false)}
                  className="btn-touch-friendly"
                >
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                {/* Activity Type Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Activity Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {activityTypes.map((type) => (
                      <Button
                        key={type.value}
                        variant={selectedActivityType === type.value ? "default" : "outline"}
                        className={`h-auto p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
                          selectedActivityType === type.value ? type.color : 'hover:scale-105'
                        }`}
                        onClick={() => {
                          setSelectedActivityType(type.value);
                          setNewActivity(prev => ({ ...prev, type: type.value as any }));
                        }}
                      >
                        <type.icon className="h-5 w-5" />
                        <span className="text-sm font-medium">{type.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Activity Name */}
                <div>
                  <Label htmlFor="activity-name" className="text-base font-medium mb-2 block">Activity Name</Label>
                  <Input
                    id="activity-name"
                    value={newActivity.name}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning Sun Salutation, Evening Meditation"
                    className="h-12 text-base"
                  />
                </div>

                {/* Duration Selection */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Duration</Label>
                  <div className="flex flex-wrap gap-2">
                    {durationOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={selectedDuration === option.value ? "default" : "outline"}
                        size="sm"
                        className="btn-responsive-sm"
                        onClick={() => {
                          setSelectedDuration(option.value);
                          setNewActivity(prev => ({ ...prev, duration: option.value }));
                        }}
                      >
                        <option.icon className="h-4 w-4 mr-1" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Mood Rating */}
                <div>
                  <Label className="text-base font-medium mb-3 block">How are you feeling?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {moodOptions.map((mood) => (
                      <Button
                        key={mood.value}
                        variant={selectedMood === mood.value ? "default" : "outline"}
                        className={`flex flex-col items-center gap-1 h-auto p-3 transition-all duration-300 ${
                          selectedMood === mood.value ? mood.color : 'hover:scale-105'
                        }`}
                        onClick={() => {
                          setSelectedMood(mood.value);
                          setNewActivity(prev => ({ ...prev, mood: mood.value as any }));
                        }}
                      >
                        <span className="text-lg">{mood.icon}</span>
                        <span className="text-xs font-medium">{mood.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Energy Level */}
                <div>
                  <Label className="text-base font-medium mb-3 block">Energy Level</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {energyOptions.map((energy) => (
                      <Button
                        key={energy.value}
                        variant={selectedEnergy === energy.value ? "default" : "outline"}
                        className={`flex flex-col items-center gap-1 h-auto p-3 transition-all duration-300 ${
                          selectedEnergy === energy.value ? energy.color : 'hover:scale-105'
                        }`}
                        onClick={() => {
                          setSelectedEnergy(energy.value);
                          setNewActivity(prev => ({ ...prev, energy: energy.value as any }));
                        }}
                      >
                        <span className="text-lg">{energy.icon}</span>
                        <span className="text-xs font-medium">{energy.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <Label htmlFor="activity-notes" className="text-base font-medium mb-2 block">Notes (Optional)</Label>
                  <Textarea
                    id="activity-notes"
                    value={newActivity.notes}
                    onChange={(e) => setNewActivity(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any observations, insights, or details about your practice..."
                    className="min-h-[80px] text-base"
                    rows={3}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleDailyTrackerActivity} 
                    className="btn-responsive-lg flex-1"
                    disabled={!newActivity.name.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Log Activity
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowDailyTracker(false)}
                    className="btn-responsive-lg"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1 bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2 data-[state=active]:bg-background">
              <CalendarDays className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
            </TabsTrigger>
            <TabsTrigger value="activities" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activities</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-background">
              <LineChart className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="goals" className="flex items-center gap-2 data-[state=active]:bg-background">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
          </TabsList>

          {/* Empty State */}
          {progress.totalSessions === 0 && (
            <div className="mt-8 text-center">
              <Card className="max-w-md mx-auto card-hover">
                <CardContent className="pt-8 pb-8">
                  <div className="text-6xl mb-6">🌟</div>
                  <h3 className="text-xl font-semibold mb-3">Start Your Wellness Journey</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Track your Ayurvedic wellness activities and see your progress grow
                  </p>
                  <div className="space-y-3 mb-6 text-left">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sage" />
                      <span className="text-sm">Log your daily practices</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sage" />
                      <span className="text-sm">Track your mood and energy</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sage" />
                      <span className="text-sm">Unlock achievements</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-sage" />
                      <span className="text-sm">Monitor your progress</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={() => setShowDailyTracker(true)} 
                      className="btn-responsive-lg flex-1"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Log Your First Activity
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setShowAddActivity(true)} 
                      className="btn-responsive-lg"
                    >
                      <PenTool className="h-4 w-4 mr-2" />
                      Quick Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            {progress.totalSessions > 0 ? (
              <div className="space-y-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                      <Flame className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{streak} days</div>
                      <p className="text-xs text-muted-foreground">
                        Keep up the great work!
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Minutes</CardTitle>
                      <Clock className="h-4 w-4 text-sage" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{progress.totalMinutes}</div>
                      <p className="text-xs text-muted-foreground">
                        This month
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Activities</CardTitle>
                      <Activity className="h-4 w-4 text-gold" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{progress.totalSessions}</div>
                      <p className="text-xs text-muted-foreground">
                        Total completed
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
                      <Target className="h-4 w-4 text-pitta" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{weeklyProgress.percentage.toFixed(0)}%</div>
                      <p className="text-xs text-muted-foreground">
                        {weeklyProgress.completed}/{weeklyProgress.goal} minutes
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Progress Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-sage" />
                        Weekly Progress
                      </CardTitle>
                      <CardDescription>
                        Your wellness activities this week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{weeklyProgress.percentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={weeklyProgress.percentage} className="h-3" />
                        <div className="text-xs text-muted-foreground">
                          {weeklyProgress.completed} of {weeklyProgress.goal} minutes completed
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-gold" />
                        Monthly Progress
                      </CardTitle>
                      <CardDescription>
                        Your wellness journey this month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{monthlyProgress.percentage.toFixed(0)}%</span>
                        </div>
                        <Progress value={monthlyProgress.percentage} className="h-3" />
                        <div className="text-xs text-muted-foreground">
                          {monthlyProgress.completed} of {monthlyProgress.goal} minutes completed
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Activities */}
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-gold" />
                      Quick Activities
                    </CardTitle>
                    <CardDescription>
                      Log your wellness activities quickly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {quickActivities.map((activity, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`flex flex-col items-center gap-2 h-auto p-4 transition-all duration-300 hover:scale-105 border-2 ${activity.color}`}
                          onClick={() => handleQuickActivity(activity)}
                        >
                          <activity.icon className="h-6 w-6" />
                          <div className="text-center">
                            <div className="font-medium text-sm">{activity.name}</div>
                            <div className="text-xs text-muted-foreground">{activity.duration} min</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowDailyTracker(true)}
                        className="btn-responsive-lg"
                      >
                        <Timer className="h-4 w-4 mr-2" />
                        Daily Tracker
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAddActivity(true)}
                        className="btn-responsive-lg"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Custom Activity
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Add Activity Modal */}
                {showAddActivity && (
                  <Card className="card-hover">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Plus className="h-5 w-5 text-sage" />
                        Add New Activity
                      </CardTitle>
                      <CardDescription>
                        Log a custom wellness activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="activity-name">Activity Name</Label>
                          <Input
                            id="activity-name"
                            value={newActivity.name}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="e.g., Morning Yoga, Meditation"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="activity-type">Type</Label>
                          <Select value={newActivity.type} onValueChange={(value) => setNewActivity(prev => ({ ...prev, type: value as any }))}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="yoga">Yoga</SelectItem>
                              <SelectItem value="meditation">Meditation</SelectItem>
                              <SelectItem value="diet">Diet</SelectItem>
                              <SelectItem value="herbs">Herbs</SelectItem>
                              <SelectItem value="lifestyle">Lifestyle</SelectItem>
                              <SelectItem value="mental_health">Mental Health</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="activity-duration">Duration (minutes)</Label>
                          <Input
                            id="activity-duration"
                            type="number"
                            value={newActivity.duration}
                            onChange={(e) => setNewActivity(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                            min="1"
                            max="480"
                            className="mt-2"
                          />
                        </div>
                        <div>
                          <Label htmlFor="activity-mood">Mood</Label>
                          <Select value={newActivity.mood} onValueChange={(value) => setNewActivity(prev => ({ ...prev, mood: value as any }))}>
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="great">Great</SelectItem>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="neutral">Neutral</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button onClick={handleAddCustomActivity} className="btn-responsive-lg flex-1">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Activity
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddActivity(false)} className="btn-responsive-lg">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Start by logging some activities to see your progress!</p>
              </div>
            )}
          </TabsContent>

          {/* Timeline Tab - New Scrollable Activity Timeline */}
          <TabsContent value="timeline" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Activity Timeline
                </h2>
                <p className="text-muted-foreground">
                  Scroll through your wellness journey and track what you've accomplished
                </p>
              </div>

              {/* Search and Filter Controls */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-sage" />
                    Search & Filter Activities
                  </CardTitle>
                  <CardDescription>
                    Find specific activities or filter by type
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="search-activities">Search Activities</Label>
                      <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="search-activities"
                          placeholder="Search by activity name or notes (e.g. Yoga, Meditation, 'slept well', 'felt tired')..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="sm:w-48">
                      <Label htmlFor="filter-activities">Filter by Type</Label>
                      <Select value={activityFilter} onValueChange={setActivityFilter}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <option.icon className="h-4 w-4" />
                                {option.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Showing {filteredActivities.length} activities</span>
                    <span>Total: {allActivities.length} activities</span>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Overview */}
              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-sage" />
                    Weekly Overview
                  </CardTitle>
                  <CardDescription>Summary of your last 7 days</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{weekStats.totalActivities}</div>
                    <div className="text-xs text-muted-foreground">Activities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{weekStats.totalMinutes}</div>
                    <div className="text-xs text-muted-foreground">Minutes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold capitalize">{weekStats.mostFrequentType}</div>
                    <div className="text-xs text-muted-foreground">Most Frequent</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{weekStats.avgMood} / {weekStats.avgEnergy}</div>
                    <div className="text-xs text-muted-foreground">Avg Mood / Energy</div>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Timeline */}
              {filteredActivities.length > 0 ? (
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-sage" />
                      Activity Timeline
                    </CardTitle>
                    <CardDescription>
                      Your wellness activities organized by date
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px] w-full">
                      <div className="space-y-6 pr-4">
                        {Object.entries(groupedActivities).map(([date, activities]) => (
                          <div key={date} className="space-y-4">
                            {/* Date Header */}
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-sage rounded-full"></div>
                              <h3 className="text-lg font-semibold text-foreground">{date}</h3>
                              <div className="flex-1 h-px bg-border"></div>
                              <Badge variant="outline" className="text-xs">
                                {activities.length} activity{activities.length !== 1 ? 'ies' : ''}
                              </Badge>
                            </div>

                            {/* Activities for this date */}
                            <div className="space-y-3 ml-6">
                              {activities.map((activity, index) => (
                                <div
                                  key={activity.id}
                                  className="relative p-4 rounded-lg border bg-card hover:bg-muted/50 transition-all duration-300 group"
                                >
                                  {/* Timeline connector */}
                                  <div className="absolute left-0 top-0 bottom-0 w-px bg-border group-hover:bg-sage transition-colors duration-300"></div>
                                  
                                  <div className="flex items-start gap-4">
                                    {/* Activity Icon */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getActivityTypeColor(activity.type)}`}>
                                      {getActivityIcon(activity.type)}
                                    </div>

                                    {/* Activity Details */}
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <h4 className="font-semibold text-foreground">{activity.name}</h4>
                                          <p className="text-sm text-muted-foreground">
                                            {new Date(activity.date).toLocaleTimeString('en-US', {
                                              hour: '2-digit',
                                              minute: '2-digit'
                                            })}
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="outline" className="text-xs">
                                            {activity.duration} min
                                          </Badge>
                                          {activity.mood && getMoodIcon(activity.mood)}
                                          {activity.completed && (
                                            <CheckCircle className="h-4 w-4 text-sage" />
                                          )}
                                        </div>
                                      </div>

                                      {/* Activity Type Badge */}
                                      <div className="flex items-center gap-2">
                                        <Badge 
                                          variant="secondary" 
                                          className={`text-xs ${getActivityTypeColor(activity.type)}`}
                                        >
                                          {activity.type.replace('_', ' ').charAt(0).toUpperCase() + activity.type.slice(1).replace('_', ' ')}
                                        </Badge>
                                        {activity.difficulty && (
                                          <Badge variant="outline" className="text-xs">
                                            {activity.difficulty}
                                          </Badge>
                                        )}
                                      </div>

                                      {/* Notes */}
                                      {activity.notes && (
                                        <div className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
                                          <span className="font-medium">Notes:</span> {activity.notes}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-hover">
                  <CardContent className="pt-8 pb-8 text-center">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold mb-2">No Activities Found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery || activityFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria'
                        : 'Start logging your wellness activities to see them here'
                      }
                    </p>
                    <Button onClick={() => setShowDailyTracker(true)} className="btn-responsive-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Log Activity
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Achievements
                </h2>
                <p className="text-muted-foreground">
                  Unlock achievements as you progress on your wellness journey
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {progress.achievements.map((achievement) => (
                  <Card 
                    key={achievement.id} 
                    className={`card-hover ${
                      achievement.unlocked ? 'ring-2 ring-gold' : 'opacity-75'
                    }`}
                  >
                    <CardHeader className="text-center">
                      <div className="text-4xl mb-2">{achievement.icon}</div>
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.target}</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.target) * 100} 
                          className="h-2" 
                        />
                        {achievement.unlocked && (
                          <div className="flex items-center gap-2 text-sm text-gold">
                            <Trophy className="h-4 w-4" />
                            <span>Unlocked!</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Activity Breakdown
                </h2>
                <p className="text-muted-foreground">
                  Your wellness activities by category
                </p>
              </div>

              <Card className="card-hover">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-sage" />
                    Activity Breakdown
                  </CardTitle>
                  <CardDescription>
                    Your wellness activities by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-2">
                        <Activity className="h-6 w-6 text-sage" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.yoga}</div>
                      <div className="text-xs text-muted-foreground">Yoga</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2">
                        <Brain className="h-6 w-6 text-gold" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.meditation}</div>
                      <div className="text-xs text-muted-foreground">Meditation</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-pitta/20 flex items-center justify-center mx-auto mb-2">
                        <Heart className="h-6 w-6 text-pitta" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.diet}</div>
                      <div className="text-xs text-muted-foreground">Diet</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-kapha/20 flex items-center justify-center mx-auto mb-2">
                        <Leaf className="h-6 w-6 text-kapha" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.herbs}</div>
                      <div className="text-xs text-muted-foreground">Herbs</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-2">
                        <Clock className="h-6 w-6 text-sage" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.lifestyle}</div>
                      <div className="text-xs text-muted-foreground">Lifestyle</div>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2">
                        <Sparkles className="h-6 w-6 text-gold" />
                      </div>
                      <div className="text-lg font-semibold">{activityStats.mental_health}</div>
                      <div className="text-xs text-muted-foreground">Mental Health</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              {recentActivities.length > 0 ? (
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-sage" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between p-3 rounded-lg border transition-all duration-300 hover:bg-muted/50"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-sage/20 flex items-center justify-center">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <div className="font-medium">{activity.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(activity.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {activity.duration} min
                            </Badge>
                            {activity.mood && getMoodIcon(activity.mood)}
                            {activity.completed && (
                              <CheckCircle className="h-4 w-4 text-sage" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-hover">
                  <CardContent className="pt-6 text-center">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-lg font-semibold mb-2">No Activities Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start logging your wellness activities to see them here
                    </p>
                    <Button onClick={() => setShowAddActivity(true)} className="btn-responsive-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Activity
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Analytics & Insights
                </h2>
                <p className="text-muted-foreground">
                  Deep dive into your wellness patterns
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-sage" />
                      Mood Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(moodStats).map(([mood, count]) => (
                        <div key={mood} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {getMoodIcon(mood)}
                            <span className="capitalize">{mood}</span>
                          </div>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gold" />
                      Dosha Focus
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(doshaStats).map(([dosha, count]) => (
                        <div key={dosha} className="flex items-center justify-between">
                          <span className="capitalize">{dosha}</span>
                          <Badge variant="outline">{count}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Activity Trends */}
              {activityTrends.length > 0 && (
                <Card className="card-hover">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-gold" />
                      Activity Trends (Last 30 Days)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {activityTrends.slice(-7).map(([date, stats]) => {
                        const dayStats = stats as { sessions: number; minutes: number; mood?: string };
                        return (
                          <div key={date} className="flex items-center justify-between p-2 rounded border">
                            <span className="text-sm">{new Date(date).toLocaleDateString()}</span>
                            <div className="flex items-center gap-4">
                              <span className="text-xs text-muted-foreground">
                                {dayStats.sessions} activities
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {dayStats.minutes} min
                              </span>
                              {dayStats.mood && getMoodIcon(dayStats.mood)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="mt-8">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Your Goals
                </h2>
                <p className="text-muted-foreground">
                  Track your progress towards wellness goals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progress.goals.map((goal) => (
                  <Card 
                    key={goal.id} 
                    className={`transition-all duration-300 hover:shadow-lg ${
                      goal.completed ? 'ring-2 ring-gold' : ''
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-pitta" />
                        {goal.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{goal.current}/{goal.target} {goal.unit}</span>
                        </div>
                        <Progress 
                          value={(goal.current / goal.target) * 100} 
                          className="h-2" 
                        />
                        {goal.completed && (
                          <div className="flex items-center gap-2 text-sm text-gold">
                            <Trophy className="h-4 w-4" />
                            <span>Completed!</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 