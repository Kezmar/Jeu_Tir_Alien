var largeur_fenetre = window.innerWidth;
var hauteur_fenetre = window.innerHeight;
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var ennemi_facehugger = document.getElementById("faceHugger");
var ennemi_alien = document.getElementById("alien");
var button_ennemi_facehugger = document.getElementById("button_ennemi_facehugger");
var button_ennemi_alien = document.getElementById("button_ennemi_alien");
var feu = document.getElementById("feu");

var score = document.querySelector("#score");
var pdv = document.querySelector("#pdv");
var scoreActuel = 0;
var pdvActuel = 3;

var timercycleAlien;
var timercycleFacehugger;
var timerennemi;
var dureepartie;


// PARAMETRAGE DU CANVAS
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
    canvas.width = largeur_fenetre;
    canvas.height = hauteur_fenetre;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}
resizeCanvas();


// MISE EN PLACE ET DEMARRAGE DU JEU

document.querySelector("#boutonstart").onclick = startGame;

function startGame() {
    audio.play();
    audio.loop = true;
    resetPartie();
    arme.style.opacity = 1;
    timercycleAlien = setInterval(cycleAlien, 2500);
    timercycleFacehugger = setInterval(cycleFacehugger, 1500);

    document.querySelector("#boutonstart").style.top = "-50%";
    document.querySelector("#textintro").style.top = "-50%";
    startTimer();
}


function startTimer() {
    var chrono = 10;
    dureepartie = setInterval(function () {
        chrono--;
        if (chrono == 0) {
            gameOver();
        }
        document.querySelector("#time").innerHTML = chrono;
    }, 1000)
}

// COMPTEUR DE POINTS ET PDV 

function modification_compteur() {
    scoreActuel++;
    var nouveau_score = "<p>Aliens elimines : " + scoreActuel + "</p>";
    score.innerHTML = nouveau_score;
}

function perte_pdv() {
    var playerhit = new Audio('sons/cri.wav');
    playerhit.play();

    pdvActuel--;
    var nouveau_pdv = "<p>Points de vie : " + pdvActuel + " / 3 </p>";
    pdv.innerHTML = nouveau_pdv;

    document.querySelector("#degats").style.opacity = "50%";
    setTimeout(function () {
        document.querySelector("#degats").style.opacity = "0%";
    }, 250)
}


// GENERATION DES CIBLES

function popEnnemiFacehugger() {
    posX = Math.floor(Math.random() * ((canvas.width - 101) - 250) + 250) + 'px';
    posY = Math.floor(Math.random() * ((canvas.height - 500) - 300) + 300) + 'px';

    ennemi_facehugger.style.opacity = 1;
    ennemi_facehugger.style.left = posX;
    ennemi_facehugger.style.top = posY;
    ennemi_facehugger.src = "images/facehugger.png";
}

function popEnnemiAlien() {
    posX = Math.floor(Math.random() * ((canvas.width - 301) - 250) + 250) + 'px';
    posY = Math.floor(Math.random() * ((canvas.height - 500) - 300) + 300) + 'px';

    ennemi_alien.style.opacity = 1;
    ennemi_alien.style.left = posX;
    ennemi_alien.style.top = posY;
    ennemi_alien.src = "images/alien.png";
}


function cycleAlien() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    popEnnemiAlien();

    setTimeout(function () {
        if (ennemi_alien.src.match('images/alien.png')) {
            perte_pdv();
        }
    }, 2498)

    document.querySelector("#button_ennemi_alien").disabled = false;
    document.querySelector("#button_ennemi_alien").onclick = cibleAlienTouche;
    feu.style.top = "-100%";

    if (pdvActuel <= 0) gameOver();
}


function cycleFacehugger() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    popEnnemiFacehugger();
    setTimeout(function () {
        if (ennemi_facehugger.src.match('images/facehugger.png')) {
            perte_pdv();
        }
    }, 1498)

    document.querySelector("#button_ennemi_facehugger").disabled = false;
    document.querySelector("#button_ennemi_facehugger").onclick = cibleFacehuggerTouche;
    feu.style.top = "-100%";

    if (pdvActuel <= 0) gameOver();
}

// ENNEMIS TOUCHES

function cibleFacehuggerTouche() {
    document.querySelector("#button_ennemi_facehugger").disabled = true;
    var shot = new Audio('sons/lasershot.wav');
    shot.play();
    modification_compteur();
    ennemi_facehugger.src = "images/explosion.png";

    setTimeout(function () {
        ennemi_facehugger.src = "images/vide.png"
    }, 250)
    feu.style.top = "60%";
}

function cibleAlienTouche() {
    document.querySelector("#button_ennemi_alien").disabled = true;
    var shot = new Audio('sons/shotgun.mp3');
    shot.play();
    modification_compteur();
    ennemi_alien.src = "images/explosion.png";

    setTimeout(function () {
        ennemi_alien.src = "images/vide.png"
    }, 250)
    feu.style.top = "60%";
}

// GESTION FIN PARTIE

function gameOver() {

    document.querySelector("#boutonstart").style.top = "60%";
    document.querySelector("#textintro").style.top = "30%";

    var nouveau_contenu = "REJOUER";
    document.querySelector("#boutonstart").innerHTML = nouveau_contenu;

    if (pdvActuel <= 0) {
        var nouveau_contenu2 = "<p>Vous êtes mort! \nVous avez éliminé " + scoreActuel + " aliens.</p>";
        document.querySelector("#textintro").innerHTML = nouveau_contenu2;
    } else {
        var nouveau_contenu3 = "<p>Vous avez survecu! \nVous avez éliminé " + scoreActuel + " aliens.</p>";
        document.querySelector("#textintro").innerHTML = nouveau_contenu3;
    }

    clearInterval(timercycleAlien);
    clearInterval(timercycleFacehugger);
    clearInterval(dureepartie);

    ennemi_facehugger.src = "images/explosion.png";
    ennemi_facehugger.style.top = "-60%";
    ennemi_alien.src = "images/explosion.png";
    ennemi_alien.style.top = "-60%";
    feu.style.top = "-60%";
    arme.style.opacity = 0;
}

function resetPartie() {
    pdvActuel = 3;
    scoreActuel = 0;
    var nouveau_score = "<p>Aliens elimines : " + scoreActuel + "</p>";
    score.innerHTML = nouveau_score;

    var nouveau_pdv = "<p>Points de vie : " + pdvActuel + " / 3 </p>";
    pdv.innerHTML = nouveau_pdv;

    document.querySelector("#time").innerHTML = 00;
}