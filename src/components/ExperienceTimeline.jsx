"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";

export const experiences = [
  {
    company: "Magma Technology",
    role: "Network and Security AI Engineer L2 Plus",
    period: "February 2026 – May 2026",
    location: "India",
    type: "job",
    color: "emerald",
    bullets: [
      "Architected and maintained secure enterprise network infrastructures; executed configurations and complex troubleshooting of 15+ production routers, switches, and core gateways, contributing to a 15% reduction in average network downtime.",
      "Enforced corporate access controls and security baseline measures; continuously monitored perimeter firewalls and multi-tier VPN topologies, analyzing 500+ daily systemic network monitoring logs to isolate threats.",
      "Served as a core escalation resource for investigating security incidents, resolving 30+ high-priority network anomalies and coordinating across cross-functional teams to maintain 99.9% high availability.",
    ],
  },
  {
    company: "Zscaler / EduSkills AICTE",
    role: "Zero Trust Cloud Security Virtual Intern",
    period: "April 2026 – June 2026",
    location: "Remote",
    type: "internship",
    color: "cyan",
    bullets: [
      "Graduated from an 8-week intensive training program with a 100% completion rate, achieving an 'O' (Outstanding) grade in Zero Trust Network Access (ZTNA) frameworks and Secure Access Service Edge (SASE) principles.",
    ],
  },
  {
    company: "Palo Alto Networks / EduSkills AICTE",
    role: "Cybersecurity Virtual Intern",
    period: "January 2026 – March 2026",
    location: "Remote",
    type: "internship",
    color: "red",
    bullets: [
      "Navigated intensive specialization tracking labs covering 20+ Palo Alto hardware rules, Next-Generation Firewalls (NGFW), Strata access policy engines, and Cortex endpoint threat telemetry.",
    ],
  },
  {
    company: "Google Cloud / EduSkills AICTE",
    role: "Network Security Virtual Intern",
    period: "July 2025 – September 2025",
    location: "Remote",
    type: "internship",
    color: "yellow",
    bullets: [
      "Analyzed secure infrastructure baselines within Google Cloud Platform environments; modeled isolated cloud network architectures, security perimeter controls, and enterprise-level IAM user group profiles.",
    ],
  },
  {
    company: "Fortinet / EduSkills AICTE",
    role: "Network Security Virtual Intern",
    period: "April 2025 – June 2025",
    location: "Remote",
    type: "internship",
    color: "orange",
    bullets: [
      "Mastered validated technical knowledge in unified protection deployments; evaluated 5+ Fortinet Security Fabric blueprints and simulated robust threat mitigation policies.",
    ],
  },
  {
    company: "Shell India Markets / Edunet AICTE",
    role: "AI & Data Analytics Virtual Intern (Green Skills Track)",
    period: "June 2025 – July 2025",
    location: "Remote",
    type: "internship",
    color: "green",
    bullets: [
      "Engineered a deep learning Garbage Classification AI platform; deployed convolutional neural network (CNN) models to parse raw waste asset variables and establish automatic sorting boundaries for sustainability.",
    ],
  },
  {
    company: "IBM SkillsBuild / Edunet AICTE",
    role: "Artificial Intelligence & Machine Learning Intern (6 Weeks)",
    period: "June 2025 – July 2025",
    location: "Remote",
    type: "internship",
    color: "blue",
    bullets: [
      "Constructed a predictive Employee Salary Prediction Model; scrubbed multi-variable historical corporate compensation datasets and programmed training regressions to evaluate wage trajectories.",
    ],
  },
  {
    company: "EY Global Delivery Services / Edunet AICTE",
    role: "Full Stack Web Development Intern",
    period: "February 2025 – March 2025",
    location: "Remote",
    type: "internship",
    color: "purple",
    bullets: [
      "Engineered a secure Personal Finance Tracker Web App utilizing a MERN stack (MongoDB, Express, React, Node.js) structure; deployed cryptographic access state parameters and created custom transactional REST API schemas.",
    ],
  },
  {
    company: "Siemens AG (Formerly Altair) / EduSkills AICTE",
    role: "Data Science Master Specialization Intern",
    period: "January 2025 – March 2025",
    location: "Remote",
    type: "internship",
    color: "cyan",
    bullets: [
      "Executed advanced multi-variable data clustering operations; processed core algorithmic files to run complex analytical processing tasks, model optimization trees, and data parsing loops within strict mathematical margins.",
    ],
  },
  {
    company: "IBM SkillsBuild / Edunet AICTE",
    role: "Cyber Security Virtual Intern (6 Weeks)",
    period: "January 2025 – February 2025",
    location: "Remote",
    type: "internship",
    color: "blue",
    bullets: [
      "Engineered a secure cryptographic steganography module utilizing OpenStego to conceal encrypted text payloads within carrier images via LSB pixel-level manipulation, successfully evading structural hash detection.",
    ],
  },
  {
    company: "BrainOvision Solutions Pvt. Ltd.",
    role: "AWS DevOps Intern",
    period: "February 2024 – March 2024",
    location: "Remote",
    type: "internship",
    color: "orange",
    bullets: [
      "Architected a High-Volume Cross-Account AWS Data Architecture; engineered a resilient 3-tier AWS operational sandbox deploying privilege-isolated IAM trust policies to safely execute bulk asset replication loops across separate domains.",
    ],
  },
];

const colorMap = {
  emerald: { dot: "bg-emerald-500", glow: "shadow-[0_0_12px_rgba(16,185,129,0.6)]", border: "border-emerald-500/30 hover:border-emerald-500/60", tag: "bg-emerald-500/10 text-emerald-400" },
  cyan:    { dot: "bg-cyan-500",    glow: "shadow-[0_0_12px_rgba(6,182,212,0.6)]",   border: "border-cyan-500/30    hover:border-cyan-500/60",    tag: "bg-cyan-500/10    text-cyan-400"    },
  blue:    { dot: "bg-blue-500",    glow: "shadow-[0_0_12px_rgba(59,130,246,0.6)]",  border: "border-blue-500/30    hover:border-blue-500/60",    tag: "bg-blue-500/10    text-blue-400"    },
  red:     { dot: "bg-red-500",     glow: "shadow-[0_0_12px_rgba(239,68,68,0.6)]",   border: "border-red-500/30     hover:border-red-500/60",     tag: "bg-red-500/10     text-red-400"     },
  yellow:  { dot: "bg-yellow-400",  glow: "shadow-[0_0_12px_rgba(250,204,21,0.6)]",  border: "border-yellow-500/30  hover:border-yellow-500/60",  tag: "bg-yellow-500/10  text-yellow-400"  },
  orange:  { dot: "bg-orange-500",  glow: "shadow-[0_0_12px_rgba(249,115,22,0.6)]",  border: "border-orange-500/30  hover:border-orange-500/60",  tag: "bg-orange-500/10  text-orange-400"  },
  purple:  { dot: "bg-purple-500",  glow: "shadow-[0_0_12px_rgba(168,85,247,0.6)]",  border: "border-purple-500/30  hover:border-purple-500/60",  tag: "bg-purple-500/10  text-purple-400"  },
  green:   { dot: "bg-green-500",   glow: "shadow-[0_0_12px_rgba(34,197,94,0.6)]",   border: "border-green-500/30   hover:border-green-500/60",   tag: "bg-green-500/10   text-green-400"   },
};

function TimelineEntry({ exp, index, isLast }) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[exp.color] ?? colorMap.emerald;
  const isJob = exp.type === "job";

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="relative pl-10 md:pl-14"
    >
      {/* Vertical line */}
      {!isLast && (
        <div className="absolute left-3 md:left-5 top-8 bottom-0 w-px timeline-line opacity-40" />
      )}

      {/* Dot */}
      <div
        className={`absolute left-1.5 md:left-3.5 top-4 w-4 h-4 rounded-full border-2 border-slate-950 ${c.dot} ${c.glow} shrink-0`}
      />

      {/* Card */}
      <div
        className={`bg-slate-900/70 border rounded-xl mb-6 overflow-hidden transition-all duration-300 glass-card ${c.border} ${isJob ? "ring-1 ring-emerald-500/20" : ""}`}
      >
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full text-left p-5 flex items-start gap-4"
        >
          {/* Icon */}
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 shrink-0 mt-0.5">
            {isJob ? (
              <Briefcase size={16} className="text-emerald-400" />
            ) : (
              <GraduationCap size={16} className="text-cyan-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Role + expand toggle */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <h3 className="font-bold text-slate-100 text-base leading-snug">{exp.company}</h3>
                  {isJob && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${c.tag}`}>Full-Time</span>
                  )}
                </div>
                <p className="text-sm text-slate-300 font-medium">{exp.role}</p>
              </div>
              <div className="shrink-0 text-slate-500">
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
              <span className="flex items-center gap-1"><Calendar size={11} />{exp.period}</span>
              <span className="flex items-center gap-1"><MapPin size={11} />{exp.location}</span>
            </div>
          </div>
        </button>

        {/* Expanded bullets */}
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-5 border-t border-slate-800/60"
          >
            <ul className="mt-4 space-y-2.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`} />
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function ExperienceTimeline({ limit }) {
  const list = limit ? experiences.slice(0, limit) : experiences;

  return (
    <div className="relative">
      {list.map((exp, i) => (
        <TimelineEntry
          key={`${exp.company}-${i}`}
          exp={exp}
          index={i}
          isLast={i === list.length - 1}
        />
      ))}
    </div>
  );
}
