import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Youtube, Twitter, Instagram, Mail, Rocket, Music2, VolumeX, Copy, Computer, Drone } from 'lucide-react';

export default function HeroScene({ onEnter, onEasterEgg, musicOn, toggleMusic }) {
  const [copied, setCopied] = useState(false);

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText('litecor');
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Atmospheric gradient overlays (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0b1020]/40 via-transparent to-[#0b1020]/60" />
      <div className="pointer-events-none absolute -inset-20 blur-3xl opacity-60" aria-hidden>
        <div className="absolute top-10 left-10 size-72 rounded-full bg-fuchsia-500/20" />
        <div className="absolute bottom-16 right-12 size-80 rounded-full bg-cyan-400/20" />
      </div>

      {/* Title and Enter button */}
      <div className="absolute inset-x-0 top-10 flex flex-col items-center gap-4 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent drop-shadow"
        >
          Litecor Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-sm md:text-base text-white/80"
        >
          A playful low‑poly world for creative video editing, cinematic cuts, and high‑energy shorts. Explore the island studio and discover hidden surprises.
        </motion.p>
      </div>

      <motion.button
        onClick={onEnter}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="group absolute left-1/2 -translate-x-1/2 bottom-24 md:bottom-16 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white shadow-xl flex items-center gap-2"
      >
        <Rocket className="size-5 text-cyan-300 group-hover:rotate-12 transition-transform" />
        Enter Studio
      </motion.button>

      {/* Orbiting social icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[28rem] md:size-[36rem] rounded-full border border-white/10 animate-[spin_30s_linear_infinite]" />
        <OrbitIcon href="https://youtube.com/@litecor" label="YouTube" className="top-[10%] left-1/2 -translate-x-1/2" Icon={Youtube} color="text-red-400" />
        <OrbitIcon href="https://x.com/litecor" label="X" className="right-[10%] top-1/2 -translate-y-1/2" Icon={Twitter} color="text-white" />
        <OrbitIcon href="https://instagram.com/litecor" label="Instagram" className="bottom-[12%] left-1/3" Icon={Instagram} color="text-pink-400" />
        <OrbitIcon href="mailto:litecorclips@gmail.com" label="Email" className="top-[18%] right-1/3" Icon={Mail} color="text-emerald-300" />
        {/* Discord copy */}
        <div className="absolute bottom-[18%] right-[22%]" style={{ pointerEvents: 'auto' }}>
          <motion.button
            onClick={handleCopyDiscord}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/20 text-white shadow backdrop-blur-md"
            aria-label="Copy Discord handle"
          >
            <Copy className="size-4 text-indigo-300" />
            <span className="text-sm">litecor</span>
          </motion.button>
          {copied && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-xs text-emerald-300">
              Copied!
            </motion.div>
          )}
        </div>
      </div>

      {/* Music toggle */}
      <div className="absolute top-6 right-6" style={{ pointerEvents: 'auto' }}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMusic}
          className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white backdrop-blur-md"
        >
          {musicOn ? <Music2 className="size-4 text-cyan-300" /> : <VolumeX className="size-4 text-gray-300" />}
          <span className="text-xs">{musicOn ? 'Music On' : 'Music Off'}</span>
        </motion.button>
      </div>

      {/* Easter egg hotspots overlay: clickable icons mapped near Spline objects */}
      <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
        {/* Computer desk → portfolio */}
        <Hotspot className="left-[18%] bottom-[30%]" label="Portfolio" Icon={Computer} onClick={onEnter} />
        {/* Drone → showreel (easter egg) */}
        <Hotspot className="right-[22%] top-[30%]" label="Drone" Icon={Drone} onClick={onEasterEgg} />
      </div>
    </div>
  );
}

function OrbitIcon({ href, label, className, Icon, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto` + ' ' + className}
      aria-label={label}
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 8 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur-md"
      >
        <Icon className={`size-5 ${color}`} />
      </motion.div>
    </a>
  );
}

function Hotspot({ className, label, Icon, onClick }) {
  return (
    <div className={`absolute ${className}`} style={{ pointerEvents: 'auto' }}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-white shadow backdrop-blur-md"
      >
        <Icon className="size-4 text-cyan-300" />
        <span className="text-xs">{label}</span>
      </motion.button>
    </div>
  );
}
