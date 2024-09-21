const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;
mongoose.connect(URI);

const connectDb = async () => {
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connection successful to DB")
    } catch (error) {
        console.error("database connection failed", error);
        process.exit(0);
    }
};

module.exports = connectDb; 