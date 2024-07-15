const express = require('express');
const router = express.Router();
const { FlashcardSet, Flashcard } = require('../models/Flashcard.model');

// Route to create a new flashcard set
router.post('/sets', async (req, res) => {
  try {
    const flashcardSet = new FlashcardSet({
      setName: req.body.setName
    });

    const savedSet = await flashcardSet.save();
    res.status(201).json(savedSet);
  } catch (error) {
    console.error('Error creating flashcard set:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

// Route to get all flashcard sets
router.get('/sets', async (req, res) => {
  try {
    const flashcardSets = await FlashcardSet.find();
    res.status(200).json(flashcardSets);
  } catch (error) {
    console.error('Error getting flashcard sets:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});


// Route to create a new flashcard in a set
router.post('/sets/:setId/flashcards', async (req, res) => {
  try {
    console.log('Creating flashcard with data:', {
      setId: req.params.setId,
      question: req.body.question,
      answer: req.body.answer
    }); // Log the request data

    const flashcard = new Flashcard({
      setId: req.params.setId,
      question: req.body.question,
      answer: req.body.answer
    });

    const savedFlashcard = await flashcard.save();
    res.status(201).json(savedFlashcard);
  } catch (error) {
    console.error('Error adding flashcard:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

// Route to get all flashcards in a set
router.get('/sets/:setId/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ setId: req.params.setId });
    res.status(200).json(flashcards);
  } catch (error) {
    console.error('Error getting flashcards:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

//=================================================================================
router.put('/sets/:setId/play', async (req, res) => {
  const { setId } = req.params;
  
  try {
    // Find the flashcard set by ID and update Played by incrementing by 1
    const updatedSet = await FlashcardSet.findByIdAndUpdate(
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
