const mongoose = require("mongoose");

async function connectTODb() {
    await mongoose.connect(process.env.MONGO_URL)

    console.log("CONNTED TO DB")
}




module.exports = connectTODb