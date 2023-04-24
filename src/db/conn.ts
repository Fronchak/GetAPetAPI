import mongoose from "mongoose";

export async function connect() {
    await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/teste');
}

export default mongoose;