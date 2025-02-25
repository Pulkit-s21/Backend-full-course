/* eslint-disable react/prop-types */
import moment from "moment"

export const VerticalBlog = ({
  image,
  username,
  createdAt,
  title,
  description,
  tags,
}) => {
  return (
    <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-t-2xl">
      <img
        className="hover:scale-100 transition-all duration-500 max-w-3xl"
        src={image}
        alt="Blog Image"
      />

      {/* writer div */}
      <div className="flex gap-2">
        <p>{username}</p>
        <p>&bull;</p>
        <p className="text-slate-500">{moment(createdAt).fromNow()}</p>
      </div>

      {/* blog info */}
      <div className="grid grid-cols-1 gap-3">
        <h4 className="font-medium xl:text-3xl tracking-wide">{title}</h4>
        <p className="xl:text-base text-slate-500">{description}</p>
      </div>

      {/* tags */}
      <div className="flex flex-row gap-2">
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
  )
}
