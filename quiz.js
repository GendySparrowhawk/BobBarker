// global variables//
var startBtn = document.querySelector('#start');
var header = document.querySelector('#subheadder')
var nextButton = document.querySelector('.next');
var quizWindow = document.querySelector('.window');
var timer = document.querySelector('#timer');
var timeLeft = 100;
var answerButtonsEl = document.getElementById('options');
var questionEl = document.querySelector("#question");
var score = 0;
var stopTimer = '';
var currentQuestionIndex = 0;
var clearScore = document.querySelector("#clear-score");
// highscore variables//
var scoreForm = document.querySelector('.score-form');
var pastScores = document.querySelector('#highscores')
var submitScore = document.querySelector('#submit');

// start quiz button//
function startQuiz() {
    quizWindow.classList.remove('hide');
    timer.classList.remove('hide');
    startBtn.classList.add('hide');
    header.classList.add('hide');
    countDown();
    showQuestion();
}

// start count down. stop count down//
function countDown() {
    stopTimer = setInterval(function () {
        timeLeft = timeLeft - 1;
        timer.innerText = "Time Remaining: " + timeLeft;
        console.log(timeLeft);
        if (timeLeft === 0) {
            clearInterval(stopTimer);
            showScore();
        }
    }, 1000)
}
// 1st question when quiz begins/next question//
function showQuestion() {
    resetState();
    var currentQuestion = quizQuestions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionEl.innerText = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('punch');
        answerButtonsEl.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


// restes the q&A after every question//
function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}
// what happens when you click an answer checks for right or wrong//
function selectAnswer(eventObj) {
    var selectedButton = eventObj.target;
    var correct = selectedButton.dataset.correct === "true";
    nextButton.classList.remove('hide');
    if (correct) {
        selectedButton.classList.add("correct");
        score = score + 10;
    }
    else {
        selectedButton.classList.add("wrong");
        timeLeft = timeLeft - 5;
    }
    Array.from(answerButtonsEl.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
}

// next funciton that lets the quiz conintue or end//
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    }
    else {
        clearInterval(stopTimer);
        showScore();
    }
}
// ending page with past scores and your score to be entered
function showScore() {
    resetState();
    questionEl.innerHTML = `your score ${score} out of 100!`;
    nextButton.classList.add('hide')
    scoreForm.classList.remove('hide');
    var finalScore = document.querySelector('#score');
    finalScore.innerText = score;
    if (localStorage.getItem('Highscores')) {
        highscores = JSON.parse(localStorage.getItem('Highscores'))
        pastScores.textContent = '';

        for (i = 0; i <= highscores.length; i++) {
            var li = document.createElement('li')

            li.textContent = highscores[i].name + ' - ' + highscores[i].score;
            pastScores.appendChild(li);

        }
    }
}
var highscores = [];

// submit your scores to local data//
function logScore(eventObj) {
    eventObj.preventDefault();
    var highscore = {
        name: document.getElementById('name').value,
        score: document.getElementById('score').textContent
    }
    highscores.push(highscore);
    localStorage.setItem('Highscores', JSON.stringify(highscores));
    showScore();
}
// This funciton empties the local storage and resatrts the game.
function emptyCache() {
    localStorage.clear();
    showScore();
}

// event listners//
submitScore.addEventListener('click', logScore);

clearScore.addEventListener('click', emptyCache);

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < quizQuestions.length) {
        handleNextButton();
    }
})

startBtn.addEventListener('click', startQuiz);

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
            { text: "A law forbidding hippo poaching", correct: false },
            { text: "Outlawed all hippos from being transported across state lines", correct: false },
            { text: "Authorized the import of hippos to eat invasive plants and slaughtered for meat", correct: true },
            { text: "Subsidized farmers who used hippo \"fertilizer\"", correct: false },
        ]
    },
    {
        question: "All of these things happen in the Spice World Movie EXCEPT:",
        answers: [
            { text: "Singer/song writter Meatloaf is the girls buss driver", correct: false },
            { text: "Aliens land and try and kiss the Spice Girls", correct: false },
            { text: "The girls deliver a baby", correct: false },
            { text: "Scary Spice dies for 30 seconds in the climax of the movie", correct: true },
        ]
    },
    {
        question: "The Naked Chicken Chalupa was available from _______",
        answers: [
            { text: "May 2011 - June 2011", correct: false },
            { text: "Only May 5th 2002", correct: false },
            { text: "two non-conseutive years: 2017 and then again in 2021", correct: true },
            { text: "2023- right now!", correct: false },
        ]
    },
    {
        question: "The smash hit Space Jam saw the debut of which Loony Tunes character?",
        answers: [
            { text: "Tweety Bird 2", correct: false },
            { text: "Lola Bunny", correct: true },
            { text: "Foghorn Leghorn", correct: false },
            { text: "Sam the Eagle", correct: false },
        ]
    },
    {
        question: "Frank Herbert, author of Dune, did all of the following to wait staff EXCEPT",
        answers: [
            { text: "Parked a hearse out front to receive faster service", correct: false },
            { text: "Throw money at wait staff instead of waiting for the check", correct: false },
            { text: "Go into the kitchen and start cooking food he brought from home", correct: true },
            { text: "Demanded tables around his be cleared of poeple so he could eat in peace", correct: false },
        ]
    },
 
    {
        question: "Ursula K leGuin saw, and heckled Star Wars with which other sci-fi author on opening weekend?",
        answers: [
            { text: "George R.R. Martin", correct: false },
            { text: "Robert Heinlein", correct: false },
            { text: "Phillip K Dick", correct: false },
            { text: "Kim Stanley Robinson", correct: true },
        ]
    },
    {
        question: "In which year did Gallagher's sue his brother for performing as Gallagher Too?",
        answers: [
            { text: "2010", correct: true },
            { text: "1993", correct: false },
            { text: "1984", correct: false },
            { text: "2022", correct: false },
        ]
    },
]