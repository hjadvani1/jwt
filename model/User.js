const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = new mongoose.Schema({
    first_name: { type: String, default: null },
    last_name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    tokens: { type: String }
})


const User = mongoose.model('user', userSchema)

function validation(User) {
    const schema = {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
    return Joi.validate(User, schema)
}

exports.User = User;
exports.validation = validation
