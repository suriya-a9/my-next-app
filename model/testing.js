import mongoose from "mongoose";

const TestingSchema = new mongoose.Schema({
    name: String,
    age: Number,
    image: String
}, { timestamps: true });

const Testing = mongoose.models.Testing || mongoose.model("Testing", TestingSchema);
export default Testing;