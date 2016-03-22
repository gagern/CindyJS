/*
 * Copyright John E. Lloyd, 2003. All rights reserved. Permission
 * to use, copy, and modify, without fee, is granted for non-commercial 
 * and research purposes, provided that this copyright notice appears 
 * in all copies.
 *
 * This  software is distributed "as is", without any warranty, including 
 * any implied warranty of merchantability or fitness for a particular
 * use. The authors assume no responsibility for, and shall not be liable
 * for, any special, indirect, or consequential damages, or any damages
 * whatsoever, arising out of or in connection with the use of this
 * software.
 */

/**
 * Basic triangular face used to form the hull.
 *
 * <p>The information stored for each face consists of a planar
 * normal, a planar offset, and a doubly-linked list of three <a
 * href=HalfEdge>HalfEdges</a> which surround the face in a
 * counter-clockwise direction.
 *
 * @author John E. Lloyd, Fall 2004 */

/* members
	HalfEdge he0;
	Vector3d normal;
	double area;
	Point3d centroid;
	double planeOffset;
	int index;
	int numVerts;

	Face next;

	int mark = VISIBLE;

	Vertex outside;
*/

Face.VISIBLE = 1;
Face.NON_CONVEX = 2;
Face.DELETED = 3;

Face.prototype.computeCentroid = function(centroid) {
    centroid.setZero();
    var he = he0;
    do {
        centroid.add(he.head().pnt);
        he = he.next;
    }
    while (he != he0);
    centroid.scale(1 / (double) numVerts);
}

Face.prototype.computeNormal = function(normal, minArea) {
    computeNormal(normal);

    if (area < minArea) {
        // make the normal more robust by removing
        // components parallel to the longest edge

        var hedgeMax = null;
        var lenSqrMax = 0;
        var hedge = he0;
        do {
            var lenSqr = hedge.lengthSquared();
            if (lenSqr > lenSqrMax) {
                hedgeMax = hedge;
                lenSqrMax = lenSqr;
            }
            hedge = hedge.next;
        }
        while (hedge != he0);

        Point3d p2 = hedgeMax.head().pnt;
        Point3d p1 = hedgeMax.tail().pnt;
        var lenMax = Math.sqrt(lenSqrMax);
        var ux = (p2.x - p1.x) / lenMax;
        var uy = (p2.y - p1.y) / lenMax;
        var uz = (p2.z - p1.z) / lenMax;
        var dot = normal.x * ux + normal.y * uy + normal.z * uz;
        normal.x -= dot * ux;
        normal.y -= dot * uy;
        normal.z -= dot * uz;

        normal.normalize();
    }
}

Face.prototype.computeNormal = function(normal) {
    var he1 = he0.next;
    var he2 = he1.next;

    Point3d p0 = he0.head().pnt;
    Point3d p2 = he1.head().pnt;

    var d2x = p2.x - p0.x;
    var d2y = p2.y - p0.y;
    var d2z = p2.z - p0.z;

    normal.setZero();

    numVerts = 2;

    while (he2 != he0) {
        var d1x = d2x;
        var d1y = d2y;
        var d1z = d2z;

        p2 = he2.head().pnt;
        d2x = p2.x - p0.x;
        d2y = p2.y - p0.y;
        d2z = p2.z - p0.z;

        normal.x += d1y * d2z - d1z * d2y;
        normal.y += d1z * d2x - d1x * d2z;
        normal.z += d1x * d2y - d1y * d2x;

        he1 = he2;
        he2 = he2.next;
        numVerts++;
    }
    area = normal.norm();
    normal.scale(1 / area);
}

Face.prototype.computeNormalAndCentroid = function() {
    computeNormal(normal);
    computeCentroid(centroid);
    planeOffset = normal.dot(centroid);
    var numv = 0;
    var he = he0;
    do {
        numv++;
        he = he.next;
    }
    while (he != he0);
    if (numv != numVerts) {
        throw new InternalErrorException(
            "face " + getVertexString() + " numVerts=" + numVerts + " should be " + numv);
    }
}

Face.prototype.computeNormalAndCentroid = function(minArea) {
    computeNormal(normal, minArea);
    computeCentroid(centroid);
    planeOffset = normal.dot(centroid);
}

Face.createTriangle = function(v0, v1, v2) {
    return createTriangle(v0, v1, v2, 0);
}

/**
 * Constructs a triangule Face from vertices v0, v1, and v2.
 *
 * @param v0 first vertex
 * @param v1 second vertex
 * @param v2 third vertex
 */
Face.createTriangle = function(v0, v1, v2, minArea) {
    var face = new Face();
    var he0 = new HalfEdge(v0, face);
    var he1 = new HalfEdge(v1, face);
    var he2 = new HalfEdge(v2, face);

    he0.prev = he2;
    he0.next = he1;
    he1.prev = he0;
    he1.next = he2;
    he2.prev = he1;
    he2.next = he0;

    face.he0 = he0;

    // compute the normal and offset
    face.computeNormalAndCentroid(minArea);
    return face;
}

Face.create = function(vtxArray, indices) {
    var face = new Face();
    var hePrev = null;
    for (var i = 0; i < indices.length; i++) {
        var he = new HalfEdge(vtxArray[indices[i]], face);
        if (hePrev != null) {
            he.setPrev(hePrev);
            hePrev.setNext(he);
        } else {
            face.he0 = he;
        }
        hePrev = he;
    }
    face.he0.setPrev(hePrev);
    hePrev.setNext(face.he0);

    // compute the normal and offset
    face.computeNormalAndCentroid();
    return face;
}

function Face() {
    normal = new Vector3d();
    centroid = new Point3d();
    mark = VISIBLE;
}

/**
 * Gets the i-th half-edge associated with the face.
 * 
 * @param i the half-edge index, in the range 0-2.
 * @return the half-edge
 */
Face.prototype.getEdge = function(i) {
    var he = he0;
    while (i > 0) {
        he = he.next;
        i--;
    }
    while (i < 0) {
        he = he.prev;
        i++;
    }
    return he;
}

Face.prototype.getFirstEdge = function() {
    return he0;
}

/**
 * Finds the half-edge within this face which has
 * tail <code>vt</code> and head <code>vh</code>.
 *
 * @param vt tail point
 * @param vh head point
 * @return the half-edge, or null if none is found.
 */
Face.prototype.findEdge = function(vt, vh) {
    var he = he0;
    do {
        if (he.head() == vh && he.tail() == vt) {
            return he;
        }
        he = he.next;
    }
    while (he != he0);
    return null;
}

/**
 * Computes the distance from a point p to the plane of
 * this face.
 *
 * @param p the point
 * @return distance from the point to the plane
 */
Face.prototype.distanceToPlane = function(p) {
    return normal.x * p.x + normal.y * p.y + normal.z * p.z - planeOffset;
}

/**
 * Returns the normal of the plane associated with this face.
 *
 * @return the planar normal
 */
Face.prototype.getNormal = function() {
    return normal;
}

Face.prototype.getCentroid = function() {
    return centroid;
}

Face.prototype.numVertices = function() {
    return numVerts;
}

Face.prototype.getVertexString = function() {
    var s = null;
    var he = he0;
    do {
        if (s == null) {
            s = "" + he.head().index;
        } else {
            s += " " + he.head().index;
        }
        he = he.next;
    }
    while (he != he0);
    return s;
}

Face.prototype.getVertexIndices = function(idxs) {
    var he = he0;
    var i = 0;
    do {
        idxs[i++] = he.head().index;
        he = he.next;
    }
    while (he != he0);
}

Face.prototype.connectHalfEdges = function(
    hedgePrev, hedge) {
    var discardedFace = null;

    if (hedgePrev.oppositeFace() == hedge.oppositeFace()) { // then there is a redundant edge that we can get rid off

        var oppFace = hedge.oppositeFace();
        var hedgeOpp;

        if (hedgePrev == he0) {
            he0 = hedge;
        }
        if (oppFace.numVertices() == 3) { // then we can get rid of the opposite face altogether
            hedgeOpp = hedge.getOpposite().prev.getOpposite();

            oppFace.mark = DELETED;
            discardedFace = oppFace;
        } else {
            hedgeOpp = hedge.getOpposite().next;

            if (oppFace.he0 == hedgeOpp.prev) {
                oppFace.he0 = hedgeOpp;
            }
            hedgeOpp.prev = hedgeOpp.prev.prev;
            hedgeOpp.prev.next = hedgeOpp;
        }
        hedge.prev = hedgePrev.prev;
        hedge.prev.next = hedge;

        hedge.opposite = hedgeOpp;
        hedgeOpp.opposite = hedge;

        // oppFace was modified, so need to recompute
        oppFace.computeNormalAndCentroid();
    } else {
        hedgePrev.next = hedge;
        hedge.prev = hedgePrev;
    }
    return discardedFace;
}

Face.prototype.checkConsistency = function() {
    // do a sanity check on the face
    var hedge = he0;
    var maxd = 0;
    var numv = 0;

    if (numVerts < 3) {
        throw new InternalErrorException(
            "degenerate face: " + getVertexString());
    }
    do {
        var hedgeOpp = hedge.getOpposite();
        if (hedgeOpp == null) {
            throw new InternalErrorException(
                "face " + getVertexString() + ": " +
                "unreflected half edge " + hedge.getVertexString());
        } else if (hedgeOpp.getOpposite() != hedge) {
            throw new InternalErrorException(
                "face " + getVertexString() + ": " +
                "opposite half edge " + hedgeOpp.getVertexString() +
                " has opposite " +
                hedgeOpp.getOpposite().getVertexString());
        }
        if (hedgeOpp.head() != hedge.tail() ||
            hedge.head() != hedgeOpp.tail()) {
            throw new InternalErrorException(
                "face " + getVertexString() + ": " +
                "half edge " + hedge.getVertexString() +
                " reflected by " + hedgeOpp.getVertexString());
        }
        var oppFace = hedgeOpp.face;
        if (oppFace == null) {
            throw new InternalErrorException(
                "face " + getVertexString() + ": " +
                "no face on half edge " + hedgeOpp.getVertexString());
        } else if (oppFace.mark == DELETED) {
            throw new InternalErrorException(
                "face " + getVertexString() + ": " +
                "opposite face " + oppFace.getVertexString() +
                " not on hull");
        }
        var d = Math.abs(distanceToPlane(hedge.head().pnt));
        if (d > maxd) {
            maxd = d;
        }
        numv++;
        hedge = hedge.next;
    }
    while (hedge != he0);

    if (numv != numVerts) {
        throw new InternalErrorException(
            "face " + getVertexString() + " numVerts=" + numVerts + " should be " + numv);
    }

}

Face.prototype.mergeAdjacentFace = function(hedgeAdj,
    discarded) {
    var oppFace = hedgeAdj.oppositeFace();
    var numDiscarded = 0;

    discarded[numDiscarded++] = oppFace;
    oppFace.mark = DELETED;

    var hedgeOpp = hedgeAdj.getOpposite();

    var hedgeAdjPrev = hedgeAdj.prev;
    var hedgeAdjNext = hedgeAdj.next;
    var hedgeOppPrev = hedgeOpp.prev;
    var hedgeOppNext = hedgeOpp.next;

    while (hedgeAdjPrev.oppositeFace() == oppFace) {
        hedgeAdjPrev = hedgeAdjPrev.prev;
        hedgeOppNext = hedgeOppNext.next;
    }

    while (hedgeAdjNext.oppositeFace() == oppFace) {
        hedgeOppPrev = hedgeOppPrev.prev;
        hedgeAdjNext = hedgeAdjNext.next;
    }

    var hedge;

    for (hedge = hedgeOppNext; hedge != hedgeOppPrev.next; hedge = hedge.next) {
        hedge.face = this;
    }

    if (hedgeAdj == he0) {
        he0 = hedgeAdjNext;
    }

    // handle the half edges at the head
    var discardedFace;

    discardedFace = connectHalfEdges(hedgeOppPrev, hedgeAdjNext);
    if (discardedFace != null) {
        discarded[numDiscarded++] = discardedFace;
    }

    // handle the half edges at the tail
    discardedFace = connectHalfEdges(hedgeAdjPrev, hedgeOppNext);
    if (discardedFace != null) {
        discarded[numDiscarded++] = discardedFace;
    }

    computeNormalAndCentroid();
    checkConsistency();

    return numDiscarded;
}

Face.prototype.areaSquared = function(hedge0, hedge1) {
    // return the squared area of the triangle defined
    // by the half edge hedge0 and the point at the
    // head of hedge1.

    Point3d p0 = hedge0.tail().pnt;
    Point3d p1 = hedge0.head().pnt;
    Point3d p2 = hedge1.head().pnt;

    var dx1 = p1.x - p0.x;
    var dy1 = p1.y - p0.y;
    var dz1 = p1.z - p0.z;

    var dx2 = p2.x - p0.x;
    var dy2 = p2.y - p0.y;
    var dz2 = p2.z - p0.z;

    var x = dy1 * dz2 - dz1 * dy2;
    var y = dz1 * dx2 - dx1 * dz2;
    var z = dx1 * dy2 - dy1 * dx2;

    return x * x + y * y + z * z;
}

Face.prototype.triangulate = function(newFaces, minArea) {
    var hedge;

    if (numVertices() < 4) {
        return;
    }

    var v0 = he0.head();
    var prevFace = null;

    hedge = he0.next;
    var oppPrev = hedge.opposite;
    var face0 = null;

    for (hedge = hedge.next; hedge != he0.prev; hedge = hedge.next) {
        var face =
            createTriangle(v0, hedge.prev.head(), hedge.head(), minArea);
        face.he0.next.setOpposite(oppPrev);
        face.he0.prev.setOpposite(hedge.opposite);
        oppPrev = face.he0;
        newFaces.add(face);
        if (face0 == null) {
            face0 = face;
        }
    }
    hedge = new HalfEdge(he0.prev.prev.head(), this);
    hedge.setOpposite(oppPrev);

    hedge.prev = he0;
    hedge.prev.next = hedge;

    hedge.next = he0.prev;
    hedge.next.prev = hedge;

    computeNormalAndCentroid(minArea);
    checkConsistency();

    for (var face = face0; face != null; face = face.next) {
        face.checkConsistency();
    }

}
