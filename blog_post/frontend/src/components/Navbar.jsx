import { useState } from "react"

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  const navItems = [
    { id: 1, label: "Home" },
    { id: 2, label: "About" },
    { id: 3, label: "Services" },
  ]
  return (
    <nav className="w-full px-2">
      <div className="md:flex bg-white p-4 items-center justify-between">
        {/* logo div */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img className="w-10 lg:w-14" src="" alt="Logo" />
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
                onClick={() => alert("Work")}
              >
                {item.label}
              </li>
            )
          })}

          <button
            onClick={() => alert("Clicked")}
            className="lg:text-md text-neutral-700 cursor-pointer border-2 border-slate-400 px-3 rounded-lg hover:border-neutral-700  transition-all duration-200"
          >
            Get Started
          </button>

          {/* user profile */}
          <div>
            
          </div>
        </ul>
      </div>
    </nav>
  )
}
