import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({ job }) {
  const navigate = useNavigate();
  const daysAgoFunction = (mongoTime) => {
    console.log(mongoTime);
    const createdAt = new Date(mongoTime);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  };
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-md text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div>
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position}Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
        <Badge className="text-[#1bbd39] font-bold" variant="ghost">
          {job?.experience} Year
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={() => navigate(`/description/${job._id}`)}
        >
          Details
        </Button>
        <Button className="bg-[#3674B5] hover:bg-[#314b69]">
          Save For Later
        </Button>
      </div>
    </div>
  );
}

export default Job;
