import { useContext, useState } from "react"
import { getUserDetails, login as loginApi } from "../services/authServices"
import { Link } from "react-router-dom"
import { UserContext } from "../helpers/UserContext"
import { jwtDecode } from "jwt-decode"
import Swal from "sweetalert2"

export const Login = () => {
  const { setUser } = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await loginApi(formData)
      if (data.token) {
        // need to do this to update user info on login
        // UserContext doesnt re-render on changes in localStorage
        const decodedUser = jwtDecode(data.token)
        const userData = await getUserDetails(decodedUser.id, data.token)
        setUser(userData)
        Swal.fire({
          icon: "success",
          title: "Welcome",
          text: `${userData.username}`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          localStorage.setItem("token", data.token)
          window.location.href = "/"
        })
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: `${err.response.data.message}`,
      })
      console.error(err.message)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <h3>Login</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
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
        <button className="bg-blue-900 px-4 py-0.5 w-fit text-white rounded-2xl cursor-pointer border-2 border-transparent hover:bg-white hover:text-blue-900 hover:border-blue-900 transition-all duration-300">
          Log in
        </button>
      </form>

      <div className="flex gap-2">
        Dont have an account?{" "}
        <span>
          <Link className="font-semibold text-blue-400" to={"/register"}>
            Register
          </Link>
        </span>
      </div>
    </div>
  )
}
