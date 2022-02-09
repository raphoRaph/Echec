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