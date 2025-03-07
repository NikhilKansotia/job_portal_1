import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "../redux/authSlice";
import { Loader2 } from "lucide-react";

function UpdateProfileDialog({ isOpen, setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("profile", input.profile);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);
    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_ENDPOINT}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        console.log(res.data.user);
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error in Update Component", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setIsOpen(false);
  };
  return (
    <div>
      <Dialog open={isOpen}>
        <DialogContent
          className="sm:mx-w-[425px]"
          onInteractOutside={() => setIsOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  value={input.fullName}
                  onChange={(e) => handleChange(e)}
                  id="name"
                  name="fullName"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  value={input.email}
                  onChange={(e) => handleChange(e)}
                  id="email"
                  name="email"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input
                  value={input.phoneNumber}
                  onChange={(e) => handleChange(e)}
                  id="number"
                  name="phoneNumber"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  value={input.bio}
                  onChange={(e) => handleChange(e)}
                  id="bio"
                  name="bio"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  value={input.skills}
                  onChange={(e) => handleChange(e)}
                  id="skills"
                  name="skills"
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  type="file"
                  accept="applicatio/pdf"
                  id="file"
                  name="file"
                  onChange={handleFileChange}
                  className="col-span-2"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 bg-[#3674B5]">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-[#3674B5] hover:bg-[#355271]"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateProfileDialog;
