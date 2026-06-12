import axiosInstance from "./axiosInstance";

/**
 * Score a resume PDF against a job description.
 * @param {File} resumeFile - The PDF file object
 * @param {string} jobDescription - The job preference / description text
 */
export const scoreResume = async (resumeFile, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", resumeFile);
  formData.append("jobDescription", jobDescription);

  const { data } = await axiosInstance.post("/ai/score-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data; // { success, score, feedback }
};
