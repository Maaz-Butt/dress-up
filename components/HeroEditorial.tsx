"use client";
import React from "react";
import { NavbarButton } from "./ui/resizable-navbar";
import { motion } from "motion/react";

export function HeroEditorial() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image / Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=3540&auto=format&fit=crop"
        >
          <source
            src="https://videos.pexels.com/video-files/3756003/3756003-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          {/* Fallback Image if video fails or on load */}
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=3540&auto=format&fit=crop"
            alt="Fashion Hero"
            className="h-full w-full object-cover"
          />
        </video>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-white text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4">
            Spring Collection 2025
          </h2>
          <h1 className="text-white text-5xl md:text-8xl font-serif font-light mb-8 tracking-tight">
            Elegance Redefined
          </h1>
          <div className="flex gap-4 justify-center">
            <NavbarButton
              variant="primary"
              className="bg-white text-black hover:bg-neutral-200 border-none px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold"
            >
              Shop Women
            </NavbarButton>
            <NavbarButton
              variant="secondary"
              className="bg-transparent border border-white text-white hover:bg-white/10 px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold"
            >
              Shop Men
            </NavbarButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/50" />
      </motion.div>
    </div>
  );
}
