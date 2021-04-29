//var id = 1;
var correctAnswer;
var hotlist = [];
var questionsInHotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;

window.onload = function () {
    console.log("Oldal betöltve");
    document.getElementById("előre").onclick = előre;
    document.getElementById("vissza").onclick = vissza;
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
        document.getElementById("kép1").classList.remove("rejtett")
    }
    else {
        document.getElementById("kép1").classList.add("rejtett")
    }
    document.getElementById("válasz1").classList.remove("jó", "rossz");
    document.getElementById("válasz2").classList.remove("jó", "rossz");
    document.getElementById("válasz3").classList.remove("jó", "rossz");


}
function questionLoad(id, destination) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: $(response.status)`)
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
                if (displayedQuestion=undefined && destination==0) {
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
    for (var i = 0; i < questionsInHotList; i++) {
        questionLoad(nextQuestion, i);
        nextQuestion++;
    }
}
function előre() {
    displayedQuestion++;
    if (displayedQuestion==questionsInHotList) {
        displayedQuestion = 0;
        showquestion();
    }
}
function vissza() {
    displayedQuestion--;
    if (displayedQuestion == questionsInHotList) {
        displayedQuestion = 0;
        showquestion();
    }
}
