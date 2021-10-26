import mongoose from "mongoose"
import log from "../Logger";


const MONGODB_URL: string = process.env.MONGO_URL as string;

export default async () => {
    return mongoose.connect(MONGODB_URL).then(() => {
        log.info("Database connected");
    }).catch((error) => {
        log.error("db error", error);
        process.exit(1);
    });
};


