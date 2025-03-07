import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import useGetAllAdminJobs from "../../hooks/useGetAllAdminJobs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchJobByText } from "../../redux/jobSlice";
import AdminJobsTable from "./AdminJobsTable";

function AdminJobs() {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-fit"
            placeholder="Filter by name, role"
          />
          <Button onClick={() => navigate("/admin/jobs/create")} className="">
            New Jobs
          </Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
}

export default AdminJobs;
