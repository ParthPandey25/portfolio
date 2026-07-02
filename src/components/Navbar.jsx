"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, Download } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "./SocialIcons";

const navLinks = [
  { href: "/",              label: "Home"           },
  { href: "/experience",   label: "Experience"     },
  { href: "/projects",     label: "Projects"       },
  { href: "/certifications", label: "Certifications" },
  { href: "/publications", label: "Publications"   },
  { href: "/contact",      label: "Contact"        },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/70 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 group-hover:border-emerald-500/50 transition-colors">
              <Shield size={18} className="text-emerald-400" />
            </div>
            <span className="font-mono text-sm font-bold tracking-tight">
              <span className="text-emerald-400">parth</span>
              <span className="text-slate-500">@</span>
              <span className="text-cyan-400">portfolio</span>
              <span className="text-slate-500">:~</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-emerald-400"
                      : "text-slate-400 hover:text-slate-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-emerald-500/10 border border-emerald-500/20 rounded-md"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://github.com/ParthPandey25"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <GithubIcon size={17} />
            </a>
            <a
              href="https://linkedin.com/in/parth-pandey-045709258"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              <LinkedinIcon size={17} />
            </a>
            <a
              href="/resume.pdf"
              download
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300 hover:from-emerald-500/40 hover:to-cyan-500/40 hover:border-emerald-400/60 transition-all duration-300"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[69px] left-0 right-0 z-30 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800 mt-1">
                <a href="https://github.com/ParthPandey25" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-100">
                  <GithubIcon size={15} /> GitHub
                </a>
                <a href="https://linkedin.com/in/parth-pandey-045709258" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-slate-100">
                  <LinkedinIcon size={15} /> LinkedIn
                </a>
                <a href="/resume.pdf" download className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 text-emerald-300">
                  <Download size={14} /> Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
