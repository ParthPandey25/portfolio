"use client";

import React, { useState, useEffect } from "react";
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
  Zap,
  Info,
  Cpu,
  Lock,
  Unlock,
  Layers,
  Search,
  ExternalLink,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════
// PROJECT ARCHITECTURES DATA DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════

export const PROJECT_3D_DATA = {
  // ── 1. SPLUNK SOC & AWS CLOUDTRAIL LAB ──────────────────────────────
  splunk: {
    id: "splunk",
    title: "Home SOC Lab: AWS CloudTrail & Splunk SIEM Pipeline",
    badge: "Cloud Threat Detection & SIEM",
    badgeColor: "text-red-400 bg-red-500/10 border-red-500/30",
    description:
      "Full cloud security pipeline ingesting AWS CloudTrail management events and VPC Flow Logs into Splunk Enterprise. Features 12 custom SPL detection rules mapped across 8 MITRE ATT&CK techniques with real-time SOC incident telemetry.",
    nodes: {
      adversary: {
        id: "adversary",
        name: "Adversary / Threat Actor",
        zone: "EXTERNAL INTERNET",
        detail: "IP: 198.51.100.45 · Automated AWS API exploitation, credential stuffing & IAM privilege escalation.",
        color: "#ef4444",
      },
      aws_iam: {
        id: "aws_iam",
        name: "AWS IAM & Console Plane",
        zone: "AWS CONTROL PLANE",
        detail: "Authentication & Authorization endpoint. Intercepts root logins, token minting, and policy attaches.",
        color: "#f59e0b",
      },
      cloudtrail: {
        id: "cloudtrail",
        name: "AWS CloudTrail & S3 Ingestion",
        zone: "AWS TELEMETRY STREAM",
        detail: "Continuous audit trail recording all API calls across us-east-1 and ap-south-1. Encrypted S3 bucket sink.",
        color: "#06b6d4",
      },
      splunk_hf: {
        id: "splunk_hf",
        name: "Splunk Heavy Forwarder",
        zone: "ON-PREM / CLOUD EDGE",
        detail: "Parses AWS JSON events, filters benign high-volume noise, and applies index-time timestamp parsing.",
        color: "#3b82f6",
      },
      splunk_indexer: {
        id: "splunk_indexer",
        name: "Splunk Enterprise Core Indexer",
        zone: "SIEM STORAGE CLUSTER",
        detail: "Index: aws_cloudtrail · Compressed bucket storage with 12 real-time MITRE ATT&CK scheduled SPL alerts.",
        color: "#a855f7",
      },
      soc_console: {
        id: "soc_console",
        name: "SOC Analyst Triage Dashboard",
        zone: "SECURITY OPERATIONS CENTER",
        detail: "Real-time incident response queue: IR-001 (Brute Force), IR-002 (Lateral Movement), IR-003 (Exfiltration).",
        color: "#10b981",
      },
    },
    phases: [
      {
        id: "ingest",
        name: "Phase 1: Malicious API Call",
        subtitle: "Root Console Login without MFA (T1078)",
        desc: "Adversary initiates unauthorized interactive console login using harvested root credentials from source IP 203.0.113.88 without hardware MFA challenge.",
        path: [120, 310, 470],
        outcome: "AWS CLOUDTRAIL LOGGED",
        outcomeColor: "text-amber-400",
        logs: [
          "[14:10:02] AWS CloudTrail event: ConsoleLogin from 203.0.113.88",
          "[14:10:02] additionalEventData.MFAUsed = 'No' · userIdentity.type = 'Root'",
          "[14:10:04] S3 Bucket event stream: s3://soc-cloudtrail-logs/AWSLogs/14022.json.gz written",
        ],
      },
      {
        id: "parse",
        name: "Phase 2: Heavy Forwarder Pipeline",
        subtitle: "Event Parsing & Normalization",
        desc: "Splunk Heavy Forwarder polls S3 SQS queue, uncompresses the CloudTrail log batch, extracts JSON key-value pairs, and tags eventtype=aws_console_login.",
        path: [470, 620, 750],
        outcome: "PARSED & INDEXED (12ms)",
        outcomeColor: "text-cyan-400",
        logs: [
          "[14:10:05] Splunk HF: Ingested 450 events from SQS queue",
          "[14:10:06] Field extraction: src_ip=203.0.113.88, user=root, action=success",
          "[14:10:07] Forwarded to index=aws_cloudtrail on port 9997 (TLS 1.3)",
        ],
      },
      {
        id: "alert",
        name: "Phase 3: MITRE SPL Detection & Triage",
        subtitle: "CRITICAL Alert & Incident IR-002 Auto-Created",
        desc: "Splunk scheduled search evaluates SPL query: detects root console login without MFA within 5m window. Generates CRITICAL alert in SOC queue.",
        path: [750, 880],
        outcome: "CRITICAL SOC ALERT TRIGGERED",
        outcomeColor: "text-red-400",
        logs: [
          "[14:10:08] SPL Rule T1078 matched: index=aws_cloudtrail eventName=ConsoleLogin MFAUsed=No",
          "[14:10:09] SOC Alert ID: ALT-902 [SEVERITY: CRITICAL] generated",
          "[14:10:10] Automated SOC playbook: IR-002 incident report opened · Slack & PagerDuty notified",
        ],
      },
    ],
  },

  // ── 2. C++ PACKET ANALYZER (libpcap & std::atomic) ──────────────────
  packet: {
    id: "packet",
    title: "High-Performance Packet Analyzer (C++17 & libpcap)",
    badge: "Native Multi-Threaded Engine",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    description:
      "Native multi-threaded network traffic engine decoding raw Ethernet frames, IPv4/IPv6, TCP, UDP, and ICMP headers with sub-millisecond parsing latency. Benchmarked at 100,000+ packets per second replaying synthetic PCAP captures using lock-free std::atomic counters.",
    nodes: {
      nic: {
        id: "nic",
        name: "10GbE Network Interface (NIC / TAP)",
        zone: "PHYSICAL LAYER",
        detail: "Promiscuous mode capture capturing raw line-rate Ethernet frames via libpcap AF_PACKET.",
        color: "#f59e0b",
      },
      ring_buffer: {
        id: "ring_buffer",
        name: "Zero-Copy Ring Buffer",
        zone: "KERNEL / USERSPACE TRANSIT",
        detail: "Circular memory ring buffer avoiding costly per-packet memory allocation overhead.",
        color: "#06b6d4",
      },
      worker_pool: {
        id: "worker_pool",
        name: "Multi-Threaded Worker Pool",
        zone: "C++17 PARALLEL RUNTIME",
        detail: "Thread pool mapped to CPU affinity cores, processing frame batches in parallel.",
        color: "#3b82f6",
      },
      protocol_parser: {
        id: "protocol_parser",
        name: "L2/L3/L4 Protocol Parser",
        zone: "DEEP PACKET INSPECTION",
        detail: "Strict bit-shift header decoding: Ethernet II, 802.1Q VLAN, IPv4, IPv6, TCP flags, UDP, ICMP.",
        color: "#a855f7",
      },
      atomic_counters: {
        id: "atomic_counters",
        name: "Lock-Free std::atomic Cache",
        zone: "METRICS ENGINE",
        detail: "std::atomic<uint64_t> counters benchmarked at 100,000+ PPS without lock contention.",
        color: "#10b981",
      },
      forensic_sink: {
        id: "forensic_sink",
        name: "Forensic PCAP Replay Sink",
        zone: "ANALYTICS SINK",
        detail: "Synthetic benchmark replay engine: test_pcaps/benchmark_100k.pcap verified in 0.98s.",
        color: "#38bdf8",
      },
    },
    phases: [
      {
        id: "capture",
        name: "Phase 1: Wire Ingestion",
        subtitle: "10GbE Line-Rate Frame Capture",
        desc: "Raw Ethernet frames hit the NIC, captured in promiscuous mode with zero-copy ring buffer transit.",
        path: [120, 310, 470],
        outcome: "100k+ PPS INGESTED",
        outcomeColor: "text-amber-400",
        logs: [
          "[00:00:01] pcap_open_live('eth0', snaplen=65535, promisc=1, to_ms=1) OK",
          "[00:00:01] Ring buffer allocated: 64MB locked page pool",
          "[00:00:01] Ingestion rate: 100,240 pkts/sec · 684.2 Mbps",
        ],
      },
      {
        id: "parallel_decode",
        name: "Phase 2: Multi-Threaded Worker Parsing",
        subtitle: "L2/L3/L4 Header Extraction",
        desc: "Worker threads pull batches from the ring buffer, validating checksums and unpacking TCP/UDP payload headers without memory allocations.",
        path: [470, 620, 750],
        outcome: "PARALLEL DECODE (0.009ms)",
        outcomeColor: "text-cyan-400",
        logs: [
          "[00:00:02] Thread #1: Parsed 25,000 TCP SYN/ACK segments",
          "[00:00:02] Thread #2: Parsed 25,000 UDP DNS queries (Port 53)",
          "[00:00:02] Thread #3: Parsed 25,000 IPv6 TLS ClientHello payloads",
          "[00:00:02] Thread #4: Parsed 25,000 ICMP Echo telemetry frames",
        ],
      },
      {
        id: "atomic_stats",
        name: "Phase 3: Lock-Free Aggregation",
        subtitle: "100k Replay Benchmark Validated",
        desc: "Lock-free std::atomic counters accumulate total bytes, packet classifications, and throughput rates without thread contention.",
        path: [750, 880],
        outcome: "BENCHMARK: 100,000 PACKETS IN 0.98s",
        outcomeColor: "text-emerald-400",
        logs: [
          "[00:00:03] atomic_fetch_add(total_packets, 100000) finished in 0.982s",
          "[00:00:03] Protocol breakdown: TCP=64,210, UDP=31,450, ICMP=4,340",
          "[00:00:03] Zero packet drops detected (rx_dropped = 0)",
        ],
      },
    ],
  },

  // ── 3. DISTRIBUTED ENTERPRISE FIREWALL TOPOLOGY (CRTA) ──────────────
  firewall: {
    id: "firewall",
    title: "Distributed Enterprise Firewall Topology & Policy Auditor",
    badge: "Zero-Trust Perimeter & DMZ",
    badgeColor: "text-orange-400 bg-orange-500/10 border-orange-500/30",
    description:
      "High-availability corporate edge architecture with Cisco ASA and Check Point Gaia zero-trust zone segmentation (OUTSIDE, DMZ, CORP-INTERNAL). Tested against 10 distinct cross-zone attack scenarios with custom Python policy compliance auditor.",
    nodes: {
      attacker: {
        id: "attacker",
        name: "Red Team Analyst Station",
        zone: "EXTERNAL WAN",
        detail: "Kali Linux / Metasploit Pro adversary simulator testing cross-zone perimeter policies.",
        color: "#ef4444",
      },
      fw_edge: {
        id: "fw_edge",
        name: "Cisco ASA 5525-X Perimeter",
        zone: "WAN BOUNDARY",
        detail: "Security level 0 -> 50. Stateful inspection permitting HTTPS 443 to DMZ Web Server.",
        color: "#f97316",
      },
      dmz_web: {
        id: "dmz_web",
        name: "Web Server (DMZ)",
        zone: "DE-MILITARIZED ZONE",
        detail: "Windows Server 2022 / IIS 10.0 (10.0.1.10) hosting public application frontend.",
        color: "#38bdf8",
      },
      fw_internal: {
        id: "fw_internal",
        name: "Check Point Gaia Core VSX",
        zone: "CORE SECURITY BOUNDARY",
        detail: "Security level 50 -> 100. Enforces Zero-Trust rule #42: DROPS unauthorized SMB/445 and RDP pivots.",
        color: "#f97316",
      },
      ad_dc: {
        id: "ad_dc",
        name: "Active Directory Domain Controller",
        zone: "MILITARIZED INTERNAL CORE",
        detail: "Windows Server 2022 DC (10.0.2.10). Kerberos KDC engine protected against Pass-the-Hash.",
        color: "#3b82f6",
      },
      db_server: {
        id: "db_server",
        name: "Corporate Database Server",
        zone: "MILITARIZED INTERNAL CORE",
        detail: "Customer records (10.0.2.50). Isolated: only reachable via verified App Server mTLS queries.",
        color: "#10b981",
      },
    },
    phases: [
      {
        id: "perimeter_infil",
        name: "Phase 1: Perimeter Infiltration",
        subtitle: "HTTP Exploit & Reverse Shell",
        desc: "Attacker discovers open Port 443 on DMZ Web Server. Exploits web application vulnerability; edge firewall permits ingress 443.",
        path: [120, 310, 470],
        outcome: "DMZ FOOTHOLD ESTABLISHED",
        outcomeColor: "text-amber-400",
        logs: [
          "[14:20:01] Cisco ASA: ALLOW INGRESS TCP 198.51.100.24:54210 -> 10.0.1.10:443",
          "[14:20:03] Web Server: Spawning reverse shell beacon to 198.51.100.24:4444",
          "[14:20:05] Attacker: Caught interactive shell (NT AUTHORITY\\SYSTEM)",
        ],
      },
      {
        id: "pivot_block",
        name: "Phase 2: Zero-Trust Lateral Block",
        subtitle: "Check Point Drops SMB Pivot",
        desc: "Adversary attempts to pivot laterally from DMZ to Internal Database via SMB (Port 445). Check Point Gaia rule #42 intercepts and drops the packet.",
        path: [470, 620],
        outcome: "ATTACK INTERCEPTED & DROPPED",
        outcomeColor: "text-emerald-400",
        logs: [
          "[14:20:10] Lateral probe: 10.0.1.10 -> 10.0.2.50:445 (SMB direct probe)",
          "[14:20:11] Check Point Gaia: RULE #42 (DMZ_TO_CORP_DROP) -> ACTION: DROP",
          "[14:20:12] Syslog generated: Unauthorized cross-zone traffic attempt logged",
        ],
      },
      {
        id: "policy_audit",
        name: "Phase 3: Python Policy Compliance",
        subtitle: "Automated ACL Hardening Audit",
        desc: "Custom Python compliance auditor scans firewall configuration files, verifies 0 over-permissive ANY-ANY rules, and generates audit report.",
        path: [620, 880],
        outcome: "10 ATTACK SCENARIOS COMPLIANT",
        outcomeColor: "text-cyan-400",
        logs: [
          "[14:20:15] Running audit_engine.py against configs/gaia_vsx_baseline.cfg",
          "[14:20:16] Zone isolation verified: OUTSIDE (0) -> DMZ (50) -> CORP (100)",
          "[14:20:17] tests/cross_zone_attack_matrix.md: 10/10 tests PASSED",
        ],
      },
    ],
  },

  // ── 4. ENTERPRISE SECURE FINANCE PLATFORM (Spring Security) ─────────
  finance: {
    id: "finance",
    title: "Enterprise Secure Finance Platform (OWASP Hardened)",
    badge: "Web App Pentesting & Defense",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    description:
      "Full-stack financial management platform (Spring Boot Java Security + Express API + React) hardened against OWASP Top 10 vulnerabilities. Features DAST/SAST penetration testing documentation, JWT RBAC, BOLA/IDOR mitigation, and rate limiting.",
    nodes: {
      client: {
        id: "client",
        name: "Client Browser / Attacker",
        zone: "UNTRUSTED PUBLIC WEB",
        detail: "Sends HTTP/REST requests. Simulates OWASP Top 10 exploits: SQLi, XSS, BOLA, IDOR.",
        color: "#ef4444",
      },
      waf: {
        id: "waf",
        name: "Cloudflare Edge WAF & Shield",
        zone: "EDGE APPLICATION SHIELD",
        detail: "Terminates TLS 1.3, applies DDoS rate limiting, and scrubs malicious SQL injection patterns.",
        color: "#f59e0b",
      },
      react_app: {
        id: "react_app",
        name: "React Frontend Container",
        zone: "PRESENTATION TIER",
        detail: "Sanitizes input with DOMPurify, enforces Strict Content-Security-Policy (CSP), HttpOnly cookies.",
        color: "#06b6d4",
      },
      spring_sec: {
        id: "spring_sec",
        name: "Spring Security & JWT Filter",
        zone: "APPLICATION GATEWAY",
        detail: "Validates HMAC-SHA256 JWT tokens, extracts claims, and blocks unauthorized BOLA/IDOR object queries.",
        color: "#3b82f6",
      },
      rbac_engine: {
        id: "rbac_engine",
        name: "RBAC Authorization Engine",
        zone: "BUSINESS LOGIC",
        detail: "Enforces @PreAuthorize('hasRole(\"FINANCE_ADMIN\")') annotations across sensitive endpoints.",
        color: "#a855f7",
      },
      secure_db: {
        id: "secure_db",
        name: "Encrypted PostgreSQL Database",
        zone: "DATA VAULT (AES-256)",
        detail: "Parameterized JDBC queries (no SQL injection possible), encrypted columns at rest with pgcrypto.",
        color: "#10b981",
      },
    },
    phases: [
      {
        id: "sqli_attempt",
        name: "Phase 1: SQL Injection Attack",
        subtitle: "Blocked by Parameterized Queries",
        desc: "Attacker submits `' OR '1'='1` in the login username field. The WAF flags the pattern and the Spring Data JPA repository executes parameterized queries, neutralizing the injection.",
        path: [120, 310, 470],
        outcome: "SQL INJECTION BLOCKED",
        outcomeColor: "text-emerald-400",
        logs: [
          "[11:15:02] POST /api/v1/auth/login with payload: username=' OR 1=1--",
          "[11:15:02] Cloudflare WAF: Rule 100001 (SQLi detection) matched -> Flagged",
          "[11:15:03] Spring Data JPA: Parameterized query: SELECT u FROM User u WHERE u.username = :param",
          "[11:15:03] Result: 401 Unauthorized (Injection neutralized)",
        ],
      },
      {
        id: "jwt_auth",
        name: "Phase 2: Valid JWT Authentication",
        subtitle: "Stateless Role-Based Access Control",
        desc: "Legitimate user logs in with MFA. Spring Security issues a signed HMAC-SHA256 JWT with expiration and user permissions embedded in claims.",
        path: [470, 620, 750],
        outcome: "JWT TOKEN ISSUED (200 OK)",
        outcomeColor: "text-cyan-400",
        logs: [
          "[11:15:10] User 'parth.admin' authenticated with BCrypt password + MFA token",
          "[11:15:11] JwtTokenProvider: Signed token generated with roles=['ROLE_USER', 'ROLE_ADMIN']",
          "[11:15:12] Response returned with HttpOnly Secure SameSite=Strict cookie",
        ],
      },
      {
        id: "idor_defense",
        name: "Phase 3: BOLA / IDOR Defense",
        subtitle: "Access Control Checks",
        desc: "Attacker tampers with URL `GET /api/accounts/9941` to view another customer's balance. Spring Security intercepts request and verifies ownership before database query.",
        path: [750, 880],
        outcome: "403 FORBIDDEN (BOLA PREVENTED)",
        outcomeColor: "text-emerald-400",
        logs: [
          "[11:15:20] GET /api/v1/accounts/9941 requested by user_id=1402",
          "[11:15:21] AccountSecurityService: Account 9941 does NOT belong to user 1402",
          "[11:15:22] Audit event logged: Unauthorized object access attempt -> 403 Forbidden returned",
        ],
      },
    ],
  },

  // ── 5. TRYHACKME CYBERLAB & TOOL TROUBLESHOOTING ────────────────────
  cyberlab: {
    id: "cyberlab",
    title: "TryHackMe Security Research: Where Tools Break",
    badge: "Offensive Security & CTF Mastery",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/30",
    description:
      "Technical deep-dive into hands-on offensive security realities: 12 published write-ups documenting real CTF challenges (Mr. Robot, EternalBlue, Ice, Windows PrivEsc) and resolving real-world tool failures (dictionary freezes, dumb shells, vanishing Meterpreters).",
    nodes: {
      kali_vm: {
        id: "kali_vm",
        name: "Kali Linux Red Team Workstation",
        zone: "OFFENSIVE ENVIRONMENT",
        detail: "Top 2% Globally ranked TryHackMe practitioner workstation running Nmap, Gobuster, Metasploit, Hashcat.",
        color: "#ef4444",
      },
      target_box: {
        id: "target_box",
        name: "CTF Target Vulnerable Box",
        zone: "TARGET NETWORK (THM VPN)",
        detail: "Target: 10.10.x.x · Hosts misconfigured web services, unpatched services, and privilege escalation vectors.",
        color: "#f59e0b",
      },
      recon_engine: {
        id: "recon_engine",
        name: "Recon & Dictionary Pruning",
        zone: "ENUMERATION STAGE",
        detail: "Nmap port scanning & custom wordlist pruning via 'sort -u' reducing 850,000 words down to 43,000 unique entries.",
        color: "#06b6d4",
      },
      exploit_stage: {
        id: "exploit_stage",
        name: "Exploit Infiltration / RCE",
        zone: "INITIAL COMPROMISE",
        detail: "CVE-2014-0759 Icecast exploit / MS17-010 EternalBlue kernel buffer overflow targeting SMBv1.",
        color: "#a855f7",
      },
      shell_upgrade: {
        id: "shell_upgrade",
        name: "Interactive TTY Shell Upgrade",
        zone: "POST-EXPLOITATION",
        detail: "Upgrading netcat dumb shell using python3 -c 'import pty; pty.spawn(\"/bin/bash\")' and stty raw -echo.",
        color: "#3b82f6",
      },
      root_shell: {
        id: "root_shell",
        name: "Root / NT AUTHORITY\\SYSTEM",
        zone: "FULL SYSTEM COMPROMISE",
        detail: "PrivEsc via PrintSpoofer / Unquoted Service Paths / SUID bit escalation. Flag captured & documented.",
        color: "#10b981",
      },
    },
    phases: [
      {
        id: "recon",
        name: "Phase 1: Port Recon & Tool Troubleshooting",
        subtitle: "Overcoming Wordlist Freezes",
        desc: "Standard tools froze on huge 850k-line dictionary. Engineered custom pipeline `cat fsocity.dic | sort -u | uniq > clean.dic` reducing payload size by 95% and discovering credentials in 4 minutes.",
        path: [120, 310, 470],
        outcome: "DICTIONARY PRUNED & USER FOUND",
        outcomeColor: "text-cyan-400",
        logs: [
          "[10:01:05] Scanning target 10.10.114.88: Ports 80, 443, 22 OPEN",
          "[10:01:10] Wordlist optimization: 858,160 words -> 43,221 unique entries",
          "[10:01:15] Hydration script found valid WordPress login for user 'elliot'",
        ],
      },
      {
        id: "exploit",
        name: "Phase 2: Exploit & Shell Stabilization",
        subtitle: "Bypassing Dumb Shell Hangs",
        desc: "Reverse netcat shell dropped on Ctrl+C. Stabilized session using Python PTY spawn and migrated Meterpreter process into spoolsv.exe to prevent host service termination.",
        path: [470, 620, 750],
        outcome: "PERSISTENT STABLE SHELL",
        outcomeColor: "text-amber-400",
        logs: [
          "[10:02:01] Exploit sent: CVE-2014-0759 payload executed",
          "[10:02:02] Netcat caught inbound connection: /bin/sh (dumb shell)",
          "[10:02:03] Upgraded TTY: python3 -c 'import pty; pty.spawn(\"/bin/bash\")'",
          "[10:02:05] Process migration to PID 1420 (spoolsv.exe) SUCCESS",
        ],
      },
      {
        id: "privesc",
        name: "Phase 3: Privilege Escalation to Root",
        subtitle: "Full Root / SYSTEM Access",
        desc: "Identified SeImpersonatePrivilege on target Windows box. Executed PrintSpoofer.exe to mint elevated token and captured root flag `root.txt`.",
        path: [750, 880],
        outcome: "ROOT FLAG CAPTURED 🏆",
        outcomeColor: "text-emerald-400",
        logs: [
          "[10:03:10] whoami /priv -> SeImpersonatePrivilege ENABLED",
          "[10:03:12] Executing: PrintSpoofer.exe -i -c cmd.exe",
          "[10:03:14] Successfully elevated -> whoami: NT AUTHORITY\\SYSTEM",
          "[10:03:15] Flag verified: THM{m4st3r_0f_pr1v_3sc_2026} · Write-up published to CyberLab",
        ],
      },
    ],
  },
};

export default function Project3DVisualizer({ defaultProject = "firewall" }) {
  const [selectedProjectId, setSelectedProjectId] = useState(defaultProject);
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [packetProgress, setPacketProgress] = useState(0); // 0 to 100
  const [liveLogIdx, setLiveLogIdx] = useState(0);

  const projectData = PROJECT_3D_DATA[selectedProjectId] || PROJECT_3D_DATA.firewall;
  const nodeKeys = Object.keys(projectData.nodes);
  const [selectedNodeKey, setSelectedNodeKey] = useState(nodeKeys[0]);

  const activePhase = projectData.phases[activePhaseIdx] || projectData.phases[0];
  const selectedNode = projectData.nodes[selectedNodeKey] || projectData.nodes[nodeKeys[0]];

  // Reset when project switches
  useEffect(() => {
    setActivePhaseIdx(0);
    setPacketProgress(0);
    setLiveLogIdx(0);
    setSelectedNodeKey(Object.keys(projectData.nodes)[0]);
  }, [selectedProjectId, projectData]);

  // Animation ticker for packet movement
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPacketProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + 2;
      });
    }, 38);
    return () => clearInterval(interval);
  }, [isPlaying, activePhase]);

  // Live log rotation
  useEffect(() => {
    const logInterval = setInterval(() => {
      setLiveLogIdx((prev) => (prev + 1) % activePhase.logs.length);
    }, 2800);
    return () => clearInterval(logInterval);
  }, [activePhase]);

  return (
    <div className="w-full rounded-2xl bg-slate-950/95 border border-slate-800/80 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-hidden font-sans">
      {/* ── Visualizer Header Bar ───────────────────────────────────── */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Radio size={20} className="animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-100 font-mono tracking-tight">
                3D Live Architecture &amp; System Simulator
              </h3>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                MULTI-PROJECT ENGINE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Live animated 3D modeling of data flow, security boundaries, and telemetry
            </p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
            title={isPlaying ? "Pause Simulation" : "Resume Simulation"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="text-emerald-400" />}
            <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <button
            onClick={() => {
              setPacketProgress(0);
              setLiveLogIdx(0);
            }}
            className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 transition-colors"
            title="Reset Animation"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* ── PROJECT SELECTOR TABS (Switch between all 5 project models) ── */}
      <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider shrink-0 pl-1">
          Select Project 3D Model:
        </span>
        {Object.values(PROJECT_3D_DATA).map((proj) => {
          const isActive = proj.id === selectedProjectId;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProjectId(proj.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)] font-bold"
                  : "bg-slate-950/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
              {proj.title.split(":")[0]}
            </button>
          );
        })}
      </div>

      {/* ── Active Project Phase Selector ──────────────────────────── */}
      <div className="px-4 py-2 bg-slate-950 border-b border-slate-800/50 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider shrink-0">
          Simulation Steps:
        </span>
        {projectData.phases.map((ph, idx) => {
          const isActive = activePhaseIdx === idx;
          return (
            <button
              key={ph.id}
              onClick={() => {
                setActivePhaseIdx(idx);
                setPacketProgress(0);
                setLiveLogIdx(0);
              }}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-all ${
                isActive
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {ph.name}
            </button>
          );
        })}
      </div>

      {/* ── Main Interactive 3D Stage & Details Grid ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* ── 3D Isometric SVG Canvas (8 cols on lg) ────────────────── */}
        <div className="lg:col-span-8 p-4 sm:p-6 bg-radial-gradient relative min-h-[440px] sm:min-h-[500px] flex items-center justify-center overflow-hidden select-none">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

          {/* Isometric SVG Canvas */}
          <svg
            viewBox="0 0 1000 580"
            className="w-full h-full max-h-[540px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <filter id="glow-p3d" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="grad-path" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* ── Isometric Base Grid Floor ── */}
            <polygon
              points="100,280 500,80 900,280 500,480"
              fill="#030712"
              fillOpacity="0.75"
              stroke="#1e293b"
              strokeWidth="2"
            />
            {/* Grid inner rings */}
            <polygon
              points="200,280 500,130 800,280 500,430"
              fill="#082f49"
              fillOpacity="0.15"
              stroke="#0284c7"
              strokeWidth="1.5"
              strokeDasharray="4,4"
            />

            {/* ── Highway Path Connecting All 6 Nodes ── */}
            <path
              d="M 120,380 L 280,310 L 450,240 L 620,180 L 780,250 L 860,330"
              stroke="url(#grad-path)"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M 120,380 L 280,310 L 450,240 L 620,180 L 780,250 L 860,330"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="6,6"
              fill="none"
              opacity="0.5"
            />

            {/* ── Animated Packet Traveling Along Path ── */}
            {isPlaying && (
              <g>
                <circle
                  cx={120 + (packetProgress / 100) * (860 - 120)}
                  cy={380 + Math.sin((packetProgress / 100) * Math.PI) * -160}
                  r="9"
                  fill="#38bdf8"
                  filter="url(#glow-p3d)"
                >
                  <animate attributeName="r" values="7;11;7" dur="0.8s" repeatCount="indefinite" />
                </circle>
              </g>
            )}

            {/* ── 6 Isometric Nodes Rendered Dynamically ── */}
            {nodeKeys.map((key, i) => {
              const node = projectData.nodes[key];
              const isSelected = selectedNodeKey === key;
              // Coordinate offsets along isometric diagonal
              const coords = [
                { x: 120, y: 380 },
                { x: 280, y: 310 },
                { x: 450, y: 240 },
                { x: 620, y: 180 },
                { x: 780, y: 250 },
                { x: 860, y: 330 },
              ][i] || { x: 500, y: 280 };

              return (
                <g
                  key={key}
                  transform={`translate(${coords.x - 30}, ${coords.y - 30})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedNodeKey(key)}
                >
                  {/* Selection highlight aura */}
                  {isSelected && (
                    <ellipse
                      cx="30"
                      cy="30"
                      rx="48"
                      ry="28"
                      fill={node.color}
                      opacity="0.35"
                      filter="url(#glow-p3d)"
                    />
                  )}

                  {/* 3D Isometric Node Block */}
                  <polygon
                    points="0,20 30,5 60,20 30,35"
                    fill={node.color}
                    fillOpacity="0.85"
                  />
                  <polygon
                    points="0,20 30,35 30,60 0,45"
                    fill={node.color}
                    fillOpacity="0.65"
                  />
                  <polygon
                    points="30,35 60,20 60,45 30,60"
                    fill={node.color}
                    fillOpacity="0.45"
                  />

                  {/* Inner Node Core / LED Indicator */}
                  <circle cx="30" cy="20" r="5" fill="#ffffff" opacity="0.9" />

                  {/* Node Name Label */}
                  <text
                    x="30"
                    y="76"
                    textAnchor="middle"
                    fill={isSelected ? "#ffffff" : "#94a3b8"}
                    fontSize="11"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {node.name.split(" ")[0]} {node.name.split(" ")[1] || ""}
                  </text>
                  <text
                    x="30"
                    y="90"
                    textAnchor="middle"
                    fill={node.color}
                    fontSize="9"
                    fontWeight="normal"
                    fontFamily="monospace"
                  >
                    [{node.zone.split(" ")[0]}]
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Interactive Hint Banner */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-900/80 backdrop-blur border border-slate-800 px-3 py-1.5 rounded-lg pointer-events-none">
            <span className="flex items-center gap-1.5">
              <Info size={13} className="text-cyan-400" />
              Click any 3D node above to inspect component telemetry, ports &amp; security logic
            </span>
            <span className={`hidden sm:inline font-bold ${activePhase.outcomeColor}`}>
              ● {activePhase.outcome}
            </span>
          </div>
        </div>

        {/* ── Node Telemetry & Phase Inspector (4 cols on lg) ───────── */}
        <div className="lg:col-span-4 p-4 sm:p-5 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-950/80 flex flex-col justify-between space-y-4">
          {/* Active Phase Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${projectData.badgeColor}`}>
                {projectData.badge}
              </span>
              <span className={`text-xs font-mono font-bold ${activePhase.outcomeColor}`}>
                {activePhase.outcome}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-100 font-mono">
              {activePhase.name}: {activePhase.subtitle}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {activePhase.desc}
            </p>
          </div>

          {/* Selected Node Details */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/90 space-y-2">
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
                ACTIVE NODE
              </span>
            </div>
            <div className="text-[11px] font-mono space-y-1">
              <p>
                <span className="text-slate-500">Subsystem Zone:</span>{" "}
                <span className="text-slate-300 font-bold">{selectedNode.zone}</span>
              </p>
              <p className="text-slate-400 leading-normal border-t border-slate-800/60 pt-1.5">
                {selectedNode.detail}
              </p>
            </div>
          </div>

          {/* Live Syslog Telemetry Stream */}
          <div className="p-3 bg-black/90 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between text-slate-500 border-b border-slate-800/80 pb-1 text-[10px]">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Terminal size={11} /> LIVE PIPELINE LOG
              </span>
              <span>TELEMETRY STREAM</span>
            </div>
            <div className="space-y-1 py-1 max-h-24 overflow-y-auto scrollbar-thin">
              {activePhase.logs.map((log, lIdx) => (
                <div
                  key={lIdx}
                  className={`text-[10px] sm:text-[11px] leading-tight transition-colors ${
                    lIdx === liveLogIdx
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
