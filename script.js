var pole = "a1";
var image = "./chessboard.png";

function zmienFigure(figura) {
    image = "./" + figura + ".png";

    return figura;
}

function ustawPole(numer) {
    var litery = "abcdefgh";
    var liczby = "12345678"

    var liczba1 = Math.floor(numer/9);

    var liczba2 = numer - liczba1;

    pole = litery[liczba1] + liczby[liczba2];

    return pole;
}

function figura() {
    document.getElementById(pole).style.backgroundImage = "url(" + file + ")";
    return document.getElementById(pole).style.backgroundImage;
}

zmienFigure("rook");
ustawPole(5);
figura();

zmienFigure("queen");
ustawPole(62);
figura();