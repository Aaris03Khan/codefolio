import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import '@/styles/about.css';

export const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef<number>(0);
  const scrollDistance = useRef<number>(0);
  
  // ABOUT text scroll animation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !textRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const currentScroll = window.scrollY;
        const scrollDiff = currentScroll - lastScrollY.current;
        scrollDistance.current = scrollDistance.current + scrollDiff * 0.5;
        textRef.current.style.transform = `translateX(${-scrollDistance.current}px)`;
        lastScrollY.current = currentScroll;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Spring animation configuration
  const springConfig = {
    type: "spring",
    damping: 12,
    stiffness: 100,
    mass: 0.8,
    duration: 0.8
  };

  const bioRef = useRef(null);
  const isInView = useInView(bioRef, { 
    once: true,
    margin: "-100px" 
  });

  return (
    <section id="about" ref={containerRef} className="w-full">
      {/* ABOUT banner with scroll-based movement */}
      <div className="bg-[#00FF00] w-full overflow-hidden py-2 sm:py-3">
        <div 
          ref={textRef}
          className="flex whitespace-nowrap transition-transform duration-75 ease-out"
        >
          {Array(20).fill('ABOUT').map((text, index) => (
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
      <div className="overflow-hidden w-full py-2 sm:py-3 md:py-4">
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

      {/* Gap */}
      <div className="h-16" />

      {/* Bio section with animations */}
      <div 
        ref={bioRef}
        className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-40 lg:gap-52 overflow-hidden"
      >
        <motion.div
          className="w-32 md:w-36 flex-shrink-0"
          initial={{ x: -200, opacity: 0, scale: 0.5 }}
          animate={{ 
            x: isInView ? 0 : -200, 
            opacity: isInView ? 1 : 0,
            scale: isInView ? 1 : 0.5
          }}
          transition={springConfig}
          whileHover={{ scale: 1.1 }}
        >
          <div className="glow-effect">
            <Image
              src="/memoji-laptop.png"
              alt="Software Engineer Memoji"
              width={144}
              height={144}
              priority
              className="object-contain relative z-10"
            />
          </div>
        </motion.div>

        <motion.div
          className="max-w-xl"
          initial={{ x: 200, opacity: 0 }}
          animate={{ 
            x: isInView ? 0 : 200,
            opacity: isInView ? 1 : 0 
          }}
          transition={{
            ...springConfig,
            delay: 0.2
          }}
        >
          <p className="text-lg md:text-xl text-black dark:text-white leading-relaxed">
            I'm a forward-thinking software engineer, fearless in exploring new tech 
            and creative solutions. I love experimenting, optimizing performance, 
            and shipping features that truly make an impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;