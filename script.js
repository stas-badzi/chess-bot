var pole = "a1";
var file = "./chessboard.png";

function zmienFigure(figura,white) {
    if (white) {
        file = "./pieces/" + figura + ".png";
    } else {
        file = "./pieces/" + figura + "b.png";
    }
    

    return figura;
}

function ustawPole(numer) {
    var litery = "abcdefgh";
    var liczby = "12345678"

    var liczba1 = Math.floor(numer/8);

    var liczba2 = numer - (liczba1*8);

    console.log(liczba1 + "," + liczba2)

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