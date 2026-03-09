import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ADMIN_EMAIL = "hariniraghu07@gmail.com"
const ADMIN_PASSWORD = "Myproject1"

const AdminLogin = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e) => {
    e.preventDefault()

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // store session
      localStorage.setItem("adminLoggedIn", "true")

      // redirect to dashboard
      navigate("/admin")
    } else {
      setError("Invalid admin credentials")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
