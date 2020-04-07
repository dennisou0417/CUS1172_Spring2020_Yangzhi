const startButton = document.getElementById('start')
const enterNameElement = document.getElementById('enterName')
const continueButton = document.getElementById('continue')
const quizSelectionElement = document.getElementById('quizSelection')
const questionElement = document.getElementById('question')
const questionChoiceElement = document.getElementById('questionChoice')
const htmlButton = document.getElementById('html')
const javaButton = document.getElementById('java')

startButton.addEventListener('click', startQuiz)
continueButton.addEventListener('click', enterName)
htmlButton.addEventListener('click', quizChoice)
javaButton.addEventListener('click', quizChoice)

function startQuiz(){
  welcome.classList.add('hide')
  enterNameElement.classList.remove('hide')
}

function enterName(){
  enterNameElement.classList.add('hide')
  quizSelectionElement.classList.remove('hide')
}

function quizChoice(){
  quizSelectionElement.classList.add('hide')
  questionElement.classList.remove('hide')
  questionChoiceElement.classList.remove('hide')
}

function nextQuestion(){

}

function selectAnswer(){

}
