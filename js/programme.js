
// Recharge la page pour tout mettre a zero
btnReset.addEventListener('click', function () {
    document.location.reload(true);
})


// Distribue les premieres cartes
btnDeal.addEventListener("click", function (e) {
    message.textContent = "";
    ptsMainBanque.textContent = "0";
    mazPartie();

    //Distribution alternative x2
    for (var i = 0; i < 2; i++) {

        //distribue au banquier
        banquier.carteRecu = distribCarte(sabot.length, banquier);
        //Ajout au tableau PremsMain
        banquier.premsMain.push(banquier.carteRecu);
        //ajout l'img carte IHM
        var imgCarte = creeCarte(backCarte);
        mainBanque.appendChild(imgCarte);
        //calcul la somme
        sommePts(banquier.pointRecu, banquier);
        
        hit(joueur);
        spanPoint(joueur);
    }  

    btnDeal.setAttribute('disabled', 'on');
    btnDeal.style.backgroundColor = 'grey';
    btnHit.removeAttribute('disabled');
    btnHit.style.backgroundColor = '#96CA2D';
    btnStand.removeAttribute('disabled');
    btnStand.style.backgroundColor = '#E70739';
});    

//pour prendre une carte
btnHit.addEventListener('click', function () {
    hit(joueur);
    spanPoint(joueur);
});


//pour laisser le banquier prendre des cartes
btnStand.addEventListener('click', function () {

    // replace les faces des deux premieres cartes que le banquier a reçu
    var y = -1;
    for (var i = 0; i < mainBanque.children.length; i++) {        
        mainBanque.children[i].setAttribute('src', banquier.premsMain[++y])
    }
    
    while (banquier.ptsMain <= seuil && joueur.ptsMain <= blackJack) {
        hit(banquier);
    }   

    spanPoint(banquier);
    vainqueur();

    btnHit.setAttribute('disabled', 'on')
    btnHit.style.backgroundColor = 'grey';
    btnStand.setAttribute('disabled', 'on')
    btnStand.style.backgroundColor = 'grey';
    btnDeal.removeAttribute('disabled');
    btnDeal.style.backgroundColor = '#4BB5C1';
})



    

