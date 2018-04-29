            //-- variables --//

//Paquet de carte
var sabot = [
    { img: "cartes/deux_carreau.svg", point: 2 }, { img: "cartes/deux_coeur.svg", point: 2 },
    { img: "cartes/deux_treifle.svg", point: 2 }, { img: "cartes/deux_pique.svg", point: 2 },
    { img: "cartes/trois_carreau.svg", point: 3 }, { img: "cartes/trois_coeur.svg", point: 3 },
    { img: "cartes/trois_treifle.svg", point: 3 }, { img: "cartes/trois_pique.svg", point: 3 },
    { img: "cartes/quatre_carreau.svg", point: 4 }, { img: "cartes/quatre_coeur.svg", point: 4 },
    { img: "cartes/quatre_treifle.svg", point: 4 }, { img: "cartes/quatre_pique.svg", point: 4 },
    { img: "cartes/cinq_carreau.svg", point: 5 }, { img: "cartes/cinq_coeur.svg", point: 5 },
    { img: "cartes/cinq_treifle.svg", point: 5 }, { img: "cartes/cinq_pique.svg", point: 5 },
    { img: "cartes/six_carreau.svg", point: 6 }, { img: "cartes/six_coeur.svg", point: 6 },
    { img: "cartes/six_treifle.svg", point: 6 }, { img: "cartes/six_pique.svg", point: 6 },
    { img: "cartes/sept_carreau.svg", point: 7 }, { img: "cartes/sept_coeur.svg", point: 7 },
    { img: "cartes/sept_treifle.svg", point: 7 }, { img: "cartes/sept_pique.svg", point: 7 },
    { img: "cartes/huit_carreau.svg", point: 8 }, { img: "cartes/huit_coeur.svg", point: 8 },
    { img: "cartes/huit_treifle.svg", point: 8 }, { img: "cartes/huit_pique.svg", point: 8 },
    { img: "cartes/neuf_carreau.svg", point: 9 }, { img: "cartes/neuf_coeur.svg", point: 9 },
    { img: "cartes/neuf_treifle.svg", point: 9 }, { img: "cartes/neuf_pique.svg", point: 9 },
    { img: "cartes/dix_carreau.svg", point: 10 }, { img: "cartes/dix_coeur.svg", point: 10 },
    { img: "cartes/dix_treifle.svg", point: 10 }, { img: "cartes/dix_pique.svg", point: 10 },
    { img: "cartes/valet_carreau.svg", point: 10 }, { img: "cartes/valet_coeur.svg", point: 10 },
    { img: "cartes/valet_treifle.svg", point: 10 }, { img: "cartes/valet_pique.svg", point: 10 },
    { img: "cartes/reine_carreau.svg", point: 10 }, { img: "cartes/reine_coeur.svg", point: 10 },
    { img: "cartes/reine_treifle.svg", point: 10 }, { img: "cartes/reine_pique.svg", point: 10 },
    { img: "cartes/rois_carreau.svg", point: 10 }, { img: "cartes/rois_coeur.svg", point: 10 },
    { img: "cartes/rois_treifle.svg", point: 10 }, { img: "cartes/rois_pique.svg", point: 10 },
    { img: "cartes/as_carreau.svg", point: 11 }, { img: "cartes/as_coeur.svg", point: 11 },
    { img: "cartes/as_treifle.svg", point: 11 }, { img: "cartes/as_pique.svg", point: 11 },
];

//Objet
var joueur = {
    ptsParties: 0, //nbr de partie gagner
    ptsMain: 0, //total des pts en main 
    pointRecu: 0, //point recu temporairement
    carteRecu: "", //carte recu avant d'être mis en main
    sheckAs: false //pour reajuster si 11pts on été donner avant de passer 21pts
};

var banquier = {
    ptsParties: 0,
    ptsMain: 0,
    pointRecu: 0,
    carteRecu: "",
    premsMain: [], // premiere main face caché
    sheckAs: false
};

//var imgCarte;
// var nombrePartie = 0;
var seuil = 17; // Determine le niveau de difficultéS

//constante
const blackJack = 21;


            //--Variables d'evenements --//

//zoneReset
var btnReset = document.getElementById('btnReset');

//span point
var nbPartieBanque = document.getElementById('nbPartieBanque');
var nbPartieJoueur = document.getElementById('nbPartieJoueur');
var affichePtsBanque = document.getElementById('ptsMainBanque');
var affichePtsJoueur = document.getElementById('ptsMainJoueur');

//zoneBanque et zoneJoueur
var mainBanque = document.getElementById('mainBanque');
var mainJoueur = document.getElementById('mainJoueur');

//zoneMessage
var message = document.getElementById('zoneMessage');

//zoneBtn
var btnDeal = document.getElementById('btnDeal')
btnDeal.style.backgroundColor = '#4BB5C1';
var btnHit = document.getElementById('btnHit');
var btnStand = document.getElementById('btnStand'); 
// Rendre inactive les boutons hit et stand au demarage
btnHit.setAttribute('disabled', 'on')
btnHit.style.backgroundColor = 'grey';
btnStand.setAttribute('disabled', 'on')
btnStand.style.backgroundColor = 'grey';

//dos carte
var backCarte = "cartes/back.png";


            //-- functions --//

//retourne une carte
function distribCarte(tailleSabot, utilisateur) {
    //génère un nombre aléatoire et l'initialise comme indice
    var indice = Math.floor(Math.random() * tailleSabot) 
    //initialise carteTempo grace à la variable indice
    var carteTempo = sabot[indice].img;
    //initialise point recu de l'utilisateur
    utilisateur.pointRecu = sabot[indice].point;
    //suprime la carte du sabot avec le meme indice
    sabot.splice(indice, 1) 
    //si sabot vide le remplir à nouveau
    
    remplirSabot(sabot.length);
    return carteTempo;
}

//Calcul la somme des points
function sommePts(pointDistribue, utilisateur){

    //Additione la carte recu aux pts total et affecte les pts suivant As ou non
    if (pointDistribue < 11) { 
        utilisateur.ptsMain += pointDistribue;

        //réajuste les points
        if (utilisateur.sheckAs == true && utilisateur.ptsMain > blackJack) {
            utilisateur.ptsMain -= 10;
            utilisateur.sheckAs = false;
        }        
        
    }else{

        //affecte 11 ou 1 pts suivant pts total
        if (utilisateur.ptsMain < 11) {
            utilisateur.ptsMain += pointDistribue;
            utilisateur.sheckAs = true;

        } else {
            utilisateur.ptsMain++;
        }
    }
}

function spanPoint(utilisateur) {
    if (utilisateur == joueur) {
        affichePtsJoueur.textContent = joueur.ptsMain;
    } else {
        affichePtsBanque.textContent = banquier.ptsMain;
    }
}

//création d'une carte 
function creeCarte(carteDistribuer) {

    var img = document.createElement('img');
    img.setAttribute('src', carteDistribuer);
    img.setAttribute('class', 'cartes');

    return img;
}

//connaitre le vainqueur
function vainqueur() {
    //désigne le vainqueur de la partie
    if ((joueur.ptsMain <= blackJack && banquier.ptsMain > blackJack) ||
        (joueur.ptsMain > banquier.ptsMain && joueur.ptsMain <= blackJack)) {

        message.textContent = "!!! Felicitation, vous avez gagné la partie !!!";
        nbPartieJoueur.textContent = ++joueur.ptsParties;

    } else {
        message.textContent = "Le banquier a gagné la partie !";
        nbPartieBanque.textContent = ++banquier.ptsParties;
    }
};


//mise à zéro d'une partie
function mazPartie() {
    joueur.sheckAs = false; 
    banquier.sheckAs = false;
    joueur.ptsMain = 0;
    banquier.ptsMain = 0;
    banquier.premsMain = [];

    mainBanque.innerHTML = "";
    mainJoueur.innerHTML = "";
}

//function initilise le sabot
function remplirSabot(tailleSabot) {
    if (tailleSabot == 0) {
        sabot = [
            { img: "cartes/deux_carreau.svg", point: 2 }, { img: "cartes/deux_coeur.svg", point: 2 },
            { img: "cartes/deux_treifle.svg", point: 2 }, { img: "cartes/deux_pique.svg", point: 2 },
            { img: "cartes/trois_carreau.svg", point: 3 }, { img: "cartes/trois_coeur.svg", point: 3 },
            { img: "cartes/trois_treifle.svg", point: 3 }, { img: "cartes/trois_pique.svg", point: 3 },
            { img: "cartes/quatre_carreau.svg", point: 4 }, { img: "cartes/quatre_coeur.svg", point: 4 },
            { img: "cartes/quatre_treifle.svg", point: 4 }, { img: "cartes/quatre_pique.svg", point: 4 },
            { img: "cartes/cinq_carreau.svg", point: 5 }, { img: "cartes/cinq_coeur.svg", point: 5 },
            { img: "cartes/cinq_treifle.svg", point: 5 }, { img: "cartes/cinq_pique.svg", point: 5 },
            { img: "cartes/six_carreau.svg", point: 6 }, { img: "cartes/six_coeur.svg", point: 6 },
            { img: "cartes/six_treifle.svg", point: 6 }, { img: "cartes/six_pique.svg", point: 6 },
            { img: "cartes/sept_carreau.svg", point: 7 }, { img: "cartes/sept_coeur.svg", point: 7 },
            { img: "cartes/sept_treifle.svg", point: 7 }, { img: "cartes/sept_pique.svg", point: 7 },
            { img: "cartes/huit_carreau.svg", point: 8 }, { img: "cartes/huit_coeur.svg", point: 8 },
            { img: "cartes/huit_treifle.svg", point: 8 }, { img: "cartes/huit_pique.svg", point: 8 },
            { img: "cartes/neuf_carreau.svg", point: 9 }, { img: "cartes/neuf_coeur.svg", point: 9 },
            { img: "cartes/neuf_treifle.svg", point: 9 }, { img: "cartes/neuf_pique.svg", point: 9 },
            { img: "cartes/dix_carreau.svg", point: 10 }, { img: "cartes/dix_coeur.svg", point: 10 },
            { img: "cartes/dix_treifle.svg", point: 10 }, { img: "cartes/dix_pique.svg", point: 10 },
            { img: "cartes/valet_carreau.svg", point: 10 }, { img: "cartes/valet_coeur.svg", point: 10 },
            { img: "cartes/valet_treifle.svg", point: 10 }, { img: "cartes/valet_pique.svg", point: 10 },
            { img: "cartes/reine_carreau.svg", point: 10 }, { img: "cartes/reine_coeur.svg", point: 10 },
            { img: "cartes/reine_treifle.svg", point: 10 }, { img: "cartes/reine_pique.svg", point: 10 },
            { img: "cartes/rois_carreau.svg", point: 10 }, { img: "cartes/rois_coeur.svg", point: 10 },
            { img: "cartes/rois_treifle.svg", point: 10 }, { img: "cartes/rois_pique.svg", point: 10 },
            { img: "cartes/as_carreau.svg", point: 11 }, { img: "cartes/as_coeur.svg", point: 11 },
            { img: "cartes/as_treifle.svg", point: 11 }, { img: "cartes/as_pique.svg", point: 11 },
        ];
    }
}