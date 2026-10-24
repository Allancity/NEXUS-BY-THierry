"use client"

import React, { useState } from "react"
import { Plus, Award, Clock, AlertCircle } from "lucide-react"

interface Training {
  id: string
  employeeName: string
  courseTitle: string
  provider: string
  completionDate: string
  expiryDate: string
  status: "completed" | "in-progress" | "expired" | "expiring-soon"
  certificateUrl?: string
}

const mockTrainings: Training[] = [
  { id: "1", employeeName: "John Smith", courseTitle: "First Aid & CPR", provider: "Red Cross", completionDate: "2023-06-15", expiryDate: "2026-06-15", status: "completed" },
  { id: "2", employeeName: "Sarah Johnson", courseTitle: "Fire Safety Training", provider: "HSE Institute", completionDate: "2023-08-20", expiryDate: "2025-08-20", status: "expiring-soon" },
  { id: "3", employeeName: "Mike Davis", courseTitle: "Hazmat Handling", provider: "Safety Council", completionDate: "2022-01-10", expiryDate: "2025-01-10", status: "expired" },
  { id: "4", employeeName: "Emma Wilson", courseTitle: "Safety Leadership", provider: "Online Academy", completionDate: "2024-03-05", expiryDate: "2025-03-05", status: "in-progress" },
  { id: "5", employeeName: "Robert Brown", courseTitle: "OSHA Compliance", provider: "OSHA Training", completionDate: "2024-05-12", expiryDate: "2027-05-12", status: "completed" },
]

export default function TrainingsPage() {
  const [trainings] = useState<Training[]>(mockTrainings)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTrainings = trainings.filter((training) => filterStatus === "all" || training.status === filterStatus)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-badge success"
      case "in-progress": return "status-badge primary"
      case "expiring-soon": return "status-badge warning"
      case "expired": return "status-badge danger"
      default: return "status-badge"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Completed"
      case "in-progress": return "In progress"
      case "expiring-soon": return "Expiring soon"
      case "expired": return "Expired"
      default: return status
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const stats = {
    active: trainings.filter((t) => t.status === "completed").length,
    expiringSoon: trainings.filter((t) => t.status === "expiring-soon").length,
    expired: trainings.filter((t) => t.status === "expired").length,
    total: trainings.length,
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow-small">Training</p>
          <h1>Training records</h1>
        </div>
        <button className="primary-btn small">
          <Plus className="w-5 h-5" />
          Add training
        </button>
      </div>

      <section className="stats-grid small-grid">
        <article className="stat-card teal"><div className="stat-label">Active certifications</div><div className="stat-value">{stats.active}</div></article>
        <article className="stat-card amber"><div className="stat-label">Expiring soon</div><div className="stat-value">{stats.expiringSoon}</div></article>
        <article className="stat-card rose"><div className="stat-label">Expired</div><div className="stat-value">{stats.expired}</div></article>
        <article className="stat-card blue"><div className="stat-label">Total records</div><div className="stat-value">{stats.total}</div></article>
      </section>

      <section className="panel-card toolbar-panel">
        <div className="filter-row">
          {['all', 'completed', 'in-progress', 'expiring-soon', 'expired'].map((status) => (
            <button key={status} className={filterStatus === status ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilterStatus(status)}>
              {status === 'all' ? 'All' : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </section>

      <section className="panel-card table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Course</th>
                <th>Provider</th>
                <th>Completed</th>
                <th>Expiry</th>
                <th>Status</th>
                <th>Days left</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrainings.map((training) => {
                const daysLeft = getDaysUntilExpiry(training.expiryDate)
                return (
                  <tr key={training.id}>
                    <td>{training.employeeName}</td>
                    <td>{training.courseTitle}</td>
                    <td>{training.provider}</td>
                    <td>{new Date(training.completionDate).toLocaleDateString()}</td>
                    <td>{new Date(training.expiryDate).toLocaleDateString()}</td>
                    <td><span className={getStatusColor(training.status)}>{getStatusLabel(training.status)}</span></td>
                    <td>
                      <div className="days-cell">
                        {daysLeft < 0 ? <><AlertCircle size={14} className="danger-icon" /><span className="danger-text">Expired</span></> : daysLeft < 90 ? <><Clock size={14} className="warning-icon" /><span>{daysLeft} days</span></> : <><Award size={14} className="success-icon" /><span>{daysLeft} days</span></>}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
