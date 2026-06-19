// import fs from "fs";
import { PDFParse } from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const calculateAtsScore = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // 1. Check if file and job description are provided
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume PDF." });
    }
    const { jobDescription } = req.body;
    if (!jobDescription) {
      return res.status(400).json({ message: "Job description is required." });
    }

    // 2. Read the PDF file from the uploads folder
    // const dataBuffer = fs.readFileSync(req.file.path);
    // const pdfData = await new PDFParse(dataBuffer);
    const pdfData = await new PDFParse(req.file.buffer);
    const resumeText = pdfData.text;

    // 3. Define the prompt for Gemini
    const prompt = `
      You are an expert ATS (Applicant Tracking System). 
      Review the following Resume against the provided Job Description.
      
      Job Description:
      ${jobDescription}

      Resume Text:
      ${resumeText}

      Provide an ATS match score out of 100. Also provide 3 short bullet points on what is missing or can be improved.
      You MUST return the response ONLY as a valid JSON object with the following structure, with no markdown formatting or extra text:
      {
        "score": 85,
        "feedback": ["Missing React context experience", "Need more details on API integration"]
      }
    `;

    // 4. Call Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();

    // Clean the response in case Gemini adds ```json to the output
    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse the JSON string into a JavaScript object
    const aiData = JSON.parse(responseText);

    // 5. Clean up the uploaded file to save space
    // fs.unlinkSync(req.file.path);
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // 6. Send the result to the frontend
    res.status(200).json({
      success: true,
      score: aiData.score,
      feedback: aiData.feedback,
    });
  } catch (error) {
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error in ATS Scoring:", error);
    res
      .status(500)
      .json({ message: "Error calculating ATS score", error: error.message });
  }
};
