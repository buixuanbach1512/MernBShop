const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var permissionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Permission', permissionSchema);
