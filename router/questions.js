const express = require('express');
const mongoose=require('mongoose')
const {ObjectiveQuestion,SubjectiveQuestion}=require('../models/questions');
const router = express.Router();
// Route to get all objective questions

// Route to get all subjective questions
router.get('/subjective', async (req, res) => {
    try {
        const subjectiveQuestions = await SubjectiveQuestion.find();
        console.log(subjectiveQuestions);
        res.render('questions',{subjectiveQuestions});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/objective',async(req,res)=>{
    try {
        const objectiveQuestions = await ObjectiveQuestion.find();
        res.render('showobjectivequestions',{objectiveQuestions});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

//route to upload an objective question
router.get('/create/objective',(req,res)=>{
    res.render('objectivequestions');
})


//route to save the uploaded objective question
router.post('/create/objective', async (req, res) => {
    try {
        const {classname, examType, duration, questionHeading, options } = req.body;

        
        if (!Array.isArray(questionHeading) || !Array.isArray(options)) {
            return res.status(400).json({ error: 'Question heading and options must be provided as arrays' });
        }

    
        const questions = [];
        for (let i = 0; i < questionHeading.length; i++) {
            questions.push({
                questionHeading: questionHeading[i],
                options: options[i]
            });
        }

        const objectiveQuestion = new ObjectiveQuestion({
            classname,
            examType,
            duration,
            questions
        });

        await objectiveQuestion.save();
        res.status(201).json(objectiveQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});




//route to upload subjective question
router.get('/create/subjective',(req,res)=>{
    res.render('subjectivequestions');
})


// Route to save the uploaded subjective question
router.post('/create/subjective', async (req, res) => {
    try {
        const {classname, examType, duration, questionHeading} = req.body;

        
        if (!Array.isArray(questionHeading)) {
            return res.status(400).json({ error: 'Question heading must be provided as arrays' });
        }

    
        const questions = [];
        for (let i = 0; i < questionHeading.length; i++) {
            questions.push({
                questionHeading: questionHeading[i],
            });
        }

        const subjectiveQuestion = new SubjectiveQuestion({
            classname,
            examType,
            duration,
            questions
        });

        await subjectiveQuestion.save();
        res.status(201).json(subjectiveQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;