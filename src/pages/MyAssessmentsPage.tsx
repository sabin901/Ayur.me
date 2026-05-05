import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import { ApiError, assessments, type SavedAssessment } from "@/lib/api";

const doshaColor: Record<string, string> = {
  vata: "bg-purple-100 text-purple-800 border-purple-200",
  pitta: "bg-orange-100 text-orange-800 border-orange-200",
  kapha: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

function formatDate(s: string): string {
  try {
    return new Date(s).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return s;
  }
}

export default function MyAssessmentsPage() {
  const { user, isLoading: authLoading, logout } = useAuth();
  const [items, setItems] = useState<SavedAssessment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (authLoading || !user) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    assessments
      .list()
      .then(({ items: list }) => {
        if (!cancelled) setItems(list);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(
          err instanceof ApiError
            ? err.message
            : "Could not load your assessments. Please try again."
        );
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authLoading, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading…</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: "/my-assessments" }} replace />;
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this assessment? This can't be undone.")) return;
    try {
      await assessments.remove(id);
      setItems((cur) => (cur ? cur.filter((a) => a._id !== id) : cur));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not delete.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="flex items-start justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Assessments</h1>
            <p className="text-gray-600">
              Signed in as <span className="font-medium">{user.email}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to="/ayur-analysis">New assessment</Link>
            </Button>
            <Button variant="ghost" onClick={logout}>
              Sign out
            </Button>
          </div>
        </header>

        {error && (
          <p role="alert" className="text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        {loading && <p className="text-gray-500">Loading your assessments…</p>}

        {!loading && items && items.length === 0 && (
          <Card>
            <CardHeader>
              <CardTitle>No saved assessments yet</CardTitle>
              <CardDescription>
                Take the dosha quiz, then save the result to track changes over time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link to="/ayur-analysis">Take the quiz</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {!loading && items && items.length > 0 && (
          <div className="grid gap-4">
            {items.map((a) => (
              <Card key={a._id} className="border-emerald-100">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle className="text-lg">{a.constitution}</CardTitle>
                    <span className="text-sm text-gray-500">{formatDate(a.createdAt)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(["vata", "pitta", "kapha"] as const).map((d) => (
                      <Badge key={d} variant="outline" className={doshaColor[d]}>
                        {d.charAt(0).toUpperCase() + d.slice(1)} {a.percentages[d]}%
                      </Badge>
                    ))}
                  </div>
                  {a.notes && <p className="text-sm text-gray-600 mb-3">{a.notes}</p>}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(a._id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
