import { Application } from "../models/applicationModel.js";
import { Job } from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(200).json({
        message: "Job id is required",
        success: false,
      });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    const job = await Job.findById(jobId);
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    res.status(200).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in applyJobAPI", error);
  }
};
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: { path: "company" },
      });
    if (!application) {
      return res.status(400).json({
        message: "No application",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log("Error in getApplicationAPI", error);
  }
};
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: { path: "applicant" },
    });
    if (!job) {
      res.status(200).json({
        messaeg: "Job not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log("Error in getApplicantsAPI", error);
  }
};
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicantionId = req.params.id;
    if (!status) {
      return res.status(400).json({
        messaeg: "Status is required",
        success: false,
      });
    }
    const application = await Application.findOne({ _id: applicantionId });
    if (!application) {
      return res.status(400).json({
        message: "Application not found",
        success: false,
      });
    }
    application.status = status.toLowerCase();
    await application.save();
    res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in updaetStatusAPI", error);
  }
};
