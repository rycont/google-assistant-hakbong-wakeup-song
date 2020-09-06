import { Router } from "express";
import getTodayAudio from "../controller/getTodayAudio";
import dialogflowFulfillment from "../controller/dialogflowFulfillment";
export const router = Router();

router.get("/todayAudio", getTodayAudio);
router.post("/", dialogflowFulfillment);
