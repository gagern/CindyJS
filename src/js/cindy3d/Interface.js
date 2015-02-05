//////////////////////////////////////////////////////////////////////
// Global variables

var instances = {};
var currentInstance;

//////////////////////////////////////////////////////////////////////
// Defining operators

/**
 * @param {string} name
 * @param {number} arity
 * @param {cjsType.op} impl
 */
function defOp(name, arity, impl) {
  /** @type {?cjsType.op} */ var old = evaluator[name];
  /** @type {cjsType.op}  */ var chain = function(args, modifs) {
    if (args.length === arity)
      return impl(args, modifs);
    else if (old)
      return old(args, modifs);
    else
      throw "No implementation for " + name + "(" + arity + ")";
  };
  evaluator[name] = chain;
}

//////////////////////////////////////////////////////////////////////
// Type coercion

var coerce = {};

/**
 * @param {cjsType.anyval} arg
 * @param {Array.<number>=} def
 * @return {Array.<number>}
 */
coerce.toHomog = function(arg, def=[0,0,0,0]) {
  if (arg["ctype"] !== "list") {
    console.log("argument is not a list");
    return def;
  }
  var lst1 = /** @type {Array.<cjsType.anyval>} */(arg["value"]);
  var lst = lst1.map(coerce.toReal);
  if (lst.length > 4) {
    console.log("Coordinate vector too long.");
    lst = lst.slice(0, 4);
  }
  while (lst.length < 3)
    lst.push(0);
  if (lst.length === 3)
    lst.push(1);
  return lst;
};

/**
 * @param {cjsType.anyval} arg
 * @param {Array.<number>=} def
 * @return {Array.<number>}
 */
coerce.toColor = function(arg, def=[0.5,0.5,0.5]) {
  if (arg["ctype"] !== "list") {
    console.log("argument is not a list");
    return def;
  }
  var lst = /** @type {Array.<cjsType.anyval>} */(arg["value"]);
  if (lst.length != 3) {
    console.log("Not an RGB color vector");
    return def;
  }
  return lst.map(c => coerce.toInterval(0, 1, c));
};

/**
 * @param {cjsType.anyval} arg
 * @param {number=} def
 * @return {number}
 */
coerce.toReal = function(arg, def=Number.NaN) {
  if (arg["ctype"] !== "number") {
    console.log("argument is not a number");
    return def;
  }
  var val = arg["value"], r = val["real"], i = val["imag"];
  if (i !== 0)
    console.log("complex number is not real");
  return r;
};

/**
 * @param {number} min
 * @param {number} max
 * @param {number} arg
 * @return {number}
 */
coerce.clamp = function(min, max, arg) {
  return (arg < min) ? min : ((arg > max) ? max : arg);
};

/**
 * @param {number} min
 * @param {number} max
 * @param {cjsType.anyval} arg
 * @param {number=} def
 * @return {number}
 */
coerce.toInterval = function(min, max, arg, def=Number.NaN) {
  return coerce.clamp(min, max, coerce.toReal(arg, def));
};

/**
 * @param {cjsType.anyval} arg
 * @param {?string=} def
 * @return {?string}
 */
coerce.toString = function(arg, def=null) {
  if (arg["ctype"] === "string")
    return arg["value"];
  console.log("argument is not a string");
  return def;
};

//////////////////////////////////////////////////////////////////////
// Modifier handling

/**
 * @param {Object} modifs
 * @param {Object} handlers
 */
function handleModifs(modifs, handlers) {
  var key, handler;
  for (key in modifs) {
    handler = handlers[key];
    if (handler)
      handler(evaluate(modifs[key]));
    else
      console.log("Modifier " + key + " not supported");
  }
}

/**
 * @param {Appearance} appearance
 * @param {Object} modifs
 * @param {Object=} handlers
 * @return {Appearance}
 */
function handleModifsAppearance(appearance, modifs, handlers = null) {
  var color = appearance.color;
  var alpha = appearance.alpha;
  var shininess = appearance.shininess;
  var size = appearance.size;
  var combined = {
    "color": (a => color = coerce.toColor(a)),
    "alpha": (a => alpha = coerce.toInterval(0, 1, a)),
    "shininess": (a => shininess = coerce.toInterval(0, 128, a)),
    "size": (a => size = coerce.toReal(a)),
  };
  var key;
  if (handlers)
    for (key in handlers)
      combined[key] = handlers[key];
  handleModifs(modifs, combined);
  return Appearance.create(color, alpha, shininess, size);
}
