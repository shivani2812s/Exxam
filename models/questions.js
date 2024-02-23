const mongoose = require('mongoose');

const subjectiveQuestionSchema = new mongoose.Schema({
    classname: String,
    examType: String,
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

const classSchema = new mongoose.Schema({
    className: String,
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
   
});


const examSchema = new mongoose.Schema({
    examName: String,
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    type: { type: String, enum: ['objective', 'subjective'] },
    startTime: Date,
    endTime: Date,
  
});

const ObjectiveQuestion = mongoose.model('ObjectiveQuestion', objectiveQuestionSchema);
const SubjectiveQuestion = mongoose.model('SubjectiveQuestion', subjectiveQuestionSchema);
const Class = mongoose.model('Class', classSchema);
const Exam = mongoose.model('Exam', examSchema);

module.exports = { ObjectiveQuestion, SubjectiveQuestion,Class,Exam };
