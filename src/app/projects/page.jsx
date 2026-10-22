import React from "react";
import Navbar from "@/components/Navbar";
import ProjectVault from "@/components/ProjectVault";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import Project3DVisualizer from "@/components/Project3DVisualizer";
import Link from "next/link";

export const metadata = {
  title: "Projects — Parth Pandey Portfolio",
  description:
    "Security engineering and software projects by Parth Pandey — Splunk SIEM SOC Lab, C++ Packet Analyzer, Enterprise Firewall Topology, MERN Stack Web Clones.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative">
      <InteractiveBackground />
      <Navbar />

      <div className="relative z-10 pt-28 pb-24 max-w-6xl mx-auto px-4">
        <SectionHeader
          title="Project Vault"
          subtitle="selected work"
          accent="cyan"
        />

        <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-2xl">
          A collection of security engineering, network analysis, and full-stack development projects.
          Each project reflects hands-on technical depth — from enterprise firewall simulations to 
          real-time packet analysis and SIEM ingestion pipelines.
        </p>

        {/* ── 3D Live Network Architecture Simulation ── */}
        <div className="mb-14">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold font-mono text-slate-100 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Interactive 3D Network Topology &amp; Attack Simulation
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Test live kill-chain traversals across enterprise boundaries, DMZ segregation, and Check Point / Cisco ASA filtering.
              </p>
            </div>
          </div>
          <Project3DVisualizer defaultProject="firewall" />
        </div>

        <ProjectVault />

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono">
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
