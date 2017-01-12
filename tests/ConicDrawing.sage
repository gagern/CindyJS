import re

with open("ConicDrawing.txt", "r") as f:
    cd = f.read()
cd = re.sub(r"^// Case (\d+)", r"case(\1);", cd, flags=re.M)
cd = cd.replace(";", "")
#print(cd)

RF = RealField(prec=120) # since the errors we are investigating are small
CF = RF.complex_field()
PR.<x,y,t> = RF[]
PR2.<u> = CF[]
xy1 = vector(PR, (x, y, 1))
dFund = diagonal_matrix((1, 1, 0))

realThresholdAbs = RF("1e-10")
realThresholdRel = RF("1e-10")

caseNo = None
start = None
pos = None
numSegments = None
maxDist = 0

def posmax(M):
    val = -Infinity
    best = None
    for i in range(3):
        for j in range(3):
            if M[i, j].abs() > val:
                val = M[i, j].abs()
                best = (i, j)
    return best

def decompose(M):
    """Decompose a rank 2 conic into a pair of lines"""
    N = M.adjoint() # dual matrix: the point of intersection
    i, j = posmax(N)
    H = N.column(i).cross_product_matrix()
    r = [j for j in range(3) if j != i]
    d = (M + u*H).matrix_from_rows_and_columns(r, r).det()
    r = d.roots(multiplicities=False)
    ab = M + r[0]*H
    i, j = posmax(ab)
    return ab.row(i), ab.column(j)

def cp(a, b):
    return a.cross_product(b)

def isAlmostReal(v):
    for i in v.list():
        im = i.imag().abs()
        if im > realThresholdAbs and im > realThresholdRel * i.real().abs():
            return False
    return True

def isectCC(A, B):
    if A.det() > B.det():
        A, B = B, A # now A is the more degenerate one
    ts = (A + u*B).det().roots(CF, multiplicities=False)
    #print("ts={}".format(ts))
    if len(ts) < 2:
        return []
    d = (ts[0] - ts[1]).abs()
    t12 = (ts[0], ts[1])
    if len(ts) > 2:
        for i in ts[:2]:
            dd = (i - ts[2]).abs()
            if dd > d:
                d = dd
                t12 = (i, ts[2])
    #print("t12={}".format(t12))
    ab = decompose(A + t12[0]*B)
    cd = decompose(A + t12[1]*B)
    res = [cp(i, j) for i in ab for j in cd]
    res = [i/i[-1] for i in res] # dehomogenize, also makes real
    res2 = [vector(RF, [j.real() for j in i]) for i in res if isAlmostReal(i)]
    if not res2:
        for i in res:
            print(i)
    return res2

def checkDist(M, p):
    """Compute orthogonal projection of p onto M, and remember maximum."""
    global maxDist
    N = p.cross_product_matrix()*dFund*M
    N += N.transpose()
    distSq = Infinity
    qs = isectCC(M, N)
    if not qs:
        print("Failed to project {} to\n{}\nusing\n{}".format(p, M, N))
    for q in qs:
        q = q / q[-1]
        pq = p - q
        d = pq*pq
        #print(d)
        if distSq > d:
            distSq = d
    dist = distSq.sqrt()
    if maxDist < dist:
        maxDist = dist

def evalCurve(x1, y1, x2, y2, x3, y3):
    M = matrix(RF, sandbox["N"])
    M += M.transpose()
    v1 = vector((x1, y1, 1))
    v2 = vector((x2, y2, 1))
    v3 = vector((x3, y3, 1))
    checkDist(M, v1)
    checkDist(M, v3)
    Pt = (1-t)^2*v1 + 2*(1-t)*t*v2 + t^2*v3
    Ptd = Pt.derivative(t)
    Mxy1 = M*xy1 # the polar of xy, in this case a tangent
    isec = xy1*Mxy1 # xy is a point on the conic
    para = Ptd*Mxy1 # tangents are parallel
    proj = xy1.cross_product(dFund*Mxy1)*Pt # xy is orthogonal projection of Pt
    if para.is_zero(): # always parallel, looks like exact match
        return
    ipa = isec.sylvester_matrix(para, y).det()
    ipr = isec.sylvester_matrix(proj, y).det()
    ipp = ipa.sylvester_matrix(ipr, x).det()
    for tt in ipp.univariate_polynomial().roots(multiplicities=False):
        if tt < 0 or tt > 1:
            continue
        checkDist(M, Pt(t=tt).change_ring(RF))

def setTransform(a, b, c, d, e, f):
    assert a == 1 and b == 0 and c == 0 and d == 1 and e == 0 and f == 0

def case(i):
    global caseNo, maxDist
    #if i > 1: sys.exit()
    caseNo = i
    maxDist = 0

def beginPath():
    global pos, numSegments    
    pos = None
    numSegments = 0

def moveTo(x, y):
    global start, pos
    start = pos = (x, y)

def lineTo(x, y):
    quadraticCurveTo((RF(x) + RF(pos[0]))/2, (RF(y) + RF(pos[1]))/2, x, y)

def quadraticCurveTo(x1, y1, x2, y2):
    global pos, numSegments
    evalCurve(*map(RF, (pos[0], pos[1], x1, y1, x2, y2)))
    pos = (x2, y2)
    numSegments += 1

def closePath():
    lineTo(*start)

def stroke():
    print("{:4d}: {:4d}: {}".format(caseNo, numSegments, maxDist))

sandbox = {
    "setTransform": setTransform,
    "beginPath": beginPath,
    "moveTo": moveTo,
    "lineTo": lineTo,
    "quadraticCurveTo": quadraticCurveTo,
    "closePath": closePath,
    "stroke": stroke,
    "case": case,
}

exec(compile(cd, "ConicDrawing.txt", "exec"), sandbox)
