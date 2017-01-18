---
layout: post
title:  "Cocircularities involving 8 circles"
date:   2017-01-18 18:33 +0100
categories: se math
cjs:
  version: v0.8
katex: true
---

In the Math Stack Exchange post titled [Six points lie on a circle][1],
[Oai Thanh Đào][2] asked for a proof of a certain cocircularity
given some others. As the setup is invariant under Möbius transformations,
I restricted myself to a scenario where three of the points are
at fixed positions.

[1]: http://math.stackexchange.com/q/2098375/35416 "Math SE question"
[2]: http://math.stackexchange.com/users/268101/oai-thanh-%c4%90%c3%a0o "Math SE user"

<div id="CSCanvas"></div>
<script id="csdraw" type="text/x-cindyscript">
a = A2.x;
b = A4.x;
c = A6.x;
d = B1.x;
e = B1.y;
H1.xy = [(-a*b+b*c-a+b)*e, (a-c)*((b-d)*d-e^2)-(a-b)*(c-d)]/(-2*(a-c)*e);
H2.radius = sqrt(H1.x^2+H1.y^2-(a-b)*c/(a-c));
H3.radius = sqrt((1-a)*(b-a));
</script>
<script type="text/javascript">
var cdy = CindyJS({
  scripts: "cs*",
  defaultAppearance: {
    dimDependent: 0.7,
    fontFamily: "sans-serif",
    lineSize: 1,
    pointSize: 5.0,
    textsize: 12.0
  },
  angleUnit: "°",
  geometry: [
    {name: "A3", type: "Free", pos: [0.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], pinned: true, labeled: true, printname: "$A_3$"},
    {name: "A5", type: "Free", pos: [4.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], pinned: true, labeled: true, printname: "$A_5$"},
    {name: "a", type: "Join", color: [0.0, 0.0, 0.0], args: ["A3", "A5"], size: 2},
    {name: "A2", type: "PointOnLine", pos: [-2.464996794779396, -0.0, 4.0], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_2$"},
    {name: "A4", type: "PointOnLine", pos: [1.7520403024386404, -0.0, 4.0], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_4$"},
    {name: "A6", type: "PointOnLine", pos: [4.0, -0.0, 2.964738939216909], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_6$"},
    {name: "B1", type: "Free", pos: [-0.8685470365468535, 2.621071371850143, 4.0], color: [1.0, 0.0, 0.0], labeled: true, printname: "$B_1$"},
    {name: "b", type: "Join", color: [0.467, 0.0, 0.718], args: ["A2", "B1"]},
    {name: "C0", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B1", "A4", "A5"], printname: "$C_{0}$"},
    {name: "B4", type: "OtherIntersectionCL", color: [1.0, 0.0, 0.0], args: ["C0", "b", "B1"], labeled: true, printname: "$B_4$"},
    {name: "H1", type: "Free", pos: [-1.8090233583209807, -4.0, -3.7130695768989637], color: [1.0, 0.0, 0.0], visible: false, labeled: true},
    {name: "H2", type: "CircleByRadius", pos: {xx: 0.9282673942247409, yy: 0.9282673942247409, zz: {r: 0.6717909641806742, i: -2.5307664106982775E-32}, xy: 0.0, xz: -0.9045116791604904, yz: 2.0}, color: [0.0, 0.0, 1.0], radius: 0.821088913284802, args: ["H1"], size: 2, printname: "$B_5$"},
    {name: "B2", type: "PointOnCircle", pos: [{r: 0.6765461750079965, i: -1.0456114802978313E-16}, -4.0, {r: -2.760967629107893, i: 1.0668988388686437E-16}], color: [1.0, 0.0, 0.0], args: ["H2"], labeled: true, printname: "$B_2$"},
    {name: "C1", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["A2", "A3", "B2"], printname: "$C_{1}$"},
    {name: "C2", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B2", "A5", "A6"], printname: "$C_{2}$"},
    {name: "B5", type: "OtherIntersectionCC", color: [1.0, 0.0, 0.0], args: ["C1", "C2", "B2"], labeled: true, printname: "$B_5$"},
    {name: "B3", type: "PointOnCircle", pos: [{r: -0.16921847080050598, i: 5.0212754665731103E-17}, -4.0, {r: -2.237431159491559, i: -1.6678983856508568E-17}], color: [1.0, 0.0, 0.0], args: ["H2"], labeled: true, printname: "$B_3$"},
    {name: "C3", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B3", "A3", "A4"], printname: "$C_{3}$"},
    {name: "c", type: "Join", color: [0.467, 0.0, 0.718], args: ["B3", "A6"]},
    {name: "B6", type: "OtherIntersectionCL", color: [1.0, 0.0, 0.0], args: ["C3", "c", "B3"], labeled: true, printname: "$B_6$"},
    {name: "H3", type: "CircleByRadius", pos: {xx: {r: -0.7551828392228931, i: -7.189425376453389E-17}, yy: {r: -0.7551828392228931, i: -7.189425376453389E-17}, zz: {r: 0.9999999999999999, i: 1.232595164407831E-32}, xy: 0.0, xz: {r: -0.9307616390784176, i: -8.860955254631629E-17}, yz: 0.0}, color: [1.0, 0.0, 0.0], radius: 1.3053527137564296, args: ["A2"], size: 2, printname: "$C_{4}$"}
  ],
  ports: [{
    id: "CSCanvas",
    width: 680,
    height: 335,
    transform: [{visibleRect: [-1.8775951161663151, 2.263013236276912, 3.2430927875984428, -0.25967859866602033]}],
    axes: true,
    grid: 0.5,
    background: "rgb(255,255,255)"
  }],
  csconsole: false,
  use: ["katex"],
  cinderella: {build: 1897, version: [2, 9, 1897]}
});
</script>
