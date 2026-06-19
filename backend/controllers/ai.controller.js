import { GoogleGenerativeAI } from "@google/generative-ai";

export const calculateAtsScore = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume PDF.",
      });
    }

    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required.",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const pdfBase64 = req.file.buffer.toString("base64");

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        },
      },
      `
You are an expert ATS (Applicant Tracking System).

Analyze this resume PDF against the provided job description.

Job Description:
${jobDescription}

Return ONLY valid JSON.

{
  "score": 85,
  "matchedSkills": [
    "React",
    "Node.js"
  ],
  "missingSkills": [
    "Docker",
    "AWS"
  ],
  "feedback": [
    "Add cloud deployment experience",
    "Highlight testing skills",
    "Include quantified achievements"
  ]
}

Rules:
1. Score must be between 0 and 100.
2. Never return 0 unless completely unrelated.
3. Return exactly 3 feedback points.
4. Return ONLY JSON.
`,
    ]);

    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini ATS Response:");
    console.log(responseText);

    const aiData = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      score: Number(aiData.score),
      matchedSkills: aiData.matchedSkills || [],
      missingSkills: aiData.missingSkills || [],
      feedback: aiData.feedback || [],
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
