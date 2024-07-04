const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String,

    },
    password: {
        required: true,
        type: String,
    },
});

personSchema.pre('save', async function(next) {
    const person = this;

    //Hash the password only if it is modified or new
    if(!person.isModified('password')) return next();

    try {
        //hash salt
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        //Overwrite the plain password with hashed one
        person.password = hashedPassword;

        next();
    } catch (err) {
        next(err);
    }
})

personSchema.methods.comparedPassword = async function(candidatePassword){
    try {
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;