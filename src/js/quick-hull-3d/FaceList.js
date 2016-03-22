/**
 * Maintains a single-linked list of faces for use by QuickHull3D
 */

/* members
	Face head;
	Face tail;
*/

	/**
	 * Clears this list.
	 */
FaceList.prototype.clear = function()
	 {
	   head = tail = null;
	 }

	/**
	 * Adds a vertex to the end of this list.
	 */
FaceList.prototype.add = function (vtx)
	 {
	   if (head == null)
	    { head = vtx;
	    }
	   else
	    { tail.next = vtx;
	    }
	   vtx.next = null;
	   tail = vtx;
	 }

FaceList.prototype.first = function()
	 {
	   return head;
	 }

	/**
	 * Returns true if this list is empty.
	 */
FaceList.prototype.isEmpty = function()
	 {
	   return head == null;
	 }
