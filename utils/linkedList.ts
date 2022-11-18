export type SnakeCoords = {
	row: number;
	col: number;
	cel: number;
};

export type Coords = Omit<SnakeCoords, 'cel'>;

class LinkedListNode {
	public value: SnakeCoords;
	public next: null | LinkedListNode;
	constructor(value: SnakeCoords) {
		this.value = value;
		this.next = null;
	}
}

class LinkedList {
	public head: LinkedListNode;
	public tail: LinkedListNode;
	constructor(value: SnakeCoords) {
		const node = new LinkedListNode(value);
		this.head = node;
		this.tail = node;
	}
}

export { LinkedListNode, LinkedList };
