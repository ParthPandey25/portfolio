"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Mail, Phone, ChevronRight, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";

const COMMANDS = [
  {
    cmd: "./whoami.sh",
    output: (
      <div className="space-y-1 text-slate-300 leading-relaxed">
        <p>
          <span className="text-cyan-400">Role:</span> Network &amp; Security AI Engineer L2 Plus
        </p>
        <p>
          <span className="text-cyan-400">Focus:</span> Blue Team SOC · Zero Trust · SIEM · Enterprise Firewalls
        </p>
        <p className="text-slate-400 text-xs mt-2 max-w-lg">
          Results-driven engineer with hands-on enterprise firewall experience (Check Point Gaia, Palo Alto), 
          TCP/IP packet analysis, and AWS cloud security. Building SIEM (Splunk) and MITRE ATT&amp;CK competencies.
        </p>
      </div>
    ),
  },
  {
    cmd: "./contact.sh",
    output: (
      <div className="space-y-1.5">
        <p className="flex items-center gap-2 text-sm">
          <Mail size={13} className="text-emerald-400" />
          <a href="mailto:parthrspandey25@gmail.com" className="text-slate-300 hover:text-emerald-400 transition-colors">
            parthrspandey25@gmail.com
          </a>
        </p>
        <p className="flex items-center gap-2 text-sm">
          <Phone size={13} className="text-emerald-400" />
          <span className="text-slate-300">+91-9755591720</span>
        </p>
        <p className="flex items-center gap-2 text-sm">
          <GithubIcon size={13} className="text-emerald-400" />
          <a href="https://github.com/ParthPandey25" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 transition-colors">
            github.com/ParthPandey25
          </a>
        </p>
        <p className="flex items-center gap-2 text-sm">
          <LinkedinIcon size={13} className="text-emerald-400" />
          <a href="https://linkedin.com/in/parth-pandey-045709258" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-emerald-400 transition-colors">
            linkedin.com/in/parth-pandey-045709258
          </a>
        </p>
      </div>
    ),
  },
  {
    cmd: "./academics.sh",
    output: (
      <div className="space-y-1 text-sm">
        <p><span className="text-cyan-400">Degree:</span> <span className="text-slate-300">B.Tech CSE — Anjuman College of Engineering &amp; Technology</span></p>
        <p><span className="text-cyan-400">CGPA:</span> <span className="text-emerald-400 font-bold">8.3 / 10</span></p>
        <p><span className="text-cyan-400">GATE Score:</span> <span className="text-emerald-400 font-bold">355</span></p>
        <p><span className="text-cyan-400">Graduation:</span> <span className="text-slate-300">May 2026</span></p>
      </div>
    ),
  },
  {
    cmd: "./status.sh",
    output: (
      <div className="space-y-1 text-sm">
        <p className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
          <span className="text-emerald-400 font-semibold">ACTIVELY SEEKING:</span>
          <span className="text-slate-300">Blue Team SOC Analyst / Security Engineer roles</span>
        </p>
        <p><span className="text-cyan-400">Current build:</span> <span className="text-slate-300">Home SOC Lab — Splunk SIEM + AWS CloudTrail ingestion</span></p>
        <p><span className="text-cyan-400">Location:</span> <span className="text-slate-300">India (Open to Remote)</span></p>
      </div>
    ),
  },
];

export default function TerminalHero() {
  const fullName = "Parth Pandey";
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState("typing"); // typing | idle | executing
  const [activeCmd, setActiveCmd] = useState(null);
  const [executedOutputs, setExecutedOutputs] = useState([]);

  // Type the name character by character
  useEffect(() => {
    if (phase !== "typing") return;
    let i = 0;
    const iv = setInterval(() => {
      if (i < fullName.length) {
        setTypedText(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(iv);
        setTimeout(() => setPhase("idle"), 400);
      }
    }, 110);
    return () => clearInterval(iv);
  }, [phase]);

  const runCommand = (cmd) => {
    setActiveCmd(cmd.cmd);
    setTimeout(() => {
      setExecutedOutputs((prev) => [...prev, cmd]);
      setActiveCmd(null);
    }, 600);
  };

  const clearTerminal = () => {
    setExecutedOutputs([]);
    setActiveCmd(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 md:my-16 px-4">
      <div className="bg-slate-900/90 border border-slate-700/60 rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-md">
          {/* Terminal title bar */}
          <div className="bg-slate-800/80 px-4 py-3 flex items-center gap-3 border-b border-slate-700/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/90" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <div className="w-3 h-3 rounded-full bg-green-500/90" />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Terminal size={12} />
                parth@portfolio — bash — 120×40
              </span>
            </div>
            {executedOutputs.length > 0 && (
              <button
                onClick={clearTerminal}
                className="text-xs text-slate-500 hover:text-slate-300 font-mono transition-colors"
              >
                clear
              </button>
            )}
          </div>

          {/* Terminal body */}
          <div className="p-5 md:p-7 font-mono text-sm min-h-[340px] max-h-[520px] overflow-y-auto scanlines">
            {/* Initial whoami prompt */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-emerald-400 font-bold text-xs">parth@portfolio:~$</span>
              <span className="text-slate-200 font-semibold">whoami</span>
            </div>

            {/* Typed name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <span className="text-3xl md:text-4xl font-extrabold gradient-text tracking-tight">
                {typedText}
              </span>
              {phase === "typing" && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.7 }}
                  className="ml-1 inline-block w-[3px] h-8 bg-emerald-400 align-middle"
                />
              )}
            </motion.div>

            {/* After typing: show available commands */}
            {phase === "idle" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-slate-500 text-xs mb-3">
                  — Available commands (click to run):
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {COMMANDS.map((c) => (
                    <button
                      key={c.cmd}
                      onClick={() => runCommand(c)}
                      disabled={activeCmd !== null}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 bg-slate-800/60 text-emerald-400 hover:bg-slate-700 hover:border-emerald-500/40 transition-all text-xs font-mono disabled:opacity-50"
                    >
                      <ChevronRight size={11} />
                      {c.cmd}
                    </button>
                  ))}
                </div>

                {/* Executed outputs history */}
                <div className="space-y-4">
                  {executedOutputs.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-emerald-400 font-bold text-xs">parth@portfolio:~$</span>
                        <span className="text-slate-300">{item.cmd}</span>
                      </div>
                      <div className="pl-4 border-l-2 border-emerald-500/30">
                        {item.output}
                      </div>
                    </motion.div>
                  ))}

                  {/* Executing spinner */}
                  {activeCmd && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span className="text-emerald-400 font-bold">parth@portfolio:~$</span>
                      <span className="text-slate-300">{activeCmd}</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="w-1.5 h-3.5 bg-emerald-400 inline-block ml-1"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </div>

          {/* Quick social row */}
          <div className="border-t border-slate-800 px-5 md:px-7 py-3 flex items-center gap-4 bg-slate-950/50">
            <span className="text-xs text-slate-600 font-mono">// quick links</span>
            <a href="https://github.com/ParthPandey25" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
              <GithubIcon size={13} /> GitHub
            </a>
            <a href="https://linkedin.com/in/parth-pandey-045709258" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors">
              <LinkedinIcon size={13} /> LinkedIn
            </a>
            <a href="mailto:parthrspandey25@gmail.com"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors">
              <Mail size={13} /> Email
            </a>
            <a href="/resume.pdf" download
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/30 px-3 py-1.5 rounded-md hover:border-emerald-400/60 hover:bg-emerald-500/10">
              <ExternalLink size={12} /> Download CV
            </a>
          </div>
      </div>
    </div>
  );
}
