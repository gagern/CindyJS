var rewire = require("rewire");
var MersenneTwister = require("mersenne-twister");

var CindyJS = require("../build/js/Cindy.plain.js");
var cindyJS = rewire("../build/js/exposed.js");

var csport = cindyJS.__get__("csport");
var eval_helper = cindyJS.__get__("eval_helper");
var List = cindyJS.__get__("List");
var geoOps = cindyJS.__get__("geoOps");
var niceprint = cindyJS.__get__("niceprint");
var updateCanvasDimensions = cindyJS.__get__("updateCanvasDimensions");

var log = console.log.bind(console);

function LoggingContext() {
}

["beginPath", "moveTo", "lineTo", "quadraticCurveTo", "closePath",
 "fill", "clip", "stroke", "setTransform"].forEach(function(name) {
     LoggingContext.prototype[name] = function() {
         var args = Array.prototype.join.call(arguments, ", ");
         log(name + "(" + args + ");");
     };
 });


function fmtMat(mat) {
    return "[[" + mat.value.map(function(row) {
        return row.value.map(function(elt) {
            return elt.value.real;
        }).join(", ");
    }).join("],\n     [") + "]];";
}

function genTestCase(rnd, caseNum, func) {
    log("\n// Case " + caseNum);
    var i, j;
    var pts = [null];
    for (i = 1; i <= 5; ++i) {
        var x = rnd.random() * 24 - 10;
        var y = rnd.random() * 24 - 10;
        pts[i] = List.realVector([x, y, 1]);
        log("P" + i + " = [" + x + ", " + y + ", 1];");
    }
    var mat = geoOps._helper.ConicBy5.apply(null, pts);
    mat = List.normalizeMax(mat);
    log("M = " + fmtMat(mat));
    var tmat = csport.toMat();
    var pmat = List.mult(List.transpose(tmat), mat);
    pmat = List.mult(pmat, tmat);
    pmat = List.normalizeMax(pmat);
    log("N = " + fmtMat(pmat));
    log();
    func(mat, {}, "D");
}

function setup() {
    var log = new LoggingContext();
    cindyJS.__set__("canvas", {
        clientWidth: 600,
        clientHeight: 600
    });
    cindyJS.__set__("csctx", log);
    cindyJS.__set__("trafos", [{visibleRect:[-10,14,14,-10]}]);
    updateCanvasDimensions();
}

function genTestCases(count, seed, drawconic) {
    setup();
    var rnd = new MersenneTwister(seed);
    var func = eval_helper[drawconic];
    for (var i = 1; i <= count; ++i)
        genTestCase(rnd, i, func);
}

if (module === require.main) {
    if (process.argv[2] === "bench") {
        log = function() {};
        var Benchmark = require("benchmark");
        var suite = new Benchmark.Suite();
        suite.add("drawConics3_a", genTestCases.bind(null, 1024, 123, "drawconic"));
        suite.add("patch-2_a", genTestCases.bind(null, 1024, 123, "drawconic2"));
        suite.add("drawConics3_b", genTestCases.bind(null, 1024, 123, "drawconic"));
        suite.add("patch-2_b", genTestCases.bind(null, 1024, 123, "drawconic2"));
        suite.on("cycle", function(event) {
            console.log(event.target + " -- " + 1/event.target.hz);
        });
        suite.on("complete", function() {
            console.log("Completed");
        });
        suite.run();
    } else {
        genTestCases(1024, 123, process.argv[2] || "drawconic");
    }
}
