var kérdések;
var index = 0;
window.onload = download();
window.onload = makeclickable();
function download() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => downloadEnd(data))
};
function downloadEnd(d){
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    showquestion(index);
};

function showquestion(q) {
    let qbox = document.getElementById("kérdés_szöveg");
    qbox.innerText= kérdések[q].questionText;
    let abox1 = document.getElementById("válasz1");
    abox1.innerText = kérdések[q].answer1;
    let abox2 = document.getElementById("válasz2");
    abox2.innerText = kérdések[q].answer2;
    let abox3 = document.getElementById("válasz3");
    abox3.innerText = kérdések[q].answer3;
    let ibox = document.getElementById("kép1");
    ibox.src = `https://szoft1.comeback.hu/hajo/${kérdések[q].image}`;
};
function makeclickable() {
    let clickablef = document.getElementById("előre");
    clickablef.click(function () {
        index = index + 1;
        showquestion(index);
    })
    let clickableb = document.getElementById("vissza");
    clickableb.click(function () {
        index = index -1;
        showquestion(index);
    })
};
