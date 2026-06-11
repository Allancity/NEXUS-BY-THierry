"use client"

import React, { useState, useRef } from "react"
import { Plus, MapPin, Camera, Search } from "lucide-react"

interface Hazard {
  id: string
  title: string
  description: string
  location: string
  latitude: number
  longitude: number
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "addressed" | "monitoring"
  reportedBy: string
  reportedDate: string
  image?: string
}

const mockHazards: Hazard[] = [
  {
    id: "1",
    title: "Loose electrical outlet",
    description: "Outlet cover is damaged and wires exposed",
    location: "Office Building - 2nd Floor",
    latitude: 40.7128,
    longitude: -74.006,
    severity: "high",
    status: "open",
    reportedBy: "John Smith",
    reportedDate: "2024-06-10",
  },
  {
    id: "2",
    title: "Spill on warehouse floor",
    description: "Oil spill in parking area creating slip hazard",
    location: "Warehouse Area C",
    latitude: 40.7138,
    longitude: -74.008,
    severity: "medium",
    status: "addressed",
    reportedBy: "Sarah Johnson",
    reportedDate: "2024-06-09",
  },
  {
    id: "3",
    title: "Broken handrail",
    description: "Stairwell handrail is loose and unstable",
    location: "Main Building - Stairwell A",
    latitude: 40.7118,
    longitude: -74.004,
    severity: "high",
    status: "monitoring",
    reportedBy: "Mike Davis",
    reportedDate: "2024-06-08",
  },
  {
    id: "4",
    title: "Chemical storage improperly labeled",
    description: "Hazardous chemicals not properly labeled",
    location: "Storage Room B",
    latitude: 40.7148,
    longitude: -74.01,
    severity: "critical",
    status: "open",
    reportedBy: "Emma Wilson",
    reportedDate: "2024-06-07",
  },
]

export default function HazardsPage() {
  const [hazards, setHazards] = useState<Hazard[]>(mockHazards)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [useGeolocation, setUseGeolocation] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    severity: "medium",
    latitude: "",
    longitude: "",
  })
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const [cameraImage, setCameraImage] = useState<string | null>(null)

  const filteredHazards = hazards.filter((hazard) => {
    const matchesSearch =
      hazard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hazard.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = filterSeverity === "all" || hazard.severity === filterSeverity
    const matchesStatus = filterStatus === "all" || hazard.status === filterStatus
    return matchesSearch && matchesSeverity && matchesStatus
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "badge-danger"
      case "high":
        return "badge-warning"
      case "medium":
        return "badge-primary"
      case "low":
        return "badge-success"
      default:
        return "badge-primary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-danger/10 text-danger"
      case "addressed":
        return "bg-success/10 text-success"
      case "monitoring":
        return "bg-warning/10 text-warning"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const handleGetGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        })
        setUseGeolocation(true)
      })
    }
  }

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCameraImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add new hazard
    const newHazard: Hazard = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      location: formData.location,
      latitude: parseFloat(formData.latitude) || 0,
      longitude: parseFloat(formData.longitude) || 0,
      severity: formData.severity as any,
      status: "open",
      reportedBy: "Current User",
      reportedDate: new Date().toISOString().split("T")[0],
      image: cameraImage || undefined,
    }
    setHazards([newHazard, ...hazards])
    setShowForm(false)
    setFormData({
      title: "",
      description: "",
      location: "",
      severity: "medium",
      latitude: "",
      longitude: "",
    })
    setCameraImage(null)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Hazard Reports</h1>
          <p className="text-slate-400">Report and track workplace hazards</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          Report Hazard
        </button>
      </div>

      {/* Hazard Report Form */}
      {showForm && (
        <div className="card-lg p-6 space-y-5">
          <h3 className="text-xl font-semibold">Report New Hazard</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Brief hazard description"
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
                placeholder="Detailed description"
                className="input resize-none h-24"
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
                placeholder="Where is this hazard?"
                className="input"
                required
              />
            </div>

            {/* Geolocation */}
            <div>
              <button
                type="button"
                onClick={handleGetGeolocation}
                className="btn btn-secondary text-sm"
              >
                <MapPin className="w-4 h-4" />
                {useGeolocation ? "Location Captured" : "Capture Location"}
              </button>
              {useGeolocation && (
                <p className="text-xs text-slate-400 mt-2">
                  📍 {formData.latitude}, {formData.longitude}
                </p>
              )}
            </div>

            {/* Severity */}
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
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Attach Photo
              </label>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="btn btn-secondary w-full"
              >
                <Camera className="w-5 h-5" />
                {cameraImage ? "Photo Captured" : "Take Photo"}
              </button>
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoCapture}
                className="hidden"
                capture="environment"
              />
              {cameraImage && (
                <div className="mt-3 relative">
                  <img
                    src={cameraImage}
                    alt="Captured"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setFormData({
                    title: "",
                    description: "",
                    location: "",
                    severity: "medium",
                    latitude: "",
                    longitude: "",
                  })
                  setCameraImage(null)
                }}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1">
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="card-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search hazards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Severity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Severity</label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="input"
            >
              <option value="all">All Levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="addressed">Addressed</option>
              <option value="monitoring">Monitoring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Hazards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHazards.map((hazard) => (
          <div key={hazard.id} className="card-lg overflow-hidden">
            {/* Image */}
            {hazard.image && (
              <div className="h-40 bg-slate-700 overflow-hidden">
                <img
                  src={hazard.image}
                  alt={hazard.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-lg flex-1">{hazard.title}</h3>
                <span className={`badge ${getSeverityColor(hazard.severity)}`}>
                  {hazard.severity.charAt(0).toUpperCase() +
                    hazard.severity.slice(1)}
                </span>
              </div>

              <p className="text-slate-400 text-sm mb-4">{hazard.description}</p>

              {/* Location */}
              <div className="flex items-start gap-2 mb-3 text-sm">
                <MapPin className="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{hazard.location}</p>
                  <p className="text-xs text-slate-500">
                    📍 {hazard.latitude.toFixed(4)}, {hazard.longitude.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Reported by:</span>
                  <span className="font-medium">{hazard.reportedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date:</span>
                  <span className="font-medium">{hazard.reportedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(hazard.status)}`}>
                    {hazard.status.charAt(0).toUpperCase() +
                      hazard.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHazards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400">No hazards found</p>
        </div>
      )}
    </div>
  )
}
