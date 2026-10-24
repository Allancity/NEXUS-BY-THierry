"use client"

import React, { useState } from "react"
import { Plus, Filter, Search, Trash2, Edit2 } from "lucide-react"

interface User {
  id: string
  email: string
  displayName: string
  role: "admin" | "hse_manager" | "supervisor" | "employee"
  department: string
  status: "active" | "inactive"
  joinedDate: string
  lastActive: string
}

const mockUsers: User[] = [
  { id: "1", email: "admin@nexus.com", displayName: "Admin User", role: "admin", department: "Administration", status: "active", joinedDate: "2024-01-15", lastActive: "2024-06-11" },
  { id: "2", email: "manager@nexus.com", displayName: "Sarah Manager", role: "hse_manager", department: "HSE", status: "active", joinedDate: "2024-02-20", lastActive: "2024-06-11" },
  { id: "3", email: "supervisor@nexus.com", displayName: "Mike Supervisor", role: "supervisor", department: "Operations", status: "active", joinedDate: "2024-03-10", lastActive: "2024-06-10" },
  { id: "4", email: "employee@nexus.com", displayName: "John Employee", role: "employee", department: "Warehouse", status: "active", joinedDate: "2024-04-05", lastActive: "2024-06-09" },
  { id: "5", email: "emma.wilson@nexus.com", displayName: "Emma Wilson", role: "supervisor", department: "Maintenance", status: "active", joinedDate: "2024-05-01", lastActive: "2024-06-11" },
  { id: "6", email: "robert.brown@nexus.com", displayName: "Robert Brown", role: "employee", department: "Production", status: "inactive", joinedDate: "2024-01-20", lastActive: "2024-05-15" },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({ email: "", displayName: "", role: "employee", department: "" })

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "badge danger"
      case "hse_manager": return "badge primary"
      case "supervisor": return "badge warning"
      case "employee": return "badge success"
      default: return "badge"
    }
  }

  const getRoleLabel = (role: string) => role.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  const getStatusColor = (status: string) => status === "active" ? "status-badge success" : "status-badge"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingUser) {
      setUsers(users.map((u) => u.id === editingUser.id ? { ...u, ...formData } : u))
      setEditingUser(null)
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        email: formData.email,
        displayName: formData.displayName,
        role: formData.role as any,
        department: formData.department,
        status: "active",
        joinedDate: new Date().toISOString().split("T")[0],
        lastActive: new Date().toISOString().split("T")[0],
      }
      setUsers([newUser, ...users])
    }
    setShowForm(false)
    setFormData({ email: "", displayName: "", role: "employee", department: "" })
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({ email: user.email, displayName: user.displayName, role: user.role, department: user.department })
    setShowForm(true)
  }

  const handleDelete = (id: string) => setUsers(users.filter((u) => u.id !== id))

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow-small">People</p>
          <h1>User management</h1>
        </div>
        <button onClick={() => { setEditingUser(null); setFormData({ email: "", displayName: "", role: "employee", department: "" }); setShowForm(!showForm) }} className="primary-btn small">
          <Plus className="w-5 h-5" />
          Add user
        </button>
      </div>

      {showForm && (
        <section className="panel-card form-card">
          <h3>{editingUser ? "Edit user" : "Add new user"}</h3>
          <form onSubmit={handleSubmit} className="form-grid two-col">
            <div className="field-group">
              <label>Email *</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            </div>
            <div className="field-group">
              <label>Display name *</label>
              <input type="text" value={formData.displayName} onChange={(e) => setFormData({ ...formData, displayName: e.target.value })} required />
            </div>
            <div className="field-group">
              <label>Role *</label>
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                <option value="employee">Employee</option>
                <option value="supervisor">Supervisor</option>
                <option value="hse_manager">HSE Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="field-group">
              <label>Department *</label>
              <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
            </div>
            <div className="button-row wide">
              <button type="button" className="secondary-btn" onClick={() => setShowForm(false)}>Cancel</button>
              <button type="submit" className="primary-btn">{editingUser ? "Update user" : "Create user"}</button>
            </div>
          </form>
        </section>
      )}

      <section className="panel-card toolbar-panel">
        <div className="toolbar-grid">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="field-group compact">
            <label>Role</label>
            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <option value="all">All roles</option>
              <option value="employee">Employee</option>
              <option value="supervisor">Supervisor</option>
              <option value="hse_manager">HSE Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="field-group compact">
            <label>Status</label>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </section>

      <section className="panel-card table-panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
                <th>Last active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td><span className={getRoleColor(user.role)}>{getRoleLabel(user.role)}</span></td>
                  <td>{user.department}</td>
                  <td><span className={getStatusColor(user.status)}>{user.status}</span></td>
                  <td>{user.lastActive}</td>
                  <td>
                    <div className="action-group">
                      <button className="icon-btn" onClick={() => handleEdit(user)}><Edit2 size={16} /></button>
                      <button className="icon-btn danger" onClick={() => handleDelete(user.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
