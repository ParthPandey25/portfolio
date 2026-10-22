"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  RotateCcw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Activity,
  Server,
  Database,
  Radio,
  Flame,
  Zap,
  Info,
  ChevronRight,
  Crosshair,
  Lock,
  Unlock,
  AlertOctagon,
} from "lucide-react";

// Network Topology Nodes definition matching the user's CRTA Architecture
const TOPOLOGY_NODES = {
  attacker: {
    id: "attacker",
    name: "Red Team Analyst / Attacker",
    zone: "EXTERNAL WAN",
    ip: "198.51.100.24",
    os: "Kali Linux 2024.2 / Metasploit Pro",
    status: "Active Attack Host",
    desc: "Adversary simulation workstation running automated port scanning, Metasploit, Impacket, and custom Python exploit payloads.",
    icon: "attacker",
    color: "#ef4444",
  },
  fw_edge: {
    id: "fw_edge",
    name: "Perimeter Edge Firewall",
    zone: "EDGE BOUNDARY",
    ip: "198.51.100.1 / 10.0.1.1",
    os: "Cisco ASA 5525-X / FirePOWER",
    status: "Stateful Inspection Active",
    desc: "First line of perimeter defense. Drops unauthorized ingress traffic, allows HTTPS/80 to DMZ Web Server, performs NAT/PAT.",
    icon: "firewall",
    color: "#f97316",
  },
  web_srv: {
    id: "web_srv",
    name: "Web Server (DMZ)",
    zone: "DE-MILITARIZED ZONE (DMZ)",
    ip: "10.0.1.10",
    os: "Windows Server 2022 / IIS 10.0",
    status: "Public Ingress Node",
    desc: "Hosts corporate portal. Vulnerable to CVE-2023 RCE exploit, used by Red Team as initial breach foothold and reverse shell proxy.",
    icon: "windows",
    color: "#38bdf8",
  },
  mail_srv: {
    id: "mail_srv",
    name: "Mail Server (DMZ)",
    zone: "DE-MILITARIZED ZONE (DMZ)",
    ip: "10.0.1.20",
    os: "Ubuntu 22.04 LTS / Postfix + Dovecot",
    status: "SMTP Relay Active",
    desc: "Inbound corporate email relay. Hardened against unauthorized relaying; monitored for spear-phishing payloads.",
    icon: "linux",
    color: "#22c55e",
  },
  app_srv: {
    id: "app_srv",
    name: "Application Server (DMZ)",
    zone: "DE-MILITARIZED ZONE (DMZ)",
    ip: "10.0.1.30",
    os: "Red Hat Enterprise Linux 9",
    status: "Microservices Active",
    desc: "Internal API gateway proxying requests between DMZ and corporate databases via authenticated mTLS tokens.",
    icon: "server",
    color: "#06b6d4",
  },
  fw_internal: {
    id: "fw_internal",
    name: "Internal Core Firewall",
    zone: "INTERNAL CORE BOUNDARY",
    ip: "10.0.1.254 / 10.0.2.1",
    os: "Check Point Gaia R81.20 (VSX)",
    status: "Zero-Trust Enforcement",
    desc: "Inspects and strictly isolates DMZ traffic from Corporate AD LAN. Drops unauthorized SMB/445, RPC, and RDP pivot attempts.",
    icon: "firewall",
    color: "#f97316",
  },
  ad_core: {
    id: "ad_core",
    name: "Active Directory Identity Store",
    zone: "MILITARIZED INTERNAL ZONE",
    ip: "10.0.2.5",
    os: "Active Directory Domain Services",
    status: "Kerberos KDC Online",
    desc: "Central authentication engine. Targets of Kerberoasting (TGS-REQ for SPN tickets) and AS-REP roasting simulations.",
    icon: "ad",
    color: "#a855f7",
  },
  dc_primary: {
    id: "dc_primary",
    name: "Primary Domain Controller (DC01)",
    zone: "MILITARIZED INTERNAL ZONE",
    ip: "10.0.2.10",
    os: "Windows Server 2022 Datacenter",
    status: "Root Forest Controller",
    desc: "Hosts ntds.dit Active Directory database. Monitored via Splunk CloudTrail/Windows Event Forwarding for Pass-the-Hash / DCSync attacks.",
    icon: "dc",
    color: "#3b82f6",
  },
  dc_child: {
    id: "dc_child",
    name: "Child Domain Controller (SUB-DC)",
    zone: "MILITARIZED INTERNAL ZONE",
    ip: "10.0.2.15",
    os: "Windows Server 2019 Datacenter",
    status: "Subdomain Controller",
    desc: "Manages subsidiary organizational units. Connected to root DC via bidirectional transitive Kerberos trust.",
    icon: "dc",
    color: "#6366f1",
  },
  db_server: {
    id: "db_server",
    name: "Corporate Database Server (CUST-DB)",
    zone: "MILITARIZED INTERNAL ZONE",
    ip: "10.0.2.50",
    os: "PostgreSQL 16 / Oracle Enterprise",
    status: "Encrypted at Rest (AES-256)",
    desc: "Holds crown-jewel customer records and financial ledgers. Completely segmented: only reachable via verified App Server mTLS queries.",
    icon: "database",
    color: "#10b981",
  },
};

// Simulation scenarios explaining project workflows
const SCENARIOS = [
  {
    id: "breach",
    title: "1. Initial Perimeter Infiltration",
    subtitle: "Web Server Exploit & Reverse Shell",
    badge: "Red Team Initial Access",
    badgeColor: "text-red-400 bg-red-500/10 border-red-500/30",
    description:
      "Attacker conducts reconnaissance on the public IP, identifies an unpatched CVE on the DMZ Web Server, and launches an HTTP payload. The Edge Firewall allows ingress 443; the Web Server executes code and spawns a reverse TCP beacon back to the Red Team station.",
    pathNodes: ["attacker", "fw_edge", "web_srv"],
    outcome: "BREACH CONFIRMED",
    outcomeColor: "text-red-400",
    logs: [
      "[14:02:11] [NMAP] Scanned 198.51.100.0/24 -> Found Port 80/443 OPEN on 10.0.1.10",
      "[14:02:15] [EDGE-FW] ALLOW INGRESS TCP 198.51.100.24:54210 -> 10.0.1.10:443 (STATE: NEW)",
      "[14:02:18] [EXPLOIT] Sending payload: POST /api/upload -> Web Server 200 OK",
      "[14:02:20] [REVERSE-SHELL] Caught inbound TCP beacon from 10.0.1.10:49212 (NT AUTHORITY\\SYSTEM)",
    ],
  },
  {
    id: "lateral",
    title: "2. Lateral Movement & Kerberoasting",
    subtitle: "DMZ Pivot to Active Directory",
    badge: "Privilege Escalation",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description:
      "From the compromised Web Server, the Red Team pivots internally toward the Domain Controller. The adversary queries Active Directory for Kerberos Service Principal Names (SPNs) and requests RC4/AES encrypted tickets for offline cracking.",
    pathNodes: ["web_srv", "fw_internal", "ad_core", "dc_primary"],
    outcome: "SPN TICKETS EXTRACTED",
    outcomeColor: "text-amber-400",
    logs: [
      "[14:03:02] [IMPACKET] Executing GetUserSPNs.py against 10.0.2.5 (AD Identity Store)",
      "[14:03:04] [INTERNAL-FW] INSPECT TCP 10.0.1.10 -> 10.0.2.5:88 (Kerberos TGS-REQ)",
      "[14:03:07] [AD-KDC] Issued TGS ticket for MSSQLSvc/sql.corp.internal:1433",
      "[14:03:10] [HASHCAT] Kerberoast hash captured -> Ready for dictionary hash cracking",
    ],
  },
  {
    id: "zerotrust",
    title: "3. Zero-Trust Block & SOC Telemetry",
    subtitle: "Check Point Drops Unauthorized SMB",
    badge: "Blue Team Defense & SIEM",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description:
      "Attacker attempts to pivot directly from DMZ to the Corporate Database Server via SMB (Port 445). The Check Point Gaia Internal Firewall flags the zero-trust policy violation, DROPS the packet, and triggers a High-Severity alert in the Splunk SOC.",
    pathNodes: ["web_srv", "fw_internal"],
    blockedAt: "fw_internal",
    outcome: "ATTACK INTERCEPTED & DROPPED",
    outcomeColor: "text-emerald-400",
    logs: [
      "[14:04:12] [PIVOT-ATTEMPT] Attacker launches lateral SMB probe: 10.0.1.10 -> 10.0.2.50:445",
      "[14:04:13] [CHECKPOINT-FW] RULE #42 (DMZ_TO_CORP_DROP) TRIGGERED -> ACTION: DROP",
      "[14:04:13] [SYSLOG] Alert sent: Suspicious cross-zone TCP 445 from DMZ Host (10.0.1.10)",
      "[14:04:14] [SPLUNK-SIEM] T1021.002 SMB Ingestion Alert triggered -> SOC Incident Ticket IR-002 auto-opened",
    ],
  },
  {
    id: "domain_takeover",
    title: "4. Child DC Trust & Data Exfiltration",
    subtitle: "Cross-Forest Trust Escalation",
    badge: "Full Kill-Chain Simulation",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    description:
      "Adversary exploits bidirectional trust between Root DC and Child Domain Controller. Using synthesized Golden Tickets, access is forged to the crown-jewel Database Server, demonstrating the full Red Team vs. Blue Team audit cycle.",
    pathNodes: ["dc_primary", "dc_child", "db_server"],
    outcome: "SIMULATION COMPLETE",
    outcomeColor: "text-cyan-400",
    logs: [
      "[14:05:01] [MIMIKATZ] Generating forged Kerberos Golden Ticket for CORP\\krbtgt",
      "[14:05:05] [RPC-SYNC] Replicating directory credentials to Child DC (10.0.2.15)",
      "[14:05:08] [DATABASE] Authorized SQL session established to CUST-DB (10.0.2.50)",
      "[14:05:12] [AUDIT-REPORT] CRTA Assessment complete: 3 critical remediation paths logged",
    ],
  },
];

export default function Isometric3DNetworkVisualizer() {
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState("fw_internal");
  const [packetProgress, setPacketProgress] = useState(0); // 0 to 100
  const [packetsInspected, setPacketsInspected] = useState(14820);
  const [firewallBlockedCount, setFirewallBlockedCount] = useState(142);
  const [liveLogIndex, setLiveLogIndex] = useState(0);

  const scenario = SCENARIOS[activeScenarioIdx];
  const selectedNode = TOPOLOGY_NODES[selectedNodeId] || TOPOLOGY_NODES.fw_internal;

  // Animation ticker for packet movement
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPacketProgress((prev) => {
        if (prev >= 100) {
          setPacketsInspected((p) => p + 1);
          if (scenario.blockedAt) {
            setFirewallBlockedCount((b) => b + 1);
          }
          return 0;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isPlaying, scenario]);

  // Live log rotation
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLiveLogIndex((prev) => (prev + 1) % scenario.logs.length);
    }, 2800);
    return () => clearInterval(logInterval);
  }, [scenario]);

  return (
    <div className="w-full rounded-2xl bg-slate-950/90 border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden font-sans">
      {/* ── Visualizer Header Bar ───────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.25)]">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-tight">
                3D Live Network Architecture &amp; Attack Simulation
              </h3>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                LIVE 60FPS
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Certified Red Team Analyst (CRTA) · IT Corporation Attack Topology
            </p>
          </div>
        </div>

        {/* Global Live Meters */}
        <div className="flex items-center gap-3 sm:gap-6 text-xs font-mono">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase">Inspected Packets</span>
            <span className="text-cyan-400 font-bold">{packetsInspected.toLocaleString()}</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 block uppercase">Threats Dropped</span>
            <span className="text-rose-400 font-bold">{firewallBlockedCount}</span>
          </div>
          <div className="flex items-center gap-1.5 pl-3 border-l border-slate-800">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
              title={isPlaying ? "Pause Simulation" : "Resume Simulation"}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="text-emerald-400" />}
            </button>
            <button
              onClick={() => {
                setPacketProgress(0);
                setLiveLogIndex(0);
              }}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Reset Animation"
            >
              <RotateCcw size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Scenario Selection Tabs ─────────────────────────────────── */}
      <div className="px-4 py-2.5 bg-slate-900/30 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider shrink-0 pl-1">
          Attack Phase:
        </span>
        {SCENARIOS.map((sc, idx) => {
          const isActive = activeScenarioIdx === idx;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setActiveScenarioIdx(idx);
                setPacketProgress(0);
                setLiveLogIndex(0);
                if (sc.blockedAt) setSelectedNodeId(sc.blockedAt);
                else setSelectedNodeId(sc.pathNodes[sc.pathNodes.length - 1]);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold"
                  : "bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
              {sc.title}
            </button>
          );
        })}
      </div>

      {/* ── Main Interactive 3D Stage & Details Grid ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* ── 3D Isometric SVG Canvas (8 cols on lg) ────────────────── */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-radial-gradient relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center overflow-hidden select-none">
          {/* Subtle background isometric grid lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Isometric SVG Topology */}
          <svg
            viewBox="0 0 1000 620"
            className="w-full h-full max-h-[580px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Neon Glow Filters */}
              <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-blue" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-firewall" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Linear Gradients */}
              <linearGradient id="grad-highway-red" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="grad-highway-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.7" />
              </linearGradient>
              <linearGradient id="grad-flame" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {/* ── OUTER BOUNDARY: Enterprise Environment ── */}
            <g id="enterprise-zone">
              <path
                d="M 230,120 L 960,70 L 980,480 L 250,560 Z"
                fill="#030712"
                fillOpacity="0.6"
                stroke="#ef4444"
                strokeWidth="2.5"
                strokeDasharray="6,4"
                className="animate-pulse"
              />
              <text x="290" y="545" fill="#f87171" fontSize="13" fontWeight="bold" fontFamily="monospace" letterSpacing="2">
                ENTERPRISE ENVIRONMENT (PROTECTED PERIMETER)
              </text>
            </g>

            {/* ── ZONE 1: De-Militarized Zone (DMZ) ── */}
            <g id="dmz-zone">
              <path
                d="M 270,300 L 520,230 L 530,460 L 280,515 Z"
                fill="#082f49"
                fillOpacity="0.35"
                stroke="#38bdf8"
                strokeWidth="2"
                strokeDasharray="4,3"
                rx="15"
              />
              <text x="290" y="325" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
                De-Militarized Zone (DMZ)
              </text>
            </g>

            {/* ── ZONE 2: Militarized Internal Zone (Active Directory) ── */}
            <g id="militarized-zone">
              <path
                d="M 590,150 L 930,105 L 945,395 L 605,430 Z"
                fill="#1e1b4b"
                fillOpacity="0.35"
                stroke="#818cf8"
                strokeWidth="2"
                strokeDasharray="4,3"
                rx="15"
              />
              <text x="610" y="175" fill="#818cf8" fontSize="12" fontWeight="bold" fontFamily="monospace" letterSpacing="1">
                Militarized Zone (Corporate AD Forest)
              </text>
            </g>

            {/* ── HIGHWAY 1: Attacker to Perimeter Firewall (Red Highway) ── */}
            <g id="highway-attacker">
              <path
                d="M 120,490 L 235,465"
                stroke="url(#grad-highway-red)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 120,490 L 235,465"
                stroke="#fca5a5"
                strokeWidth="2"
                strokeDasharray="6,6"
                fill="none"
              />
              <text x="75" y="465" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">
                ATTACKER
              </text>
            </g>

            {/* ── HIGHWAY 2: Edge Firewall to DMZ Servers ── */}
            <g id="highway-dmz">
              <path
                d="M 245,460 L 320,440 L 400,380"
                stroke="url(#grad-highway-red)"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ── HIGHWAY 3: DMZ to Internal Check Point Firewall ── */}
            <g id="highway-internal-fw">
              <path
                d="M 400,380 L 555,340"
                stroke={scenario.id === "zerotrust" ? "#ef4444" : "url(#grad-highway-blue)"}
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ── HIGHWAY 4: Internal Firewall to Active Directory & DC ── */}
            <g id="highway-corp-ad">
              <path
                d="M 570,335 L 660,285 L 750,230"
                stroke="url(#grad-highway-blue)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 750,230 L 860,195"
                stroke="#6366f1"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 750,230 L 840,310"
                stroke="#10b981"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* ── ANIMATED DATA PACKETS ── */}
            {isPlaying && (
              <g id="animated-packets">
                {/* Scenario 1: Attacker -> Edge FW -> Web Server */}
                {scenario.id === "breach" && (
                  <circle
                    cx={120 + (packetProgress / 100) * (380 - 120)}
                    cy={490 + (packetProgress / 100) * (340 - 490)}
                    r="8"
                    fill="#ef4444"
                    filter="url(#glow-red)"
                  >
                    <animate attributeName="r" values="6;10;6" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                )}

                {/* Scenario 2: Web Server -> Internal FW -> AD -> DC */}
                {scenario.id === "lateral" && (
                  <circle
                    cx={380 + (packetProgress / 100) * (740 - 380)}
                    cy={340 + (packetProgress / 100) * (230 - 340)}
                    r="8"
                    fill="#f59e0b"
                    filter="url(#glow-red)"
                  />
                )}

                {/* Scenario 3: Web Server -> Check Point Firewall (DROPPED & DEFLECTED) */}
                {scenario.id === "zerotrust" && (
                  <g>
                    {packetProgress < 65 ? (
                      <circle
                        cx={380 + (packetProgress / 65) * (560 - 380)}
                        cy={340 + (packetProgress / 65) * (335 - 340)}
                        r="8"
                        fill="#ef4444"
                        filter="url(#glow-red)"
                      />
                    ) : (
                      /* Block deflection burst at firewall */
                      <g transform="translate(560, 335)">
                        <circle r="22" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.9">
                          <animate attributeName="r" values="8;32" dur="0.6s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="1;0" dur="0.6s" repeatCount="indefinite" />
                        </circle>
                        <text x="-7" y="6" fill="#ef4444" fontSize="18" fontWeight="bold">✕</text>
                      </g>
                    )}
                  </g>
                )}

                {/* Scenario 4: DC -> Child DC -> Database */}
                {scenario.id === "domain_takeover" && (
                  <circle
                    cx={740 + (packetProgress / 100) * (840 - 740)}
                    cy={230 + (packetProgress / 100) * (310 - 230)}
                    r="8"
                    fill="#a855f7"
                    filter="url(#glow-blue)"
                  />
                )}
              </g>
            )}

            {/* ══════════════════════════════════════════════════════════
                ISOMETRIC 3D NODES RENDERING
            ══════════════════════════════════════════════════════════ */}

            {/* ── 1. ATTACKER STATION ── */}
            <g
              id="node-attacker"
              transform="translate(80, 480)"
              className="cursor-pointer group"
              onClick={() => setSelectedNodeId("attacker")}
            >
              {selectedNodeId === "attacker" && (
                <ellipse cx="25" cy="25" rx="45" ry="25" fill="#ef4444" opacity="0.3" filter="url(#glow-red)" />
              )}
              {/* Desk & Terminal base */}
              <polygon points="0,20 25,5 60,18 35,32" fill="#7f1d1d" />
              <polygon points="0,20 35,32 35,42 0,30" fill="#991b1b" />
              <polygon points="35,32 60,18 60,28 35,42" fill="#b91c1c" />
              {/* Attacker figure in hoodie (red) */}
              <circle cx="28" cy="0" r="14" fill="#dc2626" />
              <rect x="20" y="8" width="16" height="15" rx="3" fill="#991b1b" />
              <text x="-15" y="62" fill="#ef4444" fontSize="11" fontWeight="bold" fontFamily="monospace">
                RED TEAM ANALYST
              </text>
            </g>

            {/* ── 2. PERIMETER FIREWALL (Cisco ASA) ── */}
            <g
              id="node-fw-edge"
              transform="translate(230, 440)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("fw_edge")}
            >
              {selectedNodeId === "fw_edge" && (
                <ellipse cx="15" cy="15" rx="35" ry="22" fill="#f97316" opacity="0.3" filter="url(#glow-firewall)" />
              )}
              {/* Flame / Shield representation */}
              <path
                d="M 5,25 Q -10,0 12,-15 Q 18,-30 25,-12 Q 38,-3 32,15 Q 40,25 25,30 Z"
                fill="url(#grad-flame)"
                filter="url(#glow-firewall)"
                className="animate-pulse"
              />
              {/* Firewall base block */}
              <polygon points="-5,25 15,15 35,22 15,32" fill="#ea580c" />
              <polygon points="-5,25 15,32 15,40 -5,33" fill="#c2410c" />
              <polygon points="15,32 35,22 35,30 15,40" fill="#9a3412" />
              <text x="-5" y="52" fill="#fb923c" fontSize="10" fontWeight="bold" fontFamily="monospace">
                FIREWALL
              </text>
            </g>

            {/* ── 3. WEB SERVER (Windows) ── */}
            <g
              id="node-web-srv"
              transform="translate(370, 310)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("web_srv")}
            >
              {selectedNodeId === "web_srv" && (
                <ellipse cx="20" cy="40" rx="38" ry="22" fill="#38bdf8" opacity="0.3" filter="url(#glow-blue)" />
              )}
              {/* Holographic light pillar */}
              <line x1="20" y1="20" x2="20" y2="-15" stroke="#38bdf8" strokeWidth="3" opacity="0.7" />
              {/* 3D Tiered Server Rack */}
              <polygon points="0,20 20,8 45,18 25,30" fill="#0284c7" />
              <polygon points="0,20 25,30 25,55 0,45" fill="#0369a1" />
              <polygon points="25,30 45,18 45,43 25,55" fill="#075985" />
              {/* Status LEDs */}
              <circle cx="8" cy="35" r="2" fill="#38bdf8" />
              <circle cx="15" cy="38" r="2" fill="#22c55e" />
              <text x="-5" y="70" fill="#7dd3fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Web Server (Win)
              </text>
            </g>

            {/* ── 4. MAIL SERVER (Linux) ── */}
            <g
              id="node-mail-srv"
              transform="translate(330, 410)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("mail_srv")}
            >
              {selectedNodeId === "mail_srv" && (
                <ellipse cx="20" cy="35" rx="35" ry="20" fill="#22c55e" opacity="0.3" filter="url(#glow-blue)" />
              )}
              {/* 3D Server Box */}
              <polygon points="0,15 20,5 40,13 20,23" fill="#15803d" />
              <polygon points="0,15 20,23 20,45 0,37" fill="#166534" />
              <polygon points="20,23 40,13 40,35 20,45" fill="#14532d" />
              <text x="-5" y="60" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Mail Server (Linux)
              </text>
            </g>

            {/* ── 5. APPLICATION SERVER ── */}
            <g
              id="node-app-srv"
              transform="translate(450, 390)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("app_srv")}
            >
              {selectedNodeId === "app_srv" && (
                <ellipse cx="20" cy="35" rx="35" ry="20" fill="#06b6d4" opacity="0.3" filter="url(#glow-blue)" />
              )}
              <polygon points="0,15 20,5 40,13 20,23" fill="#0891b2" />
              <polygon points="0,15 20,23 20,45 0,37" fill="#0e7490" />
              <polygon points="20,23 40,13 40,35 20,45" fill="#155e75" />
              <text x="-5" y="60" fill="#22d3ee" fontSize="10" fontWeight="bold" fontFamily="monospace">
                App Server
              </text>
            </g>

            {/* ── 6. INTERNAL CORE FIREWALL (Check Point Gaia) ── */}
            <g
              id="node-fw-internal"
              transform="translate(545, 320)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("fw_internal")}
            >
              {selectedNodeId === "fw_internal" && (
                <ellipse cx="18" cy="18" rx="40" ry="25" fill="#f97316" opacity="0.35" filter="url(#glow-firewall)" />
              )}
              {/* Blue flames of internal firewall from diagram */}
              <path
                d="M 5,20 Q -8,-5 12,-18 Q 18,-32 26,-15 Q 40,-5 34,12 Q 42,22 25,28 Z"
                fill="url(#grad-flame)"
                filter="url(#glow-firewall)"
                className="animate-pulse"
              />
              <polygon points="-5,20 15,10 35,17 15,27" fill="#ea580c" />
              <polygon points="-5,20 15,27 15,35 -5,28" fill="#c2410c" />
              <polygon points="15,27 35,17 35,25 15,35" fill="#9a3412" />
              <text x="-5" y="48" fill="#fb923c" fontSize="11" fontWeight="bold" fontFamily="monospace">
                FIREWALL
              </text>
            </g>

            {/* ── 7. ACTIVE DIRECTORY IDENTITY STORE ── */}
            <g
              id="node-ad-core"
              transform="translate(640, 260)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("ad_core")}
            >
              {selectedNodeId === "ad_core" && (
                <ellipse cx="20" cy="30" rx="35" ry="20" fill="#a855f7" opacity="0.3" filter="url(#glow-blue)" />
              )}
              {/* AD Directory book / tablet token */}
              <polygon points="0,15 20,3 40,12 20,24" fill="#9333ea" />
              <polygon points="0,15 20,24 20,44 0,35" fill="#7e22ce" />
              <polygon points="20,24 40,12 40,32 20,44" fill="#6b21a8" />
              <text x="-15" y="58" fill="#c084fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Active Directory
              </text>
            </g>

            {/* ── 8. PRIMARY DOMAIN CONTROLLER ── */}
            <g
              id="node-dc-primary"
              transform="translate(730, 210)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("dc_primary")}
            >
              {selectedNodeId === "dc_primary" && (
                <ellipse cx="22" cy="30" rx="40" ry="22" fill="#3b82f6" opacity="0.35" filter="url(#glow-blue)" />
              )}
              {/* 3D Core Cube */}
              <polygon points="0,15 22,0 48,12 25,27" fill="#2563eb" />
              <polygon points="0,15 25,27 25,52 0,40" fill="#1d4ed8" />
              <polygon points="25,27 48,12 48,37 25,52" fill="#1e40af" />
              {/* Inner glowing core icon */}
              <circle cx="25" cy="27" r="5" fill="#60a5fa" />
              <text x="-10" y="68" fill="#93c5fd" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Domain Controller
              </text>
            </g>

            {/* ── 9. CHILD DOMAIN CONTROLLER ── */}
            <g
              id="node-dc-child"
              transform="translate(840, 160)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("dc_child")}
            >
              {selectedNodeId === "dc_child" && (
                <ellipse cx="20" cy="25" rx="35" ry="18" fill="#6366f1" opacity="0.3" filter="url(#glow-blue)" />
              )}
              <polygon points="0,12 18,2 38,10 20,20" fill="#4f46e5" />
              <polygon points="0,12 20,20 20,38 0,30" fill="#4338ca" />
              <polygon points="20,20 38,10 38,28 20,38" fill="#3730a3" />
              <text x="-15" y="52" fill="#a5b4fc" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Child Domain Controller
              </text>
            </g>

            {/* ── 10. DATABASE SERVER (CUST-DB) ── */}
            <g
              id="node-db-server"
              transform="translate(825, 290)"
              className="cursor-pointer"
              onClick={() => setSelectedNodeId("db_server")}
            >
              {selectedNodeId === "db_server" && (
                <ellipse cx="22" cy="30" rx="38" ry="22" fill="#10b981" opacity="0.35" filter="url(#glow-blue)" />
              )}
              {/* 3D Tiered Cylinder Database */}
              <ellipse cx="22" cy="10" rx="22" ry="10" fill="#059669" />
              <path d="M 0,10 L 0,30 A 22,10 0 0,0 44,30 L 44,10 Z" fill="#047857" />
              <path d="M 0,30 L 0,50 A 22,10 0 0,0 44,50 L 44,30 Z" fill="#065f46" />
              <ellipse cx="22" cy="50" rx="22" ry="10" fill="#047857" />
              <text x="-10" y="72" fill="#6ee7b7" fontSize="10" fontWeight="bold" fontFamily="monospace">
                Database Server
              </text>
            </g>
          </svg>

          {/* Interactive Hint Banner */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg pointer-events-none">
            <span className="flex items-center gap-1.5">
              <Info size={13} className="text-cyan-400" />
              Click any node on the 3D topology map to inspect live IP, OS &amp; Hardening rules
            </span>
            <span className="hidden sm:inline font-bold text-emerald-400">
              {scenario.outcome}
            </span>
          </div>
        </div>

        {/* ── Node Telemetry & Attack Inspector (4 cols on lg) ──────── */}
        <div className="lg:col-span-4 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/70 flex flex-col justify-between space-y-4">
          {/* Active Phase Scenario Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${scenario.badgeColor}`}>
                {scenario.badge}
              </span>
              <span className={`text-xs font-mono font-bold ${scenario.outcomeColor}`}>
                ● {scenario.outcome}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 font-mono">
              {scenario.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {scenario.description}
            </p>
          </div>

          {/* Selected Node Details Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: selectedNode.color }}
                />
                <h5 className="text-xs font-bold font-mono text-slate-200">
                  {selectedNode.name}
                </h5>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {selectedNode.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-slate-500 block">Security Zone:</span>
                <span className="text-slate-300 font-bold">{selectedNode.zone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned IP:</span>
                <span className="text-emerald-400 font-bold">{selectedNode.ip}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block">Operating System / Engine:</span>
                <span className="text-cyan-300 font-bold">{selectedNode.os}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-normal border-t border-slate-800/60 pt-2">
              {selectedNode.desc}
            </p>
          </div>

          {/* Live Syslog Telemetry Stream */}
          <div className="p-3 bg-black/90 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800/80 pb-1 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Terminal size={11} /> LIVE TELEMETRY LOG
              </span>
              <span>SYSLOG / SIEM STREAM</span>
            </div>
            <div className="space-y-1 py-1 max-h-28 overflow-y-auto scrollbar-thin">
              {scenario.logs.map((log, lIdx) => (
                <div
                  key={lIdx}
                  className={`text-[10px] sm:text-[11px] leading-tight transition-colors ${
                    lIdx === liveLogIndex
                      ? "text-amber-300 font-bold bg-amber-500/10 px-1 rounded"
                      : "text-slate-500"
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
