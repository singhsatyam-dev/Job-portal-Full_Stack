import Job from "../models/job.model.js";
import { sendConfirmationMail } from "../middlewares/mail.middleware.js";

export default class JobController {
  //get all jobs
  showJobs = async (req, res) => {
    try {
      const { search = "", page = 1 } = req.query;

      const limit = 5;
      const currentPage = Number(page);

      //search filter
      const query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
        ],
      };

      //total jobs
      const totalJobs = await Job.countDocuments(query);

      //pagination
      const jobs = await Job.find(query)
        .skip((currentPage - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return res.status(200).json({
        success: true,
        jobs,
        currentPage,
        totalPages: Math.ceil(totalJobs / limit),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch jobs",
        error: error.message,
      });
    }
  };

  //recruiter jobs
  recruiterDashboard = async (req, res) => {
    try {
      const jobs = await Job.find({
        createdBy: req.user.eamil,
      });

      return res.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch recruiter jobs",
      });
    }
  };

  //create job
  postCreateJob = async (req, res) => {
    try {
      const { title, company, location, description, salary, skills } =
        req.body;

      const job = await Job.create({
        title,
        company,
        location,
        description,
        salary,
        skills,
        createdBy: req.user.email,
      });

      return res.status(201).json({
        success: true,
        message: "Job created successfully",
        job,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create job",
        error: error.message,
      });
    }
  };

  //job details
  jobDetails = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      return res.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch job details",
      });
    }
  };

  //edit job
  postEditJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      //Authorization
      if (job.createdBy !== req.user.email) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        message: "Job updated successfully",
        updatedJob,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to update job",
      });
    }
  };

  //Apply Job
  applyJob = async (req, res) => {
    try {
      const { name, email } = req.body;

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resume is required",
        });
      }

      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      //Add Applicant

      job.applicants.push({
        name,
        email,
        resume: req.file.filename,
      });

      await job.save();

      //send email
      try {
        sendConfirmationMail(email, job.title);
      } catch (err) {
        console.log("Email failed:", err.message);
      }

      return res.status(200).json({
        success: true,
        message: "Application submitted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to apply",
      });
    }
  };

  //view applicants
  viewApplicants = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      return res.status(200).json({
        success: true,
        applicants: job.applicants,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch applicants",
      });
    }
  };

  //Delelte job
  removeJob = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);

      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }

      if (job.createdBy !== req.user.email) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized",
        });
      }

      await Job.findByIdAndDelete(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete job",
      });
    }
  };
}
