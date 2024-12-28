"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypewriterEffect } from "@/components/animations/TypewriterEffect";
import { RiArrowDownSLine } from "react-icons/ri";
import { useState, useEffect, useRef, useMemo } from "react";

export const Hero = () => {
  const [showArrows, setShowArrows] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const messages = ["Hello, World!", "I'm Aaris Khan.", "I make ideas happen!"];

  const [dimensions, setDimensions] = useState({
    scrollThreshold: 0,
    innerWidth: 0,
    innerHeight: 0,
  });

  useEffect(() => {
    // Set up function to recalc dimension-based values
    function updateDimensions() {
      setDimensions({
        scrollThreshold: window.innerHeight * 0.7,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Some constants
  const finalImageSize = 40;     // Memoji size once shrunk
  const initialImageSize = 150;  // Memoji size at start
  const scaleFactor = finalImageSize / initialImageSize;

  /**
   * finalXOffset is the final horizontal position
   * at which the memoji stops (negative = moves left).
   *
   * We'll tweak each breakpoint so that on:
   * - large desktop
   * - laptop ( ~1024px )
   * - tablet ( ~768px )
   * - mobile ( < 768px )
   *
   * the memoji is positioned near your navbar icon.
   */
  const finalXOffset = useMemo(() => {
    const w = dimensions.innerWidth;

    // base offset for large monitors
    let offset = -(w / 2) + (w * 0.1 + 40);

    // Tweak offsets at various breakpoints:
    if (w < 1280 && w >= 1024) {
      // "Laptop" ~ 1024px wide
      offset = -(w / 2) + (w * 0.08 + 35);
    } else if (w < 1024 && w >= 768) {
      // "Tablet" ~ 768-1023px wide
      offset = -(w / 2) + (w * 0.06 + 30);
    } else if (w < 768) {
      // "Mobile" < 768px
      offset = -(w / 2) + (w * 0.04 + 25);
    }

    return offset;
  }, [dimensions.innerWidth]);

  // Now use that finalXOffset in the array for imageX’s final value.
  const imageX = useTransform(
    scrollY,
    [
      0,
      dimensions.scrollThreshold * 0.2,
      dimensions.scrollThreshold * 0.4,
      dimensions.scrollThreshold * 0.6,
      dimensions.scrollThreshold * 0.8,
      dimensions.scrollThreshold,
    ],
    [
      0,                              // Start centered
      0,                              // Remain near center
      -(dimensions.innerWidth * 0.1), // Start moving left
      -(dimensions.innerWidth * 0.2),
      -(dimensions.innerWidth * 0.3),
      finalXOffset,                   // Final position (varies by breakpoint)
    ]
  );

  const imageY = useTransform(
    scrollY,
    [0, dimensions.scrollThreshold],
    [0, dimensions.innerHeight / 2 - 200]
  );

  const imageScale = useTransform(
    scrollY,
    [0, dimensions.scrollThreshold],
    [1, scaleFactor]
  );

  const imageOpacity = useTransform(
    scrollY,
    [0, dimensions.scrollThreshold * 0.8, dimensions.scrollThreshold],
    [1, 1, 0]
  );

  const handleTypingComplete = () => {
    setShowArrows(true);
  };

  return (
    <section id="hero" className="relative h-screen w-full" ref={containerRef}>
      <div className="container mx-auto px-4 h-full">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Memoji with animation */}
            <motion.div
              style={{
                scale: imageScale,
                y: imageY,
                x: imageX,
                opacity: imageOpacity,
              }}
              className="relative z-20 transform-gpu mb-4"
            >
              <Image
                src="/memoji-me.png"
                alt="Memoji Avatar"
                width={150}
                height={150}
                priority
                className="dark:[@media(prefers-color-scheme:dark)]:filter dark:[@media(prefers-color-scheme:dark)]:drop-shadow-[0_0_65px_rgba(7,254,24,0.3)]"
              />
            </motion.div>

            {/* Text content */}
            <div className="relative z-10">
              <TypewriterEffect
                messages={messages}
                className="text-3xl md:text-5xl font-bold"
                onComplete={handleTypingComplete}
              />
            </div>
          </div>

          {/* Scroll arrows */}
          {showArrows && !isScrolled && (
            <div className="absolute bottom-20 z-0">
              <motion.div className="flex flex-col">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2,
                    times: [0, 0.2, 0.4, 0.6],
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <RiArrowDownSLine className="w-12 h-12 dark:text-white text-black" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2,
                    times: [0.2, 0.4, 0.6, 0.8],
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  className="-mt-4"
                >
                  <RiArrowDownSLine className="w-12 h-12 dark:text-white text-black" />
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
