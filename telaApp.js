/*
William Henrique


*/

var attendedList = [];
var trashList = [];
var listPersonsObjects = [];
var btnNavAttended;


// img, name, mail, phone, city;
var Person = function (img, name, mail, phone, city, attended, trash) {     // objeto que consigo invocar funções por meio deles;
    this.img = img;
    this.name = name;
    this.mail = mail;
    this.phone = phone;
    this.city = city;
    this.attended = attended;
    this.trash = trash;
}





// Armazene o XMLHttpRequest e o local do arquivo JSON nas variáveis
var xmlhttp = new XMLHttpRequest();
var url = "https://randomuser.me/api/?results=10";

//teste
// Chamado sempre que o atributo readyState for alterado
xmlhttp.onreadystatechange = function () {
    // Verifique se a solicitação de busca está concluída
    if (this.readyState == 4 && this.status == 200) {
        myFunctionResponse(this.responseText);
    }
    return this.response;
}
// Fazendo a chamada HTTP usando a variável url que foi especificado acima
xmlhttp.open("GET", url, true);
xmlhttp.send();


menuNavegar();


// -- FUNCTIONS -- //

function myFunctionResponse(response) {

    // analisando a response
    var jsonData = JSON.parse(response);
    var i;
    var listProfile = jsonData.results;

    listPersonsObjects = [];

    for (i = 0; i < listProfile.length; i++) {
        insertObjectsList(listProfile[i]['picture'].medium, listProfile[i]['name'].first, listProfile[i].email, listProfile[i].phone, listProfile[i]['location'].city);  
    }
    showProfilesTable(listPersonsObjects);
 }


function menuNavegar() {

    var headerNav = document.getElementById("divNav");
    var btnsNav = headerNav.getElementsByClassName("divItem");

    for (var i = 0; i < btnsNav.length; i++) {
        btnsNav[i].addEventListener("click", function () { // registra a espera de evento em um alvo
            var current = document.getElementsByClassName("activeNav");
            current[0].className = current[0].className.replace("activeNav", "");
            this.className += " activeNav"; // referente ao btnsNav
            // document.getElementById("print").innerHTML = this.className.split(" ")[1];
            if (this.className.split(" ")[1] == "divClassAttended") {
                callScreenAttended();
            } else if (this.className.split(" ")[1] == "divClassAll") {
                xmlhttp.onreadystatechange();
                //criar um evento de click e passar para a lista de attendedList[];
            } else if (this.className.split(" ")[1] == "divClassTrash") {
                callScreenTrash();
            }
        });
    }
}

function showProfilesTable(profileList) {
    
    var out = "<table id='tablePerfil' class='tableUsers'>";

    for (i = 0; i < profileList.length; i++) {
        out += "<tr class='perfilRow'><td class='columnImgPerfil'><img class='imgPerfil' src=" +
            profileList[i].img +
            "></td><td class='columnName'><span class='nomePerfil'><b>" +
            profileList[i].name +
            "</b></span></td><td class='columnEmail'><span class='emailPerfil'>" +
            profileList[i].mail +
            "</span></td><td class='columnTel'><span class='telPerfil'>" +
            profileList[i].phone +
            "</span></td><td class='columnCity'><span class='cidadePerfil'>" +
            profileList[i].city +
            "</span></td><td class='columnIcons'><i id='iconLixeiraPerfil' class='material-icons iconLixeiraTable'>delete</i><i id='iconTodosPerfil' class='material-icons iconTodosTable'>select_all</i><i id='iconCheckPerfil' class='material-icons iconCheckTable'>done</i></td></tr>";
    }
    out += "</table>";
    document.getElementById("divBorderTable").innerHTML = out;
}


function putEventClickOnIconCheckTable(btnsCheckTable) {

    var nameProfileRow;

    for (var i; i < btnsCheckTable.length; i++) {
        btnsCheckTable[i].addEventListener("click", function () {
            var Row = document.getElementsByTagName("tr");
            var Cells = Row.getElementsByTagName("td");
            nameProfileRow = Cells[1];
            return nameProfileRow;
        });
    }
}

function setUpAttended(nameAttendedClicked) {

    for (var i = 0; i < listPersonsObjects.length; i++) {
        if (listPersonsObjects[i].name === nameAttendedClicked) {
            listPersonsObjects[i].attended = true;
            attendedList.push(listPersonsObjects[i]);
        }
    }
}


function insertObjectsList(imgPerfil, namePerfil, emailPerfil, phonePerfil, cityPerfil) {

    listPersonsObjects.push(new Person(imgPerfil, namePerfil, emailPerfil, phonePerfil, cityPerfil, false, false));
}


function removeAllRow() {

    var table = document.getElementById("tablePerfil");
    table.innerHTML = "";
}

function callScreenAttended() {

    removeAllRow();
    var tableBody = document.getElementById("tablePerfil");
    var btnsCheckTable = tableBody.getElementById("iconCheckPerfil");
    var nameAttendedClicked = putEventClickOnIconCheckTable(btnsCheckTable);
    setUpAttended(nameAttendedClicked);
    showProfilesTable(attendedList); //var attendedList = [];
}

function callScreenTrash() {

    removeAllRow();
    alert("teste");
}



// push (inserir no final) shift(remover do ini)


















