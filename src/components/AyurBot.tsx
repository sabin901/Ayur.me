import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Leaf, MessageCircle, Send, Sparkles, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { API_BASE_URL } from "@/lib/api";
import { ayurvedicDiseases, type Disease } from "@/assets/ayurvedicDiseases";
import { ayurvedicRecipes } from "@/data/recipeData";
import { comprehensiveYogaPoses } from "@/assets/comprehensiveYogaPoses";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: React.ReactNode;
};

type BotDisease = Partial<Disease> & {
  name: string;
  englishName?: string;
  sanskrit?: string;
  symptoms?: string[];
  treatments?: Array<string | { name?: string; type?: string; description?: string; ingredients?: string[] }>;
  source?: string;
  modernEquivalent?: string;
  modernCorrelation?: string;
  reviewStatus?: string;
};

const quickPrompts = ["acidity", "joint pain", "sleep", "digestion", "pitta recipes", "yoga for stress"];

function makeId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalize(value: unknown) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();
}

function scoreText(query: string, values: unknown[]) {
  const q = normalize(query);
  if (!q) return 0;
  const terms = q.split(" ").filter((term) => term.length > 2);
  const haystack = normalize(values.flat().filter(Boolean).join(" "));
  let score = haystack.includes(q) ? 8 : 0;
  for (const term of terms) {
    if (haystack.includes(term)) score += 2;
  }
  return score;
}

function treatmentLabel(treatment: BotDisease["treatments"][number] | undefined) {
  if (!treatment) return "No specific treatment seed is attached to this record yet.";
  if (typeof treatment === "string") return treatment;
  const ingredients = treatment.ingredients?.length ? ` (${treatment.ingredients.slice(0, 3).join(", ")})` : "";
  return treatment.name || treatment.description || treatment.type
    ? `${treatment.name || treatment.type || "Treatment"}${ingredients}`
    : "Treatment details need review.";
}

function DiseaseAnswer({ disease }: { disease: BotDisease }) {
  return (
    <div className="space-y-2">
      <p>
        I found a close educational match: <strong>{disease.name}</strong>
        {disease.englishName ? ` (${disease.englishName})` : disease.modernEquivalent ? ` (${disease.modernEquivalent})` : ""}.
      </p>
      {disease.symptoms?.length ? (
        <p className="text-xs rounded-lg border border-sage/20 bg-sage/10 p-2">
          Commonly listed symptoms: {disease.symptoms.slice(0, 5).join(", ")}.
        </p>
      ) : null}
      <p className="text-sm">
        <strong>Reference treatment seed:</strong> {treatmentLabel(disease.treatments?.[0])}
      </p>
      {disease.source ? <p className="text-xs text-muted-foreground">Source: {disease.source}</p> : null}
      <p className="text-xs text-muted-foreground">
        This is informational study support, not diagnosis. Use it to explore the disease database and consult a qualified clinician for personal care.
      </p>
    </div>
  );
}

function RecipeAnswer({ recipe }: { recipe: (typeof ayurvedicRecipes)[number] }) {
  return (
    <div className="space-y-2">
      <p>
        A useful recipe match is <strong>{recipe.name}</strong> ({recipe.sanskritName}).
      </p>
      <p className="text-xs rounded-lg border border-gold/20 bg-gold/10 p-2">
        {recipe.description}
      </p>
      <p className="text-sm">
        Best for: {recipe.dosha}. Prep: {recipe.prepTime}. Main benefits: {recipe.benefits.slice(0, 3).join(", ")}.
      </p>
      <p className="text-xs text-muted-foreground">Source: {recipe.source}</p>
    </div>
  );
}

function YogaAnswer({ pose }: { pose: (typeof comprehensiveYogaPoses)[number] }) {
  return (
    <div className="space-y-2">
      <p>
        A relevant practice to review is <strong>{pose.name}</strong> ({pose.sanskrit}).
      </p>
      <p className="text-sm">{pose.description}</p>
      <p className="text-xs text-muted-foreground">
        Duration: {pose.duration}. Benefits: {pose.benefits.slice(0, 3).join(", ")}.
      </p>
    </div>
  );
}

export default function AyurBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Namaste. I can search the disease, recipe, and yoga libraries and point you to educational source records. Ask about a symptom, food, dosha, recipe, or yoga need.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [backendDiseases, setBackendDiseases] = useState<BotDisease[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || backendDiseases.length) return;
    const controller = new AbortController();
    fetch(`${API_BASE_URL}/diseases?limit=1000`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (payload?.diseases) setBackendDiseases(payload.diseases);
      })
      .catch(() => {
        /* The bundled static records still keep the bot useful offline. */
      });
    return () => controller.abort();
  }, [backendDiseases.length, isOpen]);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const diseaseCorpus = useMemo<BotDisease[]>(() => {
    const byName = new Map<string, BotDisease>();
    [...backendDiseases, ...ayurvedicDiseases].forEach((disease) => {
      if (disease?.name) byName.set(normalize(disease.name), disease as BotDisease);
    });
    return [...byName.values()];
  }, [backendDiseases]);

  const buildAnswer = (query: string): React.ReactNode => {
    const disease = diseaseCorpus
      .map((item) => ({
        item,
        score: scoreText(query, [
          item.name,
          item.englishName,
          item.sanskrit,
          item.sanskrit_name,
          item.modernEquivalent,
          item.modernCorrelation,
          item.symptoms,
          item.causes,
          item.pathogenesis,
        ]),
      }))
      .sort((a, b) => b.score - a.score)[0];

    const recipe = ayurvedicRecipes
      .map((item) => ({
        item,
        score: scoreText(query, [
          item.name,
          item.sanskritName,
          item.description,
          item.dosha,
          item.mealType,
          item.ingredients.map((ingredient) => ingredient.item),
          item.benefits,
          item.contraindications,
        ]),
      }))
      .sort((a, b) => b.score - a.score)[0];

    const pose = comprehensiveYogaPoses
      .map((item) => ({
        item,
        score: scoreText(query, [
          item.name,
          item.sanskrit,
          item.category,
          item.dosha,
          item.description,
          item.benefits,
          item.therapeuticUses,
        ]),
      }))
      .sort((a, b) => b.score - a.score)[0];

    if ((disease?.score || 0) >= Math.max(recipe?.score || 0, pose?.score || 0, 3)) {
      return <DiseaseAnswer disease={disease.item} />;
    }
    if ((recipe?.score || 0) >= Math.max(pose?.score || 0, 3)) {
      return <RecipeAnswer recipe={recipe.item} />;
    }
    if ((pose?.score || 0) >= 3 || normalize(query).includes("yoga") || normalize(query).includes("asana")) {
      return pose ? <YogaAnswer pose={pose.item} /> : "Try asking for a specific yoga goal such as stress, digestion, sleep, or back support.";
    }

    return (
      <div className="space-y-2">
        <p>I could not find a strong match in the current educational libraries.</p>
        <p className="text-xs text-muted-foreground">
          Try a more specific phrase like "joint pain", "acidity", "kapha breakfast", "sleep yoga", or a known Sanskrit/English condition name.
        </p>
      </div>
    );
  };

  const sendQuery = (value = input) => {
    const query = value.trim();
    if (!query || isTyping) return;
    setMessages((prev) => [...prev, { id: makeId(), sender: "user", text: query }]);
    setInput("");
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: makeId(), sender: "bot", text: buildAnswer(query) }]);
      setIsTyping(false);
    }, 350);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="mb-4 flex h-[520px] max-h-[80vh] w-[350px] flex-col overflow-hidden rounded-2xl border border-sage/20 bg-background/95 shadow-2xl backdrop-blur-xl sm:w-[410px]"
          >
            <CardHeader className="border-b border-sage/20 bg-gradient-to-r from-sage/20 to-gold/20 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-white shadow-inner">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-heading font-bold text-gradient">AyurBot</span>
                    <span className="block text-[10px] font-normal text-muted-foreground">Educational library assistant</span>
                  </div>
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-black/5" aria-label="Close AyurBot">
                  <X className="h-5 w-5 text-foreground" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full shadow-sm ${msg.sender === "bot" ? "bg-sage/20 text-sage-700" : "bg-gold/20 text-gold-700"}`}>
                    {msg.sender === "bot" ? <Leaf className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div className={`max-w-[82%] rounded-2xl p-3 text-sm ${msg.sender === "bot" ? "rounded-tl-none border border-border/50 bg-muted/50" : "rounded-tr-none bg-sage text-white shadow-md"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pl-11">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      className="rounded-full border border-sage/20 bg-sage/5 px-3 py-1 text-xs text-sage-800 transition hover:bg-sage/10"
                      onClick={() => sendQuery(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sage/20 text-sage-700 shadow-sm">
                    <Leaf className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-border/50 bg-muted/50 p-3 text-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-sage/50" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-sage/50 [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-sage/50 [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </CardContent>

            <CardFooter className="border-t border-sage/10 bg-muted/20 p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendQuery();
                }}
                className="flex w-full gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about symptoms, recipes, yoga..."
                  className="flex-1 rounded-full border-sage/30 shadow-inner focus-visible:ring-sage/50"
                />
                <Button type="submit" size="icon" className="rounded-full bg-sage shadow-md transition-transform hover:scale-105 hover:bg-sage/90 active:scale-95" disabled={!input.trim() || isTyping} aria-label="Send message">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/20 bg-gradient-to-br from-sage to-emerald-600 text-white shadow-xl shadow-sage/30"
          aria-label="Open AyurBot"
        >
          <span className="absolute -right-1 -top-1 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-white bg-gold" />
          </span>
          <MessageCircle className="h-6 w-6 group-hover:hidden" />
          <Sparkles className="hidden h-6 w-6 group-hover:block" />
        </motion.button>
      )}
    </div>
  );
}
