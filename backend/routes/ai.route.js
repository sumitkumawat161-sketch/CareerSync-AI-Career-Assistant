import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
//import { getResumeRecommendations } from "../controllers/ai.controller.js";
import {
    getResumeRecommendations
} from "../controllers/ai.controller.js";
//import { chatWithResume } from "../controllers/ai.controller.js";
import { askRagAI } from "../controllers/ai.controller.js";
const router = express.Router();

router.get(
    "/resume-recommendations",
    isAuthenticated,
    getResumeRecommendations
);
// router.post(
//     "/chat",
//     isAuthenticated,
//     askCareerAI,
//     chatWithResume
// );
router.post(
    "/rag",
    isAuthenticated,
    askRagAI
);
export default router;