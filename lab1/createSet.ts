import {DataStructureCommonInterface} from './common'

export function createSet(length: number): DataStructureCommonInterface {
    const set = new Set()
    for (let i = 0; i < length; i++) {
        set[i] = Math.floor(Math.random() * 100)
    }

    return {
        getLength() {
            return set.size
        },
        getByIndex(i) {
            return set[i]
        },
        setByIndex(i, v) {
            set[i] = v
        },
        contains(element) {
            for (const n of set) {
                if (n === element) {
                    return true
                }
            }
            return false
        },
        deleteFirst(element) {
            set.delete(element)
        },
        insert(element) {
            set.add(element)
        }
    }
}
