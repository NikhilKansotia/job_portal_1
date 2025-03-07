import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";
import { Loader2 } from "lucide-react";

function Signup() {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const dispatch = useDispatch();
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      console.log(loading);
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      formData.append("email", input.email);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("password", input.password);
      formData.append("role", input.role);
      if (input.file) formData.append("file", input.file);
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (user) navigate("/");
  }, []);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="text-xl mb-5 font-bold">Sign Up</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullName}
              name="fullName"
              onChange={(e) => handleInputChange(e)}
              placeholder="user1"
              className="my-2"
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={(e) => handleInputChange(e)}
              placeholder="abc@gmail.com"
              className="my-2"
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={(e) => handleInputChange(e)}
              placeholder="+ab xxxxyyyyzz"
              className="my-2"
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={(e) => handleInputChange(e)}
              placeholder="****"
              className="my-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Label htmlFor="role">Student</Label>
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={(e) => handleInputChange(e)}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Label htmlFor="role">Recruiter</Label>
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={(e) => handleInputChange(e)}
                  className="cursor-pointer"
                />
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
          </div>
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
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account ?{" "}
            <Link to="/login" className="text-[#3674B5]">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
