import * as pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const calculateAtsScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a resume PDF.",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "Job description is required.",
      });
    }

    // Parse PDF directly from memory buffer
    console.log("PDF PARSE EXPORTS:");
    console.log(pdfParse);

    return res.status(200).json({
      success: true,
      exports: Object.keys(pdfParse),
    });

    const resumeText = pdfData.text;

    console.log("Resume Text Length:", resumeText?.length);
    console.log("Resume Preview:", resumeText?.substring(0, 500));

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({
        message: "Could not extract text from PDF.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `
You are an expert ATS (Applicant Tracking System).

Analyze the resume against the job description.

Job Description:
${jobDescription}

Resume:
${resumeText}

Instructions:
1. Calculate an ATS match score between 0 and 100.
2. Consider skills, technologies, projects, experience, keywords, and relevance.
3. Give realistic scoring. Do NOT return 0 unless the resume is completely unrelated.
4. Return exactly 3 improvement suggestions.

Return ONLY valid JSON:

{
  "score": 85,
  "feedback": [
    "Feedback 1",
    "Feedback 2",
    "Feedback 3"
  ]
}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Response:", responseText);

    const aiData = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      score: aiData.score,
      feedback: aiData.feedback,
    });
  } catch (error) {
    console.error("ATS Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error calculating ATS score",
      error: error.message,
    });
  }
};
