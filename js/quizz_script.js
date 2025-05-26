const beginContainer = document.querySelector(".begin-quizz");
const quizzContainer = document.querySelector(".quizz-content");
const answerOptions = document.querySelector(".answer-options");
const nextQuestionBtn = document.querySelector(".next-question");
const questionStatus = document.querySelector(".question-status");
const timerDisplay = document.querySelector(".time-duration");
const resultContainer = document.querySelector(".end-quizz");

const QUIZ_TIME_LIMIT = 5;
let currentTime = QUIZ_TIME_LIMIT;
let timer = null;
let currentQuestion = null;
let numberOfQuestions = 10;
const questionIndexHistory=[];
let correctAnswerCount = 0;

// display the quizz result and hide the quizz container
const showQuizzResult = () =>{
    quizzContainer.style.display = "none";
    resultContainer.style.display = "flex";

    const resultMessage = `You got <b>${correctAnswerCount}</b> good answers over <b>${numberOfQuestions} ! </b>`;
    document.querySelector(".result-message").innerHTML = resultMessage; 
}

// clear and reset the timer
const resetTimer=()=>{
    clearInterval(timer);
    currentTime = QUIZ_TIME_LIMIT;
    timerDisplay.textContent = `${currentTime}s`;
}

// initilize and start the timer for the current question
const startTimer = () => {
    timer = setInterval(() =>{
        currentTime--;
        timerDisplay.textContent = `${currentTime}s`;

        if(currentTime<=0){
            clearInterval(timer);
            highlightCorrectAnswer();

            // disable all answer options after one option selected
            answerOptions.querySelectorAll(".answer").forEach(option => option.style.pointerEvents = "none");
            nextQuestionBtn.style.visibility = "visible";
        }
    }, 1000);
}

const getRandomQuestion= ()=>{

    // Show result if all questions have been used
    if(questionIndexHistory.length>= Math.min(questions.length, numberOfQuestions)){
        return showQuizzResult();

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
    const iconHTML = '<span class="material-icons" style="font-size:18px;">check_circle </span>';
    correctOption.insertAdjacentHTML("beforeend", iconHTML);
}

// handle user's answer
const handleAnswer = (option, answerIndex) =>{
    clearInterval(timer);

    const isCorrect = currentQuestion.correctAnswer === answerIndex;
    option.classList.add(isCorrect ? 'correct' : 'incorrect');

    !isCorrect ? highlightCorrectAnswer():correctAnswerCount++;

    // insert icon based on correctness
    const iconHTML = `<span class="material-icons" style="font-size:18px;">${isCorrect ? 'check_circle' : 'cancel'}</span>`;
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

    resetTimer();
    startTimer();

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


const startQuiz =()=>{
    beginContainer.style.display = "none";
    quizzContainer.style.display = "block";

    renderQuestion();
}
// reset the quizz and return to the start container
const resetQuiz = () =>{
    resetTimer();
    correctAnswerCount = 0;
    questionIndexHistory.length = 0;
    beginContainer.style.display = "flex";
    resultContainer.style.display = "none";
}

nextQuestionBtn.addEventListener("click",renderQuestion);
document.querySelector(".try-again").addEventListener("click", resetQuiz);
document.querySelector(".start-quizz-btn").addEventListener("click", startQuiz);