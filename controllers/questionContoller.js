// controllers/questionController.js

const Question = require('../models/questions');

// Controller function to get all questions
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to get a single question by ID
exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.json(question);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller function to create a new question
exports.createQuestion = async (req, res) => {
    const question = new Question({
        // Construct the question object from request body
        // Example: title: req.body.title, description: req.body.description
    });

    try {
        const newQuestion = await question.save();
        res.status(201).json(newQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to update a question by ID
exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedQuestion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Controller function to delete a question by ID
exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.json({ message: 'Question deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
