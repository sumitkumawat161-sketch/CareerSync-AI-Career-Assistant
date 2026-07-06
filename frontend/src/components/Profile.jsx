
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-orange-50/20">
    <Navbar />

    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          <div className="flex items-center gap-5">
            <Avatar className="h-28 w-28 border-4 border-purple-100 shadow-lg">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>

            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.fullname}
              </h1>

              <p className="text-gray-600 mt-2 max-w-xl">
                {user?.profile?.bio || "No bio added yet"}
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active Profile
                </Badge>

                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  Job Seeker
                </Badge>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6]"
          >
            <Pen className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Section */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="font-bold text-lg mb-4">
            Contact Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Mail className="h-5 w-5 text-[#6A38C2]" />
              <span>{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl">
              <Contact className="h-5 w-5 text-[#6A38C2]" />
              <span>{user?.phoneNumber}</span>
            </div>

          </div>
        </div>

        {/* Skills */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3">
            {user?.profile?.skills?.length ? (
              user.profile.skills.map((skill, index) => (
                <Badge
                  key={index}
                  className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-100"
                >
                  {skill}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">
                No skills added
              </span>
            )}
          </div>
        </div>

        {/* Resume */}
        <div className="mt-8">
          <h2 className="font-bold text-lg mb-4">
            Resume
          </h2>

          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">

            {isResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noreferrer"
                className="text-[#6A38C2] font-medium hover:underline"
              >
                📄 {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-500">
                No Resume Uploaded
              </span>
            )}

          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="mt-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold mb-6">
          Applied Jobs
        </h1>

        <AppliedJobTable />
      </div>

      <UpdateProfileDialog
        open={open}
        setOpen={setOpen}
      />
    </div>
  </div>
);
}

export default Profile
