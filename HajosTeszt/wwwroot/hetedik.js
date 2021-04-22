index = 1;
var correctAnswer;


window.onload = download(1);
window.onload = function () {

    let clickablef = document.getElementById("előre");
    clickablef.onclick = function () {
        index = index + 1;
        questionLoad(index);
    }
    let clickableb = document.getElementById("vissza");
    clickableb.onclick = function () {
        index = index - 1;
        questionLoad(index);
    }



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
    document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + q.image;
    correctAnswer = q.correctAnswer;


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
function makeclickable() {
    let clickablef = document.getElementById("előre");
    clickablef.onclick = function () {
        index = index + 1;
        questionLoad(index);
    }
    let clickableb = document.getElementById("vissza");
    clickableb.click(function () {
        index = index -1;
        questionLoad(index);
    })
};
