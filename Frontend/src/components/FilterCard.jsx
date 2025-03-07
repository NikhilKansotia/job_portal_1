import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
const filterData = [
  {
    filterType: "Location",
    arr: ["Delhi NCR", "Bengaluru", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    arr: [
      "Backend Developer",
      "Data Analyst",
      "Data Engineer",
      "Data Scientis",
      "Frontend Developer",
      "Full Stack Developer",
      "Software Engineer",
    ],
  },
  {
    filterType: "Industry",
    arr: ["0-40K", "41K-1L", "1L-10L", "10L-20L", "Greater than 20L"],
  },
  {
    filterType: "Experience",
    arr: [
      "Fresher",
      "0-6 Months",
      "6 Months-1 Year",
      "1-3 Years",
      "3-5 Years",
      "Greater than 5 Years",
    ],
  },
];
import { setSearchedQuery } from "../redux/jobSlice";
function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value) => {
    setSelectedValue(value);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  });
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Fiter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={handleChange}>
        {filterData.map((el, idx) => (
          <div>
            <h1 className="font-bold text-lg">{el.filterType}</h1>
            {el.arr.map((it) => (
              <div className="flex items-center space-x-2 my-2">
                <RadioGroupItem value={it} />
                <Label>{it}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
