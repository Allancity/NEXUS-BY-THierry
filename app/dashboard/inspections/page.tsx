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
  compliance: number // percentage
}

interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

const mockInspections: Inspection[] = [
  {
    id: "1",
    title: "Monthly Safety Audit - Production Floor",
    type: "audit",
    scheduledDate: "2024-06-15",
    location: "Production Floor",
    inspector: "Sarah Johnson",
    status: "completed",
    findings: 3,
    compliance: 92,
  },
  {
    id: "2",
    title: "Quarterly Fire Safety Inspection",
    type: "inspection",
    scheduledDate: "2024-06-20",
    location: "Building A",
    inspector: "Mike Davis",
    status: "scheduled",
    findings: 0,
    compliance: 0,
  },
  {
    id: "3",
    title: "Equipment Safety Assessment",
    type: "assessment",
    scheduledDate: "2024-06-10",
    location: "Warehouse",
    inspector: "Emma Wilson",
    status: "in-progress",
    findings: 2,
    compliance: 85,
  },
  {
    id: "4",
    title: "Environmental Compliance Check",
    type: "audit",
    scheduledDate: "2024-06-05",
    location: "All Areas",
    inspector: "John Smith",
    status: "completed",
    findings: 1,
    compliance: 95,
  },
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
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(
    null
  )
  const [checklist, setChecklist] = useState<ChecklistItem[]>(defaultChecklist)
  const [showChecklistModal, setShowChecklistModal] = useState(false)

  const getTypeColor = (type: string) => {
    switch (type) {
      case "audit":
        return "bg-primary-600/20 text-primary-400"
      case "inspection":
        return "bg-warning/20 text-warning"
      case "assessment":
        return "bg-success/20 text-success"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-slate-700/30 text-slate-300"
      case "in-progress":
        return "bg-warning/10 text-warning"
      case "completed":
        return "bg-success/10 text-success"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const toggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    )
  }

  const completedItems = checklist.filter((item) => item.completed).length
  const completionPercentage = Math.round((completedItems / checklist.length) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Inspections & Audits
          </h1>
          <p className="text-slate-400">Schedule and manage safety audits</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Schedule Inspection
        </button>
      </div>

      {/* Calendar Overview */}
      <div className="card-lg p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Calendar className="w-6 h-6" />
          Upcoming Inspections
        </h3>

        <div className="space-y-3">
          {inspections
            .filter((i) => i.status !== "completed")
            .sort(
              (a, b) =>
                new Date(a.scheduledDate).getTime() -
                new Date(b.scheduledDate).getTime()
            )
            .map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 border border-slate-700 rounded-lg hover:bg-slate-700/20 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedInspection(inspection)
                  setShowChecklistModal(true)
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{inspection.title}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(inspection.type)}`}>
                      {inspection.type.charAt(0).toUpperCase() +
                        inspection.type.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400">
                    📍 {inspection.location} • Inspector: {inspection.inspector}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-300">
                    {new Date(inspection.scheduledDate).toLocaleDateString()}
                  </p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      inspection.status
                    )}`}
                  >
                    {inspection.status.charAt(0).toUpperCase() +
                      inspection.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Inspections Table */}
      <div className="card-lg overflow-hidden">
        <div className="p-6 border-b border-slate-700">
          <h3 className="text-xl font-semibold">All Inspections</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {inspections.map((inspection) => (
                <tr
                  key={inspection.id}
                  className="hover:bg-slate-700/30 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedInspection(inspection)
                    setShowChecklistModal(true)
                  }}
                >
                  <td className="px-6 py-4 font-medium">{inspection.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${getTypeColor(inspection.type)}`}>
                      {inspection.type.charAt(0).toUpperCase() +
                        inspection.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{inspection.location}</td>
                  <td className="px-6 py-4 text-slate-300">
                    {new Date(inspection.scheduledDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        inspection.status
                      )}`}
                    >
                      {inspection.status.charAt(0).toUpperCase() +
                        inspection.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {inspection.compliance > 0 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              inspection.compliance >= 90
                                ? "bg-success"
                                : inspection.compliance >= 80
                                  ? "bg-warning"
                                  : "bg-danger"
                            }`}
                            style={{ width: `${inspection.compliance}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold min-w-[40px]">
                          {inspection.compliance}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checklist Modal */}
      {showChecklistModal && selectedInspection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="card-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {selectedInspection.title}
                </h2>
                <p className="text-sm text-slate-400">
                  {selectedInspection.location} • {selectedInspection.inspector}
                </p>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Progress */}
            <div className="p-6 border-b border-slate-700">
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Checklist Progress</span>
                <span className="text-sm font-semibold">{completionPercentage}%</span>
              </div>
              <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 transition-all duration-300 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="p-6 space-y-3">
              {checklist.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-3 border border-slate-700 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleChecklistItem(item.id)}
                    className="w-5 h-5 rounded cursor-pointer accent-primary-500"
                  />
                  <span
                    className={`flex-1 ${
                      item.completed
                        ? "line-through text-slate-500"
                        : "text-slate-200"
                    }`}
                  >
                    {item.label}
                  </span>
                  {item.completed && (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  )}
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t border-slate-700">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="btn btn-secondary flex-1"
              >
                Close
              </button>
              {selectedInspection.status === "in-progress" && (
                <button className="btn btn-primary flex-1">
                  Mark as Complete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
