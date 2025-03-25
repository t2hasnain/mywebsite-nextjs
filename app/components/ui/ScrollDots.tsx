'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];

const ScrollDots = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  
  // Transform scrollYProgress to horizontal movement for dots - faster movement
  const dotsX = useTransform(scrollYProgress, [0, 0.7], ['5%', '90%']);
  
  // Line that connects to C button when contact section is active - faster animation
  const lineWidth = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95],
    ['0%', '0%', activeSection === 5 ? '100%' : '0%']
  );
  
  // C button color changes to blue when contact section is active
  const buttonColor = useTransform(
    scrollYProgress,
    [0.8, 0.9, 1],
    ['#3B82F6', '#3B82F6', activeSection === 5 ? '#3B82F6' : '#3B82F6']
  );
  
  // Increase dot size based on active section and make faster transitions
  const dotSize = (index) => {
    return {
      scale: activeSection === index ? 1.8 : 1,
      transition: { duration: 0.15 }
    };
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.scrollHeight;
      
      // Calculate which section is in view with more sensitivity
      const sectionElements = sections.map(id => document.getElementById(id));
      let newActiveSection = 0;
      
      sectionElements.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          // More sensitive scroll detection
          if (scrollPosition >= sectionTop - windowHeight / 3 && 
              scrollPosition < sectionTop + sectionHeight - windowHeight / 3) {
            newActiveSection = index;
          }
        }
      });
      
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToSection = (index) => {
    const section = document.getElementById(sections[index]);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <>
      {/* Horizontal Scroll Dots */}
      <motion.div 
        className="fixed top-1/2 transform -translate-y-1/2 z-50"
        style={{ x: dotsX }}
      >
        <div className="flex items-center space-x-3">
          {sections.slice(0, 5).map((section, index) => (
            <motion.div
              key={section}
              className={`w-3 h-3 rounded-full cursor-pointer hover:scale-150 transition-all duration-100 ${
                activeSection === index 
                  ? 'bg-blue-500 shadow-md shadow-blue-500/50' 
                  : 'bg-gray-400 dark:bg-gray-600'
              }`}
              whileHover={dotSize(index)}
              onClick={() => scrollToSection(index)}
              animate={{
                scale: activeSection === index ? 1.5 : 1,
                opacity: scrollYProgress.get() > 0.95 ? 0 : 1
              }}
              transition={{ duration: 0.15 }}
            />
          ))}
          
          {/* Connection line to "C" button when reaching contact section */}
          {activeSection === 5 && (
            <motion.div 
              className="h-0.5 bg-blue-500"
              style={{ 
                width: lineWidth,
                opacity: useTransform(scrollYProgress, [0.8, 0.85, 0.9], [0, 0.7, 1])
              }}
            />
          )}
        </div>
      </motion.div>
      
      {/* "C" Button for Contact */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg z-50"
        style={{ 
          backgroundColor: buttonColor,
          scale: useTransform(
            scrollYProgress, 
            [0.8, 0.9, 1], 
            [1, activeSection === 5 ? 1.2 : 1, activeSection === 5 ? 1.2 : 1]
          )
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleContactClick}
        transition={{ duration: 0.15 }}
      >
        <span className="text-white font-bold text-xl">C</span>
      </motion.div>
    </>
  );
};

export default ScrollDots; 