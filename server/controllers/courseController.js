import Course from "../models/Course.js";

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("user", "username");
        res.status(200).json(courses);
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// Get a single course
const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate("user", "username");
        res.status(200).json(course);
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// Create a new course
const createCourse = async (req, res) => {
    const { title, description, estimatedTime, prerequisites, instructor } = req.body;

    try {
        const newCourse = new Course({
            title,
            description,
            estimatedTime,
            prerequisites,
            instructor,
            user: req.user._id
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// Update a course
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to update this course!" });
        }

        await Course.findByIdAndUpdate(req.params.id, req.body);
        res.status(204).json();
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

// Delete a course
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this course!" });
        }

        await Course.findByIdAndDelete(req.params.id);
        res.status(204).json();
    } catch (e) {
        console.error("Error: ", e.message);
        res.status(500).json({ message: "Server Error!" });
    }
};

export { getCourses, getCourse, createCourse, updateCourse, deleteCourse };