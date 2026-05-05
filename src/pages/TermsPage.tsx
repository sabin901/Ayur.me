import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-12">Last updated: February 2025</p>

        <Card className="border-emerald-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <FileText className="w-5 h-5" />
              Use of Service
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              By using ayur.me, you agree to use the platform for personal, non-commercial, educational
              purposes only. The content provided is based on classical Ayurvedic texts and modern
              integrative research and is intended to complement—not replace—professional medical advice.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-800">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              ayur.me does not provide medical advice, diagnosis, or treatment. Always consult qualified
              healthcare providers for health concerns. Some classical formulations may contain substances
              considered toxic by modern standards—consult practitioners before use.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">Acceptance</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              Continued use of ayur.me constitutes acceptance of these terms. We may update this document
              from time to time; please check back periodically.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
