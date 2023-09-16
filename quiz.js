// global variables//
var startBtn = document.querySelector('#start');
var nextButton = document.querySelector('.next');
var quizWindow = document.querySelector('.window');
var timer = document.querySelector('#timer');
var timeLeft = 61;
var answerButtonsEl = document.querySelectorAll('#options');
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
        question: "What is the name of the spirit that Anthony William claims gave him the idea for celery juice?",
        answers: [
            { text: "Spirit", correct: true },
            { text: "Pazoozoo", correct: false },
            { text: "Nergle", correct: false },
            { text: "Dorf", correct: false },
        ]

    },
    {
        question: "How many people have died in the Chicken-Sandwich Wars?",
        answers: [
            { text: "4 deaths", correct: false },
            { text: "1 death 12+ injured", correct: true },
            { text: "5 deaths", correct: false },
            { text: "0 deaths, 70+ injured", correct: false },
        ]
    },
    {
        question: "What was the 1910 so called Hippo Bill?",
        answers: [
            { text: "A law forbidding hippo poaching ", correct: false },
            { text: "Outlawed all hippos from being transported across state lines", correct: false },
            { text: "Authorized the import of hippos to eat invasive plants and slaughtered for meat", correct: true },
            { text: "Subsidized farmers who used hippo \"fertilizer\"", correct: false },
        ]
    },
    {
        question: "What was the 1910 so called Hippo Bill?",
        answers: [
            { text: "A law forbidding hippo poaching ", correct: false },
            { text: "Outlawed all hippos from being transported across state lines", correct: false },
            { text: "Authorized the import of hippos to eat invasive plants and slaughtered for meat", correct: true },
            { text: "Subsidized farmers who used hippo \"fertilizer\"", correct: false },
        ]
    }

]
var currentQuestionIndex = 0;

// start quiz button//
function startQuiz() {
    var score = 0;
    var currentQuestionIndex = 0;
    quizWindow.classList.remove('hide');
    timer.classList.remove('hide');
    startBtn.classList.add('hide');
    showQuestion();
    countDown();
}

// start count down. stop count down//
function countDown() {
    var stopTimer = setInterval(function () {
        timeLeft = timeLeft - 1;
        timer.innerText = "Time Remaining: " + timeLeft;
        console.log(timeLeft);
        if (timeLeft === 0) { clearInterval(stopTimer) }
    }, 1000)
}
// 1st question when quiz begins//
function showQuestion() {
    resetState();
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionEl.innerText = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('punch');
        answerButtonsEl.append(button);
    });
}

function nextQuestion(question) {
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionEl.innerText = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = currentQuestion.answers.text;
        button.classList.add('punch');
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    })
}
// restes the q&A after every question//
function resetState() {
    while (answerButtonsEl.firstchild) {
        answerButtonsEl.removeChild
            (answerButtonsEl.firstchild);
    }
}

function selectAnswer(eventObj) {
    var selectedButton = eventObj.target;
    var correct = selectedButton.dataset.correct === "ture";
    nextButton.classList.remove('hide');
    if (correct) {
        selectedButton.classList.add("correct");
        score + 10;
    }
    else {
        selectedButton.classList.add("wrong");
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

function showScore() {
    resetState();
    questionEl.innerHTML = `your score ${score} out of ${quizQuestions.length}!`;
}

function handlenNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < quizQuestions.length) {
        nextQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length) {
        handlenNextButton();
    }
    else {
        startQuiz();
    }
})
startBtn.addEventListener('click', startQuiz);





