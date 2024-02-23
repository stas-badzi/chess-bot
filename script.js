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
    var type = 0;
    var move1 = "";
    var move2 = "";
    document.addEventListener("keydown", keyPressed);
    displayChessboard();
    
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
        let liczby = "12345678";
        //console.log(litery[x1] + liczby[y1],litery[x1] + liczby[y2]);

        if (chessboard[remove] == '0') {
            return 0;
        }
    
        chessboard[place] = chessboard[remove];
        chessboard[remove] = '0';
    
        displayChessboard();
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
    
    function keyPressed(event) {
        let button = event.key; 
        console.log(button);
        if (button == 'Escape') {
            document.getElementById('input_text').innerHTML = 'Enter to type';
            move1 = '';
            move2 = '';
            type = 0;
        }
        if (button == 'Enter') {
            if (type > 0) {
                if (type == 1) {
                    move1 = document.getElementById('input_text').innerHTML;
                    document.getElementById('input_text').innerHTML = '';
                    type = 2;
                } else {
                    move2 = document.getElementById('input_text').innerHTML;
                    document.getElementById('input_text').innerHTML = 'Enter to type';
                    move(move1,move2);
                    move1 = '';
                    move2 = '';
                    type = 0;
                }
            } else {
                document.getElementById('input_text').innerHTML = '';
                type = 1;
            }
            
        } else if (type > 0) {
            if (button == 'Backspace') {
                document.getElementById('input_text').innerHTML.slice(0, -1);
            } else if (button.length == 1) {
                document.getElementById('input_text').innerHTML += button;
            }
        }
    }
    
    /*zmienFigure(5);
    ustawPole(5);
    figura();
    
    zmienFigure(-6);
    ustawPole(62);
    figura();*/