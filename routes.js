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

var path = require("path");
var { Worker } = require("node:worker_threads");
//var stockfish = require("stockfish.js");

var fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/w KQkq - 0 1";
var evaluation = 0.0;

//var tick = setInterval(getEvaluation,10000);

function getEvaluation() {
    /*
    stockfish.ready((work) => {
        let evaluations = [];

        work.addMessageListener((message) => {
            if (message.startsWith("info depth 10")) {
                let multipvIndex = message.indexOf("multipv");
                if (multipvIndex != -1) {
                    let multipvString = message.slice(multipvIndex).split(" ")[1];
                    let multipv = parseInt(multipvString);
                    let scoreIndex = indexOf("score cp");
                    if (scoreIndex != -1) {
                        let scoreString = message.slice(scoreIndex).split(" ")[2];
                        let this_evaluation = parseInt(scoreString)/100;
                        this_evaluation = isWhiteMove ? this_evaluation : this_evaluation * -1;
                        evaluations[multipv-1] = this_evaluation;
                    } else {
                        scoreIndex = message.indexOf("score mate");
                        let scoreString = message.slice(scoreIndex).split(" ")[2];
                        let evaluation = parseInt(scoreString);
                        evaluation = Math.abs(evaluation);
                        evaluations[multipv-1] = 'M' + this_evaluation;
                    }
                    let pvIndex = message.indexOf(" pv ")
                    if (pvIndex != -1) {
                        let pvString = message.slice(pvIndex + 4).split(" ");
                        if (evaluations.length == 1) {
                            let eval = evaluations[0];
                            return eval;
                        }
                    }
                }
            }
        })
        
        work.postMessage("uci");
        work.postMessage("isready");
        work.postMessage("ucinewgame");
        work.postMessage("setoption name multipv value 3");
        work.postMessage("position fen " + fen);
        work.postMessage("go depth 10");
    })//*/

    //let engine = stockfish();

    //"/*
    const engine = new Worker("./node_modules/stockfish/src/stockfish-nnue-16.js");
    console.log("Starting stockfish...");
    let evaluations = [];

    engine.postMessage({
        cmd: "run",
        arg: "uci"
    });
    engine.postMessage({
        cmd: "run",
        arg: "isready"
    });
    engine.postMessage({
        cmd: "run",
        arg: "ucinewgame"
    });
    engine.postMessage({
        cmd: "run",
        arg: "setoption name multipv value 3"
    });
    let fentext = "position fen " + fen;
    engine.postMessage({
        cmd: "run",
        arg: fentext
    });
    engine.postMessage({
        cmd: "run",
        arg: "eval depth 10"
    });

    engine.onmessage = (e) => {
        let message = e.data ? e.data : e;
        console.log("parsing data:",e);
        if (message.startsWith("info depth 10")) {
            let multipvIndex = message.indexOf("multipv");
            if (multipvIndex != -1) {
                let multipvString = message.slice(multipvIndex).split(" ")[1];
                let multipv = parseInt(multipvString);
                let scoreIndex = indexOf("score cp");
                if (scoreIndex != -1) {
                    let scoreString = message.slice(scoreIndex).split(" ")[2];
                    let this_evaluation = parseInt(scoreString)/100;
                    this_evaluation = isWhiteMove ? this_evaluation : this_evaluation * -1;
                    evaluations[multipv-1] = this_evaluation;
                } else {
                    scoreIndex = message.indexOf("score mate");
                    let scoreString = message.slice(scoreIndex).split(" ")[2];
                    let evaluation = parseInt(scoreString);
                    evaluation = Math.abs(evaluation);
                    evaluations[multipv-1] = 'M' + this_evaluation;
                }
                let pvIndex = message.indexOf(" pv ")
                if (pvIndex != -1) {
                    let pvString = message.slice(pvIndex + 4).split(" ");
                    if (evaluations.length == 1) {
                        evaluation = evaluations[0];
                        console.log(evaluations);
                    }
                }
            }
        }
    }
        //*/
    
}

var express = require("express");

var router = express.Router();

router.get("/stockfish/:dynamic",function(req,res){
    const { dynamic } = req.params;
    fen = decode(dynamic);
    console.log(evaluation);
    res.status(200).json({
        'evaluation': evaluation
    })
})

router.get("/",function(req,res){
    console.log("Generating window...");
    res.render("index");
})

module.exports = router;