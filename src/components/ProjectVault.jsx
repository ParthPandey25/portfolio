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
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TiltCard from "./TiltCard";
import Link from "next/link";

const projects = [
  {
    title: "Home SOC Lab — Splunk SIEM & AWS CloudTrail Monitoring",
    description:
      "Real-time threat detection pipeline ingesting AWS CloudTrail and VPC Flow Logs into Splunk Enterprise. Custom SPL detection rules mapped to MITRE ATT&CK (T1110 Brute Force, T1078 Root without MFA, T1098 Privilege Escalation, T1530 S3 Exposure).",
    icon: <Search className="text-red-400" size={26} />,
    color: "red",
    tags: ["Splunk SIEM", "AWS CloudTrail", "MITRE ATT&CK", "SPL", "SOC Operations"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/splunk-soc-aws-cloudtrail-lab",
  },
  {
    title: "Enterprise Secure Finance Platform & Web App Penetration Audit",
    description:
      "Full-stack financial management platform (Spring Boot Java Security + Express/Node.js API + React) hardened against OWASP Top 10 vulnerabilities. Features comprehensive DAST/SAST penetration testing documentation, JWT RBAC, BOLA/IDOR mitigation, rate limiting, input sanitization, and automated security audit test cases.",
    icon: <Wallet className="text-emerald-400" size={26} />,
    color: "emerald",
    tags: ["Web App Pentesting", "OWASP Top 10", "Spring Security", "Java", "React", "JWT Auth", "Express.js", "Secure Coding"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/Finance-Management-WebApp",
  },
  {
    title: "High-Performance Packet Analyzer (C++17 & libpcap)",
    description:
      "Native multi-threaded network traffic analyzer decoding raw Ethernet frames, IPv4/IPv6, TCP, UDP, and ICMP headers with sub-millisecond parsing latency. Lock-free atomic throughput telemetry engine calculating real-time PPS and bandwidth (Mbps).",
    icon: <Radar className="text-amber-400" size={26} />,
    color: "amber",
    tags: ["C++17", "libpcap", "Multi-Threading", "TCP/IP", "Network Security"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/cpp-packet-analyzer",
  },
  {
    title: "Distributed Enterprise Firewall Topology & Policy Auditor",
    description:
      "High-availability corporate edge architecture with Cisco ASA and Check Point Gaia zero-trust zone segmentation (OUTSIDE, DMZ, CORP-INTERNAL). Custom Python compliance engine automatically flagging over-permissive ACLs.",
    icon: <Shield className="text-orange-400" size={26} />,
    color: "orange",
    tags: ["Cisco ASA", "Check Point Gaia", "GNS3", "Python", "Zero Trust", "Firewall"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/enterprise-firewall-topology",
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
    title: "Metasploitable Vulnerability Assessment & Port-by-Port Audit",
    description:
      "Comprehensive network vulnerability assessment across Metasploitable virtual targets. Utilized Nmap service discovery, NSE vulnerability scripts, and CVE mapping to audit FTP (21), SSH (22), Telnet (23), SMTP (25), HTTP (80), and SMB/Samba (139/445), authoring actionable defense hardening playbooks.",
    icon: <Network className="text-rose-400" size={26} />,
    color: "rose",
    tags: ["Nmap", "Metasploitable", "Port Auditing", "CVE Mapping", "Kali Linux", "Remediation"],
    status: "completed",
    featured: true,
    github: "https://github.com/ParthPandey25/parthpandey-cyberlab",
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
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project, index) => {
          const c = colorMap[project.color];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="h-full"
            >
              <TiltCard className="h-full">
                <div
                  className={`relative flex flex-col h-full bg-slate-900/80 border border-slate-800/60 rounded-2xl p-7 overflow-hidden transition-all duration-300 group ${c.border} ${c.glow}`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl`}
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
                    <div className="flex gap-3 pt-2 border-t border-slate-800/60">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-emerald-400 font-mono transition-colors"
                      >
                        <GithubIcon size={14} /> View Code on GitHub →
                      </a>
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
