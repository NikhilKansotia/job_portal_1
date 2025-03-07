import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { APPLICATION_API_ENDPOINT } from "../utils/constant";
import { setAllAppliedJobs } from "../redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log("Error in fetching applied jobs", error);
      }
    };
    fetchAppliedJobs();
  }, []);
};
export default useGetAppliedJobs;
