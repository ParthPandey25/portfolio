"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cloud, Cpu, Activity, Terminal, Lock } from "lucide-react";
import TiltCard from "./TiltCard";

const domains = [
  {
    title: "Reconnaissance & Threat Intelligence",
    icon: <Terminal size={30} className="text-red-400" />,
    color: "red",
    tags: ["Nmap", "Amass", "Subfinder", "theHarvester", "Shodan", "Port Auditing", "NSE Scripts"],
    description:
      "Active and passive network reconnaissance, OSINT attack-surface discovery, automated subdomain enumeration, and port vulnerability mapping across Metasploitable targets.",
  },
  {
    title: "Web Security & Penetration Testing",
    icon: <Lock size={30} className="text-emerald-400" />,
    color: "emerald",
    tags: ["Burp Suite", "OWASP ZAP", "Nikto", "Gobuster", "SQLmap", "PortSwigger", "OWASP Top 10"],
    description:
      "Web vulnerability assessment and DAST security audits. Hands-on testing for SQL injection, directory brute-forcing, XSS, SSRF, IDOR/BOLA, and API authorization controls.",
  },
  {
    title: "Network Security & Traffic Inspection",
    icon: <Cpu size={30} className="text-purple-400" />,
    color: "purple",
    tags: ["Wireshark", "tcpdump", "Zeek", "Suricata", "Snort", "C++17 libpcap", "PCAP Dissection"],
    description:
      "Deep packet inspection, raw socket dissection, protocol decoding (TCP/IP, DNS, TLS), signature-based IDS/IPS alert rules, and high-performance network traffic telemetry.",
  },
  {
    title: "Blue Team / SOC & SIEM Operations",
    icon: <Activity size={30} className="text-cyan-400" />,
    color: "cyan",
    tags: ["Splunk SIEM", "Wazuh", "Elastic Security", "Microsoft Sentinel", "Security Onion", "MITRE ATT&CK"],
    description:
      "Enterprise security monitoring, SPL detection correlation pipelines, AWS CloudTrail & VPC Flow log ingestion, MITRE ATT&CK adversary mapping, and L1/L2 incident triage.",
  },
  {
    title: "Digital Forensics & Reverse Engineering",
    icon: <ShieldCheck size={30} className="text-amber-400" />,
    color: "amber",
    tags: ["Autopsy", "FTK Imager", "Volatility", "Plaso", "Ghidra", "Memory Forensics", "Linux IR"],
    description:
      "Host-based artifact triage, disk imaging, volatile memory forensics, malware decompilation with Ghidra, timeline analysis with Plaso, and Linux post-compromise incident analysis.",
  },
  {
    title: "Zero Trust & Enterprise Cloud Defense",
    icon: <Cloud size={30} className="text-blue-400" />,
    color: "blue",
    tags: ["Zscaler ZTNA (Grade 'O')", "Palo Alto NGFW", "Check Point Gaia", "Fortinet FortiGate", "AWS CloudTrail"],
    description:
      "Architecting zero-trust access (Zscaler ZPA/ZIA), next-gen firewall multi-zone perimeters (Check Point CCSA, FortiGate 7.4), and hardened cloud infrastructure with IAM least privilege.",
  },
];

const colorMap = {
  emerald: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)]",
    border: "hover:border-emerald-500/50",
    tag: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: "bg-emerald-500/10 border-emerald-500/20",
  },
  cyan: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(6,182,212,0.3)]",
    border: "hover:border-cyan-500/50",
    tag: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    icon: "bg-cyan-500/10 border-cyan-500/20",
  },
  blue: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(59,130,246,0.3)]",
    border: "hover:border-blue-500/50",
    tag: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "bg-blue-500/10 border-blue-500/20",
  },
  purple: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(168,85,247,0.3)]",
    border: "hover:border-purple-500/50",
    tag: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    icon: "bg-purple-500/10 border-purple-500/20",
  },
  red: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(239,68,68,0.3)]",
    border: "hover:border-red-500/50",
    tag: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: "bg-red-500/10 border-red-500/20",
  },
  amber: {
    glow: "hover:shadow-[0_20px_50px_-10px_rgba(245,158,11,0.3)]",
    border: "hover:border-amber-500/50",
    tag: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: "bg-amber-500/10 border-amber-500/20",
  },
};

export default function DomainMatrix() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {domains.map((domain, index) => {
          const c = colorMap[domain.color];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard>
                <div
                  className={`glass-card rounded-2xl p-7 h-full flex flex-col gap-5 border border-slate-800/60 transition-all duration-300 cursor-default ${c.border} ${c.glow}`}
                >
                  {/* Icon + Title */}
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl border ${c.icon} shrink-0`}>
                      {domain.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 leading-tight">
                        {domain.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {domain.description}
                      </p>
                    </div>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {domain.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2.5 py-1 rounded-full text-xs font-mono border ${c.tag}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
