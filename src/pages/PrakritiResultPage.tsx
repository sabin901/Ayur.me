import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Wind, 
  Flame, 
  Mountain, 
  BookOpen, 
  Target, 
  Brain, 
  Heart, 
  Activity,
  Sparkles,
  Leaf,
  Sun,
  Moon,
  Thermometer,
  Droplets,
  Scale,
  Zap,
  Clock,
  User,
  Eye,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Download,
  AlertCircle,
  Info,
  Play,
  Pause,
  Volume2,
  FileText,
  Quote,
  Star,
  Award,
  TrendingUp,
  Activity as ActivityIcon,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Share2,
  Printer,
  Save,
  Calendar,
  Clock as ClockIcon,
  MapPin,
  Users,
  Shield,
  Zap as ZapIcon,
  Heart as HeartIcon,
  Brain as BrainIcon,
  Activity as ActivityIcon2,
  Home,
  ArrowUpRight,
  Book,
  ScrollText,
  Lightbulb,
  Clock as ClockIcon2,
  Calendar as CalendarIcon,
  Thermometer as ThermometerIcon,
  Droplets as DropletsIcon,
  Scale as ScaleIcon
} from "lucide-react";
import { performAyurvedicAnalysis, AnalysisResult, FullAnalysisResult } from "@/services/ayurvedicAnalysis";

// Glossary popover (simple version)
const Glossary = ({ term, definition }: { term: string; definition: string }) => (
  <span className="relative group cursor-help text-green-700 underline">
    {term}
    <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white border border-green-200 text-xs text-gray-700 rounded shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity z-50">
      {definition}
    </span>
  </span>
);

// VerseAccordion
const VerseAccordion = ({ verse }: { verse: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded-lg mb-2 bg-white/80">
      <button onClick={() => setOpen((v) => !v)} className="w-full text-left p-3 font-semibold flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-green-600" />
        {verse.text} {verse.chapter}.{verse.verse}
        <span className="ml-auto text-xs text-gray-500">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="p-4 border-t text-sm space-y-2">
          <div><b>Devanagari:</b> <span className="font-devanagari text-lg">{verse.devanagari}</span></div>
          <div><b>IAST:</b> <span className="italic">{verse.iast}</span></div>
          <div><b>Translation:</b> {verse.translation}</div>
        </div>
      )}
    </div>
  );
};

// Radar Chart
const RadarChart = ({ scores }: { scores: { vata: number; pitta: number; kapha: number; rakta?: number } }) => {
  const ref = useRef(null);
  useEffect(() => {
    const data = [
      { axis: "Vata", value: scores.vata },
      { axis: "Pitta", value: scores.pitta },
      { axis: "Kapha", value: scores.kapha },
      ...(scores.rakta !== undefined ? [{ axis: "Rakta", value: scores.rakta }] : [])
    ];
    const width = 320, height = 320, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;
    d3.select(ref.current).selectAll("*").remove();
    const svg = d3.select(ref.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);
    const angleSlice = (Math.PI * 2) / data.length;
    const rScale = d3.scaleLinear().range([0, radius]).domain([0, 100]);
    // Draw grid
    for (let level = 1; level <= 5; level++) {
      svg.append("circle")
        .attr("r", (radius / 5) * level)
        .style("fill", "#e5e7eb")
        .style("stroke", "#a7f3d0")
        .style("fill-opacity", 0.1);
    }
    // Draw axes
    data.forEach((d, i) => {
      svg.append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("stroke", "#6ee7b7").attr("stroke-width", 2);
      svg.append("text")
        .attr("x", rScale(110) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", rScale(110) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("text-anchor", "middle")
        .attr("font-size", 14)
        .attr("fill", "#047857")
        .text(d.axis);
    });
    // Draw data
    const radarLine = d3.lineRadial()
      .radius((d: any) => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);
    svg.append("path")
      .datum(data)
      .attr("d", radarLine as any)
      .style("fill", "#6ee7b7")
      .style("fill-opacity", 0.4)
      .style("stroke", "#047857")
      .style("stroke-width", 2);
  }, [scores]);
  return <div ref={ref}></div>;
};

interface LocationState {
  results?: AnalysisResult;
  answers?: Record<string, string>;
  photos?: Record<string, string>;
}

// Main Result Page
export default function PrakritiResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<FullAnalysisResult | null>(null);

  useEffect(() => {
    const state = location.state as { results?: FullAnalysisResult };
    if (state?.results) {
      console.log('Full Analysis Result received:', state.results);
      console.log('Personality:', state.results.personality);
      console.log('Physical:', state.results.physical);
      console.log('Lifestyle:', state.results.lifestyle);
      console.log('Diet:', state.results.diet);
      console.log('Herbs:', state.results.herbs);
      console.log('Seasonal:', state.results.seasonal);
      console.log('Marma:', state.results.marma);
      console.log('Spiritual:', state.results.spiritual);
      console.log('Verses:', state.results.verses);
      setResult(state.results);
    } else {
      console.log('No results found in state, redirecting to analysis page');
      navigate('/ayur-analysis');
    }
  }, [location.state, navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading your analysis...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Your ayur.me Analysis
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            AI-powered Ayurvedic assessment based on classical Sanskrit texts
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/ayur-analysis')}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Take Assessment Again
            </Button>
            <Button onClick={() => navigate('/')}> <Home className="h-4 w-4 mr-2" /> Back to Home </Button>
          </div>
        </div>

        {/* Radar Chart */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Dosha Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <RadarChart scores={{ ...result.scores, rakta: (result.scores as any).rakta || 0 }} />
            </div>
            <div className="w-full md:w-1/2 space-y-2">
              <div className="text-lg font-semibold">Constitution: <span className="text-green-700">{result.prakriti || result.constitution}</span></div>
              <div className="text-lg font-semibold">Vikriti: <span className="text-red-700">{typeof result.vikriti === 'string' ? result.vikriti : result.vikriti?.primaryImbalance || 'Balanced'}</span></div>
              <div className="text-lg font-semibold">Subdosha: <span className="text-blue-700">{result.subdosha?.join(', ') || 'None detected'}</span></div>
              <div className="flex gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800">Vata: {result.scores.vata}%</Badge>
                <Badge className="bg-red-100 text-red-800">Pitta: {result.scores.pitta}%</Badge>
                <Badge className="bg-blue-100 text-blue-800">Kapha: {result.scores.kapha}%</Badge>
                {typeof (result.scores as any).rakta === 'number' && <Badge className="bg-pink-100 text-pink-800">Rakta: {(result.scores as any).rakta}%</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personality & Mind */}
        <Card className="mb-8">
          <CardHeader><CardTitle>🧠 Personality & Mind</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-green max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4">
                {result.personality || 'Analysis based on your dosha constitution.'}
              </div>
            </div>
            <div className="text-gray-600 text-sm">Emotional tendencies and mind-body patterns are mapped from <Glossary term="Ayurveda and the Mind" definition="Book by Dr. David Frawley, a modern authority on Ayurvedic psychology." /> and classical texts.</div>
          </CardContent>
        </Card>

        {/* Physical Markers */}
        <Card className="mb-8">
          <CardHeader><CardTitle>💪 Physical Markers</CardTitle></CardHeader>
          <CardContent>
            <div className="prose prose-green max-w-none">
              <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4">
                {result.physical || 'Physical characteristics based on your dosha constitution.'}
              </div>
            </div>
            <div className="text-gray-600 text-sm">Physical traits are mapped from <Glossary term="Charaka Samhita" definition="One of the foundational texts of Ayurveda, focusing on internal medicine." /> and <Glossary term="Ashtanga Hridaya" definition="A classical Sanskrit text of Ayurveda, focusing on daily routine and lifestyle." />.</div>
          </CardContent>
        </Card>

        {/* Lifestyle & Routine */}
        <Card className="mb-8">
          <CardHeader><CardTitle>☀️ Lifestyle & Daily Routine</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 mb-4">
              {result.lifestyle?.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-gray-800">{item}</div>
                </div>
              )) || <div className="text-gray-600">Lifestyle recommendations based on your constitution</div>}
            </div>
            <div className="text-gray-600 text-sm">Based on <Glossary term="Dinacharya" definition="Ayurvedic daily routine for optimal health." /> and <Glossary term="Charaka Sutra 5.5" definition="Classical reference for daily routine." />.</div>
          </CardContent>
        </Card>

        {/* Diet & Herbs */}
        <Card className="mb-8">
          <CardHeader><CardTitle>🍲 Diet & Herbs</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4 mb-4">
              <div>
                <div className="font-semibold text-gray-800 mb-2">Diet:</div>
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {result.diet || 'Dietary recommendations based on your constitution.'}
                </div>
              </div>
              <div>
                <div className="font-semibold text-gray-800 mb-2">Herbs:</div>
                <div className="space-y-2">
                  {result.herbs?.map((herb, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="text-gray-700">{herb}</div>
                    </div>
                  )) || <div className="text-gray-600">Herbal recommendations based on your constitution.</div>}
                </div>
              </div>
            </div>
            <div className="text-gray-600 text-sm">Dietary advice is mapped from <Glossary term="Bhava Prakasha Nighantu" definition="Classical Ayurvedic materia medica on herbs and foods." /> and <Glossary term="Frawley" definition="Dr. David Frawley, modern Ayurvedic author." />.</div>
          </CardContent>
        </Card>

        {/* Seasonal Vulnerability */}
        <Card className="mb-8">
          <CardHeader><CardTitle>🍃 Seasonal Vulnerability</CardTitle></CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4">
              {result.seasonal || 'Seasonal guidance based on your constitution.'}
            </div>
            <div className="text-gray-600 text-sm">Based on <Glossary term="Rtucharya" definition="Seasonal regimen in Ayurveda, from Ashtanga Hridaya Sutra 3.1." />.</div>
          </CardContent>
        </Card>

        {/* Marma Therapy */}
        <Card className="mb-8">
          <CardHeader><CardTitle>🩹 Marma Therapy</CardTitle></CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4">
              {result.marma || 'Marma therapy recommendations based on your constitution.'}
            </div>
            <div className="text-gray-600 text-sm">Marma points and therapy are mapped from <Glossary term="Sushruta Samhita" definition="Classical Ayurvedic text on surgery and marma points." />.</div>
          </CardContent>
        </Card>

        {/* Spiritual Suggestions */}
        <Card className="mb-8">
          <CardHeader><CardTitle>🧘‍♂️ Spiritual Suggestions</CardTitle></CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-800 leading-relaxed mb-4">
              {result.spiritual || 'Spiritual guidance based on your constitution.'}
            </div>
            <div className="text-gray-600 text-sm">Spiritual advice is mapped from <Glossary term="Fields" definition="Gregory Fields, author of Religious Therapeutics." /> and <Glossary term="Yoga & Ayurveda" definition="Book by Dr. David Frawley." />.</div>
          </CardContent>
        </Card>

        {/* VerseAccordion */}
        <Card className="mb-8">
          <CardHeader><CardTitle>📖 Classical References</CardTitle></CardHeader>
          <CardContent>
            {result.verses?.map((verse, i) => <VerseAccordion key={i} verse={verse} />) || <div className="text-gray-600">Classical references will be displayed here.</div>}
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>This analysis is based on classical Ayurvedic texts including Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, and Bhava Prakasha. Ayurveda is a sister science of Yoga and part of Hindu and Buddhist spiritual tradition. For educational purposes only.</p>
        </div>
      </div>
    </div>
  );
}