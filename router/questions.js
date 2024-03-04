const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const {Question,Exam}=require('../models/questions');

router.get('/create/exam',(req,res)=>{
    res.render('createexam');
})


router.get('/view/questions', async (req, res) => {
    try {
        const Questions = await Question.find();
        res.render('questiondemo',{Questions});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/process_image', async (req, res) => {
    const imageFile = req.files['image'];
    if (imageFile) {
        const imageBuffer = fs.readFileSync(imageFile.path);
        try {
            const text = await kraken.rpred(imageBuffer);
            res.json({ text });
        } catch (error) {
            console.error('Error processing image:', error);
            res.status(500).json({ error: 'Error processing image' });
        }
    } else {
        res.status(400).json({ error: 'No image provided' });
    }
});


router.post('/create/exam',async(req,res)=>{
    try {
        const { dateOfExam, subject, questions, type,className, startTime, endTime,totalmarks} = req.body;

        console.log(req.body);

        const questionIds = [];

        for (const question of questions) {
            const newQuestion = new Question(question);
            await newQuestion.save();
            questionIds.push(newQuestion._id);
        }
        const newExam = new Exam({
            dateOfExam,
            subject,
            questions: questionIds,
            type,
            className,
            startTime,
            endTime,
            totalmarks
        });
 
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/view/exam', async (req, res) => {
    try {
        const exams = await Exam.find();
        res.render('allexam', { exams });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/view/questions/:examId', async (req, res) => {
    try {
        const examId = req.params.examId;
        const exam = await Exam.findById(examId);

        if (!exam) {
            return res.status(404).send('Exam not found');
        }
        const questions = await Question.find({ _id: { $in: exam.questions } });

        res.render('questionpaper', { exam, Questions: questions });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/result',(req,res)=>{
    res.render('result');
})

router.post('/submitanswers',async(req,res)=>{
    try {
        const submittedAnswers = req.body.answers;
        let totalMarks = 0;
        for (const submittedAnswer of submittedAnswers) {
            const submittedQuestionId = submittedAnswer.questionId;
            const submittedUserAnswer = submittedAnswer.answer;
            const question = await Question.findOne({ _id: submittedQuestionId });
            if (!question) {
                return res.status(404).json({ error: `Question with ID ${submittedQuestionId} not found` });
            }
            if (question.questionType === 'mcq') {
                const correctAnswer = question.answer;
                if (submittedUserAnswer === correctAnswer) {
                    totalMarks += question.marks;
                }
            } else {
                totalMarks+=question.marks;
                console.log(totalMarks+1);
            }
        }
       
        const redirectUrl = '/questions/result?totalMarks=' + totalMarks;
        return res.status(200).json({ redirectUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;
