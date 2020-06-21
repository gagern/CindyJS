---
layout: post
title:  Three spinning switches
date:   2020-06-21 00:40 +0100
categories: recreation
cjs:
  version: v0.8
katex: true
---

{% comment %} https://stackoverflow.com/q/62492390/1468366 {% endcomment %}
{% assign post_custom_url = site.url | append: site.baseurl %}
{% assign post_full_base_url = post_custom_url | default: site.github.url %}

## Introduction

This is a follow-up question to a [previous post][prev].

While that post was concerned with cases where the number of switches
is a power of two, here I'm investigating setups where that is not the case,
mostly using a setup with three switches as my example.

## Problem

*This section is copied from my [previous post][prev],
so feel free to skip if if you already read that.*

Suppose you are locked in a room. Next to the door there is a wheel
with <script type="text/x-tex">n</script> switches mounted to it. Each
switch is in one of two states, either off (0) or on (1). To open the
door, all switches have to be on at the same time. To achieve this,
you can press any combination of switches simultaneously. If you
manage to achieve the all-on state, the door opens and you won. If
not, the door stays shut, and the wheel with the switches on it spins
for a while so fast that you can't keep track of them. And of course
you can't tell the state of any switch by looking at is.

Is there a sequence of button press patterns that is guaranteed to
take you out of the room?

I have only read about this problem second-hand on [a page by GitHib user
shainer](https://github.com/shainer/spinning-switches). It cites the book
[So you think you've got problems?](https://www.amazon.com/dp/178335190X)
by Alex Bellos as its source. Apparently that book is offering the version
with <script type="text/x-tex">n=2</script> switches for warming up and
<script type="text/x-tex">n=4</script> as the advanced version.

## Conjecture

Experiments suggest that if <script type="text/x-tex">n</script> is
not a power of two, then no strategy exists at all that is guaranteed
to lead to a win in a finite number of steps. But at the moment this
is merely a conjecture, supported by experiments for n up to 10 or so.

## Optimization criterion

Not having a guaranteed winning strategy doesn't mean
that you are stuck in the room forever.
Chances are that if you keep pressing switches long enough,
you will open the room by chance.
Some strategies of pressing buttons are better than others.
For example, always pressing all buttons will never release you from the room
if doing so once did not do the trick already.

One reasonable way how a winning strategy can be optimal is with respect
to the expected number of actions to free you.

Optimality depends on an assumed probability distribution for the initial state.
One such assumption could be that all <script type="text/x-tex">2^n-1</script>
non-winning states are equally probable.

## Optimal strategy for three switches

<img src="{{ "/images/switches3a.svg" | prepend: post_full_base_url }}" alt="Optimal strategy graph" type="image/svg" style="width: 100%">

The infinite strategies shown above all lead to a minimal expected number of
actions, namely

<script type="text/x-tex;mode=display">E[a]=\frac{40}{7}\approx5.7</script>

## Modeling three switches

So let's take three switches as an example. If the initial probability
distribution is known (or assumed), then the probability at any point can be
expressed as a vector

<script type="text/x-tex;mode=display">
  p = \begin{pmatrix}p_{000}\\p_{001}\\p_{011}\\p_{111}\end{pmatrix}
</script>

This is again considering switch states as equivalent if theuy only differ
by rotation. The individual properties add up to one.
The last component indicates the probability that we already solved the door
by that state (so we probably assume this to be zero up front).
Assuming that all seven non-winning states are equally probable, we get

<script type="text/x-tex;mode=display">
  p_0 = \frac17\begin{pmatrix}1\\3\\3\\0\end{pmatrix}
</script>

We get threes there because for the one and two button arrangement,
three rotationally equivalent patterns exist.
We can model the actions as matrix multiplications.

<script type="text/x-tex;mode=display">
  A_{001} = \frac13\begin{pmatrix}
    0 & 1 & 0 & 0 \\
    3 & 0 & 2 & 0 \\
    0 & 2 & 0 & 0 \\
    0 & 0 & 1 & 3
  \end{pmatrix}\quad
  A_{011} = \frac13\begin{pmatrix}
    0 & 0 & 1 & 0 \\
    0 & 2 & 0 & 0 \\
    3 & 0 & 2 & 0 \\
    0 & 1 & 0 & 3
  \end{pmatrix}\quad
  A_{111} = \begin{pmatrix}
    0 & 0 & 0 & 0 \\
    0 & 0 & 1 & 0 \\
    0 & 1 & 0 & 0 \\
    1 & 0 & 0 & 1
  \end{pmatrix}\quad
</script>

You can read each matrix by column to figure out what a given pattern will
transform to: if you are in pattern <script type="text/x-tex">001</script>
(i.e. one button is on and two are off) and press one button,
then the second column of <script type="text/x-tex">A_{001}</script>
tells you that with probability <script type="text/x-tex">\frac13</script>
you end up in state <script type="text/x-tex">000</script> but with probability
<script type="text/x-tex">\frac23</script> you get to
<script type="text/x-tex">011</script>.
You can also read the matrix by row to figure out where a given pattern
could come from. If after pressing one button you end up in state
<script type="text/x-tex">001</script>, then this will happen all the time
(probability <script type="text/x-tex">\frac33</script>) if the previous
state was <script type="text/x-tex">000</script>, and it also will happen
with probability <script type="text/x-tex">\frac23</script> if the previous
state was <script type="text/x-tex">011</script>.
The bottom row indicates ways to get to the winning state, and the one in the
bottom right entry ensures you never leave the winning state after reaching it.

## Expected wait while repeating one action

How do you compute the expected number of actions needed for a given
probability distribution? This is linear, so you can sum expected wait
times weighted by probability:

<script type="text/x-tex;mode=display">
  E[a] = t\cdot p = \left(t_{000}, t_{001}, t_{011}, 0\right)\cdot
  \begin{pmatrix}p_{000}\\p_{001}\\p_{011}\\p_{111}\end{pmatrix} =
  t_{000}p_{000} + t_{001}p_{001} + t_{011}p_{011}
</script>

The expected number of actions <script type="text/x-tex">E[a]</script>
is the product with a row vector <script type="text/x-tex">t</script>
of expected times for each pattern times a column vector
<script type="text/x-tex">p</script> of the probability of that pattern.
The expected time if you already are in the winning state is always zero
so I did not include an entry <script type="text/x-tex">t_{111}</script>.

One possible strategy would be to always press one button. In that case the
initial strategy is the same as the remaining strategy after the first operation
has been performed. This allows us to rewrite the waiting time vector
<script type="text/x-tex">t</script> as the probability of needing one more step
(which is zero for the winning state and one for all other states) plus
the time we need from whatever distribution we end up in after that first step:

<script type="text/x-tex;mode=display">
  \begin{aligned}
    t\cdot p &= t\cdot A_{001}\cdot p + (1,1,1,0)\cdot p \\
    t &= t\cdot A_{001} + s \qquad\text{with } s:=(1,1,1,0) \\
    t\cdot I_4 - t\cdot A_{001} &= s \\
    t\cdot (I_4 - A_{001}) &= s
  \end{aligned}
</script>

Here <script type="text/x-tex">I_4</script> denotes the
<script type="text/x-tex">4\times 4</script> identity matrix.
The final line of the equation is a simple linear equation,
although you should note that it is solved for an unknown vector on the left,
not on the right as you may be more familiar with.
For a strategy of always pressing one button we find
<script type="text/x-tex">t = \left(10, 9, 7\right)</script>
so you can expect to need 10 actions if you happened to start in
the all-off pattern, 9 if one switch was on when you started,
and 7 if two were on already.

## Strategies repeating different actions

Computing that value is a matter of applying the considerations above to
strategies that repeat several different steps.
Let's take the strategy of alternating between three buttons and one button.

<script type="text/x-tex;mode=display">
  \begin{aligned}
    t &= u\cdot A_{111} + s \\
    u &= t\cdot A_{001} + s \\
    t &= \left(t\cdot A_{001} + s\right)\cdot A_{111} + s \\
    t\cdot\left(I_4-A_{001}\cdot A_{111}\right) &=
    s\cdot\left(A_{111} + I_4\right) \\
    
  \end{aligned}
</script>

Here <script type="text/x-tex">t</script> is the expected time per state
if you start with all buttons then one button then repeat these two.
We compute it as the chances of needing one more step (expressed by
<script type="text/x-tex">s</script> plus the expected times per state
for a strategy that starts in one button then all buttons then repeat,
which we denote by <script type="text/x-tex">u</script>. As we can express
<script type="text/x-tex">u</script> in a similar way, we can combine both
to get rid of <script type="text/x-tex">u</script> and solve for
<script type="text/x-tex">t</script>. We get

<script type="text/x-tex;mode=display">
  \begin{aligned}
    t &= (1, 6, 7, 0) & u &= (7, 6, 5, 0) \\
    t\cdot p_0 &= (1, 6, 7, 0)\cdot\frac17\begin{pmatrix}1\\3\\3\\0\end{pmatrix}
    = \frac{1+18+21}7 = \frac{40}7 &
    u\cdot p_0 &= (7, 6, 5, 0)\cdot\frac17\begin{pmatrix}1\\3\\3\\0\end{pmatrix}
    = \frac{7+18+15}7 = \frac{40}7
  \end{aligned}
</script>

So even though starting with all buttons or starting with one button can make
a difference depending on the distribution you start in
(as evidenced by <script type="text/x-tex">t\neq u</script>),
they make no difference when applied to the assumed initial distribution
<script type="text/x-tex">p_0</script>.

## Different paths leading to the same state

The above computation can show that the expected number of actions is
the claimed value of <script type="text/x-tex">\frac{40}7</script> for some of
the strategies included in the graph. It is also possible to show that where
two different arrows meet in a node, the distribution in that node will
be the same. For example the two big initial branches in the beginning
join again after three steps, which can be shown using

<script type="text/x-tex;mode=display">
  A_{001}\cdot A_{111}\cdot A_{001}\cdot p_0 =
  A_{011}\cdot A_{111}\cdot A_{011}\cdot p_0 =
  \frac1{21}\begin{pmatrix}2\\6\\4\\9\end{pmatrix}
</script>

So at that point, the chances of already having opened the door are
<script type="text/x-tex">\frac9{21}=\frac37</script> while the chances
of still being stuck are
<script type="text/x-tex">\frac{2+6+4}{21}=\frac47</script>.

For the infinite number of options in the lower path of the graph,
we can show that as long as the <script type="text/x-tex">001</script>
pattern and the <script type="text/x-tex">011</script> state are
equally likely, the choice between <script type="text/x-tex">A_{001}</script>
and <script type="text/x-tex">A_{011}</script> doesn't make a difference:

<script type="text/x-tex;mode=display">
  A_{001}\cdot A_{111}\cdot
  \begin{pmatrix} x \\ y \\ y \\ z\end{pmatrix} =
  A_{011}\cdot A_{111}\cdot
  \begin{pmatrix} x \\ y \\ y \\ z\end{pmatrix} =
  \frac13\begin{pmatrix}y\\2y\\2y\\3x+y+3z\end{pmatrix}
</script>

## Computer-aided experiments

Standard graph-searching algorithms such as
[Dijkstra's algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm)
can be used to find strategies that in each state minimize the expected
number of actions up to that node, i.e. assuming zero waits after this.
Such an algorithm will never over-estimate the cost of a given strategy,
but it may under-estimate the cost if the steps needed for the remaining
(infinite) path are still too high.

Knowing that a cost of <script type="text/x-tex">E[a]=\frac{40}7</script>
is achievable allows the algorithm to disregard any nodes with a higher cost
than this, which makes the computation considerably faster and more
goal-oriented. Such a run did find that up to a depth of over 20 actions,
all paths still under consideration were following the pattern shown in
the above graph diagram.

Strictly speaking this is no proof that there can't be an even better strategy,
which looks like those above (so it is still derived from one of the paths
still under consideration) but then deviates from that after some number of
actions to reach an even lower total cost.

I consider this very unlikely, but as I said, that is not a proof.

## Other numbers

The above was considerable manual work, namely in setting up the matrices,
in doing the graph exploration, and in computing a plausible threshold.
For more than four switches (remember that [there is a finite winning strategy
for four][prev]) that work would be harder, so it might make sense to automate
some of it.

Chances are that if similar computations were done for other numbers of
switches, patterns would emerge that can be generalized to arbitrary numbers.
That is essentially what I had done for the finite strategies, too.
Work for some later time, though.

[prev]: {{post_full_base_url}}{% post_url 2020-06-07-switches %}
