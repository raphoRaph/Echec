var positionBateauxJoueur = [[],[],[],[]];
var essaies = []

couleur = ["red", "green", "pink", "yellow", "black"]
var positionDesBoutons = []

class Bateau {
    constructor(hauteur, largeur, id, lenght, positionSurGrille){
        this.hauteur = hauteur
        this.largeur = largeur
        this.id = id
        this.lenght = lenght
        this.positionSurGrille = positionSurGrille
        //console.log(this.positionSurGrille)
    }
    creationBouton(){
        var boutonBateau = document.createElement("button")
        boutonBateau.onmousedown = function(){DeplacerBateau(event, this)}
        boutonBateau.BateauCorrespondant = this
        boutonBateau.addEventListener('keydown', this.rotation)
        boutonBateau.id = this.id
        boutonBateau.lenght = this.lenght
        boutonBateau.positionSurGrille = [null, null, null, null, null]
        boutonBateau.style.width = String(this.largeur) + "px";
        boutonBateau.style.height = String(this.hauteur) + "px";
        boutonBateau.rotationDeg = "0"
        boutonBateau.colision = 0
        document.body.appendChild(boutonBateau);
        document.getElementById("containerBateau" + this.id[1]).appendChild(boutonBateau);
        //console.log(boutonBateau.bateau)
    }
    rotation(){
        //console.log(this.rotationDeg)
        //console.log(this.onMouvement)
        if(event.key == "r" && this.onMouvement == false){
            switch(this.rotationDeg){
                case "0":
                    this.rotationDeg = "90"
                    break
                case "90":
                    this.rotationDeg = "0"
                    break
            }
            //console.log("this : ", this)
            document.getElementById(this.id).style.transform = "rotateZ(" + this.rotationDeg + "deg)";
            alignementBateauGrille(this)
            ComparaisonAutresBateaux(this)
            
        }
    }
}
const Bateau1 = new Bateau(50, 100,  "01", 1, [[null, null], [null, null]])
Bateau1.creationBouton()
const Bateau2 = new Bateau(50, 150, "02", 2, [[null, null], [null, null], [null, null]])
Bateau2.creationBouton()
const Bateau3 = new Bateau(50, 150, "03", 2, [[null, null], [null, null], [null, null]])
Bateau3.creationBouton()
const Bateau4 = new Bateau(50, 200, "04", 3, [[null, null], [null, null], [null, null], [null, null]])
Bateau4.creationBouton()
const Bateau5 = new Bateau(50, 250, "05", 4, [[null, null], [null, null], [null, null], [null, null], [null, null]])
Bateau5.creationBouton()


//Creation des boutons
function grilleBoutonsJoueur(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            var boutonGrille = document.createElement("button");
            boutonGrille.id = "0" + String(i) + String(j);
            boutonGrille.innerHTML = "(" + String(i) + ", " + String(j) + ")";
            boutonGrille.style.width = "50px";
            boutonGrille.style.height = "50px";
            boutonGrille.style.border = "1px solid";
            document.body.appendChild(boutonGrille);
            document.getElementById("containerGrilleJoueur").appendChild(boutonGrille)
            let rect = boutonGrille.getBoundingClientRect()
            positionDesBoutons.push([rect.top, rect.left])
            
        }
    }
    //console.log(positionDesBoutons)
}

function grilleBoutonsBot(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            var boutonGrille = document.createElement("button");
            boutonGrille.onmousedown = function(){Jouer(event, Number(this.id))}
            boutonGrille.id = i * 10 + j
            boutonGrille.innerHTML = "(" + String(i) + ", " + String(j) + ")";
            boutonGrille.style.margin = "0px";
            boutonGrille.style.width = "90px";
            boutonGrille.style.height = "90px";
            boutonGrille.style.border = "1px solid";
            document.body.appendChild(boutonGrille);
            document.getElementById("containerGrilleBot").appendChild(boutonGrille)
            let rect = boutonGrille.getBoundingClientRect()
            
        }
    }
    //console.log(positionDesBoutons)
}

Jouer = function(event, boutonID){
    if(essaies.indexOf(boutonID) == -1){
        console.log(boutonID)
        essaies.push(boutonID)
        
        for(let i = 0; i < 5; i++){
            if(positionBateauxBot[i].indexOf(boutonID) > -1){
                console.log("touché !")
                positionBateauxBot[i].splice(positionBateauxBot[i].indexOf(boutonID), 1)
                document.getElementById(boutonID).style.background = "orange"
                break;
            }
            else{document.getElementById(boutonID).style.background = "blue"}
            
        }
        //document.getElementById(boutonID).style.background = "red"
    }
}

bateauxBot = function(){
    for(let i = 1; i < 6; i++){
        let posInit = Math.floor(Math.random() * 100);
        //console.log("")
        //console.log("")
        //console.log("Bateau", document.getElementById("0" + String(i)).id)
        //console.log("Taille du bateau", document.getElementById("0" + String(i)).BateauCorrespondant.lenght)
        //console.log("posInit =", posInit)
        //document.getElementById(posInit).style.background = couleur[i - 1]
        let sens = Math.floor(Math.random() * 2)
        positionBateauxBot[i - 1].push(posInit)
        //console.log("sens =", sens)
        //sens = 0
        switch(sens){
            //horizontal
            case 0:
                //console.log(Number(String(posInit)[1]))
                ecart = 9 - Number(String(posInit)[1])
                if(posInit < 10){ecart = 9 - posInit}
                if(ecart <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght){
                    for(let j = 1; j <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght ; j++){
                        posInit -= 1
                        positionBateauxBot[i - 1].push(posInit)
                    }
                }
                else{for(let j = 1; j <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght; j++){
                    posInit += 1
                    positionBateauxBot[i - 1].push(posInit)
                    }
                }
                //console.log("ecart", ecart)
                break;

            //vertical
            case 1:
                //console.log(Number(String(posInit)[0]))
                ecart = 9 - Number(String(posInit)[0])
                if(posInit < 10){ecart = 9}
                if(ecart <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght){
                    for(let j = 1; j <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght ; j++){
                        posInit -= 10
                        positionBateauxBot[i - 1].push(posInit)
                    }
                }
                else{for(let j = 1; j <= document.getElementById("0" + String(i)).BateauCorrespondant.lenght; j++){
                    posInit += 10
                    positionBateauxBot[i - 1].push(posInit)
                    }
                }
                //console.log("ecart", ecart)
                break;
        }
    }
}


//Pour deplacer les bateaux
DeplacerBateau = function(event, boutonBateau){
    boutonBateau.style.zIndex = 1
    console.log(boutonBateau)
    //console.log(boutonBateau.onMouvement)
    //console.log(boutonBateau)
    if(event.button == 0){
        boutonBateau.onMouvement = true
        //console.log(boutonBateau.onMouvement)
        //var rect = boutonBateau.getBoundingClientRect();
        let shiftX = event.clientX - boutonBateau.getBoundingClientRect().left;
        let shiftY = event.clientY - boutonBateau.getBoundingClientRect().top;
        /*console.log("Distance gauche: ", rect.left)
        console.log("Distance haut: ", rect.top)
        console.log("event.clientX: ", event.clientX)
        console.log("event.clientX: ", event.clientY)
        console.log("shiftX: ", shiftX)
        console.log("shiftY: ", shiftY)*/
        boutonBateau.style.position = "absolute";
        moveAt(event.pageX, event.pageY);

        //COUPABLE
        function moveAt(pageX, pageY){ 
            //console.log("")
            //console.log("POSITION SOURIS")
            //console.log("pageX: ", pageX)
            //console.log("pageY: ", pageY)
            //console.log("pageX - shiftX: ", pageX - shiftX)
            //console.log("pageY - shiftY: ", pageY - shiftY)
            switch(boutonBateau.rotationDeg){      
                case "0":
                    //console.log(boutonBateau.onMouvement)
                    boutonBateau.style.left = pageX - shiftX + 'px';
                    boutonBateau.style.top = pageY - shiftY + 'px';
                    break;
                case "90":
                    //console.log(boutonBateau.onMouvement)
                    boutonBateau.style.left = pageX - shiftX - (25 * boutonBateau.lenght) + 'px';
                    boutonBateau.style.top = pageY - shiftY + (25 * boutonBateau.lenght) + 'px';
                    break;
            }
            /*console.log("Distance gauche: ", rect.left)
            console.log("Distance haut: ", rect.top)*/
        }


        function onMouseMove(event){
            moveAt(event.pageX, event.pageY);
        }
        document.addEventListener("mousemove", onMouseMove);
        
        //ALIGNEMENT DES BATEAUX AVEC LA GRILLE//(réductible)
        boutonBateau.onmouseup = function(){
            alignementBateauGrille(boutonBateau)
            for(let i = 1; i < 6; i++){
                ComparaisonAutresBateaux("0" + String(i))
            }
            boutonBateau.style.zIndex = 0
            
            boutonBateau.onMouvement = false
            document.removeEventListener("mousemove", onMouseMove);
            boutonBateau.onmouseup = null;
        }
    }
}

alignementBateauGrille = function(boutonBateau){
    var rect = boutonBateau.getBoundingClientRect();
    //console.log(rect.top, rect.left)
    //console.log(boutonBateau)
    //console.log("positionDesBoutons[50][0] : ", positionDesBoutons[50][0])
    switch(boutonBateau.rotationDeg){
        case "0":
            if(rect.top > positionDesBoutons[50][0]){
                let index = [Math.abs(rect.top - positionDesBoutons[50][0])]
                var ligne = 50
                for(let i = 60; i < 100; i += 10){
                    index.push(Math.abs(rect.top - positionDesBoutons[i][0]))
                    if(index[index.length - 1] < index[index.length - 2]){var ligne = (index.length - 1) * 10 + 50}
                }
            }
            else{
                let index = [Math.abs(rect.top - positionDesBoutons[0][0])]
                var ligne = 0
                for(let i = 10; i < 60; i += 10){
                    index.push(Math.abs(rect.top - positionDesBoutons[i][0]))
                    if(index[index.length - 1] < index[index.length - 2]){var ligne = (index.length - 1) * 10}
                }
            }

            if(rect.left > positionDesBoutons[5][1]){
                let index = [Math.abs(rect.left - positionDesBoutons[5][1])]
                var colonne = 5
                for(let i = 6; i < 9 - (boutonBateau.lenght - 1); i++){
                    index.push(Math.abs(rect.left - positionDesBoutons[i][1]))
                    if(index[index.length - 1] < index[index.length - 2]){var colonne = index.length - 1 + 5}
                }
            }
            else{
                let index = [Math.abs(rect.left - positionDesBoutons[0][1])]
                var colonne = 0
                for(let i = 1; i < 6; i++){
                    index.push(Math.abs(rect.left - positionDesBoutons[i][1]))
                    if(index[index.length - 1] < index[index.length - 2]){var colonne = index.length - 1}
                }
            }
            boutonBateau.style.position = "absolute";
            boutonBateau.style.top = positionDesBoutons[ligne][0] + "px"
            boutonBateau.style.left = positionDesBoutons[colonne][1] + "px"
            for(let i = 0; i <= boutonBateau.lenght; i++){
                boutonBateau.BateauCorrespondant.positionSurGrille[i] = [positionDesBoutons[ligne][0], positionDesBoutons[colonne][1] + 50 * i]
            }
            //console.log(boutonBateau.BateauCorrespondant.positionSurGrille)
            break;
        case "90":
            
            if(rect.top > positionDesBoutons[50][0]){
                let index = [Math.abs(rect.top - positionDesBoutons[50][0])]
                var ligne = 50
                for(let i = 60; i < 90 - (boutonBateau.lenght - 1) * 10; i += 10){
                    index.push(Math.abs(rect.top - positionDesBoutons[i][0]))
                    if(index[index.length - 1] < index[index.length - 2]){var ligne = (index.length - 1) * 10 + 50}
                }
                //console.log(index)
            }
            else{
                let index = [Math.abs(rect.top - positionDesBoutons[0][0])]
                var ligne = 0
                for(let i = 10; i < 60; i += 10){
                    index.push(Math.abs(rect.top - positionDesBoutons[i][0]))
                    if(index[index.length - 1] < index[index.length - 2]){var ligne = (index.length - 1) * 10}
                }
                //console.log(index)
            }
            if(rect.left > positionDesBoutons[5][1]){
                //console.log("bonjoiue")
                let index = [Math.abs(rect.left - positionDesBoutons[5][1])]
                var colonne = 5
                for(let i = 6; i < 10; i++){
                    index.push(Math.abs(rect.left - positionDesBoutons[i][1]))
                    if(index[index.length - 1] < index[index.length - 2]){var colonne = index.length - 1 + 5}
                }
                //console.log(index)
            }
            else{
                let index = [Math.abs(rect.left - positionDesBoutons[0][1])]
                var colonne = 0
                for(let i = 1; i < 6; i++){
                    index.push(Math.abs(rect.left - positionDesBoutons[i][1]))
                    if(index[index.length - 1] < index[index.length - 2]){var colonne = index.length - 1}
                }
                //console.log(index)
            }
            boutonBateau.style.position = "absolute";
            boutonBateau.style.top = positionDesBoutons[ligne][0] + (25 * boutonBateau.lenght) + "px"
            boutonBateau.style.left = positionDesBoutons[colonne][1] - (25 * boutonBateau.lenght) + "px"
            for(let i = 0; i <= boutonBateau.lenght; i++){
                boutonBateau.BateauCorrespondant.positionSurGrille[i] = [positionDesBoutons[ligne][0] + 50 * i, positionDesBoutons[colonne][1]]
            }
            //console.log(boutonBateau.BateauCorrespondant.positionSurGrille)
    }
    //console.log(boutonBateau)
}

ComparaisonAutresBateaux = function(boutonBateauID){
    console.log(boutonBateauID)
    document.getElementById(boutonBateauID).colision = false
    for(let i = 1; i <= 5; i++){
        if(boutonBateauID != "0" + String(i)){
            switch(i){
                case 1:
                    ComparaisonSpecifique(document.getElementById(boutonBateauID), Bateau1)
                    break;
                case 2:
                    ComparaisonSpecifique(document.getElementById(boutonBateauID), Bateau2)
                    break;
                case 3:
                    ComparaisonSpecifique(document.getElementById(boutonBateauID), Bateau3)
                    break;
                case 4:
                    ComparaisonSpecifique(document.getElementById(boutonBateauID), Bateau4)
                    break;
                case 5:
                    ComparaisonSpecifique(document.getElementById(boutonBateauID), Bateau5)
                    break;

            }
        }
    }
    if(document.getElementById(boutonBateauID).colision == false){document.getElementById(boutonBateauID).style.background = "white"}
} 
ComparaisonSpecifique = function(boutonBateau, bateauCompare){
    //console.log("")
    //console.log(bateauCompare.id)
    for(let i = 0; i <= boutonBateau.lenght; i++){
        //console.log("boutonBateau.BateauCorrespondant.positionSurGrille[i]", boutonBateau.BateauCorrespondant.positionSurGrille[i])
        for(let j = 0; j <= bateauCompare.lenght; j++){
            //console.log("bateauCompare.positionSurGrille[j]", bateauCompare.positionSurGrille[j])
            //console.log(boutonBateau.BateauCorrespondant.positionSurGrille[i], bateauCompare.positionSurGrille[j])
            if(boutonBateau.BateauCorrespondant.positionSurGrille[i][0] === bateauCompare.positionSurGrille[j][0] && 
                boutonBateau.BateauCorrespondant.positionSurGrille[i][1] === bateauCompare.positionSurGrille[j][1] &&
                boutonBateau.BateauCorrespondant.positionSurGrille[i][1] != null){
                    boutonBateau.style.background = "red"
                    boutonBateau.colision = true
                //console.log("Deux bateaux se touchent")
            }
            else{//console.log("Pas touche")
            }
        }
    }
}

grilleBoutonsJoueur();
grilleBoutonsBot();

var positionBateauxBot = [[],[],[],[],[]];
var colisionBateauxBot = null
while(colisionBateauxBot != 0){
    var positionBateauxBot = [[],[],[],[],[]];
    console.log(colisionBateauxBot)
    var colisionBateauxBot = 0
    bateauxBot();
    for(let i = 0; i < 5; i++){
        for(let j = 0; j < positionBateauxBot[i].length; j++){
            for(let k = i + 1; k < 5; k++){
                if(positionBateauxBot[k].indexOf(positionBateauxBot[i][j]) != -1){
                    colisionBateauxBot += 1
                }
            }
        }
    }

}
for(let i = 1; i <= 5; i++){
    //console.log('a')
    for(let j = 0; j < positionBateauxBot[i - 1].length; j++){
        console.log(i, j, document.getElementById(positionBateauxBot[i - 1][j]))
        document.getElementById(positionBateauxBot[i - 1][j]).style.background = couleur[i - 1]
    }
}