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