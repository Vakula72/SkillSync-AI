"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BriefcaseBusiness, FileText, Map, Network, RefreshCw } from "lucide-react";
import { api } from "@/lib/api";
import type { DashboardStats } from "@/lib/types";

const FEATURES = [
  { icon: FileText, title: "Resume intelligence", copy: "Turn your experience into a clear picture of the skills that matter.", href: "/onboarding", tone: "blue" },
  { icon: BarChart3, title: "Skill gap analytics", copy: "See curriculum coverage against live private and government demand.", href: "/dashboard", tone: "violet" },
  { icon: Map, title: "Personal roadmaps", copy: "Move from where you are to where the market is going, one step at a time.", href: "/roadmap", tone: "indigo" },
  { icon: BriefcaseBusiness, title: "Career opportunities", copy: "Explore relevant roles across the private and public sectors.", href: "/jobs", tone: "sky" },
];

const number = (value: number | undefined) => value === undefined ? "—" : value.toLocaleString("en-IN");

export default function HomePage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    api.dashboard.getStats()
      .then((data) => { if (active) setStats(data); })
      .catch(() => { if (active) setError(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const metrics = stats ? [
    { value: number(stats.total_jobs_scraped), label: "jobs analysed" },
    { value: number(stats.total_curriculum_skills), label: "curriculum skills" },
    { value: number(stats.total_skill_gaps), label: "skill gaps found" },
    { value: `${stats.avg_gap_coverage_percent.toFixed(1)}%`, label: "average coverage" },
  ] : [];

  return (
    <div className="skillsync-home">
      <section className="home-hero">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="home-hero-inner">
          <div className="home-eyebrow"><span className="home-eyebrow-dot" /> Career intelligence for what comes next</div>
          <h1>Your skills.<br /><span> A brighter tomorrow.</span></h1>
          <p className="home-lede">Vidyavani connects your learning journey to real industry demand, so your next step feels clear.</p>
          <div className="home-actions">
            <Link href="/onboarding" className="home-primary">Upload your resume <ArrowRight size={16} /></Link>
            <Link href="/dashboard" className="home-secondary">Explore the data <BarChart3 size={16} /></Link>
          </div>
        </motion.div>
        <div className="home-orb home-orb-one" />
        <div className="home-orb home-orb-two" />
      </section>

      <section className="home-metrics" aria-label="Live platform metrics">
        {loading ? [...Array(4)].map((_, index) => <div className="metric-item metric-loading" key={index}><span /><small /></div>) : error ? (
          <div className="metrics-state"><RefreshCw size={14} /> Live metrics are temporarily unavailable</div>
        ) : metrics.map((metric) => <div className="metric-item" key={metric.label}><strong>{metric.value}</strong><small>{metric.label}</small></div>)}
      </section>

      <section className="home-features">
        <div className="home-section-heading"><div><span>Everything in one place</span><h2>Make your next move<br />with more confidence.</h2></div><Link href="/discover" className="home-text-link">Explore platform <ArrowRight size={15} /></Link></div>
        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, copy, href, tone }, index) => <motion.div key={title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .45, delay: index * .06 }}><Link href={href} className="feature-card"><div className={`feature-icon ${tone}`}><Icon size={18} /></div><h3>{title}</h3><p>{copy}</p><span className="feature-arrow"><ArrowRight size={15} /></span></Link></motion.div>)}
        </div>
      </section>

      <section className="home-bottom-cta"><Network size={20} /><div><p>Built on a live view of skills, courses and opportunities.</p><span>Your career path is not a guess.</span></div><Link href="/graph" className="home-text-link">See the knowledge graph <ArrowRight size={15} /></Link></section>
    </div>
  );
}
