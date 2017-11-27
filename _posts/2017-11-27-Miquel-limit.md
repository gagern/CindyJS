---
layout: post
title:  "Limit case of Miquel theorem"
date:   2017-11-17 10:30 +0000
categories: se math
cjs:
  version: v0.8
katex: true
---

In [a question on Mathematics Stack Exchange][1], [Cố Gắng Lên][2] asked
for a proof which according to [my answer][3] can be seen as a special case of
[Miquel's six circle theorem][4].
As the point <script type="text/x-tex">D</script> is moved
towards <script type="text/x-tex">A</script>,
As the point <script type="text/x-tex">D_1</script> moves
towards <script type="text/x-tex">A_1</script>.
In the limit, when <script type="text/x-tex">D</script>
and <script type="text/x-tex">A</script> coincide,
then the green circle is tangent to both the black circles,
as the points of intersection with each will have converged
to form a double point.

<div id="CSCanvas"></div>
<script type="text/javascript">
var cdy = CindyJS({
  defaultAppearance: {
    dimDependent: 1.0,
    fontFamily: "serif",
    lineSize: 1,
    pointSize: 5.0,
    textsize: 24.0
  },
  angleUnit: "°",
  geometry: [
    {name: "B", type: "Free", pos: [4.0, -3.963470319634703, 0.45662100456621], color: [0.0, 0.0, 1.0], pinned: true, labeled: true, textitalics: true, size: 6.0},
    {name: "C1", type: "Free", pos: [4.0, -0.6545454545454547, 0.30303030303030304], color: [0.098, 0.62, 0.306], pinned: true, labeled: true, textitalics: true, size: 4.0, printname: "$C_1$"},
    {name: "C", type: "Free", pos: [4.0, -0.8492307692307691, 0.15384615384615385], color: [0.0, 0.0, 1.0], pinned: true, labeled: true, textitalics: true, size: 6.0},
    {name: "C0", type: "CircleBy3", color: [1.0, 0.0, 0.0], args: ["B", "C1", "C"], size: 2, printname: "$C_{0}$"},
    {name: "B1", type: "PointOnCircle", pos: [4.0, {r: -0.20097953450140674, i: 1.2657206216606557E-16}, {r: 0.22960831849922847, i: -1.837449806430841E-18}], color: [0.098, 0.62, 0.306], args: ["C0"], pinned: true, labeled: true, textitalics: true, size: 4.0, printname: "$B_1$"},
    {name: "A", type: "Free", pos: [4.0, 1.5507692307692307, 0.3076923076923077], color: [0.0, 0.0, 1.0], pinned: true, labeled: true, textitalics: true, size: 6.0},
    {name: "E", type: "CircleBy3", color: [1.0, 0.0, 0.0], args: ["B", "B1", "A"], size: 2, printname: "$C_{1}$"},
    {name: "C2", type: "CircleBy3", color: [0.0, 0.0, 1.0], args: ["C1", "C", "A"], size: 2, printname: "$C_{2}$"},
    {name: "A1", type: "OtherIntersectionCC", color: [0.098, 0.62, 0.306], args: ["E", "C2", "A"], labeled: true, textitalics: true, size: 4.0, printname: "$A_1$"},
    {name: "C3", type: "CircleBy3", color: [0.0, 0.0, 0.0], args: ["B", "C", "A"], size: 3, printname: "$C_{3}$"},
    {name: "C4", type: "CircleBy3", color: [0.0, 0.0, 0.0], args: ["C1", "B1", "A1"], size: 3, printname: "$C_{4}$"},
    {name: "D", type: "PointOnCircle", pos: [4.0, {r: 0.7068308749062314, i: -2.0425146726277242E-16}, {r: 0.17878463693198038, i: -4.2864143397443936E-18}], color: [0.0, 0.0, 1.0], args: ["C3"], labeled: true, textitalics: true, size: 6.0},
    {name: "C5", type: "CircleBy3", color: [0.0, 0.0, 1.0], args: ["C1", "C", "D"], size: 2, printname: "$C_{5}$"},
    {name: "D1", type: "OtherIntersectionCC", color: [0.098, 0.62, 0.306], args: ["C4", "C5", "C1"], labeled: true, textitalics: true, size: 4.0, printname: "$D_1$"},
    {name: "C6", type: "CircleBy3", color: [0.098, 0.62, 0.306], args: ["D1", "A", "D"], size: 2, dashtype: "dashed", printname: "$C_{6}$"}
  ],
  ports: [{
    id: "CSCanvas",
    width: 808,
    height: 708,
    transform: [{visibleRect: [-1.3801962533452292, 11.869830508474577, 36.215950044603034, -21.07332738626227]}],
    background: "rgb(255,255,255)"
  }],
  csconsole: false,
  use: ["katex"],
  cinderella: {build: 1901, version: [2, 9, 1901]}
});
</script>

[1]: https://math.stackexchange.com/q/2535986/35416 "Math SE question"
[2]: https://math.stackexchange.com/users/327203/c%e1%bb%91-g%e1%ba%afng-l%c3%aan "Math SE user"
[3]: https://math.stackexchange.com/a/2539335/35416 "Math SE answer"
[4]: https://en.wikipedia.org/wiki/Miquel%27s_theorem#Miquel.27s_six_circle_theorem "Wikipedia article"
