var Rendering = {};

Rendering.handleModifs = function(modifs, handlers) {

    // Reset stuff first
    if (Rendering.dashing)
        Rendering.unSetDash();
    Rendering.colorraw = null;
    Rendering.size = null;
    if (Rendering.psize < 0) Rendering.psize = 0;
    if (Rendering.lsize < 0) Rendering.lsize = 0;
    Rendering.overhang = 1; //TODO Eventuell dfault setzen
    Rendering.dashing = false;
    Rendering.isArrow = false;
    Rendering.arrowSides = '==>';
    Rendering.arrowposition = 1.0; // position arrowhead along the line
    Rendering.headlen = 10; // arrow head length - perhaps set this relative to canvas size
    Rendering.arrowShape = 'default';
    Rendering.alpha = csport.drawingstate.alpha;
    Rendering.bold = "";
    Rendering.italics = "";
    Rendering.family = "Arial";
    Rendering.align = 0;
    Rendering.xOffset = 0;
    Rendering.yOffset = 0;

    // Process handlers
    var key, handler;
    for (key in modifs) {
        handler = handlers[key];
        if (!handler) {
            console.log("Modifier not supported: " + key);
            continue;
        }
        if (handler === true) {
            handler = Rendering.modifHandlers[key];
        }
        handler(evaluate(modifs[key]));
    }

    // Post-process settings
    if (Rendering.size !== null) {
        Rendering.psize = Rendering.lsize = Rendering.size;
    } else {
        Rendering.psize = csport.drawingstate.pointsize;
        Rendering.lsize = csport.drawingstate.linesize;
    }
    if (Rendering.colorraw !== null) {
        Rendering.pointColor = Rendering.lineColor = Rendering.textColor =
            Rendering.makeColor(Rendering.colorraw);
    } else if (Rendering.alpha === 1) {
        Rendering.pointColor = csport.drawingstate.pointcolor;
        Rendering.lineColor = csport.drawingstate.linecolor;
        Rendering.textColor = csport.drawingstate.textcolor;
    } else {
        Rendering.pointColor =
            Rendering.makeColor(csport.drawingstate.pointcolorraw);
        Rendering.lineColor =
            Rendering.makeColor(csport.drawingstate.linecolorraw);
        Rendering.textColor =
            Rendering.makeColor(csport.drawingstate.textcolorraw);
    }
    if (Rendering.alpha === 1) {
        Rendering.black = "rgb(0,0,0)";
    } else {
        Rendering.black = "rgba(0,0,0," + Rendering.alpha + ")";
    }

};

Rendering.sin30deg = 0.5;
Rendering.cos30deg = Math.sqrt(0.75);

Rendering.modifHandlers = {

    "size": function(v) {
        if (v.ctype === "number") {
            Rendering.size = v.value.real;
            if (Rendering.size < 0) Rendering.size = 0;
            if (Rendering.size > 1000) Rendering.size = 1000;
        }
    },

    "color": function(v) {
        if (List.isNumberVector(v).value && v.value.length === 3) {
            Rendering.colorraw = [
                v.value[0].value.real,
                v.value[1].value.real,
                v.value[2].value.real
            ];
        }
    },

    "alpha": function(v) {
        if (v.ctype === "number") {
            Rendering.alpha = v.value.real;
        }
    },

    "dashpattern": function(v) {
        if (v.ctype === "list") {
            var pat = [];
            for (var i = 0, j = 0; i < v.value.length; i++) {
                if (v.value[i].ctype === "number")
                    pat[j++] = v.value[i].value.real;
            }
            Rendering.setDash(pat, Rendering.lsize);
            Rendering.dashing = true;
        }
    },

    "dashtype": function(v) {
        if (v.ctype === "number") {
            var type = Math.floor(v.value.real);
            Rendering.setDashType(type, Rendering.lsize);
            Rendering.dashing = true;
        }
    },

    "dashing": function(v) {
        if (v.ctype === 'number') {
            var si = Math.floor(v.value.real);
            Rendering.setDash([si * 2, si], Rendering.lsize);
            Rendering.dashing = true;
        }
    },

    "overhang": function(v) {
        if (v.ctype === 'number') {
            // Might combine with arrowposition, see there for details
            Rendering.overhang = Rendering.overhang * v.value.real +
                (1 - Rendering.overhang) * (1 - v.value.real);
        }
    },

    "arrow": function(v) {
        if (v.ctype === 'boolean') {
            Rendering.isArrow = v.value;
        } else {
            console.error("arrow needs to be of type boolean");
        }
    },

    "arrowshape": function(v) {
        if (v.ctype === 'string') {
            Rendering.arrowShape = v.value;
            Rendering.isArrow = true;
        } else {
            console.error("arrowshape needs to be of type string");
        }
    },

    "arrowsides": function(v) {
        if (v.ctype !== 'string') {
            console.error('arrowsides is not of type string');
        } else if (!(v.value === '==>' || v.value === '<==>' || v.value === '<==')) {
            console.error("arrowsides is unknows");
        } else {
            Rendering.arrowSides = v.value;
            Rendering.isArrow = true;
        }
    },

    "arrowposition": function(v) {
        if (v.ctype !== "number") {
            console.error('arrowposition is not of type number');
        } else if (v.value.real < 0.0) {
            console.error("arrowposition has to be positive");
        } else if (v.value.real > 1.0) {
            // Combine position into overhang to simplify things
            // Writing a for overhang and b for arrowposition, we have
            // q1 = b*(a*p1 + (1-a)*p2) + (1-b)*(a*p2 + (1-a)*p1)
            Rendering.overhang = Rendering.overhang * v.value.real +
                (1 - Rendering.overhang) * (1 - v.value.real);
        } else {
            Rendering.arrowposition = v.value.real;
            Rendering.isArrow = true;
        }
    },

    "arrowsize": function(v) {
        if (v.ctype !== "number") {
            console.error('arrowsize is not of type number');
        } else if (v.value.real < 0.0) {
            console.error("arrowsize has to be positive");
        } else {
            Rendering.headlen = Rendering.headlen * v.value.real;
        }
    },

    "bold": function(v) {
        if (v.ctype === "boolean" && v.value)
            Rendering.bold = "bold ";
    },

    "italics": function(v) {
        if (v.ctype === "boolean" && v.value)
            Rendering.italics = "italic ";
    },

    "family": function(v) {
        if (v.ctype === "string") {
            Rendering.family = v.value;
        }
    },

    "align": function(v) {
        if (v.ctype === "string") {
            var s = v.value;
            if (s === "left")
                Rendering.align = 0;
            if (s === "right")
                Rendering.align = 1;
            if (s === "mid")
                Rendering.align = 0.5;
        }
    },

    "x_offset": function(v) {
        if (v.ctype === "number")
            Rendering.xOffset = v.value.real;
    },

    "y_offset": function(v) {
        if (v.ctype === "number")
            Rendering.yOffset = v.value.real;
    },

    "offset": function(v) {
        if (v.ctype === "list" && v.value.length === 2 &&
            v.value[0].ctype === "number" && v.value[1].ctype === "number") {
            Rendering.xOffset = v.value[0].value.real;
            Rendering.yOffset = v.value[1].value.real;
        }
    },

};

Rendering.lineModifs = {
    "size": true,
    "color": true,
    "alpha": true,
    "dashpattern": true,
    "dashtype": true,
    "dashing": true,
    "overhang": true,
    "arrow": true,
    "arrowshape": true,
    "arrowsides": true,
    "arrowposition": true,
    "arrowsize": true,
};

Rendering.pointModifs = {
    "size": true,
    "color": true,
    "alpha": true,
};

Rendering.pointAndLineModifs = Rendering.lineModifs;

Rendering.conicModifs = Rendering.pointModifs;

Rendering.textModifs = {
    "size": true,
    "color": true,
    "alpha": true,
    "bold": true,
    "italics": true,
    "family": true,
    "align": true,
    "x_offset": true,
    "y_offset": true,
    "offset": true,
};


Rendering.makeColor = function(colorraw) {
    var alpha = Rendering.alpha;
    var r = Math.floor(colorraw[0] * 255);
    var g = Math.floor(colorraw[1] * 255);
    var b = Math.floor(colorraw[2] * 255);
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
};

Rendering.drawsegcore = function(pt1, pt2) {
    var m = csport.drawingstate.matrix;
    var endpoint1x = pt1.x * m.a - pt1.y * m.b + m.tx;
    var endpoint1y = pt1.x * m.c - pt1.y * m.d - m.ty;
    var endpoint2x = pt2.x * m.a - pt2.y * m.b + m.tx;
    var endpoint2y = pt2.x * m.c - pt2.y * m.d - m.ty;
    var overhang1 = Rendering.overhang;
    var overhang2 = 1 - overhang1;
    var overhang1x = overhang1 * endpoint1x + overhang2 * endpoint2x;
    var overhang1y = overhang1 * endpoint1y + overhang2 * endpoint2y;
    var overhang2x = overhang1 * endpoint2x + overhang2 * endpoint1x;
    var overhang2y = overhang1 * endpoint2y + overhang2 * endpoint1y;

    renderer.setLineWidth(Rendering.lsize);
    renderer.setLineCap('round');
    renderer.setLineJoin('miter');
    renderer.setStrokeColor(Rendering.lineColor);

    if (!Rendering.isArrow ||
        (endpoint1x === endpoint1y && endpoint2x === endpoint2y)) {
        // Fast path if we have no arrowheads
        renderer.beginPath();
        renderer.moveTo(overhang1x, overhang1y);
        renderer.lineTo(overhang2x, overhang2y);
        renderer.stroke();
        return;
    }

    var dx = endpoint2x - endpoint1x;
    var dy = endpoint2y - endpoint1y;
    var norm = Math.sqrt(dx * dx + dy * dy);
    var cosAngle = dx / norm;
    var sinAngle = dy / norm;
    var pos_fac1 = Rendering.arrowposition;
    var pos_fac2 = 1 - pos_fac1;
    var tip1x = pos_fac1 * overhang1x + pos_fac2 * overhang2x;
    var tip1y = pos_fac1 * overhang1y + pos_fac2 * overhang2y;
    var tip2x = pos_fac1 * overhang2x + pos_fac2 * overhang1x;
    var tip2y = pos_fac1 * overhang2y + pos_fac2 * overhang1y;
    var headlen = Rendering.headlen;
    var sin30 = Rendering.sin30deg;
    var cos30 = Rendering.cos30deg;
    var x30sub = headlen * (cosAngle * cos30 + sinAngle * sin30);
    var x30add = headlen * (cosAngle * cos30 - sinAngle * sin30);
    var y30sub = headlen * (sinAngle * cos30 - cosAngle * sin30);
    var y30add = headlen * (sinAngle * cos30 + cosAngle * sin30);
    var arrowSides = Rendering.arrowSides;

    renderer.beginPath();

    // draw line in parts for full arrow
    if (Rendering.arrowShape === "full") {
        var rx, ry, lx, ly;
        if (arrowSides === "<==>" || arrowSides === "<==") {
            rx = tip1x + x30sub;
            ry = tip1y + y30sub;
            lx = tip1x + x30add;
            ly = tip1y + y30add;
            if (Rendering.arrowposition < 1.0) {
                renderer.moveTo(overhang1x, overhang1y);
                renderer.lineTo(tip1x, tip1y);
            }
            renderer.moveTo((rx + lx) / 2, (ry + ly) / 2);
        } else {
            renderer.moveTo(overhang1x, overhang1y);
        }
        if (arrowSides === '==>' || arrowSides === '<==>') {
            rx = tip2x - x30sub;
            ry = tip2y - y30sub;
            lx = tip2x - x30add;
            ly = tip2y - y30add;
            renderer.lineTo((rx + lx) / 2, (ry + ly) / 2);
            if (Rendering.arrowposition < 1.0) {
                renderer.moveTo(tip2x, tip2y);
                renderer.lineTo(overhang2x, overhang2y);
            }
        } else {
            renderer.lineTo(overhang2x, overhang2y);
        }
    } else {
        renderer.moveTo(overhang1x, overhang1y);
        renderer.lineTo(overhang2x, overhang2y);
    }

    renderer.stroke();

    // draw arrow heads at desired positions
    if (arrowSides === '==>' || arrowSides === '<==>') {
        draw_arrowhead(tip2x, tip2y, 1);
    }
    if (arrowSides === '<==' || arrowSides === '<==>') {
        draw_arrowhead(tip1x, tip1y, -1);
    }

    function draw_arrowhead(tipx, tipy, sign) {
        var rx = tipx - sign * x30sub;
        var ry = tipy - sign * y30sub;

        renderer.beginPath();
        if (Rendering.arrowShape === "full") {
            renderer.setLineWidth(Rendering.lsize / 2);
        }
        var lx = tipx - sign * x30add;
        var ly = tipy - sign * y30add;
        renderer.moveTo(rx, ry);
        renderer.lineTo(tipx, tipy);
        renderer.lineTo(lx, ly);
        if (Rendering.arrowShape === "full") {
            renderer.setFillColor(Rendering.lineColor);
            renderer.closePath();
            renderer.fill();
        } else if (Rendering.arrowShape !== "default") {
            console.error("arrowshape is unknown");
        }
        renderer.stroke();
    }

};

Rendering.drawpoint = function(pt) {
    var m = csport.drawingstate.matrix;

    var xx = pt.x * m.a - pt.y * m.b + m.tx;
    var yy = pt.x * m.c - pt.y * m.d - m.ty;

    renderer.setLineWidth(Rendering.psize * 0.3);
    renderer.beginPath();
    renderer.circle(xx, yy, Rendering.psize);
    renderer.setFillColor(Rendering.pointColor);

    renderer.fill();

    renderer.beginPath();
    renderer.circle(xx, yy, Rendering.psize * 1.15);
    renderer.setStrokeColor(Rendering.black);
    renderer.stroke();
};

Rendering.drawline = function(homog) {
    var na = CSNumber.abs(homog.value[0]).value.real;
    var nb = CSNumber.abs(homog.value[1]).value.real;
    var nc = CSNumber.abs(homog.value[2]).value.real;
    var divi;

    if (na >= nb && na >= nc) {
        divi = homog.value[0];
    }
    if (nb >= na && nb >= nc) {
        divi = homog.value[1];
    }
    if (nc >= nb && nc >= na) {
        divi = homog.value[2];
    }
    var a = CSNumber.div(homog.value[0], divi);
    var b = CSNumber.div(homog.value[1], divi);
    var c = CSNumber.div(homog.value[2], divi); //TODO Realitycheck einbauen

    var l = [
        a.value.real,
        b.value.real,
        c.value.real
    ];
    var b1, b2;
    if (Math.abs(l[0]) < Math.abs(l[1])) {
        b1 = [1, 0, 30];
        b2 = [-1, 0, 30];
    } else {
        b1 = [0, 1, 30];
        b2 = [0, -1, 30];
    }
    var erg1 = [
        l[1] * b1[2] - l[2] * b1[1],
        l[2] * b1[0] - l[0] * b1[2],
        l[0] * b1[1] - l[1] * b1[0]
    ];
    var erg2 = [
        l[1] * b2[2] - l[2] * b2[1],
        l[2] * b2[0] - l[0] * b2[2],
        l[0] * b2[1] - l[1] * b2[0]
    ];

    var pt1 = {
        x: erg1[0] / erg1[2],
        y: erg1[1] / erg1[2]
    };
    var pt2 = {
        x: erg2[0] / erg2[2],
        y: erg2[1] / erg2[2]

    };

    Rendering.drawsegcore(pt1, pt2);
};

Rendering.setDash = function(pattern, size) {
    var s = Math.sqrt(size);
    for (var i = 0; i < pattern.length; i++) {
        pattern[i] *= s;
    }
    renderer.setLineDash(pattern);
};

Rendering.unSetDash = function() {
    renderer.setLineDash([]);
};

Rendering.setDashType = function(type, s) {

    if (type === 0) {
        Rendering.setDash([]);
    }
    if (type === 1) {
        Rendering.setDash([10, 10], s);
    }
    if (type === 2) {
        Rendering.setDash([10, 4], s);
    }
    if (type === 3) {
        Rendering.setDash([1, 3], s);
    }
    if (type === 4) {
        Rendering.setDash([10, 5, 1, 5], s);
    }

};
