var id = 1;
var correctAnswer;


window.onload = download(1);
window.onload = function () {
    console.log("Oldal betöltve");
    document.getElementById("előre").onclick = előre;
    document.getElementById("vissza").onclick = vissza;
    questionLoad(id);
}
function download(id) {
    fetch(`/questions/${id}`)
        .then(response => response.json())
        .then(data => showquestion(data))
};
function showquestion(q) {
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
function questionLoad(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: $(response.status)`)
            }
            else {
                return response.json()
            }
        })
    .then(data=>showquestion(data))
}
function előre() {
    id++;
    questionLoad(id);
}
function vissza() {
    id--;
    questionLoad(id);
}
