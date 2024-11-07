import mongoose, { Mongoose } from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("MongoDB connected...");
    } catch (error) {
        if(error instanceof Error){
            console.error("Error connecting to MongoDB:", error.message);
            process.exit(1);
        }
    }
}

export default connectDB;