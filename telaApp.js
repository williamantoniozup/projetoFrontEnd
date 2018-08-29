/*
William Henrique


*/

var xmlhttp = new XMLHttpRequest();
var url = "https://randomuser.me/api/?results=10";




var headerNav = document.getElementById("divNav");
var btnsNav = headerNav.getElementsByClassName("divItem");
for (var i=0; i<btnsNav.length; i++){
    btnsNav[i].addEventListener("click",function(){
        var current = document.getElementsByClassName("activeNav");
        current[0].className = current[0].className.replace(" activeNav", "");
        this.className += " activeNav";
    }); 
}





















