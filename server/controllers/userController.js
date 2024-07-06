import User from '../models/User.js';
import Course from '../models/Course.js';

// Get user profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        console.log("from getprofile: " + JSON.stringify(req.params));
        // const user = await User.findById(req.user._id).select('-password');
        console.log("from getprofile: " + user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// adding course to the user's enrolled courses
const enrollInCourse = async (req, res) => {
    console.log("from enrollInCourse: body" + JSON.stringify(req.body));
    try {
        const course = await Course.findById(req.params.courseId);
        const user = await User.findById(req.params.userId);
        console.log("from enrollInCourse: " + JSON.stringify(req.params));
        if (course.students.includes(req.params.userId)) {
            return res.status(400).json({ message: "You are already enrolled in this course!" });
        }

        course.students.push(req.params.userId);
        user.enrolledCourses.push(req.params.courseId);
        await course.save();
        await user.save();
        res.status(204).json();
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// Get courses the user is enrolled in
const getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.params.userId;
        const enrolledCourses = await User.findById(userId)
            .select('enrolledCourses')
            .populate('enrolledCourses');
        console.log("from getEnrolledCourses: " + enrolledCourses);
        res.status(200).json(enrolledCourses);
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

export {
    getProfile,
    enrollInCourse,
    getEnrolledCourses
};