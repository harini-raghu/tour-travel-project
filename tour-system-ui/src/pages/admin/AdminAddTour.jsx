import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AdminAddTour = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    location: "",
    duration: "",
    price: "",
    image: "",

    shortDescription: "",
    fullDescription: "",

    highlights: [],

    itinerary: [
      { title: "", description: "" }
    ]
  })

  /* ---------------- BASIC FIELD HANDLER ---------------- */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  /* ---------------- HIGHLIGHTS ---------------- */
  const addHighlight = (value) => {
    if (!value.trim()) return

    setForm({
      ...form,
      highlights: [...form.highlights, value]
    })
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
    console.log("NEW TOUR DATA 👉", form)
    alert("New tour added (demo)")
    navigate("/admin/tours")
  }

  return (
    <div className="max-w-4xl space-y-8">

      <h1 className="text-3xl font-bold">Add New Tour</h1>

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
          name="shortDescription"
          value={form.shortDescription}
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
        <HighlightInput onAdd={addHighlight} />

        <div className="flex flex-wrap gap-2 mt-3">
          {form.highlights.map((item, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {item}
              <button onClick={() => removeHighlight(index)}>✕</button>
            </span>
          ))}
        </div>
      </Section>

      {/* ITINERARY */}
      <Section title="Itinerary">
        {form.itinerary.map((day, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-3 relative">
            <p className="font-semibold">Day {index + 1}</p>

            <Input
              label="Title"
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

            {form.itinerary.length > 1 && (
              <button
                onClick={() => removeDay(index)}
                className="absolute top-3 right-3 text-red-500"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        <button
          onClick={addDay}
          className="w-full border-2 border-dashed border-green-600 text-green-700 py-2 rounded-lg"
        >
          + Add Another Day
        </button>
      </Section>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
      >
        Add Tour
      </button>
    </div>
  )
}

/* ---------------- REUSABLE COMPONENTS ---------------- */

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
    <textarea {...props} className="w-full border rounded px-3 py-2 min-h-[100px]" />
  </div>
)

const HighlightInput = ({ onAdd }) => {
  const [value, setValue] = useState("")

  return (
    <div className="flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border rounded px-3 py-2"
        placeholder="Add a highlight..."
      />
      <button
        onClick={() => {
          onAdd(value)
          setValue("")
        }}
        className="bg-green-700 text-white px-4 rounded"
      >
        +
      </button>
    </div>
  )
}

export default AdminAddTour
