import { Link } from "react-router-dom";
import { type FormEvent, useState } from "react";
import { Heart, Mail, Facebook, Twitter, Instagram, Youtube, Send, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const footerNavigation = {
  explore: [
    { name: "Discover Your Dosha", href: "/ayur-analysis" },
    { name: "Disease Database", href: "/diseases" },
    { name: "Yoga Library", href: "/yoga" },
    { name: "Mental Wellness", href: "/mental-health" },
  ],
  learn: [
    { name: "About Ayurveda", href: "/about" },
    { name: "Three Doshas", href: "/doshas" },
    { name: "Holistic Healing", href: "/healing" },
    { name: "Research", href: "/research" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success" | "error">("idle");

  const handleNewsletter = (event: FormEvent) => {
    event.preventDefault();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!isValid) {
      setNewsletterStatus("error");
      return;
    }
    setEmail("");
    setNewsletterStatus("success");
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-t from-emerald-900 to-green-800 text-white pt-16 pb-8" 
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section: Newsletter and Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Newsletter - Span 5 columns */}
          <div className="md:col-span-5">
            <div className="flex items-center mb-4">
              <Leaf className="h-6 w-6 mr-2 text-amber-300" aria-hidden />
              <h3 className="text-2xl font-bold text-amber-300">Join Our Wellness Community</h3>
            </div>
            <p className="mb-4 text-green-100">
              Receive Ayurvedic tips, recipes, and updates to support your journey to natural balance.
            </p>
            <form className="flex flex-col xl:flex-row gap-2" onSubmit={handleNewsletter} noValidate>
              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setNewsletterStatus("idle");
                }}
                aria-label="Email address"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-green-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-white placeholder-green-200"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-green-900 font-bold px-6 py-3 rounded-lg flex items-center justify-center whitespace-nowrap"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </motion.button>
            </form>
            {newsletterStatus === "success" && (
              <p className="mt-3 text-sm text-emerald-100" role="status">
                Thanks. You are on the local preview list.
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="mt-3 text-sm text-amber-200" role="alert">
                Enter a valid email address to subscribe.
              </p>
            )}
          </div>
          
          {/* Explore - Span 2 columns */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-lg font-bold mb-4 text-amber-300">Explore</h4>
            <ul className="space-y-2">
              {footerNavigation.explore.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="text-green-100 hover:text-amber-300 transition-colors"
                >
                  <Link to={item.href}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Learn - Span 2 columns */}
          <div className="md:col-span-2">
            <h4 className="text-lg font-bold mb-4 text-amber-300">Learn</h4>
            <ul className="space-y-2">
              {footerNavigation.learn.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="text-green-100 hover:text-amber-300 transition-colors"
                >
                  <Link to={item.href}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Support - Span 3 columns */}
          <div className="md:col-span-3">
            <h4 className="text-lg font-bold mb-4 text-amber-300">Support</h4>
            <ul className="space-y-2">
              {footerNavigation.support.map((item) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  className="text-green-100 hover:text-amber-300 transition-colors"
                >
                  <Link to={item.href}>{item.name}</Link>
                </motion.li>
              ))}
              <li className="mt-4">
                <a href="mailto:support@ayur.me" className="text-green-100 hover:text-amber-300 transition-colors flex items-center break-all">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  support@ayur.me
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-green-700 my-8"></div>
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Branding */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <Leaf className="h-6 w-6 mr-2 text-white" aria-hidden />
              <span className="text-2xl font-bold text-white">ayur.me</span>
            </div>
            <p className="text-green-200 mt-2">
              Rediscover your natural balance through the ancient wisdom of Ayurveda.
            </p>
            <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10 max-w-md">
              <p className="text-green-100/70 text-xs leading-relaxed">
                <strong className="text-green-100/90">Medical Disclaimer:</strong> The content on ayur.me is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
            <p className="text-green-300 text-sm mt-4 flex items-center justify-center md:justify-start">
              Made with <Heart className="text-rose-400 mx-1 h-4 w-4" /> for your wellbeing
            </p>
          </div>
          
          {/* Social Media */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <motion.a 
              href="https://www.instagram.com/"
              aria-label="Instagram"
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://twitter.com/"
              aria-label="Twitter"
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://www.facebook.com/"
              aria-label="Facebook"
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="https://www.youtube.com/"
              aria-label="YouTube"
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Youtube className="h-6 w-6" />
            </motion.a>
          </div>
          
          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-green-300">
              Wellness Worldwide | © 2024 ayur.me. Ancient wisdom, modern application.
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
