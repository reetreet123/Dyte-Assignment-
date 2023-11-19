const mongoose = require("mongoose");
const connectToMongoose = () => {
  mongoose
    .connect(process.env.mongoConnUri)
    .then(() => console.log("Connected to Mongo Database"))
    .catch((e) => console.log(`Error: ${e}`));
};

module.exports = { connectToMongoose };
