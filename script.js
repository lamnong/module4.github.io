const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const begin_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const timeCount =quiz_box.querySelector(".timer .timer_second");
const time_length = quiz_box.querySelector("header .timer_second");

const option_list = document.querySelector(".option_list");

 
// click start button
start_btn.onclick =()=>{
  info_box.classList.add("activeInfo");
}

// click exit button
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
}

// click begin button
begin_btn.onclick = () => {
  info_box.classList.remove("activeInfo");
  quiz_box.classList.add("activeQuiz");
  showQuestions(0);
  bottomQuestionsCounted(1);
  startTime(5);
  // startTimeLine(0);
}

let question_count = 0;
let que_numb =1;
let counter;
let wholeTime = 5;
let widthValue=0;


const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .replay");
const quit_quiz = result_box.querySelector(".buttons .quit");

next_btn.onclick =()=>{
  if(question_count < questions.length-1){
    question_count++;
    que_numb++;
    showQuestions(question_count);
    bottomQuestionsCounted(que_numb);
    clearInterval(counter);
    next_btn.style.display = "none";
    // clearInterval(counterLine);
    // startTimeLine(widthValue)
  }else {
    console.log("Completed!");
    clearInterval(counter);
    showResultBox();
  }
}

// showing Q&A from array
function showQuestions(index){
  const question_text = document.querySelector(".question_text");
  
  let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
  let option_tag = '<div class="option">' + questions[index].options[0] +'<span></span></div>'
    + '<div class="option">' + questions[index].options[1] +'<span></span></div>'
    + '<div class="option">' + questions[index].options[2] +'<span></span></div>'
    + '<div class="option">' + questions[index].options[3] +'<span></span></div>';
  question_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option =option_list.querySelectorAll(".option");
  for (let i=0; i < option.length; i++){
    option[i].setAttribute("onclick","optionSelected(this)");
  }
}

let tickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
  clearInterval(counter);
  // clearInterval(counterLine);
  let userAns = answer.textContent;
  let correctAns = questions[question_count].answer;
  let allSelectedOptions = option_list.children.length;
  if (userAns== correctAns){
    answer.classList.add("correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
    console.log("correct!");

  }else{
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    console.log("wrong");
    // auto showing the correct option when the selected is incorrect
    for (let i = 0; i < allSelectedOptions.length; i++) {
      if(option_list.children[i].textContent == correctAns){
        option_list.children[i].setAttribute("class", "option correct");
        option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }

  for (let i = 0; i < allSelectedOptions; i++){
    option_list.children[i].classList.add("disabled");
  }
  next_btn.style.display= "block";
}

function showResultBox(){
  info_box.classList.remove("activeInfo");
  quiz_box.classList.remove("activeQuiz");
  result_box.classList.add("activeResult");
  
}

function startTime(time){
  counter=setInterval(timing, 1000);
  function timing(){
    timeCount.textContent = time;
    time--;
    if(time < 0){
      clearInterval(counter);
      timeCount.textContent="0"
    }
  } 
}

// function startTimeLine(time) {
//   counterLine = setInterval(timing, 29);
//   function timing() {
//     time +=1;
//   //   time_length.style.width =time;
//     if (time < 549) {
//       clearInterval(counterLine);
//     }
//   }
//   }


function bottomQuestionsCounted(index){
  const countAnswer = quiz_box.querySelector(".total");
  let totalQuestionCountedTag = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
  countAnswer.innerHTML = totalQuestionCountedTag;
}
