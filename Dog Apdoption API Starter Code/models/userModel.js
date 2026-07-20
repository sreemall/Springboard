const mongoose = require ("mongoose");
const bcrypt = require ("bcrypt");

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "please enter a password"]
    },
    createdTs: {
        type: Date,
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

userSchema.pre ("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    const salt = await bcrypt.genSalt ();
    this.password = await bcrypt.hash (this.password, salt);
});

const UserModel = mongoose.model ("users", userSchema);

module.exports = UserModel;