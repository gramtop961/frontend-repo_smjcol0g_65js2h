import React from 'react';
import { motion } from 'framer-motion';
import { Film, Scissors, Sparkles, Clapperboard } from 'lucide-react';

const bubbles = [
  {
    icon: Sparkles,
    text: "Fast, creative, and cinematic — edits that punch with personality.",
  },
  {
    icon: Scissors,
    text: "Precision cuts, seamless transitions, and pacing that hooks viewers.",
  },
  {
    icon: Film,
    text: "Color, sound, and rhythm blended for maximum impact.",
  },
];

const services = [
  { icon: Scissors, label: 'Editing' },
  { icon: Film, label: 'Cinematics' },
  { icon: Clapperboard, label: 'Shorts' },
  { icon: Sparkles, label: 'Trailers' },
];

export default function AboutScene() {
  return (
    <div className="relative w-full h-full px-4 md:px-8 py-8">
      <div className="max-w-5xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl md:text-3xl font-bold text-white mb-6">
          About Litecor
        </motion.h2>
        <div className="grid gap-4 md:grid-cols-3">
          {bubbles.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-3 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md"
            >
              <b.icon className="mt-1 size-5 text-cyan-300" />
              <p className="text-white/90 text-sm md:text-base">{b.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/15 bg-white/5 p-4 text-white backdrop-blur-md"
            >
              <s.icon className="size-6 text-fuchsia-300" />
              <span className="text-sm">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
