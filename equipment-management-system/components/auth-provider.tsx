"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type UserRole = "admin" | "hr" | "manager" | "technician" | "operator" | "engineer"

interface User {
  id: number
  name: string
  email: string
  role: UserRole
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate different user roles
      let mockUser: User | null = null

      if (email === "admin@example.com" && password === "password") {
        mockUser = {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          avatar: "/avatars/admin.png",
        }
      } else if (email === "hr@example.com" && password === "password") {
        mockUser = {
          id: 2,
          name: "HR Manager",
          email: "hr@example.com",
          role: "hr",
          avatar: "/avatars/hr.png",
        }
      } else if (email === "manager@example.com" && password === "password") {
        mockUser = {
          id: 3,
          name: "Equipment Manager",
          email: "manager@example.com",
          role: "manager",
          avatar: "/avatars/manager.png",
        }
      } else if (email === "technician@example.com" && password === "password") {
        mockUser = {
          id: 4,
          name: "John Technician",
          email: "technician@example.com",
          role: "technician",
          avatar: "/avatars/technician.png",
        }
      } else if (email === "operator@example.com" && password === "password") {
        mockUser = {
          id: 5,
          name: "Sarah Operator",
          email: "operator@example.com",
          role: "operator",
          avatar: "/avatars/operator.png",
        }
      } else if (email === "engineer@example.com" && password === "password") {
        mockUser = {
          id: 6,
          name: "Mike Engineer",
          email: "engineer@example.com",
          role: "engineer",
          avatar: "/avatars/engineer.png",
        }
      }

      if (mockUser) {
        setUser(mockUser)
        localStorage.setItem("user", JSON.stringify(mockUser))
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

