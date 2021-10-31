export default class DoublyLinkedListNode{
    constructor(data = null, nextRef = null, prevRef = null){
        this.data = data;
        this.prevRef = prevRef;
        this.nextRef = nextRef
    }

    toString(callback){
        callback ? callback(this.data) : `${this.data}`;
    }
}