import React, { useState } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Navbar from "./shared/Navbar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "../hooks/useGetAppliedJobs";

function Profile() {
  useGetAppliedJobs();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const Skills = user?.profile?.skills;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200  rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://img.freepik.com/premium-vector/print-creative-modern-color-full-logo-design_1271730-562.jpg?semt=ais_hybrid" />
            </Avatar>
            <div>
              <h1 className="font-md text-xl">{user?.fullName}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="text-right"
            variant="outline"
            onClick={() => setIsOpen(true)}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-2 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {Skills?.length ? (
              Skills.map((el, idx) => (
                <Badge className="bg-[#3674B5]" key={idx}>
                  {el}
                </Badge>
              ))
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {user?.profile?.resumeOriginalName ? (
            <a
              target="blank"
              href={user?.profile?.resume}
              className="text-[#3674B5] w-full hover:underline cursor:pointer"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Profile;
