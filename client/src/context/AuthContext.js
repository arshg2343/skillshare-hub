"use client"

// Global authentication context for managing user state
import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  // Fetch current user data
  const fetchUser = async (authToken) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }

  // Register user
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        setUser(data.user)
        return { success: true }
      }
      return { success: false, message: data.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        setUser(data.user)
        return { success: true }
      }
      return { success: false, message: data.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>{children}</AuthContext.Provider>
  )
}
