import axios from "axios";
import { useEffect } from "react";
import { JOB_API_ENDPOINT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { setAllAdminJobs } from "../redux/jobSlice";

function useGetAllAdminJobs() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getAdminJobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error in useGetAllAdminJobs Hook", error);
      }
    };
    fetchAllAdminJobs();
  }, []);
}
export default useGetAllAdminJobs;
