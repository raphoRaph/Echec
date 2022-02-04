
/* Boutton Jouer pour lancer la Grille */
function Start(){ // Boutton pour afficher la grille d'échec
    let btn = document.createElement("button");
    btn.id = String("Joue");
    let boutonCliqué = String(btn.id);
    btn.onclick = function(){Tampon(boutonCliqué)}
    btn.innerHTML = "Jouer";
    btn.style.width = "200px";
    btn.style.height = "200px";
    btn.style.border = "1px solid #202020";
    document.body.appendChild(btn);
    document.getElementById("Jeu").appendChild(btn);
}
/* */
var GrilleFond = []
for (let i = 0; i < 10; i ++){
    GrilleFond[i] = new Array(21)
    for (let j = 0; j < 10; j++){
        GrilleFond[i][j] = String(i) + String(j);
    }
}
/* Ecriture de la Grille d'Echec */
var pos = []



function Tampon(){
    Remove_Start()
    for (let i = 0; i < 8; i++){
        for (let j = 0; j < 8; j++){
            let btn = document.createElement("button");
            btn.id = String(i) + String(j);
            let boutonCliqué = String(btn.id)
            btn.onclick = function(){Clic(boutonCliqué)}
            btn.innerHTML = GrilleFond[i][j];
            btn.style.width = "150px";
            btn.style.height = "150px";
            btn.style.border = "0px";
            document.body.appendChild(btn);
            document.getElementById("Jeu").appendChild(btn);
            let rect = btn.getBoundingClientRect() // Récupération de la position de l'image de la case
            pos.push([rect.top, rect.left]) // Renvoi les positions par apport à Gauche et à Droite
            if ((i - j)%2 != 0){ /* Alternance des couleurs */
                document.getElementById(String(i) + String(j)).style.backgroundColor = 'black';
                btn.style.color = "black";
            }
            else{
                document.getElementById(String(i) + String(j)).style.backgroundColor = 'white';
                btn.style.color = "white";
            }
        }
    }
    Debut()
}
/* */
/* Suppression du Bouton "Jouer" */
function Remove_Start(){
        var elem = document.getElementById("Joue")
        elem.parentNode.removeChild(elem);
}
/* */
/* Grille des pions */
var Grille_Base_pion = [[["T"],["C"],["F"],["D"],["R"],["F"],["C"],["T"]],[["P"],["P"],["P"],["P"],["P"],["P"],["P"],["P"]]]; // Grille pour placer les pions au début

function Debut(){ // Création de la Grille Joueur/ Affichage
    var Grille = []
    for (let i = 0; i < 7; i ++){
        Grille[i] = new Array(7)
        for (let j = 0; j < 7; j++){
            Grille[i][j] = [new Case(pos[i+j][0],pos[i+j][1]), new Pion(i,j,"None","None")]; // Liste dans une postition 
        }
    }
}

class Case{ // Caractéristique d'une case (position en px sur l'écran en x,y et son image [Blanc/Noir])
    constructor(x ,y,img){
        this.px_x = x
        this.px_y = y
        this.img = img
    }
    Grisage(){ // Grisage de la case choisi

    }
}

class Pion{ // Caratéristique d'un Pion (position sur la Grille [x,y], son type de pion [Tour, Cavalier, ...], sa couleur [Blanc/Noir] et son image [type de pion])
    constructor(x,y,couleur,type,img){
        this.x = x
        this.y = y
        this.couleur = couleur
        this.type = type
        this.img = img
    }
}
/* */

Start()