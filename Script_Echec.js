//Plateau de depart avec les pions
var Grille = [
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
            if(Grille[i][j] != null){ 
                let img_pion = document.createElement("img") // Creation d'une variable image (img_pion)
                img_pion.case = String(i) + String(j) // Id de l'image
                img_pion.id = Grille[i][j] // Position sur la Grille
                // Choisir les différents dossiers
                if(Grille[i][j][0] == "b"){
                    img_pion.src = "Image/Blanc/" + Grille[i][j] + ".png"
                }
                if(Grille[i][j][0] == "n"){
                    img_pion.src = "Image/Noir/" + Grille[i][j] + ".png"
                }
            
                document.getElementById("plateau").appendChild(img_pion) // Ajout d'image du pion dans la div "plateau"
                /* Clic du Pion*/
                if (Grille[i][j] != null){ // Différent d'une case Null
                    switch(Grille[i][j][1]){ 
                        case "t":
                            img_pion.onclick = function(){Tour(this)}
                            break;
                        case "c":
                            img_pion.onclick = function(){Cava(this)}
                            break;
                        case "f":
                            img_pion.onclick = function(){Fou(this)}
                            break;
                        case "d":
                            img_pion.onclick = function(){Dame(this)}
                            break;
                        case "r":
                            img_pion.onclick = function(){Roi(this)}
                            break;
                        case 'p':
                            img_pion.onclick = function(){Pion(this)}
                            break;
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
            else{
                img.pion = null
            }
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
            document.getElementById(String(Number(pion.case[0]) - 1) + pion.case[1]).src = "Image/case_rose.png"
            console.log(Number(pion.case) - 20)
            document.getElementById(String(Number(pion.case[0]) - 2) + pion.case[1]).src = "Image/case_rose.png"
            document.getElementById(String(Number(pion.case[0]) - 1) + pion.case[1]).couleur = "rose"
            document.getElementById(String(Number(pion.case[0]) - 2) + pion.case[1]).couleur = "rose"
            break;
        case "np":
            document.getElementById(String(Number(pion.case) + 10)).src = "Image/case_rose.png"
            document.getElementById(String(Number(pion.case) + 20)).src = "Image/case_rose.png"
            document.getElementById(String(Number(pion.case) + 10)).couleur = "rose"
            document.getElementById(String(Number(pion.case) + 20)).couleur = "rose"
            break;
    }
}

function Cava(pion){
    reinitialiser()
    console.log("ha")

}

function Tour(pion){
    reinitialiser()
    pion_selection = pion
    let i = 1

    // haut
    while(Number(pion.case) - i * 10 > -1 && document.getElementById(String(Number(pion.case[0]) - i) + pion.case[1]).pion == null){
        document.getElementById(String(Number(pion.case[0]) - i) + pion.case[1]).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) - i) + pion.case[1]).couleur = "rose"
        i += 1
    }
    i = 1

    // bas
    console.log()
    while(Number(pion.case) + i * 10 < 78 && document.getElementById(String(Number(pion.case[0]) + i) + pion.case[1]).pion == null){
        document.getElementById(String(Number(pion.case[0]) + i) + pion.case[1]).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) + i) + pion.case[1]).couleur = "rose"
        i += 1
        
    }
    i = 1

    // gauche
    while(Number(pion.case[1]) - i > -1 && document.getElementById(pion.case[0] + String(Number(pion.case[1]) - i)).pion == null){
        document.getElementById(pion.case[0] + String(Number(pion.case[1]) - i)).src = "Image/case_rose.png"
        document.getElementById(pion.case[0] + String(Number(pion.case[1]) - i)).couleur = "rose"
        i += 1
    }
    i = 1

    // droite
    while(Number(pion.case[1]) + i < 8 && document.getElementById(pion.case[0] + String(Number(pion.case[1]) + i)).pion == null){
        document.getElementById(pion.case[0] + String(Number(pion.case[1]) + i)).src = "Image/case_rose.png"
        document.getElementById(pion.case[0] + String(Number(pion.case[1]) + i)).couleur = "rose"
        i += 1
    }
}

function Fou(pion){
    reinitialiser()
    pion_selection = pion
    let i = 1

// haut gauche
    while(Number(pion.case[0]) - i > - 1 && Number(pion.case[1]) - i > - 1 
    && document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) - i))).pion == null){
        document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) - i))).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) - i))).couleur = "rose"
        i += 1
    }
    i = 1

// haut droit
    while(Number(pion.case[0]) - i > - 1 && Number(pion.case[1]) + i < 8
    && document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) + i))).pion == null){
        document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) + i))).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) - i + String(Number(pion.case[1]) + i))).couleur = "rose"
        i += 1
    }
    i = 1

// bas gauche
    while(Number(pion.case[0]) + i < 8 && Number(pion.case[1]) - i > - 1 
    && document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) - i))).pion == null){
        document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) - i))).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) - i))).couleur = "rose"
        i += 1
    }
    i = 1

// bas droit
    while(Number(pion.case[0]) + i < 8 && Number(pion.case[1]) + i < 8
    && document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) + i))).pion == null){
        document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) + i))).src = "Image/case_rose.png"
        document.getElementById(String(Number(pion.case[0]) + i + String(Number(pion.case[1]) + i))).couleur = "rose"
        i += 1
    }
}

function deplacement(frame){
    if(frame.couleur == "rose"){
        pion_selection.style.top = String(rect.top + Number(frame.id[0]) * 100) + "px"
        pion_selection.style.left = String(rect.left + Number(frame.id[1]) * 100) + "px"
        document.getElementById(pion_selection.case).pion = null
        frame.pion = pion_selection
        pion_selection.case = frame.id
    }
    reinitialiser()
}

function reinitialiser(){
    // Parcours des cases de l'echiquier pour les reinitialiser a chaque lencement de la fonction
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            // Si la source de l'image est "case_rose", elle est remplacée par "case_noir" ou "case_blanc"
            if(document.getElementById(String(i) + String(j)).couleur == "rose"){
                if((i+j) % 2 == 0){
                    document.getElementById(String(i) + String(j)).src = "Image/case_noir.png"
                    document.getElementById(String(i) + String(j)).couleur = "noir"
                }
                else{
                    document.getElementById(String(i) + String(j)).src = "Image/case_blanc.png"
                    document.getElementById(String(i) + String(j)).couleur = "blanc"
                }
            }
        }
    }
}

console.log(document.getElementById("plateau").getBoundingClientRect().left)
console.log(document.getElementById("plateau").getBoundingClientRect().top)


Initialisation()