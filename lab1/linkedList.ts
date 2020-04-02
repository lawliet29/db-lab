import {DataStructureCommonInterface} from './common'

type LinkedListNode = {
    value: number
    next: LinkedListNode | null
}

export function createLinkedList(length: number): DataStructureCommonInterface {
    let last: LinkedListNode = null
    let first: LinkedListNode = null
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 100)
        const node: LinkedListNode = {value: randomNumber, next: null}
        if (first === null && last === null) {
            first = node
            last = node
        } else {
            last.next = node
            last = node
        }
    }

    return {
        getLength() {
            let counter = 0
            let node = first
            while (node !== null) {
                node = node.next
                counter++
            }
            return counter
        },
        getByIndex(i) {
            let counter = 0
            let node = first
            while (node !== null) {
                if (counter == i) return node.value;
                else {
                    node = node.next
                    counter++
                }
            }
        },
        setByIndex(i, v) {
            let counter = 0
            let node = first
            while (node !== null) {
                if (counter == i) {
                    node.value = v;
                    return
                } else {
                    node = node.next
                    counter++
                }
            }
        },
        contains(element) {
            let node = first
            while (node !== null) {
                if (node.value == element)
                    return true
                else node = node.next
            }
            return false
        },
        deleteFirst(element) {
            let node = first
            while (node.next !== null) {
                if (node.next.value == element) {
                    node.next = node.next.next
                    return
                }
            }
        },
        insert(element) {
            let node: LinkedListNode
            node.value = element
            node.next = null
            last.next = node
        }
    }
}
