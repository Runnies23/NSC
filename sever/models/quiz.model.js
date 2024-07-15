const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Quiz_Class_schema = new Schema({
  ClassName: {
    type: String,
    required: true,
    trim: true
  },
  Name : {
    type: String,
    required: true,
    trim: true
  },
});

const Quiz_Class = mongoose.model('Quiz_Class', Quiz_Class_schema);

const Quiz_Stage_schema = new Schema({
  classId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz_Class' 
  },
  stageName: {
    type: String,
    required: true,
    trim: true
  },
  Played: {
    type: Number,
    required: true,
    default: 0,
  }
});


const Quiz_stage = mongoose.model('Quiz_stage', Quiz_Stage_schema);

// Define Flashcard Schema
const Quiz_schema = new Schema({
  stageId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Quiz_Stage' // Reference to the stage document
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  choices: [{
    text: {
      type: String,
      required: true,
      trim: true
    },
    isCorrect: {
      type: Boolean,
      required: true,
      default: false
    }
  }]
  // Add other fields if needed
});

const Quiz = mongoose.model('Quiz', Quiz_schema);

module.exports = {Quiz_Class , Quiz_stage, Quiz };
