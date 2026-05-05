import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Flame, Mountain } from "lucide-react";

const doshas = [
  {
    name: "Vata",
    element: "Air & Ether",
    icon: Wind,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    qualities: "Dry, light, cold, rough, subtle, mobile",
    governs: "Movement, breathing, circulation, nervous system",
    verse: "रूक्षो लघुः शीतः खरः सूक्ष्मश्चलोऽनिलः",
    source: "Charaka Samhita, Sutrasthana 1.59",
  },
  {
    name: "Pitta",
    element: "Fire & Water",
    icon: Flame,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    qualities: "Oily, sharp, hot, light, flowing, liquid",
    governs: "Digestion, metabolism, body temperature, transformation",
    verse: "सस्नेहतीक्ष्णोष्णलघुविस्रं सरं द्रवं पित्तं",
    source: "Charaka Samhita, Sutrasthana 1.60",
  },
  {
    name: "Kapha",
    element: "Earth & Water",
    icon: Mountain,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    qualities: "Oily, cold, heavy, slow, smooth, stable",
    governs: "Immunity, growth, lubrication, structure",
    verse: "स्निग्धः शीतो गुरुर्मन्दः श्लक्ष्णो मृत्स्नः स्थिरः कफः",
    source: "Charaka Samhita, Sutrasthana 1.61",
  },
];

export default function DoshasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">The Three Doshas</h1>
        <p className="text-xl text-gray-600 mb-12">
          Fundamental energies that shape your unique constitution.
        </p>

        <div className="space-y-8">
          {doshas.map((d) => (
            <Card key={d.name} className={`${d.border} ${d.bg} border-2`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 ${d.color}`}>
                  <d.icon className="w-8 h-8" />
                  {d.name} — {d.element}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Qualities:</strong> {d.qualities}</p>
                <p><strong>Governs:</strong> {d.governs}</p>
                <div className="p-3 bg-white/80 rounded-lg border">
                  <p className="font-devanagari text-lg text-gray-800 mb-1">{d.verse}</p>
                  <p className="text-xs text-gray-500">— {d.source}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
            <Link to="/ayur-analysis">Discover Your Dosha</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
