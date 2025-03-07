import React from "react";
import LatestJobCart from "./LatestJobCart";
import { useSelector } from "react-redux";

function LatestJobs() {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#3674B5]">Latest & Top</span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {!allJobs.length ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job, idx) => <LatestJobCart key={idx} job={job} />)
        )}
      </div>
    </div>
  );
}

export default LatestJobs;
