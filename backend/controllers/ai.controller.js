import { GoogleGenerativeAI } from "@google/generative-ai";
import pdfParse from "pdf-parse";

export const calculateAtsScore = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `
Rate this candidate for the role:

${jobDescription}

Return ONLY JSON:

{
  "score": 75,
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

    const pdfData = await pdfParse(req.file.buffer);

    console.log(pdfData.text);

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const aiData = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      score: Number(aiData.score),
      feedback: aiData.feedback || [],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
