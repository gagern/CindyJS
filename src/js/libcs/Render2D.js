function Render2D(context, width, height) {
    if (!context) // for inheritance
        return;
    this.context = context;
    this.width = width;
    this.height = height;
    this.fill = context.fill.bind(context, "evenodd");
    this.stroke = context.stroke.bind(context);
    this.clip = context.clip.bind(context, "evenodd");
    this.beginPath = context.beginPath.bind(context);
    this.moveTo = context.moveTo.bind(context);
    this.lineTo = context.lineTo.bind(context);
    this.closePath = context.closePath.bind(context);
    this.save = context.save.bind(context);
    this.restore = context.restore.bind(context);
    this.translate = context.translate.bind(context);
    this.transform = context.transform.bind(context);
    this.scale = context.scale.bind(context);
    this.rotate = context.rotate.bind(context);
    if (context.setLineDash)
        this.setLineDash = context.setLineDash.bind(context);
}

Render2D.prototype.circle = function(x, y, r) {
    /*
      var m = 0.551784;
      this.context.save();
      this.context.translate(x, y);
      this.context.scale(r, r);
      this.context.beginPath();
      this.context.moveTo(1, 0);
      this.context.bezierCurveTo(1, -m, m, -1, 0, -1);
      this.context.bezierCurveTo(-m, -1, -1, -m, -1, 0);
      this.context.bezierCurveTo(-1, m, -m, 1, 0, 1);
      this.context.bezierCurveTo(m, 1, 1, m, 1, 0);
      this.context.closePath();
      this.context.restore();
    */

    this.context.arc(x, y, r, 0, 2 * Math.PI);
};

Render2D.prototype.setStrokeColor = function(color) {
    // TODO: change argument from string to array
    this.context.strokeStyle = color;
};

Render2D.prototype.setFillColor = function(color) {
    // TODO: change argument from string to array
    this.context.fillStyle = color;
};

Render2D.prototype.setFont = function(font) {
    // TODO: change argument from single string to multiple arguments
    this.context.font = font;
};

Render2D.prototype.fillText = function(txt, x, y, align) {
    var width = this.context.measureText(txt).width;
    this.context.fillText(txt, x - width*align, y);
};

Render2D.prototype.setLineWidth = function(w) {
    this.context.lineWidth = w;
};

Render2D.prototype.setLineJoin = function(a) {
    this.context.lineJoin = a;
};

Render2D.prototype.setLineCap = function(a) {
    this.context.lineCap = a;
};

Render2D.prototype.clear = function() {
    this.context.clearRect(0, 0, this.width, this.height);
};

Render2D.prototype.drawImage = function(img, x, y, alpha) {
    if (alpha !== 1) {
        this.context.globalAlpha = alpha;
        this.context.drawImage(img, x, y);
        this.context.globalAlpha = 1;
    }
    else {
        this.context.drawImage(img, x, y);
    }
};

Render2D.prototype.setLineDash = function(pattern) {
    this.context.webkitLineDash = pattern;
    this.context.mozDash = pattern;
};
