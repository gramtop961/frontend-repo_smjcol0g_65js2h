import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';

const samples = [
  {
    id: 's1',
    title: 'Energetic Cuts',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 's2',
    title: 'Cinematic Trailer',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 's3',
    title: 'Short-form Magic',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
];

export default function PortfolioScene() {
  const [active, setActive] = useState(null);

  return (
    <div className="relative w-full h-full px-4 md:px-8 py-6">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {samples.map((s, i) => (
          <motion.div
            key={s.id}
            whileHover={{ y: -6 }}
            className="group relative rounded-2xl overflow-hidden border border-white/15 bg-white/5 backdrop-blur-md"
          >
            <video
              className="w-full h-48 md:h-56 object-cover opacity-80 group-hover:opacity-100 transition"
              src={s.src}
              muted
              loop
              playsInline
              autoPlay
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
              <h3 className="text-white/90 font-medium">{s.title}</h3>
              <button
                onClick={() => setActive(s)}
                className="pointer-events-auto rounded-full p-2 bg-white/10 border border-white/20 text-white hover:bg-white/20"
                aria-label="Expand"
              >
                <Maximize2 className="size-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-white/20 bg-black"
            >
              <video src={active.src} controls className="w-full h-full object-contain" autoPlay />
              <button
                onClick={() => setActive(null)}
                className="absolute top-3 right-3 rounded-full p-2 bg-white/10 border border-white/20 text-white hover:bg-white/20"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
