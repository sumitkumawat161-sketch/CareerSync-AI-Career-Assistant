import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
  <div className="relative overflow-hidden py-20">
    
    <div className="absolute top-10 left-20 w-72 h-72 bg-purple-300 rounded-full blur-3xl opacity-20"></div>
    <div className="absolute bottom-10 right-20 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

    <div className="relative text-center max-w-5xl mx-auto px-4">

      <span className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-orange-100 to-purple-100 text-[#F83002] font-semibold shadow-sm">
         AI-Powered Career Assistant
      </span>

      <h1 className="mt-8 text-6xl font-extrabold leading-tight">
        Discover Your Next
        <br />
        <span className="bg-gradient-to-r from-[#F83002] to-[#6A38C2] bg-clip-text text-transparent">
          Dream Career
        </span>
      </h1>
      <div className="mt-10 flex items-center max-w-2xl mx-auto bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-full p-2">
        <input
          type="text"
          placeholder="Search jobs, companies, skills..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-5 py-3 bg-transparent outline-none text-gray-700"
        />

        <Button
          onClick={searchJobHandler}
          className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#8B5CF6] hover:scale-105 transition-all duration-300 px-6"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center gap-10 mt-12 flex-wrap">
        <div>
          <h3 className="text-3xl font-bold text-[#6A38C2]">10K+</h3>
          <p className="text-gray-500">Jobs Available</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-[#F83002]">5K+</h3>
          <p className="text-gray-500">Companies</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-[#6A38C2]">50K+</h3>
          <p className="text-gray-500">Career Insights</p>
        </div>
      </div>

    </div>
  </div>
);
}

export default HeroSection