---
layout: post
title:  "Tangents to moving circle"
date:   2017-12-28 15:20 +0000
categories: se math
cjs:
  version: v0.8
katex: true
---

In [a question on Mathematics Stack Exchange][1],
[Moguzya][2] asked for tangents to a moving circle.
[My answer][3] finds up to four of them, as shown below.
 
<div id="CSCanvas"></div>
<script id="csinit" type="text/x-cindyscript">
solveHomogQuadratic(a,b,c) := (
  regional(d, r);
  d = b*b - 4*a*c;
  if (d < 0, [], (
    r = sqrt(d);
    if (b > 0, r = -r);
    [[r - b, 2*a], [2*c, r-b]]
  ))
);
;
</script>
<script id="csdraw" type="text/x-cindyscript">
S1cosB = B.x - A.x;
S1sinB = B.y - A.y;
R = CR.radius;
S2 = CS2.radius;
X1 = A.x;
Y1 = A.y;

uvs = solveHomogQuadratic(
  X1*S1sinB - (Y1+R)*S1cosB - S2*(Y1+R),
  2*(-X1*S2 + R*S1sinB),
  X1*S1sinB - (Y1-R)*S1cosB + S2*(Y1-R)
) ++ solveHomogQuadratic(
  X1*S1sinB - (Y1-R)*S1cosB - S2*(Y1-R),
  2*(-X1*S2 - R*S1sinB),
  X1*S1sinB - (Y1+R)*S1cosB + S2*(Y1+R)
);

idx = 0;
forall(uvs, uv, (
  u = uv_1;
  v = uv_2;
  cosA = (v*v - u*u)/(v*v + u*u);
  sinA = (2*v*u)/(v*v + u*u);
  dA = S2*[cosA, sinA];
  t = (dA*A.xy) / (S2*S2 - dA*(B.xy - A.xy));
  P = t*dA;
  Q = A.xy + t*(B.xy - A.xy);
  color(if(t < 0, [1,0,0], [0,0.5,0]));
  draw(P, color->[1,1,0]);
  draw([[0,0], P]);
  drawcircle(Q, R);
  drawtext(P, "u = " + (u/v) + "
t = " + t, offset->[5,5]);
  idx = idx + 1;
));

color([0,0,0]);
drawtext([S2, 0], "S2 = " + S2, offset->[5,0]);
drawtext(A.xy + [R, 0], "R = " + R, offset->[5,0]);
drawtext(B.xy, "S1 = " + |A,B|, offset->[5,0]);
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
    {name: "A", type: "Free", pos: [4.0, -4.0, -0.6666666666666666], color: [1.0, 0.0, 0.0]},
    {name: "CR", type: "CircleByRadius", pos: {xx: 0.014705882352941176, yy: 0.014705882352941176, zz: 1.0, xy: 0.0, xz: 0.1764705882352941, yz: 0.1764705882352941}, color: [0.0, 0.0, 1.0], radius: 2.0, args: ["A"]},
    {name: "B", type: "Free", pos: [2.0, -4.0, -0.5], color: [1.0, 0.0, 0.0], size: 3.0},
    {name: "a", type: "Segment", color: [0.0, 0.0, 0.0], args: ["A", "B"], arrowshape: "full", arrowsides: "==>", arrowsize: 1.6, arrowposition: 1.0},
    {name: "O", type: "Free", pos: [0.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], visible: false, pinned: true, labeled: true},
    {name: "CS2", type: "CircleByRadius", pos: {xx: -0.0625, yy: -0.0625, zz: 1.0, xy: 0.0, xz: 0.0, yz: 0.0}, color: [0.0, 0.0, 1.0], radius: 4.0, args: ["O"]}
  ],
  ports: [{
    id: "CSCanvas",
    width: 873,
    height: 547,
    transform: [{visibleRect: [-19.9, 16.14, 15.02, -5.74]}],
    axes: true,
    grid: 1.0,
    snap: true,
    background: "rgb(255,255,255)"
  }],
  csconsole: false,
  cinderella: {build: 1901, version: [2, 9, 1901]}
});
</script>

The large red point controls <script type="text/x-tex">(X_1,Y_1)</script>,
the initial position of the circle.
Its radius <script type="text/x-tex">R</script> can be changed by dragging
the rim of the circle around that red point.
The smaller red point controls <script type="text/x-tex">S_1</script> and
<script type="text/x-tex">B</script>, the speed and direction of the movement
of the circle. More precisely, the position of that point is the center of the
circle at <script type="text/x-tex">t=1</script>.
The central circle can be changed (drag to change radius) to control
<script type="text/x-tex">S_2</script>, the speed along the tangent.
 
The solutions are drawn in red for <script type="text/x-tex">t\lt0</script>
(point of contact in the past) and dark green for
<script type="text/x-tex">t\ge0</script>.
The parameters <script type="text/x-tex">u</script> and
<script type="text/x-tex">t</script> are printed for each solution.

[1]: https://math.stackexchange.com/q/2570925/35416 "Math SE question"
[2]: https://math.stackexchange.com/users/514422/moguzya "Math SE user"
[3]: https://math.stackexchange.com/a/2571152/35416 "Math SE answer"
