import React from "react";
import Navbar from "@/components/Navbar";
import CredentialGrid from "@/components/CredentialGrid";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import { Award } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Certifications — Parth Pandey Portfolio",
  description:
    "Full credential wall for Parth Pandey — Palo Alto Networks, Fortinet FCA/FortiGATE, Zscaler ZTNA, Google Cloud, AWS DevOps, NPTEL Elite, IBM, GATE, IRJAEH publications, and more.",
};

const highlights = [
  { label: "Security Certs",    value: "11", color: "text-emerald-400" },
  { label: "Cloud Certs",       value: "5",  color: "text-yellow-400"  },
  { label: "Academic Badges",   value: "9",  color: "text-purple-400"  },
  { label: "Internship Certs",  value: "11", color: "text-indigo-400"  },
  { label: "Publications",      value: "4",  color: "text-violet-400"  },
];

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative">
      <InteractiveBackground />
      <Navbar />

      <div className="relative z-10 pt-28 pb-24 max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-4">
          <SectionHeader
            title="Certifications & Digital Credentials"
            subtitle="verified achievements"
            accent="dual"
            align="center"
          />
        </div>

        {/* Highlight counters */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {highlights.map((h, i) => (
            <div key={i} className="text-center px-5 py-3 glass-card rounded-xl border border-slate-800/60">
              <p className={`text-3xl font-extrabold ${h.color}`}>{h.value}</p>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{h.label}</p>
            </div>
          ))}
        </div>

        {/* Sub-caption */}
        <p className="text-center text-sm text-slate-500 mb-10 font-mono">
          // click <span className="text-emerald-400">View</span> on any card to open the original certificate PDF
        </p>

        {/* Grid */}
        <CredentialGrid />

        {/* GATE highlight card */}
        <div className="mt-12 p-6 glass-card rounded-2xl border border-purple-500/20 flex items-center gap-4">
          <Award size={28} className="text-purple-400 shrink-0" />
          <div>
            <p className="text-slate-200 font-bold">GATE Engineering Matrix</p>
            <p className="text-slate-400 text-sm">
              Score:{" "}
              <span className="text-purple-400 font-extrabold text-lg">355</span>{" "}
              — National Engineering Entrance Qualified
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono"
          >
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
