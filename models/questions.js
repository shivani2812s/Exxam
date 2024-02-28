const mongoose = require('mongoose');
 
const subjectiveQuestionSchema = new mongoose.Schema({
    classname: String,
    examType: [String], // Allow an array of strings
    duration: Number,
    questions: [{
        questionHeading: String,
    }]
});
 
const objectiveQuestionSchema = new mongoose.Schema({
    classname: String,
    examType: String,
    duration: Number,
    questions: [{
        questionHeading: String,
        options: [String]
    }]
});
 
const questionSchema = new mongoose.Schema({
    questionType: String,
    question: String,
    options: [String]
});
 
const classSchema = new mongoose.Schema({
    className: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
   
});
 
const examSchema = new mongoose.Schema({
    dateOfExam: String,
    subject: String,
    questions: [{type: mongoose.Schema.Types.ObjectId, ref:'Question'}],
    type: { type: String, enum: ['objective', 'subjective'] },
    startTime: String,
    endTime: String,
});
 
const ObjectiveQuestion = mongoose.model('ObjectiveQuestion', objectiveQuestionSchema);
const SubjectiveQuestion = mongoose.model('SubjectiveQuestion', subjectiveQuestionSchema);
const Question = mongoose.model('Question', questionSchema);
const Class = mongoose.model('Class', classSchema);
const Exam = mongoose.model('Exam', examSchema);
 
module.exports = { ObjectiveQuestion, SubjectiveQuestion,Class,Exam ,Question};

