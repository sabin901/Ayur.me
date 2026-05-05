import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToMainContent } from "@/components/ui/accessibility";
import { AuthProvider } from "@/lib/auth-context";
import HomePage from "./pages/HomePage";
import PrakritiAnalysis from "./pages/PrakritiAnalysis";
import PrakritiResultPage from "./pages/PrakritiResultPage";
import DiseaseDatabasePage from "./pages/DiseaseDatabasePage";
import YogaLibraryPage from "./pages/YogaLibraryPage";
import MentalWellnessPage from "./pages/MentalWellnessPage";
import RecipePage from "./pages/RecipePage";
import ProgressPage from "./pages/ProgressPage";
import ThreeDModelPage from "./pages/ThreeDModelPage";
import AboutPage from "./pages/AboutPage";
import DoshasPage from "./pages/DoshasPage";
import HealingPage from "./pages/HealingPage";
import ResearchPage from "./pages/ResearchPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MyAssessmentsPage from "./pages/MyAssessmentsPage";
import NotFound from "./pages/NotFound";
import AyurBot from "./components/AyurBot";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SkipToMainContent />
              <div className="min-h-screen flex flex-col">
                <Header />
                <main id="main-content" className="flex-1">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/analysis" element={<PrakritiAnalysis />} />
                    <Route path="/ayur-analysis" element={<PrakritiAnalysis />} />
                    <Route path="/ayur-result" element={<PrakritiResultPage />} />
                    <Route path="/diseases" element={<DiseaseDatabasePage />} />
                    <Route path="/yoga" element={<YogaLibraryPage />} />
                    <Route path="/mental-health" element={<MentalWellnessPage />} />
                    <Route path="/3d-model" element={<ThreeDModelPage />} />
                    <Route path="/recipes" element={<RecipePage />} />
                    <Route path="/progress" element={<ProgressPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/doshas" element={<DoshasPage />} />
                    <Route path="/healing" element={<HealingPage />} />
                    <Route path="/research" element={<ResearchPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/my-assessments" element={<MyAssessmentsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <AyurBot />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
