async function fetch_quiz(){
  try{
    const response = await fetch('http://my-json-server.typicode.com/dennisou0417/JSON-FILES/db')

    const result = await response.json()

    console.log(result);
  } catch(err){
    console.error(err);
  }
}

fetch_quiz()

const startButton = document.getElementById('start')
const enterNameElement = document.getElementById('enterName')
const continueButton = document.getElementById('continue')
const quizSelectionElement = document.getElementById('quizSelection')
const questionChoiceElement = document.getElementById('scoreTracker')
const scoreElement = document.getElementById('questionAnswer')
const htmlButton = document.getElementById('html')
const javaButton = document.getElementById('java')

startButton.addEventListener('click', startQuiz)
htmlButton.addEventListener('click', quizChoice)
javaButton.addEventListener('click', quizChoice)

function startQuiz(){
  welcome.classList.add('hide')
  enterNameElement.classList.remove('hide')
}

function validateName(){
  var x = document.forms["nameForm"]["name"].value;
  if(x == ""){
    alert("Name must be filled out to continue");
    return false;
  }else{
    enterNameElement.classList.add('hide')
    quizSelectionElement.classList.remove('hide')
    return false;
  }
}

function quizChoice(){
  quizSelectionElement.classList.add('hide')
  questionChoiceElement.classList.remove('hide')
  scoreElement.classList.remove('hide')
}

function showQuestion(){

}

function nextQuestion(){

}

function selectAnswer(){

}
