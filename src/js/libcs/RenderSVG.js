function RenderSVG(canvas) {
    this.createElement =
        document.createElementNS.bind(document, RenderSVG.svgNS);
    var svg = this.createElement("svg");
    var toCopy = ["width", "height", "style"];
    for (var i = 0; i < toCopy.length; ++i) {
        var attrName = toCopy[i];
        if (canvas.hasAttribute(attrName))
            svg.setAttribute(attrName, canvas.getAttribute(attrName));
    }
    canvas.parentNode.replaceChild(svg, canvas);
    this.svg = svg;
    this.saveStack = [];
    var g = this.createElement("g");
    g.style.stroke = "none";
    g.style.fill = "none";
    g.style.fillRule = "evenodd";
    svg.appendChild(g);
    this.currentGroup = g;
    this.currentPath = null;
    this.strokeColor = this.fillColor = "rgb(0,0,0)";
    this.lineWidth = 1;
    this.lineCap = "butt";
    this.lineJoin = "miter";
    this.font = "";
    this.dash = null;
}

RenderSVG.svgNS = "http://www.w3.org/2000/svg";
RenderSVG.xlinkNS = "http://www.w3.org/1999/xlink";

RenderSVG.prototype.beginPath = function() {
    this.currentPath = this.createElement("path");
    this.currentGroup.appendChild(this.currentPath);
};

RenderSVG.prototype.moveTo = function(x, y) {
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegMovetoAbs(x, y));
};

RenderSVG.prototype.lineTo = function(x, y) {
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegLinetoAbs(x, y));
};

RenderSVG.prototype.closePath = function() {
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegClosePath());
};

RenderSVG.prototype.fill = function() {
    this.currentPath.style.fill = this.fillColor;
};

RenderSVG.prototype.stroke = function() {
    this.currentPath.style.stroke = this.strokeColor;
    this.currentPath.style.strokeWidth = this.lineWidth;
    this.currentPath.style.strokeLinejoin = this.lineJoin;
    this.currentPath.style.strokeLinecap = this.lineCap;
    if (this.dash)
        this.currentPath.style.strokeDasharray = this.dash;
};

RenderSVG.prototype.clip = function() {
    this.currentPath.id = createCindy.createUniqueId();
    var cp = this.createElement("clipPath");
    cp.id = createCindy.createUniqueId();
    var use = this.createElement("use");
    use.href.baseVal = "#" + this.currentPath.id;
    cp.appendChild(use);
    this.currentGroup.appendChild(cp);
    var g = this.createElement("g");
    this.currentGroup.appendChild(g);
    this.currentGroup = g;
    g.style.clipPath = "url(#" + cp.id + ")";
};

RenderSVG.prototype.save = function() {
    this.saveStack.push(this.currentGroup);
    var g = this.createElement("g");
    this.currentGroup.appendChild(g);
    this.currentGroup = g;
};

RenderSVG.prototype.restore = function() {
    this.currentGroup = this.saveStack.pop();
};

RenderSVG.prototype.appendTransform = function(t) {
    if (this.currentGroup.firstChild) {
        var g = this.createElement("g");
        this.currentGroup.appendChild(g);
        this.currentGroup = g;
    }
    this.currentGroup.transform.baseVal.appendItem(t);
};

RenderSVG.prototype.translate = function(x, y) {
    var t = this.svg.createSVGTransform();
    t.setTranslate(x, y);
    this.appendTransform(t);
};

RenderSVG.prototype.transform = function(a, b, c, d, e, f) {
    var m = this.svg.createSVGMatrix();
    m.a = a;
    m.b = b;
    m.c = c;
    m.d = d;
    m.e = e;
    m.f = f;
    var t = this.svg.createSVGTransform();
    t.setMatrix(m);
    this.appendTransform(t);
};

RenderSVG.prototype.scale = function(x, y) {
    var t = this.svg.createSVGTransform();
    t.setScale(x, y);
    this.appendTransform(t);
};

RenderSVG.prototype.rotate = function() {
    var t = this.svg.createSVGTransform();
    t.setRotate(angle, 0, 0); // do we have to convert to degrees?
    this.appendTransform(t);
};

RenderSVG.prototype.circle = function(x, y, r) {
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegMovetoAbs(x + r, y));
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegArcRel(
                -2. * r, 0, r, r, 0, true, true));
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegArcRel(
                2. * r, 0, r, r, 0, true, true));
    this.currentPath.pathSegList.appendItem(
        this.currentPath.createSVGPathSegClosePath());
};

RenderSVG.prototype.setStrokeColor = function(color) {
    this.strokeColor = color;
};

RenderSVG.prototype.setFillColor = function(color) {
    this.fillColor = color;
};

RenderSVG.prototype.setFont = function(font) {
    this.font = font;
};

RenderSVG.prototype.fillText = function(txt, x, y, align) {
    var text = this.createElement("text");
    text.appendChild(document.createTextNode(txt));
    var xx = this.svg.createSVGLength();
    xx.newValueSpecifiedUnits(5, x);
    var yy = this.svg.createSVGLength();
    yy.newValueSpecifiedUnits(5, y);
    text.x.baseVal.initialize(xx);
    text.y.baseVal.initialize(yy);
    text.style.font = this.font;
    text.style.fill = this.fillColor;
    this.currentGroup.appendChild(text);
};

RenderSVG.prototype.setLineWidth = function(w) {
    this.lineWidth = w;
};

RenderSVG.prototype.setLineJoin = function(a) {
    this.lineJoin = a;
};

RenderSVG.prototype.setLineCap = function(a) {
    this.lineCap = a
};

RenderSVG.prototype.clear = function() {
    var endmark = null;
    var g = this.currentGroup;
    while (g !== this.svg) {
        while (g.firstChild !== endmark)
            g.removeChild(g.firstChild);
        endmark = g;
        g = g.parentNode;
    }
};

RenderSVG.prototype.drawImage = function(img, x, y, alpha) {
    if (alpha === 0) return;
    var image = this.createElement("image");
    image.href.baseVal = img.src;
    image.x.baseVal.newValueSpecifiedUnits(5, x);
    image.y.baseVal.newValueSpecifiedUnits(5, y);
    image.width.baseVal.newValueSpecifiedUnits(5, img.width);
    image.height.baseVal.newValueSpecifiedUnits(5, img.height);
    if (alpha !== 1) image.style.opacity = alpha;
    this.currentGroup.appendChild(image);
};

RenderSVG.prototype.setLineDash = function(pattern) {
    if (pattern.length == 0)
        this.dash = null;
    else
        this.dash = pattern.join(" ");
};
