import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs) 
        }
    }, [allJobs, searchedQuery]);

    return (
  <div className="min-h-screen bg-gray-50">
    <Navbar />

    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Find Your
          <span className="text-[#6A38C2]"> Dream Job</span>
        </h1>

        <p className="text-gray-500 mt-2">
          {filterJobs.length} opportunities available for you
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">

        {/* Filter Sidebar */}
        <div className="lg:w-[280px] shrink-0">
          <div className="sticky top-24">
            <FilterCard />
          </div>
        </div>

        {/* Jobs Section */}
        <div className="flex-1">

          {filterJobs.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-md p-12 text-center">
              <h2 className="text-2xl font-bold text-gray-700">
                No Jobs Found 😔
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing filters or search keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filterJobs.map((job) => (
                <motion.div
                  key={job?._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  </div>
);
}

export default Jobs