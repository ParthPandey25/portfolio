"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function DemoAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authStatus, setAuthStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setAuthStatus(null);
    
    // Placeholder function ready for AWS Cognito or Firebase Auth
    console.log("Mock Auth Attempt for:", email);
    
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthStatus('success');
      
      // Reset after showing success
      setTimeout(() => setAuthStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors">
        ← Back to Portfolio
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Lock size={32} className="text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Secure Portal</h1>
          <p className="text-slate-400">Personal Finance Manager Access</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 ml-1">Work Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                  placeholder="admin@enterprise.local"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-sm font-medium text-slate-300">Password</label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-xl bg-slate-950 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-colors"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthenticating}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-slate-950 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAuthenticating ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full"
                />
              ) : authStatus === 'success' ? (
                <>
                  <ShieldCheck size={18} />
                  Authenticated
                </>
              ) : (
                <>
                  Authenticate <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <p>Protected by Zero-Trust Architecture</p>
            <div className="flex gap-4">
              <span>AWS Cognito Ready</span>
              <span className="w-1 h-1 rounded-full bg-slate-700 self-center"></span>
              <span>SSO Enabled</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
