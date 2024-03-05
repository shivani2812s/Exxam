const mongoose=require('mongoose');

const resultSchema = new mongoose.Schema({
   examId:{type: mongoose.Schema.Types.ObjectId, ref:'Exam'},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    result: Number,
    
});
module.exports=mongoose.model('result',resultSchema);