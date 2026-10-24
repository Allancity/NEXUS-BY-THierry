"use client";

import { useEffect, useState } from "react";

const POLICY_KEY = "nexus-policy-consent-v1";

type ConsentRecord = {
  acceptedAt: string;
  version: string;
};

export default function PolicyGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(POLICY_KEY);
    if (!raw) {
      setReady(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ConsentRecord;
      if (parsed?.version === "v1") {
        setAccepted(true);
      }
    } catch {
      localStorage.removeItem(POLICY_KEY);
    }

    setReady(true);
  }, []);

  const handleAccept = () => {
    if (!agreed) return;

    const record: ConsentRecord = {
      acceptedAt: new Date().toISOString(),
      version: "v1",
    };

    localStorage.setItem(POLICY_KEY, JSON.stringify(record));
    setAccepted(true);
  };

  const handleReject = () => {
    localStorage.removeItem(POLICY_KEY);
    window.location.href = "/";
  };

  if (!ready || accepted) return <>{children}</>;

  return (
    <div className="policy-shell">
      <div className="policy-card">
        <h2>Policy & Usage Agreement</h2>
        <p>
          To continue using NEXUS BY THierry, you must agree to our privacy policy and terms of
          use before accessing the platform.
        </p>

        <ul className="policy-list">
          <li>We process only the data required to operate the HSE platform and support compliance.</li>
          <li>Access is restricted to authenticated users and role-based entitlements.</li>
          <li>All submitted incident, hazard, and training data is handled in accordance with internal safety policy.</li>
          <li>You may review this policy at any time in the account settings or footer links.</li>
        </ul>

        <label className="policy-check">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I have read and accept the usage policy and terms of service.</span>
        </label>

        <div className="policy-actions">
          <button type="button" onClick={handleReject}>
            Refuse
          </button>
          <button type="button" className="primary" onClick={handleAccept} disabled={!agreed}>
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
