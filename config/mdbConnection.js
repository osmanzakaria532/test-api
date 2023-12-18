const mongoose = require("mongoose");

function mdbConnection() {
  mongoose
    .connect(
      "mongodb+srv://osmanzakaria801:osmanzakaria801@cluster0.hvut7cx.mongodb.net/ecommercedata?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected!"));
}

module.exports = mdbConnection;
