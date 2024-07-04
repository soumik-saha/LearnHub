import express from "express";
import * as courseController from "../controllers/courseController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", courseController.getCourses);
router.get("/:id", authMiddleware, courseController.getCourse);
router.post("/", authMiddleware, courseController.createCourse);
router.put("/:id", authMiddleware, courseController.updateCourse);
router.delete("/:id", authMiddleware, courseController.deleteCourse);

export default router;