"use client"

// Workshop detail page
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const WorkshopDetail = () => {
  const { id } = useParams()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [workshop, setWorkshop] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isParticipant, setIsParticipant] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  useEffect(() => {
    fetchWorkshop()
  }, [id])

  const fetchWorkshop = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workshops/${id}`)
      const data = await response.json()
      if (data.success) {
        setWorkshop(data.workshop)
        if (user) {
          setIsParticipant(data.workshop.participants.some((p) => p._id === user.id))
        }
      }
    } catch (error) {
      console.error("Error fetching workshop:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinLeave = async () => {
    if (!user) {
      navigate("/login")
      return
    }

    setActionLoading(true)
    try {
      const endpoint = isParticipant ? "leave" : "join"
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workshops/${id}/${endpoint}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setWorkshop(data.workshop)
        setIsParticipant(!isParticipant)
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!workshop) {
    return <div className="min-h-screen flex items-center justify-center">Workshop not found</div>
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate("/")} className="mb-6 text-blue-600 hover:text-blue-800 font-medium">
          ← Back to Workshops
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={workshop.imageURL || "/placeholder.svg"}
            alt={workshop.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{workshop.title}</h1>
                <p className="text-gray-600">By {workshop.creator.name}</p>
              </div>
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
                {workshop.category.charAt(0).toUpperCase() + workshop.category.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-gray-200">
              <div>
                <p className="text-gray-600 text-sm">Date & Time</p>
                <p className="font-semibold text-gray-800">{formatDate(workshop.date)}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Participants</p>
                <p className="font-semibold text-gray-800">
                  {workshop.participants.length}/{workshop.capacity}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="font-semibold text-green-600">Available</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">About This Workshop</h2>
              <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Participants</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {workshop.participants.map((participant) => (
                  <div key={participant._id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-gray-800">{participant.name}</p>
                    <p className="text-sm text-gray-600">{participant.email}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleJoinLeave}
              disabled={actionLoading || (workshop.participants.length >= workshop.capacity && !isParticipant)}
              className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                isParticipant ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {actionLoading ? "Processing..." : isParticipant ? "Leave Workshop" : "Join Workshop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopDetail
