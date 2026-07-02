import React from "react";
import Navbar from "@/components/Navbar";
import ProjectVault from "@/components/ProjectVault";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
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

        <p className="text-slate-400 text-sm leading-relaxed mb-12 max-w-2xl">
          A collection of security engineering, network analysis, and full-stack development projects.
          Each project reflects hands-on technical depth — from enterprise firewall simulations to 
          real-time packet analysis and SIEM ingestion pipelines.
        </p>

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
