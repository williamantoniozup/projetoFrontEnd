/*William Henrique*/

/*
var count = 1;
function setColor(btn, color) {
    var property = document.getElementById(btn);
    if (count == 0) {
        property.style.backgroundColor = "#FFFFFF"
        count = 1;
    }
    else {
        property.style.backgroundColor = "#7FFF00"
        count = 0;
    }
}
document.querySelector('td.columnImgPerfil').onclick = function(){
    alert('teste');
}
*/


var headerNav = document.getElementById("divNav");
var btnsNav = headerNav.getElementsByClassName("divItem");
for (var i=0; i<btnsNav.length; i++){
    btnsNav[i].addEventListener("click",function(){
        var current = document.getElementsByClassName("activeNav");
        current[0].className = current[0].className.replace(" activeNav", "");
        this.className += " activeNav";
    });
    
}





















