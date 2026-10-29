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
  FolderOpen,
  Folder,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Helper — builds a /certificates/ URL, encoding special characters  */
/* ------------------------------------------------------------------ */
const cert = (filename) => `/certificates/${encodeURIComponent(filename)}`;

/* ================================================================== */
/*  CREDENTIALS (HIERARCHICAL / NESTED SUB-FOLDER SYSTEM)             */
/* ================================================================== */
const ALL_CREDS = [
  /* ══════════════════════════ SECURITY & DEFENSE ═══════════════════════════ */

  // 1. Palo Alto Networks (Program Bundle)
  {
    title: "Palo Alto Networks — Cybersecurity Virtual Internship & Security Suite",
    issuer: "Palo Alto Networks / EduSkills AICTE",
    abbr: "PALO-ALTO-SUITE",
    category: "internship",
    icon: <ShieldCheck size={22} className="text-red-400" />,
    color: "red",
    desc: "Complete industrial cybersecurity virtual internship program and 5 specialization courses covering Strata NGFW, Prisma Cloud, Cortex XSOAR, and SOC threat intelligence.",
    mainFile: "Cybersecurity Virtual Internship PALO ALTO PARTH AICTE EDUNET.pdf",
    mainLabel: "🏆 View Final Internship Certificate",
    subBadge: "5 Course Modules Included",
    subCerts: [
      {
        title: "Course 1: Cybersecurity Foundation",
        file: "12437_3_746415_1772186085_Palo Alto Networks Course Certificate of Completion.pdf",
        tag: "Foundation & Threat Landscape",
      },
      {
        title: "Course 2: Network Security Fundamentals",
        file: "12438_3_746415_1772186664_Palo Alto Networks Course Certificate of Completion.pdf",
        tag: "Strata & NGFW Architecture",
      },
      {
        title: "Course 3: Cloud Security Fundamentals",
        file: "12439_3_746415_1772187554_Palo Alto Networks Course Certificate of Completion cloud Secuirty.pdf",
        tag: "Prisma Cloud & CSPM",
      },
      {
        title: "Course 4: Security Operations Fundamentals",
        file: "12440_3_746415_1772188676_Palo Alto Networks Course Certificate of Completion Security operation.pdf",
        tag: "SOC & Cortex Telemetry",
      },
      {
        title: "Course 5: Advanced Cybersecurity Course",
        file: "13793_3_746415_1772912353_Palo Alto Networks Course Certificate of Completion.pdf",
        tag: "Enterprise Threat Defense",
      },
    ],
  },

  // 2. Zscaler Zero Trust (Program Bundle)
  {
    title: "Zscaler — Zero Trust Cloud Security Virtual Internship",
    issuer: "Zscaler / AICTE",
    abbr: "ZSCALER-SUITE",
    category: "internship",
    icon: <ShieldCheck size={22} className="text-cyan-400" />,
    color: "cyan",
    desc: "Awarded Grade 'O' (Outstanding) for architectural design and policy implementation across Zscaler Private Access (ZPA) and Zscaler Internet Access (ZIA).",
    mainFile: "Zero Trust Cloud Security Virtual Internship ZSCALER PARTH .pdf",
    mainLabel: "🏆 View Grade 'O' Final Internship Certificate",
    subBadge: "2 Sub-Certificates Included",
    subCerts: [
      {
        title: "Zscaler Zero Trust Certified Associate (ZTCA)",
        file: "Zscaler zero trust cyber associate Parth Pandey certificte.pdf",
        tag: "ZTNA & SASE Certification",
      },
      {
        title: "Zscaler Fundamentals of Cybersecurity",
        file: "Zscaler Fundamentals of Cybersecurity-Parth Pandey.pdf",
        tag: "Cloud Security Architecture",
      },
    ],
  },

  // 3. Fortinet Network Security (Program Bundle)
  {
    title: "Fortinet — Network Security Associate Virtual Internship & Fabric Suite",
    issuer: "Fortinet / EduSkills AICTE",
    abbr: "FORTINET-SUITE",
    category: "internship",
    icon: <ShieldCheck size={22} className="text-orange-400" />,
    color: "orange",
    desc: "Virtual internship as Network Security Associate with comprehensive hands-on administration of FortiGate 7.4 NGFW, FortiOS policies, SSL-VPN inspection, and Security Fabric.",
    mainFile: "PARTH RAJENDRA PANDEY interhsip certificate of network security associate Fortinet.pdf",
    mainLabel: "🏆 View Final Internship Certificate",
    subBadge: "5 Sub-Certificates Included",
    subCerts: [
      {
        title: "Fortinet FortiGate 7.4 Operator",
        file: "Fortinet FortiGATE 7.4 operator Parth Pandey.pdf",
        tag: "NGFW Operations & SD-WAN",
      },
      {
        title: "Fortinet Certified Associate in Cybersecurity",
        file: "Fortinet Certified Associate in Cybersecurity Parth Pandey.pdf",
        tag: "FCA Industrial Credential",
      },
      {
        title: "Fortinet Certified Fundamentals in Cybersecurity",
        file: "Fortinet Certified Fundamentals in Cybersecurity Parth Pandey.pdf",
        tag: "FCF Credential",
      },
      {
        title: "Intro to Threat Landscape 3.0",
        file: "Fortinet Intro to Threat Landscape 3.0 PArth Pandey.pdf",
        tag: "Threat Actor TTPs",
      },
      {
        title: "Technical Intro to Cybersecurity 3.0",
        file: "Fortinet Tech Intro to CyberSec 3.0 Parth Pandey.pdf",
        tag: "Network Security & Crypto",
      },
    ],
  },

  // 4. Google Cybersecurity Professional (Program Bundle)
  {
    title: "Google Cybersecurity Professional Certificate",
    issuer: "Google / Coursera",
    abbr: "GOOGLE-CYBER-SUITE",
    category: "security",
    icon: <ShieldCheck size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Comprehensive 8-course professional specialization covering SIEM log analysis, network architecture, Python automation, Linux/SQL triage, and incident response.",
    mainFile: "Coursera Google Cybersecurity  Parth .pdf",
    mainLabel: "🏆 View Master Specialization Certificate",
    subBadge: "8 Specialization Courses Included",
    subCerts: [
      {
        title: "Course 1: Foundations of Cybersecurity",
        file: "Parth Coursera Foundation of cybersecuirty.pdf",
        tag: "CISSP Domains & SOC Ethics",
      },
      {
        title: "Course 2: Play It Safe — Manage Security Risks",
        file: "Parth Coursera Play it safe manage secuirty risks.pdf",
        tag: "NIST CSF & Risk Analysis",
      },
      {
        title: "Course 3: Connect & Protect — Networks & Security",
        file: "Parth Pandey _ coursera Connect and Protect network and network secuirty.pdf",
        tag: "TCP/IP, Firewalls & VPNs",
      },
      {
        title: "Course 4: Tools of the Trade — Linux & SQL",
        file: "Coursera Tools of the Trade Linux and SQL google cyber parth.pdf",
        tag: "Bash CLI & Database Queries",
      },
      {
        title: "Course 5: Assets, Threats, and Vulnerabilities",
        file: "Coursera Assets, Threats, and Vulnerabilities google cyber parth.pdf",
        tag: "Vulnerability Management",
      },
      {
        title: "Course 6: Sound the Alarm — Detection & Response",
        file: "Coursera Sound the Alarm Detection and Response google cyber parth.pdf",
        tag: "SIEM, IDS/IPS & Triage",
      },
      {
        title: "Course 7: Automate Cybersecurity Tasks with Python",
        file: "Coursera Automate Cybersecurity Tasks with Python google cyber parth.pdf",
        tag: "Security Scripting & Regex",
      },
      {
        title: "Course 8: Put It to Work — Prepare for Cybersecurity Jobs",
        file: "Coursera Put It to Work Prepare for Cybersecurity Jobs google cyber parth.pdf",
        tag: "Incident Documentation",
      },
    ],
  },

  // 5. Google IT Support Professional (Program Bundle)
  {
    title: "Google IT Support Professional Certificate",
    issuer: "Google / Coursera",
    abbr: "GOOGLE-IT-SUITE",
    category: "security",
    icon: <Briefcase size={22} className="text-blue-400" />,
    color: "blue",
    desc: "5-course professional specialization in computer networking, Linux/Windows systems administration, system services, and IT defense against digital dark arts.",
    mainFile: "Coursera Google it support Parth final certificate.pdf",
    mainLabel: "🏆 View Master IT Specialization Certificate",
    subBadge: "5 Specialization Courses Included",
    subCerts: [
      {
        title: "Technical Support Fundamentals",
        file: "Coursera Technical support Fundamantal Google it support Parth.pdf",
        tag: "Hardware, OS & LAN Basics",
      },
      {
        title: "The Bits and Bytes of Networking",
        file: "Coursera The Bits and Bytes of Computer Networking google it support Parth.pdf",
        tag: "TCP/IP, Subnetting & Routing",
      },
      {
        title: "Operating Systems and You: Becoming a Power User",
        file: "Coursera Operating Systems and You_Becoming a Power Google it support Parth.pdf",
        tag: "Linux & Windows CLI Admin",
      },
      {
        title: "System Administration & IT Infrastructure",
        file: "Coursera System Administration and IT Infrastructure Google it support Parth.pdf",
        tag: "DNS, DHCP, Directory Services",
      },
      {
        title: "IT Security: Defense Against the Digital Dark Arts",
        file: "Coursera IT Security Defense against the digital dark arts google it support.pdf",
        tag: "Cryptography, AAA & Firewalls",
      },
    ],
  },

  // 6. OWASP Top 10 Application Security (Infosec / Coursera)
  {
    title: "OWASP Top 10: 2023 — Web Application Vulnerability Assessment & Mitigation",
    issuer: "Infosec / Coursera",
    abbr: "OWASP-TOP-10",
    category: "security",
    icon: <ShieldCheck size={22} className="text-rose-400" />,
    color: "rose",
    desc: "Rigorous specialization in auditing, testing, and mitigating the critical OWASP Top 10 web vulnerabilities — including Broken Access Control (BOLA/IDOR), Cryptographic Failures, Injection attacks (SQLi/XSS), Insecure Design, and Security Misconfiguration.",
    mainFile: "Coursera OWASP TOP 10 2023 INFOSEC PARTH.pdf",
    mainLabel: "🏆 View Official OWASP Top 10 Certificate",
    subBadge: "AppSec & DAST Specialization",
    subCerts: [
      {
        title: "OWASP Top 10: 2023 Certification of Completion",
        file: "Coursera OWASP TOP 10 2023 INFOSEC PARTH.pdf",
        tag: "Web Security & Vulnerability Auditing",
      },
    ],
  },

  // 7. Check Point Software Technologies (Program Bundle)
  {
    title: "Check Point CCSA & CCVS — Virtual Architecture & SWG Suite",
    issuer: "Check Point Software Technologies (Secure Hub)",
    abbr: "CHECKPOINT-SUITE",
    category: "security",
    icon: <ShieldCheck size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Virtual System Extension (VSX) architecture, multi-tenant virtual firewalls, Gaia OS policy administration, and HTTPS inspection with Check Point Secure Web Gateway.",
    mainFile: "Certificate Parth Pandey CCVS ,CCVA Secure hub.pdf",
    mainLabel: "🏆 View Check Point CCVS / CCVA Certificate",
    subBadge: "2 Specialized Credentials Included",
    subCerts: [
      {
        title: "Check Point Certified Secure Web Gateway (CCSWG)",
        file: "Certificate SWG Parth Pandey Secure hub.pdf",
        tag: "URL Filtering & DLP",
      },
      {
        title: "Check Point CCVS / CCVA Virtual Architecture",
        file: "Certificate Parth Pandey CCVS ,CCVA Secure hub.pdf",
        tag: "VSX Multi-Tenant Design",
      },
    ],
  },

  // 7. Google Cloud Virtual Internship (Bundle)
  {
    title: "Google Cloud — Cybersecurity Virtual Internship",
    issuer: "Google Cloud / AICTE",
    abbr: "GCP-SUITE",
    category: "cloud",
    icon: <Cloud size={22} className="text-yellow-400" />,
    color: "yellow",
    desc: "Cloud security virtual internship architecting IAM least-privilege trust policies, VPC peering, Compute Engine security configurations, and Cloud Armor rules.",
    mainFile: "PARTH RAJENDRA PANDEY 790152 Google cloud cyber security.pdf",
    mainLabel: "🏆 View Final Google Cloud Certificate",
    subBadge: "1 Digital Badge Included",
    subCerts: [
      {
        title: "Google Cloud Cybersecurity Digital Badge Credential",
        file: "google-cloud-cybersecurity-certificate.png",
        tag: "Google Cloud Skill Badge",
      },
    ],
  },

  // 8. AWS Cloud Computing & DevOps (Bundle)
  {
    title: "AWS Cloud & DevOps Virtual Internship",
    issuer: "BrainOvision Solutions / AICTE",
    abbr: "AWS-SUITE",
    category: "cloud",
    icon: <Cloud size={22} className="text-orange-400" />,
    color: "orange",
    desc: "Engineered scalable AWS cloud topologies with EC2, S3 bucket encryption, VPC security groups, and integrated DevOps CodePipeline CI/CD workflows.",
    mainFile: "AWS BrainOvision Parth Pandey.pdf",
    mainLabel: "🏆 View AWS Cloud Virtual Internship Certificate",
    subBadge: "DevOps Extension Included",
    subCerts: [
      {
        title: "AWS DevOps Internship Certificate",
        file: "AWS - DEVOPS INTERNSHIP CERTIFICATE (1).pdf",
        tag: "CI/CD & Cloud Infrastructure",
      },
    ],
  },

  // 10. TryHackMe Top 2% Standalone
  {
    title: "TryHackMe — Top 2% Global Rank (Level 12 [GURU])",
    issuer: "TryHackMe",
    abbr: "THM-GLOBAL-TOP2",
    category: "security",
    icon: <Award size={22} className="text-red-400" />,
    color: "red",
    desc: "Ranked in the Top 2% globally on TryHackMe (Level 12 [GURU], World Rank: #42,194, 115+ completed rooms, 122-day streak, 23 badges, Diamond League).",
    mainFile: "THM-Advent of Cyber 2022 PARTH.pdf",
    mainLabel: "🏆 View TryHackMe Certificate & Profile",
  },

  // 11. EY GDS Cybersecurity Simulation
  {
    title: "EY GDS — Cybersecurity Job Simulation",
    issuer: "EY (Ernst & Young) / Forage",
    abbr: "EY-CYBER",
    category: "internship",
    icon: <Briefcase size={22} className="text-yellow-400" />,
    color: "yellow",
    desc: "Conducted simulated enterprise threat hunting, CVSS vulnerability prioritization, and incident response executive documentation for client infrastructure.",
    mainFile: "EY_PARTH RAJENDRA PANDEY_EY.pdf",
    mainLabel: "🏆 View EY GDS Simulation Certificate",
  },

  /* ══════════════════════════ ACADEMIC & MERIT ════════════════════════════ */

  // 12. GATE 2026 Score Card
  {
    title: "GATE 2026 — Score Card (CS/IT)",
    issuer: "GATE — Ministry of Education, India",
    abbr: "GATE-2026",
    category: "academic",
    icon: <Award size={22} className="text-purple-400" />,
    color: "purple",
    desc: "Score: 355 — Graduate Aptitude Test in Engineering in Computer Science & Information Technology.",
    mainFile: "CS26S42062430_ScoreCard Gate Score card.pdf",
    mainLabel: "🏆 View GATE Score Card",
  },

  // 13. NPTEL Data Analytics (Elite)
  {
    title: "NPTEL: Data Analytics with Python (Elite)",
    issuer: "NPTEL / IIT (Swayam)",
    abbr: "NPTEL-DA",
    category: "academic",
    icon: <BookOpen size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Elite designation (72%) — Rigorous examination in statistical data analytics, pandas, NumPy, and machine learning pipelines.",
    mainFile: "Data Analytics with Python (3).pdf",
    mainLabel: "🏆 View NPTEL Elite Certificate",
  },

  // 14. NPTEL Social Networks (Elite)
  {
    title: "NPTEL: Social Networks (Elite)",
    issuer: "NPTEL / IIT (Swayam)",
    abbr: "NPTEL-SN",
    category: "academic",
    icon: <BookOpen size={22} className="text-emerald-400" />,
    color: "emerald",
    desc: "Elite designation (70%) — Graph theory, centrality measures, network topology resilience, and community detection algorithms.",
    mainFile: "Social Networks (3).pdf",
    mainLabel: "🏆 View NPTEL Elite Certificate",
  },

  // 15. Python Full Stack Developer (EduSkills & Edunet)
  {
    title: "Python Full Stack Developer Program",
    issuer: "EduSkills & Edunet Foundation / AICTE",
    abbr: "PYTHON-FULLSTACK",
    category: "cloud",
    icon: <Cloud size={22} className="text-blue-400" />,
    color: "blue",
    desc: "Comprehensive dual certification in full-stack Python development, REST API engineering, Django/FastAPI frameworks, and cloud deployment pipelines.",
    mainFile: "PARTH RAJENDRA  PANDEY_Certificate (1) python full stack eduskill.pdf",
    mainLabel: "🏆 View EduSkills Certificate",
    subBadge: "2 Certificates Included",
    subCerts: [
      {
        title: "Python Full Stack Developer — Edunet Foundation",
        file: "PARTH RAJENDRA PANDEY 587221 (python full stack developer from edunet) .pdf",
        tag: "Edunet AICTE Credential",
      },
    ],
  },

  // 16. Altair Data Science Master Internship
  {
    title: "Altair — Data Science Master Internship",
    issuer: "Altair Engineering / Edunet",
    abbr: "ALTAIR-DS",
    category: "internship",
    icon: <Briefcase size={22} className="text-purple-400" />,
    color: "purple",
    desc: "Data science master internship covering machine learning pipelines, predictive modeling, and automated engineering analytics.",
    mainFile: "PARTH RAJENDRA  PANDEY 687206 (data Science master intership altair) .pdf",
    mainLabel: "🏆 View Altair Master Certificate",
  },

  // 17. Shell AIDA AI & Data Analytics Internship
  {
    title: "Shell — AIDA Internship (Edunet AICTE)",
    issuer: "Shell / AIDA / Edunet / AICTE",
    abbr: "SHELL-AIDA",
    category: "internship",
    icon: <Briefcase size={22} className="text-amber-400" />,
    color: "amber",
    desc: "Artificial Intelligence and Data Analytics virtual internship completed in collaboration with Shell and Edunet Foundation.",
    mainFile: "Parth Rajendra Pandey_AICTE_Certificate AIDA Shell Edunet.pdf",
    mainLabel: "🏆 View Shell AIDA Certificate",
  },

  // 18. IBM SkillsBuild Cybersecurity
  {
    title: "IBM SkillsBuild — AICTE Cybersecurity Internship",
    issuer: "IBM SkillsBuild / Edunet / AICTE",
    abbr: "IBM-CYBER",
    category: "internship",
    icon: <Briefcase size={22} className="text-blue-400" />,
    color: "blue",
    desc: "AICTE Professional Development credential validating completion of the IBM SkillsBuild practical cybersecurity track.",
    mainFile: "AICTE B4 PD Certificates-1069 Completion of intership Parth Cybersecurity Edunet IbmSkillbuild.pdf",
    mainLabel: "🏆 View IBM AICTE Certificate",
  },

  /* ══════════════════════════ PUBLICATIONS & EVENTS ════════════════════════ */

  // 19. Research Publications & Conferences (Program Bundle)
  {
    title: "Peer-Reviewed Research Publications & Conferences",
    issuer: "IRJAEH & International Conferences",
    abbr: "PUBLICATIONS-SUITE",
    category: "publications",
    icon: <FileText size={22} className="text-violet-400" />,
    color: "violet",
    desc: "Published peer-reviewed research paper in IRJAEH (Vol. 4, Issue 4, pp. 1641-1645) on AI Yoga Pose Detection, author's publication certificate, and international conference presentations.",
    mainFile: "IRJAEH-04-04-0215-2604084-1641-1645.pdf",
    mainLabel: "🏆 View Published Research Paper (PDF)",
    subBadge: "3 Publication Documents Included",
    subCerts: [
      {
        title: "IRJAEH — Author's Certificate of Publication",
        file: "Parth Pandey_certificate irjaeh.pdf",
        tag: "Author Publication Certificate",
      },
      {
        title: "ICTTSEM-25 — International Conference Presentation",
        file: "Parth Pandey Mass email certificate publication.png",
        tag: "Conference Presentation",
      },
      {
        title: "IPR — Intellectual Property Rights Event Certificate",
        file: "IPR_EVENT.pdf",
        tag: "AICTE IPR Certification",
      },
    ],
  },

  // 20. Institutional & Competition Merit
  {
    title: "Institutional Honors & Competition Merit",
    issuer: "ICESM 2026, YCCE & ACET",
    abbr: "HONORS-SUITE",
    category: "academic",
    icon: <Award size={22} className="text-amber-400" />,
    color: "amber",
    desc: "Merit award from ICESM 2026, institutional achievement honors from YCCE, and Code Clash competitive programming certificate.",
    mainFile: "Mr. Parth Rajendra Pandey_certificate icesm.pdf",
    mainLabel: "🏆 View ICESM Certificate of Merit",
    subBadge: "3 Merit Certificates Included",
    subCerts: [
      {
        title: "YCCE — Institutional Achievement Certificate",
        file: "Parth Pandey_ Anjuman College of Engineering and Technology.pdf",
        tag: "Academic Achievement",
      },
      {
        title: "Code Clash — Competitive Programming Certificate",
        file: "Parth Pandey Code Clash Participation Certificarte.pdf",
        tag: "Competitive Programming",
      },
      {
        title: "Ennovate 25 — National Hackathon Certificate",
        file: "Parth Pandey Ennovate 25 Mass email.jpg",
        tag: "Hackathon Event",
      },
    ],
  },
];

const FILTERS = ["all", "security", "cloud", "academic", "internship", "publications"];

const FILTER_LABELS = {
  all: "All Credentials",
  security: "Security & Defense",
  cloud: "Cloud & Systems",
  academic: "Academic & Honors",
  internship: "Virtual Internships",
  publications: "Publications & Research",
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
};

const CATEGORY_ACCENT = {
  security:     "text-emerald-400",
  cloud:        "text-yellow-400",
  academic:     "text-purple-400",
  internship:   "text-cyan-400",
  publications: "text-violet-400",
};

export default function CredentialGrid() {
  const [filter, setFilter] = useState("all");
  const [expandedFolders, setExpandedFolders] = useState({});

  const toggleFolder = (abbr) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [abbr]: !prev[abbr],
    }));
  };

  const displayed =
    filter === "all" ? ALL_CREDS : ALL_CREDS.filter((c) => c.category === filter);

  const countFor = (f) =>
    f === "all" ? ALL_CREDS.length : ALL_CREDS.filter((c) => c.category === f).length;

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Intro info banner */}
      <div className="mb-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Sparkles size={14} className="text-emerald-400" />
          <span>
            <strong className="text-slate-200">Hierarchical Credential Architecture:</strong> Major programs bundle the final internship/specialization credential with nested course modules.
          </span>
        </span>
        <span className="font-mono text-emerald-400 text-[11px]">
          {ALL_CREDS.length} Master Programs · 35+ Sub-Certificates
        </span>
      </div>

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <AnimatePresence mode="popLayout">
          {displayed.map((cred, i) => {
            const isExpanded = !!expandedFolders[cred.abbr];
            const hasSubCerts = cred.subCerts && cred.subCerts.length > 0;

            return (
              <motion.div
                key={cred.abbr}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className="h-full"
              >
                <div
                  className={`glass-card rounded-2xl p-6 border h-full flex flex-col gap-4 transition-all duration-300 ${colorMap[cred.color] ?? ""}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-slate-800/90 border border-slate-700/60 shrink-0">
                        {cred.icon}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-100 text-base leading-snug">
                          {cred.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{cred.issuer}</p>
                      </div>
                    </div>
                  </div>

                  {/* Program Badge */}
                  {cred.subBadge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-cyan-300 w-fit">
                      <Folder size={12} className="text-cyan-400" />
                      {cred.subBadge}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs text-slate-400 leading-relaxed flex-1">{cred.desc}</p>

                  {/* Primary Action Button */}
                  <div className="pt-2">
                    <a
                      href={cert(cred.mainFile)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 text-emerald-300 hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400 transition-all shadow-sm"
                    >
                      <ExternalLink size={13} />
                      {cred.mainLabel}
                    </a>
                  </div>

                  {/* Sub-Certificates Expandable Accordion */}
                  {hasSubCerts && (
                    <div className="border-t border-slate-800/80 pt-3">
                      <button
                        onClick={() => toggleFolder(cred.abbr)}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all group"
                      >
                        <span className="flex items-center gap-2">
                          {isExpanded ? (
                            <FolderOpen size={14} className="text-amber-400" />
                          ) : (
                            <Folder size={14} className="text-amber-400/80 group-hover:text-amber-400" />
                          )}
                          <span>
                            {isExpanded ? "Hide Course Modules" : `View ${cred.subCerts.length} Course Sub-Modules`}
                          </span>
                        </span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>

                      {/* Nested Sub-Certificates List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="mt-3 overflow-hidden"
                          >
                            <div className="space-y-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 max-h-72 overflow-y-auto">
                              <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">
                                // Nested Course Certificates ({cred.subCerts.length})
                              </p>
                              {cred.subCerts.map((sub, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 transition-all text-xs"
                                >
                                  <div className="min-w-0 pr-2">
                                    <p className="font-medium text-slate-200 text-xs truncate">
                                      {sub.title}
                                    </p>
                                    <span className="inline-block text-[10px] font-mono text-slate-500 mt-0.5">
                                      {sub.tag}
                                    </span>
                                  </div>
                                  <a
                                    href={cert(sub.file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 border border-slate-700/60 transition-colors w-fit"
                                  >
                                    <ExternalLink size={10} />
                                    View PDF
                                  </a>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* Card category pill */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/50 text-[11px] font-mono text-slate-500 mt-auto">
                    <span className={`uppercase tracking-wider ${CATEGORY_ACCENT[cred.category] ?? "text-slate-500"}`}>
                      {cred.category}
                    </span>
                    <span className="text-slate-600 font-mono">#{cred.abbr}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
