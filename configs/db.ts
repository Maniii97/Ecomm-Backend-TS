import mongoose from "mongoose";
import { config } from "dotenv";

config();

const dbUrl = process.env.DB_URL as string;

export const connectDB = async () => {
    mongoose.set('strictQuery', true)       //adds strict query which means if we try to query a field that is not in the schema, it will throw an error
    await mongoose.connect(dbUrl)
}


