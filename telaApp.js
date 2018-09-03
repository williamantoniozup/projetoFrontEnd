/*
William Henrique


*/

var attendedList = [];
var trashList = [];
var btnNavAttended;


// img, name, mail, phone, city;
var person = {
    img:null,
    name:null,
    mail:null,
    phone:null,
    city:null,
    attended:false,
    trash:false,
    getImg: function(){return this.img;},
    setImg: function(img){this.img = img;},

    getName: function(){return this.name;},
    setName: function(name){this.name = name;},

    getMail: function(){return this.mail;},
    setMail: function(mail){this.mail = mail;},

    getPhone: function(){return this.phone;},
    setPhone: function(phone){this.phone = phone;},

    getCity: function(){return this.city;},
    setCity: function(city){this.city=city;},

    getAttended: function(){return this.attended;},
    setAttended: function(attended){this.attended=this.attended;},

    getTrash: function(){return this.trash;},
    setTrash: function(trash){this.trash = trash;}
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
}
// Fazendo a chamada HTTP usando a variável url que foi especificado acima
xmlhttp.open("GET", url, true);
xmlhttp.send();




menuNavegar();

// btn_ChangeNav.onclick = menuNavegar();


 



// -- FUNCTIONS -- //


function myFunctionResponse(response) {
    // analisando a response
    var jsonData = JSON.parse(response);
    var i;
    var out = "<table id='tablePerfil' class='tableUsers'>";
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


function menuNavegar() {
    var headerNav = document.getElementById("divNav");
    var btnsNav = headerNav.getElementsByClassName("divItem");

    for (var i = 0; i < btnsNav.length; i++) {
        btnsNav[i].addEventListener("click", function () { // registra a espera de evento em um alvo
            var current = document.getElementsByClassName("activeNav");
            current[0].className = current[0].className.replace(" activeNav", "");
            this.className += " activeNav"; // referente ao btnsNav
            var menuDiv = this.getElementById();
            if(menuDiv=="divNavTrash"){
                moveAttended();
            }
        }); 
    }
}


function removeAllRow(){
    var table = document.getElementById("tablePerfil");
    while(table.rows.length>0){
        table.deleteRow(0);
    }
}

function moveAttended(){
    removeAllRows();
}

function moveTrash(){
    
}



// push (inserir no final) shift(remover do ini)


















