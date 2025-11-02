import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroScene from './components/HeroScene.jsx';
import PortfolioScene from './components/PortfolioScene.jsx';
import AboutScene from './components/AboutScene.jsx';
import ContactScene from './components/ContactScene.jsx';

const scenes = ['hero', 'portfolio', 'about', 'contact'];

export default function App() {
  const [scene, setScene] = useState('hero');
  const [visited, setVisited] = useState(new Set(['hero']));
  const [musicOn, setMusicOn] = useState(false);
  const particlesRef = useRef([]);
  const [, force] = useState(0);

  useEffect(() => {
    setVisited(prev => new Set([...prev, scene]));
  }, [scene]);

  // Ambient synth music using Web Audio API (lightweight, no assets)
  useEffect(() => {
    let ctx;
    let gain;
    let oscillators = [];
    if (musicOn) {
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        gain = ctx.createGain();
        gain.gain.value = 0.03; // low volume
        gain.connect(ctx.destination);
        const freqs = [196.0, 246.94, 329.63]; // G3, B3, E4
        oscillators = freqs.map((f, i) => {
          const o = ctx.createOscillator();
          o.type = i === 0 ? 'sine' : i === 1 ? 'triangle' : 'sawtooth';
          o.frequency.value = f;
          o.connect(gain);
          o.start();
          return o;
        });
      } catch {}
    }
    return () => {
      oscillators.forEach(o => o.stop());
      if (gain) gain.disconnect();
      if (ctx) ctx.close();
    };
  }, [musicOn]);

  const progress = useMemo(() => visited.size / scenes.length, [visited]);

  // Click particles
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Math.random().toString(36).slice(2);
    particlesRef.current.push({ id, x, y, created: Date.now() });
    force(Math.random());
    setTimeout(() => {
      particlesRef.current = particlesRef.current.filter(p => p.id !== id);
      force(Math.random());
    }, 600);
  };

  const onEasterEgg = () => {
    // Achievement popup
    setToast({ title: 'Achievement', body: 'You found the Drone! 📸', key: Math.random() });
  };

  const [toast, setToast] = useState(null);

  return (
    <div className="relative min-h-screen bg-[#0b1020] text-white overflow-hidden" onClick={handleClick}>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-white/5">
        <motion.div className="h-full bg-gradient-to-r from-fuchsia-400 to-cyan-400" initial={{ width: 0 }} animate={{ width: `${Math.max(progress * 100, 5)}%` }} />
      </div>

      {/* Scene container with animated transitions */}
      <div className="relative h-[100svh]">
        <AnimatePresence mode="wait">
          {scene === 'hero' && (
            <motion.div key="hero" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroScene onEnter={() => setScene('portfolio')} onEasterEgg={onEasterEgg} musicOn={musicOn} toggleMusic={() => setMusicOn(m => !m)} />
            </motion.div>
          )}
          {scene === 'portfolio' && (
            <motion.div key="portfolio" className="absolute inset-0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}>
              <PortfolioScene />
            </motion.div>
          )}
          {scene === 'about' && (
            <motion.div key="about" className="absolute inset-0" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}>
              <AboutScene />
            </motion.div>
          )}
          {scene === 'contact' && (
            <motion.div key="contact" className="absolute inset-0" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}>
              <ContactScene />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-2 py-2 backdrop-blur-md">
          {scenes.map((s) => (
            <button
              key={s}
              onClick={() => setScene(s)}
              className={`rounded-full px-3 py-1.5 text-sm capitalize transition ${scene === s ? 'bg-white/20' : 'hover:bg-white/10'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Achievement toast */}
      <AnimatePresence>
        {toast && (
          <motion.div key={toast.key} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
            <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-white backdrop-blur-md shadow">
              <div className="text-sm font-semibold">{toast.title}</div>
              <div className="text-xs text-white/80">{toast.body}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click particles */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {particlesRef.current.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, scale: 0.6, x: p.x, y: p.y }}
            animate={{ opacity: 0, scale: 1.5, x: p.x + (Math.random() * 40 - 20), y: p.y + (Math.random() * -40) }}
            transition={{ duration: 0.6 }}
            className="absolute block size-2 rounded-full bg-white/70 shadow-[0_0_12px_rgba(255,255,255,0.7)]"
          />)
        )}
      </div>
    </div>
  );
}
