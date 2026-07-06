import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
  <div
    onClick={() => navigate(`/description/${job._id}`)}
    className="
      group
      bg-white
      rounded-3xl
      border border-gray-100
      p-6
      cursor-pointer
      shadow-md
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all duration-300
    "
  >
    {/* Company */}
    <div className="flex items-center gap-4">
      <img
        src={job?.company?.logo}
        alt=""
        className="w-12 h-12 rounded-xl object-cover border"
      />

      <div>
        <h2 className="font-semibold text-lg">
          {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500">
          📍 India
        </p>
      </div>
    </div>

    {/* Job Info */}
    <div className="mt-5">
      <h1 className="text-xl font-bold text-gray-900 group-hover:text-[#6A38C2] transition-colors">
        {job?.title}
      </h1>

      <p className="text-sm text-gray-600 mt-2 line-clamp-3">
        {job?.description}
      </p>
    </div>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-5">
      <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100">
        👥 {job?.position} Openings
      </Badge>

      <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-100">
        💼 {job?.jobType}
      </Badge>

      <Badge className="bg-purple-50 text-purple-700 hover:bg-purple-100">
        💰 {job?.salary} LPA
      </Badge>
    </div>

    {/* Footer */}
    <div className="mt-5 pt-4 border-t flex justify-between items-center">
      <span className="text-sm text-gray-500">
        Apply Now →
      </span>

      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
        Active
      </span>
    </div>
  </div>
);
}

export default LatestJobCards