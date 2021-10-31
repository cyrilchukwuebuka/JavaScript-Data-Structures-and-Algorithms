import DoublyLinkedListNode from "./DoublyLinkedListNode";

export default class DoublyLinkedList {
  /**
   * @param {function} [compareFunction]
   */
  constructor(compareFunction) {
    /**@var DoublyLinkedListNode */
    this.head = null;
    /**@var DoublyLinkedListNode */
    this.tail = null;

    this.compare = compareFunction;
  }

  /**
   * @param {prepend} data
   * @returns {DoublyLinkedList}
   */
  append(data) {
    let newNode = new DoublyLinkedListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return newNode;
    }

    let currentNode = this.head
    while(currentNode.next)
  }
}