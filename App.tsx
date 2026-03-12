import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeViewer from './components/ResumeViewer';
import BottomNavbar from './components/BottomNavbar';
import { ThemeProvider } from './components/ThemeContext';
import AdminPanel from './components/AdminPanel';

const Portfolio: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="min-h-screen flex flex-col  transition-colors duration-300"
  >
    <Header />
    <main className="flex-grow">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
    <BottomNavbar />
    <Footer />
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Portfolio />} />
        <Route
          path="/resume"
          element={
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4 }}
            >
              <ResumeViewer />
            </motion.div>
          }
        />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
};

export default App;
