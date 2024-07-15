const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define Flashcard Set Schema
const FlashcardSetSchema = new Schema({
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

const FlashcardSet = mongoose.model('FlashcardSet', FlashcardSetSchema);

// Define Flashcard Schema
const FlashcardSchema = new Schema({
  setId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'FlashcardSet' // Reference to the set document
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

const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

module.exports = { FlashcardSet, Flashcard };
