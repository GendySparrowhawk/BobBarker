// global variables//
var startBtn = document.getElementById('start');
var quizWindow = document.querySelector('.window');
var timer = document.getElementById('timer');
var timeLeft = 61;
var answers = document.querySelectorAll('#answers');
var questionEl = document.querySelector("#question");
var score = 0;



// question arrarys//
var quizQuestions = [
    {
        question: "In which year did Gallagher's brother begin performing as Gallagher Too?",
        answers: [
            { text: "1984", correct: false },
            { text: "1986", correct: false },
            { text: "1991", correct: true },
            { text: "1965", correct: false },
        ]
    },
    {
        question: "What is the name of the spirit that Anthony William claims gave him the idea for celer juice?",
        answers: [
            { text: "Spirit", correct: true },
            { text: "Pazoozoo", correct: false },
            { text: "Nergle", correct: false },
            { text: "Dorf", correct: false },
        ]

    },
    {
        question: "In which year did Gallagher's brother begin performing as Gallagher Too?",
        answers: [
            { text: "1984", correct: false },
            { text: "1986", correct: false },
            { text: "1991", correct: true },
            { text: "1965", correct: false },
        ]
    }
]
let currentQuestionIndex = 0;

// start quiz button//
function startQuiz() {
    quizWindow.classList.remove('hide');
    timer.classList.remove('hide');
    startBtn.classList.add('hide');
    showQuestion();
    countDown();
}

// start count down. stop count down//
function countDown() {
    var stopTimer = setInterval(function () {
        timeLeft = timeLeft - 1
        timer.innerText = "time Remaining: " + timeLeft;
        console.log(timeLeft);
        if (timeLeft === 0) { clearInterval(stopTimer) }
    }, 1000)
}

// display question//
function showQuestion() {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionEl.innerText = questionNo + '. ' + currentQuestion.question;
    quizQuestions.answers.forEach(answer => {
        var btn = document.createElement('button');
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        
    }
        
    });
}


// currentQuestion.answers.forEach(answer => {
//     var button = document

startBtn.addEventListener('click', startQuiz);

// set wuesstions and next questions?//
