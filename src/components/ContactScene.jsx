import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactScene() {
  const [form, setForm] = useState({ name: '', email: '', message: '', type: 'Editing' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const playSuccessTone = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(660, ctx.currentTime);
      g.gain.setValueAtTime(0.001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.3);
    } catch {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xvgpgvne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          projectType: form.type,
        }),
      });
      if (res.ok) {
        setStatus('success');
        playSuccessTone();
        setForm({ name: '', email: '', message: '', type: 'Editing' });
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="relative w-full h-full px-4 md:px-8 py-8">
      <div className="max-w-xl mx-auto rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
        <h3 className="text-xl font-bold text-white mb-4">Contact</h3>
        <p className="text-white/80 mb-6 text-sm">Have a project in mind? Send a message and let’s create something cinematic.</p>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-1">Name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-cyan-400/40"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs text-white/70 mb-1">Email</label>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-cyan-400/40"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs text-white/70 mb-1">Project Type</label>
            <select
              name="type"
              value={form.type}
              onChange={onChange}
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-400/40"
            >
              <option className="bg-[#0b1020]" value="Editing">Editing</option>
              <option className="bg-[#0b1020]" value="Cinematics">Cinematics</option>
              <option className="bg-[#0b1020]" value="Shorts">Shorts</option>
              <option className="bg-[#0b1020]" value="Trailers">Trailers</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/70 mb-1">Message</label>
            <textarea
              required
              name="message"
              rows={4}
              value={form.message}
              onChange={onChange}
              className="w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-cyan-400/40"
              placeholder="Tell me about your project..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'sending'}
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500/80 to-cyan-500/80 px-5 py-2.5 text-white shadow-lg disabled:opacity-60"
          >
            <AnimatePresence initial={false} mode="popLayout">
              {status === 'sending' ? (
                <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <span className="size-3 animate-pulse rounded-full bg-white" />
                  Sending…
                </motion.span>
              ) : status === 'success' ? (
                <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4" />
                  Message Sent
                </motion.span>
              ) : (
                <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                  <Send className="size-4" />
                  Send Message
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </div>
    </div>
  );
}
