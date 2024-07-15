const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define Flashcard Set Schema
const FlashcardSetSchema_offcial = new Schema({
  setName: {
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

const FlashcardSet_offcial = mongoose.model('FlashcardSet_offcial', FlashcardSetSchema_offcial);

// Define Flashcard Schema
const FlashcardSchema_official = new Schema({
  setId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'FlashcardSet_offcial' // Reference to the set document
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  }
  // Add other fields if needed
});

const Flashcard_offcial = mongoose.model('Flashcard_official', FlashcardSchema_official);

module.exports = { FlashcardSet_offcial, Flashcard_offcial };
