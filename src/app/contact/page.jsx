"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeader from "@/components/SectionHeader";
import InteractiveBackground from "@/components/InteractiveBackground";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Terminal,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

const SOCIAL = [
  {
    icon: <Mail size={18} className="text-emerald-400" />,
    label: "Email",
    value: "parthrspandey25@gmail.com",
    href: "mailto:parthrspandey25@gmail.com",
    color: "hover:border-emerald-500/50 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]",
  },
  {
    icon: <Phone size={18} className="text-cyan-400" />,
    label: "Phone",
    value: "+91-9755591720",
    href: "tel:+919755591720",
    color: "hover:border-cyan-500/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]",
  },
  {
    icon: <GithubIcon size={18} className="text-purple-400" />,
    label: "GitHub",
    value: "github.com/CodParth",
    href: "https://github.com/CodParth",
    color: "hover:border-purple-500/50 hover:shadow-[0_8px_30px_rgba(168,85,247,0.15)]",
  },
  {
    icon: <LinkedinIcon size={18} className="text-blue-400" />,
    label: "LinkedIn",
    value: "linkedin.com/in/parth-pandey-045709258",
    href: "https://linkedin.com/in/parth-pandey-045709258",
    color: "hover:border-blue-500/50 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]",
  },
  {
    icon: <MapPin size={18} className="text-orange-400" />,
    label: "Location",
    value: "India · Open to Remote",
    href: null,
    color: "hover:border-orange-500/30",
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send (replace with real handler / EmailJS / Formspree)
    setTimeout(() => setStatus("sent"), 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 relative">
      <InteractiveBackground />
      <Navbar />

      <div className="relative z-10 pt-28 pb-24 max-w-5xl mx-auto px-4">
        <SectionHeader
          title="Get In Touch"
          subtitle="contact"
          accent="dual"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left — Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Looking for a dedicated <strong className="text-slate-200">Blue Team SOC Analyst</strong> or{" "}
              <strong className="text-slate-200">Network Security Engineer</strong>?
              I&apos;m open to full-time roles, remote opportunities, and collaborative projects.
              Let&apos;s connect!
            </p>

            {SOCIAL.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                {s.href ? (
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 p-4 glass-card rounded-xl border border-slate-800/60 transition-all duration-300 group ${s.color}`}
                  >
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0">
                      {s.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 font-mono">{s.label}</p>
                      <p className="text-slate-300 text-sm truncate group-hover:text-slate-100 transition-colors">
                        {s.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className={`flex items-center gap-3 p-4 glass-card rounded-xl border border-slate-800/60 ${s.color}`}>
                    <div className="p-2 rounded-lg bg-slate-800 border border-slate-700/60 shrink-0">
                      {s.icon}
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-mono">{s.label}</p>
                      <p className="text-slate-300 text-sm">{s.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right — Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-2xl border border-slate-800/60 overflow-hidden">
              {/* Terminal bar */}
              <div className="bg-slate-800/60 px-5 py-3 border-b border-slate-800 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Terminal size={12} /> send_message.sh
                </div>
              </div>

              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 flex flex-col items-center justify-center gap-4 text-center"
                >
                  <CheckCircle2 size={48} className="text-emerald-400" />
                  <h3 className="text-xl font-bold text-slate-100">Message Sent!</h3>
                  <p className="text-slate-400 text-sm">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => { setStatus("idle"); setForm({ name:"",email:"",subject:"",message:"" }); }}
                    className="text-sm text-emerald-400 hover:text-emerald-300 font-mono transition-colors"
                  >
                    send another →
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-500 mb-1.5">
                        name <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-500 mb-1.5">
                        email <span className="text-emerald-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="SOC Analyst Opportunity · Collaboration · ..."
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-500 mb-1.5">
                      message <span className="text-emerald-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Hello Parth, I'm reaching out regarding..."
                      className="w-full bg-slate-950/60 border border-slate-700/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-colors font-mono resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 hover:from-emerald-500/30 hover:to-cyan-500/30 hover:border-emerald-400/60 transition-all disabled:opacity-50"
                  >
                    {status === "sending" ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} /> Send Message
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-600 font-mono">
                    or email directly at{" "}
                    <a href="mailto:parthrspandey25@gmail.com" className="text-emerald-500 hover:text-emerald-400 transition-colors">
                      parthrspandey25@gmail.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-sm text-slate-500 hover:text-emerald-400 transition-colors font-mono">
            ← back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
