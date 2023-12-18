const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    randomOtp: {
        type: String,
    },
    merchant: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        default: "member",
        enum: ["admin", "member", "merchant"],
    },
    updated: {
        type: Date,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    facebookId: {
        type: String,
    },
    linkedinId: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);
