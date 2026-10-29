"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Terminal,
  Activity,
  Layers,
  Cpu,
  Radio,
  Eye,
  Play,
  RotateCcw,
  Zap,
  Lock,
  Wifi,
  Database,
  ArrowRight,
  Crosshair,
  Server,
  FileCode,
  CheckCircle2,
} from "lucide-react";

// Project metadata and interactive controller configurations
const PROJECT_CONFIGS = {
  splunk: {
    id: "splunk",
    title: "Splunk SOC SIEM Lab",
    badge: "SOC Operations",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description: "Multi-vector threat detection radar with live MITRE ATT&CK correlation and SPL queries.",
  },
  packet: {
    id: "packet",
    title: "C++ High-Speed Packet Sniffer",
    badge: "Core Systems",
    badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    description: "100k+ PPS raw socket frame dissector with byte-level hex inspection and protocol decoders.",
  },
  firewall: {
    id: "firewall",
    title: "Enterprise Multi-Zone Firewall",
    badge: "Network Security",
    badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    description: "Interactive WAN ➔ DMZ ➔ AD Core stateful transit matrix with real-time ACL rules enforcement.",
  },
  cyberlab: {
    id: "cyberlab",
    title: "TryHackMe Attack Lab PTY",
    badge: "Offensive Ops",
    badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    description: "Interactive virtual Kali Linux terminal emulator with live privilege escalation commands & flags.",
  },
  finance: {
    id: "finance",
    title: "Secure FinTech Architecture",
    badge: "AppSec Hardening",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    description: "Interactive OWASP attack vs hardened defense sandbox (SQLi, IDOR, and JWT forgery).",
  },
};

// ==========================================
// 1. SPLUNK SIEM RADAR VISUALIZER
// ==========================================
function SplunkRadarVisualizer() {
  const [activeTechnique, setActiveTechnique] = useState("T1110");
  const [threatEvents, setThreatEvents] = useState([
    { id: 1, angle: 45, dist: 65, tech: "T1110", name: "Brute Force", sev: "CRITICAL", ip: "194.26.29.112" },
    { id: 2, angle: 130, dist: 80, tech: "T1059", name: "PowerShell Encoded", sev: "HIGH", ip: "185.190.140.2" },
    { id: 3, angle: 220, dist: 45, tech: "T1003", name: "LSASS Memory Dump", sev: "CRITICAL", ip: "10.0.4.15" },
    { id: 4, angle: 310, dist: 70, tech: "T1071", name: "C2 Beaconing (DNS)", sev: "MEDIUM", ip: "45.154.255.8" },
  ]);
  const [scanRotation, setScanRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanRotation((prev) => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const queries = {
    T1110: 'index=wineventlog EventCode=4625 | stats count by TargetUserName, src_ip | where count > 10',
    T1059: 'index=powershell ScriptBlockText="*FromBase64String*" | table _time, ComputerName, ScriptBlockText',
    T1003: 'index=sysmon EventCode=10 TargetImage="*lsass.exe" GrantedAccess="0x1010" | eval alert="Mimikatz Dump"',
    T1071: 'sourcetype=suricata event_type=dns | stats count by query, dest_ip | where len(query) > 50',
  };

  const selectedEvent = threatEvents.find((e) => e.tech === activeTechnique) || threatEvents[0];

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-center w-full h-full p-4">
      {/* Radar Canvas / SVG Representation */}
      <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 flex items-center justify-center">
        {/* Radar concentric rings */}
        <div className="absolute inset-0 rounded-full border border-emerald-500/20 bg-emerald-950/20" />
        <div className="absolute inset-8 rounded-full border border-emerald-500/30" />
        <div className="absolute inset-16 rounded-full border border-emerald-500/40" />
        <div className="absolute inset-24 rounded-full border border-emerald-500/50" />
        {/* Crosshairs */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-emerald-500/30 -translate-y-1/2" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-emerald-500/30 -translate-x-1/2" />

        {/* Sweeping radar needle */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            transform: `rotate(${scanRotation}deg)`,
            background: "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(16, 185, 129, 0.4) 360deg)",
          }}
        />

        {/* Threat blips */}
        {threatEvents.map((event) => {
          const rad = (event.angle * Math.PI) / 180;
          const x = 50 + (event.dist / 2) * Math.cos(rad);
          const y = 50 + (event.dist / 2) * Math.sin(rad);
          const isSelected = event.tech === activeTechnique;

          return (
            <button
              key={event.id}
              onClick={() => setActiveTechnique(event.tech)}
              aria-label={`Inspect ${event.name}`}
              className={`absolute -translate-x-1/2 -translate-y-1/2 transition-transform ${
                isSelected ? "scale-125 z-20" : "hover:scale-110 z-10"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="relative flex h-4 w-4">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    event.sev === "CRITICAL" ? "bg-rose-500" : event.sev === "HIGH" ? "bg-amber-500" : "bg-cyan-500"
                  }`}
                />
                <span
                  className={`relative inline-flex rounded-full h-4 w-4 border border-white/50 ${
                    event.sev === "CRITICAL" ? "bg-rose-600" : event.sev === "HIGH" ? "bg-amber-600" : "bg-cyan-600"
                  }`}
                />
              </span>
            </button>
          );
        })}

        {/* Center emitter */}
        <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] z-10" />
        <span className="absolute bottom-2 text-[10px] font-mono text-emerald-400/70 tracking-widest uppercase">
          LIVE SOC SWEEP: 360°
        </span>
      </div>

      {/* Interactive Telemetry & SPL View */}
      <div className="flex-1 w-full space-y-3 font-mono text-xs">
        <div className="flex flex-wrap gap-2">
          {threatEvents.map((t) => (
            <button
              key={t.tech}
              onClick={() => setActiveTechnique(t.tech)}
              className={`px-2.5 py-1 rounded border transition-all ${
                activeTechnique === t.tech
                  ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              {t.tech}: {t.name}
            </button>
          ))}
        </div>

        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-400">CORRELATED INCIDENT:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedEvent.sev === "CRITICAL"
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                  : selectedEvent.sev === "HIGH"
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                  : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
              }`}
            >
              {selectedEvent.sev}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500">Source Vector:</span>{" "}
              <span className="text-emerald-400">{selectedEvent.ip}</span>
            </div>
            <div>
              <span className="text-slate-500">MITRE Technique:</span>{" "}
              <span className="text-slate-200">{selectedEvent.tech}</span>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Splunk Enterprise Search Processing Language (SPL):</span>
            </div>
            <pre className="p-2 rounded bg-black/60 border border-emerald-500/20 text-emerald-300 overflow-x-auto text-[11px] whitespace-pre-wrap leading-relaxed">
              {queries[activeTechnique]}
            </pre>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Suricata & Sysmon Ingestion Engine
          </span>
          <span className="text-emerald-400/80 font-bold">12,450 EPS</span>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. C++ PACKET ANALYZER VISUALIZER
// ==========================================
function PacketAnalyzerVisualizer() {
  const [selectedProtocol, setSelectedProtocol] = useState("TCP_SYN");
  const [packetCount, setPacketCount] = useState(104820);

  useEffect(() => {
    const timer = setInterval(() => {
      setPacketCount((p) => p + Math.floor(Math.random() * 85 + 20));
    }, 150);
    return () => clearInterval(timer);
  }, []);

  const packetSamples = {
    TCP_SYN: {
      name: "TCP Port Scan (SYN Packet)",
      rawHex: "45 00 00 3c a1 2f 40 00 40 06 b8 12 c0 a8 01 64 c0 a8 01 01 9a 34 00 50 fe b4 a1 00 00 00 00 00 a0 02 72 10 d3 a1 00 00 02 04 05 b4 04 02 08 0a 00",
      ascii: "E.../....@...d....4.P...........r...........",
      fields: [
        { label: "IP Version", val: "IPv4 (IHL=5, 20 Bytes)" },
        { label: "Src Address", val: "192.168.1.100:39476" },
        { label: "Dst Address", val: "192.168.1.1:80 (HTTP)" },
        { label: "TCP Flags", val: "0x002 [SYN] Seq=4273250560" },
        { label: "Window Size", val: "29200, MSS=1460" },
      ],
      verdict: "Port Scanning Activity Detected (Nmap SYN Stealth)",
      flagColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    DNS_EXFIL: {
      name: "DNS Tunneling Exfiltration Chunk",
      rawHex: "45 00 00 4e 7a 11 00 00 40 11 ea 44 c0 a8 01 64 08 08 08 08 e1 a2 00 35 00 3a 1f 8d 1a 2b 01 00 00 01 00 00 00 00 00 00 18 64 33 64 69 73 65 63 74",
      ascii: "E..Nz...@..D...d...5.:...+..........d3disect",
      fields: [
        { label: "Protocol", val: "UDP (DNS Query Port 53)" },
        { label: "Src Address", val: "192.168.1.100:57762" },
        { label: "Resolved IP", val: "8.8.8.8 (Google Public)" },
        { label: "Query Payload", val: "d3disect.c3RhZ2UxLmtleQ==.evil-c2.net" },
        { label: "Entropy", val: "4.89 (High Randomness / Base64 Data)" },
      ],
      verdict: "Data Exfiltration via High-Entropy DNS Subdomains",
      flagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
    ARP_SPOOF: {
      name: "Gratuitous ARP Cache Poisoning",
      rawHex: "ff ff ff ff ff ff 00 0c 29 8f a1 b2 08 06 00 01 08 00 06 04 00 02 00 0c 29 8f a1 b2 c0 a8 01 01 00 00 00 00 00 00 c0 a8 01 01 00 00 00 00 00 00 00",
      ascii: "........)............)......................",
      fields: [
        { label: "Link Layer", val: "Ethernet II (ARP Reply)" },
        { label: "Attacker MAC", val: "00:0c:29:8f:a1:b2" },
        { label: "Claimed IP", val: "192.168.1.1 (Gateway IP)" },
        { label: "Victim MAC", val: "ff:ff:ff:ff:ff:ff (Broadcast)" },
        { label: "Opcode", val: "ARP Reply (is-at duplicate alert)" },
      ],
      verdict: "Man-In-The-Middle (MITM) ARP Poisoning Attempt",
      flagColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
  };

  const current = packetSamples[selectedProtocol];

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 font-mono text-xs">
      {/* Top Banner Stats */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-cyan-300 font-semibold tracking-wide">
            C++ RAW SOCKET CAPTURE ENGINE
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <div>
            TOTAL FRAMES: <span className="text-cyan-400 font-bold">{packetCount.toLocaleString()}</span>
          </div>
          <div>
            BUFFER DROP: <span className="text-emerald-400 font-bold">0.00%</span>
          </div>
          <div>
            KERNEL RING: <span className="text-cyan-400 font-bold">PACKET_MMAP</span>
          </div>
        </div>
      </div>

      {/* Protocol Toggle Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(packetSamples).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setSelectedProtocol(key)}
            className={`px-3 py-1.5 rounded border transition-all text-[11px] ${
              selectedProtocol === key
                ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {data.name}
          </button>
        ))}
      </div>

      {/* Hex Dump & Byte Dissector View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Hex Representation */}
        <div className="p-3 rounded-lg border border-slate-800 bg-black/80 space-y-2">
          <div className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-bold flex items-center justify-between">
            <span>Dissected Byte Stream (Hex/ASCII)</span>
            <span className="text-slate-500">Big-Endian Network Order</span>
          </div>
          <div className="font-mono text-[11px] text-slate-300 break-all leading-relaxed bg-slate-950 p-2 rounded border border-slate-900">
            <div className="text-cyan-400 select-all mb-1">{current.rawHex}</div>
            <div className="text-slate-500 border-t border-slate-800 pt-1 select-all">{current.ascii}</div>
          </div>
          <div className={`p-2 rounded border text-[11px] ${current.flagColor}`}>
            <strong>Analyzer Verdict:</strong> {current.verdict}
          </div>
        </div>

        {/* Decoded Frame Fields */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/70 space-y-2">
          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
            Dissected Protocol Headers
          </div>
          <div className="space-y-1.5">
            {current.fields.map((f, i) => (
              <div key={i} className="flex justify-between items-center text-[11px] p-1 rounded bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">{f.label}:</span>
                <span className="text-cyan-300 font-semibold">{f.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. ENTERPRISE FIREWALL TOPOLOGY VISUALIZER
// ==========================================
function FirewallTopologyVisualizer() {
  const [aclMode, setAclMode] = useState("RESTRICTIVE");
  const [activeTraffic, setActiveTraffic] = useState("HTTPS");
  const [transitState, setTransitState] = useState("PERMIT");

  const rules = {
    RESTRICTIVE: {
      HTTPS: { action: "PERMIT", code: "ALLOW: 443 TLS 1.3 to DMZ NGINX Cluster", status: "emerald" },
      SSH: { action: "DENY", code: "BLOCK: Port 22 Ingress from WAN dropped (Anti-Brute)", status: "rose" },
      RDP: { action: "DROP", code: "DROP: Port 3389 Silent Discard at WAN Edge", status: "rose" },
      DB: { action: "ISOLATED", code: "AIRGAP: Database segment unreachable directly from WAN", status: "amber" },
    },
    PERMISSIVE: {
      HTTPS: { action: "PERMIT", code: "ALLOW: Standard web traffic pass-through", status: "emerald" },
      SSH: { action: "INSPECT", code: "INSPECT: Rate-limited with geo-block override", status: "amber" },
      RDP: { action: "INSPECT", code: "INSPECT: MFA VPN Gateway validation required", status: "amber" },
      DB: { action: "DENY", code: "BLOCK: Segment violation strictly blocked", status: "rose" },
    },
  };

  const handleTrafficSelect = (traffic) => {
    setActiveTraffic(traffic);
    setTransitState(rules[aclMode][traffic].action);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 font-mono text-xs">
      {/* Firewall Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-amber-300 font-semibold tracking-wide">
            ENTERPRISE STATEFUL ACL MATRIX
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">Security Posture:</span>
          <button
            onClick={() => setAclMode(aclMode === "RESTRICTIVE" ? "PERMISSIVE" : "RESTRICTIVE")}
            className={`px-2.5 py-1 rounded border text-[11px] font-bold transition-all ${
              aclMode === "RESTRICTIVE"
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "bg-amber-500/20 border-amber-500/40 text-amber-300"
            }`}
          >
            {aclMode === "RESTRICTIVE" ? "STRICT ZERO-TRUST" : "STANDARD CORRIDOR"}
          </button>
        </div>
      </div>

      {/* Interactive Topology Graph */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center py-2">
        {/* Node 1: Untrusted Internet */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/80 text-center space-y-1">
          <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
            <Wifi className="w-4 h-4" />
          </div>
          <div className="font-bold text-slate-200">WAN Edge</div>
          <div className="text-[10px] text-slate-500">Untrusted Zone 0.0.0.0/0</div>
        </div>

        {/* Node 2: NextGen Firewall Core */}
        <div className="p-3 rounded-lg border-2 border-amber-500/40 bg-amber-950/20 text-center space-y-1 relative">
          <div className="w-8 h-8 mx-auto rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div className="font-bold text-amber-300">Stateful Firewall Engine</div>
          <div className="text-[10px] text-amber-400/80">Active DPI & Layer 7 Filtering</div>
          <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">
            Status:{" "}
            <span
              className={
                rules[aclMode][activeTraffic].status === "emerald"
                  ? "text-emerald-400 font-bold"
                  : rules[aclMode][activeTraffic].status === "rose"
                  ? "text-rose-400 font-bold"
                  : "text-amber-400 font-bold"
              }
            >
              {rules[aclMode][activeTraffic].action}
            </span>
          </div>
        </div>

        {/* Node 3: Protected Corporate Core */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/80 text-center space-y-1">
          <div className="w-8 h-8 mx-auto rounded-full bg-slate-800 flex items-center justify-center text-emerald-400">
            <Database className="w-4 h-4" />
          </div>
          <div className="font-bold text-slate-200">DMZ & Core LAN</div>
          <div className="text-[10px] text-slate-500">10.0.0.0/8 Segmented VLANs</div>
        </div>
      </div>

      {/* Traffic Tester Buttons */}
      <div className="space-y-2">
        <div className="text-[11px] text-slate-400">Inject Simulated Ingress Packet:</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {["HTTPS", "SSH", "RDP", "DB"].map((proto) => (
            <button
              key={proto}
              onClick={() => handleTrafficSelect(proto)}
              className={`p-2 rounded border text-center transition-all ${
                activeTraffic === proto
                  ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              Port {proto === "HTTPS" ? "443" : proto === "SSH" ? "22" : proto === "RDP" ? "3389" : "5432"} ({proto})
            </button>
          ))}
        </div>
      </div>

      {/* Rule Enforcement Terminal Output */}
      <div className="p-3 rounded-lg border border-slate-800 bg-black/80 font-mono text-[11px] space-y-1">
        <div className="text-slate-500 text-[10px] uppercase">Firewall Packet Inspection Log</div>
        <div className="text-slate-300">
          PACKET: IN=eth0 OUT=eth1 SRC=203.0.113.45 DST=10.0.2.10 PROTO={activeTraffic}
        </div>
        <div
          className={`font-semibold ${
            rules[aclMode][activeTraffic].status === "emerald"
              ? "text-emerald-400"
              : rules[aclMode][activeTraffic].status === "rose"
              ? "text-rose-400"
              : "text-amber-400"
          }`}
        >
          {rules[aclMode][activeTraffic].code}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. TRYHACKME CYBERLAB PTY VISUALIZER
// ==========================================
function CyberLabTerminalVisualizer() {
  const [history, setHistory] = useState([
    { cmd: "whoami", res: "root@kali:~$ TryHackMe Top 2% [GURU] Rank" },
    { cmd: "nmap -sC -sV -T4 10.10.114.89", res: "PORT 22/tcp open ssh OpenSSH 8.2p1\nPORT 80/tcp open http Apache/2.4.41\nPORT 445/tcp open smb Samba 4.3" },
    { cmd: "cat /root/flag.txt", res: "THM{p4rth_r3d_t34m_priv_3sc_m4st3r}" },
  ]);
  const [currentInput, setCurrentInput] = useState("");

  const handleRunCommand = (cmdText) => {
    let output = "";
    const clean = cmdText.trim().toLowerCase();
    if (clean === "whoami") {
      output = "parth@offensive-box (uid=0[root] gid=0[root] groups=0[root])";
    } else if (clean.includes("nmap")) {
      output = "Starting Nmap 7.94 scan on 10.10.200.15\n22/tcp  open  ssh\n80/tcp  open  http-proxy\n443/tcp open  ssl/https\nAll 1,000 scanned ports completed in 1.42 seconds.";
    } else if (clean.includes("linpeas") || clean.includes("privesc")) {
      output = "[+] SUID Vulnerability Found: /usr/bin/pkexec (CVE-2021-4034)\n[+] Privilege Escalation Successful -> root shell spawned (#)";
    } else if (clean.includes("flag")) {
      output = "THM{115_r00ms_122_d4y_str34k_top_2_p3rc3nt}";
    } else if (clean === "help") {
      output = "Available simulated commands: whoami, nmap, linpeas, cat flag.txt, clear";
    } else if (clean === "clear") {
      setHistory([]);
      return;
    } else {
      output = `bash: ${cmdText}: command recognized. Executing target exploit script... [SUCCESS]`;
    }

    setHistory((prev) => [...prev, { cmd: cmdText, res: output }]);
    setCurrentInput("");
  };

  return (
    <div className="flex flex-col gap-3 w-full h-full p-4 font-mono text-xs">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-rose-400" />
          <span className="text-rose-300 font-semibold tracking-wide">
            KALI LINUX OFFENSIVE LAB PTY
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
          <span>CONNECTED: 10.10.15.244 (VPN Tun0)</span>
        </div>
      </div>

      {/* Terminal Output Screen */}
      <div className="flex-1 bg-black/90 rounded-lg p-3 border border-slate-800 font-mono text-[11px] space-y-2 overflow-y-auto max-h-56">
        <div className="text-slate-500 text-[10px]">
          TryHackMe Interactive Simulation - Kali GNU/Linux rolling 2026
        </div>
        {history.map((item, index) => (
          <div key={index} className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-rose-400">
              <span className="text-emerald-400">attacker@kali:~$</span>
              <span className="text-white font-medium">{item.cmd}</span>
            </div>
            <pre className="text-slate-300 whitespace-pre-wrap pl-2 border-l border-slate-800 text-[10px] leading-relaxed">
              {item.res}
            </pre>
          </div>
        ))}
      </div>

      {/* Command Injection Shortcuts */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-slate-500 uppercase">Quick Exploits:</span>
        {["whoami", "nmap -sS -A target", "linpeas.sh", "cat flag.txt"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2 py-1 rounded border border-slate-800 bg-slate-900/80 text-rose-300 hover:border-rose-500/50 hover:bg-rose-500/10 text-[10px] transition-all"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. SECURE FINTECH ARCHITECTURE VISUALIZER
// ==========================================
function SecureFinanceVisualizer() {
  const [activeScenario, setActiveScenario] = useState("SQLI");

  const scenarios = {
    SQLI: {
      title: "OWASP A03: SQL Injection via Transaction Query",
      vulnerablePayload: "SELECT * FROM accounts WHERE acc_id = '101' OR '1'='1';",
      hardenedSolution: "Parameterized Prepared Statements with Strict Type Binding",
      defenseCode: "$stmt = $pdo->prepare('SELECT balance FROM accounts WHERE acc_id = :id');\n$stmt->execute(['id' => $cleanAccId]);",
      status: "MITIGATED BY DESIGN",
    },
    IDOR: {
      title: "OWASP A01: Insecure Direct Object Reference (IDOR)",
      vulnerablePayload: "GET /api/v1/statement?account_id=9882 (Bypassing session checks)",
      hardenedSolution: "Cryptographic GUIDs + Session-Bound Tenant Policy Enforcer",
      defenseCode: "if (!authContext.user.canAccessAccount(accountId)) {\n  throw new UnauthorizedTenantException();\n}",
      status: "ROLE ACCESS VALIDATED",
    },
    JWT: {
      title: "OWASP A07: Broken Authentication & JWT None Algorithm",
      vulnerablePayload: '{"alg": "none", "typ": "JWT"}.{"user": "admin", "role": "superuser"}',
      hardenedSolution: "Asymmetric RS256 Signature Verification + JTI Blacklist in Redis",
      defenseCode: "jwt.verify(token, rsaPublicKey, { algorithms: ['RS256'] });",
      status: "SIGNATURE ENFORCED",
    },
  };

  const current = scenarios[activeScenario];

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4 font-mono text-xs">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-purple-400" />
          <span className="text-purple-300 font-semibold tracking-wide">
            FINTECH DEFENSE VS EXPLOIT BENCHMARK
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-bold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>PCI-DSS & SOC2 HARDENED</span>
        </div>
      </div>

      {/* Scenario Buttons */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(scenarios).map(([key, item]) => (
          <button
            key={key}
            onClick={() => setActiveScenario(key)}
            className={`px-3 py-1.5 rounded border transition-all text-[11px] ${
              activeScenario === key
                ? "bg-purple-500/20 border-purple-400 text-purple-200 font-bold"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            {key}: {item.title.split(":")[0]}
          </button>
        ))}
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Vulnerable Vector */}
        <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20 space-y-2">
          <div className="text-rose-400 font-bold text-[11px] flex items-center justify-between">
            <span>Exploit Attack Vector</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/30 border border-rose-500/40">
              BLOCKED
            </span>
          </div>
          <div className="text-[10px] text-slate-400">{current.title}</div>
          <pre className="p-2 rounded bg-black/60 border border-rose-500/20 text-rose-300 text-[10px] overflow-x-auto whitespace-pre-wrap">
            {current.vulnerablePayload}
          </pre>
        </div>

        {/* Hardened Defense */}
        <div className="p-3 rounded-lg border border-emerald-500/30 bg-emerald-950/20 space-y-2">
          <div className="text-emerald-400 font-bold text-[11px] flex items-center justify-between">
            <span>Applied Defense Code</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/30 border border-emerald-500/40">
              {current.status}
            </span>
          </div>
          <div className="text-[10px] text-slate-400">{current.hardenedSolution}</div>
          <pre className="p-2 rounded bg-black/60 border border-emerald-500/20 text-emerald-300 text-[10px] overflow-x-auto whitespace-pre-wrap">
            {current.defenseCode}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// MASTER VISUALIZER CONTAINER
// ==========================================
export default function Project3DVisualizer({ defaultProject = "splunk" }) {
  const [activeProject, setActiveProject] = useState(defaultProject);

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl backdrop-blur-xl overflow-hidden">
      {/* Global Simulator Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2">
            SEC-OPS TELEMETRY SIMULATOR
          </span>
        </div>

        {/* Navigation Tabs for each project */}
        <div className="flex flex-wrap gap-1.5">
          {Object.values(PROJECT_CONFIGS).map((cfg) => (
            <button
              key={cfg.id}
              onClick={() => setActiveProject(cfg.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeProject === cfg.id
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
              }`}
            >
              <span>{cfg.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Active Header Info */}
      <div className="px-5 py-3 border-b border-slate-800/50 bg-slate-950/40 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white tracking-wide">
              {PROJECT_CONFIGS[activeProject]?.title}
            </h3>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${PROJECT_CONFIGS[activeProject]?.badgeColor}`}
            >
              {PROJECT_CONFIGS[activeProject]?.badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {PROJECT_CONFIGS[activeProject]?.description}
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>REALTIME INTERACTION ENABLED</span>
        </div>
      </div>

      {/* Active Dedicated Visualizer Body */}
      <div className="min-h-[340px] flex items-center justify-center bg-radial from-slate-900/30 to-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {activeProject === "splunk" && <SplunkRadarVisualizer />}
            {activeProject === "packet" && <PacketAnalyzerVisualizer />}
            {activeProject === "firewall" && <FirewallTopologyVisualizer />}
            {activeProject === "cyberlab" && <CyberLabTerminalVisualizer />}
            {activeProject === "finance" && <SecureFinanceVisualizer />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
