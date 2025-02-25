import { useState } from "react"
import { Link } from "react-router-dom"
import { register } from "../services/authServices"
import Swal from "sweetalert2"

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [confirmPswrd, setConfirmPswrd] = useState("")

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleConfirmPswrdChange = (e) => {
    setConfirmPswrd(e.target.value)
  }

  const signUp = async (e) => {
    e.preventDefault()
    if (confirmPswrd !== formData.password) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password doesn't match",
      })
    }
    try {
      const data = await register(formData)
      if (data.token) {
        Swal.fire({
          icon: "success",
          title: "Welcome to the community",
          text: "Registered successfully",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("token", data.token)
          window.location.href = "/login"
        })
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <h3>Register</h3>
      <form onSubmit={signUp} className="grid grid-cols-1 gap-4">
        <label htmlFor="">Username</label>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPswrd}
          onChange={handleConfirmPswrdChange}
          required
        />

        <button className="bg-blue-900 px-4 py-0.5 w-fit text-white rounded-2xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-blue-900 hover:border-blue-900 transition-all duration-300">
          Sign up
        </button>
      </form>

      <div className="flex gap-2">
        <p>
          Already have an account?{" "}
          <span>
            <Link className="font-semibold text-blue-400" to={"/login"}>
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}
