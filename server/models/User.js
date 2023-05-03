const mongoose = require('mongoose');
const bcrypt = require('bcyrpt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.checkPassword = async function (password) {
    const user = this;
    return await bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('User', userSchema);