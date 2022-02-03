
/* Boutton Jouer pour lancer la Grille */
var button_play;

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
    document.getElementById("Jeu");
}
/* */
class Grille{
    constructor(i,j) {
        this.position = (i,j)

    }
}
function Tampon(){
    console.log("ah")
}


Start()