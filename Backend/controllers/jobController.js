import { Job } from "../models/jobModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Please provide all fields",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });
    res.status(200).json({
      message: "Job created successfully",
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in jobControllerAPI", error);
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error in getAllJobsAPI", error);
  }
};
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({ path: "applications" });
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in getJobByIdAPI", error);
  }
};
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(400).json({
        message: "Job not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log("Error in getAdminJobsAPI", error);
  }
};
