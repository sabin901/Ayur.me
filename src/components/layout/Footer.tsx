import { Link } from "react-router-dom";
import { Heart, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Send } from "lucide-react";
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
          {/* Newsletter - Span 4 columns */}
          <div className="md:col-span-4">
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2">🌿</span>
              <h3 className="text-2xl font-bold text-amber-300">Join Our Wellness Community</h3>
            </div>
            <p className="mb-4 text-green-100">
              Receive Ayurvedic tips, recipes, and updates to support your journey to natural balance.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-green-300/30 focus:outline-none focus:ring-2 focus:ring-emerald-300 text-white placeholder-green-200"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-green-900 font-bold px-6 py-3 rounded-lg flex items-center justify-center"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </motion.button>
            </form>
          </div>
          
          {/* Explore - Span 2 columns */}
          <div className="md:col-span-2">
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
          
          {/* Support - Span 4 columns */}
          <div className="md:col-span-4">
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
                <a href="mailto:support@ayur.me" className="text-green-100 hover:text-amber-300 transition-colors flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
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
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌿</span>
              <span className="text-2xl font-bold text-white">ayur.me</span>
            </div>
            <p className="text-green-200 mt-2">
              Rediscover your natural balance through the ancient wisdom of Ayurveda.
            </p>
            <p className="text-green-300 text-sm mt-2 flex items-center">
              Made with <Heart className="text-rose-400 mx-1 h-4 w-4" /> for your wellbeing
            </p>
          </div>
          
          {/* Social Media */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.2 }}
              className="text-green-200 hover:text-amber-300 transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </motion.a>
            <motion.a 
              href="#" 
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