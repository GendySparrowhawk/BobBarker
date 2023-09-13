var startBtn = document.getElementById('start');

var quizWindow = document.querySelector('.window');
var timer = document.getElementById('timer');
var timeLeft 
function startQuiz() {
    quizWindow.classList.remove('hide');
    startBtn.classList.add('hide');
    timeLeft = 61;
    countDown();
}

function countDown () {
   var stopTimer = setInterval(function () {
timeLeft = timeLeft - 1
timer.innerText = "time Remaining: " + timeLeft;
console.log(timeLeft);
if (timeLeft === 0) {clearInterval(stopTimer)}
    }, 1000)
}


startBtn.addEventListener('click', startQuiz);

