import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Leaf, Heart, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ayurveda</h1>
        <p className="text-xl text-gray-600 mb-8">
          The ancient science of life, wellness, and longevity.
        </p>

        <div className="prose prose-lg max-w-none space-y-8">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <BookOpen className="w-5 h-5" />
                Origins
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ayurveda (आयुर्वेद) means "knowledge of life"—from <em>āyus</em> (life) and <em>veda</em> (knowledge).
                It originated in India over 5,000 years ago and is one of the world's oldest holistic healing systems.
                The foundational texts—Charaka Samhita, Sushruta Samhita, and Ashtanga Hridayam—continue to guide
                practitioners today.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Leaf className="w-5 h-5" />
                Core Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ayurveda views health as a balance of body, mind, and spirit. It recognizes three fundamental energies
                (doshas)—Vata, Pitta, and Kapha—that govern our constitution. When in balance, we experience vitality;
                when out of balance, we experience disease. Diet, lifestyle, herbs, and seasonal rhythms are used to
                restore and maintain equilibrium.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Heart className="w-5 h-5" />
                ayur.me Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ayur.me brings classical Ayurvedic wisdom into the modern age. We offer personalized dosha assessment,
                disease knowledge from classical texts, yoga practices, recipes, and mental wellness guidance—all
                grounded in authentic Sanskrit sources.
              </p>
            </CardContent>
          </Card>

          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Clock className="w-5 h-5" />
                Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                This platform is for educational purposes only. It does not replace professional medical advice.
                Always consult qualified healthcare providers for diagnosis and treatment.
              </p>
            </CardContent>
          </Card>
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
