import {DataStructureCommonInterface} from './common'
import * as btree from 'btreejs';

export function createBtree(length: number): DataStructureCommonInterface {
    const Tree = btree.create(2, btree.numcmp);
    const tree = new Tree()
    for (let i = 0; i < length; i++) {
        let val = Math.floor(Math.random() * 100);
        tree.put(val, val)
    }

    return {
        getLength() {
            return tree.length;
        },
        getByIndex(i) {
            return tree.get(i)
        },
        setByIndex(i, v) {
            tree.put(i, v) //???
        },
        contains(element) {
            if (tree.get(element) !== null)
                return true
            else return false
        },
        deleteFirst(element) {
            tree.del(element);
        },
        insert(element) {
            tree.put(element, element)
        }
    }
}
