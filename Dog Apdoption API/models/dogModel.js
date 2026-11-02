const mongoose = require ("mongoose");

const dogSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "Please enter dog name"]
    },
    description: {
        type: String,
        required: [true, "Please enter description"]
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Only Authenticated users can register Dogs for adoption"]
    },
    adoptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    thankYouMessage: {
        type: String,
        maxlength: 500
    },
    isAdopted: {
        type: Boolean,
        default: false
    }

});

const DogModel = mongoose.model ("dogs", dogSchema);

module.exports = DogModel;

