window.onload = function () {
    console.log("start");
    let hova = document.getElementById("ide");
    hova.innerHTML = "";
    for (var s = 0; s < 12; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o <= s; o++) {
            let elem = document.createElement("elem");
            var number = (factorial(s) / (factorial(o) * factorial(s - o)));
            elem.innerText = number;
            if (number > 12) {
                elem.style.color = 'White';
            }
            else {
                elem.style.color = 'Black';
            }
            number = 256-Math.round(Math.log(number))*25;
            elem.style.backgroundColor = 'rgb(' + number + ',' + number/2 + ',' + number + ')';
            elem.classList.add("elem");
            sor.appendChild(elem);
        }
    }
}
var factorial = function (n) {
    let er = 1;
    for (let i = 2; i <= n; i++) {
        er = er * i;
    }
    return er;
}