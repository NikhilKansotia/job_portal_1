import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  postJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/post", isAuthenticated, postJob);
router.get("/get", getAllJobs);
router.get("/get/:id", isAuthenticated, getJobById);
router.get("/getAdminJobs", isAuthenticated, getAdminJobs);

export default router;
