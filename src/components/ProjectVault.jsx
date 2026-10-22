"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Boxes,
  Film,
  Wallet,
  Recycle,
  Mail,
  Lock,
  CheckSquare,
  ExternalLink,
  Clock,
  CheckCircle2,
  Sparkles,
  Shield,
  Network,
  Radar,
  Search,
  BookOpen,
  FileText,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TiltCard from "./TiltCard";
import Link from "next/link";

const projects = [
  {
    title: "Home SOC Lab — Splunk SIEM & AWS CloudTrail Monitoring",
    description:
      "Enterprise cloud threat detection pipeline ingesting AWS CloudTrail management events and VPC Flow Logs into Splunk Enterprise. Features 12 custom SPL detection rules mapped across 8 MITRE ATT&CK techniques, validated against 20 simulated attacks, with 3 complete NIST CSF incident investigation reports (IR-001 to IR-003) and 40% false-positive reduction tuning.",
    icon: <Search className="text-red-400" size={26} />,
    color: "red",
    tags: ["Splunk SIEM", "AWS CloudTrail", "MITRE ATT&CK", "12 SPL Rules", "NIST CSF", "SOC Triage"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/splunk-soc-aws-cloudtrail-lab",
    articleUrl: "https://github.com/ParthPandey25/splunk-soc-aws-cloudtrail-lab/tree/main/incident_reports",
    articleLabel: "View NIST IR Reports →",
  },
  {
    title: "Confessions of a Top 2% TryHackMe Practitioner — Where Tools Break",
    description:
      "Technical deep-dive into hands-on offensive security realities: four detailed breakdowns where standard automated tools failed (the 850k-word dictionary freeze, the Netcat dumb shell trap, the vanishing Meterpreter session, and modern Windows root DACLs) and the exact architectural troubleshooting pivots used to unlock the root shell.",
    icon: <BookOpen className="text-cyan-400" size={26} />,
    color: "cyan",
    tags: ["Medium Story", "TryHackMe [GURU]", "Tool Troubleshooting", "Kernel Exploits", "PrivEsc"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/parthpandey-cyberlab",
    articleUrl: "https://github.com/ParthPandey25/parthpandey-cyberlab/blob/main/_posts/2026-10-22-confessions-of-a-tryhackme-practitioner-where-tools-break.md",
    articleLabel: "Read Technical Story →",
  },
  {
    title: "High-Performance Packet Analyzer (C++17 & libpcap)",
    description:
      "Native multi-threaded network traffic analyzer decoding raw Ethernet frames, IPv4/IPv6, TCP, UDP, and ICMP headers with sub-millisecond parsing latency. Benchmarked at 100,000+ packets per second replaying synthetic PCAP captures using lock-free std::atomic throughput counters.",
    icon: <Radar className="text-amber-400" size={26} />,
    color: "amber",
    tags: ["C++17", "libpcap", "Multi-Threading", "100k+ PPS", "Atomic Counters", "PCAP Benchmark"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/cpp-packet-analyzer",
  },
  {
    title: "Distributed Enterprise Firewall Topology & Policy Auditor",
    description:
      "High-availability corporate edge architecture with Cisco ASA and Check Point Gaia zero-trust zone segmentation (OUTSIDE, DMZ, CORP-INTERNAL). Empirically validated against 10 distinct cross-zone cyber attack scenarios with a custom Python compliance engine flagging over-permissive ACLs.",
    icon: <Shield className="text-orange-400" size={26} />,
    color: "orange",
    tags: ["Cisco ASA", "Check Point Gaia", "GNS3", "10 Attack Scenarios", "Python Auditor", "Zero Trust"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/enterprise-firewall-topology",
    articleUrl: "https://github.com/ParthPandey25/enterprise-firewall-topology/blob/main/tests/cross_zone_attack_matrix.md",
    articleLabel: "View Attack Matrix →",
  },
  {
    title: "Enterprise Secure Finance Platform & Web App Penetration Audit",
    description:
      "Full-stack financial management platform (Spring Boot Java Security + Express/Node.js API + React) hardened against OWASP Top 10 vulnerabilities. Features comprehensive DAST/SAST penetration testing documentation, JWT RBAC, BOLA/IDOR mitigation, rate limiting, and automated security audit test cases.",
    icon: <Wallet className="text-emerald-400" size={26} />,
    color: "emerald",
    tags: ["Web App Pentesting", "OWASP Top 10", "Spring Security", "Java", "React", "JWT Auth", "Secure Coding"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/Finance-Management-WebApp",
  },
  {
    title: "TryHackMe Walkthroughs & Port-by-Port CyberLab Blog",
    description:
      "Public security research blog and port-by-port vulnerability assessments across Metasploitable targets and 8+ published TryHackMe CTF walkthroughs (EternalBlue MS17-010, Mr. Robot, Ice, Windows PrivEsc). Features in-depth tool troubleshooting and defensive hardening insights.",
    icon: <Network className="text-rose-400" size={26} />,
    color: "rose",
    tags: ["TryHackMe", "8 Published Posts", "Nmap", "Metasploit", "PrivEsc", "Jekyll Blog"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/parthpandey-cyberlab",
    articleUrl: "https://parthpandey25.github.io/parthpandey-cyberlab",
    articleLabel: "Visit Live Blog →",
  },
  {
    title: "Yoga Guru AI — Real-Time Computer Vision & Health Guide",
    description:
      "Full-stack AI yoga instructor with real-time pose estimation and correction using YOLOv8, MediaPipe, Faster R-CNN, and LSTM sequence analysis. Integrates Gemini AI for biological profile meal planning.",
    icon: <Activity className="text-emerald-400" size={26} />,
    color: "emerald",
    tags: ["Computer Vision", "YOLOv8", "MediaPipe", "Gemini AI", "PyTorch", "Flask"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/Yoga-Guru-AI",
  },
  {
    title: "Employee Salary Prediction — Docker Microservices",
    description:
      "Enterprise microservices pipeline for income bracket classification. Features an Express.js API Gateway, an isolated FastAPI ML inference engine (Gradient Boosting), and a React/Vite frontend.",
    icon: <Boxes className="text-cyan-400" size={26} />,
    color: "cyan",
    tags: ["Docker Compose", "FastAPI", "Express.js", "Scikit-Learn", "React", "Microservices"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/employee-salary-prediction",
  },
  {
    title: "BookMyShow Clone — Full-Stack Cinema Platform",
    description:
      "End-to-end movie ticket booking platform with multi-city showtimes, interactive curved cinema seat selection, Razorpay payment gateway integration, and dynamic QR ticket generation.",
    icon: <Film className="text-purple-400" size={26} />,
    color: "purple",
    tags: ["React (Vite)", "Express.js", "MongoDB", "Razorpay", "REST APIs"],
    status: "completed",
    github: "https://github.com/ParthPandey25/BookMyShow-Clone",
  },
  {
    title: "Smart Garbage Classification — CNN & Gradio",
    description:
      "Deep transfer learning vision pipeline using EfficientNetV2B2 for municipal solid waste sorting across multi-class recyclable streams with interactive Gradio web interface.",
    icon: <Recycle className="text-emerald-400" size={26} />,
    color: "emerald",
    tags: ["TensorFlow", "Keras", "Transfer Learning", "Gradio", "EfficientNet"],
    status: "completed",
    github: "https://github.com/ParthPandey25/garbage-classification-cnn",
  },
  {
    title: "Alexa Voice Mass Email System — Serverless AWS",
    description:
      "Voice-activated mass email dispatcher integrating Amazon Alexa Skills Kit, AWS Lambda event handlers, and Amazon Simple Email Service (SES) with dynamic recipient merge templates.",
    icon: <Mail className="text-cyan-400" size={26} />,
    color: "cyan",
    tags: ["Alexa Skills", "AWS Lambda", "Amazon SES", "Python", "Boto3"],
    status: "completed",
    github: "https://github.com/ParthPandey25/alexa-voice-mass-email",
  },
  {
    title: "Image Steganography — Cryptographic Pixel Encoder",
    description:
      "Security utility embedding password-protected secret messages into lossless image RGB pixel channels using OpenCV and NumPy matrix manipulation without visual distortion.",
    icon: <Lock className="text-purple-400" size={26} />,
    color: "purple",
    tags: ["Python", "OpenCV", "NumPy", "Cryptography", "Security"],
    status: "completed",
    github: "https://github.com/ParthPandey25/Stegenography_image",
  },
  {
    title: "Tasky App — Modern Task Management System",
    description:
      "Interactive task planner with HTML5 Drag & Drop prioritization, category tagging, overdue tracking, live stat counters, and persistent dark/light mode via localStorage.",
    icon: <CheckSquare className="text-blue-400" size={26} />,
    color: "blue",
    tags: ["JavaScript (ES6+)", "HTML5 Drag & Drop", "CSS Grid", "LocalStorage"],
    status: "completed",
    github: "https://github.com/ParthPandey25/Tasky-App",
  },
];

const colorMap = {
  emerald: {
    border: "hover:border-emerald-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(16,185,129,0.25)]",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    gradient: "from-emerald-500/10 to-transparent",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  cyan: {
    border: "hover:border-cyan-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(6,182,212,0.25)]",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    gradient: "from-cyan-500/10 to-transparent",
    iconBg: "bg-cyan-500/10 border-cyan-500/20",
  },
  purple: {
    border: "hover:border-purple-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(168,85,247,0.25)]",
    tag: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    gradient: "from-purple-500/10 to-transparent",
    iconBg: "bg-purple-500/10 border-purple-500/20",
  },
  blue: {
    border: "hover:border-blue-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.25)]",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    gradient: "from-blue-500/10 to-transparent",
    iconBg: "bg-blue-500/10 border-blue-500/20",
  },
  red: {
    border: "hover:border-red-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(239,68,68,0.25)]",
    tag: "bg-red-500/10 text-red-400 border-red-500/20",
    gradient: "from-red-500/10 to-transparent",
    iconBg: "bg-red-500/10 border-red-500/20",
  },
  amber: {
    border: "hover:border-amber-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(245,158,11,0.25)]",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    gradient: "from-amber-500/10 to-transparent",
    iconBg: "bg-amber-500/10 border-amber-500/20",
  },
  orange: {
    border: "hover:border-orange-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(249,115,22,0.25)]",
    tag: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    gradient: "from-orange-500/10 to-transparent",
    iconBg: "bg-orange-500/10 border-orange-500/20",
  },
  rose: {
    border: "hover:border-rose-500/50",
    glow: "hover:shadow-[0_20px_60px_-10px_rgba(244,63,94,0.25)]",
    tag: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    gradient: "from-rose-500/10 to-transparent",
    iconBg: "bg-rose-500/10 border-rose-500/20",
  },
};

export default function ProjectVault() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ENGINEERED SYSTEMS &amp; LABS
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight">
            Security &amp; Software <span className="gradient-text">Project Vault</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-2 max-w-xl">
            Production-grade cybersecurity pipelines, SIEM correlation engines, low-level network protocol parsers, and full-stack software deployments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-800/40 border border-slate-700/40 px-3 py-1.5 rounded-lg w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{projects.length} Repositories Synchronized</span>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => {
          const c = colorMap[project.color] || colorMap.emerald;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
            >
              <TiltCard className="h-full">
                <div
                  className={`relative h-full flex flex-col justify-between rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-xl p-6 transition-all duration-300 ${c.border} ${c.glow}`}
                >
                  {/* Subtle gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-20 pointer-events-none`}
                  />

                  <div className="relative z-10 flex flex-col h-full gap-4">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3">
                      <div className={`p-3 rounded-xl border ${c.iconBg}`}>
                        {project.icon}
                      </div>
                      <div className="flex items-center gap-2">
                        {project.featured && (
                          <span className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full border text-amber-300 bg-amber-500/10 border-amber-500/20">
                            <Sparkles size={11} /> Featured
                          </span>
                        )}
                        <span
                          className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${
                            project.status === "in-progress"
                              ? "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                              : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                          }`}
                        >
                          {project.status === "in-progress" ? (
                            <Clock size={11} />
                          ) : (
                            <CheckCircle2 size={11} />
                          )}
                          {project.status === "in-progress" ? "In Progress" : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-2.5 py-1 rounded-full text-xs font-mono border ${c.tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/60 mt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 font-mono transition-colors"
                      >
                        <GithubIcon size={13} /> View Repository →
                      </a>

                      {project.articleUrl && (
                        <a
                          href={project.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                        >
                          <ExternalLink size={12} />
                          {project.articleLabel || "Read Walkthrough →"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>

      {/* CTA to full projects page */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href="https://github.com/ParthPandey25?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all font-medium text-sm"
        >
          <ExternalLink size={15} />
          Explore All Repositories on GitHub
        </a>
      </motion.div>
    </div>
  );
}
