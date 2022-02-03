
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
}
/* */
/* Suppression du Bouton Jouer */
function Remove_Start(){
        var elem = document.getElementById("Joue")
        elem.parentNode.removeChild(elem);
}
/* */

class Grille{
    constructor(i, j, couleur, type){
        this.couleur = couleur // Couleur = Blanc:"B", Noir:"N"
        this.type = type // Type = Dame:"R", Roi:"R", Tour:"T", Fou;"F", Pion:"P"
        this.position = (i,j)
    }
}


Start()