"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck } from 'lucide-react';

export default function BootSequenceWrapper() {
  const [booting, setBooting] = useState(true);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING KERNEL...",
    "LOADING SECURE ENCLAVE...",
    "ESTABLISHING ZERO-TRUST CONNECTION...",
    "DECRYPTING PORTFOLIO ASSETS...",
    "BYPASSING MAINFRAME FIREWALLS...",
    "ACCESS GRANTED."
  ];

  useEffect(() => {
    // Only run the boot sequence once per session (if desired), but for now we'll run it on load.
    // Uncomment these to remember state per session:
    // if (sessionStorage.getItem('booted')) { setBooting(false); return; }

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < bootLogs.length) {
        // Use a functional state update to ensure latest state
        setLogs(prev => {
          // Prevent duplicates if interval fires weirdly
          if (prev.length > currentLogIndex) return prev;
          return [...prev, bootLogs[currentLogIndex]];
        });
        setProgress(((currentLogIndex + 1) / bootLogs.length) * 100);
        currentLogIndex++;
      } else {
        clearInterval(logInterval);
        setTimeout(() => {
          setBooting(false);
          // sessionStorage.setItem('booted', 'true');
        }, 800);
      }
    }, 400);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <AnimatePresence>
      {booting && (
        <motion.div
          key="boot-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#020617] font-mono text-emerald-500 overflow-hidden"
        >
          <div className="w-full max-w-2xl px-6 relative z-10">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <ShieldCheck size={48} className="text-emerald-400" />
              <h1 className="text-3xl font-bold tracking-widest text-slate-100">SYSTEM.BOOT</h1>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 h-64 overflow-y-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm border-b border-slate-800 pb-2">
                <Terminal size={14} /> root@system: ~
              </div>
              <div className="flex flex-col gap-3 text-sm md:text-base">
                {logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={i === bootLogs.length - 1 ? "text-cyan-400 font-bold" : "text-emerald-500"}
                  >
                    {log}
                  </motion.div>
                ))}
                {logs.length < bootLogs.length && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-emerald-500 inline-block mt-2"
                  />
                )}
              </div>
            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="text-right mt-2 text-xs text-slate-500">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Subtle background element for the boot screen */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#020617] to-[#020617] pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
