console.log("Conectado a Cluuf Local 2020");

var inicio = new Date;
function tiempo_carga(){
var fin = new Date;
var segundos = (fin-inicio)/1000;
return segundos;
}



let scrollMax = 0;
let resizeWindow = $( window ).width();
let mobile = isMobile();

let user = Math.floor(Math.random() * 100000000000000);

if(localStorage.getItem('usr')){
  user = localStorage.getItem('usr');
}else{
  localStorage.setItem('usr',user);
}

if(mobile===null) mobile = 'web';

// Cuando hacen click en el navegador
$(".lph001nav a").click(function(e) {
  let element = "lph001nav";
  let name = $(this).html();
});

$(".lph001nav a").click(function(e) {
    let element = "lph001nav";
    let name = $(this).html();
});


window.onload = (event) => {
let countH = 0;
const params = `r=${document.referrer}&u=${user}&d=${window.navigator.platform}&
w=${$( window ).width()}&p=${location.pathname}&dl=${window.navigator.connection.downlink}&
g=${mobile}&l=${window.navigator.language}&s=${tiempo_carga()}&b=${isMobile()}` ;

if(localStorage.getItem('123456789')){
  setTimeout(function(){ getData() }, 6000);
  setTimeout(function(){ getDataV2() }, 8000);
}

//setTimeout(function(){ }, 4000);
page(params);




       //Evento hover SECCIONES
       $("section").mouseenter(function(e) {
        // send('h',$(this).data().cluuf);
       });

       //Evento Click SECCIONES
       $("section").click(function(e) {
         //send('c',$(this).data().cluuf);
       });

        //Evento Click enlaces
        $("a").click(function(e) {
          $(this).data().cluuf && send('c',$(this).data().cluuf);
        });


};

//  send('z',resizeWindow);

 // Capturamos cuando ajusta el tamano de la pantalla
$( window ).resize(function() {
  resizeWindow = $( window ).width();
});

 // Capturamos el mayor Scroll
$(window).scroll(function() {
        if(scrollMax < $(window).scrollTop()){
            scrollMax = $(window).scrollTop();
            resizeWindow = $( window ).width();
        }
  });

function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
}


window.addEventListener("beforeunload", function (e) {
  //send('s',scrollMax);
});


function send(event,code) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://qreatech.herokuapp.com/add", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`event=${event}&code=${code}&user=${user}`);
}

function getData(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/search", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           const cx =  JSON.parse(xhttp.responseText);
           $.each(cx.codigo, function(name, value) {
              $("[data-cluuf='"+name+"']").append(`<span class='ccc'>${value}</span>`)
           });
      }
  };

  xhttp.send();
}

function getDataV2(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/searchV2", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           const dt =  JSON.parse(xhttp.responseText);
           console.log(dt.userp);
           console.log();

      }
  };

  xhttp.send();
}

function getImagenes(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:3000/imagenes", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
           const cx =  JSON.parse(xhttp.responseText);
           $.each(cx.image, function(value) {
             $("body").append(`<img src='${value}' />`)
           });
      }
  };
  xhttp.send();
}
function page(params) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://qreatech.herokuapp.com/page", true);
  //xhttp.open("POST", "http://localhost:3000/page", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(params);
}
