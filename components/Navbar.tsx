import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";


const Navbar: React.FC = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const linkColor = isScrolled ? "text-[#0020BF]" : "text-white";

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/40 to-black/10 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="z-50 relative group flex items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <motion.img
              src="/dtales-logo.png"
              alt="DTales Tech Logo"
              className="h-12 w-auto"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={`text-sm font-medium ${linkColor} hover:opacity-70 transition`}
          >
            Home
          </Link>

          <Link
            to="/services"
            className={`text-sm font-medium ${linkColor} hover:opacity-70 transition`}
          >
            Services
          </Link>

          <Link
            to="/team"
            className={`text-sm font-medium ${linkColor} hover:opacity-70 transition`}
          >
            Our Team
          </Link>

          {/* Dropdown — Articles */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("articles")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-1 text-sm font-medium ${linkColor} hover:opacity-70 transition`}>
              Articles
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${
                  activeDropdown === "articles" ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {activeDropdown === "articles" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/90 backdrop-blur-2xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
                >
                  <div className="p-1">
                    <Link
                      to="/blogs"
                      className={`block px-4 py-3 text-sm ${linkColor} hover:bg-white/10 rounded-lg`}
                    >
                      Blogs
                    </Link>
                    <Link
                      to="/case-studies"
                      className={`block px-4 py-3 text-sm ${linkColor} hover:bg-white/10 rounded-lg`}
                    >
                      Case Studies
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#contact"
            className={`text-sm font-medium ${linkColor} hover:opacity-70 transition`}
          >
            Contact
          </a>

          <button 
            className="bg-[#0020BF] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#0A2CFF] hover:scale-105 transition-all shadow-lg"
          >
            Get Started
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 p-2"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} className={linkColor} /> : <Menu size={24} className={linkColor} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex flex-col pt-24 px-6 md:hidden"
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col space-y-6">
              <Link
                to="/"
                className="text-3xl font-bold text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Home
              </Link>

              <Link
                to="/services"
                className="text-3xl font-bold text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Services
              </Link>

              <Link
                to="/team"
                className="text-3xl font-bold text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Our Team
              </Link>

              <div className="space-y-4">
                <span className="text-3xl font-bold text-white/50">
                  Articles
                </span>
                <div className="pl-6 flex flex-col space-y-4 border-l-2 border-white/10">
                  <Link
                    to="/blogs"
                    className="text-xl text-white"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Blogs
                  </Link>
                  <Link
                    to="/case-studies"
                    className="text-xl text-white"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    Case Studies
                  </Link>
                </div>
              </div>

              <a
                href="#contact"
                className="text-3xl font-bold text-white"
                onClick={() => setIsMobileOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;