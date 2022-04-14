/*
// Carnet

// Book A RESIZE
<svg width="208px" height="256px" viewBox="0 0 208 256">
<path d="M205.82,196.86V2H35.8C17.53,2,2,16.72,2,35c0,0,0,184.49,0,186c0,17.87,14.42,32.19,32.08,32.9v0.1h171.74v-9.29
	c-13.23,0-23.93-10.7-23.93-23.93C181.89,207.56,192.59,196.86,205.82,196.86z M98.76,94.21H90.5V83.22h6.33
	c0,0-7.69-14.48-7.69-16.17c0-4.74,3.86-8.64,8.68-8.64c2.45,0,4.67,1.03,6.27,2.68V50.47h-5.23v-4.94h5.23v-5.64h4.96v5.64h5.24
	v4.94h-5.24v10.57c1.6-1.65,3.77-2.63,6.23-2.63c4.76,0,8.68,3.85,8.68,8.64c0,1.74-7.5,16.17-7.5,16.17h5.99v10.99h-8.07
	c-0.28,2.82-0.47,3.25-0.47,6.21c0,14.47,6.32,20.63,16.28,31.53l-3.78,12.73H86.49l-3.68-12.59c10.01-10.9,16.42-17.2,16.42-31.67
	C99.23,97.46,99.09,97.03,98.76,94.21z M78,148.49h57V160H78V148.49z M172.6,220.68c0,9.39,4.04,17.87,10.3,23.93H35.4
	c-13.23,0.1-24.03-10.7-24.03-23.93c0-12.52,9.79-22.81,22.11-23.72l149.72-0.31C176.74,202.71,172.6,211.19,172.6,220.68z"/>
</svg>


// Carnet
// Settings
    clip-path: path('M43.454,18.443h-2.437c-0.453-1.766-1.16-3.42-2.082-4.933l1.752-1.756c0.473-0.473,0.733-1.104,0.733-1.774 c0-0.669-0.262-1.301-0.733-1.773l-2.92-2.917c-0.947-0.948-2.602-0.947-3.545-0.001l-1.826,1.815 C30.9,6.232,29.296,5.56,27.529,5.128V2.52c0-1.383-1.105-2.52-2.488-2.52h-4.128c-1.383,0-2.471,1.137-2.471,2.52v2.607 c-1.766,0.431-3.38,1.104-4.878,1.977l-1.825-1.815c-0.946-0.948-2.602-0.947-3.551-0.001L5.27,8.205 C4.802,8.672,4.535,9.318,4.535,9.978c0,0.669,0.259,1.299,0.733,1.772l1.752,1.76c-0.921,1.513-1.629,3.167-2.081,4.933H2.501 C1.117,18.443,0,19.555,0,20.935v4.125c0,1.384,1.117,2.471,2.501,2.471h2.438c0.452,1.766,1.159,3.43,2.079,4.943l-1.752,1.763 c-0.474,0.473-0.734,1.106-0.734,1.776s0.261,1.303,0.734,1.776l2.92,2.919c0.474,0.473,1.103,0.733,1.772,0.733 s1.299-0.261,1.773-0.733l1.833-1.816c1.498,0.873,3.112,1.545,4.878,1.978v2.604c0,1.383,1.088,2.498,2.471,2.498h4.128 c1.383,0,2.488-1.115,2.488-2.498v-2.605c1.767-0.432,3.371-1.104,4.869-1.977l1.817,1.812c0.474,0.475,1.104,0.735,1.775,0.735 c0.67,0,1.301-0.261,1.774-0.733l2.92-2.917c0.473-0.472,0.732-1.103,0.734-1.772c0-0.67-0.262-1.299-0.734-1.773l-1.75-1.77 c0.92-1.514,1.627-3.179,2.08-4.943h2.438c1.383,0,2.52-1.087,2.52-2.471v-4.125C45.973,19.555,44.837,18.443,43.454,18.443z M22.976,30.85c-4.378,0-7.928-3.517-7.928-7.852c0-4.338,3.55-7.85,7.928-7.85c4.379,0,7.931,3.512,7.931,7.85 C30.906,27.334,27.355,30.85,22.976,30.85z')

*/
// Fin Carnet

const all_color_carnet = [
    ["#BA493D"],
    ["#AD6AD4"],
    ["#5E70F6"],
    ["#D8B600"],
    ["#CA36C4"],
    ["#8BB700"],
    ["#EB8B2D"],
    ["#4AC6CB"],
    ["#D6226E"],
    ["#662D91"],
    ["#2D7091"],
    ["#403E3E"],
    ["#403E3E"]
]
const point = "M35,97 l-34,-23 0,-65 q0,-9 7,-9 l52,0 q10,0 10,11 l0,61 -35,25 z"
const point_ = "M35,61 l-34,0 0,-52 q0,-9 7,-9 l52,0 q10,0 10,11 l0,50 -35,0z"

var page = 1;
var tourne = false
document.getElementById("Livre").style.visibility = "hidden" // Livre invisible
// Boutton pour fermer la Carnet
var Img_quit = document.getElementById("quit");
Img_quit.addEventListener('mouseover', function() {
    Img_quit.src = "Image/quit_hover.png"
});
Img_quit.addEventListener('mouseout', function(){
    Img_quit.src = "Image/quit.png"
});
// Boutton pour tourner la page à Gauche
var Img_gauche = document.getElementById("fleche_gauche");
Img_gauche.addEventListener('mouseover', function() {
    Img_gauche.src = "Image/fleche_hover.png"
});
Img_gauche.addEventListener('mouseout', function(){
    Img_gauche.src = "Image/fleche.png"
});
// Boutton pour tourner la page à Droite
var Img_droite = document.getElementById("fleche_droite");
Img_droite.addEventListener('mouseover', function() {
    Img_droite.src = "Image/fleche_hover.png"
    Img_droite.style.transform = "rotate(180deg)"
});
Img_droite.addEventListener('mouseout', function(){
    Img_droite.src = "Image/fleche.png"
    Img_droite.style.transform = "rotate(180deg)"
});

// Pour tourner la page à Gauche
function tourne_gauche(){
    if(page > 1){
        a_page(page - 1)
    }
}
// Pour tourner la page à Droite
function tourne_droit(){
    if(page < 13){
        a_page(page + 1)
    }
    
}
// Pour tourner à la page h
function a_page(h){
    for (let i = 1; i < 14; i++) {
        document.getElementById("p"+ String(i)).style.visibility = "hidden";
        let change = document.getElementById("pa" + String(i))
        change.setAttribute('d',point_)            
    }
    document.getElementById("p"+ String(h)).style.visibility = "visible";
    let change = document.getElementById("pa" + String(h))
    change.setAttribute('d',point) 
    document.getElementById("milieu").style.backgroundColor = String(all_color_carnet[(h - 1)])
    page = h
}
// Pour ouvrir le Carnet
function menu(){
    tourne = true
    document.getElementById("Livre").style.visibility = "visible"
    document.getElementById("Jeu").style.visibility = "hidden"
    document.getElementById("open").style.visibility = "hidden"
    document.getElementById("milieu").style.visibility = 'visible'
    document.getElementById("milieu").style.backgroundColor = String(all_color_carnet[(page - 1)])
    for (let i = 1; i < 14; i++) {
        document.getElementById("p" + String(i)).style.visibility = "hidden"
        
    }
    document.getElementById("p" + String(page)).style.visibility = "visible"
    let change = document.getElementById("pa" + String(page))
    change.setAttribute('d',point) 

}
// Pour fermer le Carnet
function quit(){
    tourne = false
    document.getElementById("Livre").style.visibility = "hidden"
    document.getElementById("Jeu").style.visibility = "visible"
    document.getElementById("open").style.visibility = "visible"
    document.getElementById("p" + String(page)).style.visibility = "hidden"
    let change = document.getElementById("pa" + String(page))
    change.setAttribute('d',point_)
    document.getElementById("milieu").style.visibility = 'hidden' 
}
// Pour avoir les flèches comme tourne page
function getKeyAndMove(e){		
    if (tourne){
        let key_code=e.which||e.keyCode;
        switch(key_code){
            case 37: //Flèche de gauche
                tourne_gauche();
                break;
            case 39: //Flèche de droite
                tourne_droit();
                break;						
        }
    }		
    
}
