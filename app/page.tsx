"use client";

import { useState } from "react";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@nexus.com");
  const [password, setPassword] = useState("Admin@123");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="auth-shell">
      <div className="auth-grid">
        <section className="auth-visual">
          <div className="brand-mark">NEXUS</div>
          <p className="eyebrow">Safety intelligence platform</p>
          <h1>Operational clarity for safer teams.</h1>
          <p className="lead">
            Monitor risk, manage compliance, and respond faster with one connected workspace for
            HSE operations.
          </p>

          <div className="feature-list">
            <div>
              <span className="dot dot-green" />
              Live incident monitoring
            </div>
            <div>
              <span className="dot dot-blue" />
              Compliance and training traceability
            </div>
            <div>
              <span className="dot dot-orange" />
              Smart workflow visibility
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="card-header">
            <span className="badge">Secure access</span>
            <h2>Welcome back</h2>
          </div>

          <form className="auth-form">
            <label className="field">
              <span>Email address</span>
              <div className="input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <Lock size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="ghost-icon"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="form-row">
              <label className="checkbox-row">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button type="submit" className="primary-btn">
              Sign in <ArrowRight size={18} />
            </button>
          </form>

          <div className="divider">
            <span>Demo access</span>
          </div>

          <div className="demo-grid">
            <div>
              <strong>Admin</strong>
              <small>admin@nexus.com</small>
            </div>
            <div>
              <strong>Manager</strong>
              <small>manager@nexus.com</small>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
