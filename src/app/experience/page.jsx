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
    "Full work history, training, and internship timeline for Parth Pandey — Cybersecurity Engineer with virtual internships at Zscaler, Palo Alto Networks, Fortinet, Google Cloud, and more.",
};

const stats = [
  { label: "Roles & Training",    value: "15+", icon: <Briefcase size={18} className="text-emerald-400" /> },
  { label: "Industry Partners",   value: "11",   icon: <GraduationCap size={18} className="text-cyan-400" /> },
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
            <Briefcase size={12} className="text-emerald-400" /> Full-Time / Training
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
                    B.Tech in Computer Science &amp; Engineering — <span className="text-emerald-400 font-semibold">Graduated (Class of 2026)</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">
                    Relevant Coursework: Cybersecurity, Network Security &amp; Cryptography, Cloud Computing, Data Structures &amp; Algorithms, Operating Systems, DBMS, Machine Learning
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold gradient-text">8.3</p>
                  <p className="text-xs text-slate-500">CGPA / 10</p>
                  <p className="text-xs text-emerald-400 mt-1 font-mono">Graduated May 2026</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">
                    GATE 2026 CS/IT (Graduate Aptitude Test in Engineering)
                  </h3>
                  <p className="text-slate-300 text-sm mt-0.5">
                    National Examination by Indian Institute of Technology (IIT) &amp; National GATE Committee
                  </p>
                  <p className="text-xs text-purple-400 mt-1 font-mono">
                    Registration No: CS26S42062430 &nbsp;|&nbsp; Theoretical CS, Algorithms, OS &amp; Computer Networks
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-2xl font-extrabold text-purple-400">355</p>
                  <p className="text-xs text-slate-500">GATE Score</p>
                  <p className="text-xs text-emerald-400 mt-1 font-mono">Qualified</p>
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
                <p className="text-xs text-slate-600 font-mono shrink-0">June 2016 – June 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hackathons & Extra Work section */}
        <div className="mt-16 border-t border-slate-800/60 pt-12">
          <SectionHeader
            title="Hackathons, Competitions & Extra Work"
            subtitle="extracurricular & competitive milestones"
            accent="purple"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Winner — 1st Place</span>
                <span className="text-xs font-mono text-slate-500">2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">Ennovate &apos;25 Project Hackathon</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Won Project Excellence Award for Serverless Mass Emailing System with AWS SES, Lambda &amp; Alexa (50k+ emails/batch, zero-cost cloud architecture).
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold">24-Hour Sprint</span>
                <span className="text-xs font-mono text-slate-500">Feb 2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">Hack-Wack: 24-Hr Hackathon (SBJITMR)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Architected and deployed full-stack real-time solution integrating live APIs, relational database schema, cloud endpoints, and defensive input sanitization.
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-yellow-500/20 hover:border-yellow-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 font-bold">Innovation Sprint</span>
                <span className="text-xs font-mono text-slate-500">2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">AI-Powered Tutor Hackathon</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Built an adaptive exam tutor with hybrid LLM inference (Meta Llama 2/3 + AWS Bedrock fallback), Alexa/Polly voice UI, Next.js, and dual DB (PostgreSQL + MongoDB).
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 font-bold">Venture Pitch</span>
                <span className="text-xs font-mono text-slate-500">Feb 2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">SITANK — Symbiosis Innovation Tank</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Pitched scalable tech architecture and financial feasibility model directly before venture capitalists and industry technical juries at Symbiosis.
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 font-bold">Core Member</span>
                <span className="text-xs font-mono text-slate-500">June 2024 – May 2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">Krans Community (ACET — 3rd Year)</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Served 1-year tenure during 3rd year engineering; organized student peer workshops on Linux CLI essentials, Git/GitHub, and cybersecurity virtualization labs.
              </p>
            </div>

            <div className="glass-card rounded-xl p-5 border border-slate-700/60 hover:border-slate-600 transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">Civic &amp; Athletics</span>
                <span className="text-xs font-mono text-slate-500">2017 – 2025</span>
              </div>
              <h4 className="font-bold text-slate-100 text-base">Mera Yuva Bharat &amp; Collegiate Athletics</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Registered Youth Leader (Ministry of Youth Affairs, Govt of India), Collegiate Competitive Fencer (ACET 2023), and Judo Federation athlete (Nagpur 2017-2018).
              </p>
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
