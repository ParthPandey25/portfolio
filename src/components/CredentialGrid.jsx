"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Cloud,
  BookOpen,
  Award,
  BadgeCheck,
  ExternalLink,
  Briefcase,
  FileText,
  Code2,
} from "lucide-react";
import TiltCard from "./TiltCard";

/* ------------------------------------------------------------------ */
/*  Helper — builds a /certificates/ URL, encoding special characters  */
/* ------------------------------------------------------------------ */
const cert = (filename) => `/certificates/${encodeURIComponent(filename)}`;

/* ================================================================== */
/*  ALL CREDENTIALS                                                    */
/*                                                                     */
/*  Categories:                                                        */
/*    security     — vendor security certs & cyber courses             */
/*    cloud        — cloud platform certs & internships                */
/*    academic     — NPTEL / GATE / university                         */
/*    internship   — company internship completion proofs              */
/*    publications — research papers & events                          */
/* ================================================================== */
const ALL_CREDS = [

  /* ══════════════════════════ SECURITY ═══════════════════════════ */

  // ── Palo Alto Networks (4 courses) ────────────────────────────
  {
    title: "Palo Alto Networks — Cybersecurity Foundation",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PA-1",
    category: "security",
    icon: <ShieldCheck size={22} className="text-red-400" />,
    color: "red",
    desc: "NGFW fundamentals, threat intelligence, and Cortex endpoint telemetry — Course 1",
    file: "12437_3_746415_1772186085_Palo Alto Networks Course Certificate of Completion.pdf",
  },
  {
    title: "Palo Alto Networks — Network Security",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PA-2",
    category: "security",
    icon: <ShieldCheck size={22} className="text-red-400" />,
    color: "red",
    desc: "Network perimeter defence, Strata policy engines, and traffic inspection — Course 2",
    file: "12438_3_746415_1772186664_Palo Alto Networks Course Certificate of Completion.pdf",
  },
  {
    title: "Palo Alto Networks — Cloud Security",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PA-3",
    category: "security",
    icon: <ShieldCheck size={22} className="text-red-400" />,
    color: "red",
    desc: "Prisma Cloud, CSPM, cloud workload protection — Course 3",
    file: "12439_3_746415_1772187554_Palo Alto Networks Course Certificate of Completion cloud Secuirty.pdf",
  },
  {
    title: "Palo Alto Networks — Security Operations",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PA-4",
    category: "security",
    icon: <ShieldCheck size={22} className="text-red-400" />,
    color: "red",
    desc: "SOC analyst workflows, XSOAR automation, MITRE ATT&CK mapping — Course 4",
    file: "12440_3_746415_1772188676_Palo Alto Networks Course Certificate of Completion Security operation.pdf",
  },

  // ── Check Point (Secure Hub) ───────────────────────────────────
  {
    title: "Check Point CCVS / CCVA — VSX & Virtual Architecture",
    issuer: "Check Point Software Technologies (Secure Hub)",
    abbr: "CCVS",
    category: "security",
    icon: <ShieldCheck size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Virtual System Extension (VSX) architecture, multi-tenant environments, and Check Point virtual appliance design",
    file: "Certificate Parth Pandey CCVS ,CCVA Secure hub.pdf",
  },
  {
    title: "Check Point Certified Secure Web Gateway",
    issuer: "Check Point Software Technologies (Secure Hub)",
    abbr: "CCSWG",
    category: "security",
    icon: <ShieldCheck size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Web filtering, HTTPS inspection, URL categorisation, and data loss prevention via Check Point SWG",
    file: "Certificate SWG Parth Pandey Secure hub.pdf",
  },

  // ── Fortinet ───────────────────────────────────────────────────
  {
    title: "Fortinet Certified Associate in Cybersecurity",
    issuer: "Fortinet",
    abbr: "FCA",
    category: "security",
    icon: <ShieldCheck size={22} className="text-orange-400" />,
    color: "orange",
    desc: "Fortinet Security Fabric, threat prevention, FortiOS, and enterprise network defence",
    file: "Fortinet Certified Associate in Cybersecurity Parth Pandey.pdf",
  },
  {
    title: "Fortinet FortiGate 7.4 Operator",
    issuer: "Fortinet",
    abbr: "FGT-OP",
    category: "security",
    icon: <ShieldCheck size={22} className="text-orange-400" />,
    color: "orange",
    desc: "FortiGate 7.4 NGFW operations, policy management, SD-WAN, VPN, and traffic shaping",
    file: "Fortinet FortiGATE 7.4 operator Parth Pandey.pdf",
  },
  {
    title: "Fortinet — Intro to Threat Landscape 3.0",
    issuer: "Fortinet",
    abbr: "ITL-3",
    category: "security",
    icon: <ShieldCheck size={22} className="text-orange-400" />,
    color: "orange",
    desc: "Current threat actor TTPs, ransomware ecosystems, and nation-state campaign analysis",
    file: "Fortinet Intro to Threat Landscape 3.0 PArth Pandey.pdf",
  },
  {
    title: "Fortinet — Technical Intro to Cybersecurity 3.0",
    issuer: "Fortinet",
    abbr: "TICS-3",
    category: "security",
    icon: <ShieldCheck size={22} className="text-orange-400" />,
    color: "orange",
    desc: "CIA triad, cryptography fundamentals, network security architecture, and IAM",
    file: "Fortinet Tech Intro to CyberSec 3.0 Parth Pandey.pdf",
  },

  // ── Zscaler ────────────────────────────────────────────────────
  {
    title: "Zscaler Zero Trust Cyber Associate",
    issuer: "Zscaler",
    abbr: "ZTCA",
    category: "security",
    icon: <ShieldCheck size={22} className="text-cyan-400" />,
    color: "cyan",
    desc: "ZTNA frameworks, SASE principles, and Zscaler Internet Access (ZIA) architecture",
    file: "Zscaler zero trust cyber associate Parth Pandey certificte.pdf",
  },

  // ── Fortinet internship (Network Security Associate) ───────────
  {
    title: "Fortinet — Network Security Associate Internship",
    issuer: "Fortinet / EduSkills AICTE",
    abbr: "NSA-INT",
    category: "security",
    icon: <BadgeCheck size={22} className="text-blue-400" />,
    color: "blue",
    desc: "Virtual internship as Network Security Associate — firewall rules, IDS/IPS, and log analysis",
    file: "PARTH RAJENDRA PANDEY interhsip certificate of network security associate Fortinet.pdf",
  },

  /* ══════════════════════════ CLOUD ═══════════════════════════════ */

  {
    title: "Google Cloud Cybersecurity Specialization",
    issuer: "Google Cloud / NPTEL",
    abbr: "GCP-SEC",
    category: "cloud",
    icon: <Cloud size={22} className="text-yellow-400" />,
    color: "yellow",
    desc: "GCP network security, IAM, VPC design, Cloud Armor, and Security Command Center",
    file: "PARTH RAJENDRA PANDEY 790152 Google cloud cyber security.pdf",
  },
  {
    title: "Python Full Stack Developer — EduSkills AICTE",
    issuer: "EduSkills / AICTE",
    abbr: "PFS-ESK",
    category: "cloud",
    icon: <Cloud size={22} className="text-blue-400" />,
    color: "blue",
    desc: "Full stack development with Python — backend APIs, databases, and deployment on cloud platforms",
    file: "PARTH RAJENDRA  PANDEY_Certificate (1) python full stack eduskill.pdf",
  },
  {
    title: "Python Full Stack Developer — Edunet Foundation",
    issuer: "Edunet Foundation / AICTE",
    abbr: "PFS-EDN",
    category: "cloud",
    icon: <Cloud size={22} className="text-blue-400" />,
    color: "blue",
    desc: "Python full stack development program covering Django, REST APIs, and cloud deployment",
    file: "PARTH RAJENDRA PANDEY 587221 (python full stack developer from edunet) .pdf",
  },
  {
    title: "Altair — Data Science Master Internship",
    issuer: "Altair Engineering / Edunet",
    abbr: "ALT-DS",
    category: "cloud",
    icon: <Cloud size={22} className="text-purple-400" />,
    color: "purple",
    desc: "Data science master internship at Altair — machine learning pipelines, data visualisation, and predictive analytics",
    file: "PARTH RAJENDRA  PANDEY 687206 (data Science master intership altair) .pdf",
  },
  {
    title: "AWS DevOps Internship Certificate",
    issuer: "BrainOvision / AICTE",
    abbr: "AWS-DEV",
    category: "cloud",
    icon: <Cloud size={22} className="text-orange-400" />,
    color: "orange",
    desc: "AWS cross-account IAM trust policies, S3 replication, CodePipeline, and DevOps CI/CD workflows",
    file: "AWS - DEVOPS INTERNSHIP CERTIFICATE (1).pdf",
  },

  /* ══════════════════════════ ACADEMIC ════════════════════════════ */

  {
    title: "GATE 2024 — Score Card",
    issuer: "GATE — Ministry of Education, India",
    abbr: "GATE",
    category: "academic",
    icon: <Award size={22} className="text-purple-400" />,
    color: "purple",
    desc: "Score: 355 — Graduate Aptitude Test in Engineering (CS/IT) — National qualification",
    file: "CS26S42062430_ScoreCard Gate Score card.pdf",
  },
  {
    title: "NPTEL: Data Analytics with Python",
    issuer: "NPTEL / IIT (Swayam)",
    abbr: "NPTEL-DA",
    category: "academic",
    icon: <BookOpen size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Elite designation (72%) — Data analytics, visualisation, pandas, and ML pipelines",
    file: "Data Analytics with Python (3).pdf",
  },
  {
    title: "NPTEL: Social Networks",
    issuer: "NPTEL / IIT (Swayam)",
    abbr: "NPTEL-SN",
    category: "academic",
    icon: <BookOpen size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Elite designation (70%) — Graph theory, network topology, and community detection",
    file: "Socail netwrok NPTEL Parth Pandey.pdf",
  },
  {
    title: "Swayam: Data Warehouse & Mining",
    issuer: "NPTEL / IIT (Swayam)",
    abbr: "NPTEL-DWM",
    category: "academic",
    icon: <BookOpen size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Score 60% — Data mining algorithms, association rules, clustering, and classification",
    file: "Parth Swayam Data minng certificate.pdf",
  },
  {
    title: "App Development using Flutter — YCCE",
    issuer: "Yeshwantrao Chavan College of Engineering (YCCE)",
    abbr: "FLUTTER",
    category: "academic",
    icon: <Code2 size={22} className="text-cyan-400" />,
    color: "cyan",
    desc: "Flutter & Dart mobile application development — UI design, state management, and deployment",
    file: "PARTH PANDEY App Devlopment using flutter YCCE.pdf",
  },

  // ── Devtown Courses (5) ────────────────────────────────────────
  {
    title: "C++ Programming — Devtown",
    issuer: "Devtown",
    abbr: "DT-CPP",
    category: "academic",
    icon: <Code2 size={22} className="text-sky-400" />,
    color: "sky",
    desc: "C++ fundamentals, OOP principles, data structures, and algorithm implementation",
    file: "Parth C++ Devtown.pdf",
  },
  {
    title: "Java Programming — Devtown",
    issuer: "Devtown",
    abbr: "DT-JAVA",
    category: "academic",
    icon: <Code2 size={22} className="text-sky-400" />,
    color: "sky",
    desc: "Java fundamentals, object-oriented programming, collections, and exception handling",
    file: "PArth Java Devtown.pdf",
  },
  {
    title: "Full Stack Development Course — Devtown",
    issuer: "Devtown",
    abbr: "DT-FSC",
    category: "academic",
    icon: <Code2 size={22} className="text-sky-400" />,
    color: "sky",
    desc: "Full stack web development — HTML, CSS, JavaScript, React, Node.js, and databases",
    file: "Parth Full stack Dev course devtown.pdf",
  },
  {
    title: "Full Stack Development Training — Devtown",
    issuer: "Devtown",
    abbr: "DT-FST",
    category: "academic",
    icon: <Code2 size={22} className="text-sky-400" />,
    color: "sky",
    desc: "Completion of full stack developer training programme — frontend to backend development",
    file: "Parth full stack devtown traing completion.pdf",
  },
  {
    title: "Full Stack Project Completion — Devtown",
    issuer: "Devtown",
    abbr: "DT-FSP",
    category: "academic",
    icon: <Code2 size={22} className="text-sky-400" />,
    color: "sky",
    desc: "Hands-on full stack project completion certificate — end-to-end application development",
    file: "Parth devtown full stack project completion.pdf",
  },

  /* ══════════════════════════ INTERNSHIP ══════════════════════════ */

  // ── Company Completion Certificates ───────────────────────────
  {
    title: "EY GDS & Edunet AICTE — Internship Completion",
    issuer: "Ernst & Young GDS / Edunet / AICTE",
    abbr: "EY-INT",
    category: "internship",
    icon: <Briefcase size={22} className="text-yellow-400" />,
    color: "yellow",
    desc: "IBM Advanced Cybersecurity virtual internship in partnership with EY GDS and AICTE Edunet Foundation",
    file: "Parth Pandey_Certificate for intership EYGDS & edunet aicte.pdf",
  },
  {
    title: "IBM SkillsBuild — AI/ML Internship (Edunet AICTE)",
    issuer: "IBM SkillsBuild / Edunet / AICTE",
    abbr: "IBM-INT",
    category: "internship",
    icon: <Briefcase size={22} className="text-blue-400" />,
    color: "blue",
    desc: "AI & Machine Learning internship completion via IBM SkillsBuild platform under AICTE Edunet",
    file: "Parth AIML edunet Ibmskillbuild intership.pdf",
  },
  {
    title: "IBM SkillsBuild — AICTE PD Completion (Cybersecurity)",
    issuer: "IBM SkillsBuild / Edunet / AICTE",
    abbr: "IBM-AICTE",
    category: "internship",
    icon: <Briefcase size={22} className="text-blue-400" />,
    color: "blue",
    desc: "AICTE Professional Development certificate for completing the IBM SkillsBuild Cybersecurity internship track",
    file: "AICTE B4 PD Certificates-1069 Completion of intership Parth Cybersecurity Edunet IbmSkillbuild.pdf",
  },
  {
    title: "Shell — AIDA Internship (Edunet AICTE)",
    issuer: "Shell / AIDA / Edunet / AICTE",
    abbr: "SHELL-INT",
    category: "internship",
    icon: <Briefcase size={22} className="text-amber-400" />,
    color: "amber",
    desc: "AIDA (AI Data Analytics) virtual internship in collaboration with Shell and AICTE Edunet",
    file: "Parth Rajendra Pandey_AICTE_Certificate AIDA Shell Edunet.pdf",
  },
  {
    title: "Palo Alto Networks — Cybersecurity Virtual Internship",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PA-CSEC",
    category: "internship",
    icon: <Briefcase size={22} className="text-red-400" />,
    color: "red",
    desc: "Virtual internship in cybersecurity by Palo Alto Networks via EduSkills AICTE — threat analysis, NGFW, and SOC fundamentals",
    file: "Cybersecurity Virtual Internship (1).pdf",
  },
  {
    title: "Magma Technology — Joining Letter",
    issuer: "Magma Technology",
    abbr: "MGMA-JL",
    category: "internship",
    icon: <Briefcase size={22} className="text-indigo-400" />,
    color: "indigo",
    desc: "Official joining letter for internship at Magma Technology — Network & Security domain",
    file: "Joining Letter - Parth Pandey Magma techmnology.pdf",
  },
  {
    title: "Magma Technology — Experience Letter",
    issuer: "Magma Technology",
    abbr: "MGMA-EXP",
    category: "internship",
    icon: <Briefcase size={22} className="text-indigo-400" />,
    color: "indigo",
    desc: "Internship experience letter from Magma Technology with role and performance summary",
    file: "Parth Pandey Magma Expeirence.pdf",
  },

  // ── Achievement / Event Certificates ──────────────────────────
  {
    title: "ICESM — Certificate of Merit",
    issuer: "ICESM 2026",
    abbr: "ICESM",
    category: "internship",
    icon: <Award size={22} className="text-amber-400" />,
    color: "amber",
    desc: "Certificate of merit — Second International Conference on Engineering, Science and Management",
    file: "Mr. Parth Rajendra Pandey_certificate icesm.pdf",
  },
  {
    title: "YCCE — Achievement Certificate",
    issuer: "Yeshwantrao Chavan College of Engineering (YCCE), Nagpur",
    abbr: "YCCE-ACH",
    category: "internship",
    icon: <BadgeCheck size={22} className="text-teal-400" />,
    color: "teal",
    desc: "Institutional achievement certificate from Yeshwantrao Chavan College of Engineering (YCCE), Nagpur",
    file: "Parth Pandey_ Anjuman College of Engineering and Technology.pdf",
  },
  {
    title: "Code Clash — Participation Certificate",
    issuer: "ACET / Competition Organizer",
    abbr: "CODE-CLASH",
    category: "internship",
    icon: <Award size={22} className="text-amber-400" />,
    color: "amber",
    desc: "Participation certificate from Code Clash competitive programming event at ACET",
    file: "Parth Pandey Code Clash Participation Certificarte.pdf",
  },
  {
    title: "Ennovate 25 — Hackathon",
    issuer: "Ennovate",
    abbr: "ENNOV-25",
    category: "internship",
    icon: <Award size={22} className="text-amber-400" />,
    color: "amber",
    desc: "Participation and achievement certificate from Ennovate 25 national-level hackathon event",
    file: "Parth Pandey Ennovate 25 Mass email.jpg",
    isImage: true,
  },

  /* ══════════════════════════ PUBLICATIONS ════════════════════════ */

  {
    title: "IRJAEH — Published Research Paper",
    issuer: "International Research Journal of Advanced Engineering Hub",
    abbr: "IRJAEH-P",
    category: "publications",
    icon: <FileText size={22} className="text-violet-400" />,
    color: "violet",
    desc: "Peer-reviewed paper published in IRJAEH — Vol. 4, Issue 4, pp. 1641-1645 (2026)",
    file: "IRJAEH-04-04-0215-2604084-1641-1645.pdf",
  },
  {
    title: "IRJAEH — Publication Certificate",
    issuer: "International Research Journal of Advanced Engineering Hub",
    abbr: "IRJAEH-C",
    category: "publications",
    icon: <FileText size={22} className="text-violet-400" />,
    color: "violet",
    desc: "Author's certificate of publication from IRJAEH for the AI Yoga Pose Detection research article",
    file: "Parth Pandey_certificate irjaeh.pdf",
  },
  {
    title: "IPR — Intellectual Property Rights Event",
    issuer: "IPR Cell / AICTE",
    abbr: "IPR",
    category: "publications",
    icon: <FileText size={22} className="text-violet-400" />,
    color: "violet",
    desc: "Certificate of participation in Intellectual Property Rights awareness event by AICTE",
    file: "IPR_EVENT.pdf",
  },
  {
    title: "ICTTSEM 2025 — Conference Presentation Certificate",
    issuer: "Suryodaya College of Engineering & Technology",
    abbr: "ICTTSEM",
    category: "publications",
    icon: <FileText size={22} className="text-violet-400" />,
    color: "violet",
    desc: "Certificate of paper presentation at ICTTSEM-25 (International Conference on Tech-Trends in Science, Engineering & Management) at Suryodaya College — April 2025",
    file: "Parth Pandey Mass email certificate publication.png",
    isImage: true,
  },
];

const FILTERS = ["all", "security", "cloud", "academic", "internship", "publications"];

const FILTER_LABELS = {
  all: "All",
  security: "Security",
  cloud: "Cloud",
  academic: "Academic",
  internship: "Internship",
  publications: "Publications",
};

const colorMap = {
  emerald: "border-emerald-500/20 hover:border-emerald-500/50 hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.25)]",
  cyan:    "border-cyan-500/20    hover:border-cyan-500/50    hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.25)]",
  blue:    "border-blue-500/20    hover:border-blue-500/50    hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.25)]",
  yellow:  "border-yellow-500/20  hover:border-yellow-500/50  hover:shadow-[0_10px_40px_-10px_rgba(234,179,8,0.25)]",
  orange:  "border-orange-500/20  hover:border-orange-500/50  hover:shadow-[0_10px_40px_-10px_rgba(249,115,22,0.25)]",
  purple:  "border-purple-500/20  hover:border-purple-500/50  hover:shadow-[0_10px_40px_-10px_rgba(168,85,247,0.25)]",
  red:     "border-red-500/20     hover:border-red-500/50     hover:shadow-[0_10px_40px_-10px_rgba(239,68,68,0.25)]",
  indigo:  "border-indigo-500/20  hover:border-indigo-500/50  hover:shadow-[0_10px_40px_-10px_rgba(99,102,241,0.25)]",
  violet:  "border-violet-500/20  hover:border-violet-500/50  hover:shadow-[0_10px_40px_-10px_rgba(139,92,246,0.25)]",
  amber:   "border-amber-500/20   hover:border-amber-500/50   hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.25)]",
  teal:    "border-teal-500/20    hover:border-teal-500/50    hover:shadow-[0_10px_40px_-10px_rgba(20,184,166,0.25)]",
  sky:     "border-sky-500/20     hover:border-sky-500/50     hover:shadow-[0_10px_40px_-10px_rgba(14,165,233,0.25)]",
};

const CATEGORY_ACCENT = {
  security:     "text-emerald-400",
  cloud:        "text-yellow-400",
  academic:     "text-purple-400",
  internship:   "text-indigo-400",
  publications: "text-violet-400",
};

export default function CredentialGrid() {
  const [filter, setFilter] = useState("all");

  const displayed =
    filter === "all" ? ALL_CREDS : ALL_CREDS.filter((c) => c.category === filter);

  const countFor = (f) =>
    f === "all" ? ALL_CREDS.length : ALL_CREDS.filter((c) => c.category === f).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all ${
              filter === f
                ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/40 text-emerald-300"
                : "border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200"
            }`}
          >
            {FILTER_LABELS[f]}
            <span className="ml-1.5 text-xs text-slate-500">({countFor(f)})</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {displayed.map((cred, i) => (
            <motion.div
              key={cred.abbr}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
            >
              <div
                className={`glass-card rounded-xl p-5 border h-full flex flex-col gap-3 transition-all duration-300 ${colorMap[cred.color] ?? ""}`}
              >
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0">
                    {cred.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-200 text-sm leading-snug">
                      {cred.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{cred.issuer}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed flex-1">{cred.desc}</p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 mt-auto">
                  <span className={`text-xs font-mono uppercase tracking-wider ${CATEGORY_ACCENT[cred.category] ?? "text-slate-600"}`}>
                    {cred.category}
                  </span>
                  <a
                    href={cert(cred.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-400 hover:text-emerald-400 transition-colors border border-slate-700 hover:border-emerald-500/40 px-2 py-0.5 rounded-md"
                    aria-label={`View ${cred.title} certificate`}
                  >
                    <ExternalLink size={10} />
                    View
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
