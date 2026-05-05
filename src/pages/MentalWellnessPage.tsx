import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Brain, Heart, Leaf, Wind, Flame, Mountain, Sun, CheckCircle, BookOpen, AlertTriangle, Clock, Activity, Shield, Search, X } from "lucide-react";
import { mentalConditions, therapeuticPractices, type MentalCondition, type TherapeuticPractice } from "@/data/mentalWellnessData";

const doshaColors: Record<string, string> = {
  Vata: 'bg-violet-100 text-violet-800 border-violet-200',
  Pitta: 'bg-orange-100 text-orange-800 border-orange-200',
  Kapha: 'bg-green-100 text-green-800 border-green-200',
  'Kapha/Vata': 'bg-teal-100 text-teal-800 border-teal-200',
  'Vata/Pitta': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'All Doshas': 'bg-blue-100 text-blue-800 border-blue-200',
};

const mentalStates = [
  { name: "Sattva", quality: "Balance & Clarity", description: "The state of harmony, clarity, and pure consciousness. When Sattva dominates, you experience peace, wisdom, and spiritual insight.", characteristics: ["Mental clarity", "Emotional stability", "Spiritual awareness", "Compassion", "Contentment"], color: "sage", icon: Sun },
  { name: "Rajas", quality: "Activity & Passion", description: "The dynamic principle of movement and change. Rajas brings motivation and drive but can lead to restlessness and attachment.", characteristics: ["High energy", "Goal-oriented", "Passionate", "Sometimes restless", "Driven nature"], color: "pitta", icon: Flame },
  { name: "Tamas", quality: "Inertia & Stability", description: "The principle of stability and rest. While necessary for sleep and grounding, excess Tamas leads to lethargy and confusion.", characteristics: ["Need for rest", "Grounding energy", "Can become lethargic", "Resistance to change", "Deep sleeper"], color: "kapha", icon: Mountain },
];

export default function MentalWellnessPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCondition, setSelectedCondition] = useState<MentalCondition | null>(null);
  const [selectedPractice, setSelectedPractice] = useState<TherapeuticPractice | null>(null);

  const filteredConditions = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return mentalConditions;
    return mentalConditions.filter(c =>
      c.name.toLowerCase().includes(q) || c.sanskrit.toLowerCase().includes(q) ||
      c.dosha.toLowerCase().includes(q) || c.symptoms.some(s => s.toLowerCase().includes(q))
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl mb-4">
            Mental <span className="text-gradient">Wellness</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {mentalConditions.length} conditions, {therapeuticPractices.length} therapeutic practices, and the Triguna framework — ancient Ayurvedic wisdom for modern mental health.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search conditions, symptoms, doshas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          {searchTerm && <Button variant="ghost" size="sm" onClick={() => setSearchTerm("")} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="h-4 w-4" /></Button>}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="trigunas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trigunas" className="flex items-center gap-2"><Sun className="h-4 w-4" /> Trigunas</TabsTrigger>
            <TabsTrigger value="conditions" className="flex items-center gap-2"><Brain className="h-4 w-4" /> Conditions ({mentalConditions.length})</TabsTrigger>
            <TabsTrigger value="practices" className="flex items-center gap-2"><Activity className="h-4 w-4" /> Practices ({therapeuticPractices.length})</TabsTrigger>
          </TabsList>

          {/* TRIGUNAS */}
          <TabsContent value="trigunas" className="mt-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-3">The Three Mental Qualities — Trigunas</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Understanding these three fundamental qualities helps us recognize and balance our mental patterns.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mentalStates.map(state => (
                <Card key={state.name} className={`h-full border border-${state.color}/20 shadow-md bg-gradient-to-br from-white to-${state.color}/5 hover:shadow-xl transition-all duration-300 relative overflow-hidden group`}>
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-${state.color}/10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-700`} />
                  <CardHeader className="text-center pb-4 relative z-10">
                    <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-${state.color}/20 to-${state.color}/5 shadow-inner flex items-center justify-center mb-4`}>
                      <state.icon className={`h-8 w-8 text-${state.color}`} />
                    </div>
                    <CardTitle className="text-2xl font-heading">{state.name}</CardTitle>
                    <CardDescription className="font-medium uppercase tracking-wider text-[10px] mt-1">{state.quality}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed bg-white/50 p-3 rounded-lg border border-border/50">{state.description}</p>
                    <h4 className={`font-semibold text-sm mb-3 text-${state.color}-800`}>Characteristics:</h4>
                    <ul className="space-y-2">
                      {state.characteristics.map((c, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center bg-muted/20 p-1.5 rounded-md">
                          <CheckCircle className={`h-3.5 w-3.5 text-${state.color} mr-2 flex-shrink-0 drop-shadow-sm`} />{c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* CONDITIONS */}
          <TabsContent value="conditions" className="mt-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-3">Mental Health in Ayurveda</h2>
              <p className="text-muted-foreground">Showing {filteredConditions.length} of {mentalConditions.length} conditions</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConditions.map((condition, i) => (
                <motion.div key={condition.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" onClick={() => setSelectedCondition(condition)}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{condition.name}</CardTitle>
                          <CardDescription className="italic">{condition.devanagari} ({condition.sanskrit})</CardDescription>
                        </div>
                        <Badge className={doshaColors[condition.dosha] || "bg-muted"} variant="outline">{condition.dosha}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{condition.description}</p>
                      <div>
                        <h4 className="font-semibold text-xs mb-1.5">Key Symptoms:</h4>
                        <div className="flex flex-wrap gap-1">
                          {condition.symptoms.slice(0, 4).map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}
                          {condition.symptoms.length > 4 && <Badge variant="outline" className="text-xs">+{condition.symptoms.length - 4}</Badge>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs mb-1.5">Key Herbs:</h4>
                        <div className="flex flex-wrap gap-1">
                          {condition.herbs.map(h => <Badge key={h.name} variant="outline" className="text-xs bg-sage/10">{h.name}</Badge>)}
                        </div>
                      </div>
                      <div className="text-xs text-sage-600 text-right">View full details →</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* PRACTICES */}
          <TabsContent value="practices" className="mt-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-foreground mb-3">Therapeutic Practices</h2>
              <p className="text-muted-foreground">Time-tested practices for mental wellness and emotional balance</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {therapeuticPractices.map((practice, i) => (
                <motion.div key={practice.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <Card className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]" onClick={() => setSelectedPractice(practice)}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{practice.name}</CardTitle>
                          <CardDescription className="italic">{practice.devanagari} ({practice.sanskrit})</CardDescription>
                        </div>
                        <Badge variant="secondary">{practice.type}</Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground"><Clock className="h-4 w-4 mr-1" /> {practice.duration}</div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">{practice.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {practice.benefits.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Condition Detail Modal */}
      <Dialog open={!!selectedCondition} onOpenChange={() => setSelectedCondition(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedCondition && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedCondition.name}
                  <span className="block text-lg font-normal text-muted-foreground mt-1">{selectedCondition.devanagari} — {selectedCondition.sanskrit}</span>
                </DialogTitle>
                <Badge className={doshaColors[selectedCondition.dosha] || "bg-muted"} variant="outline">{selectedCondition.dosha}</Badge>
              </DialogHeader>
              <p className="text-muted-foreground mt-2">{selectedCondition.description}</p>
              <Tabs defaultValue="symptoms" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1">
                  <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                  <TabsTrigger value="treatments">Treatments</TabsTrigger>
                  <TabsTrigger value="herbs">Herbs</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                </TabsList>
                <TabsContent value="symptoms" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Symptoms ({selectedCondition.symptoms.length})</h4>
                    <div className="flex flex-wrap gap-1.5">{selectedCondition.symptoms.map(s => <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>)}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Causes</h4>
                    <ul className="space-y-1.5">{selectedCondition.causes.map((c, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />{c}</li>)}</ul>
                  </div>
                </TabsContent>
                <TabsContent value="treatments" className="mt-4">
                  <ul className="space-y-2">{selectedCondition.treatments.map((t, i) => <li key={i} className="text-sm flex items-start"><CheckCircle className="h-3.5 w-3.5 text-sage mr-2 mt-0.5 flex-shrink-0" />{t}</li>)}</ul>
                </TabsContent>
                <TabsContent value="herbs" className="mt-4">
                  <div className="grid gap-4">
                    {selectedCondition.herbs.map(h => (
                      <div key={h.name} className="bg-sage/10 p-4 rounded-lg border border-sage/20">
                        <h4 className="font-semibold text-sage-800 mb-2 flex items-center gap-2"><Leaf className="h-4 w-4 text-sage" />{h.name}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
                          <div><span className="font-medium">Dosage:</span> {h.dosage}</div>
                          <div><span className="font-medium">Preparation:</span> {h.preparation}</div>
                          <div><span className="font-medium">Duration:</span> {h.duration}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="lifestyle" className="mt-4 space-y-4">
                  <ul className="space-y-2">{selectedCondition.lifestyleRecommendations.map((l, i) => <li key={i} className="text-sm flex items-start"><CheckCircle className="h-3.5 w-3.5 text-sage mr-2 mt-0.5 flex-shrink-0" />{l}</li>)}</ul>
                  <div className="flex flex-wrap gap-1.5">{selectedCondition.sources.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s}</Badge>)}</div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Practice Detail Modal */}
      <Dialog open={!!selectedPractice} onOpenChange={() => setSelectedPractice(null)}>
        <DialogContent className="max-w-2xl">
          {selectedPractice && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  {selectedPractice.name}
                  <span className="block text-lg font-normal text-muted-foreground mt-1">{selectedPractice.devanagari} — {selectedPractice.sanskrit}</span>
                </DialogTitle>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary">{selectedPractice.type}</Badge>
                  <Badge variant="outline"><Clock className="h-3 w-3 mr-1" /> {selectedPractice.duration}</Badge>
                </div>
              </DialogHeader>
              <p className="text-muted-foreground mt-2">{selectedPractice.description}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <div className="flex flex-wrap gap-1.5">{selectedPractice.benefits.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}</div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Technique</h4>
                  <p className="text-sm text-muted-foreground bg-sage/10 p-4 rounded-lg">{selectedPractice.technique}</p>
                </div>
                {selectedPractice.contraindications.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Contraindications</h4>
                    <ul className="space-y-1">{selectedPractice.contraindications.map((c, i) => <li key={i} className="text-sm text-muted-foreground flex items-start"><AlertTriangle className="h-3.5 w-3.5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />{c}</li>)}</ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-1.5">{selectedPractice.sources.map((s, i) => <Badge key={i} variant="outline" className="text-xs">{s}</Badge>)}</div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}