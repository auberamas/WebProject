const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question");
const questionStatus = document.querySelector(".question-status");

let currentQuestion = null;
let numberOfQuestions = 10;
const questionIndexHistory=[];

const getRandomQuestion= ()=>{

    // Show result if all questions have been used
    if(questionIndexHistory.length>= Math.min(questions.length, numberOfQuestions)){
        return console.log("quizz completed !")

    }
    // filter the question already ansked
    const availableQuestions = questions.filter((_, index)=>!questionIndexHistory.includes(index));

    // choose a question randomly among the new ones
    const randomQuestion = availableQuestions[Math.floor(Math.random()*availableQuestions.length)];

    // add the new question to the history
    questionIndexHistory.push(questions.indexOf(randomQuestion));
    console.log(questionIndexHistory);
    return randomQuestion;
}

// hilight the correct answer and add icon
const highlightCorrectAnswer = () =>{
    const correctOption = answerOptions.querySelectorAll('.answer')[currentQuestion.correctAnswer];
    correctOption.classList.add('correct');
    const iconHTML = '<span class="material-icons" style="font-size:20px;">check_circle </span>';
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
}

// handle user's answer
const handleAnswer = (option, answerIndex) =>{
    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');

    !isCorrect ? highlightCorrectAnswer():"";

    // insert icon based on correctness
    const iconHTML = `<span class="material-icons" style="font-size:20px;">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
    option.insertAdjacentHTML("beforeend", iconHTML);

    // disable all answer options after one option selected
    answerOptions.querySelectorAll(".answer").forEach(option => option.style.pointerEvents = "none");

    nextQuestionBtn.style.visibility = "visible";
}

// give the current question and answers options
const renderQuestion = () =>{
    currentQuestion = getRandomQuestion();
    if(!currentQuestion)return;
    console.log(currentQuestion);

    // update the user interface
    answerOptions.innerHTML = "";
    nextQuestionBtn.style.visibility = "hidden";
    document.querySelector(".question").textContent = currentQuestion.question;
    questionStatus.innerHTML=`<b>${questionIndexHistory.length}</b> of <b>${numberOfQuestions}</b> questions`;


    // create option <li> elemnts, append them and add click event listeners
    currentQuestion.options.forEach((option, index)=>{
        const li = document.createElement("li");
        li.classList.add("answer");
        li.textContent = option;
        answerOptions.appendChild(li);
        li.addEventListener("click", ()=> handleAnswer(li,index));
    })
}

renderQuestion();

nextQuestionBtn.addEventListener("click",renderQuestion);