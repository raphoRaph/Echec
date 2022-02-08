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

rect = document.getElementById("plateau").getBoundingClientRect()

// Placement des cases + des pions
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){

        // Creation d'une variable img et attribution de son id
        let img = document.createElement("img")
        img.id = String(i) + String(j)
        
        // Atribution de l'image a img (noir si i + j pair / blanc si i + j impair)
        if((i+j) % 2 == 0){
            img.src = "Image/plateau_noir.png"
            img.couleur = "noir"
        }
        else{
            img.src = "Image/plateau_blanc.png"
            img.couleur = "blanc"
        }

        // Ajout d'img dans la div "plateau"
        /*document.getElementById("plateau").appendChild(img)*/
        document.getElementById("plateau").appendChild(img)
        
        // Style d'img
        img.style.left = String(rect.left + j * 100) + "px"
        img.style.top = String(rect.top + i * 100) + "px"
        img.style.position = "absolute"
        img.style.margin = "-3px"
        
        // Creation d'une variable img_pion et attribution de son id et de sa case
        let img_pion = document.createElement("img")
        img_pion.case = String(i) + String(j)
        img_pion.id = depart[i][j]

        // Attribution de l'image à img_pion a l'aide du tableau "depart"
        if(depart[i][j] != null){
            if(depart[i][j][0] == "b"){img_pion.src = "Image/Blanc/" + depart[i][j] + ".png"}
            if(depart[i][j][0] == "n"){img_pion.src = "Image/Noir/" + depart[i][j] + ".png"}
        }

        // Ajout d'img_pion dans la div "plateau"
        document.getElementById("plateau").appendChild(img_pion)

        // Attribution de la fonction "a" à img_pion, qui se lance quand on clique dessus (onclick)
        img_pion.onclick = function(){a(this)}

        // Style d'img_pion
        img_pion.style.margin = "-3px"
        img_pion.style.zIndex = "1"
        img_pion.style.position = "absolute"
        img_pion.style.left = String(rect.left + j * 100) + "px"
        img_pion.style.top = String(rect.top + i * 100) + "px"
    }
}

// Definition de la fonction "a"
function a(pion){
    console.log(pion.case, pion.id)

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
    // Switch pour lancer differentes actions en fonction du pion qui est cliqué
    switch(pion.id){
        case "bp":
            document.getElementById(String(Number(pion.case) - 10)).src = "Image/plateau_rose.png"
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

/*
for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j ++){
        console.log(document.getElementById(String(i) + String(j)).getBoundingClientRect().left)
        console.log(document.getElementById(String(i) + String(j)).getBoundingClientRect().top)
    }
}
*/
console.log(document.getElementById("plateau").getBoundingClientRect().left)
console.log(document.getElementById("plateau").getBoundingClientRect().top)