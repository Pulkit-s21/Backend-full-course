/* eslint-disable react/prop-types */
export const HorizontalBlog = ({
  image,
  username,
  createdAt,
  title,
  description,
  tags,
}) => {
  return (
    <div className="flex flex-row gap-5 rounded-tl-lg rounded-bl-lg overflow-hidden">
      <div className="w-96">
        <img
          className="w-full h-80 object-cover"
          src={image}
          alt="Blog Image"
        />
      </div>

      <div className="flex flex-col gap-2">
        {/* writer div */}
        <div className="flex gap-2">
          <p>{username}</p>
          <p>&bull;</p>
          <p>{createdAt}</p>
        </div>

        {/* blog info */}
        <div className="grid grid-cols-1 gap-3">
          <h4 className="font-medium xl:text-3xl tracking-wide">{title}</h4>
          <p className="xl:text-base text-slate-500">{description}</p>
        </div>

        {/* tags */}
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag, idx) => {
            return (
              <p
                key={idx}
                className="border-2 rounded-xl px-3 xl:text-xs tracking-widest font-medium hover:text-gray-800 hover:border-slate-500 transition-all duration-200 cursor-pointer"
              >
                {tag}
              </p>
            )
          })}
        </div>
      </div>
    </div>
  )
}
