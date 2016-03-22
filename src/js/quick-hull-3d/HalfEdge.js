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
 * Represents the half-edges that surround each
 * face in a counter-clockwise direction.
 *
 * @author John E. Lloyd, Fall 2004 */

/* members
	/**
	 * The vertex associated with the head of this half-edge.
	 * /
	Vertex vertex;

	/**
	 * Triangular face associated with this half-edge.
	 * /
	Face face;

	/**
	 * Next half-edge in the triangle.
	 * /
	HalfEdge next;

	/**
	 * Previous half-edge in the triangle.
	 * /
	HalfEdge prev;

	/**
	 * Half-edge associated with the opposite triangle
	 * adjacent to this edge.
	 * /
	HalfEdge opposite;
*/

	/**
	 * Constructs a HalfEdge with head vertex <code>v</code> and
	 * left-hand triangular face <code>f</code>.
	 *
	 * @param v head vertex
	 * @param f left-hand triangular face
	 */
function HalfEdge (Vertex v, Face f)
	 {
	   vertex = v;
	   face = f;
	 }

function HalfEdge ()
	 { 
	 }

	/**
	 * Sets the value of the next edge adjacent
	 * (counter-clockwise) to this one within the triangle.
	 *
	 * @param edge next adjacent edge */
HalfEdge.prototype.setNext = function (edge)
	 {
	   next = edge;
	 }
	
	/**
	 * Gets the value of the next edge adjacent
	 * (counter-clockwise) to this one within the triangle.
	 *
	 * @return next adjacent edge */
HalfEdge.prototype.getNext = function()
	 {
	   return next;
	 }

	/**
	 * Sets the value of the previous edge adjacent (clockwise) to
	 * this one within the triangle.
	 *
	 * @param edge previous adjacent edge */
HalfEdge.prototype.setPrev = function (edge)
	 {
	   prev = edge;
	 }
	
	/**
	 * Gets the value of the previous edge adjacent (clockwise) to
	 * this one within the triangle.
	 *
	 * @return previous adjacent edge
	 */
HalfEdge.prototype.getPrev = function()
	 {
	   return prev;
	 }

	/**
	 * Returns the triangular face located to the left of this
	 * half-edge.
	 *
	 * @return left-hand triangular face
	 */
HalfEdge.prototype.getFace = function()
	 {
	   return face;
	 }

	/**
	 * Returns the half-edge opposite to this half-edge.
	 *
	 * @return opposite half-edge
	 */
HalfEdge.prototype.getOpposite = function()
	 {
	   return opposite;
	 }

	/**
	 * Sets the half-edge opposite to this half-edge.
	 *
	 * @param edge opposite half-edge
	 */
HalfEdge.prototype.setOpposite = function (edge)
	 {
	   opposite = edge;
	   edge.opposite = this;
	 }

	/**
	 * Returns the head vertex associated with this half-edge.
	 *
	 * @return head vertex
	 */
HalfEdge.prototype.head = function()
	 {
	   return vertex;
	 }

	/**
	 * Returns the tail vertex associated with this half-edge.
	 *
	 * @return tail vertex
	 */
HalfEdge.prototype.tail = function()
	 {
	   return prev != null ? prev.vertex : null;
	 }

	/**
	 * Returns the opposite triangular face associated with this
	 * half-edge.
	 *
	 * @return opposite triangular face
	 */
HalfEdge.prototype.oppositeFace = function()
	 {
	   return opposite != null ? opposite.face : null;
	 }

	/**
	 * Produces a string identifying this half-edge by the point
	 * index values of its tail and head vertices.
	 *
	 * @return identifying string
	 */
HalfEdge.prototype.getVertexString = function()
	 {
	   if (tail() != null)
	    { return "" +
		 tail().index + "-" +
		 head().index;
	    }
	   else
	    { return "?-" + head().index;
	    }
	 }

	/**
	 * Returns the length of this half-edge.
	 *
	 * @return half-edge length
	 */
HalfEdge.prototype.length = function()
	 {
	   if (tail() != null)
	    { return head().pnt.distance(tail().pnt);
	    }
	   else
	    { return -1; 
	    }
	 }

	/**
	 * Returns the length squared of this half-edge.
	 *
	 * @return half-edge length squared
	 */
HalfEdge.prototype.lengthSquared = function()
	 {
	   if (tail() != null)
	    { return head().pnt.distanceSquared(tail().pnt);
	    }
	   else
	    { return -1; 
	    }
	 }

