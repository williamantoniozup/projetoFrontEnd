/*
William Henrique


*/


// Armazene o XMLHttpRequest e o local do arquivo JSON nas variáveis
var xmlhttp = new XMLHttpRequest();
var url = "https://randomuser.me/api/?results=10";




var headerNav = document.getElementById("divNav");
var btnsNav = headerNav.getElementsByClassName("divItem");
for (var i = 0; i < btnsNav.length; i++) {
    btnsNav[i].addEventListener("click", function () { // registra a espera de evento em um alvo
        var current = document.getElementsByClassName("activeNav");
        current[0].className = current[0].className.replace(" activeNav", "");
        this.className += " activeNav"; // referente ao btnsNav
    });
}


//teste
// Chamado sempre que o atributo readyState for alterado
xmlhttp.onreadystatechange = function () {
    // Verifique se a solicitação de busca está concluída
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        myFunction(this.responseText);
    }
}

// Fazendo a chamada HTTP usando a variável url que foi especificado acima
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(response) {
    // analisando a response
    var jsonData = JSON.parse(response);
    var i;
    var out = "<table class='tableUsers'>";
    var listProfile = jsonData.results;
    console.log(jsonData);

    for (i = 0; i < listProfile.length; i++) {
        out += "<tr class='perfilRow'><td class='columnImgPerfil'><img class='imgPerfil' src=" +
            listProfile[i]['picture'].medium +
            "></td><td class='columnName'><span class='nomePerfil'><b>" +
            listProfile[i]['name'].first +
            "</b></span></td><td class='columnEmail'><span class='emailPerfil'>" +
            listProfile[i].email +
            "</span></td><td class='columnTel'><span class='telPerfil'>" +
            listProfile[i].phone +
            "</span></td><td class='columnCity'><span class='cidadePerfil'>" +
            listProfile[i]['location'].city +
            "</span></td><td class='columnIcons'><i id='iconLixeiraPerfil' class='material-icons'>delete</i><i id='iconTodosPerfil' class='material-icons'>select_all</i><i id='iconCheckPerfil' class='material-icons'>done</i></td></tr>";
    }
    out += "</table>";
    document.getElementById("divBorderTable").innerHTML = out;

}


















