import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import packagesData from "../../data/packagesData"

const AdminEditTour = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [highlightInput, setHighlightInput] = useState("")

  const tour = packagesData.find(t => t.id === Number(id))

  const [form, setForm] = useState({
    title: tour?.title || "",
    location: tour?.location || "",
    duration: tour?.duration || "",
    price: tour?.price || "",
    image: tour?.image || "",

    description: tour?.description || "",

    highlights: tour?.highlights || [],
    itinerary: tour?.itinerary || [
      { title: "", description: "" }
    ]
  })

  if (!tour) return <p>Tour not found</p>

  /* ---------------- BASIC INPUT ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* ---------------- HIGHLIGHTS ---------------- */

  const addHighlight = () => {
    if (!highlightInput.trim()) return
    setForm({
      ...form,
      highlights: [...form.highlights, highlightInput]
    })
    setHighlightInput("")
  }

  const removeHighlight = (index) => {
    const updated = [...form.highlights]
    updated.splice(index, 1)
    setForm({ ...form, highlights: updated })
  }

  /* ---------------- ITINERARY ---------------- */

  const updateItinerary = (index, field, value) => {
    const updated = [...form.itinerary]
    updated[index][field] = value
    setForm({ ...form, itinerary: updated })
  }

  const addDay = () => {
    setForm({
      ...form,
      itinerary: [...form.itinerary, { title: "", description: "" }]
    })
  }

  const removeDay = (index) => {
    const updated = [...form.itinerary]
    updated.splice(index, 1)
    setForm({ ...form, itinerary: updated })
  }

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = () => {
    console.log("UPDATED TOUR DATA:", form)
    alert("Tour updated (demo only)")
    navigate("/admin/tours")
  }

  return (
    <div className="max-w-4xl space-y-8">

      <h1 className="text-3xl font-bold">Edit Tour</h1>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Input label="Tour Name" name="title" value={form.title} onChange={handleChange} />
        <Input label="Location" name="location" value={form.location} onChange={handleChange} />
        <Input label="Duration" name="duration" value={form.duration} onChange={handleChange} />
        <Input label="Price" name="price" value={form.price} onChange={handleChange} />
        <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />
      </Section>

      {/* DESCRIPTIONS */}
      <Section title="Descriptions">
        <Textarea
          label="Short Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <Textarea
          label="Full Description"
          name="fullDescription"
          value={form.fullDescription}
          onChange={handleChange}
        />
      </Section>

      {/* HIGHLIGHTS */}
      <Section title="Tour Highlights">
        <div className="flex gap-2">
          <input
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            className="border px-3 py-2 rounded w-full"
            placeholder="Add highlight"
          />
          <button
            onClick={addHighlight}
            className="bg-green-600 text-white px-4 rounded"
          >
            +
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {form.highlights.map((item, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {item}
              <button onClick={() => removeHighlight(index)}>×</button>
            </span>
          ))}
        </div>
      </Section>

      {/* ITINERARY */}
      <Section title="Itinerary">
        {form.itinerary.map((day, index) => (
          <div key={index} className="border rounded p-4 space-y-3 relative">

            <button
              onClick={() => removeDay(index)}
              className="absolute top-2 right-2 text-red-500"
            >
              ✕
            </button>

            <Input
              label={`Day ${index + 1} Title`}
              value={day.title}
              onChange={(e) =>
                updateItinerary(index, "title", e.target.value)
              }
            />

            <Textarea
              label="Description"
              value={day.description}
              onChange={(e) =>
                updateItinerary(index, "description", e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={addDay}
          className="w-full border-2 border-dashed border-green-600 text-green-700 py-2 rounded"
        >
          + Add Another Day
        </button>
      </Section>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
      >
        Update Tour
      </button>

    </div>
  )
}

/* ---------------- UI COMPONENTS ---------------- */

const Section = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow space-y-4">
    <h2 className="text-xl font-bold">{title}</h2>
    {children}
  </div>
)

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <input {...props} className="w-full border rounded px-3 py-2" />
  </div>
)

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="text-sm text-gray-500">{label}</label>
    <textarea {...props} className="w-full border rounded px-3 py-2" rows={4} />
  </div>
)

export default AdminEditTour
