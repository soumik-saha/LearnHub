import { mongoose } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => console.log('Database connected successfully!'));
    } catch (e) {
        console.error('Error: ', e.message);
        process.exit(1);
    }
}

export default connectDB;