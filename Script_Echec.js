//Plateau de depart avec les pions
var depart = [
["nt", "nc", "nf", "nd", "nr", "nf", "nc", "nt"],
["np", "np", "np", "np", "np", "np", "np", "np"],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
["bt", "bc", "bf", "bd", "br", "bf", "bc", "bt"]]

var pion_selection = null

rect = document.getElementById("plateau").getBoundingClientRect()

function Initialisation(){
    // Placement des cases + des pions
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            /* Plateau */
            let img = document.createElement("img") // Creation d'une variable image (img)
            img.id = String(i) + String(j) // Attribution de l'id de l'image
            if((i+j) % 2 == 0){ // Noir si i + j % 2 == 0
                img.src = "Image/case_noir.png"
                img.couleur = "noir"
            }
            else{ // Blanc si i + j % 2 == 1
                img.src = "Image/case_blanc.png"
                img.couleur = "blanc"
            }
            document.getElementById("plateau").appendChild(img) // Ajout d'une image dans la div "plateau"
            
            img.onclick = function(){deplacement(this)} 

            // Style de l'image
            img.style.left = String(rect.left + j * 100) + "px" // Position à gauche
            img.style.top = String(rect.top + i * 100) + "px" // Positiion en haut
            img.style.position = "absolute" // Position sans contrainte
            img.style.margin = "-3px" // Aucune bordure
            /* */
            /* Pion */
            let img_pion = document.createElement("img") // Creation d'une variable image (img_pion)
            img_pion.case = String(i) + String(j) // Id de l'image
            img_pion.id = Grille[i][j] // Position sur la Grille
            if(Grille[i][j] != null){ // Choisir les différents dossiers
                if(Grille[i][j][0] == "b"){
                    img_pion.src = "Image/Blanc/" + Grille[i][j] + ".png"
                }
                if(Grille[i][j][0] == "n"){
                    img_pion.src = "Image/Noir/" + Grille[i][j] + ".png"
                }
            }
            document.getElementById("plateau").appendChild(img_pion) // Ajout d'image du pion dans la div "plateau"
            /* Clic du Pion*/
            if (Grille[i][j] != null){ // Différent d'une case Null
                switch(Grille[i][j][1]){ 
                    case "t":
                        img_pion.onclick = function(){Tour(this)}
                    case "c":
                        img_pion.onclick = function(){Cava(this)}
                    case "f":
                        img_pion.onclick = function(){Fou(this)}
                    case "d":
                        img_pion.onclick = function(){Dame(this)}
                    case "r":
                        img_pion.onclick = function(){Roi(this)}
                    case 'p':
                        img_pion.onclick = function(){Pion(this)}
                }
            }
            /* */
            img_pion.style.margin = "-3px" // Sans bordure
            img_pion.style.zIndex = "1" // Niveau de l'image
            img_pion.style.position = "absolute" // Sans contrainte
            img_pion.style.left = String(rect.left + j * 100) + "px" // Position à gauche
            img_pion.style.top = String(rect.top + i * 100) + "px" // Position en haut
            
            img.pion = img_pion
        }
    }
}

// Definition de la fonction "a"
function Pion(pion){
    reinitialiser()
    pion_selection = pion
    // Switch pour lancer differentes actions en fonction du pion qui est cliqué
    switch(pion.id){
        case "bp":
            document.getElementById(String(Number(pion.case) - 10)).src = "Image/plateau_rose.png"
            console.log(Number(pion.case) - 20)
            document.getElementById(String(Number(pion.case) - 20)).src = "Image/plateau_rose.png"
            document.getElementById(String(Number(pion.case) - 10)).couleur = "rose"
            document.getElementById(String(Number(pion.case) - 20)).couleur = "rose"
            break;
        case "np":
            document.getElementById(String(Number(pion.case) + 10)).src = "Image/plateau_rose.png"
            document.getElementById(String(Number(pion.case) + 20)).src = "Image/plateau_rose.png"
            document.getElementById(String(Number(pion.case) + 10)).couleur = "rose"
            document.getElementById(String(Number(pion.case) + 20)).couleur = "rose"
            break;
    }
}

function deplacement(frame){
    if(frame.couleur == "rose"){
        pion_selection.style.top = String(rect.top + Number(frame.id[0]) * 100) + "px"
        pion_selection.style.left = String(rect.left + Number(frame.id[1]) * 100) + "px"
        pion_selection.case = frame.id
    }
    reinitialiser()
}

function reinitialiser(){
    // Parcours des cases de l'echiquier pour les reinitialiser a chaque lencement de la fonction
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            // Si la source de l'image est "plateau_rose", elle est remplacée par "plateau_noir" ou "plateau_blanc"
            if(document.getElementById(String(i) + String(j)).couleur == "rose"){
                if((i+j) % 2 == 0){
                    document.getElementById(String(i) + String(j)).src = "Image/plateau_noir.png"
                    document.getElementById(String(i) + String(j)).couleur = "noir"
                }
                else{
                    document.getElementById(String(i) + String(j)).src = "Image/plateau_blanc.png"
                    document.getElementById(String(i) + String(j)).couleur = "blanc"
                }
            }
        }
    }
}

console.log(document.getElementById("plateau").getBoundingClientRect().left)
console.log(document.getElementById("plateau").getBoundingClientRect().top)


Initialisation()