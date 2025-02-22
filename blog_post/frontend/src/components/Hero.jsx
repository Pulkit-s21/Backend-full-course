export const Hero = () => {
  return (
    <div className="h-full flex flex-col text-center gap-3 items-center justify-center mt-8">
      <h1 className="xl:text-6xl font-bold tracking-wider">
        Ideas Worth Sharing, Stories Worth Telling
      </h1>
      <p className="text-slate-500 xl:text-2xl font-medium">
        Subscribe to learn about new products, technology and updates
      </p>

      <div className="flex gap-3 border-2 border-slate-200 rounded-lg px-2 py-0.5 mt-8">
        <input
          type="email"
          placeholder="Email your email"
          className="outline-none border-none xl:text-lg"
        />
        <button className="bg-black px-4 py-1 rounded-lg cursor-pointer text-white hover:bg-white hover:text-black transition-all duration-300 border-2 border-transparent hover:border-black">
          <p className="xl:text-lg">Subscribe</p>
        </button>
      </div>
    </div>
  )
}
