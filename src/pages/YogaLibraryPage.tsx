import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Clock, Heart, Activity, Leaf, X, AlertTriangle, BookOpen,
  ChevronRight, Wind, Flame, Mountain, Filter, CheckCircle, Zap
} from "lucide-react";
import {
  comprehensiveYogaPoses, yogaSequences, pranayamaTechniques,
  type YogaPose, type YogaSequence, type PranayamaTechnique
} from "@/assets/comprehensiveYogaPoses";
import { useAuth } from '@/lib/auth-context';

const doshaColors: Record<string, string> = {
  'Vata': 'bg-violet-100 text-violet-800 border-violet-200',
  'Pitta': 'bg-orange-100 text-orange-800 border-orange-200',
  'Kapha': 'bg-green-100 text-green-800 border-green-200',
  'All Doshas': 'bg-blue-100 text-blue-800 border-blue-200',
};

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-emerald-100 text-emerald-800',
  'Intermediate': 'bg-amber-100 text-amber-800',
  'Advanced': 'bg-red-100 text-red-800',
};

const gunaIcons: Record<string, React.ReactNode> = {
  'Sattvic': <Mountain className="w-3.5 h-3.5" />,
  'Rajasic': <Flame className="w-3.5 h-3.5" />,
  'Tamasic': <Leaf className="w-3.5 h-3.5" />,
};

export default function YogaLibraryPage() {
  const { user } = useAuth();
  
  // Auto-select the user's primary dosha if they have one
  const defaultDosha = user?.primaryDosha 
    ? user.primaryDosha.charAt(0).toUpperCase() + user.primaryDosha.slice(1) 
    : 'All';

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDosha, setSelectedDosha] = useState(defaultDosha);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedPose, setSelectedPose] = useState<YogaPose | null>(null);
  const [activeTab, setActiveTab] = useState("poses");

  const categories = useMemo(() => {
    const cats = new Set(comprehensiveYogaPoses.map(p => p.category));
    return ["All", ...Array.from(cats).sort()];
  }, []);

  const filteredPoses = useMemo(() => {
    return comprehensiveYogaPoses.filter(pose => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        pose.name.toLowerCase().includes(q) ||
        pose.sanskrit.toLowerCase().includes(q) ||
        pose.description.toLowerCase().includes(q) ||
        pose.benefits.some(b => b.toLowerCase().includes(q)) ||
        pose.therapeuticUses.some(t => t.toLowerCase().includes(q));
      const matchesCat = selectedCategory === "All" || pose.category === selectedCategory;
      const matchesDosha = selectedDosha === "All" || pose.dosha === selectedDosha || pose.dosha === "All Doshas";
      const matchesDiff = selectedDifficulty === "All" || pose.difficulty === selectedDifficulty;
      return matchesSearch && matchesCat && matchesDosha && matchesDiff;
    });
  }, [searchQuery, selectedCategory, selectedDosha, selectedDifficulty]);

  const hasFilters = selectedCategory !== "All" || selectedDosha !== "All" || selectedDifficulty !== "All" || searchQuery;

  const clearFilters = () => {
    setSearchQuery(""); setSelectedCategory("All"); setSelectedDosha("All"); setSelectedDifficulty("All");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-heading font-bold text-foreground sm:text-5xl lg:text-6xl">
            Ayurvedic <span className="text-gradient">Yoga Library</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {comprehensiveYogaPoses.length} therapeutic poses, {yogaSequences.length} dosha-specific sequences, and {pranayamaTechniques.length} pranayama techniques from David Frawley's "Yoga for Your Type" and classical Ayurvedic texts.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="poses" className="flex items-center gap-2">
              <Activity className="h-4 w-4" /> Poses ({comprehensiveYogaPoses.length})
            </TabsTrigger>
            <TabsTrigger value="sequences" className="flex items-center gap-2">
              <Zap className="h-4 w-4" /> Sequences ({yogaSequences.length})
            </TabsTrigger>
            <TabsTrigger value="pranayama" className="flex items-center gap-2">
              <Wind className="h-4 w-4" /> Pranayama ({pranayamaTechniques.length})
            </TabsTrigger>
          </TabsList>

          {/* POSES TAB */}
          <TabsContent value="poses">
            {/* Search + Filters */}
            <div className="space-y-4 mb-8">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search poses, benefits, or therapeutic uses..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
                {searchQuery && <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="w-4 h-4" /></Button>}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-44"><SelectValue placeholder="Category" /></SelectTrigger>
                  <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c === "All" ? "All Categories" : c}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Dosha" /></SelectTrigger>
                  <SelectContent>{["All","Vata","Pitta","Kapha","All Doshas"].map(d => <SelectItem key={d} value={d}>{d === "All" ? "All Doshas" : d}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-40"><SelectValue placeholder="Difficulty" /></SelectTrigger>
                  <SelectContent>{["All","Beginner","Intermediate","Advanced"].map(d => <SelectItem key={d} value={d}>{d === "All" ? "All Levels" : d}</SelectItem>)}</SelectContent>
                </Select>
                {hasFilters && <Button variant="outline" size="sm" onClick={clearFilters}><X className="w-4 h-4 mr-1" /> Clear</Button>}
              </div>
            </div>

            {/* Pose Grid */}
            <div className="mb-4 text-sm text-muted-foreground text-center">
              Showing {filteredPoses.length} of {comprehensiveYogaPoses.length} poses
            </div>
            {filteredPoses.length === 0 ? (
              <div className="text-center py-16 rounded-2xl border border-border bg-muted/30">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No poses match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Clear all filters</Button>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPoses.map((pose, i) => (
                  <motion.div key={pose.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                    <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-border/50" onClick={() => setSelectedPose(pose)}>
                      {/* Visual header */}
                      <div className="relative h-36 bg-gradient-to-br from-sage/20 via-gold/10 to-earth/10 flex items-center justify-center rounded-t-lg overflow-hidden">
                        <div className="text-center p-4">
                          <Activity className="h-10 w-10 mx-auto text-sage/50 mb-1" />
                          <span className="text-sm font-medium text-foreground/70">{pose.sanskrit}</span>
                        </div>
                        <div className="absolute top-3 left-3 flex gap-1.5">
                          <Badge className={doshaColors[pose.dosha] || "bg-muted"} variant="outline">{pose.dosha}</Badge>
                          <Badge className={difficultyColors[pose.difficulty] || "bg-muted"}>{pose.difficulty}</Badge>
                        </div>
                        <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-foreground bg-background/80 px-2 py-1 rounded">
                          <Clock className="h-3.5 w-3.5" /> {pose.duration}
                        </div>
                        <div className="absolute bottom-3 right-3">
                          <Badge variant="outline" className="bg-background/80 text-xs flex items-center gap-1">
                            {gunaIcons[pose.guna]} {pose.guna}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{pose.name}</CardTitle>
                        <CardDescription className="text-sage-600 font-medium">{pose.sanskrit}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground line-clamp-2">{pose.description}</p>
                        <div>
                          <h4 className="font-semibold text-xs text-foreground mb-1.5 flex items-center"><Heart className="h-3.5 w-3.5 mr-1 text-sage" /> Benefits</h4>
                          <ul className="space-y-0.5">
                            {pose.benefits.slice(0, 3).map((b, j) => (
                              <li key={j} className="flex items-start text-xs text-muted-foreground">
                                <span className="text-sage mr-1.5 mt-0.5">•</span>{b}
                              </li>
                            ))}
                            {pose.benefits.length > 3 && <li className="text-xs text-sage-600 font-medium">+{pose.benefits.length - 3} more</li>}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <Badge variant="outline" className="text-xs">{pose.category}</Badge>
                          <span className="text-xs text-sage-600 flex items-center gap-1">View details <ChevronRight className="h-3 w-3" /></span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* SEQUENCES TAB */}
          <TabsContent value="sequences">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {yogaSequences.map((seq, i) => (
                <Card key={i} className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{seq.name}</CardTitle>
                      <Badge className={doshaColors[seq.dosha] || "bg-muted"} variant="outline">{seq.dosha}</Badge>
                    </div>
                    <CardDescription>{seq.description}</CardDescription>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> {seq.duration}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Sequence ({seq.poses.length} poses):</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {seq.poses.map((p, j) => <Badge key={j} variant="secondary" className="text-xs">{j + 1}. {p}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1"><Heart className="h-3.5 w-3.5 text-sage" /> Benefits</h4>
                      <ul className="space-y-1">
                        {seq.benefits.map((b, j) => <li key={j} className="text-xs text-muted-foreground flex items-start"><CheckCircle className="h-3 w-3 text-sage mr-1.5 mt-0.5 flex-shrink-0" />{b}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1"><BookOpen className="h-3.5 w-3.5 text-gold" /> Instructions</h4>
                      <ol className="space-y-1">
                        {seq.instructions.map((inst, j) => <li key={j} className="text-xs text-muted-foreground">{j + 1}. {inst}</li>)}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* PRANAYAMA TAB */}
          <TabsContent value="pranayama">
            <div className="grid gap-6 md:grid-cols-2">
              {pranayamaTechniques.map((tech, i) => (
                <Card key={i} className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2"><Wind className="h-5 w-5 text-sage" />{tech.name}</CardTitle>
                        <CardDescription className="italic">{tech.sanskrit}</CardDescription>
                      </div>
                      <Badge className={doshaColors[tech.dosha] || "bg-muted"} variant="outline">{tech.dosha}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="h-4 w-4" /> {tech.duration}</div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{tech.description}</p>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Benefits:</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {tech.benefits.map((b, j) => <Badge key={j} variant="secondary" className="text-xs">{b}</Badge>)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Step-by-Step:</h4>
                      <ol className="space-y-1.5">
                        {tech.instructions.map((inst, j) => (
                          <li key={j} className="text-sm text-muted-foreground flex items-start">
                            <span className="bg-sage/20 text-sage rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">{j + 1}</span>{inst}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Sources */}
        <section className="bg-gradient-to-br from-sage/10 to-gold/10 rounded-2xl p-8 mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Authentic Ayurvedic Sources</h2>
            <p className="text-muted-foreground mb-6">Based on David Frawley's "Yoga for Your Type" and classical Hatha Yoga texts</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              <div className="text-center"><div className="text-3xl font-heading font-bold text-gold mb-2">{comprehensiveYogaPoses.length}</div><div className="text-sm text-muted-foreground">Poses</div></div>
              <div className="text-center"><div className="text-3xl font-heading font-bold text-sage mb-2">{yogaSequences.length}</div><div className="text-sm text-muted-foreground">Sequences</div></div>
              <div className="text-center"><div className="text-3xl font-heading font-bold text-earth mb-2">{pranayamaTechniques.length}</div><div className="text-sm text-muted-foreground">Pranayama</div></div>
              <div className="text-center"><div className="text-3xl font-heading font-bold text-gold mb-2">5000+</div><div className="text-sm text-muted-foreground">Years</div></div>
            </div>
          </div>
        </section>
      </div>

      {/* Pose Detail Modal */}
      <Dialog open={!!selectedPose} onOpenChange={() => setSelectedPose(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPose && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedPose.name}
                  <span className="block text-lg font-normal text-muted-foreground mt-1">{selectedPose.sanskrit}</span>
                </DialogTitle>
                <div className="flex gap-2 flex-wrap mt-2">
                  <Badge className={doshaColors[selectedPose.dosha] || "bg-muted"} variant="outline">{selectedPose.dosha}</Badge>
                  <Badge className={difficultyColors[selectedPose.difficulty] || "bg-muted"}>{selectedPose.difficulty}</Badge>
                  <Badge variant="outline" className="flex items-center gap-1">{gunaIcons[selectedPose.guna]} {selectedPose.guna}</Badge>
                  <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {selectedPose.duration}</Badge>
                </div>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full mt-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="steps">Instructions</TabsTrigger>
                  <TabsTrigger value="dosha">Dosha Guide</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-4">
                  <p className="text-muted-foreground leading-relaxed">{selectedPose.description}</p>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Heart className="h-4 w-4 text-sage" /> Benefits</h4>
                    <ul className="grid gap-1.5">
                      {selectedPose.benefits.map((b, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><CheckCircle className="h-3.5 w-3.5 text-sage mr-2 mt-0.5 flex-shrink-0" />{b}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><Activity className="h-4 w-4 text-gold" /> Therapeutic Uses</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPose.therapeuticUses.map((t, i) => <Badge key={i} variant="secondary" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="steps" className="space-y-4 mt-4">
                  <h4 className="font-semibold mb-3">Step-by-Step Instructions</h4>
                  <ol className="space-y-3">
                    {selectedPose.stepByStep.map((step) => (
                      <li key={step.step} className="flex items-start">
                        <span className="bg-sage/20 text-sage rounded-full w-7 h-7 flex items-center justify-center text-sm mr-3 flex-shrink-0 font-medium">{step.step}</span>
                        <span className="text-muted-foreground pt-0.5">{step.instruction}</span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>

                <TabsContent value="dosha" className="space-y-4 mt-4">
                  <div className="grid gap-4">
                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                      <h4 className="font-semibold text-violet-900 mb-2">Vata Dosha</h4>
                      <p className="text-sm text-violet-800">{selectedPose.doshaSpecific.vata}</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-900 mb-2">Pitta Dosha</h4>
                      <p className="text-sm text-orange-800">{selectedPose.doshaSpecific.pitta}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Kapha Dosha</h4>
                      <p className="text-sm text-green-800">{selectedPose.doshaSpecific.kapha}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="space-y-4 mt-4">
                  {selectedPose.contraindications.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Contraindications</h4>
                      <ul className="space-y-1.5">
                        {selectedPose.contraindications.map((c, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />{c}</li>)}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2"><BookOpen className="h-4 w-4 text-gold" /> Sources</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPose.sources.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s}</Badge>)}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
