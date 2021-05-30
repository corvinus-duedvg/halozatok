var hamlist = [];
var hamno;

window.onload = async function () {
    await loadall();
    showhamlist();
    gethighestid();
    document.getElementById("readsingle").addEventListener("click", readsingle);
    document.getElementById("readall").addEventListener("click", readall);
    document.getElementById("createsingle").addEventListener("click", hamCreate);
    document.getElementById("deletesingle").addEventListener("click", hamDelete);
}
async function hamLoad(id, destination) {
    await fetch(`/api/ham/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`);
                return null;
            }
            else if (response.status == 204) {
                console.error(`Hiányzó adat. code: ${response.status}`);
                return null;
            }
            else {
                return response.json()
            }
        })
        .then(
            h => {
                if (h==null) {
                    hamlist[destination] = "";
                }
                else {
                    hamlist[destination] = h;
                }
            });
}
async function readsingle() {
    hamlist = [];
    let id = document.getElementById("rid").value;
    if (id > 0) {
        await hamLoad(id, 0);
        showhamlist();
    }
    else {
        console.error("Hibás input!")
        alert("Kérem így adja meg az id-t: 1");
    }
}
async function readall() {
    hamlist = [];
    await loadall();
    showhamlist();
}
function gethighestid() {
    fetch('api/ham/maxid')
        .then(response => response.text())
        .then(n => { document.getElementById("cid").value = parseInt(n) + 1})
}
async function loadall() {
    await fetch('/api/ham/maxid')
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`);
                return null;
            }
            else {
                return response.text();
            }
        })
        .then(async n => {
            hamno = parseInt(n);
            for (var i = 0; i < hamno; i++) {
                await hamLoad(i + 1, i);
            }
        });
}
function showhamlist() {
    //kill children
    var removal = document.getElementById("bottom");
    while (removal.lastChild) {
        removal.removeChild(removal.lastChild)
    };
    //create children
    for (var i = 0; i < hamlist.length; i++) {
        var hcontainer = document.createElement("div");
        hcontainer.setAttribute("id", `hamcontainer${i}`);
        hcontainer.setAttribute("class", "hcontainer");
        document.getElementById("bottom").appendChild(hcontainer);

        let h = hamlist[i];
        console.log(h);

        var hid = document.createElement("div");
        var hpname = document.createElement("div");
        var hmname = document.createElement("div");
        var hpdo = document.createElement("div");

        hid.setAttribute("id", "hamid");
        hpname.setAttribute("id", "hampname");
        hmname.setAttribute("id", "hammname");
        hpdo.setAttribute("id", "hampdo");

        hid.setAttribute("class", "smallcontainer");
        hpname.setAttribute("class", "smallcontainer");
        hmname.setAttribute("class", "smallcontainer");
        hpdo.setAttribute("class", "smallcontainer");

        hid.innerText = h.id;
        hpname.innerText = h.pname;
        hmname.innerText = h.mname;
        hpdo.innerText = h.pdo;

        document.getElementById(`hamcontainer${i}`).appendChild(hid);
        document.getElementById(`hamcontainer${i}`).appendChild(hpname);
        document.getElementById(`hamcontainer${i}`).appendChild(hmname);
        document.getElementById(`hamcontainer${i}`).appendChild(hpdo);
    }
}
function hamCreate() {
    let data = {
        id: parseInt(document.getElementById("cid").value),
        pname: document.getElementById("cpname").value,
        mname: document.getElementById("cmname").value,
        pdo: document.getElementById("cpdo").value
    };
    fetch('api/ham',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )
        .then(response => {
            if (response.ok) {
                alert("Siker");
                window.location.reload(true);
            }
            else {
                alert("Kudarc");
            }
        });
}
function hamDelete() {
    let id = parseInt(document.getElementById("did").value);
    fetch('api/ham/' + id,
        {
        method: 'DELETE',
        }
    )
        .then(response => {
            if (response.ok) {
                alert("Siker");
                hamlist.length = hamlist.length - 1;
                window.location.reload(true);
            }
            else {
                alert("Kudarc. Kérem így adja meg az id-t: 1");
            }
        });
}