import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected Successfully');
        })
    } catch (error) {
        console.log('error', (err: string) => {
            console.log('MongoDB connection error' + err);
            process.exit();
        })
    }
}