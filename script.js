var chessboard = [
/*     a    b    c    d    e    f    g    h */
/*#1*/'5' ,'3' ,'4' ,'1' ,'6' ,'4' ,'3' ,'5' ,
/*#2*/'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,
/*#3*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
/*#4*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
/*#5*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
/*#6*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
/*#7*/'-2','-2','-2','-2','-2','-2','-2','-2',
/*#8*/'-5','-3','-4','-1','-6','-4','-3','-5'
]
var pole = "a1";
var file = "./chessboard.png";

function displayChessboard() {
    for (let i = 0; i < chessboard.length; i++) {
        zmienFigure(chessboard[i]);
        ustawPole(i);
        figura();
    }
}

function move(from, to) {
    let pola = {
        a:0,
        b:1,
        c:2,
        d:3,
        e:4,
        f:5,
        g:6,
        h:7
    }

    let x1 = pola[ from[0] ];
    let y1 = from[1] - 1;

    let x2 = pola[ to[0] ];
    let y2 = to[1] - 1;

    let remove = x1 + y1*8;
    let place = x2 + y2*8;

    let litery = "abcdefgh";
    let liczby = "12345678"
    console.log(litery[x1],liczby[y1],' ',litery[x1],liczby[y2]);

    chessboard[place] = chessboard[remove];
    chessboard[remove] = '0';

    return chessboard[place];
}

function zmienFigure(figura) {
    let figury = {
        '0': 'empty',
        '1': 'king',
        '2': 'pawn',
        '3': 'knite',
        '4': 'bishop',
        '5': 'rook',
        '6': 'queen',

        '-1': 'kingb',
        '-2': 'pawnb',
        '-3': 'kniteb',
        '-4': 'bishopb',
        '-5': 'rookb',
        '-6': 'queenb'
    }
    
        file = "./pieces/" + figury[figura] + ".png";

    return file;
}

function ustawPole(numer) {
    let litery = "abcdefgh";
    let liczby = "12345678"

    let liczba1 = Math.floor(numer/8);

    let liczba2 = numer - (liczba1*8);

    pole = litery[liczba2] + liczby[liczba1];

    return pole;
}

function figura() {
    document.getElementById(pole).style.backgroundImage = "url(" + file + ")";
    return document.getElementById(pole).style.backgroundImage;
}

/*zmienFigure(5);
ustawPole(5);
figura();

zmienFigure(-6);
ustawPole(62);
figura();*/

var display = setInterval(displayChessboard(),1000);