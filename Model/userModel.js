const mongoose = require('mongoose');
const bcrypt = require('bcrypt')


const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    }
},{
    Timestamp: true
});

userSchema.pre('save', async function (next){
    if (!this.isModified("password")) {
        next();
      }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const user = mongoose.model('user', userSchema);

module.exports = user;