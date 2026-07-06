import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

   return (
  <div className="py-12">
    <Carousel className="w-full max-w-6xl mx-auto">
      <CarouselContent className="-ml-2">
        {category.map((cat, index) => (
          <CarouselItem
            key={index}
            className="pl-2 basis-1/2 md:basis-1/3 lg:basis-1/5"
          >
            <Button
              onClick={() => searchJobHandler(cat)}
              variant="outline"
              className="
                w-full
                rounded-2xl
                border-2
                border-gray-200
                bg-white
                hover:bg-gradient-to-r
                hover:from-[#6A38C2]
                hover:to-[#8B5CF6]
                hover:text-white
                hover:border-transparent
                transition-all
                duration-300
                py-6
                text-sm
                font-semibold
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
              "
            >
              {cat}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  </div>
);
}

export default CategoryCarousel