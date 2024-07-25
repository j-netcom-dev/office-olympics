const mongoose =require('mongoose');

const schema =mongoose.Schema({

    name: { type: String, required: true },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
      }],

    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player',
        default: null
    },
}, { versionKey: false })

const Competition =mongoose.model('competition', schema);

module.exports =Competition;