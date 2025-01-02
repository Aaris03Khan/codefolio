import React, { useEffect, useRef } from 'react';
import '@/styles/about.css';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);
  const scrollDistance = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !textRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      // Only animate when section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Calculate scroll direction and distance
        const currentScroll = window.scrollY;
        const scrollDiff = currentScroll - lastScrollY.current;
        
        // Update cumulative scroll distance with increased sensitivity
        scrollDistance.current = scrollDistance.current + scrollDiff * 0.5;
        
        // Apply the transform
        textRef.current.style.transform = `translateX(${-scrollDistance.current}px)`;
        
        lastScrollY.current = currentScroll;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll values when component unmounts
  useEffect(() => {
    return () => {
      lastScrollY.current = 0;
      scrollDistance.current = 0;
    };
  }, []);

  return (
    <section id="about" ref={containerRef} className="w-full">
      {/* ABOUT banner with scroll-based movement */}
      <div className="bg-[#00FF00] w-full overflow-hidden py-3">
        <div 
          ref={textRef}
          className="flex whitespace-nowrap transition-transform duration-75 ease-out"
        >
          {Array(40).fill('ABOUT').map((text, index) => (
            <span 
              key={index}
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mx-1 sm:mx-2 whitespace-nowrap"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* WELCOME text with continuous animation */}
      <div className="overflow-hidden w-full py-4">
        <div className="welcome-scroll">
          {Array(16).fill('WELCOME!').map((text, index) => (
            <span 
              key={index}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black dark:text-white mx-4 sm:mx-6 md:mx-8 whitespace-nowrap transition-colors duration-200"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-4 py-20">
        {/* Your content */}
      </div>
    </section>
  );
};

export default About;