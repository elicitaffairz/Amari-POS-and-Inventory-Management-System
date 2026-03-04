"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { supabase } from "./supabase/client"

export type UserRole = "cashier" | "manager" | "admin"

export interface User {
  id: string
  username: string
  role: UserRole
  name: string
}

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  addUser: (username: string, password: string, name: string, role: UserRole) => Promise<boolean>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem("pos-user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        // Restore auth cookies for middleware on app initialization
        document.cookie = `pos-user-id=${parsedUser.id}; path=/; max-age=86400; SameSite=Strict`
        document.cookie = `pos-username=${parsedUser.username}; path=/; max-age=86400; SameSite=Strict`
      } catch (e) {
        // Invalid stored user, clear it
        localStorage.removeItem("pos-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<boolean> => {
    const { data, error } = await supabase
      .from("users")
      .select("id, username, role, name, password")
      .eq("username", username)
      .single()

    if (error || !data) return false

    if (data.password === password) {
      const userObj: User = { id: data.id.toString(), username: data.username, role: data.role, name: data.name }
      setUser(userObj)
      localStorage.setItem("pos-user", JSON.stringify(userObj))
      
      // Set auth cookie for middleware verification (secure session)
      // This is a client-side cookie that helps middleware identify authenticated users
      document.cookie = `pos-user-id=${data.id}; path=/; max-age=86400; SameSite=Strict`
      document.cookie = `pos-username=${username}; path=/; max-age=86400; SameSite=Strict`

      // Log login to audit logs
      await supabase.from("audit_logs").insert([{
        user_id: data.id,
        username: data.username,
        action: "LOGIN",
        entity_type: "Authentication",
        entity_id: data.id,
        description: `User logged in: ${data.username}`
      }])

      return true
    }
    return false
  }

  const addUser = async (username: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    try {
      const { error } = await supabase.from("users").insert([{ username, password, name, role }])
      if (error) throw error
      return true
    } catch (err) {
      console.error("Error adding user:", err)
      return false
    }
  }

  const logout = () => {
    if (user) {
      // Log logout to audit logs
      void supabase.from("audit_logs").insert([{
        user_id: parseInt(user.id),
        username: user.username,
        action: "LOGOUT",
        entity_type: "Authentication",
        entity_id: parseInt(user.id),
        description: `User logged out: ${user.username}`
      }])
    }
    setUser(null)
    localStorage.removeItem("pos-user")
    
    // Clear auth cookies
    document.cookie = 'pos-user-id=; path=/; max-age=0; SameSite=Strict'
    document.cookie = 'pos-username=; path=/; max-age=0; SameSite=Strict'
    
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, addUser, isLoading }}>
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
