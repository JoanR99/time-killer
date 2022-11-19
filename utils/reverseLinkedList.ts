import { LinkedListNode } from './linkedList';

export default function reverseLinkedList(head: LinkedListNode) {
	let previousNode = null;
	let currentNode: LinkedListNode | null = head;
	while (currentNode !== null) {
		const nextNode: LinkedListNode | null = currentNode.next;
		currentNode.next = previousNode;
		previousNode = currentNode;
		currentNode = nextNode;
	}
	return previousNode;
}
