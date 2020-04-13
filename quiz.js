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
const htmlButton = document.getElementById('html');
const javaButton = document.getElementById('java');
const encouragementElement = document.getElementById('niceMsg');
const endQuizElement = document.getElementById("endQuiz");

const create_html_questions_field = async(questionNum) => {
    const response = await fetch('http://my-json-server.typicode.com/dennisou0417/JSON-FILES/html');
    const result = await response.json();
    x = result[questionNum].type;
    if(x == "mc"){
      const resultAfter = {
        question:result[questionNum].q,
        a1:result[questionNum].c1[0].c,
        a2:result[questionNum].c2[0].c,
        a3:result[questionNum].c3[0].c,
        a4:result[questionNum].c4[0].c,
        correct1:result[questionNum].c1[0].a,
        correct2:result[questionNum].c2[0].a,
        correct3:result[questionNum].c3[0].a,
        correct4:result[questionNum].c4[0].a,
        feedback:result[questionNum].fb,
      }

      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#mc_view");
      document.querySelector("#feedbackView").innerHTML = render_question(resultAfter,"#feedback_view");
    }else if(x == "tF"){
      const resultAfter = {
        question:result[questionNum].q,
        t:result[questionNum].c1[0].c,
        f:result[questionNum].c2[0].c,
        correct1:result[questionNum].c1[0].a,
        correct2:result[questionNum].c2[0].a,
        feedback:result[questionNum].fb,
      }
      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#tF_view");
    }else if(x == "tR"){
      const resultAfter = {
        question:result[questionNum].q,
      }

      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter, "#response");
      const answerField = document.getElementById("answerForm");
      const answerIn = document.getElementById("answer");
      answerField.addEventListener('submit', onNext);
      function onNext(e){
        e.preventDefault();
        if(answerIn.value == result[questionNum].a){
          app_state.questionCorrect+=1;
          app_state.questionNum+=1;
          score();
          encouragement();
          console.log(app_state.questionNum)
          if(app_state.questionNum < 20){
            setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
            create_html_questions_field(app_state.questionNum);
          }else{
            endTest();
          }
        }
          else if(answerIn.value != result[questionNum].a){
            app_state.questionIncorrect+=1;
            app_state.questionNum+=1;
            score();
            document.getElementById("feedback").classList.remove('hide');
            document.getElementById("next").classList.remove('hide');
            questionChoiceElement.classList.add("hide");
            document.getElementById("next").onclick = function(){
          if(app_state.questionNum < 20){
            document.getElementById("feedback").classList.add('hide');
            document.getElementById("next").classList.add('hide');
            create_html_questions_field(app_state.questionNum);
            questionChoiceElement.classList.remove("hide");
          }else{
            endTest();
          }
      }
    }
  }
}
}
const create_java_questions_field = async(questionNum) => {
    const response = await fetch('http://my-json-server.typicode.com/dennisou0417/JSON-FILES/java');
    const result = await response.json();
    x = result[questionNum].type;
    if(x == "mc"){
      const resultAfter = {
        question:result[questionNum].q,
        a1:result[questionNum].c1[0].c,
        a2:result[questionNum].c2[0].c,
        a3:result[questionNum].c3[0].c,
        a4:result[questionNum].c4[0].c,
        correct1:result[questionNum].c1[0].a,
        correct2:result[questionNum].c2[0].a,
        correct3:result[questionNum].c3[0].a,
        correct4:result[questionNum].c4[0].a,
        feedback:result[questionNum].fb,
      }
      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#mc_view");
      document.querySelector("#feedbackView").innerHTML = render_question(resultAfter,"#feedback_view");
    }else if(x == "tF"){
      const resultAfter = {
        question:result[questionNum].q,
        t:result[questionNum].c1[0].c,
        f:result[questionNum].c2[0].c,
        correct1:result[questionNum].c1[0].a,
        correct2:result[questionNum].c2[0].a,
        feedback:result[questionNum].fb,
      }
      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter,"#tF_view");
    }else if(x == "tR"){
      const resultAfter = {
        question:result[questionNum].q,
      }

      document.querySelector("#questionAnswer").innerHTML = render_question(resultAfter, "#response");
      const answerField = document.getElementById("answerForm");
      const answerIn = document.getElementById("answer");
      answerField.addEventListener('submit', onNext);
      function onNext(e){
        e.preventDefault();
        if(answerIn.value == result[questionNum].a){
          app_state.questionCorrect+=1;
          app_state.questionNum+=1;
          encouragement();
          score();
          if(app_state.questionNum < 20){
            setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
            create_java_questions_field(app_state.questionNum);
          }else{
            endTest();
          }
        }else if(answerIn.value != result[questionNum].a){
            app_state.questionIncorrect+=1;
            app_state.questionNum+=1;
            score();
            document.getElementById("feedback").classList.remove('hide');
            document.getElementById("next").classList.remove('hide');
            questionChoiceElement.classList.add("hide");
            document.getElementById("next").onclick = function(){
              if(app_state.questionNum < 20){
                document.getElementById("feedback").classList.add('hide');
                document.getElementById("next").classList.add('hide');
                create_java_questions_field(app_state.questionNum);
                questionChoiceElement.classList.remove("hide");
              }else{
                endTest();
              }
            }
          }
    }
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
  questionCorrect : 0,
  questionIncorrect : 0,
  userName: "",
  quiz:0,
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
  questionChoice();
  app_state.quiz = 1;
  create_html_questions_field(0);
  start();
}

function java(){
  questionChoice();
  app_state.quiz = 2;
  create_java_questions_field(0);
  start();
}

function encouragement(){
  questionChoiceElement.classList.add('hide');
  encouragementElement.classList.remove("hide");
  setTimeout(()=>encouragementElement.classList.add("hide"),1000);
}

function selectAnswer (e){
  if(e.target.dataset.correct == "t"){
    app_state.questionCorrect+=1;
    app_state.questionNum+=1;
    encouragement();
    score();
    if(app_state.questionNum < 20 && app_state.quiz == 1){
      setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
      create_html_questions_field(app_state.questionNum);
    }else if(app_state.questionNum < 20 && app_state.quiz == 2){
      setTimeout(()=>questionChoiceElement.classList.remove('hide'),1000);
      create_java_questions_field(app_state.questionNum);
    }else{
      endTest();
    }
  }else if(e.target.dataset.correct == "f"){
    app_state.questionIncorrect+=1;
    app_state.questionNum+=1;
    document.getElementById("feedback").classList.remove('hide');
    document.getElementById("next").classList.remove('hide');
    questionChoiceElement.classList.add('hide');
    score();
    document.getElementById("next").onclick = function(){
    if(app_state.questionNum < 20 && app_state.quiz == 1){
      document.getElementById("feedback").classList.add('hide');
      document.getElementById("next").classList.add('hide');
      create_html_questions_field(app_state.questionNum);
      questionChoiceElement.classList.remove("hide");
    }else if(app_state.questionNum < 20 && app_state.quiz == 2){
      document.getElementById("feedback").classList.add('hide');
      document.getElementById("next").classList.add('hide');
      create_java_questions_field(app_state.questionNum);
      questionChoiceElement.classList.remove("hide");
    }else{
      document.getElementById("feedback").classList.add('hide');
      document.getElementById("next").classList.add('hide');
      endTest();
    }
  }
}
}

function resetAppState(){
  app_state.questionNum = 0;
  app_state.questionCorrect = 0;
  app_state.questionIncorrect = 0;
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
