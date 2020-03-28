function startquiz() {

  var btn = document.getElementById("startbtn");
  btn.style.display = "none";

  var landpg = document.getElementById("startpg");
  landpg.style.display = "none";


  var quiz = document.getElementById("quizboard");
  quiz.style.display = "block";
  writeButton()
  timer()
}

var timeInterval
var questionPostion = 0
var timeLeft = questions.length * 15
var domTime = document.getElementById('timer')

function writeButton() {
  document.getElementById('actualQuestion').textContent = questions[questionPostion].title
  for (let i = 0; i < 4; i++) {
    var currentButton = document.getElementById('btn' + i)
    currentButton.textContent = questions[questionPostion].choices[i]
    currentButton.onclick = function () { clicked(questions[questionPostion].choices[i]) }
  }
}

function clicked(answer) {
  console.log(answer)
  if (answer === questions[questionPostion].answer) {
    console.log('correct')
    
  }
  //but if it is a wrong answer 10 seconds will be taken of the timer for the final score
  else {
    console.log('wrong')
    timeLeft = timeLeft - 10;
  }
  
  questionPostion++
  if (questionPostion === questions.length) {
    clearInterval(timeInterval)
    console.log('your score= ' + timeLeft)
    endGame()
  }
  else {
    writeButton()
  }
}

function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    domTime.textContent = 'Seconds left: ' + timeLeft
    if (timeLeft === 0) {
      clearInterval(timeInterval)
      console.log('out of time')
    }

  }, 1000);
}

function endGame() {
  document.getElementById('actualQuestion').innerHTML = '<h2>All Done!</h2><br> Your final score: ' + timeLeft
  document.getElementById('actualQuestion').setAttribute("style", "font-size: 24px;");
  document.getElementById('answerBtns').innerHTML = 'Enter Initials <input type="text" name="initials" placeholder="Initials" id= "grabInitials"> <button id="submitInitials" type="button" onclick = "scoreResults() "> SUBMIT</button>'
  document.getElementById('answerBtns').setAttribute("style", "border-radius: 10px; color:black; padding: 25px; font-size: 30px; text-align: center; font-family: sans-serif;");
}

//this is the function that will create local storage for highscore

function scoreResults() {
  var user = document.getElementById("grabInitials").value;
  var score = timeLeft;
  var scoreList = localStorage.getItem("scoreList"); 
  console.log(user);
  console.log(score);
  if (scoreList === null) {
    scoreList = [];
  }
  else {
    scoreList = JSON.parse(scoreList);
  }

  //save to local storage
  // Get stored highscore from localStorage
  // Parsing the JSON string to an object
   // Stringify and set scorelist in localStorage to highscore array
  var highscore = {userName : user, score: score}
  scoreList.push(highscore)
  localStorage.setItem("scoreList", JSON.stringify(scoreList));
  console.log(scoreList);

  window.location. href ="./index.html"; 
  
  }