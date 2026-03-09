import { useState } from "react"
import packagesData from "../../data/packagesData"
import { useNavigate } from "react-router-dom"

const AdminTours = () => {
    const navigate = useNavigate()

  const [tours, setTours] = useState(packagesData)

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return
    setTours(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Tour Management</h1>
          <p className="text-gray-500">
            Add, edit, and manage tour packages
          </p>
        </div>

        <button
  onClick={() => navigate('/admin/tours/add')}
  className="bg-green-700 text-white px-5 py-2 rounded-lg hover:bg-green-800"
>
  + Add New Tour
</button>
      </div>

      {/* TOUR CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tours.map(tour => (
          <div
            key={tour.id}
            className="bg-white rounded-xl shadow overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={tour.image}
              alt={tour.title}
              className="h-44 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">
                  {tour.title}
                </h3>

                {tour.popular && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-600">
                📍 {tour.location}
              </p>

              <p className="text-sm text-gray-600">
                ⏱ {tour.duration}
              </p>

              <p className="font-semibold text-green-700">
                {tour.price}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-between p-4 border-t">
              <button
  onClick={() => navigate(`/packages/${tour.id}`)}
  className="text-sm px-3 py-1 rounded border hover:bg-gray-100"
>
  View
</button>
              <button
  onClick={() => navigate(`/admin/tours/${tour.id}/edit`)}
  className="text-sm px-3 py-1 rounded border hover:bg-gray-100"
>
  Edit
</button>

              <button
                onClick={() => handleDelete(tour.id)}
                className="text-sm px-3 py-1 rounded border text-red-600 hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default AdminTours
