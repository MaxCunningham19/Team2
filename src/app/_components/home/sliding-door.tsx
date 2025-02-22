"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function SlidingDoorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [animationStarted, setAnimationStarted] = useState(false);
  const [doorsVisible, setDoorsVisible] = useState(true);
  const leftControls = useAnimation();
  const rightControls = useAnimation();

  // Listen for the first scroll/touch event
  useEffect(() => {
    const handleUserScroll = () => {
      if (!animationStarted) {
        setAnimationStarted(true);
        // Reset scroll to the top
        window.scrollTo(0, 0);
        // Lock scrolling
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

  // Animate the doors with easing and then hide them and unlock scrolling
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
    // Hide the door elements after animation
    setDoorsVisible(false);
    // Unlock scrolling
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {children}
      {doorsVisible && (
        <div className="fixed flex h-screen w-screen flex-row z-10 top-0">
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
      )}
    </>
  );
};
