"use client"

import React, { useState } from "react"
import { Plus, Calendar, CheckCircle2, AlertTriangle } from "lucide-react"

interface Inspection {
  id: string
  title: string
  type: "audit" | "inspection" | "assessment"
  scheduledDate: string
  location: string
  inspector: string
  status: "scheduled" | "in-progress" | "completed"
  findings: number
  compliance: number
}

interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

const mockInspections: Inspection[] = [
  { id: "1", title: "Monthly Safety Audit - Production Floor", type: "audit", scheduledDate: "2024-06-15", location: "Production Floor", inspector: "Sarah Johnson", status: "completed", findings: 3, compliance: 92 },
  { id: "2", title: "Quarterly Fire Safety Inspection", type: "inspection", scheduledDate: "2024-06-20", location: "Building A", inspector: "Mike Davis", status: "scheduled", findings: 0, compliance: 0 },
  { id: "3", title: "Equipment Safety Assessment", type: "assessment", scheduledDate: "2024-06-10", location: "Warehouse", inspector: "Emma Wilson", status: "in-progress", findings: 2, compliance: 85 },
  { id: "4", title: "Environmental Compliance Check", type: "audit", scheduledDate: "2024-06-05", location: "All Areas", inspector: "John Smith", status: "completed", findings: 1, compliance: 95 },
]

const defaultChecklist: ChecklistItem[] = [
  { id: "1", label: "Emergency exits are clear and accessible", completed: true },
  { id: "2", label: "Fire extinguishers are properly located", completed: true },
  { id: "3", label: "Safety signage is visible", completed: false },
  { id: "4", label: "Personal protective equipment available", completed: true },
  { id: "5", label: "First aid kits are stocked", completed: true },
  { id: "6", label: "No slip or fall hazards present", completed: false },
  { id: "7", label: "Equipment is properly maintained", completed: true },
  { id: "8", label: "Emergency procedures posted", completed: true },
]

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections)
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null)
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist)
  const [showChecklistModal, setShowChecklistModal] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "audit": return "badge primary"
      case "inspection": return "badge warning"
      case "assessment": return "badge success"
      default: return "badge"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "status-badge"
      case "in-progress": return "status-badge warning"
      case "completed": return "status-badge success"
      default: return "status-badge"
    }
  }

  const toggleChecklistItem = (id: string) => setChecklist((prev) => prev.map((item) => item.id === id ? { ...item, completed: !item.completed } : item))
  const completedItems = checklist.filter((item) => item.completed).length
  const completionPercentage = Math.round((completedItems / checklist.length) * 100)

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow-small">Audit</p>
          <h1>Inspections & audits</h1>
        </div>
        <button className="primary-btn small">
          <Plus className="w-5 h-5" />
          Schedule inspection
        </button>
      </div>

      <section className="panel-card">
        <div className="section-heading">
          <Calendar size={18} />
          <h3>Upcoming inspections</h3>
        </div>

        <div className="list-stack">
          {inspections.filter((i) => i.status !== "completed").sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime()).map((inspection) => (
            <div key={inspection.id} className="list-row" onClick={() => { setSelectedInspection(inspection); setShowChecklistModal(true) }}>
              <div>
                <div className="row-head">
                  <strong>{inspection.title}</strong>
                  <span className={getTypeColor(inspection.type)}>{inspection.type}</span>
                </div>
                <small>{inspection.location} • Inspector: {inspection.inspector}</small>
              </div>
              <div className="row-meta">
                <span>{new Date(inspection.scheduledDate).toLocaleDateString()}</span>
                <span className={getStatusColor(inspection.status)}>{inspection.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel-card table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Location</th>
                <th>Date</th>
                <th>Status</th>
                <th>Compliance</th>
              </tr>
            </thead>
            <tbody>
              {inspections.map((inspection) => (
                <tr key={inspection.id} onClick={() => { setSelectedInspection(inspection); setShowChecklistModal(true) }}>
                  <td>{inspection.title}</td>
                  <td><span className={getTypeColor(inspection.type)}>{inspection.type}</span></td>
                  <td>{inspection.location}</td>
                  <td>{new Date(inspection.scheduledDate).toLocaleDateString()}</td>
                  <td><span className={getStatusColor(inspection.status)}>{inspection.status}</span></td>
                  <td>
                    {inspection.compliance > 0 ? (
                      <div className="compliance-inline">
                        <div className="mini-bar"><div className="mini-fill" style={{ width: `${inspection.compliance}%` }} /></div>
                        <span>{inspection.compliance}%</span>
                      </div>
                    ) : <span className="muted-text">-</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showChecklistModal && selectedInspection && (
        <div className="modal-backdrop" onClick={() => setShowChecklistModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>{selectedInspection.title}</h2>
                <p>{selectedInspection.location} • {selectedInspection.inspector}</p>
              </div>
              <button className="close-btn" onClick={() => setShowChecklistModal(false)}>×</button>
            </div>

            <div className="progress-wrap">
              <div className="progress-head">
                <span>Checklist progress</span>
                <strong>{completionPercentage}%</strong>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{ width: `${completionPercentage}%` }} /></div>
            </div>

            <div className="checklist-list">
              {checklist.map((item) => (
                <label key={item.id} className="check-item">
                  <input type="checkbox" checked={item.completed} onChange={() => toggleChecklistItem(item.id)} />
                  <span className={item.completed ? "checked-label" : ""}>{item.label}</span>
                  {item.completed && <CheckCircle2 size={18} className="check-icon" />}
                </label>
              ))}
            </div>

            <div className="button-row">
              <button type="button" className="secondary-btn" onClick={() => setShowChecklistModal(false)}>Close</button>
              {selectedInspection.status === "in-progress" && <button type="button" className="primary-btn">Mark as complete</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
