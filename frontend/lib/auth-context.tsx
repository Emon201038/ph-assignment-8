"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./mock-data"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role?: "tourist" | "guide") => Promise<boolean>
  register: (name: string, email: string, password: string, role: "tourist" | "guide") => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string, role?: "tourist" | "guide") => {
    // Mock login - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0],
      email,
      role: role || "tourist",
      bio: "Travel enthusiast exploring the world",
      languages: ["English"],
    }

    setUser(mockUser)
    localStorage.setItem("currentUser", JSON.stringify(mockUser))
    return true
  }

  const register = async (name: string, email: string, password: string, role: "tourist" | "guide") => {
    // Mock registration - in real app, this would call an API
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      bio: role === "guide" ? "Passionate local guide" : "Travel enthusiast",
      languages: ["English"],
      ...(role === "guide" && {
        expertise: ["Culture"],
        dailyRate: 100,
        rating: 5.0,
        toursGiven: 0,
      }),
    }

    setUser(mockUser)
    localStorage.setItem("currentUser", JSON.stringify(mockUser))
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
