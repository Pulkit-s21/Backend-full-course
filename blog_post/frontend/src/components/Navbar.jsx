import { useState, useContext } from "react"
import { Menu, MenuHandler, MenuList, MenuItem } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../helpers/UserContext"
import Swal from "sweetalert2"
import baseUrl from "../utils/baseUrl"

export const Navbar = () => {
  const { user, logout, isLoggedIn } = useContext(UserContext)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const navItems = [
    { id: 1, label: "Home", to: "/" },
    { id: 2, label: "About", to: "/" },
    { id: 3, label: "Services", to: "/" },
  ]

  return (
    <nav className="w-full px-2">
      <div className="md:flex bg-white p-4 items-center justify-between">
        {/* logo div */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="w-10 lg:w-14" alt="Logo" />
          </div>
        </div>

        {/* toggle btn div */}
        <div
          onClick={() => {
            setOpen(!open)
          }}
          className="md:hidden cursor-pointer w-fit"
        >
          {open ? "X" : "="}
        </div>

        {/* mobile screen div */}
        <ul
          className={`flex flex-col md:flex-row gap-4 md:gap-6 md:items-center bg-white py-6 md:py-0 left-0 px-4 transition-all duration-200 absolute md:static w-full md:w-auto z-[100] ${
            open ? "top-16 opacity-100" : "top-[-490px]"
          } md:opacity-100`}
        >
          {navItems.map((item) => {
            return (
              <li
                className="bg-slate-100 rounded-lg px-2 py-1 text-sm lg:text-md text-neutral-700 hover:bg-neutral-700 hover:text-slate-100 transition-all font-medium w-fit capitalize border-transparent cursor-pointer"
                key={item.id}
                onClick={() => navigate(item.to)}
              >
                {item.label}
              </li>
            )
          })}

          <button className="lg:text-md text-neutral-700 cursor-pointer border-2 border-slate-400 px-4 rounded-lg hover:border-neutral-700 w-fit transition-all duration-200">
            <Link to={"/register"}>Get Started</Link>
          </button>

          {/* user profile */}
          <div className="flex flex-row gap-2">
            <Menu>
              <MenuHandler>
                <div className="flex flex-row gap-2 cursor-pointer">
                  {/* image */}
                  <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center group">
                    <img
                      className="w-12 h-12 object-cover group-hover:opacity-80"
                      src={
                        user
                          ? `${baseUrl}${user.image}`
                          : "https://images.unsplash.com/photo-1683322001857-f4d932a40672?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt="User"
                    />
                  </div>

                  {/* info */}
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base tracking-wider select-none">
                      {user?.username}
                    </p>
                    <p className="text-xs text-slate-500 select-none">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <Link
                    className="flex items-center gap-2 text-neutral-500 hover:text-black transition-all duration-200"
                    to={"/profile"}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user-pen"
                      >
                        <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
                        <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
                        <circle cx="10" cy="7" r="4" />
                      </svg>
                    </span>{" "}
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem className="flex items-center gap-2 text-neutral-500 hover:text-black transition-all duration-200">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-settings"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </span>{" "}
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (isLoggedIn) {
                      Swal.fire({
                        title: "Logged out!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                      }).then(() => {
                        logout()
                      })
                    } else {
                      Swal.fire({
                        title: "Not logged in!",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false,
                      })
                    }
                  }}
                  className="flex items-center gap-2 text-neutral-500 hover:text-black transition-all duration-200"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                  </span>{" "}
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </ul>
      </div>
    </nav>
  )
}
