"use client"

// User dashboard showing created and joined workshops
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Dashboard = () => {
  const { user, token, loading } = useAuth()
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  useEffect(() => {
    if (user && token) {
      fetchUserData()
    }
  }, [user, token])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (data.success) {
        setUserData(data.user)
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setDataLoading(false)
    }
  }

  if (loading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your workshops and explore new learning opportunities</p>
        </div>

        {/* Created Workshops Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Workshops You Created</h2>
            <Link
              to="/create-workshop"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Create New Workshop
            </Link>
          </div>

          {userData?.createdWorkshops && userData.createdWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.createdWorkshops.map((workshop) => (
                <div key={workshop._id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workshop.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      👥 {workshop.participants.length}/{workshop.capacity}
                    </span>
                    <span className="text-sm text-gray-500">📅 {new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/workshop/${workshop._id}`}
                      className="flex-1 bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition text-sm font-medium"
                    >
                      View
                    </Link>
                    <Link
                      to={`/edit-workshop/${workshop._id}`}
                      className="flex-1 bg-green-600 text-white py-2 rounded text-center hover:bg-green-700 transition text-sm font-medium"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't created any workshops yet.</p>
              <Link
                to="/create-workshop"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Create Your First Workshop
              </Link>
            </div>
          )}
        </div>

        {/* Joined Workshops Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Workshops You Joined</h2>

          {userData?.joinedWorkshops && userData.joinedWorkshops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userData.joinedWorkshops.map((workshop) => (
                <div key={workshop._id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">By {workshop.creator.name}</p>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workshop.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      👥 {workshop.participants.length}/{workshop.capacity}
                    </span>
                    <span className="text-sm text-gray-500">📅 {new Date(workshop.date).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/workshop/${workshop._id}`}
                    className="w-full bg-blue-600 text-white py-2 rounded text-center hover:bg-blue-700 transition font-medium"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-4">You haven't joined any workshops yet.</p>
              <Link
                to="/"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Explore Workshops
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
