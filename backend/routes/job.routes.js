import express from "express";

import JobController from "../controllers/job.controller.js";
import { isRecruiter, isJobSeeker } from "../middlewares/role.middleware.js";
import { isAuthenticated } from "../middlewares/jwtAuth.middleware.js";
import { validateJob } from "../middlewares/validation.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const jobRouter = express.Router();

const jobController = new JobController();

// GET ALL JOBS
jobRouter.get("/", jobController.showJobs);

// CREATE JOB
jobRouter.post(
  "/",
  isAuthenticated,
  isRecruiter,
  validateJob,
  jobController.postCreateJob,
);

// RECRUITER JOBS
jobRouter.get(
  "/recruiter/my-jobs",
  isAuthenticated,
  isRecruiter,
  jobController.recruiterDashboard,
);

// GET SINGLE JOB
jobRouter.get("/:id", jobController.jobDetails);

// UPDATE JOB
jobRouter.put("/:id", isAuthenticated, isRecruiter, jobController.postEditJob);

// APPLY FOR JOB
jobRouter.post(
  "/:id/apply",
  upload.single("resume"),
  isAuthenticated,
  isJobSeeker,
  jobController.applyJob,
);

// DELETE JOB
jobRouter.delete("/:id", isAuthenticated, isRecruiter, jobController.removeJob);

// VIEW APPLICANTS
jobRouter.get(
  "/:id/applicants",
  isAuthenticated,
  isRecruiter,
  jobController.viewApplicants,
);

export default jobRouter;
