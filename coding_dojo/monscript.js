var batWordsE = new Array();
var pokeWordsE = new Array();
var disneyWordsE = new Array();
var kitchenWordsE = new Array();
var batWordsM = new Array();
var pokeWordsM = new Array();
var disneyWordsM = new Array();
var kitchenWordsM = new Array();
var batWordsH = new Array();
var pokeWordsH = new Array();
var disneyWordsH = new Array();
var kitchenWordsH = new Array();
var tailleMot;
var coupsManques = 0;
var lettresTrouvees = 0;
var audioWin = new Audio('sons/queenWeAreTheChampions.mp3');
var audioLoose = new Audio('sons/looser.mp3');
var score = 0;
var scoreTab = [];

batWordsE[0] = "ROBIN";
batWordsE[1] = "JOKER";
batWordsE[2] = "WAYNE";
pokeWordsE[0] = "KANTO";
pokeWordsE[1] = "RED";
pokeWordsE[2] = "ABO";
disneyWordsE[0] = "DINGO";
disneyWordsE[1] = "NEMO";
disneyWordsE[2] = "PIXAR";
kitchenWordsE[0] = "RIZ";
kitchenWordsE[1] = "LAMBI";
kitchenWordsE[2] = "FOUET";
batWordsM[0] = "BATCAVE";
batWordsM[1] = "GOTHAM";
batWordsM[2] = "JUSTICE";
pokeWordsM[0] = "POKEBALL";
pokeWordsM[1] = "ARENES";
pokeWordsM[2] = "POKEDEX";
disneyWordsM[0] = "MICKEY";
disneyWordsM[1] = "HERCULE";
disneyWordsM[2] = "MALEFIQUE";
kitchenWordsM[0] = "HARICOT";
kitchenWordsM[1] = "CANTINE";
kitchenWordsM[2] = "COUTEAU";
batWordsH[0] = "ARKHAM";
batWordsH[1] = "FIREFLY";
batWordsH[2] = "PENNYWORTH";
pokeWordsH[0] = "HYPOMADE";
pokeWordsH[1] = "LAVANVILLE";
pokeWordsH[2] = "MASTERBALL";
disneyWordsH[0] = "POCAHONTAS";
disneyWordsH[1] = "PINOCCHIO";
disneyWordsH[2] = "DALMATIENS";
kitchenWordsH[0] = "TARTIFLETTE";
kitchenWordsH[1] = "EMPANADAS";
kitchenWordsH[2] = "RATATOUILLE";

var word;
var timer;
var motSecret;
var newSecretWord;

function getForms() {
    themeSelected = document.querySelector('input[name=tChoice]:checked').value;
    hardnessSelected = document.querySelector('input[name=hChoice]:checked').value;
    playerNameSelected = document.getElementById('nameEntry').value;
    if (playerNameSelected == '') {
        playerNameSelected = 'Noob';
    }
    word = transform(themeSelected, hardnessSelected);
    displayGame();
    let lightGreen = document.querySelectorAll('.lightGreen');
    for (let elem of lightGreen) {
        elem.classList.remove('lightGreen');
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

function randomWord(list) {
    let roll = getRandomInt(2);
    if (roll == 0) {
        roll = list[0];
    } else if (roll == 1) {
        roll = list[1];
    } else if (roll == 2) {
        roll = list[2];
    }
    return roll;
}

function getTheme(a, b) {
    if (b == 'Facile') {
        switch (a) {
            case 'Disney':
                wordsList = disneyWordsE;
                break;

            case 'Batman':
                wordsList = batWordsE;
                break;

            case 'Pokemon':
                wordsList = pokeWordsE;
                break;

            case 'Cuisine':
                wordsList = kitchenWordsE;
                break;
        }
    } else if (b == 'Intermediaire') {
        switch (a) {

            case 'Disney':
                wordsList = disneyWordsM;
                break;

            case 'Batman':
                wordsList = batWordsM;
                break;

            case 'Pokemon':
                wordsList = pokeWordsM;
                break;

            case 'Cuisine':
                wordsList = kitchenWordsM;
                break;
        }
    } else {
        switch (a) {

            case 'Disney':
                wordsList = disneyWordsH;
                break;

            case 'Batman':
                wordsList = batWordsH;
                break;

            case 'Pokemon':
                wordsList = pokeWordsH;
                break;

            case 'Cuisine':
                wordsList = kitchenWordsH;
                break;
        }
    }
    newRandomWord();
    motSecret = randomWord(wordsList);
    return motSecret;
}

function newRandomWord() {
    newSecretWord = randomWord(wordsList);
    while (motSecret == newSecretWord) {
        newSecretWord = newRandomWord();
        return newSecretWord;

    }
}

function transform(a, b) {
    var motSecret = getTheme(a, b);
    tailleMot = motSecret.length;
    word = '<table> <tr>';
    for (var i = 0; i < tailleMot; i++) {
        word += '<td> <p id=\"' + i + '\">' + motSecret[i] + '</p> </td> ';
    }
    word += '</tr> </table>';
    document.getElementById('blabla').innerHTML = word;
    console.log(motSecret);
    return motSecret, tailleMot;
}

function proposer(element) {
    // Si la couleur de fond est lightgreen, c'est qu'on a déjà essayé - on quitte la fonction
    if (element.className == "lightGreen") {
        return;
    }
    // On récupère la lettre du clavier et on met la touche en lightgreen (pour signaler qu'elle est cliquée)
    var lettre = element.innerHTML;
    changeCouleur(element, "lightGreen");

    // On met la variable trouve à false;
    var trouve = false;

    // On parcours chaque lettre du mot, on cherche si on trouve la lettre séléectionnée au clavier
    console.log('vraie taille?' + tailleMot);
    let tabword = [];
    for (var i = 0; i < tailleMot; i++) {
        tabword[i] = document.getElementById(i);
        // Si c'est le cas :
        if (tabword[i].innerHTML == lettre) {
            trouve = true;
            lettresTrouvees++;
            tabword[i].style.visibility = 'visible'; // On affiche la lettre
        }
    }

    // Si la lettre n'est pas présente, trouvé vaut toujours false :
    if (!trouve) {
        coupsManques++;
        document.images['pendu'].src = "images/pendu_" + coupsManques + ".jpg"; // On change l'image du pendu
        // Si on a raté 9 fois :
        if (coupsManques == 9) {
            for (var i = 0; i < tailleMot; i++) {
                tabword[i].style.visibility = 'visible';
            }
            playAgain();
            // on affiche le mot, on fini le jeu
        }
    }
    if (lettresTrouvees == tailleMot) {
        /* document.getElementById('result').innerHTML = "<div style=\"width:100%;height:0;padding-bottom:100%;position:relative;\"><iframe src=\"https://giphy.com/embed/geL1pDlmZwpvqVQp6V\" width=\"100%\" height=\"100%\" style=\"position:absolute\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe></div><p>YOU\'RE A WINNER!!!</p>";
        audioWin.play(); */
        score++;
        document.getElementById('scorePoints').innerHTML = '<p>' + score + '</p>';
        playAgain();
        displayScore();
    }
    return score;
}

function changeCouleur(element, couleur) {
    element.classList.add('lightGreen');
    //element.style.backgroundColor = couleur;
}

function displayMenu() {
    if (timer) {
        clearTimeout(timer);
    }
    displayScore();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('page').style.display = 'none';
    document.getElementById('choix').style.display = 'none';
}

function displayGame() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('page').style.display = 'block';
    document.getElementById('choix').style.display = 'none';
}

function playAgain() {
    coupsManques = 0;
    document.images['pendu'].src = "images/pendu_" + coupsManques + ".jpg";
    lettresTrouvees = 0;
    motSecret = "";
    tailleMot = 0;
    /* let letters = document.querySelectorAll('#clavier');
    changeCouleur(letters, 'white'); */
    getForms();
}

function quit() {
    /*document.getElementById('result').innerHTML = "<div style=\"width:100%;position:absolute;\"><iframe src=\"https://giphy.com/embed/3oz8xsuGvBn03H1boY\" width=\"100%\" height=\"100%\" style=\"position:absolute\" frameBorder=\"0\" class=\"giphy-embed\" allowFullScreen></iframe></div><p>LOOSER!!!</p>";
    audioLoose.play();*/
    scoreTab.push(score);
    score = 0;
    if (timer) {
        clearTimeout(timer);
    }
    displayMenu();
}

function chronometre() {
    var cpt = 2;
    if (timer) {
        clearTimeout(timer);
    }
    timer = setInterval(function() {
        if (cpt > 0) {
            document.getElementById("chrono").innerHTML = cpt + "s";
            --cpt; // décrémente le compteur
        } else {
            document.getElementById('chrono').innerHTML = "<p>Temps écoulé</p>";
            scoreTab.push(score);
            document.getElementById('menu').style.display = 'none';
            document.getElementById('page').style.display = 'none';
            document.getElementById('choix').style.display = 'block';
        }
    }, 1000);
}

function startGame() {
    getForms();
    chronometre();

}

function getScore() {
    var playerName = document.getElementById('nameEntry').value;
    tabScore.push([playerName, score]);
    console.log(scoreTab);
}

function scoreTab() {
    let html = '<ul>';
    for (let result of scoreTab) {
        html += '<li>';
        html += 'Joueur : ' + result[0];
        html += ' | Score : ' + result[1];
        html += '</li>';
    }
    html += '</ul>';
    document.getElementById('tableauScore').innerHTML = html;
}

function displayScore() {
    if (scoreTab.length > 0) {
        scoreTab();
    }
}