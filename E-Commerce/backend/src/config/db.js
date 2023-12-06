import mongoose from "mongoose";

mongoose
    .connect(process.env.DB_CONNECTION)
    .then(() => console.log('MongoDB Connected'))
    .catch((error) => console.log(error.message));