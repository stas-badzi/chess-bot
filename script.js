var chessboard = [
/*    a b c d e f g h */
/*#1*/5,3,4,1,6,4,3,5,
/*#2*/2,2,2,2,2,2,2,2,
/*#3*/0,0,0,0,0,0,0,0,
/*#4*/0,0,0,0,0,0,0,0,
/*#5*/0,0,0,0,0,0,0,0,
/*#6*/0,0,0,0,0,0,0,0,
/*#7*/-2,-2,-2,-2,-2,-2,-2,-2,
/*#8*/-5,-3,-4,-1,-6,-4,-3,-5
]
var pole = "a1";
var file = "./chessboard.png";

function displayChessboard() {
    for (let i = 0; i < chessboard.length; i++) {
        zmienFigure()
    }
}

function zmienFigure(figura,white) {
    let figury = {
        0: 'empty'
        1: 'a1'
    }
    if (white) {
        file = "./pieces/" + figura + ".png";
    } else {
        file = "./pieces/" + figura + "b.png";
    }
    

    return figura;
}

function ustawPole(numer) {
    let litery = "abcdefgh";
    let liczby = "12345678"

    let liczba1 = Math.floor(numer/8);

    let liczba2 = numer - (liczba1*8);

    pole = litery[liczba1] + liczby[liczba2];

    return pole;
}

function figura() {
    document.getElementById(pole).style.backgroundImage = "url(" + file + ")";
    return document.getElementById(pole).style.backgroundImage;
}

zmienFigure("rook",true);
ustawPole(5);
figura();

zmienFigure("queen",false);
ustawPole(62);
figura();

setInterval(displayChessboard(),1000);