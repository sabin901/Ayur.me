import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-12">Last updated: February 2025</p>

        <Card className="border-emerald-200 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-800">
              <Shield className="w-5 h-5" />
              Information We Collect
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              ayur.me is designed with privacy in mind. We do not collect personally identifiable information
              unless you voluntarily provide it (e.g., via contact forms). Quiz answers and progress data
              are currently stored locally in your browser and are not transmitted to our servers.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 mb-8">
          <CardHeader>
            <CardTitle className="text-emerald-800">How We Use Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              Any information you provide is used solely to respond to inquiries and improve our services.
              We do not sell or share your data with third parties for marketing purposes.
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-800">Cookies & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              We may use standard analytics tools to understand how visitors use our site. You can control
              cookie preferences through your browser settings.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
