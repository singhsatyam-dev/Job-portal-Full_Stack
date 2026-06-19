import { GoogleGenerativeAI } from "@google/generative-ai";

export const calculateAtsScore = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      score: 80,
      feedback: [
        "Test feedback 1",
        "Test feedback 2",
        "Test feedback 3",
      ],
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};