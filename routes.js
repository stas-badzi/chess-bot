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

var express = require("express");

var fs = require("node:fs");

var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var evaluation = 0;
var neweval = false;

fs.writeFileSync('./node_modules/stockfishget-linux/src/input.in', "1\neval startpos");
var send = false;

var loop = setInterval(function(){
    if (send) {
        let text = "1\neval fen " + fen;
        fs.writeFileSync('./node_modules/stockfishget-linux/src/input.in', text);
        send = false;
    } else {
        let out;
        out = fs.readFileSync('./node_modules/stockfishget-linux/src/output.out', 'utf-8');
        if (out && out[0] != '0') {
            if (out[0] == '1') {
                let val = "";
                for (let i = 2; i < out.length && ((!isNaN(out[i]) && i < 6) || out[i] == '.' || (out[i] == '-' && i == 2)); i++) {
                    val += out[i];
                }
                if (evaluation != JSON.parse(val)) {
                    evaluation = JSON.parse(val);
                    neweval = true;
                }
            } else {
                let err = "";
                for (let i = 2; i < out.length; ++i) {
                    err += out[i];
                }
                console.log('Error:\n' + out);
            }
            send = true;
            fs.writeFileSync('./node_modules/stockfishget-linux/src/output.out', '0');
        }
    }
},1)

var router = express.Router();

router.get("/stockfish/:dynamic",function(req,res){
    const { dynamic } = req.params;
    fen = decode(dynamic);
    if (neweval) {console.log(evaluation); neweval = false;}
    res.status(200).json({
        'evaluation': evaluation
    })
})

router.get("/",function(req,res){
    console.log("Generating window...");
    res.render("index");
})

module.exports = router;