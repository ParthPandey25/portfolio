import React from "react";
import Navbar from "@/components/Navbar";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Experience — Parth Pandey Portfolio",
  description:
    "Full work history and internship timeline for Parth Pandey — Network Security Engineer with experience at Magma Technology, Zscaler, Palo Alto Networks, Fortinet, and more.",
};

const stats = [
  { label: "Roles & Internships", value: "11+", icon: <Briefcase size={18} className="text-emerald-400" /> },
  { label: "Industry Partners",   value: "10",   icon: <GraduationCap size={18} className="text-cyan-400" /> },
  { label: "Years Active",        value: "2",    icon: <Calendar size={18} className="text-purple-400" /> },
];

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative">
      <InteractiveBackground />
      <Navbar />

      <div className="relative z-10 pt-28 pb-24 max-w-4xl mx-auto px-4">
        {/* Header */}
        <SectionHeader
          title="Work & Internship Timeline"
          subtitle="professional experience"
          accent="emerald"
        />

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {stats.map((s, i) => (
            <div
              key={i}
              className="glass-card rounded-xl p-4 border border-slate-800/60 text-center flex flex-col items-center gap-2"
            >
              {s.icon}
              <p className="text-2xl font-extrabold gradient-text">{s.value}</p>
              <p className="text-xs text-slate-500 font-mono">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-8 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <Briefcase size={12} className="text-emerald-400" /> Full-Time Role
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap size={12} className="text-cyan-400" /> Internship / Training
          </span>
          <span className="ml-auto text-slate-600 italic">Click card to expand</span>
        </div>

        {/* Timeline */}
        <ExperienceTimeline />

        {/* Education section */}
        <div className="mt-16 border-t border-slate-800/60 pt-12">
          <SectionHeader
            title="Education"
            subtitle="academic background"
            accent="cyan"
          />

          <div className="space-y-4">
            <div className="glass-card rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-bold text-slate-100 text-lg">
                    Anjuman College of Engineering and Technology
                  </h3>
                  <p className="text-slate-300 text-sm mt-0.5">
                    B.Tech in Computer Science &amp; Engineering
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">
                    Relevant Coursework: Cybersecurity, Network Security, Cloud Computing, Data Structures, AI, DBMS, Machine Learning
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold gradient-text">8.3</p>
                  <p className="text-xs text-slate-500">CGPA / 10</p>
                  <p className="text-xs text-slate-600 mt-1 font-mono">May 2026</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border border-slate-800/60 hover:border-slate-700 transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-bold text-slate-100">St. Xavier&apos;s High School</h3>
                  <p className="text-slate-400 text-sm mt-0.5">
                    Higher Secondary Certificate (HSC): 68% &nbsp;|&nbsp; Senior Secondary (SSC): 83%
                  </p>
                </div>
                <p className="text-xs text-slate-600 font-mono shrink-0">June 2020 – June 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono"
          >
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
