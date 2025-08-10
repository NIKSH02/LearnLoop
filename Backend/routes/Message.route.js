import express from "express";
import {
  allMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

export default router;
