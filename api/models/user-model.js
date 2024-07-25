const mongoose =require('mongoose');

const schema =mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true }
}, {versionKey: false})

const User =mongoose.model('user', schema);

module.exports =User;