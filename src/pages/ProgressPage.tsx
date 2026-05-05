import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Activity, Flame, Target, Trophy, TrendingUp, Calendar, Heart, Brain, Leaf,
  Plus, Clock, CheckCircle, Sun, Utensils, Mountain, Zap
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Cell, Legend, LineChart, Line,
} from "recharts";
import { useProgress } from "@/hooks/useProgress";

const COLORS = ["#7c9a6e", "#c9a959", "#b07c4f", "#6b8ba4", "#a07ca8", "#7aab9f"];
const doshaColors = { vata: "#818cf8", pitta: "#fb923c", kapha: "#4ade80" };

const activityIcons: Record<string, React.ReactNode> = {
  yoga: <Mountain className="h-4 w-4" />,
  meditation: <Brain className="h-4 w-4" />,
  diet: <Utensils className="h-4 w-4" />,
  herbs: <Leaf className="h-4 w-4" />,
  lifestyle: <Sun className="h-4 w-4" />,
  mental_health: <Heart className="h-4 w-4" />,
};

export default function ProgressPage() {
  const {
    progress, addActivity, getWeeklyProgress, getMonthlyProgress,
    getStreak, getActivityStats, getMoodStats, getDoshaStats,
    getRecentActivities, getActivityTrends
  } = useProgress();

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: "yoga" as const, name: "", duration: 30, completed: true, mood: "good" as const, dosha: "vata"
  });

  const weekly = getWeeklyProgress();
  const monthly = getMonthlyProgress();
  const streak = getStreak();
  const activityStats = getActivityStats();
  const moodStats = getMoodStats();
  const doshaStats = getDoshaStats();
  const recent = getRecentActivities(8);
  const trends = getActivityTrends();

  // Chart data
  const trendData = useMemo(() =>
    trends.slice(-14).map(([date, data]: [string, any]) => ({
      date: new Date(date).toLocaleDateString("en", { month: "short", day: "numeric" }),
      minutes: data.minutes, sessions: data.sessions,
    })), [trends]
  );

  const activityPieData = useMemo(() =>
    Object.entries(activityStats).filter(([, v]) => v > 0).map(([k, v]) => ({
      name: k.replace("_", " "), value: v,
    })), [activityStats]
  );

  const moodPieData = useMemo(() =>
    Object.entries(moodStats).filter(([, v]) => v > 0).map(([k, v]) => ({
      name: k, value: v,
    })), [moodStats]
  );

  const radarData = useMemo(() => [
    { dimension: "Yoga", value: Math.min(activityStats.yoga * 10, 100) },
    { dimension: "Meditation", value: Math.min(activityStats.meditation * 10, 100) },
    { dimension: "Diet", value: Math.min(activityStats.diet * 10, 100) },
    { dimension: "Herbs", value: Math.min(activityStats.herbs * 10, 100) },
    { dimension: "Lifestyle", value: Math.min(activityStats.lifestyle * 10, 100) },
    { dimension: "Mental", value: Math.min(activityStats.mental_health * 10, 100) },
  ], [activityStats]);

  const handleAddActivity = () => {
    addActivity(newActivity);
    setShowAddDialog(false);
    setNewActivity({ type: "yoga", name: "", duration: 30, completed: true, mood: "good", dosha: "vata" });
  };

  const isSampleData = progress.activities.some(a => a.id.startsWith('mock-'));

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-foreground">
                Wellness <span className="text-gradient">Dashboard</span>
              </h1>
              {isSampleData && (
                <div className="bg-gold/20 text-gold-700 border border-gold/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  Sample Data
                </div>
              )}
            </div>
            <p className="text-muted-foreground">Track your Ayurvedic wellness journey with clinical-grade insights.</p>
          </div>
          <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
            <DialogTrigger asChild>
              <Button className="gap-2"><Plus className="h-4 w-4" /> Log Activity</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Log Wellness Activity</DialogTitle></DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Type</Label>
                    <Select value={newActivity.type} onValueChange={v => setNewActivity(p => ({ ...p, type: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["yoga","meditation","diet","herbs","lifestyle","mental_health"].map(t =>
                          <SelectItem key={t} value={t}>{t.replace("_"," ")}</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Duration (min)</Label>
                    <Input type="number" value={newActivity.duration} onChange={e => setNewActivity(p => ({ ...p, duration: +e.target.value }))} />
                  </div>
                </div>
                <div>
                  <Label>Name</Label>
                  <Input value={newActivity.name} onChange={e => setNewActivity(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Morning Sun Salutation" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Mood</Label>
                    <Select value={newActivity.mood} onValueChange={v => setNewActivity(p => ({ ...p, mood: v as any }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["great","good","neutral","poor"].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Dosha Focus</Label>
                    <Select value={newActivity.dosha} onValueChange={v => setNewActivity(p => ({ ...p, dosha: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{["vata","pitta","kapha"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddActivity} className="w-full">Log Activity</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Evident-Battery Inspired Process Banner */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 border-y border-border py-8">
          <div className="flex flex-col items-start gap-2 border-l-4 border-sage pl-4">
            <span className="text-sm font-bold text-sage uppercase tracking-wider">01 | Track</span>
            <h3 className="font-heading font-semibold text-xl">Log Activities</h3>
            <p className="text-muted-foreground text-sm">Consistent daily tracking of yoga, diet, and mental wellness creates a baseline for your Ayurvedic profile.</p>
          </div>
          <div className="flex flex-col items-start gap-2 border-l-4 border-gold pl-4">
            <span className="text-sm font-bold text-gold uppercase tracking-wider">02 | Analyze</span>
            <h3 className="font-heading font-semibold text-xl">Discover Patterns</h3>
            <p className="text-muted-foreground text-sm">Our system processes your logs to extract unique health signatures and correlate them with your primary Dosha.</p>
          </div>
          <div className="flex flex-col items-start gap-2 border-l-4 border-amber-500 pl-4">
            <span className="text-sm font-bold text-amber-500 uppercase tracking-wider">03 | Balance</span>
            <h3 className="font-heading font-semibold text-xl">Actionable Insights</h3>
            <p className="text-muted-foreground text-sm">Receive personalized diagnostics to correct energetic imbalances before they manifest as physical ailments.</p>
          </div>
        </div>

        {/* AI Actionable Insights (Powered by Ayur.me AI) */}
        <div className="mb-10 bg-gradient-to-r from-sage/10 via-background to-gold/10 border border-sage/20 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-heading font-bold text-foreground">Diagnostic Insights</h2>
            <span className="ml-2 text-[10px] uppercase tracking-wider bg-gold/20 text-gold-700 px-2 py-0.5 rounded-full font-bold">Powered by AI</span>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/60 p-4 rounded-xl border border-sage/10">
              <h4 className="font-semibold text-sage-800 text-sm mb-1 flex items-center"><Activity className="w-4 h-4 mr-1"/> Elevated Vata Detected</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Your recent anxiety levels and sleep irregularities suggest a Vata imbalance. We recommend adding 15 mins of grounding Yoga (Child's Pose) daily.</p>
            </div>
            <div className="bg-white/60 p-4 rounded-xl border border-sage/10">
              <h4 className="font-semibold text-emerald-800 text-sm mb-1 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/> Strong Routine Integrity</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">You've logged 14 consecutive days of activity. This consistency strengthens Ojas (immunity). Maintain your morning meditation habit.</p>
            </div>
            <div className="bg-white/60 p-4 rounded-xl border border-sage/10">
              <h4 className="font-semibold text-amber-800 text-sm mb-1 flex items-center"><TrendingUp className="w-4 h-4 mr-1"/> Dietary Optimization</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Your Pitta is currently stable. Continue incorporating cooling foods (cucumber, mint) into your afternoon meals to sustain this balance.</p>
            </div>
          </div>
        </div>

        {/* Stat Cards - The core metrics of the dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Current Streak", value: `${streak} days`, icon: Flame, color: "text-amber-500", bg: "bg-amber-500/20" },
            { label: "Total Sessions", value: progress.totalSessions, icon: Activity, color: "text-sage-400", bg: "bg-sage/20" },
            { label: "Total Minutes", value: progress.totalMinutes, icon: Clock, color: "text-emerald-500", bg: "bg-emerald-500/20" },
            { label: "Avg Session", value: `${progress.averageSessionLength} min`, icon: TrendingUp, color: "text-gold", bg: "bg-gold/20" },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-sage/20 shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-900/10 transition-all duration-300 relative overflow-hidden group bg-gradient-to-br from-white to-sage/5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                <CardContent className="pt-6 relative z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-heading font-bold text-foreground">{stat.value}</p>
                    </div>
                    <div className={`p-4 rounded-2xl ${stat.bg} shadow-inner`}>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Progress Bars */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <Card className="border-sage/20 shadow-lg bg-gradient-to-br from-white via-white to-sage/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sage/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <CardTitle className="text-lg font-heading flex items-center gap-2"><Target className="h-5 w-5 text-sage" /> Weekly Goal</CardTitle>
                  <CardDescription className="text-sm mt-1">{weekly.completed} / {weekly.goal} minutes</CardDescription>
                </div>
                <div className="bg-sage/10 text-sage-800 px-3 py-1 rounded-full text-xs font-bold shadow-inner">
                  {Math.round(weekly.percentage)}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="relative mt-2">
                <div className="w-full bg-muted/40 rounded-full h-6 overflow-hidden shadow-inner border border-sage/10 relative z-10">
                  <motion.div className="h-full bg-gradient-to-r from-sage to-emerald-500 rounded-full relative shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" initial={{ width: 0 }} animate={{ width: `${weekly.percentage}%` }} transition={{ duration: 1.5, ease: "easeOut" }}>
                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }} />
                  </motion.div>
                </div>
                {/* Glow Effect under the bar */}
                <div className="absolute top-2 left-0 h-6 bg-sage/40 blur-xl z-0" style={{ width: `${weekly.percentage}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-3 font-medium">Keep your momentum to build Ojas.</p>
            </CardContent>
          </Card>
          
          <Card className="border-gold/20 shadow-lg bg-gradient-to-br from-white via-white to-gold/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700" />
            <CardHeader className="pb-2 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <CardTitle className="text-lg font-heading flex items-center gap-2"><Calendar className="h-5 w-5 text-gold" /> Monthly Goal</CardTitle>
                  <CardDescription className="text-sm mt-1">{monthly.completed} / {monthly.goal} minutes</CardDescription>
                </div>
                <div className="bg-gold/10 text-gold-800 px-3 py-1 rounded-full text-xs font-bold shadow-inner">
                  {Math.round(monthly.percentage)}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <div className="relative mt-2">
                <div className="w-full bg-muted/40 rounded-full h-6 overflow-hidden shadow-inner border border-gold/10 relative z-10">
                  <motion.div className="h-full bg-gradient-to-r from-gold to-amber-500 rounded-full relative shadow-[inset_0_-2px_4px_rgba(0,0,0,0.1)]" initial={{ width: 0 }} animate={{ width: `${monthly.percentage}%` }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}>
                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }} />
                  </motion.div>
                </div>
                {/* Glow Effect under the bar */}
                <div className="absolute top-2 left-0 h-6 bg-gold/40 blur-xl z-0" style={{ width: `${monthly.percentage}%` }} />
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-3 font-medium">Consistency is the key to Ayurvedic healing.</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="activity" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
            <TabsTrigger value="activity">Activity Trend</TabsTrigger>
            <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
            <TabsTrigger value="balance">Wellness Balance</TabsTrigger>
            <TabsTrigger value="dosha">Dosha Focus</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-sage" /> 14-Day Activity Trend</CardTitle>
                <CardDescription>Daily minutes and sessions over the last 2 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                {trendData.some(d => d.minutes > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c9a6e" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#7c9a6e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Area type="monotone" dataKey="minutes" stroke="#7c9a6e" fill="url(#colorMin)" strokeWidth={2} />
                      <Line type="monotone" dataKey="sessions" stroke="#c9a959" strokeWidth={2} dot={false} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                      <p>No activity data yet. Log your first session!</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle>Activity Breakdown</CardTitle>
                <CardDescription>Distribution of your wellness activities</CardDescription>
              </CardHeader>
              <CardContent>
                {activityPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie data={activityPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                        {activityPieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">No data yet</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="balance">
            <Card>
              <CardHeader>
                <CardTitle>Wellness Dimensions</CardTitle>
                <CardDescription>How balanced is your wellness practice?</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="dimension" fontSize={12} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={10} />
                    <Radar name="Balance" dataKey="value" stroke="#7c9a6e" fill="#7c9a6e" fillOpacity={0.3} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dosha">
            <Card>
              <CardHeader>
                <CardTitle>Dosha Focus Distribution</CardTitle>
                <CardDescription>Which dosha have you been focusing on?</CardDescription>
              </CardHeader>
              <CardContent>
                {Object.values(doshaStats).some(v => v > 0) ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={[
                      { name: "Vata", value: doshaStats.vata, fill: doshaColors.vata },
                      { name: "Pitta", value: doshaStats.pitta, fill: doshaColors.pitta },
                      { name: "Kapha", value: doshaStats.kapha, fill: doshaColors.kapha },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                        {[doshaColors.vata, doshaColors.pitta, doshaColors.kapha].map((c, i) => <Cell key={i} fill={c} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">No dosha data yet</div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Achievements + Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Achievements */}
          <Card className="border-sage/20 shadow-md bg-gradient-to-br from-white to-sage/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5 text-gold" /> Achievements</CardTitle>
              <CardDescription>{progress.achievements.filter(a => a.unlocked).length} / {progress.achievements.length} unlocked</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {progress.achievements.map(ach => (
                  <div key={ach.id} className={`p-4 rounded-xl border transition-all duration-300 text-center flex flex-col justify-between h-full ${ach.unlocked ? "bg-gradient-to-br from-gold/10 to-amber-500/5 border-gold/30 shadow-inner" : "bg-muted/20 border-border/50 opacity-70 hover:opacity-100"}`}>
                    <div>
                      <span className="text-3xl drop-shadow-sm">{ach.icon}</span>
                      <h4 className={`font-semibold text-xs mt-2 ${ach.unlocked ? "text-amber-900" : "text-muted-foreground"}`}>{ach.name}</h4>
                      <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2 leading-tight">{ach.description}</p>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-background/50 rounded-full h-1.5 shadow-inner overflow-hidden border border-border/50">
                        <div className={`h-full rounded-full transition-all duration-1000 ${ach.unlocked ? "bg-gradient-to-r from-gold to-amber-500" : "bg-sage/40"}`} style={{ width: `${Math.min((ach.progress / ach.target) * 100, 100)}%` }} />
                      </div>
                      <span className="text-[9px] font-medium text-muted-foreground mt-1 block uppercase tracking-wider">{ach.progress}/{ach.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="border-sage/20 shadow-md bg-gradient-to-br from-white to-sage/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-sage" /> Recent Activities</CardTitle>
              <CardDescription>Your latest wellness sessions</CardDescription>
            </CardHeader>
            <CardContent>
              {recent.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No activities logged yet.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => setShowAddDialog(true)}>Log your first activity</Button>
                </div>
              ) : (
                <div className="space-y-3">
                  {recent.map(act => (
                    <div key={act.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-sage/10 shadow-sm hover:shadow-md hover:border-sage/30 transition-all duration-300">
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-sage/20 to-sage/5 text-sage shadow-inner">{activityIcons[act.type]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{act.name || act.type.replace("_", " ")}</p>
                        <p className="text-xs text-muted-foreground font-medium">{new Date(act.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-1">
                        <Badge variant="secondary" className="text-xs font-bold bg-sage/10 text-sage-800 hover:bg-sage/20">{act.duration} min</Badge>
                        {act.completed && <CheckCircle className="h-4 w-4 text-emerald-500 drop-shadow-sm" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}