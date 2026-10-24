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
      case "critical": return "badge-danger"
      case "high": return "badge-warning"
      case "medium": return "badge-primary"
      case "low": return "badge-success"
      default: return "badge-primary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "status-badge danger"
      case "addressed": return "status-badge success"
      case "monitoring": return "status-badge warning"
      default: return "status-badge"
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
      reader.onloadend = () => setCameraImage(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newHazard: Hazard = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      location: formData.location.trim(),
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
    setFormData({ title: "", description: "", location: "", severity: "medium", latitude: "", longitude: "" })
    setCameraImage(null)
    setUseGeolocation(false)
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow-small">Operations</p>
          <h1>Hazard reports</h1>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="primary-btn small">
          <Plus className="w-5 h-5" />
          Report hazard
        </button>
      </div>

      {showForm && (
        <section className="panel-card form-card">
          <h3>Report new hazard</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="field-group">
              <label>Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
            </div>

            <div className="field-group wide">
              <label>Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>

            <div className="field-group">
              <label>Location *</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
            </div>

            <div className="field-group">
              <label>Severity</label>
              <select value={formData.severity} onChange={(e) => setFormData({ ...formData, severity: e.target.value })}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="field-group wide action-row">
              <button type="button" className="secondary-btn" onClick={handleGetGeolocation}>
                <MapPin className="w-4 h-4" />
                {useGeolocation ? "Location captured" : "Capture location"}
              </button>
              {useGeolocation && <span className="coordinate-text">{formData.latitude}, {formData.longitude}</span>}
            </div>

            <div className="field-group wide">
              <label>Attach photo</label>
              <button type="button" className="secondary-btn" onClick={() => cameraInputRef.current?.click()}>
                <Camera className="w-4 h-4" />
                {cameraImage ? "Photo captured" : "Take photo"}
              </button>
              <input ref={cameraInputRef} type="file" accept="image/*" onChange={handlePhotoCapture} className="hidden" capture="environment" />
              {cameraImage && <img src={cameraImage} alt="Hazard capture" className="uploaded-image" />}
            </div>

            <div className="button-row wide">
              <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="primary-btn">Submit report</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel-card toolbar-panel">
        <div className="toolbar-grid">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search hazards..." />
          </div>
          <div className="field-group compact">
            <label>Severity</label>
            <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
              <option value="all">All levels</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
          <div className="field-group compact">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All status</option>
              <option value="open">Open</option>
              <option value="addressed">Addressed</option>
              <option value="monitoring">Monitoring</option>
            </select>
          </div>
        </div>
      </section>

      <section className="card-grid hazard-grid">
        {filteredHazards.map((hazard) => (
          <article key={hazard.id} className="panel-card hazard-card">
            {hazard.image && <img src={hazard.image} alt={hazard.title} className="hazard-image" />}
            <div className="hazard-body">
              <div className="hazard-topline">
                <h4>{hazard.title}</h4>
                <span className={`badge ${getSeverityColor(hazard.severity)}`}>{hazard.severity}</span>
              </div>
              <p>{hazard.description}</p>
              <div className="meta-row">
                <MapPin size={14} />
                <span>{hazard.location}</span>
              </div>
              <div className="meta-info">
                <span>Reported by: <strong>{hazard.reportedBy}</strong></span>
                <span>{hazard.reportedDate}</span>
              </div>
              <div className="status-line">
                <span className={getStatusColor(hazard.status)}>{hazard.status}</span>
                <span className="coords">{hazard.latitude.toFixed(4)}, {hazard.longitude.toFixed(4)}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  )
}
