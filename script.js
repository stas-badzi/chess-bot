var pole = "a1";
var image = "./chessboard.png";

function zmienFigure(figura) {
    image = "./" + figura + ".png";

    return figura;
}

function ustawPole(numer) {

    var liczba1 = Math.floor(numer/9);

    var litera1 = 'a';
    litera1 += liczba1;

    var liczba2 = numer - liczba1;

    var litera2 = '1';
    litera2 += liczba2;

    

    pole = "" + litera1 + litera2;

    return litera2;
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