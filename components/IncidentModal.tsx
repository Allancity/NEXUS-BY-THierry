"use client"

import React, { useState } from "react"
import { X, Upload, AlertTriangle } from "lucide-react"

interface IncidentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

export default function IncidentModal({
  isOpen,
  onClose,
  onSubmit,
}: IncidentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium",
    category: "hazard",
  })
  const [file, setFile] = useState<File | null>(null)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...formData, file })
    setFormData({
      title: "",
      description: "",
      location: "",
      severity: "medium",
      category: "hazard",
    })
    setFile(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="card-lg w-full max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-warning" />
            <h2 className="text-2xl font-bold">Report Incident</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Brief incident title"
              className="input"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Detailed description of the incident"
              className="input resize-none h-32"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Where did this occur?"
              className="input"
              required
            />
          </div>

          {/* Severity and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Severity *
              </label>
              <select
                value={formData.severity}
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value })
                }
                className="input"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="input"
                required
              >
                <option value="hazard">Hazard</option>
                <option value="incident">Incident</option>
                <option value="near-miss">Near Miss</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Attach Photo/Video
            </label>
            <div className="relative border-2 border-dashed border-slate-600 rounded-lg p-6 hover:border-primary-500 transition-colors cursor-pointer">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept="image/*,video/*"
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-sm font-medium">
                  {file ? file.name : "Click or drag file to upload"}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  PNG, JPG, GIF, MP4, MOV (Max 50MB)
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex-1"
              disabled={!formData.title || !formData.location}
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
