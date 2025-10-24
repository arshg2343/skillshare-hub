import { Link } from "react-router-dom"

const WorkshopCard = ({ workshop }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const categoryColors = {
    coding: "bg-blue-100 text-blue-800",
    design: "bg-purple-100 text-purple-800",
    photography: "bg-pink-100 text-pink-800",
    writing: "bg-green-100 text-green-800",
    music: "bg-yellow-100 text-yellow-800",
    other: "bg-gray-100 text-gray-800",
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <img src={workshop.imageURL || "/placeholder.svg"} alt={workshop.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 flex-1">{workshop.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[workshop.category]}`}>
            {workshop.category}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{workshop.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
          <span>📅 {formatDate(workshop.date)}</span>
          <span>
            👥 {workshop.participants.length}/{workshop.capacity}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-3">By {workshop.creator.name}</p>
        <Link
          to={`/workshop/${workshop._id}`}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-center font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default WorkshopCard
