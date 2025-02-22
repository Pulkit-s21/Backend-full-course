import { AllBlogs } from "../components/AllBlogs"
import { Hero } from "../components/Hero"
import { Recentblog } from "../components/Recentblog"

export const Home = () => {
  return (
    <div className="grid grid-cols-1 gap-4 px-6">
      <Hero />
      <Recentblog />
      <AllBlogs />
    </div>
  )
}
