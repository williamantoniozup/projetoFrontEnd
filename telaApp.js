/*
William Henrique
*/
var attendedList = [];
var trashList = [];
var listPersonsObjects = [];
var btnNavAttended;

// img, name, mail, phone, city;
var Person = function (img, name, mail, phone, city, attendedBoolean, trashBoolean) {     // objeto que consigo invocar funções por meio deles;
    this.img = img;
    this.name = name;
    this.mail = mail;
    this.phone = phone;
    this.city = city;
    this.attended = attendedBoolean;
    this.trash = trashBoolean;
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
    showProfilesTableScreenAll(listPersonsObjects);
    // attendedList.push(listPersonsObjects[2]);
    chooseAttendedOrTrash(); //enviar perfil para a lista de atendidos ou para lixeira;
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
                removeAllRow();
                showProfilesTableScreenAttended(attendedList);
            } else if (this.className.split(" ")[1] == "divClassAll") {
                showProfilesTableScreenAll(listPersonsObjects);
                chooseAttendedOrTrash();
            } else if (this.className.split(" ")[1] == "divClassTrash") {
                removeAllRow();
                showProfilesTableScreenTrash(trashList);
                deleteFromTrashBin();
            }
        });
    }
}

function showProfilesTableScreenAll(profileList) {

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
            "</span></td><td id= 'iconsTd' class='columnIcons'><i id='iconLixeiraPerfil' class='material-icons iconClassTrashPerfil-" + i + "'>delete</i><i id='iconTodosPerfil' class='material-icons'>select_all</i><i id='iconCheckPerfil' class='material-icons iconClassCheckPerfil-" + i + "'>done</i></td></tr>";
    }
    out += "</table>";
    document.getElementById("divBorderTable").innerHTML = out;
}

function showProfilesTableScreenAttended(profileList) {

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
            "</span></td><td id= 'iconsTd' class='columnIcons'><i id='iconLixeiraPerfil' class='material-icons iconClassTrashPerfil-" + i + "'>delete</i><i id='iconTodosPerfil' class='material-icons'>select_all</i></td></tr>";
    }
    out += "</table>";
    document.getElementById("divBorderTable").innerHTML = out;
}

function showProfilesTableScreenTrash(profileList) {

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
            "</span></td><td id= 'iconsTd' class='columnIcons'><i id='iconRemoveId' class='fa fa-remove iconRemoveClass-"+i+"'></i><i id='iconUndoId' class='fas fa-undo-alt iconUndoClass-"+i+"'></i></td></tr>";
    }
    out += "</table>";
    document.getElementById("divBorderTable").innerHTML = out;
}

function chooseAttendedOrTrash() {

    var table = document.querySelector("#tablePerfil");
    // var btnIconcheck = table.querySelectorAll(".columnIcons > .iconClassCheckPerfil");
    var btnIconcheck = table.querySelectorAll(".columnIcons > #iconCheckPerfil");
    // var btnIconTrash = table.querySelectorAll(".columnIcons > .iconClassTrashPerfil");
    var btnIconTrash = table.querySelectorAll(".columnIcons > #iconLixeiraPerfil");

    for (var i = 0; i < btnIconcheck.length; i++) {
        btnIconcheck[i].addEventListener("click", function () {
            // setPersonToAtteded(this.id);
            var listClassName = this.className;
            var stringClass = getSecondClassString(listClassName);
            console.log(stringClass);
            setPersonToAtteded(stringClass);
        });
        btnIconTrash[i].addEventListener("click", function () {
            // setPersonToTrash(this.id);
            var listClassName = this.className;
            var stringClass = getSecondClassString(listClassName);
            setPersonToTrash(stringClass);
        });
    }
}

function getSecondClassString(listClassName) {
    var string = listClassName.split(' ');
    return string[1];
}

function getThirdClassString(listClassName) {
    var string = listClassName.split(' ');
    return string[2];
}

function getIndexOfString(string) {

    var afterSplited = string.split('-');
    return afterSplited[1];
}

function setPersonToAtteded(string) {

    var pos = getIndexOfString(string);
    // console.log(pos);
    if (listPersonsObjects[pos].attended != true) {
        listPersonsObjects[pos].attended = true;
        attendedList.push(listPersonsObjects[pos]);
    }
}

function setPersonToTrash(string) {

    var pos = getIndexOfString(string);
    console.log(pos);
    if (listPersonsObjects[pos].trash != true) {
        listPersonsObjects[pos].trash = true;
        trashList.push(listPersonsObjects[pos]);
    }
}

function insertObjectsList(imgPerfil, namePerfil, emailPerfil, phonePerfil, cityPerfil) {
    listPersonsObjects.push(new Person(imgPerfil, namePerfil, emailPerfil, phonePerfil, cityPerfil, false, false));
}

function removeAllRow() {
    var table = document.getElementById("tablePerfil");
    table.innerHTML = "";
}


function deleteFromTrashBin(){

    var table = document.querySelector("#tablePerfil");
    var btnIconRemove = table.querySelectorAll(".columnIcons > #iconRemoveId");

    for(var i=0; i<btnIconRemove.length; i++){
        btnIconRemove[i].addEventListener("click", function () {
            var listClassName = this.className;
            var stringClass = getThirdClassString(listClassName);
            console.log(stringClass);
            removePersonFromTrash(stringClass);
        });
    }

}



function removePersonFromTrash(string){

    var pos = getIndexOfString(string);
    console.log(pos);
    trashList.splice(pos,1);
    showProfilesTableScreenTrash(trashList);
}



















