import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Graphic Designer",
  "Full Stack Developer",
];
function CategoryCarousel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((el, id) => (
            <CarouselItem key={id} className="md:basis-1/2 lg-basis:1/3">
              <Button
                onClick={() => searchJobHandler(el)}
                variant="outline"
                className="rounded-full"
              >
                {el}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
