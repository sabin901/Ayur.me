import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import heroImage from "@/assets/hero-ayurveda.jpg";
import { 
  Brain, 
  Heart, 
  Leaf, 
  Search, 
  Users, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Award,
  Zap,
  Target,
  Globe
} from "lucide-react";

const features = [
  {
    name: "Personalized Dosha Analysis",
    description: "Discover your unique Ayurvedic constitution through our guided visual assessment and comprehensive questionnaire.",
    icon: Brain,
    color: "vata",
    image: "/doshas.jpg",
    gradient: "from-blue-500/20 to-purple-500/20",
    borderColor: "hover:border-blue-500/50",
  },
  {
    name: "Comprehensive Knowledge Hub",
    description: "Access thousands of Ayurvedic remedies, herbal wisdom, and holistic healing practices in our searchable database.",
    icon: BookOpen,
    color: "pitta",
    image: "/knowledge.png",
    gradient: "from-orange-500/20 to-red-500/20",
    borderColor: "hover:border-orange-500/50",
  },
  {
    name: "Mental Wellness Guidance",
    description: "Ancient wisdom for modern stress. Learn to balance your mind using time-tested Ayurvedic principles.",
    icon: Heart,
    color: "kapha",
    image: "/mental-illness.jpg",
    gradient: "from-green-500/20 to-teal-500/20",
    borderColor: "hover:border-green-500/50",
  },
];

const benefits = [
  "Understand your unique body-mind constitution",
  "Receive personalized dietary and lifestyle recommendations",
  "Access authentic Ayurvedic remedies for common ailments",
  "Learn therapeutic yoga practices for your dosha",
  "Discover mental wellness techniques from ancient texts",
  "Build sustainable health habits rooted in tradition",
];

const stats = [
  { label: "Ancient Texts", value: "500+", icon: BookOpen },
  { label: "Herbal Remedies", value: "1000+", icon: Leaf },
  { label: "Expert Guidance", value: "24/7", icon: Shield },
  { label: "Years of Wisdom", value: "5000+", icon: Clock },
];

const testimonials = [
  {
    content: "ayur.me helped me understand why certain foods made me feel energetic while others left me sluggish. The personalized recommendations have transformed my daily routine.",
    author: "Priya S.",
    role: "Wellness Enthusiast",
    rating: 5,
  },
  {
    content: "As someone dealing with chronic stress, the mental wellness section provided practical techniques that actually work. The combination of ancient wisdom with modern presentation is perfect.",
    author: "Michael R.",
    role: "Tech Professional",
    rating: 5,
  },
  {
    content: "The visual dosha analysis was fascinating! I loved learning about my constitution through both traditional methods and modern questionnaires.",
    author: "Sarah L.",
    role: "Yoga Instructor",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Ayurvedic herbs and natural healing elements" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-earth/80 via-earth/60 to-sage/70"></div>
        </div>
        
        <div className="relative py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="fade-in">
                <h1 className="text-5xl font-heading font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
                  Rediscover Your{" "}
                  <span className="text-gold">Natural Balance</span>
                </h1>
                <p className="mt-8 text-xl leading-8 text-white/90 lg:text-2xl">
                  Unlock the wisdom of Ayurveda with personalized insights, ancient remedies, 
                  and holistic healing practices tailored to your unique constitution.
                </p>
              </div>
              
              <div className="slide-up mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gold" size="xl" asChild>
                  <Link to="/ayur-analysis" className="group">
                    Find Your Body Type
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="bg-transparent border-white/30 text-white hover:bg-white/10 backdrop-blur-sm" asChild>
                  <Link to="/diseases">
                    Explore Knowledge Hub
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-earth/10 to-sage/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-earth/20 flex items-center justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-gold" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-sage/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold mb-6">
              <Award className="h-4 w-4 mr-2" />
              Ancient Wisdom, Modern Application
            </div>
            <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground sm:text-5xl">
              Three Pillars of Holistic Wellness
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Our platform combines traditional Ayurvedic assessment methods with contemporary technology 
              to provide you with personalized insights for optimal health and wellbeing.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={feature.name} className={`fade-in card-hover group`} style={{ animationDelay: `${index * 150}ms` }}>
                  <Card className={`h-full border-2 border-transparent ${feature.borderColor} transition-all duration-500 overflow-hidden relative bg-gradient-to-br ${feature.gradient} hover:shadow-2xl hover:scale-105`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    <CardHeader className="text-center pb-4 relative z-10">
                      {/* Enhanced Image Container */}
                      <div className="relative mx-auto w-24 h-24 rounded-3xl overflow-hidden mb-6 shadow-2xl group-hover:shadow-gold/25 transition-all duration-500">
                        <img 
                          src={feature.image} 
                          alt={feature.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {/* Enhanced Icon Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}/40 to-${feature.color}/20 flex items-center justify-center backdrop-blur-sm`}>
                          <feature.icon className={`h-10 w-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-3xl bg-${feature.color}/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                      </div>
                      <CardTitle className="text-2xl font-heading group-hover:text-gold transition-colors duration-300">{feature.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-center leading-relaxed text-base">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-sage/10 via-background to-earth/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-sage/10 px-4 py-2 text-sm font-medium text-sage mb-6">
                <Target className="h-4 w-4 mr-2" />
                Transform Your Health Journey
              </div>
              <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground sm:text-5xl">
                Your Path to Holistic Wellness
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Experience the profound benefits of understanding and living in harmony with your natural constitution.
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4 fade-in group" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-sage/20 to-gold/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-sage" />
                    </div>
                    <div className="flex-1">
                      <span className="text-lg text-foreground font-medium group-hover:text-sage transition-colors duration-300">{benefit}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden relative shadow-2xl">
                  {/* Background Image */}
                  <img 
                    src="/ayurvedh.jpg" 
                    alt="Ayurvedic healing elements" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Enhanced Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-earth/85 via-sage/75 to-gold/65"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full p-8 flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="mx-auto w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center">
                        <Sparkles className="h-12 w-12 text-gold" />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-white">
                        Your Personalized Path to Wellness
                      </h3>
                      <p className="text-white/90 text-lg">
                        Begin your journey of self-discovery and holistic healing today.
                      </p>
                      <Button variant="gold" size="lg" className="group" asChild>
                        <Link to="/ayur-analysis" className="flex items-center">
                          Start Now
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-sage/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center rounded-full bg-gold/10 px-4 py-2 text-sm font-medium text-gold mb-6">
              <Users className="h-4 w-4 mr-2" />
              Trusted by Wellness Seekers
            </div>
            <h2 className="text-4xl font-heading font-bold tracking-tight text-foreground sm:text-5xl">
              What Our Community Says
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover how ayur.me has helped others find balance and transform their wellbeing.
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-in card-hover group" style={{ animationDelay: `${index * 200}ms` }}>
                <Card className="h-full border-2 border-transparent hover:border-gold/30 transition-all duration-300 bg-gradient-to-br from-background to-sage/5">
                  <CardContent className="pt-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground leading-relaxed mb-6 text-lg">
                      "{testimonial.content}"
                    </blockquote>
                    <div className="border-t border-sage/20 pt-4">
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}