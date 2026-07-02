"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import TiltCard from "@/components/TiltCard";
import Link from "next/link";
import { FileText, Calendar, ExternalLink, Tag, Award, Mic } from "lucide-react";

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
          subtitle="academic contributions"
          accent="dual"
        />

        {/* Summary badges */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <FileText size={14} className="text-emerald-400" /> 2 Publications
          </span>
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <Mic size={14} className="text-cyan-400" /> 2 Conference Presentations
          </span>
          <span className="flex items-center gap-2 px-4 py-2 glass-card rounded-full border border-slate-800/60 text-sm">
            <Award size={14} className="text-purple-400" /> Peer-Reviewed Journal
          </span>
        </div>

        {/* Paper cards */}
        <div className="space-y-8">
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

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono">
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
