import { ArrowRight, BookOpen, Boxes, Layers, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const roadmap = [
  {
    icon: <Boxes className="h-5 w-5" />,
    title: "Owned 3D Anatomy Asset",
    text: "A licensed or internally generated human model with surface, muscle, organ-context, and marma overlay layers.",
  },
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Classical Marma Mapping",
    text: "Point coordinates, tissue type, severity class, therapeutic notes, cautions, and source references reviewed before release.",
  },
  {
    icon: <Stethoscope className="h-5 w-5" />,
    title: "Study Workspace",
    text: "Search, region filters, bookmarks, quiz mode, guided tours, and a low-power 2D fallback for accessibility.",
  },
];

export default function ThreeDModelPage() {
  return (
    <div className="min-h-screen bg-[#07171b] text-slate-100">
      <section className="relative overflow-hidden border-b border-cyan-300/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_32%),linear-gradient(135deg,rgba(15,118,110,0.35),transparent_45%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1fr_420px] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <Badge className="border-cyan-300/40 bg-cyan-300/10 text-cyan-50" variant="outline">
                Coming soon
              </Badge>
              <Badge className="border-amber-300/40 bg-amber-300/10 text-amber-50" variant="outline">
                Educational anatomy lab
              </Badge>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Marma Anatomy Lab is being built with reviewed sources.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              We have hidden the early 3D prototype while the production atlas is prepared. The next release will use licensed or owned anatomy assets, reviewed marma references, and a study interface designed for students and practitioners.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="gap-2 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                <Link to="/research">
                  View research sources
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                <Link to="/diseases">Browse knowledge base</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/30 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="rounded-xl border border-cyan-300/20 bg-[#091f28] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300/15 text-cyan-100">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Release Standard</h2>
                  <p className="text-sm text-slate-400">No copied proprietary anatomy assets</p>
                </div>
              </div>
              <div className="space-y-3 text-sm leading-6 text-slate-300">
                <p>Every public marma entry will include source attribution, review status, and practical caution notes.</p>
                <p>Classical content will remain informational and educational, not positioned as diagnosis or treatment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">Build roadmap</p>
            <h2 className="mt-2 text-2xl font-bold text-white">What we are preparing</h2>
          </div>
          <div className="hidden items-center gap-2 text-sm text-slate-400 sm:flex">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Source-reviewed before launch
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {roadmap.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/10 bg-[#0b222a] p-5">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-cyan-300/10 text-cyan-100">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-amber-300/20 bg-amber-300/10 p-5">
          <div className="flex gap-3">
            <BookOpen className="mt-1 h-5 w-5 flex-shrink-0 text-amber-100" />
            <p className="text-sm leading-6 text-amber-50">
              Current marma records are retained internally as seed study data. They will not be presented as a full anatomy simulator until the 3D model, source review, accessibility fallback, and clinical copy review are complete.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
