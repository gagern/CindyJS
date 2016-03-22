/**
 * Represents vertices of the hull, as well as the points from
 * which it is formed.
 *
 * @author John E. Lloyd, Fall 2004
 */

/* members
	/**
	 * Spatial point associated with this vertex.
	 * /
	Point3d pnt;

	/**
	 * Back index into an array.
	 * /
	int index;

	/**
	 * List forward link.
	 * /
 	Vertex prev;

	/**
	 * List backward link.
	 * /
 	Vertex next;

	/**
	 * Current face that this vertex is outside of.
	 * /
 	Face face;
*/

	/**
	 * Constructs a vertex and sets its coordinates to 0.
	 */
function Vertex()
	 { pnt = new Point3d();
	 }

	/**
	 * Constructs a vertex with the specified coordinates
	 * and index.
	 */
function Vertex (x, y, z, idx)
	 {
	   pnt = new Point3d(x, y, z);
	   index = idx;
	 }
