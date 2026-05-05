import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Heart, Brain, Sun } from "lucide-react";

export default function HealingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Holistic Healing</h1>
        <p className="text-xl text-gray-600 mb-12">
          Ayurvedic approaches to restore balance and vitality.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Leaf className="w-5 h-5" />
                Herbal Remedies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Classical herbs like Ashwagandha, Turmeric, Triphala, and Guduchi are used to balance doshas,
                support digestion, and strengthen immunity. Each herb is matched to your constitution.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Heart className="w-5 h-5" />
                Diet & Nutrition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Food is medicine in Ayurveda. Recommendations from Bhava Prakasha and Charaka Samhita guide
                what to eat, when, and how—tailored to your dosha and the season.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Brain className="w-5 h-5" />
                Lifestyle (Dinacharya)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Daily routines—wake time, oil massage, exercise, meditation—align you with nature's rhythms
                and support long-term balance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Sun className="w-5 h-5" />
                Seasonal Living (Ritucharya)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ashtanga Hridayam describes how to adapt diet and lifestyle to each season to maintain
                harmony with nature.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex gap-4">
          <Button asChild variant="default" className="bg-emerald-600 hover:bg-emerald-700">
            <Link to="/recipes">Explore Recipes</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/diseases">Disease Knowledge</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
