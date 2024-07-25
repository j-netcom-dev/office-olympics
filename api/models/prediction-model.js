const mongoose =require('mongoose');

const schema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    competition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'competition',
      required: true
    },
    predictedWinner: {
      type: mongoose.MongooseSchema.Types.ObjectId,
      ref: 'player',
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }, { versionKey: false });
  
  const Prediction = mongoose.model('rrediction', schema);
  module.exports =Prediction;
  