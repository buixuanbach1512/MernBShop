const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        googleId: {
            type: String,
        },
        mobile: {
            type: String,
        },
        password: {
            type: String,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'user',
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role',
        },
        cart: {
            type: Array,
            default: [],
        },
        address: {
            type: String,
            default: '',
        },
        wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
    },
    {
        timestamps: true,
    },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    // Hash Password
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare Password method
userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create Password Reset Token method
userSchema.methods.createPasswordResetToken = async function () {
    const resettoken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resettoken).digest('hex');
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    return resettoken;
};

//Export the model
module.exports = mongoose.model('User', userSchema);
