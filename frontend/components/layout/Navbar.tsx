"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, BarChart3, Network, MessageSquare, Briefcase, Compass, Scale, Map, FileText, LayoutDashboard, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/discover", label: "Explore", icon: Compass },
  { href: "/roadmap", label: "Roadmap", icon: Map },
  { href: "/graph", label: "Graph", icon: Network },
  { href: "/chat", label: "AI Advisor", icon: MessageSquare },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/compare", label: "Compare", icon: Scale },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-3 left-3 right-3 z-50 h-[60px] rounded-full border transition-all duration-500 ${scrolled ? "bg-[#111113]/90 border-white/15 shadow-2xl shadow-black/30" : "bg-[#111113]/70 border-white/10"} backdrop-blur-2xl`}>
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group shrink-0 focus-ring rounded-full">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105"><BrainCircuit size={17} /></div>
            <span className="font-semibold text-[15px] tracking-tight text-white">Vidyavani</span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return <Link key={href} href={href} className={`relative flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] font-medium transition-colors duration-300 focus-ring ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                {active && <motion.div layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[.10] border border-white/[.08]" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                <Icon size={13} className="relative z-10" /><span className="relative z-10">{label}</span>
              </Link>;
            })}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/onboarding" className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold transition-all hover:bg-[#2997ff] hover:text-white hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 focus-ring"><FileText size={13} /> Upload resume</Link>
            <Link href="/dashboard?sector=GOVERNMENT" className="hidden xl:flex items-center gap-1.5 px-3 py-2 rounded-full text-zinc-400 hover:text-white text-xs font-medium transition-colors focus-ring"><LayoutDashboard size={13} /> Govt panel</Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus-ring" aria-label="Toggle navigation menu">{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden" />
          <motion.div initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} transition={{ duration: .25 }} className="fixed top-[84px] left-3 right-3 z-50 rounded-[28px] bg-[#151517]/95 backdrop-blur-2xl border border-white/10 p-4 lg:hidden shadow-2xl">
            <div className="grid grid-cols-2 gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => { const active = pathname === href; return <Link key={href} href={href} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm transition-colors ${active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}><Icon size={16} />{label}</Link>; })}
            </div>
            <Link href="/onboarding" className="mt-3 flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-white text-black font-semibold text-sm"><FileText size={15} /> Upload resume</Link>
          </motion.div>
        </>}
      </AnimatePresence>
    </>
  );
}
