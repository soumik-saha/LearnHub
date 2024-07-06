import express from 'express';
import * as userController from '../controllers/userController.js';


const router = express.Router();

// Get user profile
router.get('/profile/:userId', userController.getProfile);

// Get courses the user is enrolled in
router.get('/:userId/enrolledCourses', userController.getEnrolledCourses);

// Enroll in a course
router.post('/:userId/:courseId/enroll', userController.enrollInCourse);

export default router;