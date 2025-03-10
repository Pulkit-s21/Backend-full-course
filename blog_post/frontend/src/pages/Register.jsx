import { useState } from "react"
import { Link } from "react-router-dom"
import { register } from "../services/authServices"
import Swal from "sweetalert2"

export const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    image: null,
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

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        image: file,
      })
    }
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
      // Convert formData into FormData object for file upload
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("image", formData.image)

      const data = await register(formDataToSend)

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
      Swal.fire({
        icon: "error",
        text: `${err.response.data.message}. Login with this email`,
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/login"
        }
      })
      console.error(err.message)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-6">
      <h3 className="font-bold text-6xl text-blue-500">Register</h3>
      <form onSubmit={signUp} className="grid grid-cols-1 gap-4">
        <label className="text-sm text-slate-500 -mb-1">Username</label>
        <input
          className="border-2 border-slate-100 w-fit rounded-md px-4 py-1 placeholder:text-neutral-700"
          type="text"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label className="text-sm text-slate-500 -mb-1">Email</label>
        <input
          className="border-2 border-slate-100 w-fit rounded-md px-4 py-1 placeholder:text-neutral-700"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label className="text-sm text-slate-500 -mb-1">Password</label>
        <input
          className="border-2 border-slate-100 w-fit rounded-md px-4 py-1 placeholder:text-neutral-700"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label className="text-sm text-slate-500 -mb-1">Confirm Password</label>
        <input
          className="border-2 border-slate-100 w-fit rounded-md px-4 py-1 placeholder:text-neutral-700"
          type="password"
          placeholder="Confirm your password"
          value={confirmPswrd}
          onChange={handleConfirmPswrdChange}
          required
        />
        <label className="text-sm text-slate-500">Profile Image</label>
        <input
          className="border-2 border-slate-100 w-fit rounded-md px-4 py-1 placeholder:text-neutral-700"
          type="file"
          name="image"
          onChange={handleImageChange}
          required
        />

        <button className="bg-blue-900 px-6 py-0.5 w-fit text-white rounded-xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-blue-900 hover:border-blue-900 transition-all duration-300">
          Sign up
        </button>
      </form>

      <div className="flex gap-2">
        <p>
          Already have an account?{" "}
          <span>
            <Link
              className="font-semibold text-lg text-blue-600 underline"
              to={"/login"}
            >
              Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}
