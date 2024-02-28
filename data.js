const data = [ 
   { 
      date: "2024-02-28",
      subject: "Mathematics",
      examType: "Final Exam",
      startTime: "09:00",
      endTime: "11:00",
      questionid:"abc123",
      
    questions: [
      {
        type: "text",
        question: "What is the capital of France?"
      },
      {
        type: "mcq",
        question: "Which of the following is a prime number?",
        options: ["10", "11", "12", "13"]
      },
      {
        type: "mcq",
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Ernest Hemingway", "Mark Twain", "Charles Dickens"]
      }
]
   }
]

module.exports = data;
