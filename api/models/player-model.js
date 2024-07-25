const mongoose =require('mongoose');

const schema =mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    nationality: { type: String, required: true },
    image: { type: String, required: true },
}, { versionKey: false });

const Player =mongoose.model('player', schema);

module.exports =Player;