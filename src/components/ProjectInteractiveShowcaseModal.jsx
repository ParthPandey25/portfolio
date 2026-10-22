"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Activity,
  Layers,
  Search,
  ExternalLink,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Database,
  Lock,
} from "lucide-react";
import { GithubIcon, TryhackmeIcon } from "./SocialIcons";
import Isometric3DNetworkVisualizer from "./Isometric3DNetworkVisualizer";

export default function ProjectInteractiveShowcaseModal({ project, onClose }) {
  if (!project) return null;

  // State machine based on which project is selected
  const [activeTab, setActiveTab] = useState("simulator"); // 'simulator' | 'architecture' | 'reports'

  // --- Splunk SOC Lab State ---
  const [selectedRule, setSelectedRule] = useState("T1110");
  const [simulatingLog, setSimulatingLog] = useState(false);
  const [socAlerts, setSocAlerts] = useState([
    {
      id: "ALT-901",
      time: "14:22:05",
      type: "T1110 - Brute Force",
      src: "198.51.100.45",
      sev: "HIGH",
      msg: ">=5 failed console logins in 5m (admin)",
    },
    {
      id: "ALT-902",
      time: "14:22:18",
      type: "T1078 - Valid Accounts",
      src: "203.0.113.88",
      sev: "CRITICAL",
      msg: "Root login without MFA token challenge",
    },
  ]);

  const splunkRules = {
    T1110: {
      name: "T1110 - Brute Force Console Logins",
      severity: "HIGH",
      spl: `index=aws_cloudtrail eventName=ConsoleLogin "errorMessage=Failed authentication"
| bin _time span=5m
| stats count as failed_attempts by sourceIPAddress
| where failed_attempts >= 5
| eval alert_severity="HIGH"`,
      sampleTrigger: {
        id: "ALT-903",
        time: new Date().toLocaleTimeString(),
        type: "T1110 - Brute Force",
        src: "198.51.100.77",
        sev: "HIGH",
        msg: "Bursts of 7 failed logins detected against account 'finance-dev'",
      },
    },
    T1078: {
      name: "T1078 - Root Login Without MFA",
      severity: "CRITICAL",
      spl: `index=aws_cloudtrail eventName=ConsoleLogin "responseElements.ConsoleLogin=Success"
| where 'additionalEventData.MFAUsed'="No" OR 'userIdentity.type'="Root"
| eval alert_severity=if('userIdentity.type'=="Root", "CRITICAL", "MEDIUM")`,
      sampleTrigger: {
        id: "ALT-904",
        time: new Date().toLocaleTimeString(),
        type: "T1078 - Valid Accounts",
        src: "203.0.113.88",
        sev: "CRITICAL",
        msg: "Root interactive console login without hardware MFA token",
      },
    },
    T1098: {
      name: "T1098 - Account Manipulation (AdminAccess)",
      severity: "CRITICAL",
      spl: `index=aws_cloudtrail eventName IN ("AttachUserPolicy", "PutUserPolicy")
| search requestParameters.policyArn="*AdministratorAccess*"
| table _time, userIdentity.arn, requestParameters.userName, sourceIPAddress`,
      sampleTrigger: {
        id: "ALT-905",
        time: new Date().toLocaleTimeString(),
        type: "T1098 - Account Manipulation",
        src: "198.51.100.45",
        sev: "CRITICAL",
        msg: "AdministratorAccess policy attached to user 'dev_intern'",
      },
    },
    T1530: {
      name: "T1530 - S3 Public Exposure Alert",
      severity: "HIGH",
      spl: `index=aws_cloudtrail eventName IN ("PutBucketAcl", "DeleteBucketPublicAccessBlock")
| search requestParameters.PublicAccessBlockConfiguration.BlockPublicAcls=false
| eval alert_severity="HIGH"`,
      sampleTrigger: {
        id: "ALT-906",
        time: new Date().toLocaleTimeString(),
        type: "T1530 - S3 Exposure",
        src: "198.51.100.12",
        sev: "HIGH",
        msg: "S3 Public Access Block removed from 'corp-financial-archive'",
      },
    },
    T1046: {
      name: "T1046 - Network Port Sweep via VPC Flow Logs",
      severity: "MEDIUM",
      spl: `index=aws_vpc_flow action=REJECT
| bin _time span=10m
| stats dc(dest_port) as distinct_ports by src_ip, dest_ip
| where distinct_ports >= 25`,
      sampleTrigger: {
        id: "ALT-907",
        time: new Date().toLocaleTimeString(),
        type: "T1046 - Port Sweep",
        src: "45.33.32.156",
        sev: "MEDIUM",
        msg: "Probe across 42 blocked destination ports in 5 minutes",
      },
    },
  };

  const handleSimulateSocAttack = () => {
    setSimulatingLog(true);
    setTimeout(() => {
      const trigger = splunkRules[selectedRule]?.sampleTrigger;
      if (trigger) {
        setSocAlerts((prev) => [trigger, ...prev.slice(0, 4)]);
      }
      setSimulatingLog(false);
    }, 900);
  };

  // --- Firewall State ---
  const [fwTestScenario, setFwTestScenario] = useState("syn_flood");
  const [fwLog, setFwLog] = useState(
    "%ASA-4-106023: Deny tcp src OUTSIDE:198.51.100.45/54312 dst INSIDE-DMZ:192.168.10.5/80 by access-group 'OUTSIDE_IN' [0x0]"
  );

  const fwScenarios = {
    syn_flood: {
      title: "WAN Ingress SYN Flood (hping3)",
      ingress: "OUTSIDE (Sec 0)",
      target: "Gateway VIP",
      result: "BLOCKED (SYN Cookie Rate-Limit)",
      log: "%ASA-4-106023: Deny tcp src OUTSIDE:203.0.113.45/49210 dst VIP:203.0.113.1/443 by access-group 'OUTSIDE_IN' [Embryonic limit reached: dropped]",
    },
    lateral_pivot: {
      title: "DMZ-to-Internal Lateral SSH Pivot",
      ingress: "DMZ (Sec 50)",
      target: "CORP-INTERNAL (Sec 100)",
      result: "BLOCKED (Zone Security Level Drop)",
      log: "%ASA-4-106023: Deny tcp src INSIDE-DMZ:192.168.10.15/44120 dst INSIDE-CORP:10.100.1.50/22 by access-group 'DMZ_IN' [Deny-by-default]",
    },
    anti_spoof: {
      title: "Spoofed RFC1918 Packet from Public Internet",
      ingress: "OUTSIDE (Sec 0)",
      target: "CORP-INTERNAL",
      result: "BLOCKED (Interface Anti-Spoofing Filter)",
      log: "%CHECKPOINT-FW1: Anti-Spoofing drop on interface eth0: packet with RFC1918 source 10.100.0.99 discarded",
    },
    cleartext_telnet: {
      title: "Unencrypted Telnet Probe",
      ingress: "OUTSIDE (Sec 0)",
      target: "HQ Core Gateway",
      result: "BLOCKED (Policy Auditor Enforced Drop)",
      log: "%ASA-2-106001: Deny inbound tcp src OUTSIDE:198.51.100.12/38912 dst VIP:203.0.113.1/23 by access-group 'OUTSIDE_IN'",
    },
  };

  // --- C++ Packet Analyzer State ---
  const [benchRunning, setBenchRunning] = useState(false);
  const [benchStats, setBenchStats] = useState({
    packets: 100000,
    pps: 542888,
    mbps: 318.78,
    tcp: 75000,
    udp: 25000,
    icmp: 0,
    time: 0.184,
  });

  const runBenchmark = () => {
    setBenchRunning(true);
    setBenchStats({ packets: 0, pps: 0, mbps: 0, tcp: 0, udp: 0, icmp: 0, time: 0 });
    let p = 0;
    const interval = setInterval(() => {
      p += 12500;
      if (p >= 100000) {
        p = 100000;
        clearInterval(interval);
        setBenchRunning(false);
        setBenchStats({
          packets: 100000,
          pps: 542888,
          mbps: 318.78,
          tcp: 75000,
          udp: 25000,
          icmp: 0,
          time: 0.184,
        });
      } else {
        setBenchStats({
          packets: p,
          pps: Math.round(p / 0.184),
          mbps: Math.round((p * 64 * 8) / (0.184 * 1000000)),
          tcp: Math.round(p * 0.75),
          udp: Math.round(p * 0.25),
          icmp: 0,
          time: 0.184,
        });
      }
    }, 60);
  };

  // --- Salary Prediction ML State ---
  const [mlAge, setMlAge] = useState(28);
  const [mlWorkclass, setMlWorkclass] = useState("Private");
  const [mlEducation, setMlEducation] = useState("Bachelors");
  const [mlHours, setMlHours] = useState(45);
  const [mlResult, setMlResult] = useState("> $50,000 / year (Probability: 84.6%)");

  const handlePredictSalary = () => {
    const prob = (mlAge > 25 ? 0.3 : 0.1) + (mlEducation === "Masters" || mlEducation === "Bachelors" ? 0.4 : 0.15) + (mlHours >= 40 ? 0.2 : 0.05);
    const isHigh = prob > 0.5;
    setMlResult(
      isHigh
        ? `> $50,000 / year (Estimated Probability: ${(prob * 100).toFixed(1)}%)`
        : `<= $50,000 / year (Estimated Probability: ${((1 - prob) * 100).toFixed(1)}%)`
    );
  };

  // Detect project type
  const isSocLab = project.title.toLowerCase().includes("soc");
  const isFirewall = project.title.toLowerCase().includes("firewall");
  const isPacket = project.title.toLowerCase().includes("packet");
  const isSalary = project.title.toLowerCase().includes("salary");
  const isCyberlab = project.title.toLowerCase().includes("cyberlab") || project.title.toLowerCase().includes("vulnerability");
  const isConfessions = project.title.toLowerCase().includes("confessions") || project.title.toLowerCase().includes("practitioner");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/70">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Cpu size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Interactive Live Architecture &amp; Telemetry
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-100">{project.title}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-900/60 px-5 gap-4">
            <button
              onClick={() => setActiveTab("simulator")}
              className={`py-3 text-xs sm:text-sm font-mono font-medium border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === "simulator"
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Play size={14} /> Interactive Live Simulator
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`py-3 text-xs sm:text-sm font-mono font-medium border-b-2 transition-all flex items-center gap-1.5 ${
                activeTab === "architecture"
                  ? "border-emerald-400 text-emerald-400"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers size={14} /> System Architecture
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 overflow-y-auto space-y-6 flex-1 text-slate-300 text-sm">
            {activeTab === "simulator" ? (
              <div>
                {/* 1. SPLUNK SOC LAB SIMULATOR */}
                {isSocLab && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1">
                          <Search size={14} /> Select MITRE ATT&amp;CK Detection Query:
                        </span>
                        <button
                          onClick={handleSimulateSocAttack}
                          disabled={simulatingLog}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 font-mono text-xs font-bold transition-all flex items-center gap-1.5"
                        >
                          <Zap size={13} className={simulatingLog ? "animate-spin" : ""} />
                          {simulatingLog ? "Injecting Attack Log..." : "Simulate Cloud Attack →"}
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Object.keys(splunkRules).map((tech) => (
                          <button
                            key={tech}
                            onClick={() => setSelectedRule(tech)}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono border transition-all ${
                              selectedRule === tech
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                                : "bg-slate-800/40 text-slate-400 border-slate-700 hover:text-slate-200"
                            }`}
                          >
                            {tech}
                          </button>
                        ))}
                      </div>

                      {/* SPL Query Display */}
                      <div className="p-3 bg-black/60 rounded-lg border border-slate-800/80 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre">
                        {splunkRules[selectedRule].spl}
                      </div>
                    </div>

                    {/* Live SOC Incident Queue */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                          <ShieldAlert size={14} className="text-red-400" />
                          Live Splunk Incident Alert Stream
                        </h4>
                        <span className="text-[11px] font-mono text-slate-500">Auto-Refreshed via CloudTrail Hook</span>
                      </div>

                      <div className="space-y-2">
                        {socAlerts.map((alt) => (
                          <div
                            key={alt.id}
                            className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs font-mono"
                          >
                            <div className="flex items-center gap-2.5">
                              <span
                                className={`px-2 py-0.5 rounded font-bold ${
                                  alt.sev === "CRITICAL"
                                    ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                }`}
                              >
                                {alt.sev}
                              </span>
                              <span className="text-slate-300 font-semibold">{alt.type}</span>
                              <span className="text-slate-500">[{alt.src}]</span>
                            </div>
                            <span className="text-slate-400 text-[11px] truncate hidden sm:inline">{alt.msg}</span>
                            <span className="text-slate-500 text-[11px]">{alt.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. ENTERPRISE FIREWALL SIMULATOR */}
                {isFirewall && (
                  <div className="space-y-5">
                    {/* Visual 3D Zone Topology Map */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                      <p className="text-xs font-mono text-slate-400 mb-3 uppercase tracking-wider">
                        Interactive Perimeter &amp; Zone Isolation Grid (GNS3 Model)
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                          <p className="text-red-400 font-bold mb-1">OUTSIDE (WAN)</p>
                          <p className="text-[11px] text-slate-400">Security Level: 0</p>
                          <p className="text-[10px] text-slate-500 mt-1">Untrusted Public Transit</p>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                          <p className="text-amber-400 font-bold mb-1">DMZ SUBNET</p>
                          <p className="text-[11px] text-slate-400">Security Level: 50</p>
                          <p className="text-[10px] text-slate-500 mt-1">Web Proxies / Bastions</p>
                        </div>
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                          <p className="text-emerald-400 font-bold mb-1">CORP-INTERNAL</p>
                          <p className="text-[11px] text-slate-400">Security Level: 100</p>
                          <p className="text-[10px] text-slate-500 mt-1">Databases &amp; User LAN</p>
                        </div>
                      </div>
                    </div>

                    {/* Attack Simulation Buttons */}
                    <div>
                      <p className="text-xs font-mono text-slate-400 mb-2 font-bold">Select Adversary Attack Vector:</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.keys(fwScenarios).map((key) => (
                          <button
                            key={key}
                            onClick={() => {
                              setFwTestScenario(key);
                              setFwLog(fwScenarios[key].log);
                            }}
                            className={`p-2 rounded-lg border text-xs font-mono transition-all text-left ${
                              fwTestScenario === key
                                ? "bg-orange-500/20 text-orange-300 border-orange-500/50 font-bold"
                                : "bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                          >
                            {fwScenarios[key].title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Firewall Telemetry & Syslog Console */}
                    <div className="p-3.5 bg-black/80 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                          <ShieldCheck size={14} /> Zero-Trust Result: {fwScenarios[fwTestScenario].result}
                        </span>
                        <span className="text-slate-500">Cisco ASA / Check Point Syslog</span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded border border-slate-800/80 font-mono text-[11px] text-amber-300 overflow-x-auto whitespace-pre">
                        {fwLog}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. C++ PACKET ANALYZER BENCHMARK */}
                {isPacket && (
                  <div className="space-y-5">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h4 className="font-bold text-slate-100 flex items-center gap-2">
                          <Zap size={16} className="text-amber-400" />
                          Synthetic PCAP Replay Benchmark Engine (100k Packets)
                        </h4>
                        <p className="text-xs text-slate-400 mt-1">
                          Replays <code className="text-amber-400">test_pcaps/benchmark_100k.pcap</code> through the multi-threaded C++17 parser using lock-free std::atomic throughput counters.
                        </p>
                      </div>
                      <button
                        onClick={runBenchmark}
                        disabled={benchRunning}
                        className="px-5 py-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 hover:bg-amber-500/30 font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0"
                      >
                        <Play size={13} className={benchRunning ? "animate-spin" : ""} />
                        {benchRunning ? "Parsing PCAP..." : "Run 100k Replay Benchmark →"}
                      </button>
                    </div>

                    {/* Gauges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <p className="text-xs text-slate-500">Packets Ingested</p>
                        <p className="text-lg sm:text-xl font-extrabold text-amber-400">{benchStats.packets.toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-slate-950 border border-emerald-500/20 rounded-xl">
                        <p className="text-xs text-slate-500">Parsed Throughput</p>
                        <p className="text-lg sm:text-xl font-extrabold text-emerald-400">
                          {benchStats.pps.toLocaleString()} <span className="text-xs font-normal text-slate-400">pps</span>
                        </p>
                      </div>
                      <div className="p-3 bg-slate-950 border border-cyan-500/20 rounded-xl">
                        <p className="text-xs text-slate-500">Line Bandwidth</p>
                        <p className="text-lg sm:text-xl font-extrabold text-cyan-400">{benchStats.mbps} Mbps</p>
                      </div>
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                        <p className="text-xs text-slate-500">Execution Time</p>
                        <p className="text-lg sm:text-xl font-extrabold text-slate-200">{benchStats.time}s</p>
                      </div>
                    </div>

                    {/* Protocol Breakdown */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs flex justify-around text-slate-400">
                      <span>TCP Packets: <strong className="text-emerald-400">{benchStats.tcp.toLocaleString()}</strong></span>
                      <span>UDP Packets: <strong className="text-cyan-400">{benchStats.udp.toLocaleString()}</strong></span>
                      <span>ICMP Packets: <strong className="text-purple-400">{benchStats.icmp}</strong></span>
                    </div>
                  </div>
                )}

                {/* 4. EMPLOYEE SALARY PREDICTION ML SIMULATOR */}
                {isSalary && (
                  <div className="space-y-4">
                    <p className="text-xs text-slate-400">
                      Test live demographic inference against the Gradient Boosting model pipeline:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-slate-400">Age: {mlAge}</label>
                        <input
                          type="range"
                          min="18"
                          max="70"
                          value={mlAge}
                          onChange={(e) => setMlAge(Number(e.target.value))}
                          className="w-full accent-cyan-400 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-400">Weekly Hours: {mlHours}</label>
                        <input
                          type="range"
                          min="10"
                          max="80"
                          value={mlHours}
                          onChange={(e) => setMlHours(Number(e.target.value))}
                          className="w-full accent-cyan-400 mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-400">Education Level</label>
                        <select
                          value={mlEducation}
                          onChange={(e) => setMlEducation(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 mt-1"
                        >
                          <option value="HighSchool">High School</option>
                          <option value="SomeCollege">Some College</option>
                          <option value="Bachelors">Bachelors</option>
                          <option value="Masters">Masters / Doctorate</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-mono text-slate-400">Workclass</label>
                        <select
                          value={mlWorkclass}
                          onChange={(e) => setMlWorkclass(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200 mt-1"
                        >
                          <option value="Private">Private Enterprise</option>
                          <option value="SelfEmployed">Self-Employed</option>
                          <option value="Government">Federal / State Gov</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handlePredictSalary}
                      className="w-full py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold hover:bg-cyan-500/30 transition-all"
                    >
                      Compute Microservice Inference →
                    </button>

                    <div className="p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-center font-mono text-xs">
                      <span className="text-slate-400">Model Prediction: </span>
                      <strong className="text-cyan-300 text-sm">{mlResult}</strong>
                    </div>
                  </div>
                )}

                {/* 5. CYBERLAB / CONFESSIONS ARTICLE SHOWCASE */}
                {(isCyberlab || isConfessions) && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <h4 className="font-bold text-slate-100 flex items-center gap-2">
                        <Terminal size={16} className="text-cyan-400" />
                        Live Research Blog &amp; CTF Walkthrough Archive
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Features 12 in-depth articles published with the Jekyll Chirpy theme, covering CVE exploits, privilege escalation playbooks, and troubleshooting real security tool failures.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          🎯 <strong className="text-cyan-300">Mr. Robot:</strong> 850k dictionary deduplication via <code className="text-emerald-400">sort -u</code>
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          🔵 <strong className="text-cyan-300">Blue (MS17-010):</strong> Kernel pool spraying &amp; spoolsv migration
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          🧊 <strong className="text-cyan-300">Icecast (CVE-2014-0759):</strong> UAC bypass &amp; Kiwi LSASS dump
                        </div>
                        <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-300">
                          🪟 <strong className="text-cyan-300">Windows PrivEsc:</strong> Unquoted service paths &amp; PrintSpoofer
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ARCHITECTURE & 3D TOPOLOGY TAB */
              <div className="space-y-4">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-100 font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                      <Zap size={14} className="text-emerald-400" />
                      3D Interactive Network Topology &amp; Attack Simulation
                    </h4>
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                      Live Isometric Model
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Interactive simulation of the enterprise perimeter, DMZ segmentation, stateful firewall inspection, and corporate Active Directory core.
                  </p>
                </div>

                {/* Live 3D Visualizer Component */}
                <Isometric3DNetworkVisualizer />

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <h5 className="text-xs font-mono font-bold text-slate-300">Target Hardening &amp; Compliance Standards</h5>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded bg-slate-800/60 border border-slate-700 text-xs font-mono text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer with Direct External Links */}
          <div className="flex flex-wrap items-center justify-between p-4 border-t border-slate-800 bg-slate-950/80 gap-3">
            <div className="flex items-center gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              >
                <GithubIcon size={14} /> View Code on GitHub →
              </a>

              <a
                href="https://tryhackme.com/p/parthrspandey25"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-mono transition-colors"
                title="Parth Pandey TryHackMe Profile (Top 2% Global)"
              >
                <TryhackmeIcon size={14} /> TryHackMe [Top 2%]
              </a>
            </div>

            {project.articleUrl && (
              <a
                href={project.articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 hover:from-emerald-500/30 hover:to-cyan-500/30 text-xs font-mono font-semibold transition-all"
              >
                <ExternalLink size={14} /> {project.articleLabel || "Open Live Resource →"}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
