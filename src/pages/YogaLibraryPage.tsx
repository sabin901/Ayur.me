import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, Play, Heart } from "lucide-react";

// Yoga poses data from David Frawley's "Yoga for Your Type"
const yogaPoses = [
  {
    id: "pose-1",
    name: "Child's Pose",
    sanskrit: "Balasana",
    category: "Restorative",
    dosha: "Vata",
    difficulty: "Beginner",
    duration: "5-10 minutes",
    benefits: [
      "Calms the nervous system and reduces Vata excess",
      "Relieves anxiety, stress, and mental fatigue",
      "Grounds scattered energy and promotes stability",
      "Stretches hips, thighs, and ankles gently",
      "Relieves back and neck pain",
      "Promotes introspection and inner peace"
    ],
    description: "A deeply grounding pose that helps calm Vata dosha. This gentle resting position allows the nervous system to settle and promotes a sense of security and groundedness.",
    image: "/yoga-poses/balasana.jpg",
    doshaColor: "bg-sage/20 text-sage-800 border-sage-300"
  },
  {
    id: "pose-2",
    name: "Legs Up the Wall",
    sanskrit: "Viparita Karani",
    category: "Restorative",
    dosha: "Vata",
    difficulty: "Beginner",
    duration: "10-20 minutes",
    benefits: [
      "Deeply calms the nervous system",
      "Reduces anxiety and promotes relaxation",
      "Improves circulation and reduces swelling",
      "Relieves tired, heavy legs",
      "Balances the endocrine system"
    ],
    description: "A gentle inversion that helps reverse the effects of gravity on circulation while deeply calming Vata dosha.",
    image: "/yoga-poses/viparita-karani.jpg",
    doshaColor: "bg-sage/20 text-sage-800 border-sage-300"
  },
  {
    id: "pose-3",
    name: "Seated Forward Bend",
    sanskrit: "Paschimottanasana",
    category: "Forward Bend",
    dosha: "Pitta",
    difficulty: "Beginner",
    duration: "3-8 minutes",
    benefits: [
      "Cools and calms Pitta dosha effectively",
      "Reduces anger, irritability, and competitiveness",
      "Stimulates digestive organs and improves digestion",
      "Stretches the entire back body",
      "Calms the mind and reduces stress"
    ],
    description: "A powerful cooling pose that helps balance excess Pitta energy. The forward folding action encourages introspection and helps cool both body and mind.",
    image: "/yoga-poses/paschimottanasana.jpg",
    doshaColor: "bg-orange/20 text-orange-800 border-orange-300"
  },
  {
    id: "pose-4",
    name: "Sun Salutation",
    sanskrit: "Surya Namaskara",
    category: "Dynamic",
    dosha: "Kapha",
    difficulty: "Beginner",
    duration: "5-20 minutes",
    benefits: [
      "Stimulates metabolism and builds internal heat",
      "Energizes the entire body and mind",
      "Improves cardiovascular health",
      "Builds strength, flexibility, and endurance",
      "Balances all body systems"
    ],
    description: "A complete practice in itself, Sun Salutations are particularly beneficial for Kapha types who need energizing and warming.",
    image: "/yoga-poses/surya-namaskara.jpg",
    doshaColor: "bg-green/20 text-green-800 border-green-300"
  },
  {
    id: "pose-5",
    name: "Warrior I",
    sanskrit: "Virabhadrasana I",
    category: "Standing",
    dosha: "Kapha",
    difficulty: "Beginner",
    duration: "30 seconds - 2 minutes each side",
    benefits: [
      "Builds strength in legs, core, and shoulders",
      "Improves focus and concentration",
      "Develops courage and determination",
      "Opens hip flexors and chest",
      "Energizes and motivates"
    ],
    description: "A powerful standing pose that embodies the warrior's strength and determination. Excellent for building confidence and physical strength.",
    image: "/yoga-poses/virabhadrasana-i.jpg",
    doshaColor: "bg-green/20 text-green-800 border-green-300"
  },
  {
    id: "pose-6",
    name: "Mountain Pose",
    sanskrit: "Tadasana",
    category: "Standing",
    dosha: "All Doshas",
    difficulty: "Beginner",
    duration: "1-5 minutes",
    benefits: [
      "Improves posture and alignment",
      "Develops body awareness",
      "Builds foundational strength",
      "Calms the mind through stillness",
      "Grounds energy and promotes stability"
    ],
    description: "The foundation of all standing poses and a complete practice in itself. Though it appears simple, Mountain Pose teaches fundamental principles of alignment.",
    image: "/yoga-poses/tadasana.jpg",
    doshaColor: "bg-blue/20 text-blue-800 border-blue-300"
  }
];

const YogaLibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPoses = yogaPoses.filter(pose => {
    const query = searchQuery.toLowerCase();
    return pose.name.toLowerCase().includes(query) ||
           pose.sanskrit.toLowerCase().includes(query) ||
           pose.description.toLowerCase().includes(query) ||
           pose.benefits.some(benefit => benefit.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground sm:text-5xl lg:text-6xl">
            Ayurvedic <span className="text-gradient">Yoga Library</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover therapeutic yoga poses based on David Frawley's "Yoga for Your Type" - 
            each practice includes traditional Sanskrit names and Ayurvedic benefits.
          </p>
          <div className="mt-4 text-sm text-muted-foreground">
            <strong>{yogaPoses.length} Poses</strong> from authentic Ayurvedic sources
          </div>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search poses, Sanskrit names, or benefits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Poses */}
        <section>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
            Therapeutic Yoga Poses ({filteredPoses.length})
          </h2>

          <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
            {filteredPoses.map((pose) => (
              <Card key={pose.id} className="card-hover overflow-hidden">
                <div className="relative">
                  <img 
                    src={pose.image} 
                    alt={pose.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/yoga-poses/placeholder.jpg";
                    }}
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className={pose.doshaColor}>
                      {pose.dosha}
                    </Badge>
                    <Badge variant="outline" className="bg-white/90">
                      {pose.difficulty}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center space-x-1 text-sm text-white bg-black/50 px-2 py-1 rounded">
                    <Clock className="h-4 w-4" />
                    <span>{pose.duration}</span>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{pose.name}</CardTitle>
                  <CardDescription className="text-sage-600 font-medium">
                    {pose.sanskrit}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{pose.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-sage" />
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {pose.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <span className="text-sage mr-2">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                      {pose.benefits.length > 3 && (
                        <li className="text-sage-600 font-medium text-sm">
                          +{pose.benefits.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <Badge variant="outline" className="text-xs">
                      {pose.category}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sources */}
        <section className="bg-gradient-to-br from-sage/10 to-gold/10 rounded-2xl p-8 mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Authentic Ayurvedic Sources
            </h2>
            <p className="text-muted-foreground mb-6">
              Based on David Frawley's "Yoga for Your Type: An Ayurvedic Approach to Your Asana Practice"
            </p>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-gold mb-2">{yogaPoses.length}</div>
                <div className="text-sm text-muted-foreground">Poses</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-sage mb-2">3</div>
                <div className="text-sm text-muted-foreground">Doshas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-heading font-bold text-earth mb-2">5000+</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default YogaLibraryPage;
