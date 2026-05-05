import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Search, ExternalLink, Loader2, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { apiFetch } from "@/lib/api";

type Article = {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number | null;
  abstract: string;
  sourceUrl: string;
  confidence?: number;
  reviewStatus?: string;
};

export default function ResearchPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("Ayurveda clinical trials");
  const [error, setError] = useState<string | null>(null);

  const fetchResearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ articles: Article[] }>(
        `/research?q=${encodeURIComponent(searchQuery)}&pageSize=10`,
        { anonymous: true, timeoutMs: 20_000 }
      );
      setArticles(res.articles);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Research search is unavailable. Please try again.");
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResearch(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchResearch(query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Research & Clinical Evidence</h1>
        <p className="text-xl text-gray-600 mb-8">
          ayur.me is grounded in classical Ayurvedic texts and modern integrative research.
        </p>
        <div className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 flex gap-3">
          <ShieldCheck className="h-5 w-5 flex-shrink-0" />
          <p>
            Evidence search results are educational references from Europe PMC. They are not diagnosis,
            treatment instructions, or a substitute for care from a qualified clinician.
          </p>
        </div>

        <Card className="border-emerald-200 mb-12 bg-white/60 backdrop-blur-sm shadow-xl">
          <CardHeader className="border-b border-emerald-100 bg-emerald-50/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Search className="w-5 h-5 text-emerald-600" />
              Live Clinical Database Search
            </CardTitle>
            <CardDescription>
              Searching live peer-reviewed medical journals via Europe PMC API.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSearch} className="flex gap-3 mb-8">
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for 'Ayurveda diabetes' or 'Ashwagandha stress'..."
                className="flex-1 border-emerald-200 focus-visible:ring-emerald-500"
              />
              <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[120px]">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                {loading ? 'Searching' : 'Search'}
              </Button>
            </form>

            <div className="space-y-4">
              {error && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}
              {!loading && !error && articles.length === 0 && (
                <div className="rounded-lg border border-emerald-100 bg-white p-5 text-sm text-gray-600">
                  No results yet. Try a focused query such as “Ayurveda diabetes trial” or “Ashwagandha anxiety randomized”.
                </div>
              )}
              {articles.map((article) => (
                <Card key={article.id} className="border-emerald-100 hover:shadow-md transition-shadow group">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-emerald-900 group-hover:text-emerald-600 transition-colors">
                          <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer">
                            {article.title}
                          </a>
                        </h3>
                        <p className="text-sm text-emerald-700/80 mt-1 font-medium">
                          {article.authors} • {article.journal}{article.year ? ` (${article.year})` : ""}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Review: {article.reviewStatus || "external"} • Confidence {Math.round((article.confidence || 0.6) * 100)}%
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" asChild className="flex-shrink-0">
                        <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label={`Open ${article.title}`}>
                          <ExternalLink className="w-4 h-4 text-emerald-600" />
                        </a>
                      </Button>
                    </div>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                      {article.abstract}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <BookOpen className="w-5 h-5" />
                Classical Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Charaka Samhita</strong> — Internal medicine</li>
                <li><strong>Sushruta Samhita</strong> — Surgery and anatomy</li>
                <li><strong>Ashtanga Hridayam</strong> — General principles</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
