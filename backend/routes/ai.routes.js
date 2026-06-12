import express from "express";
import { calculateAtsScore } from "../controllers/ai.controller.js";

import {upload} from "../middlewares/upload.middleware.js";

const aiRouter = express.Router();

// The 'resume' string must match the field name sent from the frontend
aiRouter.post("/score-resume", upload.single("resume"), calculateAtsScore);

export default aiRouter;
