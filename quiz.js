/*
u can choose from different topics
now the answers gonna come random as well
*/
const jsButton=document.querySelector(".js");
const cssButton=document.querySelector(".css");
const htmlButton=document.querySelector(".html");

const topicChooseContainer=document.querySelector(".topicChoose-container");
const scoreContainer=document.querySelector(".scoreContainer");

const startButton=document.getElementById("start-btn");
const nextButton=document.getElementById("next-btn");
const topicButton=document.getElementById("topic-btn");

const questionsCounter=document.querySelector(".questionsCounter");
const scoreCounter=document.querySelector(".scoreCounter");


const questionContainerElement=document.getElementById("question-container");
const questionElement=document.getElementById("question");
const answerButtonsElement = document.getElementById('answer-buttons');

const scoreBox=document.querySelector(".score");
const bestScoreBox=document.querySelector(".bestScore");



let shuffledQuestions, currentQuiestionIndex;
let choosedTopic;
let choosedTopicQuestion;
let clickedOnAnswerOrNot=false;//prevents to change color to click elswhere
let score=0;
let bestScore={
    js:0,
    css:0,
    html:0
};


jsButton.addEventListener("click",chooseTopic)
cssButton.addEventListener("click",chooseTopic)
htmlButton.addEventListener("click",chooseTopic)

startButton.addEventListener("click",startGame);
nextButton.addEventListener("click",()=>{
    currentQuiestionIndex++;
    setNextQuestion();
    questionsCounter.innerText="Question "+(currentQuiestionIndex+1)+"/"+choosedTopicQuestion.length;
    scoreCounter.innerText="Score: "+score;
})



function chooseTopic(element){

    startButton.classList.remove("hide");
    topicChooseContainer.classList.add("hide");
    choosedTopic=element.target.classList[0];
    //alert(element.target.classList[0]);
    chooseQuestionTopic()
}

function chooseQuestionTopic(){

    if(choosedTopic==="js"){
        choosedTopicQuestion=questions.jsQuestions;
    }else if(choosedTopic==="html"){
        choosedTopicQuestion=questions.htmlQuestions;
    }else if(choosedTopic==="css"){
        choosedTopicQuestion=questions.cssQuestions;
    }
}

function startGame(){
//startButton.classList.add("hide");
//topicButton.classList.add("hide");
//resetState();
restateAfterFinished();
shuffledQuestions = choosedTopicQuestion.sort(() => Math.random() - .5); //how questions can be used here?
currentQuiestionIndex=0;
questionsCounter.innerText="Question "+(currentQuiestionIndex+1)+"/"+choosedTopicQuestion.length;
scoreCounter.innerText="Score: "+score;
questionContainerElement.classList.remove("hide");
setNextQuestion();
}


function setNextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuiestionIndex]);

}

function showQuestion(question){
    let shuffledAnswers=question.answers.sort(() => Math.random() - .5);
    questionElement.innerText=question.question
    shuffledAnswers.forEach(answer=>{
        const button=document.createElement('button');
        button.innerText=answer.text;
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer);
        answerButtonsElement.appendChild(button);
    })
}

function resetState() {
    clickedOnAnswerOrNot=false;
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}





function selectAnswer(e){
const selectedButton=e.target;
const correct=selectedButton.dataset.correct;
scoreCounting(correct);
setStatusClass(document.body,correct);
Array.from(answerButtonsElement.children).forEach(button=>{setStatusClass(button,button.dataset.correct)});
if(shuffledQuestions.length>currentQuiestionIndex+1){
    nextButton.classList.remove("hide");
}else{
    startButton.innerText="restart";
    startButton.classList.remove("hide");
    topicButton.classList.remove("hide");
    scoreContainer.classList.remove("hide");
}
clickedOnAnswerOrNot=true;
}

function setStatusClass(element,correct){ //this sets thhe color of the body backround
    if(clickedOnAnswerOrNot===false){//prevents to change color to click elswhere
    clearStatusClass(element);
    if(correct){
        element.classList.add("correct");
    }else{
        element.classList.add("wrong");
    }
}
}

function clearStatusClass(element){
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function scoreCounting(correct){
    if(correct){
    score+=1;
    console.log(score);
    scoreCounter.innerText="Score: "+score;
    scoreBox.innerText="Score:"+score;} else{
        console.log(score);
        scoreBox.innerText="Score:"+score+"/"+choosedTopicQuestion.length;
    }
    setBestScore();
}

function setBestScore(){
    if(score>bestScore[choosedTopic]){
        bestScore[choosedTopic]=score;
        bestScoreBox.textContent=choosedTopic+" NEW BEST SCORE:"+bestScore[choosedTopic]+"/"+choosedTopicQuestion.length;
    }
}

topicButton.addEventListener("click",backToChooseTopicPage)

function backToChooseTopicPage(){
    resetState();
    restateAfterFinished();
    questionContainerElement.classList.add("hide");
    topicChooseContainer.classList.remove("hide");
    
}

function restateAfterFinished(){
    scoreContainer.classList.add("hide");
    startButton.innerText="start";
    startButton.classList.add("hide");
    topicButton.classList.add("hide");
    score=0;
    bestScoreBox.textContent=choosedTopic+" BEST SCORE:"+bestScore[choosedTopic]+"/"+choosedTopicQuestion.length;
    clickedOnAnswerOrNot=false;
}


//html-questions from https://www.javatpoint.com/html-mcq
const questions={
    htmlQuestions:[
        {
            question:"HTML stands for -",
            answers:[
                {text:"HyperText Markup Language",
                correct:true},
                {text:"HyperText and links Markup Language",
                correct:false},
                {text:"HighText Machine Language",
                correct:false},
                {text:"None of these",
                correct:false}
            ]
        },
    
        {
            question:"How to create a checkbox in HTML?",
            answers:[
                {text:"<input type = \"checkbox\">",
                correct:true},
                {text:"<input type = \"button\">",
                correct:false},
                {text:"<checkbox>",
                correct:false},
                {text:"<input type = \"check\">",
                correct:false}
            ]
        },
    
        {
            question:"How to insert a background image in HTML?",
            answers:[
                {text:"<body background = \"img.png\">",
                correct:true},
                {text:"<background = \"img.png\">",
                correct:false},
                {text:"<bg-image = \"img.png\">",
                correct:false},
                {text:"None of the above",
                correct:false}
            ]
        },
    
        {
            question:"An HTML program is saved by using the ____ extension.",
            answers:[
                {text:".html",
                correct:true},
                {text:".ht",
                correct:false},
                {text:"hml",
                correct:false},
                {text:"ml",
                correct:false}
            ]
        }
    
        
    ],
    jsQuestions:[
        {
            question:"Which of the following keywords is used to define a variable in Javascript?",
            answers:[
                {text:"all of them",
                correct:true},
                {text:"var",
                correct:false},
                {text:"let",
                correct:false},
                {text:"const",
                correct:false}
            ]
        },
    
        {
            question:"What keyword is used to declare an asynchronous function in Javascript?",
            answers:[
                {text:"async",
                correct:true},
                {text:"await",
                correct:false},
                {text:"setTimeot",
                correct:false},
                {text:"None of them",
                correct:false}
            ]
        },
    
        {
            question:"Which of the following methods can be used to display data in some form using Javascript?",
            answers:[
                {text:"All of the choice is correct",
                correct:true},
                {text:"console.log()",
                correct:false},
                {text:"window.alert()",
                correct:false},
                {text:"document.write()",
                correct:false}
            ]
        },
    
        {
            question:"Which object in Javascript doesn’t have a prototype?",
            answers:[
                {text:"Base Object",
                correct:true},
                {text:"All opbject have a prototype",
                correct:false},
                {text:"None of the Object have prototype",
                correct:false},
                {text:"Non of the choice is correct",
                correct:false}
            ]
        }
    
        
    ],
    cssQuestions:[
        {
            question:" CSS stands for -",
            answers:[
                {text:"Cascading style sheets",
                correct:true},
                {text:"Cascade style sheets",
                correct:false},
                {text:"Color and style sheets",
                correct:false},
                {text:"None of them",
                correct:false}
            ]
        },
    
        {
            question:"The property in CSS used to change the background color of an element is -",
            answers:[
                {text:"background-color",
                correct:true},
                {text:"color",
                correct:false},
                {text:"bgcolor",
                correct:false},
                {text:"All of them",
                correct:false}
            ]
        },
    
        {
            question:"The CSS property used to control the element's font-size is -",
            answers:[
                {text:"font-size",
                correct:true},
                {text:"None of them",
                correct:false},
                {text:"text-style",
                correct:false},
                {text:"text-size",
                correct:false}
            ]
        },
    
        {
            question:"The CSS property used to specify the transparency of an element is -",
            answers:[
                {text:"opacity",
                correct:true},
                {text:"visibility",
                correct:false},
                {text:"filter",
                correct:false},
                {text:"overlay",
                correct:false}
            ]
        }
    
        
    ]
}


