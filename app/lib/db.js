const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('connected')
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        })
}

module.exports = connectDb;