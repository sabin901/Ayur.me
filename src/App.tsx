import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SkipToMainContent } from "@/components/ui/accessibility";
import HomePage from "./pages/HomePage";
import PrakritiAnalysis from "./pages/PrakritiAnalysis";
import PrakritiResultPage from "./pages/PrakritiResultPage";
import DiseaseDatabasePage from "./pages/DiseaseDatabasePage";
import YogaLibraryPage from "./pages/YogaLibraryPage";
import MentalWellnessPage from "./pages/MentalWellnessPage";
import RecipePage from "./pages/RecipePage";
import ProgressPage from "./pages/ProgressPage";
import ThreeDModelPage from "./pages/ThreeDModelPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log('App component rendering');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
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
                  <Route path="/ayur-analysis" element={<PrakritiAnalysis />} />
                  <Route path="/ayur-result" element={<PrakritiResultPage />} />
                  <Route path="/diseases" element={<DiseaseDatabasePage />} />
                  <Route path="/yoga" element={<YogaLibraryPage />} />
                  <Route path="/mental-health" element={<MentalWellnessPage />} />
                  <Route path="/3d-model" element={<ThreeDModelPage />} />
                  <Route path="/recipes" element={<RecipePage />} />
                  <Route path="/progress" element={<ProgressPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
