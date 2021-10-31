import LinkedListNode from "./LinkedListNode.js";

export default class LinkedList {
  /**
   * @param {function} [comparatorFunction]
   */
  constructor(comparatorFunction) {
    /**@var LinkedListNode */
    this.head = null;

    /**@var LinkedListNode */
    this.tail = null;

    this.compare = comparatorFunction;
  }

  /**
   * @param {prepend} data
   * @return {LinkedList}
   */
  prepend(data) {
    const newNode = new LinkedListNode(data, this.head);
    this.head = newNode;
    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * @param {append} data
   * @return {LinkedList}
   */
  append(data) {
    const newNode = new LinkedListNode(data);

    //for when there is no head yet
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // Attach new node to the end of linked list.
    this.tail.nextRef = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * @param {delete} data
   * @return LinkedList
   */
  delete(data) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;

    //if the node to be deleted is a head node, then make a node different from the head a new head
    while (this.head && this.compare.equal(this.head.data, data)) {
      deletedNode = this.head;
      this.head = this.head.nextRef;
    }

    let currentNode = this.head;

    if (currentNode !== null) {
      // If next node must be deleted then make next node to be a next next one.
      while (currentNode.nextRef) {
        if (this.compare.equal(currentNode.nextRef.data, data)) {
          deletedNode = currentNode.nextRef;
          currentNode.nextRef = currentNode.nextRef.nextRef;
        } else {
          currentNode = currentNode.nextRef;
        }
      }
    }

    // Check if tail must be deleted.
    if (this.compare.equal(this.tail.data, data)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode}
   */
  find({ data = undefined, callback = undefined }) {
    if (!this.data) {
      return null;
    }

    let currentNode = this.head;

    while (currentNode) {
      // If callback is specified then try to find node by callback.
      if (callback && callback(currentNode.data)) {
        return currentNode;
      }

      // If value is specified then try to compare by value..
      if (data !== undefined && this.compare.equal(currentNode.data, data)) {
        return currentNode;
      }

      currentNode = currentNode.nextRef;
    }
  }

  /**
   * @return {LinkedListNode}
   */
  deleteTail() {
    const deletedTail = this.tail;

    if (this.head === this.tail) {
      // There is only one node in linked list.
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    // If there are many nodes in linked list...
    // Rewind to the last node and delete "next" link for the node before the last one.
    let currentNode = this.head;
    while (currentNode.nextRef) {
      if (!currentNode.nextRef.nextRef) {
        currentNode.nextRef = null;
      } else {
        currentNode = currentNode.nextRef;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  /**
   * @return {LinkedListNode}
   */
  deleteHead() {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.nextRef) {
      this.head = this.head.nextRef;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(data) {
    data.forEach((element) => {
      return this.append(element);
    });

    return this;
  }

  /**
   * @return {LinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;

    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.nextRef;
    }

    return nodes;
  }

  toString(callback) {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse(){
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      // Store next node.
      nextNode = currNode.nextRef;

      // Change next node of the current node so it would link to previous node.
      currNode.nextRef = prevNode;

      // Move prevNode and currNode nodes one step forward.
      prevNode = currNode;
      currNode = nextNode;
    }

    // Reset head and tail.
    this.tail = this.head;
    this.head = prevNode

    return this;
  }
}






// import LinkedListNode from "./LinkedListNode";

// export default class LinkedList {
//   /**
//    * The constructor takes up a predefined comparison function
//    * which describes how to compare Nodes
//    */
//   constructor(compareFunction) {
//     // stores ref to a LinkedListNode
//     this.head = null;
//     this.tail = null;
//     // stores ref to the parameter compareFunction
//     this.compare = compareFunction;
//   }

//   /**
//    * Before delving deeper into the methods associated with Linked List,
//    * note that this.head and this.tail are pointers to a LinkedList node
//    * while the this.nextRef in the LinkedListNode Class is a reference pointing
//    * to its immediate next Node in the Linked List chain
//    *
//    */

//   /**
//    * Prepend method
//    * Adds a Node to the front of a LinkedList
//    * and return the linked list
//    */
//   prepend(data) {
//     const newNode = new LinkedListNode(data, this.head);
//     this.head = newNode;

//     // checks if tail exists
//     if (!this.tail) {
//       this.tail = newNode;
//     }

//     return this;
//   }

//   /**
//    * Append method
//    * Adds a Node to the end of a LinkedList
//    * and return the linked list
//    */
//   append(data) {
//     const newNode = new LinkedListNode(data);

//     // checks if head exists
//     if (!this.head) {
//       this.head = newNode;
//       this.tail = newNode;

//       return this;
//     }

//     // When head exists, attach new Node to the end of the Linked List
//     // and make this.tail point to the newNode which is the last
//     // existing node in the list chain
//     this.tail.nextRef = newNode;
//     this.tail = newNode;

//     return this;
//   }

//   /**
//    * Delete method
//    * Deletes matched nodes from the linked list
//    * and returns the deleted node
//    */
//   delete(data) {
//     if (!this.head) {
//       return null;
//     }

//     let deletedNode = null;
//     // checks if the Node to be deleted is a head node
//     //if it is a head node, make the next node a head node
//     while (this.head && this.compare.equal(this.head.data, data)) {
//       deletedNode = this.head;
//       this.head = this.head.nextRef;
//     }

//     // when the node to be deleted is not a headNode
//     let currentNode = this.head;

//     if (currentNode !== null) {
//       while (currentNode.nextRef) {
//         if (
//           currentNode.nextRef &&
//           this.compare.equal(currentNode.nextRef.data, data)
//         ) {
//           deletedNode = currentNode.nextRef;
//           // makes the next current node to be the current node next next reference
//           currentNode.nextRef = currentNode.nextRef.nextRef;
//         } else {
//           currentNode = currentNode.nextRef;
//         }
//       }
//     }

//     // checking if tail is to be deleted
//     if (this.compare(this.tail.data, data)) {
//       this.tail = currentNode;
//     }

//     return deletedNode;
//   }

//   /**
//    * while trying to find a Node, data is passed in as a parameter
//    * Returns the Node found
//    */
//   findNode(data) {
//     if (!this.head) {
//       return null;
//     }

//     let currentNode = this.head;

//     while (currentNode) {
//       if (data && this.compare.equal(currentNode.data, data)) {
//         return currentNode;
//       } else {
//         currentNode = currentNode.nextRef;
//       }
//     }
//   }

//   /**
//    * This method returns a LinkedListNode
//    */
//   deleteTail() {
//     const deletedNode = this.tail;

//     if (this.head === this.tail) {
//       this.head = null;
//       this.tail = null;

//       return deletedNode;
//     }

//     // when many node exists in the list, loop till the last node,
//     // and delete next reference for the node before the last one
//     let currentNode = this.nextRef;
//     while (currentNode.nextRef) {
//       if (!currentNode.nextRef.nextRef) {
//         currentNode.nextRef = null;
//       } else {
//         currentNode = currentNode.nextRef;
//       }
//     }

//     return deletedNode;
//   }

//   /**
//    * This method returns a LinkedListNode
//    */
//   deleteHead() {
//     if (!this.head) {
//       return null;
//     }

//     const deletedHead = this.head;

//     if (this.head.nextRef) {
//       this.head = this.head.nextRef;
//     } else {
//       this.head = null;
//       this.tail = null;
//     }

//     return deletedHead;
//   }

//   /**
//    * Takes up array input and return a Linked List
//    */
//   fromArray(data) {
//     data.forEach((element) => {
//       return this.append(element);
//     });

//     return this;
//   }

//   /**
//    * Converts a Linked List to an Array Object
//    */
//   toArray() {
//     const nodes = [];

//     let currentNode = this.head;

//     while (currentNode) {
//       nodes.push(currentNode);
//       currentNode = currentNode.nextRef;
//     }

//     return nodes;
//   }

//   /**
//    * Reverses the Linked List
//    */
//   reverse() {
//     let currentNode = this.head;
//     let prevNode = null;
//     let nextNode = null;

//     while (currentNode) {
//       // Store next node.
//       nextNode = currentNode.nextRef;
//       // Change next node of the current node so it would link to previous node.
//       currentNode.nextRef = prevNode;
//       // Move prevNode and currNode nodes one step forward.
//       prevNode = currentNode;
//       currentNode = nextNode;
//     }

//     this.tail = this.head;
//     this.head = prevNode;

//     return this;
//   }
// }
