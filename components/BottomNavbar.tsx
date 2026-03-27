import React, { useState, useEffect } from 'react';
import { BriefcaseBusiness, House, Mail, User, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNavbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home', icon: House, label: 'Home' },
    { name: 'About', href: '#about', icon: User, label: 'About' },
    { name: 'Skills', href: '#skills', icon: Wrench, label: 'Skills' },
    { name: 'Projects', href: '#projects', icon: BriefcaseBusiness, label: 'Projects' },
    { name: 'Contact', href: '#contact', icon: Mail, label: 'Contact' },
  ];

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.href.substring(1)))
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[94%] max-w-[400px]">
      <nav className="bg-white/80 backdrop-blur-xl rounded-3xl px-1 py-1 flex justify-around items-center border border-slate-200/50 shadow-xl relative overflow-hidden">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className={`relative flex flex-col items-center justify-center py-1.5 transition-all duration-300 flex-1 rounded-2xl ${isActive ? 'z-10' : 'z-0'
                }`}
              aria-label={item.name}
            >
              {isActive && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-x-1 inset-y-1 bg-primary/10 border border-primary/20 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative flex flex-col items-center gap-0.5">
                <Icon
                  className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-slate-400'
                    }`}
                />
                <span
                  className={`text-[8px] font-medium transition-all duration-300 tracking-tight ${isActive ? 'text-primary' : 'text-slate-500 opacity-80'
                    }`}
                >
                  {item.label}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default BottomNavbar;

