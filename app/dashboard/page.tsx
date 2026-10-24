"use client";

import { Activity, AlertTriangle, ArrowDownRight, ClipboardList, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard#overview", label: "Overview", icon: Activity, active: true },
  { href: "/dashboard#inspections", label: "Inspections", icon: ClipboardList },
  { href: "/dashboard#hazards", label: "Hazards", icon: AlertTriangle },
  { href: "/dashboard#users", label: "Users", icon: Users },
  { href: "/dashboard#trainings", label: "Trainings", icon: ShieldCheck },
];

const stats = [
  { label: "Incidents", value: "248", delta: "+12.4% vs last month", tone: "teal" },
  { label: "Compliance", value: "94%", delta: "+3.1% stability", tone: "blue" },
  { label: "Open hazards", value: "17", delta: "2 critical", tone: "amber" },
  { label: "Response time", value: "2.4h", delta: "-18 min", tone: "rose" },
];

const performance = [
  ["Jan", 62],
  ["Feb", 58],
  ["Mar", 75],
  ["Apr", 82],
  ["May", 88],
  ["Jun", 94],
];

const alerts = [
  { name: "Loose electrical outlet", status: "Critical" },
  { name: "Warehouse spill", status: "Review" },
  { name: "Fire drill overdue", status: "Pending" },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo">N</div>
            <div>
              <strong>NEXUS</strong>
              <div className="sidebar-subtitle">HSE platform</div>
            </div>
          </div>

          <nav className="nav">
            {navItems.map(({ href, label, icon: Icon, active }) => (
              <Link key={href} href={href} className={active ? "nav-link active" : "nav-link"}>
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="mini-card">
              <span>Risk score</span>
              <strong>8.4 / 10</strong>
            </div>
          </div>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div>
              <p className="eyebrow-small">Operational dashboard</p>
              <h1>Executive overview</h1>
            </div>

            <div className="header-actions">
              <button className="ghost-btn">Export</button>
              <div className="user-pill">Thierry • Admin</div>
            </div>
          </header>

          <section className="stats-grid" id="overview">
            {stats.map((stat) => (
              <article key={stat.label} className={`stat-card ${stat.tone}`}>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="trend">
                  <ArrowDownRight size={14} />
                  {stat.delta}
                </div>
              </article>
            ))}
          </section>

          <section className="content-grid">
            <article className="panel-card" id="inspections">
              <div className="card-title">
                <h3>Safety performance</h3>
                <span className="panel-label">Last 30 days</span>
              </div>

              <div className="bar-chart">
                {performance.map(([month, value]) => (
                  <div key={month} className="bar-row">
                    <span>{month}</span>
                    <div className="bar-track">
                      <span className="bar-fill" style={{ width: `${value}%` }} />
                    </div>
                    <strong>{value}%</strong>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel-card" id="hazards">
              <div className="card-title">
                <h3>Alerts</h3>
                <span className="panel-label">Priority</span>
              </div>

              <div className="tiny-list">
                {alerts.map(({ name, status }) => (
                  <div key={name} className="tiny-item">
                    <span>{name}</span>
                    <span className={`status-pill ${status.toLowerCase()}`}>{status}</span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel-card" id="users">
              <div className="card-title">
                <h3>Team activity</h3>
                <span className="panel-label">Today</span>
              </div>

              <div className="activity-list">
                <div className="activity-item">
                  <span className="dot dot-green" />
                  Inspection completed on production floor
                </div>
                <div className="activity-item">
                  <span className="dot dot-blue" />
                  Training renewal requested for 3 employees
                </div>
                <div className="activity-item">
                  <span className="dot dot-orange" />
                  Hazard review scheduled for warehouse area
                </div>
              </div>
            </article>

            <article className="panel-card" id="trainings">
              <div className="card-title">
                <h3>Compliance status</h3>
                <span className="panel-label">This week</span>
              </div>

              <div className="compliance-box">
                <div>
                  <strong>92%</strong>
                  <span>Safety readiness</span>
                </div>
                <div className="ring-ring" />
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
