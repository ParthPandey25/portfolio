"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid-bg rounded-2xl border border-slate-800/40 p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
        {/* Profile image */}
        <div className="relative shrink-0">
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-800 flex items-center justify-center">
            {imgError ? (
              <span className="text-4xl font-bold gradient-text select-none">PP</span>
            ) : (
              <Image
                src="/profile.jpg"
                alt="Parth Pandey"
                width={176}
                height={176}
                className="object-cover object-top w-full h-full"
                onError={() => setImgError(true)}
                priority
              />
            )}
          </div>
          <span className="absolute -bottom-2 -right-2 flex items-center gap-1 text-xs bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to work
          </span>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-3">
            Hi, I&apos;m <span className="gradient-text">Parth Pandey</span> 👋
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            Driven <strong className="text-slate-200">Cybersecurity Engineer</strong> (B.Tech CSE, CGPA 8.3, GATE 355) 
            with 10+ virtual internships across <strong className="text-slate-200">Zscaler, Palo Alto Networks, Fortinet, 
            Google Cloud &amp; AWS</strong>. Certified in <strong className="text-slate-200">Google Cybersecurity Professional, Google IT Support, and OWASP Top 10 Application Defense</strong>, with hands-on training in <strong className="text-slate-200">Cisco CCNA / CompTIA Network+ and EC-Council CEH v13 (Unisoft)</strong>. Hands-on with enterprise firewalls (Check Point Gaia, FortiGate), 
            ZTNA frameworks, and TCP/IP packet analysis. Actively building <strong className="text-emerald-400">Red Team &amp; Blue Team</strong> competencies 
            via PortSwigger Web Security Academy, OverTheWire wargames, TryHackMe (Top 2% | Level 12 [GURU]), Hack The Box, and Splunk SIEM.
          </p>

          {/* TryHackMe Stats */}
          <div className="flex flex-wrap items-center gap-3 mb-5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
            <a href="https://tryhackme.com/p/parthrspandey25" target="_blank" rel="noopener noreferrer" 
              className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              TryHackMe [GURU]
            </a>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">Top 2% (#42,194)</span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs font-mono text-slate-300">115+ Rooms</span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs font-mono text-orange-400">🔥 122-day streak</span>
            <span className="text-xs text-slate-500">|</span>
            <span className="text-xs font-mono text-purple-400">23 Badges (Diamond)</span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/experience"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 hover:from-emerald-500/30 hover:to-cyan-500/30 transition-all text-sm font-semibold"
            >
              View Experience <ArrowRight size={14} />
            </Link>
            <a
              href="https://parthpandey25.github.io/parthpandey-cyberlab/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-300 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all text-sm font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)]"
            >
              Explore CyberLab Blog ↗
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100 transition-all text-sm font-medium"
            >
              <ExternalLink size={14} /> Download Resume
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
