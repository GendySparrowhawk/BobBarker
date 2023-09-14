// global variables//
var startBtn = document.getElementById('start');
var quizWindow = document.querySelector('.window');
var timer = document.getElementById('timer');
var timeLeft = 61;
var btnWrapper = document.querySelectorAll('.punch');

// start quiz button//
function startQuiz() {
    quizWindow.classList.remove('hide');
    timer.classList.remove('hide');
    startBtn.classList.add('hide');
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

startBtn.addEventListener('click', startQuiz);

