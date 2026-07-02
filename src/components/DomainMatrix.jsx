"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Cloud, Cpu, Activity } from "lucide-react";
import TiltCard from "./TiltCard";

const domains = [
  {
    title: "SIEM & SOC Blue Team",
    icon: <Activity size={30} className="text-emerald-400" />,
    color: "emerald",
    tags: ["Splunk", "MITRE ATT&CK", "NIST IR", "Threat Triage", "Log Correlation", "EDR/XDR"],
    description:
      "Building SOC capabilities with Splunk SPL detection rules mapped to MITRE ATT&CK techniques. Incident response workflows and threat triage for enterprise environments.",
  },
  {
    title: "Cybersecurity & Firewalls",
    icon: <ShieldCheck size={30} className="text-cyan-400" />,
    color: "cyan",
    tags: ["Check Point CCSA/CCVS", "Palo Alto NGFW", "Zscaler ZTNA", "Fortinet Fabric", "Zero Trust"],
    description:
      "Enterprise-grade firewall deployment (Check Point Gaia, Palo Alto Strata/Cortex), ZTNA/SASE security models, and multi-tier VPN topology management.",
  },
  {
    title: "Cloud Security (AWS & GCP)",
    icon: <Cloud size={30} className="text-blue-400" />,
    color: "blue",
    tags: ["AWS IAM", "CloudTrail", "VPC", "SES", "Lambda", "GCP", "Security Architecture"],
    description:
      "Designing secure cloud architectures with IAM trust policies, CloudTrail ingestion, VPC Flow Logs analysis, and cross-account AWS data pipelines.",
  },
  {
    title: "Network Engineering",
    icon: <Cpu size={30} className="text-purple-400" />,
    color: "purple",
    tags: ["C++ / libpcap", "TCP/IP", "GNS3", "Wireshark", "Cisco", "Packet Analysis"],
    description:
      "Low-level network packet analysis using C++ and libpcap. Enterprise network simulation with GNS3, Cisco Packet Tracer, and real-time traffic inspection.",
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
