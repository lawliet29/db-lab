import {DataStructureCommonInterface} from './common'

export function createMap(length: number): DataStructureCommonInterface {
    const map = new Map()
    for (let i = 0; i < length; i++) {
        let val = Math.floor(Math.random() * 100)
        map.set(val, val)
    }

    return {
        getLength() {
            return map.size
        },
        getByIndex(i) {
            return map[i]
        },
        setByIndex(i, v) {
            map[i] = v
        },
        contains(element) {
            return map.has(element)
        },
        deleteFirst(element) {
            map.delete(element)
        },
        insert(element) {
            map.set(element, element)
        }
    }
}
