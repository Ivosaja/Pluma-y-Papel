let btnVovler = document.getElementById("volverDashboard");


function volverDashboard(){


    btnVovler.addEventListener("click", function(){

        window.location.href = "../dashboard/dashboard.html";
    })
}





function init(){
    volverDashboard();

}

init();