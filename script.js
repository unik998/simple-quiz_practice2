const questions = [
    {
        question: "In which continent is Turkmenistan?",
        answers: [
            {text: "Africa",correct: false},
            {text: "Asia",correct: true},
            {text: "Europe",correct: false},
            {text: "Australia",correct: false}
        ]
    },
    {
        question: "What is capital city of Turkmenistan?",
        answers: [
            {text: "Ashgabat",correct: true},
            {text: "Minsk",correct: false},
            {text: "Washington",correct: false},
            {text: "Mary",correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Sahara",correct: false},
            {text: "Kalahari",correct: false},
            {text: "Garagum",correct: true},
            {text: "Arctic",correct: false}
        ]
    },
    {
        question: "Which is the smallest continent?",
        answers: [
            {text: "Asia",correct: false},
            {text: "Australia",correct: true},
            {text: "Europe",correct: false},
            {text: "America",correct: false}
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions.`;
    nextButton.innerHTML = "Play again!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();}
        else{
            startQuiz();
        }

});

startQuiz();