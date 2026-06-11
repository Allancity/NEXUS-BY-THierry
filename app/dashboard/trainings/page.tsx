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
  {
    id: "1",
    employeeName: "John Smith",
    courseTitle: "First Aid & CPR",
    provider: "Red Cross",
    completionDate: "2023-06-15",
    expiryDate: "2026-06-15",
    status: "completed",
  },
  {
    id: "2",
    employeeName: "Sarah Johnson",
    courseTitle: "Fire Safety Training",
    provider: "HSE Institute",
    completionDate: "2023-08-20",
    expiryDate: "2025-08-20",
    status: "expiring-soon",
  },
  {
    id: "3",
    employeeName: "Mike Davis",
    courseTitle: "Hazmat Handling",
    provider: "Safety Council",
    completionDate: "2022-01-10",
    expiryDate: "2025-01-10",
    status: "expired",
  },
  {
    id: "4",
    employeeName: "Emma Wilson",
    courseTitle: "Safety Leadership",
    provider: "Online Academy",
    completionDate: "2024-03-05",
    expiryDate: "2025-03-05",
    status: "in-progress",
  },
  {
    id: "5",
    employeeName: "Robert Brown",
    courseTitle: "OSHA Compliance",
    provider: "OSHA Training",
    completionDate: "2024-05-12",
    expiryDate: "2027-05-12",
    status: "completed",
  },
]

export default function TrainingsPage() {
  const [trainings, setTrainings] = useState<Training[]>(mockTrainings)
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTrainings = trainings.filter(
    (training) => filterStatus === "all" || training.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/20 text-success border-success/50"
      case "in-progress":
        return "bg-primary-600/20 text-primary-400 border-primary-600/50"
      case "expiring-soon":
        return "bg-warning/20 text-warning border-warning/50"
      case "expired":
        return "bg-danger/20 text-danger border-danger/50"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "expiring-soon":
        return "Expiring Soon"
      case "expired":
        return "Expired"
      default:
        return status
    }
  }

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date()
    const expiry = new Date(expiryDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const stats = {
    active: trainings.filter((t) => t.status === "completed").length,
    expiringSoon: trainings.filter((t) => t.status === "expiring-soon").length,
    expired: trainings.filter((t) => t.status === "expired").length,
    total: trainings.length,
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Training Records</h1>
          <p className="text-slate-400">Manage employee training and certifications</p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-5 h-5" />
          Add Training
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-success/10 text-success border border-success/30">
          <p className="text-sm text-slate-400 mb-2">Active Certifications</p>
          <p className="text-3xl font-bold">{stats.active}</p>
        </div>
        <div className="card p-4 bg-warning/10 text-warning border border-warning/50">
          <p className="text-sm text-slate-400 mb-2">Expiring Soon</p>
          <p className="text-3xl font-bold">{stats.expiringSoon}</p>
          <p className="text-xs text-slate-500 mt-1">Within 90 days</p>
        </div>
        <div className="card p-4 bg-danger/10 text-danger border border-danger/30">
          <p className="text-sm text-slate-400 mb-2">Expired</p>
          <p className="text-3xl font-bold">{stats.expired}</p>
        </div>
        <div className="card p-4 bg-primary-900/30 text-primary-400 border border-primary-700/50">
          <p className="text-sm text-slate-400 mb-2">Total Records</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="card-lg p-6">
        <label className="block text-sm font-medium mb-3">Filter by Status</label>
        <div className="flex flex-wrap gap-2">
          {["all", "completed", "in-progress", "expiring-soon", "expired"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-primary-600 text-white"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {status === "all"
                  ? "All"
                  : status.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
              </button>
            )
          )}
        </div>
      </div>

      {/* Training Table */}
      <div className="card-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Employee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Course Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Completed
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Expiry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Days Left</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredTrainings.map((training) => {
                const daysLeft = getDaysUntilExpiry(training.expiryDate)

                return (
                  <tr
                    key={training.id}
                    className="hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium">{training.employeeName}</td>
                    <td className="px-6 py-4">{training.courseTitle}</td>
                    <td className="px-6 py-4 text-slate-300">{training.provider}</td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(training.completionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-400">
                      {new Date(training.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          training.status
                        )}`}
                      >
                        {getStatusLabel(training.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {daysLeft < 0 ? (
                          <>
                            <AlertCircle className="w-4 h-4 text-danger" />
                            <span className="text-danger font-semibold">
                              Expired
                            </span>
                          </>
                        ) : daysLeft < 90 ? (
                          <>
                            <Clock className="w-4 h-4 text-warning" />
                            <span className="text-warning font-semibold">
                              {daysLeft} days
                            </span>
                          </>
                        ) : (
                          <>
                            <Award className="w-4 h-4 text-success" />
                            <span className="text-success font-semibold">
                              {daysLeft} days
                            </span>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {filteredTrainings.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No training records found</p>
          </div>
        )}
      </div>

      {/* Expiration Alert */}
      {stats.expiringSoon > 0 && (
        <div className="card-lg p-6 bg-warning/10 border border-warning/50">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-warning mb-2">
                {stats.expiringSoon} certification{stats.expiringSoon > 1 ? "s" : ""} expiring soon
              </h3>
              <p className="text-sm text-slate-400">
                Please schedule renewal training for certifications expiring within 90 days.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
