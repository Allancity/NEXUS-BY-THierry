import { Activity, AlertTriangle, ClipboardList, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: Activity, active: true },
  { href: "/dashboard/inspections", label: "Inspections", icon: ClipboardList },
  { href: "/dashboard/hazards", label: "Hazards", icon: AlertTriangle },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/trainings", label: "Trainings", icon: ShieldCheck },
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
              <div style={{ color: "#9aa9bd", fontSize: 12 }}>HSE platform</div>
            </div>
          </div>

          <nav className="nav">
            {navItems.map(({ href, label, icon: Icon, active }) => (
              <Link key={href} href={href} className={active ? "active" : ""}>
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="main-panel">
          <header className="topbar">
            <div>
              <p style={{ margin: 0, color: "#9aa9bd", fontSize: 12, textTransform: "uppercase", letterSpacing: 1.2 }}>
                Operational dashboard
              </p>
              <h1>Executive overview</h1>
            </div>

            <div className="user-pill">Thierry • Admin</div>
          </header>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-label">Incidents</div>
              <div className="stat-value">248</div>
              <div className="trend">+12.4% vs last month</div>
            </article>
            <article className="stat-card">
              <div className="stat-label">Compliance</div>
              <div className="stat-value">94%</div>
              <div className="trend">+3.1% stability</div>
            </article>
            <article className="stat-card">
              <div className="stat-label">Open hazards</div>
              <div className="stat-value">17</div>
              <div className="trend">2 critical</div>
            </article>
            <article className="stat-card">
              <div className="stat-label">Response time</div>
              <div className="stat-value">2.4h</div>
              <div className="trend">-18 min</div>
            </article>
          </section>

          <section className="content-grid">
            <article className="panel-card">
              <div className="card-title">
                <h3>Safety performance</h3>
                <span style={{ color: "#9aa9bd", fontSize: 12 }}>Last 30 days</span>
              </div>

              <div className="bar-chart">
                {[
                  ["Jan", 62],
                  ["Feb", 58],
                  ["Mar", 75],
                  ["Apr", 82],
                  ["May", 88],
                  ["Jun", 94],
                ].map(([month, value]) => (
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

            <article className="panel-card">
              <div className="card-title">
                <h3>Alerts</h3>
                <span style={{ color: "#9aa9bd", fontSize: 12 }}>Priority</span>
              </div>

              <div className="tiny-list">
                <div className="tiny-item">
                  <span>Loose electrical outlet</span>
                  <span className="status-pill">Critical</span>
                </div>
                <div className="tiny-item">
                  <span>Warehouse spill</span>
                  <span className="status-pill">Review</span>
                </div>
                <div className="tiny-item">
                  <span>Fire drill overdue</span>
                  <span className="status-pill">Pending</span>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}
