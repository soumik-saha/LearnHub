import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    estimatedTime: {
        type: String,
    },
    prerequisites: {
        type: Array,
    },
    instructor: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    }
})

const Course = mongoose.model('Course', CourseSchema);

export default Course;