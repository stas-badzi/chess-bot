var chessboard = [
    /*     a    b    c    d    e    f    g    h */
    /*#1*/'5' ,'3' ,'4' ,'6' ,'1' ,'4' ,'3' ,'5' ,
    /*#2*/'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,'2' ,
    /*#3*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
    /*#4*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
    /*#5*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
    /*#6*/'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,'0' ,
    /*#7*/'-2','-2','-2','-2','-2','-2','-2','-2',
    /*#8*/'-5','-3','-4','-6','-1','-4','-3','-5'
    ]
    var castles = [true,true,true,true];
    var isWhiteMove = true;
    var noChangeMoves = 0;
    var blackMoves = 1;
    var enPassant = '-';
    var pole = "a1";
    var file = "./chessboard.png";
    var type = 0;
    var move1 = "";
    var move2 = "";
    var evaluation = 0;
    document.addEventListener("keydown", keyPressed);
    displayChessboard();

    document.addEventListener("DOMContentLoaded", function() {
        var loop = setInterval(tick,100);
    })
        

    setup();




    // **********************************************************

    function setup() {
        let squares = document.getElementsByClassName("square");
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener("mousedown",clickedSquare);
        }
    }

    function encode(input) {
        let out = "";
        let characters = {
            '1':'a',
            '2':'b',
            '3':'c',
            '4':'d',
            '5':'e',
            '6':'f',
            '7':'g',
            '8':'h',
            '9':'i',
            '0':'j',
            'k':'k',
            'p':'l',
            'n':'m',
            'b':'n',
            'r':'o',
            'q':'p',
            'K':'q',
            'P':'r',
            'N':'s',
            'B':'t',
            'R':'u',
            'Q':'v',
            '/':'w',
            'w':'x',
            '-':'y',
            ' ':'z'

        }

        for (let i = 0; i < input.length; i++) {
            out += characters[input[i]];
        }
        return out;
    }

    function decode(input) {
        let out = "";
        let characters = {
            'a':'1',
            'b':'2',
            'c':'3',
            'd':'4',
            'e':'5',
            'f':'6',
            'g':'7',
            'h':'8',
            'i':'9',
            'j':'0',
            'k':'k',
            'l':'p',
            'm':'n',
            'n':'b',
            'o':'r',
            'p':'q',
            'q':'K',
            'r':'P',
            's':'N',
            't':'B',
            'u':'R',
            'v':'Q',
            'w':'/',
            'x':'w',
            'y':'-',
            'z':' '
        }

        for (let i = 0; i < input.length; i++) {
            out += characters[input[i]];
        }
        return out;
    }

    function clickedSquare(event) {
        console.log("clicked:",event.pageX,event.pageY);
    }

    function tick() {
        //getEval(fen);
        //console.log(fen);
        //getEvaluation(fen);
        document.getElementById("eval_text").innerHTML = evaluation;
        document.getElementById("eval_text").style.bottom = 5*(10+evaluation)-3 + "%";
        document.getElementById("variable_bar").style.height = 5*(10+evaluation) + "%";
    }

    function getFEN() {
        let empty = 0;
        let out = "";
        for (let i = 7; i >= 0; i--) {
            for (let j = 0; j < 8; j++) {
                if (chessboard[8*i + j] == '0') {
                    empty += 1;
                } else {
                    if (empty > 0) {
                        out += (empty);
                        empty = 0;
                    }
                    let num = chessboard[8*i + j];
                    let figures = {};
                    if (num > 0) {
                        figures = {
                            1:'K',
                            2:'P',
                            3:'N',
                            4:'B',
                            5:'R',
                            6:'Q'
                        };
                    } else {
                        figures = {
                            1:'k',
                            2:'p',
                            3:'n',
                            4:'b',
                            5:'r',
                            6:'q'
                        };
                    }
                    num = Math.abs(num);
                    out += (figures[num]);
                }
            }
            if (empty > 0) {
                out += (empty);
                empty = 0;
            }
            if (i > 0) {
                out += ('/');
            }
        }

        out += ' ';
        if (isWhiteMove) {
            out += ('w');
        } else {
            out += ('b');
        }
        out += (' ');
        if (castles[0]) {
            out += ('K');
        }
        if (castles[1]) {
            out += ('Q');
        }
        if (castles[2]) {
            out += ('k');
        }
        if (castles[3]) {
            out += ('q');
        }
        if (!castles[0] && !castles[1] && !castles[2] && !castles[3]) {
            out += ('-');
        }
        out += (' ');
        out += (enPassant);
        out += (' ')
        out += (noChangeMoves);
        out += (' ')
        out += (blackMoves);

        return out;
    }

    async function generateEval(fen) {
        //const baseURL = window.location.host;
        const res = await fetch('/stockfish/post',{
            method: 'POST',
            Headers: {
                "Content-Type": 'application.json'
            },
            body: JSON.stringify({
                parcel: fen
            })
        })
        console.log(res);
    }

    async function getEval(dynamic) {
        const baseURL = window.location.host;
        const res = await fetch('/stockfish/' + encode(dynamic),{
            method: 'GET'
        })
        console.log(res);
        const data = await res.json();
        evaluation = data.evaluation;
        return evaluation;
    }

    
    function displayChessboard() {
        for (let i = 0; i < chessboard.length; i++) {
            zmienFigure(chessboard[i]);
            ustawPole(i);
            figura();
        }
        let fen = getFEN();
        getEval(fen);
    }

    function toIntiger(str) {
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
        let x = pola[ str[0] ];
        let y = str[1] - 1;    
        let out = x + y*8;
        return out;
    }

    function toNotation(int) {
        let litery = "abcdefgh";
        let liczby = "12345678"
    
        let x = Math.floor(int/8);
    
        let y = int - (x*8);
    
        out = litery[y] + liczby[x];
    
        return out;
    }

    function findMoves(position) {
        let pos = position;

        if (isNaN(position)) {
            pos = toIntiger(position);
        }
        let white = chessboard[pos] > 0;
        let num = pos;
        let moves = [];
        if (chessboard[pos] == 0) {
            return moves;
        }
        if (Math.abs(chessboard[pos]) == 1) {
            let x = Math.floor(pos/8);
            let y = pos - (x*8);

            if (x > 0) {
                if (y > 0) {
                    num = pos - 9;
                    if (white) {
                        if (chessboard[num] <= 0) {
                            moves.push(num);
                        }
                    } else if (chessboard[num] >= 0) {
                        moves.push(num);
                    }
                }

                num = pos - 8;
                if (white) {
                    if (chessboard[num] <= 0) {
                        moves.push(num);
                    }
                } else if (chessboard[num] >= 0) {
                    moves.push(num);
                }

                if (y < 7) {
                    num = pos - 7;
                    if (white) {
                        if (chessboard[num] <= 0) {
                            moves.push(num);
                        }
                    } else if (chessboard[num] >= 0) {
                        moves.push(num);
                    }
                }
            }

            if (y > 0) {
                num = pos - 1;
                if (white) {
                    if (chessboard[num] <= 0) {
                        moves.push(num);
                    }
                } else if (chessboard[num] >= 0) {
                    moves.push(num);
                }
            }

            if (y < 7) {
                num = pos + 1;
                if (white) {
                    if (chessboard[num] <= 0) {
                        moves.push(num);
                    }
                } else if (chessboard[num] >= 0) {
                    moves.push(num);
                }
            }

            if (x < 7) {
                if (y > 0) {
                    num = pos + 7;
                    if (white) {
                        if (chessboard[num] <= 0) {
                            moves.push(num);
                        }
                    } else if (chessboard[num] >= 0) {
                        moves.push(num);
                    }
                }

                num = pos + 8;
                if (white) {
                    if (chessboard[num] <= 0) {
                        moves.push(num);
                    }
                } else if (chessboard[num] >= 0) {
                    moves.push(num);
                }

                if (y < 7) {
                    num = pos + 9;
                    if (white) {
                        if (chessboard[num] <= 0) {
                            moves.push(num);
                        }
                    } else if (chessboard[num] >= 0) {
                        moves.push(num);
                    }
                }
            }

            return moves;
        }
    }
    
    function move(from, to) {
        let remove = from;
        if (isNaN(from)) {
            remove = toIntiger(from);
        }

        let place = to;
        if (isNaN(to)) {
            place = toIntiger(to);
        }
    
        //let litery = "abcdefgh";
        //let liczby = "12345678";
        //console.log(litery[x1] + liczby[y1],litery[x1] + liczby[y2]);

        if (chessboard[remove] == '0') {
            return 0;
        }
    
        chessboard[place] = chessboard[remove];
        chessboard[remove] = '0';
    
        displayChessboard();
        return chessboard[place];
    }

    function spawn(fig, pos) {
        let place = pos;
        if (isNaN(pos)) {
            place = toIntiger(pos);
        }
    
        //let litery = "abcdefgh";
        //let liczby = "12345678";
        //console.log(litery[x1] + liczby[y1],litery[x1] + liczby[y2]);
    
        chessboard[place] = fig;
    
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
        
            file = "./src/pieces/" + figury[figura] + ".png";
    
        return file;
    }
    
    function ustawPole(numer) {
        pole = numer;
        if (!isNaN(numer)) {
            pole = toNotation(numer);
        }
    
        return pole;
    }
    
    function figura() {
        document.getElementById(pole).style.backgroundImage = "url(" + file + ")";
        return document.getElementById(pole).style.backgroundImage;
    }
    
    function keyPressed(event) {
        let button = event.key; 
        //console.log(button);
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
                    let litery = "abcdefgh";
                    if (litery.includes(move1[0])) {
                        move(move1,move2);
                    } else if (move1 == 'moves') {
                        console.log(findMoves(move2))
                    } else {
                        spawn(move1,move2);
                    }
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
                let text = document.getElementById('input_text').innerHTML;
                document.getElementById('input_text').innerHTML = text.substring(0,text.length - 1);
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