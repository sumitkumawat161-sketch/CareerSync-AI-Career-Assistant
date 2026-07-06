import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();
    // const jobId = "lsekdhjgdsnfvsdkjf";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
  <div className="
    group
    bg-white
    rounded-3xl
    border border-gray-100
    shadow-md
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all duration-300
    p-6
  ">

    {/* Top Section */}
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        {daysAgoFunction(job?.createdAt) === 0
          ? "Posted Today"
          : `${daysAgoFunction(job?.createdAt)} Days Ago`}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className="rounded-full hover:bg-purple-100"
      >
        <Bookmark className="h-5 w-5 text-gray-600" />
      </Button>
    </div>

    {/* Company */}
    <div className="flex items-center gap-4 mt-5">
      <Avatar className="h-14 w-14 border shadow-sm">
        <AvatarImage src={job?.company?.logo} />
      </Avatar>

      <div>
        <h2 className="font-semibold text-lg">
          {job?.company?.name}
        </h2>
        <p className="text-sm text-gray-500">
          🇮🇳 India
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

    {/* Badges */}
    <div className="flex flex-wrap gap-2 mt-5">

      <Badge
        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
      >
        👥 {job?.position} Openings
      </Badge>

      <Badge
        className="bg-orange-50 text-orange-600 hover:bg-orange-100"
      >
        💼 {job?.jobType}
      </Badge>

      <Badge
        className="bg-purple-50 text-purple-700 hover:bg-purple-100"
      >
        💰 {job?.salary} LPA
      </Badge>

    </div>

    {/* Buttons */}
    <div className="flex gap-3 mt-6">

      <Button
        onClick={() => navigate(`/description/${job?._id}`)}
        variant="outline"
        className="flex-1 rounded-xl"
      >
        View Details
      </Button>

      <Button
        className="
          flex-1
          rounded-xl
          bg-gradient-to-r
          from-[#6A38C2]
          to-[#8B5CF6]
          hover:opacity-90
        "
      >
        Save Job
      </Button>

    </div>
  </div>
);
}

export default Job