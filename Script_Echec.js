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

// Nombre aléatoire pour sons
function SonAleatoire() {
    return Math.floor(Math.random() * 18);
  }

  // Musique de fond
var fond = document.createElement('audio')
fond.src = "Sounds/Fond.mp3"
fond.volume = 0.4
fond.loop = true

// Son d'un mouvement
var SonMouv = document.createElement('audio')
SonMouv.src = "Sounds/move.mp3"
SonMouv.volume = 0.6



rect = document.getElementById("plateau").getBoundingClientRect()

function Initialisation(){
    // Placement des cases + des pions
    fond.play()
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
    pion_selection = pion
    if(Number(pion.case[0]) - 2 >= 0){
        if(Number(pion.case[1]) - 1 >= 0){
            Cava2(pion, -2, -1) // i j
        }
        if(Number(pion.case[1]) + 1 <= 7){
            Cava2(pion, -2, 1) // i j
        }   
    }
    if(Number(pion.case[0]) + 2 <= 7){
        if(Number(pion.case[1]) - 1 >= 0){
            Cava2(pion, 2, -1) // i j
        }
        if(Number(pion.case[1]) + 1 <= 7){
            Cava2(pion, 2, 1) // i j
        }   
    }
    if(Number(pion.case[1]) - 2 >= 0){
        if(Number(pion.case[0]) - 1 >=0){
            Cava2(pion, -1, -2) // i j
        }
        if(Number(pion.case[0]) + 1 <= 7){
            Cava2(pion, -1, -2) // i j
        }   
    }
    if(Number(pion.case[1]) + 2 <= 7){
        if(Number(pion.case[0]) - 1 >= 0){
            Cava2(pion, -1, 2) // i j
        }
        if(Number(pion.case[0]) + 1 <= 7){
            Cava2(pion, 1, 2) // i j
        }   
    }
}

function Cava2(pion, o, m){
    let lieu = document.getElementById(String(Number(pion.case[0]) + o) + String(Number(pion.case[1]) + m))
    if(lieu.pion != null){
        if(lieu.pion.id[0] != pion.id[0]){
            document.getElementById(String(Number(pion.case[0]) + o) + String(Number(pion.case[1]) + m)).src = "Image/case_rose.png";
            document.getElementById(String(Number(pion.case[0]) + o) + String(Number(pion.case[1]) + m)).couleur = "rose";
        }
    }
    else{
        document.getElementById(String(Number(pion.case[0]) + o) + String(Number(pion.case[1]) + m)).src = "Image/case_rose.png";
        document.getElementById(String(Number(pion.case[0]) + o) + String(Number(pion.case[1]) + m)).couleur = "rose";
    }
}

function case_rose(pion, i1, i2){
    document.getElementById(String(Number(pion.case[0]) + i1 + String(Number(pion.case[1]) + i2))).src = "Image/case_rose.png"
    document.getElementById(String(Number(pion.case[0]) + i1 + String(Number(pion.case[1]) + i2))).couleur = "rose"
}

function case_deplacement(pion, i1, i2){
    if(document.getElementById(String(Number(pion.case[0]) + i1 + String(Number(pion.case[1]) + i2))).pion == null){
        return true
    }
    return false
}


function Tour(pion){
    reinitialiser()
    pion_selection = pion
    let i = 1

    // haut
    while(Number(pion.case) - i * 10 > -1 && case_deplacement(pion, -i, 0) == true){
        case_rose(pion, -i, 0)
        i += 1
    }
    i = 1

    // bas
    console.log()
    while(Number(pion.case) + i * 10 < 78 && case_deplacement(pion, i, 0) == true){
        case_rose(pion, i, 0)
        i += 1
        
    }
    i = 1

    // gauche
    while(Number(pion.case[1]) - i > -1 && case_deplacement(pion, 0, -i) == true){
        case_rose(pion, 0, -i)
        i += 1
    }
    i = 1

    // droite
    while(Number(pion.case[1]) + i < 8 && case_deplacement(pion, 0, i) == true){
        case_rose(pion, 0, i)
        i += 1
    }
}

function Fou(pion){
    reinitialiser()
    pion_selection = pion
    let i = 1

// haut gauche
    while(Number(pion.case[0]) - i > - 1 && Number(pion.case[1]) - i > - 1 
    && case_deplacement(pion, -i, -i) == true){
        case_rose(pion, -i, -i)
        i += 1
    }
    i = 1

// haut droit
    while(Number(pion.case[0]) - i > - 1 && Number(pion.case[1]) + i < 8
    && case_deplacement(pion, -i, i) == true){
        case_rose(pion, -i, i)
        i += 1
    }
    i = 1

// bas gauche
    while(Number(pion.case[0]) + i < 8 && Number(pion.case[1]) - i > - 1 
    && case_deplacement(pion, i, -i) == true){
        case_rose(pion, i, -i)
        i += 1
    }
    i = 1

// bas droit
    while(Number(pion.case[0]) + i < 8 && Number(pion.case[1]) + i < 8
    && case_deplacement(pion, i, i) == true){
        case_rose(pion, i, i)
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
        SonMouv.play()
    }
    reinitialiser()
}

function croquer(pion){
    document.getElementById("plateau").removeChild(pion);
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