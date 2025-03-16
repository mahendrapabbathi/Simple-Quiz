
const questions = [
    {
        question:"Which is largest animal in the world",
        answers:[
            {text:"Shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Girafee",correct:false},
        ]
    },
    {
        question:"Which is smallest country in the world",
        answers:[
            {text:"Vatican CIty",correct:true},
            {text:"Bhutan",correct:false},
            {text:"Nepal",correct:false},
            {text:"Sri lanka",correct:false},
        ]
    },{
        question:"Which is largest desert in the world",
        answers:[
            {text:"Kalahari",correct:false},
            {text:"Gobi",correct:false},
            {text:"Sahara",correct:true},
            {text:"Antarctica",correct:false},
        ]
    },{
        question:"Which is smallest continent in the world",
        answers:[
            {text:"Asia",correct:false},
            {text:"Australia",correct:true},
            {text:"Arctic",correct:false},
            {text:"Africa",correct:false},
        ]
    }
]

// const button=document.querySelectorAll('.btn');
const Question=document.getElementById('question');
const answerButton=document.querySelector('.answers');
const nextButton=document.querySelector('#next-btn');

let currentQuestionIndex=0;
let score=0;



function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}


function showQuestion(){
    resetButtons();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    Question.innerHTML=questionNo+". "+currentQuestion.question

    currentQuestion.answers.forEach((answer)=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        console.log(button.dataset.correct);
        // button.addEventListener("click",selectAnswer)
        button.addEventListener("click",selectAnswer);
        
    })
}

function resetButtons(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct');
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetButtons();
    Question.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();