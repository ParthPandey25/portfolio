"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import TiltCard from "@/components/TiltCard";
import Link from "next/link";
import { FileText, Calendar, ExternalLink, Tag, Award, Mic, ShieldAlert, Terminal, Layers, ArrowUpRight } from "lucide-react";

const papers = [
  {
    title: "AI-Based Yoga Pose Detection And Wellness System: A Systematic Review",
    venues: [
      { name: "IRJAEH — International Research Journal on Advanced Engineering Hub", detail: "Vol 04, Issue 04", type: "journal" },
      { name: "ICESM-2026 — Second International Conference on Engineering, Science and Management", detail: "Oral Presentation", type: "conference" },
    ],
    date: "April 2026",
    tags: ["Computer Vision", "MediaPipe", "AI", "Pose Estimation", "Healthcare"],
    abstract:
      "A peer-reviewed systematic review examining AI-driven approaches to real-time human pose estimation and heuristic scoring for yoga wellness applications. Surveyed state-of-the-art architectures including MediaPipe and YOLOv8, analysing landmark detection accuracy and latency trade-offs for real-world deployment.",
    role: "Co-Author & Oral Presenter",
    color: "emerald",
    link: "https://irjaeh.com/index.php/journal/article/view/1471",
  },
  {
    title: "Mass Email Automation With AWS SES And Lambda (Alexa Integration)",
    venues: [
      { name: "ICTTSEM-25 — International Conference on Tech-Trends in Science, Engineering & Management", detail: "Suryodaya College of Engineering & Technology", type: "conference" },
      { name: "IJACTE — International Journal of Advanced Computing & Technology Engineering", detail: "MRI India Journals", type: "journal" },
    ],
    date: "April 2025",
    tags: ["AWS SES", "AWS Lambda", "Alexa", "Cloud Automation", "Serverless"],
    abstract:
      "Research paper presenting a serverless mass email automation architecture using AWS Simple Email Service (SES) and Lambda, integrated with Amazon Alexa for voice-triggered campaign management. Evaluated throughput, delivery reliability, and cost efficiency against traditional SMTP-based solutions.",
    role: "Author & Presenter",
    color: "cyan",
    link: "https://journals.mriindia.com/index.php/ijacte/article/view/384",
    presentationProof: "/certificates/Parth%20Pandey%20Mass%20email%20certificate%20publication.png",
  },
];

const technicalArticles = [
  {
    title: "SOC Operations: Splunk Enterprise Threat Hunting & Production SPL",
    category: "SOC-Operations",
    badgeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
    date: "October 2026",
    summary: "Production SPL queries for brute force (4625), encoded PowerShell (4104), LSASS memory dumping (Sysmon 10), and DNS C2 tunneling.",
    link: "https://parthpandey25.github.io/parthpandey-cyberlab/posts/soc-splunk-siem-live-incident-investigation/",
  },
  {
    title: "Confessions of a Top 2% TryHackMe Practitioner: Where Tools Break",
    category: "Cybersecurity",
    badgeColor: "text-rose-400 border-rose-500/20 bg-rose-500/10",
    date: "October 2026",
    summary: "Deep dive into real-world tool failures: 850k dictionary freeze, dumb TTY trap, vanishing Meterpreter sessions, and Windows root DACLs.",
    link: "https://parthpandey25.github.io/parthpandey-cyberlab/posts/confessions-of-a-tryhackme-practitioner-where-tools-break/",
  },
  {
    title: "Applied Cryptography: AES-GCM, RSA Math, Diffie-Hellman & TLS 1.3",
    category: "Applied-Cryptography",
    badgeColor: "text-purple-400 border-purple-500/20 bg-purple-500/10",
    date: "September 2026",
    summary: "Mathematical foundations of asymmetric ciphers (Euler's Totient), AEAD authentication tags, forward secrecy, and 1-RTT TLS 1.3 handshakes.",
    link: "https://parthpandey25.github.io/parthpandey-cyberlab/posts/applied-cryptography-symmetric-asymmetric-ciphers/",
  },
  {
    title: "TryHackMe: Alfred — Jenkins Groovy RCE & Token Impersonation",
    category: "TryHackMe Case Study",
    badgeColor: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    date: "October 2026",
    summary: "Jenkins administrative compromise, Nishang PowerShell reverse shell, and SeImpersonatePrivilege token theft via Incognito to SYSTEM.",
    link: "https://parthpandey25.github.io/parthpandey-cyberlab/posts/tryhackme-alfred-jenkins-token-impersonation/",
  },
];

const colorMap = {
  emerald: {
    border: "border-emerald-500/20 hover:border-emerald-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(16,185,129,0.2)]",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-500",
  },
  cyan: {
    border: "border-cyan-500/20 hover:border-cyan-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(6,182,212,0.2)]",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    dot: "bg-cyan-500",
  },
};

export default function PublicationsPage() {
  const [expanded, setExpanded] = useState(null);
  const [proofOpen, setProofOpen] = useState(null);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative">
      <InteractiveBackground />
      <Navbar />

      <div className="relative z-10 pt-28 pb-24 max-w-4xl mx-auto px-4">
        <SectionHeader
          title="Publications & Research"
          subtitle="academic contributions & technical security research"
          accent="dual"
        />

        {/* Summary badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <FileText size={14} className="text-emerald-400" /> 2 Peer-Reviewed Papers
          </span>
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <ShieldAlert size={14} className="text-cyan-400" /> 23 CyberLab Security Articles
          </span>
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <Award size={14} className="text-purple-400" /> TryHackMe Top 2% [GURU]
          </span>
        </div>

        {/* Academic Papers Header */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Award className="text-emerald-400" size={18} /> Peer-Reviewed Academic Papers
          </h2>
        </div>

        {/* Paper cards */}
        <div className="space-y-8 mb-16">
          {papers.map((paper, i) => {
            const c = colorMap[paper.color];
            const isOpen = expanded === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <TiltCard>
                  <div className={`glass-card rounded-2xl border p-7 transition-all duration-300 ${c.border} ${c.glow}`}>
                    {/* Top row */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0">
                        <FileText size={20} className={paper.color === "emerald" ? "text-emerald-400" : "text-cyan-400"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-100 text-lg leading-snug mb-1">
                          {paper.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} /> {paper.date}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full border font-mono ${c.badge}`}>
                            {paper.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Venues */}
                    <div className="space-y-2 mb-4 pl-1">
                      {paper.venues.map((v, vi) => (
                        <div key={vi} className="flex items-start gap-2 text-sm">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                          <div>
                            <span className="text-slate-300 font-medium">{v.name}</span>
                            {" · "}
                            <span className="text-slate-500 text-xs">{v.detail}</span>
                            {" · "}
                            <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${c.tag} border`}>
                              {v.type === "journal" ? "Journal" : "Conference"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Abstract toggle */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : i)}
                      className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors mb-3"
                    >
                      {isOpen ? "▾ hide abstract" : "▸ view abstract"}
                    </button>

                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-slate-950/50 rounded-xl border border-slate-800/60"
                      >
                        <p className="text-sm text-slate-400 leading-relaxed">{paper.abstract}</p>
                      </motion.div>
                    )}

                    {/* Tags + Read Paper */}
                    <div className="flex flex-wrap items-center gap-1.5 justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {paper.tags.map((tag, ti) => (
                          <span key={ti} className={`px-2.5 py-1 rounded-full text-xs font-mono border ${c.tag}`}>
                            <Tag size={9} className="inline mr-1" />{tag}
                          </span>
                        ))}
                      </div>
                      {paper.link && (
                        <a
                          href={paper.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-all ${c.badge} hover:opacity-80`}
                        >
                          <ExternalLink size={11} />
                          Read Paper
                        </a>
                      )}
                    </div>

                    {/* Presentation proof image */}
                    {paper.presentationProof && (
                      <div className="mt-4 pt-4 border-t border-slate-800/60">
                        <button
                          onClick={() => setProofOpen(proofOpen === i ? null : i)}
                          className={`text-xs font-mono transition-colors ${proofOpen === i ? c.badge.split(" ")[0] : "text-slate-500 hover:text-slate-300"}`}
                        >
                          {proofOpen === i ? "▾ hide presentation certificate" : "▸ view presentation certificate"}
                        </button>
                        {proofOpen === i && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 rounded-xl overflow-hidden border border-slate-700/60"
                          >
                            <img
                              src={paper.presentationProof}
                              alt="ICTTSEM 2025 — Conference Presentation Certificate"
                              className="w-full object-contain max-h-[500px] bg-slate-950"
                            />
                            <p className="text-xs text-slate-500 font-mono text-center py-2 bg-slate-900/80">
                              ICTTSEM-25 · Suryodaya College of Engineering & Technology · April 2025
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* CyberLab Technical Publications Section */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldAlert className="text-cyan-400" size={18} /> CyberLab Security Research & Walkthroughs (23 Articles)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Hands-on vulnerability case studies, SIEM threat hunts, and offensive security research hosted on CyberLab.
            </p>
          </div>
          <a
            href="https://parthpandey25.github.io/parthpandey-cyberlab/categories/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline"
          >
            All Categories <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {technicalArticles.map((art, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="glass-card rounded-xl border border-slate-800/80 p-5 hover:border-cyan-500/40 transition-all flex flex-col justify-between h-full bg-slate-950/40">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${art.badgeColor}`}>
                      {art.category}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar size={10} /> {art.date}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 mb-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {art.summary}
                  </p>
                </div>
                <div>
                  <a
                    href={art.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:underline font-semibold"
                  >
                    Read on CyberLab <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-5 rounded-2xl border border-slate-800 bg-gradient-to-r from-emerald-950/20 via-slate-900/40 to-cyan-950/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Explore Full CyberLab Archive</h4>
            <p className="text-xs text-slate-400">Browse all 23 articles categorized across TryHackMe, Coursera, Labs, and SOC operations.</p>
          </div>
          <a
            href="https://parthpandey25.github.io/parthpandey-cyberlab/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 transition-all flex items-center gap-1.5"
          >
            Open CyberLab Blog <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono">
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
