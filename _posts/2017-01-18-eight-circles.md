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
    fontFamily: "serif",
    lineSize: 1,
    pointSize: 5.0,
    textsize: 16.0
  },
  angleUnit: "°",
  geometry: [
    {name: "A3", type: "Free", pos: [0.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], pinned: true, labeled: true, printname: "$A_3$"},
    {name: "A5", type: "Free", pos: [4.0, -0.0, 4.0], color: [1.0, 0.0, 0.0], pinned: true, labeled: true, printname: "$A_5$"},
    {name: "a", type: "Join", color: [0.0, 0.0, 0.0], args: ["A3", "A5"], size: 2},
    {name: "A2", type: "PointOnLine", pos: [-2.464996794779396, -0.0, 4.0], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_2$"},
    {name: "A4", type: "PointOnLine", pos: [1.7520403024386404, -0.0, 4.0], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_4$"},
    {name: "A6", type: "PointOnLine", pos: [4.0, -0.0, 2.964738939216909], color: [1.0, 0.0, 0.0], args: ["a"], labeled: true, printname: "$A_6$"},
    {name: "B1", type: "Free", pos: [-1.1446243549591812, 2.409735484124592, 4.0], color: [1.0, 1.0, 0.0], labeled: true, printname: "$B_1$"},
    {name: "C12", type: "Join", color: [0.467, 0.0, 0.718], args: ["A2", "B1"]},
    {name: "C45", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B1", "A4", "A5"]},
    {name: "B4", type: "OtherIntersectionCL", color: [1.0, 1.0, 0.0], args: ["C45", "C12", "B1"], labeled: true, printname: "$B_4$"},
    {name: "H1", type: "Free", pos: [-1.6223225383647628, -4.0, -3.3298610730546923], color: [1.0, 0.0, 0.0], visible: false, labeled: true},
    {name: "H2", type: "CircleByRadius", pos: {xx: 0.832465268263673, yy: 0.832465268263673, zz: {r: 0.6024585681810325, i: -6.876084857604906E-16}, xy: 0.0, xz: -0.8111612691823814, yz: 2.0}, color: [0.0, 0.0, 1.0], radius: 0.9780943618196645, args: ["H1"], size: 2, printname: "$B_5$"},
    {name: "B2", type: "PointOnCircle", pos: [{r: 1.598228188363934, i: 2.7677673806008967E-15}, -4.0, {r: -3.258148350149642, i: -2.6569481009790354E-15}], color: [1.0, 1.0, 0.0], args: ["H2"], labeled: true, printname: "$B_2$"},
    {name: "", type: "OtherPointOnCircle", pos: [4.0, {r: 3.2078050553937434, i: 1.7800696785760408E-15}, {r: 2.7304850065399724, i: -8.383439606222018E-16}], color: [1.0, 1.0, 1.0], args: ["B2"], pinned: true, size: 0.0},
    {name: "C23", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["A2", "A3", "B2"]},
    {name: "C56", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B2", "A5", "A6"]},
    {name: "B5", type: "OtherIntersectionCC", color: [1.0, 1.0, 0.0], args: ["C23", "C56", "B2"], labeled: true, printname: "$B_5$"},
    {name: "B3", type: "PointOnCircle", pos: [{r: 0.44526941860386837, i: 5.950562222791691E-16}, -4.0, {r: -2.119586113669793, i: 3.1956345915128425E-16}], color: [1.0, 1.0, 0.0], args: ["H2"], labeled: true, printname: "$B_3$"},
    {name: "C34", type: "CircleBy3", color: [0.467, 0.0, 0.718], args: ["B3", "A3", "A4"]},
    {name: "C61", type: "Join", color: [0.467, 0.0, 0.718], args: ["B3", "A6"]},
    {name: "B6", type: "OtherIntersectionCL", color: [1.0, 1.0, 0.0], args: ["C34", "C61", "B3"], labeled: true, printname: "$B_6$"},
    {name: "H3", type: "CircleByRadius", pos: {xx: {r: -0.7551828392228931, i: -3.542241397334684E-47}, yy: {r: -0.7551828392228931, i: -3.542241397334684E-47}, zz: 0.9999999999999999, xy: 0.0, xz: {r: -0.9307616390784176, i: -4.365806845382442E-47}, yz: 0.0}, color: [1.0, 0.498, 0.0], radius: 1.3053527137564296, args: ["A2"], size: 2, printname: "$C_{4}$"},
    {name: "C1", type: "Meet", color: [0.0, 1.0, 0.0], args: ["C12", "C61"], labeled: true, printname: "$C_1$"},
    {name: "C3", type: "OtherIntersectionCC", color: [0.0, 1.0, 0.0], args: ["C23", "C34", "A3"], labeled: true, printname: "$C_3$"},
    {name: "C2", type: "OtherIntersectionCL", color: [0.0, 1.0, 0.0], args: ["C23", "C12", "A2"], labeled: true, printname: "$C_2$"},
    {name: "C4", type: "OtherIntersectionCC", color: [0.0, 1.0, 0.0], args: ["C45", "C34", "A4"], labeled: true, printname: "$C_4$"},
    {name: "C5", type: "OtherIntersectionCC", color: [0.0, 1.0, 0.0], args: ["C45", "C56", "A5"], labeled: true, printname: "$C_5$"},
    {name: "C6", type: "OtherIntersectionCL", color: [0.0, 1.0, 0.0], args: ["C56", "C61", "A6"], labeled: true, printname: "$C_6$"},
    {name: "C0", type: "CircleBy3", color: [1.0, 0.0, 0.0], args: ["C6", "C1", "C2"], size: 2, printname: "$C_{0}$"}
  ],
  ports: [{
    id: "CSCanvas",
    width: 680,
    height: 364,
    transform: [{visibleRect: [-2.0219186796482904, 2.4360919659822047, 3.0987692241164675, -0.30498214720951866]}],
    axes: true,
    grid: 0.5,
    background: "rgb(255,255,255)"
  }],
  csconsole: false,
  use: ["katex"],
  cinderella: {build: 1897, version: [2, 9, 1897]}
});
</script>

## Original problem statement

Here is what [Oai Thanh Đào][2] originally asked:

> I am looking for a proof of a problem as follows:
>
> Let six points <script type="text/x-tex">A_1, A_2, A_3, A_4, A_5, A_6</script> lie on a circle. Define <script type="text/x-tex">C(A,B)</script> be any circle through points <script type="text/x-tex">A, B</script>. Let <script type="text/x-tex">C(A_i,A_{i+1}) \cap C(A_{i+3}, A_{i+4}) = B_i, B_{i+3}</script> we take modulo 6. Let <script type="text/x-tex">B_1, B_2, B_3, B_4, B_5</script> lie on a circle <script type="text/x-tex">(C)</script>. Let <script type="text/x-tex">C(A_i,A_{i+1}) \cap C(A_{i+1}, A_{i+2}) = C_{i+1}</script>. Show that <script type="text/x-tex">B_6</script> also lie on the circle <script type="text/x-tex">(C)</script> and six points <script type="text/x-tex">C_1, C_2, C_3, C_4, C_5, C_6</script> lie on a circle.
>
> <img src="https://i.stack.imgur.com/6241g.png" width="90%">

*(Question is licensed [cc-by-sa 3.0](https://creativecommons.org/licenses/by-sa/3.0/) as per Stack Exchange license conditions)*

## My answer

Here is [the answer I wrote][3] to the question above:

### Choice of coordinates

I like coordinates. The incidence relations you are interested in are invariant under Möbius transformations, so a natural setup for this problem would be the one-point compactification of the plane. Think <script type="text/x-tex">\mathbb{CP}^1</script> if you want to, but I'll not use complex numbers for coordinates in this answer. Since your setup is invariant under Möbius transformations, you can choose specific coordinates of three points without loss of generality. So I'll choose <script type="text/x-tex">A_1</script> to be the point at infinity, and fixed coordinates on the <script type="text/x-tex">x</script> axis for two other points. Thus the “circle” through all the <script type="text/x-tex">A_i</script> is the <script type="text/x-tex">x</script> axis in my setup, and I can use parameters for the <script type="text/x-tex">x</script> coordinates of the remaining points.

<script type="text/x-tex;mode=display">A_1=\infty\quad A_2=(a,0)\quad A_3=(0,0)\quad A_4=(b,0)\quad A_5=(1,0)\quad A_6=(c,0)</script>

The interactive illustration above shows this specific version of your configuration. You can move the points around and see the configuration change accordingly. I alternated between fixed and variable points in an attempt to make things more symmetric, in the hope of making individual expressions not too complicated.

Next we can pick an arbitrary point <script type="text/x-tex">B_1=(d,e)</script> anywhere in the plane. This results in the

<script type="text/x-tex;mode=display">B_4=\frac1{(a-d)^2+e^2}\begin{pmatrix}
(a(b-d)+(a-b))(a-d)+ae^2 \\ (a-b)(a-1)e \end{pmatrix}</script>

computed as [the second point of intersection](http://math.stackexchange.com/q/2102900/35416) between the [corresponding circles](http://math.stackexchange.com/q/1018949/35416).

### First condition for cocircularity of the *B*<sub>*i*</sub>

Choosing <script type="text/x-tex">B_2=(x,y)</script> will define the circle through <script type="text/x-tex">B_1,B_2,B_4</script>. On the other hand this allows us to construct <script type="text/x-tex">B_5</script> as the intersection of <script type="text/x-tex">C(A_2,A_3)</script> and <script type="text/x-tex">C(A_5,A_6)</script>. We can and check whether that point lies on the same circle. In general it does not. The [condition](http://math.stackexchange.com/a/599456/35416) for <script type="text/x-tex">B_1,B_2,B_4,B_5</script> to be cocircular can be factored into the following independent conditions:

<script type="text/x-tex;mode=display">\begin{array}{c}
a=1
\\\vee\\
(d-a)^2+e^2=(1-a)(b-a)
\\\vee\\
(a-c-1)(x^2+y^2) + 2cx = ac
\\\vee\\
(a-c)e(x^2+y^2)
 + (-ab + bc - a + b)ex\\
 + ((a-c)((b-d)d - e^2) - (a-b)(c-d))y
 + (a-b)ce=0
\end{array}</script>

The first three of these conditions can be seen as non-degeneracy constraints. If <script type="text/x-tex">a=1</script> then <script type="text/x-tex">A_2=A_5</script>, which is a degenerate situation. The second condition expresses the situation where <script type="text/x-tex">B_1</script> lies on a certain circle around <script type="text/x-tex">A_2</script>, and characterizes the situations where <script type="text/x-tex">B_1</script> and <script type="text/x-tex">B_4</script> would coincide. So if we can assume that all points in the configuration are distinct, then we can concentrate on the last condition.

It describes a circle, so we now know that the point <script type="text/x-tex">B_2</script> must lie on a certain circle if <script type="text/x-tex">B_5</script> is to be cocircular with <script type="text/x-tex">B_1,B_2,B_4</script>. Actually this circle already passes through <script type="text/x-tex">B_1</script> and <script type="text/x-tex">B_4</script>. So knowing all the <script type="text/x-tex">A_i</script> and <script type="text/x-tex">B_1</script> already fixes the circle on which all the <script type="text/x-tex">B_i</script> must lie.

### Second condition for cocircularity of the *B*<sub>*i*</sub>

We can play the same game for <script type="text/x-tex">B_3</script> and <script type="text/x-tex">B_6</script> instead of <script type="text/x-tex">B_2</script> and <script type="text/x-tex">B_5</script>. What's the conditions for <script type="text/x-tex">B_1,B_3,B_4,B_6</script> being cocircular if we choose <script type="text/x-tex">B_3=(x',y')</script>?

<script type="text/x-tex;mode=display">\begin{array}{c}
(d-a)^2+e^2=(1-a)(b-a)
\\\vee\\
(x'-c)^2+{y'}^2=(c-b)c
\\\vee\\
(a-c)e({x'}^2+{y'}^2)
 + (-ab + bc - a + b)ex'\\
 + ((a-c)((b-d)d - e^2) - (a-b)(c-d))y'
 + (a-b)ce=0
\end{array}</script>

The last conditon is the same as above, so if the cocircularity condition is satisfied for <script type="text/x-tex">B_1,B_2,B_4,B_5</script> and all points are distinct, and if <script type="text/x-tex">B_3</script> is chosen from that same circle, too, then the cocircularity condition must be satisfied for <script type="text/x-tex">B_1,B_3,B_4,B_6</script> as well, and all six <script type="text/x-tex">B_i</script> are cocircular.

### Conditions for cocircularity of the *C*<sub>*i*</sub>

A similar game can be played for the <script type="text/x-tex">C_i</script> as well. Their coordinates are considerably more complicated, though, and so are the conditions for cocircularity of four of these. But assuming the <script type="text/x-tex">B_i</script> to be cocircular (i.e. assuming the respective last condition to hold for <script type="text/x-tex">B_2</script> and <script type="text/x-tex">B_3</script>), one can demonstrate that all the points must be cocircular, too. In particular, if the condition for <script type="text/x-tex">B_2</script> holds, then one can show that <script type="text/x-tex">(C_1,C_2,C_5,C_6)</script> and <script type="text/x-tex">(C_2,C_3,C_4,C_5)</script> are cocircular, and if the condition for <script type="text/x-tex">B_3</script> holds, then <script type="text/x-tex">(C_1,C_2,C_3,C_4)</script> and <script type="text/x-tex">(C_1,C_4,C_5,C_6)</script> are cocircular. If both hold, then all points must be cocircular. You could start by defining the circle via <script type="text/x-tex">C_1,C_2,C_3</script>, then add <script type="text/x-tex">C_4</script> due to <script type="text/x-tex">(C_1,C_2,C_3,C_4)</script>, add <script type="text/x-tex">C_5</script> due to <script type="text/x-tex">(C_2,C_3,C_4,C_5)</script> and add <script type="text/x-tex">C_6</script> due to <script type="text/x-tex">(C_1,C_4,C_5,C_6)</script>. All again assuming distinct points, of course.

## My computation

This is the [Sage](http://www.sagemath.org/) code which I used to compute the answer above.

First define a polynomial ring for all operations:

```python
PR.<a,b,c,d,e,x1,y1,x2,y2> = ZZ[]
```

Declare the matrix of the bilinear form of our Möbius geometry:

```python
L = matrix([[2, 0, 0, 0], [0, 2, 0, 0], [0, 0, 0, -1], [0, 0, -1, 0]]); L
```

    [ 2  0  0  0]
    [ 0  2  0  0]
    [ 0  0  0 -1]
    [ 0  0 -1  0]

Declare the point at infinity:

```python
Pinf = vector([0, 0, 1, 0])
```

Define some utility functions:

```python
def simpl(v, simplify=True):
    """Simplify homogeneous coordinate vectors by canceling common factors."""
    if not simplify:
        return v
    if v.is_zero():
        return v
    g = gcd(v.list())
    if g.degree() > 0:
        print("Canceling {}".format(g.factor()))
    return v.parent()(v / g)
```

```python
def hom2circ(x, y, z):
    """Turn a point with given homogeneous coordinates into a circle of radius zero."""
    res = vector([x*z, y*z, x^2+y^2, z^2])
    assert not (res*L*res)
    return res
```

```python
def circThrough(a, b, c, simplify=True):
    """If a,b,c are points construct circle through them.
    More generally construct circle perpendicular to a,b,c."""
    d, e, f, g = (matrix([a, b, c])*L).minors(3)
    res = simpl(vector([-g, f, -e, d]), simplify)
    assert not (a*L*res or b*L*res or c*L*res)
    return res
```

```python
def otherPOI(a, b, p, simplify=True):
    """Other point of intersection"""
    assert not (a*L*p or b*L*p)
    # we want aLq = bLq = qLq = 0 but q ≠ p
    h = circThrough(a, b, Pinf, simplify) # line connecting centers
    q = simpl((h*L*h)*p - 2*(p*L*h)*h, simplify)
    assert not (a*L*q or b*L*q or q*L*q)
    return q
```

```python
def cocircular(a, b, c, d):
    """Check whether 4 points are cocircular. Returns zero if that is the case.
    More generally whether there exists a circle perpendicular to the 4 given ones."""
    return matrix([a, b, c, d]).det()
```

Choose coordinates on the real axis for all the <script type="text/x-tex">A_i</script>, with three points fixed and three points controlled by a single parameter. All of this is without loss of generality.

```python
A1 = hom2circ(1, 0, 0)
A2 = hom2circ(a, 0, 1)
A3 = hom2circ(0, 0, 1)
A4 = hom2circ(b, 0, 1)
A5 = hom2circ(1, 0, 1)
A6 = hom2circ(c, 0, 1)
```

Now pick two generic coordinates for <script type="text/x-tex">B_1</script> and <script type="text/x-tex">B_2</script> anywhere in the plane.

```python
B1 = hom2circ(d, e, 1)
B2 = hom2circ(x1, y1, 1)
```

This defines four circles, where I write `Cij` for <script type="text/x-tex">C(A_i,A_j)</script>.

```python
C12 = circThrough(A1, A2, B1)
C45 = circThrough(A4, A5, B1)
C23 = circThrough(A2, A3, B2)
C56 = circThrough(A5, A6, B2)
```

    Canceling 2 * (b - 1)
    Canceling 2 * a
    Canceling 2 * (c - 1)

These circles in turn define two more points, as extra points of intersection.

```python
B4 = otherPOI(C12, C45, B1)
B5 = otherPOI(C23, C56, B2)
```

    Canceling 2^2 * e
    Canceling 2^2 * y1

To give an example of how such a point of intersection would actually be formulated, we have a closer look at <script type="text/x-tex">B_4</script>.

```python
B4[:2]/B4[-1]
```

    ((a^2*b - a^2*d - a*b*d + a*d^2 + a*e^2 + a^2 - a*b - a*d + b*d)/(a^2 - 2*a*d + d^2 + e^2),
     (a^2*e - a*b*e - a*e + b*e)/(a^2 - 2*a*d + d^2 + e^2))

```python
(a*(b-d)+(a-b))*(a-d)+a*e^2 - B4[0]
```

    0

```python
(a-b)*(a-1)*e - B4[1]
```

    0

```python
(a-d)^2+e^2 - B4[-1]
```

    0

So here we know that <script type="text/x-tex">B_4</script> can be written as

<script type="text/x-tex;mode=display">B_4=\frac1{(a-d)^2+e^2}\begin{pmatrix}
(a(b-d)+(a-b))(a-d)+ae^2 \\ (a-b)(a-1)e \end{pmatrix}</script>

Next, investigate the condition that <script type="text/x-tex">B_1,B_2,B_4,B_5</script> are cocircular.

```python
cond1 = cocircular(B1, B2, B4, B5) # whole condition
cond1.factor()
```

      (a - 1)
    * (a*b - 2*a*d + d^2 + e^2 + a - b)
    * (-a*x1^2 + c*x1^2 - a*y1^2 + c*y1^2 + a*c - 2*c*x1 + x1^2 + y1^2)
    * (a*b*e*x1 - b*c*e*x1 - a*e*x1^2 + c*e*x1^2 - a*b*d*y1 + b*c*d*y1 + a*d^2*y1 - c*d^2*y1 + a*e^2*y1 - c*e^2*y1 - a*e*y1^2 + c*e*y1^2 - a*c*e + b*c*e + a*e*x1 - b*e*x1 + a*c*y1 - b*c*y1 - a*d*y1 + b*d*y1)

Verify that the second and third factors describe situations where pairs of <script type="text/x-tex">B_i</script> coincide.

```python
gcd(matrix([B1, B4]).minors(2)) == cond1.factor()[1][0] # B1 and B4 coincide
```

    True

```python
gcd(matrix([B2, B5]).minors(2)) == cond1.factor()[2][0] # B2 and B5 coincide
```

    True

So now we can concentrate on the last factor, which is an actual requirement for <script type="text/x-tex">B_2</script>.

```python
cond2 = -cond1.factor()[-1][0] # last factor
```

```python
for _ in cond1.factor()[-1][0].polynomial(x1):
    print _.polynomial(_.parent(y1))
```

    (-a*e + c*e)*y1^2 + (-a*b*d + b*c*d + a*d^2 - c*d^2 + a*e^2 - c*e^2 + a*c - b*c - a*d + b*d)*y1 - a*c*e + b*c*e
    a*b*e - b*c*e + a*e - b*e
    -a*e + c*e

I manually simplified these terms, and used the following to check my own version:

```python
(1
 * (a-1)
 * ((d-a)^2+e^2-(1-a)*(b-a))
 * ((a-c-1)*(x1^2+y1^2) + 2*c*x1 - a*c)
 * (((a-c)*e)*(x1^2+y1^2)
   + (-a*b + b*c - a + b)*e*x1
   + ((a-c)*((b-d)*d - e^2) - (a-b)*(c-d))*y1
   + (a-b)*c*e)) == cond1
```

    True

Check that <script type="text/x-tex">B_1</script> and <script type="text/x-tex">B_4</script> lie on the circle described by the last factor.

```python
cond2(x1=B1[0]/B1[-1], y1=B1[1]/B1[-1])
```

    0

```python
cond2(x1=B4[0]/B4[-1], y1=B4[1]/B4[-1])
```

    0

We might also want to express this circle as a circle vector.

```python
CB = vector([
    (-a*b+b*c-a+b)*e,
    (a-c)*((b-d)*d-e^2)-(a-b)*(c-d),
    -2*(a-b)*c*e,
    -2*(a-c)*e
])
```

Make sure the vector describes the same circle as the condition.

```python
CB*L*B2 == 2*cond2
```

    True

Using this circle formulation we have another way to express <script type="text/x-tex">B_1</script> and <script type="text/x-tex">B_4</script> lying on the same circle:

```python
[CB*L*B1, CB*L*B4]
```

    [0, 0]

Next, pick <script type="text/x-tex">B_3</script> as another generic point in the plane and do the same steps as above:

```python
B3 = hom2circ(x2, y2, 1)
C34 = circThrough(A3, A4, B3)
C61 = circThrough(A6, A1, B3)
B6 = otherPOI(C34, C61, B3)
```

    Canceling 2 * b
    Canceling 2^2 * y2

```python
cond3 = cocircular(B1, B3, B4, B6)
cond3.factor()
```

      (-1)
    * (b*c - 2*c*x2 + x2^2 + y2^2)
    * (a*b - 2*a*d + d^2 + e^2 + a - b)
    * (a*b*e*x2 - b*c*e*x2 - a*e*x2^2 + c*e*x2^2 - a*b*d*y2 + b*c*d*y2 + a*d^2*y2 - c*d^2*y2 + a*e^2*y2 - c*e^2*y2 - a*e*y2^2 + c*e*y2^2 - a*c*e + b*c*e + a*e*x2 - b*e*x2 + a*c*y2 - b*c*y2 - a*d*y2 + b*d*y2)

```python
cond4 = -cond3.factor()[-1][0]
cond4(x2=x1, y2=y1) == cond2
```

    True

The above shows that the last condition is the same for <script type="text/x-tex">B_1,B_2,B_4,B_5</script> being cocircular and for <script type="text/x-tex">B_1,B_3,B_4,B_6</script> being cocircular. Again I reformulated the whole condition, and want to make sure I didn't have a sign wrong.

```python
cond3 == (1
 * ((x2-c)^2+y2^2-(c-b)*c)
 * ((d-a)^2+e^2-(1-a)*(b-a))
 * cond2(x1=x2, y1=y2))
```

    True

Now on to the points <script type="text/x-tex">C_i</script> which result from yet another bunch of circle-circle intersections.

```python
C2 = otherPOI(C12, C23, A2)
C3 = otherPOI(C23, C34, A3)
C4 = otherPOI(C34, C45, A4)
C5 = otherPOI(C45, C56, A5)
C6 = otherPOI(C56, C61, A6)
```

Unfortunately <script type="text/x-tex">C_1</script> can't be computed like this, since <script type="text/x-tex">A_1</script> is the point at infinity.

```python
C1 = otherPOI(C61, C12, A1); C1
```

    Canceling (-1) * 2^2 * (-c*e + e*x2 + a*y2 - d*y2)
    (0, 0, 0, 0)

Instead we can do a line-line intersection like this:

```python
C1 = simpl(hom2circ(*(diagonal_matrix([1,1,-2])*C61[:3].cross_product(C12[:3]))))
[C1*L*C61, C1*L*C12]
```

    [0, 0]

Let's check for cocirularities again. Doing one example first, to know what kind of expressions we're looking at.

```python
cocircular(C1, C2, C3, C4).factor()
```

      y2
    * e
    * (a*b*e*x2 - b*c*e*x2 - a*e*x2^2 + c*e*x2^2 - a*b*d*y2 + b*c*d*y2 + a*d^2*y2 - c*d^2*y2 + a*e^2*y2 - c*e^2*y2 - a*e*y2^2 + c*e*y2^2 - a*c*e + b*c*e + a*e*x2 - b*e*x2 + a*c*y2 - b*c*y2 - a*d*y2 + b*d*y2)
    * (-a*c*e^2*x1 + c*e^2*x1^2 + a^2*c*e*y1 - a*c*d*e*y1 + c*e^2*y1^2 + a*e^2*x1*x2 - e^2*x1^2*x2 - a^2*e*y1*x2 + a*d*e*y1*x2 - e^2*y1^2*x2 + a^2*e*x1*y2 - a*d*e*x1*y2 - a*e*x1^2*y2 + d*e*x1^2*y2 - a^2*c*y1*y2 + 2*a*c*d*y1*y2 - c*d^2*y1*y2 + a*e^2*y1*y2 - c*e^2*y1*y2 - a*e*y1^2*y2 + d*e*y1^2*y2)
    * (a*b*e*x1*y1*x2 - b*e*x1^2*y1*x2 - a^2*b*y1^2*x2 + a*b*d*y1^2*x2 - b*e*y1^3*x2 - a*e*x1*y1*x2^2 + e*x1^2*y1*x2^2 + a^2*y1^2*x2^2 - a*d*y1^2*x2^2 + e*y1^3*x2^2 - a^2*e*x1^2*y2 + 2*a*e*x1^3*y2 - e*x1^4*y2 + a^2*b*x1*y1*y2 - a*b*d*x1*y1*y2 - a*b*x1^2*y1*y2 + b*d*x1^2*y1*y2 - a^2*e*y1^2*y2 + a*b*e*y1^2*y2 + 2*a*e*x1*y1^2*y2 - 2*e*x1^2*y1^2*y2 - a*b*y1^3*y2 + b*d*y1^3*y2 - e*y1^4*y2 - a*e*x1*y1*y2^2 + e*x1^2*y1*y2^2 + a^2*y1^2*y2^2 - a*d*y1^2*y2^2 + e*y1^3*y2^2)
    * (a*b^2*e*y1*x2^2 - 2*a*b*e*y1*x2^3 + a*e*y1*x2^4 - a*b^2*e*x1*x2*y2 + b^2*e*x1^2*x2*y2 - a*b^2*d*y1*x2*y2 + a*b*d^2*y1*x2*y2 + a*b*e^2*y1*x2*y2 + b^2*e*y1^2*x2*y2 + a*b*e*x1*x2^2*y2 - b*e*x1^2*x2^2*y2 + a*b*d*y1*x2^2*y2 - a*d^2*y1*x2^2*y2 - a*e^2*y1*x2^2*y2 - b*e*y1^2*x2^2*y2 + a*b^2*d*x1*y2^2 - a*b*d^2*x1*y2^2 - a*b*e^2*x1*y2^2 - b^2*d*x1^2*y2^2 + b*d^2*x1^2*y2^2 + b*e^2*x1^2*y2^2 - b^2*d*y1^2*y2^2 + b*d^2*y1^2*y2^2 + b*e^2*y1^2*y2^2 - 2*a*b*e*y1*x2*y2^2 + 2*a*e*y1*x2^2*y2^2 + a*b*e*x1*y2^3 - b*e*x1^2*y2^3 + a*b*d*y1*y2^3 - a*d^2*y1*y2^3 - a*e^2*y1*y2^3 - b*e*y1^2*y2^3 + a*e*y1*y2^4 - b^2*e*y1*x2^2 + 2*b*e*y1*x2^3 - e*y1*x2^4 + a*b*e*x1*x2*y2 - b*e*x1^2*x2*y2 + a*b^2*y1*x2*y2 - a*b*d*y1*x2*y2 - b*e*y1^2*x2*y2 - a*e*x1*x2^2*y2 + e*x1^2*x2^2*y2 - a*b*y1*x2^2*y2 + a*d*y1*x2^2*y2 + e*y1^2*x2^2*y2 - a*b^2*x1*y2^2 + a*b*d*x1*y2^2 + b^2*x1^2*y2^2 - b*d*x1^2*y2^2 + a*b*e*y1*y2^2 - b^2*e*y1*y2^2 + b^2*y1^2*y2^2 - b*d*y1^2*y2^2 + 2*b*e*y1*x2*y2^2 - 2*e*y1*x2^2*y2^2 - a*e*x1*y2^3 + e*x1^2*y2^3 - a*b*y1*y2^3 + a*d*y1*y2^3 + e*y1^2*y2^3 - e*y1*y2^4)

Now let's compute all the cocircularity conditions together. Since a single cocircularity condition is the value of a <script type="text/x-tex">4\times 4</script> determinant, all of them can be computed as the list of all such determinants, or minors:

```python
cond5 = matrix([C1, C2, C3, C4, C5, C6]).minors(4) # Warning, this takes some time!
```

The minors are returned in lexicographical order, so we can compute the quadruple of circles for each of them in the following way:

```python
conditionLabels = sorted(Combinations(["C1", "C2", "C3", "C4", "C5", "C6"], 4))
conditionLabels
```

    [['C1', 'C2', 'C3', 'C4'],
     ['C1', 'C2', 'C3', 'C5'],
     ['C1', 'C2', 'C3', 'C6'],
     ['C1', 'C2', 'C4', 'C5'],
     ['C1', 'C2', 'C4', 'C6'],
     ['C1', 'C2', 'C5', 'C6'],
     ['C1', 'C3', 'C4', 'C5'],
     ['C1', 'C3', 'C4', 'C6'],
     ['C1', 'C3', 'C5', 'C6'],
     ['C1', 'C4', 'C5', 'C6'],
     ['C2', 'C3', 'C4', 'C5'],
     ['C2', 'C3', 'C4', 'C6'],
     ['C2', 'C3', 'C5', 'C6'],
     ['C2', 'C4', 'C5', 'C6'],
     ['C3', 'C4', 'C5', 'C6']]

Now let's find out which cocircularities are implied by each of our conditions.

```python
[_[1] for _ in zip(cond5, conditionLabels) if cond2.divides(_[0])]
```

    [['C1', 'C2', 'C5', 'C6'], ['C2', 'C3', 'C4', 'C5']]

```python
[_[1] for _ in zip(cond5, conditionLabels) if cond4.divides(_[0])]
```

    [['C1', 'C2', 'C3', 'C4'], ['C1', 'C4', 'C5', 'C6']]

All other cocircularities between any four of these <script type="text/x-tex">C_i</script> can be deduced from these.

## Coordinates

To make it easier to verify individual steps, I'll just include coordinates for all the relevant objects.

```python
C12
```

    (e, a - d, 2*a*e, 0)

```python
C23
```

    (a*y1, -a*x1 + x1^2 + y1^2, 0, 2*y1)

```python
-C34
```

    (b*y2, -b*x2 + x2^2 + y2^2, 0, 2*y2)

```python
C45
```

    (b*e + e, -b*d + d^2 + e^2 + b - d, 2*b*e, 2*e)

```python
-C56
```

    (c*y1 + y1, -c*x1 + x1^2 + y1^2 + c - x1, 2*c*y1, 2*y1)

```python
-C61
```

    (y2, c - x2, 2*c*y2, 0)

```python
B1.column()
```

    [        d]
    [        e]
    [d^2 + e^2]
    [        1]

```python
B2.column()
```

    [         x1]
    [         y1]
    [x1^2 + y1^2]
    [          1]

```python
B3.column()
```

    [         x2]
    [         y2]
    [x2^2 + y2^2]
    [          1]

```python
B4.column()
```

    [                                      a^2*b - a^2*d - a*b*d + a*d^2 + a*e^2 + a^2 - a*b - a*d + b*d]
    [                                                                          a^2*e - a*b*e - a*e + b*e]
    [a^2*b^2 - 2*a^2*b*d + a^2*d^2 + a^2*e^2 + 2*a^2*b - 2*a*b^2 - 2*a^2*d + 2*a*b*d + a^2 - 2*a*b + b^2]
    [                                                                            a^2 - 2*a*d + d^2 + e^2]

```python
B5.column()
```

    [                                                       a^2*c*x1 - a*c^2*x1 - a*c*x1^2 + c^2*x1^2 - a*c*y1^2 + c^2*y1^2 + a*c^2 - a*c*x1 - c^2*x1 + c*x1^2 + c*y1^2]
    [                                                                                                                             a^2*c*y1 - a*c^2*y1 - a*c*y1 + c^2*y1]
    [                                                                                                                        a^2*c^2 - 2*a*c^2*x1 + c^2*x1^2 + c^2*y1^2]
    [a^2*x1^2 - 2*a*c*x1^2 + c^2*x1^2 + a^2*y1^2 - 2*a*c*y1^2 + c^2*y1^2 + 2*a*c*x1 - 2*c^2*x1 - 2*a*x1^2 + 2*c*x1^2 - 2*a*y1^2 + 2*c*y1^2 + c^2 - 2*c*x1 + x1^2 + y1^2]

```python
B6.column()
```

    [ b*c^2 - b*c*x2 - c^2*x2 + c*x2^2 + c*y2^2]
    [                          -b*c*y2 + c^2*y2]
    [b^2*c^2 - 2*b*c^2*x2 + c^2*x2^2 + c^2*y2^2]
    [                c^2 - 2*c*x2 + x2^2 + y2^2]

```python
C1.column()
```

    [                     a*c^2*e^2 - 2*a*c*e^2*x2 + a*e^2*x2^2 - a^2*c*e*y2 - a*c^2*e*y2 + a*c*d*e*y2 + c^2*d*e*y2 + a^2*e*x2*y2 + a*c*e*x2*y2 - a*d*e*x2*y2 - c*d*e*x2*y2 + a^2*c*y2^2 - 2*a*c*d*y2^2 + c*d^2*y2^2]
    [                                                                                                       -a*c*e^2*y2 + c^2*e^2*y2 + a*e^2*x2*y2 - c*e^2*x2*y2 + a^2*e*y2^2 - a*c*e*y2^2 - a*d*e*y2^2 + c*d*e*y2^2]
    [a^2*c^2*e^2 - 2*a^2*c*e^2*x2 + a^2*e^2*x2^2 - 2*a^2*c^2*e*y2 + 2*a*c^2*d*e*y2 + 2*a^2*c*e*x2*y2 - 2*a*c*d*e*x2*y2 + a^2*c^2*y2^2 - 2*a*c^2*d*y2^2 + c^2*d^2*y2^2 + a^2*e^2*y2^2 - 2*a*c*e^2*y2^2 + c^2*e^2*y2^2]
    [                                                                                       c^2*e^2 - 2*c*e^2*x2 + e^2*x2^2 - 2*a*c*e*y2 + 2*c*d*e*y2 + 2*a*e*x2*y2 - 2*d*e*x2*y2 + a^2*y2^2 - 2*a*d*y2^2 + d^2*y2^2]

```python
C2.column()
```

    [            a^2*e*x1*y1 - a*d*e*x1*y1 - a*e*x1^2*y1 + d*e*x1^2*y1 + a*e^2*y1^2 - a*e*y1^3 + d*e*y1^3]
    [                                     -a*e^2*x1*y1 + e^2*x1^2*y1 + a^2*e*y1^2 - a*d*e*y1^2 + e^2*y1^3]
    [a^2*e^2*x1^2 - 2*a*e^2*x1^3 + e^2*x1^4 + a^2*e^2*y1^2 - 2*a*e^2*x1*y1^2 + 2*e^2*x1^2*y1^2 + e^2*y1^4]
    [                                                         a^2*y1^2 - 2*a*d*y1^2 + d^2*y1^2 + e^2*y1^2]

```python
C3.column()
```

    [a*b^2*y1^2*x2^2 - 2*a*b*y1^2*x2^3 + a*y1^2*x2^4 - a^2*b*x1*y1*x2*y2 - a*b^2*x1*y1*x2*y2 + a*b*x1^2*y1*x2*y2 + b^2*x1^2*y1*x2*y2 + a*b*y1^3*x2*y2 + b^2*y1^3*x2*y2 + a^2*x1*y1*x2^2*y2 + a*b*x1*y1*x2^2*y2 - a*x1^2*y1*x2^2*y2 - b*x1^2*y1*x2^2*y2 - a*y1^3*x2^2*y2 - b*y1^3*x2^2*y2 + a^2*b*x1^2*y2^2 - 2*a*b*x1^3*y2^2 + b*x1^4*y2^2 - 2*a*b*x1*y1^2*y2^2 + 2*b*x1^2*y1^2*y2^2 + b*y1^4*y2^2 - 2*a*b*y1^2*x2*y2^2 + 2*a*y1^2*x2^2*y2^2 + a^2*x1*y1*y2^3 + a*b*x1*y1*y2^3 - a*x1^2*y1*y2^3 - b*x1^2*y1*y2^3 - a*y1^3*y2^3 - b*y1^3*y2^3 + a*y1^2*y2^4]
    [                                                                                                                                                                                                                                                                                                                               -a^2*b*y1^2*x2*y2 + a*b^2*y1^2*x2*y2 + a^2*y1^2*x2^2*y2 - a*b*y1^2*x2^2*y2 + a^2*b*x1*y1*y2^2 - a*b^2*x1*y1*y2^2 - a*b*x1^2*y1*y2^2 + b^2*x1^2*y1*y2^2 - a*b*y1^3*y2^2 + b^2*y1^3*y2^2 + a^2*y1^2*y2^3 - a*b*y1^2*y2^3]
    [                                                                                                      a^2*b^2*y1^2*x2^2 - 2*a^2*b*y1^2*x2^3 + a^2*y1^2*x2^4 - 2*a^2*b^2*x1*y1*x2*y2 + 2*a*b^2*x1^2*y1*x2*y2 + 2*a*b^2*y1^3*x2*y2 + 2*a^2*b*x1*y1*x2^2*y2 - 2*a*b*x1^2*y1*x2^2*y2 - 2*a*b*y1^3*x2^2*y2 + a^2*b^2*x1^2*y2^2 - 2*a*b^2*x1^3*y2^2 + b^2*x1^4*y2^2 - 2*a*b^2*x1*y1^2*y2^2 + 2*b^2*x1^2*y1^2*y2^2 + b^2*y1^4*y2^2 - 2*a^2*b*y1^2*x2*y2^2 + 2*a^2*y1^2*x2^2*y2^2 + 2*a^2*b*x1*y1*y2^3 - 2*a*b*x1^2*y1*y2^3 - 2*a*b*y1^3*y2^3 + a^2*y1^2*y2^4]
    [                                                                                                                                        b^2*y1^2*x2^2 - 2*b*y1^2*x2^3 + y1^2*x2^4 - 2*a*b*x1*y1*x2*y2 + 2*b*x1^2*y1*x2*y2 + 2*b*y1^3*x2*y2 + 2*a*x1*y1*x2^2*y2 - 2*x1^2*y1*x2^2*y2 - 2*y1^3*x2^2*y2 + a^2*x1^2*y2^2 - 2*a*x1^3*y2^2 + x1^4*y2^2 + a^2*y1^2*y2^2 - 2*a*b*y1^2*y2^2 + b^2*y1^2*y2^2 - 2*a*x1*y1^2*y2^2 + 2*x1^2*y1^2*y2^2 + y1^4*y2^2 - 2*b*y1^2*x2*y2^2 + 2*y1^2*x2^2*y2^2 + 2*a*x1*y1*y2^3 - 2*x1^2*y1*y2^3 - 2*y1^3*y2^3 + y1^2*y2^4]

```python
C4.column()
```

    [                                                                                                                                                                                                                              b^2*e^2*x2^2 - 2*b*e^2*x2^3 + e^2*x2^4 - b^2*d*e*x2*y2 + b*d^2*e*x2*y2 + b*e^3*x2*y2 + b*d*e*x2^2*y2 - d^2*e*x2^2*y2 - e^3*x2^2*y2 - 2*b*e^2*x2*y2^2 + 2*e^2*x2^2*y2^2 + b*d*e*y2^3 - d^2*e*y2^3 - e^3*y2^3 + e^2*y2^4 + b^2*e*x2*y2 - b*d*e*x2*y2 - b*e*x2^2*y2 + d*e*x2^2*y2 + b*e^2*y2^2 - b*e*y2^3 + d*e*y2^3]
    [                                                                                                                                                                                                                                                                                                                                                                                         b^2*e^2*x2*y2 - b*e^2*x2^2*y2 - b^2*d*e*y2^2 + b*d^2*e*y2^2 + b*e^3*y2^2 - b*e^2*y2^3 - b*e^2*x2*y2 + e^2*x2^2*y2 + b^2*e*y2^2 - b*d*e*y2^2 + e^2*y2^3]
    [                                                                                                                                                                                                                                                                                                                                                                                                                                           b^2*e^2*x2^2 - 2*b*e^2*x2^3 + e^2*x2^4 + b^2*e^2*y2^2 - 2*b*e^2*x2*y2^2 + 2*e^2*x2^2*y2^2 + e^2*y2^4]
    [b^2*e^2*x2^2 - 2*b*e^2*x2^3 + e^2*x2^4 - 2*b^2*d*e*x2*y2 + 2*b*d^2*e*x2*y2 + 2*b*e^3*x2*y2 + 2*b*d*e*x2^2*y2 - 2*d^2*e*x2^2*y2 - 2*e^3*x2^2*y2 + b^2*d^2*y2^2 - 2*b*d^3*y2^2 + d^4*y2^2 - 2*b*d*e^2*y2^2 + 2*d^2*e^2*y2^2 + e^4*y2^2 - 2*b*e^2*x2*y2^2 + 2*e^2*x2^2*y2^2 + 2*b*d*e*y2^3 - 2*d^2*e*y2^3 - 2*e^3*y2^3 + e^2*y2^4 + 2*b^2*e*x2*y2 - 2*b*d*e*x2*y2 - 2*b*e*x2^2*y2 + 2*d*e*x2^2*y2 - 2*b^2*d*y2^2 + 4*b*d^2*y2^2 - 2*d^3*y2^2 + 2*b*e^2*y2^2 - 2*d*e^2*y2^2 - 2*b*e*y2^3 + 2*d*e*y2^3 + b^2*y2^2 - 2*b*d*y2^2 + d^2*y2^2 + e^2*y2^2]

```python
C5.column()
```

    [b*c^2*e^2*x1^2 - 2*b*c*e^2*x1^3 + b*e^2*x1^4 - b^2*c*d*e*x1*y1 - b*c^2*d*e*x1*y1 + b*c*d^2*e*x1*y1 + c^2*d^2*e*x1*y1 + b*c*e^3*x1*y1 + c^2*e^3*x1*y1 + b^2*d*e*x1^2*y1 + b*c*d*e*x1^2*y1 - b*d^2*e*x1^2*y1 - c*d^2*e*x1^2*y1 - b*e^3*x1^2*y1 - c*e^3*x1^2*y1 + b^2*c*d^2*y1^2 - 2*b*c*d^3*y1^2 + c*d^4*y1^2 - 2*b*c*d*e^2*y1^2 + 2*c*d^2*e^2*y1^2 + c*e^4*y1^2 - 2*b*c*e^2*x1*y1^2 + 2*b*e^2*x1^2*y1^2 + b^2*d*e*y1^3 + b*c*d*e*y1^3 - b*d^2*e*y1^3 - c*d^2*e*y1^3 - b*e^3*y1^3 - c*e^3*y1^3 + b*e^2*y1^4 - 2*b*c^2*e^2*x1 + 4*b*c*e^2*x1^2 - 2*b*e^2*x1^3 + b^2*c*d*e*y1 + b*c^2*d*e*y1 - b*c*d^2*e*y1 - c^2*d^2*e*y1 - b*c*e^3*y1 - c^2*e^3*y1 + b^2*c*e*x1*y1 + b*c^2*e*x1*y1 - b^2*d*e*x1*y1 - 2*b*c*d*e*x1*y1 - c^2*d*e*x1*y1 + b*d^2*e*x1*y1 + c*d^2*e*x1*y1 + b*e^3*x1*y1 + c*e^3*x1*y1 - b^2*e*x1^2*y1 - b*c*e*x1^2*y1 + b*d*e*x1^2*y1 + c*d*e*x1^2*y1 - 2*b^2*c*d*y1^2 + 4*b*c*d^2*y1^2 - 2*c*d^3*y1^2 + b^2*e^2*y1^2 + 2*b*c*e^2*y1^2 + c^2*e^2*y1^2 - 2*c*d*e^2*y1^2 - 2*b*e^2*x1*y1^2 - b^2*e*y1^3 - b*c*e*y1^3 + b*d*e*y1^3 + c*d*e*y1^3 + b*c^2*e^2 - 2*b*c*e^2*x1 + b*e^2*x1^2 - b^2*c*e*y1 - b*c^2*e*y1 + b*c*d*e*y1 + c^2*d*e*y1 + b^2*e*x1*y1 + b*c*e*x1*y1 - b*d*e*x1*y1 - c*d*e*x1*y1 + b^2*c*y1^2 - 2*b*c*d*y1^2 + c*d^2*y1^2]
    [                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   -b^2*c*e^2*x1*y1 + b*c^2*e^2*x1*y1 + b^2*e^2*x1^2*y1 - b*c*e^2*x1^2*y1 + b^2*c*d*e*y1^2 - b*c^2*d*e*y1^2 - b*c*d^2*e*y1^2 + c^2*d^2*e*y1^2 - b*c*e^3*y1^2 + c^2*e^3*y1^2 + b^2*e^2*y1^3 - b*c*e^2*y1^3 + b^2*c*e^2*y1 - b*c^2*e^2*y1 - b^2*e^2*x1*y1 + 2*b*c*e^2*x1*y1 - c^2*e^2*x1*y1 - b*e^2*x1^2*y1 + c*e^2*x1^2*y1 - b^2*c*e*y1^2 + b*c^2*e*y1^2 - b^2*d*e*y1^2 + 2*b*c*d*e*y1^2 - c^2*d*e*y1^2 + b*d^2*e*y1^2 - c*d^2*e*y1^2 + b*e^3*y1^2 - c*e^3*y1^2 - b*e^2*y1^3 + c*e^2*y1^3 - b*c*e^2*y1 + c^2*e^2*y1 + b*e^2*x1*y1 - c*e^2*x1*y1 + b^2*e*y1^2 - b*c*e*y1^2 - b*d*e*y1^2 + c*d*e*y1^2]
    [                                                                                                                                                                                b^2*c^2*e^2*x1^2 - 2*b^2*c*e^2*x1^3 + b^2*e^2*x1^4 - 2*b^2*c^2*d*e*x1*y1 + 2*b*c^2*d^2*e*x1*y1 + 2*b*c^2*e^3*x1*y1 + 2*b^2*c*d*e*x1^2*y1 - 2*b*c*d^2*e*x1^2*y1 - 2*b*c*e^3*x1^2*y1 + b^2*c^2*d^2*y1^2 - 2*b*c^2*d^3*y1^2 + c^2*d^4*y1^2 - 2*b*c^2*d*e^2*y1^2 + 2*c^2*d^2*e^2*y1^2 + c^2*e^4*y1^2 - 2*b^2*c*e^2*x1*y1^2 + 2*b^2*e^2*x1^2*y1^2 + 2*b^2*c*d*e*y1^3 - 2*b*c*d^2*e*y1^3 - 2*b*c*e^3*y1^3 + b^2*e^2*y1^4 - 2*b^2*c^2*e^2*x1 + 4*b^2*c*e^2*x1^2 - 2*b^2*e^2*x1^3 + 2*b^2*c^2*d*e*y1 - 2*b*c^2*d^2*e*y1 - 2*b*c^2*e^3*y1 + 2*b^2*c^2*e*x1*y1 - 2*b^2*c*d*e*x1*y1 - 2*b*c^2*d*e*x1*y1 + 2*b*c*d^2*e*x1*y1 + 2*b*c*e^3*x1*y1 - 2*b^2*c*e*x1^2*y1 + 2*b*c*d*e*x1^2*y1 - 2*b^2*c^2*d*y1^2 + 4*b*c^2*d^2*y1^2 - 2*c^2*d^3*y1^2 + 2*b^2*c*e^2*y1^2 + 2*b*c^2*e^2*y1^2 - 2*c^2*d*e^2*y1^2 - 2*b^2*e^2*x1*y1^2 - 2*b^2*c*e*y1^3 + 2*b*c*d*e*y1^3 + b^2*c^2*e^2 - 2*b^2*c*e^2*x1 + b^2*e^2*x1^2 - 2*b^2*c^2*e*y1 + 2*b*c^2*d*e*y1 + 2*b^2*c*e*x1*y1 - 2*b*c*d*e*x1*y1 + b^2*c^2*y1^2 - 2*b*c^2*d*y1^2 + c^2*d^2*y1^2 + b^2*e^2*y1^2 - 2*b*c*e^2*y1^2 + c^2*e^2*y1^2]
    [                                                                                                                                                                                                                                                                                                                                                                                                    c^2*e^2*x1^2 - 2*c*e^2*x1^3 + e^2*x1^4 - 2*b*c*d*e*x1*y1 + 2*c*d^2*e*x1*y1 + 2*c*e^3*x1*y1 + 2*b*d*e*x1^2*y1 - 2*d^2*e*x1^2*y1 - 2*e^3*x1^2*y1 + b^2*d^2*y1^2 - 2*b*d^3*y1^2 + d^4*y1^2 + b^2*e^2*y1^2 - 2*b*c*e^2*y1^2 + c^2*e^2*y1^2 - 2*b*d*e^2*y1^2 + 2*d^2*e^2*y1^2 + e^4*y1^2 - 2*c*e^2*x1*y1^2 + 2*e^2*x1^2*y1^2 + 2*b*d*e*y1^3 - 2*d^2*e*y1^3 - 2*e^3*y1^3 + e^2*y1^4 - 2*c^2*e^2*x1 + 4*c*e^2*x1^2 - 2*e^2*x1^3 + 2*b*c*d*e*y1 - 2*c*d^2*e*y1 - 2*c*e^3*y1 + 2*b*c*e*x1*y1 - 2*b*d*e*x1*y1 - 2*c*d*e*x1*y1 + 2*d^2*e*x1*y1 + 2*e^3*x1*y1 - 2*b*e*x1^2*y1 + 2*d*e*x1^2*y1 - 2*b^2*d*y1^2 + 4*b*d^2*y1^2 - 2*d^3*y1^2 + 2*b*e^2*y1^2 + 2*c*e^2*y1^2 - 2*d*e^2*y1^2 - 2*e^2*x1*y1^2 - 2*b*e*y1^3 + 2*d*e*y1^3 + c^2*e^2 - 2*c*e^2*x1 + e^2*x1^2 - 2*b*c*e*y1 + 2*c*d*e*y1 + 2*b*e*x1*y1 - 2*d*e*x1*y1 + b^2*y1^2 - 2*b*d*y1^2 + d^2*y1^2]

```python
C6.column()
```

    [                                                                                                                                                                                                                                        c^2*x1*y1*y2 - c*x1^2*y1*y2 - c*y1^3*y2 - c*x1*y1*x2*y2 + x1^2*y1*x2*y2 + y1^3*x2*y2 + c*y1^2*y2^2 + c^2*y1^2 - 2*c*y1^2*x2 + y1^2*x2^2 - c^2*y1*y2 + c*x1*y1*y2 + c*y1*x2*y2 - x1*y1*x2*y2]
    [                                                                                                                                                                                                                                                                                                             c^2*y1^2*y2 - c*y1^2*x2*y2 - c*x1*y1*y2^2 + x1^2*y1*y2^2 + y1^3*y2^2 - c*y1^2*y2 + y1^2*x2*y2 + c*y1*y2^2 - x1*y1*y2^2]
    [c^2*x1^2*y2^2 - 2*c*x1^3*y2^2 + x1^4*y2^2 + c^2*y1^2*y2^2 - 2*c*x1*y1^2*y2^2 + 2*x1^2*y1^2*y2^2 + y1^4*y2^2 + 2*c^2*x1*y1*y2 - 2*c*x1^2*y1*y2 - 2*c*y1^3*y2 - 2*c*x1*y1*x2*y2 + 2*x1^2*y1*x2*y2 + 2*y1^3*x2*y2 - 2*c^2*x1*y2^2 + 4*c*x1^2*y2^2 - 2*x1^3*y2^2 + 2*c*y1^2*y2^2 - 2*x1*y1^2*y2^2 + c^2*y1^2 - 2*c*y1^2*x2 + y1^2*x2^2 - 2*c^2*y1*y2 + 2*c*x1*y1*y2 + 2*c*y1*x2*y2 - 2*x1*y1*x2*y2 + c^2*y2^2 - 2*c*x1*y2^2 + x1^2*y2^2]
    [                                                                                                                                                                                                                                                                                                                                                                                     c^2*y1^2 - 2*c*y1^2*x2 + y1^2*x2^2 + y1^2*y2^2]

[1]: http://math.stackexchange.com/q/2098375/35416 "Math SE question"
[2]: http://math.stackexchange.com/users/268101/oai-thanh-%c4%90%c3%a0o "Math SE user"
[3]: (http://math.stackexchange.com/a/2103276/35416 "Math SE answer"
