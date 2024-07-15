const express = require('express');
const router = express.Router();
const {Quiz_Class , Quiz_stage , Quiz} = require('../models/quiz.model')


// Route to create a new flashcard set ==================================================================
router.post('/class', async (req, res) => {
  try {
    const quizclass = new Quiz_Class({
      ClassName: req.body.ClassName,
      Name: req.body.Name
    });

    const savedClass = await quizclass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    console.error('Error creating flashcard set:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

router.get('/class', async (req, res) => {
  try {
    const quizClass = await Quiz_Class.find();
    res.status(200).json(quizClass);
  } catch (error) {
    console.error('Error getting flashcard sets:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});
// Route to get all flashcard sets ==================================================================

// Route to create a new flashcard set
router.post('/class/:classId/stage', async (req, res) => {
  try {
    const quizset = new Quiz_stage({
      classId: req.body.classId,
      stageName: req.body.stageName
    });

    const savedSet = await quizset.save();
    res.status(201).json(savedSet);
  } catch (error) {
    console.error('Error creating flashcard set:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

// Route to get all flashcard sets
router.get('/class/:classId/stage', async (req, res) => {
  try {
    const quizStages = await Quiz_stage.find({ classId: req.params.classId });
    res.status(200).json(quizStages);
  } catch (error) {
    console.error('Error getting flashcard sets:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

//=====================================================================================
router.put('/class/:classId/stage/:stageId/play', async (req, res) => {
  const { classId, stageId } = req.params;
  
  try {
    const updatedStage = await Quiz_stage.findOneAndUpdate(
      { _id: stageId, classId: classId },
      { $inc: { Played: 1 } },
      { new: true }
    );

    if (!updatedStage) {
      return res.status(404).json({ error: 'Stage not found or not authorized' });
    }

    res.json(updatedStage);
  } catch (error) {
    console.error('Error updating stage:', error);
    res.status(500).json({ error: error.message });
  }
});
//=====================================================================================

router.put('/class/:classId/stage/:stageId', async (req, res) => {
  const { classId, stageId } = req.params;
  
  try {
    // Find the stage by ID and update it
    const updatedStage = await Quiz_Stage.findOneAndUpdate(
      { _id: stageId, classId: classId }, // Find by stage ID and class ID
      { $set: req.body }, // Update with the request body
      { new: true } // Return the updated document
    );

    if (!updatedStage) {
      return res.status(404).json({ error: 'Stage not found or not authorized' });
    }

    res.json(updatedStage); // Respond with the updated stage
  } catch (error) {
    console.error('Error updating stage:', error);
    res.status(500).json({ error: error.message });
  }
});



// Route to create a new flashcard in a set
router.post('/class/:classId/stage/:stageId/quiz', async (req, res) => {
  try {
    console.log('Creating quiz with data:', {
      stageId: req.params.stageId,
      question: req.body.question,
      choices: req.body.choices
    }); // Log the request data

    const quiz = new Quiz({
      stageId: req.params.stageId,
      question: req.body.question,
      choices: req.body.choices
    });

    const savedquiz = await quiz.save();
    res.status(201).json(savedquiz);
  } catch (error) {
    console.error('Error adding quiz:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

// Route to get all flashcards in a set
router.get('/class/:classId/stage/:stageId/quiz', async (req, res) => {
  try {
    const quizzes = await Quiz.find({ stageId: req.params.stageId });
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error getting quizs:', error); // Enhanced logging
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
