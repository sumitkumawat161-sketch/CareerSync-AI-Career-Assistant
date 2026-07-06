import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
  <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sticky top-20">

    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Filter Jobs
      </h1>
      <p className="text-sm text-gray-500 mt-1">
        Find opportunities that match your preferences
      </p>
    </div>

    <RadioGroup value={selectedValue} onValueChange={changeHandler}>
      {filterData.map((data, index) => (
        <div
          key={index}
          className="mb-6 pb-6 border-b border-gray-100 last:border-none"
        >
          <h2 className="font-semibold text-gray-800 mb-4">
            {data.filterType}
          </h2>

          <div className="space-y-3">
            {data.array.map((item, idx) => {
              const itemId = `id-${index}-${idx}`;

              return (
                <label
                  key={itemId}
                  htmlFor={itemId}
                  className="
                    flex items-center gap-3
                    p-3 rounded-xl
                    cursor-pointer
                    transition-all duration-300
                    hover:bg-purple-50
                    hover:border-purple-200
                    border border-transparent
                  "
                >
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="
                      border-gray-400
                      data-[state=checked]:border-[#6A38C2]
                      data-[state=checked]:bg-[#6A38C2]
                    "
                  />

                  <span className="text-sm font-medium text-gray-700">
                    {item}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </RadioGroup>
  </div>
);
};

export default FilterCard;