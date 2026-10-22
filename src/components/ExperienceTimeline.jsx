"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, BookOpen, ChevronDown, ChevronUp, MapPin, Calendar, Loader, CheckCircle2 } from "lucide-react";

export const experiences = [
  /* ═══════════ PROFESSIONAL TRAINING (Completed & Ongoing) ═══════════ */
  {
    company: "Google / Coursera",
    role: "Google Cybersecurity Professional Certificate",
    period: "2026",
    location: "Remote",
    type: "training",
    status: "completed",
    color: "emerald",
    bullets: [
      "Completed Google's comprehensive 8-course Cybersecurity Professional Certificate on Coursera. Mastered foundational competencies across threat modeling, network security architecture (NIST CSF, TCP/IP defense), SIEM detection, Python automation for security tasks, and Linux/SQL tools for security analysts. Earned verified digital badges and professional certification.",
    ],
  },
  {
    company: "Unisoft Technology",
    role: "CompTIA Network+ & EC-Council CEH v13 Training",
    period: "2026",
    location: "Nagpur, India",
    type: "training",
    status: "completed",
    color: "cyan",
    bullets: [
      "Recognized that a strong networking foundation paired with offensive security skills is essential for cybersecurity roles (Situation). Enrolled in and completed instructor-led CompTIA Network+ and EC-Council Certified Ethical Hacker (CEH v13 AI) preparation programs at Unisoft Technology, Nagpur (Task). Mastered network topologies, switching & routing protocols, subnetting, VLANs, and troubleshooting for Network+, alongside reconnaissance techniques, vulnerability analysis, system hacking methodologies, web application attacks, and social engineering for CEH (Action). Built a well-rounded red team + blue team skill set aligned with CompTIA N10-009 and CEH v13 exam objectives (Result).",
    ],
  },
  {
    company: "Google / Coursera",
    role: "Google IT Support Professional Certificate",
    period: "2026",
    location: "Remote",
    type: "training",
    status: "completed",
    color: "yellow",
    bullets: [
      "Completed Google's 5-course IT Support Professional Certificate on Coursera covering hardware, operating systems (Linux & Windows), computer networking protocols (The Bits and Bytes of Networking), system administration & IT infrastructure services, and IT security defense fundamentals.",
    ],
  },
  {
    company: "IBM / Coursera",
    role: "IBM Full Stack Software Developer Professional Certificate",
    period: "2026 – Present",
    location: "Remote",
    type: "training",
    status: "in-progress",
    color: "blue",
    bullets: [
      "Recognized the value of full-stack development skills for building security tools and internal dashboards (Situation). Enrolled in IBM's Full Stack Developer Professional Certificate on Coursera (Task). Studying cloud-native development with React, Node.js, Python, Django, Docker, Kubernetes, and microservices architecture (Action). Expanding skill set to bridge the gap between development and security operations (DevSecOps) (Result).",
    ],
  },
  {
    company: "Be 10x",
    role: "AI Tool Workshop Bootcamp",
    period: "2026",
    location: "Remote",
    type: "training",
    status: "completed",
    color: "purple",
    bullets: [
      "Wanted to leverage AI tools to boost productivity and automate repetitive security and development workflows (Situation). Participated in the Be 10x AI Tool Workshop bootcamp (Task). Gained hands-on experience with AI-powered productivity tools, prompt engineering techniques, and workflow automation strategies (Action). Completed the bootcamp and earned a certificate, integrating AI tools into daily development and security analysis workflows (Result).",
    ],
  },

  /* ═══════════ COMPLETED INTERNSHIPS ═══════════ */
  {
    company: "Zscaler / EduSkills AICTE",
    role: "Zero Trust Cloud Security Virtual Intern",
    period: "April 2026 – June 2026",
    location: "Remote",
    type: "internship",
    color: "cyan",
    bullets: [
      "Enrolled in an 8-week Zscaler Zero Trust training program to deepen cloud security expertise (Situation). Tasked with mastering Zero Trust Network Access (ZTNA) frameworks and Secure Access Service Edge (SASE) architecture (Task). Completed all modules including ZIA/ZPA configuration, policy enforcement labs, and secure web gateway design (Action). Achieved an 'O' (Outstanding) grade with 100% completion rate, earning the Zscaler Zero Trust Cyber Associate credential (Result).",
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
      "Required hands-on exposure to enterprise-grade firewall and endpoint security platforms (Situation). Assigned to complete intensive specialization labs across 20+ Palo Alto hardware configurations (Task). Navigated Next-Generation Firewall (NGFW) deployments, configured Strata access policy engines, and analyzed Cortex endpoint threat telemetry feeds (Action). Earned 4 Palo Alto course certificates covering network security, cloud security, and SOC operations (Result).",
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
      "Needed to understand cloud-native security architectures for hybrid enterprise environments (Situation). Tasked with modeling secure cloud network topologies within Google Cloud Platform (Task). Designed isolated VPC architectures, configured security perimeter controls using Cloud Armor, and built enterprise-level IAM policies with role-based access groups (Action). Developed practical GCP security skills and earned the Google Cloud Cybersecurity Specialization credential (Result).",
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
      "Sought vendor-specific security expertise in the Fortinet ecosystem for enterprise defense roles (Situation). Tasked with evaluating Fortinet Security Fabric architectures and threat mitigation strategies (Task). Analyzed 5+ Security Fabric blueprints, simulated FortiGate NGFW policies, and tested IDS/IPS rule sets in lab environments (Action). Earned the Fortinet Certified Associate (FCA) and FortiGate 7.4 Operator certifications (Result).",
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
      "Challenged to apply deep learning to a real-world sustainability problem for Shell's green skills initiative (Situation). Tasked with building an automated waste classification system using computer vision (Task). Engineered a CNN-based Garbage Classification AI platform that parsed raw image data and established automatic sorting boundaries for recyclable vs. non-recyclable waste (Action). Delivered a functional prototype achieving reliable classification accuracy, demonstrating AI's role in sustainability (Result).",
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
      "Needed to build practical ML model development skills beyond theoretical coursework (Situation). Tasked with constructing a predictive model using real-world corporate compensation data (Task). Scrubbed multi-variable historical datasets, engineered features, and trained regression models to predict employee salary trajectories with scikit-learn (Action). Delivered a functional Employee Salary Prediction Model with validated accuracy metrics and documented methodology (Result).",
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
      "Required end-to-end full-stack development experience with security-focused architecture (Situation). Tasked with building a secure personal finance management application from scratch (Task). Engineered a MERN stack (MongoDB, Express, React, Node.js) Finance Tracker with JWT-based authentication, bcrypt password hashing, and custom transactional REST API schemas (Action). Deployed a fully functional web app with cryptographic access controls and real-time dashboard analytics (Result).",
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
      "Sought advanced data science skills for complex multi-variable analysis scenarios (Situation). Tasked with implementing clustering and classification algorithms on large-scale datasets (Task). Executed K-means clustering, decision tree optimization, and data parsing pipelines using Python and scikit-learn within strict mathematical validation margins (Action). Produced reproducible analytical workflows and model performance benchmarks for Altair's data science curriculum (Result).",
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
      "Needed to understand steganographic data-hiding techniques for digital forensics applications (Situation). Tasked with building a secure steganography module that could evade standard detection (Task). Engineered a cryptographic steganography tool using OpenStego to embed encrypted text payloads within carrier images via LSB (Least Significant Bit) pixel-level manipulation (Action). Successfully concealed data that evaded structural hash detection in testing, demonstrating practical covert communication techniques (Result).",
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
      "Required hands-on AWS cloud infrastructure experience for DevOps and security operations roles (Situation). Tasked with designing a cross-account data replication architecture with strict IAM isolation (Task). Architected a resilient 3-tier AWS sandbox deploying privilege-isolated IAM trust policies, S3 cross-account replication, and CodePipeline CI/CD workflows (Action). Delivered a fully operational multi-account AWS architecture with documented security policies and automated deployment pipelines (Result).",
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
  const isTraining = exp.type === "training";

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
        className={`bg-slate-900/70 border rounded-xl mb-6 overflow-hidden transition-all duration-300 glass-card ${c.border} ${isJob ? "ring-1 ring-emerald-500/20" : ""} ${isTraining ? "ring-1 ring-cyan-500/15" : ""}`}
      >
        <button
          onClick={() => setExpanded((e) => !e)}
          className="w-full text-left p-5 flex items-start gap-4"
        >
          {/* Icon */}
          <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/50 shrink-0 mt-0.5">
            {isTraining ? (
              <BookOpen size={16} className="text-emerald-400" />
            ) : isJob ? (
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
                  {isTraining && (
                    exp.status === "in-progress" ? (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-cyan-500/10 text-cyan-400 flex items-center gap-1">
                        <Loader size={10} className="animate-spin" /> In Progress
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full font-mono bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={10} /> Completed
                      </span>
                    )
                  )}
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
