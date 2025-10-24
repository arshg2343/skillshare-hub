"use client"

// Home page with workshop listing and filtering
import { useState, useEffect } from "react"
import WorkshopCard from "../components/WorkshopCard"

const Home = () => {
  const [workshops, setWorkshops] = useState([])
  const [filteredWorkshops, setFilteredWorkshops] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchWorkshops()
  }, [])

  const fetchWorkshops = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/workshops`)
      const data = await response.json()
      if (data.success) {
        setWorkshops(data.workshops)
        setFilteredWorkshops(data.workshops)
      }
    } catch (error) {
      console.error("Error fetching workshops:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = workshops

    if (selectedCategory !== "all") {
      filtered = filtered.filter((w) => w.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (w) =>
          w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          w.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredWorkshops(filtered)
  }, [selectedCategory, searchTerm, workshops])

  const categories = ["all", "coding", "design", "photography", "writing", "music", "other"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to SkillShare Hub</h1>
          <p className="text-xl text-blue-100">Discover and join skill-based workshops from experts around the world</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <input
            type="text"
            placeholder="Search workshops..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === cat ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Workshops Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading workshops...</p>
          </div>
        ) : filteredWorkshops.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map((workshop) => (
              <WorkshopCard key={workshop._id} workshop={workshop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No workshops found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
