import axiosInstance from "./axiosInstance";

export const getJobs = (search = "", page = 1) =>
  axiosInstance.get("/jobs", { params: { search, page } });

export const getJobById = (id) => axiosInstance.get(`/jobs/${id}`);

export const createJob = (data) => axiosInstance.post("/jobs", data);

export const updateJob = (id, data) => axiosInstance.put(`/jobs/${id}`, data);

export const deleteJob = (id) => axiosInstance.delete(`/jobs/${id}`);

export const applyJob = (id, formData) =>
  axiosInstance.post(`/jobs/${id}/apply`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getApplicants = (id) =>
  axiosInstance.get(`/jobs/${id}/applicants`);

export const getMyJobs = () => axiosInstance.get("/jobs/recruiter/my-jobs");
