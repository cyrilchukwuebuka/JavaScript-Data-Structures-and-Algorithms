export default class LinkedListNode {
  constructor(data, nextRef = null) {
    this.data = data;
    this.nextRef = nextRef;
  }

  toString(callback) {
    return callback ? callback(this.data) : `${this.data} `;
  }
}
