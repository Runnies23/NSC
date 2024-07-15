const express = require('express');
const router = express.Router();
const { FlashcardSet_offcial, Flashcard_offcial } = require('../models/Flashcard_official.model');

// Route to create a new flashcard set
router.post('/sets', async (req, res) => {
  try {
    const { setName } = req.body;

    if (!setName) {
      return res.status(400).json({ error: 'setName is required' });
    }

    const flashcardSet = new FlashcardSet_offcial({
      setName
    });

    const savedSet = await flashcardSet.save();
    res.status(201).json(savedSet);
  } catch (error) {
    console.error('Error creating flashcard set:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all flashcard sets
router.get('/sets', async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet_offcial.find();
    res.status(200).json(flashcardSets);
  } catch (error) {
    console.error('Error getting flashcard sets:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to create a new flashcard in a set
router.post('/sets/:setId/flashcards', async (req, res) => {
  try {
    const { setId } = req.params;
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'question and answer are required' });
    }

    const flashcard = new Flashcard_offcial({
      setId,
      question,
      answer
    });

    const savedFlashcard = await flashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (error) {
    console.error('Error adding flashcard:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get all flashcards in a set
router.get('/sets/:setId/flashcards', async (req, res) => {
  try {
    const { setId } = req.params;
    const flashcards = await Flashcard_offcial.find({ setId });
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error getting flashcards:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

//=================================================================================
router.put('/sets/:setId/play', async (req, res) => {
  const { setId } = req.params;
  
  try {
    // Find the flashcard set by ID and update Played by incrementing by 1
    const updatedSet = await FlashcardSet_offcial.findByIdAndUpdate(
      setId,
      { $inc: { Played: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedSet) {
      return res.status(404).json({ error: 'Flashcard set not found' });
    }

    res.json(updatedSet); // Respond with the updated flashcard set
  } catch (error) {
    console.error('Error updating flashcard set:', error);
    res.status(500).json({ error: error.message });
  }
});
//=================================================================================

module.exports = router;
