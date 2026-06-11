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
  {
    id: "1",
    email: "admin@nexus.com",
    displayName: "Admin User",
    role: "admin",
    department: "Administration",
    status: "active",
    joinedDate: "2024-01-15",
    lastActive: "2024-06-11",
  },
  {
    id: "2",
    email: "manager@nexus.com",
    displayName: "Sarah Manager",
    role: "hse_manager",
    department: "HSE",
    status: "active",
    joinedDate: "2024-02-20",
    lastActive: "2024-06-11",
  },
  {
    id: "3",
    email: "supervisor@nexus.com",
    displayName: "Mike Supervisor",
    role: "supervisor",
    department: "Operations",
    status: "active",
    joinedDate: "2024-03-10",
    lastActive: "2024-06-10",
  },
  {
    id: "4",
    email: "employee@nexus.com",
    displayName: "John Employee",
    role: "employee",
    department: "Warehouse",
    status: "active",
    joinedDate: "2024-04-05",
    lastActive: "2024-06-09",
  },
  {
    id: "5",
    email: "emma.wilson@nexus.com",
    displayName: "Emma Wilson",
    role: "supervisor",
    department: "Maintenance",
    status: "active",
    joinedDate: "2024-05-01",
    lastActive: "2024-06-11",
  },
  {
    id: "6",
    email: "robert.brown@nexus.com",
    displayName: "Robert Brown",
    role: "employee",
    department: "Production",
    status: "inactive",
    joinedDate: "2024-01-20",
    lastActive: "2024-05-15",
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    role: "employee",
    department: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-danger/20 text-danger"
      case "hse_manager":
        return "bg-primary-600/20 text-primary-400"
      case "supervisor":
        return "bg-warning/20 text-warning"
      case "employee":
        return "bg-success/20 text-success"
      default:
        return "bg-slate-700/20 text-slate-300"
    }
  }

  const getRoleLabel = (role: string) => {
    return role.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
  }

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-success/10 text-success"
      : "bg-slate-700/20 text-slate-400"
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...formData }
            : u
        )
      )
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
    setFormData({
      email: "",
      displayName: "",
      role: "employee",
      department: "",
    })
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      displayName: user.displayName,
      role: user.role,
      department: user.department,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
          <p className="text-slate-400">Manage team members and their roles</p>
        </div>
        <button
          onClick={() => {
            setEditingUser(null)
            setFormData({
              email: "",
              displayName: "",
              role: "employee",
              department: "",
            })
            setShowForm(!showForm)
          }}
          className="btn btn-primary"
        >
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="card-lg p-6 space-y-5">
          <h3 className="text-xl font-semibold">
            {editingUser ? "Edit User" : "Add New User"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="user@example.com"
                  className="input"
                  required
                />
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="input"
                  required
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium mb-2">Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="input"
                >
                  <option value="employee">Employee</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="hse_manager">HSE Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Department *
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  placeholder="e.g., Operations"
                  className="input"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingUser(null)
                  setFormData({
                    email: "",
                    displayName: "",
                    role: "employee",
                    department: "",
                  })
                }}
                className="btn btn-secondary flex-1"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1">
                {editingUser ? "Update User" : "Create User"}
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
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="input"
            >
              <option value="all">All Roles</option>
              <option value="employee">Employee</option>
              <option value="supervisor">Supervisor</option>
              <option value="hse_manager">HSE Manager</option>
              <option value="admin">Admin</option>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="card-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Last Active
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{user.displayName}</td>
                  <td className="px-6 py-4 text-slate-300">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleLabel(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{user.department}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {user.lastActive}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-2 hover:bg-slate-700 rounded transition-colors text-primary-400 hover:text-primary-300"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-slate-700 rounded transition-colors text-danger hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card p-4 bg-primary-900/30 text-primary-400 border border-primary-700/50">
          <p className="text-sm text-slate-400 mb-2">Total Users</p>
          <p className="text-3xl font-bold">{users.length}</p>
        </div>
        <div className="card p-4 bg-success/10 text-success border border-success/30">
          <p className="text-sm text-slate-400 mb-2">Active Users</p>
          <p className="text-3xl font-bold">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
        <div className="card p-4 bg-warning/10 text-warning border border-warning/30">
          <p className="text-sm text-slate-400 mb-2">Supervisors</p>
          <p className="text-3xl font-bold">
            {users.filter((u) => u.role === "supervisor").length}
          </p>
        </div>
        <div className="card p-4 bg-danger/10 text-danger border border-danger/30">
          <p className="text-sm text-slate-400 mb-2">Inactive Users</p>
          <p className="text-3xl font-bold">
            {users.filter((u) => u.status === "inactive").length}
          </p>
        </div>
      </div>
    </div>
  )
}
