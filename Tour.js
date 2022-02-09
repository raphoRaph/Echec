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
