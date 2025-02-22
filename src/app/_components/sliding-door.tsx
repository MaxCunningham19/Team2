"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Search } from 'lucide-react';

const SlidingDoorLayout = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const leftControls = useAnimation();
  const rightControls = useAnimation();

  // Listen for the first scroll/touch event
  useEffect(() => {
    const handleUserScroll = () => {
      if (!animationStarted) {
        setAnimationStarted(true);
        // Lock scrolling immediately
        window.scrollTo(0, 0)
        document.body.style.overflow = 'hidden';
        void runDoorAnimation();
      }
    };

    window.addEventListener('wheel', handleUserScroll, { passive: true });
    window.addEventListener('touchmove', handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserScroll);
      window.removeEventListener('touchmove', handleUserScroll);
    };
  }, [animationStarted]);

  // Animate the doors with easing and then unlock scrolling
  const runDoorAnimation = async () => {
    await Promise.all([
      leftControls.start({
        x: -1000,
        transition: { duration: 1.5, ease: "easeInOut" },
      }),
      rightControls.start({
        x: 1000,
        transition: { duration: 1.5, ease: "easeInOut" },
      }),
    ]);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="flex min-h-screen max-w-[99vw] flex-col items-center justify-center font-serif overflow-hidden">
      {/* Search Bar */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full mx-auto px-4 max-w-xl ">
          <div className="relative">
            <input
              type="text"
              className="w-full h-12 pl-4 pr-10 rounded-lg border border-gray-200 focus:outline-none focus:border-gray-400"
              placeholder="Search..."
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      {/* Sliding Doors */}
      <div className="flex h-screen w-screen flex-row relative">
        <motion.div
          className="flex h-full w-full items-center justify-end bg-white"
          animate={leftControls}
          initial={{ x: 0 }}
        >
          <h1 className="text-5xl font-extralight tracking-tight sm:text-[7rem]">
            nov
          </h1>
        </motion.div>
        <motion.div
          className="flex h-full w-full items-center bg-accent text-accent-foreground"
          animate={rightControls}
          initial={{ x: 0 }}
        >
          <h1 className="text-5xl font-extralight tracking-tight sm:text-[7rem]">
            anti
          </h1>
        </motion.div>
      </div>

      {/* Extra scroll space */}
      <div className="h-screen" />
    </main>
  );
};

export default SlidingDoorLayout;
