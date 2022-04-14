// V 6.1

// AJOUTER //
/*
    IMPORTANT :
- victoire par echec et mat
- Style global du site
- rock (petit et grand)
- prise en passant

    OPTIONEL:
- Animation du deplacement des pions
- Deplacer les pions en "drag and drop"
- mode de jeu pions aléatoires
*/

var liste_pions = []
const rect = document.getElementById("plateau").getBoundingClientRect()
const largeur= Math.floor(screen.width / 20)
var case_active = true
var pion_selection = null
var pion_adverses = []
var pions_echec = []
var cases_possibles_deplacement = []
var cases_possibles_deplacement_roi = []
var tour = 0
var QI_blanc = 100
var QI_noir = 100
var fond = document.createElement('audio')
var Grille = [
    ["nt", "nc", "nf", "nd", "nr", "nf", "nc", "nt"],
    ["np", "np", "np", "np", "np", "np", "np", "np"],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["bt", "bc", "bf", "bd", "br", "bf", "bc", "bt"]]
/*
[
["nt", "nc", "nf", "nd", "nr", "nf", "nc", "nt"],
["np", "np", "np", "np", "np", "np", "np", "np"],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
["bt", "bc", "bf", "bd", "br", "bf", "bc", "bt"]]
*/
/*
[
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null],
[null, null, null, null, null, null, null, null]]
*/

fond.src = "Sounds/fond" + String(Math.floor(Math.random() * 2)) + ".mp3"
fond.volume = 1
fond.loop = true

// initialise le jeu
function Initialisation(){
    document.getElementById("plateau").style.left = String(screen.width / 2 - largeur * 4) + "px"
    document.getElementById("plateau").style.width = String(largeur * 8) + "px"
    document.getElementById("plateau").style.height = String(largeur * 8) + "px"

    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            
            let frame = document.createElement("img")
            frame.id = String(i) + String(j)
            frame.echec = false
            if((i+j) % 2 == 0){
                frame.src = "Image/Cases/case_blanc.png"
                frame.couleur = 0
            }
            else{
                frame.src = "Image/Cases/case_noir.png"
                frame.couleur = 1
            }
            document.getElementById("plateau").appendChild(frame)
            
            frame.onclick = function(){deplacement(this)} 

            frame.style.left = String(j * largeur) + "px"
            frame.style.top = String(i * largeur) + "px"
            frame.style.width = String(largeur) + "px"
            frame.style.position = "absolute"

            if(Grille[i][j] != null){ 
                let pion = document.createElement("img")
                pion.frame = String(i) + String(j)
                pion.id = Grille[i][j]
                pion.direction = "(h)(hd)(d)(db)(b)(bg)(g)(gh)"
                
                if(Grille[i][j][0] == "b"){
                    pion.src = "Image/Pions/" + Grille[i][j] + ".png"
                }
                if(Grille[i][j][0] == "n"){
                    pion.src = "Image/Pions/" + Grille[i][j] + ".png"
                }
            
                document.getElementById("plateau").appendChild(pion)
                
                if (Grille[i][j] != null){
                    switch(Grille[i][j][1]){ 
                        case "c":
                            pion.onclick = function(){Cava(this)}
                            break;
                        case "d":
                            pion.onclick = function(){Dame(this)}
                            break;
                        case "f":
                            pion.onclick = function(){Fou(this)}
                            break;
                        case 'p':
                            pion.onclick = function(){Pion(this)}
                            pion.move = false
                            break;
                        case "r":
                            pion.onclick = function(){Roi(this)}
                            break;
                        case "t":
                            pion.onclick = function(){Tour(this)}
                            break;                       
                    }
                }

                pion.style.zIndex = "1"
                pion.style.position = "absolute"
                pion.style.left = String(j * largeur) + "px"
                pion.style.top = String(i * largeur) + "px"
                pion.style.width = String(largeur) + "px"
                liste_pions.push(pion)
                frame.pion = pion
            }
            else{
                frame.pion = null
            }
        }
    }

    document.getElementById("pions_noirs_morts").style.left = String(screen.width / 2 - largeur * 7) + "px"
    document.getElementById("pions_noirs_morts").style.top = String(rect.top + largeur) + "px"
    document.getElementById("pions_noirs_morts").style.width = String( 3 * largeur) + "px"
    document.getElementById("pions_noirs_morts").style.height = String(6 * largeur) + "px"

    document.getElementById("pions_blancs_morts").style.left = String(screen.width / 2 + largeur * 4) + "px"
    document.getElementById("pions_blancs_morts").style.top = String(rect.top + largeur) + "px"
    document.getElementById("pions_blancs_morts").style.width = String( 3 * largeur) + "px"
    document.getElementById("pions_blancs_morts").style.height = String(6 * largeur) + "px"

    document.getElementById("QI_blanc").style.top = String(rect.top + 7 * largeur) + "px"
    document.getElementById("QI_blanc").style.left = String(screen.width / 2 + largeur * 5) + "px"
    document.getElementById("QI_blanc").style.width = String(largeur) + "px"
    document.getElementById("QI_blanc").style.height = String(largeur) + "px"

    document.getElementById("QI_noir").style.top = String(rect.top) + "px"
    document.getElementById("QI_noir").style.left = String(screen.width / 2 - largeur * 6) + "px"
    document.getElementById("QI_noir").style.width = String(largeur) + "px"
    document.getElementById("QI_noir").style.height = String(largeur) + "px"

    document.getElementById("canvas").style.width = String(largeur * 8) + "px"
    document.getElementById("canvas").style.height = String(largeur * 8) + "px"

    document.getElementById("image").style.top = String(5 * largeur) + "px"
    document.getElementById("image").style.left = String(3 * largeur) + "px"
    document.getElementById("image").style.width = String(2 * largeur) + "px"
    document.getElementById("image").style.height = String(largeur) + "px"

    document.getElementById("text").style.width = String(4 * largeur) + "px"
    document.getElementById("text").style.top = String(3 * largeur) + "px"
    document.getElementById("text").style.left = String(largeur * 2) + "px"

    document.getElementById("pions_changement").style.top = String(3 * largeur) + "px"
    document.getElementById("pions_changement").style.left = String(3 * largeur) + "px"
    document.getElementById("pions_changement").style.width = String(2 * largeur) + "px"
    document.getElementById("pions_changement").style.height = String(2 * largeur) + "px"

    let Son = document.createElement("img")
    Son.id = "son"
    Son.src = "Image/Autres/soundOff.png"
    Son.style.width = String(largeur) + "px"
    Son.style.height = String(largeur) + "px"
    Son.active = false
    Son.onclick = function(){
        if(Son.active){
            fond.pause()
            Son.src = "Image/Autres/soundOff.png"
            Son.active = false
        }
        else{
            fond.play()
            Son.src = "Image/Autres/soundOn.png"
            Son.active = true
        }
    }
    document.getElementById("son").appendChild(Son)
    tour = 0 
}
function Cava(pion){
    let frame = document.getElementById(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    let pos = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]]
    for(let i = 0; i < pos.length; i++){
        if(test_sur_plateau(pion, pos[i][0], pos[i][1]) && test_case_accessible(pion, pos[i][0], pos[i][1])){
            if(! attaque(pion, pos[i][0], pos[i][1])){
                if(verif_case_echec(pion, -i, i)){
                    case_rose(pion, pos[i][0], pos[i][1])
                }
            }
        }
    }
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}

function je_sais_pas_quoi_mettre(pion, liste){
    for(let i = 0; i < liste.length; i++){
        let k = 1
        if(pion.direction.includes(liste[i][2])){
            while(test_sur_plateau(pion, k * liste[i][0], k * liste[i][1]) && test_case_accessible(pion, k * liste[i][0], k * liste[i][1])){
                if(attaque(pion, k * liste[i][0], k * liste[i][1])){break;}
                if(verif_case_echec(pion, k * liste[i][0], k * liste[i][1])){case_rose(pion, k * liste[i][0], k * liste[i][1])}
                k += 1
            }
        }
    }
}

function Dame(pion){
    let frame = document.getElementById(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    je_sais_pas_quoi_mettre(pion, [[-1, 0, "(h)"], [0, 1, "(b)"], [1, 0, "(d)"], [0, -1, "(g)"], [-1, 1, "(hd)"], [1, 1, "(db)"], [1, -1, "(bg)"], [-1, -1, "(gh)"]])
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}
function Fou(pion){
    let frame = document.getElementById(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    je_sais_pas_quoi_mettre(pion, [[-1, 1, "(hd)"], [1, 1, "(db)"], [1, -1, "(bg)"], [-1, -1, "(gh)"]])
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}
function Pion(pion){
    let frame = document.getElementById(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    switch(pion.id){
        case "bp":
            if(pion.direction.includes("(h)")){
                if(Number(pion.frame[0]) - 1 >= 0 && case_deplacement(pion, -1, 0)){
                    if(verif_case_echec(pion, -1, 0)){case_rose(pion, -1, 0)}
                }
            }
            if(Number(pion.frame[0]) - 1 >= 0 && Number(pion.frame[1]) - 1 >= 0){
                attaque(pion, -1, -1)
            }
            if(Number(pion.frame[0]) - 1 >= 0 && Number(pion.frame[1]) + 1 <= 7){
                attaque(pion, -1, 1)
            }
            if(! pion.move){
                if(pion.direction.includes("(h)")){
                    if(Number(pion.frame[0]) - 2 >= 0 && case_deplacement(pion, -2, 0) && case_deplacement(pion, -1, 0)){
                        if(verif_case_echec(pion, -2, 0)){case_rose(pion, -2, 0)}
                    }
                }
            }
            break;
        case "np":
            if(pion.direction.includes("(b)")){
                if(Number(pion.frame[0]) + 1 <= 7 && case_deplacement(pion, 1, 0)){
                    if(verif_case_echec(pion, 1, 0)){case_rose(pion, 1, 0)}
                }
            }
            if(Number(pion.frame[0]) + 1 <= 7 && Number(pion.frame[1]) - 1 >= 0){
                attaque(pion, 1, -1)
            }
            if(Number(pion.frame[0]) + 1 <= 7 && Number(pion.frame[1]) + 1 <= 7){
                attaque(pion, 1, 1)
            }
            if(! pion.move){
                if(pion.direction.includes("(b)")){
                    if(Number(pion.frame[0]) + 2 <= 7 && case_deplacement(pion, 2, 0) && case_deplacement(pion, 1, 0)){
                        if(verif_case_echec(pion, 2, 0)){case_rose(pion, 2, 0)}
                    }
                }
            }
            break;
    }
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}
function Roi(pion){
    console.log(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    let pos = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
    for(let i = 0; i < pos.length;  i++){
        if(test_sur_plateau(pion, pos[i][0], pos[i][1]) && test_case_accessible(pion, pos[i][0], pos[i][1])){
            attaque(pion, pos[i][0], pos[i][1])
            if(verif_case_echec(pion, pos[i][0], pos[i][1])){case_rose(pion, pos[i][0], pos[i][1])}
        }
    }
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}
function Tour(pion){
    // console.log('enothunctoe')
    let frame = document.getElementById(pion.frame)
    if(pion_adverses.includes(pion)){
        croquer(pion)
        return
    }
    if(tour % 2 == 0 && pion.id[0] == 'n' || tour % 2 == 1 && pion.id[0] == 'b'){return}
    reinitialiser()
    pion_selection = pion
    je_sais_pas_quoi_mettre(pion, [[-1, 0, "(h)"], [0, 1, "(b)"], [1, 0, "(d)"], [0, -1, "(g)"]])
    for(let i = 0; i < pion_adverses.length; i ++){
        pion_adverses[i].src = "Image/Pions/mort.png"
    }
}

function verif_case_echec(pion, i1, i2){
	let frame = document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2)))
    let len = pions_echec.length
    if(pion.id[1] == "r"){
        if((len == 0 && cases_possibles_deplacement_roi.length == 0 )|| cases_possibles_deplacement_roi.includes(frame)){
            console.log("n")
            return true
        }
        return false
    }
	if(len == 0 || (len == 1 && cases_possibles_deplacement.includes(frame))){
		return true
	}
	return false
}

// renvoie true si une la case est sur le plateau
function test_sur_plateau(pion, i1, i2){
    return Number(pion.frame[0]) + i1 >= 0 && Number(pion.frame[0]) + i1 <= 7 && Number(pion.frame[1]) + i2 >= 0 && Number(pion.frame[1]) + i2 <= 7
}
// renvoie true si la case est accessible par le pion (combinaison de case_deplacement() et pion_adverse())
function test_case_accessible(pion, i1, i2){
    return case_deplacement(pion, i1, i2) || pion_adverse(pion, i1, i2)
}
// renvoie true si il n'y a aucun pion sur la case
function case_deplacement(pion, i1, i2){
    
    let frame = document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2)))
    if(frame.pion == null ||frame.pion == pion){
        return true
    }
    return false
}
// renvoie true si il y a un pion adverse sur la case
function pion_adverse(pion, i1, i2){
    if(! case_deplacement(pion, i1, i2)){ // temp
        if(document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2))).pion.id[0] != pion.id[0]){
            return true
        }
    }
    return false
}
// rends la case accessible par le pion selectionné
function case_rose(pion, i1, i2){
    let frame = document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2)))
    if((Number(pion.frame[0]) + i1 + Number(pion.frame[1]) + i2) % 2 == 0){
        croix_blanc(frame)
    }
    else{
        croix_noir(frame)       
    }
    
    frame.couleur = 2
}
// renvoie true si le pion peut etre pris
function attaque(pion, i1, i2){
    let pion_adv = document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2))).pion
    if(pion.id[1] == "r"){
        if(pions_echec.includes(pion_adv) && pions_echec.length < 2){
            document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2))).couleur = 2
            pion_adverses.push(pion_adv)
            return true
        }
        return false
    }
    if(! case_deplacement(pion, i1, i2) && pion_adverse(pion, i1, i2) && ((pions_echec.includes(pion_adv) && pions_echec.length == 1) || pions_echec.length == 0)){
        document.getElementById(String(Number(pion.frame[0]) + i1 + String(Number(pion.frame[1]) + i2))).couleur = 2
        pion_adverses.push(pion_adv)
        return true
    }
    return false
}
// place le pion dans la div pions_morts quand il est pris
function croquer(pion){
    if(pion.id[1] == "r"){
        gagner(pion.id[0])
    }
    deplacement(document.getElementById(pion.frame))
    pion.onclick = function(){return}
    pion.style.position = "static"
    pion.style.top = "0px"
    pion.style.left = "0px"
    if(pion.id[0] == "n"){
        document.getElementById("pions_noirs_morts").appendChild(pion);
    }
    else{
        document.getElementById("pions_blancs_morts").appendChild(pion);
    }
}
// deplace le pion et lance plusieurs fonctions à chaques deplacements
function deplacement(frame){
    if(frame.couleur == 2){
        if(pion_selection.id[1] == 'p' && ! pion_selection.move){pion_selection.move = true}
        pion_selection.style.top = String(Number(frame.id[0]) * largeur) + "px"
        pion_selection.style.left = String(Number(frame.id[1]) * largeur) + "px"
        sonDeplacement(frame)
        dernierDeplacement(frame)
        document.getElementById(pion_selection.frame).pion = null
        frame.pion = pion_selection
        pion_selection.frame = frame.id
        if((pion_selection.frame[0] == "0" && pion_selection.id == "bp") || (pion_selection.frame[0] == "7" && pion_selection.id == "np")){changement_pion(pion_selection)}
        QI()
        tour += 1
        reinitialiser()
        if(tour % 2 == 0){
            echec_gros(document.getElementById("br"))
        }
        else{
            echec_gros(document.getElementById("nr"))
        }
        echec_et_mat()
    }
    
}
// lance un son aléatoire de deplacement ou de mort
function sonDeplacement(frame){
    let SonMove = document.createElement("audio")
    if(frame.pion != null){
        SonMove.src = "Sounds/Pions/mort" + String(Math.floor(Math.random() * 11)) + ".mp3"
    }
    else{
        SonMove.src = "Sounds/move" + String(Math.floor(Math.random() * 7)) + ".mp3"
    }
    SonMove.play()
}
// rends les cases du dernier deplacement jaunes
function dernierDeplacement(frame){
    document.getElementById(pion_selection.frame).couleur = 3
    frame.couleur = 3 
}
// change le QI
function QI(){
    if(tour % 2 == 0){
        QI_blanc += Math.floor(Math.random() * (200) - 100)
        document.getElementById("QI_blanc").innerHTML = "QI : " + String(QI_blanc)
    }
    else{
        QI_noir += Math.floor(Math.random() * (200) - 100)
        document.getElementById("QI_noir").innerHTML = "QI : " + String(QI_noir)
    }
}

///////////////////////////////////////////////////


function limites_plateau(pion, i1, i2){
    let frame = String(Number(pion.frame[0]) + i1) + String(Number(pion.frame[1]) + i2)
    return Number(frame[0]) >= 0 && Number(frame[0]) <= 7 && Number(frame[1]) >= 0 && Number(frame[1]) <= 7
}
function frame_libre(pion, i1, i2){
    let frame = document.getElementById(String(Number(pion.frame[0]) + i1) + String(Number(pion.frame[1]) + i2))
    return frame.pion == null || frame.pion.id[1] == pion.id[1]
}
function pion_ennemi(pion, i1, i2){
    let frame = document.getElementById(String(Number(pion.frame[0]) + i1) + String(Number(pion.frame[1]) + i2))
    if(! frame_libre(pion, i1, i2)){
        return frame.pion.id[0] != pion.id[0]
    }
    return false   
}

function echec_et_mat(){
    if(pions_echec.length == 1){
        let p = document.getElementById('nr')
        if(tour % 2 == 0){
            p = document.getElementById("br")
        }
        let fr = p.frame
        console.log("fr =", fr)
        for(let i = 0; i < cases_possibles_deplacement.length; i++){
            p.frame = cases_possibles_deplacement[i].id
            if(! echec_toutes_directions(p, pion_cible)){
                p.frame = fr
                return
            }
        }
        console.log("fr =", fr)
        p.frame = fr
        if(cases_possibles_deplacement_roi.length == 0){
            if(!echec_toutes_directions(pions_echec[0], petit_echec)){
                if(tour % 2 == 0){
                    gagner('b')
                }
                else{
                    gagner('n')
                }
            }
        }
    }
}

/*
function cible(pion){
    let pos = [[-1, 0, "(h)"], [0, 1, "(d)"], [1, 0, "(b)"], [0, -1, "(g)"], [-1, 1, "(hd)"], [1, 1, "(db)"], [1, -1, "(bg)"], [-1, -1, "(gh)"]]
    for(let i = 0; i < pos.length; i++){
        let k = 1
        let liste = [pos[i][2]]
        while(limites_plateau(pion, k * pos[i][0], k * pos[i][1])){
            liste.push(document.getElementById(String(Number(pion.frame[0]) + k * pos[i][0]) + String(Number(pion.frame[1]) + k * pos[i][1])))
            k += 1
        }
        if(petit_echec(pion, liste)){
            return false
        }
    }
    return true
}*/
function pion_cible(roi, liste){
	for(let i = 1; i < liste.length; i++){
		if(liste[i].pion){
			if(liste[i].pion.id[0] != roi.id[0] || ! met_en_echec(roi, liste[i], liste[0])){
                return false
			}
            return true
		}
	}
}

function echec(roi, liste){
	let pion_temp = null
	for(let i = 1; i < liste.length; i++){
		if(liste[i].pion){
			if(liste[i].pion.id[0] == roi.id[0] || ! met_en_echec(roi, liste[i], liste[0])){
                // le roi n'est pas mis en echec car il y a deux pions innofencifs devant lui
                if(pion_temp){
                    return false
                }
                // il y a un pion innofencif devant le roi
				pion_temp = liste[i].pion
			}
			else{
                // le roi est mis en echec
				if(! pion_temp){
					pions_echec.push(liste[i].pion)
                    for(let k = 1; k < i; k ++){
                        cases_possibles_deplacement.push(liste[k])
                    }
                    return true
				}
                // un pion protege le roi de l'echec
				else{
                    console.log(pion_temp)
					pion_temp.direction = liste[0]
                    return pion_temp
				}
			}
		}
	}
}

function petit_echec(roi, liste){
	for(let i = 1; i < liste.length; i++){
		if(liste[i].pion){
			if(liste[i].pion.id[0] == roi.id[0] || !met_en_echec(roi, liste[i], liste[0])){
                return false
			}
            return true
		}
	}
}

function met_en_echec(roi, frame, dir){
	if(dir == "(c)" && frame.pion.id[1] == "c"){
        return true
    }
    ecart = [Number(roi.frame[0]) - Number(frame.id[0]), Number(roi.frame[1]) - Number(frame.id[1])]
    // console.log(roi.frame, frame, dir, ecart)
    // console.log("")
    if("(h)(d)(b)(g)".includes(dir)){
        
        if(ecart[0] == -1 || ecart[0] == 1 || ecart[1] == 1 || ecart[1] == -1){
            if("dtr".includes(frame.pion.id[1])){
                return true
            }
            if(met_en_echec.caller.name == "pion_cible"){
                if(frame.pion.id[1] == 'p'){
                    return true
                }
            }
        }
        if(met_en_echec.caller.name == "pion_cible"){
            if((ecart[0] == 1 || ecart[0] == 2) && pion.id[1] == 'p'){
                return true
            }
            if((ecart[0] == -1 || ecart[0] == -2) && pion.id[1] == 'p'){
                return true
            }
        }
        if("dt".includes(frame.pion.id[1])){
            return true
        }
    }
    if("(hd)(db)(bg)(gh)".includes(dir)){
        if(ecart[0] == 1  && (ecart[1] == 1 || ecart[1] == -1) && (frame.pion.id[0] == 'n' || frame.pion.id[1] == 'r')){
            if(pion.id[1] == 'r'){
                return true
            }
            if(met_en_echec.caller.name != "pion_cible" && pion.id[1] == 'p'){
                return true
            }
        }
        if(ecart[0] == -1  && (ecart[1] == 1 || ecart[1] == -1) && (frame.pion.id[0] == 'b' || frame.pion.id[1] == 'r')){
            if(pion.id[1] == 'r'){
                return true
            }
            if(met_en_echec.caller.name != "pion_cible" && pion.id[1] == 'p'){
                return true
            }
        }
        if("df".includes(frame.pion.id[1])){
            return true
        }
    }
    return false
}	

function echec_toutes_directions(pion, fonction){
    let pos = [[-1, 0, "(h)"], [0, 1, "(d)"], [1, 0, "(b)"], [0, -1, "(g)"], [-1, 1, "(hd)"], [1, 1, "(db)"], [1, -1, "(bg)"], [-1, -1, "(gh)"]]
    for(let i = 0; i < pos.length; i++){
        let k = 1
        let liste = [pos[i][2]]
        while(limites_plateau(pion, k * pos[i][0], k * pos[i][1])){
            liste.push(document.getElementById(String(Number(pion.frame[0]) + k * pos[i][0]) + String(Number(pion.frame[1]) + k * pos[i][1])))
            k += 1
        }
        if(fonction(pion, liste)){
            return true
        }
    }
    pos = [[-2, -1], [-1, -2], [1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1]]
    for(let i = 0; i < pos.length; i++){
        let frame = document.getElementById(String(Number(pion.frame[0]) + pos[i][0]) + String(Number(pion.frame[1]) + pos[i][1]))
        if(limites_plateau(pion, pos[i][0], pos[i][1]) && frame.pion && frame.pion.id[0] != pion.id[0]){
            if(met_en_echec(pion, frame, "(c)")){
                if(pions_echec.length == 0){
                    pions_echec.push(frame.pion)
                }
                return true
            }
        }
    }
    return false
}

function echec_gros(pion){
    pions_echec = []
    cases_possibles_deplacement = []
    cases_possibles_deplacement_roi = []
    echec_toutes_directions(pion, echec)
    let pos = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
    let frame_origin = document.getElementById(pion.frame)
    frame_origin.pion = null
    for(let i = 0; i < pos.length; i++){
        if(limites_plateau(pion, pos[i][0], pos[i][1])){
            let frame = document.getElementById(String(Number(pion.frame[0]) + pos[i][0]) + String(Number(pion.frame[1]) + pos[i][1]))
            if(!frame.pion){
                frame.pion = pion
                pion.frame = frame.id
                if(! echec_toutes_directions(pion, petit_echec)){
                    cases_possibles_deplacement_roi.push(document.getElementById(pion.frame))
                }
                frame.pion = null
            }
            pion.frame = frame_origin.id
        }
    }
    pion.frame = frame_origin.id
    frame_origin.pion = pion
    console.log("tour", tour)
    console.log("pions_echec :", pions_echec)
    console.log("cases_possibles_deplacement :", cases_possibles_deplacement)
    console.log("cases_possibles_deplacement_roi :", cases_possibles_deplacement_roi)
    console.log("")
}
/////////////////////////////////////////////////////


// lance un son aléatoire si le roi est mis en echec
function son_echec(){
    let son = document.createElement("audio")
    son.src = "Sounds/echec" + String(Math.floor(Math.random() * 19)) + ".mp3"
    son.play()
}
// reinitialise toutes les cases
function reinitialiser(){
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            let frame = document.getElementById(String(i) + String(j))
                if(frame.couleur == 2){
                    frame.couleur = (i+j) % 2
                }
                if(frame.couleur == 0){
                    reinitialiser_case_blanc(frame)
                }
                if(frame.couleur == 1){
                    reinitialiser_case_noir(frame)
                }   
                if(frame.couleur == 3){
                    frame.couleur = (i+j) % 2
                    if(case_active){
                        case_jaune(frame)
                    }
                    else{
                        if(frame.couleur == 0){
                            reinitialiser_case_blanc(frame)
                        }
                        if(frame.couleur == 1){
                            reinitialiser_case_noir(frame)
                        }   
                    }
                }
        }
    }
    for(let i = 0; i < pion_adverses.length; i ++){
        if(pion_adverses[i].id[0] == 'n'){pion_adverses[i].src = "Image/Pions/" + String(pion_adverses[i].id) + ".png"}   
        else{pion_adverses[i].src = "Image/Pions/" + String(pion_adverses[i].id) + ".png"}
    }

    if(reinitialiser.caller.name == "deplacement"){
        for(let pion of liste_pions){
            pion.direction = "(h)(hd)(d)(db)(b)(bg)(g)(gh)"
        }
        pion_adverses = []
    }   
}
// reinitialise une case blanche
function reinitialiser_case_blanc(frame){
    if(Math.floor(Math.random() * 10000) > 0){
        frame.src = "Image/Cases/case_blanc.png"
    }
    else{
        if(Math.floor(Math.random() * 100) > 0){
            frame.src = "Image/Cases/berthelon_blanc.png"
        }
        else{
            frame.src = "Image/Cases/prof_jaquot.png"
        }
    }
}
// reinitialise une case noire
function reinitialiser_case_noir(frame){
    if(Math.floor(Math.random() * 10000) > 0){
        frame.src = "Image/Cases/case_noir.png"
    }
    else{
        if(Math.floor(Math.random() * 100) > 0){
            frame.src = "Image/Cases/berthelon_noir.png"
        }
        else{
            frame.src = "Image/Cases/prof_jaquot.png"
        }
    }
}
function case_jaune(frame){
    if(Math.floor(Math.random() * 10000) > 0){
        frame.src = "Image/Cases/case_jaune.png"
    }
    else{
        if(Math.floor(Math.random() * 100) > 0){
            frame.src = "Image/Cases/berthelon_jaune.png"
        }
        else{
            frame.src = "Image/Cases/prof_jaquot.png"
        }
    }
}
function croix_noir(frame){
    if(Math.floor(Math.random() * 10000) > 0){
        frame.src = "Image/Cases/croix_noir.png"
    }
    else{
        if(Math.floor(Math.random() * 100) > 0){
            frame.src = "Image/Cases/berthelon_croix_noir.png"
        }
        else{
            frame.src = "Image/Cases/prof_jaquot.png"
        }
    }
}
function croix_blanc(frame){
    if(Math.floor(Math.random() * 10000) > 0){
        frame.src = "Image/Cases/croix_blanc.png"
    }
    else{
        if(Math.floor(Math.random() * 100) > 0){
            frame.src = "Image/Cases/berthelon_croix_blanc.png"
        }
        else{
            frame.src = "Image/Cases/prof_jaquot.png"
        }
    }
}
// permet de changer le pion quand il atteint le bout du plateau
function changement_pion(pion){
    let pions = ["d", "t", "c", "f"]
    document.getElementById("canvas").style.zIndex = "2"

    document.getElementById("pions_changement").style.zIndex = "2"
    pions_changement = document.getElementsByClassName("pions_changement")

    for (let i = 0; i < pions_changement.length; i++) {
        pions_changement[i].style.width = String(largeur) + "px"
        if(pion.id[0] == "b"){
            pions_changement[i].src = "Image/Pions/b" + pions[i] + ".png"
        }
        else{
            pions_changement[i].src = "Image/Pions/n" + pions[i] + ".png"
        }
        
        pions_changement[i].onclick = function(){
            let pions = ["d", "t", "c", "f"]
            pion.src = this.src
            pion.id = pion.id[0] + pions[Number(this.id) - 1]
            switch(this.id){
                case "1":
                    pion.onclick = function(){Dame(this)}
                    break;
                case "2":
                    pion.onclick = function(){Tour(this)}
                    break;
                case "3":
                    pion.onclick = function(){Cava(this)}
                    break;
                case "4":
                    pion.onclick = function(){Fou(this)}
                    break;
            }
            document.getElementById("canvas").style.zIndex = "-1"
            document.getElementById("pions_changement").style.zIndex = "-1"
        }
    }
    if(tour % 2 == 0){
        echec_gros(document.getElementById("br"))
    }
    else{
        echec_gros(document.getElementById("nr"))
    }
    echec_et_mat()
}

// affiche la vainqueur
function gagner(couleur){
    let canvas = document.getElementById("canvas")
    canvas.style.zIndex = "2"

    let image = document.getElementById("image")
    image.style.zIndex = "2"
    image.onclick = function(){rejouer()}

    let text = document.getElementById("text")
    text.style.fontSize = String(largeur / 2) + "px"
    text.style.zIndex = "2"
    if(couleur == "b"){
        text.innerHTML = "VICTOIRE DES NOIRS !"
    }
    else{
        text.innerHTML = "VICTOIRE DES BLANCS !"
    }
}
// reinitialise tout le jeu
function rejouer(){
    document.getElementById("QI_blanc").innerHTML = "QI : "
    document.getElementById("QI_noir").innerHTML = "QI : "
    QI_blanc = 100
    QI_noir = 100
    document.getElementById("image").style.zIndex = "-1"
    document.getElementById("canvas").style.zIndex = "-1"
    document.getElementById("text").style.zIndex = "-1"
    document.getElementById("pions_changement").style.zIndex = "-1"
    let images = document.getElementsByTagName("img")
    l = images.length
    // console.log(images[5])
    for (let i = 5; i < l; i++) {
        images[5].remove()
    }
    pions_echec = []
    cases_possibles_deplacement = []
    cases_possibles_deplacement_roi = []
    Initialisation()
}

Initialisation()