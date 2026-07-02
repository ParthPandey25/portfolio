import React from "react";
import TerminalHero from "@/components/TerminalHero";
import DomainMatrix from "@/components/DomainMatrix";
import ProjectVault from "@/components/ProjectVault";
import CredentialGrid from "@/components/CredentialGrid";
import InteractiveBackground from "@/components/InteractiveBackground";
import BootSequenceWrapper from "@/components/BootSequenceWrapper";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionHeader from "@/components/SectionHeader";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Parth Pandey — Network & Security AI Engineer",
  description:
    "Portfolio of Parth Pandey — Network & Security AI Engineer specialising in Check Point, Palo Alto, Zscaler ZTNA, Splunk SIEM, AWS Cloud Security, and SOC Blue Team operations.",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative overflow-hidden">
      <BootSequenceWrapper />
      <InteractiveBackground />
      <Navbar />

      {/* ── Hero ─────────────────────────────── */}
      <section id="hero" className="relative z-10 pt-28 md:pt-36">
        <TerminalHero />
      </section>

      {/* ── About blurb ──────────────────────── */}
      <section id="about" className="relative z-10 mt-4 md:mt-8">
        <AboutSection />
      </section>

      {/* ── Core Domains ─────────────────────── */}
      <section id="domains" className="relative z-10 mt-24 md:mt-32">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <SectionHeader
            title="Core Domains"
            subtitle="expertise areas"
            accent="dual"
          />
        </div>
        <DomainMatrix />
      </section>

      {/* ── Recent Experience Preview ─────────── */}
      <section id="experience-preview" className="relative z-10 mt-24 md:mt-32">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            title="Experience Highlights"
            subtitle="work & internships"
            accent="emerald"
          />
          <ExperienceTimeline limit={3} />
          <div className="mt-4 text-center">
            <Link
              href="/experience"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400/60 transition-all font-medium text-sm"
            >
              View All 11 Roles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Projects ─────────────────────────── */}
      <section id="projects" className="relative z-10 mt-24 md:mt-32">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <SectionHeader
            title="Project Vault"
            subtitle="selected work"
            accent="cyan"
          />
        </div>
        <ProjectVault />
      </section>

      {/* ── Credentials ──────────────────────── */}
      <section id="credentials" className="relative z-10 mt-24 md:mt-32">
        <div className="max-w-6xl mx-auto px-4 mb-10">
          <SectionHeader
            title="Certifications & Credentials"
            subtitle="verified achievements"
            accent="dual"
            align="center"
          />
        </div>
        <CredentialGrid />
        <div className="mt-10 text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60 transition-all font-medium text-sm"
          >
            View Full Credential Wall <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────── */}
      <footer className="relative z-10 mt-32 border-t border-slate-800 bg-slate-950/80 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-mono text-sm font-bold">
              <span className="text-emerald-400">parth</span>
              <span className="text-slate-600">@</span>
              <span className="text-cyan-400">portfolio</span>
            </p>
            <p className="text-slate-600 text-xs mt-1">
              © {new Date().getFullYear()} Parth Pandey. Built with Next.js & Framer Motion.
            </p>
          </div>
          <nav className="flex gap-5 text-sm">
            <Link href="/experience" className="text-slate-500 hover:text-emerald-400 transition-colors">Experience</Link>
            <Link href="/projects" className="text-slate-500 hover:text-emerald-400 transition-colors">Projects</Link>
            <Link href="/certifications" className="text-slate-500 hover:text-emerald-400 transition-colors">Certs</Link>
            <Link href="/publications" className="text-slate-500 hover:text-emerald-400 transition-colors">Papers</Link>
            <Link href="/contact" className="text-slate-500 hover:text-cyan-400 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}
