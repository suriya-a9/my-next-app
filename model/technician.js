const mongoose = require("mongoose");

const TechnicianSchema = new mongoose.Schema({
    name: String,
    age: Number
}, { timeStamp: true });

const Technician = mongoose.models.Technician || mongoose.model("Technician", TechnicianSchema);
export default Technician;