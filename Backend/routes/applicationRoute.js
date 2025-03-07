import express from "express";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getApplicants);
router.put("/update/:id", isAuthenticated, updateStatus);

export default router;
