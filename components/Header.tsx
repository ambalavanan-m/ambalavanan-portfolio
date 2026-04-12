import React, { useState, useEffect } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.href.substring(1)))
      .filter((element): element is HTMLElement => Boolean(element));

    if (sections.length === 0) return;

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setActiveSection('contact');
      }
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary z-[70] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[60] transition-all duration-300 w-[96%] max-w-7xl ${isScrolled
          ? 'top-4 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-sm rounded-2xl py-2 px-2'
          : 'top-6 bg-transparent border-b border-transparent py-3 px-4'
          }`}
      >
        <div className="w-full px-4 flex justify-between items-center">
          {/* Logo & Name */}
          <div
            onClick={(e) => {
              if (e.detail === 3) {
                window.dispatchEvent(new CustomEvent('toggle-terminal'));
              }
            }}
            className="flex items-center gap-3 group z-50 cursor-pointer"
            aria-label="Home"
          >
            <Link to="/" className="flex items-center gap-3">
              <div className={`rounded-xl overflow-hidden border border-slate-200 transform group-hover:scale-105 transition-all ${isScrolled ? 'w-9 h-9' : 'w-10 h-10'}`}>
                <img src="https://res.cloudinary.com/dfmtkqqaa/image/upload/f_auto,q_auto,w_800/profile_svzusg.webp" alt="Ambalavanan profile" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg md:text-xl font-bold text-text group-hover:text-primary transition-colors font-display">
                Ambalavanan
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4 lg:gap-8">
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-1">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`relative px-4 py-1.5 rounded-lg font-medium transition-all duration-200 text-sm ${isActive
                      ? 'bg-primary/5 text-primary border border-primary/20'
                      : 'text-slate-600 hover:text-text hover:bg-slate-50'
                      }`}
                  >
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>

            {/* Action Group */}
            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden md:inline-flex px-6 py-2 bg-text hover:bg-primary text-white font-medium rounded-xl transition-all duration-300 shadow-sm transform hover:-translate-y-0.5 text-sm"
              >
                Let's Talk
              </a>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-primary hover:bg-slate-50 transition-all"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden absolute top-full left-0 right-0 mt-4 mx-0 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-40"
            >
              <nav className="flex flex-col p-4 space-y-2">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-6 py-4 rounded-xl font-bold transition-all text-base flex justify-between items-center ${isActive
                        ? 'bg-primary/5 text-primary border border-primary/10'
                        : 'text-slate-500 hover:bg-slate-50'
                        }`}
                    >
                      {link.name}
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mx-2 mt-4 px-6 py-4 bg-text text-white text-center font-bold rounded-xl shadow-lg border border-text transition-all active:scale-95"
                >
                  Get in Touch
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
