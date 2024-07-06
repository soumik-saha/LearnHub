import express from 'express';
import * as UserController from '../controllers/UserController.js';


const router = express.Router();

// Get user profile
router.get('/profile/:userId', UserController.getProfile);

// Get courses the user is enrolled in
router.get('/:userId/enrolledCourses', UserController.getEnrolledCourses);

// Enroll in a course
router.post('/:userId/:courseId/enroll', UserController.enrollInCourse);

export default router;