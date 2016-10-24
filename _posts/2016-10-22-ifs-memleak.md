---
layout: post
title:  "Demonstrating IFS memory leak"
date:   2016-10-22 05:41 +0200
categories: bugs
cjs:
  version: v0.8
  js: v0.7.3-109-ge24c6dc/Cindy.js
---

The following widget demonstrates an iterated function system,
rendered in a web worker and passed to the main thread
as an `ImageBitmap` where available,
or a shared `ArrayBuffer` otherwise (Safari in particular).

However, I observe **massive** memory usage for this in Firefox.
Within minutes it has my system swapping heavily,
and shortly after the process gets killed for resource exhaustion.
The problem is tracked in [Mozilla bug #1312148][moz1312148].
This post here is meant to preserve that state, to help debugging.
I may update it to provide a link to an improved version.

[moz1312148]: https://bugzilla.mozilla.org/show_bug.cgi?id=1312148

<button onclick="this.style.display='none';cdy.startup()">Start Widget</button>

<div id="CSCanvas"></div>
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
  autostart: false,
  geometry: [
    {name: "A", type: "Free", pos: [-1.7142857142857142, -4.0, -0.5714285714285714], color: [1.0, 1.0, 1.0], pinned: true, size: 3.0},
    {name: "B", type: "Free", pos: [4.0, 2.6666666666666665, 1.3333333333333333], color: [1.0, 1.0, 1.0], alpha: 0.0, pinned: true, size: 3.0},
    {name: "a", type: "Join", color: [0.0, 0.0, 1.0], args: ["A", "B"], alpha: 0.0, labeled: true},
    {name: "C0", type: "CircleMP", color: [0.757, 0.0, 0.0], args: ["B", "A"], alpha: 0.6000000238418579},
    {name: "C", type: "PointOnLine", pos: [-3.506600660066007, -4.0, -1.168866886688669], color: [1.0, 1.0, 1.0], args: ["a"], size: 3.0},
    {name: "C1", type: "CircleMP", color: [0.757, 0.0, 0.0], args: ["C", "A"], alpha: 0.6000000238418579},
    {name: "D", type: "PointOnCircle", pos: [{r: 1.5020056427961124, i: -1.3064987129224223E-16}, -4.0, {r: 1.5584901099541684, i: 2.7262988360316856E-17}], color: [1.0, 1.0, 1.0], args: ["C0"], size: 3.0},
    {name: "", type: "OtherPointOnCircle", pos: [{r: -3.0677996316622465, i: 8.231042792974627E-17}, -4.0, {r: -0.6091444730978796, i: 4.164913375681932E-18}], color: [1.0, 1.0, 1.0], args: ["D"], pinned: true, size: 3.0},
    {name: "b", type: "Join", color: [0.0, 0.0, 1.0], args: ["B", "D"], alpha: 0.0, labeled: true},
    {name: "c", type: "Orthogonal", color: [0.0, 0.0, 1.0], args: ["a", "A"], alpha: 0.0, labeled: true},
    {name: "d", type: "Orthogonal", color: [0.0, 0.0, 1.0], args: ["b", "D"], alpha: 0.0, labeled: true},
    {name: "E", type: "Meet", color: [1.0, 1.0, 1.0], args: ["c", "d"], size: 3.0},
    {name: "C2", type: "CircleMP", color: [0.0, 0.0, 1.0], args: ["E", "A"], alpha: 0.8999999761581421},
    {name: "e", type: "RandomLine", color: [1.0, 1.0, 1.0], size: 0},
    {name: "Collection__1", type: "IntersectionConicLine", args: ["C2", "e"]},
    {name: "F", type: "SelectP", pos: [{r: -2.178271013175727, i: 3.219392176663801}, -4.0, {r: 0.12230307475875637, i: 0.03941028093769949}], color: [1.0, 1.0, 1.0], args: ["Collection__1"], size: 3.0},
    {name: "C3", type: "CircleMP", color: [1.0, 1.0, 1.0], args: ["A", "E"], size: 0},
    {name: "G", type: "OtherIntersectionCL", color: [1.0, 1.0, 1.0], args: ["C3", "c", "E"], size: 3.0},
    {name: "C4", type: "Compass", color: [0.0, 0.0, 1.0], args: ["E", "F", "G"], alpha: 0.8999999761581421},
    {name: "H", type: "Meet", color: [1.0, 1.0, 1.0], args: ["a", "d"], alpha: 0.0, size: 3.0},
    {name: "C5", type: "CircleMP", color: [0.0, 0.0, 1.0], args: ["H", "D"], alpha: 0.8999999761581421},
    {name: "K", type: "OtherIntersectionCC", color: [1.0, 1.0, 1.0], args: ["C1", "C4", "A"], size: 3.0},
    {name: "f", type: "Join", color: [0.0, 0.0, 1.0], args: ["C", "K"], alpha: 0.0, labeled: true},
    {name: "g", type: "Orthogonal", color: [0.0, 0.0, 1.0], args: ["f", "K"], alpha: 0.0, labeled: true},
    {name: "L", type: "Meet", color: [1.0, 1.0, 1.0], args: ["a", "g"], alpha: 0.0, size: 3.0},
    {name: "C6", type: "CircleMP", color: [0.0, 0.0, 1.0], args: ["L", "K"], alpha: 0.8999999761581421},
    {name: "M", type: "OtherIntersectionCC", color: [1.0, 1.0, 1.0], args: ["C0", "C4", "A"], size: 3.0},
    {name: "N", type: "OtherIntersectionCC", color: [1.0, 1.0, 1.0], args: ["C1", "C2", "A"], size: 3.0},
    {name: "O", type: "PointOnCircle", pos: [4.0, {r: -1.645384462463449, i: -1.7020930772535588E-17}, {r: 1.3213693348549864, i: 9.976816536362178E-17}], color: [1.0, 1.0, 1.0], args: ["C5"], size: 3.0},
    {name: "P", type: "PointOnCircle", pos: [4.0, {r: -1.8231292492589861, i: -9.15768436418764E-15}, {r: 1.272833373802196, i: -1.0170882826978038E-15}], color: [1.0, 1.0, 1.0], args: ["C6"], size: 3.0},
    {name: "Tr0", type: "TrMoebius", color: [0.0, 0.0, 1.0], args: ["A", "A", "D", "M", "N", "K"], alpha: 0.8999999761581421, dock: {offset: [0.0, -0.0]}},
    {name: "Tr1", type: "TrMoebius", color: [0.0, 0.0, 1.0], args: ["D", "N", "M", "K", "O", "P"], alpha: 0.8999999761581421, dock: {offset: [0.0, -0.0]}},
    {name: "Tr2", type: "TrInverseMoebius", color: [0.0, 0.0, 1.0], args: ["Tr0"], alpha: 0.8999999761581421, dock: {offset: [0.0, -0.0]}},
    {name: "Tr3", type: "TrInverseMoebius", color: [0.0, 0.0, 1.0], args: ["Tr1"], alpha: 0.8999999761581421, dock: {offset: [0.0, -0.0]}},
    {name: "IFS0", type: "IFS", color: [0.0, 0.0, 1.0], args: ["Tr0", "Tr1", "Tr2", "Tr3"], alpha: 0.30000001192092896, "ifs.prob0": 0.463302752293578, "ifs.color0": [1.0, 0.0, 0.0], "ifs.prob1": 0.04128440366972477, "ifs.color1": [1.0, 0.784, 0.0], "ifs.prob2": 0.44495412844036697, "ifs.color2": [1.0, 0.0, 0.0], "ifs.prob3": 0.05045871559633027, "ifs.color3": [1.0, 0.784, 0.0], dock: {offset: [0.0, -0.0]}},
    {name: "IFS1", type: "IFS", color: [0.0, 0.0, 1.0], args: ["Tr0", "Tr1", "Tr2", "Tr3"], alpha: 0.30000001192092896, "ifs.prob0": 0.1263498920086393, "ifs.color0": [1.0, 0.0, 0.0], "ifs.prob1": 0.35853131749460043, "ifs.color1": [1.0, 0.784, 0.0], "ifs.prob2": 0.1263498920086393, "ifs.color2": [1.0, 0.0, 0.0], "ifs.prob3": 0.38876889848812096, "ifs.color3": [1.0, 0.784, 0.0], dock: {offset: [0.0, -0.0]}}
  ],
  ports: [{
    id: "CSCanvas",
    width: 768,
    height: 496,
    transform: [{visibleRect: [-4.645999999999999, 7.40270588235294, 13.605294117647057, -4.384588235294117]}],
    background: "rgb(0,0,0)"
  }],
  csconsole: false,
  cinderella: {build: 1894, version: [2, 9, 1894]}
});
</script>
