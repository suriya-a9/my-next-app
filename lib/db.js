const mongoose = require('mongoose');

const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connected')
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })
}

export default connectDb;