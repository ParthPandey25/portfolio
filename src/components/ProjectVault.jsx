"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Network,
  Shield,
  Cpu,
  Globe,
  ExternalLink,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import TiltCard from "./TiltCard";
import Link from "next/link";

const projects = [
  {
    title: "Home SOC Lab: Splunk SIEM & AWS CloudTrail",
    description:
      "Orchestrating a local SOC environment ingesting AWS CloudTrail and VPC Flow Logs into Splunk. Custom SPL detection rules mapped to MITRE ATT&CK techniques (T1078, T1110) for brute-force alerting and rapid incident triage.",
    icon: <Network className="text-emerald-400" size={26} />,
    color: "emerald",
    tags: ["Splunk", "AWS CloudTrail", "MITRE ATT&CK", "SPL", "VPC Flow Logs"],
    status: "in-progress",
    github: "https://github.com/CodParth",
  },
  {
    title: "Distributed Enterprise Firewall Topology",
    description:
      "Modeled a highly available multi-branch corporate network with 3 redundant Check Point VSX infrastructure layers, isolated virtual switch networks, and Cisco ASA gateways inside GNS3 sandboxes.",
    icon: <Shield className="text-cyan-400" size={26} />,
    color: "cyan",
    tags: ["Check Point Gaia", "Cisco", "GNS3", "Python", "Zero Trust"],
    status: "completed",
    github: "https://github.com/CodParth",
  },
  {
    title: "High-Performance Packet Analyzer",
    description:
      "Native multi-threaded C++ traffic sniffer using libpcap. Decodes real-time packet structures with sub-millisecond latency, parses network headers, and applies rule-based kernel filtering logic.",
    icon: <Cpu className="text-purple-400" size={26} />,
    color: "purple",
    tags: ["C++", "libpcap", "Linux", "TCP/IP", "Multi-threading"],
    status: "completed",
    github: "https://github.com/CodParth",
  },
  {
    title: "Full-Stack Web Clones (BookMyShow, Zomato)",
    description:
      "Multi-tier full-stack application mirrors using MERN stack with optimised state handling on the frontend and asynchronous backend database engines to drive low-latency transactional flows.",
    icon: <Globe className="text-blue-400" size={26} />,
    color: "blue",
    tags: ["MERN Stack", "React.js", "Node.js", "MongoDB", "REST APIs"],
    status: "completed",
    github: "https://github.com/CodParth",
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
                        className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        <GithubIcon size={14} /> GitHub
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
        transition={{ delay: 0.5 }}
        className="mt-10 text-center"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all font-medium text-sm"
        >
          <ExternalLink size={15} />
          View All Projects
        </Link>
      </motion.div>
    </div>
  );
}
