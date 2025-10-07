import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Book,
  Leaf,
  Heart,
  Brain,
  Eye,
  Bone,
  Droplets,
  Zap,
  ChevronDown,
  ChevronRight,
  X,
  Star,
  AlertTriangle,
  Stethoscope,
  Activity,
  Shield,
  Pill,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ayurvedicDiseases } from "../assets/ayurvedicDiseases";
import DiseaseFlashcard from "../components/DiseaseFlashcard";

const doshaColors = {
  Vata: "bg-blue-100 text-blue-800 border-blue-200",
  Pitta: "bg-red-100 text-red-800 border-red-200",
  Kapha: "bg-green-100 text-green-800 border-green-200",
};

const severityColors = {
  Mild: "bg-sage/20 text-foreground",
  "Mild to Moderate": "bg-yellow-100 text-yellow-800",
  Moderate: "bg-orange-100 text-orange-800",
  "Moderate to Severe": "bg-red-100 text-red-800",
  Severe: "bg-red-200 text-red-900",
};

const staggerConfig = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05
    }
  }
};

export default function DiseaseDatabasePage() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDosha, setSelectedDosha] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch from backend API
    fetch("/api/diseases?limit=1000") // Request more diseases
      .then((res) => res.json())
      .then((data) => {
        // Normalize backend data to expected frontend structure
        const backendDiseases = (data.diseases || data || []).map((d) => ({
          ...d,
          dosha: d.dosha || [d.primaryDosha, d.secondaryDosha].filter(Boolean),
          severity: d.severity || d.severityLevel || "Moderate",
          symptoms: d.symptoms || [],
          category: d.category || "",
          treatments: d.treatments || [],
          diet: d.diet || {
            include: d.dietaryGuidelines?.foodsToInclude || [],
            avoid: d.dietaryGuidelines?.foodsToAvoid || [],
          },
          lifestyle: d.lifestyle || [
            ...(d.lifestyleRecommendations?.dailyRoutine || []),
            ...(d.lifestyleRecommendations?.exercise || []),
            ...(d.lifestyleRecommendations?.yoga || []),
            ...(d.lifestyleRecommendations?.meditation || []),
            ...(d.lifestyleRecommendations?.sleep || []),
          ],
          source: d.sources?.[0]?.text || d.source || "",
        }));

        // Merge backend and static data, removing duplicates by name
        const allDiseases = [...backendDiseases];
        const existingNames = new Set(backendDiseases.map(d => d.name?.toLowerCase()));
        
        ayurvedicDiseases.forEach(staticDisease => {
          if (!existingNames.has(staticDisease.name.toLowerCase())) {
            allDiseases.push(staticDisease);
          }
        });

        setDiseases(allDiseases);
        setLoading(false);
        console.log(`Loaded ${allDiseases.length} total diseases (${backendDiseases.length} from backend, ${ayurvedicDiseases.length - (allDiseases.length - backendDiseases.length)} from static)`);
      })
      .catch((err) => {
        // If backend fails, use static data
        setDiseases(ayurvedicDiseases);
        setError("Backend unavailable - using static data");
        setLoading(false);
        console.log(`Loaded ${ayurvedicDiseases.length} diseases from static source`);
      });
  }, []);

  // Build categories dynamically from data
  const categories = useMemo(() => {
    const cats = {};
    diseases.forEach((d) => {
      if (d.category) cats[d.category] = (cats[d.category] || 0) + 1;
    });
    const catArr = [
      { name: "All", icon: null, count: diseases.length },
      ...Object.keys(cats).map((cat) => ({
        name: cat,
        icon:
          cat === "Digestive"
            ? <Droplets className="w-4 h-4" />
            : cat === "Respiratory"
            ? <Heart className="w-4 h-4" />
            : cat === "Joints"
            ? <Bone className="w-4 h-4" />
            : cat === "Skin"
            ? <Leaf className="w-4 h-4" />
            : cat === "Mental Health"
            ? <Brain className="w-4 h-4" />
            : cat === "Cardiovascular"
            ? <Heart className="w-4 h-4" />
            : cat === "Metabolic"
            ? <Zap className="w-4 h-4" />
            : cat === "Ophthalmology"
            ? <Eye className="w-4 h-4" />
            : cat === "Women's Health"
            ? <Heart className="w-4 h-4" />
            : cat === "Neurological"
            ? <Brain className="w-4 h-4" />
            : cat === "Hepatic"
            ? <Activity className="w-4 h-4" />
            : cat === "Urogenital"
            ? <Droplets className="w-4 h-4" />
            : cat === "Anorectal"
            ? <Activity className="w-4 h-4" />
            : cat === "Pediatric"
            ? <Heart className="w-4 h-4" />
            : cat === "Geriatric"
            ? <Shield className="w-4 h-4" />
            : cat === "Surgical"
            ? <Stethoscope className="w-4 h-4" />
            : cat === "Toxicology"
            ? <AlertTriangle className="w-4 h-4" />
            : cat === "Infectious"
            ? <Shield className="w-4 h-4" />
            : cat === "Immunology"
            ? <Shield className="w-4 h-4" />
            : cat === "Endocrine"
            ? <Zap className="w-4 h-4" />
            : cat === "Rheumatology"
            ? <Bone className="w-4 h-4" />
            : cat === "Hematological"
            ? <Droplets className="w-4 h-4" />
            : cat === "General"
            ? <Activity className="w-4 h-4" />
            : null,
        count: cats[cat],
      })),
    ];
    return catArr;
  }, [diseases]);

  // Build dosha and severity options from data
  const doshaOptions = ["All", ...Array.from(new Set(diseases.flatMap((d) => d.dosha || d.primaryDosha || []))).filter(Boolean)];
  const severityOptions = [
    "All",
    ...Array.from(new Set(diseases.map((d) => d.severity))).filter(Boolean),
  ];

  const filteredDiseases = useMemo(() => {
    return diseases.filter((disease) => {
      const matchesSearch =
        (disease.name && disease.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (disease.englishName && disease.englishName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (disease.symptoms && disease.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))) ||
        (disease.category && disease.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (disease.source && disease.source.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "All" || disease.category === selectedCategory;
      const doshaArr = disease.dosha || disease.primaryDosha || [];
      const matchesDosha = selectedDosha === "All" || doshaArr.includes(selectedDosha);
      const matchesSeverity = selectedSeverity === "All" || disease.severity === selectedSeverity;
      return matchesSearch && matchesCategory && matchesDosha && matchesSeverity;
    });
  }, [diseases, searchTerm, selectedCategory, selectedDosha, selectedSeverity]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDosha("All");
    setSelectedSeverity("All");
  };

    return (
    <div className="min-h-screen bg-gradient-to-r from-earth/10 to-sage/10">
      {/* Main Content - Starting with Search */}
      <div className="bg-gradient-to-r from-earth/10 to-sage/10">


        {/* Search and Filters Section */}
        <div className="bg-white/80 backdrop-blur-md border-b border-earth/20 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search diseases, symptoms, treatments, or classical sources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-earth/30 focus:border-green-500 focus:ring-green-500 bg-white/90 text-foreground placeholder-muted-foreground transition-all duration-150"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="border-yellow-500/50 text-foreground hover:bg-yellow-500/10 bg-white/50 hover:border-yellow-500"
              >
                <Filter className="w-4 h-4 mr-2 text-yellow-600" />
                Advanced Filters
                {isFilterOpen ? <ChevronDown className="w-4 h-4 ml-2" /> : <ChevronRight className="w-4 h-4 ml-2" />}
              </Button>
            </div>

            {/* Advanced Filters */}
            {isFilterOpen && (
              <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-earth/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Dosha</label>
                    <Select value={selectedDosha} onValueChange={setSelectedDosha}>
                      <SelectTrigger className="border-earth/30 bg-white/90 text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-earth/30">
                        {doshaOptions.map((dosha) => (
                          <SelectItem key={dosha} value={dosha}>{dosha === "All" ? "All Doshas" : dosha}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Severity</label>
                    <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                      <SelectTrigger className="border-earth/30 bg-white/90 text-foreground">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-earth/30">
                        {severityOptions.map((sev) => (
                          <SelectItem key={sev} value={sev}>{sev === "All" ? "All Severities" : sev}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="w-full border-earth/30 text-foreground hover:bg-earth/10 bg-transparent"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="w-full">
          {/* Disease Cards */}
          <div className="w-full">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  <span className="text-green-600">Ayurvedic</span> Disease Knowledge
                </h2>
                <p className="text-muted-foreground">Discover comprehensive <span className="text-yellow-600 font-medium">healing wisdom</span> from classical texts</p>
              </div>
              {(selectedCategory !== "All" || selectedDosha !== "All" || selectedSeverity !== "All" || searchTerm) && (
                <Button variant="outline" onClick={clearFilters} size="sm" className="border-green-500/50 text-foreground hover:bg-green-500/10 bg-white/50 hover:border-green-500">
                  <X className="w-4 h-4 mr-2 text-green-600" />
                  Clear All
                </Button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                <div className="text-lg text-foreground">Loading comprehensive disease database...</div>
                <div className="text-sm text-muted-foreground mt-2">Fetching from backend and merging with <span className="text-yellow-600 font-medium">classical texts</span></div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-orange-500 mb-2">Backend Unavailable</h3>
                <p className="text-orange-500 mb-4">{error}</p>
                <div className="text-sm text-muted-foreground">Showing {diseases.length} diseases from static database</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiseases.map((disease, index) => (
                  <div
                    key={disease._id || disease.id}
                    className="transform transition-all duration-200 ease-out hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]"
                  >
                    <Card
                      className="bg-white/90 backdrop-blur-sm border-earth/20 hover:shadow-lg hover:shadow-earth/20 transition-all duration-200 ease-out cursor-pointer hover:border-gold group h-full"
                      onClick={() => setSelectedDisease(disease)}
                    >
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                                                  <CardTitle className="text-foreground text-xl font-bold group-hover:text-green-600 transition-colors">
                          {disease.name}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground font-medium text-base mt-1">
                          {disease.sanskrit && (
                            <span className="font-semibold text-yellow-600">{disease.sanskrit}</span>
                          )}
                          {disease.modernEquivalent && (
                            <span className="ml-2 text-muted-foreground">({disease.modernEquivalent})</span>
                          )}
                        </CardDescription>
                        </div>
                        <Badge className={`${severityColors[disease.severity] || "bg-earth/20 text-foreground"} shadow-sm`}>
                          {disease.severity}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {(disease.dosha || disease.primaryDosha || []).map((dosha) => (
                          <Badge key={dosha} variant="outline" className={`${doshaColors[dosha] || "bg-earth/20 text-foreground"} border-2 border-earth/30`}>
                            {dosha}
                          </Badge>
                        ))}
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300 border-2">
                          {disease.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {disease.symptoms && disease.symptoms.length > 0 && (
                        <div>
                                                        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-yellow-600" />
                              <span className="text-yellow-600">Key Symptoms:</span>
                            </h4>
                            <p className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                              {disease.symptoms?.slice(0, 3).join(", ")}
                              {disease.symptoms?.length > 3 && "..."}
                            </p>
                        </div>
                        )}
                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                            <Book className="w-4 h-4 text-green-600" />
                            <span className="text-green-600">Classical Source:</span>
                          </h4>
                          <p className="text-sm text-muted-foreground bg-green-50 p-3 rounded-lg border border-green-200">
                            {disease.source}
                          </p>
                        </div>
                        {disease.treatments && disease.treatments.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                              <Leaf className="w-4 h-4 text-green-600" />
                              <span className="text-green-600">Treatments Available:</span>
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              <span className="text-green-600 font-medium">{disease.treatments.length}</span> treatment{disease.treatments.length !== 1 ? 's' : ''} documented
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredDiseases.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No <span className="text-green-600">diseases</span> found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your <span className="text-yellow-600 font-medium">search terms</span> or filters</p>
                <Button onClick={clearFilters} variant="outline" className="border-green-500/50 text-foreground hover:bg-green-500/10 bg-white/50 hover:border-green-500">
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div> {/* Close main content div */}

      {/* Disease Flashcard */}
      <DiseaseFlashcard 
        disease={selectedDisease} 
        isOpen={!!selectedDisease} 
        onClose={() => setSelectedDisease(null)} 
      />
    </div>
  );
}