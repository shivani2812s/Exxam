const express = require('express');
const mongoose=require('mongoose')
const router = express.Router();
const {Question,Exam}=require('../models/questions');

router.get('/demo',(req,res)=>{
    res.render('demo');
})

router.get('/view/questions', async (req, res) => {
    try {
        const Questions = await Question.find();
        res.render('questions',{Questions});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.get('/objective',async(req,res)=>{
//     try {
//         const objectiveQuestions = await ObjectiveQuestion.find();
//         res.render('showobjectivequestions',{objectiveQuestions});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// })

//route to upload an objective question
// router.get('/create/objective',async(req,res)=>{
//     const examdetails=await Exam.find();
//     res.render('objectivequestions',{examdetails});
// })


//route to save the uploaded objective question
// router.post('/create/objective', async (req, res) => {
//     try {
//         const {classname, examType, duration, questionHeading, options } = req.body;

        
//         if (!Array.isArray(questionHeading) || !Array.isArray(options)) {
//             return res.status(400).json({ error: 'Question heading and options must be provided as arrays' });
//         }

    
//         const questions = [];
//         for (let i = 0; i < questionHeading.length; i++) {
//             questions.push({
//                 questionHeading: questionHeading[i],
//                 options: options[i]
//             });
//         }

//         const objectiveQuestion = new ObjectiveQuestion({
//             classname,
//             examType,
//             duration,
//             questions
//         });

//         await objectiveQuestion.save();
//         res.status(201).json(objectiveQuestion);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });




//route to upload subjective question
// router.get('/create/subjective',(req,res)=>{
//     res.render('subjectivequestions');
// })


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


// Route to save the uploaded subjective question
// router.post('/create/subjective', async (req, res) => {
//     try {
//         const {classname, examType, duration, questionHeading} = req.body;

        
//         if (!Array.isArray(questionHeading)) {
//             return res.status(400).json({ error: 'Question heading must be provided as arrays' });
//         }

    
//         const questions = [];
//         for (let i = 0; i < questionHeading.length; i++) {
//             questions.push({
//                 questionHeading: questionHeading[i],
//             });
//         }

//         const subjectiveQuestion = new SubjectiveQuestion({
//             classname,
//             examType,
//             duration,
//             questions
//         });

//         await subjectiveQuestion.save();
//         res.status(201).json(subjectiveQuestion);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// });


router.post('/create/exam',async(req,res)=>{
    try {
        const { dateOfExam, subject, questions, type, startTime, endTime } = req.body;
 
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
            startTime,
            endTime,
        });
 
        await newExam.save();
        res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/view/exam',(req,res)=>{
    res.render('demoanswer');
})

router.get('/view-questions/:id',async(req,res)=>{
        const examID=req.params.id;
        const examdetails=await Exam.findById({_id:examID});
        res.render('reset');
})
module.exports = router;
