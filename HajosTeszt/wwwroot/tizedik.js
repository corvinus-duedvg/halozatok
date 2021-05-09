var correctAnswer;
var hotlist = [];
var questionsInHotList = 7;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;

window.onload = function () {
    console.log("Oldal betöltve");
    document.getElementById("előre").addEventListener("click", előre);
    document.getElementById("vissza").addEventListener("click", vissza);
    init();
}

function showquestion() {
    let q = hotlist[displayedQuestion].question;
    console.log(q);
    document.getElementById("kérdés_szöveg").innerText = q.questionText
    document.getElementById("válasz1").innerText = q.answer1
    document.getElementById("válasz2").innerText = q.answer2
    document.getElementById("válasz3").innerText = q.answer3
    correctAnswer = q.correctAnswer;
    if (q.image) {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + q.image;
        document.getElementById("kép1").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
    }
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";
}
function questionLoad(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: $(response.status)`);
                return null;
            }
            else {
                return response.json()
            }
        })
        .then(
            q => {
                hotlist[destination].question = q;
                hotlist[destination].goodAnswers = 0;
                console.log(`A ${id}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    showquestion();
                }
            }
        );
}
function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotlist[i] = q;
    }
    fetch('/questions/count')
        .then(response => response.text())
        .then(n => { numberOfQuestions = parseInt(n) })
    if (localStorage.getItem("hotlist")) {
        hotlist = JSON.parse(localStorage.getItem("hotlist"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }
    if (displayedQuestion===undefined) {
        for (var i = 0; i < questionsInHotList; i++) {
            questionLoad(nextQuestion, i);
            nextQuestion++;
        }
    }
    else {
        showquestion();
    }
}
function választás(n) {
    if (n != correctAnswer) {
        document.getElementById(`válasz${n}`).classList.add("rossz");
        document.getElementById(`válasz${correctAnswer}`).classList.add("jó");
        hotlist[displayedQuestion].goodAnswers = 0;
    }
    else {
        document.getElementById(`válasz${correctAnswer}`).classList.add("jó");
        hotlist[displayedQuestion].goodAnswers++;
        if (hotlist[displayedQuestion].goodAnswers === 3) {
            questionLoad(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    }
    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);
    localStorage.setItem("hotlist", JSON.stringify(hotlist));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}
function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
    }
    showquestion();
}
function vissza() {
    displayedQuestion--;
    if (displayedQuestion == 0) {
        displayedQuestion = questionsInHotList - 1;
    }
    showquestion();
}

document.addEventListener("DOMContentLoaded", init);