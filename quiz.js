document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#questionAnswer").onclick = (e) => {
	     selectAnswer(e);
	    }
  })

const startButton = document.getElementById('start');
const enterNameElement = document.getElementById('enterName');
const continueButton = document.getElementById('continue');
const quizSelectionElement = document.getElementById('quizSelection');
const questionChoiceElement = document.getElementById('questionAnswer');
const scoreElement = document.getElementById('scoreTime');
const encouragementElement = document.getElementById('niceMsg');
const endQuizElement = document.getElementById("endQuiz");

const quizList = async() =>{
  const response = await fetch ('https://cors-anywhere.herokuapp.com/https://cus1172quiz.herokuapp.com/api/quiz/list');
  const result = await response.json();

  const descripCuh = {
    descrip1: result[0].description,
    descrip2: result[1].description
  }
  document.querySelector("#quizDescription").innerHTML = render_question(descripCuh, "#quizDescription_view");
}

const create_questions_field = async() => {
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://cus1172quiz.herokuapp.com/api/quiz/' + app_state.quiz + '/' + app_state.questionID);
  const result = await response.json();
  x = result[0].type;
  if(x == "mc"){
    const resultAfter = {
      question:result[0].q,
      a1:result[0].answerChoices[0],
      a2:result[0].answerChoices[1],
      a3:result[0].answerChoices[2],
      a4:result[0].answerChoices[3],
      next:result[0].meta.next_question,
    }

    document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#mc_view");
    //document.querySelector("#feedbackView").innerHTML = render_question(resultAfter,"#feedback_view");
  }else if(x == "tF"){
    const resultAfter = {
      question:result[0].q,
      t:result[0].answerChoices[0],
      f:result[0].answerChoices[1],
      next:result[0].meta.next_question,
    }
    document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#tF_view");
  }else if(x == "tR"){
    const resultAfter = {
      question:result[0].q,
      next:result[0].meta.next_question,
    }
    document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter, "#response");

    textResponse();

  }
}

const render_question = (result, view) => {
  if(document.querySelector(view) != null){
    template_source = document.querySelector(view).innerHTML;
  }
  var template = Handlebars.compile(template_source);

  var html_widget_element = template(result);

  return html_widget_element;
}

const app_state = {
  questionNum : 0,
  questionID: 0,
  questionCorrect : 0,
  questionIncorrect : 0,
  userName: "",
  quiz: 0,
}

startButton.addEventListener('click', startQuiz)

function mainMenu(){
  resetAppState();
  endQuizElement.classList.add('hide');
  welcome.classList.remove('hide');
}

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
    enterNameElement.classList.add('hide');
    quizSelectionElement.classList.remove('hide');
    quizList();
    app_state.userName = x;
    return false;
  }
}

function questionChoice(){
  quizSelectionElement.classList.add('hide')
  questionChoiceElement.classList.remove('hide')
  scoreElement.classList.remove('hide')
}

function html(){
  app_state.quiz = 1;
  app_state.questionID = 100;
  questionChoice();
  create_questions_field();
  start();
}

function java(){
  app_state.quiz = 2;
  app_state.questionID = 200;
  questionChoice();
  create_questions_field();
  start();
}

function encouragement(){
  questionChoiceElement.classList.add('hide');
  encouragementElement.classList.remove("hide");
  setTimeout(()=>encouragementElement.classList.add("hide"),1000);
}

const selectAnswer = async(e) =>{
  const answer = e.target.dataset.answer;
  const next = e.target.dataset.next;

  const response = await fetch('https://cors-anywhere.herokuapp.com/https://cus1172quiz.herokuapp.com/api/check_answer/' + app_state.quiz + '/' + app_state.questionID + '/' + '1?answer=' + answer);
  const result = await response.json();

  const resultAfter = {
    feedback: result[0].fb
  }

  document.querySelector("#feedbackView").innerHTML = render_question(resultAfter,"#feedback_view");

    if(result[0].correct == "true" && e.target.className == "answerbtn"){
      app_state.questionCorrect+=1;
      app_state.questionNum+=1;
      app_state.questionID += 1;
      encouragement();
      score();
      if(next != "-1"){
        setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
        create_questions_field();
      }else{
        endTest();
      }
    }else if(result[0].correct == "false" &&  e.target.className == "answerbtn"){
      app_state.questionIncorrect+=1;
      app_state.questionNum+=1;
      app_state.questionID += 1;
      document.getElementById("feedback").classList.remove('hide');
      document.getElementById("next").classList.remove('hide');
      questionChoiceElement.classList.add('hide');
      score();
      document.getElementById("next").onclick = function(){
        if(next != "-1"){
          document.getElementById("feedback").classList.add('hide');
          document.getElementById("next").classList.add('hide');
          setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
          create_questions_field();
          questionChoiceElement.classList.remove("hide");
        }else{
          document.getElementById("feedback").classList.add('hide');
          document.getElementById("next").classList.add('hide');
          endTest();
        }
      }
    }
}

const textResponse = async() =>{
  const answerField = document.getElementById("answerForm");
  const answerIn = document.getElementById("answer");
  const response = await fetch('https://cors-anywhere.herokuapp.com/https://cus1172quiz.herokuapp.com/api/check_answer/' + app_state.quiz + '/' + app_state.questionID + '/' + '1?answer=' + answerIn.value);
  const result = await response.json();
  answerField.addEventListener('submit', onNext);
  console.log(answerIn.value);
  function onNext(e){
  const next = e.target.dataset.next;
  e.preventDefault();
      if(result[0].correct == "true"){
        app_state.questionCorrect+=1;
        app_state.questionNum+=1;
        app_state.questionID += 1;
        encouragement();
        score();
        if(next != "-1"){
          setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
          create_questions_field();
        }else{
          endTest();
        }
      }else if(result[0].correct == "false"){
        app_state.questionIncorrect+=1;
        app_state.questionNum+=1;
        app_state.questionID += 1;
        score();
        document.getElementById("feedback").classList.remove('hide');
        document.getElementById("next").classList.remove('hide');
        questionChoiceElement.classList.add("hide");
        document.getElementById("next").onclick = function(){
          if(next != "-1"){
            document.getElementById("feedback").classList.add('hide');
            document.getElementById("next").classList.add('hide');
            create_questions_field();
            questionChoiceElement.classList.remove("hide");
          }else{
            endTest();
          }
        }
      }
    }
}

function resetAppState(){
  app_state.questionNum = 0;
  app_state.questionCorrect = 0;
  app_state.questionIncorrect = 0;
  app_state.questionID = 0;
}

function restart(){
  resetAppState();
  start();
  if(app_state.quiz==1){
    endQuizElement.classList.add('hide');
    html();
  }else if(app_state.quiz==2){
    endQuizElement.classList.add('hide');
    java();
  }
}

function endTest(){
  questionChoiceElement.classList.add('hide');
  endQuizElement.classList.remove('hide');
  scoreElement.classList.add('hide');
  stop();
  let score = (app_state.questionCorrect)/app_state.questionNum;
  document.getElementById("endQuiz").classList.remove('hide');
  if(score >= .80){
    document.getElementById("passFail").innerHTML = "Congratulations " + app_state.userName + ", you passed!" + "\nScore: " + score * 100 + "%" ;
  }else{
    document.getElementById("passFail").innerHTML = "Sorry " + app_state.userName + ", you failed." + "\nScore: " + score * 100 + "%" ;
  }
}

function score(){
  document.getElementById("score").innerHTML = app_state.questionCorrect + "/" + app_state.questionNum
}

var timerVar;

function start(){
var totalSeconds = 0;
timerVar = setInterval(

function timer(){
  ++totalSeconds;
  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour*3600)/60);
  var seconds = totalSeconds - (hour*3600 + minute*60);
  document.getElementById("timer").innerHTML = "Time Elapsed: " + hour + ":" + minute + ":" + seconds;
},1000);
}

function stop(){
  clearTimeout(timerVar);
}
