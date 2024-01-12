const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            uppercase: true,
        },
        permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
    },
    {
        timestamps: true,
    },
);

//Export the model
module.exports = mongoose.model('Role', roleSchema);
