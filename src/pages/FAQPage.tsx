import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is ayur.me?",
    a: "ayur.me is a platform that brings classical Ayurvedic wisdom into the modern age. We offer personalized dosha assessment, disease knowledge from classical texts, yoga practices, recipes, and mental wellness guidance—all grounded in authentic Sanskrit sources.",
  },
  {
    q: "How does the Dosha Quiz work?",
    a: "The Dosha Quiz asks about your physical traits, mental tendencies, digestion, sleep, and lifestyle. Based on your answers, it calculates your constitution (Vata, Pitta, Kapha or a combination) and provides personalized recommendations.",
  },
  {
    q: "Is ayur.me a substitute for medical advice?",
    a: "No. ayur.me is for educational purposes only. It does not replace professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for health concerns.",
  },
  {
    q: "Where does the disease knowledge come from?",
    a: "Our disease database draws from classical Ayurvedic texts including Charaka Samhita, Sushruta Samhita, Madhava Nidanam, and Bhava Prakasha—and merges them with modern integrative references.",
  },
  {
    q: "Is my data saved?",
    a: "Currently, progress and quiz results are stored locally in your browser. Our API and saved assessments feature is coming soon.",
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h1>
        <p className="text-xl text-gray-600 mb-12">
          Frequently asked questions about ayur.me.
        </p>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
